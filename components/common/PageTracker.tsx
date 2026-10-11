"use client";

/**
 * 방문 기록 (weflow PageTracker 이식) — 관리자 > 유입 관리의 원본 데이터
 * - 페이지 이동마다 /api/track 에 방문 1건(경로·리퍼러·광고 파라미터) → 이탈 시 체류시간·스크롤 도달률 갱신
 * - 방문자 = 기기당 하루 1명 (영구 기기 ID[localStorage] + 한국시간 날짜)
 * - 제외: localhost, 본인 브라우저 opt-out (?notrack=1 로 끄고 ?track=1 로 다시 켬)
 * - 문의 유입 경로(lib/attribution)도 여기서 같이 캡처한다
 * - app/(site)/layout.tsx 에만 있어 관리자 화면은 기록되지 않는다
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";
import { readStore, removeStore, writeStore } from "@/lib/safeStorage";

function getSessionId(): string {
  const KEY = "unitech_did";
  let did = readStore("local", KEY);
  if (!did) {
    did = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    writeStore("local", KEY, did);
  }
  const day = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10); // KST 날짜
  return `${did}-${day}`;
}

function trackingDisabled(): boolean {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return true;
  return readStore("local", "unitech_notrack") === "1";
}

export default function PageTracker() {
  const pathname = usePathname();
  const current = useRef<{ id: string; entry: number; flushed: boolean } | null>(null);
  const maxScroll = useRef(0);

  const measureScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const pct = scrollable <= 0 ? 100 : Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100);
    const clamped = Math.max(0, Math.min(pct, 100));
    if (clamped > maxScroll.current) maxScroll.current = clamped;
  };

  // 현재 페이지 체류시간 + 스크롤 도달률 전송 (fire-and-forget)
  const flush = () => {
    const c = current.current;
    if (!c || c.flushed) return;
    c.flushed = true;
    measureScroll();
    const payload = JSON.stringify({
      type: "duration",
      id: c.id,
      durationMs: Math.round(performance.now() - c.entry),
      maxScroll: maxScroll.current,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
    }
  };

  useEffect(() => {
    captureAttribution();

    const params = new URLSearchParams(window.location.search);
    if (params.get("notrack") === "1") writeStore("local", "unitech_notrack", "1");
    if (params.get("track") === "1") removeStore("local", "unitech_notrack");
    if (trackingDisabled()) return;

    flush();
    maxScroll.current = 0;

    // 광고 클릭은 UTM 이 없어도 소스·매체를 채운다 (네이버 파워링크 n_*, 구글 gclid).
    // fbclid 는 광고 표시가 아니라 링크 꼬리표라 소스만 페이스북으로 적고 유료로 세지 않는다.
    const isNaverAd = !!(params.get("n_media") || params.get("n_keyword") || params.get("n_query") || params.get("n_ad"));
    const adSource = isNaverAd ? "naver" : params.get("gclid") ? "google" : "";
    const clickSource = adSource || (params.get("fbclid") ? "facebook" : "");
    const keyword = params.get("n_query") || params.get("n_keyword") || params.get("utm_term") || params.get("kw") || "";

    let active = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        path: pathname,
        referrer: document.referrer,
        utmSource: params.get("utm_source") || clickSource,
        utmMedium: params.get("utm_medium") || (adSource ? "cpc" : ""),
        // 광고 키워드는 캠페인 칸에 함께 남겨 "어떤 키워드로 왔는지" 집계한다
        utmCampaign: params.get("utm_campaign") || keyword,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (active && d?.id) current.current = { id: d.id, entry: performance.now(), flushed: false };
      })
      .catch(() => {});

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 스크롤 최대 도달률 (rAF 스로틀)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measureScroll();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 탭 닫기·백그라운드 전환 시 체류시간 마감, 복귀 시 재측정
  useEffect(() => {
    const onVisibility = () => {
      const c = current.current;
      if (document.visibilityState === "hidden") flush();
      else if (c) {
        c.entry = performance.now();
        c.flushed = false;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
