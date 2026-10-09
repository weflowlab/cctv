"use client";

/**
 * 견적 계산기 전체 흐름 (클라이언트 컴포넌트)
 * - 한 페이지 안에서 상태로 단계 전환: 질문(form) → 결과(result). 연락처는 받지 않음.
 * - 질문 (keeper 아코디언 STEP 틀)
 *   · 처음엔 STEP 01 만 펼침
 *   · 선택지를 고르면 현재 STEP 은 접히고, 다음 STEP 이 아직 미선택이면 자동으로 펼쳐지며 스크롤
 *   · 같은 값을 다시 누르면 선택 해제 (STEP 은 열린 채 유지)
 *   · 6개 모두 고르면 [결과 보기] 활성 + 버튼 위치로 스크롤
 * - [결과 보기] → keeper 계산식으로 추천 대수 계산 → 결과 화면으로 전환하고 맨 위로 부드럽게 스크롤
 * - 결과의 [다시 계산하기] → 선택 초기화 후 질문 화면(STEP 01 펼침)으로
 */
import { useEffect, useRef, useState } from "react";
import QuestionStep from "./QuestionStep";
import QuoteResult from "./QuoteResult";
import { INITIAL_DATA, QUESTIONS, calcRecommendedCount, type QuoteData } from "./data";

const INITIAL_EXPANDED = QUESTIONS.map((_, i) => i === 0);

export default function QuoteCalculator() {
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  const [expanded, setExpanded] = useState<boolean[]>(INITIAL_EXPANDED);
  // 결과 화면의 추천 대수 (null 이면 질문 화면)
  const [recommended, setRecommended] = useState<number | null>(null);
  const submitRef = useRef<HTMLDivElement>(null);
  // 마지막 선택으로 모든 STEP 이 채워졌을 때 [결과 보기] 로 스크롤하기 위한 플래그
  const scrollToSubmitRef = useRef(false);

  const isComplete = Object.values(data).every((v) => v !== null);

  // 단계 전환(질문 ↔ 결과) 시 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [recommended]);

  // 모든 STEP 선택 완료 → [결과 보기] 버튼을 화면 가운데로
  useEffect(() => {
    if (isComplete && scrollToSubmitRef.current) {
      scrollToSubmitRef.current = false;
      submitRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isComplete, data]);

  const toggle = (i: number) => setExpanded((prev) => prev.map((open, idx) => (idx === i ? !open : open)));

  /** 선택지 클릭: 선택/해제 + 현재 STEP 접고 다음 미선택 STEP 펼침 */
  const select = (i: number, value: string) => {
    const key = QUESTIONS[i].key;
    if (data[key] === value) {
      setData({ ...data, [key]: null });
      return;
    }
    const next = { ...data, [key]: value };
    setData(next);
    const nextKey = QUESTIONS[i + 1]?.key;
    const openNext = nextKey !== undefined && next[nextKey] === null;
    setExpanded((prev) => prev.map((open, idx) => (idx === i ? false : idx === i + 1 && openNext ? true : open)));
    if (Object.values(next).every((v) => v !== null)) scrollToSubmitRef.current = true;
  };

  const reset = () => {
    setData(INITIAL_DATA);
    setExpanded(INITIAL_EXPANDED);
    setRecommended(null);
  };

  if (recommended !== null) {
    return <QuoteResult data={data} recommended={recommended} onReset={reset} />;
  }

  return (
    <div className="mx-auto w-full max-w-[580px] px-[16px] pb-[100px] pt-[40px] lg:w-[1080px] lg:max-w-none lg:px-0 lg:pb-[132px] lg:pt-[88px]">
      {/* ===== 타이틀 ===== */}
      <header className="text-center">
        <h1 className="text-[16px] font-bold leading-[28px] tracking-[-0.5px] text-[#ff5c00] lg:text-[20px]">견적 계산기</h1>
        <p className="mt-[6px] text-[26px] font-bold leading-[36px] tracking-[-1px] text-[#222] lg:text-[36px] lg:leading-[48px]">
          우리 공간에 맞는 CCTV 수량과
          <br />
          예상 견적을 알려드려요
        </p>
      </header>

      {/* ===== STEP 01~06 아코디언 ===== */}
      <div className="mt-[40px] lg:mt-[72px]">
        {QUESTIONS.map((q, i) => (
          <QuestionStep
            key={q.key}
            stepIndex={i + 1}
            question={q}
            value={data[q.key]}
            isExpanded={expanded[i]}
            onToggle={() => toggle(i)}
            onSelect={(v) => select(i, v)}
          />
        ))}
      </div>

      {/* ===== 결과 보기: 6개 모두 선택 시 활성 ===== */}
      <div ref={submitRef} className="mt-[40px] lg:mt-[64px]">
        <button
          type="button"
          disabled={!isComplete}
          onClick={() => setRecommended(calcRecommendedCount(data))}
          className="mx-auto flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#ff5c00] text-[16px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-[#e83b05] disabled:cursor-default disabled:bg-[#eee] disabled:text-[#bbb] lg:h-[72px] lg:w-[420px] lg:text-[20px] lg:tracking-[-0.4px]"
        >
          결과 보기
        </button>
      </div>
    </div>
  );
}
