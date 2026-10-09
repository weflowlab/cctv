/**
 * /places 공통 레이아웃 — 장소 칩을 바꿔도 유지되는 껍데기
 * - 타이틀 + 설명 → 칩 바(sticky) → {장소 콘텐츠} → 상담 신청 CTA 배너
 * - URL 값(params)을 읽지 않으므로 칩 이동 시 이 부분은 즉시 그대로 보이고,
 *   장소 콘텐츠만 page.tsx 의 Suspense 안에서 교체된다 (Instant Navigation).
 * - 현재 칩 강조는 PlaceChips 가 URL 에서 직접 판단.
 */
import ConsultCta from "@/components/common/ConsultCta";
import PlaceChips from "@/components/places/PlaceChips";

export default function PlacesLayout({ children }: LayoutProps<"/places">) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* ===== 타이틀: "장소별 CCTV" + 설명 (원본 문구) ===== */}
      <section className="flex w-full flex-col items-center gap-[10px] px-[20px] pb-[24px] pt-[40px] text-center lg:gap-[16px] lg:pb-[40px] lg:pt-[120px]">
        <h1 className="text-[26px] font-bold leading-[40px] text-[#202020] lg:text-[46px] lg:leading-[68px]">
          장소별 CCTV
        </h1>
        <p className="break-keep text-[14px] leading-[22px] text-[#787878] lg:text-[22px] lg:leading-[34px]">
          장소에 따른 CCTV 설치의 필요성과 효과를 설명해 드립니다.
        </p>
      </section>

      {/* ===== 칩 바: 장소 전환(페이지 이동, scroll={false}) + sticky ===== */}
      <PlaceChips />

      {/* ===== 선택 장소 콘텐츠 (page.tsx) ===== */}
      {children}

      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </div>
  );
}
