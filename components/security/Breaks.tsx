/**
 * 매장보안(/security) 페이지 전용 반응형 줄바꿈 헬퍼
 * - 원본 sc-733bd00-1(모바일 전용 <br>), sc-733bd00-0(PC 전용 <br>) 을 그대로 옮김
 * - SpaceMbBr / SpacePcBr : 원본에서 공백(" ") + br 을 함께 넣던 패턴 (PC/모바일 한쪽에선 공백만 남음)
 */

/** 모바일(≤1023px)에서만 줄바꿈 */
export function MbBr() {
  return <br className="lg:hidden" />;
}

/** PC(≥1024px)에서만 줄바꿈 */
export function PcBr() {
  return <br className="hidden lg:block" />;
}

/** 공백 + 모바일 전용 줄바꿈 (원본 80906 모듈) */
export function SpaceMbBr() {
  return (
    <>
      {" "}
      <MbBr />
    </>
  );
}

/** 공백 + PC 전용 줄바꿈 */
export function SpacePcBr() {
  return (
    <>
      {" "}
      <PcBr />
    </>
  );
}
