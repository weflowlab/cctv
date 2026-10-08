"use client";

/**
 * 홈 전용 헤더 스크롤 연동 (화면에 아무것도 그리지 않음) — keeper components/home/HomeHeaderScroll 복사
 * - window.scrollY < 50  → 헤더 "transparent" (투명 배경 + 흰 글자, 히어로 위에 깔림)
 * - window.scrollY >= 50 → 헤더 "white"
 * - 스크롤 이벤트는 100ms throttle(leading + trailing), passive 리스너. 마운트 직후 1회 즉시 실행.
 */
import { useEffect } from "react";
import { useHeaderStyle } from "@/components/layout/HeaderStyleContext";

const THRESHOLD = 50; // 헤더 전환 기준 스크롤 위치(px)
const THROTTLE_MS = 100;

export default function HomeHeaderScroll() {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 현재 스크롤 위치에 맞춰 헤더 스타일 결정
    const apply = () => {
      setHeaderStyle(window.scrollY < THRESHOLD ? "transparent" : "white");
    };

    // throttle: 구간 첫 이벤트는 즉시, 구간 안의 나머지는 구간 끝에 1회
    const onScroll = () => {
      const now = Date.now();
      const remaining = THROTTLE_MS - (now - last);
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        last = now;
        apply();
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          apply();
        }, remaining);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // 새로고침 시 중간 위치에서 시작해도 바로 맞춰지도록
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setHeaderStyle]);

  return null;
}
