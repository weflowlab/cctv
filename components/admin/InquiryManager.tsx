"use client";

/**
 * 문의 관리 (weflow 관리자 "문의 관리" 이식)
 * - useInquiries: 목록 불러오기 · 상태 변경(진행중/완료) · 삭제 — 화면을 먼저 바꾸고 API 를 부른다
 * - InquiryTable: 접수일·이름·연락처·서비스·희망일·상태·관리 표, 화살표로 상세(유입·기기·전달 내용) 펼침
 * - InquiryManager: 기간 선택 + 상태 필터 + 새로고침 + 엑셀 다운로드 + 표 (/admin/inquiries)
 * - 자동 갱신(폴링)은 두지 않는다 — 관리자 탭을 열어 두기만 해도 함수 사용량이 쌓이므로 새로고침 버튼으로만
 */
import { ChevronDown, ChevronUp, Download, Monitor, RefreshCw, Smartphone } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/inquiries";
import { ActionBtn, adminFetch, fmt, jsonInit, PeriodSelect, StatCard, withinPeriod, type PeriodSel } from "./ui";

const STATUS_KO: Record<InquiryStatus, string> = { pending: "대기", in_progress: "진행중", done: "완료" };
const STATUS_STYLE: Record<InquiryStatus, { bg: string; color: string; border: string }> = {
  pending: { bg: "var(--bg-secondary)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
  in_progress: { bg: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)" },
  done: { bg: "var(--success-dim)", color: "var(--success-text)", border: "1px solid var(--success)" },
};

type Filter = "전체" | "대기" | "진행중" | "완료";
const FILTERS: Filter[] = ["전체", "대기", "진행중", "완료"];

/* ===================== 데이터 ===================== */

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch<Inquiry[]>("/api/admin/inquiries");
      if (ok && Array.isArray(data)) {
        setInquiries(data);
        setError("");
      } else setError("문의를 불러오지 못했습니다.");
    } catch {
      setError("문의를 불러오지 못했습니다.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 화면 진입 시 한 번 불러온다
    load();
  }, [load]);

  const updateStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    adminFetch(`/api/admin/inquiries/${id}`, jsonInit("PATCH", { status }));
  };

  const remove = (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setInquiries((prev) => prev.filter((r) => r.id !== id));
    adminFetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
  };

  return { inquiries, loading, error, load, updateStatus, remove };
}

/* ===================== 표 ===================== */

export function InquiryTable({
  title,
  rows,
  loading,
  onStatusChange,
  onDelete,
  onSeeAll,
}: {
  title?: string;
  rows: Inquiry[];
  loading?: boolean;
  onStatusChange: (id: string, status: InquiryStatus) => void;
  onDelete: (id: string) => void;
  onSeeAll?: () => void;
}) {
  const exportButton = (
    <button
      type="button"
      className="btn-outline"
      style={{ borderRadius: "999px", padding: "0.45rem 1rem" }}
      onClick={() => window.open("/api/admin/inquiries/export", "_blank")}
    >
      <Download size={15} /> 엑셀 다운로드
    </button>
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const colSpan = 8;
  const bd = "1px solid var(--border-subtle)";
  const td: React.CSSProperties = { padding: "0.9rem 1rem", borderBottom: bd, color: "var(--text-secondary)" };
  const dt: React.CSSProperties = { color: "var(--text-muted)", marginBottom: "0.3rem", fontSize: "0.85rem", fontWeight: 700 };
  const dd: React.CSSProperties = { color: "var(--text-secondary)", margin: 0 };

  return (
    <section>
      {/* 표 머리 — (제목 · 전체 보기) 줄 아래 오른쪽에 엑셀 다운로드 (weflow 배치) */}
      {(title || onSeeAll) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          {title && (
            <h2 className="title-3 emphasized" style={{ color: "var(--text)", margin: 0 }}>
              {title}
            </h2>
          )}
          {onSeeAll && (
            <button
              type="button"
              onClick={onSeeAll}
              className="emphasized"
              style={{ background: "none", border: "none", color: "#006b70", cursor: "pointer", padding: 0, marginLeft: "auto" }}
            >
              전체 보기 →
            </button>
          )}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>{exportButton}</div>
      <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--surface)" }}>
        <table style={{ width: "100%", minWidth: "860px", borderCollapse: "separate", borderSpacing: 0, fontSize: "0.96rem", textAlign: "left" }}>
          <thead>
            <tr>
              {["접수일", "이름", "연락처", "서비스", "희망일", "상태", "관리", ""].map((h, i) => (
                <th
                  key={i}
                  className="emphasized"
                  style={{
                    padding: "0.9rem 1rem",
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={colSpan} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  {loading ? "불러오는 중…" : "표시할 항목이 없습니다."}
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const expanded = expandedId === row.id;
              const st = row.status;
              return (
                <Fragment key={row.id}>
                  <tr className="admin-row">
                    <td style={{ ...td, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{fmt(row.createdAt)}</td>
                    <td style={{ ...td, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>{row.name}</td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <a href={`tel:${row.phone.replace(/-/g, "")}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {row.phone}
                      </a>
                    </td>
                    <td style={{ ...td, minWidth: 120 }}>{row.services || "-"}</td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>{row.wishDate || "-"}</td>
                    <td style={td}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: STATUS_STYLE[st].bg,
                          color: STATUS_STYLE[st].color,
                          border: STATUS_STYLE[st].border,
                          borderRadius: "7px",
                          padding: "0.3rem 0.8rem",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {STATUS_KO[st]}
                      </span>
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "nowrap" }}>
                        <ActionBtn active={st === "in_progress"} onClick={() => onStatusChange(row.id, st === "in_progress" ? "pending" : "in_progress")}>
                          진행중
                        </ActionBtn>
                        <ActionBtn active={st === "done"} green onClick={() => onStatusChange(row.id, st === "done" ? "pending" : "done")}>
                          완료
                        </ActionBtn>
                        <ActionBtn red onClick={() => onDelete(row.id)}>
                          삭제
                        </ActionBtn>
                      </div>
                    </td>
                    <td style={{ ...td, padding: "0.9rem 0.75rem", textAlign: "right" }}>
                      <button
                        type="button"
                        aria-label={expanded ? "상세 접기" : "상세 보기"}
                        onClick={() => setExpandedId(expanded ? null : row.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "0.25rem" }}
                      >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                  </tr>
                  {/* 펼침 상세 — 유입·신청 기기 / 전달 내용 */}
                  {expanded && (
                    <tr style={{ background: "var(--bg-secondary)" }}>
                      <td colSpan={colSpan} style={{ padding: "1.1rem 1.25rem", borderBottom: bd }}>
                        <dl className="detail-dl">
                          <div>
                            <dt style={dt}>유입</dt>
                            <dd style={dd}>{row.source || "-"}</dd>
                            <dt style={{ ...dt, marginTop: "1rem" }}>신청 기기</dt>
                            <dd style={{ ...dd, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                              {row.device === "데스크탑" ? <Monitor size={15} /> : <Smartphone size={15} />}
                              {row.device || "-"}
                            </dd>
                          </div>
                          <div style={{ gridColumn: "span 2" }}>
                            <dt style={dt}>전달 내용</dt>
                            <dd style={{ ...dd, whiteSpace: "pre-wrap" }}>{row.message || "-"}</dd>
                          </div>
                        </dl>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ===================== 상단 도구줄 공통 버튼 ===================== */

export function RefreshButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="admin-refresh-btn btn-outline"
      style={{ borderRadius: "999px", padding: "0.45rem 1.1rem" }}
    >
      <RefreshCw size={14} className={loading ? "spin" : ""} />
      <span className="refresh-label">새로고침</span>
    </button>
  );
}

/* ===================== 요약 카드 · 도구줄 (전체 현황 · 문의 관리 공통) ===================== */

/** 요약 카드 4장 — 전체 / 대기중 / 진행중 / 완료된 문의 (기간과 관계없이 전체 기준) */
export function InquiryStats({ inquiries }: { inquiries: Inquiry[] }) {
  const count = (s: InquiryStatus) => inquiries.filter((r) => r.status === s).length;
  return (
    <div className="stat-grid-4">
      <StatCard label="전체 문의" value={inquiries.length} />
      <StatCard label="대기중 문의" value={count("pending")} color="teal" />
      <StatCard label="진행중 문의" value={count("in_progress")} />
      <StatCard label="완료된 문의" value={count("done")} color="teal" />
    </div>
  );
}

/** 기간 · 상태 필터로 거른 목록 + 도구줄(왼쪽 기간·상태 칩 / 오른쪽 새로고침) */
export function useInquiryFilter(inquiries: Inquiry[], initialPeriod: PeriodSel) {
  const [filter, setFilter] = useState<Filter>("전체");
  const [period, setPeriod] = useState<PeriodSel>(initialPeriod);
  const inPeriod = withinPeriod(inquiries, period);
  const rows = filter === "전체" ? inPeriod : inPeriod.filter((r) => STATUS_KO[r.status] === filter);

  const toolbar = (loading: boolean, onRefresh: () => void) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
        <PeriodSelect value={period} onChange={setPeriod} />
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "var(--accent)" : "var(--surface)",
                color: filter === f ? "var(--on-accent)" : "var(--text-secondary)",
                border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "999px",
                padding: "0.45rem 1.1rem",
                fontSize: "0.92rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <RefreshButton loading={loading} onClick={onRefresh} />
    </div>
  );

  return { rows, toolbar };
}

/* ===================== /admin/inquiries ===================== */

export default function InquiryManager() {
  const { inquiries, loading, error, load, updateStatus, remove } = useInquiries();
  const { rows, toolbar } = useInquiryFilter(inquiries, { key: "today" });

  return (
    <>
      <InquiryStats inquiries={inquiries} />
      {toolbar(loading, load)}
      {error && <p style={{ margin: 0, color: "var(--danger)" }}>{error}</p>}
      <InquiryTable rows={rows} loading={loading} onStatusChange={updateStatus} onDelete={remove} />
    </>
  );
}
