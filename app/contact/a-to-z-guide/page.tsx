/**
 * /contact/a-to-z-guide 페이지 — 창업 A to Z 가이드북 다운로드 신청 (원본 https://keeper.ceo/contact/a-to-z-guide, 진입경로 "창업가이드북")
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
      {/* ===== 다운로드 신청: 모델 이미지 + 신청 폼 (성공 시 창업 A to Z 가이드북 PDF 다운로드) ===== */}
      <DownloadRequestSection
        file={{
          url: "https://d387w4xxc5ed2n.cloudfront.net/home_web/files/guidebook/start_a_to_z.pdf",
          filename: "TalkFile_[한화비전 키퍼] 초보 사장님을 위한 창업 A to Z 가이드북 Ebook.pdf",
        }}
        redirectPath="/story"
      />
    </>
  );
}
