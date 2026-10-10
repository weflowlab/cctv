/**
 * 시공사례 데이터
 * - 샘플 데이터 — 관리자 페이지(DB) 도입 시 교체, 필드는 DB 컬럼과 1:1
 *   (추후 Neon Postgres 테이블 + Vercel Blob 이미지로 대표가 직접 등록)
 * - images: 사진 설명(alt). 화면 사진은 임시로 caseImageSrc() 스톡 사진 — DB 도입 후 Vercel Blob URL 로 교체.
 * - date: 표시용 문자열 "YYYY-MM" (Date 객체 쓰지 않음 — 프리렌더 안전)
 * - CASES 는 최신순으로 유지.
 */
import { PLACES, type PlaceSlug } from "@/lib/site";

export type CaseItem = {
  /**
   * slug 겸 id — 상세 주소 /cases/<id> (검색 노출용 영문 키워드)
   * 규칙: 지역-장소-cctv-서비스 (소문자, 하이픈) · 날짜는 넣지 않음 · 겹치면 끝에 -2, -3
   *   서비스: installation(설치) / rental(렌탈) / repair(AS) / speaker(CCTV+스피커)
   *   예) gangnam-cafe-cctv-installation, suwon-apartment-cctv-rental
   * 관리자 페이지 도입 시 이 규칙으로 자동 생성(수정 가능)하면 된다.
   */
  id: string;
  /** 예: "강남 카페 CCTV 8대 설치" */
  title: string;
  /** PLACES 분류 */
  place: PlaceSlug;
  /** "서울 강남구" */
  region: string;
  /** 설치 대수 */
  cameraCount: number;
  service: "install" | "rental" | "as" | "speaker";
  /** 한두 문장 */
  summary: string;
  /** 이미지 자리 설명(Placeholder label). 추후 Vercel Blob URL */
  images: string[];
  /** "2026-09" (표시용 문자열) */
  date: string;
  /** 메인 노출 */
  featured: boolean;
};

/** 샘플 시공사례 11건 (최신순) */
export const CASES: CaseItem[] = [
  {
    id: "gangnam-cafe-cctv-installation",
    title: "강남 카페 CCTV 8대 설치",
    place: "store",
    region: "서울 강남구",
    cameraCount: 8,
    service: "install",
    summary:
      "카운터·홀·테라스·창고까지 사각지대 없이 8대를 배치했습니다. 사장님 휴대폰으로 매장 상황을 실시간 확인하실 수 있게 설정해 드렸습니다.",
    images: ["카운터 상단 카메라", "홀 전경 카메라", "테라스 출입구 카메라", "녹화기·모니터 설치 모습"],
    date: "2026-09",
    featured: true,
  },
  {
    id: "suwon-apartment-cctv-rental",
    title: "수원 아파트 CCTV 2대 렌탈",
    place: "home",
    region: "경기 수원시",
    cameraCount: 2,
    service: "rental",
    summary:
      "현관과 거실에 실내용 카메라 2대를 렌탈로 설치했습니다. 초기 비용 없이 월 요금으로 이용하시고, 고장 시 무상 점검을 받으실 수 있습니다.",
    images: ["현관 카메라", "거실 카메라", "휴대폰 앱 화면"],
    date: "2026-09",
    featured: true,
  },
  {
    id: "incheon-warehouse-cctv-installation",
    title: "인천 물류창고 CCTV 16대 설치",
    place: "factory",
    region: "인천 서구",
    cameraCount: 16,
    service: "install",
    summary:
      "넓은 적재 구역과 상하차장, 외곽 담장까지 16대로 촘촘히 감시합니다. 야간에도 선명한 적외선 카메라를 사용했습니다.",
    images: ["창고 내부 적재 구역", "상하차장 카메라", "외곽 담장 카메라", "관제 모니터 화면", "배선 정리 모습"],
    date: "2026-08",
    featured: true,
  },
  {
    id: "seongnam-bundang-office-cctv-installation",
    title: "성남 사무실 CCTV 6대 설치",
    place: "office",
    region: "경기 성남시 분당구",
    cameraCount: 6,
    service: "install",
    summary:
      "출입구·사무 공간·서버실을 중심으로 6대를 설치했습니다. 업무 공간 특성상 천장 배선을 깔끔하게 숨겨 마감했습니다.",
    images: ["출입구 카메라", "사무 공간 전경", "서버실 카메라"],
    date: "2026-08",
    featured: true,
  },
  {
    id: "daejeon-community-center-cctv-installation",
    title: "대전 주민센터 CCTV 10대 설치",
    place: "public",
    region: "대전 유성구",
    cameraCount: 10,
    service: "install",
    summary:
      "민원실·주차장·건물 외곽에 10대를 설치했습니다. 기관 요청에 맞춰 녹화 보관 기간을 넉넉하게 설정했습니다.",
    images: ["민원실 카메라", "주차장 카메라", "건물 외곽 카메라", "녹화기 설치 모습"],
    date: "2026-07",
    featured: true,
  },
  {
    id: "busan-haeundae-restaurant-cctv-speaker",
    title: "부산 음식점 CCTV 4대 + 스피커 설치",
    place: "store",
    region: "부산 해운대구",
    cameraCount: 4,
    service: "speaker",
    summary:
      "홀과 주방을 확인하는 카메라 4대에 매장 스피커를 함께 설치했습니다. 배경 음악과 안내 방송을 한 번에 해결했습니다.",
    images: ["홀 카메라", "주방 카메라", "천장 스피커", "앰프 설치 모습"],
    date: "2026-07",
    featured: true,
  },
  {
    id: "yongin-house-cctv-installation",
    title: "용인 단독주택 CCTV 5대 설치",
    place: "home",
    region: "경기 용인시",
    cameraCount: 5,
    service: "install",
    summary:
      "대문·마당·주차 공간·뒷마당까지 집 둘레 5곳을 지킵니다. 외부 방수형 카메라로 비·눈에도 안심입니다.",
    images: ["대문 카메라", "마당 전경", "주차 공간 카메라"],
    date: "2026-06",
    featured: false,
  },
  {
    id: "hwaseong-factory-cctv-repair",
    title: "화성 공장 CCTV 12대 AS 점검",
    place: "factory",
    region: "경기 화성시",
    cameraCount: 12,
    service: "as",
    summary:
      "화면이 끊기던 기존 카메라 12대를 점검하고, 노후 케이블과 고장 카메라 3대를 교체했습니다.",
    images: ["점검 전 화면 끊김", "케이블 교체 작업", "교체 후 정상 화면"],
    date: "2026-06",
    featured: false,
  },
  {
    id: "seoul-mapo-office-cctv-rental",
    title: "서울 마포 사무실 CCTV 3대 렌탈",
    place: "office",
    region: "서울 마포구",
    cameraCount: 3,
    service: "rental",
    summary:
      "소규모 사무실에 카메라 3대를 렌탈로 설치했습니다. 목돈 부담 없이 월 요금으로 시작하셨습니다.",
    images: ["출입문 카메라", "사무실 전경", "휴대폰 앱 화면"],
    date: "2026-05",
    featured: false,
  },
  {
    id: "cheongju-library-cctv-installation",
    title: "청주 공공도서관 CCTV 8대 설치",
    place: "public",
    region: "충북 청주시",
    cameraCount: 8,
    service: "install",
    summary:
      "열람실·로비·출입구·주차장에 8대를 설치했습니다. 이용자 동선을 고려해 시야를 가리지 않는 위치에 배치했습니다.",
    images: ["로비 카메라", "열람실 카메라", "주차장 카메라", "출입구 카메라"],
    date: "2026-05",
    featured: false,
  },
  {
    id: "goyang-convenience-store-cctv-repair",
    title: "고양 편의점 CCTV 6대 AS 교체",
    place: "store",
    region: "경기 고양시",
    cameraCount: 6,
    service: "as",
    summary:
      "녹화가 되지 않던 녹화기를 교체하고, 흐릿한 구형 카메라 6대를 고화질 카메라로 바꿨습니다.",
    images: ["계산대 카메라", "진열대 카메라", "새 녹화기 설치 모습"],
    date: "2026-04",
    featured: false,
  },
];

/** 메인 노출용 — featured 우선, 부족하면 최신순으로 채움 */
export function getFeaturedCases(limit = 6): CaseItem[] {
  const featured = CASES.filter((c) => c.featured);
  const rest = CASES.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}


/** 장소별 사례 건수 (칩 바 표시용) — 사례가 없는 장소는 0 */
export function countCasesByPlace(): Record<PlaceSlug, number> {
  const counts = Object.fromEntries(PLACES.map((p) => [p.slug, 0])) as Record<PlaceSlug, number>;
  for (const c of CASES) counts[c.place] += 1;
  return counts;
}

/** id 로 사례 1건 조회 (없으면 undefined) */
export function getCase(id: string): CaseItem | undefined {
  return CASES.find((c) => c.id === id);
}

/**
 * 임시 사례 사진 — 스톡 사진(CC0) public/images/stock/*.webp 를 돌려 씀 (중복 허용)
 * - 실제 시공 사진 등록(DB·Blob 도입) 전까지만 사용. 같은 사례는 항상 같은 사진이 나오도록 id 로 시작 위치를 정함.
 * - 스피커 사례는 스피커 사진, 나머지는 카메라·시공 사진.
 */
const STOCK_CAMERA = [
  "hero-main-ceiling-camera",
  "card-install-dome-camera",
  "hero-rental-building-dome-camera",
  "install-step4-wall-camera",
  "rental-benefit5-bullet-cameras",
  "card-rental-rooftop-camera",
  "install-hero-technician-wall",
  "rental-hero-white-wall-camera",
  "rental-benefit4-dome-camera",
  "as-diagnosis-network-rack",
  "rental-benefit7-control-room",
  "install-step3-electrician-panel",
  "hero-as-technician-rack",
  "as-old-camera",
  "as-visit-repair",
];
const STOCK_SPEAKER = ["speaker-hero-woofer", "promo-speaker-mixing-console", "hero-speaker-bookshelf-speaker"];

/** 사례 사진 경로 (idx 번째 사진) */
export function caseImageSrc(item: CaseItem, idx = 0): string {
  const pool = item.service === "speaker" ? STOCK_SPEAKER : STOCK_CAMERA;
  const offset = [...item.id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return `/images/stock/${pool[(offset + idx) % pool.length]}.webp`;
}
