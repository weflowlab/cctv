"use client";

/**
 * 홈 히어로 메인 배너 (원본 eE 컴포넌트, sc-1fa4b37c / sc-3686406a / sc-d87f7a0)
 * - 투명 헤더 밑으로 깔리도록 음수 margin-top(헤더 높이만큼) 적용 — 원본 margin-top: calc(-1 * var(--header-height-pc)).
 * - PC: 1920px 고정 폭 스테이지를 가운데 정렬(양옆은 overflow:hidden 으로 잘림), 높이 640px.
 *   모바일: 최대 480px 폭, 최소 높이 640px, 검은 배경.
 * - Swiper 옵션(원본 그대로): loop, Pagination(clickable, 커스텀 원형 불릿), modules [Pagination, Autoplay]
 *   ※ 원본은 Autoplay 모듈만 등록하고 autoplay 파라미터를 주지 않아 자동 재생되지 않는다 → 동일하게 유지.
 * - 슬라이드 1: TVC 영상 + (모바일에서만 보이는) 카피/빠른 상담하기 버튼, /contact 새 창.
 *   슬라이드 2~6: 프로모션 이미지 배너 5개, 각 페이지로 새 창 링크.
 * - ?banner=<id> 쿼리로 시작 슬라이드 지정 (원본 useSearchParams 로직).
 * - 3번째 슬라이드(realIndex 2, 직원관리 밝은 배너)에서는 불릿을 어두운 색으로 전환(dark-pagination).
 * - 초기화 전에는 opacity 0 → onBeforeInit 에서 1 로 페이드 인 (레이아웃 깜빡임 방지).
 */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import { HeroArrowIcon } from "./icons";

/** 이미지 배너 목록 (원본 e_ = PC / ek = 모바일, 이미지만 다르고 id·alt·경로 동일) */
const BANNERS = [
  { id: "keeper", alt: "매장 전용 CCTV 무약정 구매 프로모션 - 설치비 0원", path: "/security" },
  { id: "partners", alt: "키퍼 직원관리 서비스 - 근로계약서·출퇴근·급여 관리 무료", path: "/new-service/employee-contract" },
  { id: "shop-management-guide", alt: "매장관리 가이드북 - 매장 운영 노하우 무료 다운로드", path: "/shop-management-guide" },
  { id: "trand_report", alt: "2026 자영업 트렌드 리포트 다운로드", path: "/2026-trend-report" },
  { id: "a_to_z_guide", alt: "창업 A to Z 가이드 - 단계별 창업 가이드북 무료 다운로드", path: "/a-to-z-guide" },
];

/** 원본 pagination 옵션(eZ): 커스텀 클래스의 div 불릿 */
const PAGINATION = {
  clickable: true,
  type: "bullets" as const,
  bulletClass: "custom-bullet",
  bulletActiveClass: "custom-bullet-active",
  renderBullet: (_index: number, className: string) => `<div class="${className}"></div>`,
};

export default function HeroBanner() {
  const searchParams = useSearchParams();

  // ?banner=<id> 가 있으면 해당 배너부터 시작 (영상 슬라이드가 0번이므로 +1)
  const bannerId = searchParams.get("banner") || "";
  const found = BANNERS.findIndex((b) => b.id === bannerId);
  const initialSlide = found === -1 ? 0 : found + 1;

  // Swiper 초기화 여부 → 컨테이너 페이드 인
  const [ready, setReady] = useState(false);
  // 현재 실제 인덱스(loop 복제 슬라이드 제외) → 불릿 색 전환에 사용
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const darkPagination = activeIndex === 2;

  return (
    // ===== 히어로 섹션: 헤더 높이만큼 위로 당겨 투명 헤더 밑에 깔림 =====
    <section className="relative -mt-[var(--header-height-mobile)] flex min-h-[640px] w-full items-start justify-center overflow-hidden bg-black lg:-mt-[var(--header-height)] lg:h-[640px] lg:items-center lg:bg-transparent">
      {/* ===== 스테이지: PC 1920px 고정 폭 / 모바일 최대 480px + 커스텀 불릿 스타일 ===== */}
      <div
        className={[
          "relative h-[640px] w-full max-w-[480px] bg-black lg:h-[640px] lg:w-[1920px] lg:min-w-[1920px] lg:max-w-none",
          // 페이지네이션 위치: 하단 80px(모바일) / 60px(PC), PC 는 1112px 폭 안에서 왼쪽 정렬
          "[&_.swiper-pagination]:absolute [&_.swiper-pagination]:bottom-[80px] [&_.swiper-pagination]:left-1/2 [&_.swiper-pagination]:z-[1] [&_.swiper-pagination]:flex [&_.swiper-pagination]:-translate-x-1/2 [&_.swiper-pagination]:items-center [&_.swiper-pagination]:gap-[8px]",
          "lg:[&_.swiper-pagination]:bottom-[60px] lg:[&_.swiper-pagination]:w-[1112px]",
          // 원형 불릿: 기본 테두리만, 활성 시 채움 (0.2s 전환)
          "[&_.custom-bullet]:h-[10px] [&_.custom-bullet]:w-[10px] [&_.custom-bullet]:cursor-pointer [&_.custom-bullet]:rounded-full [&_.custom-bullet]:border [&_.custom-bullet]:bg-transparent [&_.custom-bullet]:transition-all [&_.custom-bullet]:duration-200",
          darkPagination
            ? "[&_.custom-bullet]:border-[#202020] [&_.custom-bullet-active]:bg-[#202020]!"
            : "[&_.custom-bullet]:border-white [&_.custom-bullet-active]:bg-white!",
        ].join(" ")}
      >
        <h1 className="blind">사장님 매장을 위한 한화비전 프리미엄 CCTV, Keeper</h1>

        <Swiper
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.2s" }}
          className="h-[640px]"
          modules={[Pagination, Autoplay]}
          direction="horizontal"
          loop
          initialSlide={initialSlide}
          pagination={PAGINATION}
          // 초기화 직전에 보이도록 전환 (원본 onBeforeInit)
          onBeforeInit={() => setReady(true)}
          // 슬라이드 변경 시 realIndex 저장 → 불릿 색 결정
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {/* ===== 슬라이드 1: TVC 영상 + 카피 + 빠른 상담하기 (/contact 새 창) ===== */}
          <SwiperSlide className="min-h-full">
            <Link
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              title="요즘 사장님의 매장 전용 CCTV 이젠, 키퍼하세요"
              className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden lg:flex-row"
            >
              {/* 모바일: 상단 340px 어두운 그라데이션 (원본 ::after) */}
              <span className="absolute left-0 top-0 z-0 h-[340px] w-[1308px] bg-[linear-gradient(180deg,#0c0b09_65.44%,rgba(12,11,9,0)_100%)] lg:h-full lg:bg-none" />
              {/* 영상 자리: PC tvc_pc2.mp4(1920px), 모바일 tvc_mb2.mp4 (autoPlay/loop/muted/playsInline) */}
              <Placeholder
                kind="video"
                dark
                label="메인 TVC 영상 (요즘 사장님의 매장 전용 CCTV 이젠, 키퍼하세요)"
                className="mt-auto aspect-[4/5] w-[calc(100%+40px)] shrink-0 -translate-y-[80px] lg:mt-0 lg:aspect-auto lg:h-full lg:w-[1920px] lg:translate-y-0"
              />
              {/* 카피 영역: 원본 CSS 상 PC 에서는 display:none(영상에 카피 포함), 모바일에서만 노출 */}
              <div className="absolute z-[1] flex h-full w-full items-start justify-center pt-[100px] lg:hidden">
                <div className="flex w-[1080px] flex-col items-center text-center text-white">
                  <h2 className="whitespace-pre-line text-[28px] font-bold leading-[1.4] tracking-[-2px] lg:text-[42px]">
                    요즘 사장님의 매장 전용 CCTV
                    <br />
                    이젠, <strong className="text-brand">키퍼</strong>하세요
                  </h2>
                  <p className="mb-[12px] mt-[8px] text-[16px] font-normal leading-[1.6] tracking-[-0.52px] lg:mb-[54px] lg:mt-[14px] lg:text-[18px]">
                    매장 보안부터 직원 근태관리까지
                  </p>
                  {/* 원본은 <a> 안의 <button> — 링크 전체가 클릭 영역이므로 시각 요소만 재현 */}
                  <span className="flex h-[38px] w-fit items-center justify-center gap-[4px] rounded-[100px] bg-brand pl-[25px] pr-[22px] text-center text-[14px] font-bold tracking-[-0.169px] text-white lg:h-[52px] lg:gap-[8px] lg:text-[20px] lg:font-medium lg:tracking-[-0.3px]">
                    빠른 상담하기
                    <HeroArrowIcon />
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>

          {/* ===== 슬라이드 2~6: 이미지 배너 (각 페이지 새 창) ===== */}
          {BANNERS.map((banner) => (
            <SwiperSlide key={banner.id} className="min-h-full">
              <Link
                href={banner.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full w-full cursor-pointer"
              >
                <Placeholder
                  dark
                  label={banner.alt}
                  className="absolute left-0 top-0 z-0 h-full w-[calc(100%+1px)] lg:h-[calc(100%+2px)] lg:w-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/** Suspense 대기 중 표시할 동일 크기의 빈 히어로 (useSearchParams 사용 → Suspense 필요) */
export function HeroBannerFallback() {
  return (
    <section className="relative -mt-[var(--header-height-mobile)] flex min-h-[640px] w-full justify-center overflow-hidden bg-black lg:-mt-[var(--header-height)] lg:h-[640px] lg:bg-transparent">
      <div className="h-[640px] w-full max-w-[480px] bg-black lg:w-[1920px] lg:min-w-[1920px] lg:max-w-none" />
    </section>
  );
}
