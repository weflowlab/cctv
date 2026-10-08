/**
 * "키퍼 앱 설치 고객님은 누구나 무료" 띠 배너 (원본 sc-b6f89923)
 * - 주황 그라데이션 배경 + 흰 pill 버튼 "1분이면 시작" → 앱 다운로드 CTA.
 */
import AppDownloadCta from "./AppDownloadCta";
import { ArrowIcon } from "./icons";

export default function FreeCtaSection() {
  return (
    // ===== 무료 안내 CTA 배너 =====
    <section className="relative bg-[linear-gradient(180deg,#fb6539_0%,#fc4526_100%)] px-[16px] py-[60px] text-center lg:px-0 lg:py-[100px]">
      <h2 className="text-center text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-[#ffdbc6] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.48px]">
        키퍼 앱 설치 고객님은
      </h2>
      <h2 className="mt-[8px] text-center text-[28px] font-bold leading-[40px] tracking-[-0.56px] text-white lg:mt-[6px] lg:text-[46px] lg:leading-[60px] lg:tracking-[-1px]">
        누구나 무료
      </h2>
      <p className="mt-[12px] text-center text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-white opacity-85 lg:mt-[16px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
        설치 1분, 설정 3분이면 바로 시작!
        <br />
        근로계약서 작성부터, 직원 출퇴근관리, 급여 확인까지
      </p>
      <AppDownloadCta
        ariaLabel="무료체험 시작하기"
        className="relative mt-[28px] inline-flex cursor-pointer items-center justify-center gap-[4px] rounded-[48px] bg-white px-[30px] py-[12px] text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-[#222] transition-all duration-100 ease-in-out lg:mt-[40px] lg:gap-[8px] lg:py-[14px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px] lg:hover:bg-[#f5f5f5]"
      >
        <span>1분이면 시작</span>
        <ArrowIcon width={14} height={14} />
      </AppDownloadCta>
    </section>
  );
}
