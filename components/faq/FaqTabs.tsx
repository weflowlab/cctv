"use client";

/**
 * FAQ 카테고리 탭 (원본 sc-4b09ebbe-6)
 * - 원본 동작: 탭 클릭 시 모든 탭에서 "clicked" 클래스를 제거하고 누른 탭에만 추가(주황 배경),
 *   해당 카테고리 섹션(id = 카테고리명)으로 scrollIntoView({ behavior: "instant", block: "start" }).
 *   섹션 쪽 scroll-margin-top 으로 헤더에 가리지 않게 멈춘다.
 * - 처음에는 아무 탭도 선택되지 않은 상태 (원본과 동일).
 * - hover 시에도 주황 배경 + 흰 글자.
 */
import { useState } from "react";

type Props = { labels: string[] };

export default function FaqTabs({ labels }: Props) {
  // 마지막으로 클릭한 탭 (원본의 .clicked 클래스 대응)
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setClicked(label);
    document.getElementById(label)?.scrollIntoView({ behavior: "instant", block: "start" });
  };

  return (
    <div className="mx-0 mb-[54px] mt-[32px] flex w-full max-w-[1180px] flex-wrap items-center justify-center gap-[10px] px-[12px] lg:mb-[120px] lg:mt-[64px] lg:justify-start lg:gap-[14px] lg:px-0">
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => handleClick(label)}
          className={`flex h-[38px] w-max items-center rounded-[100px] px-[14px] pb-[14px] pt-[12px] text-[14px] font-semibold leading-[130%] tracking-[-1px] transition-colors duration-200 ease-in-out hover:bg-[#ff5c00] hover:text-white lg:h-[44px] lg:px-[20px] lg:text-[16px] ${
            clicked === label ? "bg-[#ff5c00] text-white" : "bg-[#2c2d30] text-[#afb2ba]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
