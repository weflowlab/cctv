/**
 * /about — 회사소개 페이지 (서버 컴포넌트)
 * - 상단 스토리텔링(브랜드 스토리 → 브랜드 철학 → 마무리)은 keeper /story 레이아웃 + 회사소개 스토리 카피
 * - 강점·수상·지사 원본 내용: https://kkcctv.co.kr AS(강점) / 홈(수상·지사)
 * - 헤더: 흰 배경(white) — 경로별 기본값으로 처리됨
 * - 섹션 구현은 components/about/AboutSections.tsx, 맨 아래는 공통 상담 CTA 배너
 */
import type { Metadata } from "next";
import {
  AwardSection,
  BranchesSection,
  ClosingSection,
  OrgChartSection,
  PhilosophySection,
  StorySection,
  StrengthsSection,
} from "@/components/about/AboutSections";
import ConsultCta from "@/components/common/ConsultCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `회사소개 | ${SITE.name}`,
  description: `${SITE.slogan} — 설치부터 수리까지 현장에 꼭 맞는 CCTV 솔루션, ${SITE.name}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full flex-col items-center text-center">
      {/* ===== 섹션1 브랜드 스토리: Why 유니텍CCTV? 문제 제기 → 하나로 묶기로 함 → 만든 이유 / 문단 순차 등장 ===== */}
      <StorySection />
      {/* ===== 섹션2 브랜드 철학: Unite Technology·Responsibility·with You 3카드 / 지그재그, 순차 등장 ===== */}
      <PhilosophySection />
      {/* ===== 섹션3 마무리: 현장을 지키는 사람들 + 그리고 우리는 믿습니다 ===== */}
      <ClosingSection />
      {/* ===== 섹션4 강점 9가지: 카드 그리드, 순차 등장 ===== */}
      <StrengthsSection />
      {/* ===== 섹션5 한국브랜드 선호도 3년 연속 1위 (LEGACY 숨김) ===== */}
      <AwardSection />
      {/* ===== 섹션6 조직도 (숨김) ===== */}
      <OrgChartSection />
      {/* ===== 섹션7 전국 지사 요약: 본사 + 6개 지사 (LEGACY 숨김) ===== */}
      <BranchesSection />
      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
