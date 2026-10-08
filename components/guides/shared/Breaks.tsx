/**
 * 창업가이드 페이지 공통: 반응형 줄바꿈 헬퍼
 * - 원본 useDevice().spaceOrBreak 는 PC 에서 " ", 모바일에서 <br/> 을 넣는다.
 * - JS 분기 대신 CSS(lg:)로 처리해 서버 컴포넌트에서도 hydration 불일치 없이 사용한다.
 */

/** PC: 공백 / 모바일: 줄바꿈 (원본 spaceOrBreak) */
export function SpaceOrBreak() {
  return (
    <>
      <span className="hidden lg:inline"> </span>
      <br className="lg:hidden" />
    </>
  );
}

/** PC: 줄바꿈 / 모바일: 공백 (원본 isDesktop ? <br/> : " ") */
export function BreakOrSpace() {
  return (
    <>
      <br className="hidden lg:inline" />
      <span className="lg:hidden"> </span>
    </>
  );
}
