/**
 * 매장보안 페이지 (/security) — keeper.ceo/security 클론
 * - 원본 섹션 순서 그대로 블록을 세로로 쌓는다 (section1 ~ section30, 원본에 section8/24 id 는 없음)
 * - 헤더: 스크롤 100px 미만이면 "transparent-black", 이상이면 "white" (HeaderScrollStyle)
 * - 인터랙션: 상담 폼(유효성/자동 하이픈/성공 팝업), 직원관리 탭(스텝 자동 진행), 버튼 hover/active
 */
import type { Metadata } from "next";
import HeaderScrollStyle from "@/components/security/HeaderScrollStyle";
import ConsultForm from "@/components/security/ConsultForm";
import { AloneSection, HeroSection, IncidentSection, OverviewSection, PriceSection, ReviewsSection, TrialCtaSection } from "@/components/security/IntroSections";
import { BrandSection, CareSection, PartnerSection, RatingSection, SpecSection } from "@/components/security/AppSections";
import {
  Chapter01,
  Chapter02,
  Chapter03,
  Chapter04,
  Chapter05,
  Chapter06,
  ClaritySection,
  CyberSecuritySection,
  DurabilitySection,
  EmployeeSection,
  ServiceSection,
  StorageSection,
} from "@/components/security/ChapterSections";
import { CompanionSection, ContactCtaSection, FaqSection, OrderGuideSection } from "@/components/security/ClosingSections";

export const metadata: Metadata = {
  title: "키퍼 매장보안 | 400만 화소 매장 전용 CCTV",
  description: "400만 화소 QHD, 야간 30M 모니터링, 4주 이상 연속 녹화. 한화비전 기술로 완성한 매장 보안",
};

export default function SecurityPage() {
  return (
    <div className="relative w-full min-w-[360px]">
      {/* 스크롤 위치에 따른 헤더 스타일 전환 (렌더링 없음) */}
      <HeaderScrollStyle />

      {/* ===== 도입부: 히어로 → 6가지 POINT → 리뷰/통계 → 체험 CTA → 사고 말풍선 → 렌탈 문제점 → 가격 ===== */}
      <HeroSection />
      <OverviewSection />
      <ReviewsSection />
      <TrialCtaSection />
      <IncidentSection />
      <AloneSection />
      <PriceSection />

      {/* ===== 빠른 상담 폼 (원본 section7 과 section9 사이) ===== */}
      <ConsultForm />

      {/* ===== 앱/서비스 소개: 동행 파트너 → 케어 3가지 → 평점 → 스펙 → 글로벌 기술력 ===== */}
      <PartnerSection />
      <CareSection />
      <RatingSection />
      <SpecSection />
      <BrandSection />

      {/* ===== CHAPTER 01~06 ===== */}
      <Chapter01 />
      <ClaritySection />
      <Chapter02 />
      <StorageSection />
      <Chapter03 />
      <CyberSecuritySection />
      <Chapter04 />
      <DurabilitySection />
      <Chapter05 />
      <EmployeeSection />
      <Chapter06 />
      <ServiceSection />

      {/* ===== 마무리: 동행 메시지 → FAQ BEST 7 → 주문 안내 → 구매문의 CTA ===== */}
      <CompanionSection />
      <FaqSection />
      <OrderGuideSection />
      <ContactCtaSection />
    </div>
  );
}
