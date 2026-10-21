/**
 * 전역 푸터 + 플로팅 상담 버튼
 * - 로고 → 운영 시간(24시간 연중무휴, 네이비 강조) → 상호 / 대표 / 사업자번호 / 주소 / 대표전화 (PC·모바일 모두 한 줄씩)
 *   약관 링크 3개, 카피라이트. 값은 모두 SITE(@/lib/site) 에서 가져온다.
 * - PC·모바일 같은 세로 배치, 모바일(≤1023px)은 글자만 작게.
 * - 서버 컴포넌트. 카피라이트 연도(현재 연도)는 Cache Components 규칙상 "use cache" 로 계산.
 * - app/layout.tsx 를 건드리지 않기 위해 모든 페이지 공통 플로팅 버튼(FloatingContact)도 여기서 렌더.
 */
import Link from "next/link";
import FloatingContact from "@/components/common/FloatingContact";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

/** 카피라이트 연도 — Cache Components 규칙상 현재 시각 읽기는 캐시 함수 안에서만 */
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

/**
 * 제작사 배지 — 위플로우 홈페이지(weflowlab.kr)를 새 창으로 (2026-10-21 요청)
 * - 위치: PC 는 로고와 같은 줄 오른쪽 / 모바일은 카피라이트 아래 왼쪽 (보이는 쪽만 렌더 — className 으로 hidden 제어)
 * - 사이트 톤: 흰 바탕 + 회색 테두리(#c5ccd8), "홈페이지 제작" 진회색 중간 굵기 / "WEFLOW" 네이비 / 아이콘 틸
 * - 호버: 옅은 네이비 배경 + 네이비 테두리, 아이콘이 2시 방향(오른쪽 위)으로 살짝 이동
 */
function MadeByBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://weflowlab.kr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="홈페이지 제작 WEFLOW (새 창에서 열림)"
      className={`group shrink-0 items-center gap-[6px] rounded-full border border-[#c5ccd8] bg-white px-[12px] py-[7px] no-underline transition-colors hover:border-brand hover:bg-brand-light lg:gap-[10px] lg:px-[20px] lg:py-[10px] ${className}`}
    >
      <span className="text-[11px] font-semibold tracking-[-0.2px] text-[#555] lg:text-[14px]">홈페이지 제작</span>
      <span className="text-[12px] font-extrabold tracking-[0.02em] text-brand lg:text-[15px]">WEFLOW</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-[12px] w-[12px] text-point-strong transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] lg:h-[15px] lg:w-[15px]"
      >
        <path d="M14 4h6v6" />
        <path d="M20 4 11 13" />
        <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
      </svg>
    </a>
  );
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <>
      <footer id="footer-main" className="relative border-t border-[#f0f0f0]">
        <div className="mx-auto w-full max-w-[1080px] bg-white px-[16px] py-[38px] lg:px-[20px] lg:pb-[60px] lg:pt-[52px]">
          {/* ===== 로고(왼쪽, 누르면 홈) + 제작사 배지(오른쪽, PC 만) — 같은 줄. 모바일 배지는 카피라이트 아래 오른쪽 ===== */}
          <div className="flex items-center justify-between gap-[12px]">
            <Logo size="footer" />
            <MadeByBadge className="hidden lg:inline-flex" />
          </div>

          {/* ===== 운영 시간 + 회사 정보: PC·모바일 모두 한 줄에 하나씩 ===== */}
          <div className="mt-[20px] flex flex-col gap-[4px] text-[11px] font-normal leading-[1.4] tracking-[-0.3px] text-[#333] lg:mt-[24px] lg:gap-[6px] lg:text-[14px] lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
            {/* 운영 시간: 맨 위, 브랜드 네이비로 강조 */}
            <div className="mb-[4px] text-[13px] font-bold tracking-[-0.3px] text-brand lg:text-[15px]">{SITE.hours}</div>
            <div>상호 : {SITE.legalName}</div>
            <div>대표 : {SITE.ceo}</div>
            <div>사업자 등록번호 : {SITE.bizNumber}</div>
            <div>주소 : {SITE.address}</div>
            <div>
              대표전화 : <a href={SITE.phoneHref}>{SITE.phone}</a>
            </div>
          </div>

          {/* ===== 약관 링크 + 카피라이트 ===== */}
          <div className="mt-[27px]">
            <div className="flex flex-wrap gap-[13px] text-[11px] font-medium leading-[1.4] tracking-[-0.3px] text-[#333] lg:gap-[32px] lg:text-[14px] lg:font-normal lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
              <Link href="/terms/service">
                <span>서비스이용약관</span>
              </Link>
              <Link href="/terms/personal">
                <strong>개인정보처리방침</strong>
              </Link>
              {/* 위치정보 이용약관 링크는 뺌 (2026-10-21) — 사용자 위치를 수집하지 않아 위치정보법상 약관 대상이 아님 */}
            </div>
            <div className="mt-[16px] text-[11px] leading-[1.4] tracking-[-0.22px] text-[#8e9097] lg:mt-[12px] lg:text-[14px] lg:leading-[22px] lg:tracking-[-0.3px] lg:text-[#888]">
              © {year} {SITE.legalName}. All rights Reserved.
            </div>
            {/* 모바일: 제작사 배지를 카피라이트 아래 왼쪽 정렬로 — 푸터 나머지와 같은 정렬 (로고 옆은 좁아서 — 2026-10-21 요청) */}
            <div className="mt-[16px] flex lg:hidden">
              <MadeByBadge className="inline-flex" />
            </div>
          </div>
        </div>
      </footer>

      {/* ===== 플로팅 상담 버튼 (카카오톡 / 전화 / 맨 위로) ===== */}
      <FloatingContact />
    </>
  );
}
