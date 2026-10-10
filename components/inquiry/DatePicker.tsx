"use client";

/**
 * 희망 서비스일 달력 (외부 라이브러리 없이 직접 구현)
 * - 입력칸(버튼)을 누르면 달력 팝업이 떠서 다른 입력칸을 덮음. 열 때 화면에서 입력칸 위·아래 남은 공간을 비교해 더 넓은 쪽으로 연다. 바깥 클릭·ESC 로 닫힘, 날짜를 고르면 닫힘.
 * - 오늘 이전 날짜는 선택 불가(흐리게 + 비활성). 이전 달 버튼도 이번 달에서는 비활성.
 * - 오늘 = 틸 테두리, 선택한 날 = 네이비 원, 일요일 빨강 · 토요일 파랑.
 * - 값은 "YYYY-MM-DD" 문자열 (빈 문자열 = 미선택). 화면에는 "2026년 10월 15일 (목)" 으로 표시.
 * - 오늘 날짜는 달력을 열 때(클릭 이벤트) 읽는다 — 렌더 중 현재 시각을 읽으면 정적 프리렌더와 충돌.
 */
import { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** Date → "YYYY-MM-DD" (로컬 기준) */
function toKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** "YYYY-MM-DD" → 화면 표시 문자열 */
function formatLabel(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const day = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${y}년 ${m}월 ${d}일 (${day})`;
}

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  /** 입력칸 스타일 (폼의 다른 입력칸과 동일하게) */
  className: string;
};

export default function DatePicker({ id, value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  // 오늘(열 때 갱신) · 보고 있는 달(1일)
  const [todayKey, setTodayKey] = useState("");
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // 팝업 방향: 열 때 화면 기준 위/아래 남은 공간 중 넓은 쪽
  const [dropUp, setDropUp] = useState(false);

  // 바깥 클릭 · ESC 로 닫기
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (open) return setOpen(false);
    const now = new Date();
    setTodayKey(toKey(now));
    // 선택한 날이 있으면 그 달, 없으면 이번 달부터
    const base = value ? new Date(`${value}T00:00:00`) : now;
    setView({ y: base.getFullYear(), m: base.getMonth() });
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) setDropUp(rect.top > window.innerHeight - rect.bottom);
    setOpen(true);
  };

  const move = (step: number) =>
    setView((v) => {
      if (!v) return v;
      const d = new Date(v.y, v.m + step, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  // 보고 있는 달의 칸: 앞쪽 빈칸(1일 요일만큼) + 날짜들
  const cells: (Date | null)[] = [];
  if (view) {
    const first = new Date(view.y, view.m, 1).getDay();
    const last = new Date(view.y, view.m + 1, 0).getDate();
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= last; d++) cells.push(new Date(view.y, view.m, d));
  }
  // 이번 달보다 앞으로는 못 감
  const atCurrentMonth = !!view && `${view.y}-${String(view.m + 1).padStart(2, "0")}` <= todayKey.slice(0, 7);

  return (
    <div ref={wrapRef} className="relative">
      {/* ===== 입력칸: 선택한 날짜 또는 안내 문구 + 달력 아이콘 ===== */}
      <button
        id={id}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${className} flex cursor-pointer items-center justify-between text-left`}
      >
        <span className={value ? "text-[#4a5565]" : "text-[#999]"}>{value ? formatLabel(value) : "날짜를 선택해주세요"}</span>
        {/* 달력 아이콘: 평소 회색, 열려 있거나 날짜를 골랐을 때 틸 */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
          className={`shrink-0 transition-colors duration-200 ${open || value ? "text-point" : "text-[#999]"}`}
        >
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        </svg>
      </button>

      {/* ===== 달력 팝업 (위·아래 중 공간이 넓은 쪽으로 떠서 덮음) ===== */}
      {open && view && (
        <div
          role="dialog"
          aria-label="희망 서비스일 선택"
          className={`absolute left-0 z-[20] ${dropUp ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"} w-full max-w-[340px] rounded-[16px] border border-[#eef0f4] bg-white p-[16px] shadow-[0_12px_32px_rgba(10,45,91,0.14)] lg:p-[20px]`}
        >
          {/* 월 이동 */}
          <div className="mb-[12px] flex items-center justify-between">
            <button
              type="button"
              aria-label="이전 달"
              onClick={() => move(-1)}
              disabled={atCurrentMonth}
              className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full text-[#444] transition-colors hover:bg-brand-light disabled:cursor-default disabled:text-[#ddd] disabled:hover:bg-transparent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-[16px] font-bold tracking-[-0.3px] text-[#222] lg:text-[17px]">
              {view.y}년 {view.m + 1}월
            </p>
            <button
              type="button"
              aria-label="다음 달"
              onClick={() => move(1)}
              className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full text-[#444] transition-colors hover:bg-brand-light"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* 요일 머리글 */}
          <div className="grid grid-cols-7 text-center text-[12px] font-medium text-[#999] lg:text-[13px]">
            {WEEKDAYS.map((w, i) => (
              <span key={w} className={`pb-[8px] ${i === 0 ? "text-[#e5484d]" : i === 6 ? "text-[#3a7bd5]" : ""}`}>
                {w}
              </span>
            ))}
          </div>

          {/* 날짜 칸 */}
          <div className="grid grid-cols-7 gap-y-[4px]">
            {cells.map((d, i) => {
              if (!d) return <span key={`blank-${i}`} />;
              const key = toKey(d);
              const past = key < todayKey;
              const selected = key === value;
              const isToday = key === todayKey;
              const dow = d.getDay();
              const tone = selected
                ? "bg-brand font-bold text-white"
                : past
                  ? "cursor-default text-[#d5d8de]"
                  : `hover:bg-brand-light ${isToday ? "font-bold ring-1 ring-point ring-inset" : ""} ${
                      dow === 0 ? "text-[#e5484d]" : dow === 6 ? "text-[#3a7bd5]" : "text-[#333]"
                    }`;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={past}
                  aria-label={formatLabel(key)}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full text-[14px] transition-colors lg:h-[40px] lg:w-[40px] lg:text-[15px] ${tone}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* 하단: 선택 해제 */}
          {value && (
            <div className="mt-[12px] flex justify-end border-t border-[#f0f0f0] pt-[10px]">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="cursor-pointer text-[13px] text-[#999] underline underline-offset-[3px] hover:text-point-strong"
              >
                선택 해제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
