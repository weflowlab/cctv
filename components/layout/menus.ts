/**
 * 전역 내비게이션 메뉴 데이터
 * - 상단 메뉴 5개(드롭다운 없음) + 우측 주 CTA(상담 신청하기).
 * - 키가 경로이며, 하위 경로(/service/install 등)에 있어도 해당 메뉴가 선택된 것으로 본다.
 * - PC 헤더(DesktopHeader)와 모바일 헤더(MobileHeader)가 같은 데이터를 공유한다.
 */

export type Menu = { name: string };

export const MENUS: Record<string, Menu> = {
  "/about": { name: "회사소개" },
  "/service": { name: "서비스" }, // 탭: /service/install · rental · as · speaker
  "/places": { name: "장소별 CCTV" }, // 칩: /places/home · store · office · factory · public
  "/cases": { name: "시공사례" },
  "/faq": { name: "FAQ" },
};

/** 헤더 우측 주 CTA — 문의폼 페이지로 이동 */
export const PRIMARY_CTA = { name: "상담 신청하기", href: "/contact" };

/** 현재 경로가 해당 메뉴에 속하는지 — 메뉴 경로 자체 또는 그 하위 경로(/service/rental 등) */
export function isMenuSelected(key: string, pathname: string) {
  return pathname === key || pathname.startsWith(`${key}/`);
}
