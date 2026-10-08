/**
 * /calculator — 견적계산기 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/calculator
 * - 단계형 계산기(질문 5단계 → 연락처 입력 → 로딩 → 결과 페이지 이동)는
 *   전부 클라이언트 상태로 동작하므로 components/calculator/Calculator.tsx 에 위임
 * - 헤더: 기본 흰색, 연락처 입력 단계에서만 스크롤 기준 투명-검정 ↔ 흰색
 */
import type { Metadata } from "next";
import Calculator from "@/components/calculator/Calculator";

export const metadata: Metadata = {
  title: "한화비전 Keeper 견적계산기",
  description: "우리 매장에 딱 맞는 CCTV 대수와 최저 견적을 1분 만에 확인하세요.",
};

export default function CalculatorPage() {
  return <Calculator />;
}
