import { redirect } from "next/navigation";

/** /admin — 전체 현황 화면은 없앴다. 들어오면 문의 관리로 보낸다 (로그인 직후 첫 화면) */
export default function AdminHomePage() {
  redirect("/admin/inquiries");
}
