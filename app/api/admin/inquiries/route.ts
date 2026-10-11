import { denyUnlessAdmin } from "@/lib/adminAuth";
import { listInquiries } from "@/lib/inquiries";

/** GET /api/admin/inquiries — 전체 문의 (최신순) */
export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return Response.json(await listInquiries());
}
