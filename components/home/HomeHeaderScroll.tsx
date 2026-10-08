"use client";

/**
 * 홈 전용 헤더 스크롤 연동 (화면에 아무것도 그리지 않음)
 * - 원본 홈 페이지(tK)는 `useHeaderScroll(50)` 훅(2946 청크의 4360 모듈)을 호출한다.
 *   · window.scrollY < 50  → 헤더 "transparent" (투명 배경 + 흰 글자, 히어로 위)
 *   · window.scrollY >= 50 → 헤더 "white"
 * - 스크롤 이벤트는 100ms throttle, passive 리스너. 마운트 직후 1회 즉시 실행.
 */
import { useEffect } from "react";
import { useHeaderStyle } from "@/components/layout/HeaderStyleContext";

const THRESHOLD = 50; // 원본 useHeaderScroll(50)
const THROTTLE_MS = 100; // 원본 throttle(…, 100)

export default function HomeHeaderScroll() {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 현재 스크롤 위치에 맞춰 헤더 스타일 결정
    const apply = () => {
      setHeaderStyle(window.scrollY < THRESHOLD ? "transparent" : "white");
    };

    // lodash throttle(leading + trailing) 과 동일한 동작: 즉시 1회 + 구간 끝에 1회
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
