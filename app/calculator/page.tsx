/**
 * /calculator — 견적 계산기 페이지 (서버 컴포넌트)
 * - 질문 6단계 → 추천 대수 + 렌탈/일시납 예상 견적 → 상담 신청(/contact 자동 채움)
 * - 흐름은 전부 클라이언트 상태로 동작 → components/quote-calculator/QuoteCalculator.tsx 에 위임
 * - 상단 메뉴·서비스 탭에는 넣지 않음 (홈 히어로·서비스 탭 배너에서 진입). 결과 버튼이 CTA 역할이라 ConsultCta 없음.
 * - 헤더: 흰 배경(white) — 경로별 기본값
 */
import type { Metadata } from "next";
import QuoteCalculator from "@/components/quote-calculator/QuoteCalculator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `견적 계산기 | ${SITE.name}`,
  description: "공간 정보를 입력하면 필요한 CCTV 대수와 렌탈·설치 예상 견적을 바로 알려드립니다.",
};

export default function CalculatorPage() {
  return <QuoteCalculator />;
}
