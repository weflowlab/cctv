/**
 * /2026-trend-report — 2026 매장 트렌드 리포트 무료 다운로드 랜딩 (창업가이드 메뉴)
 * - Vol.1(카카오 채널 추가 후 다운로드) + Vol.2(/contact/2026-trend-report 신청) 두 리포트를 한 페이지에 소개.
 * - 헤더: 스크롤 100px 전에는 투명(흰 글자), 이후 흰 배경 (원본 useHeaderScroll(100))
 * - 히어로를 헤더 밑까지 끌어올리기 위해 최상위 래퍼에 음수 margin-top 적용.
 */
import type { Metadata } from "next";
import HeaderScrollSync from "@/components/guides/shared/HeaderScrollSync";
import Recommend from "@/components/guides/trend-report/Recommend";
import { Cheer, FinalCta } from "@/components/guides/trend-report/Outro";
import Vol1Contents from "@/components/guides/trend-report/Vol1Contents";
import { Vol1Hero, Vol1Problem, Vol1Quality } from "@/components/guides/trend-report/Vol1Intro";
import Vol2Contents from "@/components/guides/trend-report/Vol2Contents";
import { Vol2Expiry, Vol2Hero, Vol2Timeline } from "@/components/guides/trend-report/Vol2Intro";

export const metadata: Metadata = {
  title: "2026 매장 트렌드 리포트 | 무료 다운로드",
  description: "최신 무인 매장 트렌드 및 인건비 절감 자동화 전략 E-book",
};

export default function TrendReportPage() {
  return (
    <div className="relative -mt-[var(--header-height-mobile)] w-full min-w-[360px] lg:-mt-[var(--header-height)]">
      {/* 스크롤 위치에 따라 헤더 투명/흰색 전환 */}
      <HeaderScrollSync threshold={100} />

      {/* ===== Vol.1 리포트 영역 (white-space: pre-wrap 컨테이너) ===== */}
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col whitespace-pre-wrap">
          {/* ===== Vol.1 히어로: 카카오 채널 추가 CTA ===== */}
          <Vol1Hero />
          {/* ===== 문제 제기: 폐업률 게이지 ===== */}
          <Vol1Problem />
          {/* ===== 정보의 질 ===== */}
          <Vol1Quality />
          {/* ===== Vol.1 콘텐츠 소개 ===== */}
          <Vol1Contents />
          {/* ===== Vol.1 추천 대상 ===== */}
          <Recommend
            title={
              <>
                {"이런 분들에게 \n"}
                <strong className="text-[#ff5c00]">강력 추천</strong>합니다!
              </>
            }
            items={[
              { alt: "icon1", title: "상권 고민 중인 예비 사장님", desc: "아이템은 정했지만 어느 동네에서\n시작할지 고민인 분" },
              { alt: "icon2", title: "폐업률이 궁금한 분", desc: "프랜차이즈 상담 전, 해당 업종의\n진짜 폐업률을 알고 싶은 분" },
              { alt: "icon3", title: "스마트한 창업자", desc: "데이터를 기반으로 객관적인\n사업 계획을 세우고 싶은 분" },
            ]}
          />
        </div>
      </div>

      {/* ===== Vol.2 히어로 (#report2) ===== */}
      <Vol2Hero />
      {/* ===== 매장 생존율 타임라인 ===== */}
      <Vol2Timeline />
      {/* ===== 상권의 유통기한 ===== */}
      <Vol2Expiry />
      {/* ===== Vol.2 콘텐츠 소개 ===== */}
      <Vol2Contents />
      {/* ===== Vol.2 추천 대상 ===== */}
      <Recommend
        title={
          <>
            {"이런 분들은 \n"}
            <strong className="text-[#ff5c00]">꼭 읽어보세요!</strong>
          </>
        }
        items={[
          { alt: "icon1", title: "꾸준한 수익을 원하는 분", desc: "오픈 초기 반짝 인기가 아니라 5년 이상\n꾸준한 수익을 원하는 분" },
          { alt: "icon2", title: "업종 변경·확장 고민 중", desc: "업종 변경을 고민 중이거나\n매장 확장을 계획 중인 사장님" },
          { alt: "icon3", title: "리스크 관리가 중요한 분", desc: "상권의 쇠퇴 징후를 미리 파악하여\n리스크를 관리하고 싶은 분" },
        ]}
      />
      {/* ===== 응원 메시지 ===== */}
      <Cheer />
      {/* ===== 최종 다운로드 CTA ===== */}
      <FinalCta />
    </div>
  );
}
