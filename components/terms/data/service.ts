/**
 * 서비스 이용약관 본문 데이터 — 현재는 "준비 중" 안내만 표시
 * - keeper 클론 시 들어있던 한화비전 약관 원문은 다른 회사의 법률 문서라 제거함 (git 이력에 남아 있음).
 * - TODO: 회사 확정 후 실제 약관 문구로 교체. 블록 타입은 ./types.ts 참고
 *   (h: 제목 / p: 문단 / li: 목록 / table: 표 / gap: 빈 줄)
 */
import { SITE } from "@/lib/site";
import type { TermsBlock } from "./types";

export const serviceTerms: TermsBlock[] = [
  { t: "h", level: 1, align: "center", runs: [{ b: "서비스 이용약관" }] },
  { t: "gap" },
  { t: "p", align: "center", runs: ["서비스 이용약관은(는) 현재 준비 중입니다."] },
  { t: "p", align: "center", runs: [`문의: 통합 콜센터 ${SITE.phone}`] },
];
