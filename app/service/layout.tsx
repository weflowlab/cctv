/**
 * /service 공통 레이아웃 — 탭이 바뀌어도 유지되는 껍데기
 * - 페이지 타이틀 → 탭 바(sticky) → {탭 콘텐츠} → 상담 신청 CTA 배너
 * - URL 값(params)을 읽지 않으므로 탭 이동 시 이 부분은 즉시 그대로 보이고,
 *   탭 콘텐츠만 page.tsx 의 Suspense 안에서 교체된다 (Instant Navigation).
 * - 현재 탭 강조는 ServiceTabs 가 URL 에서 직접 판단.
 */
import ConsultCta from "@/components/common/ConsultCta";
import ServiceTabs from "@/components/service/ServiceTabs";
import { SITE } from "@/lib/site";

export default function ServiceLayout({ children }: LayoutProps<"/service">) {
  return (
    <>
      {/* ===== 페이지 타이틀: "서비스" + 안내 문구 ===== */}
      <section className="bg-white px-[16px] pb-[24px] pt-[40px] text-center lg:pb-[40px] lg:pt-[80px]">
        <h1 className="text-[28px] font-bold leading-[40px] tracking-[-0.56px] text-[#202020] lg:text-[44px] lg:leading-[60px] lg:tracking-[-1px]">
          서비스
        </h1>
        {/* TODO: 문구 확정 (원본에 없는 안내 문구) */}
        <p className="mt-[8px] text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[12px] lg:text-[20px] lg:leading-[30px]">
          설치부터 렌탈, AS까지 {SITE.name}가 책임집니다.
        </p>
      </section>

      {/* ===== 탭 바: 설치 / 렌탈 / AS / 스피커 — 스크롤 시 헤더 아래 sticky ===== */}
      <ServiceTabs />

      {/* ===== 탭 콘텐츠 (page.tsx) ===== */}
      {children}

      {/* ===== 상담 신청 CTA 배너 (공통) ===== */}
      <ConsultCta />
    </>
  );
}
