"use client";

/**
 * 카카오톡 후기 섹션 — 고객이 대표에게 직접 보낸 카카오톡 대화 캡처 캐러셀
 * - 텍스트 후기(별점·이름·날짜) 대신 실제 대화 캡처 이미지를 보여 준다.
 * - 이미지: 대표님이 전달한 고객 카카오톡 후기 캡처 27장 (2026-10-19, public/images/reviews/review-01~27.webp)
 *   원본(가로 797px)의 아래쪽 빈 대화 공간은 잘라냈다. 원본 파일은 저장소 밖(카톡후기 폴더)에 보관.
 * - 카드는 캡처 원본 비율 그대로(잘림 없음), 띠는 화면 끝까지 꽉 차게(좌우 페이드 없음).
 *   캡처가 가로로 넓어 카드 폭을 모바일 260px / PC 400px 로 (글자가 너무 작아지지 않게).
 * - 카드: 캡처 원본 비율. 2줄로 나눠 윗줄은 왼쪽, 아랫줄은 오른쪽으로 끝없이 흐르는 띠(globals.css 의 .review-row / .review-track)
 *   같은 카드 묶음을 2번(원본 + aria-hidden 복제) 이어 붙여 끊김 없이 반복. 마우스를 올리거나 포커스가 들어오면 멈춤.
 *   이전/다음 버튼 없음.
 * - 카드 클릭 → 라이트박스(크게 보기): ESC·배경 클릭·닫기 버튼으로 닫기, 좌우 버튼·방향키로 이동, 열린 동안 배경 스크롤 잠금.
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/common/Eyebrow";
import Reveal from "@/components/common/Reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

/** 카카오톡 후기 캡처 (보여 줄 순서) */
const REVIEW_SHOTS = [
  { src: "/images/reviews/review-01.webp", width: 797, height: 311 },
  { src: "/images/reviews/review-02.webp", width: 797, height: 479 },
  { src: "/images/reviews/review-03.webp", width: 797, height: 363 },
  { src: "/images/reviews/review-04.webp", width: 797, height: 244 },
  { src: "/images/reviews/review-05.webp", width: 797, height: 346 },
  { src: "/images/reviews/review-06.webp", width: 797, height: 261 },
  { src: "/images/reviews/review-07.webp", width: 797, height: 363 },
  { src: "/images/reviews/review-08.webp", width: 797, height: 363 },
  { src: "/images/reviews/review-09.webp", width: 797, height: 313 },
  { src: "/images/reviews/review-10.webp", width: 797, height: 346 },
  { src: "/images/reviews/review-11.webp", width: 797, height: 346 },
  { src: "/images/reviews/review-12.webp", width: 797, height: 363 },
  { src: "/images/reviews/review-13.webp", width: 797, height: 380 },
  { src: "/images/reviews/review-14.webp", width: 797, height: 295 },
  { src: "/images/reviews/review-15.webp", width: 797, height: 313 },
  { src: "/images/reviews/review-16.webp", width: 797, height: 278 },
  { src: "/images/reviews/review-17.webp", width: 797, height: 313 },
  { src: "/images/reviews/review-18.webp", width: 797, height: 244 },
  { src: "/images/reviews/review-19.webp", width: 797, height: 279 },
  { src: "/images/reviews/review-20.webp", width: 797, height: 330 },
  { src: "/images/reviews/review-21.webp", width: 797, height: 346 },
  { src: "/images/reviews/review-22.webp", width: 797, height: 312 },
  { src: "/images/reviews/review-23.webp", width: 797, height: 332 },
  { src: "/images/reviews/review-24.webp", width: 797, height: 330 },
  { src: "/images/reviews/review-25.webp", width: 797, height: 370 },
  { src: "/images/reviews/review-26.webp", width: 797, height: 488 },
  { src: "/images/reviews/review-27.webp", width: 797, height: 539 },
].map((shot, i) => ({ ...shot, label: `고객 카카오톡 후기 캡처 ${String(i + 1).padStart(2, "0")}` }));

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
          <Image
              src={REVIEW_SHOTS[index].src}
              alt={REVIEW_SHOTS[index].label}
              width={REVIEW_SHOTS[index].width}
              height={REVIEW_SHOTS[index].height}
              className="h-auto max-h-[min(80vh,760px)] w-auto max-w-[calc(100vw-120px)] rounded-[16px]"
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

/** 윗줄·아랫줄로 나누는 지점 (앞 절반 / 뒤 절반) */
const ROW_SPLIT = Math.ceil(REVIEW_SHOTS.length / 2);

/**
 * 후기 한 줄 — 같은 카드 묶음을 2번(원본 + aria-hidden 복제) 이어 붙여 끊김 없이 반복
 * direction: left(왼쪽으로 흐름) / right(오른쪽으로 흐름). 마우스를 올린 줄만 멈춘다.
 */
function ReviewRow({
  start,
  end,
  direction,
  paused,
  onOpen,
}: {
  start: number;
  end: number;
  direction: "left" | "right";
  paused: boolean;
  onOpen: (idx: number) => void;
}) {
  const shots = REVIEW_SHOTS.slice(start, end);
  return (
    <div className={`review-row flex w-full items-start overflow-hidden py-[6px] ${paused ? "is-paused" : ""}`}>
      {[false, true].map((isClone) => (
        <ul
          key={String(isClone)}
          aria-hidden={isClone || undefined}
          className="review-track flex shrink-0 items-start gap-[12px] pr-[12px] lg:gap-[24px] lg:pr-[24px]"
          // 방향은 줄마다 인라인으로 지정 (전역 CSS 클래스 순서·병합에 영향받지 않게)
          style={{ animationName: direction === "right" ? "marqueeRight" : "marqueeLeft" }}
        >
          {shots.map((shot, i) => (
            <li key={shot.label} className="w-[260px] shrink-0 lg:w-[400px]">
              {/* 카드 클릭 → 라이트박스 (복제 묶음은 키보드 포커스 제외) */}
              <button
                type="button"
                tabIndex={isClone ? -1 : undefined}
                aria-label={`${shot.label} 크게 보기`}
                onClick={() => onOpen(start + i)}
                className="relative block w-full cursor-zoom-in overflow-hidden rounded-[16px] bg-white shadow-[0_4px_25px_0_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] lg:rounded-[20px]"
              >
                {/* 캡처 원본 비율 그대로 (잘림 없음) */}
                <Image
                  src={shot.src}
                  alt={isClone ? "" : shot.label}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 400px, 260px"
                  className="block h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function Reviews() {
  // 라이트박스로 연 캡처 번호 (null = 닫힘)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);

  // 터치 기기: 손대는 동안 멈추고, 손을 떼면 잠깐(1.2초) 뒤 다시 흐름
  const [touchPaused, setTouchPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pauseByTouch = () => {
    clearTimeout(resumeTimer.current);
    setTouchPaused(true);
  };
  const resumeAfterTouch = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setTouchPaused(false), 1200);
  };
  useEffect(() => () => clearTimeout(resumeTimer.current), []);
  // 라이트박스 좌우 이동 (끝에서 처음으로 순환)
  const move = useCallback(
    (step: number) =>
      setOpenIdx((i) => (i === null ? i : (i + step + REVIEW_SHOTS.length) % REVIEW_SHOTS.length)),
    [],
  );

  return (
    // ===== 카카오톡 후기: 연회색 배경 =====
    <section className="flex w-full flex-col items-center overflow-hidden bg-[#f9f9f9] pb-[56px] pt-[80px] lg:pb-[100px] lg:pt-[140px]">
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

      </div>

      {/* ===== 캡처 카드 무한 흐름 2줄: 윗줄은 왼쪽, 아랫줄은 오른쪽으로 (장수가 많아 반씩 나눔) ===== */}
      <div
        onTouchStart={pauseByTouch}
        onTouchEnd={resumeAfterTouch}
        onTouchCancel={resumeAfterTouch}
        className="mt-[32px] flex w-full flex-col gap-[12px] lg:mt-[56px] lg:gap-[24px]"
      >
        <ReviewRow start={0} end={ROW_SPLIT} direction="left" paused={touchPaused} onOpen={setOpenIdx} />
        <ReviewRow start={ROW_SPLIT} end={REVIEW_SHOTS.length} direction="right" paused={touchPaused} onOpen={setOpenIdx} />
      </div>

      {/* ===== 라이트박스 (카드 클릭 시) ===== */}
      {openIdx !== null && <Lightbox index={openIdx} onClose={close} onMove={move} />}
    </section>
  );
}
