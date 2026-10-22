/**
 * 상담 신청 알림 메일 — 네이버 SMTP (nodemailer)
 *
 * 환경변수 (Vercel → Settings → Environment Variables, 로컬은 .env.local)
 * - NAVER_SMTP_USER   : 보내는 네이버 주소 (예: guy81guy@naver.com) — 네이버 메일 환경설정에서 IMAP/SMTP "사용함" 필요
 * - NAVER_SMTP_PASS   : 네이버 "애플리케이션 비밀번호" 12자리 (2단계 인증 계정은 로그인 비밀번호로는 안 됨)
 * - INQUIRY_NOTIFY_TO : 알림 받을 주소, 여러 개면 쉼표로 구분. 비우면 NAVER_SMTP_USER 로 보낸다
 *
 * - 셋 중 USER·PASS 가 없으면 조용히 건너뛴다 (메일 설정 전에도 상담 접수는 정상 동작)
 * - 발송 실패는 로그만 남기고 삼킨다 — 메일이 안 가도 상담 신청은 이미 DB 에 저장돼 관리자에서 볼 수 있다
 * - 네이버 계정에 "해외 로그인 차단"이 켜져 있어, 서버(Vercel 함수)는 서울 리전(icn1)에서 돌아야 한다 (vercel.json regions)
 * - 2026-10-22 작성
 */
import nodemailer from "nodemailer";
import type { Inquiry } from "./inquiries";
import { SITE } from "./site";

const SMTP_HOST = "smtp.naver.com";
const SMTP_PORT = 465; // SSL

/** HTML 본문에 넣을 값 이스케이프 (사용자가 입력한 문자열이 메일 HTML 로 해석되지 않게) */
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** 접수 시각 → "2026. 10. 22. 오후 3:05" (한국 시간) */
function koTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("ko-KR", { timeZone: "Asia/Seoul", dateStyle: "medium", timeStyle: "short" });
}

/** 새 상담 신청 알림 메일 보내기 — 설정이 없거나 실패해도 throw 하지 않는다 */
export async function sendInquiryNotification(inquiry: Inquiry): Promise<void> {
  const user = process.env.NAVER_SMTP_USER?.trim();
  const pass = process.env.NAVER_SMTP_PASS?.trim();
  if (!user || !pass) return;
  const to = process.env.INQUIRY_NOTIFY_TO?.trim() || user;

  const rows: [string, string][] = [
    ["성함", inquiry.name],
    ["연락처", inquiry.phone],
    ["희망 서비스", inquiry.services || "-"],
    ["희망 서비스일", inquiry.wishDate || "-"],
    ["전달 내용", inquiry.message || "-"],
    ["유입 경로", inquiry.source || "-"],
    ["신청 기기", inquiry.device || "-"],
    ["접수 시각", koTime(inquiry.createdAt)],
  ];

  const text = [`[${SITE.name}] 새 상담 신청이 접수되었습니다.`, "", ...rows.map(([k, v]) => `${k}: ${v}`), "", `관리자에서 보기: ${SITE.url}/admin/inquiries`].join("\n");

  const html = `
<div style="font-family:-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;max-width:560px;color:#222">
  <p style="margin:0 0 4px;font-size:13px;color:#00838a;font-weight:700">${esc(SITE.name)}</p>
  <h2 style="margin:0 0 16px;font-size:20px;color:#0a2d5b">새 상담 신청이 접수되었습니다</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><th style="text-align:left;width:110px;padding:10px 12px;background:#f4f7fb;border-bottom:1px solid #e6ebf2;color:#555;font-weight:600;vertical-align:top">${esc(k)}</th>` +
          `<td style="padding:10px 12px;border-bottom:1px solid #e6ebf2;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="margin:20px 0 0">
    <a href="${esc(SITE.url)}/admin/inquiries" style="display:inline-block;padding:12px 20px;background:#0a2d5b;color:#fff;text-decoration:none;border-radius:8px;font-weight:700">관리자에서 보기</a>
  </p>
</div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: { user, pass },
      // 서버리스 함수 안에서 오래 붙잡지 않게
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transporter.sendMail({
      // 네이버 SMTP 는 보내는 주소가 로그인 계정과 같아야 한다
      from: { name: `${SITE.name} 홈페이지`, address: user },
      to,
      subject: `[${SITE.name}] 새 상담 신청 — ${inquiry.name} (${inquiry.services || "서비스 미선택"})`,
      text,
      html,
    });
  } catch (err) {
    console.error("[mailer] 상담 신청 알림 메일 발송 실패:", err instanceof Error ? err.message : err);
  }
}
