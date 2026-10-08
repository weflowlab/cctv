"use client";

/**
 * 매장운영 시스템 가이드 — "우리 매장 알바 관리 지금 어떤 상태인가요?" 자가진단 체크리스트
 * - 원본 동작:
 *   · 6개 항목 카드를 클릭할 때마다 선택/해제 토글 (Set 으로 관리)
 *   · 선택 개수에 따라 하단 결과 박스 문구/색상이 바뀜
 *       0개 → "아직은 큰 문제는 없어 보여요" (검정)
 *       1~3개 → "조금씩 관리 부담이 쌓이고 있어요" (검정)
 *       4개 이상 → "4개 이상 해당됩니다! …" (주황) + 우측 하단 인물 이미지가 아래에서 페이드인
 */
import { useState } from "react";
import Placeholder from "@/components/common/Placeholder";

const ITEMS = [
  "같은 내용을 알바생마다 처음부터\n다시 설명하고 있다",
  "스케줄 변경이나 대타 요청이 생기면\n사장님이 직접 나서서 해결한다",
  "출퇴근 시간을 알바 말만 듣고\n급여를 계산한다",
  "알바 시급 계산기나 엑셀로\n매달 직접 정산하느라 실수가 생긴다",
  "지각, 무단결근 같은 문제가 생겨도\n어떻게 대응해야 할지 기준이 없다",
  "사장님이 자리를 비우면 무슨 일이\n생길지 불안하다",
];

const RESULTS = [
  {
    title: "아직은 큰 문제는 없어 보여요",
    desc: "다만 알바 관리가 사장님 개인 역량에만 의존하고 있지는 않은지 한 번 점검해보세요.",
    type: "dark",
  },
  {
    title: "조금씩 관리 부담이 쌓이고 있어요",
    desc: "지금은 버틸 수 있지만, 스케줄·급여·문제 대응 기준이 정리되지 않으면 같은 문제가 반복될 수 있어요.",
    type: "dark",
  },
  {
    title: "4개 이상 해당됩니다! \n이 가이드북을 꼭 끝까지 읽어보세요.",
    desc: "알바 관리가 힘든 건 사장님 잘못이 \n아닙니다. 운영 시스템이 \n아직 만들어지지 않았을 뿐이에요.",
    type: "orange",
  },
] as const;

/** 선택 개수 → 결과 인덱스 (원본: 0 → 0, 1~3 → 1, 4+ → 2) */
const resultIndex = (count: number) => (count === 0 ? 0 : count <= 3 ? 1 : 2);

/** 체크 원 아이콘 (선택 시 주황, 미선택 회색) */
function CheckDot({ fill }: { fill: string }) {
  return (
    <svg className="h-[18px] w-[18px] transition-colors duration-150 lg:h-[24px] lg:w-[24px]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="12" fill={fill} />
      <path d="m7 12.3 3.2 3.2L17 8.7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 결과 박스 아이콘 (느낌표 원, currentColor) */
function AlertIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="11.67" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 9.33V14M14 18.67h.01" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Checklist() {
  // 선택된 항목 인덱스 집합
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  // 항목 클릭: 있으면 제거, 없으면 추가 (불변 업데이트)
  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const result = RESULTS[resultIndex(selected.size)];
  const isOrange = result.type === "orange";

  return (
    // ===== 자가진단 체크리스트: 토글 + 결과 박스 =====
    <section className="relative w-full bg-white px-4 py-[64px] lg:px-0 lg:pt-[140px] lg:pb-[116px]">
      <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center lg:w-[1080px] lg:max-w-none">
        <div className="mb-[40px] flex flex-col items-center gap-[10px] text-center lg:gap-[14px]">
          <h2 className="text-[26px] leading-[1.4] font-bold text-[#1a1a1a] lg:text-[40px]">
            우리 <span className="text-[#ff5c00]">매장 알바 관리</span>
            <br />
            지금 어떤 상태인가요?
          </h2>
          <p className="text-[14px] leading-[1.4] font-normal tracking-[-0.36px] text-[rgba(32,32,32,0.6)] lg:text-[18px]">
            가이드북을 읽기 전에 먼저 확인해보세요.
          </p>
        </div>

        {/* 체크 항목 2열 그리드 */}
        <div className="mb-[24px] grid w-full grid-cols-2 gap-[10px] lg:mb-[40px] lg:gap-x-[20px] lg:gap-y-[16px]">
          {ITEMS.map((text, i) => {
            const on = selected.has(i);
            return (
              <button
                key={text}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`flex cursor-pointer flex-col items-start gap-[8px] rounded-[10px] border-[1.5px] p-[16px] text-left transition-[fill,background-color,border-color] duration-150 ease-in-out select-none lg:flex-row lg:items-center lg:gap-[14px] lg:px-[24px] lg:py-[20px] ${
                  on ? "border-[#ff5c00] bg-[#fff5f0]" : "border-[#e0e0e0] bg-white"
                }`}
              >
                <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full">
                  <CheckDot fill={on ? "#FF5C00" : "#D2D2D2"} />
                </div>
                <span className="text-[15px] leading-[1.5] font-normal tracking-[-0.36px] whitespace-normal text-[#202020] transition-colors duration-150 lg:text-[18px] lg:whitespace-pre-line">
                  {text}
                </span>
              </button>
            );
          })}
        </div>

        {/* 결과 박스: 선택 개수에 따라 문구/배경 전환 */}
        <div
          aria-live="polite"
          className={`relative flex w-full items-center gap-[10px] overflow-hidden rounded-[8px] px-[14px] py-[16px] transition-colors duration-[250ms] ease-in-out lg:gap-[20px] lg:px-[40px] lg:py-[28px] ${
            isOrange ? "bg-[#ff6c3a]" : "bg-[#202020]"
          }`}
        >
          <div className={`flex items-center justify-center ${isOrange ? "text-white" : "text-[#FF5C00]"}`}>
            <AlertIcon />
          </div>
          <div className="flex max-w-[240px] flex-col gap-[6px] whitespace-pre-wrap lg:max-w-none lg:whitespace-normal">
            <p className="text-[15px] leading-[1.4] font-bold text-white lg:text-[17px]">{result.title}</p>
            <p className={`text-[14px] leading-[1.55] font-normal ${isOrange ? "text-white/85" : "text-white/65"}`}>{result.desc}</p>
          </div>
          {/* 4개 이상일 때만 아래에서 올라오며 나타나는 인물 이미지 */}
          <div
            className={`absolute right-[-18px] bottom-0 ml-auto transition-[opacity,transform] duration-[250ms] ease-in-out lg:right-[26px] ${
              isOrange ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
            }`}
          >
            <Placeholder label="고민하는 사람" className="aspect-[120/130] w-[106px] lg:w-[120px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
