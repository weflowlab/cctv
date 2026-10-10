/**
 * 회사소개 "믿고 맡길 수 있는 9가지 약속" 아이콘 (원본 2024/03/010~019.png 자리)
 * - 단순 라인 아이콘 (24x24, stroke=currentColor) — components/main/icons.tsx 와 같은 스타일.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** 무상 AS — 체크 방패 */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

/** 설치부터 수리까지 — 렌치 (Lucide wrench 기반) */
export function WrenchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Base>
  );
}

/** 스마트폰 원격 감시 — 눈이 있는 휴대폰 */
export function PhoneEyeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10 18.5h4" />
      <path d="M8.5 10.5s1.3-2.5 3.5-2.5 3.5 2.5 3.5 2.5-1.3 2.5-3.5 2.5-3.5-2.5-3.5-2.5z" />
      <circle cx="12" cy="10.5" r="0.8" />
    </Base>
  );
}

/** 1:1 담당자 — 사람 */
export function PersonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
    </Base>
  );
}

/** 합리적인 견적 — 원화 동전 */
export function WonCoinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 8.5 1.6 7L12 10l2.4 5.5L16 8.5M7.5 12h9" />
    </Base>
  );
}

/** 정기 점검 — 체크 달력 */
export function CalendarCheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.5 2 2 4-4" />
    </Base>
  );
}

/** 24시간 이내 방문 — 시계 */
export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

/** 직영 공사팀 — 안전모 (Lucide hard-hat 기반) */
export function HardHatIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
    </Base>
  );
}

/** 증설 및 이전 — CCTV 카메라 + 더하기 (Lucide cctv 기반) */
export function CameraPlusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
      <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
      <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
      <path d="M2 21v-4" />
      <path d="M7 9h.01" />
      <path d="M20 2v4M18 4h4" />
    </Base>
  );
}
