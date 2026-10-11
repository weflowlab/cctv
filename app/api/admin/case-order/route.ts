import { revalidateTag } from "next/cache";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { CASES_TAG, MAX_FEATURED, setFeaturedOrder } from "@/lib/cases";

/** PUT /api/admin/case-order — { ids: [...] } 홈 노출 사례 순서 저장 (앞에서부터 홈에 표시) */
export async function PUT(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = (await req.json().catch(() => ({}))) as { ids?: unknown };
  const ids = Array.isArray(body.ids) ? body.ids.filter((v): v is string => typeof v === "string").slice(0, MAX_FEATURED) : null;
  if (!ids) return Response.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  await setFeaturedOrder(ids);
  revalidateTag(CASES_TAG, { expire: 0 });
  return Response.json({ ok: true });
}
