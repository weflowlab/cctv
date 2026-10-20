/**
 * 홈 "해결" 섹션 — 바로 앞 문제 제기("고장 나면 혼자 감당")에 대한 답
 * - 기존 "한눈에 보는 장점 6개(Highlights)" + "서비스 카드 4개(ServiceCards)" + "스피커 단독 섹션(SpeakerPromo)"을 하나로 합침
 *   (같은 내용이 세 번 반복되던 문제 해결)
 * - 구성: 헤더 → 서비스 4개 카드(사진 + 서비스명 + 강점 한 줄 + 설명, 카드 전체가 서비스 탭 링크)
 *         → 공통 강점 배지 2개(전국 방문 시공 · 24시간 접수) → 주 버튼 [견적 계산하기] 하나
 * - 홈 버튼 원칙: 섹션의 큰 버튼은 전환(견적·상담)으로만, 다른 페이지 이동은 카드 클릭으로.
 * - 사진은 스톡(CC0) — 실제 사진 확보 시 교체.
 */
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import { HomeMoreLink, HomeSectionHeader } from "./HomeSection";
import { ArrowRightIcon, BlueprintIcon, ClockIcon, CoinIcon, SpeakerIcon, WrenchIcon } from "./icons";

type SolutionCard = {
  service: string;
  /** 강점 한 줄 (기존 장점 6개에서 옮김) */
  strength: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const CARDS: SolutionCard[] = [
  {
    service: "CCTV 설치",
    strength: "현장 맞춤 설계",
    desc: "공간 구조와 동선을 직접 보고\n카메라 위치와 대수를 정합니다.",
    href: "/service/install",
    image: "/images/site/card-install-mart-ladder.webp",
    alt: "기사가 사다리에 올라 마트 천장에 CCTV를 설치하는 모습",
    Icon: BlueprintIcon,
  },
  {
    service: "CCTV 렌탈",
    strength: "목돈 없이 시작",
    desc: "초기 비용 부담은 줄이고,\n월 요금으로 시작하실 수 있습니다.",
    href: "/service/rental",
    image: "/images/site/card-rental-green-wall-sky.webp",
    alt: "파란 하늘 아래 펜션 외벽에 설치된 CCTV 카메라",
    Icon: CoinIcon,
  },
  {
    service: "AS 수리",
    strength: "타사 제품도 AS",
    desc: "다른 업체가 설치한 CCTV도 직접 방문해 점검·수리합니다.",
    href: "/service/as",
    image: "/images/site/as-wall-repair.webp",
    alt: "기사가 현장을 방문해 장비를 수리하는 모습",
    Icon: WrenchIcon,
  },
  {
    service: "CCTV+스피커",
    strength: "동시 시공",
    desc: "배선 공사는 한 번에, 관리 창구는 하나로 줄입니다.",
    href: "/service/speaker",
    image: "/images/stock/promo-speaker-mixing-console.webp",
    alt: "음향 믹싱 콘솔과 스피커",
    Icon: SpeakerIcon,
  },
];

/** 서비스와 상관없는 공통 강점 배지 — 전국 방문 시공 · 24시간 접수 */
const BADGES = [
  { label: SITE.serviceArea, Icon: MapPinIcon },
  { label: `${SITE.hours} 접수`, Icon: ClockIcon },
];

export default function Solution() {
  return (
    // ===== 해결: 흰 배경 (앞 문제 제기 섹션은 네이비) =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <HomeSectionHeader
          chip="SOLUTION"
          title={
            <>
              설치부터 수리까지,
              <br />
              <strong>한 팀이 끝까지</strong> 책임집니다
            </>
          }
          desc={
            <>
              연락할 곳은 하나면 충분합니다.
              <br className="lg:hidden" /> {SITE.name}가 처음부터 끝까지 함께합니다.
            </>
          }
          className="mb-[40px] lg:mb-[60px]"
        />

        {/* ===== 서비스 4개 카드: 사진 + 서비스명 칩 + 강점 + 설명 → 서비스 탭 (모바일 1열 / sm 2열 / PC 4열) ===== */}
        <ul className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[20px]">
          {CARDS.map(({ service, strength, desc, href, image, alt, Icon }, i) => (
            <Reveal as="li" key={href} delay={i * 100} threshold={0.1}>
              <Link
                href={href}
                aria-label={`${service} — ${strength}, 자세히 보기`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#ececec] bg-white transition-all duration-200 hover:-translate-y-[4px] hover:border-brand hover:shadow-[0_12px_28px_rgba(10,45,91,0.10)]"
              >
                {/* 스톡 사진(CC0) — 실제 사진 확보 시 교체 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eef1f5]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 255px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  {/* 서비스명 칩 — 2026-10-20 대표 요청으로 한 단계 키움 (12/13px → 14/15px, 여백도 넓힘) */}
                  <span className="absolute left-[14px] top-[14px] rounded-[100px] bg-white/92 px-[14px] py-[7px] text-[14px] font-bold tracking-[-0.28px] text-brand shadow-[0_2px_8px_rgba(0,0,0,0.12)] backdrop-blur lg:px-[16px] lg:py-[8px] lg:text-[15px]">
                    {service}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-[20px] pb-[22px] pt-[18px] lg:px-[22px] lg:pb-[26px] lg:pt-[22px]">
                  <span className="flex items-center gap-[8px] text-point-strong">
                    <Icon className="h-[22px] w-[22px]" />
                    <h3 className="text-[18px] font-bold tracking-[-0.36px] text-[#222] lg:text-[20px]">{strength}</h3>
                  </span>
                  <p className="mt-[8px] flex-1 break-keep text-[14px] leading-[22px] tracking-[-0.28px] text-sub max-lg:whitespace-pre-line lg:text-[15px] lg:leading-[24px]">
                    {desc}
                  </p>
                  {/* 자세히 보기 — 2026-10-20 대표 요청으로 강조: 회색(#999) → 네이비 글자, 한 단계 크게. 버튼 모양은 아니고 글자만 (알약 버튼은 거절) */}
                  <span className="mt-[16px] flex items-center gap-[5px] text-[14px] font-bold tracking-[-0.28px] text-brand transition-colors group-hover:text-point-strong lg:text-[15px]">
                    자세히 보기
                    <ArrowRightIcon className="h-[11px] w-[13px] transition-transform group-hover:translate-x-[3px]" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* ===== 공통 강점 배지 2개 ===== */}
        <ul className="mt-[24px] flex flex-wrap justify-center gap-[8px] lg:mt-[32px] lg:gap-[12px]">
          {BADGES.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex items-center gap-[8px] rounded-[100px] bg-point-light px-[16px] py-[10px] text-[14px] font-bold tracking-[-0.28px] text-brand lg:px-[20px] lg:py-[12px] lg:text-[16px]"
            >
              <Icon className="h-[18px] w-[18px] text-point-strong lg:h-[20px] lg:w-[20px]" />
              {label}
            </li>
          ))}
        </ul>

        {/* ===== 주 버튼: 견적 계산하기 (홈 버튼 원칙 — 전환 버튼만 크게) ===== */}
        <div className="mt-[40px] lg:mt-[56px]">
          <HomeMoreLink href="/calculator">내 공간 견적 계산하기</HomeMoreLink>
        </div>
      </div>
    </section>
  );
}

/** 위치 핀 아이콘 (전국 방문 시공 배지) */
function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
