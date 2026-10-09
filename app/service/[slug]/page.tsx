/**
 * /service/[slug] — 서비스 탭 페이지 (서버 컴포넌트)
 * - slug: install(CCTV 설치) / rental(CCTV 렌탈) / as(AS 수리) / speaker(CCTV+스피커) — @/lib/site SERVICES
 * - 이 파일은 탭별 콘텐츠만 담당. 타이틀·탭 바·CTA 는 app/service/layout.tsx.
 * - params 를 읽는 부분은 <Suspense> 안에 둔다 → 탭 이동 시 레이아웃은 즉시 보이고 콘텐츠만 교체
 *   (Cache Components 의 Instant Navigation 검증 요구사항). 4개 탭 모두 프리렌더되므로 첫 로드엔 대기 화면이 안 보임.
 * - 4개 slug 모두 generateStaticParams 로 빌드 시 프리렌더, 목록에 없는 slug 는 notFound().
 * - 헤더: 흰 배경(white) — 경로별 기본값
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import AsTab from "@/components/service/AsTab";
import InstallTab from "@/components/service/InstallTab";
import RentalTab from "@/components/service/RentalTab";
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

type Params = Props["params"];

export default function ServicePage({ params }: Props) {
  return (
    // 탭 콘텐츠 로딩 중엔 높이만 잡아 두어 아래 CTA 가 튀지 않게
    <Suspense fallback={<div className="min-h-[60vh] w-full" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

/** URL 의 slug 로 탭 콘텐츠 선택 (없는 slug → 404) */
async function ServiceContent({ params }: { params: Params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return <>{TAB_CONTENT[service.slug].content}</>;
}
