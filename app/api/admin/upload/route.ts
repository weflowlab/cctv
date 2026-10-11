import { denyUnlessAdmin } from "@/lib/adminAuth";
import { hasBlob, putCaseImage, removeBlobImages } from "@/lib/blob";

/**
 * POST /api/admin/upload — 시공사례 사진 1장 업로드 (multipart, 필드명 file) → { ok, url }
 * 관리자 화면이 미리 WebP 로 줄여 보내므로 보통 수백 KB. 함수 본문 한도(4.5MB) 안에서 4MB 로 제한한다.
 * DELETE /api/admin/upload — { url } 저장하기 전에 편집 화면에서 뺀 사진을 바로 지운다
 *   (저장된 사례의 사진은 사례 수정·삭제 API 가 정리한다)
 */
const EXT: Record<string, string> = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  if (!hasBlob()) {
    return Response.json(
      { ok: false, error: "사진 저장소(Vercel Blob)가 연결되지 않았습니다. BLOB_READ_WRITE_TOKEN 을 설정해 주세요." },
      { status: 500 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ ok: false, error: "파일이 없습니다." }, { status: 400 });
  const ext = EXT[file.type];
  if (!ext) return Response.json({ ok: false, error: "JPG, PNG, WEBP 이미지만 올릴 수 있습니다." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ ok: false, error: "사진은 4MB 이하로 올려 주세요." }, { status: 400 });

  try {
    return Response.json({ ok: true, url: await putCaseImage(file, ext) });
  } catch (e) {
    return Response.json({ ok: false, error: `업로드에 실패했습니다. (${String(e)})` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = (await req.json().catch(() => ({}))) as { url?: unknown };
  if (typeof body.url !== "string") return Response.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  await removeBlobImages([body.url]);
  return Response.json({ ok: true });
}
