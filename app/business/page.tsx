/**
 * /business — B2B 제휴 및 대량 도입 문의 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/business
 * - 헤더: 처음엔 투명(흰 글자), 스크롤 100px 이후 흰 배경 — BusinessHero 안의 훅에서 처리
 * - 구성: 히어로(헤더 밑으로 깔리는 배경 + CTA) → 프랜차이즈 특별 혜택 → 키퍼를 택한 이유(로고 marquee) → 고객 사례
 * - 문의 폼: 원본은 페이지 내 폼 없이 CTA 가 /contact/franchised-promotion 을 새 탭으로 연다 (그대로 재현)
 */
import type { Metadata } from "next";
import BusinessHero from "@/components/business/BusinessHero";
import {
  BenefitSection,
  CustomerCaseSection,
  ReasonSection,
} from "@/components/business/BusinessSections";

export const metadata: Metadata = {
  title: "B2B 제휴 및 대량 도입 문의 | 키퍼",
  description: "프랜차이즈, 엔터프라이즈를 위한 맞춤형 매장관리 파트너십 및 제휴 문의",
};

export default function BusinessPage() {
  return (
    <div className="w-full">
      {/* ===== 히어로: 배경 이미지 + "브랜드 매장 CCTV, 한꺼번에 교체하고 싶다면?" + 특별 혜택 CTA ===== */}
      <BusinessHero />
      {/* ===== 프랜차이즈 특별 혜택: 3가지 혜택 + 혜택 이미지 + 이메일 문의 ===== */}
      <BenefitSection />
      {/* ===== 키퍼를 택한 이유: 고객사 로고 2줄 무한 흐름 ===== */}
      <ReasonSection />
      {/* ===== 고객 사례: 사례 카드 3개 + 더보기 ===== */}
      <CustomerCaseSection />
    </div>
  );
}
