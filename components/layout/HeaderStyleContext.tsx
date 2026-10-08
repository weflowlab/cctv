"use client";

/**
 * 헤더 스타일 컨텍스트
 * - 원본은 경로에 따라 헤더 배경/글자색을 바꾼다.
 *   · "transparent"       : 배경 투명 + 흰 글자 (/, /security, /business — 어두운 히어로 위)
 *   · "transparent-black" : 배경 투명 + 검은 글자 (/new-service/employee-contract)
 *   · "white"             : 흰 배경 + 검은 글자 (그 외 모든 페이지)
 * - 페이지에서 스크롤 위치에 따라 바꾸고 싶으면 useHeaderStyle().setHeaderStyle 을 호출한다.
 *   (예: 히어로를 지나면 "white" 로 전환)
 */
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";

export type HeaderStyle = "transparent" | "transparent-black" | "white";

type Ctx = { headerStyle: HeaderStyle; setHeaderStyle: (s: HeaderStyle) => void };

const HeaderStyleContext = createContext<Ctx | undefined>(undefined);

/** 경로별 기본 헤더 스타일 (원본 HeaderProvider 로직 그대로) */
export function getDefaultHeaderStyle(pathname: string): HeaderStyle {
  if (["/", "/security", "/business"].includes(pathname)) return "transparent";
  if (pathname === "/new-service/employee-contract") return "transparent-black";
  return "white";
}

export function HeaderStyleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(getDefaultHeaderStyle(pathname));
  const [prevPathname, setPrevPathname] = useState(pathname);

  // 페이지 이동 시 기본 스타일로 리셋 (렌더 중 이전 경로와 비교 — effect 없이 즉시 반영)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setHeaderStyle(getDefaultHeaderStyle(pathname));
  }

  return (
    <HeaderStyleContext.Provider value={{ headerStyle, setHeaderStyle }}>
      {children}
    </HeaderStyleContext.Provider>
  );
}

export function useHeaderStyle() {
  const ctx = useContext(HeaderStyleContext);
  if (!ctx) throw new Error("useHeaderStyle must be used within HeaderStyleProvider");
  return ctx;
}
