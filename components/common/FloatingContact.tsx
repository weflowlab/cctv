"use client";

/**
 * 플로팅 상담 버튼 (모든 페이지 오른쪽 아래 고정)
 * - 세로 배치: [맨 위로(스크롤 300px 이후에만)] / 카카오톡 상담(노란 #FEE500, 새 탭) / 전화 상담(tel).
 * - PC: 60px 원형, 오른쪽 32px · 아래 40px / 모바일: 52px 원형, 오른쪽 16px · 아래 20px.
 *   (푸터 위에 떠 있어도 내용을 크게 가리지 않도록 모서리에 붙이고 크기를 작게 유지)
 * - 호버 시 버튼 왼쪽에 라벨 툴팁 표시 (터치 기기에서는 aria-label 로 대체).
 * - 렌더 위치: app/layout.tsx 수정 금지 규칙 때문에 layout/Footer 에서 렌더한다.
 */
import { useEffect, useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";

/** "맨 위로" 버튼이 나타나는 스크롤 위치(px) */
const SHOW_TOP_AFTER = 300;

/** 원형 버튼 공통 스타일 */
const circle =
  "group relative flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-[transform,opacity] duration-200 hover:-translate-y-[2px] lg:h-[60px] lg:w-[60px]";

/** 호버 툴팁 — 버튼 왼쪽에 검은 말풍선 */
function Tooltip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-[6px] bg-[#222] px-[10px] py-[6px] text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
      {children}
    </span>
  );
}

export default function FloatingContact() {
  // 스크롤이 SHOW_TOP_AFTER 를 넘었는지 → "맨 위로" 버튼 노출
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_TOP_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-[20px] right-[16px] z-[90] flex flex-col items-center gap-[10px] lg:bottom-[40px] lg:right-[32px] lg:gap-[12px]">
      {/* ===== 맨 위로: 스크롤 300px 이후 페이드인, 클릭 시 부드럽게 최상단 이동 ===== */}
      <button
        type="button"
        aria-label="맨 위로"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${circle} border border-[#e5e5e5] bg-white ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 16V4M4.5 9.5 10 4l5.5 5.5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Tooltip>맨 위로</Tooltip>
      </button>

      {/* ===== 카카오톡 상담: 노란 원 + 말풍선 TALK (새 탭) ===== */}
      <a
        href={SITE.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        className={`${circle} bg-[#FEE500]`}
      >
        <span className="flex flex-col items-center">
          <svg className="h-[22px] w-[24px] lg:h-[26px] lg:w-[28px]" viewBox="0 0 28 26" aria-hidden>
            <path
              fill="#3C1E1E"
              d="M14 1C6.82 1 1 5.6 1 11.27c0 3.66 2.43 6.87 6.09 8.69l-1.24 4.55c-.11.4.35.72.7.49l5.43-3.6c.66.09 1.33.14 2.02.14 7.18 0 13-4.6 13-10.27S21.18 1 14 1"
            />
            <text x="14" y="14" textAnchor="middle" fontSize="7" fontWeight="800" fill="#FEE500" fontFamily="Arial, sans-serif">
              TALK
            </text>
          </svg>
        </span>
        <Tooltip>카카오톡 상담</Tooltip>
      </a>

      {/* ===== 전화 상담: 오렌지 원 + 수화기 아이콘 ===== */}
      <a href={SITE.phoneHref} aria-label={`전화 상담 ${SITE.phone}`} className={`${circle} bg-[#ff5c00]`}>
        <svg className="h-[22px] w-[22px] lg:h-[26px] lg:w-[26px]" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#fff"
            d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"
          />
        </svg>
        <Tooltip>전화 상담 {SITE.phone}</Tooltip>
      </a>
    </div>
  );
}
