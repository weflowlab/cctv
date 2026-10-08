/**
 * /about — 회사소개 페이지 (서버 컴포넌트)
 * - 원본 내용: https://kkcctv.co.kr 회사소개 / AS(강점) / 홈(수상·지사)
 * - 헤더: 흰 배경(white) — 경로별 기본값으로 처리됨
 * - 섹션 구현은 components/about/AboutSections.tsx, 맨 아래는 공통 상담 CTA 배너
 */
import type { Metadata } from "next";
import {
  AwardSection,
  BranchesSection,
  GreetingSection,
  OrgChartSection,
  StrengthsSection,
} from "@/components/about/AboutSections";
import ConsultCta from "@/components/common/ConsultCta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `회사소개 | ${SITE.name}`,
  description: `대한민국 CCTV 1등 브랜드, 보안 솔루션 전문 기업 ${SITE.name} — 전국 인프라로 빠른 설치와 AS`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full flex-col items-center text-center">
      {/* ===== 섹션1 회사 소개: 인사말 전문 ===== */}
      <GreetingSection />
      {/* ===== 섹션2 강점 9가지: 카드 그리드, 순차 등장 ===== */}
      <StrengthsSection />
      {/* ===== 섹션3 한국브랜드 선호도 3년 연속 1위 ===== */}
      <AwardSection />
      {/* ===== 섹션4 조직도 ===== */}
      <OrgChartSection />
      {/* ===== 섹션5 전국 지사 요약: 본사 + 6개 지사 ===== */}
      <BranchesSection />
      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
