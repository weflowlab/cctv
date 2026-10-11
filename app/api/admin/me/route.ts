import { isAdmin } from "@/lib/adminAuth";

/** GET /api/admin/me — 로그인 상태 확인 (관리자 화면 진입 시) */
export async function GET() {
  return Response.json({ authed: await isAdmin() });
}
