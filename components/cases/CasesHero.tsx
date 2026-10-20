/**
 * 시공사례 목록 상단 타이틀 영역 (서버 컴포넌트) — /cases, /cases/place/<slug> 공통 (app/cases/(list)/layout.tsx)
 * - 흰 바탕에 제목만 덩그러니 있던 상단을 연한 브랜드색 띠로 채움
 * - [OUR WORK 라벨 + 큰 제목("CCTV 시공사례" / 장소별 "{장소} CCTV 시공사례") + 설명]
 * - 오른쪽에 있던 요약 숫자 2개(시공사례 N건 · 누적 설치 N대, ./CasesStats)는 2026-10-20 대표 요청으로 뺌.
 *   컴포넌트 파일은 남겨 둠 — 다시 쓰려면 getCases() 로 place·cameraCount 를 모아 <CasesStats cases={…} /> 로 넣는다.
 */
import Eyebrow from "@/components/common/Eyebrow";
import CasesTitle from "./CasesTitle";

export default function CasesHero() {
  return (
    // ===== 타이틀 띠: 연한 네이비→흰색 그라데이션 + 우측 위 틸 빛 장식 =====
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#eef3f9] to-white">
      <div className="pointer-events-none absolute right-[-160px] top-[-200px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(0,167,171,0.16),rgba(0,167,171,0))]" />

      <div className="relative mx-auto flex w-full max-w-[1112px] flex-col px-[16px] pb-[36px] pt-[60px] lg:pb-[56px] lg:pt-[32px]">
        {/* ===== 라벨 + 제목 + 설명 ===== */}
        <div className="flex flex-col gap-[14px] lg:gap-[18px]">
          <Eyebrow align="left">Our Work</Eyebrow>
          <CasesTitle />
          <p className="break-keep text-[15px] leading-[160%] tracking-[-0.3px] text-[#666] lg:text-[18px]">
            우리 공간과 비슷한 현장을 찾아보세요.
            <br /> 장소·대수별로 어떻게 설치했는지 확인하실 수 있습니다.
          </p>
          {/* 사례 등록 시작 시점 안내 (2026-10-19 요청) */}
          <p className="text-[13px] tracking-[-0.2px] text-[#999] lg:text-[15px]">※ 2026년 9월 시공 사례부터 순차적으로 등록하고 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
