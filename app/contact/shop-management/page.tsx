/**
 * /contact/shop-management 페이지 — 매장운영 시스템 가이드 다운로드 신청 (원본 https://keeper.ceo/contact/shop-management, 진입경로 "알바관리가이드")
 * - 서버 컴포넌트. 공통 다운로드 신청 섹션(DownloadRequestSection)에 제목/설명/파일만 넘긴다.
 * - 원본 동작: 폼 제출 성공 → 성공 팝업 2초 + PDF 다운로드 + 2초 후 /story 이동.
 * - 헤더: 스크롤 100px 미만 투명+검은 글자, 이후 흰 헤더.
 */
import type { Metadata } from "next";
import DownloadRequestSection from "@/components/download-request/DownloadRequestSection";

export const metadata: Metadata = {
  title: "키퍼 도입문의 | 한화비전 키퍼",
  description: "매장관리 올인원 솔루션 키퍼 도입 및 무료 방문 견적 상담 신청",
};

export default function Page() {
  return (
    <>
      {/* ===== 다운로드 신청: 모델 이미지 + 신청 폼 (성공 시 매장운영 시스템 가이드 PDF 다운로드) ===== */}
      <DownloadRequestSection
        title="매장운영 시스템 가이드"
        desc={"어떤 직원이 들어와도 잘 돌아가는 매장 시스템,\n지금 바로 만들어 보세요!"}
        file={{
          url: "https://d387w4xxc5ed2n.cloudfront.net/common/download/shop-management.pdf",
          filename: "[한화비전 키퍼] 알바관리가 쉬워지는 매장운영 시스템 가이드.pdf",
        }}
        redirectPath="/story"
      />
    </>
  );
}
