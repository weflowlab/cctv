"use client";

/**
 * 홈 히어로 슬라이더 (keeper HeroBanner 틀 + 기존 kkcctv 메인 카피)
 * - 투명 헤더 밑으로 깔리도록 음수 margin-top(헤더 높이만큼) 적용. 헤더 투명/흰색 전환은 HomeHeaderScroll 담당.
 * - 높이 640px(PC·모바일 동일), 배경은 슬라이드별 Placeholder + 어두운 그라데이션, 카피는 그 위에 표시.
 * - Swiper 옵션: loop, autoplay 5초(사용자 조작 후에도 계속), Pagination(clickable, 커스텀 원형 불릿).
 * - 슬라이드 4장: 메인(내 공간 견적 계산하기 / 상담 신청하기) → 렌탈 → CCTV+스피커 → AS 출장수리.
 * - 초기화 전에는 opacity 0 → onBeforeInit 에서 1 로 페이드 인 (레이아웃 깜빡임 방지).
 * - Swiper Autoplay 는 렌더 중 현재 시각을 읽어 정적 프리렌더(Cache Components)와 충돌한다.
 *   → 서버/프리렌더에서는 첫 슬라이드만 정적 HTML 로 그리고, 브라우저에서 Swiper 로 교체한다.
 */
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import useIsClient from "@/components/common/useIsClient";
import { ArrowRightIcon } from "./icons";

type Slide = {
  id: string;
  /** 카피 위 작은 문구 */
  eyebrow: string;
  /** 메인 카피 (줄 단위) */
  title: string[];
  /** 서브 카피 */
  desc: string;
  /** 버튼 (첫 번째는 주황 채움, 두 번째는 흰 테두리) */
  buttons: { label: string; href: string }[];
  /** 배경 이미지 자리 설명 */
  bg: string;
};

/** 슬라이드 데이터 — 카피 출처: kkcctv 메인(index) / 렌탈 / AS / 스피커 배너 */
const SLIDES: Slide[] = [
  {
    id: "main",
    eyebrow: "한국브랜드 선호도 3년 연속 1위 수상",
    title: ["대한민국 CCTV 1등 브랜드", "보안 솔루션 전문 기업"],
    desc: "전국 인프라 구성으로 발빠른 대응과 설치가 가능합니다.",
    buttons: [
      { label: "내 공간 견적 계산하기", href: "/calculator" },
      { label: "상담 신청하기", href: "/contact" },
    ],
    bg: "메인 히어로 배경 (CCTV 설치 현장 / 원본 메인 상단 배경)",
  },
  {
    id: "rental",
    eyebrow: "CCTV 렌탈",
    title: ["초기비용 0원,", "부담 없는 CCTV 렌탈"],
    desc: "설치비·가입비·보증료 면제, 최저가 월비용으로 전국 어디든 설치가 가능합니다.",
    buttons: [{ label: "렌탈 자세히 보기", href: "/service/rental" }],
    bg: "렌탈 슬라이드 배경 (초기비용 0원 CCTV 렌탈)",
  },
  {
    id: "speaker",
    eyebrow: "CCTV + 스피커",
    title: ["CCTV + 스피커", "동시 시공 가능"],
    desc: "좋은 품질의 음향 시스템과 보안 솔루션을 한 번에 완성합니다.",
    buttons: [{ label: "동시 시공 알아보기", href: "/service/speaker" }],
    bg: "CCTV+스피커 슬라이드 배경 (원본 2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg)",
  },
  {
    id: "as",
    eyebrow: "AS 수리",
    title: ["타사 제품도 OK,", "AS 전문 출장수리"],
    desc: "의뢰 후 24시간 이내 방문 진단 및 수리, 전국 어디든 찾아갑니다.",
    buttons: [{ label: "AS 수리 알아보기", href: "/service/as" }],
    bg: "AS 출장수리 슬라이드 배경 (CCTV 점검·수리 현장)",
  },
];

/** pagination 옵션: 커스텀 클래스의 div 불릿 (keeper 그대로) */
const PAGINATION = {
  clickable: true,
  type: "bullets" as const,
  bulletClass: "custom-bullet",
  bulletActiveClass: "custom-bullet-active",
  renderBullet: (_index: number, className: string) =>
    `<div class="${className}"></div>`,
};

/** 슬라이드 한 장의 내용 (배경 + 그라데이션 + 카피 + 버튼) */
function SlideContent({ slide, idx }: { slide: Slide; idx: number }) {
  // 첫 슬라이드 카피는 페이지의 h1, 나머지는 h2
  const Heading = idx === 0 ? "h1" : "h2";
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* 배경 이미지 자리 */}
      <Placeholder
        dark
        label={slide.bg}
        className="absolute inset-0 z-0 h-full w-full border-0"
      />
      {/* 카피 가독성용 어두운 그라데이션 (모바일: 위→아래 / PC: 왼쪽→오른쪽) */}
      <span className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(12,11,9,0.85)_0%,rgba(12,11,9,0.55)_60%,rgba(12,11,9,0.3)_100%)] lg:bg-[linear-gradient(90deg,rgba(12,11,9,0.85)_0%,rgba(12,11,9,0.5)_55%,rgba(12,11,9,0.1)_100%)]" />

      {/* ===== 카피 + 버튼: 모바일 가운데 정렬 / PC 1080px 안에서 왼쪽 정렬 ===== */}
      <div className="relative z-[2] flex w-full max-w-[1080px] flex-col items-center px-[16px] pt-[var(--header-height-mobile)] text-center text-white lg:items-start lg:px-0 lg:pt-[var(--header-height)] lg:text-left">
        <p className="mb-[12px] rounded-[100px] border border-white/40 px-[12px] py-[4px] text-[13px] font-medium tracking-[-0.26px] lg:mb-[20px] lg:px-[16px] lg:py-[6px] lg:text-[16px]">
          {slide.eyebrow}
        </p>
        <Heading className="text-[28px] font-bold leading-[1.4] tracking-[-1px] lg:text-[52px] lg:leading-[1.3] lg:tracking-[-2px]">
          {slide.title[0]}
          <br />
          <strong className={idx === 0 ? "text-brand" : ""}>
            {slide.title[1]}
          </strong>
        </Heading>
        <p className="mt-[12px] text-[15px] font-normal leading-[1.6] tracking-[-0.3px] text-white/85 lg:mt-[20px] lg:text-[20px]">
          {slide.desc}
        </p>
        <div className="mt-[28px] flex flex-wrap justify-center gap-[8px] lg:mt-[44px] lg:justify-start lg:gap-[12px]">
          {slide.buttons.map((btn, bIdx) => (
            <Link
              key={btn.href}
              href={btn.href}
              className={[
                "flex h-[44px] w-fit items-center justify-center gap-[6px] rounded-[100px] px-[22px] text-[15px] font-bold tracking-[-0.2px] transition-opacity duration-150 active:opacity-70 lg:h-[56px] lg:gap-[8px] lg:px-[30px] lg:text-[18px]",
                bIdx === 0
                  ? "bg-brand text-white"
                  : "border border-white/70 bg-white/10 text-white",
              ].join(" ")}
            >
              {btn.label}
              <ArrowRightIcon className="h-[12px] w-[14px] lg:h-[14px] lg:w-[16px]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSlider() {
  // Swiper 초기화 여부 → 컨테이너 페이드 인
  const [ready, setReady] = useState(false);
  const isClient = useIsClient();

  return (
    // ===== 히어로 섹션: 헤더 높이만큼 위로 당겨 투명 헤더 밑에 깔림 =====
    <section className="relative -mt-[var(--header-height-mobile)] w-full overflow-hidden bg-black lg:-mt-[var(--header-height)]">
      <div
        className={[
          "relative h-[640px] w-full",
          // 페이지네이션 위치: 하단 80px(모바일, 가운데) / 60px(PC, 1080px 폭 안에서 왼쪽 정렬)
          "[&_.swiper-pagination]:absolute [&_.swiper-pagination]:bottom-[80px] [&_.swiper-pagination]:left-1/2 [&_.swiper-pagination]:z-[2] [&_.swiper-pagination]:flex [&_.swiper-pagination]:-translate-x-1/2 [&_.swiper-pagination]:items-center [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:gap-[8px]",
          "lg:[&_.swiper-pagination]:bottom-[60px] lg:[&_.swiper-pagination]:w-[1080px] lg:[&_.swiper-pagination]:justify-start",
          // 원형 불릿: 기본 테두리만, 활성 시 채움 (0.2s 전환)
          "[&_.custom-bullet]:h-[10px] [&_.custom-bullet]:w-[10px] [&_.custom-bullet]:cursor-pointer [&_.custom-bullet]:rounded-full [&_.custom-bullet]:border [&_.custom-bullet]:border-white [&_.custom-bullet]:bg-transparent [&_.custom-bullet]:transition-all [&_.custom-bullet]:duration-200",
          "[&_.custom-bullet-active]:bg-white!",
        ].join(" ")}
      >
        {/* 프리렌더/서버: 첫 슬라이드 정적 표시 → 브라우저: Swiper 슬라이더 */}
        {!isClient ? (
          <div className="h-[640px]">
            <SlideContent slide={SLIDES[0]} idx={0} />
          </div>
        ) : (
          <Swiper
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.2s" }}
            className="h-[640px]"
            modules={[Pagination, Autoplay]}
            direction="horizontal"
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={PAGINATION}
            // 초기화 직전에 보이도록 전환
            onBeforeInit={() => setReady(true)}
          >
            {SLIDES.map((slide, idx) => {
              return (
                <SwiperSlide key={slide.id} className="min-h-full">
                  <SlideContent slide={slide} idx={idx} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
