"use client";

/**
 * 견적 계산기 STEP 하나 (keeper CalculatorForm 아코디언 STEP 틀)
 * - 헤더(STEP 번호 · 질문 · 선택값 · 화살표) 클릭 → 펼침/접힘 토글, 화살표 180° 회전
 * - 헤더에는 선택한 값(주황) 또는 "선택해 주세요"(회색) 표시
 * - 선택지 카드 클릭 → onSelect (같은 값을 다시 누르면 선택 해제 — 처리는 부모)
 * - STEP 02 이후가 펼쳐지면 해당 STEP 이 헤더 아래에 오도록 부드럽게 스크롤
 */
import { useEffect, useRef } from "react";
import type { Question } from "./data";

type Props = {
  stepIndex: number;
  question: Question;
  value: string | null;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

/** 아래 방향 화살표 */
function ChevronDown() {
  return (
    <svg viewBox="0 0 16 9" fill="none" className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px]" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function QuestionStep({ stepIndex, question, value, isExpanded, onToggle, onSelect }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const selectedLabel = question.answers.find((a) => a.value === value)?.label;
  const panelId = `quote-step-${question.key}`;

  // 펼쳐질 때(STEP 02~) 화면으로 부드럽게 스크롤 (scroll-margin 으로 고정 헤더 높이만큼 띄움)
  useEffect(() => {
    if (isExpanded && stepIndex > 1) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isExpanded, stepIndex]);

  return (
    <section
      ref={sectionRef}
      className="scroll-mt-[calc(var(--header-height-mobile)+16px)] border-t border-[#eee] last:border-b lg:scroll-mt-[calc(var(--header-height)+16px)]"
    >
      {/* ===== STEP 헤더: 클릭 시 펼침 토글 ===== */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-[16px] py-[24px] text-left lg:py-[36px]"
      >
        <div>
          <p className="text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#888] lg:text-[16px] lg:leading-[23px]">
            STEP {String(stepIndex).padStart(2, "0")}
          </p>
          <h2 className="mt-[6px] text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-[#222] lg:mt-[4px] lg:text-[22px] lg:leading-[33px] lg:tracking-[-0.6px]">
            {question.label}
          </h2>
          {/* 모바일: 선택값을 질문 아래에 */}
          <span className={`mt-[6px] inline-block text-[15px] font-medium tracking-[-0.3px] lg:hidden ${selectedLabel ? "text-[#ff5c00]" : "text-[#bbb]"}`}>
            {selectedLabel ?? "선택해 주세요"}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-[16px]">
          {/* PC: 선택값을 화살표 왼쪽에 */}
          <span className={`hidden text-[18px] font-medium tracking-[-0.36px] lg:inline ${selectedLabel ? "text-[#ff5c00]" : "text-[#bbb]"}`}>
            {selectedLabel ?? "선택해 주세요"}
          </span>
          <span className={`text-[#222] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
            <ChevronDown />
          </span>
        </span>
      </button>

      {/* ===== 선택지: 펼쳐졌을 때만 (회색 박스 + 카드 그리드) ===== */}
      {isExpanded && (
        <div id={panelId} className="mb-[24px] rounded-[12px] bg-[#fafafa] p-[16px] opacity-0 [animation:fadeIn_0.3s_ease-out_forwards] lg:mb-[36px] lg:p-[40px]">
          <div className={`grid gap-[10px] lg:gap-[12px] ${question.cols}`}>
            {question.answers.map((answer) => {
              const selected = value === answer.value;
              return (
                <button
                  key={answer.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(answer.value)}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-[4px] rounded-[8px] border px-[8px] py-[20px] text-center shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] transition-colors duration-150 lg:py-[24px] ${
                    selected ? "border-[#ff5c00] bg-[#fff6f1] text-[#ff5c00]" : "border-[#eee] bg-white text-[#222] hover:border-[#ffc2a0]"
                  }`}
                >
                  <span className={`text-[16px] leading-[22px] tracking-[-0.32px] lg:text-[18px] ${selected ? "font-bold" : "font-medium"}`}>
                    {answer.label}
                  </span>
                  {answer.desc && (
                    <span className={`text-[12px] leading-[18px] tracking-[-0.24px] lg:text-[14px] ${selected ? "text-[#ff5c00]/80" : "text-[#888]"}`}>
                      {answer.desc}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
