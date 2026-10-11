/**
 * /faq 페이지 — 자주 묻는 질문 (keeper FAQ 틀 + 기존 사이트 내용 기반 초안)
 * - 서버 컴포넌트. 탭·아코디언(FaqAccordion)과 헤더 스크롤 연동(HeaderScrollStyle)만 클라이언트.
 * - 헤더: 스크롤 100px 미만이면 투명(흰 글자, 어두운 배경 위), 그 이상이면 흰 헤더.
 * - Q&A 는 초안 — components/support-faq/data.ts 참고 (사장님 검수 필요).
 */
import type { Metadata } from "next";
import ConsultCta from "@/components/common/ConsultCta";
import FaqSection from "@/components/support-faq/FaqSection";
import HeaderScrollStyle from "@/components/support-faq/HeaderScrollStyle";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `자주 묻는 질문(FAQ) | ${SITE.name}`,
  description: "CCTV 설치 비용, 렌탈, AS 등 고객님들이 자주 묻는 질문 모음",
};

export default function FaqPage() {
  return (
    <>
      {/* ===== 헤더 스타일: 상단(100px 미만)에서는 투명, 스크롤 후 흰색 ===== */}
      <HeaderScrollStyle threshold={100} topStyle="transparent" scrolledStyle="white" />
      {/* ===== FAQ 본문: 제목 / 카테고리 탭 / 아코디언 ===== */}
      <FaqSection />
      {/* ===== 하단 상담 CTA: FAQ — 남은 궁금증 문의 ===== */}
      <ConsultCta
        lead="찾는 답이 없으셨나요?"
        title={
          <>
            직접 물어보시면<br className="lg:hidden" /> 바로 답해 드립니다.
          </>
        }
      />
    </>
  );
}
