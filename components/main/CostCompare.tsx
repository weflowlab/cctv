/**
 * 홈 비용 비교 섹션 — keeper /security "기존 CCTV 렌탈비의 단 60% 비용으로" 자리
 * - 레이아웃: 전체 폭 흰 배경 / PC 2단 [왼쪽: 칩 + 제목 + 설명 + 렌탈 자세히 보기] [오른쪽: 비교 카드]
 *   모바일은 문구 → 카드 → 버튼 순으로 세로 배치.
 * - 비교 카드는 렌탈 탭과 같은 RentalCompareCard (대수 슬라이더 + 자사/타사 월 요금 + 매월 절약액, RENTAL_MONTHLY 기준)
 * - 서버 컴포넌트 (카드만 클라이언트)
 */
import Reveal from "@/components/common/Reveal";
import RentalCompareCard from "@/components/service/RentalCompareCard";
import { HomeMoreLink } from "./HomeSection";

export default function CostCompare() {
  return (
    // ===== 렌탈 비용 비교: 전체 폭 흰 배경 =====
    <section className="w-full bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-[32px] lg:flex-row lg:items-center lg:justify-between lg:gap-[64px]">
        {/* ===== 왼쪽: 문구 + 버튼 (PC 전용 버튼 위치) ===== */}
        <Reveal animation="slide-in-left" className="flex flex-col items-center text-center lg:w-[420px] lg:shrink-0 lg:items-start lg:text-left">
          <strong className="rounded-[100px] bg-brand-light px-[12px] py-[8px] text-[13px] font-medium text-point-strong lg:px-[16px] lg:text-[16px]">
            렌탈 비용 비교
          </strong>
          <h2 className="mt-[16px] break-keep text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:mt-[20px] lg:text-[42px] lg:leading-[58px] lg:tracking-[-1px]">
            같은 대수,
            <br />
            <strong className="text-point-strong">매달 내는 돈</strong>부터
            <br />
            다릅니다
          </h2>
          <p className="mt-[16px] break-keep text-[15px] leading-[1.6] tracking-[-0.3px] text-sub lg:mt-[20px] lg:text-[18px]">
            필요한 카메라 대수를 움직여
            <br />
            타사 렌탈과 월 요금을 직접 비교해 보세요.
          </p>
          <div className="mt-[32px] hidden lg:block">
            <HomeMoreLink href="/service/rental">렌탈 자세히 보기</HomeMoreLink>
          </div>
        </Reveal>

        {/* ===== 오른쪽: 비교 카드 (슬라이더 + 자사/타사 월 요금) ===== */}
        <Reveal
          animation="slide-in-right"
          className="w-full rounded-[20px] border border-[#e8ecf2] bg-white px-[20px] pb-[24px] pt-[8px] shadow-[0_12px_40px_rgba(10,45,91,0.08)] lg:max-w-[560px] lg:px-[40px] lg:pb-[40px] lg:pt-[16px]"
        >
          <RentalCompareCard />
        </Reveal>

        {/* ===== 모바일 전용 버튼 (카드 아래) ===== */}
        <div className="flex justify-center lg:hidden">
          <HomeMoreLink href="/service/rental">렌탈 자세히 보기</HomeMoreLink>
        </div>
      </div>
    </section>
  );
}
