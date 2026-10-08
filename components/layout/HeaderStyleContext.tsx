"use client";

/**
 * 헤더 스타일 컨텍스트
 * - 경로에 따라 헤더 배경/글자색 기본값을 정한다.
 *   · "transparent"       : 배경 투명 + 흰 글자 (홈 "/" — 어두운 히어로 위)
 *   · "transparent-black" : 배경 투명 + 검은 글자 (기본값으로는 쓰지 않음, 페이지가 직접 지정할 때만)
 *   · "white"             : 흰 배경 + 검은 글자 (그 외 모든 페이지)
 * - 페이지에서 스크롤 위치에 따라 바꾸고 싶으면 useHeaderStyle().setHeaderStyle 을 호출한다.
 *   (예: 히어로를 지나면 "white" 로 전환)
 */
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";

export type HeaderStyle = "transparent" | "transparent-black" | "white";

type Ctx = { headerStyle: HeaderStyle; setHeaderStyle: (s: HeaderStyle) => void };

const HeaderStyleContext = createContext<Ctx | undefined>(undefined);

/** 경로별 기본 헤더 스타일 — 홈만 투명, 나머지는 흰색 */
export function getDefaultHeaderStyle(pathname: string): HeaderStyle {
  return pathname === "/" ? "transparent" : "white";
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
