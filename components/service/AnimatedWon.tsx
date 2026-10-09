"use client";

/**
 * 금액 숫자 카운트 애니메이션 (공용 · 클라이언트 컴포넌트)
 * - 첫 렌더(SSR 포함)는 목표 값을 그대로 표시 → 값이 바뀌면 직전 표시값에서 새 값까지
 *   0.4초 동안 ease-out 으로 숫자가 굴러가듯 변한다 (requestAnimationFrame, 콤마 포함 출력).
 * - 애니메이션 도중 값이 또 바뀌면 현재 표시 중인 숫자에서 이어서 시작.
 */
import { useEffect, useRef, useState } from "react";
import { formatWon } from "./data";

const DURATION = 400;

export default function AnimatedWon({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  // 현재 화면에 보이는 숫자 (다음 애니메이션의 시작점)
  const shownRef = useRef(value);

  useEffect(() => {
    const from = shownRef.current;
    if (from === value) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(from + (value - from) * eased);
      shownRef.current = current;
      setDisplay(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{formatWon(display)}</>;
}
