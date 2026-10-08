/**
 * "직원관리는 무료, 여기에 CCTV까지 더하세요" 크로스셀 배너 (원본 sc-4e2e661c)
 * - 연한 살구색(#fffaf7) 배경, 좌측 카피 + "빠른 상담하기" 버튼, 우측 하단에 모델 이미지(PC absolute).
 * - 버튼: 원본 router.push("/contact") → Link 로 이동.
 * - 장식 낙서 SVG(svg-wrap, 140×39)는 플레이스홀더로 대체.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { ArrowIcon } from "./icons";

export default function CctvBannerSection() {
  return (
    // ===== CCTV 크로스셀 배너 =====
    <section className="relative flex w-full items-center justify-center bg-[#fffaf7]">
      <div className="relative flex w-full max-w-[1080px] flex-col items-center pt-[60px] text-center text-[#202020] lg:items-stretch lg:py-[130px] lg:text-left">
        <p className="text-[14px] font-medium tracking-[-0.32px] text-[#ff5c00] lg:text-[16px]">매장관리 올인원 솔루션</p>
        <h2 className="text-[26px] font-bold leading-[1.4] tracking-[-0.52px] lg:text-[38px] lg:leading-[52px] lg:tracking-[-1px] [&>strong]:text-[#ff5c00]">
          <strong>직원관리는 무료,</strong>
          <br />
          여기에 CCTV까지 더하세요
        </h2>
        <p className="mt-[16px] whitespace-pre-wrap text-[15px] font-normal leading-[22px] tracking-[-0.3px] text-[#202020] lg:whitespace-normal lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.5px]">
          요즘 사장님들은 매장 보안도 앱 하나로 통합 관리해요.
          <br />
          한화비전이 직접 만든 매장 전용 CCTV로요.
        </p>
        <Link
          href="/contact"
          aria-label="무료체험 시작하기"
          className="relative mt-[24px] inline-flex w-fit cursor-pointer items-center justify-center gap-[6px] rounded-[100px] bg-[#ff5c00] py-[14px] pl-[24px] pr-[22px] text-[16px] font-bold leading-[1.2] tracking-[-0.32px] text-[#fafafa] transition-[background] duration-100 ease-in-out hover:bg-[#e83b05] active:bg-[#e83b05] lg:gap-[8px] lg:text-[18px] lg:tracking-[-0.36px]"
        >
          <span>빠른 상담하기</span>
          <ArrowIcon className="h-[14px] w-[14px]" />
        </Link>
        {/* 모델 이미지 (원본 958×886) */}
        <Placeholder
          label="our model"
          className="relative mb-[-1px] mt-[41px] aspect-[958/886] w-[357px] lg:absolute lg:bottom-[-1px] lg:left-[510px] lg:mb-0 lg:mt-0 lg:w-[479px]"
        />
        {/* 장식 낙서 SVG */}
        <div className="absolute bottom-[230px] right-1/2 translate-x-[calc(50%+106px)] lg:bottom-auto lg:right-[100px] lg:top-[164px] lg:translate-x-0">
          <Placeholder label="장식 일러스트" kind="icon" className="h-[28px] w-[100px] lg:h-[39px] lg:w-[140px]" />
        </div>
      </div>
    </section>
  );
}
