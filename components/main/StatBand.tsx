"use client";
/**
 * 누적 실적 숫자 띠 — LIVE 상담 신청 보드 바로 위 (아뜰리에 "17년+ · 12,350+" 띠와 같은 자리)
 * - 숫자는 고객이 준 값 (2026-10-19): 누적 시공 1,200건 · 누적 수리 950건. 바꿀 때는 STATS 만 고친다.
 * - 카운트업: 띠가 화면에 들어오면 0 → 목표까지 1.6초 동안 올라간다 (처음엔 빠르고 끝에서 천천히, 한 번만).
 *   서버 HTML 엔 최종 숫자가 들어가 있고(검색·JS 꺼진 환경), 브라우저에서 마운트되면 0 으로 내렸다가 보일 때 센다.
 *   폰의 "애니메이션 줄이기"(prefers-reduced-motion) 설정과 상관없이 센다 — 삼성 폰은 절전 모드만 켜도 이 설정이 잡혀
 *   숫자가 안 움직여 "고장 났다"는 문의가 옴 (2026-10-23 대표 폰). 제휴 로고·후기 띠와 같은 결정(globals.css 참고).
 * - 숫자와 단위("건+")는 같은 크기. PC 2칸 가로 / 모바일도 2칸, 가운데 세로 구분선.
 */
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1200, unit: "건+", label: "누적 시공" },
  { value: 950, unit: "건+", label: "누적 수리" },
];

const DURATION = 1600; // 카운트업 시간(ms)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function StatBand() {
  const ref = useRef<HTMLDListElement>(null);
  // 표시 중인 숫자 — SSR 과 첫 렌더는 최종값
  const [shown, setShown] = useState<number[]>(STATS.map((s) => s.value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 마운트 직후 다음 프레임에 0 으로 내려 두고, 띠가 보이면 센다
    let raf = requestAnimationFrame(() => setShown(STATS.map(() => 0)));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / DURATION, 1);
          const k = easeOut(p);
          setShown(STATS.map((s) => Math.round(s.value * k)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <dl
      ref={ref}
      className="mx-auto mb-[24px] grid w-full max-w-[1080px] grid-cols-2 divide-x divide-line rounded-[16px] border border-line bg-white lg:mb-[32px] lg:rounded-[20px]"
    >
      {STATS.map((s, i) => (
        <div key={s.label} className="flex flex-col items-center py-[22px] lg:py-[32px]">
          {/* tabular-nums: 숫자가 올라가는 동안 폭이 흔들리지 않게 */}
          <dd className="text-[32px] font-bold leading-none tracking-[-1px] text-brand tabular-nums lg:text-[48px] lg:tracking-[-1.5px]">
            {shown[i].toLocaleString("ko-KR")}
            {s.unit}
          </dd>
          <dt className="mt-[10px] text-[13px] tracking-[-0.3px] text-sub lg:mt-[14px] lg:text-[15px]">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
