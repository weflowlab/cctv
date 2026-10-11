"use client";

/**
 * FAQ 관리 (tirecamp 관리자 "FAQ 관리" 이식 + 분류·홈 BEST 추가)
 * - 목록 전체를 상태로 들고 있다가 [저장] 때 PUT /api/admin/faq 로 한 번에 교체 → /faq · 홈 BEST 5 에 바로 반영
 * - 항목 클릭 → 펼쳐서 분류·질문·답변 수정, ↑↓ 로 순서 변경(= 사이트 노출 순서), 삭제, [질문 추가]
 * - "홈 BEST" 체크: 홈 "자주 묻는 질문 BEST 5" 에 노출 (최대 5개, 순서는 이 목록 순서)
 * - 저장 안 한 변경이 있으면 표시 + [취소] 로 마지막 저장 상태로 되돌리기
 */
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FAQ_BEST_LIMIT, FAQ_TABS, type FaqCategory, type FaqItem } from "@/components/support-faq/data";
import { adminFetch, jsonInit, Msg } from "./ui";

const ARROW: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  borderRadius: 999,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text-secondary)",
  cursor: "pointer",
};

const LABEL: React.CSSProperties = { display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)" };

export default function FaqManager() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  /** 마지막으로 저장된 상태 — 저장 후 "변경 있음" 표시가 사라지도록 저장 시점에 갱신 */
  const [saved, setSaved] = useState("[]");
  const dirty = loaded && JSON.stringify(items) !== saved;
  const bestCount = items.filter((f) => f.best).length;

  useEffect(() => {
    adminFetch<{ ok: boolean; items: FaqItem[] }>("/api/admin/faq")
      .then(({ ok, data }) => {
        if (!ok) throw new Error();
        setItems(data.items);
        setSaved(JSON.stringify(data.items));
      })
      .catch(() => setMsg({ ok: false, text: "FAQ 를 불러오지 못했습니다." }))
      .finally(() => setLoaded(true));
  }, []);

  /* 저장 안 한 변경이 있을 때 창을 닫으려 하면 확인 */
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const update = (i: number, patch: Partial<FaqItem>) => {
    setMsg(null);
    setItems((list) => list.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    setMsg(null);
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    if (open === i) setOpen(j);
    else if (open === j) setOpen(i);
  };
  const remove = (i: number) => {
    if (!confirm("이 질문을 삭제할까요? ([저장]을 눌러야 사이트에 반영됩니다)")) return;
    setMsg(null);
    setItems((list) => list.filter((_, idx) => idx !== i));
    setOpen(-1);
  };
  const toggleBest = (i: number) => {
    if (!items[i].best && bestCount >= FAQ_BEST_LIMIT) {
      setMsg({ ok: false, text: `홈 BEST 는 ${FAQ_BEST_LIMIT}개까지 고를 수 있습니다. 다른 질문의 체크를 먼저 풀어 주세요.` });
      return;
    }
    update(i, { best: !items[i].best });
  };
  const cancel = () => {
    if (!dirty || !confirm("저장하지 않은 변경을 모두 되돌릴까요?")) return;
    setItems(JSON.parse(saved) as FaqItem[]);
    setOpen(-1);
    setMsg(null);
  };

  /* 질문 추가 → 새 항목(맨 아래)을 펼치고 그 위치로 스크롤 + 질문 입력칸에 포커스 */
  const listRef = useRef<HTMLUListElement>(null);
  const scrollToRef = useRef<number | null>(null);
  const add = () => {
    setMsg(null);
    setItems((list) => [...list, { category: "설치", question: "", answer: "", best: false }]);
    setOpen(items.length);
    scrollToRef.current = items.length;
  };
  useEffect(() => {
    const idx = scrollToRef.current;
    if (idx == null) return;
    scrollToRef.current = null;
    const li = listRef.current?.children[idx] as HTMLElement | undefined;
    if (!li) return;
    li.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = li.querySelector<HTMLInputElement>("input[type=text]");
    const t = setTimeout(() => input?.focus({ preventScroll: true }), 450);
    return () => clearTimeout(t);
  }, [items.length]);

  async function save() {
    for (const [i, f] of items.entries()) {
      if (!f.question.trim() || !f.answer.trim()) {
        setOpen(i);
        return setMsg({ ok: false, text: `${i + 1}번 항목의 질문과 답변을 모두 입력해 주세요.` });
      }
    }
    setBusy(true);
    setMsg(null);
    try {
      const { ok, data } = await adminFetch<{ ok: boolean; error?: string; items?: FaqItem[] }>("/api/admin/faq", jsonInit("PUT", { items }));
      if (!ok || !data.ok) throw new Error(data.error || "저장에 실패했습니다.");
      const next = data.items ?? items;
      setItems(next);
      setSaved(JSON.stringify(next));
      setOpen(-1);
      setMsg({ ok: true, text: "저장했습니다. 사이트에 바로 반영됩니다." });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "저장에 실패했습니다." });
    } finally {
      setBusy(false);
    }
  }

  const actions = (
    <>
      {dirty && (
        <button type="button" className="btn-outline" disabled={busy} onClick={cancel}>
          취소
        </button>
      )}
      <button type="button" className="btn-primary" disabled={busy || !dirty} onClick={save}>
        {busy ? "저장 중..." : "저장"}
      </button>
    </>
  );

  return (
    <div>
      {/* 상단 — 개수 · 변경 표시 / 질문 추가 · 저장 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.9rem" }}>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>
          총 <b style={{ color: "var(--text)" }}>{items.length}</b>개 · 홈 BEST{" "}
          <b style={{ color: "var(--point-strong)" }}>
            {bestCount}/{FAQ_BEST_LIMIT}
          </b>
          {dirty && <span style={{ marginLeft: "0.5rem", color: "var(--accent)", fontWeight: 700 }}>· 저장하지 않은 변경이 있습니다</span>}
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn-outline" onClick={add} disabled={!loaded}>
            <Plus size={16} /> 질문 추가
          </button>
          {actions}
        </div>
      </div>
      {msg && (
        <div style={{ marginBottom: "0.9rem" }}>
          <Msg msg={msg} />
        </div>
      )}

      {!loaded ? (
        <p className="c-muted">불러오는 중…</p>
      ) : items.length === 0 ? (
        <p style={{ border: "1px dashed var(--border)", borderRadius: 16, padding: "2.5rem 0", textAlign: "center", color: "var(--text-muted)", margin: 0 }}>
          등록된 질문이 없습니다. [질문 추가] 로 시작하세요.
        </p>
      ) : (
        <ul ref={listRef} style={{ listStyle: "none", margin: 0, padding: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} style={{ borderTop: i ? "1px solid var(--border-subtle)" : "none", scrollMarginTop: 80 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1.1rem",
                    background: isOpen ? "var(--bg-secondary)" : undefined,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ width: 24, flexShrink: 0, fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span
                    // 분류 칩은 글자 수와 관계없이 같은 너비 (AS · 설치 · 렌탈 · 기타)
                    style={{
                      flexShrink: 0,
                      width: 44,
                      textAlign: "center",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "0.15rem 0",
                      borderRadius: 6,
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                    }}
                  >
                    {f.category}
                  </span>
                  {f.best && (
                    <span style={{ flexShrink: 0, fontSize: "0.78rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: 6, background: "var(--point-light)", color: "var(--point-strong)" }}>
                      홈 BEST
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      flex: "1 1 220px",
                      minWidth: 0,
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: f.question ? "var(--text)" : "var(--text-muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.question || "(질문을 입력하세요)"}
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0, marginLeft: "auto" }}>
                    <button type="button" style={{ ...ARROW, opacity: i === 0 ? 0.3 : 1 }} disabled={i === 0} onClick={() => move(i, -1)} aria-label="위로" title="위로">
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      style={{ ...ARROW, opacity: i === items.length - 1 ? 0.3 : 1 }}
                      disabled={i === items.length - 1}
                      onClick={() => move(i, 1)}
                      aria-label="아래로"
                      title="아래로"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button type="button" className="btn-outline" style={{ padding: "0.3rem 0.8rem", fontSize: "0.85rem", borderRadius: 6 }} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {isOpen ? "접기" : "수정"}
                    </button>
                    <button type="button" className="btn-danger" style={{ padding: "0.3rem 0.8rem", fontSize: "0.85rem", borderRadius: 6 }} onClick={() => remove(i)}>
                      삭제
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div style={{ padding: "1rem 1.1rem 1.25rem", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                      <label style={{ width: 160 }}>
                        <span style={LABEL}>분류</span>
                        <select className="form-input" value={f.category} onChange={(e) => update(i, { category: e.target.value as FaqCategory })}>
                          {FAQ_TABS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", paddingBottom: "0.7rem" }}>
                        <input type="checkbox" checked={f.best} onChange={() => toggleBest(i)} style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
                        <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>홈 &quot;자주 묻는 질문 BEST 5&quot;에 노출</span>
                      </label>
                    </div>
                    <label>
                      <span style={LABEL}>질문</span>
                      <input type="text" className="form-input" value={f.question} maxLength={200} onChange={(e) => update(i, { question: e.target.value })} />
                    </label>
                    <label>
                      <span style={LABEL}>답변 (줄바꿈 그대로 표시)</span>
                      <textarea className="form-input" rows={5} value={f.answer} maxLength={2000} onChange={(e) => update(i, { answer: e.target.value })} />
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

    </div>
  );
}
