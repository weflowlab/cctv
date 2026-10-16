/**
 * 견적 계산기 데이터 & 계산 로직
 * - 질문 틀·선택지(평수/기둥·칸막이/추가 공간)와 추천 대수 계산식은 keeper calculatorData 를 그대로 옮김.
 *   업종 질문은 PLACES(공간 종류)로, 외부 공간 질문은 "실내 위주 / 실외 포함"(→ 설치환경 placement)으로,
 *   마지막에 화소 질문을 추가.
 * - 상담폼 연결: buildContactHref(쿼리 생성) / parseQuoteQuery(쿼리 해석) — /contact 자동 채움에서 사용
 */
import { PLACES, type PlaceSlug } from "@/lib/site";
import { INSTALL_PRICES, RENTAL_MONTHLY, formatWon, type Placement, type Resolution } from "@/components/service/data";

export const MIN_COUNT = 1;
export const MAX_COUNT = 16;

export type QuestionKey = "place" | "area" | "placement" | "pillar" | "extra" | "resolution";
/** 폼 상태 — 선택 전은 null */
export type QuoteData = Record<QuestionKey, string | null>;

export const INITIAL_DATA: QuoteData = {
  place: null,
  area: null,
  placement: null,
  pillar: null,
  extra: null,
  resolution: null,
};

export type Answer = { value: string; label: string; desc?: string };
export type Question = {
  key: QuestionKey;
  /** 결과 요약에 쓰는 짧은 이름 */
  short: string;
  label: string;
  answers: Answer[];
  /** 선택지 그리드 열 (모바일 / PC) */
  cols: string;
};

/** STEP 01 ~ 06 */
export const QUESTIONS: Question[] = [
  {
    key: "place",
    short: "공간",
    label: "어떤 공간에 설치하시나요?",
    answers: PLACES.map((p) => ({ value: p.slug, label: p.name, desc: p.includes.join("·") })),
    cols: "grid-cols-2 lg:grid-cols-3",
  },
  {
    key: "area",
    short: "평수",
    label: "공간 규모가 어떻게 되시나요?",
    answers: [
      { value: "LESS_10", label: "10평 미만" },
      { value: "MORE_10_LESS_20", label: "10 ~ 20평" },
      { value: "MORE_20_LESS_30", label: "20 ~ 30평" },
      { value: "MORE_30_LESS_40", label: "30 ~ 40평" },
      { value: "MORE_40_LESS_50", label: "40 ~ 50평" },
      { value: "MORE_50", label: "50평 이상" },
    ],
    cols: "grid-cols-2 lg:grid-cols-3",
  },
  {
    key: "placement",
    short: "설치 환경",
    label: "테라스·마당·주차장 등 외부 공간도 촬영하시나요?",
    answers: [
      { value: "indoor", label: "실내 위주", desc: "실내 돔 카메라" },
      { value: "outdoor", label: "실외 포함", desc: "실외 방수 카메라 포함" },
    ],
    cols: "grid-cols-2",
  },
  {
    key: "pillar",
    short: "기둥·칸막이",
    label: "내부에 시야를 가리는 기둥이나 칸막이 구조물이\n몇 개 정도 있나요?",
    answers: [
      { value: "ZERO", label: "없음" },
      { value: "ONE_TO_TWO", label: "1 ~ 2개" },
      { value: "THREE_TO_FOUR", label: "3 ~ 4개" },
      { value: "FIVE_OVER", label: "5개 이상" },
    ],
    cols: "grid-cols-2 lg:grid-cols-4",
  },
  {
    key: "extra",
    short: "추가 공간",
    label: "창고, 휴게실, 뒷문 등 추가로 살펴볼 공간이\n몇 군데 있나요?",
    answers: [
      { value: "ZERO", label: "없음" },
      { value: "ONE", label: "1곳" },
      { value: "TWO", label: "2곳" },
      { value: "THREE_OVER", label: "3곳 이상" },
    ],
    cols: "grid-cols-2 lg:grid-cols-4",
  },
  {
    key: "resolution",
    short: "화소",
    label: "어떤 화질을 원하시나요?",
    answers: [
      { value: "2MP", label: "200만 화소", desc: "FULL HD · 합리적인 가격" },
      { value: "5MP", label: "500만 화소", desc: "더 선명하게 · 얼굴·번호판 식별" },
    ],
    cols: "grid-cols-2",
  },
];

/** 선택 값 → 라벨 */
export function answerLabel(key: QuestionKey, value: string | null) {
  return QUESTIONS.find((q) => q.key === key)?.answers.find((a) => a.value === value)?.label ?? "";
}

/**
 * 추천 CCTV 대수 (keeper calculatorResultStore.setFormResult 계산식)
 * - 출입구 1 + 내부: 평수별 0~3 + 기둥·칸막이 0~3
 * - 매장만 계산대 +1 (keeper 는 매장 전용 계산기라 항상 더했지만, 여기선 공간 종류가 여러 개)
 * - 외부 공간(실외 포함) +1, 추가 공간 0~3
 * - 합계를 1~16 으로 제한
 */
export function calcRecommendedCount(data: QuoteData) {
  let total = 1; // 출입구
  if (data.place === "store") total += 1; // 계산대
  total += { LESS_10: 0, MORE_10_LESS_20: 1, MORE_50: 3 }[data.area ?? ""] ?? 2; // 20~50평은 2
  if (data.placement === "outdoor") total += 1;
  total += { ONE_TO_TWO: 1, THREE_TO_FOUR: 2, FIVE_OVER: 3 }[data.pillar ?? ""] ?? 0;
  total += { ONE: 1, TWO: 2, THREE_OVER: 3 }[data.extra ?? ""] ?? 0;
  return Math.min(Math.max(total, MIN_COUNT), MAX_COUNT);
}

/* ------------------------------------------------------------------ */
/* 상담폼 연결 쿼리 (/contact?service=rental&count=6&place=store&res=500&env=indoor) */
/* ------------------------------------------------------------------ */
export type QuoteService = "rental" | "install";

export type QuoteQuery = {
  service: QuoteService;
  count: number;
  place: PlaceSlug;
  resolution: Resolution;
  /** 설치 환경 — 일시납 금액 계산에 필요 */
  placement: Placement;
};

const RES_TO_PARAM: Record<Resolution, string> = { "2MP": "200", "5MP": "500" };

export function buildContactHref(q: QuoteQuery) {
  const params = new URLSearchParams({
    service: q.service,
    count: String(q.count),
    place: q.place,
    res: RES_TO_PARAM[q.resolution],
    env: q.placement,
  });
  return `/contact?${params.toString()}`;
}

/**
 * /contact 쿼리 해석 → 서비스 + 전달 내용 요약 문구
 * - 값이 하나도 올바르지 않으면 null (기존 빈 폼 그대로)
 * - 예) "[견적 계산기] 공간: 매장 / CCTV 6대 / 500만 화소 / 렌탈 월 57,000원"
 *       "[견적 계산기] 공간: 사무실 / CCTV 3대 / 200만 화소 / 실내 / 일시납 ○○원(부가세 별도)"
 */
export function parseQuoteQuery(params: { get(name: string): string | null }) {
  const serviceRaw = params.get("service");
  const service: QuoteService | null = serviceRaw === "rental" || serviceRaw === "install" ? serviceRaw : null;
  const countNum = Number(params.get("count"));
  const count = Number.isInteger(countNum) && countNum >= MIN_COUNT && countNum <= MAX_COUNT ? countNum : null;
  const place = PLACES.find((p) => p.slug === params.get("place"));
  const res = params.get("res");
  const resLabel = res === "200" ? "200만 화소" : res === "500" ? "500만 화소" : null;
  const resolution: Resolution | null = res === "200" ? "2MP" : res === "500" ? "5MP" : null;
  const envRaw = params.get("env");
  const placement: Placement | null = envRaw === "indoor" || envRaw === "outdoor" ? envRaw : null;

  // 서비스 값만 있고 견적 정보가 없으면(하단 CTA·비용 비교 버튼 등) 요약 문구 없이 서비스 칩만 선택
  if (!place && !count && !resLabel && !placement) return service ? { service, message: "" } : null;

  const parts: string[] = [];
  if (place) parts.push(`공간: ${place.name}`);
  if (count) parts.push(`CCTV ${count}대`);
  if (resLabel) parts.push(resLabel);
  if (placement) parts.push(placement === "indoor" ? "실내" : "실외 포함");
  if (service === "rental") parts.push(count ? `렌탈 월 ${formatWon(RENTAL_MONTHLY[count - 1].ours)}원` : "렌탈");
  if (service === "install") {
    // 1~4대 + 화소·환경이 있으면 패키지 금액까지, 5대 이상은 별도 견적
    const price = count && resolution && placement ? INSTALL_PRICES[resolution][placement][count - 1] : undefined;
    parts.push(price ? `일시납 ${formatWon(price)}원(부가세 별도)` : count && count > 4 ? "일시납 설치(5대 이상 별도 견적)" : "일시납 설치");
  }

  if (!service && parts.length === 0) return null;
  return { service, message: parts.length ? `[견적 계산기] ${parts.join(" / ")}` : "" };
}
