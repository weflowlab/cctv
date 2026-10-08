/**
 * "사장님들의 이유있는 선택" 제품/기술 섹션 (원본 Q 컴포넌트, sc-16753a86)
 * - 어두운(#1c1c1c) 배경 + 하단 갈색 radial 글로우.
 * - 큰 카드: 제품 배경 이미지 위에 "한화비전이 설계한 선도적인 기술력" + 체크 리스트 4개
 *   (PC 는 이미지 위 absolute 오버레이 / 모바일은 이미지 아래로 흐름).
 * - 작은 카드 2개: 인도어(KNV-K7012R) / 아웃도어(KNO-K7012R) 카메라.
 * - "CCTV 견적 계산하기" 버튼 → /calculator (원본 router.push).
 * - 제목, 큰 카드, 작은 카드 묶음은 각각 스크롤 진입 시 slide-in-up.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { OrangeCheckIcon } from "./icons";

const FEATURES = [
  "400만 화소 QHD 초고화질로 실시간 모니터링",
  "어두워도 최대 30M까지 모니터링 가능",
  "해킹 걱정 없는 강력한 사이버 보안",
  "최소 4주 이상 연속 녹화",
];

const CAMERAS = [
  {
    alt: "인도어 실내용 카메라",
    model: "KNV-K7012R",
    desc: ["매장 내부를 언제 어디서든 확인,", "직원 관리부터 고객 응대까지 스마트한 매장 운영"],
  },
  {
    alt: "아웃도어 실외용 카메라",
    model: "KNO-K7012R",
    desc: ["매장 밖, 외부 출입구까지 빈틈없는 감시,", "비·눈 걱정 없는 실외 전용 보안 솔루션"],
  },
];

export default function ProductTech() {
  return (
    // ===== 제품/기술 섹션: 다크 배경 =====
    <section className="relative flex w-full justify-center overflow-hidden bg-[#1c1c1c] px-[16px] py-[80px] lg:py-[180px]">
      <div className="relative z-[1] flex max-w-[1082px] flex-col items-center">
        {/* ===== 헤드라인 (모바일에서는 span 줄바꿈) ===== */}
        <Reveal
          as="h2"
          threshold={0.1}
          className="text-center text-[26px] font-bold leading-[36px] text-white lg:text-[42px] lg:leading-[60px]"
        >
          사장님들의 이유있는 선택
          <br />
          기존 CCTV와는 다른, <span className="block lg:inline">매장을 위한 기술.</span>
        </Reveal>

        <div className="my-[40px] max-w-[1080px] lg:my-[80px]">
          {/* ===== 큰 카드: 선도적인 기술력 ===== */}
          <Reveal
            as="article"
            threshold={0.1}
            className="relative w-full overflow-hidden rounded-[20px] border border-[#3c3a3a] bg-[#1d1c1c] text-white lg:bg-[#242324]"
          >
            {/* 배경 이미지 (원본 product_background.png / 모바일 product_background_mobile.png) */}
            <Placeholder
              dark
              label="한화비전이 설계한 선도적인 기술력"
              className="aspect-[343/220] w-full min-w-[280px] lg:aspect-auto lg:h-[560px] lg:min-w-[1078px]"
            />
            <div className="relative flex h-full w-full flex-col justify-center px-[24px] pb-[11px] pt-[30px] lg:absolute lg:top-0 lg:p-0 lg:pl-[83px]">
              <h2 className="text-[42px] font-bold leading-[58px]">
                한화비전이 설계한
                <br />
                <strong className="text-[#ff5b00]">선도적인 기술력</strong>
              </h2>
              <div className="mt-[12px] flex flex-col gap-[2px] lg:mt-[40px] lg:gap-[12px]">
                {FEATURES.map((text) => (
                  <p key={text} className="flex items-center gap-[8px] text-[15px] font-medium leading-[28px] lg:text-[18px]">
                    <OrangeCheckIcon />
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ===== 작은 카드 2개: 인도어 / 아웃도어 카메라 ===== */}
          <Reveal threshold={0.1} className="mt-[24px] flex flex-wrap gap-[24px]">
            {CAMERAS.map((cam) => (
              <article
                key={cam.model}
                className="flex flex-[1_1_300px] flex-col items-center rounded-[20px] border border-white/[0.09] bg-[#ffffff0f] py-[36px] lg:pb-[48px] lg:pt-[73px]"
              >
                <Placeholder dark label={cam.alt} className="aspect-square w-[199px] lg:w-[226px]" />
                <h3 className="mt-[57px] text-[26px] font-bold leading-[38px] text-white">{cam.alt}</h3>
                {/* 원본 전역 규칙(strong → #ff5c00)이 #999 보다 우선 적용되어 주황으로 보임 */}
                <strong className="mt-[6px] text-center text-[18px] font-normal leading-[25px] text-brand">{cam.model}</strong>
                <p className="mt-[10px] text-center text-[14px] font-normal leading-[22px] text-[#ffffffd9] lg:mt-[16px] lg:text-[18px] lg:leading-[28px]">
                  {cam.desc[0]}
                  <br />
                  {cam.desc[1]}
                </p>
              </article>
            ))}
          </Reveal>
        </div>

        {/* ===== CTA: CCTV 견적 계산하기 → /calculator ===== */}
        <Link
          href="/calculator"
          className="flex h-[42px] w-fit cursor-pointer items-center justify-center rounded-[62px] bg-white px-[25px] text-[14px] font-bold leading-[40px] text-[#202020e5] transition-opacity duration-150 active:opacity-70 lg:h-[64px] lg:px-[36px] lg:text-[20px]"
        >
          CCTV 견적 계산하기
        </Link>
      </div>

      {/* ===== 하단 갈색 radial 글로우 (원본 sc-16753a86-10) ===== */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[35%] w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,#502b1a_0%,#502b1a00_70%)] lg:h-1/2 lg:bg-[radial-gradient(ellipse_60%_100%_at_bottom,#502b1a_0%,#502b1a00_70%)]" />
    </section>
  );
}
