/**
 * 홈 페이지 `/` — 영업(설득) 페이지: 증거 → 문제 → 해결 → 문의 (고객 요구 "문제제기 → 해결 → 문의")
 * - 섹션 8개 (배경 리듬: 검정 → 흰 → 연회색 → 네이비 → 흰 → 연회색 → 연틸 → 네이비):
 *   1 히어로 → 2 시공사례 6개 → 3 카카오톡 후기 → 4 문제 제기(AS 고민 4가지)
 *   → 5 해결(설치·렌탈·AS·스피커 + 강점) → 6 렌탈 비용 비교 → 7 FAQ BEST 5 → 8 상담 신청 CTA
 * - 버튼 원칙: 큰 버튼은 전환(견적 계산·상담 신청)과 시공사례 자세히 보기에만. 다른 페이지 이동은 카드 클릭·작은 글자 링크.
 * - 꺼 둔 섹션 (파일은 components/main 에 그대로, 다시 쓰려면 import 후 배치):
 *   Highlights(장점 6개 → 해결에 흡수), ServiceCards(서비스 4개 → 해결에 흡수), SpeakerPromo(스피커 → 해결 카드),
 *   MidCta(계산기 배너 → 히어로·해결 버튼과 중복), WhyUs(브랜드 철학 → 회사소개), PlaceCards(장소별 → 시공사례 페이지)
 *   — 같은 내용이 여러 번 반복되고 다른 페이지로 보내는 버튼이 많아 이야기가 흐려져서 정리.
 * - 카피 원칙: 근거 없는 수치·약속(설치 실적, 최저가, 무상 AS 기간, 방문 시간 등)은 넣지 않음.
 * - 기존 회사(대한민국CCTV) 자료 섹션은 LEGACY 스위치로 숨김 (TrustSection · PartnerMarquee · ServiceNetwork) — 켜면 FAQ 와 CTA 사이.
 * - 헤더: 기본 "transparent"(히어로 위 투명), 스크롤 50px 이상이면 "white" (HomeHeaderScroll).
 * - 상담 폼은 홈에 넣지 않음 (/contact 전용).
 */
import type { Metadata } from "next";
import ConsultCta from "@/components/common/ConsultCta";
import CaseShowcase from "@/components/main/CaseShowcase";
import CostCompare from "@/components/main/CostCompare";
import FaqBest from "@/components/main/FaqBest";
import HeroSlider from "@/components/main/HeroSlider";
import HomeHeaderScroll from "@/components/main/HomeHeaderScroll";
import PartnerMarquee from "@/components/main/PartnerMarquee";
import ProblemSection from "@/components/main/ProblemSection";
import Reviews from "@/components/main/Reviews";
import ServiceNetwork from "@/components/main/ServiceNetwork";
import Solution from "@/components/main/Solution";
import TrustSection from "@/components/main/TrustSection";
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

      {/* ===== 문제 제기: "평소엔 잊고 지내던 CCTV…" + AS 고민 4가지 → 아래 해결로 이어짐 ===== */}
      <ProblemSection />

      {/* ===== 해결: 설치·렌탈·AS·스피커 4개 카드(강점 한 줄씩) + 공통 강점 배지 + [견적 계산하기] ===== */}
      <Solution />

      {/* ===== 렌탈 비용 비교: 대수 슬라이더로 타사 vs 자사 월 요금 + [렌탈 상담 신청] ===== */}
      <CostCompare />

      {/* ===== FAQ BEST 5: 망설임 해소 → FAQ 전체(글자 링크) ===== */}
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

      {/* ===== 하단 상담 CTA: 홈 — 전체 서비스 상담 ===== */}
      <ConsultCta
        lead="우리 공간 보안,"
        title={`지금 바로 ${SITE.name}에 맡기세요.`}
      />
    </div>
  );
}
