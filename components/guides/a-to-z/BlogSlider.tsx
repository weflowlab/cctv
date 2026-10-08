"use client";

/**
 * 창업 A to Z 가이드 — "가이드북과 함께 보면 더 좋은 창업 노하우" 블로그 섹션
 * - 원본: 블로그 API(categoryId=6)에서 글을 받아
 *   · PC: Swiper (initialSlide 2, slidesPerView "auto", centeredSlides, spaceBetween 44, 드래그 가능한 스크롤바), 슬라이드 폭 516px
 *   · 모바일: 최신 2개만 세로 목록
 * - "키퍼 블로그 바로가기" → /blog?category=6
 * - 여기서는 API 대신 원본 응답을 옮긴 정적 데이터를 사용한다. (TODO: API 연동)
 */
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import Placeholder from "@/components/common/Placeholder";
import { ArrowRightIcon } from "@/components/guides/shared/icons";

type Post = { title: string; customUrl: string };

// TODO: API 연동 — GET https://api-support.keeperplatform.com/v1/post?limit=50&categoryId=6
const POSTS: Post[] = [
  { title: "카페 창업 성공하는 사장님들의 3가지 공통점 – 차별화·시스템화·원격 모니터링", customUrl: "cafe-management-automation-strategy" },
  { title: "저가 커피 전쟁 속 개인 카페가 살아남는 법 – 고정비 3가지 절감 전략", customUrl: "cafe-fixed-cost-reduction" },
  { title: "우리 매장 고정비 아끼는 꿀팁! 소상공인 정책자금 완벽 가이드 2026", customUrl: "2026-small-business-policy-fund-loan-guide-keeper" },
  { title: "아직 신청 안 하셨나요? 2026 소상공인 경영안정 바우처 신청 가이드", customUrl: "2026-small-business-policy-fund-loan-guide-apply" },
  { title: "헬스장 창업 비용, 얼마나 필요할까? 성공적인 창업을 위한 완벽 가이드", customUrl: "how-to-prepare-to-open-gym" },
  { title: "본사 관리자가 꼭 알아야 할 ‘가맹사업법(프랜차이즈법)’핵심 가이드", customUrl: "franchise-business-act-guide" },
  { title: "실패하지 않는 창업 아이템 선정법 : 3년 후에도 살아남을 사업계획서 작성은 어떻게?", customUrl: "how-to-choose-startup-idea" },
  { title: "초보 사장님을 위한 창업 준비 A to Z 가이드북", customUrl: "startup-a-to-z-guide" },
];

/** 블로그 카드 (썸네일 + 제목, 부제목 숨김 — 원본 hideSubTitle) */
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.customUrl}`} className="block w-full">
      <Placeholder
        label={post.title}
        className="aspect-[658/439] h-auto w-full rounded-[12px] lg:aspect-auto lg:h-[315px] lg:rounded-[32px]"
      />
      <h3 className="mt-[16px] px-[8px] text-left text-[20px] leading-[30px] font-bold tracking-[-0.4px] break-keep whitespace-normal text-[#202020] lg:px-[12px] lg:text-[26px] lg:leading-[38px] lg:tracking-[-0.26px]">
        {post.title}
      </h3>
    </Link>
  );
}

export default function BlogSlider() {
  return (
    // ===== 블로그 추천: PC 슬라이더 / 모바일 2개 목록 =====
    <section className="relative w-full bg-white px-4 py-[60px] text-center lg:px-0 lg:py-[150px]">
      <h2 className="text-center text-[30px] leading-[45px] font-bold tracking-[-0.9px] text-[#202020] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
        가이드북과 함께 보면
        <br />
        <strong className="text-[#ff5c00]">더 좋은 창업 노하우</strong>
      </h2>
      <h3 className="mt-[16px] text-center text-[18px] leading-[26px] font-normal tracking-[-0.36px] text-[#5e5e5e] lg:mt-[20px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
        키퍼가 실제 창업에 바로 활용할 수 있는 실전 지식만 선별해 드립니다.
      </h3>
      <Link
        href="/blog?category=6"
        aria-label="키퍼 블로그 바로가기"
        className="relative z-10 mt-[20px] inline-flex items-center justify-center gap-[8px] rounded-[48px] bg-[#ff5c00] px-[30px] py-[12px] text-[16px] leading-[23px] font-bold tracking-[-0.32px] text-white transition duration-100 ease-in-out hover:bg-[#e83b05] lg:mt-[36px] lg:py-[14px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]"
      >
        <span>키퍼 블로그 바로가기</span>
        <ArrowRightIcon width={14} height={14} />
      </Link>

      {/* PC 슬라이더: 가운데 정렬 + 하단 드래그 스크롤바 */}
      <div className="relative mt-[88px] hidden min-h-[315px] w-full lg:block">
        <Swiper
          modules={[Scrollbar]}
          initialSlide={2}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={44}
          scrollbar={{ draggable: true }}
          className="pb-[40px]!"
        >
          {POSTS.map((post) => (
            <SwiperSlide key={post.customUrl} className="w-[516px]! min-w-[516px]">
              <PostCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 모바일 목록: 최신 2개 (원본 limit 2) */}
      <div className="mt-[48px] flex w-full flex-col gap-[48px] lg:hidden">
        {POSTS.slice(0, 2).map((post) => (
          <PostCard key={post.customUrl} post={post} />
        ))}
      </div>
    </section>
  );
}
