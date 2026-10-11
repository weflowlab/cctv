/**
 * 404 — 없는 주소 (전역)
 * - 주소가 아예 없을 때 + 페이지에서 notFound() 를 부를 때(삭제된 시공사례 등) 모두 이 화면
 * - 루트 레이아웃 바로 아래라 공개 사이트 레이아웃(app/(site)/layout.tsx)의 헤더·푸터가 없어서 여기서 직접 붙인다
 *   방문 기록(PageTracker)은 붙이지 않는다 — 봇·잘못된 링크가 유입 통계를 흐리지 않게
 * - 구성: 큰 404 → 안내 문구 → [홈으로 가기] [상담 신청] (두 버튼 같은 크기)
 */
import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/common/Eyebrow";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { HeaderStyleProvider } from "@/components/layout/HeaderStyleContext";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `페이지를 찾을 수 없습니다 | ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <HeaderStyleProvider>
      <Header />
      <main className="flex min-h-screen w-full flex-col bg-white pt-[var(--header-height-mobile)] lg:pt-[var(--header-height)]">
        {/* ===== 본문: 연한 네이비→흰색 띠 + 우측 위 틸 빛 장식 (시공사례 타이틀 띠와 같은 톤) ===== */}
        <section className="relative flex w-full flex-1 items-center overflow-hidden bg-gradient-to-b from-[#eef3f9] to-white">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-160px] top-[-200px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(0,167,171,0.16),rgba(0,167,171,0))]"
          />
          <div className="relative mx-auto flex w-full max-w-[1112px] flex-col items-center px-[16px] py-[80px] text-center lg:py-[120px]">
            <Eyebrow>Page Not Found</Eyebrow>
            <p className="mt-[20px] text-[88px] font-extrabold leading-none tracking-[-2px] text-brand lg:mt-[28px] lg:text-[140px]">
              4<span className="text-point">0</span>4
            </p>
            <h1 className="mt-[20px] break-keep text-[22px] font-bold leading-[1.4] tracking-[-0.5px] text-[#222] lg:mt-[28px] lg:text-[32px]">
              찾으시는 페이지가 없습니다
            </h1>
            <p className="mt-[12px] break-keep text-[15px] leading-[1.6] tracking-[-0.3px] text-sub lg:mt-[16px] lg:text-[18px]">
              주소가 바뀌었거나 삭제된 페이지입니다.
              <br />
              아래 버튼으로 다시 시작해 보세요.
            </p>

            {/* ===== 버튼 2개 — [홈으로 가기] 원래 크기에 맞춘 같은 너비 (모바일은 가로 꽉 채움) ===== */}
            <div className="mt-[32px] flex w-full flex-col gap-[10px] sm:inline-grid sm:w-auto sm:auto-cols-fr sm:grid-flow-col lg:mt-[44px] lg:gap-[12px]">
              <Link
                href="/"
                className="flex h-[52px] items-center justify-center rounded-[10px] bg-brand px-[32px] text-[16px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-brand-strong lg:h-[56px] lg:text-[17px]"
              >
                홈으로 가기
              </Link>
              <Link
                href="/contact"
                className="flex h-[52px] items-center justify-center rounded-[10px] border border-brand bg-white px-[32px] text-[16px] font-bold tracking-[-0.3px] text-brand transition-colors hover:bg-brand-light lg:h-[56px] lg:text-[17px]"
              >
                상담 신청
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </HeaderStyleProvider>
  );
}
