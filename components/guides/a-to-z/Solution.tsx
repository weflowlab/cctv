/**
 * 창업 A to Z 가이드 — 솔루션 섹션 (#fff5eb 배경)
 * - "<초보 사장님을 위한 창업 A to Z 가이드북>입니다." + 가이드북 오브젝트 이미지(PC 1200px 중앙).
 */
import Placeholder from "@/components/common/Placeholder";
import { SpaceOrBreak } from "@/components/guides/shared/Breaks";

export default function Solution() {
  return (
    // ===== 솔루션 소개: 정적 섹션 =====
    <section className="relative block w-full bg-[#fff5eb] px-4 py-[60px] lg:flex lg:justify-center lg:px-0 lg:pt-[100px] lg:pb-[26px]">
      <div className="relative w-full lg:w-[1080px]">
        <p className="text-center text-[16px] leading-[28px] font-medium tracking-[-1px] text-[#202020] lg:text-[24px] lg:leading-[41px]">
          그 결과를 정리한 것이 바로,
        </p>
        <h2 className="mt-[6px] text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-[#222] lg:text-[42px] lg:leading-[60px]">
          &lt;초보 사장님을 위한
          <SpaceOrBreak />
          <strong className="text-[#ff5c00]">창업 A to Z 가이드북</strong>&gt;
          <span className="font-[350]">입니다.</span>
        </h2>
        <div className="relative mt-[16px] h-[282px] w-full lg:mt-[34px] lg:h-[451px]">
          <Placeholder
            label="창업 A to Z 가이드북"
            className="absolute top-0 left-1/2 h-full w-[375px] -translate-x-1/2 lg:w-[1200px]"
          />
        </div>
      </div>
    </section>
  );
}
