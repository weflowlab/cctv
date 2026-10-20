/**
 * 홈 페이지 `/` — 영업(설득) 페이지: 증거 → 문제 → 해결 → 문의 (고객 요구 "문제제기 → 해결 → 문의")
 * - 흐름: 히어로 → [증거] 실적 숫자 띠 + LIVE 상담 신청 보드(연출용) · 시공사례 · 카톡 후기 · 수상/고객사 → [문제] AS 고민 → [해결] 서비스 4개 · 제휴 제조사 띠
 *   → [결정] 렌탈 비용 비교 → [망설임 해소] FAQ BEST 5 → 상담 신청 CTA
 *   (수상·고객사·제휴 로고는 LEGACY 스위치 — 꺼지면 해당 섹션만 빠지고 흐름은 유지)
 * - 버튼 원칙: 큰 버튼은 전환(견적 계산·상담 신청)과 시공사례 자세히 보기에만. 다른 페이지 이동은 카드 클릭·작은 글자 링크.
 * - 꺼 둔 섹션 (파일은 components/main 에 그대로, 다시 쓰려면 import 후 배치):
 *   Highlights(장점 6개 → 해결에 흡수), ServiceCards(서비스 4개 → 해결에 흡수), SpeakerPromo(스피커 → 해결 카드),
 *   MidCta(계산기 배너 → 히어로·해결 버튼과 중복), WhyUs(브랜드 철학 → 회사소개), PlaceCards(장소별 → 시공사례 페이지)
 *   — 같은 내용이 여러 번 반복되고 다른 페이지로 보내는 버튼이 많아 이야기가 흐려져서 정리.
 * - 카피 원칙: 근거 없는 수치·약속(최저가, 무상 AS 기간, 방문 시간 등)은 넣지 않음. 누적 시공·수리 건수는 고객 제공 수치 (StatBand).
 * - 기존 회사(대한민국CCTV) 자료: LEGACY 스위치 (TrustSection = 증거 묶음, PartnerMarquee = 해결 뒤, ServiceNetwork = FAQ 뒤)
 * - 헤더: 기본 "transparent"(히어로 위 투명), 스크롤 50px 이상이면 "white" (HomeHeaderScroll).
 * - 상담 폼은 홈에 넣지 않음 (/contact 전용).
 */
import type { Metadata } from "next";
import ConsultCta from "@/components/common/ConsultCta";
import Reveal from "@/components/common/Reveal";
import CaseShowcase from "@/components/main/CaseShowcase";
import CostCompare from "@/components/main/CostCompare";
import FaqBest from "@/components/main/FaqBest";
import HeroSlider from "@/components/main/HeroSlider";
import HomeHeaderScroll from "@/components/main/HomeHeaderScroll";
import { HomeSectionHeader } from "@/components/main/HomeSection";
import LiveInquiries from "@/components/main/LiveInquiries";
import PartnerMarquee from "@/components/main/PartnerMarquee";
import ProblemSection from "@/components/main/ProblemSection";
import Reviews from "@/components/main/Reviews";
import ServiceNetwork from "@/components/main/ServiceNetwork";
import Solution from "@/components/main/Solution";
import StatBand from "@/components/main/StatBand";
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

      {/* ===== [증거 ①] 머리말 문장 → 누적 실적 숫자 띠(고객 제공 수치, 카운트업) → LIVE 상담 신청 보드(연출용 30명 풀)
          — 히어로 바로 아래 (2026-10-20 대표 요청: 첫 화면 다음에 실적부터). 옅은 네이비 배경 위에 흰 카드 2장 ===== */}
      <section className="flex w-full flex-col items-center bg-brand-light px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
        <Reveal threshold={0.1} className="w-full">
          <HomeSectionHeader
            chip="TRACK RECORD"
            title={
              <>
                숫자가 말해 주는
                <br />
                <strong>{SITE.name}</strong>의 현장 경험
              </>
            }
            desc={
              <>
                전국에서 쌓아 온 시공·수리 실적,
                <br className="lg:hidden" /> 그리고 지금 이 순간에도 이어지는 상담 신청입니다.
              </>
            }
            className="mb-[32px] lg:mb-[56px]"
          />
        </Reveal>
        <StatBand />
        <LiveInquiries />
      </section>

      {/* ===== [증거 ②] 시공사례: 대표 사례 6개 카드 → /cases/<id>, 하단 [시공사례 자세히 보기] ===== */}
      <CaseShowcase />

      {/* ===== [증거 ③] 카카오톡 후기: 대화 캡처 캐러셀, 카드 클릭 시 라이트박스 ===== */}
      <Reviews />

      {/* ===== [증거 ④] 수상 + 고객사 로고 (기존 회사 자료 — LEGACY 스위치, 고객 확인 전) ===== */}
      {(LEGACY.award || LEGACY.clients) && (
        <TrustSection showAward={LEGACY.award} showClients={LEGACY.clients} />
      )}

      {/* ===== [문제] 문제 제기: "평소엔 잊고 지내던 CCTV…" + AS 고민 4가지 → 아래 해결로 이어짐 ===== */}
      <ProblemSection />

      {/* ===== [해결] 설치·렌탈·AS·스피커 4개 카드(강점 한 줄씩) + 공통 강점 배지 + [견적 계산하기] ===== */}
      <Solution />

      {/* ===== [해결 근거] 제휴 제조사 로고 띠 — 해결 섹션의 장비 품질을 받쳐 줌 (LEGACY 스위치) ===== */}
      {LEGACY.partners && <PartnerMarquee />}

      {/* ===== [결정] 렌탈 비용 비교: 대수 슬라이더로 타사 vs 자사 월 요금 + [렌탈 상담 신청] ===== */}
      <CostCompare />

      {/* ===== [망설임 해소] FAQ BEST 5 → FAQ 전체(글자 링크) ===== */}
      <FaqBest />

      {/* 전국 지사 (LEGACY.branches — 현재 숨김) */}
      {LEGACY.branches && <ServiceNetwork />}

      {/* ===== 하단 상담 CTA: 홈 — 전체 서비스 상담 ===== */}
      <ConsultCta
        lead="우리 공간 보안,"
        title={`지금 바로 ${SITE.name}에 맡기세요.`}
      />
    </div>
  );
}
