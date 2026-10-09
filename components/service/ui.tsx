/**
 * 서비스 탭 공통 UI 조각 (keeper employee/plan 컴포넌트의 타이포·여백 수치를 그대로 사용)
 * - SpaceOrBreak : PC 에서는 공백, 모바일(≤1023px)에서는 줄바꿈
 * - ArrowIcon    : 버튼/링크 오른쪽 화살표
 * - SectionHeading : 섹션 상단 [작은 라벨 + 큰 제목 + 설명] 묶음 (가운데 정렬)
 * - CrossLink    : 탭 사이 교차 이동 링크 박스 (설치 ↔ 렌탈)
 */
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

export function SpaceOrBreak() {
  return (
    <>
      <span className="hidden lg:inline"> </span>
      <br className="lg:hidden" />
    </>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" aria-hidden {...props}>
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M18 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1" />
        <path d="M17.707 8.707a1 1 0 0 0 0-1.414l-7-7a1 1 0 1 0-1.414 1.414L15.586 8l-6.293 6.293a1 1 0 0 0 1.414 1.414z" />
      </g>
    </svg>
  );
}

type SectionHeadingProps = {
  /** 제목 위 작은 브랜드색 라벨 */
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, desc, className = "" }: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="text-[14px] font-bold tracking-[-0.28px] text-point-strong lg:text-[18px] lg:tracking-[-0.36px]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-[6px] text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#222] lg:mt-[10px] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] [&>strong]:text-point-strong">
        {title}
      </h2>
      {desc && (
        <p className="mt-[12px] text-[15px] font-normal leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[20px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.4px]">
          {desc}
        </p>
      )}
    </div>
  );
}

type CrossLinkProps = {
  href: string;
  /** 위쪽 회색 안내 문구 */
  caption: string;
  /** 링크 본문 (굵게) */
  label: string;
  /** 위쪽 여백 등 추가 클래스 (앞 섹션 배경이 회색이면 pt 를 줌) */
  className?: string;
};

/** 다른 탭으로 넘어가는 교차 링크 — 회색 박스 전체가 링크, 호버 시 화살표가 오른쪽으로 이동 */
export function CrossLink({ href, caption, label, className = "" }: CrossLinkProps) {
  return (
    <section className={`bg-white px-[16px] pb-[60px] lg:px-0 lg:pb-[120px] ${className}`}>
      <Link
        href={href}
        className="group mx-auto flex w-full max-w-[580px] items-center justify-between gap-[16px] rounded-[16px] bg-[#f6f7fa] px-[24px] py-[22px] transition-colors hover:bg-brand-light lg:w-[1080px] lg:max-w-none lg:rounded-[20px] lg:px-[44px] lg:py-[36px]"
      >
        <div>
          <p className="text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#888] lg:text-[18px] lg:leading-[26px]">
            {caption}
          </p>
          <p className="mt-[4px] text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-[#222] lg:mt-[6px] lg:text-[26px] lg:leading-[38px] lg:tracking-[-0.52px]">
            {label}
          </p>
        </div>
        <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-200 group-hover:translate-x-[4px] lg:h-[56px] lg:w-[56px]">
          <ArrowIcon className="h-[14px] w-[14px] lg:h-[18px] lg:w-[18px]" />
        </span>
      </Link>
    </section>
  );
}
