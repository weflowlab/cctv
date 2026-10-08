"use client";

/**
 * /contact/franchised-promotion 헤더 스타일 연동 (렌더 없음)
 * - 원본 page 청크: useHeaderScroll(100, "transparent-black")
 *   → 스크롤 100px 미만이면 투명 배경 + 검은 글자, 이후 흰 헤더
 */
import { useHeaderScrollStyle } from "../useHeaderScrollStyle";

export default function PromotionHeaderStyle() {
  useHeaderScrollStyle(100, "transparent-black", "white");
  return null;
}
