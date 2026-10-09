/**
 * 장소별 CCTV 섹션 — "우리 공간에 딱 맞는 맞춤형 CCTV 설치"
 * - 원본 kkcctv 메인의 업종 아이콘 12개(아파트/주택, 사무실, 음식점/매장 …)를 PLACES 5개 분류로 묶어 표시.
 * - 카드: 라인 아이콘 + 장소명 + 포함 업종(includes) 작게 → /cases/place/<slug> (장소별 시공사례 + 장소 소개).
 * - 레이아웃: 모바일 2열(마지막 카드는 2칸 차지) / PC 5열. 호버 시 브랜드색 테두리 + 아이콘 반전.
 */
import Link from "next/link";
import Eyebrow from "@/components/common/Eyebrow";
import type { ComponentType, SVGProps } from "react";
import Reveal from "@/components/common/Reveal";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { ArrowRightIcon, FactoryIcon, HomeIcon, OfficeIcon, PublicIcon, StoreIcon } from "./icons";

/** 장소 slug → 라인 아이콘 */
const PLACE_ICONS: Record<PlaceSlug, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  store: StoreIcon,
  office: OfficeIcon,
  factory: FactoryIcon,
  public: PublicIcon,
};

export default function PlaceCards() {
  return (
    // ===== 장소별 CCTV: 연회색 배경 =====
    <section className="flex w-full justify-center bg-[#f9f9f9] px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <div className="mb-[40px] flex flex-col items-center gap-[16px] lg:mb-[60px] lg:gap-[20px]">
          {/* 섹션 라벨: 장소별 CCTV */}
          <Eyebrow>PLACES</Eyebrow>
          <h2 className="text-center text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            우리 공간에 딱 맞는
            <br />
            <strong className="text-point-strong">맞춤형 CCTV</strong> 설치
          </h2>
        </div>

        {/* ===== 장소 카드 5개 ===== */}
        <Reveal threshold={0.1} className="grid w-full grid-cols-2 gap-[12px] lg:grid-cols-5 lg:gap-[20px]">
          {PLACES.map((place, idx) => {
            const Icon = PLACE_ICONS[place.slug];
            return (
              <Link
                key={place.slug}
                href={`/cases/place/${place.slug}`}
                className={[
                  "group flex flex-col items-center rounded-[16px] border border-[#ececec] bg-white px-[12px] py-[24px] text-center transition-all duration-200 hover:border-brand hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] lg:rounded-[20px] lg:px-[16px] lg:py-[40px]",
                  // 모바일 2열에서 마지막(5번째) 카드는 한 줄 전체 사용
                  idx === PLACES.length - 1 ? "col-span-2 lg:col-span-1" : "",
                ].join(" ")}
              >
                <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-light text-point-strong transition-colors duration-200 group-hover:bg-brand group-hover:text-white lg:h-[80px] lg:w-[80px]">
                  <Icon className="h-[28px] w-[28px] lg:h-[38px] lg:w-[38px]" />
                </span>
                <h3 className="mt-[14px] text-[17px] font-bold leading-[26px] tracking-[-0.3px] text-[#222] lg:mt-[20px] lg:text-[22px] lg:leading-[32px]">
                  {place.name}
                </h3>
                <p className="mt-[4px] text-[12px] leading-[18px] tracking-[-0.2px] text-[#888] lg:mt-[6px] lg:text-[14px] lg:leading-[22px]">
                  {place.includes.join(" · ")}
                </p>
                <span className="mt-[12px] flex items-center gap-[4px] text-[12px] font-medium text-[#aaa] transition-colors duration-200 group-hover:text-point-strong lg:mt-[20px] lg:text-[14px]">
                  자세히 보기
                  <ArrowRightIcon className="h-[9px] w-[10px]" />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
