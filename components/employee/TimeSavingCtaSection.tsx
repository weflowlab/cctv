/**
 * "전국의 매장들이 경험한 놀라운 시간 단축!" 하단 CTA 배너 (원본 sc-beada5d)
 * - 주황(#ff6418) 배경 + 왼쪽 아래 크림색 방사형 그라데이션 원(overlay).
 * - 검정 pill 버튼 "무료로 시작하기" → 앱 다운로드 CTA.
 * - 모델 이미지: PC 는 우측 하단 absolute, 모바일은 버튼 아래 일반 흐름.
 * - 장식 낙서 SVG(122×80)는 플레이스홀더로 대체.
 */
import Placeholder from "@/components/common/Placeholder";
import AppDownloadCta from "./AppDownloadCta";
import { ArrowIcon } from "./icons";

export default function TimeSavingCtaSection() {
  return (
    // ===== 하단 CTA 배너 =====
    <section className="relative flex justify-center overflow-hidden bg-[#ff6418] pt-[80px] lg:py-[120px]">
      <div className="relative flex w-full max-w-[1080px] flex-col items-center text-center lg:items-stretch lg:text-left">
        {/* 방사형 그라데이션 원 */}
        <div className="pointer-events-none absolute bottom-[-240px] left-[-940px] h-[1436px] w-[1436px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,240,188,0.5)_0%,rgba(255,240,188,0)_100%)] opacity-60" />
        <h2 className="relative whitespace-pre-wrap text-[28px] font-bold leading-[40px] tracking-[-0.56px] text-white lg:whitespace-normal lg:text-[38px] lg:leading-[52px] lg:tracking-[-1px] [&>strong]:text-[#fff6a7]">
          전국의 매장들이 경험한 <strong>{"\n"}놀라운 시간 단축!</strong>
          <br />
          지금 경험해보세요
        </h2>
        <AppDownloadCta
          ariaLabel="무료로 시작하기"
          className="relative mb-[47px] mt-[24px] inline-flex w-fit cursor-pointer items-center justify-center gap-[6px] rounded-[48px] bg-black py-[14px] pl-[20px] pr-[18px] text-[16px] font-bold leading-[18.923px] tracking-[-0.237px] text-white transition-all duration-100 ease-in-out hover:bg-[#222] lg:mb-0 lg:mt-[36px] lg:gap-[8px] lg:pl-[24px] lg:pr-[22px] lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.4px]"
        >
          <span>무료로 시작하기</span>
          <ArrowIcon width={14} height={14} />
        </AppDownloadCta>
        {/* 모델 이미지 (원본 660×609) + 장식 낙서 */}
        <div className="relative bottom-[-1px] left-[-18px] w-[300px] lg:absolute lg:bottom-[-121px] lg:left-[564px] lg:w-[440px]">
          <div className="absolute right-0 top-[20px] z-[1] lg:right-[-36px] lg:top-[79px]">
            <Placeholder label="장식 일러스트" kind="icon" dark className="h-[47px] w-[75px] lg:h-[80px] lg:w-[122px]" />
          </div>
          <Placeholder label="model img" dark className="aspect-[660/609] w-full" />
        </div>
      </div>
    </section>
  );
}
