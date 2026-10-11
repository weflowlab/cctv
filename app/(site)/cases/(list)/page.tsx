/**
 * /cases — 시공사례 전체 목록 (서버 컴포넌트)
 * - 타이틀 띠(설명·요약 숫자)·칩 바·CTA 는 app/cases/(list)/layout.tsx. 여기는 전체 카드 그리드만.
 * - 장소별 목록은 /cases/place/<slug> (장소 소개 블록 포함). 카드 클릭 → 상세 /cases/<id>.
 * - 데이터: lib/cases.ts getCases() (DB — 관리자 > 시공사례 관리)
 */
import type { Metadata } from "next";
import CaseList from "@/components/cases/CaseList";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `시공사례 | ${SITE.name}`,
  description: `가정·매장·사무실·공장·기관 등 ${SITE.name}의 CCTV 시공사례를 확인해 보세요.`,
};

export default function CasesPage() {
  return (
    <>
      <CaseList place={null} />
    </>
  );
}
