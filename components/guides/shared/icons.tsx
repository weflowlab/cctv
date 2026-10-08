/**
 * 창업가이드 페이지 공통 UI 아이콘 (단순 인라인 SVG)
 * - 원본의 화살표/다운로드/체크/카카오 말풍선 등 단순 아이콘을 비슷한 형태로 다시 그린 것.
 * - 크기는 className(w-/h-) 또는 width/height prop 으로 지정한다.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** 오른쪽 화살표 (다운로드/바로가기 버튼, 원본 18x16) */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 16" fill="none" aria-hidden {...props}>
      <path
        d="M1 8h15M10 2l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 다운로드 아이콘 (트레이 + 아래 화살표, 원본 30x30 stroke) */
export function DownloadIcon({ color = "#fff", ...props }: IconProps & { color?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden {...props}>
      <path
        d="M26.25 18.75v5a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5v-5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.75 12.5 15 18.75l6.25-6.25" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 18.75V3.75" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 원형 체크 아이콘 (체크리스트 항목) */
export function CheckCircleIcon({
  bg = "#FF6C3A",
  check = "#fff",
  ...props
}: IconProps & { bg?: string; check?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <circle cx="10" cy="10" r="10" fill={bg} />
      <path d="m5.8 10.2 2.8 2.8 5.6-5.8" stroke={check} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 테두리만 있는 체크 아이콘 (A to Z 체크리스트, 원본 24x24 #666) */
export function CheckOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8 12.2 2.8 2.8L16 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 카카오톡 말풍선 아이콘 (노란 원형 + 갈색 말풍선, 원본 20x22) */
export function KakaoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 22" fill="none" aria-hidden {...props}>
      <circle cx="10" cy="11" r="10" fill="#FFDE00" />
      <path
        d="M10 5.5c-3.3 0-6 2.1-6 4.7 0 1.7 1.1 3.1 2.8 4l-.6 2.3c-.1.2.2.4.4.3l2.7-1.8c.2 0 .5.1.7.1 3.3 0 6-2.1 6-4.8S13.3 5.5 10 5.5Z"
        fill="#231815"
      />
    </svg>
  );
}

/** 위/아래 화살표 (트렌드 리포트 증감 표시) */
export function TrendArrowIcon({ up = true, color = "#3B82F6", ...props }: IconProps & { up?: boolean; color?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      {up ? (
        <>
          <path d="M3.6 8.75 8.75 3.65l5.1 5.1" stroke={color} strokeWidth="2.19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.75 13.85V3.65" stroke={color} strokeWidth="2.19" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M13.85 8.75 8.75 13.85 3.6 8.75" stroke={color} strokeWidth="2.19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.75 3.65v10.2" stroke={color} strokeWidth="2.19" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
