"use client";

/**
 * 시공사례 목록 클릭 기록 — 목록 안에서 상세(/cases/<id>) 링크를 누르면 지금 목록 주소를 남긴다 (caseBack.ts)
 * - app/cases/(list)/layout.tsx 에서 목록 콘텐츠를 감싼다.
 */
import type { MouseEvent, ReactNode } from "react";
import { writeCaseBack } from "./caseBack";

export default function CasesListMemo({ children }: { children: ReactNode }) {
  const onClickCapture = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!href || !/^\/cases\/(?!place\/)[^/?#]+$/.test(href)) return;
    writeCaseBack({ list: window.location.pathname, to: href });
  };
  return <div onClickCapture={onClickCapture}>{children}</div>;
}
