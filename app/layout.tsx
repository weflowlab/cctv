import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { HeaderStyleProvider } from "@/components/layout/HeaderStyleContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "한화비전 키퍼 | 사장님 매장을 위한 프리미엄 CCTV",
  description: "매장 보안부터 직원 근태관리까지, 매장관리 올인원 솔루션 키퍼",
};

/**
 * 루트 레이아웃
 * - 구조: 고정 헤더(fixed) → main(헤더 높이만큼 padding-top) → 푸터
 * - 헤더 스타일(투명/흰색)은 HeaderStyleProvider 가 경로별로 결정
 * - 각 페이지는 main 안쪽 콘텐츠만 책임진다
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full min-w-[360px]">
        <HeaderStyleProvider>
          <Header />
          {/* 원본: PC padding-top 80px / 모바일 var(--header-height-mobile) */}
          <main className="flex min-h-screen w-full flex-col bg-white pt-[var(--header-height-mobile)] lg:pt-[var(--header-height)]">
            {children}
          </main>
          <Footer />
        </HeaderStyleProvider>
      </body>
    </html>
  );
}
