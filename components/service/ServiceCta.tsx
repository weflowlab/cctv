"use client";

/**
 * 서비스 탭별 하단 CTA — app/service/layout.tsx 에서 사용
 * - 레이아웃은 params 를 읽지 않으므로(탭 이동 즉시 표시) 현재 탭은 URL(usePathname)에서 판단해 문구를 고른다.
 * - 4개 탭 주소는 빌드 때 미리 생성되므로 프리렌더 HTML 에도 탭에 맞는 문구가 들어간다.
 *   usePathname 이 확정되지 않는 경우를 위해 Suspense 로 감싸고, 대기 중엔 기본 문구.
 * - 버튼은 /contact?service=<탭> → 상담폼에서 해당 서비스 칩이 미리 선택됨.
 */
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import ConsultCta, { type ConsultCtaProps } from "@/components/common/ConsultCta";
import type { ServiceSlug } from "@/lib/site";

/** 탭별 하단 CTA 문구 */
const CTA_BY_TAB: Record<ServiceSlug, ConsultCtaProps> = {
  install: {
    lead: "우리 공간에 꼭 맞는 설계,",
    title: "현장 상담부터 시작하세요.",
    href: "/contact?service=install",
  },
  rental: {
    lead: "목돈 걱정 없이,",
    title: "이번 달부터 CCTV를 시작하세요.",
    href: "/contact?service=rental",
  },
  as: {
    // 모바일에서만 줄바꿈
    lead: (
      <>
        고장 난 CCTV,<br className="lg:hidden" /> 혼자 고민하지 마세요.
      </>
    ),
    title: (
      <>
        타사 제품도<br className="lg:hidden" /> 바로 접수해 드립니다.
      </>
    ),
    href: "/contact?service=as",
  },
  speaker: {
    lead: "CCTV와 스피커,",
    title: "공사는 한 번이면 충분합니다.",
    href: "/contact?service=speaker",
  },
};

export default function ServiceCta() {
  return (
    <Suspense fallback={<ConsultCta />}>
      <TabCta />
    </Suspense>
  );
}

function TabCta() {
  const slug = usePathname().split("/")[2] as ServiceSlug | undefined;
  const props = slug ? CTA_BY_TAB[slug] : undefined;
  return <ConsultCta {...props} />;
}
