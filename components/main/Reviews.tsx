"use client";

/**
 * 카카오톡 후기 섹션 — 고객이 대표에게 직접 보낸 카카오톡 대화 캡처 캐러셀
 * - 텍스트 후기(별점·이름·날짜) 대신 실제 대화 캡처 이미지를 보여 준다.
 * - 이미지: 고객이 보내 줄 캡처 약 10장 → 준비 전까지 REVIEW_SHOTS(label 만) 로 Placeholder 표시.
 *   TODO: 이미지 받으면 각 항목에 src 추가 후 Placeholder 를 next/image 로 교체.
 * - 카드: 세로로 긴 폰 화면 비율(9:19.5). Swiper 로 옆으로 넘김 (자동 넘김 없음),
 *   이전/다음 원형 버튼은 swiper 인스턴스(onSwiper 로 저장)의 slidePrev/slideNext 호출.
 * - 카드 클릭 → 라이트박스(크게 보기): ESC·배경 클릭·닫기 버튼으로 닫기, 좌우 버튼·방향키로 이동, 열린 동안 배경 스크롤 잠금.
 */
import { useCallback, useEffect, useState } from "react";
import Eyebrow from "@/components/common/Eyebrow";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

/** 카카오톡 후기 캡처 10장 (이미지 자리 설명만) */
const REVIEW_SHOTS = Array.from({ length: 10 }, (_, i) => ({
  label: `고객 카카오톡 후기 캡처 ${String(i + 1).padStart(2, "0")}`,
}));

const NAV_BUTTON =
  "flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-[#dedede] bg-white text-[#333] transition-colors duration-150 hover:border-brand hover:text-point-strong lg:h-[48px] lg:w-[48px]";

/** 라이트박스: 선택한 캡처를 화면 가운데 크게 표시 */
function Lightbox({
  index,
  onClose,
  onMove,
}: {
  index: number;
  onClose: () => void;
  onMove: (step: number) => void;
}) {
  // ESC 닫기 / ←→ 이동 + 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onMove(-1);
      if (e.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onMove]);

  const LB_BUTTON =
    "flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-150 hover:bg-white/30 lg:h-[56px] lg:w-[56px]";

  return (
    // ===== 라이트박스: 어두운 배경(클릭 시 닫기) =====
    <div
      role="dialog"
      aria-modal="true"
      aria-label="카카오톡 후기 크게 보기"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-[8px] lg:px-[40px]"
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        type="button"
        aria-label="닫기"
        className="absolute right-[12px] top-[12px] flex h-[44px] w-[44px] cursor-pointer items-center justify-center text-[28px] leading-none text-white lg:right-[32px] lg:top-[24px]"
        onClick={onClose}
      >
        ×
      </button>

      {/* 이전 / 캡처 / 다음 — 내부 클릭은 배경 닫기로 전파하지 않음 */}
      <div className="flex items-center gap-[8px] lg:gap-[32px]" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="이전 후기" className={LB_BUTTON} onClick={() => onMove(-1)}>
          <ArrowLeftIcon className="h-[14px] w-[16px]" />
        </button>
        <figure className="flex flex-col items-center">
          <Placeholder
            label={REVIEW_SHOTS[index].label}
            className="aspect-[9/19.5] h-[min(80vh,760px)] max-w-[calc(100vw-120px)] rounded-[16px] bg-white"
          />
          <figcaption className="mt-[10px] text-[13px] text-white/70">
            {index + 1} / {REVIEW_SHOTS.length}
          </figcaption>
        </figure>
        <button type="button" aria-label="다음 후기" className={LB_BUTTON} onClick={() => onMove(1)}>
          <ArrowRightIcon className="h-[14px] w-[16px]" />
        </button>
      </div>
    </div>
  );
}

export default function Reviews() {
  // 이전/다음 버튼에서 사용할 swiper 인스턴스
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  // 라이트박스로 연 캡처 번호 (null = 닫힘)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  // 라이트박스 좌우 이동 (끝에서 처음으로 순환)
  const move = useCallback(
    (step: number) =>
      setOpenIdx((i) => (i === null ? i : (i + step + REVIEW_SHOTS.length) % REVIEW_SHOTS.length)),
    [],
  );

  return (
    // ===== 카카오톡 후기: 연회색 배경 =====
    <section className="flex w-full justify-center overflow-hidden bg-[#f9f9f9] py-[80px] lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <Reveal threshold={0.1} className="flex flex-col items-center gap-[16px] px-[16px] text-center lg:gap-[20px] lg:px-0">
          {/* 섹션 라벨: 고객 후기 */}
          <Eyebrow>REVIEWS</Eyebrow>
          <h2 className="text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            설치 후 고객님이
            <br />
            <strong className="text-point-strong">직접 보내 주신 메시지</strong>
          </h2>
          <p className="break-keep text-[15px] leading-[1.6] tracking-[-0.3px] text-sub lg:text-[18px]">
            실제 고객이 보낸 카카오톡 대화를 그대로 옮겼습니다.
          </p>
          <p className="text-[12px] text-[#999] lg:text-[13px]">
            * 고객 개인정보 보호를 위해 이름·프로필 사진은 가림 처리했습니다.
          </p>
        </Reveal>

        {/* ===== 캡처 카드 슬라이더 (자동 넘김 없음) ===== */}
        <div className="mt-[32px] w-full lg:mt-[56px]">
          <Swiper
            slidesPerView={1.7}
            spaceBetween={12}
            breakpoints={{ 640: { slidesPerView: 2.6, spaceBetween: 16 }, 1024: { slidesPerView: 4, spaceBetween: 24 } }}
            onSwiper={setSwiper}
            // 카드 그림자가 잘리지 않도록 상하 여백
            className="px-[16px]! py-[12px]! lg:px-0!"
          >
            {REVIEW_SHOTS.map((shot, idx) => (
              <SwiperSlide key={shot.label}>
                {/* 카드 클릭 → 라이트박스 */}
                <button
                  type="button"
                  aria-label={`${shot.label} 크게 보기`}
                  onClick={() => setOpenIdx(idx)}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-[16px] bg-white shadow-[0_4px_25px_0_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] lg:rounded-[20px]"
                >
                  <Placeholder label={shot.label} className="aspect-[9/19.5] w-full border-0" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ===== 이전 / 다음 버튼 ===== */}
          <div className="mt-[20px] flex justify-center gap-[8px] lg:mt-[32px]">
            <button type="button" aria-label="이전 후기" className={NAV_BUTTON} onClick={() => swiper?.slidePrev()}>
              <ArrowLeftIcon className="h-[12px] w-[14px] lg:h-[14px] lg:w-[16px]" />
            </button>
            <button type="button" aria-label="다음 후기" className={NAV_BUTTON} onClick={() => swiper?.slideNext()}>
              <ArrowRightIcon className="h-[12px] w-[14px] lg:h-[14px] lg:w-[16px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== 라이트박스 (카드 클릭 시) ===== */}
      {openIdx !== null && <Lightbox index={openIdx} onClose={close} onMove={move} />}
    </section>
  );
}
