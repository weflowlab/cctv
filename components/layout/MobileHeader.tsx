"use client";

/**
 * 모바일 헤더 (≤1023px)
 * - 높이 72px 바: 로고 + (홈에서만) "상담 신청" 버튼 + 햄버거 버튼.
 * - 햄버거 클릭 → 오른쪽에서 서랍(드로어) 메뉴가 밀려 나옴 (화면 폭 약 78%, 최대 340px)
 *   · 나머지 화면은 어둡게 덮음(딤) — 딤 클릭 · X 버튼 · ESC · 메뉴 이동 시 닫힘
 *   · 서랍 구성: [로고 + X] → 메뉴 5개(현재 메뉴는 틸 강조) → 하단 고정 버튼 2개 [전화 상담] [상담 신청하기]
 *   · 열려 있는 동안 배경 스크롤 잠금
 * - 전화번호는 화면에 노출하지 않음 ("전화 상담" 까지만, tel 링크로 바로 연결)
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneIcon } from "@/components/common/contactIcons";
import { SITE } from "@/lib/site";
import { useHeaderStyle } from "./HeaderStyleContext";
import Logo from "./Logo";
import { MENUS, PRIMARY_CTA, isMenuSelected } from "./menus";

/** 체크 클립보드 아이콘 (상담 신청 버튼) */
function FormIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <rect x="9" y="2.5" width="6" height="4" rx="1" />
      <path d="m9 13.5 2.2 2.2L15.5 11.5" />
    </svg>
  );
}

export default function MobileHeader() {
  const { headerStyle } = useHeaderStyle();
  const pathname = usePathname();

  // 서랍 메뉴 열림 여부
  const [isOpen, setIsOpen] = useState(false);

  // 경로 변경 시 메뉴 닫기 (렌더 중 이전 경로와 비교)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  // 열려 있는 동안: 배경 스크롤 잠금 + ESC 로 닫기
  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const isHome = pathname === "/";
  const light = headerStyle === "transparent"; // 어두운 히어로 위 투명 헤더

  return (
    <div className="lg:hidden">
      {/* ===== 상단 바 (고정): 로고 / 상담 신청(홈) / 햄버거 ===== */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center justify-between px-[16px] transition-colors duration-200 ${
          headerStyle === "white" ? "bg-white" : "bg-transparent"
        }`}
      >
        <Logo light={light} />
        <div className="flex items-center gap-[10px]">
          {isHome && (
            <Link
              href={PRIMARY_CTA.href}
              className={`flex h-[32px] items-center justify-center rounded-[8px] px-[16px] text-[14px] font-bold ${
                light ? "bg-white text-brand visited:text-brand" : "bg-brand text-white visited:text-white"
              }`}
            >
              상담 신청
            </Link>
          )}
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-none bg-transparent p-0"
          >
            {/* 햄버거 아이콘 — 투명 헤더(어두운 히어로)에서는 흰색 */}
            <svg width="22" height="20" viewBox="0 0 22 18" fill="none" aria-hidden>
              <g stroke={light ? "#fff" : "#222"} strokeWidth="2.33" strokeLinecap="round">
                <path d="M1.67 2h18.66M1.67 9h18.66M1.67 16h18.66" />
              </g>
            </svg>
          </button>
        </div>
      </header>

      {/* ===== 딤(어두운 배경): 열리면 서서히 나타남, 메뉴 바깥 아무 곳이나 누르면 닫힘 ===== */}
      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[110] cursor-pointer bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ===== 서랍 메뉴: 오른쪽에서 밀려 나옴 (닫혀 있을 땐 포커스·스크린리더에서 제외) ===== */}
      {/* 서랍을 감싸는 화면 크기 틀: 닫혀서 화면 밖(오른쪽)에 있는 서랍 때문에 페이지가 가로로 밀리지 않게 잘라 줌 */}
      <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      <aside
        id="mobile-drawer"
        aria-label="전체 메뉴"
        inert={!isOpen}
        className={`pointer-events-auto absolute inset-y-0 right-0 flex w-[78%] max-w-[340px] flex-col bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 서랍 머리: 로고 + 닫기(X) */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#eee] px-[20px]">
          <Logo />
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-none bg-transparent p-0"
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M4 4l14 14M18 4L4 18" stroke="#222" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 메뉴 5개 (현재 메뉴는 틸 강조) */}
        <nav className="flex-1 overflow-y-auto px-[24px] py-[12px]">
          <ul className="m-0 list-none p-0">
            {Object.entries(MENUS).map(([key, menu]) => {
              const selected = isMenuSelected(key, pathname);
              return (
                <li key={key}>
                  <Link
                    href={menu.href ?? key}
                    onClick={() => setIsOpen(false)}
                    aria-current={selected ? "page" : undefined}
                    className={`flex h-[60px] items-center text-[18px] font-semibold tracking-[-0.5px] ${
                      selected ? "text-point-strong" : "text-[#222]"
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 하단 버튼 2개 (구분선 아래 고정): 전화 상담 / 상담 신청하기 */}
        <div className="flex shrink-0 flex-col gap-[10px] border-t border-[#eee] px-[20px] pb-[calc(24px+env(safe-area-inset-bottom))] pt-[20px]">
          <a
            href={SITE.phoneHref}
            aria-label="전화 상담"
            className="flex h-[52px] items-center justify-center gap-[8px] rounded-[12px] border-[1.5px] border-brand bg-white text-[16px] font-bold text-brand visited:text-brand active:bg-brand-light"
          >
            <PhoneIcon className="h-[20px] w-[20px] fill-brand stroke-brand" />
            전화 상담
          </a>
          <Link
            href={PRIMARY_CTA.href}
            onClick={() => setIsOpen(false)}
            className="flex h-[52px] items-center justify-center gap-[8px] rounded-[12px] border-[1.5px] border-brand bg-brand text-[16px] font-bold text-white visited:text-white active:bg-brand-strong"
          >
            <FormIcon className="h-[20px] w-[20px]" />
            {PRIMARY_CTA.name}
          </Link>
        </div>
      </aside>
      </div>
    </div>
  );
}
