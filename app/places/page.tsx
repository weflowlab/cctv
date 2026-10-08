/**
 * /places — 장소별 CCTV 진입 경로
 * - 별도 화면 없이 첫 번째 장소(가정)로 리다이렉트
 */
import { redirect } from "next/navigation";

export default function PlacesIndexPage() {
  redirect("/places/home");
}
