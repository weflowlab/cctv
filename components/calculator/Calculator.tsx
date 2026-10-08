"use client";

/**
 * 견적계산기 전체 흐름 컨트롤러 (클라이언트 컴포넌트)
 * - 원본 단계(state): "form" → "recatch" → "submitting"
 *   1) form       : STEP 01~05 질문 선택 → "견적 확인하기"
 *                   → 위치별 추천 대수 계산(calcRecommendedCctvs) 후 결과를 localStorage 에 저장
 *   2) recatch    : 휴대폰 번호 입력 폼 → 제출 성공 시 3단계
 *   3) submitting : "매장에 맞는 CCTV 찾는중..." 로딩 2초 → /calculator/result?cctvs=1,1,2,0 로 이동
 * - 진입 시 상태 초기화 + 맨 위로 부드럽게 스크롤
 */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import CalculatorForm from "./CalculatorForm";
import QuoteContactForm from "./QuoteContactForm";
import styles from "./calculator.module.css";
import {
  CALCULATOR_RESULT_KEY,
  FORM_LENGTH,
  INITIAL_DATA,
  INITIAL_EXPANDED,
  calcRecommendedCctvs,
  type CalculatorData,
  type Question,
} from "./calculatorData";

type Phase = "form" | "recatch" | "submitting";

/** 3단계 로딩 화면 (원본 sc-dcf214d9) */
function CalculatorLoading() {
  return (
    <div className="-mt-[80px] flex h-screen flex-col items-center justify-center gap-[16px] lg:gap-[56px]">
      {/* 원본 Lottie(280×180) 대체: 일러스트 + 통통 튀는 점 3개 */}
      <div className="flex h-[180px] w-[280px] flex-col items-center" aria-label="loading">
        <Placeholder label="로딩 일러스트" className="mt-[32px] h-[78px] w-[116px] rounded-[8px]" />
        <div className="mt-[22px] flex gap-[12px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`block h-[16px] w-[16px] rounded-full bg-[#ff5c00] ${styles.dot}`} />
          ))}
        </div>
      </div>
      <p className="text-center text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-[#222] lg:text-[40px] lg:leading-[56px] lg:tracking-[-1px]">
        매장에 맞는 CCTV 찾는중...
      </p>
    </div>
  );
}

export default function Calculator() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("form");
  const [data, setData] = useState<CalculatorData>(INITIAL_DATA);
  const [expanded, setExpanded] = useState<boolean[]>(INITIAL_EXPANDED);
  // 선택한 라벨 기록 (원본 savedLabels — 상담 접수 시 함께 전송)
  const savedLabelsRef = useRef<Record<string, string>>({});
  // 결과 페이지로 넘길 cctvs 파라미터 ("1,1,2,0")
  const cctvsRef = useRef("");

  // 진입 시 맨 위로 부드럽게 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 로딩 단계 진입 → 맨 위로 + 2초 뒤 결과 페이지로 이동
  useEffect(() => {
    if (phase !== "submitting") return;
    window.scrollTo({ top: 0 });
    const timer = setTimeout(() => {
      router.push(`/calculator/result?cctvs=${cctvsRef.current}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase, router]);

  /** STEP 펼침 토글 (formLength 초과 인덱스는 무시) */
  const toggleExpanded = (index: number) => {
    if (index > FORM_LENGTH) return;
    setExpanded((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  /** 선택지 클릭: 선택/해제 + 다음 STEP 자동 펼침 (원본 A 컴포넌트 u()) */
  const handleSelect = (stepIndex: number, question: Question, answer: { value: string; label: string }) => {
    const isDeselect = data[question.key] === answer.value;
    const nextIndex = stepIndex + 1;
    const outOfRange = nextIndex > FORM_LENGTH;
    const nextAlreadyOpen = !outOfRange && expanded[nextIndex];
    // 새로 선택한 경우에만, 다음 단계가 닫혀 있으면 펼친다
    if (!isDeselect && !outOfRange && !nextAlreadyOpen) toggleExpanded(nextIndex);

    setData((prev) => ({ ...prev, [question.key]: isDeselect ? null : answer.value }));
    savedLabelsRef.current = { ...savedLabelsRef.current, [question.key]: answer.label };
  };

  /** "견적 확인하기": 추천 대수 계산 → 결과 저장 → 상담 폼 단계로 */
  const handleFormSubmit = () => {
    const cctvs = calcRecommendedCctvs(data);
    const total = cctvs.reduce((a, b) => a + b, 0);
    cctvsRef.current = cctvs.join(",");
    try {
      localStorage.setItem(
        CALCULATOR_RESULT_KEY,
        JSON.stringify({ ...savedLabelsRef.current, 추천카메라대수: total, cctvs: cctvsRef.current }),
      );
    } catch {
      /* 저장 실패(사파리 프라이빗 등)는 무시 */
    }
    setPhase("recatch");
  };

  switch (phase) {
    case "form":
      return (
        <CalculatorForm
          data={data}
          expanded={expanded}
          onToggle={toggleExpanded}
          onSelect={handleSelect}
          onSubmit={handleFormSubmit}
        />
      );
    case "recatch":
      return <QuoteContactForm onSubmitted={() => setPhase("submitting")} />;
    case "submitting":
      return <CalculatorLoading />;
  }
}
