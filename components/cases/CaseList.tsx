"use client";

/**
 * 시공사례 목록 (keeper BlogList 틀 복사)
 * - 구성: 장소 칩 필터 → 카드 그리드
 * - 장소 필터: URL 쿼리 ?place=<slug> 로 관리 (router.push(..., { scroll: false })).
 *   "전체"는 쿼리 없이 /cases. 잘못된 slug 는 "전체"로 취급.
 * - 데이터가 9개뿐이라 무한 스크롤은 생략.
 */
import { useRouter, useSearchParams } from "next/navigation";
import { PLACES, type PlaceSlug } from "@/lib/site";
import CaseCard from "./CaseCard";
import { CASES } from "./data";

/** useSearchParams 로 장소를 읽어 목록에 전달 (page.tsx 에서 Suspense 로 감쌈) */
export function CaseListFromParams() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("place");
  const place = PLACES.some((p) => p.slug === raw) ? (raw as PlaceSlug) : null;
  return <CaseList place={place} />;
}

export default function CaseList({ place }: { place: PlaceSlug | null }) {
  const router = useRouter();

  // 선택된 장소 사례만 (null = 전체)
  const items = place ? CASES.filter((c) => c.place === place) : CASES;

  // 칩 클릭 → URL 쿼리 변경 (스크롤 위치 유지)
  const selectPlace = (slug: PlaceSlug | null) => {
    router.push(`/cases${slug ? `?place=${slug}` : ""}`, { scroll: false });
  };

  const chips: { slug: PlaceSlug | null; name: string }[] = [
    { slug: null, name: "전체" },
    ...PLACES.map((p) => ({ slug: p.slug, name: p.name })),
  ];

  return (
    <div>
      {/* ===== 장소 칩 필터: 선택 #222/흰 글자, 미선택 #F5F5F5/#888 — 모바일은 가로 스크롤 ===== */}
      <div className="mb-[28px] flex flex-nowrap gap-[6px] overflow-x-auto [scrollbar-width:none] lg:mb-[40px] lg:flex-wrap lg:gap-[10px] [&::-webkit-scrollbar]:hidden">
        {chips.map((chip) => {
          const selected = chip.slug === place;
          return (
            <button
              key={chip.name}
              type="button"
              onClick={() => selectPlace(chip.slug)}
              aria-pressed={selected}
              className={`h-[40px] shrink-0 cursor-pointer rounded-[50px] border border-white px-[16px] text-[14px] font-medium leading-[22px] tracking-[-0.3px] transition-all duration-300 ease-in-out lg:h-[46px] lg:px-[20px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.4px] ${
                selected ? "bg-[#222] text-white" : "bg-[#F5F5F5] text-[#888]"
              }`}
            >
              {chip.name}
            </button>
          );
        })}
      </div>

      {/* ===== 카드 그리드: 모바일 1열 / 태블릿 2열 / PC 3열 ===== */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-[48px] sm:grid-cols-2 sm:gap-x-[24px] lg:grid-cols-3 lg:gap-x-[32px] lg:gap-y-[56px]">
          {items.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        // ===== 빈 상태: 해당 장소 사례가 아직 없을 때 =====
        <p className="rounded-[24px] bg-[#F5F5F5] py-[80px] text-center text-[15px] leading-[24px] tracking-[-0.3px] text-[#888] lg:text-[16px]">
          해당 장소의 시공사례를 준비 중입니다.
          <br />
          상단의 네이버 블로그에서 더 많은 사례를 확인해 보세요.
        </p>
      )}
    </div>
  );
}
