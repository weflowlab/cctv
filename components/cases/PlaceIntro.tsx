/**
 * 장소 소개 블록 — /cases/place/[slug] 상단(칩 바 아래, 사례 목록 위) / 서버 컴포넌트
 * - 구성: "{장소} CCTV, {소제목}" → 요약 2~3문장 → 포함 업종 → [이 공간 견적 계산하기 → /calculator?place=<slug>]
 * - 문구: components/cases/placeContent.ts (구 장소별 CCTV 본문 요약)
 */
import Link from "next/link";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { PLACE_CONTENT } from "./placeContent";

export default function PlaceIntro({ slug }: { slug: PlaceSlug }) {
  const place = PLACES.find((p) => p.slug === slug)!;
  const content = PLACE_CONTENT[slug];

  return (
    <section className="mb-[32px] flex flex-col gap-[16px] rounded-[16px] bg-[#f6f7fa] p-[20px] lg:mb-[48px] lg:flex-row lg:items-end lg:justify-between lg:gap-[40px] lg:rounded-[20px] lg:px-[40px] lg:py-[36px]">
      <div className="flex flex-col gap-[10px] lg:gap-[14px]">
        <h2 className="break-keep text-[20px] font-bold leading-[140%] tracking-[-0.5px] text-[#222] lg:text-[28px]">
          {place.name} CCTV, <span className="text-point-strong">{content.heading}</span>
        </h2>
        <p className="break-keep text-[14px] leading-[170%] tracking-[-0.3px] text-[#555] lg:text-[17px]">
          {content.summary}
        </p>
        {/* ===== 포함 업종 ===== */}
        <p className="text-[12px] font-medium text-[#878d99] lg:text-[14px]">
          포함 업종 · {place.includes.join(" · ")}
        </p>
      </div>
      <Link
        href={`/calculator?place=${slug}`}
        className="flex h-[52px] shrink-0 items-center justify-center rounded-[10px] bg-brand px-[24px] text-[15px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-brand-strong lg:h-[56px] lg:text-[17px]"
      >
        이 공간 견적 계산하기 →
      </Link>
    </section>
  );
}
