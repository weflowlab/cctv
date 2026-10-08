/**
 * 2026 트렌드 리포트 — "이런 분들에게 추천" 카드 3개 섹션 (Vol.1 / Vol.2 공용)
 * - PC: 3열 회색 카드(아이콘 위 / 텍스트 아래, 가운데 정렬)
 * - 모바일: 세로 스택, 카드 안은 아이콘 좌측 / 텍스트 우측
 * - 텍스트의 "\n" 은 white-space: pre-wrap 으로 줄바꿈된다(원본 동일).
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

type Item = { alt: string; title: string; desc: string };

type Props = {
  /** 제목 (strong 강조 포함) */
  title: ReactNode;
  items: Item[];
};

export default function Recommend({ title, items }: Props) {
  return (
    // ===== 추천 대상 카드: 정적 섹션 =====
    <div className="relative flex w-full flex-col items-center justify-center px-4 py-[64px] whitespace-pre-wrap lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[32px] lg:w-[1080px] lg:max-w-none lg:gap-[40px]">
        <h2 className="text-center text-[26px] leading-[1.4] font-bold tracking-[-1px] whitespace-pre-wrap text-black lg:text-[42px] lg:leading-[1.44] lg:whitespace-nowrap">
          {title}
        </h2>
        <div className="flex flex-col gap-[16px] lg:flex-row lg:gap-[24px]">
          {items.map((it) => (
            <div
              key={it.alt}
              className="flex flex-[1_0_0] flex-row items-center rounded-[20px] bg-[#f5f5f7] py-[22px] pr-[24px] pl-[22px] text-center lg:flex-col lg:px-[30px] lg:py-[40px]"
            >
              <Placeholder label={it.alt} kind="icon" className="h-[48px] w-[48px] shrink-0 lg:h-[100px] lg:w-[100px]" />
              <div className="mt-0 ml-[24px] flex flex-col gap-[7px] text-left lg:mt-[24px] lg:ml-0 lg:gap-[8px] lg:text-center">
                <p className="text-[20px] leading-[1.25] font-bold text-[#1e1e30] lg:text-[24px]">{it.title}</p>
                <p className="text-[14px] leading-[1.6] font-normal tracking-[-0.5px] text-[#666] lg:text-[17px]">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
