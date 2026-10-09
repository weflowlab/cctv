/**
 * FAQ 페이지 본문 (keeper components/faq/FaqSection 틀 복사)
 * - 구성: 어두운 배경(#131320) + 브랜드색 블러 원형 배경 장식 → 제목 → 탭 + 아코디언(FaqAccordion)
 * - keeper 는 전부 펼침이지만 여기서는 아코디언 (FaqAccordion 참고).
 * - 섹션이 헤더 아래까지 깔리도록 헤더 높이만큼 음수 margin-top + padding-top.
 */
import FaqAccordion from "./FaqAccordion";
import Eyebrow from "@/components/common/Eyebrow";

export default function FaqSection() {
  return (
    <section className="relative -mt-[var(--header-height-mobile)] flex min-w-[360px] justify-center overflow-hidden bg-[#131320] pt-[var(--header-height-mobile)] lg:-mt-[var(--header-height)] lg:pt-[var(--header-height)]">
      {/* ===== 배경 장식: 브랜드색 블러 원 2개 (keeper 장식을 짧은 페이지에 맞게 축소) ===== */}
      <div className="absolute top-0 flex h-full w-full justify-center overflow-hidden" aria-hidden>
        <div className="relative h-full w-[400px] lg:w-[2012px]">
          <div className="absolute left-[176px] top-[170px] z-[1] h-[320px] w-[331px] rounded-[331px] bg-brand opacity-[0.11] blur-[100px] lg:left-[1059px] lg:top-[-806px] lg:h-[1514px] lg:w-[1514px] lg:rounded-[1514px] lg:blur-[323.8px]" />
          <div className="absolute right-[194px] top-[971px] z-[1] h-[320px] w-[331px] rounded-[331px] bg-brand opacity-[0.11] blur-[100px] lg:right-[1038px] lg:top-[603px] lg:h-[1514px] lg:w-[1514px] lg:rounded-[1514px] lg:blur-[323.8px]" />
        </div>
      </div>

      <div className="z-[2] flex w-full flex-col items-center py-[64px] text-white lg:py-[140px]">
        {/* ===== 제목: FAQ 라벨(공용 Eyebrow) + "자주 묻는 질문" ===== */}
        <Eyebrow dark className="mb-[14px] lg:mb-[18px]">FAQ</Eyebrow>
        <h1 className="text-center text-[26px] font-bold leading-[144%] tracking-[-1px] lg:text-[42px]">자주 묻는 질문</h1>

        {/* ===== 카테고리 탭 + 아코디언 (클라이언트 컴포넌트) ===== */}
        <FaqAccordion />
      </div>
    </section>
  );
}
