/**
 * 홈 "한눈에 보는 {SITE.name}" 섹션 (keeper "한 눈에 보는 압.도.적 키퍼" 틀)
 * - 핵심 장점 6개 아이콘 카드: 아이콘 + 제목 + 짧은 한 줄 설명, 카드 전체가 관련 페이지 링크.
 * - 레이아웃: 모바일 1열(아이콘 왼쪽 가로형) / sm 2열 / PC 3열(세로형). 카드 순차 slide-in-up.
 * - 카피 원칙: 근거 있는 내용만 (서비스 데이터·회사소개 기준). 기간·수치 약속은 넣지 않음.
 *   풀세트 9~10종 = components/service/data.ts FULLSET_* (실내 9종 / 실외 10종).
 */
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import { HomeSectionHeader } from "./HomeSection";
import { ArrowRightIcon, BlueprintIcon, BoxIcon, ClockIcon, CoinIcon, SpeakerIcon, WrenchIcon } from "./icons";

type Highlight = {
  title: string;
  desc: string;
  href: string;
  /** 링크 이름 (스크린리더용) */
  linkLabel: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "현장 맞춤 설계",
    desc: "공간 구조와 동선을 직접 보고 카메라 위치와 대수를 정합니다.",
    href: "/service/install",
    linkLabel: "CCTV 설치",
    Icon: BlueprintIcon,
  },
  {
    title: "목돈 없이 렌탈로 시작",
    desc: "초기 비용 부담은 줄이고, 월 요금으로 시작하실 수 있습니다.",
    href: "/service/rental",
    linkLabel: "CCTV 렌탈",
    Icon: CoinIcon,
  },
  {
    title: "타사 제품도 AS",
    desc: "다른 업체가 설치한 CCTV도 직접 방문해 점검·수리합니다.",
    href: "/service/as",
    linkLabel: "AS 수리",
    Icon: WrenchIcon,
  },
  {
    title: `${SITE.hours} 접수`,
    desc: "고장이나 문의가 생기면 언제든 연락 주세요.",
    href: "/contact",
    linkLabel: "상담 신청",
    Icon: ClockIcon,
  },
  {
    title: "CCTV+스피커 동시 시공",
    desc: "배선 공사는 한 번에, 관리 창구는 하나로 줄입니다.",
    href: "/service/speaker",
    linkLabel: "CCTV+스피커",
    Icon: SpeakerIcon,
  },
  {
    title: "풀세트 구성품 9~10종",
    desc: "녹화기·하드디스크·케이블부터 모바일 프로그램까지 패키지에 담았습니다.",
    href: "/service/install#fullset", // 설치 탭 구성품 섹션으로 바로 이동
    linkLabel: "설치 패키지 구성품",
    Icon: BoxIcon,
  },
];

export default function Highlights() {
  return (
    // ===== 한눈에 보는 {SITE.name}: 흰 배경 =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <HomeSectionHeader
          chip="핵심 장점"
          title={
            <>
              한눈에 보는 <strong>{SITE.name}</strong>
            </>
          }
          desc={`설치부터 렌탈·AS까지, ${SITE.name}를 선택하는 이유 6가지`}
          className="mb-[40px] lg:mb-[60px]"
        />

        {/* ===== 장점 카드 6개: 카드 전체 링크, 호버 시 테두리 네이비 + 아이콘 반전 ===== */}
        <ul className="grid w-full grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[24px]">
          {HIGHLIGHTS.map(({ title, desc, href, linkLabel, Icon }, i) => (
            <Reveal as="li" key={linkLabel} delay={(i % 3) * 120} threshold={0.1}>
              <Link
                href={href}
                aria-label={`${title} — ${linkLabel} 페이지로 이동`}
                className="group flex h-full items-center gap-[16px] rounded-[16px] border border-[#ececec] bg-[#f9f9f9] px-[20px] py-[20px] transition-all duration-200 hover:border-brand hover:bg-white hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] lg:flex-col lg:items-start lg:gap-0 lg:rounded-[20px] lg:px-[32px] lg:py-[36px]"
              >
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-light text-point-strong transition-colors duration-200 group-hover:bg-brand group-hover:text-white lg:h-[64px] lg:w-[64px]">
                  <Icon className="h-[26px] w-[26px] lg:h-[32px] lg:w-[32px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="break-keep text-[17px] font-bold leading-[26px] tracking-[-0.3px] text-[#222] lg:mt-[20px] lg:text-[22px] lg:leading-[32px]">
                    {title}
                  </h3>
                  <p className="mt-[4px] break-keep text-[14px] leading-[21px] tracking-[-0.28px] text-sub lg:mt-[8px] lg:text-[16px] lg:leading-[25px]">
                    {desc}
                  </p>
                </div>
                {/* 이동 표시 화살표 (PC 는 카드 하단) */}
                <ArrowRightIcon className="h-[12px] w-[14px] shrink-0 text-[#bbb] transition-all duration-200 group-hover:translate-x-[3px] group-hover:text-brand lg:mt-[20px]" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
