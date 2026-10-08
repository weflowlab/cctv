"use client";

/**
 * 가이드북 다운로드 신청 페이지용 헤더 스크롤 연동 (원본 useHeaderScroll 훅, 4360 모듈)
 * - 원본: useHeaderScroll(100, "transparent-black") → scrollY < 100 이면 투명+검은 글자, 이후 흰 헤더
 * - scroll 이벤트는 100ms throttle(passive), 마운트 직후 1회 즉시 판정
 * - 렌더링 결과물 없음 (null)
 */
import { useEffect } from "react";
import { useHeaderStyle, type HeaderStyle } from "@/components/layout/HeaderStyleContext";

type Props = {
  threshold?: number;
  topStyle?: HeaderStyle;
  scrolledStyle?: HeaderStyle;
};

export default function HeaderScrollStyle({
  threshold = 100,
  topStyle = "transparent-black",
  scrolledStyle = "white",
}: Props) {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    // 현재 스크롤 위치로 헤더 스타일 결정
    const apply = () => setHeaderStyle(window.scrollY < threshold ? topStyle : scrolledStyle);

    // 100ms throttle (lodash throttle 과 같이 leading + trailing 실행)
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      const now = Date.now();
      const remaining = 100 - (now - last);
      if (remaining <= 0) {
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
    apply();
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, topStyle, scrolledStyle, setHeaderStyle]);

  return null;
}
