/**
 * 공통 하단 상담 CTA 배너 (모든 페이지 맨 아래에 <ConsultCta /> 하나만 배치)
 * - keeper 홈 하단 CTA(components/home/BottomCta) 틀 그대로: 주황(#ff6418) 배경 + 노란빛 radial 오버레이 2개.
 * - 카피 "우리 공간 보안, / 지금 바로 {SITE.name}에 맡기세요." + "상담 신청하기" 버튼(→ /contact) + 보조 전화번호.
 * - 우측(모바일은 하단) 이미지 자리는 Placeholder. keeper 앱스토어 버튼은 제거.
 * - 서버 컴포넌트 (등장 애니메이션만 클라이언트 Reveal 사용).
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

export default function ConsultCta() {
  return (
    // ===== 하단 CTA: 주황 배경 =====
    <div className="relative flex w-full justify-center overflow-hidden bg-[#ff6418] px-[16px] pb-0 pt-[60px] lg:px-0 lg:py-[150px]">
      <section className="relative flex w-full max-w-[1080px] flex-col items-center gap-[40px] pb-0 lg:block lg:pb-0">
        {/* 장식 오버레이 1: 좌상단 큰 노란 radial */}
        <div className="absolute left-[-100px] top-[-342px] z-0 h-[564px] w-[564px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,240,188,0.5)_0%,rgba(255,240,188,0)_100%)] opacity-60 lg:left-[-880px] lg:top-[-860px] lg:h-[1436px] lg:w-[1436px]" />
        {/* 장식 오버레이 2: 우측 원 (PC 전용) */}
        <div className="absolute right-[-180px] top-0 z-0 hidden h-[801px] w-[801px] rounded-full bg-[linear-gradient(180deg,rgba(255,219,198,0.2)_0%,rgba(255,219,198,0)_50.06%)] opacity-[0.24] lg:block" />

        {/* ===== 카피 + 상담 신청하기 버튼 + 전화번호: 스크롤 진입 시 slide-in-up ===== */}
        <div className="relative z-[1] flex w-full flex-col items-center gap-[24px] text-center lg:items-start lg:text-left">
          <Reveal
            as="h3"
            threshold={0.1}
            className="text-[28px] font-bold leading-[1.4] tracking-[-0.28px] text-[#ffef9e] lg:text-[42px] lg:leading-[1.38] lg:tracking-[-0.42px]"
          >
            우리 공간 보안,
            <br />
            <b className="text-white">지금 바로 {SITE.name}에 맡기세요.</b>
          </Reveal>
          <Reveal threshold={0.1} className="flex flex-col items-center gap-[14px] lg:items-start">
            <Link
              href="/contact"
              className="flex w-fit items-center justify-center gap-[4px] rounded-[48px] bg-white py-[12.615px] pl-[19.712px] pr-[17.346px] text-center text-[14px] font-medium leading-[1.2] tracking-[-0.36px] text-black visited:text-black lg:h-[56px] lg:gap-[8px] lg:py-0 lg:pl-[24px] lg:pr-[22px] lg:text-[18px] lg:font-bold lg:text-[#222]"
            >
              <span>상담 신청하기</span>
              {/* 오른쪽 화살표 */}
              <svg className="h-[10px] w-[10px] lg:h-[14px] lg:w-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {/* 보조: 전화 상담 */}
            <a
              href={SITE.phoneHref}
              className="text-[14px] font-medium tracking-[-0.3px] text-white/90 no-underline visited:text-white/90 lg:text-[16px]"
            >
              전화 상담 <strong className="font-bold text-white">{SITE.phone}</strong>
            </a>
          </Reveal>
        </div>

        {/* ===== 이미지 자리 (PC 우측 / 모바일 하단) ===== */}
        <div className="z-0 w-full max-w-[375px] lg:max-w-none">
          <Placeholder
            label="CCTV 설치·상담 이미지 (TODO: 원본 이미지 선정)"
            dark
            className="relative bottom-0 aspect-[375/300] w-full lg:absolute lg:bottom-[-151px] lg:right-0 lg:aspect-auto lg:h-[460px] lg:w-[463px]"
          />
        </div>
      </section>
    </div>
  );
}
