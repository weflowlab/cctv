import type { Metadata } from "next";
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
 * 루트 레이아웃 — html/body 와 전역 CSS 만 담당
 * - 공개 사이트(헤더·푸터·방문 추적): app/(site)/layout.tsx
 * - 관리자 화면(사이드바): app/admin/layout.tsx
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full min-w-[360px]">{children}</body>
    </html>
  );
}
