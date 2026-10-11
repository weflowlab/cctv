import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "전체 현황" };

/** /admin — 전체 현황 (문의 요약 숫자 + 최근 문의) */
export default function AdminHomePage() {
  return <AdminDashboard />;
}
