"use client";

/**
 * 시공사례 상세 — 사진 갤러리 (클라이언트 컴포넌트)
 * - 구성: 대표 사진 크게(16:10) + 하단 썸네일 줄
 * - 동작: 썸네일 클릭 → 대표 사진 전환 / 모바일은 대표 사진을 좌우로 스와이프(40px 이상)해 이전·다음
 *   / 좌우 화살표 버튼(PC) / 우하단 "n / 전체" 표시
 * - 사진: images = [{ url, alt }] (관리자 업로드 사진은 Vercel Blob URL)
 */
import { useRef, useState } from "react";
import Image from "next/image";
import type { CaseImage } from "./data";

const SWIPE_THRESHOLD = 40;

export default function CaseGallery({ images, title }: { images: CaseImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  // 범위를 순환하며 이동 (마지막 → 처음)
  const go = (next: number) => setIndex((next + total) % total);

  // 모바일 스와이프: 터치 시작 x 와 끝 x 차이로 방향 판단
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-[10px] lg:gap-[14px]">
      {/* ===== 대표 사진: 스와이프 / 화살표로 전환 ===== */}
      <div
        className="relative w-full touch-pan-y select-none overflow-hidden rounded-[16px] lg:rounded-[24px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={images[index].url}
            alt={`${title} — ${images[index].alt}`}
            fill
            sizes="(min-width: 1024px) 1080px, 100vw"
            className="object-cover"
          />
        </div>

        {total > 1 && (
          <>
            {/* PC 전용 좌우 화살표 */}
            <button
              type="button"
              aria-label="이전 사진"
              onClick={() => go(index - 1)}
              className="absolute left-[16px] top-1/2 hidden h-[44px] w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand shadow-md transition-colors hover:bg-white lg:flex"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="다음 사진"
              onClick={() => go(index + 1)}
              className="absolute right-[16px] top-1/2 hidden h-[44px] w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand shadow-md transition-colors hover:bg-white lg:flex"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* 현재 위치 */}
            <span className="absolute bottom-[12px] right-[12px] rounded-[50px] bg-black/50 px-[10px] py-[2px] text-[12px] font-medium text-white lg:bottom-[16px] lg:right-[16px] lg:text-[14px]">
              {index + 1} / {total}
            </span>
          </>
        )}
      </div>

      {/* ===== 썸네일 줄: 클릭 시 대표 사진 전환, 선택된 썸네일은 brand 테두리 ===== */}
      {total > 1 && (
        <ul className="flex gap-[8px] overflow-x-auto [scrollbar-width:none] lg:gap-[12px] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <li key={`${img.url}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}번째 사진 보기: ${img.alt}`}
                aria-current={i === index}
                className={`block w-[88px] cursor-pointer overflow-hidden rounded-[8px] border-2 transition-opacity lg:w-[120px] lg:rounded-[12px] ${
                  i === index ? "border-brand" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <span className="relative block aspect-[16/10] w-full">
                  <Image src={img.url} alt="" fill sizes="120px" className="object-cover" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
