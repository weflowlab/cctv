/**
 * /terms/service - 약관 페이지 (서버 컴포넌트, 인터랙션 없음)
 * - 본문은 components/terms/data/service.ts 의 구조화 데이터를 TermsDocument 로 렌더.
 * - 본문은 2026-10-21 작성 (시행일 2026-10-22). 수정은 data 파일에서.
 * - 다른 약관으로의 이동은 공통 Footer 의 약관 링크로 처리.
 */
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import TermsDocument from "@/components/terms/TermsDocument";
import { serviceTerms } from "@/components/terms/data/service";

export const metadata: Metadata = {
  title: `서비스 이용약관 | ${SITE.name}`,
};

export default function TermsServicePage() {
  return (
    <>
      {/* ===== 서비스 이용약관 본문: 문서 제목/조항/목록/표를 순서대로 출력 ===== */}
      <TermsDocument blocks={serviceTerms} />
    </>
  );
}
