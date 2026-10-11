/**
 * 상담 신청(문의) — inquiries 테이블 읽기·쓰기 + 접수 값 검사
 * - 공개: /contact 폼 → POST /api/inquiries → parseInquiry() → createInquiry()
 * - 관리자: 목록 · 상태 변경(대기/진행중/완료) · 삭제 · 엑셀 내보내기
 */
import { getSql, toIso } from "./db";
import { ensureSchema } from "./schema";

export type InquiryStatus = "pending" | "in_progress" | "done";

export interface Inquiry {
  id: string;
  status: InquiryStatus;
  name: string;
  phone: string;
  /** 선택한 서비스 (쉼표로 이어 붙인 문자열, 예: "CCTV 설치, CCTV 렌탈") */
  services: string;
  /** 희망 서비스일 "YYYY-MM-DD" (없으면 빈 문자열) */
  wishDate: string;
  message: string;
  /** 유입 경로 한 줄 — "네이버 광고 · 키워드: 매장cctv" / "네이버 검색" / "직접 유입" */
  source: string;
  /** 신청 기기 — 모바일 / 태블릿 / 데스크탑 */
  device: string;
  agree: boolean;
  createdAt: string;
}

export const STATUS_KO: Record<InquiryStatus, string> = { pending: "대기", in_progress: "진행중", done: "완료" };
const STATUSES = Object.keys(STATUS_KO) as InquiryStatus[];

function toInquiry(row: Record<string, unknown>): Inquiry {
  return {
    id: row.id as string,
    status: row.status as InquiryStatus,
    name: row.name as string,
    phone: row.phone as string,
    services: (row.services as string) || "",
    wishDate: (row.wish_date as string) || "",
    message: (row.message as string) || "",
    source: (row.source as string) || "",
    device: (row.device as string) || "",
    agree: Boolean(row.agree),
    createdAt: toIso(row.created_at),
  };
}

export async function listInquiries(): Promise<Inquiry[]> {
  await ensureSchema();
  const rows = await getSql()`SELECT * FROM inquiries ORDER BY created_at DESC`;
  return rows.map(toInquiry);
}

export async function createInquiry(input: Omit<Inquiry, "id" | "status" | "createdAt">): Promise<Inquiry> {
  await ensureSchema();
  const rows = await getSql()`
    INSERT INTO inquiries (name, phone, services, wish_date, message, source, device, agree)
    VALUES (${input.name}, ${input.phone}, ${input.services}, ${input.wishDate}, ${input.message},
            ${input.source}, ${input.device}, ${input.agree})
    RETURNING *`;
  return toInquiry(rows[0]);
}

/** 관리자 화면에서 바꾸는 값은 상태뿐 */
export async function setInquiryStatus(id: string, status: unknown): Promise<Inquiry | null> {
  if (!STATUSES.includes(status as InquiryStatus)) return null;
  await ensureSchema();
  const rows = await getSql()`UPDATE inquiries SET status = ${status as string} WHERE id = ${id} RETURNING *`;
  return rows.length ? toInquiry(rows[0]) : null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  await ensureSchema();
  const rows = await getSql()`DELETE FROM inquiries WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

/* ===================== 접수 값 검사 ===================== */

const SERVICE_OPTIONS = ["CCTV 설치", "CCTV 수리", "CCTV 렌탈", "CCTV+스피커"];

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * 폼 본문 → 저장할 값.
 * 인증이 없는 공개 창구라 폼을 거치지 않고 바로 부를 수 있다 — 화면 검사는 편의고, 실제 방어는 여기다.
 * - trap: 허니팟 칸(사람에게 안 보이는 website 칸)이 채워진 봇 요청 → 저장하지 않고 성공처럼 답한다
 */
export function parseInquiry(
  body: unknown,
): { kind: "ok"; value: Omit<Inquiry, "id" | "status" | "createdAt" | "device"> } | { kind: "trap" } | { kind: "reject"; error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  if (str(b.website, 200)) return { kind: "trap" };

  const name = str(b.name, 30);
  const phone = str(b.phone, 13);
  if (name.length < 2) return { kind: "reject", error: "성함을 입력해 주세요." };
  if (!/^01\d-\d{3,4}-\d{4}$/.test(phone)) return { kind: "reject", error: "연락처를 010-0000-0000 형식으로 입력해 주세요." };
  if (b.agree !== true) return { kind: "reject", error: "개인정보 수집 및 이용에 동의해 주세요." };

  const services = (Array.isArray(b.services) ? b.services : []).filter(
    (s): s is string => typeof s === "string" && SERVICE_OPTIONS.includes(s),
  );
  const wishDate = /^\d{4}-\d{2}-\d{2}$/.test(str(b.date, 10)) ? str(b.date, 10) : "";

  return {
    kind: "ok",
    value: {
      name,
      phone,
      services: services.join(", "),
      wishDate,
      message: str(b.message, 3000),
      source: str(b.source, 200),
      agree: true,
    },
  };
}
