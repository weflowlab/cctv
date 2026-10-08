"use client";

/**
 * 실시간 후기 섹션 (keeper CustomerCases 카드 스타일 + Swiper 카드 슬라이더)
 * - 좌측(PC) / 상단(모바일): REVIEWS 라벨 + "실시간 후기" + 만족도 문구 + [시공사례 더보기 → /cases].
 * - 우측: 후기 카드 슬라이더. 모바일 1.1장 / PC 2.1장 노출, loop + autoplay 4.5초(호버 시 일시정지).
 *   이전/다음 원형 버튼은 swiper 인스턴스(onSwiper 로 저장)의 slidePrev/slideNext 호출.
 * - 후기 텍스트는 기존 kkcctv 메인 후기 6개 원문 그대로 (회사명만 SITE.name 으로 치환).
 *   첫 문장을 카드 제목으로, 나머지를 본문으로 분리. 별점 5개, 이름 마스킹, 작성일 표시.
 */
import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Reveal from "@/components/common/Reveal";
import useIsClient from "@/components/common/useIsClient";
import { SITE } from "@/lib/site";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

type Review = { title: string; body: string; name: string; date: string };

/** 원본 후기 (index.txt 순서 그대로) */
const REVIEWS: Review[] = [
  {
    title: "사무실 관리가 훨씬 편해졌습니다.",
    body: `서울에서 사무실을 운영하고 있는데, 퇴근 후 보안이 늘 신경 쓰여 CCTV 설치를 알아봤어요. ${SITE.name}는 상담할 때 필요한 위치와 카메라 수를 현실적으로 안내해줘서 좋았습니다. 설치도 깔끔했고, 사각지대 없이 화면이 잘 잡혀서 지금은 외부에서도 스마트폰으로 바로 확인하고 있습니다. 덕분에 퇴근 후에도 훨씬 마음이 놓입니다.`,
    name: "이*수",
    date: "2024-11-18",
  },
  {
    title: "아이와 반려견 확인용으로 설치했어요.",
    body: `집에 아이도 있고 반려견도 있어서 외출할 때마다 걱정이 많았는데, ${SITE.name} 설치 후에는 확실히 안심이 됩니다. 거실과 현관 쪽에 설치했는데 휴대폰으로 실시간 확인이 가능해서 정말 편해요. 화질도 선명하고 밤에도 화면이 잘 보여서 만족스럽습니다. 가정용으로도 충분히 추천할 만한 서비스예요.`,
    name: "정*희",
    date: "2025-04-12",
  },
  {
    title: "설치 후 관리까지 만족스럽습니다.",
    body: `처음 설치할 때도 꼼꼼했지만, 이후에 카메라 방향 조정이 필요해서 문의했을 때 대응이 빨라서 더 만족했습니다. ${SITE.name}는 단순히 설치만 하고 끝나는 느낌이 아니라, 사후관리까지 책임 있게 해주는 느낌이었어요. 렌탈로 진행했는데도 관리가 안정적이라 믿고 사용하고 있습니다.`,
    name: "김*영",
    date: "2024-08-27",
  },
  {
    title: "처음 상담부터 믿음이 갔습니다.",
    body: `CCTV를 처음 알아보는 거라 어떤 제품을 선택해야 할지 감이 안 왔는데, ${SITE.name}에서 필요한 구성만 딱 맞게 추천해주셨어요. 무조건 비싼 장비를 권하는 게 아니라 공간 구조에 맞게 설명해줘서 결정하기 쉬웠습니다. 설치 당일에도 사용법까지 자세히 알려주셔서 지금 편하게 쓰고 있어요.`,
    name: "박*현",
    date: "2026-01-09",
  },
  {
    title: "매장 운영하시는 분들께 추천합니다.",
    body: `카페를 운영하다 보니 매장 내부와 계산대, 출입구 쪽 관리가 꼭 필요했어요. ${SITE.name}에서 동선에 맞게 카메라 위치를 잡아줘서 매장 상황을 한눈에 확인할 수 있습니다. 직원 관리나 고객 응대 중 문제가 생겼을 때도 바로 확인할 수 있어서 실질적으로 도움이 많이 됩니다. 소규모 매장이라면 꼭 설치해두는 게 좋다고 생각해요.`,
    name: "오*현",
    date: "2025-09-22",
  },
  {
    title: "외부 설치도 깔끔하게 해주셨어요.",
    body: `식당 입구와 주차장 쪽에 CCTV가 필요해서 문의드렸는데, 외부 환경까지 고려해서 설치해주셨습니다. ${SITE.name}는 방수와 배선 정리까지 꼼꼼하게 봐주셔서 보기에도 지저분하지 않았어요. 비 오는 날에도 문제없이 작동하고 있고, 주차장 상황도 선명하게 확인돼서 만족합니다. 설치 퀄리티가 생각보다 훨씬 좋았습니다. 😀`,
    name: "유*진",
    date: "2026-05-16",
  },
];

/** 후기 카드 1장 (keeper CaseCard 스타일) */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="box-border flex h-full flex-col justify-between rounded-[24px] bg-white px-[28px] pb-[28px] pt-[32px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1),0px_0px_2px_0px_rgba(0,0,0,0.12)] lg:p-[36px]">
      <div>
        <p className="text-[16px] tracking-[2px] text-[#ff7500] lg:text-[18px]" aria-label="별점 5점">
          ★★★★★
        </p>
        <h3 className="mt-[12px] text-[19px] font-bold leading-[28px] tracking-[-0.6px] text-[#333] lg:mt-[16px] lg:text-[22px] lg:leading-[32px]">
          {review.title}
        </h3>
        <p className="mt-[8px] break-keep text-[14px] font-normal leading-[22px] tracking-[-0.3px] text-[#666] lg:mt-[12px] lg:text-[16px] lg:leading-[26px]">
          {review.body}
        </p>
      </div>
      <div className="mt-[20px] flex items-center justify-between border-t border-[#f0f0f0] pt-[16px] lg:mt-[24px]">
        <strong className="text-[14px] font-medium text-brand lg:text-[16px]">{review.name}</strong>
        <time dateTime={review.date} className="text-[13px] text-[#999] lg:text-[14px]">
          {review.date}
        </time>
      </div>
    </div>
  );
}

const NAV_BUTTON =
  "flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#dedede] bg-white text-[#333] transition-colors duration-150 hover:border-brand hover:text-brand lg:h-[48px] lg:w-[48px]";

export default function Reviews() {
  // 이전/다음 버튼에서 사용할 swiper 인스턴스
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  // Autoplay 모듈은 렌더 중 현재 시각을 읽어 정적 프리렌더와 충돌 → 브라우저에서만 켬
  const isClient = useIsClient();

  return (
    // ===== 실시간 후기: 연회색(#f9f9f9) 배경 =====
    <section className="flex w-full justify-center overflow-hidden bg-[#f9f9f9] py-[80px] lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col gap-[32px] lg:flex-row lg:items-stretch lg:gap-[48px]">
        {/* ===== 좌측 헤더: REVIEWS / 실시간 후기 / 설명 / 버튼 ===== */}
        <Reveal
          animation="slide-in-left"
          delay={200}
          threshold={0.1}
          className="flex shrink-0 flex-col items-center px-[16px] text-center lg:w-[320px] lg:items-start lg:px-0 lg:text-left"
        >
          <span className="text-[13px] font-bold tracking-[2px] text-brand lg:text-[15px]">REVIEWS</span>
          <h2 className="mt-[8px] text-[26px] font-bold leading-[36px] tracking-[-1px] text-[#222] lg:mt-[12px] lg:text-[42px] lg:leading-[60px]">
            실시간 후기
          </h2>
          <p className="mt-[12px] break-keep text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-[rgba(32,32,32,0.6)] lg:mt-[16px] lg:text-[18px] lg:leading-[29px]">
            {SITE.name}는 <strong className="font-bold text-[#222]">98%의 고객 만족도</strong>와 조작 없는 실제 설치
            후기를 바탕으로, 믿을 수 있는 보안 솔루션을 제공하기 위해 노력하고 있습니다.
          </p>
          <Link
            href="/cases"
            className="mt-[24px] flex h-[42px] w-fit items-center justify-center gap-[6px] rounded-[30px] bg-white px-[22px] text-[14px] font-bold tracking-[-0.2px] text-[rgba(32,32,32,0.9)] shadow-[0_4px_25px_0_rgba(0,0,0,0.04)] transition-opacity duration-150 active:opacity-70 lg:mt-[40px] lg:h-[56px] lg:px-[30px] lg:text-[18px]"
          >
            시공사례 더보기
            <ArrowRightIcon className="h-[11px] w-[13px]" />
          </Link>
          {/* PC: 이전/다음 버튼은 헤더 하단 */}
          <div className="mt-auto hidden gap-[8px] pt-[40px] lg:flex">
            <button type="button" aria-label="이전 후기" className={NAV_BUTTON} onClick={() => swiper?.slidePrev()}>
              <ArrowLeftIcon className="h-[14px] w-[16px]" />
            </button>
            <button type="button" aria-label="다음 후기" className={NAV_BUTTON} onClick={() => swiper?.slideNext()}>
              <ArrowRightIcon className="h-[14px] w-[16px]" />
            </button>
          </div>
        </Reveal>

        {/* ===== 우측 후기 카드 슬라이더 ===== */}
        <Reveal delay={200} threshold={0.1} className="min-w-0 flex-1">
          {/* 서버: autoplay 없는 정적 카드 → 브라우저: key 를 바꿔 Autoplay 포함으로 다시 초기화 */}
          <Swiper
            key={isClient ? "client" : "server"}
            modules={isClient ? [Autoplay] : []}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            slidesPerView={1.1}
            spaceBetween={16}
            breakpoints={{ 1024: { slidesPerView: 2.1, spaceBetween: 24 } }}
            onSwiper={setSwiper}
            // 카드 그림자가 잘리지 않도록 상하 여백
            className="px-[16px]! py-[12px]! lg:px-0! [&_.swiper-slide]:h-auto"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.name + review.date}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 모바일: 이전/다음 버튼은 슬라이더 아래 가운데 */}
          <div className="mt-[20px] flex justify-center gap-[8px] lg:hidden">
            <button type="button" aria-label="이전 후기" className={NAV_BUTTON} onClick={() => swiper?.slidePrev()}>
              <ArrowLeftIcon className="h-[12px] w-[14px]" />
            </button>
            <button type="button" aria-label="다음 후기" className={NAV_BUTTON} onClick={() => swiper?.slideNext()}>
              <ArrowRightIcon className="h-[12px] w-[14px]" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
