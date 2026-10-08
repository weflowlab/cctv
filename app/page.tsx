/**
 * 홈 페이지 `/` (keeper 메인 틀 + 기존 kkcctv 메인 내용)
 * - 섹션 순서:
 *   히어로 슬라이더 → 서비스 카드 4개 → CCTV+스피커 동시 시공 → 장소별 CCTV → 신뢰(수상·고객사)
 *   → 실시간 후기 → 제휴 브랜드 띠 → 전국 서비스망 → 상담 신청 CTA
 * - 헤더: 기본 "transparent"(히어로 위 투명), 스크롤 50px 이상이면 "white" (HomeHeaderScroll).
 * - 페이지 자체는 서버 컴포넌트, 인터랙션이 있는 섹션(히어로·후기·서비스망)만 클라이언트 컴포넌트.
 * - 상담 폼은 홈에 넣지 않음 (/contact 전용).
 */
import type { Metadata } from "next";
import ConsultCta from "@/components/common/ConsultCta";
import HeroSlider from "@/components/main/HeroSlider";
import HomeHeaderScroll from "@/components/main/HomeHeaderScroll";
import PartnerMarquee from "@/components/main/PartnerMarquee";
import PlaceCards from "@/components/main/PlaceCards";
import Reviews from "@/components/main/Reviews";
import ServiceCards from "@/components/main/ServiceCards";
import ServiceNetwork from "@/components/main/ServiceNetwork";
import SpeakerPromo from "@/components/main/SpeakerPromo";
import TrustSection from "@/components/main/TrustSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | CCTV 설치·렌탈·AS 보안 솔루션 전문 기업`,
  description:
    "한국브랜드 선호도 3년 연속 1위. 전국 인프라로 발빠른 CCTV 설치, 초기비용 0원 렌탈, 타사 제품 AS 출장수리, CCTV+스피커 동시 시공까지.",
  keywords: ["CCTV 설치", "CCTV 렌탈", "CCTV AS", "CCTV 수리", "CCTV 스피커", SITE.name],
};

export default function Home() {
  return (
    // 최소 폭 360px, 세로 스택
    <div className="flex w-full min-w-[360px] flex-col items-center">
      {/* 스크롤 위치에 따라 헤더 투명 ↔ 흰색 전환 */}
      <HomeHeaderScroll />

      {/* ===== 히어로 슬라이더: 메인 / 렌탈 / 스피커 / AS 4장, 5초 자동 전환 ===== */}
      <HeroSlider />

      {/* ===== 서비스 카드 4개: 설치 / 렌탈 / AS / 스피커 → /service/<slug> ===== */}
      <ServiceCards />

      {/* ===== CCTV+스피커 동시 시공: 혜택 3개 + /service/speaker ===== */}
      <SpeakerPromo />

      {/* ===== 장소별 CCTV: 5개 장소 카드 → /places/<slug> ===== */}
      <PlaceCards />

      {/* ===== 신뢰: 3년 연속 1위 수상 + 고객사 로고 그리드 ===== */}
      <TrustSection />

      {/* ===== 실시간 후기: 후기 카드 슬라이더 + 시공사례 더보기 ===== */}
      <Reviews />

      {/* ===== 제휴 브랜드 띠: 제조사 로고 2줄 marquee ===== */}
      <PartnerMarquee />

      {/* ===== 전국 서비스망: 지도 + 지사 칩 클릭 시 주소 전환 ===== */}
      <ServiceNetwork />

      {/* ===== 상담 신청 CTA (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
