"use client";

/**
 * 푸터 껍데기 + 하단 고정 상담바 노출 제어 (원본 layout 청크의 `eB` + `eZ` 로직)
 * - useFixedFooter 판단:
 *   · 홈("/"): 스크롤이 window.innerHeight 이상 내려가면 true (100ms 쓰로틀, 한 번 켜지면 리스너 해제)
 *   · 그 외: blog/calculator/terms/contact/download 등(NO_FIXED_FOOTER) 이 아니면 항상 true
 * - 푸터가 20% 이상 화면에 보이면(IntersectionObserver threshold 0.2) 고정바를 숨긴다.
 * - 고정바를 쓰는 경로에서는 푸터 하단에 70px 여백을 둔다.
 * - /download 및 일부 랜딩 경로에서는 푸터 자체를 렌더하지 않는다.
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import FixedBottomCta from "./FixedBottomCta";
import { canUseFixedFooter, isLayoutHidden } from "./menus";

export default function FooterShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const footerRef = useRef<HTMLElement>(null);

  // 홈에서 첫 화면 높이만큼 스크롤했는지 — 경로가 바뀌면 초기화
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setScrolledPastHero(false);
  }
  // 푸터가 화면에 20% 이상 보이는지
  const [footerInView, setFooterInView] = useState(false);

  // 홈 전용: 스크롤 감시 (100ms 쓰로틀) → innerHeight 도달 시 고정바 활성화 후 리스너 제거
  useEffect(() => {
    if (!isHome) return;
    let last = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 100) return;
      last = now;
      if (window.scrollY >= window.innerHeight) {
        setScrolledPastHero(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  // 푸터 노출 감시 (threshold 0.2): 보이면 고정바 숨김, 벗어나면 다시 표시
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  if (isLayoutHidden(pathname)) return null;

  const allowed = canUseFixedFooter(pathname);
  const useFixedFooter = isHome ? scrolledPastHero && allowed : allowed;

  return (
    <>
      <footer
        id="footer-main"
        ref={footerRef}
        className={`relative border-t border-[#f0f0f0] ${useFixedFooter ? "pb-[70px]" : ""}`}
      >
        {children}
      </footer>
      {/* ===== 하단 고정 상담바 ===== */}
      {useFixedFooter && !footerInView && <FixedBottomCta />}
    </>
  );
}
