"use client";

/**
 * 관리자 공통 UI 조각 (weflow 관리자에서 이식, 색만 브랜드 네이비·틸로)
 * - adminFetch: 관리자 API 호출 — 401(세션 만료)이면 셸(AdminShell)이 로그인 화면으로 돌린다
 * - PageHead / StatCard / ActionBtn / Msg
 * - 기간 선택: PeriodSelect(프리셋 + 달력 범위) · periodRange · withinPeriod
 * - 색 변수는 app/admin/admin.css 의 .admin-root 에 정의
 */
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

/* ===================== API 호출 ===================== */

export const ADMIN_UNAUTHORIZED_EVENT = "admin:unauthorized";

/** 관리자 API 호출 — JSON 응답을 돌려주고, 401 이면 로그인 화면으로 (이벤트) */
export async function adminFetch<T = unknown>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(url, init);
  if (res.status === 401) window.dispatchEvent(new Event(ADMIN_UNAUTHORIZED_EVENT));
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}

/** JSON 본문 요청 옵션 */
export function jsonInit(method: string, body: unknown): RequestInit {
  return { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

/* ===================== 날짜 ===================== */

export const DAY_MS = 86400000;

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 접수일 표기 — YYYY-MM-DD HH:MM */
export function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ===================== 화면 머리 ===================== */

/** 페이지 머리 — 작은 라벨 + 큰 제목 + 설명, 오른쪽 액션 */
export function PageHead({
  eyebrow = "관리자",
  title,
  desc,
  action,
}: {
  eyebrow?: string;
  title: string;
  desc?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ minWidth: 0 }}>
        <p className="footnote emphasized c-accent" style={{ margin: "0 0 0.5rem", letterSpacing: "0.02em" }}>
          {eyebrow}
        </p>
        <h1
          className="emphasized"
          style={{ color: "var(--text)", margin: 0, fontSize: "clamp(1.7rem, 4vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          {title}
        </h1>
        {desc && (
          <p style={{ margin: "0.6rem 0 0", fontSize: "0.92rem", color: "var(--text-muted)", wordBreak: "keep-all" }}>{desc}</p>
        )}
      </div>
      {action && <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{action}</div>}
    </div>
  );
}

/** 요약 카드 한 장 — "전체 문의 12건" 식 */
export function StatCard({
  label,
  value,
  unit = "건",
  color = "navy",
}: {
  label: string;
  value: number | string;
  unit?: string;
  color?: "navy" | "teal";
}) {
  const accent = color === "navy" ? "var(--accent)" : "var(--point-strong)";
  return (
    <div
      className="admin-stat-card"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.25rem 1.4rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.55rem" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: color === "navy" ? "var(--accent)" : "var(--point)", flexShrink: 0 }} />
        <p className="emphasized" style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.92rem" }}>
          {label}
        </p>
      </div>
      <p style={{ margin: 0, lineHeight: 1, fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", color: accent }}>
        {value}
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)", marginLeft: "0.2rem" }}>{unit}</span>
      </p>
    </div>
  );
}

/** 표 안 작은 버튼 (진행중/완료/삭제/수정) — active 면 채워지고, red/green 으로 색을 고른다 */
export function ActionBtn({
  children,
  onClick,
  red,
  green,
  active,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  red?: boolean;
  green?: boolean;
  active?: boolean;
  disabled?: boolean;
}) {
  let bg = "var(--surface)",
    border = "var(--border)",
    color = "var(--text-secondary)";
  if (active && green) {
    bg = "var(--success-dim)";
    border = "var(--success)";
    color = "var(--success-text)";
  } else if (active) {
    bg = "var(--accent-light)";
    border = "var(--accent)";
    color = "var(--accent)";
  } else if (red) {
    border = "var(--danger)";
    color = "var(--danger)";
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "6px",
        padding: "0.3rem 0.8rem",
        fontSize: "0.85rem",
        fontWeight: active ? 700 : 500,
        color,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

/** 저장/오류 메시지 한 줄 */
export function Msg({ msg }: { msg: { ok: boolean; text: string } | null }) {
  if (!msg) return null;
  return (
    <p role="status" style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: msg.ok ? "var(--success-text)" : "var(--danger)" }}>
      {msg.text}
    </p>
  );
}

/** 흰 카드 */
export const CARD: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "1.4rem 1.5rem",
};

/* ===================== 기간 선택 (weflow 이식) ===================== */

/** 프리셋 키 하나 또는 달력으로 지정한 범위(s~e, 'YYYY-MM-DD') */
export type PeriodSel = { key: string; s?: string; e?: string };

const PERIOD_PRESETS: { key: string; label: string }[] = [
  { key: "today", label: "오늘" },
  { key: "yesterday", label: "어제" },
  { key: "7d", label: "최근 7일" },
  { key: "month", label: "이번달" },
  { key: "lastMonth", label: "지난달" },
  { key: "all", label: "전체" },
];

function dayFloor(ms: number): number {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}
function parseDay(s: string): number {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}
function isoDay(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function fmtDayDot(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}.`;
}

/** 선택 → [start, end) ms 구간. '오늘'은 로컬 자정부터, '최근 7일'은 현재 시각 기준 롤링 */
export function periodRange(p: PeriodSel, now: number): { start: number; end: number } {
  const t0 = dayFloor(now);
  switch (p.key) {
    case "today":
      return { start: t0, end: t0 + DAY_MS };
    case "yesterday":
      return { start: t0 - DAY_MS, end: t0 };
    case "7d":
      return { start: now - 7 * DAY_MS, end: t0 + DAY_MS };
    case "month": {
      const d = new Date(now);
      return { start: new Date(d.getFullYear(), d.getMonth(), 1).getTime(), end: t0 + DAY_MS };
    }
    case "lastMonth": {
      const d = new Date(now);
      return {
        start: new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime(),
        end: new Date(d.getFullYear(), d.getMonth(), 1).getTime(),
      };
    }
    case "custom": {
      const s = p.s ? parseDay(p.s) : t0;
      const e = p.e ? parseDay(p.e) : s;
      return { start: s, end: e + DAY_MS };
    }
    default:
      return { start: 0, end: t0 + DAY_MS }; // 전체
  }
}

function periodLabelOf(p: PeriodSel, now: number): string {
  if (p.key === "custom") {
    const r = periodRange(p, now);
    return `${fmtDayDot(r.start)} ~ ${fmtDayDot(r.end - DAY_MS)}`;
  }
  return PERIOD_PRESETS.find((x) => x.key === p.key)?.label ?? "기간";
}

/** createdAt 기준으로 선택 구간 안의 항목만 */
export function withinPeriod<T extends { createdAt: string }>(rows: T[], p: PeriodSel): T[] {
  if (p.key === "all") return rows;
  // 자정이 지나면 '오늘' 구간도 바뀌어야 하므로 매번 현재 시각 기준
  const { start, end } = periodRange(p, Date.now());
  return rows.filter((r) => {
    const t = new Date(r.createdAt).getTime();
    return t >= start && t < end;
  });
}

/** 기간 선택 버튼 — 누르면 프리셋 + 달력 팝오버 */
export function PeriodSelect({ value, onChange }: { value: PeriodSel; onChange: (v: PeriodSel) => void }) {
  const [open, setOpen] = useState(false);
  const [viewY, setViewY] = useState(0);
  const [viewM, setViewM] = useState(0);
  const [dS, setDS] = useState<number | null>(null); // 드래프트 시작·종료일(자정 ms)
  const [dE, setDE] = useState<number | null>(null);

  // 달력이 '오늘'을 칠할 기준 — 자정을 넘기면 바뀌어야 하므로 매 렌더 다시 읽는다
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const todayMs = dayFloor(now);

  const openPanel = () => {
    if (value.key === "all") {
      setDS(null);
      setDE(null);
      const d = new Date(now);
      setViewY(d.getFullYear());
      setViewM(d.getMonth());
    } else {
      const r = periodRange(value, now);
      const s = dayFloor(r.start);
      const e = Math.max(s, dayFloor(Math.min(r.end - DAY_MS, now)));
      setDS(s);
      setDE(e);
      const d = new Date(e);
      setViewY(d.getFullYear());
      setViewM(d.getMonth());
    }
    setOpen(true);
  };

  // 날짜 클릭 — 시작 → 종료 순서로 고르고, 시작보다 앞을 누르면 시작을 옮긴다
  const pickDay = (ms: number) => {
    if (dS != null && dE == null) {
      if (ms < dS) setDS(ms);
      else setDE(ms);
    } else {
      setDS(ms);
      setDE(null);
    }
  };

  const apply = () => {
    if (dS == null) return;
    onChange({ key: "custom", s: isoDay(dS), e: isoDay(dE ?? dS) });
    setOpen(false);
  };

  const moveMonth = (delta: number) => {
    const d = new Date(viewY, viewM + delta, 1);
    setViewY(d.getFullYear());
    setViewM(d.getMonth());
  };

  const firstDow = new Date(viewY, viewM, 1).getDay();
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const inDraft = (ms: number) => dS != null && ms >= dS && ms <= (dE ?? dS);
  const isEdge = (ms: number) => ms === dS || ms === (dE ?? dS);

  const navBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "0.15rem 0.4rem",
  };
  const dateBox: React.CSSProperties = {
    flex: 1,
    textAlign: "center",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0.4rem 0.3rem",
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "var(--text)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "0.5rem 0.9rem",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "var(--text)",
          cursor: "pointer",
        }}
      >
        <CalendarDays size={15} strokeWidth={2.2} />
        {periodLabelOf(value, now)}
        <ChevronDown size={14} strokeWidth={2.2} />
      </button>

      {open && (
        <>
          {/* 팝오버 반응형 — PC 는 버튼 아래 좌우 배치, 좁은 화면은 중앙 모달 + 프리셋 가로 칩 */}
          <style>{`
            .pp-backdrop { position: fixed; inset: 0; z-index: 80; }
            .pp-panel {
              position: absolute; top: calc(100% + 6px); left: 0; z-index: 81;
              display: flex; gap: 0.9rem; width: min(460px, calc(100vw - 2rem));
              background: var(--surface); border: 1px solid var(--border); border-radius: 14px;
              padding: 0.9rem; box-shadow: 0 16px 44px rgba(10, 45, 91, 0.14);
            }
            .pp-presets {
              display: flex; flex-direction: column; gap: 0.1rem; min-width: 88px;
              border-right: 1px solid var(--border); padding-right: 0.7rem;
            }
            .pp-preset {
              background: none; border: none; border-radius: 8px; padding: 0.45rem 0.6rem;
              text-align: left; font-size: 0.86rem; font-weight: 600; color: var(--text);
              cursor: pointer; white-space: nowrap;
            }
            .pp-preset.is-on { background: var(--accent-light); color: var(--accent); font-weight: 800; }
            @media (max-width: 640px) {
              .pp-backdrop { background: rgba(0, 0, 0, 0.5); }
              .pp-panel {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                flex-direction: column; gap: 0.7rem; width: min(330px, calc(100vw - 1.25rem));
                max-height: calc(100vh - 1.5rem); overflow-y: auto;
              }
              .pp-presets {
                flex-direction: row; flex-wrap: wrap; gap: 0.35rem; min-width: 0;
                border-right: none; border-bottom: 1px solid var(--border);
                padding-right: 0; padding-bottom: 0.65rem;
              }
              .pp-preset { border: 1px solid var(--border); border-radius: 9999px; padding: 0.32rem 0.75rem; font-size: 0.8rem; }
              .pp-preset.is-on { border-color: var(--accent); }
            }
          `}</style>
          <div className="pp-backdrop" onClick={() => setOpen(false)} />
          <div className="pp-panel">
            <div className="pp-presets">
              {PERIOD_PRESETS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`pp-preset${value.key === p.key ? " is-on" : ""}`}
                  onClick={() => {
                    onChange({ key: p.key });
                    setOpen(false);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.7rem" }}>
                <span style={dateBox}>{dS != null ? fmtDayDot(dS) : "시작일"}</span>
                <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>→</span>
                <span style={dateBox}>{dE != null ? fmtDayDot(dE) : dS != null ? fmtDayDot(dS) : "종료일"}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span>
                  <button type="button" onClick={() => setViewY(viewY - 1)} style={navBtn} aria-label="1년 전">
                    «
                  </button>
                  <button type="button" onClick={() => moveMonth(-1)} style={navBtn} aria-label="1달 전">
                    ‹
                  </button>
                </span>
                <strong style={{ fontSize: "0.9rem", color: "var(--text)", whiteSpace: "nowrap" }}>
                  {viewY}년 {pad(viewM + 1)}월
                </strong>
                <span>
                  <button type="button" onClick={() => moveMonth(1)} style={navBtn} aria-label="1달 뒤">
                    ›
                  </button>
                  <button type="button" onClick={() => setViewY(viewY + 1)} style={navBtn} aria-label="1년 뒤">
                    »
                  </button>
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", textAlign: "center" }}>
                {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
                  <span key={w} style={{ fontSize: "0.72rem", color: "var(--text-muted)", padding: "0.2rem 0" }}>
                    {w}
                  </span>
                ))}
                {Array.from({ length: firstDow }).map((_, i) => (
                  <span key={`b${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const ms = new Date(viewY, viewM, i + 1).getTime();
                  const future = ms > todayMs;
                  const sel = inDraft(ms);
                  const edge = isEdge(ms);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={future}
                      onClick={() => pickDay(ms)}
                      style={{
                        border: "none",
                        borderRadius: edge ? "8px" : 0,
                        padding: "0.34rem 0",
                        fontSize: "0.82rem",
                        fontWeight: edge ? 800 : 500,
                        cursor: future ? "default" : "pointer",
                        color: future ? "var(--text-muted)" : edge ? "#fff" : sel ? "var(--accent)" : "var(--text)",
                        opacity: future ? 0.35 : 1,
                        background: edge ? "var(--accent)" : sel ? "var(--accent-light)" : "none",
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.7rem" }}>
                <button type="button" className="btn-outline" style={{ padding: "0.45rem 1.1rem", fontSize: "0.85rem" }} onClick={() => setOpen(false)}>
                  취소
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ padding: "0.45rem 1.3rem", fontSize: "0.85rem" }}
                  onClick={apply}
                  disabled={dS == null}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
