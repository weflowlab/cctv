"use client";

/**
 * 시공사례 등록·수정 (/admin/cases/new, /admin/cases/<id>)
 * - 입력: 제목 · 주소(영문) · 장소 · 서비스 · 지역 · 설치 대수 · 시공 시기 · 현장 설명 · 홈 노출 · 사진
 * - 주소(영문): 상세 페이지 /cases/<주소> 와 검색 노출용. 새 사례는 지역·장소·서비스로 자동으로 만든다
 *   (서울 강남구 · 매장 · 설치 → gangnam-store-cctv-installation). [직접 수정]을 누르면 고칠 수 있고,
 *   그때부터는 자동으로 바뀌지 않는다. 기존 사례는 주소가 바뀌면 검색·공유 링크가 끊기므로 자동으로 바꾸지 않는다.
 *   같은 주소가 이미 있으면 서버가 끝에 -2, -3 을 붙인다.
 * - 사진: 최대 5장. 여러 장 한꺼번에 선택 → 브라우저에서 WebP(가로 1600px 이하)로 줄여 Vercel Blob 에 올린다
 *   첫 번째 사진이 대표 사진(목록 카드·홈). ← → 로 순서 변경. 사진 설명(대체 텍스트)은 따로 받지 않고 서버가 채운다
 * - 저장 전 편집 화면에서 뺀 새 사진은 바로 지우고, 저장된 사진은 저장 시 서버가 정리한다
 */
import { ArrowLeft, ArrowRight, ImagePlus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CaseImage, CaseItem, CaseService } from "@/components/cases/data";
import type { AdminCase } from "@/lib/cases";
import { PLACES, SERVICES, type PlaceSlug } from "@/lib/site";
import { regionSlug } from "@/lib/romanize";
import { adminFetch, CARD, jsonInit, MonthPicker, Msg, PageHead } from "./ui";

/** 주소 기본값용 서비스 영문 (data.ts 의 slug 규칙) */
const SERVICE_SLUG: Record<CaseService, string> = { install: "installation", rental: "rental", as: "repair", speaker: "speaker" };
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** 사례 1건당 사진 최대 장수 (서버 lib/cases.ts MAX_IMAGES 와 같게) */
const MAX_PHOTOS = 5;

const LABEL: React.CSSProperties = { display: "block", marginBottom: "0.4rem", fontSize: "0.88rem", fontWeight: 700, color: "var(--text-secondary)" };
const HINT: React.CSSProperties = { margin: "0.35rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" };

function thisMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** 자동 주소 — 지역(로마자)-장소-cctv-서비스. 지역이 비면 장소부터 */
function suggestSlug(region: string, place: PlaceSlug, service: CaseService) {
  return [regionSlug(region), place, "cctv", SERVICE_SLUG[service]].filter(Boolean).join("-");
}

/** 사진 1장을 WebP(가로·세로 긴 변 1600px 이하, 품질 0.82)로 줄인다. WebP 인코딩을 못 하는 브라우저는 JPEG */
async function shrinkImage(file: File): Promise<File> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  const toBlob = (type: string, q: number) => new Promise<Blob | null>((res) => canvas.toBlob(res, type, q));
  let blob = await toBlob("image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg", 0.85);
  if (!blob) throw new Error("사진을 변환하지 못했습니다.");
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.${ext}`, { type: blob.type });
}

type Form = Omit<CaseItem, "cameraCount"> & { cameraCount: string };

export default function CaseEditor({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(() => ({
    id: suggestSlug("", "store", "install"),
    title: "",
    place: "store",
    region: "",
    cameraCount: "",
    service: "install",
    summary: "",
    images: [],
    date: thisMonth(),
    featured: false,
  }));
  /** 주소를 자동으로 따라가지 않는 상태 — 기존 사례이거나 직접 고치기 시작했을 때 */
  const [slugTouched, setSlugTouched] = useState(!isNew);
  /** 주소 입력칸 펼침 */
  const [slugEditing, setSlugEditing] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  /** 사진 칸 안내 (장수 초과·업로드 실패) — 저장 버튼 옆이 아니라 사진 바로 아래에 띄운다 */
  const [photoMsg, setPhotoMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  /** 이번 편집에서 새로 올린 사진 — 저장 전에 빼면 Blob 에서 바로 지운다 */
  const uploaded = useRef(new Set<string>());

  useEffect(() => {
    if (isNew) return;
    adminFetch<{ ok: boolean; item?: AdminCase }>(`/api/admin/cases/${encodeURIComponent(id)}`)
      .then(({ ok, data }) => {
        if (!ok || !data.item) return setNotFound(true);
        const c = data.item;
        setForm({
          id: c.id,
          title: c.title,
          place: c.place,
          region: c.region,
          cameraCount: String(c.cameraCount),
          service: c.service,
          summary: c.summary,
          images: c.images,
          date: c.date,
          featured: c.featured,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (patch: Partial<Form>) => {
    setMsg(null);
    setForm((f) => {
      const next = { ...f, ...patch };
      // 주소를 직접 고치기 전까지는 지역·장소·서비스에 맞춰 자동으로 따라간다
      if (!slugTouched && ("region" in patch || patch.place || patch.service))
        next.id = suggestSlug(next.region, next.place, next.service);
      return next;
    });
  };
  const setImages = (fn: (imgs: CaseImage[]) => CaseImage[]) => setForm((f) => ({ ...f, images: fn(f.images) }));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setMsg(null);
    setPhotoMsg("");
    const room = MAX_PHOTOS - form.images.length;
    const list = Array.from(files).slice(0, Math.max(0, room));
    if (files.length > list.length) setPhotoMsg(`사진은 ${MAX_PHOTOS}장까지 올릴 수 있습니다.`);
    if (!list.length) return;
    setUploading((n) => n + list.length);
    const errors: string[] = [];
    // 순서를 지키려고 한 장씩 올린다 (보통 수백 KB 라 금방 끝난다)
    for (const file of list) {
      try {
        const small = await shrinkImage(file);
        const body = new FormData();
        body.append("file", small);
        const { ok, data } = await adminFetch<{ ok: boolean; url?: string; error?: string }>("/api/admin/upload", { method: "POST", body });
        if (!ok || !data.url) throw new Error(data.error || "업로드에 실패했습니다.");
        uploaded.current.add(data.url);
        setImages((imgs) => [...imgs, { url: data.url!, alt: "" }]);
      } catch (e) {
        errors.push(`${file.name}: ${e instanceof Error ? e.message : "업로드 실패"}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (errors.length) setPhotoMsg(errors.join(" / "));
    if (fileRef.current) fileRef.current.value = "";
  };

  const moveImage = (i: number, dir: -1 | 1) =>
    setImages((imgs) => {
      const j = i + dir;
      if (j < 0 || j >= imgs.length) return imgs;
      const next = imgs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const removeImage = (i: number) => {
    const img = form.images[i];
    setPhotoMsg("");
    setImages((imgs) => imgs.filter((_, idx) => idx !== i));
    if (uploaded.current.has(img.url)) {
      uploaded.current.delete(img.url);
      adminFetch("/api/admin/upload", jsonInit("DELETE", { url: img.url }));
    }
  };

  const save = async () => {
    const cameraCount = Number(form.cameraCount);
    if (!form.title.trim()) return setMsg({ ok: false, text: "제목을 입력해 주세요." });
    if (!SLUG_RE.test(form.id)) return setMsg({ ok: false, text: "주소(영문)는 영문 소문자·숫자·하이픈(-)만 쓸 수 있습니다." });
    if (!form.region.trim()) return setMsg({ ok: false, text: "지역을 입력해 주세요." });
    if (form.cameraCount === "" || !Number.isInteger(cameraCount) || cameraCount < 0)
      return setMsg({ ok: false, text: "설치 대수를 숫자로 입력해 주세요." });
    if (!form.summary.trim()) return setMsg({ ok: false, text: "현장 설명을 입력해 주세요." });
    if (form.images.length === 0) return setMsg({ ok: false, text: "사진을 1장 이상 올려 주세요." });

    setBusy(true);
    setMsg(null);
    // 자동으로 붙은 "현장 사진 n" 설명은 비워 보내 서버가 지금 순서대로 다시 매기게 한다
    const images = form.images.map((img) => ({ ...img, alt: /^현장 사진 \d+$/.test(img.alt) ? "" : img.alt }));
    const payload = { ...form, cameraCount, images };
    const { ok, data } = await adminFetch<{ ok: boolean; error?: string; item?: AdminCase }>(
      isNew ? "/api/admin/cases" : `/api/admin/cases/${encodeURIComponent(id)}`,
      jsonInit(isNew ? "POST" : "PUT", payload),
    ).catch(() => ({ ok: false, data: { ok: false, error: "저장에 실패했습니다." } as { ok: boolean; error?: string; item?: AdminCase } }));
    setBusy(false);
    if (!ok || !data.item) return setMsg({ ok: false, text: data.error || "저장에 실패했습니다." });

    uploaded.current.clear(); // 저장됐으니 이제 사례의 사진
    router.push("/admin/cases");
  };

  if (loading) return <p className="c-muted">불러오는 중…</p>;
  if (notFound)
    return (
      <div style={CARD}>
        <p style={{ margin: "0 0 1rem" }}>사례를 찾을 수 없습니다. 이미 삭제되었을 수 있습니다.</p>
        <Link href="/admin/cases" className="btn-outline" style={{ textDecoration: "none" }}>
          목록으로
        </Link>
      </div>
    );

  return (
    <>
      <PageHead
        eyebrow="시공사례 관리"
        title={isNew ? "새 시공사례 등록" : "시공사례 수정"}
        desc="저장하면 시공사례 목록·상세 페이지와 홈 화면에 바로 반영됩니다."
        action={
          <>
            {!isNew && (
              <a href={`/cases/${id}`} target="_blank" rel="noreferrer" className="btn-outline" style={{ textDecoration: "none" }}>
                사이트에서 보기
              </a>
            )}
            <Link href="/admin/cases" className="btn-outline" style={{ textDecoration: "none" }}>
              목록으로
            </Link>
          </>
        }
      />

      {/* ===== 기본 정보 ===== */}
      <section style={CARD}>
        <h2 className="title-3 emphasized" style={{ margin: "0 0 1.1rem" }}>
          기본 정보
        </h2>
        <div className="case-form-grid">
          <label style={{ gridColumn: "1 / -1" }}>
            <span style={LABEL}>제목 *</span>
            <input className="form-input" value={form.title} maxLength={100} placeholder="예: 강남 카페 CCTV 8대 설치" onChange={(e) => set({ title: e.target.value })} />
          </label>
          <label>
            <span style={LABEL}>장소 *</span>
            <select className="form-input" value={form.place} onChange={(e) => set({ place: e.target.value as PlaceSlug })}>
              {PLACES.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.includes.join("·")})
                </option>
              ))}
            </select>
          </label>
          <label>
            <span style={LABEL}>서비스 *</span>
            <select className="form-input" value={form.service} onChange={(e) => set({ service: e.target.value as CaseService })}>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span style={LABEL}>지역 *</span>
            <input className="form-input" value={form.region} maxLength={50} placeholder="예: 서울 강남구" onChange={(e) => set({ region: e.target.value })} />
          </label>
          <label>
            <span style={LABEL}>설치 대수 *</span>
            <input
              className="form-input"
              inputMode="numeric"
              value={form.cameraCount}
              placeholder="예: 8"
              onChange={(e) => set({ cameraCount: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })}
            />
          </label>
          <div>
            <span style={LABEL}>시공 시기 *</span>
            <MonthPicker value={form.date} onChange={(date) => set({ date })} />
          </div>
          <div>
            <span style={LABEL}>사례 주소</span>
            {slugEditing ? (
              <input
                className="form-input"
                value={form.id}
                maxLength={100}
                autoFocus
                onChange={(e) => {
                  setSlugTouched(true);
                  set({ id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") });
                }}
              />
            ) : (
              <div
                className="form-input"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", background: "var(--bg-secondary)" }}
              >
                <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-secondary)" }}>
                  /cases/{form.id || "…"}
                </span>
                <button
                  type="button"
                  onClick={() => setSlugEditing(true)}
                  style={{ flexShrink: 0, background: "none", border: "none", padding: 0, color: "var(--point-strong)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  직접 수정
                </button>
              </div>
            )}
            <p style={HINT}>
              {isNew && !slugTouched
                ? "지역·장소·서비스를 고르면 자동으로 만들어집니다. 그대로 두셔도 됩니다."
                : "영문 소문자·숫자·하이픈(-)만 쓸 수 있습니다. 바꾸면 기존 링크는 열리지 않습니다."}
            </p>
          </div>
          <label style={{ gridColumn: "1 / -1" }}>
            <span style={LABEL}>현장 설명 *</span>
            <textarea
              className="form-input"
              rows={5}
              maxLength={3000}
              value={form.summary}
              placeholder="어떤 공간에 어디를 비추도록 몇 대를 설치했는지, 고객 요청과 해결 방법 등을 적어 주세요."
              onChange={(e) => set({ summary: e.target.value })}
            />
          </label>
          <label style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "0.55rem", cursor: "pointer" }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => set({ featured: e.target.checked })} style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>홈 화면 &quot;시공사례&quot;에 노출 (최대 9개, 순서는 목록의 홈 노출 순서에서)</span>
          </label>
        </div>
      </section>

      {/* ===== 사진 ===== */}
      <section style={CARD}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
          <div>
            <h2 className="title-3 emphasized" style={{ margin: 0 }}>
              사진 <span style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "0.95rem" }}>{form.images.length}/{MAX_PHOTOS}장</span>
            </h2>
            <p style={HINT}>첫 번째 사진이 대표 사진입니다. 화살표로 순서를 바꿀 수 있어요. (최대 {MAX_PHOTOS}장)</p>
          </div>
          <button type="button" className="btn-outline" onClick={() => fileRef.current?.click()} disabled={uploading > 0 || form.images.length >= MAX_PHOTOS}>
            <ImagePlus size={16} /> {uploading > 0 ? `올리는 중… (${uploading}장 남음)` : "사진 추가"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
        </div>

        {form.images.length === 0 ? (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              width: "100%",
              border: "1.5px dashed var(--outline)",
              borderRadius: 14,
              background: "var(--bg-secondary)",
              padding: "2.5rem 1rem",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
          >
            여기를 눌러 시공 사진을 올려 주세요 (여러 장 선택 가능)
          </button>
        ) : (
          <div className="case-photo-grid">
            {form.images.map((img, i) => (
              <div key={img.url} style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
                <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--bg-secondary)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- 업로드 미리보기 */}
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {i === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        left: 8,
                        top: 8,
                        background: "var(--accent)",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                        borderRadius: 999,
                      }}
                    >
                      대표
                    </span>
                  )}
                </div>
                <div style={{ padding: "0.6rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <button type="button" className="btn-outline" style={{ padding: "0.3rem 0.5rem" }} disabled={i === 0} onClick={() => moveImage(i, -1)} aria-label="앞으로">
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-outline"
                        style={{ padding: "0.3rem 0.5rem" }}
                        disabled={i === form.images.length - 1}
                        onClick={() => moveImage(i, 1)}
                        aria-label="뒤로"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <button type="button" className="btn-danger" style={{ padding: "0.3rem 0.5rem" }} onClick={() => removeImage(i)} aria-label="사진 삭제">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {photoMsg && (
          <p role="alert" style={{ margin: "0.8rem 0 0", fontSize: "0.88rem", fontWeight: 600, color: "var(--danger)" }}>
            {photoMsg}
          </p>
        )}
      </section>

      {/* ===== 저장 ===== */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <Msg msg={msg} />
        <Link href="/admin/cases" className="btn-outline" style={{ textDecoration: "none" }}>
          취소
        </Link>
        <button type="button" className="btn-primary" onClick={save} disabled={busy || uploading > 0} style={{ minWidth: 120 }}>
          {busy ? "저장 중..." : isNew ? "등록하기" : "저장하기"}
        </button>
      </div>
    </>
  );
}
