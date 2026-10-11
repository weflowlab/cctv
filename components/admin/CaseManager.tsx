"use client";

/**
 * 시공사례 관리 — 목록 (/admin/cases)
 * - 표: 대표 사진 · 제목(주소) · 장소 · 서비스 · 지역·대수 · 시공 시기 · 홈 노출 토글 · 관리(보기/수정/삭제)
 * - 장소 칩으로 거르기, 정렬(시공 시기 최신순·최근 등록순·최근 수정순·홈 노출순), [새 시공사례 등록] → /admin/cases/new
 *   정렬은 이 목록에서만 바뀐다 — 사이트 시공사례 페이지는 항상 시공 시기 최신순
 * - 홈 노출 순서: 홈 노출로 고른 사례(최대 9개)만 홈에 이 순서대로 나온다. ↑↓ 누르면 바로 저장
 *   평소엔 한 줄로 접혀 있고 [순서 바꾸기]를 눌러 펼친다 (노출 사례가 없으면 안내를 바로 보여 줌)
 * - 저장·삭제하면 공개 페이지(/cases, 홈)에 바로 반영된다 (서버가 캐시 태그 무효화)
 */
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MAX_FEATURED } from "@/components/cases/data";
import type { AdminCase } from "@/lib/cases";
import { PLACES, SERVICES, type PlaceSlug } from "@/lib/site";
import { RefreshButton } from "./InquiryManager";
import { ActionBtn, adminFetch, jsonInit, Msg, StatCard } from "./ui";

/** 목록 정렬 기준 */
const SORTS = [
  { key: "date", label: "시공 시기 최신순" },
  { key: "created", label: "최근 등록순" },
  { key: "updated", label: "최근 수정순" },
  { key: "featured", label: "홈 노출순" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

/** 홈 노출 순서 값 — 노출 안 하는 사례는 맨 뒤, 순서가 비어 있는 노출 사례는 그 앞 */
const featuredRank = (c: AdminCase) => (c.featured ? (c.featuredOrder ?? 1e6) : 1e9);

/** 정렬 — 서버가 이미 시공 시기 최신순으로 주므로, 같은 값끼리는 그 순서를 유지한다 (안정 정렬) */
function sortCases(list: AdminCase[], key: SortKey): AdminCase[] {
  const time = (iso: string) => new Date(iso).getTime();
  if (key === "created") return [...list].sort((a, b) => time(b.createdAt) - time(a.createdAt));
  if (key === "updated") return [...list].sort((a, b) => time(b.updatedAt) - time(a.updatedAt));
  if (key === "featured") return [...list].sort((a, b) => featuredRank(a) - featuredRank(b));
  return list;
}

export const placeLabel = (slug: string) => PLACES.find((p) => p.slug === slug)?.name ?? slug;
export const serviceLabel = (slug: string) => SERVICES.find((s) => s.slug === slug)?.name ?? slug;

export default function CaseManager() {
  const [items, setItems] = useState<AdminCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<PlaceSlug | null>(null);
  const [sort, setSort] = useState<SortKey>("date");
  /** 홈 노출 순서 상자 펼침 — 순서는 자주 안 바꾸므로 평소엔 한 줄로 접어 둔다 */
  const [orderOpen, setOrderOpen] = useState(false);
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
    setMsg(null);
    const { ok, data } = await adminFetch<{ ok: boolean; error?: string; item?: AdminCase }>(
      `/api/admin/cases/${c.id}`,
      jsonInit("PATCH", { featured: !c.featured }),
    );
    if (ok && data.item) setItems((prev) => prev.map((x) => (x.id === c.id ? data.item! : x)));
    else setMsg({ ok: false, text: data.error || "홈 노출을 바꾸지 못했습니다." });
  };

  /** 홈 노출 사례 (홈에 보이는 순서) */
  const featuredList = sortCases(items, "featured").filter((c) => c.featured);

  /** 홈 노출 순서 한 칸 이동 → 바로 저장 */
  const moveFeatured = async (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= featuredList.length) return;
    const next = featuredList.slice();
    [next[i], next[j]] = [next[j], next[i]];
    const order = new Map(next.map((c, idx) => [c.id, idx]));
    setItems((prev) => prev.map((x) => (order.has(x.id) ? { ...x, featuredOrder: order.get(x.id)! } : x)));
    const { ok } = await adminFetch("/api/admin/case-order", jsonInit("PUT", { ids: next.map((c) => c.id) }));
    if (!ok) {
      setMsg({ ok: false, text: "순서를 저장하지 못했습니다. 새로고침 후 다시 시도해 주세요." });
      load();
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

  const rows = sortCases(place ? items.filter((c) => c.place === place) : items, sort);
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
        <StatCard label="홈 노출" value={featuredCount} color="teal" />
        <StatCard label="누적 설치 대수" value={cameras} unit="대" />
      </div>

      {/* ===== 홈 노출 순서 — 홈 노출로 고른 사례만, 이 순서대로 홈에 표시 ===== */}
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "0.9rem 1.25rem" }}>
        <button
          type="button"
          onClick={() => setOrderOpen((o) => !o)}
          disabled={featuredList.length === 0}
          aria-expanded={orderOpen}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            background: "none",
            border: "none",
            padding: 0,
            cursor: featuredList.length === 0 ? "default" : "pointer",
            textAlign: "left",
          }}
        >
          <span className="emphasized" style={{ fontSize: "1.05rem", color: "var(--text)" }}>
            홈 노출 순서{" "}
            <span style={{ color: "var(--point-strong)", fontSize: "0.92rem" }}>
              {featuredList.length}/{MAX_FEATURED}
            </span>
          </span>
          {featuredList.length > 0 && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.88rem", fontWeight: 700, color: "var(--point-strong)" }}>
              {orderOpen ? "접기" : "순서 바꾸기"}
              {orderOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}
        </button>
        {orderOpen && featuredList.length > 0 && (
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            고른 사례만 이 순서대로 홈에 나옵니다. 화살표를 누르면 바로 저장됩니다.
          </p>
        )}
        {featuredList.length === 0 ? (
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            {loading ? "불러오는 중…" : "홈 노출로 고른 사례가 없어 홈에 시공사례 섹션이 보이지 않습니다. 아래 목록에서 [노출 안 함]을 눌러 골라 주세요."}
          </p>
        ) : (
          orderOpen && (
          <ol style={{ listStyle: "none", margin: "0.8rem 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {featuredList.map((c, i) => (
              <li
                key={c.id}
                style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.45rem 0.6rem", borderRadius: 10, background: "var(--bg-secondary)" }}
              >
                <span style={{ width: 20, textAlign: "center", fontWeight: 800, color: "var(--accent)", fontSize: "0.9rem" }}>{i + 1}</span>
                {c.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element -- 관리자 썸네일
                  <img src={c.images[0].url} alt="" style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                )}
                <span style={{ flex: 1, minWidth: 0, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</span>
                <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
                  <button type="button" className="btn-outline" style={{ padding: "0.3rem 0.45rem" }} disabled={i === 0} onClick={() => moveFeatured(i, -1)} aria-label="앞으로">
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    style={{ padding: "0.3rem 0.45rem" }}
                    disabled={i === featuredList.length - 1}
                    onClick={() => moveFeatured(i, 1)}
                    aria-label="뒤로"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button type="button" className="btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.82rem" }} onClick={() => toggleFeatured(c)}>
                    빼기
                  </button>
                </div>
              </li>
            ))}
          </ol>
          )
        )}
      </section>

      {/* ===== 목록 도구줄: 장소 칩 · 정렬 · 새로고침 · 등록 (아래 표에만 해당) ===== */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {chip(null, "전체", items.length)}
          {PLACES.map((p) => chip(p.slug, p.name, items.filter((c) => c.place === p.slug).length))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            className="form-input"
            aria-label="정렬"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            style={{ width: "auto", padding: "0.45rem 2.4rem 0.45rem 1rem", fontSize: "0.9rem", fontWeight: 700, borderRadius: 999 }}
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <RefreshButton loading={loading} onClick={load} />
          <Link href="/admin/cases/new" className="btn-primary" style={{ textDecoration: "none" }}>
            <Plus size={16} /> 새 시공사례 등록
          </Link>
        </div>
      </div>

      {/* 안내 문구는 표에 바로 붙여 띄운다 (따로 두면 화면 줄 간격만큼 벌어진다) */}
      <div>
        {msg && (
          <div style={{ marginBottom: "0.6rem" }}>
            <Msg msg={msg} />
          </div>
        )}
        <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid var(--border)", background: "var(--surface)" }}>
          <table style={{ width: "100%", minWidth: 900, borderCollapse: "separate", borderSpacing: 0, fontSize: "0.95rem", textAlign: "left" }}>
            <thead>
              <tr>
                {["사진", "제목", "장소", "서비스", "지역 · 대수", "시공 시기", "홈 노출", "관리"].map((h) => (
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
                      <a href={`/cases/${c.id}`} target="_blank" rel="noreferrer" title="사이트에서 보기 (새 창)" style={{ color: "var(--text-muted)", display: "flex", padding: "0.25rem" }}>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
