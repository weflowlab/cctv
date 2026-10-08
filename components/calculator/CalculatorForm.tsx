"use client";

/**
 * 견적계산기 1단계: 5개 STEP 아코디언 질문 폼
 * - 원본 동작
 *   · 처음엔 STEP 01 만 펼쳐져 있음
 *   · 헤더(모바일: 헤더 전체 / PC: 오른쪽 버튼) 클릭 → 해당 STEP 펼침/접힘 토글, 화살표 180° 회전
 *   · 선택지 클릭 → 값 선택(같은 값 다시 누르면 선택 해제) + 다음 STEP 이 닫혀 있으면 자동으로 펼침
 *   · STEP 02 이후가 펼쳐지면 해당 섹션을 화면 가운데로 부드럽게 스크롤
 *   · 헤더에는 선택한 값 라벨(주황) 또는 "선택해 주세요"(회색) 표시
 *   · 5개 모두 선택해야 "견적 확인하기" 버튼 활성화
 */
import { useEffect, useRef } from "react";
import Placeholder from "@/components/common/Placeholder";
import { QUESTIONS, type CalculatorData, type Question } from "./calculatorData";

type FormProps = {
  data: CalculatorData;
  expanded: boolean[];
  onToggle: (stepIndex: number) => void;
  onSelect: (stepIndex: number, question: Question, answer: { value: string; label: string }) => void;
  onSubmit: () => void;
};

/** 아래 방향 화살표 (원본 공용 아이콘 52417) */
function ChevronDown() {
  return (
    <svg viewBox="0 0 16 9" fill="none" className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px]" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** STEP 하나 (헤더 + 펼쳐지는 선택지 영역) */
function Step({
  stepIndex,
  question,
  value,
  isExpanded,
  onToggle,
  onSelect,
}: {
  stepIndex: number;
  question: Question;
  value: string | null;
  isExpanded: boolean;
  onToggle: FormProps["onToggle"];
  onSelect: FormProps["onSelect"];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isSelected = value !== null;
  const selectedLabel = isSelected ? question.labels[value] : "선택해 주세요";

  // 펼쳐질 때(STEP 02~) 섹션을 화면 중앙으로 부드럽게 스크롤
  useEffect(() => {
    const el = sectionRef.current;
    if (el && isExpanded && stepIndex > 1) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isExpanded, stepIndex]);

  // 선택지 열 수: PC 에서 개수가 3의 배수면 3열, 아니면 2열 / 모바일은 항상 2열
  const colsCls = question.answers.length % 3 === 0 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2";

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-[#eee] px-[20px] py-[32px] last:border-b lg:p-0"
    >
      {/* ===== STEP 헤더: 번호 · 질문 · 선택값 · 화살표 / 클릭 시 펼침 토글 ===== */}
      <header
        aria-label="선택"
        role="button"
        onClick={() => onToggle(stepIndex)}
        className="flex h-auto w-full select-none items-center justify-between lg:h-[130px] lg:select-auto"
      >
        <div>
          <div className="text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#888] lg:text-[16px] lg:leading-[23px] lg:tracking-[-0.32px]">
            STEP {String(stepIndex).padStart(2, "0")}
          </div>
          <h3 className="mt-[6px] text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-[#222] lg:mt-[4px] lg:text-[22px] lg:leading-[33px] lg:tracking-[-1px]">
            {question.label}
          </h3>
          {/* 모바일: 선택값을 질문 아래에 표시 */}
          <span
            className={`mt-[6px] inline-block text-[16px] font-medium leading-[22px] tracking-[-0.32px] lg:hidden ${
              isSelected ? "text-[#ff5c00]" : "text-[#bbb]"
            }`}
          >
            {selectedLabel}
          </span>
        </div>
        {/* PC: 선택값 + 화살표 버튼 (클릭은 헤더로 버블링되어 토글) */}
        <button
          type="button"
          aria-label={isExpanded ? "닫기" : "열기"}
          className="flex shrink-0 cursor-pointer items-center gap-[16px]"
        >
          <span
            className={`hidden text-[18px] font-medium leading-[22px] tracking-[-0.36px] lg:inline ${
              isSelected ? "text-[#ff5c00]" : "text-[#bbb]"
            }`}
          >
            {selectedLabel}
          </span>
          <div
            className="flex items-center justify-center text-[#222] transition-transform duration-200 ease-in-out"
            style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }}
          >
            <ChevronDown />
          </div>
        </button>
      </header>

      {/* ===== 선택지 영역: 펼쳐졌을 때만 렌더 (회색 배경 + 카드 그리드) ===== */}
      {isExpanded && (
        <div className="-ml-[20px] mt-[32px] w-[calc(100%+40px)] bg-[#fafafa] px-[20px] py-[40px] lg:ml-0 lg:mt-0 lg:w-auto lg:px-[48px] lg:py-[120px]">
          <div className={`grid w-full gap-[12px] ${colsCls}`}>
            {question.answers.map((answer, i) => {
              const selected = value === answer.value;
              const icon = question.icons?.[i];
              return (
                <div
                  key={answer.value}
                  role="button"
                  aria-label={answer.label}
                  onClick={() => onSelect(stepIndex, question, answer)}
                  className={`flex flex-1 cursor-pointer select-none flex-col items-center justify-center gap-[6px] rounded-[8px] border py-[24px] text-center text-[16px] leading-[22px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] ${
                    selected
                      ? "border-[#FF5C00] bg-[#fff6f1] font-bold text-[#ff5c00]"
                      : "border-[#eee] bg-white font-medium text-[#222]"
                  } ${icon ? "tracking-[-0.32px] lg:text-[16px]" : "tracking-[-0.36px] lg:text-[18px]"}`}
                >
                  {icon && (
                    <Placeholder label={icon} kind="icon" className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
                  )}
                  <div>{answer.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default function CalculatorForm({ data, expanded, onToggle, onSelect, onSubmit }: FormProps) {
  // 5개 질문이 모두 선택되어야 제출 가능 (원본 getIsFormComplete)
  const isComplete = Object.values(data).every((v) => v !== null);

  return (
    <>
      {/* ===== 상단 타이틀: 견적계산기 / 매장에 맞는 CCTV와 수량을 추천해드려요 ===== */}
      <header className="mt-[40px] w-full lg:mt-[88px]">
        <h1 className="text-center text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-[#ff5c00] lg:text-[20px]">
          견적계산기
        </h1>
        <h2 className="mt-[6px] text-center text-[28px] font-bold leading-[38px] tracking-[-1px] text-[#222] lg:text-[36px] lg:leading-[48px]">
          매장에 맞는 CCTV와 수량을
          <br />
          추천해드려요
        </h2>
      </header>

      {/* ===== STEP 01~05 아코디언 ===== */}
      <section className="mx-auto mt-[56px] w-full lg:mt-[80px] lg:w-[1080px]">
        {QUESTIONS.map((q, i) => (
          <Step
            key={q.key}
            stepIndex={i + 1}
            question={q}
            value={data[q.key]}
            isExpanded={!!expanded[i + 1]}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
      </section>

      {/* ===== 견적 확인하기: 모든 STEP 선택 시 활성화 ===== */}
      <div className="mx-[20px] mb-[120px] mt-[40px] flex items-center lg:mx-0 lg:mb-[132px] lg:mt-[64px]">
        <button
          type="button"
          aria-label="견적 확인하기"
          onClick={onSubmit}
          disabled={!isComplete}
          className="mx-auto flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#ff5c00] text-[16px] font-bold leading-[24px] tracking-[-0.3px] text-white disabled:cursor-default disabled:bg-[#eee] disabled:text-[#bbb] lg:h-[72px] lg:w-[420px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]"
        >
          견적 확인하기
        </button>
      </div>
    </>
  );
}
