import { revalidateTag } from "next/cache";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { canFeature, CASES_TAG, createCase, FEATURED_FULL_ERROR, listCases, parseCaseInput } from "@/lib/cases";

/** GET /api/admin/cases — 전체 시공사례 (최신순) */
export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return Response.json({ ok: true, items: await listCases() });
}

/** POST /api/admin/cases — 새 사례 등록 (주소가 겹치면 끝에 -2, -3 …) */
export async function POST(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const parsed = parseCaseInput(await req.json().catch(() => null));
  if ("error" in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  if (parsed.value.featured && !(await canFeature())) return Response.json({ ok: false, error: FEATURED_FULL_ERROR }, { status: 400 });
  const item = await createCase(parsed.value);
  revalidateTag(CASES_TAG, { expire: 0 });
  return Response.json({ ok: true, item }, { status: 201 });
}
