/**
 * 홈 FAQ BEST 5 — 상담 전에 가장 먼저 궁금해할 질문 5개만 아코디언으로
 * - 데이터: getFaqs() 중 관리자 > FAQ 관리에서 "홈 BEST" 체크한 질문 (FAQ 순서대로, 최대 5개).
 * - 아코디언: /faq 와 같은 FaqAccordion 재사용 — showTabs=false 로 탭 숨김, tone="light" 로 흰 배경용 색.
 * - 하단 [FAQ 전체 보기 → /faq].
 */
import FaqAccordion from "@/components/support-faq/FaqAccordion";
import { FAQ_BEST_LIMIT } from "@/components/support-faq/data";
import { getFaqs } from "@/lib/faqs";
import { HomeSectionHeader, HomeTextLink } from "./HomeSection";

export default async function FaqBest() {
  const items = (await getFaqs()).filter((f) => f.best).slice(0, FAQ_BEST_LIMIT);
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
        <FaqAccordion items={items} showTabs={false} tone="light" />

        <div className="mt-[32px] lg:mt-[56px]">
          <HomeTextLink href="/faq">FAQ 전체 보기</HomeTextLink>
        </div>
      </div>
    </section>
  );
}
