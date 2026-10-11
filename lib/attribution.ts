/**
 * 유입 경로 캡처 (weflow 이식) — 어떤 광고·검색·링크로 들어온 방문자가 문의까지 왔는지 잇는다.
 *
 * 사이트에 들어올 때 URL 파라미터(네이버 파워링크 n_*, UTM, gclid, fbclid)와 리퍼러를 sessionStorage 에 저장해 두고,
 * 상담 신청 시 사람이 읽는 한 줄("네이버 광고 · 키워드: 매장cctv")로 만들어 문의에 함께 보낸다 → 관리자 문의 상세의 "유입".
 *
 * 저장 규칙 — "들어온 그 방문"만 본다 (탭을 닫으면 사라짐)
 * - 진입(전체 페이지 로드) 때 광고 파라미터가 있으면 광고로, 리퍼러가 우리 사이트면 기존 값 유지,
 *   그 외(주소 직접 입력·외부 링크)는 이 진입 기준으로 덮어쓴다.
 * - 사이트 안 이동(클라이언트 이동) 중에는 광고 파라미터가 새로 붙은 경우만 덮어쓴다.
 */
import { readStore, writeStore } from "./safeStorage";

const ATTR_KEYS = [
  "n_media", "n_query", "n_rank", "n_ad", "n_keyword", "n_keyword_id",
  "n_campaign_type", "n_ad_group", "n_ad_group_type", "n_match", "n_network",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "kw", "gclid", "fbclid",
] as const;

type Attribution = Partial<Record<(typeof ATTR_KEYS)[number], string>> & {
  landing?: string;
  referrer?: string;
};

const STORAGE_KEY = "unitech_attr";

function readParams(): Attribution {
  const sp = new URLSearchParams(window.location.search);
  const attr: Attribution = {};
  ATTR_KEYS.forEach((k) => {
    const v = sp.get(k);
    if (v) attr[k] = v;
  });
  return attr;
}

/** n_query(실제 검색어) 우선 — n_keyword 는 캠페인에 따라 숫자 ID 로만 온다 */
function pickKeyword(a: Attribution): string {
  return a.n_query || a.n_keyword || a.utm_term || a.kw || "";
}

// 이 페이지 로드에서 진입 판정을 했는지 — 모듈은 전체 로드마다 새로 실행되므로 첫 호출 = 사이트 진입
let entryHandled = false;

function isInternalReferrer(referrer: string): boolean {
  if (!referrer) return false;
  try {
    return new URL(referrer).hostname === window.location.hostname;
  } catch {
    return false;
  }
}

function getAttribution(): Attribution | null {
  const raw = readStore("session", STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** 경로가 바뀔 때마다 호출 (PageTracker) */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = readParams();
  const hasAd = Object.keys(params).length > 0;
  const isEntry = !entryHandled;
  entryHandled = true;

  if (!isEntry && !hasAd) return;
  if (isEntry && !hasAd && getAttribution() && isInternalReferrer(document.referrer)) return;

  const attr: Attribution = { ...params, landing: window.location.pathname, referrer: document.referrer || undefined };
  writeStore("session", STORAGE_KEY, JSON.stringify(attr));
}

function referrerChannel(referrer: string): string {
  let host = "";
  try {
    host = new URL(referrer).hostname;
  } catch {
    return "";
  }
  if (host.includes("blog.naver")) return "네이버 블로그";
  if (host.includes("naver")) return "네이버 검색";
  if (host.includes("google")) return "구글 검색";
  if (host.includes("daum")) return "다음";
  if (host.includes("instagram")) return "인스타그램";
  if (host.includes("facebook")) return "페이스북";
  if (host.includes("youtube")) return "유튜브";
  if (host.includes("kakao")) return "카카오";
  if (host.includes("daangn") || host.includes("karrot")) return "당근";
  return host;
}

/** 저장된 유입 정보를 한 줄로 — "네이버 광고 · 키워드: 매장cctv" / "네이버 검색" / "직접 유입" */
export function attributionLine(): string {
  const a = getAttribution();
  if (!a) return "";
  const keyword = pickKeyword(a);

  let channel = "";
  if (a.n_media || a.n_keyword || a.n_query || a.n_ad) channel = "네이버 광고";
  else if (a.gclid) channel = "구글 광고";
  else if (a.utm_source) {
    const KO: Record<string, string> = {
      naver: "네이버", google: "구글", instagram: "인스타그램", facebook: "페이스북", threads: "스레드",
      meta: "메타", youtube: "유튜브", kakao: "카카오", band: "밴드", daangn: "당근",
    };
    const name = KO[a.utm_source.toLowerCase()] || a.utm_source;
    channel = a.utm_medium === "cpc" || a.utm_medium === "paid" ? `${name} 광고` : name;
  } else if (a.fbclid) channel = "페이스북"; // fbclid 는 광고가 아니라 링크 꼬리표
  else if (a.referrer) channel = referrerChannel(a.referrer);

  if (!channel) channel = "직접 유입";
  return keyword ? `${channel} · 키워드: ${keyword}` : channel;
}
