/**
 * 사이트 전역 정보 (회사명·연락처·사업자 정보)
 * - 고객: 유니텍CCTV (UNITECH CCTV, 신규 회사) — 대표 연성흠
 * - 화면에 회사명·연락처를 쓸 때는 반드시 SITE 값을 사용할 것 (하드코딩 금지)
 * - TODO: 아래 "준비 중" 값은 고객 답변 받는 대로 교체
 *   (사업자등록번호 / 주소 / 대표전화 / 문의 이메일 / 카카오톡 오픈채팅 링크)
 */
const PENDING = "준비 중";

export const SITE = {
  name: "유니텍CCTV",
  /** 영문 표기 */
  nameEn: "UNITECH CCTV",
  /** 상호 (사업자 정보·저작권 표기용) */
  legalName: "유니텍CCTV",
  /** 브랜드 슬로건 (브랜드 가이드) */
  slogan: "하나된 기술로 안전을 지키다",
  /** 대표전화 — TODO: 확정 번호로 교체 */
  phone: PENDING,
  phoneHref: "tel:",
  /** 카카오톡 오픈채팅 상담 — TODO: 링크 교체 */
  kakaoUrl: "#",
  /** 문의 이메일 — TODO */
  email: PENDING,
  ceo: "연성흠",
  /** 사업자등록번호 — TODO */
  bizNumber: PENDING,
  /** 주소 — TODO */
  address: PENDING,
  /** 운영 시간 (구글폼 답변) */
  hours: "24시간 연중무휴",
} as const;

/**
 * 기존 회사(대한민국CCTV) 자료 노출 여부
 * - 수상 내역 · 고객사 로고 · 제휴 제조사 로고 · 전국 지사 등은 신규 회사 이름으로 써도 되는지 고객 확인 중.
 * - 확인 전까지 false (숨김). 쓸 수 있는 항목만 true 로 켜면 해당 섹션이 다시 보인다.
 */
export const LEGACY = {
  award: false, // 한국브랜드 선호도 3년 연속 1위
  clients: false, // 고객사 로고 29곳
  partners: false, // 제휴 제조사 로고
  branches: false, // 전국 지사 7곳
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
