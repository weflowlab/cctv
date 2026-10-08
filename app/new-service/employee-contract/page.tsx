/**
 * 직원관리 페이지 (/new-service/employee-contract) — 원본 keeper.ceo 의 "키퍼 직원관리" 랜딩
 * - 근로계약서·출퇴근·스케줄·급여확인 앱 기능을 소개하는 단일 랜딩 페이지.
 * - 헤더: 상단(scrollY < 100)에서는 투명 + 검은 글자("transparent-black"), 내려가면 흰 배경 (HeaderScrollSwitcher).
 * - 서버 컴포넌트. 인터랙션이 있는 부분(앱 다운로드 CTA/QR 모달, 사용법 탭·자동 슬라이드, 블로그 Swiper,
 *   헤더 스크롤 전환)만 components/employee 아래 클라이언트 컴포넌트로 분리.
 * - 하단 고정 "앱 다운로드하기" 바는 공통 레이아웃(FixedBottomCta)이 경로별로 처리.
 * - 원본의 ?readonly=true 모드(일부 섹션/CTA 숨김)는 내부용이라 재현하지 않음.
 */
import type { Metadata } from "next";
import AdvantageSection from "@/components/employee/AdvantageSection";
import AppInstallSection from "@/components/employee/AppInstallSection";
import BlogSection from "@/components/employee/BlogSection";
import CctvBannerSection from "@/components/employee/CctvBannerSection";
import FeatureSection from "@/components/employee/FeatureSection";
import FreeCtaSection from "@/components/employee/FreeCtaSection";
import HeaderScrollSwitcher from "@/components/employee/HeaderScrollSwitcher";
import HeroSection from "@/components/employee/HeroSection";
import ReviewSection from "@/components/employee/ReviewSection";
import TimeSavingCtaSection from "@/components/employee/TimeSavingCtaSection";
import UsageGuideSection from "@/components/employee/UsageGuideSection";
import WorrySection from "@/components/employee/WorrySection";

export const metadata: Metadata = {
  title: "키퍼 직원관리 | 근로계약서·출퇴근·급여 앱",
  description: "근로계약서 작성부터 GPS 출퇴근 체크, 예상 급여 계산까지 앱 하나로. 무료 제공",
};

export default function EmployeeContractPage() {
  return (
    <div className="relative w-full min-w-[360px]">
      {/* 헤더 스타일 스크롤 연동 (렌더 없음) */}
      <HeaderScrollSwitcher />

      {/* ===== 1. 히어로: "요즘 사장님의 직원관리 필수앱" + 무료로 시작하기 ===== */}
      <HeroSection />

      {/* ===== 2. 고민 공감: 4개 고민 카드 (스크롤 등장) ===== */}
      <WorrySection />

      {/* ===== 3. 기능 소개: 좌우 교차 기능 카드 4장 (스크롤 등장) ===== */}
      <FeatureSection />

      {/* ===== 4. 무료 안내 CTA 띠 배너 ===== */}
      <FreeCtaSection />

      {/* ===== 5. 앱 설치 안내: 키퍼 / 키퍼 파트너스 ===== */}
      <AppInstallSection />

      {/* ===== 6. 사용법: 탭 3개 × 3단계 자동 슬라이드 ===== */}
      <UsageGuideSection />

      {/* ===== 7. 키퍼만의 특별한 장점 3가지 ===== */}
      <AdvantageSection />

      {/* ===== 8. CCTV 크로스셀 배너 (빠른 상담하기 → /contact) ===== */}
      <CctvBannerSection />

      {/* ===== 9. 리뷰: 플랫폼 평점 + 사용자 후기 ===== */}
      <ReviewSection />

      {/* ===== 10. 하단 CTA: 놀라운 시간 단축 ===== */}
      <TimeSavingCtaSection />

      {/* ===== 11. 블로그 캐러셀: 직원 관리의 모든 것 ===== */}
      <BlogSection />
    </div>
  );
}
