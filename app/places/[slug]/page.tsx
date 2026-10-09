/**
 * /places/[slug] — 구 "장소별 CCTV" 장소 페이지 (리다이렉트 전용)
 * - /cases/place/[slug] 로 영구 리다이렉트(308). 알 수 없는 slug 는 /cases 로.
 * - 실제 응답 코드(308)를 내려야 하므로 Suspense 로 감싸지 않고 최상단에서 params 를 읽는다
 *   (Suspense 안 스트리밍 중 리다이렉트는 meta 태그 방식이 됨). 5개 장소는 generateStaticParams 로 정적 생성.
 */
import { permanentRedirect } from "next/navigation";
import { PLACES } from "@/lib/site";

export function generateStaticParams() {
  return PLACES.map((p) => ({ slug: p.slug }));
}

export default async function LegacyPlacePage({ params }: PageProps<"/places/[slug]">) {
  const { slug } = await params;
  permanentRedirect(PLACES.some((p) => p.slug === slug) ? `/cases/place/${slug}` : "/cases");
}
