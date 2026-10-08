/**
 * 홈 페이지 `/` (원본 keeper.ceo 메인, app/page 청크의 tK 컴포넌트)
 * - 섹션 순서(원본 그대로):
 *   히어로 배너 → 브랜드 필름 → 서비스 소개 → Who We Are → 제품/기술 → 매장관리 올인원
 *   → 고객사례 → 상담 폼 → 유튜브 영상 → 하단 CTA
 * - 헤더: 기본 "transparent"(히어로 위 투명), 스크롤 50px 이상이면 "white" (HomeHeaderScroll).
 * - 히어로는 ?banner= 쿼리를 읽으므로(useSearchParams) Suspense 로 감싼다.
 * - 페이지 자체는 서버 컴포넌트, 인터랙션이 있는 섹션만 클라이언트 컴포넌트.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import AllInOne from "@/components/home/AllInOne";
import BottomCta from "@/components/home/BottomCta";
import BrandFilm from "@/components/home/BrandFilm";
import ConsultForm from "@/components/home/ConsultForm";
import CustomerCases from "@/components/home/CustomerCases";
import HeroBanner, { HeroBannerFallback } from "@/components/home/HeroBanner";
import HomeHeaderScroll from "@/components/home/HomeHeaderScroll";
import ProductTech from "@/components/home/ProductTech";
import ServiceIntro from "@/components/home/ServiceIntro";
import WhoWeAre from "@/components/home/WhoWeAre";
import YoutubeSection from "@/components/home/YoutubeSection";

export const metadata: Metadata = {
  title: "한화비전 키퍼 | 매장관리 올인원 CCTV",
  description: "매장전용 CCTV부터 알바 출퇴근 관리까지, 무약정·설치비 0원 매장관리 올인원 솔루션",
  keywords: ["매장관리", "한화비전", "매장 CCTV", "무약정 CCTV", "알바 출퇴근 관리"],
};

export default function Home() {
  return (
    // 원본 sc-469414c5-0: 최소 폭 360px, 세로 스택, 가운데 정렬
    <div className="flex w-full min-w-[360px] flex-col items-center">
      {/* 스크롤 위치에 따라 헤더 투명 ↔ 흰색 전환 */}
      <HomeHeaderScroll />

      {/* ===== 히어로 메인 배너: 영상 + 프로모션 이미지 Swiper ===== */}
      <Suspense fallback={<HeroBannerFallback />}>
        <HeroBanner />
      </Suspense>

      {/* ===== 브랜드 필름: 신혜선 Brand Film 유튜브 ===== */}
      <BrandFilm />

      {/* ===== 서비스 소개: 카드 4개 ===== */}
      <ServiceIntro />

      {/* ===== Who We Are: 한화비전 소개 ===== */}
      <WhoWeAre />

      {/* ===== 사장님들의 이유있는 선택: 제품/기술 ===== */}
      <ProductTech />

      {/* ===== 매장 관리 올인원: 매장 보안 / 직원 관리 ===== */}
      <AllInOne />

      {/* ===== 고객사례 + 더보기 ===== */}
      <CustomerCases />

      {/* ===== 상담 신청 폼 ===== */}
      <ConsultForm />

      {/* ===== 유튜브 영상 콘텐츠 ===== */}
      <YoutubeSection />

      {/* ===== 하단 CTA: 지금 바로 키퍼 하세요 + 앱 다운로드 ===== */}
      <BottomCta />
    </div>
  );
}
