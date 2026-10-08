/**
 * 창업 A to Z 가이드 — "왜 5년을 버티지 못할까" 섹션 (#2a2a2a 배경)
 * - 폐업 통계 그래프 이미지 + "왜 일까요?" 말풍선.
 * - 섹션 하단 중앙에 아래로 뾰족한 장식(같은 배경색) SVG 가 다음 섹션으로 걸쳐 내려온다.
 */
import Placeholder from "@/components/common/Placeholder";
import { SpaceOrBreak } from "@/components/guides/shared/Breaks";

export default function Why() {
  return (
    // ===== 폐업 통계: 정적 섹션 =====
    <section className="relative block w-full bg-[#2a2a2a] px-4 py-[60px] lg:flex lg:justify-center lg:px-0 lg:py-[140px]">
      <div className="w-full lg:w-[1080px]">
        <h2 className="text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-white lg:text-[42px] lg:leading-[60px]">
          왜 대부분의 신규 매장이
          <br />
          <strong className="text-[#ff5c00]">창업 5년</strong>을 버티지 못할까요?
        </h2>
        <h3 className="mt-[16px] text-center text-[16px] leading-[27px] font-light tracking-[-1px] text-white lg:text-[22px] lg:leading-[38px]">
          국세청 통계에 따르면
          <SpaceOrBreak />
          <strong className="font-bold">신규 창업 매장의 70%가 5년 안에 문을 닫습니다.</strong>
        </h3>

        <div className="mt-[32px] flex flex-col gap-[24px] lg:mt-[64px] lg:flex-row lg:gap-[64px]">
          {/* 폐업 통계 그래프 이미지 */}
          <Placeholder
            label="폐업 통계 그래프"
            dark
            className="mx-auto aspect-[425/360] w-[270px] shrink-0 lg:mx-0 lg:ml-[72px] lg:w-[425px]"
          />

          <div className="flex-1">
            <h4 className="mt-[24px] ml-[6px] text-[20px] leading-[32px] font-bold tracking-[-0.4px] text-white lg:mt-[78px] lg:ml-0 lg:text-[30px] lg:leading-[48px] lg:tracking-[-0.6px]">
              왜 일까요?
            </h4>
            {/* 말풍선: PC 는 좌하단, 모바일은 우상단에 꼬리 */}
            <div className="relative mt-[14px] w-full rounded-[12px_0px_12px_12px] bg-[#333] px-[20px] py-[18px] lg:w-[452px] lg:rounded-[12px_12px_12px_0px]">
              <p className="w-full text-[14px] leading-[24px] font-normal tracking-[-0.28px] break-all whitespace-pre-line text-white lg:text-[20px] lg:leading-[34px] lg:tracking-[-0.4px]">
                그 이유는 각종 정보는 넘쳐나지만,&nbsp;
                <strong className="font-bold">‘언제, 무엇을, 어떻게 해야 하는지’를 알려주는 실질적인 로드맵</strong>은
                거의 없기 때문이죠. 키퍼는 수많은 매장에서
                <br className="hidden lg:inline" />
                <span className="lg:hidden"> </span>
                사장님들의 시행착오를 지켜보며, 성공과 실패를
                <br className="hidden lg:inline" />
                <span className="lg:hidden"> </span>
                가르는 공통된 패턴을 발견했습니다.
              </p>
              {/* PC 꼬리 */}
              <svg
                className="absolute bottom-0 left-[-20px] hidden lg:block"
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                aria-hidden
              >
                <path d="M24 0V23H0L24 0Z" fill="#333333" />
              </svg>
              {/* 모바일 꼬리 */}
              <svg
                className="absolute top-[-20px] right-0 lg:hidden"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden
              >
                <path d="M0 22L22 22L22 0L0 22Z" fill="#333333" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 아래로 뾰족한 장식 (다음 섹션으로 70px 걸침) */}
      <svg
        className="absolute bottom-[-33px] left-1/2 z-10 h-[34px] w-[241px] -translate-x-1/2 lg:bottom-[-70px] lg:h-[71px] lg:w-[507px]"
        viewBox="0 0 507 71"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M253.5 71C253.5 71 253.496 70.9854 253.487 70.9566C252.885 68.9784 230.255 0 0 0L232.477 0L253.5 0L507 0C273.395 0 253.5 71 253.5 71Z"
          fill="#2A2A2A"
        />
      </svg>
    </section>
  );
}
