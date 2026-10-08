/**
 * 창업 A to Z 가이드 — 히어로 섹션
 * - 헤더 밑까지 깔리는 검정 배경 + 대형 배경 이미지, 좌측 카피, "무료 다운로드하기" 버튼.
 * - 원본: 버튼 클릭 시 이벤트(leadgen_startupguide_atoz_click) 전송 후 /contact/a-to-z-guide 로 이동.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { ArrowRightIcon } from "@/components/guides/shared/icons";

export default function Hero() {
  return (
    // ===== 히어로: 헤더 높이만큼 위로 끌어올려 헤더 밑에 배경을 깐다 =====
    <section className="relative -mt-[var(--header-height-mobile)] aspect-[125/214] h-auto w-full bg-black lg:-mt-[var(--header-height)] lg:aspect-auto lg:h-[1080px]">
      {/* 배경 이미지 (PC 1920px 고정폭 중앙 정렬 / 모바일 100%) */}
      <Placeholder
        label="창업 A to Z 가이드북 배경"
        dark
        className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 lg:w-[1920px]"
      />

      {/* ===== 카피 영역: PC 1080 컨테이너 좌측 정렬 / 모바일 가운데 정렬 ===== */}
      <div className="relative w-full pt-[calc(var(--header-height-mobile)+52px)] text-center lg:left-1/2 lg:w-[1080px] lg:-translate-x-1/2 lg:pt-[calc(var(--header-height)+335px)] lg:text-left">
        <p className="text-[14px] leading-[20px] font-light tracking-[-0.28px] text-white lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]">
          “창업 준비, 어디서부터 시작해야 할까요?”
        </p>
        <h1 className="mt-[6px] text-[22px] leading-[31px] font-medium tracking-[-1.1px] text-white lg:mt-[8px] lg:text-[28px] lg:leading-[40px]">
          창업이 처음이라면 꼭 알아야 할
          {/* PC: ", " / 모바일: 줄바꿈 */}
          <span className="hidden lg:inline">, </span>
          <br className="lg:hidden" />
          초보 사장님을 위한
          <br />
          <span className="blind">&nbsp;창업 A to Z 가이드북</span>
          {/* 타이틀 이미지 (text_atoz.png) */}
          <Placeholder
            label="창업 A to Z 가이드북"
            dark
            className="mx-auto mt-[10px] h-[60px] w-[295px] lg:mx-0 lg:mt-[16px] lg:h-[104px] lg:w-[515px]"
          />
        </h1>

        <div className="mt-[30px] flex w-full justify-center lg:mt-[40px] lg:justify-start">
          {/* TODO: 이벤트 트래킹 leadgen_startupguide_atoz_click */}
          <Link
            href="/contact/a-to-z-guide"
            aria-label="무료 다운로드하기"
            className="inline-flex h-[41px] items-center gap-[10px] rounded-[50px] bg-[#ff5c00] px-[22px] text-[14px] leading-[24px] font-medium tracking-[-0.3px] text-white lg:h-[52px] lg:rounded-[100px] lg:px-[24px] lg:text-[16px] lg:hover:bg-[#e83b05]"
          >
            무료 다운로드하기
            {/* 화살표는 PC 에서만 노출 (원본 isDesktop 분기) */}
            <ArrowRightIcon className="hidden w-[15px] lg:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
