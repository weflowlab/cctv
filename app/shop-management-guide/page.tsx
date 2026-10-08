/**
 * /shop-management-guide — 매장운영 시스템 가이드 무료 다운로드 랜딩 (창업가이드 메뉴)
 * - 구성: 히어로 → 알바 이탈 사이클 → 자가진단 체크리스트(인터랙션) → PART 카드 → STEP 4단계 → 추천 대상 → 최종 CTA
 * - 헤더: 스크롤 100px 전에는 투명(흰 글자), 이후 흰 배경 (원본 useHeaderScroll(100))
 * - 다운로드 버튼은 /contact/shop-management 신청 페이지로 이동 (원본 동작)
 */
import type { Metadata } from "next";
import HeaderScrollSync from "@/components/guides/shared/HeaderScrollSync";
import Checklist from "@/components/guides/shop-management/Checklist";
import { Parts, Steps } from "@/components/guides/shop-management/Guide";
import { Cycle, Hero } from "@/components/guides/shop-management/Intro";
import { FinalCta, Recommend } from "@/components/guides/shop-management/Outro";

export const metadata: Metadata = {
  title: "매장운영 시스템 가이드 | 무료 다운로드",
  description: "알바관리에 지친 사장님을 위한 매장운영 시스템 가이드를 무료로 다운로드하세요.",
};

export default function ShopManagementGuidePage() {
  return (
    <div className="relative w-full min-w-[360px]">
      {/* 스크롤 위치에 따라 헤더 투명/흰색 전환 */}
      <HeaderScrollSync threshold={100} />

      {/* ===== 히어로: 가이드북 소개 + 무료 다운로드 ===== */}
      <Hero />
      {/* ===== 알바 이탈 사이클 (ROOT CAUSE) ===== */}
      <Cycle />
      {/* ===== 자가진단 체크리스트 (클릭 토글 → 결과 변화) ===== */}
      <Checklist />
      {/* ===== 가이드북 PART 01~03 ===== */}
      <Parts />
      {/* ===== 구조 개선 STEP 01~04 ===== */}
      <Steps />
      {/* ===== 추천 대상 ===== */}
      <Recommend />
      {/* ===== 최종 다운로드 CTA ===== */}
      <FinalCta />
    </div>
  );
}
