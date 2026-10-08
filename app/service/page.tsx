/**
 * /service — 서비스 메뉴 진입점
 * - 별도 화면 없이 첫 탭(/service/install)으로 리다이렉트 (서버 컴포넌트에서 redirect() 호출 → 307)
 */
import { redirect } from "next/navigation";

export default function ServiceIndexPage() {
  redirect("/service/install");
}
