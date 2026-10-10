/**
 * 홈(메인) 전용 인라인 SVG 아이콘 모음
 * - 화살표/체크: keeper components/home/icons.tsx 에서 복사.
 * - 장소 아이콘(가정/매장/사무실/공장·창고/기관): 단순 라인 아이콘 (stroke=currentColor, 24x24).
 * - 스피커 혜택 아이콘(시간/비용/통합관리): 단순 라인 아이콘.
 * - 홈 "한눈에 보는" 장점 아이콘(설계/수리/스피커/구성품): 단순 라인 아이콘.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** 오른쪽 화살표 (currentColor) — 카드·버튼 */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" aria-hidden="true" {...props}>
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M18 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1" />
        <path d="M9.293.293a1 1 0 0 0 0 1.414L15.586 8l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0" />
      </g>
    </svg>
  );
}

/** 왼쪽 화살표 (currentColor) — 후기 슬라이더 이전 버튼 */
export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" aria-hidden="true" {...props}>
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M0 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1" />
        <path d="M8.707.293a1 1 0 0 1 0 1.414L2.414 8l6.293 6.293a1 1 0 1 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0" />
      </g>
    </svg>
  );
}

/** 브랜드색 체크 (24x25) — 리스트 체크 */
export function OrangeCheckIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" aria-hidden="true" {...props}>
      <path fill="#00A7AB" d="M10.546 18.5a2.25 2.25 0 0 1-1.53-.672L5.067 13.77c-.608-.623-.762-1.551-.29-2.266.783-1.199 2.503-1.276 3.43-.329l2.291 2.353 5.177-6.224c.555-.667 1.519-.98 2.382-.7 1.44.473 1.852 1.995 1.01 3.005l-6.743 8.1c-.38.459-.963.753-1.593.787h-.19z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 라인 아이콘 공통 래퍼                                                 */
/* ------------------------------------------------------------------ */
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** 가정 — 집 */
export function HomeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </LineIcon>
  );
}

/** 매장 — 차양이 있는 가게 */
export function StoreIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 4h16l1 5H3l1-5Z" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 12v8h14v-8" />
      <path d="M10 20v-5h4v5" />
    </LineIcon>
  );
}

/** 사무실 — 빌딩 */
export function OfficeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </LineIcon>
  );
}

/** 공장·창고 — 톱니 지붕 공장 */
export function FactoryIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17H3Z" />
      <path d="M7 17h2M11 17h2M15 17h2" />
    </LineIcon>
  );
}

/** 기관 — 기둥 있는 관공서 */
export function PublicIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 9 12 4l9 5H3Z" />
      <path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9" />
      <path d="M3 21h18M4 18h16" />
    </LineIcon>
  );
}

/** 시간 단축 — 시계 */
export function ClockIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </LineIcon>
  );
}

/** 비용 절감 — 동전 */
export function CoinIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5c-.5-.9-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2-.6-2.5-1.5" />
      <path d="M12 6.5V8M12 16v1.5" />
    </LineIcon>
  );
}

/** 통합 관리 — 레이어 */
export function LayersIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </LineIcon>
  );
}

/** 현장 맞춤 설계 — 도면 위 카메라 위치 표시 */
export function BlueprintIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h7v10M10 14h11" />
      <circle cx="16" cy="9" r="1.6" />
    </LineIcon>
  );
}

/** 타사 제품 AS — 렌치 */
export function WrenchIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </LineIcon>
  );
}

/** CCTV+스피커 — 스피커 */
export function SpeakerIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </LineIcon>
  );
}

/** 풀세트 구성품 — 상자 */
export function BoxIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m12 3 8 4v10l-8 4-8-4V7l8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </LineIcon>
  );
}

/** 견적 계산 — 계산기 (히어로 버튼) */
export function CalculatorIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <path d="M8.5 6.5h7v3h-7z" />
      <path d="M8.5 13.5h.01M12 13.5h.01M15.5 13.5h.01M8.5 17h.01M12 17h.01M15.5 17h.01" />
    </LineIcon>
  );
}

/** 상담 신청 — 체크 클립보드 (플로팅 문의하기 버튼과 같은 모양) */
export function ClipboardCheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <rect x="9" y="2.5" width="6" height="4" rx="1" />
      <path d="m9 13.5 2.2 2.2L15.5 11.5" />
    </LineIcon>
  );
}
