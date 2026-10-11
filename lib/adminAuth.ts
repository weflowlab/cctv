/**
 * 관리자 인증 — 비밀번호 1개 + 서명된 세션 쿠키 (weflow 관리자와 같은 방식)
 * - 비밀번호: ADMIN_PASSWORD (서버에서만 검증, 브라우저 노출 없음)
 * - 세션: "만료시각.서명" 토큰을 httpOnly 쿠키로. 서버에 저장하지 않고 서명만으로 검증한다.
 * - 관리자 API 는 모두 첫 줄에서 denyUnlessAdmin() 으로 막는다.
 */
import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "unitech_admin";
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 7; // 7일(초)

const DEV_PASSWORD = "admin";

/** 설정된 비밀번호 — 운영에서 비어 있으면 로그인 자체를 막는다 (기본 비밀번호로 열리는 사고 방지) */
function expectedPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw) return pw;
  return process.env.NODE_ENV === "production" ? null : DEV_PASSWORD;
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "unitech-dev-secret";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

/** 길이가 달라도 시간 차이가 나지 않는 비교 */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkPassword(input: string): boolean {
  const expected = expectedPassword();
  return expected !== null && safeEqual(input, expected);
}

/** 만료시각 + 서명으로 구성된 세션 토큰 */
export function createSession(): string {
  const exp = String(Date.now() + ADMIN_MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  if (!safeEqual(token.slice(dot + 1), sign(exp))) return false;
  return Number(exp) > Date.now();
}

/** 현재 요청이 관리자 인증된 상태인지 (httpOnly 쿠키 기반) */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}

/** 관리자 API 첫 줄용 — 인증 안 됐으면 401 응답, 됐으면 null */
export async function denyUnlessAdmin(): Promise<Response | null> {
  if (await isAdmin()) return null;
  return Response.json({ ok: false, error: "로그인이 필요합니다." }, { status: 401 });
}
