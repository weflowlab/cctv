import { ADMIN_COOKIE, ADMIN_MAX_AGE, checkPassword, createSession } from "@/lib/adminAuth";

/** POST /api/admin/login — { password } → 맞으면 httpOnly 세션 쿠키 발급 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { password?: unknown };
  if (!checkPassword(String(body.password ?? ""))) {
    return Response.json({ ok: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=${createSession()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ADMIN_MAX_AGE}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return res;
}
