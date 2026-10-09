/**
 * /places/[slug] — 장소별 CCTV 페이지 (서버 컴포넌트)
 * - slug: PLACES(@/lib/site) 의 home | store | office | factory | public → generateStaticParams 로 정적 생성
 * - 없는 slug 는 notFound() (cacheComponents 사용 중이라 dynamicParams 옵션 대신 notFound 로 처리)
 * - 이 파일은 선택 장소 콘텐츠만 담당. 타이틀·칩 바·CTA 는 app/places/layout.tsx.
 * - params 를 읽는 부분은 <Suspense> 안에 둔다 → 칩 이동 시 레이아웃은 즉시 보이고 콘텐츠만 교체
 *   (Cache Components 의 Instant Navigation 검증 요구사항). 5개 장소 모두 프리렌더되므로 첫 로드엔 대기 화면이 안 보임.
 * - 원본 내용: https://kkcctv.co.kr 장소별 CCTV
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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

type Params = Props["params"];

export default function PlacePage({ params }: Props) {
  return (
    // 장소 콘텐츠 로딩 중엔 높이만 잡아 두어 아래 CTA 가 튀지 않게
    <Suspense fallback={<div className="min-h-[60vh] w-full" />}>
      <PlaceContent params={params} />
    </Suspense>
  );
}

/** URL 의 slug 로 장소 콘텐츠 선택: 히어로 이미지 / 필요성·효과 / 이 장소의 시공사례 (없는 slug → 404) */
async function PlaceContent({ params }: { params: Params }) {
  const { slug } = await params;
  const place = findPlace(slug);
  if (!place) notFound();
  return <PlaceContentSection slug={place.slug as PlaceSlug} />;
}
