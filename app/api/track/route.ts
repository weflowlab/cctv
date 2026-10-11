import { createPageView, setPageViewDuration } from "@/lib/pageViews";
import { detectDevice } from "@/lib/requestInfo";

/**
 * POST /api/track — 방문 기록 수집 (공개, weflow 와 같은 방식)
 * - { type: 'duration', id, durationMs, maxScroll } : 페이지 이탈 시 체류시간·스크롤 갱신 (sendBeacon)
 * - { sessionId, path, referrer, utmSource, utmMedium, utmCampaign } : 새 방문 기록 → { id }
 */

/** referrer 도메인 → 유입 소스 이름 */
function normalizeSource(referrer: string, host: string): string {
  if (!referrer) return "direct";
  let h = "";
  try {
    h = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "direct";
  }
  const ownHost = host.split(":")[0].toLowerCase();
  if (ownHost && (h === ownHost || h.endsWith("." + ownHost))) return "direct"; // 내부 이동
  if (h.includes("kakao")) return "kakao";
  if (h.includes("naver")) return "naver";
  if (h.includes("threads")) return "threads";
  if (h.includes("instagram")) return "instagram";
  if (h.includes("facebook")) return "facebook";
  if (h.includes("google")) return "google";
  if (h.includes("daum")) return "daum";
  if (h.includes("daangn") || h.includes("karrot")) return "daangn";
  if (h === "t.co" || h.includes("twitter") || h.includes("x.com")) return "twitter";
  if (h.includes("youtube")) return "youtube";
  return h.replace(/^www\./, "");
}

/** 인앱 브라우저는 referrer 를 숨기므로 User-Agent 의 앱 이름으로 판별 */
function detectAppSource(ua: string): string {
  const s = ua.toLowerCase();
  if (s.includes("barcelona")) return "threads";
  if (s.includes("instagram")) return "instagram";
  if (/fban|fbav|fb_iab|fbios/.test(s)) return "facebook";
  if (s.includes("kakaotalk")) return "kakao";
  if (/\bband\//.test(s)) return "band";
  if (s.includes("naver")) return "naver";
  if (/line\//.test(s)) return "line";
  if (s.includes("daumapps")) return "daum";
  return "";
}

function isBot(ua: string): boolean {
  return /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|headless|yeti/i.test(ua);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  if (isBot(ua)) return Response.json({ ok: true, skipped: "bot" });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad body" }, { status: 400 });
  }

  // 1) 체류시간 + 스크롤 도달률 갱신
  if (body.type === "duration" && typeof body.id === "string") {
    if (!/^[0-9a-f-]{36}$/i.test(body.id)) return Response.json({ error: "bad id" }, { status: 400 });
    const ms = Math.max(0, Math.min(Number(body.durationMs) || 0, 1000 * 60 * 60)); // 0~1시간
    const scroll =
      body.maxScroll != null ? Math.max(0, Math.min(Math.round(Number(body.maxScroll)) || 0, 100)) : undefined;
    await setPageViewDuration(body.id, ms, scroll);
    return Response.json({ ok: true });
  }

  // 2) 새 방문 기록
  const sessionId = str(body.sessionId, 80);
  const path = str(body.path, 300);
  if (!sessionId || !path.startsWith("/")) return Response.json({ error: "missing fields" }, { status: 400 });

  const referrer = str(body.referrer, 500);
  const utmSource = str(body.utmSource, 50).toLowerCase();
  // 우선순위: UTM·광고 파라미터 > 인앱 브라우저(UA) > referrer 도메인
  const source = utmSource || detectAppSource(ua) || normalizeSource(referrer, req.headers.get("host") || "");

  const { id } = await createPageView({
    sessionId,
    path,
    referrer,
    source,
    medium: str(body.utmMedium, 50),
    campaign: str(body.utmCampaign, 100),
    device: detectDevice(ua),
  });
  return Response.json({ id });
}
