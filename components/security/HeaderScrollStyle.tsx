"use client";

/**
 * 매장보안 페이지 헤더 스크롤 연동
 * - 원본 useHeaderScrollStyle(100, "transparent-black") 훅 재현
 *   · scrollY < 100  → "transparent-black" (밝은 히어로 위 투명 배경 + 검은 글자)
 *   · scrollY ≥ 100  → "white" (흰 배경 헤더)
 * - 원본은 100ms throttle + passive scroll 리스너, 마운트 직후 1회 즉시 실행
 * - 화면에는 아무것도 렌더링하지 않는다.
 */
import { useEffect } from "react";
import { useHeaderStyle } from "@/components/layout/HeaderStyleContext";

const THRESHOLD = 100; // 헤더 전환 기준 스크롤 위치(px)
const THROTTLE_MS = 100; // 원본 throttle 간격

export default function HeaderScrollStyle() {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 현재 스크롤 위치에 맞춰 헤더 스타일 지정
    const apply = () => {
      last = Date.now();
      setHeaderStyle(window.scrollY < THRESHOLD ? "transparent-black" : "white");
    };

    // throttle: 100ms 에 한 번만 실행하고, 마지막 이벤트는 trailing 으로 반영
    const onScroll = () => {
      const remain = THROTTLE_MS - (Date.now() - last);
      if (remain <= 0) {
        apply();
      } else if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          apply();
        }, remain);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply(); // 마운트 직후 1회 실행

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setHeaderStyle]);

  return null;
}
