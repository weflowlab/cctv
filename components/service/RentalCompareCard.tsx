"use client";

/**
 * 렌탈 월 요금 비교 카드 (클라이언트 컴포넌트) — 렌탈 탭(RentalSlider)과 홈(CostCompare) 공용
 * - 대수 슬라이더(1~16대, 초기 4대) + 비교 박스: {SITE.name} 월 요금 / 타사 렌탈 월 요금 / 매월 절약액
 * - 금액은 RENTAL_MONTHLY 기준, 대수가 바뀌면 숫자가 0.4초 동안 굴러가듯 바뀜 (AnimatedWon)
 * - 타사 줄은 모든 대수에서 보여 준다 (불리한 구간만 숨기면 "숨긴다"는 인상을 준다 — 2026-10-19).
 *   대신 두 줄 모두 아래에 "36개월 후"를 붙여 구조 차이를 보여 준다: 자사 = 36개월 납부 후 종료·소유권 이전 / 타사 = 계속 납부.
 *   취소선은 자사가 더 쌀 때만. 아래 띠 문구는 절약액에 따라 셋 중 하나:
 *   · 더 쌈(3~12대)   : 매월 N원 절약, 36개월 뒤엔 내 것
 *   · 같음(1·2대)     : 월 요금은 같아도, 36개월 뒤엔 장비가 내 것
 *   · 더 비쌈(13대~)  : 36개월만 내고 끝, 37개월째부터는 매월 타사 요금만큼 절약
 * - 바깥 배경·여백은 쓰는 쪽에서 정함 (이 컴포넌트는 내용만)
 */
import { useState } from "react";
import { SITE } from "@/lib/site";
import AnimatedWon from "./AnimatedWon";
import CountSlider from "./CountSlider";
import { RENTAL_MONTHLY, rentalSaving } from "./data";

const INITIAL_COUNT = 4;

export default function RentalCompareCard({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(INITIAL_COUNT);
  const { ours, other } = RENTAL_MONTHLY[count - 1];
  const saving = rentalSaving(count);
  const cheaper = ours < other;

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
          <dl className="mt-[16px] space-y-[16px] border-t border-[#dedede] pt-[20px] lg:mt-[18px] lg:pt-[22px]">
            {/* 자사: 월 요금 + "36개월 납부 후 종료 · 소유권 이전" */}
            <div className="flex items-start justify-between gap-[12px]">
              <dt className="pt-[2px] text-[16px] font-medium tracking-[-0.32px] text-[#222] lg:text-[20px] lg:tracking-[-0.4px]">{SITE.name}</dt>
              <dd className="text-right">
                <span className="relative inline-block text-[20px] font-bold tracking-[-0.4px] text-[#222] before:absolute before:inset-x-[-2px] before:bottom-[2px] before:h-[12px] before:bg-point/30 before:content-[''] lg:text-[24px] lg:tracking-[-0.48px] lg:before:inset-x-[-4px] lg:before:h-[14px]">
                  <span className="relative">
                    <span className="text-[#666]">월 </span>
                    <AnimatedWon value={ours} />원
                  </span>
                </span>
                <span className="mt-[4px] block text-[12px] font-bold tracking-[-0.24px] text-point-strong lg:text-[14px]">
                  36개월 납부 후 종료 · 소유권 이전
                </span>
              </dd>
            </div>
            {/* 타사: 월 요금(자사가 쌀 때만 취소선) + "36개월 후에도 계속 납부" */}
            <div className="flex items-start justify-between gap-[12px]">
              <dt className="pt-[2px] text-[16px] font-medium tracking-[-0.32px] text-[#666] lg:text-[20px] lg:tracking-[-0.4px]">타사 렌탈</dt>
              <dd className="text-right">
                <span
                  className={`text-[18px] font-bold tracking-[-0.36px] text-[#999] lg:text-[20px] lg:tracking-[-0.4px] ${
                    cheaper ? "line-through decoration-[#bbb]" : ""
                  }`}
                >
                  월 <AnimatedWon value={other} />원
                </span>
                <span className="mt-[4px] block text-[12px] tracking-[-0.24px] text-[#999] lg:text-[14px]">36개월 후에도 계속 납부</span>
              </dd>
            </div>
          </dl>
        </div>
        {/* 강조 띠 — 절약액에 따라 문구가 바뀐다 (주석 참고) */}
        <p className="bg-brand px-[20px] py-[14px] text-center text-[16px] font-bold tracking-[-0.32px] text-white lg:py-[16px] lg:text-[20px] lg:tracking-[-0.4px]">
          {cheaper ? (
            <>
              매월 <span className="text-point"><AnimatedWon value={saving} />원</span> 절약, 36개월 뒤엔 내 것
            </>
          ) : ours === other ? (
            <>
              월 요금은 같아도, <span className="text-point">36개월</span> 뒤엔 장비가 내 것
            </>
          ) : (
            <>
              <span className="text-point">36개월</span>만 내고 끝, 그 뒤엔 매월 <span className="text-point"><AnimatedWon value={other} />원</span> 절약
            </>
          )}
        </p>
      </div>
    </div>
  );
}
