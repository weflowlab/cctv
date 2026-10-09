"use client";

/**
 * 서비스 페이지 상단 탭 바 [CCTV 설치 · CCTV 렌탈 · AS 수리 · CCTV+스피커]
 * - 탭마다 별도 URL(/service/<slug>) 로 이동하는 Link. 현재 탭은 오렌지 글자 + 하단 오렌지 밑줄.
 * - sticky: 스크롤하면 고정 헤더 바로 아래(top = 헤더 높이)에 붙는다.
 *   (부모가 <main> 이고 overflow hidden 조상이 없어야 sticky 가 동작 → 페이지 최상위 형제로 렌더)
 * - 모바일: 가로 스크롤(스크롤바 숨김). 진입 시 현재 탭이 화면 안에 보이도록 컨테이너 scrollLeft 를 맞춤
 *   (scrollIntoView 는 페이지 세로 스크롤까지 건드릴 수 있어 사용하지 않음).
 * - 현재 탭은 URL(usePathname)에서 직접 판단 → app/service/layout.tsx 에서 params 없이 렌더 가능.
 *   usePathname 이 아직 확정되지 않는 경우(빌드 시 알 수 없는 slug)를 위해 Suspense 로 감싸고,
 *   대기 중에는 선택 없는 탭 바를 보여준다.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { SERVICES, type ServiceSlug } from "@/lib/site";

export default function ServiceTabs() {
  return (
    <Suspense fallback={<TabsBar active={null} />}>
      <ActiveTabs />
    </Suspense>
  );
}

/** URL 의 /service/<slug> 에서 현재 탭 추출 */
function ActiveTabs() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const active = SERVICES.find((s) => s.slug === slug)?.slug ?? null;
  return <TabsBar active={active} />;
}

function TabsBar({ active }: { active: ServiceSlug | null }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // 현재 탭이 가로 스크롤 영역 밖에 있으면 가운데쯤으로 스크롤
  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = activeRef.current;
    if (!scroller || !tab) return;
    const left = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2;
    scroller.scrollLeft = Math.max(left, 0);
  }, [active]);

  return (
    // ===== 탭 바: 헤더 아래 sticky, 하단 1px 구분선 =====
    <nav
      aria-label="서비스 메뉴"
      className="sticky top-[var(--header-height-mobile)] z-[50] w-full border-b border-[#eee] bg-white lg:top-[var(--header-height)]"
    >
      <div
        ref={scrollerRef}
        className="mx-auto w-full overflow-x-auto px-[16px] [scrollbar-width:none] lg:w-[1080px] lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max min-w-full gap-[24px] lg:justify-center lg:gap-[56px]">
          {SERVICES.map((s) => {
            const isActive = s.slug === active;
            return (
              <li key={s.slug} className="shrink-0">
                <Link
                  ref={isActive ? activeRef : undefined}
                  href={`/service/${s.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-[52px] items-center whitespace-nowrap text-[16px] leading-[24px] tracking-[-0.32px] transition-colors lg:h-[64px] lg:text-[20px] lg:tracking-[-0.4px] ${
                    isActive
                      ? "font-bold text-[#ff5c00] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-[#ff5c00] after:content-['']"
                      : "font-medium text-[#888] hover:text-[#222]"
                  }`}
                >
                  {s.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
