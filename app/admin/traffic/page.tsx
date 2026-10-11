import type { Metadata } from "next";
import TrafficManager from "@/components/admin/TrafficManager";
import { PageHead } from "@/components/admin/ui";

/** 로그인 확인 뒤에만 본문을 그리는 관리자 화면 — 즉시 이동(정적 셸) 검증 대상에서 뺀다 */
export const instant = false;

export const metadata: Metadata = { title: "유입 관리" };

/** /admin/traffic — 최근 30일 방문 기록 집계 (유입 경로·기기·광고 키워드·이탈 페이지) */
export default function AdminTrafficPage() {
  return (
    <>
      <PageHead
        title="유입 관리"
        desc="최근 30일 방문 기록입니다. 방문자는 기기당 하루 1명으로 셉니다. (본인 방문 제외: 사이트 주소 뒤에 ?notrack=1 을 붙여 한 번 접속)"
      />
      <TrafficManager />
    </>
  );
}
