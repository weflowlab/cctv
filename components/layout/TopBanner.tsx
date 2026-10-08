"use client";

/**
 * 헤더 최상단 띠 배너 (원본 layout 청크의 `l` 컴포넌트, sc-aa164b92)
 * - 높이 30px, 회색(#fafafc) 띠. 오른쪽 20px 위치에 16px X(닫기) 버튼.
 * - 원본은 isVisible 상태를 헤더(eb)에서 useState(false) 로 시작하고 켜는 곳이 없어
 *   현재 운영 사이트에서는 노출되지 않는다(이벤트 배너용 슬롯). 동일하게 기본 숨김.
 * - 닫기 클릭 시 헤더 높이 CSS 변수를 기본값(PC 80px / 모바일 72px)으로 되돌리고 숨긴다.
 * - 배너 내부 링크(`& > a` 스타일)는 원본 렌더 결과에 없어 children 슬롯으로만 남겨둠.
 */
import type { ReactNode } from "react";

type Props = {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  children?: ReactNode;
};

export default function TopBanner({ isVisible, setIsVisible, children }: Props) {
  if (!isVisible) return null;

  // 닫기: 헤더 높이 변수를 원래 값으로 복구 후 배너 숨김 (원본 동작)
  const handleClose = () => {
    document.documentElement.style.setProperty("--header-height", "80px");
    document.documentElement.style.setProperty("--header-height-mobile", "72px");
    setIsVisible(false);
  };

  return (
    <div className="relative flex h-[30px] shrink-0 items-center justify-center overflow-hidden bg-[#fafafc] [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:gap-[8px] [&>a]:text-[12px] [&>a]:font-medium [&>a]:leading-[1.4] [&>a]:tracking-[-0.24px] [&>a]:text-black">
      {children}
      <button
        type="button"
        aria-label="배너 닫기"
        onClick={handleClose}
        className="absolute right-[20px] top-1/2 flex h-[16px] w-[16px] -translate-y-1/2 items-center justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4.5 4.5l7.4 7.4M11.9 4.5l-7.4 7.4" stroke="black" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
