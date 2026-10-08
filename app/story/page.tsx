/**
 * /story — 키퍼 스토리 페이지 (서버 컴포넌트)
 * - 원본: https://keeper.ceo/story
 * - 헤더: 흰 배경(white) — 경로별 기본값으로 처리됨
 * - 정적 페이지라 클라이언트 인터랙션 없음. 섹션 구현은 components/story/StorySections.tsx
 */
import type { Metadata } from "next";
import { BeliefSection, PhilosophySection, WhyKeeperSection } from "@/components/story/StorySections";

export const metadata: Metadata = {
  title: "키퍼 스토리 | 한화비전이 만든 매장관리 솔루션",
  description: "30년 영상보안 기술의 한화비전이 자영업자를 위해 만든 키퍼의 이야기",
};

export default function StoryPage() {
  return (
    // 원본 sc-60664d09-0: 가운데 정렬 세로 플렉스 래퍼
    <div className="mx-auto flex w-full flex-col items-center text-center">
      {/* ===== 섹션1 Why Keeper: 문제 제기 → 배경 이미지 메시지 → 키퍼를 만든 이유 ===== */}
      <WhyKeeperSection />
      {/* ===== 섹션2 브랜드 철학: Keep your Space / Time / Life ===== */}
      <PhilosophySection />
      {/* ===== 섹션3 마무리: 하단 배경 이미지 위 "그리고 우리는 믿습니다." ===== */}
      <BeliefSection />
    </div>
  );
}
