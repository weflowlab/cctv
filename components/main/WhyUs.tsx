/**
 * 홈 "왜 {SITE.name}인가" 섹션 — 회사소개 브랜드 철학 3가지 요약
 * - 데이터: components/about/philosophy.tsx PHILOSOPHY (회사소개 PhilosophySection 과 공유) 의 keyword·highlight·summary.
 * - 카드: 네이비 띠(Unite + 틸 키워드) + 한글 소제목 + 요약 문장. PC 3열 / 모바일 1열, 순차 slide-in-up.
 * - 하단 [회사소개 보기 → /about].
 */
import Reveal from "@/components/common/Reveal";
import { PHILOSOPHY } from "@/components/about/philosophy";
import { SITE } from "@/lib/site";
import { HomeMoreLink, HomeSectionHeader } from "./HomeSection";

export default function WhyUs() {
  return (
    // ===== 왜 {SITE.name}인가: 흰 배경 =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더: 이름 뜻(UNITECH = Unite + Technology) ===== */}
        <HomeSectionHeader
          chip={`왜 ${SITE.name}인가`}
          title={
            <>
              흩어진 장비와 책임을
              <br />
              <strong>하나로</strong> 묶었습니다
            </>
          }
          desc="UNITECH는 Unite(하나로)와 Technology(기술)를 합친 이름입니다."
          className="mb-[40px] lg:mb-[60px]"
        />

        {/* ===== 철학 카드 3개 ===== */}
        <ul className="grid w-full grid-cols-1 gap-[16px] lg:grid-cols-3 lg:gap-[24px]">
          {PHILOSOPHY.map((item, i) => (
            <Reveal
              as="li"
              key={item.keyword}
              delay={i * 120}
              threshold={0.1}
              className="flex flex-col overflow-hidden rounded-[16px] border border-[#ececec] bg-white lg:rounded-[20px]"
            >
              {/* 네이비 띠: Unite + 키워드(틸) */}
              <p className="bg-brand px-[24px] py-[20px] text-[20px] font-bold text-white lg:px-[32px] lg:py-[28px] lg:text-[26px]">
                Unite <span className="text-point">{item.keyword}</span>
              </p>
              <div className="flex flex-1 flex-col px-[24px] pb-[28px] pt-[20px] lg:px-[32px] lg:pb-[36px] lg:pt-[28px]">
                <h3 className="text-[18px] font-bold leading-[1.4] text-[#222] lg:text-[22px]">
                  <span className="text-point-strong">{item.highlight}</span>
                  {item.titleRest}
                </h3>
                <p className="mt-[8px] break-keep text-[14px] leading-[1.6] tracking-[-0.28px] text-sub lg:mt-[12px] lg:text-[16px]">
                  {item.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-[32px] lg:mt-[56px]">
          <HomeMoreLink href="/about">회사소개 보기</HomeMoreLink>
        </div>
      </div>
    </section>
  );
}
