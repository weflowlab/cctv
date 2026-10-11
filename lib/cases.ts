/**
 * 시공사례 — cases 테이블 읽기·쓰기
 * - 공개 페이지: getCases() 하나로 읽는다 ('use cache' + 'cases' 태그, 관리자 저장 시 즉시 무효화)
 * - 관리자 API: listCases / getCaseById / createCase / updateCase / deleteCase + parseCaseInput(값 검사)
 * - DB 는 snake_case, 앱은 camelCase — 변환은 toCase() 가 담당
 */
import { cacheLife, cacheTag } from "next/cache";
import { SEED_CASES, type CaseImage, type CaseItem, type CaseService } from "@/components/cases/data";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { getSql, hasDb, toIso } from "./db";
import { ensureSchema } from "./schema";

export const CASES_TAG = "cases";

/** 관리자 목록용 — 공개 필드 + 등록·수정 시각 */
export type AdminCase = CaseItem & { createdAt: string; updatedAt: string };

const SERVICE_KEYS: CaseService[] = ["install", "rental", "as", "speaker"];

function toCase(row: Record<string, unknown>): AdminCase {
  return {
    id: row.id as string,
    title: row.title as string,
    place: row.place as PlaceSlug,
    region: (row.region as string) || "",
    cameraCount: Number(row.camera_count) || 0,
    service: row.service as CaseService,
    summary: (row.summary as string) || "",
    images: Array.isArray(row.images) ? (row.images as CaseImage[]) : [],
    date: row.date as string,
    featured: Boolean(row.featured),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

async function selectAll(): Promise<AdminCase[]> {
  await ensureSchema();
  const rows = await getSql()`SELECT * FROM cases ORDER BY date DESC, created_at DESC`;
  return rows.map(toCase);
}

/* ===================== 공개 페이지 ===================== */

/** 전체 시공사례 (최신순) — DB 미설정이면 초기 데이터 */
export async function getCases(): Promise<CaseItem[]> {
  "use cache";
  cacheLife("max");
  cacheTag(CASES_TAG);
  if (!hasDb()) return SEED_CASES;
  // 공개 화면에는 등록·수정 시각이 필요 없다 — 캐시에 담기는 양을 줄인다
  return (await selectAll()).map((c) => ({
    id: c.id,
    title: c.title,
    place: c.place,
    region: c.region,
    cameraCount: c.cameraCount,
    service: c.service,
    summary: c.summary,
    images: c.images,
    date: c.date,
    featured: c.featured,
  }));
}

/** 메인 노출용 — featured 우선, 부족하면 최신순으로 채움 */
export function pickFeatured(cases: CaseItem[], limit = 6): CaseItem[] {
  return [...cases.filter((c) => c.featured), ...cases.filter((c) => !c.featured)].slice(0, limit);
}

/** 장소별 사례 건수 (칩 바 표시용) — 사례가 없는 장소는 0 */
export function countByPlace(cases: CaseItem[]): Record<PlaceSlug, number> {
  const counts = Object.fromEntries(PLACES.map((p) => [p.slug, 0])) as Record<PlaceSlug, number>;
  for (const c of cases) if (c.place in counts) counts[c.place] += 1;
  return counts;
}

/* ===================== 관리자 ===================== */

export const listCases = selectAll;

export async function getCaseById(id: string): Promise<AdminCase | null> {
  await ensureSchema();
  const rows = await getSql()`SELECT * FROM cases WHERE id = ${id}`;
  return rows.length ? toCase(rows[0]) : null;
}

/** 저장할 값 (id 는 주소용 slug) */
export type CaseInput = CaseItem;

/** 이미 쓰는 id 면 끝에 -2, -3 … 을 붙여 비어 있는 값을 찾는다 (exceptId 는 자기 자신) */
async function uniqueId(base: string, exceptId?: string): Promise<string> {
  const sql = getSql();
  const rows = await sql`SELECT id FROM cases WHERE id = ${base} OR id LIKE ${base + "-%"}`;
  const taken = new Set(rows.map((r) => r.id as string).filter((id) => id !== exceptId));
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) if (!taken.has(`${base}-${n}`)) return `${base}-${n}`;
}

export async function createCase(input: CaseInput): Promise<AdminCase> {
  await ensureSchema();
  const id = await uniqueId(input.id);
  const rows = await getSql()`
    INSERT INTO cases (id, title, place, region, camera_count, service, summary, images, date, featured)
    VALUES (${id}, ${input.title}, ${input.place}, ${input.region}, ${input.cameraCount}, ${input.service},
            ${input.summary}, ${JSON.stringify(input.images)}::jsonb, ${input.date}, ${input.featured})
    RETURNING *`;
  return toCase(rows[0]);
}

/** 수정 — 주소(id)를 바꾸면 겹치지 않는 값으로 맞춘다. 없는 사례면 null */
export async function updateCase(currentId: string, input: CaseInput): Promise<AdminCase | null> {
  await ensureSchema();
  const id = input.id === currentId ? currentId : await uniqueId(input.id, currentId);
  const rows = await getSql()`
    UPDATE cases SET
      id = ${id}, title = ${input.title}, place = ${input.place}, region = ${input.region},
      camera_count = ${input.cameraCount}, service = ${input.service}, summary = ${input.summary},
      images = ${JSON.stringify(input.images)}::jsonb, date = ${input.date}, featured = ${input.featured},
      updated_at = now()
    WHERE id = ${currentId}
    RETURNING *`;
  return rows.length ? toCase(rows[0]) : null;
}

/** 메인 노출만 켜고 끈다 (목록의 토글) */
export async function setCaseFeatured(id: string, featured: boolean): Promise<AdminCase | null> {
  await ensureSchema();
  const rows = await getSql()`UPDATE cases SET featured = ${featured}, updated_at = now() WHERE id = ${id} RETURNING *`;
  return rows.length ? toCase(rows[0]) : null;
}

/** 삭제 — 지운 사례를 돌려준다 (사진 정리용). 없으면 null */
export async function deleteCase(id: string): Promise<AdminCase | null> {
  await ensureSchema();
  const rows = await getSql()`DELETE FROM cases WHERE id = ${id} RETURNING *`;
  return rows.length ? toCase(rows[0]) : null;
}

/* ===================== 값 검사 ===================== */

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_IMAGES = 20;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** 사진 주소 — 업로드한 Blob 주소(https) 또는 사이트 안 이미지 경로만 */
function isImageUrl(url: string): boolean {
  return /^https:\/\/[^\s]+$/.test(url) || /^\/images\/[^\s]+$/.test(url);
}

/** 관리자 폼 본문 → 저장할 값. 잘못된 값이면 { error } */
export function parseCaseInput(body: unknown): { value: CaseInput } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const id = str(b.id, 100).toLowerCase();
  const title = str(b.title, 100);
  const place = str(b.place, 20) as PlaceSlug;
  const service = str(b.service, 20) as CaseService;
  const region = str(b.region, 50);
  const summary = str(b.summary, 3000);
  const date = str(b.date, 7);
  const cameraCount = Number(b.cameraCount);

  if (!title) return { error: "제목을 입력해 주세요." };
  if (!SLUG_RE.test(id)) return { error: "주소(영문)는 영문 소문자·숫자·하이픈(-)만 쓸 수 있습니다." };
  if (!PLACES.some((p) => p.slug === place)) return { error: "장소를 선택해 주세요." };
  if (!SERVICE_KEYS.includes(service)) return { error: "서비스를 선택해 주세요." };
  if (!region) return { error: "지역을 입력해 주세요." };
  if (!Number.isInteger(cameraCount) || cameraCount < 0 || cameraCount > 9999)
    return { error: "설치 대수는 0 이상의 숫자로 입력해 주세요." };
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(date)) return { error: "시공 시기를 선택해 주세요." };
  if (!summary) return { error: "현장 설명을 입력해 주세요." };

  const rawImages = Array.isArray(b.images) ? b.images : [];
  if (rawImages.length > MAX_IMAGES) return { error: `사진은 ${MAX_IMAGES}장까지 올릴 수 있습니다.` };
  const images: CaseImage[] = [];
  for (const raw of rawImages as Record<string, unknown>[]) {
    const url = str(raw?.url, 1000);
    if (!isImageUrl(url)) return { error: "사진 주소가 올바르지 않습니다. 다시 올려 주세요." };
    images.push({ url, alt: str(raw?.alt, 100) || title });
  }
  if (images.length === 0) return { error: "사진을 1장 이상 올려 주세요." };

  return { value: { id, title, place, region, cameraCount, service, summary, images, date, featured: b.featured === true } };
}
