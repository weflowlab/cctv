/**
 * /places — 구 "장소별 CCTV" 진입 경로 (리다이렉트 전용)
 * - 장소별 CCTV 메뉴를 시공사례로 합침 → /cases 로 영구 리다이렉트(308).
 *   외부 링크·검색 색인으로 들어오는 기존 주소를 살리기 위해 남겨 둔다.
 */
import { permanentRedirect } from "next/navigation";

export default function PlacesIndexPage() {
  permanentRedirect("/cases");
}
