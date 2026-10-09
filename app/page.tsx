/**
 * 홈 페이지 `/` — keeper.ceo/security 같은 긴 영업(설득) 페이지: 문제제기 → 해결 → 문의
 * - 섹션 순서 (배경 리듬: 검정 → 흰 → 연회색 → 흰 → 네이비 → 연회색 → 연틸 → 흰 → 다크 → 흰 → 연회색 → 연틸 → 네이비):
 *   1 히어로 → 2 시공사례 6개 → 3 카카오톡 후기 → 4 한눈에 보는 장점 6개 → 5 문제 제기(AS 고민 4가지)
 *   → 6 렌탈 비용 비교 슬라이더 → 7 중간 CTA(견적 계산기) → 8 서비스 카드 4개 → 9 CCTV+스피커
 *   → 10 왜 {SITE.name}인가(브랜드 철학 3가지) → 11 장소별 CCTV → 12 FAQ BEST 5 → (기존 회사 자료) → 13 상담 신청 CTA
 * - 카피 원칙: 근거 없는 수치·약속(설치 실적, 최저가, 무상 AS 기간, 방문 시간 등)은 넣지 않음.
 * - 기존 회사(대한민국CCTV) 자료 섹션은 지우지 않고 LEGACY 스위치로 숨김:
 *   수상(award) · 고객사 로고(clients) = TrustSection, 제휴 제조사 로고(partners) = PartnerMarquee,
 *   전국 지사(branches) = ServiceNetwork. 켜면 장소별 CCTV 와 상담 CTA 사이에 나온다.
 * - 헤더: 기본 "transparent"(히어로 위 투명), 스크롤 50px 이상이면 "white" (HomeHeaderScroll).
 * - 페이지 자체는 서버 컴포넌트, 인터랙션이 있는 섹션(히어로·후기·렌탈 슬라이더·FAQ 아코디언·서비스망)만 클라이언트 컴포넌트.
 * - 상담 폼은 홈에 넣지 않음 (/contact 전용).
 */
import type { Metadata } from "next";
import ConsultCta from "@/components/common/ConsultCta";
import CaseShowcase from "@/components/main/CaseShowcase";
import CostCompare from "@/components/main/CostCompare";
import FaqBest from "@/components/main/FaqBest";
import HeroSlider from "@/components/main/HeroSlider";
import Highlights from "@/components/main/Highlights";
import HomeHeaderScroll from "@/components/main/HomeHeaderScroll";
import MidCta from "@/components/main/MidCta";
import PartnerMarquee from "@/components/main/PartnerMarquee";
import PlaceCards from "@/components/main/PlaceCards";
import ProblemSection from "@/components/main/ProblemSection";
import Reviews from "@/components/main/Reviews";
import ServiceCards from "@/components/main/ServiceCards";
import ServiceNetwork from "@/components/main/ServiceNetwork";
import SpeakerPromo from "@/components/main/SpeakerPromo";
import TrustSection from "@/components/main/TrustSection";
import WhyUs from "@/components/main/WhyUs";
import { LEGACY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} | CCTV 설치·렌탈·AS`,
  description: `${SITE.slogan}. 현장 맞춤 CCTV 설치, 초기 부담을 줄인 렌탈, 타사 제품 AS 수리, CCTV+스피커 동시 시공까지 — ${SITE.hours} 상담.`,
  keywords: ["CCTV 설치", "CCTV 렌탈", "CCTV AS", "CCTV 수리", "CCTV 스피커", SITE.name],
};

export default function Home() {
  return (
    // 최소 폭 360px, 세로 스택
    <div className="flex w-full min-w-[360px] flex-col items-center">
      {/* 스크롤 위치에 따라 헤더 투명 ↔ 흰색 전환 */}
      <HomeHeaderScroll />

      {/* ===== 히어로 슬라이더: 문제 공감 → 해결 4장 (메인 / 렌탈 / AS / 스피커), 5초 자동 전환 ===== */}
      <HeroSlider />

      {/* ===== 시공사례: 대표 사례 6개 카드 → /cases/<id>, 하단 [시공사례 자세히 보기] ===== */}
      <CaseShowcase />

      {/* ===== 카카오톡 후기: 대화 캡처 캐러셀, 카드 클릭 시 라이트박스 ===== */}
      <Reviews />

      {/* ===== 한눈에 보는 {SITE.name}: 핵심 장점 6개 아이콘 카드 → 관련 서비스/상담 페이지 ===== */}
      <Highlights />

      {/* ===== 문제 제기: "평소엔 잊고 지내던 CCTV…" + AS 고민 4가지 + 해결 문구 → /service/as ===== */}
      <ProblemSection />

      {/* ===== 렌탈 비용 비교: 대수 슬라이더로 타사 vs 자사 월 요금 (RENTAL_MONTHLY) → /service/rental ===== */}
      <CostCompare />

      {/* ===== 중간 CTA: 견적 계산기 배너 → /calculator ===== */}
      <MidCta />

      {/* ===== 서비스 카드 4개: 설치 / 렌탈 / AS / 스피커 → /service/<slug> ===== */}
      <ServiceCards />

      {/* ===== CCTV+스피커 동시 시공: 혜택 3개 + /service/speaker ===== */}
      <SpeakerPromo />

      {/* ===== 왜 {SITE.name}인가: 브랜드 철학 3가지 요약 카드 → /about ===== */}
      <WhyUs />

      {/* ===== 장소별 CCTV: 5개 장소 카드 → /cases/place/<slug> ===== */}
      <PlaceCards />

      {/* ===== FAQ BEST 5: 자주 묻는 질문 5개 아코디언 → /faq ===== */}
      <FaqBest />

      {/* ===== 기존 회사 자료 (LEGACY 스위치, 기본 숨김) ===== */}
      {/* 수상 + 고객사 로고 */}
      {(LEGACY.award || LEGACY.clients) && (
        <TrustSection showAward={LEGACY.award} showClients={LEGACY.clients} />
      )}
      {/* 제휴 제조사 로고 marquee */}
      {LEGACY.partners && <PartnerMarquee />}
      {/* 전국 지사: 지도 + 지사 칩 클릭 시 주소 전환 */}
      {LEGACY.branches && <ServiceNetwork />}

      {/* ===== 상담 신청 CTA (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
