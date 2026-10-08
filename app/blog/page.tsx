/**
 * /blog 페이지 — 키퍼 블로그 목록 (원본 https://keeper.ceo/blog)
 * - 서버 컴포넌트. 목록(카테고리 탭 + 무한 스크롤)은 클라이언트 컴포넌트 BlogList.
 * - 카테고리는 ?category={id} 쿼리로 관리 → useSearchParams 를 쓰므로 Suspense 로 감싼다.
 *   (cacheComponents 환경: Suspense 밖 useSearchParams 는 프리렌더 오류)
 *   fallback 으로 "전체" 목록을 그대로 렌더해 초기 HTML 에도 글 목록이 들어가게 한다.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogList, { BlogListFromParams } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "키퍼 블로그 | 매장운영·창업 인사이트",
  description: "매장 보안, 직원 관리, 창업 노하우까지 사장님을 위한 실전 가이드",
};

export default function BlogPage() {
  return (
    <>
      {/* ===== 블로그 목록: 배너 / 카테고리 탭 / 카드 그리드 / 무한 스크롤 ===== */}
      <Suspense fallback={<BlogList categoryId={0} />}>
        <BlogListFromParams />
      </Suspense>
    </>
  );
}
