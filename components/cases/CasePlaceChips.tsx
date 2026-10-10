"use client";

/**
 * 시공사례 장소 칩 바 — 현재 장소는 URL(usePathname)에서 판단
 * - app/cases/(list)/layout.tsx 에서 params 없이 렌더 (칩 이동 시 즉시 보임 / Instant Navigation 대응).
 *   usePathname 미확정 시를 위해 Suspense 로 감싸고, 대기 중엔 선택 없는 칩 바를 보여준다.
 * - 칩: [전체 → /cases] + PLACES 5개 [→ /cases/place/<slug>] 를 Link 로 나열
 *   · 선택 브랜드 네이비/흰 글자, 미선택 #F5F5F5/#888
 *   · scroll={false} 로 칩 이동 시 스크롤이 맨 위로 튀지 않게
 *   · 바 전체를 sticky(헤더 높이만큼 아래)로 고정, 모바일에서 넘치면 가로 스크롤(슬라이드)
 *   · 칩 안에 사례 건수("전체 11", "가정 2") — CASES 에서 계산. 선택 칩에선 반투명 흰색 숫자.
 *     건수 0 인 장소도 표시하되 흐리게(비활성처럼), 클릭은 가능(빈 상태 안내로 이동)
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { CASES, countCasesByPlace } from "./data";

/** 선택 상태: undefined = 미확정(대기 중), null = 전체, slug = 장소 */
type Current = PlaceSlug | null | undefined;

/** 장소별 사례 건수 (모듈 로드 시 1회 계산 — 샘플 데이터, 추후 DB 집계로 교체) */
const COUNTS = countCasesByPlace();

const CHIPS: { slug: PlaceSlug | null; name: string; href: string; count: number }[] = [
  { slug: null, name: "전체", href: "/cases", count: CASES.length },
  ...PLACES.map((p) => ({ slug: p.slug, name: p.name, href: `/cases/place/${p.slug}`, count: COUNTS[p.slug] })),
];

export default function CasePlaceChips() {
  return (
    <Suspense fallback={<ChipsBar current={undefined} />}>
      <ActiveChips />
    </Suspense>
  );
}

/** URL 에서 현재 장소 추출 — /cases → 전체, /cases/place/<slug> → 해당 장소 */
function ActiveChips() {
  const pathname = usePathname();
  const [, , seg, slug] = pathname.split("/");
  const current: Current =
    seg === "place" ? (PLACES.find((p) => p.slug === slug)?.slug ?? undefined) : seg === undefined ? null : undefined;
  return <ChipsBar current={current} />;
}

function ChipsBar({ current }: { current: Current }) {
  return (
    <nav
      aria-label="장소 선택"
      className="sticky top-[var(--header-height-mobile)] z-10 w-full bg-white/95 py-[12px] backdrop-blur lg:top-[var(--header-height)] lg:py-[16px]"
    >
      <ul className="mx-auto flex max-w-[1112px] flex-nowrap gap-[6px] overflow-x-auto px-[16px] [scrollbar-width:none] lg:flex-wrap lg:gap-[10px] [&::-webkit-scrollbar]:hidden">
        {CHIPS.map((chip) => {
          const selected = chip.slug === current;
          const empty = chip.count === 0;
          return (
            // relative: 칩 안 화면낭독용(sr-only, absolute) 글자가 가로 스크롤 영역 밖으로 빠져 페이지가 옆으로 밀리지 않게
            <li key={chip.name} className="relative shrink-0">
              <Link
                href={chip.href}
                scroll={false}
                aria-current={selected ? "page" : undefined}
                className={`flex h-[40px] items-center gap-[6px] rounded-[50px] border border-white px-[16px] text-[14px] font-medium leading-[22px] tracking-[-0.3px] transition-all duration-300 ease-in-out lg:h-[46px] lg:px-[20px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.4px] ${
                  selected
                    ? "bg-brand text-white"
                    : empty
                      ? "bg-[#F8F8F8] text-[#bbb] hover:text-[#888]"
                      : "bg-[#F5F5F5] text-[#888] hover:text-point-strong"
                }`}
              >
                {chip.name}
                {/* 건수: 작은 숫자 (선택 칩은 반투명 흰색) */}
                <span
                  className={`text-[12px] font-semibold tabular-nums lg:text-[13px] ${
                    selected ? "text-white/60" : empty ? "text-[#ccc]" : "text-[#aaa]"
                  }`}
                >
                  <span className="sr-only">(</span>
                  {chip.count}
                  <span className="sr-only">건)</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
