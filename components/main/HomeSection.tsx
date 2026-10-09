/**
 * 홈 섹션 공통 조각 — 새로 추가한 영업 섹션들(장점·문제제기·철학·FAQ)이 기존 홈 섹션과 같은 머리말·버튼 모양을 쓰도록 묶음
 * - HomeSectionHeader : 아이브로우(영문 라벨 + 틸 라인, @/components/common/Eyebrow) + 큰 제목 + 설명 (CaseShowcase/PlaceCards 헤더와 동일 수치)
 *   dark=true 면 네이비 배경용 색(칩 반투명 흰색, 제목 흰색, strong 은 틸)
 * - HomeMoreLink : 섹션 하단 [○○ 보기 →] 알약 버튼 (CaseShowcase "시공사례 자세히 보기" 와 동일 모양)
 *   dark=true 면 흰 버튼 + 네이비 글씨. 홈 원칙: 큰 버튼은 전환(견적·상담)과 시공사례에만.
 * - HomeTextLink : 다른 페이지로 보내는 보조 이동 — 작은 밑줄 글자 링크 (버튼보다 눈에 덜 띄게)
 */
import Link from "next/link";
import Eyebrow from "@/components/common/Eyebrow";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type HeaderProps = {
  chip: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  dark?: boolean;
  className?: string;
};

export function HomeSectionHeader({ chip, title, desc, dark = false, className = "" }: HeaderProps) {
  return (
    <div className={`flex flex-col items-center gap-[16px] text-center lg:gap-[20px] ${className}`}>
      <Eyebrow dark={dark}>{chip}</Eyebrow>
      <h2
        className={`break-keep text-[26px] font-bold leading-[1.35] tracking-[-0.26px] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] ${
          dark ? "text-white [&_strong]:text-point" : "text-[#222] [&_strong]:text-point-strong"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`break-keep text-[15px] leading-[1.6] tracking-[-0.3px] lg:text-[18px] ${
            dark ? "text-white/75" : "text-sub"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function HomeMoreLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex h-[44px] w-fit items-center justify-center gap-[6px] rounded-[100px] px-[24px] text-[15px] font-bold tracking-[-0.2px] transition-colors duration-150 lg:h-[56px] lg:px-[32px] lg:text-[18px] ${
        dark ? "bg-white text-brand hover:bg-point-light" : "bg-brand text-white hover:bg-brand-strong"
      }`}
    >
      {children}
      <ArrowRightIcon className="h-[11px] w-[13px] lg:h-[13px] lg:w-[15px]" />
    </Link>
  );
}

export function HomeTextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-[4px] text-[14px] font-medium text-sub underline decoration-[#ccc] underline-offset-4 transition-colors hover:text-brand hover:decoration-brand lg:text-[16px]"
    >
      {children}
      <ArrowRightIcon className="h-[9px] w-[11px]" />
    </Link>
  );
}
