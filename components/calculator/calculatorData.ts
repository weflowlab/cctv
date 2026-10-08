/**
 * 견적계산기 데이터 & 계산 로직
 * - 원본 page 청크(app/calculator/page-*.js)의 질문/선택지 정의와
 *   레이아웃 청크의 calculatorStore / calculatorResultStore.setFormResult 를 그대로 옮김.
 */

/* ---------- 선택지 라벨 (value → label) ---------- */
export const SECTOR = {
  RESTAURANT: "요식업",
  BEAUTY: "미용",
  ACADEMY: "학원",
  SPORTS: "스포츠",
  MEDICAL: "의료",
  OTHER: "기타",
} as const;
export const AREA = {
  LESS_10: "10평 미만",
  MORE_10_LESS_20: "10 ~ 20평",
  MORE_20_LESS_30: "20 ~ 30평",
  MORE_30_LESS_40: "30 ~ 40평",
  MORE_40_LESS_50: "40 ~ 50평",
  MORE_50: "50평 이상",
} as const;
export const EXTERNAL = { EXIST: "있음", NOT_EXIST: "없음" } as const;
export const PILLAR = {
  ZERO: "없음",
  ONE_TO_TWO: "1 ~ 2개",
  THREE_TO_FOUR: "3 ~ 4개",
  FIVE_OVER: "5개 이상",
} as const;
export const MONITORING = { ZERO: "없음", ONE: "1곳", TWO: "2곳", THREE_OVER: "3곳 이상" } as const;

export type QuestionKey = "sector" | "area" | "external" | "pillar" | "monitoringNum";

/** 폼 상태 — 선택 전은 null */
export type CalculatorData = Record<QuestionKey, string | null>;

export const INITIAL_DATA: CalculatorData = {
  sector: null,
  area: null,
  external: null,
  pillar: null,
  monitoringNum: null,
};

/** 원본 store 의 formLength (= data 키 개수, savedLabels 포함 6) — 다음 단계 자동 펼침 범위 판단용 */
export const FORM_LENGTH = 6;

/** 펼침 상태 초기값 — index 1(STEP 01)만 열려 있음 (원본 b 배열) */
export const INITIAL_EXPANDED = [false, true, false, false, false, false, false, false];

const toAnswers = (obj: Record<string, string>) =>
  Object.entries(obj).map(([value, label]) => ({ value, label }));

export type Question = {
  key: QuestionKey;
  label: string;
  labels: Record<string, string>;
  answers: { value: string; label: string }[];
  /** 업종 단계만 아이콘 사용 */
  icons?: string[];
};

/** STEP 01 ~ 05 질문 목록 */
export const QUESTIONS: Question[] = [
  {
    key: "sector",
    label: "업종을 선택해 주세요.",
    labels: SECTOR,
    answers: toAnswers(SECTOR),
    icons: ["food", "beauty", "academy", "sports", "medical", "others"],
  },
  { key: "area", label: "매장 규모와 형태가 어떻게 되시나요?", labels: AREA, answers: toAnswers(AREA) },
  {
    key: "external",
    label: "매장에 테라스 또는 별도 외부 공간이 있나요?",
    labels: EXTERNAL,
    answers: toAnswers(EXTERNAL),
  },
  {
    key: "pillar",
    label: "매장 내부에 시야를 가리는 기둥이나 칸막이 구조물이 몇 개 정도 있나요?",
    labels: PILLAR,
    answers: toAnswers(PILLAR),
  },
  {
    key: "monitoringNum",
    label: "창고, 직원 휴게실, 뒷문 등 추가로 모니터링이 필요한 공간이 몇 군데 있나요?",
    labels: MONITORING,
    answers: toAnswers(MONITORING),
  },
];

/**
 * 추천 CCTV 대수 계산 (원본 calculatorResultStore.setFormResult)
 * - 출입구(door): 실내 1 (+ 외부 공간 있으면 실외 1)
 * - 계산대(pos): 1
 * - 매장 내부(indoor): 평수별 1~3 (10평 미만 0) + 기둥/칸막이 0~3
 * - 추가 공간(location): 0~3
 * @returns [출입구, 계산대, 내부, 추가공간] 위치별 대수 배열 (URL 의 cctvs 파라미터로 사용)
 */
export function calcRecommendedCctvs(data: CalculatorData) {
  const n = {
    door: { cctvOutdoor: 0, cctvIndoor: 0 },
    pos: { cctvIndoor: 0 },
    indoor: { cctvIndoor: 0 },
    location: { cctvIndoor: 0 },
  };

  switch (data.area) {
    case "LESS_10":
      n.door.cctvIndoor += 1;
      n.pos.cctvIndoor += 1;
      break;
    case "MORE_10_LESS_20":
      n.door.cctvIndoor += 1;
      n.pos.cctvIndoor += 1;
      n.indoor.cctvIndoor += 1;
      break;
    case "MORE_50":
      n.door.cctvIndoor += 1;
      n.pos.cctvIndoor += 1;
      n.indoor.cctvIndoor += 3;
      break;
    default: // 20~50평
      n.door.cctvIndoor += 1;
      n.pos.cctvIndoor += 1;
      n.indoor.cctvIndoor += 2;
  }

  if (data.external === "EXIST") n.door.cctvOutdoor += 1;

  switch (data.pillar) {
    case "ONE_TO_TWO":
      n.indoor.cctvIndoor += 1;
      break;
    case "THREE_TO_FOUR":
      n.indoor.cctvIndoor += 2;
      break;
    case "FIVE_OVER":
      n.indoor.cctvIndoor += 3;
      break;
  }

  switch (data.monitoringNum) {
    case "ONE":
      n.location.cctvIndoor += 1;
      break;
    case "TWO":
      n.location.cctvIndoor += 2;
      break;
    case "THREE_OVER":
      n.location.cctvIndoor += 3;
      break;
  }

  return [
    n.door.cctvIndoor + n.door.cctvOutdoor,
    n.pos.cctvIndoor,
    n.indoor.cctvIndoor,
    n.location.cctvIndoor,
  ];
}

/** 결과 임시 저장 키 (원본 localStorage "calculator_result") */
export const CALCULATOR_RESULT_KEY = "calculator_result";
