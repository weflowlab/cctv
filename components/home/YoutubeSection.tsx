"use client";

/**
 * 유튜브 영상 콘텐츠 섹션 (원본 tF 컴포넌트, sc-a105b7d0 / sc-55148411 / sc-93dee8c9)
 * - 배경 이미지 위에 "keep working series." 타이틀 이미지(PC 전용) + 헤드라인.
 *   PC: "키퍼의 다양한 영상 콘텐츠를 확인해 보세요." / 모바일: "다양한 키퍼영상을 확인해 보세요"
 * - PC 우측 이전/다음 원형 버튼(72px): 첫 슬라이드면 이전 비활성, 마지막이면 다음 비활성(회색 + not-allowed).
 * - Swiper(원본 옵션): initialSlide 1, slidesPerView "auto", centeredSlides, spaceBetween PC 24 / 모바일 12,
 *   scrollbar { draggable: true }. 슬라이드 크기 PC 640x360 / 모바일 288x162.
 * - 영상 카드 클릭 시 유튜브 영상 새 창. 모바일에서는 카드 우하단에 재생 아이콘.
 * - "영상 더보기" → 키퍼 유튜브 채널(https://www.youtube.com/@hanwha_keeper) 새 창.
 * - 원본은 /api/youtube(유튜브 재생목록 API)로 목록을 받는다 → 여기서는 임시 목록 사용.
 */
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import Placeholder from "@/components/common/Placeholder";
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon } from "./icons";

const CHANNEL_URL = "https://www.youtube.com/@hanwha_keeper";

// TODO: API 연동 — 원본은 react-query 로 GET /api/youtube 후 items[].snippet(title, thumbnails.high.url, resourceId.videoId) 사용
const VIDEOS = Array.from({ length: 6 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: `키퍼 유튜브 영상 ${i + 1}`,
  url: CHANNEL_URL,
}));

export default function YoutubeSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  // 현재 activeIndex (원본 초기값: 영상이 2개 이상이면 1) → 이전/다음 버튼 비활성 판단
  const [activeIndex, setActiveIndex] = useState(VIDEOS.length > 1 ? 1 : 0);
  const hasVideos = VIDEOS.length > 0;
  const prevDisabled = activeIndex === 0;
  const nextDisabled = VIDEOS.length <= 1 || activeIndex === VIDEOS.length - 1;

  const navButton =
    "pointer-events-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#edeef0]";

  return (
    // ===== 유튜브 섹션: 높이 PC 1085px / 모바일 580px, 배경 이미지 =====
    <section className="relative h-[580px] w-full overflow-hidden lg:h-[1085px]">
      {/* 배경 이미지 (원본 background_youtube_compressed.png / 모바일 background_youtube_mobile.png) */}
      <Placeholder
        label="키퍼 유튜브 영상 배경 이미지"
        className="absolute left-0 top-0 h-full w-full translate-x-[-20px] translate-y-[40px] scale-125 lg:translate-x-0 lg:translate-y-0 lg:scale-100"
      />

      {/* ===== 타이틀 + PC 이전/다음 버튼 ===== */}
      <div className="relative flex w-full justify-center pt-[120px] lg:pt-[240px]">
        <div className="flex w-full items-end justify-center lg:w-[1080px] lg:justify-between">
          <div>
            {/* "keep working series." 타이틀 이미지 — PC 전용 */}
            <Placeholder label="keep working series." className="hidden h-[74px] w-[296px] lg:flex" />
            <h2 className="text-center text-[28px] font-bold leading-[40px] tracking-[-1px] text-[#222] lg:text-left lg:text-[42px] lg:leading-[60px]">
              <span className="hidden lg:inline">키퍼의 다양한 영상 콘텐츠를 확인해 보세요.</span>
              <span className="lg:hidden">
                다양한 <strong className="text-brand">키퍼영상</strong>을
                <br />
                확인해 보세요
              </span>
            </h2>
          </div>
          {hasVideos && (
            <div className="pointer-events-none z-[1] hidden gap-[16px] lg:flex">
              <button
                type="button"
                aria-label="이전 영상"
                className={`${navButton} ${prevDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ArrowLeftIcon width={40} height={40} color={prevDisabled ? "#bbb" : "#333"} />
              </button>
              <button
                type="button"
                aria-label="다음 영상"
                className={`${navButton} ${nextDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowRightIcon width={40} height={40} color={nextDisabled ? "#bbb" : "#333"} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== 영상 슬라이더 (화면 전체 폭, 가운데 정렬) ===== */}
      <div className="relative mt-[32px] w-screen lg:mt-[48px] [&_.swiper-slide]:h-[162px] [&_.swiper-slide]:w-[288px] lg:[&_.swiper-slide]:h-[360px] lg:[&_.swiper-slide]:w-[640px]">
        <Swiper
          modules={[Scrollbar]}
          className="pb-[20px]!"
          initialSlide={1}
          slidesPerView="auto"
          spaceBetween={12}
          breakpoints={{ 1024: { spaceBetween: 24 } }}
          centeredSlides
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          // 슬라이드가 바뀔 때마다 activeIndex 저장 → 버튼 비활성 상태 갱신
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {VIDEOS.map((video) => (
            <SwiperSlide key={video.id}>
              {/* 영상 카드: 썸네일 + 링크(새 창), 모바일 재생 아이콘 */}
              <div className="relative h-full w-full overflow-hidden rounded-[9px] lg:rounded-[24px]">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="absolute left-0 top-0 h-full w-full">
                  <Placeholder kind="video" label={video.title} className="h-full w-full" />
                </a>
                <div className="pointer-events-none absolute bottom-[18px] left-[20px] right-[20px] flex justify-end lg:hidden">
                  <div className="h-[38px] w-[38px]">
                    <PlayIcon width={38} height={38} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== 영상 더보기 → 유튜브 채널 ===== */}
      <div className="relative mt-[32px] flex justify-center lg:mt-[48px]">
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="영상 더보기"
          className="flex h-[42px] w-[168px] cursor-pointer items-center justify-center rounded-[30px] border-0 bg-white text-[14px] font-bold leading-[20px] tracking-[-1px] text-[rgba(32,32,32,0.9)] lg:h-[76px] lg:w-[264px] lg:rounded-[62px] lg:text-[24px] lg:leading-[40px]"
        >
          영상 더보기
        </a>
      </div>
    </section>
  );
}
