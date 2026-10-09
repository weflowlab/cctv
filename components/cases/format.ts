/**
 * 시공사례 표시용 헬퍼 (목록 카드 · 상세 · 장소별 페이지 공통)
 * - slug → 이름 변환, 날짜 문자열 "2026-09" → "2026.09", 메타 한 줄 문자열
 */
import { PLACES, SERVICES } from "@/lib/site";
import type { CaseItem } from "./data";

/** 장소 slug → 표시 이름 */
export function placeName(slug: CaseItem["place"]) {
  return PLACES.find((p) => p.slug === slug)?.name ?? "기타";
}

/** 서비스 slug → 표시 이름 */
export function serviceName(slug: CaseItem["service"]) {
  return SERVICES.find((s) => s.slug === slug)?.name ?? "";
}

/** "2026-09" → "2026.09" (Date 객체 사용 안 함) */
export function formatCaseDate(date: string) {
  return date.replace("-", ".");
}

/** 카드용 메타 한 줄: "서울 강남구 · 8대 · CCTV 설치" */
export function caseMeta(item: CaseItem) {
  return `${item.region} · ${item.cameraCount}대 · ${serviceName(item.service)}`;
}
