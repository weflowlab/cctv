/**
 * /plan (구매) 페이지 데이터/상수
 * - 원본 page 청크(app/plan/page-*.js)와 공용 모듈(13808, 25021)에서 그대로 옮긴 값들.
 */

/** 구매 수량 범위 (원본 P = {MIN:2, MAX:16}) — 초기값 4대 */
export const CAM_RANGE = { MIN: 2, MAX: 16, INITIAL: 4 } as const;

/** CCTV 1대 공급가 (원본 Id.CCTV = 360,000원) → VAT 10% 포함 396,000원 */
export const CCTV_PRICE = 360000;
export const CCTV_PRICE_VAT = CCTV_PRICE * 1.1;

/** 수량별 키퍼 총액 (원본 ae 테이블, index = 대수) — 8대부터 단가 할인 적용 */
export const KEEPER_TOTAL_BY_COUNT = [
  0, 0, 792000, 1188000, 1584000, 1980000, 2376000, 2772000, 3009600, 3385800, 3762000, 4138200,
  4276800, 4633200, 4989600, 5346000, 5702400,
];

/** 수량별 렌탈업체 월 렌탈료 (원본 vC 테이블) — 화면에는 36개월 합계로 표시 */
export const RENTAL_MONTHLY_BY_COUNT = [
  0, 0, 39600, 46000, 55000, 69000, 77000, 88000, 95000, 105000, 111000, 122000, 132000, 143000,
  154000, 165000, 176000,
];

/** 금액 포맷 (원본 OD = toLocaleString("ko-KR")) */
export const formatWon = (n: number) => n.toLocaleString("ko-KR");

/** 외부 링크 (원본 25021 모듈) */
export const NAVER_STORE_URL = "https://smartstore.naver.com/shopmanager_keeper/products/11980485529";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hanwha.keeper";
export const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%ED%82%A4%ED%8D%BC-%EB%A7%A4%EC%9E%A5%EA%B4%80%EB%A6%AC-%EC%86%94%EB%A3%A8%EC%85%98/id6504780897";
/** PC 에서 QR 로 보여주는 앱 다운로드(airbridge) 주소 */
export const APP_DOWNLOAD_URL = "https://keeper.airbridge.io";

/** 블로그 카드 데이터 */
export type BlogPost = { customUrl: string; title: string; subTitle: string };

/**
 * 하단 "매장 관리의 모든 것" 블로그 슬라이더 데이터
 * - 원본은 API(/post?limit=50&categoryId=1)로 받아
 *   [첫 글, 고정 3개(설치 위치/체크리스트/설치 가격), 나머지...] 순으로 정렬한다.
 * - 여기서는 API 응답 스냅샷 일부를 같은 순서로 하드코딩.
 *   // TODO: API 연동 (getBlogPostHomepage)
 * - PC: 전체를 슬라이더로, 모바일: 1~3번(고정 3개)만 세로 목록으로 노출
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    customUrl: "store-accident-prevention-cctv",
    title: "매장에서 고객이 넘어졌다면? 낙상 사고 배상 책임과 CCTV 증거 확보 가이드",
    subTitle: "매장에서 고객 안전 사고 발생 시 사업주의 법적 책임은? CCTV 증거 확보와 영업배상책임보험으로 배상 리스크 줄이는 실무 가이드, 한화비전 키퍼(Keeper)가 알려드려요.",
  },
  {
    customUrl: "cctv-installation-location-blind-spot",
    title: "CCTV 설치 위치 고민 끝! 설치 필수 구역 4곳과 사각지대 최소화 하는 팁",
    subTitle: "매장 CCTV, 어디에 설치해야 할까요? 필수 설치 위치 4곳과 업종별 팁, CCTV 사각지대 원인 및 최소화 방법까지 총정리! 사장님들의 CCTV 설치 고민을 해결해 드립니다.",
  },
  {
    customUrl: "cctv-installation-checklist",
    title: "CCTV 설치 전, 사장님 필수 체크리스트! 설치 당일에 반드시 준비해야 할 것은?",
    subTitle: "매장 CCTV 설치, 아직도 막막하신가요? 키퍼 설치 전문가가 CCTV 설치 문의 전부터 설치 당일, 설치 후 안내판 부착까지 사장님 필수 체크리스트를 알려드립니다. 시간과 비용을 아끼고 성공적인 CCTV 설치를 경험하세요!",
  },
  {
    customUrl: "cctv-installation-cost-guide",
    title: "CCTV 설치 가격, 어떤 기준으로 결정되나요?",
    subTitle: "CCTV 설치 가격, 왜 천차만별일까요? 카메라, 환경, 배선, 기능 등 가격 결정 요인과 설치 난이도(상/중/하)를 알아보고, 셀프/플랫폼/업체/키퍼 비교를 통해 내 가게에 맞는 합리적인 설치 방법을 찾아보세요.",
  },
  {
    customUrl: "delivery-fee-fixed-cost-reduction",
    title: "배달 수수료 9.8% 시대, 지금 당장 줄일 수 있는 매장 고정비는 따로 있다?",
    subTitle: "배달 수수료 9.8% 시대, 팔수록 손해라면? 통제 불가능한 수수료 대신 당장 줄일 수 있는 매장 고정비 절감법을 공개합니다. 월 렌탈료를 0원으로 만드는 자산화 전략과 억울한 클레임을 방어하는 한화비전 키퍼의 3년 무상 보증 혜택을 지금 확인하세요.",
  },
  {
    customUrl: "unmanned-laundromat-startup-cost-security",
    title: "무인 빨래방 창업 필수 가이드 – 도난·취식·야간 사고 없애는 무인 보안 시스템 구축법",
    subTitle: "무인 빨래방 창업, 렌탈료 족쇄에서 벗어나세요! 소액 절도 53% 증가 시대에 3년 무상 보증 한화비전 키퍼로 범죄 예방과 고정비 절감을 동시에 잡는 스마트 경영 전략을 공개합니다. 3040 직장인부터 5060 은퇴자까지, 밤잠 설치지 않고 수익을 지키는 24시간 원격 보안 가이드를 확인하세요.",
  },
  {
    customUrl: "cctv-installation-delivery-accident-evidence-keeper",
    title: "억울한 배달 사고 증거 확보부터 확실한 해결까지, 사장님 손해 막아주는 CCTV",
    subTitle: "\"음식이 안 왔어요\" 한마디에 억울하게 당하셨나요? 배달 사고 증거 확보부터 확실한 해결까지, 사장님의 손해를 막아주는 한화비전 키퍼 CCTV. 렌탈 대신 소유하는 합리적인 선택으로 월 고정비 0원, 3분 만에 분쟁 종결하는 비결을 확인하세요.",
  },
  {
    customUrl: "why-buy-cctv-not-rental",
    title: "정수기는 렌탈해도, CCTV는 렌탈하지 마세요: cctv 구매 설치가 필요한 이유",
    subTitle: "CCTV 렌탈 vs 구매 총 비교! 장기 사용 시 구매가 저렴. 케어 서비스 없는 렌탈은 손해? 매장 CCTV 설치 비용, 무이자 할부, 투명한 가격 비교로 현명한 선택하세요",
  },
  {
    customUrl: "barrier-free-kiosk-mandatory-guide",
    title: "매장에서 키오스크 쓰고 계신 사장님 주목! ‘배리어프리 키오스크’ 설치가 의무화되었어요",
    subTitle: "배리어프리 키오스크 의무화 완벽 가이드! 우리 매장 적용 대상인지 확인하고, 최대 500만 원 정부 지원금 받는 방법부터 실전 대응 전략까지 모든 정보를 한눈에 확인하세요.",
  },
  {
    customUrl: "slow-cctv-app-solution-keeper",
    title: "긴급 상황 대비! 버벅이는 스마트폰 CCTV 앱, 원인부터 앱 추천까지 총 정리",
    subTitle: "CCTV 앱이 느리고 버벅이는 이유와 안전한 어플 알아보세요. 한화비전 키퍼는 카메라부터 앱까지 직접 개발한 통합 솔루션으로 버튼 클릭 즉시 영상 확인이 가능합니다. 스마트폰 CCTV 최적화의 모든 것!",
  },
];
