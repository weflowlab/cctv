/**
 * Neon(Postgres) 연결 — 테이블 접근은 lib/cases.ts · faqs.ts · inquiries.ts · pageViews.ts 를 통해서만.
 *
 * 지연 초기화: 모듈 로드 시점이 아니라 실제 요청 시점에 연결을 만든다.
 * (next build 가 env 없이 모듈을 평가해도 throw 하지 않도록)
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/** DATABASE_URL 이 설정돼 있는지 — 없으면 공개 페이지는 초기(seed) 데이터로 대신 보여준다 */
export function hasDb(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql(): NeonQueryFunction<false, false> {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Neon 환경변수(DATABASE_URL)가 설정되지 않았습니다.");
  client = neon(url);
  return client;
}

/** timestamptz 는 Date 로 오므로 ISO 문자열로 맞춘다 (앱 전체가 문자열을 기대한다) */
export function toIso(v: unknown): string {
  return v instanceof Date ? v.toISOString() : String(v ?? "");
}
