/**
 * 장소 선택 칩 바 — 서버 컴포넌트 (현재 장소는 props 로 받음)
 * - PLACES 5개를 Link 칩으로 나열, 현재 칩은 오렌지 채움
 * - 칩 아래에 현재 장소가 포함하는 업종(includes)을 작게 표시
 * - 인터랙션:
 *   · 칩 클릭 = /places/<slug> 페이지 이동. scroll={false} 로 스크롤을 맨 위로 튀게 하지 않음
 *   · 바 전체를 sticky(헤더 높이만큼 아래) 로 고정 → 본문을 읽다가도 바로 다른 장소로 전환 가능
 *   · 모바일에서 칩이 넘치면 가로 스크롤
 */
import Link from "next/link";
import { PLACES, type PlaceSlug } from "@/lib/site";

export default function PlaceChips({ current }: { current: PlaceSlug }) {
  const currentPlace = PLACES.find((p) => p.slug === current);

  return (
    <nav
      aria-label="장소 선택"
      className="sticky top-[var(--header-height-mobile)] z-10 w-full border-b border-[#eee] bg-white/95 backdrop-blur lg:top-[var(--header-height)]"
    >
      <div className="mx-auto flex w-full max-w-[1082px] flex-col items-center gap-[8px] px-[20px] py-[12px] lg:gap-[12px] lg:py-[20px]">
        {/* ===== 칩 목록: 현재 칩 = 오렌지 채움, 나머지 = 회색 테두리 ===== */}
        <ul className="flex w-full justify-start gap-[8px] overflow-x-auto [scrollbar-width:none] lg:justify-center lg:gap-[12px]">
          {PLACES.map((p) => {
            const active = p.slug === current;
            return (
              <li key={p.slug} className="shrink-0">
                <Link
                  href={`/places/${p.slug}`}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full border px-[16px] py-[8px] text-[14px] font-bold transition-colors lg:px-[28px] lg:py-[12px] lg:text-[18px] ${
                    active
                      ? "border-[#ff5c00] bg-[#ff5c00] text-white"
                      : "border-[#ddd] bg-white text-[#787878] hover:border-[#ff5c00] hover:text-[#ff5c00]"
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ===== 현재 장소 포함 업종 ===== */}
        {currentPlace && (
          <p className="text-[12px] text-[#878d99] lg:text-[14px]">
            {currentPlace.includes.join(" · ")}
          </p>
        )}
      </div>
    </nav>
  );
}
