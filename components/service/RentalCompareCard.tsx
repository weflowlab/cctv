"use client";

/**
 * 렌탈 월 요금 비교 카드 (클라이언트 컴포넌트) — 렌탈 탭(RentalSlider)과 홈(CostCompare) 공용
 * - 대수 슬라이더(1~16대, 초기 4대) + 비교 박스: {SITE.name} 월 요금 / 타사 렌탈 월 요금 / 매월 절약액
 * - 금액은 RENTAL_MONTHLY 기준, 대수가 바뀌면 숫자가 0.4초 동안 굴러가듯 바뀜 (AnimatedWon)
 * - 바깥 배경·여백은 쓰는 쪽에서 정함 (이 컴포넌트는 내용만)
 */
import { useState } from "react";
import { SITE } from "@/lib/site";
import AnimatedWon from "./AnimatedWon";
import CountSlider from "./CountSlider";
import { RENTAL_MONTHLY } from "./data";

const INITIAL_COUNT = 4;

export default function RentalCompareCard({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(INITIAL_COUNT);
  const { ours, other } = RENTAL_MONTHLY[count - 1];

  return (
    <div className={className}>
      {/* ===== 대수 슬라이더: −/+ · 드래그로 1~16대 (말풍선 공간만큼 위 여백) ===== */}
      <CountSlider value={count} onChange={setCount} className="mt-[40px] lg:mt-[56px]" />

      {/* ===== 비교 박스: 자사 vs 타사 월 요금 + 매월 절약액 ===== */}
      <div className="mt-[32px] w-full overflow-hidden rounded-[12px] bg-[rgba(235,238,245,0.9)] lg:mt-[40px]">
        <div className="px-[20px] pb-[20px] pt-[24px] lg:px-[28px] lg:pb-[24px] lg:pt-[26px]">
          <p className="text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-[#222] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
            카메라 <strong className="mx-[2px] text-point-strong">{count}</strong>대 기준
          </p>
          <dl className="mt-[16px] space-y-[14px] border-t border-[#dedede] pt-[20px] lg:mt-[18px] lg:pt-[22px]">
            <div className="flex items-center justify-between">
              <dt className="text-[16px] font-medium tracking-[-0.32px] text-[#222] lg:text-[20px] lg:tracking-[-0.4px]">{SITE.name}</dt>
              <dd className="relative text-[20px] font-bold tracking-[-0.4px] text-[#222] before:absolute before:inset-x-[-2px] before:bottom-[2px] before:h-[12px] before:bg-point/30 before:content-[''] lg:text-[24px] lg:tracking-[-0.48px] lg:before:inset-x-[-4px] lg:before:h-[14px]">
                <span className="relative">
                  <span className="text-[#666]">월 </span>
                  <AnimatedWon value={ours} />원
                </span>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[16px] font-medium tracking-[-0.32px] text-[#666] lg:text-[20px] lg:tracking-[-0.4px]">타사 렌탈</dt>
              <dd className="text-[18px] font-bold tracking-[-0.36px] text-[#999] line-through decoration-[#bbb] lg:text-[20px] lg:tracking-[-0.4px]">
                월 <AnimatedWon value={other} />원
              </dd>
            </div>
          </dl>
        </div>
        {/* 절약액 강조 띠 */}
        <p className="bg-brand px-[20px] py-[14px] text-center text-[16px] font-bold tracking-[-0.32px] text-white lg:py-[16px] lg:text-[20px] lg:tracking-[-0.4px]">
          매월 <span className="text-point"><AnimatedWon value={other - ours} />원</span> 절약
        </p>
      </div>
    </div>
  );
}
