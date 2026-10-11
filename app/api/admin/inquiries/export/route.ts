import * as XLSX from "xlsx";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { listInquiries, STATUS_KO } from "@/lib/inquiries";

/** GET /api/admin/inquiries/export — 문의 전체를 한글 열 이름의 엑셀(xlsx)로 */
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
    접수일: new Date(i.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "문의관리");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  const filename = `문의관리_${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  });
}
