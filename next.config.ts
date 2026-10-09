import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  /**
   * 이미지 최적화 끔 — public/images 의 사진·로고는 이미 WebP(가로 1600px 이하, 품질 82)로 압축해 두어
   * Vercel 이미지 변환(/_next/image)이 할 일이 없고, 변환 횟수 과금·첫 요청 지연만 생긴다.
   * 대신 끄면 원본 파일이 그대로 전송되므로, 새 이미지를 넣을 때도 반드시 WebP로 줄여서 원본 자체를 가볍게 유지할 것.
   */
  images: {
    unoptimized: true,
  },
  /**
   * 주소 리다이렉트 — 페이지를 그리기 전에 처리되어 이동 중 깜빡임·오류 표시가 없다
   * - /service : 탭만 있는 메뉴 → 첫 탭으로 (307, 임시)
   * - /places, /places/:slug : 구 "장소별 CCTV" → 시공사례 장소별 주소로 통합 (308, 영구)
   */
  async redirects() {
    return [
      { source: "/service", destination: "/service/install", permanent: false },
      { source: "/places", destination: "/cases", permanent: true },
      { source: "/places/:slug", destination: "/cases/place/:slug", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
