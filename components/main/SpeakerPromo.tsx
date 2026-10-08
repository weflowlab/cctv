/**
 * CCTV + 스피커 동시 시공 섹션 (keeper ProductTech 틀 — 다크 배경 + 하단 갈색 radial 글로우)
 * - 내용 출처: 기존 kkcctv 메인 하단 스피커 배너 ("좋은 품질의 음향 시스템과 보안 솔루션을 한 번에").
 * - 큰 카드: 시공 이미지 위에 "CCTV + 스피커 동시 시공 가능" + 설명 (PC 는 이미지 위 오버레이 / 모바일은 이미지 아래로 흐름).
 * - 작은 카드 3개: 혜택(시간 단축 / 비용 절감 / 통합 관리).
 * - 하단 버튼 → /service/speaker.
 * - 제목, 큰 카드, 혜택 카드 묶음은 각각 스크롤 진입 시 slide-in-up.
 */
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { ClockIcon, CoinIcon, LayersIcon } from "./icons";

const BENEFITS: { title: string; desc: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { title: "시간 단축", desc: "동시 작업으로 공사 기간 단축", Icon: ClockIcon },
  { title: "비용 절감", desc: "중복되는 공사비용 절약", Icon: CoinIcon },
  { title: "통합 관리", desc: "일괄 관리로 유지보수 편의성", Icon: LayersIcon },
];

export default function SpeakerPromo() {
  return (
    // ===== CCTV+스피커 섹션: 다크 배경 =====
    <section className="relative flex w-full justify-center overflow-hidden bg-[#1c1c1c] px-[16px] py-[80px] lg:py-[160px]">
      <div className="relative z-[1] flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 헤드라인 ===== */}
        <Reveal
          as="h2"
          threshold={0.1}
          className="text-center text-[26px] font-bold leading-[36px] text-white lg:text-[42px] lg:leading-[60px]"
        >
          좋은 품질의 음향 시스템과
          <br />
          보안 솔루션을 한 번에
        </Reveal>

        <div className="my-[40px] w-full lg:my-[80px]">
          {/* ===== 큰 카드: CCTV + 스피커 동시 시공 가능 ===== */}
          <Reveal
            as="article"
            threshold={0.1}
            className="relative w-full overflow-hidden rounded-[20px] border border-[#3c3a3a] bg-[#1d1c1c] text-white lg:bg-[#242324]"
          >
            <Placeholder
              dark
              label="CCTV + 스피커 동시 시공 현장 (원본 2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg)"
              className="aspect-[343/220] w-full border-0 lg:aspect-auto lg:h-[480px]"
            />
            {/* PC: 이미지 왼쪽을 어둡게 해서 카피 가독성 확보 */}
            <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(28,28,28,0.92)_0%,rgba(28,28,28,0.6)_50%,rgba(28,28,28,0)_100%)] lg:block" />
            <div className="relative flex h-full w-full flex-col justify-center px-[24px] pb-[28px] pt-[28px] lg:absolute lg:top-0 lg:p-0 lg:pl-[83px]">
              <p className="text-[15px] font-medium leading-[24px] text-white/70 lg:text-[20px] lg:leading-[30px]">
                두 가지 전문성을 하나의 신뢰로 완성합니다
              </p>
              <h3 className="mt-[8px] text-[28px] font-bold leading-[38px] lg:mt-[12px] lg:text-[42px] lg:leading-[58px]">
                CCTV + 스피커
                <br />
                <strong className="text-brand">동시 시공 가능</strong>
              </h3>
            </div>
          </Reveal>

          {/* ===== 혜택 카드 3개: 시간 단축 / 비용 절감 / 통합 관리 ===== */}
          <Reveal threshold={0.1} className="mt-[16px] grid grid-cols-1 gap-[16px] lg:mt-[24px] lg:grid-cols-3 lg:gap-[24px]">
            {BENEFITS.map(({ title, desc, Icon }) => (
              <article
                key={title}
                className="flex items-center gap-[16px] rounded-[20px] border border-white/[0.09] bg-[#ffffff0f] px-[24px] py-[24px] lg:flex-col lg:items-center lg:gap-0 lg:py-[48px] lg:text-center"
              >
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand lg:h-[72px] lg:w-[72px]">
                  <Icon className="h-[26px] w-[26px] lg:h-[34px] lg:w-[34px]" />
                </span>
                <div>
                  <h4 className="text-[20px] font-bold leading-[30px] text-white lg:mt-[24px] lg:text-[24px] lg:leading-[36px]">
                    {title}
                  </h4>
                  <p className="mt-[2px] text-[14px] font-normal leading-[22px] text-[#ffffffd9] lg:mt-[8px] lg:text-[18px] lg:leading-[28px]">
                    {desc}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>

        {/* ===== CTA: 동시 시공 알아보기 → /service/speaker ===== */}
        <Link
          href="/service/speaker"
          className="flex h-[42px] w-fit cursor-pointer items-center justify-center rounded-[62px] bg-white px-[25px] text-[14px] font-bold leading-[40px] text-[#202020e5] transition-opacity duration-150 active:opacity-70 lg:h-[64px] lg:px-[36px] lg:text-[20px]"
        >
          CCTV+스피커 동시 시공 알아보기
        </Link>
      </div>

      {/* ===== 하단 갈색 radial 글로우 (keeper ProductTech 그대로) ===== */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[35%] w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,#502b1a_0%,#502b1a00_70%)] lg:h-1/2 lg:bg-[radial-gradient(ellipse_60%_100%_at_bottom,#502b1a_0%,#502b1a00_70%)]" />
    </section>
  );
}
