import type { Metadata } from "next";
import { Suspense } from "react";
import CaseEditor from "@/components/admin/CaseEditor";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "시공사례 편집" };

/**
 * /admin/cases/new — 새 사례 등록 / /admin/cases/<id> — 수정
 * params 는 Suspense 안에서 읽는다 (Cache Components: 요청 시점 값은 경계 안에서)
 */
export default function AdminCaseEditPage({ params }: PageProps<"/admin/cases/[id]">) {
  return (
    <Suspense fallback={<p className="c-muted">불러오는 중…</p>}>
      {params.then(({ id }) => (
        <CaseEditor key={id} id={decodeURIComponent(id)} />
      ))}
    </Suspense>
  );
}
