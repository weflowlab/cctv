"use client";

/**
 * 상담 버튼 (모든 페이지 공통)
 * - PC: 오른쪽 아래 플로팅 원형 버튼 (60px, 오른쪽 32px · 아래 40px)
 *   세로 배치(위→아래): 전화 상담(tel) / 카카오톡 상담(노란 #FEE500, 새 탭) / 문의하기(/contact).
 *   문의폼이 메인 전환 경로라 맨 아래에 브랜드색으로 강조. 호버 시 버튼 왼쪽에 라벨 툴팁.
 * - 모바일: 플로팅 대신 화면 하단 고정 바 [전화 상담 | 무료 상담 신청(브랜드색)] — 카톡은 PC 플로팅에만
 *   바가 푸터 마지막 줄을 가리지 않도록 같은 높이의 빈 공간을 문서 끝에 둔다.
 * - 눈에 띄게: 전화 → 카톡 → 문의 순서로 차례차례 가볍게 흔들림 반복 (globals.css .fc-shake, 호버 시 멈춤, 모션 최소화 설정 시 생략)
 * - 문의 페이지(/contact)에서는 문의하기 버튼을 숨긴다.
 * - 렌더 위치: app/layout.tsx 수정 금지 규칙 때문에 layout/Footer 에서 렌더한다.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { KakaoIcon, PhoneIcon } from "./contactIcons";

/** 순차 흔들림 시작 지연 — 전화 → 카톡 → 문의 (.fc-shake 주기 5s 안에서 차례로) */
const SHAKE_DELAY = ["0s", "0.7s", "1.4s"];

/** PC 버튼 바깥(링크) — 호버 시 살짝 위로. 흔들리지 않으므로 안의 툴팁은 항상 가로 일직선 */
const btn = "group relative block h-[60px] w-[60px] transition-[translate] duration-200 hover:-translate-y-[2px]";
/** PC 버튼 원(흔들리는 부분) — 배경색은 따로 붙임 */
const face =
  "fc-shake flex h-full w-full items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)]";

/** 호버 툴팁 — 버튼 왼쪽에 검은 말풍선 */
function Tooltip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-[6px] bg-[#222] px-[10px] py-[6px] text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      {children}
    </span>
  );
}

/* ===== 아이콘 (PC 버튼 · 모바일 바 공용, 크기·색은 className 으로) ===== */

/** 체크 클립보드 (문의하기) */
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

export default function FloatingContact() {
  // 문의 페이지에서는 문의하기 버튼 숨김
  const onContactPage = usePathname() === "/contact";

  return (
    <>
      {/* ================= PC: 오른쪽 아래 플로팅 버튼 ================= */}
      <div className="fixed bottom-[40px] right-[32px] z-[90] hidden flex-col items-center gap-[12px] lg:flex">
        {/* 전화 상담: 흰 원 + 브랜드색 수화기 */}
        <a
          href={SITE.phoneHref}
          aria-label="전화 상담"
          className={btn}
        >
          <span className={`${face} border border-[#e5e5e5] bg-white`} style={{ animationDelay: SHAKE_DELAY[0] }}>
            <PhoneIcon className="h-[26px] w-[26px] fill-brand stroke-brand" stroke={2.4} />
          </span>
          <Tooltip>전화 상담</Tooltip>
        </a>

        {/* 카카오톡 상담: 노란 원 + 말풍선 (새 탭) */}
        <a
          href={SITE.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 상담"
          className={btn}
        >
          <span className={`${face} bg-[#FEE500]`} style={{ animationDelay: SHAKE_DELAY[1] }}>
            {/* 말풍선 꼬리 때문에 위로 떠 보여 1px 내림 */}
            <KakaoIcon className="h-[26px] w-[28px] translate-y-[1px]" />
          </span>
          <Tooltip>카카오톡 상담</Tooltip>
        </a>

        {/* 문의하기: 브랜드색 원 + 체크 클립보드 (메인 전환 경로 — 맨 아래 강조) */}
        {!onContactPage && (
          <Link
            href="/contact"
            aria-label="문의하기"
            className={btn}
          >
            <span className={`${face} bg-brand text-white`} style={{ animationDelay: SHAKE_DELAY[2] }}>
              <FormIcon className="h-[30px] w-[30px]" />
            </span>
            <Tooltip>문의하기</Tooltip>
          </Link>
        )}
      </div>

      {/* ================= 모바일: 하단 고정 바 ================= */}
      <nav
        aria-label="빠른 상담"
        className={`fixed inset-x-0 bottom-0 z-[90] grid bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden ${
          onContactPage ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        <a
          href={SITE.phoneHref}
          aria-label="전화 상담"
          className="flex h-[60px] items-center justify-center gap-[6px] text-[15px] font-bold tracking-[-0.3px] text-[#222] active:bg-[#f5f5f5]"
        >
          <span className="fc-shake flex" style={{ animationDelay: SHAKE_DELAY[0] }}>
            <PhoneIcon className="h-[22px] w-[22px] fill-brand stroke-brand" />
          </span>
          전화 상담
        </a>
        {!onContactPage && (
          <Link
            href="/contact"
            className="flex h-[60px] items-center justify-center gap-[6px] bg-brand text-[15px] font-bold tracking-[-0.3px] text-white active:bg-brand-strong"
          >
            <span className="fc-shake flex" style={{ animationDelay: SHAKE_DELAY[1] }}>
              <FormIcon className="h-[24px] w-[24px]" />
            </span>
            무료 상담 신청
          </Link>
        )}
      </nav>
      {/* 하단 바 높이만큼 문서 끝에 빈 공간 — 푸터 마지막 줄이 바에 가리지 않게 */}
      <div aria-hidden className="h-[calc(60px+env(safe-area-inset-bottom))] lg:hidden" />
    </>
  );
}
