"use client";

/**
 * 모바일 헤더 (≤1023px) — 원본 layout 청크의 `ee` 컴포넌트 (sc-aa967f83)
 * - 높이 72px 바: 로고 + (홈에서만) "CCTV 구매" 버튼 + 햄버거/X 토글 버튼.
 * - 햄버거 클릭 → 전체화면 흰 메뉴 펼침, html overflow hidden 으로 배경 스크롤 잠금.
 * - 메뉴: 서브메뉴가 있으면 아코디언(화살표 180° 회전, 하나만 열림), 없으면 해당 경로로 이동.
 * - 하단: "견적 계산기"(/calculator) / "서비스 소개서 다운로드" 버튼.
 * - 경로가 바뀌면 메뉴 닫힘 + 아코디언 초기화.
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { useHeaderStyle } from "./HeaderStyleContext";
import { MENUS, openServiceGuide } from "./menus";
import { SubMenuItem } from "./SubMenu";
import TopBanner from "./TopBanner";

type Props = { isBannerVisible: boolean; setIsBannerVisible: (v: boolean) => void };

export default function MobileHeader({ isBannerVisible, setIsBannerVisible }: Props) {
  const { headerStyle } = useHeaderStyle();
  const pathname = usePathname();
  const router = useRouter();

  // isOpen: 전체화면 메뉴 열림 여부 / openKey: 펼쳐진 아코디언 메뉴 키
  const [isOpen, setIsOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  // 경로 변경 시 메뉴 닫기 + 아코디언 초기화 (원본: pathname/searchParams effect)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
    setOpenKey(null);
  }

  // 메뉴가 열려 있는 동안 html 스크롤 잠금
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";
  const isBusiness = pathname.includes("/business");
  // 메뉴가 열리면 바 배경은 항상 흰색
  const barStyle = isOpen ? "white" : headerStyle;

  // 같은 메뉴를 다시 누르면 접힘
  const toggleAccordion = (key: string) => setOpenKey((cur) => (cur === key ? null : key));

  return (
    <div className={`fixed inset-x-0 top-0 z-[100] lg:hidden ${isOpen ? "h-full" : "h-auto"}`}>
      {/* ===== 상단 띠 배너: 원본 기본 숨김 ===== */}
      <TopBanner isVisible={isBannerVisible} setIsVisible={setIsBannerVisible} />

      <header className={`flex w-full flex-col ${isOpen ? "h-full" : "h-[72px]"}`}>
        {/* ===== 상단 바: 로고 / CCTV 구매(홈) / 햄버거 토글 ===== */}
        <div
          className={`z-[100] flex h-[72px] w-full shrink-0 items-center justify-between px-[16px] ${
            barStyle === "white" ? "bg-white" : "bg-transparent"
          }`}
        >
          <Link href="/" className="relative flex items-start">
            <Placeholder label="Keeper" className="h-[26px] w-[94px] rounded-[4px]" dark={barStyle === "transparent"} />
            {isBusiness && (
              <Placeholder label="BUSINESS" className="ml-[8px] mt-[4px] h-[18px] w-[88px] rounded-[4px]" dark={barStyle === "transparent"} />
            )}
          </Link>
          <div className="flex items-center gap-[10px]">
            {isHome && (
              <Link
                href="/plan"
                className="flex h-[32px] items-center justify-center rounded-[8px] bg-[#fff6f1] px-[16px] text-[14px] font-medium text-[#ff5c00] visited:text-[#ff5c00]"
              >
                CCTV 구매
              </Link>
            )}
            <button
              type="button"
              aria-label="네비게이션"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-none bg-transparent p-0"
            >
              {isOpen ? (
                // 닫기(X) 아이콘
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path d="M4 4l14 14M18 4L4 18" stroke="#222" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                // 햄버거 아이콘 — 투명 헤더(어두운 히어로)에서는 흰색
                <svg width="22" height="20" viewBox="0 0 22 18" fill="none" aria-hidden>
                  <g stroke={headerStyle === "transparent" ? "#fff" : "#222"} strokeWidth="2.33" strokeLinecap="round">
                    <path d="M1.67 2h18.66M1.67 9h18.66M1.67 16h18.66" />
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ===== 전체화면 메뉴: 아코디언 + 하단 버튼 ===== */}
        {isOpen && (
          <div className="z-[110] flex-1 overflow-y-auto bg-white">
            <ul className="m-0 list-none p-0">
              {Object.entries(MENUS).map(([key, menu]) => {
                const expanded = openKey === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => (menu.hasSubmenus ? toggleAccordion(key) : router.push(key))}
                      className={`flex h-[62px] w-full items-center justify-between px-[20px] ${
                        expanded ? "border-b-0" : "border-b border-[#eee]"
                      }`}
                    >
                      <span className="text-[16px] font-medium leading-[26px] tracking-[-0.5px] text-[#333]">{menu.name}</span>
                      {menu.hasSubmenus && (
                        // 아코디언 화살표: 펼치면 180° 회전
                        <span
                          className={`inline-flex h-[24px] w-[24px] items-center justify-center transition-transform duration-300 ${
                            expanded ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          <svg width="16" height="10" viewBox="0 0 16 9" fill="none" aria-hidden>
                            <path
                              fill="#999"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                    {expanded && menu.submenus && (
                      <ul className="m-0 list-none border-b border-[#eee] pb-[16px]">
                        {menu.submenus.map((s) => (
                          <li key={s.href}>
                            <SubMenuItem href={s.href} name={s.name} fullWidth />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ===== 하단 버튼: 견적 계산기 / 서비스 소개서 다운로드 ===== */}
            <div className="flex flex-col gap-[10px] px-[20px] pb-[56px] pt-[36px]">
              <button
                type="button"
                onClick={() => router.push("/calculator")}
                className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#fff6f1] px-[16px] pb-[10px] pt-[8px] text-[16px] font-medium text-[#ff5c00] transition-colors duration-300 hover:bg-[#ffe2d1]"
              >
                견적 계산기
              </button>
              <button
                type="button"
                onClick={openServiceGuide}
                className="flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[8px] border border-[rgba(32,32,32,0.2)] bg-white px-[16px] pb-[10px] pt-[8px] text-[16px] font-medium text-[#202020e5] transition-colors duration-300 hover:bg-[#f5f5f5]"
              >
                서비스 소개서 다운로드
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
