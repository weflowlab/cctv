import type { Metadata } from "next";
import FaqManager from "@/components/admin/FaqManager";
import { PageHead } from "@/components/admin/ui";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "FAQ 관리" };

/** /admin/faq — 자주 묻는 질문 순서 변경·추가·수정·삭제 후 한 번에 저장 */
export default function AdminFaqPage() {
  return (
    <>
      <PageHead
        title="FAQ 관리"
        desc={
          <>
            자주 묻는 질문 페이지에 위에서부터 순서대로 노출됩니다.
            <br className="br-mobile" /> 변경 후 [저장]을 눌러야 반영됩니다.
          </>
        }
      />
      <FaqManager />
    </>
  );
}
