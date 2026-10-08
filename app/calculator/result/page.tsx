/**
 * /calculator/result — 견적계산기 결과 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/calculator/result?cctvs=1,1,2,0
 * - 결과 화면은 쿼리(cctvs)를 읽는 클라이언트 컴포넌트라 <Suspense> 로 감싼다
 *   (cacheComponents 환경에서 useSearchParams 는 Suspense 경계 필요 — Next 문서 use-search-params)
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorResult from "@/components/calculator/result/CalculatorResult";

export const metadata: Metadata = {
  title: "키퍼 견적계산기 결과 | CCTV 추천 대수",
  description: "사장님 매장 맞춤 분석을 통한 CCTV 권장 대수 및 견적 계산기 결과입니다.",
};

export default function CalculatorResultPage() {
  return (
    // 쿼리 확인 전에는 연주황 배경만 보여줌
    <Suspense fallback={<div className="min-h-screen w-full bg-[#fff6f1]" />}>
      <CalculatorResult />
    </Suspense>
  );
}
