"use client";

/**
 * PC 헤더 (≥1024px)
 * - 고정(fixed) 상단, 높이 80px, 최대폭 1112px(좌우 패딩 16px) 안에 로고 · 메뉴 5개 · 상담 신청하기 버튼.
 * - headerStyle 에 따라 배경(transparent/white)과 메뉴 글자색(#fff / #222)이 0.25s 로 전환된다.
 *   (스크롤에 따른 헤더 변화는 레이아웃에 없음 — 필요한 페이지가 setHeaderStyle 로 직접 전환)
 * - 메뉴 hover/현재 경로: 오렌지 2px 밑줄이 왼쪽 기준 scaleX(0→1) 로 0.3s 애니메이션 (CSS hover 만 사용).
 *   현재 경로 판정은 하위 경로 포함 (/service/rental → "서비스" 선택).
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import { SITE } from "@/lib/site";
import { useHeaderStyle, type HeaderStyle } from "./HeaderStyleContext";
import { MENUS, PRIMARY_CTA, isMenuSelected } from "./menus";

/** 헤더 스타일별 메뉴 글자색 */
const textColor = (s: HeaderStyle) => (s === "transparent" ? "text-white" : "text-[#222]");

export default function DesktopHeader() {
  const { headerStyle } = useHeaderStyle();
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 top-0 z-[100] hidden lg:block">
      {/* ===== 헤더 바: headerStyle 에 따라 배경 투명/흰색 전환 ===== */}
      <header
        className={`h-[80px] w-full transition-[background-color] duration-[250ms] ease-[ease] ${
          headerStyle === "white" ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1112px] items-center justify-between gap-[16px] px-[16px]">
          {/* ===== 로고: 홈으로 이동 ===== */}
          <Link href="/" aria-label={`${SITE.name} 홈`} className="relative flex items-start">
            <Placeholder
              label={`${SITE.name} 로고`}
              className="h-[26px] w-[120px] rounded-[4px]"
              dark={headerStyle === "transparent"}
            />
          </Link>

          {/* ===== 메뉴 5개: hover/선택 시 오렌지 밑줄 ===== */}
          <nav className="inline-flex items-center gap-[56px]">
            {Object.entries(MENUS).map(([key, menu]) => {
              const selected = isMenuSelected(key, pathname);
              return (
                <Link
                  key={key}
                  href={key}
                  aria-current={selected ? "page" : undefined}
                  className={`relative block select-none py-[8px] text-[15px] font-medium leading-[23px] tracking-[-1px] no-underline transition-colors duration-[250ms] ${textColor(
                    headerStyle,
                  )} after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-left after:bg-[#ff5c00] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${
                    selected ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
                >
                  {menu.name}
                </Link>
              );
            })}
          </nav>

          {/* ===== 상담 신청하기 버튼 (→ /contact) ===== */}
          <Link
            href={PRIMARY_CTA.href}
            className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#fff6f1] px-[16px] py-[8px] text-[14px] font-medium text-[#ff5c00] transition-colors duration-300 visited:text-[#ff5c00] hover:bg-[#ffe2d1]"
          >
            {PRIMARY_CTA.name}
          </Link>
        </div>
      </header>
    </div>
  );
}
