/**
 * /blog/[slug] 페이지 — 블로그 상세 (원본 https://keeper.ceo/blog/{customUrl})
 * - 서버 컴포넌트. 레이아웃: 헤더(제목·카테고리·날짜) → 썸네일 → 본문 → CTA 박스 → 블로그 홈/공유하기 버튼
 *   → 회색 배경 "추천 아티클"(이전/다음 글 카드 2개)
 * - 원본에는 목차(TOC)·사이드바가 없다.
 * - cacheComponents 환경: 모든 글 slug 를 generateStaticParams 로 빌드 시 프리렌더.
 *   목록에 없는 slug 는 notFound().
 * - 본문은 샘플 글(why-buy-cctv-not-rental)만 실제 내용, 나머지는 같은 템플릿의 더미 본문.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import BlogCard from "@/components/blog/BlogCard";
import PostActions from "@/components/blog/PostActions";
import PostBody from "@/components/blog/PostBody";
import PostCta from "@/components/blog/PostCta";
import { BLOG_POSTS, getCategoryName, getPostBySlug, getRecommendPosts } from "@/components/blog/data";

type Props = { params: Promise<{ slug: string }> };

/** 빌드 시 모든 글 상세를 정적 생성 */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

/** 원본: <title> = 글 제목, description = 글 요약 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const recommendPosts = getRecommendPosts(slug);

  return (
    <>
      <section className="mx-auto w-full max-w-[1112px] px-[20px] pb-[120px] lg:px-[16px] lg:pb-[220px]">
        <div className="mx-auto max-w-[896px]">
          {/* ===== 글 헤더: 제목 / 카테고리 | 작성일 ===== */}
          <header className="mx-auto flex max-w-[720px] flex-col items-center justify-center gap-[12px] pb-[32px] pt-[40px] text-center lg:pb-[64px] lg:pt-[80px]">
            <h1 className="mb-[16px] text-[28px] font-bold leading-[1.4] text-[#222] lg:text-[36px]">{post.title}</h1>
            <div className="flex items-center justify-center gap-[16px]">
              {/* 카테고리 오른쪽 1px 세로 구분선 (원본 ::after) */}
              <span className="relative text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#888] after:absolute after:left-full after:top-[8px] after:ml-[8px] after:h-[14px] after:w-[1px] after:bg-[#dedede] after:content-['']">
                {getCategoryName(post.categoryId)}
              </span>
              <span className="text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#888]">{post.date}</span>
            </div>
          </header>

          {/* ===== 썸네일: PC 224:137 / 라운드 40px, 모바일 335:205 / 라운드 24px ===== */}
          <div className="relative mb-[24px] flex aspect-[335/205] overflow-hidden rounded-[24px] lg:mb-[64px] lg:aspect-[224/137] lg:rounded-[40px]">
            <Placeholder label={post.title} className="absolute left-0 top-0 h-full w-full" />
          </div>

          {/* ===== 본문: 에디터 콘텐츠 영역 ===== */}
          <PostBody post={post} />

          {/* ===== CTA 박스: 도입 문의 / 비용 계산해보기 ===== */}
          <PostCta />

          {/* ===== 하단 버튼: 블로그 홈 / 공유하기(링크 복사 + 토스트) ===== */}
          <PostActions />
        </div>
      </section>

      {/* ===== 추천 아티클: 이전/다음 글 카드 (회색 배경) ===== */}
      {recommendPosts.length > 0 && (
        <div className="w-full bg-[#f7f8fa]">
          <div className="mx-auto max-w-[1112px] px-[20px] pb-[120px] pt-[60px] lg:px-[16px] lg:py-[100px]">
            <h2 className="mb-[16px] text-[24px] font-bold leading-[32px] tracking-[-0.4px] text-[#222] lg:mb-[24px]">
              추천 아티클
            </h2>
            <div className="flex flex-col flex-wrap gap-[48px] lg:flex-row lg:gap-x-[48px] lg:gap-y-[56px]">
              {recommendPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
