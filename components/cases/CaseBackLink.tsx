"use client";

/**
 * 상세 상단 [← 시공사례 목록]
 * - 목록에서 바로 들어온 경우: 뒤로가기(history.back) → 보던 탭(예: 매장)과 스크롤 위치로 복귀
 * - 그 외: 기록된 목록 주소(없으면 /cases)로 이동
 */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { CASE_BACK_KEY, readCaseBack } from "./caseBack";

const noop = () => () => {};

export default function CaseBackLink({ className }: { className: string }) {
  const router = useRouter();
  const pathname = usePathname();
  // 서버 렌더에서는 기록이 없으므로 null → 하이드레이션 후 sessionStorage 값 사용
  const raw = useSyncExternalStore(
    noop,
    () => sessionStorage.getItem(CASE_BACK_KEY),
    () => null,
  );
  const back = raw ? readCaseBack() : null;
  const fromList = !!back && decodeURI(back.to) === decodeURI(pathname);

  return (
    <Link
      href={back?.list ?? "/cases"}
      onClick={(e) => {
        if (!fromList) return;
        e.preventDefault();
        router.back();
      }}
      className={className}
    >
      ← 시공사례 목록
    </Link>
  );
}
