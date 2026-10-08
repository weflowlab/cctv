/**
 * 직원관리 히어로 섹션 (원본 sc-acda0f51)
 * - 연한 크림(#fff9f0) 배경이 헤더 밑까지 깔리도록 음수 margin-top 으로 헤더 높이만큼 끌어올림.
 * - PC: 좌측 카피 + 우측 모델 이미지 (높이 545, gap 72) / 모바일: 세로 배치, 가운데 정렬.
 * - "무료로 시작하기" → 앱 다운로드 CTA (PC QR 모달 / 모바일 스토어 이동).
 */
import Placeholder from "@/components/common/Placeholder";
import AppDownloadCta from "./AppDownloadCta";
import { ArrowIcon } from "./icons";

export default function HeroSection() {
  return (
    // ===== 히어로: 헤드카피 + CTA + 배너 모델 이미지 =====
    <section className="relative -mt-[var(--header-height-mobile)] flex justify-center overflow-hidden bg-[#fff9f0] pt-[calc(var(--header-height-mobile)+33px)] lg:-mt-[var(--header-height)] lg:pt-[var(--header-height)]">
      <div className="relative flex w-full max-w-[1080px] flex-col items-center gap-[50px] lg:h-[545px] lg:flex-row lg:gap-[72px]">
        {/* 좌측 카피 — 모바일에서는 "\n" 이 줄바꿈으로 보이도록 pre-wrap */}
        <div className="whitespace-pre-wrap text-center lg:whitespace-normal lg:text-left">
          <h1 className="text-[32px] font-bold leading-[1.4] tracking-[-0.32px] text-[#222] lg:text-[42px] lg:tracking-[-2px] [&>strong]:text-[#ff5c00]">
            {"요즘 사장님의 \n직원관리 필수앱"}
            <br />
            이젠, <strong>키퍼</strong>하세요!
          </h1>
          <h2 className="mt-[10px] text-[16px] font-normal leading-[1.6] tracking-[-0.44px] text-[#1d1d1f] lg:text-[22px]">
            {"근로계약서·출퇴근·스케줄·급여확인을 \n앱 하나로 자동화"}
          </h2>
          <AppDownloadCta
            ariaLabel="무료로 시작하기"
            className="relative z-10 mt-[24px] inline-flex cursor-pointer items-center justify-center gap-[6px] rounded-[100px] bg-[#ff5c00] py-[12px] pl-[20px] pr-[18px] text-[14px] font-bold leading-[1.4] tracking-[-0.28px] text-[#fafafa] transition-all duration-100 ease-in-out hover:bg-[#e83b05] lg:gap-[8px] lg:py-[14px] lg:pl-[24px] lg:pr-[22px] lg:text-[18px] lg:leading-[1.2] lg:tracking-[-0.36px]"
          >
            <span>무료로 시작하기</span>
            <ArrowIcon className="h-[12px] w-[12px] lg:h-[16px] lg:w-[16px]" />
          </AppDownloadCta>
        </div>
        {/* 우측 모델 이미지 (원본 996×1000) */}
        <div className="mb-[-1px] lg:mt-auto">
          <Placeholder
            label="banner model"
            className="aspect-[996/1000] w-[72vw] min-w-[320px] max-w-[498px]"
          />
        </div>
      </div>
    </section>
  );
}
