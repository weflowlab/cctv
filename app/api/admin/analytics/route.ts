import { denyUnlessAdmin } from "@/lib/adminAuth";
import { getRecentPageViews } from "@/lib/pageViews";

/** GET /api/admin/analytics?days=N (1~90, 기본 30) — 최근 N일 방문 기록 원본 (화면에서 집계) */
export async function GET(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const days = Math.min(Math.max(Number(new URL(req.url).searchParams.get("days")) || 30, 1), 90);
  return Response.json(await getRecentPageViews(days));
}
