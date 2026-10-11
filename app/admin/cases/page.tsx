import type { Metadata } from "next";
import CaseManager from "@/components/admin/CaseManager";
import { PageHead } from "@/components/admin/ui";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "시공사례 관리" };

/** /admin/cases — 시공사례 목록 · 메인 노출 · 삭제 (등록·수정은 /admin/cases/[id]) */
export default function AdminCasesPage() {
  return (
    <>
      <PageHead
        title="시공사례 관리"
        desc={
          <>
            등록·수정·삭제하면
            <br className="br-mobile" /> 시공사례 페이지와 홈 화면에 바로 반영됩니다.
          </>
        }
      />
      <CaseManager />
    </>
  );
}
