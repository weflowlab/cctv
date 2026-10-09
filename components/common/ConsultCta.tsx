/**
 * 하단 상담 CTA 배너 — 페이지마다 그 페이지 내용에 맞는 문구로 (모든 페이지 맨 아래에 하나만 배치)
 * - 딥네이비 배경 + 틸 빛 radial 오버레이 2개, 사진 없이 카피·버튼만 가운데 정렬.
 * - props (없으면 홈 기본 문구):
 *   lead   : 첫 줄 (연한 틸)       — 예: "우리 공간 보안,"
 *   title  : 둘째 줄 (흰색 굵게)   — 예: "지금 바로 {SITE.name}에 맡기세요."
 *   href   : 버튼 주소 (기본 /contact). `/contact?service=as` 처럼 서비스를 넘기면 상담폼에서 해당 칩이 미리 선택됨
 * - 버튼 2개 나란히 (문구는 전 페이지 공통): [상담 신청 >](흰색, href) [전화 상담 >](테두리, SITE.phoneHref)
 *   모바일은 세로로 쌓임.
 * - 서버 컴포넌트 (등장 애니메이션만 클라이언트 Reveal 사용).
 */
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

export type ConsultCtaProps = {
  lead?: ReactNode;
  title?: ReactNode;
  href?: string;
};

export default function ConsultCta({
  lead = "우리 공간 보안,",
  title = `지금 바로 ${SITE.name}에 맡기세요.`,
  href = "/contact",
}: ConsultCtaProps) {
  return (
    // ===== 하단 CTA: 딥네이비 배경 =====
    <div className="relative flex w-full justify-center overflow-hidden bg-brand px-[16px] py-[72px] lg:px-0 lg:py-[120px]">
      <section className="relative flex w-full max-w-[1080px] flex-col items-center">
        {/* 장식 오버레이 1: 좌상단 큰 틸 radial */}
        <div className="absolute left-[-100px] top-[-342px] z-0 h-[564px] w-[564px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,167,171,0.55)_0%,rgba(0,167,171,0)_100%)] opacity-60 lg:left-[-880px] lg:top-[-860px] lg:h-[1436px] lg:w-[1436px]" />
        {/* 장식 오버레이 2: 우측 원 (PC 전용) */}
        <div className="absolute right-[-180px] top-0 z-0 hidden h-[801px] w-[801px] rounded-full bg-[linear-gradient(180deg,rgba(183,190,199,0.35)_0%,rgba(183,190,199,0)_50.06%)] opacity-[0.24] lg:block" />

        {/* ===== 카피 + 버튼 + 전화번호 (가운데 정렬): 스크롤 진입 시 slide-in-up ===== */}
        <div className="relative z-[1] flex w-full flex-col items-center gap-[24px] text-center lg:gap-[32px]">
          <Reveal
            as="h3"
            threshold={0.1}
            className="break-keep text-[26px] font-bold leading-[1.4] tracking-[-0.28px] text-[#7fe0e2] lg:text-[42px] lg:leading-[1.38] lg:tracking-[-0.42px]"
          >
            {lead}
            <br />
            <b className="text-white">{title}</b>
          </Reveal>
          {/* ===== 버튼 2개: 상담 신청(주) + 전화 걸기(보조) — PC 가로 / 모바일 세로 ===== */}
          <Reveal threshold={0.1} className="flex w-full flex-col items-center justify-center gap-[10px] sm:w-auto sm:flex-row lg:gap-[12px]">
            <Link
              href={href}
              className="flex h-[48px] w-full max-w-[280px] items-center justify-center gap-[6px] rounded-[48px] bg-white px-[24px] text-[15px] font-bold tracking-[-0.3px] text-[#222] visited:text-[#222] transition-colors hover:bg-point-light sm:w-auto lg:h-[56px] lg:px-[28px] lg:text-[18px]"
            >
              <span>상담 신청</span>
              {/* 오른쪽 화살표 */}
              <svg className="h-[12px] w-[12px] lg:h-[14px] lg:w-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={SITE.phoneHref}
              aria-label={`전화 상담 ${SITE.phone}`}
              className="flex h-[48px] w-full max-w-[280px] items-center justify-center gap-[6px] rounded-[48px] border border-white/60 px-[24px] text-[15px] font-bold tracking-[-0.3px] text-white visited:text-white transition-colors hover:bg-white/10 sm:w-auto lg:h-[56px] lg:px-[28px] lg:text-[18px]"
            >
              <span>전화 상담</span>
              <svg className="h-[12px] w-[12px] lg:h-[14px] lg:w-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
