/**
 * /contact/franchised-promotion — 프랜차이즈 직영점/가맹점 특별 혜택 상담 신청 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/contact/franchised-promotion (/business 히어로 CTA 가 새 탭으로 연다)
 * - 구현은 components/business/franchised-promotion/FranchisedPromotion.tsx
 */
import type { Metadata } from "next";
import FranchisedPromotion from "@/components/business/franchised-promotion/FranchisedPromotion";

export const metadata: Metadata = {
  title: "키퍼 도입문의 | 한화비전 키퍼",
  description: "매장관리 올인원 솔루션 키퍼 도입 및 무료 방문 견적 상담 신청",
};

export default function FranchisedPromotionPage() {
  return <FranchisedPromotion />;
}
