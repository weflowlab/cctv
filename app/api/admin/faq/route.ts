import { revalidateTag } from "next/cache";
import { denyUnlessAdmin } from "@/lib/adminAuth";
import { FAQS_TAG, listFaqs, parseFaqs, replaceFaqs } from "@/lib/faqs";

/** GET /api/admin/faq — 전체 FAQ (노출 순서) */
export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return Response.json({ ok: true, items: await listFaqs() });
}

/** PUT /api/admin/faq — 목록 전체 교체 { items: [{ category, question, answer, best }] } */
export async function PUT(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const parsed = parseFaqs(await req.json().catch(() => null));
  if ("error" in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  await replaceFaqs(parsed.value);
  // /faq · 홈 BEST 5 에 바로 반영
  revalidateTag(FAQS_TAG, { expire: 0 });
  return Response.json({ ok: true, items: parsed.value });
}
