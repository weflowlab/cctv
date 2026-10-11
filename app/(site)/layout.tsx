import { Suspense } from "react";
import PageTracker from "@/components/common/PageTracker";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { HeaderStyleProvider } from "@/components/layout/HeaderStyleContext";

/**
 * 공개 사이트 레이아웃 (route group "(site)" — URL 에는 나타나지 않음)
 * - 구조: 고정 헤더(fixed) → main(헤더 높이만큼 padding-top) → 푸터
 * - 헤더 스타일(투명/흰색)은 HeaderStyleProvider 가 경로별로 결정
 * - PageTracker: 방문 기록(관리자 > 유입 관리) — 관리자 화면은 이 그룹 밖이라 기록되지 않는다
 * - 각 페이지는 main 안쪽 콘텐츠만 책임진다
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderStyleProvider>
      <Header />
      {/* 원본: PC padding-top 80px / 모바일 var(--header-height-mobile) */}
      <main className="flex min-h-screen w-full flex-col bg-white pt-[var(--header-height-mobile)] lg:pt-[var(--header-height)]">
        {children}
      </main>
      <Footer />
      {/* usePathname 이 확정되지 않는 동적 경로(/cases/[id] 등)에서도 페이지 그리기를 막지 않게 */}
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
    </HeaderStyleProvider>
  );
}
