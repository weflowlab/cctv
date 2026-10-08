/**
 * /plan — 구매(가격 안내) 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/plan
 * - 구성: 상단 타이틀 → 가격 안내 카드(수량 슬라이더·가격 비교·혜택·구매 버튼, 클라이언트)
 *         → 블로그 슬라이더 섹션(클라이언트)
 * - 헤더: 흰 배경(white) — 경로별 기본값
 */
import type { Metadata } from "next";
import BlogSection from "@/components/plan/BlogSection";
import PriceCard from "@/components/plan/PriceCard";

export const metadata: Metadata = {
  title: "키퍼 CCTV 가격 안내 | 대당 36만원, 무약정",
  description: "약정·위약금 없는 투명한 CCTV 가격. 렌탈 대비 최대 40% 절감, 설치비 무료, 3년 무상 A/S",
};

export default function PlanPage() {
  return (
    <>
      {/* ===== 가격 정책 섹션: 타이틀 + 가격 안내 카드 ===== */}
      <section className="mx-auto flex w-full flex-col items-center px-[16px] py-[20px] lg:w-[1080px] lg:px-0 lg:pb-[180px] lg:pt-[100px]">
        <h1 className="text-center text-[24px] font-bold leading-[32px] tracking-[-0.2px] text-[#202020] lg:text-[40px] lg:leading-[56px] lg:tracking-[-1px]">
          약정 없는 투명한
          {/* PC 공백 / 모바일 줄바꿈 (원본 spaceOrBreak) */}
          <span className="hidden lg:inline"> </span>
          <br className="lg:hidden" />
          CCTV 가격 정책
          <br />
          <strong className="text-[#ff5c00]">
            키퍼 앱에서 최대 40%
            <span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />
            저렴하게 구매하세요.
          </strong>
        </h1>
        <PriceCard />
      </section>

      {/* ===== 블로그 섹션: 매장 관리 노하우 슬라이더(PC) / 목록(모바일) ===== */}
      <BlogSection />
    </>
  );
}
