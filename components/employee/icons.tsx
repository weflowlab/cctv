/**
 * 직원관리 페이지 공용 아이콘 / 텍스트 헬퍼
 * - ArrowIcon   : CTA 버튼 오른쪽 화살표 (원본 94836 모듈 SVG 그대로, currentColor)
 * - StarIcon    : 리뷰 별점 (원본 e9, #FF5C00)
 * - AvatarIcon  : 리뷰 작성자 아바타 (원본 te, 원형 + 사람 실루엣)
 * - CloseIcon   : 모달 닫기 X
 * - SpaceOrBreak: 원본 useDevice().spaceOrBreak — PC 에서는 공백, 모바일(≤1023px)에서는 줄바꿈
 */
import type { SVGProps } from "react";

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" aria-hidden {...props}>
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M18 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1" />
        <path d="M9.293.293a1 1 0 0 0 0 1.414L15.586 8l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0" />
      </g>
    </svg>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
      <path
        d="M11.0036 1.8335L13.8361 7.57183L20.1702 8.49766L15.5869 12.9618L16.6686 19.2685L11.0036 16.2893L5.33858 19.2685L6.42025 12.9618L1.83691 8.49766L8.17108 7.57183L11.0036 1.8335Z"
        fill="#FF5C00"
      />
    </svg>
  );
}

export function AvatarIcon({ fill }: { fill: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill={fill} className="shrink-0" aria-hidden>
      <path d="M26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26C20.1797 26 26 20.1797 26 13Z" fill="inherit" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.27295 21.0693C7.02525 18.6421 9.87863 17.0625 13.1009 17.0625C16.272 17.0625 19.0857 18.5922 20.8445 20.954C18.8272 22.9438 16.0567 24.1719 12.9994 24.1719C10.0016 24.1719 7.2795 22.9911 5.27295 21.0693ZM17.4681 10.4609C17.4681 12.9851 15.5129 15.0312 13.1009 15.0312C10.689 15.0312 8.73375 12.9851 8.73375 10.4609C8.73375 7.93683 10.689 5.89062 13.1009 5.89062C15.5129 5.89062 17.4681 7.93683 17.4681 10.4609Z"
        fill="white"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden>
      <path d="M2 2L19.5 19.5M19.5 2L2 19.5" stroke="#222" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** PC: 공백 / 모바일: <br/> (원본 spaceOrBreak) */
export function SpaceOrBreak() {
  return (
    <>
      <span className="hidden lg:inline"> </span>
      <br className="lg:hidden" />
    </>
  );
}

/** PC: <br/> / 모바일: 공백 (원본에서 isDesktop 에 따라 반대로 쓰는 곳) */
export function BreakOrSpace() {
  return (
    <>
      <br className="hidden lg:inline" />
      <span className="lg:hidden"> </span>
    </>
  );
}
