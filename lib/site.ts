/**
 * 사이트 전역 정보 (회사명·연락처·사업자 정보)
 * - 회사명은 추후 변경 예정 → 화면에 회사명을 쓸 때는 반드시 SITE.name 을 사용할 것 (하드코딩 금지)
 * - 값 출처: 기존 홈페이지 https://kkcctv.co.kr 푸터/연락처
 */
export const SITE = {
  /** 회사명 (TODO: 변경 예정 — 기존 사이트는 "대한민국CCTV"/"대한민국CCTV협동조합" 혼용) */
  name: "대한민국CCTV",
  /** 법인명 (사업자 정보·저작권 표기용) */
  legalName: "대한민국CCTV협동조합",
  /** 통합 콜센터 */
  phone: "1533-9785",
  phoneHref: "tel:1533-9785",
  /** 카카오톡 오픈채팅 상담 */
  kakaoUrl: "https://open.kakao.com/o/s3mBaotg",
  ceo: "김정태",
  bizNumber: "378-81-02517",
  address: "경기도 안양시 만안구 전파로 39, 3층 304호 (안양동)",
  /** 외부 채널 */
  blogUrl: "https://blog.naver.com/guy82guy",
  youtubeUrl: "https://www.youtube.com/@user-cr9ku4ee5x",
} as const;

/** 장소 분류 (홈 아이콘 · 장소별 CCTV 칩 · 시공사례 필터 공통) */
export const PLACES = [
  { slug: "home", name: "가정", includes: ["아파트", "주택"] },
  { slug: "store", name: "매장", includes: ["음식점", "매장", "프랜차이즈", "병원"] },
  { slug: "office", name: "사무실", includes: ["사무실", "빌딩"] },
  { slug: "factory", name: "공장·창고", includes: ["기업공장", "창고", "공사현장", "축사"] },
  { slug: "public", name: "기관", includes: ["관공서", "군사시설"] },
] as const;

export type PlaceSlug = (typeof PLACES)[number]["slug"];

/** 서비스 탭 (서비스 메뉴 상단 탭 · 홈 서비스 카드 공통) */
export const SERVICES = [
  { slug: "install", name: "CCTV 설치" },
  { slug: "rental", name: "CCTV 렌탈" },
  { slug: "as", name: "AS 수리" },
  { slug: "speaker", name: "CCTV+스피커" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
