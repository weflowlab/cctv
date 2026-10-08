"use client";

/**
 * 스크롤 위치에 따라 헤더 스타일을 바꾸는 훅 (원본 공용 훅 4360 그대로)
 * - scrollY < threshold 이면 topStyle(기본 "transparent"), 그 이상이면 scrolledStyle(기본 "white")
 * - 스크롤 이벤트는 100ms 스로틀, 마운트 직후 한 번 즉시 반영
 * - /business(투명 → 흰색), /calculator 상담 폼 단계(투명-검정 → 흰색)에서 사용
 */
import { useEffect } from "react";
import { useHeaderStyle, type HeaderStyle } from "@/components/layout/HeaderStyleContext";

export function useHeaderScrollStyle(
  threshold: number,
  topStyle: HeaderStyle = "transparent",
  scrolledStyle: HeaderStyle = "white",
) {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const apply = () => {
      last = Date.now();
      setHeaderStyle(window.scrollY < threshold ? topStyle : scrolledStyle);
    };
    // 100ms 스로틀 (마지막 이벤트도 놓치지 않도록 trailing 호출)
    const onScroll = () => {
      const remain = 100 - (Date.now() - last);
      if (remain <= 0) {
        apply();
      } else {
        clearTimeout(timer);
        timer = setTimeout(apply, remain);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, topStyle, scrolledStyle, setHeaderStyle]);
}
