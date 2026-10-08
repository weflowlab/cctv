/**
 * 전역 헤더
 * - PC/모바일 헤더를 둘 다 렌더하고 CSS(lg:)로 1024px 기준 전환한다 (SSR 일관성).
 */
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <>
      {/* ===== PC 헤더 (≥1024px) ===== */}
      <DesktopHeader />
      {/* ===== 모바일 헤더 (≤1023px) ===== */}
      <MobileHeader />
    </>
  );
}
