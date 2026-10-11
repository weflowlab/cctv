/**
 * 시공사례 목록 본문 (keeper BlogList 틀) — 서버 컴포넌트
 * - place = null 이면 전체, 장소 slug 면 그 장소 사례만.
 *   장소 선택은 URL 경로(/cases, /cases/place/<slug>)로 하고, 칩 바는 CasePlaceChips(레이아웃)가 담당.
 * - 구성: 카드 그리드 (최신순, featured 가 앞쪽). 대표 사례 1건을 크게 띄우던 배너는 제거.
 * - 카드 클릭 → 내부 상세 /cases/<id>
 * - 사례 수가 적어 무한 스크롤은 생략 (건수가 늘면 페이지네이션 검토).
 * - 데이터: getCases() (DB, 캐시 — 관리자에서 저장하면 바로 갱신)
 */
import type { PlaceSlug } from "@/lib/site";
import Reveal from "@/components/common/Reveal";
import CaseCard from "./CaseCard";
import { getCases } from "@/lib/cases";

export default async function CaseList({ place }: { place: PlaceSlug | null }) {
  const cases = await getCases();
  // 선택된 장소 사례만 (null = 전체)
  const items = place ? cases.filter((c) => c.place === place) : cases;
  if (items.length === 0) {
    // ===== 빈 상태: 해당 장소 사례가 아직 없을 때 =====
    return (
      <p className="rounded-[24px] bg-[#F5F5F5] py-[80px] text-center text-[15px] leading-[24px] tracking-[-0.3px] text-[#888] lg:text-[16px]">
        해당 장소의 시공사례를 준비 중입니다.
        <br />
        비슷한 현장이 궁금하시면 상담으로 문의해 주세요.
      </p>
    );
  }

  return (
    // ===== 카드 그리드: 모바일 1열 / 태블릿 2열 / PC 3열, 줄마다 살짝 시차를 둔 등장 =====
    <div className="grid grid-cols-1 gap-[44px] sm:grid-cols-2 sm:gap-x-[24px] lg:grid-cols-3 lg:gap-x-[32px] lg:gap-y-[56px]">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={(i % 3) * 120} threshold={0.1}>
          <CaseCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}
