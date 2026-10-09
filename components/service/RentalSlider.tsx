"use client";

/**
 * CCTV 렌탈 패키지 — 카메라 대수별 월 요금 슬라이더 (클라이언트 컴포넌트)
 * - keeper /plan PriceCard 틀: 대수 슬라이더(1~16대, 초기 4대) + 아래 비교 박스
 * - 비교 박스: {SITE.name} 월 요금 / 타사 렌탈 월 요금 / 매월 절약액(차액) — RENTAL_MONTHLY 기준
 * - 대수가 바뀌면 금액 숫자가 0.4초 동안 굴러가듯 바뀜 (AnimatedWon)
 * - 섹션 아래에 견적 계산기 유도 배너 (CalculatorBanner)
 */
import { useState } from "react";
import { SITE } from "@/lib/site";
import AnimatedWon from "./AnimatedWon";
import CalculatorBanner from "./CalculatorBanner";
import CountSlider from "./CountSlider";
import { RENTAL_MONTHLY } from "./data";
import { SectionHeading } from "./ui";

const INITIAL_COUNT = 4;

export default function RentalSlider() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const { ours, other } = RENTAL_MONTHLY[count - 1];

  return (
    <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        <SectionHeading eyebrow="PRICE" title="CCTV 렌탈 패키지" desc="카메라 대수별 월 요금" />

        {/* ===== 슬라이더 카드: 흰 라운드 박스 안에 슬라이더 + 비교 박스 ===== */}
        <div className="mt-[32px] rounded-[14px] bg-white px-[20px] pb-[24px] pt-[30px] lg:mt-[56px] lg:rounded-[20px] lg:px-[232px] lg:pb-[64px] lg:pt-[48px]">
          {/* ===== 대수 슬라이더: −/+ · 드래그로 1~16대 (말풍선 공간만큼 위 여백) ===== */}
          <CountSlider value={count} onChange={setCount} className="mt-[40px] lg:mt-[56px]" />

          {/* ===== 비교 박스: 자사 vs 타사 월 요금 + 매월 절약액 (대수 변경 시 숫자 애니메이션) ===== */}
          <div className="mt-[32px] w-full overflow-hidden rounded-[12px] bg-[rgba(235,238,245,0.9)] lg:mt-[48px]">
            <div className="px-[20px] pb-[20px] pt-[24px] lg:px-[32px] lg:pb-[24px] lg:pt-[28px]">
              <p className="text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-[#222] lg:text-[22px] lg:leading-[34px] lg:tracking-[-0.44px]">
                카메라 <strong className="mx-[2px] text-[#ff5c00]">{count}</strong>대 기준
              </p>
              <dl className="mt-[16px] space-y-[14px] border-t border-[#dedede] pt-[20px] lg:mt-[20px] lg:pt-[24px]">
                <div className="flex items-center justify-between">
                  <dt className="text-[16px] font-medium tracking-[-0.32px] text-[#222] lg:text-[22px] lg:tracking-[-0.44px]">{SITE.name}</dt>
                  <dd className="relative text-[20px] font-bold tracking-[-0.4px] text-[#222] before:absolute before:inset-x-[-2px] before:bottom-[2px] before:h-[12px] before:bg-[#ffd9c2] before:content-[''] lg:text-[26px] lg:tracking-[-0.52px] lg:before:inset-x-[-4px] lg:before:bottom-[2px] lg:before:h-[16px]">
                    <span className="relative">
                      <span className="text-[#666]">월 </span>
                      <AnimatedWon value={ours} />원
                    </span>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[16px] font-medium tracking-[-0.32px] text-[#666] lg:text-[22px] lg:tracking-[-0.44px]">타사 렌탈</dt>
                  <dd className="text-[18px] font-bold tracking-[-0.36px] text-[#999] lg:text-[22px] lg:tracking-[-0.44px]">
                    월 <AnimatedWon value={other} />원
                  </dd>
                </div>
              </dl>
            </div>
            {/* 절약액 강조 띠 */}
            <p className="bg-brand px-[20px] py-[14px] text-center text-[16px] font-bold tracking-[-0.32px] text-white lg:py-[18px] lg:text-[22px] lg:tracking-[-0.44px]">
              매월 <AnimatedWon value={other - ours} />원 절약
            </p>
          </div>
        </div>

        {/* ===== 견적 계산기 유도 배너 → /calculator ===== */}
        <CalculatorBanner className="mt-[24px] lg:mt-[40px]" />
      </div>
    </section>
  );
}
