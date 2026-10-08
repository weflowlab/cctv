"use client";

/**
 * /plan 하단 "지금 당장 활용 가능한 매장 관리의 모든 것" 블로그 섹션
 * - 원본 sc-6337bc66:
 *   · PC: Swiper (initialSlide 2, slidesPerView "auto"(슬라이드 폭 516px), centeredSlides,
 *         spaceBetween 44, 드래그 가능한 스크롤바)
 *   · 모바일: 슬라이더 없이 고정 글 3개를 세로 목록(gap 48px)으로 노출
 *   · "키퍼 블로그 바로가기" 버튼 → /blog?category=1
 * - 블로그 데이터는 원본 API 스냅샷(planData.BLOG_POSTS) 사용
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import Placeholder from "@/components/common/Placeholder";
import { BLOG_POSTS, type BlogPost } from "./planData";

/** 블로그 카드 (원본 sc-622f5cd4) — 썸네일 / 제목 / 부제(한 줄 말줄임) */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.customUrl}`} className="block w-full">
      <Placeholder
        label={post.title}
        className="aspect-[658/439] w-full rounded-[12px] lg:aspect-auto lg:h-[315px] lg:rounded-[32px]"
      />
      <h3 className="mt-[16px] whitespace-normal break-keep px-[8px] text-left text-[20px] font-bold leading-[30px] tracking-[-0.4px] text-[#202020] [overflow-wrap:break-word] lg:px-[12px] lg:text-[26px] lg:leading-[38px] lg:tracking-[-0.26px]">
        {post.title}
      </h3>
      <h4 className="mt-[6px] overflow-hidden text-ellipsis whitespace-nowrap px-[8px] text-left text-[14px] font-normal leading-[22px] tracking-[-0.14px] text-[#535353] lg:mt-[12px] lg:px-[12px] lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.5px]">
        {post.subTitle}
      </h4>
    </Link>
  );
}

export default function BlogSection() {
  const router = useRouter();
  // 모바일 목록: 원본 mobileBlogList = 정렬된 목록의 1~3번째(고정 글 3개)
  const mobileList = BLOG_POSTS.slice(1, 4);

  return (
    <section className="relative px-[16px] py-[70px] text-center lg:px-0 lg:pb-[200px] lg:pt-0">
      {/* ===== 섹션 타이틀 + 부제 ===== */}
      <h2 className="text-center text-[30px] font-bold leading-[45px] tracking-[-0.9px] text-[#202020] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
        지금 당장 활용 가능한
        <br />
        <strong className="text-[#ff5c00]">매장 관리의 모든 것</strong>
      </h2>
      <h2 className="mt-[16px] text-center text-[18px] font-normal leading-[26px] tracking-[-0.36px] text-[#333] lg:mt-[20px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px] lg:opacity-85">
        매장 운영에 꼭 필요한 실무 노하우를
        {/* PC 는 공백, 모바일은 줄바꿈 (원본 spaceOrBreak) */}
        <span className="hidden lg:inline"> </span>
        <br className="lg:hidden" />
        키퍼가 알려드려요!
      </h2>

      {/* ===== 블로그 바로가기 버튼: 클릭 시 /blog?category=1 이동 ===== */}
      <button
        type="button"
        aria-label="키퍼 블로그 바로가기"
        onClick={() => router.push("/blog?category=1")}
        className="relative z-10 mt-[20px] inline-flex cursor-pointer items-center justify-center gap-[8px] rounded-[48px] bg-[#ff5c00] px-[30px] py-[10px] text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-all duration-100 ease-in-out hover:bg-[#e83b05] lg:mt-[36px] lg:py-[14px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]"
      >
        <span>키퍼 블로그 바로가기</span>
        <svg viewBox="0 0 18 16" width="14" height="14" fill="none" aria-hidden="true">
          <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
            <path d="M18 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1" />
            <path d="M9.293.293a1 1 0 0 0 0 1.414L15.586 8l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0" />
          </g>
        </svg>
      </button>

      {/* ===== PC 슬라이더: 가운데 정렬 auto 폭 슬라이드 + 드래그 스크롤바 ===== */}
      <div className="relative mt-[108px] hidden min-h-[482px] w-full lg:block [&_.swiper-slide]:w-[516px]">
        <Swiper
          modules={[Scrollbar]}
          initialSlide={2}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={44}
          scrollbar={{ draggable: true }}
          className="pb-[40px]"
        >
          {BLOG_POSTS.map((post) => (
            <SwiperSlide key={post.customUrl}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== 모바일 목록: 고정 글 3개 세로 나열 ===== */}
      <div className="mt-[36px] flex w-full flex-col gap-[48px] lg:hidden">
        {mobileList.map((post) => (
          <BlogCard key={post.customUrl} post={post} />
        ))}
      </div>
    </section>
  );
}
