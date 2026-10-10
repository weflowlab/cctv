import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { HeaderStyleProvider } from "@/components/layout/HeaderStyleContext";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  // 공유 이미지 등 절대 주소 기준 (SITE.url — 정식 도메인 연결 시 lib/site.ts 에서 교체)
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | CCTV 설치·렌탈·AS ${SITE.hours}`,
  description: "CCTV 설치부터 렌탈, AS 출장수리, CCTV+스피커 동시 시공까지. 전국 어디든 빠른 설치와 AS.",
  // 링크 공유 미리보기 — 이미지는 app/opengraph-image.jpg(1200x630, 카메라 가운데) 파일이 자동 적용.
  // 제목·설명은 각 페이지 title/description 을 카카오톡·페이스북 등이 그대로 사용.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "ko_KR",
  },
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
