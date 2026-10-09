/**
 * 시공사례 목록 공통 레이아웃 — /cases, /cases/place/[slug] 에만 적용 (route group "(list)")
 * - 상세 /cases/[id] 는 이 그룹 밖(app/cases/[id])이라 칩 바가 나오지 않는다.
 * - 구성: 타이틀 → 장소 칩 바(sticky, Link 이동) → {목록 콘텐츠: page.tsx} → 상담 신청 CTA 배너
 * - URL 값(params)을 읽지 않으므로 칩 이동 시 이 껍데기는 즉시 그대로 보이고,
 *   목록 콘텐츠만 교체된다 (Instant Navigation). 현재 칩 강조는 CasePlaceChips 가 URL 에서 직접 판단.
 * - 구 "장소별 CCTV"(/places) 메뉴를 이곳으로 합침 — /places/* 는 영구 리다이렉트.
 */
import CasePlaceChips from "@/components/cases/CasePlaceChips";
import CasesTitle from "@/components/cases/CasesTitle";
import ConsultCta from "@/components/common/ConsultCta";

export default function CasesListLayout({ children }: LayoutProps<"/cases">) {
  return (
    <>
      {/* ===== 타이틀: "시공사례" / 장소별 주소에선 "{장소} CCTV 시공사례" (SEO) ===== */}
      <div className="mx-auto w-full max-w-[1112px] px-[16px] pb-[8px] pt-[44px] lg:pb-[16px] lg:pt-[80px]">
        <CasesTitle />
      </div>

      {/* ===== 장소 칩 바: 전체 / 가정 / 매장 / 사무실 / 공장·창고 / 기관 (페이지 이동, scroll={false}) ===== */}
      <CasePlaceChips />

      {/* ===== 목록 콘텐츠 (page.tsx): 안내 문구 또는 장소 소개 + 카드 그리드 ===== */}
      <section className="w-full pb-[120px] pt-[16px] lg:pb-[160px] lg:pt-[24px]">
        <div className="mx-auto max-w-[1112px] px-[16px]">{children}</div>
      </section>

      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </>
  );
}
