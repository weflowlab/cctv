"use client";

/**
 * 시공사례 요약 숫자 2개 — 시공사례 건수 · 누적 설치 대수
 * - ※ 현재 사용 안 함: 2026-10-20 대표 요청으로 시공사례 상단에서 뺌 (CasesHero 참고). 파일은 다시 쓸 수 있게 남겨 둠.
 * - 현재 주소에 맞춰 계산: /cases 는 전체, /cases/place/<slug> 는 그 장소 사례만
 *   (타이틀 띠는 레이아웃에 있어 params 를 못 읽으므로 URL(usePathname)에서 장소를 판단)
 * - usePathname 이 확정되지 않는 경우를 위해 Suspense — 대기 중엔 전체 기준 숫자
 * - 값은 등록된 사례에서 자동 계산 — 사례 목록(장소·대수만)은 서버(CasesHero)가 DB 에서 읽어 넘겨준다
 */
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PLACES, type PlaceSlug } from "@/lib/site";
import type { CaseItem } from "./data";

/** 숫자 계산에 필요한 값만 */
export type CaseStat = Pick<CaseItem, "place" | "cameraCount">;

export default function CasesStats({ cases }: { cases: CaseStat[] }) {
  return (
    <Suspense fallback={<StatsGrid cases={cases} place={null} />}>
      <PlaceAwareStats cases={cases} />
    </Suspense>
  );
}

function PlaceAwareStats({ cases }: { cases: CaseStat[] }) {
  const pathname = usePathname();
  const slug = pathname.startsWith("/cases/place/") ? pathname.split("/")[3] : null;
  const place = PLACES.find((p) => p.slug === slug)?.slug ?? null;
  return <StatsGrid cases={cases} place={place} />;
}

function StatsGrid({ cases, place }: { cases: CaseStat[]; place: PlaceSlug | null }) {
  const items = place ? cases.filter((c) => c.place === place) : cases;
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
