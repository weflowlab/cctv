/**
 * 시공사례 목록 → 상세 → [← 시공사례 목록] 을 "뒤로가기" 처럼 쓰기 위한 기록 (sessionStorage)
 * - 목록(/cases, /cases/place/<slug>)에서 상세 링크를 누를 때 { list: 목록 주소, to: 상세 주소 } 를 남긴다.
 * - 상세의 [← 시공사례 목록] 은 지금 주소가 기록의 to 와 같으면 history.back() — 보던 탭·스크롤 위치로 복귀.
 *   아니면(직접 접속·홈에서 들어옴·비슷한 사례로 이동) 기록된 목록 주소 또는 /cases 로 이동.
 */
export const CASE_BACK_KEY = "cases:back";

export type CaseBack = { list: string; to: string };

export function readCaseBack(): CaseBack | null {
  try {
    const raw = sessionStorage.getItem(CASE_BACK_KEY);
    return raw ? (JSON.parse(raw) as CaseBack) : null;
  } catch {
    return null;
  }
}

export function writeCaseBack(value: CaseBack) {
  try {
    sessionStorage.setItem(CASE_BACK_KEY, JSON.stringify(value));
  } catch {
    // 저장 불가(사생활 보호 모드 등) — 일반 링크로 동작
  }
}
