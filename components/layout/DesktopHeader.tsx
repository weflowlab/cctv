"use client";

/**
 * PC 헤더 (≥1024px) — 원본 layout 청크의 `N` 컴포넌트 (sc-3f3b407f / sc-e1ce1654)
 * - 고정(fixed) 상단, 높이 80px, 최대폭 1112px(좌우 패딩 16px) 안에 로고 · 메뉴 7개 · 소개서 버튼.
 * - headerStyle 에 따라 배경(transparent/white)과 메뉴 글자색(#fff / #222)이 0.25s 로 전환된다.
 *   (스크롤에 따른 헤더 변화는 레이아웃에 없음 — 필요한 페이지가 setHeaderStyle 로 직접 전환)
 * - 메뉴 hover/현재 경로: 오렌지 2px 밑줄이 왼쪽 기준 scaleX(0→1) 로 0.3s 애니메이션.
 * - 서브메뉴가 있는 메뉴는 hover 시 드롭다운. 마우스가 빠지면 200ms 뒤에 닫힘(그 사이 드롭다운에 진입하면 유지).
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { useHeaderStyle, type HeaderStyle } from "./HeaderStyleContext";
import { MENUS, isMenuSelected, openServiceGuide } from "./menus";
import { SubMenuDropdown } from "./SubMenu";
import TopBanner from "./TopBanner";

/** 헤더 스타일별 메뉴 글자색 (원본 w 함수) */
const textColor = (s: HeaderStyle) => (s === "transparent" ? "text-white" : "text-[#222]");

type Props = { isBannerVisible: boolean; setIsBannerVisible: (v: boolean) => void };

export default function DesktopHeader({ isBannerVisible, setIsBannerVisible }: Props) {
  const { headerStyle } = useHeaderStyle();
  const pathname = usePathname();

  // isHovering: 마우스가 메뉴(또는 드롭다운) 위에 있는지
  // hoverKey: 현재 hover 표시 중인 메뉴 키 — isHovering 이 꺼진 뒤 200ms 후에 지워짐(닫힘 지연)
  const [isHovering, setIsHovering] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | undefined>(undefined);
  // 경로 변경 시 hover 상태 초기화 (원본: pathname effect) — 렌더 중 비교 방식으로 처리
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsHovering(false);
    setHoverKey(undefined);
  }

  // hover 가 끝나면 200ms 지연 후 서브메뉴/밑줄 hover 해제
  useEffect(() => {
    if (isHovering) return;
    const t = setTimeout(() => setHoverKey(undefined), 200);
    return () => clearTimeout(t);
  }, [isHovering]);

  const handleEnter = (key: string) => {
    setHoverKey(key);
    setIsHovering(true);
  };
  const handleLeave = () => setIsHovering(false);

  const isBusiness = pathname.includes("/business");

  return (
    <div className="fixed inset-x-0 top-0 z-[100] hidden lg:block">
      {/* ===== 상단 띠 배너: 원본 기본 숨김 (TopBanner 참고) ===== */}
      <TopBanner isVisible={isBannerVisible} setIsVisible={setIsBannerVisible} />

      {/* ===== 헤더 바: headerStyle 에 따라 배경 투명/흰색 전환 ===== */}
      <header
        className={`h-[80px] w-full transition-[background-color] duration-[250ms] ease-[ease] ${
          headerStyle === "white" ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1112px] items-center justify-between gap-[16px] px-[16px]">
          {/* ===== 로고: Keeper (제휴문의 페이지에서는 BUSINESS 로고 추가) ===== */}
          <Link href="/" className="relative flex items-start">
            <Placeholder label="Keeper" className="h-[26px] w-[94px] rounded-[4px]" dark={headerStyle === "transparent"} />
            {isBusiness && (
              <Placeholder label="BUSINESS" className="ml-[8px] mt-[4px] h-[18px] w-[88px] rounded-[4px]" dark={headerStyle === "transparent"} />
            )}
          </Link>

          {/* ===== 메뉴 7개: hover 밑줄 + 서브메뉴 드롭다운 ===== */}
          <nav className="inline-flex items-center gap-[56px]">
            {Object.entries(MENUS).map(([key, menu]) => {
              const selected = isMenuSelected(key, menu, pathname);
              const hovered = hoverKey === key;
              // 서브메뉴가 있는 메뉴는 첫 번째 서브메뉴로 이동 (원본 동작)
              const href = menu.hasSubmenus ? menu.submenus?.[0].href ?? "" : key;
              return (
                <div key={key} className="relative" onMouseEnter={() => handleEnter(key)} onMouseLeave={handleLeave}>
                  <Link
                    href={href}
                    className={`relative block select-none py-[8px] text-[15px] font-medium leading-[23px] tracking-[-1px] no-underline transition-colors duration-[250ms] ${textColor(
                      headerStyle,
                    )} after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-left after:bg-[#ff5c00] after:transition-transform after:duration-300 after:content-[''] ${
                      hovered || selected ? "after:scale-x-100" : "after:scale-x-0"
                    }`}
                  >
                    {menu.name}
                  </Link>
                  {hovered && menu.hasSubmenus && menu.submenus && (
                    <SubMenuDropdown
                      submenus={menu.submenus}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={handleLeave}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* ===== 서비스소개서 다운로드 버튼 (새 창으로 /download/guide) ===== */}
          <button
            type="button"
            onClick={openServiceGuide}
            className="flex h-[42px] cursor-pointer items-center justify-center rounded-[8px] bg-[#fff6f1] px-[16px] py-[8px] text-[14px] font-medium text-[#ff5c00]"
          >
            서비스소개서 다운로드
          </button>
        </div>
      </header>
    </div>
  );
}
