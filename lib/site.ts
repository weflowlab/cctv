/**
 * 사이트 전역 정보 (회사명·연락처·사업자 정보)
 * - 고객: 유니텍CCTV (UNITECH CCTV, 신규 회사) — 대표 최명훈
 * - 화면에 회사명·연락처를 쓸 때는 반드시 SITE 값을 사용할 것 (하드코딩 금지)
 * - 2026-10-19 고객 전달: 사업자등록번호 · 주소 · 대표전화(1877-1189) · 카카오톡 오픈채팅 링크 반영
 * - TODO: 문의 이메일만 아직 "준비 중" — 고객 답변 받는 대로 교체
 */
const PENDING = "준비 중";

export const SITE = {
  name: "유니텍CCTV",
  /** 영문 표기 */
  nameEn: "UNITECH CCTV",
  /** 상호 (사업자 정보·저작권 표기용) */
  legalName: "유니텍CCTV",
  /** 사이트 주소 (공유 이미지·검색엔진 절대경로 기준) — 정식 도메인 (2026-10-22 연결: 카페24 구입 → DNS A·CNAME → Vercel, www 는 이 주소로 308) */
  url: "https://unitechcctv.co.kr",
  /** 브랜드 슬로건 (브랜드 가이드) */
  slogan: "하나된 기술로 안전을 지키다",
  /** 대표전화 (2026-10-19 고객 전달) */
  phone: "1877-1189",
  phoneHref: "tel:18771189",
  /** 카카오톡 오픈채팅 상담 (2026-10-19 고객 전달) */
  kakaoUrl: "https://open.kakao.com/o/svbLn7Si",
  /** 문의 이메일 — TODO */
  email: PENDING,
  /** 대표자 (2026-10-20 고객 전달: 연성흠 → 최명훈으로 정정) */
  ceo: "최명훈",
  /** 사업자등록번호 (2026-10-19 고객 전달) */
  bizNumber: "293-48-01525",
  /** 주소 (2026-10-19 고객 전달) */
  address: "서울특별시 송파구 동남로126, 4층 4131호 (송학빌딩)",
  /** 운영 시간 (구글폼 답변) */
  hours: "24시간 연중무휴",
  /** 시공 가능 지역 (직접 방문 시공 — 신뢰 포인트로 메인·FAQ 에 노출) */
  serviceArea: "전국 어디든 방문 시공",
} as const;

/**
 * 기존 회사(대한민국CCTV) 자료 노출 여부
 * - 수상 내역 · 고객사 로고 · 제휴 제조사 로고 · 전국 지사 등은 신규 회사 이름으로 써도 되는지 고객 확인 중.
 * - 확인 전까지 false (숨김). 쓸 수 있는 항목만 true 로 켜면 해당 섹션이 다시 보인다.
 * - 2026-10-10: 화면 확인용으로 전부 켬 (고객 확인 전 — 공개 전 반드시 재확인)
 */
export const LEGACY = {
  award: true, // 한국브랜드 선호도 3년 연속 1위
  clients: true, // 고객사 로고 30곳
  partners: true, // 제휴 제조사 로고
  branches: false, // 전국 지사 7곳 (2026-10-10 사용자 요청으로 숨김)
} as const;

/**
 * 장소 분류 (홈 장소 카드 · 시공사례 칩 · 견적 계산기 공통)
 * - slug 는 주소(/cases/place/<slug>)와 DB(cases.place) 값이라 바꾸지 않는다. 이름만 바꿀 것.
 * - 2026-10-16: 이름 변경(가정→주택·빌라 등) + 건설·산업현장(construction) 추가, 공사현장은 공장에서 이쪽으로
 */
export const PLACES = [
  { slug: "home", name: "주택·빌라", includes: ["아파트", "주택", "빌라"] },
  { slug: "store", name: "상가·매장", includes: ["음식점", "매장", "프랜차이즈", "병원"] },
  { slug: "office", name: "사무실·빌딩", includes: ["사무실", "빌딩"] },
  { slug: "factory", name: "공장·축사", includes: ["기업공장", "창고", "축사"] },
  { slug: "public", name: "관공서·시설", includes: ["관공서", "공공시설", "군사시설"] },
  { slug: "construction", name: "건설·산업현장", includes: ["공사현장", "산업현장"] },
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
