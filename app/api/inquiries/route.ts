import { createInquiry, parseInquiry } from "@/lib/inquiries";
import { checkRateLimit, clientIp, detectDevice, DEVICE_LABEL } from "@/lib/requestInfo";

/**
 * POST /api/inquiries — 상담 신청 폼 접수 (공개)
 * 폼 화면을 거치지 않고 바로 부를 수 있는 창구라 값 검사·허니팟·횟수 제한을 여기서 한다.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "요청 형식이 잘못되었습니다." }, { status: 400 });
  }

  const parsed = parseInquiry(body);
  // 허니팟에 걸린 봇 — 저장하지 않고 성공처럼 답한다 (거절하면 그 칸을 비워 다시 보낸다)
  if (parsed.kind === "trap") return Response.json({ ok: true }, { status: 201 });
  if (parsed.kind === "reject") return Response.json({ ok: false, error: parsed.error }, { status: 400 });

  // 넉넉하게 — 이동통신은 여러 사람이 같은 IP 로 나가는 경우가 많아 조이면 진짜 문의가 먼저 막힌다
  const limited = await checkRateLimit("inquiry", clientIp(req), { perMinute: 3, perHour: 20 });
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  const device = DEVICE_LABEL[detectDevice(req.headers.get("user-agent") || "")];
  await createInquiry({ ...parsed.value, device });
  return Response.json({ ok: true }, { status: 201 });
}
