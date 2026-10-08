"use client";

/**
 * 헤더 스타일 스크롤 전환기 (화면에 아무것도 그리지 않음)
 * - 원본 useHeaderScroll(100, "transparent-black"):
 *   scrollY < 100 이면 "transparent-black"(투명 배경 + 검은 글자), 그 이상이면 "white".
 * - 원본처럼 100ms throttle 로 scroll 이벤트를 처리하고, 마운트 시 1회 즉시 판정.
 */
import { useEffect } from "react";
import { useHeaderStyle } from "@/components/layout/HeaderStyleContext";

const THRESHOLD = 100;
const THROTTLE_MS = 100;

export default function HeaderScrollSwitcher() {
  const { setHeaderStyle } = useHeaderStyle();

  useEffect(() => {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 현재 스크롤 위치로 헤더 스타일 결정
    const apply = () => {
      last = Date.now();
      setHeaderStyle(window.scrollY < THRESHOLD ? "transparent-black" : "white");
    };

    // throttle: 100ms 에 한 번만 실행, 마지막 이벤트는 trailing 으로 보장
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

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setHeaderStyle]);

  return null;
}
