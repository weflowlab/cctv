/**
 * 시공사례 카드 (keeper BlogCard 틀 복사)
 * - 구성: 썸네일(62% 비율, 라운드 24/32px) → 장소(주황) → 제목(2줄 말줄임) → "블로그에서 보기"
 * - 동작: 카드 hover 시 위로 10px 이동 (transform 0.4s), 클릭 시 네이버 블로그 글 새 탭
 */
import Placeholder from "@/components/common/Placeholder";
import { PLACES } from "@/lib/site";
import type { CaseItem } from "./data";

/** 장소 slug → 표시 이름 (분류 없으면 "기타") */
function placeName(slug: CaseItem["place"]) {
  return PLACES.find((p) => p.slug === slug)?.name ?? "기타";
}

export default function CaseCard({ item }: { item: CaseItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full flex-col gap-[16px] overflow-hidden transition-transform duration-[400ms] hover:-translate-y-[10px] lg:gap-[20px]"
    >
      {/* ===== 썸네일: padding-bottom 62% 비율 박스 ===== */}
      <div className="relative w-full overflow-hidden rounded-[24px] pb-[62%] lg:rounded-[32px]">
        <Placeholder
          label={`시공사례 사진 (원본: ${item.image})`}
          className="absolute left-0 top-0 h-full w-full"
        />
      </div>

      {/* ===== 텍스트: 장소 / 제목 / 외부 링크 안내 ===== */}
      <div>
        <span className="mb-[6px] inline-block text-[15px] font-bold leading-[24px] tracking-[-0.3px] text-[#ff5c00]">
          {placeName(item.place)}
        </span>
        <h2 className="mb-[8px] line-clamp-2 text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-[#222] lg:text-[20px] lg:leading-[30px]">
          {item.title}
        </h2>
        <span className="text-[14px] font-medium leading-[22px] tracking-[-0.3px] text-[#888] group-hover:text-[#ff5c00] lg:text-[15px]">
          네이버 블로그에서 보기 ↗
        </span>
      </div>
    </a>
  );
}
