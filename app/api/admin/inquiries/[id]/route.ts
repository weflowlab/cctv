import { denyUnlessAdmin } from "@/lib/adminAuth";
import { deleteInquiry, setInquiryStatus } from "@/lib/inquiries";

/** PATCH /api/admin/inquiries/:id — { status } 변경 */
export async function PATCH(req: Request, { params }: RouteContext<"/api/admin/inquiries/[id]">) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { status?: unknown };
  const updated = await setInquiryStatus(id, body.status);
  if (!updated) return Response.json({ ok: false, error: "항목을 찾을 수 없습니다." }, { status: 404 });
  return Response.json(updated);
}

/** DELETE /api/admin/inquiries/:id */
export async function DELETE(_req: Request, { params }: RouteContext<"/api/admin/inquiries/[id]">) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!(await deleteInquiry(id))) return Response.json({ ok: false, error: "항목을 찾을 수 없습니다." }, { status: 404 });
  return Response.json({ ok: true });
}
