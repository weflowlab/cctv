"use client";

/**
 * 관리자 셸 (weflow 관리자 레이아웃 이식) — 로그인 확인 → 로그인 화면 또는 사이드바 + 본문
 * - 로그인 여부: /api/admin/me (httpOnly 세션 쿠키). 확인 전엔 아무것도 그리지 않는다 (로그인창 깜빡임 방지)
 * - PC: 왼쪽 사이드바 / 모바일(≤768px): 상단바 + 왼쪽 드로어
 * - 하위 화면의 API 가 401 을 받으면(세션 만료) adminFetch 가 이벤트를 쏘고, 여기서 로그인 화면으로 돌린다
 */
import { ArrowLeft, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";
import { ADMIN_UNAUTHORIZED_EVENT } from "./ui";

const MENUS = [
  { href: "/admin/inquiries", label: "문의 관리" },
  { href: "/admin/cases", label: "시공사례 관리" },
  { href: "/admin/faq", label: "FAQ 관리" },
  { href: "/admin/traffic", label: "유입 관리" },
];

function isActive(pathname: string, m: (typeof MENUS)[number]) {
  return pathname === m.href || pathname.startsWith(`${m.href}/`);
}

/**
 * 브랜드 표기 — 사이트 로고와 같은 "UNITECH CCTV" 2색 + 관리자
 * - stacked: "관리자"를 로고 아랫줄에 (PC 사이드바)
 * - noLabel: "관리자" 글자 없이 (로그인 화면)
 */
function Brand({ small, noLabel, stacked }: { small?: boolean; noLabel?: boolean; stacked?: boolean }) {
  const [brand, ...rest] = SITE.nameEn.split(" ");
  return (
    <Link
      href="/admin/inquiries"
      style={{
        display: "flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: stacked ? "flex-start" : "baseline",
        gap: stacked ? "0.3rem" : "0.5rem",
        textDecoration: "none",
      }}
    >
      <span style={{ fontWeight: 800, fontSize: small ? "1.1rem" : "1.3rem", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
        <span style={{ color: "var(--accent)" }}>{brand}</span>{" "}
        <span style={{ color: "var(--point)" }}>{rest.join(" ")}</span>
      </span>
      {!noLabel && <span style={{ color: "var(--text-muted)", fontSize: small ? "0.8rem" : "0.9rem", fontWeight: 600 }}>관리자</span>}
    </Link>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d?.authed))
      .catch(() => {})
      .finally(() => setChecked(true));
    const onUnauthorized = () => setAuthed(false);
    window.addEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setMenuOpen(false);
    setAuthed(false);
  };

  if (!checked) return <div className="admin-root" />;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const navButton = (m: (typeof MENUS)[number], mobile: boolean) => {
    const active = isActive(pathname, m);
    return (
      <Link
        key={m.href}
        href={m.href}
        onClick={() => setMenuOpen(false)}
        style={{
          display: "block",
          background: active ? "var(--accent)" : "transparent",
          color: active ? "var(--on-accent)" : "var(--text-secondary)",
          borderRadius: mobile ? "10px" : "12px",
          padding: mobile ? "0.75rem 1rem" : "0.8rem 1.05rem",
          fontSize: mobile ? "0.95rem" : "1.05rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.15s",
        }}
      >
        {m.label}
      </Link>
    );
  };

  const bottomLinks = (mobile: boolean) => (
    <>
      <Link
        href="/"
        target="_blank"
        onClick={() => setMenuOpen(false)}
        className="semibold"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          color: "var(--text-secondary)",
          textDecoration: "none",
          padding: "0.5rem 0.25rem",
          fontSize: mobile ? "0.88rem" : "0.98rem",
        }}
      >
        <ArrowLeft size={mobile ? 16 : 18} /> 사이트 보기
      </Link>
      <button
        type="button"
        onClick={logout}
        className="semibold"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          padding: "0.5rem 0.25rem",
          fontSize: mobile ? "0.88rem" : "0.98rem",
        }}
      >
        <LogOut size={mobile ? 16 : 18} /> 로그아웃
      </button>
    </>
  );

  return (
    <div className="admin-root admin-wrap">
      {/* ── PC 사이드바 ── */}
      <aside
        className="admin-sidebar"
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", flexShrink: 0, display: "flex", flexDirection: "column" }}
      >
        <div style={{ padding: "1.75rem 1.4rem 0.5rem" }}>
          <Brand stacked />
        </div>
        <nav style={{ padding: "1.1rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
          {MENUS.map((m) => navButton(m, false))}
          <div style={{ marginTop: "auto", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {bottomLinks(false)}
          </div>
        </nav>
      </aside>

      {/* ── 모바일 상단바 ── */}
      <header
        className="admin-mobile-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          height: "60px",
        }}
      >
        <Brand small />
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "0.5rem" }}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* ── 모바일 드로어 + 오버레이 ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className="admin-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.5)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />
      <div
        className="admin-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(260px, 80vw)",
          background: "var(--surface)",
          boxShadow: "4px 0 24px rgba(10,45,91,0.14)",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem 0 1.25rem",
            height: "64px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <Brand small />
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: "0.4rem" }}
          >
            <X size={20} />
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {MENUS.map((m) => navButton(m, true))}
        </nav>
        <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
          {bottomLinks(true)}
        </div>
      </div>

      {/* ── 본문 ── */}
      <main className="admin-main">
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2.25rem)" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

/** 로그인 화면 — 비밀번호 1개 */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!pw) return setError("비밀번호를 입력해 주세요.");
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        setPw("");
        onLogin();
        return;
      }
      setError("비밀번호가 올바르지 않습니다.");
    } catch {
      setError("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
    setBusy(false);
  };

  return (
    <div className="admin-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "18px",
          padding: "2.25rem 2.5rem 2.5rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 4px 24px rgba(10,45,91,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.9rem" }}>
            <Brand noLabel />
          </div>
          <h1 className="emphasized" style={{ margin: "0 0 0.35rem", fontSize: "1.5rem" }}>
            관리자 로그인
          </h1>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontWeight: 600 }}>{SITE.name} 관리자 대시보드</p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label htmlFor="admin-pw" className="semibold" style={{ display: "block", marginBottom: "0.45rem", color: "var(--text-secondary)" }}>
              비밀번호
            </label>
            <input
              id="admin-pw"
              type="password"
              className="form-input"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ borderColor: error ? "var(--danger)" : undefined, padding: "0.8rem 0.95rem" }}
              autoFocus
            />
            {error && <p style={{ color: "var(--danger)", margin: "0.4rem 0 0", fontSize: "0.88rem" }}>{error}</p>}
          </div>
          <button type="submit" className="btn-primary" disabled={busy} style={{ padding: "0.95rem", fontSize: "1.05rem" }}>
            {busy ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
