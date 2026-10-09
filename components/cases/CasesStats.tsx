"use client";

/**
 * 시공사례 요약 숫자 2개 — 시공사례 건수 · 누적 설치 대수
 * - 현재 주소에 맞춰 계산: /cases 는 전체, /cases/place/<slug> 는 그 장소 사례만
 *   (타이틀 띠는 레이아웃에 있어 params 를 못 읽으므로 URL(usePathname)에서 장소를 판단)
 * - usePathname 이 확정되지 않는 경우를 위해 Suspense — 대기 중엔 전체 기준 숫자
 * - 값은 등록된 사례(CASES)에서 자동 계산 (지금은 샘플 데이터, 관리자 DB 도입 시 실제 값)
 */
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PLACES, type PlaceSlug } from "@/lib/site";
import { CASES } from "./data";

export default function CasesStats() {
  return (
    <Suspense fallback={<StatsGrid place={null} />}>
      <PlaceAwareStats />
    </Suspense>
  );
}

function PlaceAwareStats() {
  const pathname = usePathname();
  const slug = pathname.startsWith("/cases/place/") ? pathname.split("/")[3] : null;
  const place = PLACES.find((p) => p.slug === slug)?.slug ?? null;
  return <StatsGrid place={place} />;
}

function StatsGrid({ place }: { place: PlaceSlug | null }) {
  const items = place ? CASES.filter((c) => c.place === place) : CASES;
  const cameras = items.reduce((sum, c) => sum + c.cameraCount, 0);

  const stats = [
    { label: "시공사례", value: items.length, unit: "건" },
    { label: "누적 설치", value: cameras, unit: "대" },
  ];

  return (
    <dl className="grid shrink-0 grid-cols-2 gap-[8px] lg:gap-[12px]">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex min-w-[110px] flex-col gap-[6px] rounded-[16px] border border-[#e3e9f1] bg-white/80 px-[18px] py-[14px] backdrop-blur lg:min-w-[160px] lg:px-[22px] lg:py-[20px]"
        >
          <dt className="text-[12px] font-medium tracking-[-0.24px] text-[#888] lg:text-[14px]">{s.label}</dt>
          <dd className="flex items-baseline gap-[2px] whitespace-nowrap text-brand">
            <span className="text-[22px] font-extrabold tracking-[-0.5px] lg:text-[32px]">{s.value}</span>
            {s.unit && <span className="text-[13px] font-bold lg:text-[16px]">{s.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
