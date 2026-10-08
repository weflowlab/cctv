/**
 * /a-to-z-guide — 창업 A to Z 가이드 랜딩 페이지 (창업가이드 메뉴)
 * - 구성: 히어로 → 인트로 → 폐업 통계 → 솔루션 → 가이드북 구성 카드 → 블로그 슬라이더
 * - 헤더: 스크롤 100px 전에는 투명(흰 글자), 이후 흰 배경 (원본 useHeaderScroll(100))
 * - 다운로드 버튼은 모두 /contact/a-to-z-guide 신청 페이지로 이동 (원본 동작)
 */
import type { Metadata } from "next";
import BlogSlider from "@/components/guides/a-to-z/BlogSlider";
import Contents from "@/components/guides/a-to-z/Contents";
import Hero from "@/components/guides/a-to-z/Hero";
import Intro from "@/components/guides/a-to-z/Intro";
import Solution from "@/components/guides/a-to-z/Solution";
import Why from "@/components/guides/a-to-z/Why";
import HeaderScrollSync from "@/components/guides/shared/HeaderScrollSync";

export const metadata: Metadata = {
  title: "창업 A to Z 가이드 | 키퍼",
  description: "매장 창업 준비부터 오픈까지, 단계별 창업 가이드",
};

export default function AToZGuidePage() {
  return (
    <div className="relative w-full">
      {/* 스크롤 위치에 따라 헤더 투명/흰색 전환 */}
      <HeaderScrollSync threshold={100} />

      {/* ===== 히어로: 가이드북 타이틀 + 무료 다운로드 ===== */}
      <Hero />
      {/* ===== 인트로: 창업 비용 절감 비법 소개 ===== */}
      <Intro />
      {/* ===== 폐업 통계: 왜 5년을 못 버틸까 ===== */}
      <Why />
      {/* ===== 솔루션: 창업 A to Z 가이드북 ===== */}
      <Solution />
      {/* ===== 가이드북 구성 카드 + 다운로드 버튼 ===== */}
      <Contents />
      {/* ===== 블로그 추천 (PC Swiper / 모바일 목록) ===== */}
      <BlogSlider />
    </div>
  );
}
