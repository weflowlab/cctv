/**
 * "키퍼 하나면 … 앱 하나로 해결됩니다!" 기능 소개 섹션 (원본 sc-e1a24479 / 카드 sc-2fe6c9a1)
 * - 흰색 → 연주황 그라데이션 배경.
 * - 카드 4장: 짝수 인덱스는 [텍스트 | 이미지], 홀수는 [이미지 | 텍스트] 로 좌우 교차 (PC, 높이 400).
 *   모바일은 이미지 위 / 텍스트 아래(column-reverse), 가운데 정렬.
 * - 일부 카드에 "Update" / "New" 칩.
 * - 카드 목록 전체에 slide-up 스크롤 등장 애니메이션 (<Reveal>).
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { BreakOrSpace, SpaceOrBreak } from "./icons";

type Feature = { chip?: string; title: string; subTitle: ReactNode; content: ReactNode };

const FEATURES: Feature[] = [
  {
    title: "출퇴근 자동 기록",
    subTitle: (
      <>
        직원이 앱으로 체크,
        <br />
        사장님은 자동 확인!
      </>
    ),
    // 원본: PC 는 "범위 내에서<br/>자동으로 활성화…", 모바일은 "범위 내에서 자동으로<br/>활성화…"
    content: (
      <>
        매장 GPS 범위 내에서
        <BreakOrSpace />
        자동으로
        <SpaceOrBreak />
        활성화되는 출퇴근 버튼
      </>
    ),
  },
  {
    title: "스케줄 통합 관리",
    subTitle: (
      <>
        복잡한 스케줄표
        <br />
        작성이 자동으로!
      </>
    ),
    content: (
      <>
        스케줄 변경 시 계약서 자동수정,
        <br />
        번거로움 제로!
      </>
    ),
  },
  {
    chip: "Update",
    title: "투명하고 유연한 근무 기록 관리",
    subTitle: (
      <>
        직원들도 신뢰하는
        <br />
        디지털 기록
      </>
    ),
    content: (
      <>
        직원의 근무 시간대 구간을 한눈에 볼 수 있도록
        <br />
        출퇴근 타임라인 추가
      </>
    ),
  },
  {
    chip: "New",
    title: "직원과 함께하는 급여 확인",
    subTitle: (
      <>
        직원별 급여부터 공제까지
        <br />
        예상급여 한 번에 확인
      </>
    ),
    content: (
      <>
        직원별 급여부터 공제, 실지급 금액까지
        <br />
        근무 기록 기준으로 자동 계산
      </>
    ),
  },
];

export default function FeatureSection() {
  return (
    // ===== 기능 소개: 헤드카피 + 좌우 교차 기능 카드 4장 =====
    <section className="relative flex w-full flex-col items-center bg-[linear-gradient(180deg,#fff_5.35%,#ffc4a2_268.9%)] px-[16px] py-[60px] lg:px-0 lg:py-[140px]">
      <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] [&>strong]:text-[#ff5c00]">
        키퍼 하나면
        <SpaceOrBreak />
        번거롭던 직원 관리가
        <br />
        <strong>앱 하나로 해결됩니다!</strong>
      </h2>
      <h2 className="mt-[12px] text-center text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#333] lg:mt-[20px] lg:text-[22px] lg:leading-[32px] lg:tracking-[-0.44px]">
        수동 시간 체크, 복잡한 표 만들기,
        <SpaceOrBreak />
        수기 작성 이제 그만!
        <br />
        요즘 사장님들은 모두 키퍼로
        <SpaceOrBreak />
        스마트하게 관리해요
      </h2>
      <Reveal className="mt-[36px] w-full max-w-[580px] lg:mt-[60px] lg:w-[1080px] lg:max-w-none">
        {FEATURES.map((f, i) => {
          const isLeft = i % 2 === 0; // 짝수: 텍스트 왼쪽, 홀수: 텍스트 오른쪽
          return (
            <div
              key={f.title}
              className={`flex w-full flex-col-reverse rounded-[20px] bg-white shadow-[0_6px_21.8px_-1px_rgba(255,215,186,0.42)] lg:h-[400px] ${
                isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              } ${i > 0 ? "mt-[24px]" : ""}`}
            >
              {/* 텍스트 영역 */}
              <div
                className={`flex w-full flex-col items-center justify-start px-[24px] pb-[32px] pt-[24px] lg:w-[540px] lg:items-start lg:justify-center lg:py-0 ${
                  isLeft ? "lg:pl-[136px] lg:pr-0" : "lg:px-[84px]"
                }`}
              >
                {f.chip && (
                  <div className="mb-[10px] flex h-[26px] w-fit min-w-[72px] items-center justify-center rounded-[100px] bg-[#e83b05] px-[13px] text-[14px] font-medium tracking-[-0.468px] text-[#fafafc]">
                    {f.chip}
                  </div>
                )}
                <h3 className="text-center text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-[#ff5c00] lg:text-left lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.5px]">
                  {f.title}
                </h3>
                <h4 className="mt-[6px] text-center text-[22px] font-bold leading-[33px] tracking-[-0.44px] text-[#222] lg:mt-[8px] lg:text-left lg:text-[32px] lg:leading-[42px] lg:tracking-[-0.32px]">
                  {f.subTitle}
                </h4>
                <p className="mt-[8px] text-center text-[14px] font-normal leading-[22px] tracking-[-0.14px] text-[#666] lg:mt-[16px] lg:text-left lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.5px]">
                  {f.content}
                </p>
              </div>
              {/* 이미지 영역 (원본 1080×800 → 540×400) — 첫 카드는 모바일 전용 이미지(686×520)로 교체됨 */}
              <div className="w-full overflow-hidden lg:w-[540px]">
                <Placeholder
                  label={f.title}
                  className={`w-full rounded-t-[20px] lg:h-full lg:rounded-none ${
                    i === 0 ? "aspect-[686/520]" : "aspect-[27/20]"
                  } lg:aspect-auto ${isLeft ? "lg:rounded-r-[20px]" : "lg:rounded-l-[20px]"}`}
                />
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
