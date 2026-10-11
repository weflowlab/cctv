/**
 * 요청 정보 헬퍼 — 기기 판별(User-Agent) · 방문자 IP · 문의 횟수 제한 (weflow lib/device · rateLimit 이식)
 */
import { getSql } from "./db";
import { ensureSchema } from "./schema";

/** user-agent → 'mobile' | 'tablet' | 'desktop' */
export function detectDevice(ua: string): "mobile" | "tablet" | "desktop" {
  const s = ua.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/.test(s)) return "tablet";
  if (/mobile|iphone|ipod|android/.test(s)) return "mobile";
  return "desktop";
}

export const DEVICE_LABEL: Record<string, string> = { mobile: "모바일", tablet: "태블릿", desktop: "데스크탑" };

/** 요청을 보낸 IP — x-forwarded-for 의 맨 앞(실제 방문자) */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 64);
  return (req.headers.get("x-real-ip") || "unknown").slice(0, 64);
}

/**
 * 횟수 제한 — 1분·1시간 두 창을 같이 본다. 통과하면 이번 요청을 기록한다.
 * 서버리스는 인스턴스가 여러 개라 메모리가 아니라 DB(rate_hits)에 센다.
 * DB 가 흔들리면 통과시킨다(fail-open) — 이것 때문에 진짜 문의가 막히면 손해가 더 크다.
 */
export async function checkRateLimit(
  bucket: string,
  ip: string,
  opts: { perMinute: number; perHour: number },
): Promise<{ ok: boolean; retryAfterSec: number }> {
  try {
    await ensureSchema();
    const sql = getSql();
    const [row] = await sql`
      SELECT
        count(*) FILTER (WHERE created_at > now() - interval '1 minute') AS burst,
        count(*) AS hourly
      FROM rate_hits
      WHERE bucket = ${bucket} AND ip = ${ip} AND created_at > now() - interval '1 hour'`;
    if (Number(row?.burst ?? 0) >= opts.perMinute) return { ok: false, retryAfterSec: 60 };
    if (Number(row?.hourly ?? 0) >= opts.perHour) return { ok: false, retryAfterSec: 3600 };
    await sql`INSERT INTO rate_hits (bucket, ip) VALUES (${bucket}, ${ip})`;
    // 가끔씩 1시간 지난 기록을 청소한다 (크론 없이)
    if (Math.random() < 0.02) await sql`DELETE FROM rate_hits WHERE created_at < now() - interval '1 hour'`;
    return { ok: true, retryAfterSec: 0 };
  } catch {
    return { ok: true, retryAfterSec: 0 };
  }
}
