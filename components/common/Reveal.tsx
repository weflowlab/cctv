"use client";

/**
 * 스크롤 등장 애니메이션 래퍼
 * - 원본 사이트는 요소가 뷰포트에 들어오면 slide-in-up / fade-in 등의 클래스를 붙여 애니메이션한다.
 * - IntersectionObserver 로 한 번만 실행 (재진입 시 반복하지 않음).
 *
 * 사용 예)
 *   <Reveal animation="slide-in-up" delay={200}><h2>...</h2></Reveal>
 */
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Animation = "fade-in" | "slide-in-up" | "slide-in-down" | "slide-in-left" | "slide-in-right";

type RevealProps = {
  children: ReactNode;
  animation?: Animation;
  /** 애니메이션 시작 지연(ms) — 원본의 delay-200 ~ delay-1600 대응 */
  delay?: number;
  /** 감싸는 태그 (기본 div) */
  as?: ElementType;
  className?: string;
  /** 요소가 얼마나 보여야 실행할지 (0~1) */
  threshold?: number;
};

export default function Reveal({
  children,
  animation = "slide-in-up",
  delay = 0,
  as: Tag = "div",
  className = "",
  threshold = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect(); // 한 번만 실행
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${visible ? animation : "reveal-pending"} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
