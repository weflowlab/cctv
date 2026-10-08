/**
 * /places/[slug] — 장소별 CCTV 페이지 (서버 컴포넌트)
 * - slug: PLACES(@/lib/site) 의 home | store | office | factory | public → generateStaticParams 로 정적 생성
 * - 없는 slug 는 notFound() (cacheComponents 사용 중이라 dynamicParams 옵션 대신 notFound 로 처리)
 * - 구성: 타이틀 + 설명 → 칩 바(sticky) → 선택 장소 콘텐츠 → 공통 상담 CTA
 * - 원본 내용: https://kkcctv.co.kr 장소별 CCTV
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConsultCta from "@/components/common/ConsultCta";
import PlaceChips from "@/components/places/PlaceChips";
import PlaceContentSection from "@/components/places/PlaceContentSection";
import { PLACES, SITE, type PlaceSlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/** slug 로 장소 찾기 (없으면 undefined) */
function findPlace(slug: string) {
  return PLACES.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

/** SEO: 장소명을 title 에 포함 — 예) "공장·창고 CCTV 설치 | 대한민국CCTV" */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = findPlace(slug);
  if (!place) return {};
  return {
    title: `${place.name} CCTV 설치 | ${SITE.name}`,
    description: `${place.includes.join("·")} CCTV 설치의 필요성과 효과 — ${SITE.name}`,
  };
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const place = findPlace(slug);
  if (!place) notFound();

  return (
    <div className="flex w-full flex-col items-center">
      {/* ===== 타이틀: "장소별 CCTV" + 설명 (원본 문구) ===== */}
      <section className="flex w-full flex-col items-center gap-[10px] px-[20px] pb-[24px] pt-[40px] text-center lg:gap-[16px] lg:pb-[40px] lg:pt-[120px]">
        <h1 className="text-[26px] font-bold leading-[40px] text-[#202020] lg:text-[46px] lg:leading-[68px]">
          장소별 CCTV
        </h1>
        <p className="break-keep text-[14px] leading-[22px] text-[#787878] lg:text-[22px] lg:leading-[34px]">
          장소에 따른 CCTV 설치의 필요성과 효과를 설명해 드립니다.
        </p>
      </section>

      {/* ===== 칩 바: 장소 전환(페이지 이동, scroll={false}) + sticky ===== */}
      <PlaceChips current={place.slug} />

      {/* ===== 선택 장소 콘텐츠: 히어로 이미지 / 필요성·효과 / 이 장소의 시공사례 ===== */}
      <PlaceContentSection slug={place.slug as PlaceSlug} />

      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
