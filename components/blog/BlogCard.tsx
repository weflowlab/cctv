/**
 * 블로그 글 카드 (원본 sc-4c9b1ab9-*)
 * - /blog 목록과 상세 하단 "추천 아티클" 에서 공용으로 사용.
 * - 구성: 썸네일(62% 비율, 라운드 32px / 모바일 24px) → 카테고리(주황) → 제목 → 요약(2줄 말줄임)
 * - 원본 동작: 카드 hover 시 위로 10px 이동 (transform 0.4s)
 * - PC 에서는 2열 (max-width: calc(50% - 24px)), 모바일 1열
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { getCategoryName, type BlogPost } from "./data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex w-full flex-col gap-[16px] overflow-hidden transition-transform duration-[400ms] hover:-translate-y-[10px] lg:max-w-[calc(50%-24px)] lg:gap-[24px]"
    >
      {/* ===== 썸네일: 원본 padding-bottom 62% 비율 박스 ===== */}
      <div className="relative w-full overflow-hidden rounded-[24px] pb-[62%] lg:rounded-[32px]">
        <Placeholder label={post.title} className="absolute left-0 top-0 h-full w-full" />
      </div>

      {/* ===== 텍스트: 카테고리 / 제목 / 요약 ===== */}
      <div>
        <span className="mb-[6px] inline-block text-[15px] font-bold leading-[24px] tracking-[-0.3px] text-[#ff5c00]">
          {getCategoryName(post.categoryId)}
        </span>
        <h2 className="mb-[8px] text-[22px] font-bold leading-[32px] tracking-[-0.5px] text-[#222] lg:text-[24px] lg:leading-[34px]">
          {post.title}
        </h2>
        <p className="line-clamp-2 h-[50px] overflow-hidden text-ellipsis break-all text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-[#666] lg:h-[58px] lg:text-[16px] lg:leading-[26px]">
          {post.summary}
        </p>
      </div>
    </Link>
  );
}
