"use client";

/**
 * CCTV 렌탈 패키지 — 카메라 대수별 월 요금 슬라이더 (클라이언트 컴포넌트)
 * - keeper /plan PriceCard 틀: 회색 섹션 + 흰 카드 안에 RentalCompareCard(대수 슬라이더 + 자사/타사 비교 박스)
 * - 섹션 아래에 견적 계산기 유도 배너 (CalculatorBanner)
 */
import CalculatorBanner from "./CalculatorBanner";
import RentalCompareCard from "./RentalCompareCard";
import { SectionHeading } from "./ui";

export default function RentalSlider() {
  return (
    <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        <SectionHeading eyebrow="PRICE" title="CCTV 렌탈 패키지" desc="카메라 대수별 월 요금" />

        {/* ===== 슬라이더 카드: 흰 라운드 박스 안에 대수 슬라이더 + 비교 박스 (RentalCompareCard 공용) ===== */}
        <div className="mt-[32px] rounded-[14px] bg-white px-[20px] pb-[24px] pt-[30px] lg:mt-[56px] lg:rounded-[20px] lg:px-[232px] lg:pb-[64px] lg:pt-[48px]">
          <RentalCompareCard />
        </div>

        {/* ===== 견적 계산기 유도 배너 → /calculator ===== */}
        <CalculatorBanner className="mt-[24px] lg:mt-[40px]" />

      </div>
    </section>
  );
}
