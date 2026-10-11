import type { Metadata } from "next";
import InquiryManager from "@/components/admin/InquiryManager";
import { PageHead } from "@/components/admin/ui";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "문의 관리" };

/** /admin/inquiries — 상담 신청(/contact) 목록 · 상태 변경 · 삭제 · 엑셀 */
export default function AdminInquiriesPage() {
  return (
    <>
      <PageHead title="문의 관리" desc="상담 신청 페이지로 들어온 문의입니다. 화살표를 누르면 유입 경로·기기·전달 내용이 보입니다." />
      <InquiryManager />
    </>
  );
}
