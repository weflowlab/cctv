/**
 * 섹션 머리 라벨 (아이브로우) — 브랜드 가이드 스타일
 * - 자간 넓은 영문 대문자 + 아래 짧은 틸 라인 (브랜드 가이드 "UNITECH CCTV / SECURITY TECHNOLOGY…" 표기 방식)
 * - keeper 식 알약(라운드 배경) 라벨 대신 사이트 전체에서 이 컴포넌트를 쓴다.
 * - dark: 네이비·사진 등 어두운 배경 위 (밝은 틸) / align: 가운데(기본) · 왼쪽
 * - korean: 한글 라벨일 때 — 넓은 자간이 한글에선 어색해서 자간을 좁힘
 */
import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
  korean?: boolean;
};

export default function Eyebrow({ children, dark = false, align = "center", className = "", korean = false }: EyebrowProps) {
  return (
    <span
      className={`flex flex-col gap-[10px] ${align === "center" ? "items-center" : "items-start"} ${className}`}
    >
      <span
        className={`font-bold uppercase ${
          korean ? "text-[13px] tracking-[0.02em] lg:text-[16px]" : "text-[12px] tracking-[0.24em] lg:text-[14px]"
        } ${dark ? "text-[#7fe0e2]" : "text-point-strong"}`}
      >
        {children}
      </span>
      <span aria-hidden className="block h-[2px] w-[24px] bg-point" />
    </span>
  );
}
