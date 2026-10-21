/**
 * 약관 본문 구조화 데이터 타입
 * - components/terms/data/{service,personal}.ts 가 이 타입을 따릅니다. (위치정보 약관은 2026-10-21 삭제 — 위치정보를 수집하지 않음)
 * - 원문은 keeper.ceo 가 Word / Google Docs 에서 export 한 HTML 이며, 파이썬 스크립트로 블록 단위로 추출했습니다.
 */

/** 텍스트 조각: 일반 문자열 또는 굵은 글씨({ b }) */
export type TermsRun = string | { b: string };

/** 표 셀: 셀 안의 문단(줄) 목록 + 병합 정보 */
export type TermsCell = {
  lines: TermsRun[][];
  rowSpan?: number;
  colSpan?: number;
};

export type TermsBlock =
  /** 원문의 빈 문단(간격) */
  | { t: "gap" }
  /** 제목: level 1 = 문서 제목, 2 = 대제목(굵게+밑줄), 3 = 소제목(밑줄) */
  | { t: "h"; level: 1 | 2 | 3; align?: "center"; runs: TermsRun[] }
  /** 일반 문단 (indent: 들여쓰기 단계) */
  | { t: "p"; align?: "center"; indent?: number; runs: TermsRun[] }
  /** 목록 항목: n 이 있으면 번호형, 아니면 marker(•, -, ● 등) */
  | { t: "li"; level: number; n?: number; marker?: string; align?: "center"; runs: TermsRun[] }
  /** 표: head 가 true 면 첫 행을 머리행으로 렌더 */
  | { t: "table"; head: boolean; rows: TermsCell[][] };
