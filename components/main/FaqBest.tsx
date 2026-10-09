/**
 * 홈 FAQ BEST 5 — 상담 전에 가장 먼저 궁금해할 질문 5개만 아코디언으로
 * - 데이터: components/support-faq/data.ts FAQ_ITEMS 에서 질문 문자열(BEST_QUESTIONS)로 골라 순서대로 표시.
 *   FAQ 데이터의 질문 문구가 바뀌면 여기 문자열도 함께 바꿀 것 (못 찾은 질문은 조용히 빠짐).
 * - 아코디언: /faq 와 같은 FaqAccordion 재사용 — items 를 넘겨 탭 숨김, tone="light" 로 흰 배경용 색.
 * - 하단 [FAQ 전체 보기 → /faq].
 */
import FaqAccordion from "@/components/support-faq/FaqAccordion";
import { FAQ_ITEMS, type FaqItem } from "@/components/support-faq/data";
import { HomeSectionHeader, HomeTextLink } from "./HomeSection";

/** 홈에 노출할 질문 (표시 순서) */
const BEST_QUESTIONS = [
  "CCTV 설치 비용은 얼마인가요?",
  "몇 대가 필요한지 모르겠어요.",
  "렌탈 시 초기 비용이 드나요?",
  "다른 업체에서 설치한 CCTV도 수리해 주나요?",
  "스마트폰으로 영상을 볼 수 있나요?",
];

const BEST_ITEMS = BEST_QUESTIONS.map((q) => FAQ_ITEMS.find((f) => f.question === q)).filter(
  (f): f is FaqItem => Boolean(f),
);

export default function FaqBest() {
  return (
    // ===== FAQ BEST 5: 연틸 배경 =====
    <section className="flex w-full justify-center bg-point-light py-[80px] lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        <HomeSectionHeader
          chip="FAQ"
          title={
            <>
              <strong>자주 묻는 질문</strong> BEST 5
            </>
          }
          className="mb-[32px] px-[16px] lg:mb-[56px] lg:px-0"
        />

        {/* ===== 아코디언 (한 번에 하나만 열림) ===== */}
        <FaqAccordion items={BEST_ITEMS} tone="light" />

        <div className="mt-[32px] lg:mt-[56px]">
          <HomeTextLink href="/faq">FAQ 전체 보기</HomeTextLink>
        </div>
      </div>
    </section>
  );
}
