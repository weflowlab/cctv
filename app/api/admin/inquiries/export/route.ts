import * as XLSX from "xlsx";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { listInquiries, STATUS_KO } from "@/lib/inquiries";

/** 한국시간(KST, UTC+9) "YYYY-MM-DD HH:MM" — 서버(Vercel)는 UTC 라 직접 9시간을 더해 만든다 */
function kst(iso: string | Date): string {
  return new Date(new Date(iso).getTime() + 9 * 3600 * 1000).toISOString().slice(0, 16).replace("T", " ");
}

/** GET /api/admin/inquiries/export — 문의 전체를 한글 열 이름의 엑셀(xlsx)로 (시각은 한국시간) */
export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;

  const rows = (await listInquiries()).map((i) => ({
    상태: STATUS_KO[i.status],
    이름: i.name,
    연락처: i.phone,
    서비스: i.services,
    희망일: i.wishDate,
    전달내용: i.message,
    유입: i.source,
    기기: i.device,
    접수일: kst(i.createdAt),
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "문의관리");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  const filename = `문의관리_${kst(new Date()).slice(0, 10)}.xlsx`;

  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
