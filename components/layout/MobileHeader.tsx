"use client";

/**
 * 모바일 헤더 (≤1023px)
 * - 높이 72px 바: 로고 + (홈에서만) "상담 신청" 버튼 + 햄버거/X 토글 버튼.
 * - 햄버거 클릭 → 전체화면 흰 메뉴 펼침, html overflow hidden 으로 배경 스크롤 잠금.
 * - 메뉴 5개는 단순 링크(현재 메뉴는 브랜드색 글자). 하단: "상담 신청하기"(/contact) / "전화 상담"(tel).
 * - 경로가 바뀌면 메뉴 닫힘.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { useHeaderStyle } from "./HeaderStyleContext";
import Logo from "./Logo";
import { MENUS, PRIMARY_CTA, isMenuSelected } from "./menus";

export default function MobileHeader() {
  const { headerStyle } = useHeaderStyle();
  const pathname = usePathname();

  // 전체화면 메뉴 열림 여부
  const [isOpen, setIsOpen] = useState(false);

  // 경로 변경 시 메뉴 닫기 (렌더 중 이전 경로와 비교)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  // 메뉴가 열려 있는 동안 html 스크롤 잠금
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";
  // 메뉴가 열리면 바 배경은 항상 흰색
  const barStyle = isOpen ? "white" : headerStyle;

  return (
    <div className={`fixed inset-x-0 top-0 z-[100] lg:hidden ${isOpen ? "h-full" : "h-auto"}`}>
      <header className={`flex w-full flex-col ${isOpen ? "h-full" : "h-[72px]"}`}>
        {/* ===== 상단 바: 로고 / 상담 신청(홈) / 햄버거 토글 ===== */}
        <div
          className={`z-[100] flex h-[72px] w-full shrink-0 items-center justify-between px-[16px] ${
            barStyle === "white" ? "bg-white" : "bg-transparent"
          }`}
        >
          <Logo light={barStyle === "transparent"} />
          <div className="flex items-center gap-[10px]">
            {isHome && !isOpen && (
              <Link
                href={PRIMARY_CTA.href}
                className="flex h-[32px] items-center justify-center rounded-[8px] bg-brand-light px-[16px] text-[14px] font-medium text-point-strong visited:text-point-strong"
              >
                상담 신청
              </Link>
            )}
            <button
              type="button"
              aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isOpen}
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

        {/* ===== 전체화면 메뉴: 링크 5개 + 하단 버튼 ===== */}
        {isOpen && (
          <div className="z-[110] flex-1 overflow-y-auto bg-white">
            <ul className="m-0 list-none p-0">
              {Object.entries(MENUS).map(([key, menu]) => {
                const selected = isMenuSelected(key, pathname);
                return (
                  <li key={key}>
                    <Link
                      href={menu.href ?? key}
                      onClick={() => setIsOpen(false)}
                      aria-current={selected ? "page" : undefined}
                      className="flex h-[62px] w-full items-center justify-between border-b border-[#eee] px-[20px]"
                    >
                      <span
                        className={`text-[18px] font-medium leading-[28px] tracking-[-0.5px] ${
                          selected ? "text-point-strong" : "text-[#333]"
                        }`}
                      >
                        {menu.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ===== 하단 버튼: 상담 신청하기 / 전화 상담 ===== */}
            <div className="flex flex-col gap-[10px] px-[20px] pb-[56px] pt-[36px]">
              <Link
                href={PRIMARY_CTA.href}
                onClick={() => setIsOpen(false)}
                className="flex h-[48px] w-full items-center justify-center rounded-[8px] bg-brand-light px-[16px] pb-[10px] pt-[8px] text-[16px] font-medium text-point-strong transition-colors duration-300 visited:text-point-strong hover:bg-point-light"
              >
                {PRIMARY_CTA.name}
              </Link>
              <a
                href={SITE.phoneHref}
                className="flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[rgba(32,32,32,0.2)] bg-white px-[16px] pb-[10px] pt-[8px] text-[16px] font-medium text-[#202020e5] transition-colors duration-300 hover:bg-[#f5f5f5]"
              >
                전화 상담 {SITE.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
