"use client";

/**
 * 카메라 대수 슬라이더 (공용 · 클라이언트 컴포넌트)
 * - keeper /plan PriceCard 의 수량 슬라이더 틀: [−] 트랙 + 채움 바 + 드래그 핸들(말풍선 "N대") [+]
 * - 사용처: 렌탈 탭 요금 슬라이더(RentalSlider), 견적 계산기 결과(대수 조정)
 * - 인터랙션
 *   · 트랙 아무 곳이나 누르면 그 위치로 이동, 누른 채로 끌면 계속 따라감 (마우스·터치 공통 Pointer Events)
 *     → setPointerCapture 로 트랙 밖으로 손가락이 나가도 드래그 유지, 트랙 영역은 touch-none 으로 페이지 스크롤 방지
 *   · −/+ 버튼으로 1대씩, 최소/최대에서는 비활성
 *   · 핸들에 포커스 후 ←/→(↑/↓) 1대씩, Home/End 최소/최대 (role="slider")
 */
import { useRef, type KeyboardEvent, type PointerEvent } from "react";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  /** 바깥 여백 등 (말풍선이 핸들 위로 올라오므로 위쪽 여백을 넉넉히 줄 것) */
  className?: string;
};

const stepBtn =
  "flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-2 border-[#eee] bg-white text-[#222] hover:bg-[#f8f8f8] disabled:cursor-not-allowed disabled:bg-[#eee] disabled:text-[#bbb] lg:h-[56px] lg:w-[56px]";

export default function CountSlider({ value, onChange, min = 1, max = 16, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const clamp = (n: number) => Math.min(Math.max(n, min), max);
  const progress = ((clamp(value) - min) / (max - min)) * 100;

  // 포인터 x 좌표 → 트랙 대비 비율 → 가장 가까운 정수 대수
  const moveTo = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const next = Math.round(min + (max - min) * ratio);
    if (next !== value) onChange(next);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) moveTo(e.clientX);
  };
  const stopDrag = () => {
    draggingRef.current = false;
  };

  // 키보드 조작 (접근성)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = {
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      Home: min,
      End: max,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = clamp(map[e.key]);
    if (next !== value) onChange(next);
  };

  return (
    <div className={`flex h-[40px] w-full items-center gap-[12px] lg:h-[56px] lg:gap-[32px] ${className}`}>
      {/* ===== − 버튼: 최소면 비활성 ===== */}
      <button type="button" aria-label="1대 빼기" className={stepBtn} disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>
          <path fill="currentColor" fillRule="evenodd" d="M2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1" clipRule="evenodd" />
        </svg>
      </button>

      {/* ===== 트랙: 누르기·드래그로 대수 선택 (위아래 여백까지 터치 영역) ===== */}
      <div
        className="relative flex-1 cursor-pointer touch-none py-[12px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <div ref={trackRef} className="relative h-[16px] w-full rounded-[24px] bg-[#e5e9f1] lg:h-[22px] lg:rounded-[32px]">
          {/* 채움 바 (오른쪽 끝에 핸들) */}
          <div
            className="absolute inset-y-0 left-0 rounded-[24px] bg-point/40 transition-[width] duration-150 ease-out lg:rounded-[32px]"
            style={{ width: `${progress}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="카메라 대수"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-valuetext={`${value}대`}
              onKeyDown={onKeyDown}
              className="absolute right-[-14px] top-1/2 h-[28px] w-[28px] -translate-y-1/2 rounded-full bg-brand outline-offset-2 before:absolute before:left-1/2 before:top-1/2 before:h-[10px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-[''] focus-visible:outline-2 focus-visible:outline-point lg:right-[-20px] lg:h-[40px] lg:w-[40px] lg:before:h-[14px] lg:before:w-[14px]"
            >
              {/* 핸들 위 말풍선 "N대" */}
              <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#333] px-[8px] pb-[4px] pt-[3px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#f5f5f5] before:absolute before:left-1/2 before:top-[calc(100%-1px)] before:h-0 before:w-0 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-[#333] before:content-[''] lg:bottom-[calc(100%+12px)] lg:rounded-[8px] lg:px-[10px] lg:pb-[6px] lg:pt-[5px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px] lg:before:border-[8px] lg:before:border-t-[#333]">
                <strong className="mr-[2px] font-bold text-white">{value}</strong>대
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== + 버튼: 최대면 비활성 ===== */}
      <button type="button" aria-label="1대 더하기" className={stepBtn} disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>
          <path fill="currentColor" fillRule="evenodd" d="M2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1" clipRule="evenodd" />
          <path fill="currentColor" fillRule="evenodd" d="M12 2a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
