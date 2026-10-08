"use client";

/**
 * 블로그 목록 (원본 /blog 페이지 클라이언트 컴포넌트 22158 모듈)
 * - 구성: 창업 A to Z 가이드 배너 → 카테고리 탭 → 글 카드 그리드 → 무한 스크롤 감지용 20px 센티널
 * - 카테고리: URL 쿼리 ?category={id} 로 관리 (원본 router.push("/blog?category=id", { scroll: false })).
 *   "전체"(id 0)는 쿼리 없이 /blog.
 * - 무한 스크롤: 원본은 API 를 limit 20 커서 페이지네이션 + IntersectionObserver(threshold 0.1) 로 다음 페이지 요청.
 *   여기서는 정적 데이터를 20개씩 잘라 보여주고, 센티널이 보이면 20개 추가.
 * - 원본에는 검색/페이지 번호/더보기 버튼이 없다.
 */
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import BlogCard from "./BlogCard";
import { BLOG_CATEGORIES, BLOG_PAGE_SIZE, BLOG_POSTS } from "./data";

/** useSearchParams 로 카테고리를 읽어 목록에 전달 (page.tsx 에서 Suspense 로 감쌈) */
export function BlogListFromParams() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("category")) || 0;
  // 카테고리가 바뀌면 key 로 목록 상태(보여준 개수)를 초기화
  return <BlogList key={categoryId} categoryId={categoryId} />;
}

export default function BlogList({ categoryId }: { categoryId: number }) {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  // 현재까지 노출한 글 개수 (무한 스크롤 페이지 수 × 20)
  const [visibleCount, setVisibleCount] = useState(BLOG_PAGE_SIZE);

  // 선택된 카테고리 글만 필터 (0 = 전체)
  const filtered = useMemo(
    () => (categoryId ? BLOG_POSTS.filter((p) => p.categoryId === categoryId) : BLOG_POSTS),
    [categoryId],
  );
  const posts = filtered.slice(0, visibleCount);
  const hasNext = visibleCount < filtered.length;

  // 센티널(20px 빈 div)이 10% 보이면 다음 20개 노출 — 원본 IntersectionObserver 로직
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNext) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((c) => c + BLOG_PAGE_SIZE);
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasNext, visibleCount]);

  // 탭 클릭 → URL 쿼리 변경 (스크롤 위치 유지)
  const selectCategory = (id: number) => {
    router.push(`/blog${id ? `?category=${id}` : ""}`, { scroll: false });
  };

  const tabs = [{ id: 0, name: "전체" }, ...BLOG_CATEGORIES];

  return (
    <section className="w-full pb-[120px] lg:pb-[160px]">
      <div className="mx-auto max-w-[1112px] px-[16px]">
        {/* ===== 상단 배너: 창업 A to Z 가이드 / 클릭 시 /a-to-z-guide 이동
            (원본 이미지: PC 2160x506 가로형 → 높이 253px 고정, 모바일 670x670 정사각) ===== */}
        <section className="my-[44px] h-auto w-full overflow-hidden rounded-[32px] bg-[#fff7ea] lg:mb-[100px] lg:mt-[56px] lg:h-[253px]">
          <h1 className="blind">사장님 매장을 위한 한화비전 프리미엄 CCTV, Keeper</h1>
          <button type="button" onClick={() => router.push("/a-to-z-guide")} className="block h-full w-full cursor-pointer">
            <Placeholder
              label="창업 a to z 가이드 banner"
              className="aspect-square h-full w-full rounded-[32px] lg:aspect-auto"
            />
          </button>
        </section>

        {/* ===== 카테고리 탭: 선택 #222/흰 글자, 미선택 #F5F5F5/#888 — 모바일은 가로 스크롤 ===== */}
        <div className="mb-[28px] flex flex-nowrap gap-[6px] overflow-x-auto [scrollbar-width:none] lg:mb-[40px] lg:flex-wrap lg:gap-[10px] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const selected = tab.id === categoryId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectCategory(tab.id)}
                className={`h-[40px] shrink-0 cursor-pointer rounded-[50px] border border-white px-[16px] text-[14px] font-medium leading-[22px] tracking-[-0.3px] transition-all duration-300 ease-in-out lg:h-[46px] lg:px-[20px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.4px] ${
                  selected ? "bg-[#222] text-white" : "bg-[#F5F5F5] text-[#888]"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* ===== 글 카드 그리드: PC 2열(gap 56/48), 모바일 1열(gap 48) ===== */}
        <div className="flex flex-col flex-wrap gap-[48px] lg:flex-row lg:gap-x-[48px] lg:gap-y-[56px]">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* ===== 무한 스크롤 센티널: 다음 페이지가 있을 때만 렌더 ===== */}
        {hasNext && <div ref={sentinelRef} style={{ height: "20px" }} />}
      </div>
    </section>
  );
}
