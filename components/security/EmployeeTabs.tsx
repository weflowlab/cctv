"use client";

/**
 * 직원관리 기능 탭 (원본 sc-734b83e5 탭 + sc-9e09bc04 스텝 콘텐츠)
 * - 상단 탭 3개: 근로 계약서 / 출퇴근 관리 / 예상급여확인 (선택 탭은 #222 배경 + 흰 글자)
 * - 각 탭마다 1·2·3 스텝이 3초씩 자동 진행 (100ms 간격 타이머, 한 바퀴 9초)
 *   · 3번 스텝이 끝나 한 바퀴 돌면 다음 탭으로 자동 이동 (마지막 탭 → 첫 탭)
 *   · 스텝 번호 클릭 시 해당 스텝으로 즉시 이동하고 그 시점부터 다시 3초 카운트
 *   · 탭이 바뀌면 콘텐츠를 key 로 다시 마운트 → 스텝/타이머 초기화
 * - 스텝 이미지는 바뀔 때마다 0.5s 페이드인 (원본 animation:fadeIn)
 * - 레이아웃: PC 는 좌측 텍스트 + 우측 이미지(528x560), 모바일은 이미지 위 + 텍스트 아래(중앙 정렬)
 */
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

type Step = { title: string; content: ReactNode };

const STEP_MS = 3000; // 스텝 1개 노출 시간
const STEP_COUNT = 3;
const CYCLE_MS = STEP_MS * STEP_COUNT; // 9초

/* ----- 탭별 스텝 데이터 (원본 문구 그대로) ----- */
const CONTRACT: Step[] = [
  { title: "매장 정보 등록", content: <>매장 기본 정보와 급여일을 입력하면,<br />계약서 서식이 자동 세팅됩니다</> },
  { title: "계약 정보 입력", content: <>직원 정보, 근무 일정, 급여 조건을 입력하세요.<br />최신 근로기준법이 자동 반영되어 안심할 수 있습니다.</> },
  { title: "전자 계약 체결", content: <>직원에게 카카오톡으로 계약서를 전송하고,<br />전자서명으로 바로 체결 완료!<br />작성된 계약서는 자동 저장되어 법적 증거로<br />활용할 수 있습니다.</> },
];
const INOUT: Step[] = [
  { title: "출퇴근 기록하기", content: <>직원들은 파트너스 앱에서 매장 GPS를 통해<br />간편하게 출퇴근 기록을 할 수 있습니다.</> },
  { title: "근무 기록 확인하기", content: <>직원별 출퇴근 현황을 캘린더에서<br />빠르게 확인하고, 일자별 상세 기록과<br />이상 근무도 한눈에 파악할 수 있어요.</> },
  { title: "출퇴근 타임라인 보기", content: <>직원이 근무시간 변경을 요청하거나<br />사장님이 직접 근무 시간을 수정할 수 있고,<br />하루동안의 근무 시간을 타임라인으로<br />한눈에 파악할 수 있어요</> },
];
const PAYROLL: Step[] = [
  { title: "주휴수당 및 가산수당 계산", content: <>근무한 시간만큼 예상 수당을<br />자동으로 계산합니다.<br />※ 급여 계산 방식은 급여 유형별 상이<br />(시급제 : 근무시간 기준 / 월급제 : 일할 계산)</> },
  { title: "공제까지 자동 반영", content: <>공제 방법에 따라 세금 및 보험 공제도<br />자동으로 계산됩니다.</> },
  { title: "예상 급여 확인", content: <>직원별 급여부터 공제, 실지급 금액까지<br />한번에 확인할 수 있습니다.</> },
];

const MENUS = ["근로 계약서", "출퇴근 관리", "예상급여확인"];
const DATA = [CONTRACT, INOUT, PAYROLL];

/**
 * 스텝 자동 진행 훅 (원본 useStepProgress 그대로)
 * - progress = (경과시간 % 9초) / 3초 → 0~3 사이 실수
 * - progress 가 줄어들면(한 바퀴 완료) onCycle 호출 → 다음 탭으로
 */
function useStepProgress(onCycle: () => void) {
  const [progress, setProgress] = useState(0);
  const start = useRef(0); // 진행 기준 시각
  const prev = useRef(0); // 직전 progress (한 바퀴 완료 감지용)

  useEffect(() => {
    start.current = Date.now();
    prev.current = 0;
    const id = setInterval(() => {
      const p = ((Date.now() - start.current) % CYCLE_MS) / STEP_MS;
      if (p < prev.current) onCycle(); // progress 가 되감기면 한 바퀴 완료
      prev.current = p;
      setProgress(p);
    }, 100);
    return () => clearInterval(id);
  }, [onCycle]);

  // 스텝 직접 선택: 해당 스텝 시작 시점으로 기준 시간을 되돌림
  const changeStep = (step: number) => {
    start.current = Date.now() - ((STEP_MS * step) % CYCLE_MS);
    prev.current = step;
    setProgress(step);
  };

  return { currentStep: Math.floor(progress % STEP_COUNT), changeStep };
}

/** 스텝 번호 사이 점 2개 */
function Dots() {
  return (
    <div className="inline-flex gap-[4px]">
      <span className="h-[4px] w-[4px] rounded-full bg-[#dedede]" />
      <span className="h-[4px] w-[4px] rounded-full bg-[#dedede]" />
    </div>
  );
}

/** 탭 1개의 스텝 콘텐츠 */
function TabContent({ tabIndex, onCycle }: { tabIndex: number; onCycle: () => void }) {
  const { currentStep, changeStep } = useStepProgress(onCycle);
  const step = DATA[tabIndex][currentStep];

  return (
    <div className="relative flex w-full flex-col lg:flex-row">
      {/* 텍스트 영역: 스텝 버튼 + 제목 + 설명 */}
      <div className="relative order-2 flex-1 lg:order-1">
        <div className="mt-[32px] flex items-center justify-center gap-[6px] lg:mt-[178px] lg:justify-start lg:gap-[10px]">
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              {i > 0 && <Dots />}
              <button
                type="button"
                onClick={() => changeStep(i)}
                className={`inline-flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] text-[16px] font-bold leading-[24px] lg:h-[48px] lg:w-[48px] lg:rounded-[10px] lg:text-[22px] lg:leading-[32px] ${
                  currentStep === i ? "border-0 bg-brand text-white" : "border border-[#dedede] bg-white text-[#333]"
                }`}
              >
                {i + 1}
              </button>
            </Fragment>
          ))}
        </div>
        <h2 className="mt-[20px] text-center text-[22px] font-bold leading-[33px] tracking-[-0.44px] text-[#222] lg:mt-[28px] lg:text-left lg:text-[38px] lg:leading-[56px] lg:tracking-[-1px]">{step.title}</h2>
        <p className="mt-[8px] h-[108px] text-center text-[15px] leading-[24px] tracking-[-0.5px] text-[#666] lg:mt-[16px] lg:text-left lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]">{step.content}</p>
      </div>

      {/* 이미지: 스텝이 바뀔 때마다 key 변경 → 페이드인 재실행 */}
      <div
        key={currentStep}
        className="order-1 aspect-[33/35] w-full max-w-[480px] shrink-0 self-center animate-[fadeIn_0.5s_ease-in-out_forwards] opacity-0 lg:order-2 lg:aspect-auto lg:h-[560px] lg:w-[528px] lg:max-w-none lg:self-auto"
      >
        <Placeholder label={`${step.title} 기능 안내 화면`} className="h-full w-full rounded-[20px]" />
      </div>
    </div>
  );
}

export default function EmployeeTabs() {
  const [tab, setTab] = useState(0);

  // 한 바퀴 완료 시 다음 탭으로 (마지막 탭이면 처음으로)
  const nextTab = useCallback(() => setTab((t) => (t === MENUS.length - 1 ? 0 : t + 1)), []);

  return (
    <div className="mt-[36px]">
      {/* ===== 탭 버튼 ===== */}
      <div className="relative left-1/2 mt-[28px] flex w-full max-w-[480px] -translate-x-1/2 justify-center overflow-hidden rounded-[8px] lg:mt-0 lg:w-[600px] lg:max-w-none lg:rounded-[10px]">
        {MENUS.map((m, i) => (
          <button
            key={m}
            type="button"
            onClick={() => setTab(i)}
            className={`flex h-[52px] flex-1 cursor-pointer items-center justify-center border border-solid text-[16px] font-bold leading-[23px] tracking-[-0.32px] transition-all duration-100 ease-in-out lg:h-[68px] lg:text-[22px] lg:leading-[31px] lg:tracking-[-0.44px] ${
              i === 1 ? "mx-[-1px]" : ""
            } ${tab === i ? "border-[#222] bg-[#222] text-white" : "border-[#EBEDF2] bg-[#f5f5f5] text-[#666]"}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* ===== 탭 콘텐츠 (탭 변경 시 재마운트) ===== */}
      <div className="mt-[36px] flex h-full w-full lg:mt-[80px]">
        <TabContent key={tab} tabIndex={tab} onCycle={nextTab} />
      </div>
    </div>
  );
}
