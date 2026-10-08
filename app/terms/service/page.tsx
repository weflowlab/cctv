/**
 * /terms/service - 서비스 이용약관 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/terms/service
 * - 원본은 문서 HTML 을 그대로 주입하는 정적 페이지로 별도 인터랙션이 없음.
 * - 본문은 components/terms/data/service.ts (원문에서 추출한 구조화 데이터)를 TermsDocument 로 렌더.
 * - 다른 약관으로의 이동은 공통 Footer 의 약관 링크로 처리됨(원본과 동일).
 */
import type { Metadata } from "next";
import TermsDocument from "@/components/terms/TermsDocument";
import { serviceTerms } from "@/components/terms/data/service";

// 원본 <title>/description (keeper.ceo 는 약관 페이지도 사이트 공통 메타 사용)
export const metadata: Metadata = {
  title: "한화비전 키퍼 | 매장관리 올인원 CCTV",
  description: "매장전용 CCTV부터 알바 출퇴근 관리까지, 무약정·설치비 0원 매장관리 올인원 솔루션",
};

export default function TermsServicePage() {
  return (
    <>
      {/* ===== 서비스 이용약관 본문: 문서 제목/조항/목록/표를 원문 순서대로 출력 ===== */}
      <TermsDocument blocks={serviceTerms} />
    </>
  );
}
