/**
 * sessionStorage · localStorage 안전 래퍼 (weflow 이식)
 * 시크릿 모드·인앱 브라우저(인스타·카톡)에서는 저장소를 읽기만 해도 예외가 난다.
 * 저장소가 없어도 하던 일은 계속된다 — 읽기는 null, 쓰기는 조용히 넘어간다.
 */
type Kind = "session" | "local";

function store(kind: Kind): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export function readStore(kind: Kind, key: string): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStore(kind: Kind, key: string, value: string): void {
  try {
    store(kind)?.setItem(key, value);
  } catch {
    /* 저장이 막힌 브라우저 — 기록만 못 남길 뿐 */
  }
}

export function removeStore(kind: Kind, key: string): void {
  try {
    store(kind)?.removeItem(key);
  } catch {
    /* 위와 같다 */
  }
}
