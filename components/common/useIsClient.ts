"use client";

/**
 * 브라우저에서 hydrate 됐는지 여부 (서버·프리렌더·hydration 첫 렌더에서는 false)
 * - 용도: Swiper Autoplay 처럼 렌더 중 현재 시각(new Date)을 읽는 코드는
 *   Cache Components 정적 프리렌더에서 에러가 나므로, 브라우저에서만 켜야 할 때 사용.
 */
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export default function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
