import { revalidateTag } from "next/cache";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { removeBlobImages } from "@/lib/blob";
import { CASES_TAG, deleteCase, getCaseById, parseCaseInput, setCaseFeatured, updateCase } from "@/lib/cases";

type Ctx = RouteContext<"/api/admin/cases/[id]">;

const notFound = () => Response.json({ ok: false, error: "사례를 찾을 수 없습니다." }, { status: 404 });

/** GET /api/admin/cases/:id — 수정 화면용 1건 */
export async function GET(_req: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const item = await getCaseById((await params).id);
  return item ? Response.json({ ok: true, item }) : notFound();
}

/** PUT /api/admin/cases/:id — 전체 수정. 빠진 사진은 Blob 에서도 지운다 */
export async function PUT(req: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const { id } = await params;
  const parsed = parseCaseInput(await req.json().catch(() => null));
  if ("error" in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 400 });

  const before = await getCaseById(id);
  if (!before) return notFound();
  const item = await updateCase(id, parsed.value);
  if (!item) return notFound();
  const kept = new Set(item.images.map((img) => img.url));
  await removeBlobImages(before.images.map((img) => img.url).filter((u) => !kept.has(u)));

  revalidateTag(CASES_TAG, { expire: 0 });
  return Response.json({ ok: true, item });
}

/** PATCH /api/admin/cases/:id — { featured } 메인 노출만 토글 */
export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = (await req.json().catch(() => ({}))) as { featured?: unknown };
  if (typeof body.featured !== "boolean") return Response.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  const item = await setCaseFeatured((await params).id, body.featured);
  if (!item) return notFound();
  revalidateTag(CASES_TAG, { expire: 0 });
  return Response.json({ ok: true, item });
}

/** DELETE /api/admin/cases/:id — 사례와 업로드한 사진을 함께 지운다 */
export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const item = await deleteCase((await params).id);
  if (!item) return notFound();
  await removeBlobImages(item.images.map((img) => img.url));
  revalidateTag(CASES_TAG, { expire: 0 });
  return Response.json({ ok: true });
}
