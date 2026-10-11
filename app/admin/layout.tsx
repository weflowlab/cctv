import type { Metadata } from "next";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { SITE } from "@/lib/site";
import "./admin.css";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = {
  title: { default: `관리자 | ${SITE.name}`, template: `%s | ${SITE.name} 관리자` },
  robots: { index: false, follow: false },
};

/**
 * 관리자 레이아웃 (/admin/*) — 공개 사이트 헤더·푸터 없이 AdminShell(로그인 확인 + 사이드바)만
 * - 화면은 모두 클라이언트에서 관리자 API(/api/admin/*)로 데이터를 받는다 (API 마다 세션 재검사)
 * - 메뉴: 전체 현황 · 문의 관리 · 시공사례 관리 · FAQ 관리 · 유입 관리
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // usePathname 이 확정되지 않는 동적 경로(/admin/cases/[id])에서도 막히지 않게
    <Suspense fallback={<div className="admin-root" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
