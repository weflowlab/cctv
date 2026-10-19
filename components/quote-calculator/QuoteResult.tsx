"use client";

/**
 * 견적 계산기 결과 화면 (클라이언트 컴포넌트)
 * - 추천 대수(고정) 표시 + 선택 요약 → 견적 카드 → 맨 아래 [다시 계산하기]
 * - 대수 조정 슬라이더(CountSlider, 1~16, 초기값 = 추천 대수) → 아래 가격 카드 금액이 즉시 재계산(숫자 애니메이션)
 * - 가격 카드 2개
 *   · 렌탈: RENTAL_MONTHLY 자사 월 요금 + 타사 대비 매월 절약액
 *   · 일시납 설치: INSTALL_PRICES[화소][설치환경] 1~4대 가격(부가세 별도), 5대 이상은 별도 견적 안내
 *   · 각 카드의 [이 견적으로 상담 신청] → /contact?service=<rental|install>&count=N&place=<slug>&res=<200|500>
 */
import Link from "next/link";
import { useState } from "react";
import AnimatedWon from "@/components/service/AnimatedWon";
import CountSlider from "@/components/service/CountSlider";
import {
  CAMERA_NAME,
  INSTALL_PRICES,
  RENTAL_MONTHLY,
  type Placement,
  type Resolution,
} from "@/components/service/data";
import type { PlaceSlug } from "@/lib/site";
import { MAX_COUNT, MIN_COUNT, QUESTIONS, answerLabel, buildContactHref, type QuoteData } from "./data";

type Props = {
  /** 모든 STEP 이 선택된 상태 */
  data: QuoteData;
  recommended: number;
  onReset: () => void;
};

const cardCls = "flex flex-col rounded-[12px] bg-white px-[20px] pb-[20px] pt-[24px] lg:px-[32px] lg:pb-[28px] lg:pt-[32px]";
const tagCls = "w-fit rounded-[4px] px-[8px] py-[2px] text-[13px] font-bold tracking-[-0.26px] lg:text-[15px]";
const priceCls = "mt-[16px] text-[30px] font-bold leading-[1.3] tracking-[-0.6px] text-[#222] lg:text-[38px] lg:tracking-[-0.8px]";
const unitCls = "text-[18px] font-medium text-[#666] lg:text-[22px]";
const btnCls =
  "mt-[20px] flex h-[52px] items-center justify-center rounded-[8px] text-[16px] font-bold tracking-[-0.32px] transition-colors lg:h-[60px] lg:text-[18px]";

export default function QuoteResult({ data, recommended, onReset }: Props) {
  const [count, setCount] = useState(recommended);

  const place = data.place as PlaceSlug;
  const resolution = data.resolution as Resolution;
  const placement = data.placement as Placement;

  const rental = RENTAL_MONTHLY[count - 1];
  const installPrice = INSTALL_PRICES[resolution][placement][count - 1]; // 5대 이상은 undefined
  const query = { count, place, resolution, placement };

  return (
    <div className="bg-brand-light px-[16px] pb-[100px] pt-[40px] lg:px-0 lg:pb-[132px] lg:pt-[88px]">
      <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        {/* ===== 결과 타이틀: 추천 대수 ===== */}
        <header className="text-center opacity-0 [animation:slideInUp_0.6s_ease-out_forwards]">
          <p className="text-[16px] font-bold leading-[28px] tracking-[-0.5px] text-point-strong lg:text-[20px]">견적 계산 결과</p>
          <h1 className="mt-[6px] text-[26px] font-bold leading-[36px] tracking-[-1px] text-[#222] lg:text-[42px] lg:leading-[56px]">
            {answerLabel("place", place)}에 맞는
            <br />
            <strong className="text-point-strong">추천 CCTV {recommended}대</strong>
          </h1>
          <p className="mt-[8px] text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[12px] lg:text-[20px] lg:leading-[30px]">
            출입구부터 추가 공간까지, 사각지대 없이 계산했어요
          </p>
        </header>

        {/* ===== 선택 요약: 모바일 3 x 2 칸 / PC 한 줄 칩 ===== */}
        <div className="mt-[28px] flex flex-col items-center gap-[12px] lg:mt-[40px]">
          <ul className="grid w-full grid-cols-3 gap-[6px] lg:flex lg:w-auto lg:flex-wrap lg:justify-center lg:gap-[8px]">
            {QUESTIONS.map((q) => (
              <li
                key={q.key}
                className="flex flex-col items-center justify-center rounded-[12px] bg-white px-[6px] py-[8px] text-center text-[12px] leading-[1.35] tracking-[-0.26px] text-[#666] lg:block lg:rounded-[100px] lg:px-[16px] lg:py-[6px] lg:text-[15px]"
              >
                {/* 모바일: 항목명 위 · 선택값 아래 2줄 / PC: 한 줄 */}
                {q.short} <strong className="font-bold text-[#222] max-lg:text-[13px]">{answerLabel(q.key, data[q.key])}</strong>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== 견적 카드: 대수 조정 슬라이더 + 렌탈 / 일시납 가격 ===== */}
        <div className="mt-[28px] rounded-[14px] bg-white/60 px-[16px] pb-0 pt-[24px] lg:mt-[40px] lg:rounded-[20px] lg:px-[48px] lg:pb-[48px] lg:pt-[40px]">
          {/* 대수 조정: 드래그·−/+ 로 1~16대, 금액 즉시 재계산 */}
          <p className="text-center text-[15px] font-medium tracking-[-0.3px] text-[#333] lg:text-[18px]">
            대수를 직접 조정해 보세요 <span className="font-normal text-[#888]">(추천 {recommended}대)</span>
          </p>
          <div className="mx-auto w-full lg:w-[616px]">
            <CountSlider value={count} onChange={setCount} min={MIN_COUNT} max={MAX_COUNT} className="mt-[52px] lg:mt-[64px]" />
          </div>

          <div className="mt-[28px] grid grid-cols-1 gap-[12px] lg:mt-[40px] lg:grid-cols-2 lg:gap-[16px]">
            {/* ===== 렌탈 카드: 월 요금 + 타사 대비 절약액 ===== */}
            <section className={cardCls}>
              <p className={`${tagCls} bg-brand text-white`}>렌탈</p>
              <p className="mt-[8px] text-[14px] tracking-[-0.28px] text-[#888] lg:text-[16px]">설치비·가입비·보증료 면제</p>
              <p className={priceCls}>
                <span className={unitCls}>월 </span>
                <AnimatedWon value={rental.ours} />
                <span className={unitCls}>원</span>
              </p>
              <p className="mt-[8px] w-fit rounded-[40px] bg-brand-light px-[12px] py-[4px] text-[13px] font-bold tracking-[-0.26px] text-point-strong lg:text-[15px]">
                {/* 타사보다 싸지 않은 대수는 절약 대신 소유권 안내 */}
                {rental.other > rental.ours ? (
                  <>
                    타사 렌탈 대비 매월 <AnimatedWon value={rental.other - rental.ours} />원 절약
                  </>
                ) : (
                  "36개월 납부 후 장비가 내 것이 됩니다"
                )}
              </p>
              <div className="flex-1" />
              <Link href={buildContactHref({ ...query, service: "rental" })} className={`${btnCls} bg-brand text-white hover:bg-brand-strong`}>
                이 견적으로 상담 신청
              </Link>
            </section>

            {/* ===== 일시납 설치 카드: 1~4대 패키지 가격 / 5대 이상 별도 견적 ===== */}
            <section className={cardCls}>
              <p className={`${tagCls} bg-[#222] text-white`}>일시납 설치</p>
              <p className="mt-[8px] text-[14px] tracking-[-0.28px] text-[#888] lg:text-[16px]">
                {answerLabel("resolution", resolution)} {CAMERA_NAME[placement]} 패키지 기준
              </p>
              {installPrice !== undefined ? (
                <>
                  <p className={priceCls}>
                    <AnimatedWon value={installPrice} />
                    <span className={unitCls}>원</span>
                  </p>
                  <p className="mt-[8px] text-[13px] tracking-[-0.26px] text-[#888] lg:text-[15px]">부가세 별도 · 기본 자재 포함 · 기계 무상 AS 1년</p>
                </>
              ) : (
                <p className="mt-[16px] text-[20px] font-bold leading-[1.45] tracking-[-0.4px] text-[#222] lg:text-[24px]">
                  5대 이상은 현장 확인 후
                  <br />
                  별도 견적으로 안내해 드려요
                </p>
              )}
              <div className="flex-1" />
              <Link
                href={buildContactHref({ ...query, service: "install" })}
                className={`${btnCls} bg-brand-light text-point-strong hover:bg-brand hover:text-white`}
              >
                이 견적으로 상담 신청
              </Link>
            </section>
          </div>

          {/* ===== 다시 계산하기: 견적 카드 아래 가운데 — 모바일은 버튼 위아래 20px 동일(감싼 박스 아래 여백 0), PC 위 36px · 박스 아래 48px ===== */}
          <button
            type="button"
            onClick={onReset}
            className="mx-auto flex cursor-pointer py-[20px] lg:py-0 items-center gap-[4px] text-[14px] font-medium tracking-[-0.28px] text-[#888] underline underline-offset-[3px] hover:text-point-strong lg:mt-[36px] lg:text-[16px]"
          >
            다시 계산하기
          </button>
        </div>
      </div>
    </div>
  );
}
