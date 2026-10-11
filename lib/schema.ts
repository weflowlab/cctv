/**
 * 테이블 준비 — 인스턴스당 한 번, 첫 DB 접근 때 없는 테이블만 만든다 (별도 마이그레이션 명령 없음).
 *
 * 테이블
 * - inquiries   상담 신청(문의)            — /contact 폼 → 관리자 > 문의 관리
 * - page_views  방문 기록                  — PageTracker → 관리자 > 유입 관리
 * - faqs        자주 묻는 질문             — 관리자 > FAQ 관리 → /faq, 홈 BEST 5
 * - cases       시공사례                   — 관리자 > 시공사례 관리 → /cases, 홈 시공사례
 * - rate_hits   문의 접수 횟수 제한 기록
 *
 * faqs · cases 는 "테이블을 새로 만들 때만" 초기 데이터(components/cases/data.ts · components/support-faq/data.ts)를 넣는다.
 * 관리자에서 전부 지워도 다시 채워지지 않는다.
 */
import { SEED_CASES } from "@/components/cases/data";
import { SEED_FAQS } from "@/components/support-faq/data";
import { getSql } from "./db";

let ready: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (ready) return ready;
  ready = create().catch((err) => {
    // 실패하면 다음 요청에서 다시 시도할 수 있게 비운다
    ready = null;
    throw err;
  });
  return ready;
}

async function create() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      status     text NOT NULL DEFAULT 'pending',
      name       text NOT NULL,
      phone      text NOT NULL,
      services   text NOT NULL DEFAULT '',
      wish_date  text NOT NULL DEFAULT '',
      message    text NOT NULL DEFAULT '',
      source     text NOT NULL DEFAULT '',
      device     text NOT NULL DEFAULT '',
      agree      boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
  await sql`CREATE INDEX IF NOT EXISTS inquiries_created ON inquiries (created_at DESC)`;

  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id  text NOT NULL,
      path        text NOT NULL,
      referrer    text NOT NULL DEFAULT '',
      source      text NOT NULL DEFAULT 'direct',
      medium      text NOT NULL DEFAULT '',
      campaign    text NOT NULL DEFAULT '',
      device      text NOT NULL DEFAULT 'desktop',
      duration_ms integer,
      max_scroll  integer,
      created_at  timestamptz NOT NULL DEFAULT now()
    )`;
  await sql`CREATE INDEX IF NOT EXISTS page_views_created ON page_views (created_at)`;

  await sql`
    CREATE TABLE IF NOT EXISTS rate_hits (
      id         bigserial PRIMARY KEY,
      bucket     text NOT NULL,
      ip         text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
  await sql`CREATE INDEX IF NOT EXISTS rate_hits_lookup ON rate_hits (bucket, ip, created_at DESC)`;

  // faqs · cases — 새로 만들 때만 초기 데이터
  const [exists] = await sql`
    SELECT to_regclass('public.faqs') IS NOT NULL AS faqs, to_regclass('public.cases') IS NOT NULL AS cases`;

  if (!exists.faqs) {
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id       serial PRIMARY KEY,
        sort     integer NOT NULL,
        category text NOT NULL,
        question text NOT NULL,
        answer   text NOT NULL,
        best     boolean NOT NULL DEFAULT false
      )`;
    await sql.transaction(
      SEED_FAQS.map(
        (f, i) => sql`
          INSERT INTO faqs (sort, category, question, answer, best)
          VALUES (${i}, ${f.category}, ${f.question}, ${f.answer}, ${f.best})`,
      ),
    );
  }

  if (!exists.cases) {
    await sql`
      CREATE TABLE IF NOT EXISTS cases (
        id           text PRIMARY KEY,
        title        text NOT NULL,
        place        text NOT NULL,
        region       text NOT NULL DEFAULT '',
        camera_count integer NOT NULL DEFAULT 0,
        service      text NOT NULL,
        summary      text NOT NULL DEFAULT '',
        images       jsonb NOT NULL DEFAULT '[]'::jsonb,
        date         text NOT NULL,
        featured     boolean NOT NULL DEFAULT false,
        created_at   timestamptz NOT NULL DEFAULT now(),
        updated_at   timestamptz NOT NULL DEFAULT now()
      )`;
    // 같은 달 사례는 등록 순서 역순으로 보이므로, 배열 앞쪽(최신)이 더 늦게 등록된 것처럼 시각을 준다
    await sql.transaction(
      SEED_CASES.map(
        (c, i) => sql`
          INSERT INTO cases (id, title, place, region, camera_count, service, summary, images, date, featured, created_at)
          VALUES (${c.id}, ${c.title}, ${c.place}, ${c.region}, ${c.cameraCount}, ${c.service}, ${c.summary},
                  ${JSON.stringify(c.images)}::jsonb, ${c.date}, ${c.featured}, now() - make_interval(secs => ${i}))`,
      ),
    );
  }

  // 홈 노출 순서 칸 (2026-10 추가 — 이미 만든 테이블에도 붙인다)
  await sql`ALTER TABLE cases ADD COLUMN IF NOT EXISTS feature_rank integer`;
}
