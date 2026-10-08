"use client";

/**
 * 전역 헤더 (원본 layout 청크의 `eb` 컴포넌트)
 * - 원본은 기기 타입(isDesktop)에 따라 PC/모바일 헤더 중 하나만 렌더하지만,
 *   여기서는 SSR 일관성을 위해 둘 다 렌더하고 CSS(lg:)로 1024px 기준 전환한다.
 * - 상단 띠 배너 표시 상태(isBannerVisible)는 여기서 보관 — 원본처럼 기본 false.
 * - 원본 규칙: /download 및 일부 랜딩(LAYOUT_HIDDEN_PATHS)에서는 헤더를 렌더하지 않음.
 */
import { usePathname } from "next/navigation";
import { useState } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { isLayoutHidden } from "./menus";

export default function Header() {
  const pathname = usePathname();
  // 상단 배너 노출 여부 (원본: useState(!1) — 기본 숨김)
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  if (isLayoutHidden(pathname)) return null;

  return (
    <>
      {/* ===== PC 헤더 (≥1024px) ===== */}
      <DesktopHeader isBannerVisible={isBannerVisible} setIsBannerVisible={setIsBannerVisible} />
      {/* ===== 모바일 헤더 (≤1023px) ===== */}
      <MobileHeader isBannerVisible={isBannerVisible} setIsBannerVisible={setIsBannerVisible} />
    </>
  );
}
