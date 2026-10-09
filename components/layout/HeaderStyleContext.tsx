"use client";

/**
 * 헤더 스타일 컨텍스트
 * - 경로에 따라 헤더 배경/글자색 기본값을 정한다.
 *   · "transparent"       : 배경 투명 + 흰 글자 (홈 "/" — 어두운 히어로 위)
 *   · "transparent-black" : 배경 투명 + 검은 글자 (기본값으로는 쓰지 않음, 페이지가 직접 지정할 때만)
 *   · "white"             : 흰 배경 + 검은 글자 (그 외 모든 페이지)
 * - 페이지에서 스크롤 위치에 따라 바꾸고 싶으면 useHeaderStyle().setHeaderStyle(스타일, 요청한 페이지 경로) 를 호출한다.
 *   (예: 홈 히어로를 지나면 "white" 로 전환)
 * - 요청은 "어느 페이지가 보냈는지"와 함께 저장하고, 현재 경로와 같을 때만 적용한다.
 *   Next 16(Cache Components)은 떠난 페이지를 잠시 숨긴 채 유지하는데(React Activity), 이동 직후 스크롤이 맨 위로
 *   바뀌며 숨은 홈 페이지의 스크롤 핸들러가 "transparent" 를 보내면 흰 배경 페이지에 흰 글자 헤더가 되는 문제가 있었음.
 *   → 다른 페이지가 보낸 요청은 무시되므로, 새 페이지는 항상 자기 기본값(또는 자기가 보낸 값)을 쓴다.
 */
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type HeaderStyle = "transparent" | "transparent-black" | "white";

type Ctx = {
  headerStyle: HeaderStyle;
  /** ownerPath: 요청한 페이지의 경로 (그 페이지가 현재 페이지일 때만 반영) */
  setHeaderStyle: (style: HeaderStyle, ownerPath: string) => void;
};

const HeaderStyleContext = createContext<Ctx | undefined>(undefined);

/** 경로별 기본 헤더 스타일 — 홈만 투명, 나머지는 흰색 */
export function getDefaultHeaderStyle(pathname: string): HeaderStyle {
  return pathname === "/" ? "transparent" : "white";
}

export function HeaderStyleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // 페이지별로 직접 지정한 스타일 { 경로: 스타일 } — 늦게 도착한 다른 페이지 요청이 현재 페이지 값을 덮어쓰지 않도록 경로별 보관
  const [owned, setOwned] = useState<Record<string, HeaderStyle>>({});

  // 현재 페이지가 지정한 값이 있으면 그것, 아니면 경로별 기본값
  const headerStyle = owned[pathname] ?? getDefaultHeaderStyle(pathname);

  const setHeaderStyle = useCallback((style: HeaderStyle, ownerPath: string) => {
    setOwned((prev) => (prev[ownerPath] === style ? prev : { ...prev, [ownerPath]: style }));
  }, []);

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
