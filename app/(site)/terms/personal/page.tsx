/**
 * /terms/personal - 약관 페이지 (서버 컴포넌트, 인터랙션 없음)
 * - 본문은 components/terms/data/personal.ts 의 구조화 데이터를 TermsDocument 로 렌더.
 * - 현재는 "준비 중" 안내만 있음 — 실제 약관 확정 시 data 파일만 교체하면 된다.
 * - 다른 약관으로의 이동은 공통 Footer 의 약관 링크로 처리.
 */
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import TermsDocument from "@/components/terms/TermsDocument";
import { personalTerms } from "@/components/terms/data/personal";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${SITE.name}`,
};

export default function TermsPersonalPage() {
  return (
    <>
      {/* ===== 개인정보처리방침 본문: 문서 제목/조항/목록/표를 순서대로 출력 ===== */}
      <TermsDocument blocks={personalTerms} paragraphGap />
    </>
  );
}
