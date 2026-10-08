/**
 * /faq 페이지 — 키퍼 자주 묻는 질문 (원본 https://keeper.ceo/faq)
 * - 서버 컴포넌트. 인터랙션은 카테고리 탭(FaqTabs)과 헤더 스크롤 연동(HeaderScrollStyle)만 클라이언트.
 * - 원본: 스크롤 100px 미만이면 헤더 투명(흰 글자), 그 이상이면 흰 헤더.
 */
import type { Metadata } from "next";
import FaqSection from "@/components/faq/FaqSection";
import HeaderScrollStyle from "@/components/faq/HeaderScrollStyle";

export const metadata: Metadata = {
  title: "키퍼 자주 묻는 질문(FAQ) | 가격·설치·A/S",
  description: "약정, 설치 기간, 저장 기간, 직원관리 앱, 안심보험까지 사장님들이 가장 많이 묻는 질문 모음",
};

export default function FaqPage() {
  return (
    <>
      {/* ===== 헤더 스타일: 상단(100px 미만)에서는 투명, 스크롤 후 흰색 ===== */}
      <HeaderScrollStyle threshold={100} topStyle="transparent" scrolledStyle="white" />
      {/* ===== FAQ 본문: 제목 / 카테고리 탭 / 카테고리별 Q&A ===== */}
      <FaqSection />
    </>
  );
}
