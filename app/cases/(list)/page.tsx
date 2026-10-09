/**
 * /cases — 시공사례 전체 목록 (서버 컴포넌트)
 * - 타이틀·칩 바·CTA 는 app/cases/(list)/layout.tsx. 여기는 안내 문구 + 전체 카드 그리드만.
 * - 장소별 목록은 /cases/place/<slug> (장소 소개 블록 포함). 카드 클릭 → 상세 /cases/<id>.
 * - 데이터: components/cases/data.ts (샘플, 추후 관리자 페이지 DB)
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
      {/* ===== 안내 문구 (전체 보기에서만) ===== */}
      <p className="mb-[28px] break-keep text-[15px] leading-[160%] tracking-[-0.3px] text-[#666] lg:mb-[40px] lg:text-[18px]">
        우리 공간과 비슷한 현장을 찾아보세요. 장소·대수별로 어떻게 설치했는지 확인하실 수 있습니다.
      </p>
      <CaseList place={null} />
    </>
  );
}
