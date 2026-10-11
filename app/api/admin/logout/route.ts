import { ADMIN_COOKIE } from "@/lib/adminAuth";

/** POST /api/admin/logout — 세션 쿠키를 즉시 만료 */
export async function POST() {
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return res;
}
