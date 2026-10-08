/**
 * 장소별 CCTV 본문 — 서버 컴포넌트
 * - 선택된 장소의 히어로 이미지 + 필요성/효과 설명(원본 문구) + "이 장소의 시공사례" 카드 3개
 * - 시공사례 카드는 시공사례 데이터(components/cases/data.ts)에 의존하지 않고 Placeholder 3장으로 구성,
 *   [시공사례 더보기] 는 /cases?place=<slug> 로 이동 (필터는 시공사례 페이지에서 처리)
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { PLACE_CONTENT } from "./data";

export default function PlaceContentSection({ slug }: { slug: PlaceSlug }) {
  const place = PLACES.find((p) => p.slug === slug)!;
  const content = PLACE_CONTENT[slug];

  return (
    <div className="mx-auto flex w-full max-w-[1082px] flex-col gap-[60px] px-[20px] pb-[100px] pt-[40px] lg:gap-[100px] lg:pb-[160px] lg:pt-[60px]">
      {/* ===== 히어로 이미지 + 필요성/효과 설명 / 정적 ===== */}
      <section className="flex flex-col gap-[24px] lg:gap-[40px]">
        <Placeholder
          label={content.heroLabel}
          className="aspect-[16/9] w-full rounded-[4px] lg:aspect-[1082/450] lg:rounded-[20px]"
        />
        <div className="flex flex-col gap-[12px] lg:gap-[20px]">
          <h2 className="text-[22px] font-bold leading-[34px] text-[#202020] lg:text-[36px] lg:leading-[52px]">
            {place.name} CCTV, <span className="text-[#ff5c00]">{content.heading}</span>
          </h2>
          {content.paragraphs.map((para) => (
            <p
              key={para.slice(0, 20)}
              className="break-keep text-[14px] leading-[24px] text-[#555] lg:text-[18px] lg:leading-[32px]"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ===== 이 장소의 시공사례: 카드 3개(Placeholder) + 더보기 링크 / Reveal 순차 등장 ===== */}
      <section className="flex flex-col gap-[16px] lg:gap-[24px]">
        <div className="flex items-end justify-between">
          <h3 className="text-[20px] font-bold text-[#202020] lg:text-[30px]">이 장소의 시공사례</h3>
          <Link
            href={`/cases?place=${slug}`}
            className="text-[13px] font-medium text-[#787878] hover:text-[#ff5c00] lg:text-[16px]"
          >
            시공사례 더보기 →
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-3 lg:gap-[20px]">
          {[1, 2, 3].map((n, i) => (
            <Reveal as="li" key={n} delay={i * 100}>
              <Link href={`/cases?place=${slug}`} className="group block">
                <Placeholder
                  label={`${place.name} 시공사례 ${n} 사진`}
                  className="aspect-[4/3] w-full rounded-[8px] transition-opacity group-hover:opacity-80 lg:rounded-[12px]"
                />
                <p className="mt-[8px] text-left text-[14px] font-medium text-[#202020] lg:mt-[12px] lg:text-[16px]">
                  {place.name} CCTV 시공사례 {n}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
