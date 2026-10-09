"use client";

/**
 * 시공사례 목록 큰 제목(h1) — 현재 장소에 따라 바뀜
 * - /cases            → "CCTV 시공사례"
 * - /cases/place/store → "매장 CCTV 시공사례" (장소별 검색 노출용으로 h1 에 장소명 포함)
 * - 레이아웃(params 를 읽지 않음)에 두기 위해 URL(usePathname)에서 직접 판단.
 *   5개 장소 주소는 빌드 때 미리 생성되므로 프리렌더 HTML 에도 장소명이 들어간 제목이 나간다.
 *   usePathname 이 확정되지 않는 경우(알 수 없는 주소)를 위해 Suspense 로 감싸고, 대기 중엔 "CCTV 시공사례".
 */
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { PLACES } from "@/lib/site";

const TITLE_CLASS = "text-[28px] font-bold leading-[140%] tracking-[-1px] text-[#222] lg:text-[42px]";

export default function CasesTitle() {
  return (
    <Suspense fallback={<h1 className={TITLE_CLASS}>CCTV 시공사례</h1>}>
      <PlaceAwareTitle />
    </Suspense>
  );
}

/** /cases/place/<slug> 이면 "{장소} CCTV 시공사례", 아니면 "CCTV 시공사례" */
function PlaceAwareTitle() {
  const pathname = usePathname();
  const slug = pathname.startsWith("/cases/place/") ? pathname.split("/")[3] : null;
  const place = PLACES.find((p) => p.slug === slug);

  return (
    <h1 className={TITLE_CLASS}>
      {place ? (
        <>
          <span className="text-point-strong">{place.name} CCTV</span> 시공사례
        </>
      ) : (
        <>
          <span className="text-point-strong">CCTV</span> 시공사례
        </>
      )}
    </h1>
  );
}
