/**
 * 시공사례 카드 (keeper BlogCard 틀 + 정보 강화)
 * - 구성: 대표 사진(62% 비율, 라운드 20/28px) · 좌상단 장소 칩 / 우상단 사진 장수(카메라 아이콘 + 숫자)
 *   → 제목(2줄 말줄임) → 하단 메타: 지역 · 서비스 | 날짜
 * - 동작: hover 또는 키보드 포커스 시 사진만 살짝 확대 (오버레이·배지 없이 단순하게)
 * - 클릭 시 내부 상세 /cases/<id>
 * - /cases 목록 · 상세의 "비슷한 공간 사례" 에서 공통 사용
 */
import Link from "next/link";
import Image from "next/image";
import { caseImageSrc, type CaseItem } from "./data";
import { formatCaseDate, placeName, serviceName } from "./format";

export default function CaseCard({ item }: { item: CaseItem }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="group flex w-full flex-col gap-[16px] rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-point focus-visible:ring-offset-4 lg:gap-[20px] lg:rounded-[28px]"
    >
      {/* ===== 대표 사진: 62% 비율 박스 / hover·focus 시 사진만 확대 ===== */}
      <div className="relative w-full overflow-hidden rounded-[20px] pb-[62%] lg:rounded-[28px]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
          {/* 임시 스톡 사진 (caseImageSrc) — 실제 시공 사진 등록 시 교체 */}
          <Image
            src={caseImageSrc(item)}
            alt={item.images[0] ?? item.title}
            fill
            sizes="(min-width: 1024px) 350px, 100vw"
            className="object-cover"
          />
        </div>


        {/* 좌상단: 장소 칩 */}
        <span className="absolute left-[14px] top-[14px] rounded-[50px] bg-brand px-[12px] py-[4px] text-[13px] font-semibold leading-[20px] tracking-[-0.3px] text-white lg:left-[18px] lg:top-[18px] lg:text-[14px]">
          {placeName(item.place)}
        </span>

        {/* 우상단: 사진 장수 */}
        {item.images.length > 0 && (
          <span className="absolute right-[14px] top-[14px] flex items-center gap-[4px] rounded-[50px] bg-black/45 px-[10px] py-[4px] text-[12px] font-semibold leading-[20px] text-white backdrop-blur-sm lg:right-[18px] lg:top-[18px] lg:text-[13px]">
            <CameraIcon />
            <span className="sr-only">사진</span>
            {item.images.length}
            <span className="sr-only">장</span>
          </span>
        )}

      </div>

      {/* ===== 텍스트: 제목 / 메타(지역·서비스 | 날짜) ===== */}
      <div className="flex flex-col">
        <h3 className="line-clamp-2 break-keep text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-[#222] transition-colors group-hover:text-brand lg:text-[20px] lg:leading-[30px]">
          {item.title}
        </h3>
        <div className="mt-[12px] flex items-center justify-between gap-[12px] border-t border-line pt-[12px] text-[13px] font-medium leading-[20px] tracking-[-0.3px] lg:mt-[14px] lg:pt-[14px] lg:text-[14px]">
          <span className="min-w-0 truncate text-[#555]">
            {item.region}
            <span aria-hidden className="mx-[6px] text-silver">
              |
            </span>
            <span className="text-point-strong">{serviceName(item.service)}</span>
          </span>
          <span className="shrink-0 text-[#999]">{formatCaseDate(item.date)}</span>
        </div>
      </div>
    </Link>
  );
}

/** 작은 카메라 아이콘 (사진 장수 표시용) */
function CameraIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 5.5A1.5 1.5 0 0 1 3.5 4h1.8l1-1.5h3.4l1 1.5h1.8A1.5 1.5 0 0 1 14 5.5v6A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8.3" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
