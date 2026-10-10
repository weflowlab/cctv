/**
 * 서비스 탭 데이터 (출처: 기존 홈페이지 https://kkcctv.co.kr)
 * - 설치 패키지 가격: /cctv-설치-패키지 페이지 텍스트 그대로
 * - 렌탈 월요금표: 렌탈 페이지의 이미지(2024/05/표-1.jpg)를 텍스트로 옮김
 * - 이미지 경로는 원본 wp-content/uploads 기준 (Placeholder label 에 기록)
 */

/* ------------------------------------------------------------------ */
/* CCTV 설치 패키지                                                     */
/* ------------------------------------------------------------------ */
export type Resolution = "2MP" | "5MP";
export type Placement = "indoor" | "outdoor";

export const RESOLUTION_OPTIONS: { value: Resolution; label: string }[] = [
  { value: "2MP", label: "200만 화소" },
  { value: "5MP", label: "500만 화소" },
];

export const PLACEMENT_OPTIONS: { value: Placement; label: string }[] = [
  { value: "indoor", label: "실내용 (돔 카메라)" },
  { value: "outdoor", label: "실외용 (방수 카메라)" },
];

/** 카메라 종류 표기 (패키지 구성 첫 줄에 들어감) */
export const CAMERA_NAME: Record<Placement, string> = {
  indoor: "돔 카메라",
  outdoor: "실외 방수 카메라",
};

/** 화소 × 설치환경별 1~4대 패키지 가격 (부가세 별도, 원) */
export const INSTALL_PRICES: Record<Resolution, Record<Placement, number[]>> = {
  "2MP": { indoor: [450000, 600000, 750000, 850000], outdoor: [500000, 650000, 800000, 900000] },
  "5MP": { indoor: [500000, 650000, 800000, 900000], outdoor: [550000, 700000, 850000, 950000] },
};

/** 패키지 카드 이미지 (원본: 실내 066-1~069-1, 실외 070~073) */
/** 패키지 카드 사진 — 기존 사이트(kkcctv.co.kr) 제품 사진을 WebP 로 변환해 public/images/products 에 저장
 *  (원본: 실내 2024/04/066-1~069-1, 실외 2024/04/070~073) */
export const PACKAGE_IMAGES: Record<Placement, string[]> = {
  indoor: [1, 2, 3, 4].map((n) => `/images/products/package-indoor-${n}.webp`),
  outdoor: [1, 2, 3, 4].map((n) => `/images/products/package-outdoor-${n}.webp`),
};

/** 패키지 공통 구성/조건 — 첫 줄(장비 구성)은 화소·카메라 종류에 따라 조합
 *  TODO: 신규 회사 정책 확인 — "기계 무상 AS 1년" 은 기존 회사 정책 */
export const PACKAGE_COMMON_ITEMS = ["꼼꼼한 설치 시공+기본 자재 포함", "기계 무상 AS 1년", "모니터 별도", "부가세 별도"];

export const PACKAGE_NOTES = [
  "매장, 주택, 사무실 등 소규모 전용 알뜰 특가패키지, 정보통신면허 공사 및 큰 규모의 공사 발주 별도 문의",
  "수도권 기준, 지방권 금액 소폭 변동",
];

/**
 * 패키지 풀세트 구성품 (원본 "FullHD 실내/실외 CCTV 풀세트 구성품" 이미지 속 문구 · 번호 순서 그대로)
 * - 실내 9종 = 01 실내 카메라 + 02~09 공통 8종
 * - 실외 10종 = 01 실외 방수 카메라 + 02~09 공통 8종 + 10 방수 하이박스(실외 전용)
 * - 사진: 기존 사이트 구성품 이미지(2024/04/054-1 ~ 064-1)에서 번호·이름 띠를 잘라내고 제품 부분만 WebP 로 저장
 *   (public/images/products) — 카드에 번호·이름을 따로 표시하므로 중복 방지
 * - 원본 카메라·DVR 이미지는 HIKVISION 제품 — TODO: 신규 회사 취급 제품 확인
 * - 원본 HDD 사진은 8TB 제품인데 문구는 1TB → 사진 교체 시 1TB 제품으로
 */
export const FULLSET_CAMERA: Record<Placement, { name: string; image: string }> = {
  indoor: { name: "실내 카메라", image: "/images/products/camera-indoor.webp" },
  outdoor: { name: "실외 방수 카메라", image: "/images/products/camera-outdoor.webp" },
};
export const FULLSET_COMMON = [
  { name: "CCTV 녹화기 (DVR)", image: "/images/products/dvr.webp" },
  { name: "1TB 하드디스크", image: "/images/products/hdd.webp" },
  { name: "고급 실드 케이블", image: "/images/products/cable.webp" },
  { name: "CCTV 아답터", image: "/images/products/adapter.webp" },
  { name: "CCTV 전용 브라켓", image: "/images/products/bracket.webp" },
  { name: "CCTV 젠더 (BNCP-RCAJ)", image: "/images/products/gender.webp" },
  { name: "CCTV 설치안내판", image: "/images/products/sign.webp" },
  { name: "PC·모바일 소프트웨어 (실시간 영상 확인)", image: "/images/products/software.webp" },
];
/** 실외 패키지에만 추가되는 구성품 */
export const FULLSET_OUTDOOR_ONLY = [{ name: "CCTV 방수 하이박스", image: "/images/products/waterproof-box.webp" }];

/** 설치 시공절차 4단계 (원본 이미지 002-1 / 003 / 004 / 005 속 문구) */
export const INSTALL_STEPS = [
  { title: "상담신청", desc: "홈페이지 또는 콜상담을 통해 상담신청", img: "2024/03/002-1-e1711603714590.png" },
  { title: "상담진행", desc: "전담매니저 매칭 후 빠른 상담 또는 방문 진행", img: "2024/03/003-e1711603751986.png" },
  { title: "CCTV 공사", desc: "고객님과의 일정 협의 후\n일정에 맞게 공사시공", img: "2024/03/004-e1711603780434.png" },
  { title: "CCTV 설치완료", desc: "유지보수 및 담당자 배정 완료", img: "2024/03/005-e1711603816617.png" },
];

/* ------------------------------------------------------------------ */
/* CCTV 렌탈                                                           */
/* ------------------------------------------------------------------ */
export const RENTAL_BENEFITS = [
  { title: "설치비/가입비/보증료 면제", img: "2024/04/CK_cb036087621_l.jpg" },
  { title: "카메라 소유권 처음부터 이전", img: "2024/04/CK_cm080973516_l-1.jpg" },
  { title: "A/S 서비스 완벽 제공", img: "2024/04/CK_cm080777053_l.jpg" },
  { title: "국내 인증 제품 제공", img: "2024/04/CK_cm080998873_l-1.jpg" },
  { title: "FULL HD 최고급형 카메라 제공", img: "2024/03/CK_ti436a22305_l.jpg" },
  { title: "전용어플 실시간 모니터링 어플 평생 무료", img: "2024/04/CK_cm081019817_l.jpg" },
  { title: "24시간 실시간 영상확인 서비스", img: "2024/04/CK_cm080944170_l.jpg" },
];

/** 렌탈 월요금 (카메라 1~16대) — [타사 월요금, 자사 월요금] (원본 표-1.jpg) */
export const RENTAL_MONTHLY: { count: number; other: number; ours: number }[] = [
  [30000, 25000], [35000, 29000], [40000, 33000], [48000, 38000],
  [59000, 47000], [67000, 52000], [74000, 57000], [82000, 62000],
  [93000, 77000], [101000, 82000], [108000, 91000], [116000, 97000],
  [124000, 102000], [132000, 107000], [139000, 112000], [147000, 118000],
].map(([other, ours], i) => ({ count: i + 1, other, ours }));

/** 렌탈 서비스 진행 과정 5단계 (원본 Service 1~5 — 설명 문구는 원본에 없음) */
export const RENTAL_STEPS = ["전화상담", "신청서작성", "본인인증", "설치일정조율", "설치완료"];

/** 렌탈 제휴 브랜드 (원본 홈 2024/12/ 로고 이미지 5종 → public/images/rental-partners/<file>.webp)
 *  기존 회사 제휴. 화면은 LEGACY.partners 일 때만 */
export const RENTAL_PARTNERS = [
  { name: "KT", file: "kt" },
  { name: "SK텔레콤", file: "sk" },
  { name: "ADT캡스", file: "adt" },
  { name: "LG U+", file: "lgu" },
  { name: "딜라이브", file: "dlive" },
];

/* ------------------------------------------------------------------ */
/* AS 수리                                                             */
/* ------------------------------------------------------------------ */
export const AS_SERVICES = [
  { title: "출장수리", img: "2024/06/CK_wm483786-scaled.jpg" },
  { title: "긴급점검", img: "2024/06/CK_cm080944170_l-1.jpg" },
  { title: "고장진단", img: "2024/06/CK_cm08437643_l.jpg" },
  { title: "노후장비교체", img: "2024/06/CK_cm080982294_l.jpg" },
  { title: "유지보수", img: "2024/06/CK_ti219a8508_l-e1717386668787.jpg" },
];

/**
 * AS 고객 고민 4가지 (원본 "CCTV AS 이런 문제로 고민해보신 적 있으신가요?")
 * - title 은 원본 그대로, desc 는 고객 입장 공감 문구(신규 작성, \n = 줄바꿈), icon 은 AsTab 의 인라인 SVG 키
 */
export const AS_WORRIES = [
  { title: "설치업체 책임회피", desc: "고장 났는데 설치 업체는\n'우리 책임 아니다'만 반복해요", icon: "shield" },
  { title: "시공사 조작미숙", desc: "사용법을 물어봐도\n시공 기사님도 잘 모르세요", icon: "tool" },
  { title: "시공사 연락두절", desc: "AS 요청 전화를 해도 받지 않아요", icon: "phone" },
  { title: "설치업체 불친절", desc: "문의할 때마다 불친절한 응대에 마음이 상해요", icon: "chat" },
] as const;

/**
 * AS 핵심 강점 (원본 강점 9가지 중 AS 관련만 발췌)
 * TODO: 신규 회사 정책 확인 — 24시간 이내 방문 / 무상 AS 1년 / 1:1 담당자는 기존 회사 정책 수치
 * - 3번 원문 "전국 인프라 구성으로 어디든 설치가 가능" 은 신규 회사가 단정할 수 없는 실적이라 교체
 */
export const AS_STRENGTHS = [
  { title: ["의뢰 후 24시간 이내", "방문 진단 및 수리"], img: "2024/03/017.png" },
  { title: ["당사 설치 시", "모든 부품 무상 AS 1년"], img: "2024/03/010.png" },
  { title: ["타사 설치 제품도", "책임지고 수리"], img: "2024/03/011.png" },
  { title: ["1:1 유지 보수", "담당자 배정"], img: "2024/03/015.png" },
];

/* ------------------------------------------------------------------ */
/* CCTV + 스피커                                                       */
/* ------------------------------------------------------------------ */
/** 원본 배너(2026/07/KakaoTalk_Photo_2026-07-02-17-32-14.jpg) 하단 혜택 3가지 */
export const SPEAKER_BENEFITS = [
  { label: "시간 단축", desc: ["동시 작업으로", "공사 기간 단축"] },
  { label: "비용 절감", desc: ["중복되는", "공사비용 절약"] },
  { label: "통합 관리", desc: ["일괄 관리로", "유지보수 편의성"] },
];

/** 원 단위 콤마 */
export function formatWon(n: number) {
  return n.toLocaleString("ko-KR");
}
