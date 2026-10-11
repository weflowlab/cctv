/**
 * 자주 묻는 질문 — faqs 테이블 읽기·쓰기 (tirecamp FAQ 관리와 같은 "목록 통째 저장" 방식)
 * - 공개 페이지: getFaqs() ('use cache' + 'faqs' 태그, 관리자 저장 시 즉시 무효화)
 * - 관리자: replaceFaqs() — 순서 변경·추가·삭제를 한 번에 저장하므로 전체 교체가 가장 단순하다
 */
import { cacheLife, cacheTag } from "next/cache";
import { FAQ_TABS, SEED_FAQS, type FaqCategory, type FaqItem } from "@/components/support-faq/data";
import { getSql, hasDb } from "./db";
import { ensureSchema } from "./schema";

export const FAQS_TAG = "faqs";
export const MAX_FAQS = 100;

async function selectAll(): Promise<FaqItem[]> {
  await ensureSchema();
  const rows = await getSql()`SELECT category, question, answer, best FROM faqs ORDER BY sort, id`;
  return rows.map((r) => ({
    category: r.category as FaqCategory,
    question: r.question as string,
    answer: r.answer as string,
    best: Boolean(r.best),
  }));
}

/** 전체 FAQ (노출 순서) — DB 미설정이면 초기 데이터 */
export async function getFaqs(): Promise<FaqItem[]> {
  "use cache";
  cacheLife("max");
  cacheTag(FAQS_TAG);
  if (!hasDb()) return SEED_FAQS;
  return selectAll();
}

/** 관리자 화면용 (캐시 없이 항상 최신) */
export const listFaqs = selectAll;

/** 목록 전체 교체 — 지우고 순서대로 다시 넣는다 (한 트랜잭션) */
export async function replaceFaqs(items: FaqItem[]): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql.transaction([
    sql`DELETE FROM faqs`,
    ...items.map(
      (f, i) => sql`
        INSERT INTO faqs (sort, category, question, answer, best)
        VALUES (${i}, ${f.category}, ${f.question}, ${f.answer}, ${f.best})`,
    ),
  ]);
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** 관리자 저장 본문 → 목록. 잘못된 값이면 { error } */
export function parseFaqs(body: unknown): { value: FaqItem[] } | { error: string } {
  const raw = (body as { items?: unknown })?.items;
  if (!Array.isArray(raw)) return { error: "잘못된 요청입니다." };
  if (raw.length > MAX_FAQS) return { error: `FAQ 는 ${MAX_FAQS}개까지 등록할 수 있습니다.` };
  const items: FaqItem[] = [];
  for (const [i, r] of (raw as Record<string, unknown>[]).entries()) {
    const question = clean(r?.question, 200);
    const answer = clean(r?.answer, 2000);
    const category = clean(r?.category, 10) as FaqCategory;
    if (!question || !answer) return { error: `${i + 1}번 항목의 질문과 답변을 모두 입력해 주세요.` };
    if (!FAQ_TABS.includes(category)) return { error: `${i + 1}번 항목의 분류를 선택해 주세요.` };
    items.push({ category, question, answer, best: r?.best === true });
  }
  return { value: items };
}
