/**
 * 전역 내비게이션 메뉴 데이터 + 레이아웃 노출 규칙
 * - 원본 layout 청크의 메뉴 객체(M)를 그대로 옮김. 키가 경로("/story")이면 단일 링크,
 *   키가 이름("구매")이고 hasSubmenus 면 드롭다운(서브메뉴) 메뉴.
 * - PC 헤더(DesktopHeader)와 모바일 헤더(MobileHeader)가 같은 데이터를 공유한다.
 */

export type SubMenu = { name: string; href: string };

export type Menu = {
  name: string;
  hasSubmenus?: boolean;
  submenus?: SubMenu[];
};

export const MENUS: Record<string, Menu> = {
  "/story": { name: "스토리" },
  "/security": { name: "매장보안" },
  "/new-service/employee-contract": { name: "직원관리" },
  "/blog": { name: "블로그" },
  구매: {
    name: "구매",
    hasSubmenus: true,
    submenus: [
      { name: "구매", href: "/plan" },
      { name: "제휴문의", href: "/business" },
    ],
  },
  "/faq": { name: "FAQ" },
  창업가이드: {
    name: "창업가이드",
    hasSubmenus: true,
    submenus: [
      { name: "창업 A to Z 가이드북", href: "/a-to-z-guide" },
      { name: "상권분석 리포트", href: "/2026-trend-report" },
      { name: "매장운영 시스템 가이드북", href: "/shop-management-guide" },
    ],
  },
};

/** 현재 경로가 해당 메뉴에 속하는지 (원본 isSelected 로직) */
export function isMenuSelected(key: string, menu: Menu, pathname: string) {
  if (menu.hasSubmenus) return menu.submenus?.some((s) => pathname.startsWith(s.href)) ?? false;
  return pathname !== "/" && pathname.startsWith(key);
}

/** 원본: 이 경로들에서는 헤더/푸터를 아예 렌더하지 않는다 */
export const LAYOUT_HIDDEN_PATHS = [
  "/terms/thirdparty",
  "/new-service/partners-intro",
  "/employee-guide-ox",
  "/ai-cctv-book",
  "/campaign/skb-promotion",
];

/** 원본: /download 는 레이아웃 없이 children 만 렌더 */
export function isLayoutHidden(pathname: string) {
  return pathname === "/download" || LAYOUT_HIDDEN_PATHS.includes(pathname);
}

/** 원본 eK: 이 경로(및 하위)에서는 하단 고정 상담바를 쓰지 않는다 */
const NO_FIXED_FOOTER = [
  "blog",
  "calculator",
  "terms",
  "download/guide",
  "privacy-policy",
  "contact",
  "promotion",
  "download",
  "employee-guide-ox",
  "ai-cctv-book",
  "keeper-mate",
];
const NO_FIXED_FOOTER_RE = new RegExp(`^\\/(${NO_FIXED_FOOTER.join("|")})(\\/|$)`);

export function canUseFixedFooter(pathname: string) {
  return !NO_FIXED_FOOTER_RE.test(pathname);
}

/** 서비스소개서 다운로드: 원본은 /download/guide 를 새 창으로 연다 */
export function openServiceGuide() {
  // TODO: 이벤트 트래킹(cctv_service_introduction_click) 연동
  // TODO: 클론에 /download/guide(서비스소개서 PDF 뷰어) 페이지 없음 — 실제 소개서 경로로 교체
  window.open("/download/guide", "_blank");
}
