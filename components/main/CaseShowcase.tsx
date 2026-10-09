/**
 * 홈 시공사례 섹션 — "말보다 현장으로 보여 드립니다"
 * - 데이터: getFeaturedCases(6) (components/cases/data — 메인 노출 우선, 부족하면 최신순).
 * - 카드: 대표 사진(images[0], Placeholder) + 장소 칩(PLACES 이름) + 지역·대수 + 제목 → /cases/<id>.
 * - 레이아웃: 모바일은 가로 스와이프(CSS scroll-snap, 다음 카드가 살짝 보이게) / PC 는 3열 그리드.
 *   자동 넘김 없음 → Swiper 없이 서버 컴포넌트로 처리.
 * - 하단 [시공사례 자세히 보기 → /cases].
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { getFeaturedCases, type CaseItem } from "@/components/cases/data";
import { PLACES } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

/** 장소 slug → 화면 이름 */
const placeName = (slug: CaseItem["place"]) => PLACES.find((p) => p.slug === slug)?.name ?? "";

/** 시공사례 카드 1장 (카드 전체가 상세 링크) */
function CaseShowcaseCard({ item }: { item: CaseItem }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="group flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] border border-line bg-white transition-shadow duration-200 hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] sm:w-[46%] lg:w-auto lg:rounded-[20px]"
    >
      {/* 대표 사진 자리 (호버 시 살짝 확대) */}
      <div className="overflow-hidden">
        <Placeholder
          label={item.images[0] ?? item.title}
          className="aspect-[4/3] w-full border-0 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col px-[18px] pb-[20px] pt-[16px] lg:px-[24px] lg:pb-[28px] lg:pt-[20px]">
        {/* 장소 칩 + 지역·대수 */}
        <div className="flex items-center gap-[8px] text-[12px] lg:text-[14px]">
          <span className="rounded-[6px] bg-point-light px-[8px] py-[2px] font-medium text-point-strong">
            {placeName(item.place)}
          </span>
          <span className="text-sub">
            {item.region} · {item.cameraCount}대
          </span>
        </div>
        <h3 className="mt-[10px] line-clamp-2 break-keep text-[16px] font-bold leading-[1.45] tracking-[-0.3px] text-ink lg:mt-[12px] lg:text-[19px]">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function CaseShowcase() {
  const cases = getFeaturedCases(6);

  return (
    // ===== 시공사례: 흰 배경 =====
    <section className="flex w-full justify-center bg-white py-[80px] lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <div className="mb-[32px] flex flex-col items-center gap-[16px] px-[16px] text-center lg:mb-[56px] lg:gap-[20px] lg:px-0">
          <strong className="rounded-[100px] bg-brand-light px-[12px] py-[8px] text-[13px] font-medium text-point-strong lg:px-[16px] lg:text-[16px]">
            시공사례
          </strong>
          <h2 className="text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            말보다 <strong className="text-point-strong">현장</strong>으로
            <br />
            보여 드립니다
          </h2>
          <p className="break-keep text-[15px] leading-[1.6] tracking-[-0.3px] text-sub lg:text-[18px]">
            공간마다 구조와 동선이 다릅니다. 직접 보고 설계한 설치 현장을 확인해 보세요.
          </p>
        </div>

        {/* ===== 카드 6개: 모바일 가로 스와이프 / PC 3열 ===== */}
        <Reveal
          threshold={0.1}
          className="flex w-full snap-x snap-mandatory gap-[12px] overflow-x-auto scroll-px-[16px] px-[16px] pb-[8px] [scrollbar-width:none] lg:grid lg:snap-none lg:grid-cols-3 lg:gap-[24px] lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {cases.map((item) => (
            <CaseShowcaseCard key={item.id} item={item} />
          ))}
        </Reveal>

        {/* ===== 시공사례 자세히 보기 → /cases ===== */}
        <Link
          href="/cases"
          className="mt-[32px] flex h-[44px] w-fit items-center justify-center gap-[6px] rounded-[100px] bg-brand px-[24px] text-[15px] font-bold tracking-[-0.2px] text-white transition-colors duration-150 hover:bg-brand-strong lg:mt-[56px] lg:h-[56px] lg:px-[32px] lg:text-[18px]"
        >
          시공사례 자세히 보기
          <ArrowRightIcon className="h-[11px] w-[13px] lg:h-[13px] lg:w-[15px]" />
        </Link>
      </div>
    </section>
  );
}
