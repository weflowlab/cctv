/**
 * /service/speaker — CCTV+스피커 동시 시공 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 홈 하단 배너 1장 (2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg) 속 문구
 * - 구성: 히어로(동시 시공 카피 + 배너 이미지) → 혜택 3가지(시간 단축 / 비용 절감 / 통합 관리)
 * - 원본 자료가 배너 한 장뿐이라 섹션을 2개로 간결하게 유지. 원본에 없는 문구는 TODO 주석.
 */
import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { SPEAKER_BENEFITS } from "./data";
import { SectionHeading, SpaceOrBreak } from "./ui";
import Eyebrow from "@/components/common/Eyebrow";
import { ClockIcon, CoinIcon, LayersIcon } from "@/components/main/icons";
import MobileCarousel from "@/components/common/MobileCarousel";

/** 혜택 아이콘 (SPEAKER_BENEFITS 순서: 시간 단축 / 비용 절감 / 통합 관리) — 홈과 같은 라인 아이콘 */
const BENEFIT_ICONS = [ClockIcon, CoinIcon, LayersIcon];

export default function SpeakerTab() {
  return (
    <>
      {/* ===== 히어로: CCTV + 스피커 동시 시공 가능 / 배너 이미지 ===== */}
      <section className="bg-point-light px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[64px]">
          <div className="text-center lg:text-left">
            <Eyebrow align="left" className="mb-[6px] max-lg:items-center">Smart Integrated Solution</Eyebrow>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[44px] lg:tracking-[-2px] [&>strong]:text-point-strong">
              <strong>CCTV + 스피커</strong>
              <br />
              동시 시공 가능
            </h2>
            <p className="mt-[12px] text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] lg:mt-[16px] lg:text-[20px] lg:tracking-[-0.44px]">
              {/* 모바일도 한 줄 — 폭에 맞게 글자 살짝 작게 */}
              <span className="max-lg:text-[14px] max-lg:tracking-[-0.5px]">좋은 품질의 음향 시스템과 보안 솔루션을 한 번에</span>
            </p>
          </div>
          {/* 스톡 사진(CC0): public/images/stock/speaker-hero-woofer.webp — 실제 사진 확보 시 교체
              (원래 자리: CCTV+스피커 동시 시공 배너, 원본 2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg) */}
          <div className="relative aspect-[1693/929] w-full max-w-[520px] shrink-0 overflow-hidden rounded-[20px] lg:w-[520px]">
            <Image
              src="/images/stock/speaker-hero-woofer.webp"
              alt="스피커 우퍼 유닛 클로즈업"
              fill
              sizes="(min-width: 552px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== 혜택 3가지: 원본 배너 하단 3칸 (라벨 + 2줄 설명) ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading
            title={
              <>
                두 가지 전문성을
                <SpaceOrBreak />
                <strong>하나의 신뢰로 완성합니다</strong>
              </>
            }
            // TODO: 문구 확정 (원본 배너에 없는 보조 설명 — placeholder)
            desc="CCTV와 스피커를 한 팀이 함께 시공해 드립니다."
          />
          {/* 모바일: 가로 슬라이드 / PC: 3열 */}
          <MobileCarousel wrapperClassName="mt-[32px] lg:mt-[64px]" className="lg:grid lg:grid-cols-3 lg:gap-[20px]">
            {SPEAKER_BENEFITS.map((b, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <Reveal
                  as="li"
                  key={b.label}
                  delay={i * 150}
                  className="flex flex-col items-center gap-[16px] rounded-[16px] bg-[#f6f7fa] px-[24px] py-[32px] text-center max-lg:w-[78%] lg:gap-[20px] lg:py-[48px]"
                >
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white text-point-strong lg:h-[88px] lg:w-[88px]">
                    <Icon className="h-[30px] w-[30px] lg:h-[44px] lg:w-[44px]" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold tracking-[-0.28px] text-point-strong lg:text-[18px]">{b.label}</h3>
                    <p className="mt-[4px] text-[17px] font-bold leading-[25px] tracking-[-0.34px] text-[#222] lg:mt-[8px] lg:text-[22px] lg:leading-[32px]">
                      {b.desc[0]}
                      <SpaceOrBreak />
                      {b.desc[1]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </MobileCarousel>
        </div>
      </section>
    </>
  );
}
