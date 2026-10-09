"use client";

/**
 * 렌탈 서비스 진행 과정 5단계 (클라이언트 컴포넌트)
 * - keeper employee UsageGuideSection 의 자동 진행(useStepProgress) 틀을 5단계용으로 단순화.
 * - 동작: 2.5초마다 다음 단계가 활성화(브랜드색)되고, 활성 단계 아래 진행 바가 0→100% 로 채워짐.
 *   5단계 뒤에는 1단계로 순환. 단계를 클릭하면 그 단계부터 타이머를 다시 잰다.
 * - 화면 밖에 있을 땐 멈춤(IntersectionObserver) — 보이기 시작할 때 1단계부터 재생.
 * - PC: 가로 5칸 + 단계 사이 연결선 / 모바일: 세로 목록.
 */
import { useEffect, useRef, useState } from "react";
import { RENTAL_STEPS } from "./data";

const STEP_MS = 2500;
const TICK_MS = 50;

export default function RentalSteps() {
  const rootRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);
  // elapsed: 현재 단계 시작 후 지난 시간(ms) → 진행 바 비율
  // (단계와 경과 시간을 한 state 로 묶어 updater 안에서 함께 갱신 — StrictMode 이중 실행에도 안전)
  const [{ current, elapsed }, setProgress] = useState({ current: 0, elapsed: 0 });

  // 뷰포트 진입/이탈 감지
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 보이는 동안만 TICK_MS 간격으로 진행. STEP_MS 를 넘기면 다음 단계(마지막 → 처음)
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setProgress((p) =>
        p.elapsed + TICK_MS < STEP_MS
          ? { current: p.current, elapsed: p.elapsed + TICK_MS }
          : { current: (p.current + 1) % RENTAL_STEPS.length, elapsed: 0 },
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, [visible]);

  const goTo = (i: number) => {
    setProgress({ current: i, elapsed: 0 });
  };

  const ratio = Math.min(elapsed / STEP_MS, 1);

  return (
    <ol ref={rootRef} className="relative mt-[32px] flex flex-col gap-[10px] lg:mt-[64px] lg:flex-row lg:gap-[16px]">
      {RENTAL_STEPS.map((title, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <li key={title} className="relative flex-1">
            {/* PC: 단계 사이 연결선 (마지막 제외) */}
            {i < RENTAL_STEPS.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-[calc(100%+2px)] top-1/2 hidden h-[2px] w-[12px] -translate-y-1/2 lg:block ${
                  isDone ? "bg-brand" : "bg-[#dedede]"
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={isActive ? "step" : undefined}
              className={`relative flex w-full cursor-pointer items-center gap-[14px] overflow-hidden rounded-[14px] border px-[20px] py-[18px] text-left transition-colors duration-300 lg:flex-col lg:gap-[12px] lg:px-[12px] lg:py-[32px] lg:text-center ${
                isActive ? "border-brand bg-brand-light" : "border-[#eee] bg-white"
              }`}
            >
              <span
                className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full text-[15px] font-bold transition-colors duration-300 lg:h-[52px] lg:w-[52px] lg:text-[20px] ${
                  isActive || isDone ? "bg-brand text-white" : "bg-[#f5f5f5] text-[#888]"
                }`}
              >
                {i + 1}
              </span>
              <span className="flex flex-col lg:items-center">
                <span className="text-[12px] font-medium tracking-[-0.24px] text-[#888] lg:text-[14px]">Service {i + 1}</span>
                <span
                  className={`text-[17px] font-bold leading-[26px] tracking-[-0.34px] lg:text-[20px] lg:leading-[30px] ${
                    isActive ? "text-point-strong" : "text-[#222]"
                  }`}
                >
                  {title}
                </span>
              </span>
              {/* 활성 단계 진행 바 */}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] bg-brand"
                  style={{ width: `${ratio * 100}%` }}
                />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
