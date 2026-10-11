/**
 * 방문 기록 — page_views 테이블 (weflow 유입 관리와 같은 구조)
 * - PageTracker(브라우저) → POST /api/track → createPageView / setPageViewDuration
 * - 관리자 > 유입 관리 → GET /api/admin/analytics → getRecentPageViews (원본을 받아 화면에서 집계)
 */
import { getSql, toIso } from "./db";
import { ensureSchema } from "./schema";

export interface PageView {
  id: string;
  sessionId: string;
  path: string;
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
  device: string;
  durationMs: number | null;
  maxScroll: number | null;
  createdAt: string;
}

function toPageView(row: Record<string, unknown>): PageView {
  return {
    id: row.id as string,
    sessionId: row.session_id as string,
    path: row.path as string,
    referrer: (row.referrer as string) || "",
    source: (row.source as string) || "direct",
    medium: (row.medium as string) || "",
    campaign: (row.campaign as string) || "",
    device: (row.device as string) || "desktop",
    durationMs: (row.duration_ms as number) ?? null,
    maxScroll: (row.max_scroll as number) ?? null,
    createdAt: toIso(row.created_at),
  };
}

/** 최근 N일 방문 기록 (오래된 순) */
export async function getRecentPageViews(days = 30): Promise<PageView[]> {
  await ensureSchema();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const rows = await getSql()`
    SELECT * FROM page_views WHERE created_at >= ${since} ORDER BY created_at ASC, id ASC`;
  return rows.map(toPageView);
}

export async function createPageView(input: {
  sessionId: string;
  path: string;
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
  device: string;
}): Promise<{ id: string }> {
  await ensureSchema();
  const rows = await getSql()`
    INSERT INTO page_views (session_id, path, referrer, source, medium, campaign, device)
    VALUES (${input.sessionId}, ${input.path}, ${input.referrer}, ${input.source},
            ${input.medium}, ${input.campaign}, ${input.device})
    RETURNING id`;
  return { id: rows[0].id as string };
}

/** 페이지 이탈 시 체류시간 + 스크롤 최대 도달률 */
export async function setPageViewDuration(id: string, durationMs: number, maxScroll?: number): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  if (typeof maxScroll === "number") {
    await sql`UPDATE page_views SET duration_ms = ${durationMs}, max_scroll = ${maxScroll} WHERE id = ${id}`;
  } else {
    await sql`UPDATE page_views SET duration_ms = ${durationMs} WHERE id = ${id}`;
  }
}
