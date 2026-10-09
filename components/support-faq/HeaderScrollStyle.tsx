"use client";

/**
 * 스크롤 위치에 따라 헤더 스타일을 바꾸는 훅 컴포넌트 (원본 useHeaderScroll 훅 4360 모듈)
 * - 원본 동작: window.scrollY < threshold 이면 topStyle, 그 이상이면 scrolledStyle.
 *   scroll 이벤트는 100ms throttle, 마운트 직후 1회 즉시 실행.
 * - /faq : (100, "transparent" → "white"), /contact : (100, "transparent-black" → "white")
 * - keeper components/faq/HeaderScrollStyle 복사본 (keeper 폴더 삭제 대비)
 * - 렌더링 결과물은 없음 (null 반환)
 */
import { useEffect } from "react";
import { useHeaderStyle, type HeaderStyle } from "@/components/layout/HeaderStyleContext";

type Props = {
  /** 이 값(px)보다 덜 스크롤되었으면 topStyle */
  threshold?: number;
  topStyle?: HeaderStyle;
  scrolledStyle?: HeaderStyle;
};

export default function HeaderScrollStyle({
  threshold = 100,
  topStyle = "transparent",
  scrolledStyle = "white",
}: Props) {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    // 이 컴포넌트가 붙은 페이지 경로 (마운트 시점에 고정) — 페이지를 떠난 뒤 늦게 도착한 요청은 무시됨
    const ownerPath = window.location.pathname;
    // 스크롤 위치 판정 → 헤더 스타일 반영
    const apply = () => setHeaderStyle(window.scrollY < threshold ? topStyle : scrolledStyle, ownerPath);

    // 원본 lodash throttle(100ms) 대응: 마지막 이벤트도 놓치지 않도록 trailing 호출 포함
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

    window.addEventListener("scroll", onScroll, { passive: true });
    apply(); // 마운트 시 1회 즉시 적용

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold, topStyle, scrolledStyle, setHeaderStyle]);

  return null;
}
