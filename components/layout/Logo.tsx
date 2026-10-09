/**
 * 텍스트 로고 — 로고 이미지 확정 전까지 영문 회사명(SITE.nameEn)으로 표시, 누르면 홈(/)으로 이동
 * - "UNITECH" 굵게 + "CCTV" 틸 강조 (브랜드 가이드 컬러)
 * - light: 투명 헤더(어두운 히어로 위)에서 흰 글자 / 기본: 네이비 글자
 * - size: header(헤더) · footer(푸터, 조금 크게)
 * - TODO: 로고 원본 파일(SVG) 받으면 이 컴포넌트 안만 이미지로 교체
 */
import Link from "next/link";
import { SITE } from "@/lib/site";

type LogoProps = { light?: boolean; size?: "header" | "footer" };

export default function Logo({ light = false, size = "header" }: LogoProps) {
  // "UNITECH CCTV" → 앞 단어(회사명) + 뒤 단어(CCTV) 로 나눠 색을 달리함
  const [brand, ...rest] = SITE.nameEn.split(" ");
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} 홈으로`}
      className={`flex items-baseline gap-[6px] whitespace-nowrap font-extrabold leading-none tracking-[0.02em] transition-colors duration-200 ${
        size === "footer" ? "text-[22px] lg:text-[26px]" : "text-[19px] lg:text-[21px]"
      } ${light ? "text-white" : "text-brand"}`}
    >
      <span>{brand}</span>
      <span className={light ? "text-[#7fe0e2]" : "text-point"}>{rest.join(" ")}</span>
    </Link>
  );
}
