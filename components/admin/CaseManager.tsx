"use client";

/**
 * 시공사례 관리 — 목록 (/admin/cases)
 * - 표: 대표 사진 · 제목(주소) · 장소 · 서비스 · 지역·대수 · 시공 시기 · 메인 노출 토글 · 관리(보기/수정/삭제)
 * - 장소 칩으로 거르기, [새 시공사례 등록] → /admin/cases/new
 * - 메인 노출: 홈 "시공사례" 6칸에 먼저 보일 사례 (체크한 것 우선, 모자라면 최신순으로 채움)
 * - 저장·삭제하면 공개 페이지(/cases, 홈)에 바로 반영된다 (서버가 캐시 태그 무효화)
 */
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminCase } from "@/lib/cases";
import { PLACES, SERVICES, type PlaceSlug } from "@/lib/site";
import { RefreshButton } from "./InquiryManager";
import { ActionBtn, adminFetch, jsonInit, Msg, StatCard } from "./ui";

export const placeLabel = (slug: string) => PLACES.find((p) => p.slug === slug)?.name ?? slug;
export const serviceLabel = (slug: string) => SERVICES.find((s) => s.slug === slug)?.name ?? slug;

export default function CaseManager() {
  const [items, setItems] = useState<AdminCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<PlaceSlug | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch<{ ok: boolean; items: AdminCase[] }>("/api/admin/cases");
      if (!ok) throw new Error();
      setItems(data.items);
    } catch {
      setMsg({ ok: false, text: "시공사례를 불러오지 못했습니다." });
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 화면 진입 시 한 번 불러온다
    load();
  }, []);

  const toggleFeatured = async (c: AdminCase) => {
    setItems((prev) => prev.map((x) => (x.id === c.id ? { ...x, featured: !c.featured } : x)));
    const { ok } = await adminFetch(`/api/admin/cases/${c.id}`, jsonInit("PATCH", { featured: !c.featured }));
    if (!ok) {
      setItems((prev) => prev.map((x) => (x.id === c.id ? { ...x, featured: c.featured } : x)));
      setMsg({ ok: false, text: "메인 노출을 바꾸지 못했습니다." });
    }
  };

  const remove = async (c: AdminCase) => {
    if (!confirm(`"${c.title}" 사례를 삭제할까요?\n올린 사진도 함께 지워지며 되돌릴 수 없습니다.`)) return;
    const { ok } = await adminFetch(`/api/admin/cases/${c.id}`, { method: "DELETE" });
    if (ok) {
      setItems((prev) => prev.filter((x) => x.id !== c.id));
      setMsg({ ok: true, text: "삭제했습니다." });
    } else setMsg({ ok: false, text: "삭제하지 못했습니다." });
  };

  const rows = place ? items.filter((c) => c.place === place) : items;
  const featuredCount = items.filter((c) => c.featured).length;
  const cameras = items.reduce((s, c) => s + c.cameraCount, 0);
  const bd = "1px solid var(--border-subtle)";
  const td: React.CSSProperties = { padding: "0.75rem 1rem", borderBottom: bd, color: "var(--text-secondary)", verticalAlign: "middle" };

  const chip = (slug: PlaceSlug | null, label: string, count: number) => {
    const on = place === slug;
    return (
      <button
        key={label}
        type="button"
        onClick={() => setPlace(slug)}
        style={{
          background: on ? "var(--accent)" : "var(--surface)",
          color: on ? "var(--on-accent)" : "var(--text-secondary)",
          border: `1px solid ${on ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 999,
          padding: "0.45rem 1rem",
          fontSize: "0.9rem",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {label} <span style={{ opacity: 0.6, fontWeight: 600 }}>{count}</span>
      </button>
    );
  };

  return (
    <>
      <div className="stat-grid-4">
        <StatCard label="등록된 사례" value={items.length} />
        <StatCard label="누적 설치 대수" value={cameras} unit="대" color="teal" />
        <StatCard label="메인 노출" value={featuredCount} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {chip(null, "전체", items.length)}
          {PLACES.map((p) => chip(p.slug, p.name, items.filter((c) => c.place === p.slug).length))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <RefreshButton loading={loading} onClick={load} />
          <Link href="/admin/cases/new" className="btn-primary" style={{ textDecoration: "none" }}>
            <Plus size={16} /> 새 시공사례 등록
          </Link>
        </div>
      </div>

      <Msg msg={msg} />

      <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid var(--border)", background: "var(--surface)" }}>
        <table style={{ width: "100%", minWidth: 900, borderCollapse: "separate", borderSpacing: 0, fontSize: "0.95rem", textAlign: "left" }}>
          <thead>
            <tr>
              {["사진", "제목", "장소", "서비스", "지역 · 대수", "시공 시기", "메인 노출", "관리"].map((h) => (
                <th
                  key={h}
                  className="emphasized"
                  style={{ padding: "0.9rem 1rem", fontSize: "0.88rem", color: "var(--text-muted)", whiteSpace: "nowrap", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  {loading ? "불러오는 중…" : "등록된 시공사례가 없습니다."}
                </td>
              </tr>
            )}
            {rows.map((c) => (
              <tr key={c.id} className="admin-row">
                <td style={{ ...td, width: 96 }}>
                  {c.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element -- 관리자 목록 썸네일 (최적화 불필요)
                    <img src={c.images[0].url} alt="" style={{ width: 80, height: 54, objectFit: "cover", borderRadius: 8, display: "block" }} />
                  ) : (
                    <div style={{ width: 80, height: 54, borderRadius: 8, background: "var(--bg-secondary)" }} />
                  )}
                </td>
                <td style={{ ...td, minWidth: 220 }}>
                  <Link href={`/admin/cases/${c.id}`} style={{ color: "var(--text)", fontWeight: 700, textDecoration: "none" }}>
                    {c.title}
                  </Link>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
                    /cases/{c.id} · 사진 {c.images.length}장
                  </div>
                </td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{placeLabel(c.place)}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{serviceLabel(c.service)}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>
                  {c.region} · {c.cameraCount}대
                </td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{c.date.replace("-", ".")}</td>
                <td style={td}>
                  <ActionBtn active={c.featured} green onClick={() => toggleFeatured(c)}>
                    {c.featured ? "노출 중" : "노출 안 함"}
                  </ActionBtn>
                </td>
                <td style={td}>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <a href={`/cases/${c.id}`} target="_blank" rel="noreferrer" title="사이트에서 보기" style={{ color: "var(--text-muted)", display: "flex", padding: "0.25rem" }}>
                      <ExternalLink size={16} />
                    </a>
                    <Link
                      href={`/admin/cases/${c.id}`}
                      style={{
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        padding: "0.3rem 0.8rem",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      수정
                    </Link>
                    <ActionBtn red onClick={() => remove(c)}>
                      삭제
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
