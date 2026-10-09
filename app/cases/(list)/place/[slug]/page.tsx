/**
 * /cases/place/[slug] — 장소별 시공사례 (서버 컴포넌트)
 * - 구 /places/[slug](장소별 CCTV)를 합친 페이지. 장소별 검색 유입용 주소.
 * - slug: PLACES(@/lib/site) 의 home | store | office | factory | public → generateStaticParams 로 정적 생성
 * - 없는 slug 는 notFound() (cacheComponents 사용 중이라 dynamicParams 옵션 대신 notFound 로 처리)
 * - 정적 세그먼트 place 가 동적 세그먼트 /cases/[id] 보다 우선하므로 상세 경로와 충돌 없음.
 * - 이 파일은 장소 소개 블록 + 그 장소 사례 그리드만 담당. 타이틀·칩 바·CTA 는 (list)/layout.tsx.
 * - params 를 읽는 부분은 <Suspense> 안에 둔다 → 칩 이동 시 레이아웃은 즉시 보이고 콘텐츠만 교체
 *   (Cache Components 의 Instant Navigation 요구사항). 5개 장소 모두 프리렌더되므로 첫 로드엔 대기 화면이 안 보임.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CaseList from "@/components/cases/CaseList";
import PlaceIntro from "@/components/cases/PlaceIntro";
import { PLACES, SITE } from "@/lib/site";

type Props = PageProps<"/cases/place/[slug]">;

/** slug 로 장소 찾기 (없으면 undefined) */
function findPlace(slug: string) {
  return PLACES.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

/** SEO: "공장·창고 CCTV 시공사례 | 유니텍CCTV" + 포함 업종을 description 에 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = findPlace(slug);
  if (!place) return {};
  return {
    title: `${place.name} CCTV 시공사례 | ${SITE.name}`,
    description: `${place.includes.join("·")} CCTV 설치 시공사례와 필요성·효과를 확인해 보세요 — ${SITE.name}`,
  };
}

export default function PlaceCasesPage({ params }: Props) {
  return (
    // 콘텐츠 로딩 중엔 높이만 잡아 두어 아래 CTA 가 튀지 않게
    <Suspense fallback={<div className="min-h-[60vh] w-full" />}>
      <PlaceCases params={params} />
    </Suspense>
  );
}

/** URL 의 slug 로 장소 소개 + 그 장소 사례 렌더 (없는 slug → 404) */
async function PlaceCases({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const place = findPlace(slug);
  if (!place) notFound();
  return (
    <>
      <PlaceIntro slug={place.slug} />
      <CaseList place={place.slug} />
    </>
  );
}
