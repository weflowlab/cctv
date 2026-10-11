/**
 * 시공사례 사진 저장소 — Vercel Blob (BLOB_READ_WRITE_TOKEN 필요)
 * - 업로드: 관리자 화면이 사진을 WebP(가로 1600px 이하)로 줄여 보내면 /api/admin/upload 가 putCaseImage() 로 저장
 * - 정리: 사례 삭제·사진 교체 시 더 이상 쓰지 않는 Blob 사진을 removeBlobImages() 로 지운다
 *   (샘플 사례의 /images/stock 경로 사진은 사이트 파일이라 건드리지 않는다)
 */
import { del, put } from "@vercel/blob";

export function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function putCaseImage(file: File, ext: string): Promise<string> {
  const blob = await put(`cases/${Date.now()}.${ext}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type,
  });
  return blob.url;
}

/** Blob 에 올린 사진만 골라 지운다 — 실패해도 저장 흐름은 막지 않는다 */
export async function removeBlobImages(urls: string[]): Promise<void> {
  const targets = urls.filter((u) => /^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(u));
  if (!targets.length || !hasBlob()) return;
  await del(targets).catch(() => {});
}
