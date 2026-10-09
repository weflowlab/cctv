/**
 * 홈 중간 CTA — 비용 비교 바로 뒤, 견적 계산기로 유도
 * - components/service/CalculatorBanner(렌탈·설치 탭과 같은 네이비 배너, 전체가 /calculator 링크) 재사용.
 * - 앞(비용 비교, 연회색)·뒤(서비스 카드, 흰색) 사이를 연틸 띠로 구분.
 */
import CalculatorBanner from "@/components/service/CalculatorBanner";

export default function MidCta() {
  return (
    // ===== 중간 CTA: 연틸 배경 + 견적 계산기 배너 =====
    <section className="flex w-full justify-center bg-point-light px-[16px] py-[40px] lg:px-0 lg:py-[64px]">
      <CalculatorBanner className="w-full max-w-[580px] lg:w-[1080px] lg:max-w-none" />
    </section>
  );
}
