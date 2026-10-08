"use client";

/**
 * 창업가이드 페이지 공통: 스크롤 위치에 따른 헤더 스타일 전환
 * - 원본 useHeaderScroll(100) 훅 재현:
 *   scrollY < threshold 이면 "transparent"(어두운 히어로 위 흰 글자), 넘으면 "white" 헤더.
 * - scroll 이벤트는 원본처럼 100ms throttle 로 처리하고, 마운트 직후 1회 즉시 판정한다.
 * - 화면에 아무것도 그리지 않는 컴포넌트라 서버 컴포넌트 page.tsx 안에 그대로 넣어 쓴다.
 */
import { useEffect } from "react";
import { useHeaderStyle } from "@/components/layout/HeaderStyleContext";

type Props = {
  /** 헤더를 흰색으로 바꾸는 스크롤 기준(px) — 원본 100 */
  threshold?: number;
};

export default function HeaderScrollSync({ threshold = 100 }: Props) {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    // 현재 스크롤 위치로 헤더 스타일 결정
    const apply = () => setHeaderStyle(window.scrollY < threshold ? "transparent" : "white");

    // 100ms throttle (leading + trailing) — 원본 lodash throttle(…, 100) 대응
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      const now = Date.now();
      const remain = 100 - (now - last);
      if (remain <= 0) {
        last = now;
        apply();
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          apply();
        }, remain);
      }
    };

    apply(); // 진입 즉시 1회 판정
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, setHeaderStyle]);

  return null;
}
