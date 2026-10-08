/**
 * /service/[slug] — 서비스 탭 페이지 (서버 컴포넌트)
 * - slug: install(CCTV 설치) / rental(CCTV 렌탈) / as(AS 수리) / speaker(CCTV+스피커) — @/lib/site SERVICES
 * - 구성: 페이지 타이틀 → 탭 바(sticky, 헤더 아래 고정) → 탭별 콘텐츠 → 상담 신청 CTA 배너(공통)
 * - 4개 slug 모두 generateStaticParams 로 빌드 시 프리렌더, 목록에 없는 slug 는 notFound().
 * - 헤더: 흰 배경(white) — 경로별 기본값
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ConsultCta from "@/components/common/ConsultCta";
import AsTab from "@/components/service/AsTab";
import InstallTab from "@/components/service/InstallTab";
import RentalTab from "@/components/service/RentalTab";
import ServiceTabs from "@/components/service/ServiceTabs";
import SpeakerTab from "@/components/service/SpeakerTab";
import { SERVICES, SITE, type ServiceSlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/** 탭별 콘텐츠 컴포넌트 + 메타 설명 */
const TAB_CONTENT: Record<ServiceSlug, { content: ReactNode; description: string }> = {
  install: {
    content: <InstallTab />,
    description: "200만·500만 화소 CCTV 1~4대 설치 초특가 패키지. 꼼꼼한 설치 시공, 기본 자재 포함, 기계 무상 AS 1년.",
  },
  rental: {
    content: <RentalTab />,
    description: "고객소유의 CCTV 렌탈 할부 서비스. 설치비·가입비·보증료 면제, 카메라 소유권 처음부터 이전.",
  },
  as: {
    content: <AsTab />,
    description: "타사 제품도 수리하는 CCTV AS 전문 출장 서비스. 출장수리·긴급점검·고장진단·노후장비교체·유지보수.",
  },
  speaker: {
    content: <SpeakerTab />,
    description: "CCTV와 스피커 동시 시공. 좋은 품질의 음향 시스템과 보안 솔루션을 한 번에.",
  },
};

function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** 빌드 시 4개 탭 모두 정적 생성 */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return {
    title: `${service.name} | ${SITE.name}`,
    description: TAB_CONTENT[service.slug].description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return (
    <>
      {/* ===== 페이지 타이틀: "서비스" + 안내 문구 ===== */}
      <section className="bg-white px-[16px] pb-[24px] pt-[40px] text-center lg:pb-[40px] lg:pt-[80px]">
        <h1 className="text-[28px] font-bold leading-[40px] tracking-[-0.56px] text-[#202020] lg:text-[44px] lg:leading-[60px] lg:tracking-[-1px]">
          서비스
        </h1>
        {/* TODO: 문구 확정 (원본에 없는 안내 문구) */}
        <p className="mt-[8px] text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[12px] lg:text-[20px] lg:leading-[30px]">
          설치부터 렌탈, AS까지 {SITE.name}가 책임집니다.
        </p>
      </section>

      {/* ===== 탭 바: 설치 / 렌탈 / AS / 스피커 — 스크롤 시 헤더 아래 sticky ===== */}
      <ServiceTabs active={service.slug} />

      {/* ===== 탭 콘텐츠 ===== */}
      {TAB_CONTENT[service.slug].content}

      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </>
  );
}
