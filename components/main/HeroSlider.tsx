"use client";

/**
 * 홈 히어로 슬라이더 (keeper HeroBanner 틀 + 신규 회사 카피)
 * - 투명 헤더 밑으로 깔리도록 음수 margin-top(헤더 높이만큼) 적용. 헤더 투명/흰색 전환은 HomeHeaderScroll 담당.
 * - 높이 640px(PC·모바일 동일), 배경은 슬라이드별 사진(스톡 CC0, next/image) + 어두운 그라데이션, 카피는 그 위에 표시.
 * - Swiper 옵션: loop, autoplay 5초(사용자 조작 후에도 계속), Pagination(clickable, 커스텀 원형 불릿).
 * - 슬라이드 4장: 메인(내 공간 견적 계산하기 / 상담 신청하기) → 렌탈 → AS 수리 → CCTV+스피커.
 *   각 장 = 문제 공감(1줄) → 해결 약속(2줄, 강조) → 설명 → [견적 계산기(장마다 문구 다름)] [상담 신청하기].
 * - 초기화 전에는 opacity 0 → onBeforeInit 에서 1 로 페이드 인 (레이아웃 깜빡임 방지).
 * - Swiper Autoplay 는 렌더 중 현재 시각을 읽어 정적 프리렌더(Cache Components)와 충돌한다.
 *   → 서버/프리렌더에서는 첫 슬라이드만 정적 HTML 로 그리고, 브라우저에서 Swiper 로 교체한다.
 * - 우측 상단 수상 배지(메달 + 한국브랜드 선호도 3년 연속 1위 수상): 슬라이드와 무관하게 고정. LEGACY.award 일 때만.
 */
import Link from "next/link";
import Eyebrow from "@/components/common/Eyebrow";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import useIsClient from "@/components/common/useIsClient";
import { LEGACY, SITE } from "@/lib/site";
import { ArrowRightIcon, CalculatorIcon, ClipboardCheckIcon } from "./icons";

type Slide = {
  id: string;
  /** 카피 위 작은 문구 */
  eyebrow: string;
  /** 메인 카피 (줄 단위) */
  title: string[];
  /** 서브 카피 ("\n" = 모바일에서만 줄바꿈, PC 는 공백) */
  desc: string;
  /** 버튼 (첫 번째는 브랜드색 채움, 두 번째는 흰 테두리)
   *  short: 모바일 문구(두 버튼 가로 배치용 짧은 문구), icon: 앞 아이콘 */
  buttons: { label: string; short: string; href: string; icon: "calc" | "consult" }[];
  /** 배경 이미지 자리 설명 (원래 넣을 실제 사진) */
  bg: string;
  /** 배경 사진 — 스톡 사진(CC0): public/images/stock/*.webp — 실제 사진 확보 시 교체 */
  img: string;
  /** 배경 사진 대체 텍스트 */
  alt: string;
};

/**
 * 슬라이드 데이터 — 신규 회사 카피 (문제제기 → 해결 → 행동)
 * - 기존 회사 실적(수상·순위·전국 지사) 표현은 쓰지 않는다.
 * - 첫 장: 회사가 무엇을 하는지(설치·렌탈·AS + 운영시간)를 eyebrow 로 바로 보여 줌.
 */
const CONSULT = { label: "상담 신청하기", short: "상담 신청하기", href: "/contact", icon: "consult" as const };

const SLIDES: Slide[] = [
  {
    id: "main",
    eyebrow: `${SITE.serviceArea} · ${SITE.hours}`,
    title: ["자리 비운 사이 생기는 일,", "이제 CCTV로 지키세요"],
    desc: `현장에 맞춘 설계부터 설치·렌탈·수리까지,\n${SITE.name}가 한 번에 책임집니다.`,
    buttons: [{ label: "내 공간 견적 계산하기", short: "견적 계산하기", href: "/calculator", icon: "calc" }, CONSULT],
    bg: "메인 히어로 배경 (매장·사무실 CCTV 설치 현장)",
    img: "/images/stock/hero-main-ceiling-camera.webp",
    alt: "천장에 설치된 CCTV 카메라",
  },
  {
    id: "rental",
    eyebrow: "CCTV 렌탈",
    title: ["설치비 부담에 미루고 계셨다면,", "월 렌탈로 바로 시작하세요"],
    desc: "목돈 없이 월 이용료로 설치하고,\n사용 중 고장도 함께 관리합니다.",
    buttons: [{ label: "월 렌탈료 계산해 보기", short: "렌탈료 계산하기", href: "/calculator", icon: "calc" }, CONSULT],
    bg: "렌탈 슬라이드 배경 (CCTV 렌탈 설치 현장)",
    img: "/images/stock/hero-rental-building-dome-camera.webp",
    alt: "건물 외벽에 설치된 돔 카메라",
  },
  {
    id: "as",
    eyebrow: "AS 수리",
    title: ["CCTV가 갑자기 먹통이라면,", "어느 업체 제품이든 고쳐 드립니다"],
    desc: `${SITE.hours} 접수,\n방문 점검부터 수리까지 끝까지 맡습니다.`,
    buttons: [{ label: "교체·증설 견적 알아보기", short: "견적 알아보기", href: "/calculator", icon: "calc" }, CONSULT],
    bg: "AS 출장수리 슬라이드 배경 (CCTV 점검·수리 현장)",
    img: "/images/stock/as-old-camera.webp",
    alt: "건물 외벽에 달린 오래된 CCTV 카메라",
  },
  {
    id: "speaker",
    eyebrow: "CCTV + 스피커",
    title: ["CCTV·스피커, 따로 공사하시나요?", "한 번에 동시 시공하세요"],
    desc: "배선 공사를 한 번에 끝내 공사 기간과 중복 비용을 줄이고, 관리도 한 곳에서.",
    buttons: [{ label: "우리 공간 견적 계산하기", short: "견적 계산하기", href: "/calculator", icon: "calc" }, CONSULT],
    bg: "CCTV+스피커 슬라이드 배경 (원본 2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg)",
    img: "/images/stock/hero-speaker-bookshelf-speaker.webp",
    alt: "실내에 놓인 스피커",
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
      {/* 배경 사진 — 스톡 사진(CC0): public/images/stock/hero-*.webp — 실제 사진 확보 시 교체
          첫 슬라이드는 첫 화면(LCP)이라 preload.
          나머지도 5초 자동 넘김으로 곧바로 첫 화면에 나와 LCP 로 잡히므로 lazy 대신 eager
          (preload 와 loading 은 같이 쓰지 않음 — Next 문서 권장) */}
      <Image
        src={slide.img}
        alt={slide.alt}
        fill
        preload={idx === 0}
        loading={idx === 0 ? undefined : "eager"}
        sizes="100vw"
        className="z-0 object-cover"
      />
      {/* 카피 가독성용 어두운 그라데이션 (모바일: 위→아래 / PC: 왼쪽→오른쪽) */}
      <span className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(12,11,9,0.85)_0%,rgba(12,11,9,0.55)_60%,rgba(12,11,9,0.3)_100%)] lg:bg-[linear-gradient(90deg,rgba(12,11,9,0.85)_0%,rgba(12,11,9,0.5)_55%,rgba(12,11,9,0.1)_100%)]" />

      {/* ===== 카피 + 버튼: 모바일 가운데 정렬 / PC 1080px 안에서 왼쪽 정렬
           헤더 높이만큼 위 여백(pt, 모바일은 헤더 60px + 12px = 예전 72px 기준 위치 유지)만 있으면 덩어리가 아래로 처져 보여, 아래 여백(pb)을 줘 위로 끌어올림 ===== */}
      <div className="relative z-[2] flex w-full max-w-[1080px] flex-col items-center px-[16px] pt-[calc(var(--header-height-mobile)+12px)] pb-[44px] text-center text-white lg:items-start lg:px-0 lg:pt-[var(--header-height)] lg:pb-[56px] lg:text-left">
        {/* 슬라이드 라벨: 공용 Eyebrow (틸 글자 + 짧은 라인, 모바일 가운데 / PC 왼쪽) */}
        <Eyebrow dark korean align="left" className="mb-[14px] max-lg:items-center lg:mb-[24px]">
          {slide.eyebrow}
        </Eyebrow>
        <Heading className="break-keep text-[26px] font-bold leading-[1.4] tracking-[-1px] lg:text-[52px] lg:leading-[1.3] lg:tracking-[-2px]">
          {slide.title[0]}
          <br />
          <strong className="text-point">
            {slide.title[1]}
          </strong>
        </Heading>
        <p className="mt-[12px] break-keep text-[15px] font-normal leading-[1.6] tracking-[-0.3px] text-white/85 max-lg:whitespace-pre-line lg:mt-[20px] lg:text-[20px]">
          {slide.desc}
        </p>
        {/* 버튼 2개: 모바일은 짧은 문구로 가로 2칸 꽉 채움 / PC 는 긴 문구 + 화살표. 앞에 아이콘(계산기 / 체크 클립보드) */}
        <div className="mt-[28px] grid w-full max-w-[360px] grid-cols-2 gap-[8px] lg:mt-[44px] lg:flex lg:w-auto lg:max-w-none lg:gap-[12px]">
          {slide.buttons.map((btn, bIdx) => {
            const Icon = btn.icon === "calc" ? CalculatorIcon : ClipboardCheckIcon;
            return (
              <Link
                key={btn.href}
                href={btn.href}
                className={[
                  "flex h-[48px] items-center justify-center gap-[6px] rounded-[100px] px-[12px] text-[15px] font-bold tracking-[-0.3px] transition-opacity duration-150 active:opacity-70 lg:h-[56px] lg:w-fit lg:gap-[8px] lg:px-[30px] lg:text-[18px]",
                  bIdx === 0 ? "bg-brand text-white" : "border border-white/70 bg-white/10 text-white",
                ].join(" ")}
              >
                <Icon strokeWidth={2} className="h-[18px] w-[18px] shrink-0 lg:h-[22px] lg:w-[22px]" />
                <span className="lg:hidden">{btn.short}</span>
                <span className="hidden lg:inline">{btn.label}</span>
                <ArrowRightIcon className="hidden h-[14px] w-[16px] lg:block" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** 우측 상단 수상 배지 — 메달 이미지(public/images/award/kbpa-medals.webp, 기존 사이트 원본) + 문구 */
function AwardBadge() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-height-mobile)+24px)] z-[3] flex justify-center px-[16px] lg:top-[calc(var(--header-height)+24px)] lg:px-0">
      {/* 모바일: 가운데 / PC: 오른쪽 */}
      <div className="flex w-full max-w-[1080px] justify-center lg:justify-end">
        <div className="flex items-center gap-[10px] lg:gap-[16px]">
          <Image
            src="/images/award/kbpa-medals.webp"
            alt="한국브랜드 선호도 1위 수상 메달"
            width={621}
            height={350}
            loading="eager"
            className="h-auto w-[92px] lg:w-[160px]"
          />
          <p className="text-left text-[12px] font-medium leading-[1.35] tracking-[-0.2px] text-white/85 lg:text-[17px]">
            한국브랜드 선호도
            <br />
            <strong className="text-[15px] font-bold text-[#f3d27a] lg:text-[22px]">3년 연속 1위 수상</strong>
          </p>
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

        {LEGACY.award && <AwardBadge />}
      </div>
    </section>
  );
}
