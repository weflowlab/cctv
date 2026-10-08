/**
 * /cases 페이지 — 시공사례 (기존 사이트 시공사례 페이지 내용 + keeper 블로그 목록 틀)
 * - 서버 컴포넌트. 장소 칩 필터 + 카드 그리드는 클라이언트 컴포넌트 CaseList.
 * - 장소는 ?place=<slug> 쿼리 → useSearchParams 사용으로 Suspense 필요.
 *   fallback 으로 "전체" 목록을 렌더해 초기 HTML 에도 카드가 들어가게 한다.
 * - 상세 페이지 없음: 카드/버튼은 모두 네이버 블로그 새 탭.
 */
import type { Metadata } from "next";
import { Suspense } from "react";
import ConsultCta from "@/components/common/ConsultCta";
import CaseList, { CaseListFromParams } from "@/components/cases/CaseList";
import { CASE_BLOG_LINKS } from "@/components/cases/data";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `시공사례 | ${SITE.name}`,
  description: `가정·매장·사무실·공장 등 ${SITE.name}의 CCTV 실제 시공사례를 확인해 보세요.`,
};

export default function CasesPage() {
  return (
    <>
      <section className="w-full pb-[120px] lg:pb-[160px]">
        <div className="mx-auto max-w-[1112px] px-[16px]">
          {/* ===== 제목: 시공사례 / 안내 문구 ===== */}
          <div className="mb-[28px] mt-[44px] lg:mb-[40px] lg:mt-[80px]">
            <h1 className="text-[28px] font-bold leading-[140%] tracking-[-1px] text-[#222] lg:text-[42px]">
              시공사례
            </h1>
            <p className="mt-[8px] text-[15px] leading-[160%] tracking-[-0.3px] text-[#666] lg:mt-[12px] lg:text-[18px]">
              {SITE.name}의 시공사례를 직접 확인해 보세요.
            </p>
          </div>

          {/* ===== 전체 시공사례 확인: 네이버 블로그 3곳 버튼 (새 탭) ===== */}
          <div className="mb-[44px] flex flex-wrap gap-[8px] lg:mb-[64px] lg:gap-[12px]">
            {CASE_BLOG_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[44px] items-center rounded-[8px] border border-[#ff5c00] px-[16px] text-[14px] font-semibold tracking-[-0.3px] text-[#ff5c00] transition-colors duration-200 hover:bg-[#ff5c00] hover:text-white lg:h-[52px] lg:px-[24px] lg:text-[16px]"
              >
                {link.label} ↗
              </a>
            ))}
          </div>

          {/* ===== 사례 목록: 장소 칩 필터 / 카드 그리드 ===== */}
          <Suspense fallback={<CaseList place={null} />}>
            <CaseListFromParams />
          </Suspense>
        </div>
      </section>

      {/* ===== 상담 신청 CTA 배너 ===== */}
      <ConsultCta />
    </>
  );
}
