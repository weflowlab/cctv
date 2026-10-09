import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
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
