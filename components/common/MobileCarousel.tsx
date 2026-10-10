"use client";

/**
 * 모바일 전용 가로 슬라이드 목록 (PC 는 넘겨 준 className 의 격자 그대로)
 * - 모바일(≤1023px): 가로 스크롤 + 한 장씩 멈춤(scroll-snap). 화면 좌우 끝까지 붙도록 섹션 여백(16px)만큼 바깥으로 넓힘.
 *   각 항목은 itemClassName 으로 너비를 지정(기본 85%) → 다음 카드가 옆에 살짝 보여 넘길 수 있음을 알려 줌.
 * - 아래 위치 점(● ○ ○): 스크롤 위치로 현재 카드 계산, 점을 누르면 그 카드로 이동.
 * - children 은 <li> 들 (as="ol" 로 순서 목록도 가능).
 * - follow: 넘기면 그 번호 카드가 보이도록 자동으로 따라 이동 (자동 진행 단계용). 사용자가 한 번 손대면 멈춤.
 */
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** PC 레이아웃 클래스 (예: "lg:grid lg:grid-cols-4 lg:gap-[16px]") + 공통 여백 */
  className?: string;
  as?: "ul" | "ol";
  /** 점 아래쪽 여백 등 감싸는 div 클래스 */
  wrapperClassName?: string;
  /** 자동으로 따라갈 카드 번호 */
  follow?: number;
};

export default function MobileCarousel({ children, className = "", as: Tag = "ul", wrapperClassName = "", follow }: Props) {
  const listRef = useRef<HTMLUListElement & HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  // 사용자가 직접 넘기기 시작하면 자동 따라가기 중단
  const touched = useRef(false);
  const count = Children.count(children);

  // 스크롤 위치 → 현재 카드 번호 (끝까지 가면 마지막)
  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setIndex(Math.round((el.scrollLeft / max) * (count - 1)));
  };

  // 점 클릭 → 해당 카드로 부드럽게 이동
  const goTo = (i: number) => {
    const el = listRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !first || !item) return;
    el.scrollTo({ left: item.offsetLeft - first.offsetLeft, behavior: "smooth" });
  };

  // 자동 따라가기 — 모바일에서 가로로 넘칠 때만 (PC 격자에서는 scrollWidth 가 같아 아무 일 없음)
  useEffect(() => {
    if (follow === undefined || touched.current) return;
    const el = listRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    goTo(follow);
  }, [follow]);

  return (
    <div className={wrapperClassName}>
      <Tag
        ref={listRef}
        onScroll={onScroll}
        onPointerDown={() => (touched.current = true)}
        className={`max-lg:-mx-[16px] max-lg:flex max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-[16px] max-lg:gap-[12px] max-lg:overflow-x-auto max-lg:px-[16px] max-lg:pb-[4px] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden max-lg:[&>*]:shrink-0 max-lg:[&>*]:snap-start ${className}`}
      >
        {children}
      </Tag>

      {/* 위치 점 (모바일 전용) */}
      {count > 1 && (
        <div className="mt-[16px] flex justify-center gap-[6px] lg:hidden">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 카드 보기`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-[8px] cursor-pointer rounded-full transition-all duration-200 ${
                i === index ? "w-[20px] bg-brand" : "w-[8px] bg-[#d5d9e0]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
