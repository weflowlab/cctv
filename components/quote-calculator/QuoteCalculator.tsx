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
 * - 장소 미리 선택: /calculator?place=<slug> (시공사례 장소 소개의 [이 공간 견적 계산하기])
 *   → STEP 01(공간 종류)을 해당 장소로 선택하고 STEP 02 를 펼친 상태로 시작. 잘못된 slug·쿼리 없음 = 기존과 동일.
 *   useSearchParams 는 Suspense 안(CalculatorFromParams)에서만 읽고, 대기 중엔 미선택 상태 계산기를 보여준다.
 */
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { PLACES, type PlaceSlug } from "@/lib/site";
import QuestionStep from "./QuestionStep";
import QuoteResult from "./QuoteResult";
import { INITIAL_DATA, QUESTIONS, calcRecommendedCount, type QuoteData } from "./data";
import Eyebrow from "@/components/common/Eyebrow";

const INITIAL_EXPANDED = QUESTIONS.map((_, i) => i === 0);
/** 장소가 미리 선택된 경우: STEP 02 만 펼침 */
const PRESELECTED_EXPANDED = QUESTIONS.map((_, i) => i === 1);

export default function QuoteCalculator() {
  return (
    <Suspense fallback={<Calculator initialPlace={null} />}>
      <CalculatorFromParams />
    </Suspense>
  );
}

/** ?place=<slug> 를 읽어 계산기에 전달 (PLACES 에 없는 값은 무시) */
function CalculatorFromParams() {
  const raw = useSearchParams().get("place");
  const place = PLACES.find((p) => p.slug === raw)?.slug ?? null;
  // key: 같은 페이지에서 쿼리만 바뀌어도 초기 상태를 다시 잡도록
  return <Calculator key={place ?? "none"} initialPlace={place} />;
}

function Calculator({ initialPlace }: { initialPlace: PlaceSlug | null }) {
  const [data, setData] = useState<QuoteData>(() =>
    initialPlace ? { ...INITIAL_DATA, place: initialPlace } : INITIAL_DATA,
  );
  const [expanded, setExpanded] = useState<boolean[]>(initialPlace ? PRESELECTED_EXPANDED : INITIAL_EXPANDED);
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
      <header className="flex flex-col items-center text-center">
        <Eyebrow className="mb-[14px] lg:mb-[18px]">Estimate</Eyebrow>
        <h1 className="text-[26px] font-bold leading-[36px] tracking-[-1px] text-[#222] lg:text-[36px] lg:leading-[48px]">
          우리 공간에 맞는 CCTV 수량과
          <br />
          예상 견적을 알려드려요
        </h1>
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
          className="mx-auto flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[8px] bg-brand text-[16px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-brand-strong disabled:cursor-default disabled:bg-[#eee] disabled:text-[#bbb] lg:h-[72px] lg:w-[420px] lg:text-[20px] lg:tracking-[-0.4px]"
        >
          결과 보기
        </button>
      </div>
    </div>
  );
}
