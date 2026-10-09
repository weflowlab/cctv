/**
 * 시공사례 카드 (keeper BlogCard 틀)
 * - 구성: 대표 사진(62% 비율, 라운드 24/32px, 좌상단 장소 칩) → 지역·대수·서비스 → 제목(2줄 말줄임) → 날짜
 * - 동작: 카드 hover 시 위로 10px 이동 (transform 0.4s), 클릭 시 내부 상세 /cases/<id>
 * - /cases 목록 · 상세의 "비슷한 공간 사례" 에서 공통 사용
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import type { CaseItem } from "./data";
import { caseMeta, formatCaseDate, placeName } from "./format";

export default function CaseCard({ item }: { item: CaseItem }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="group flex w-full flex-col gap-[16px] overflow-hidden transition-transform duration-[400ms] hover:-translate-y-[10px] lg:gap-[20px]"
    >
      {/* ===== 대표 사진: padding-bottom 62% 비율 박스 + 좌상단 장소 칩 ===== */}
      <div className="relative w-full overflow-hidden rounded-[24px] pb-[62%] lg:rounded-[32px]">
        <Placeholder label={item.images[0] ?? item.title} className="absolute left-0 top-0 h-full w-full" />
        <span className="absolute left-[14px] top-[14px] rounded-[50px] bg-brand px-[12px] py-[4px] text-[13px] font-semibold leading-[20px] tracking-[-0.3px] text-white lg:left-[18px] lg:top-[18px] lg:text-[14px]">
          {placeName(item.place)}
        </span>
      </div>

      {/* ===== 텍스트: 지역·대수·서비스 / 제목 / 날짜 ===== */}
      <div>
        <span className="mb-[6px] inline-block text-[14px] font-bold leading-[22px] tracking-[-0.3px] text-point-strong lg:text-[15px] lg:leading-[24px]">
          {caseMeta(item)}
        </span>
        <h2 className="mb-[8px] line-clamp-2 text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-[#222] group-hover:text-brand lg:text-[20px] lg:leading-[30px]">
          {item.title}
        </h2>
        <span className="text-[14px] font-medium leading-[22px] tracking-[-0.3px] text-[#888] lg:text-[15px]">
          {formatCaseDate(item.date)}
        </span>
      </div>
    </Link>
  );
}
