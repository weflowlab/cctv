"use client";

/**
 * "앱 설치 후 단 1분! 키퍼 사용법, 이렇게 쉽습니다" 섹션 (원본 sc-46431fa5 / 탭 sc-734b83e5 / 스텝 sc-9e09bc04)
 * - 상단 탭 3개: 근로 계약서 / 출퇴근 관리 / 예상급여확인 (선택 탭은 #222 배경 + 흰 글자).
 * - 탭마다 3단계 앱 화면이 있고 1·2·3 숫자 버튼으로 이동.
 * - 자동 재생 (원본 useStepProgress): 3초마다 다음 단계로 넘어가고, 3단계(9초)가 끝나면 다음 탭으로,
 *   마지막 탭 뒤에는 첫 탭으로 순환. 숫자 버튼 클릭 시 해당 단계부터 타이머를 다시 잼.
 * - 탭을 바꾸면 스텝 영역이 key 로 다시 마운트되어 1단계부터 재시작 (원본과 동일).
 * - 단계가 바뀔 때마다 이미지가 0.5s fade-in.
 * - PC: [텍스트 | 이미지(528×560)] / 모바일: 이미지가 위, 텍스트 가운데 정렬.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

type Step = { title: string; content: ReactNode };

// 탭별 3단계 데이터 (원본 c / x / d 배열)
const CONTRACT_STEPS: Step[] = [
  {
    title: "매장 정보 등록",
    content: (
      <>
        매장 기본 정보와 급여일을 입력하면,
        <br />
        계약서 서식이 자동 세팅됩니다
      </>
    ),
  },
  {
    title: "계약 정보 입력",
    content: (
      <>
        직원 정보, 근무 일정, 급여 조건을 입력하세요.
        <br />
        최신 근로기준법이 자동 반영되어 안심할 수 있습니다.
      </>
    ),
  },
  {
    title: "전자 계약 체결",
    content: (
      <>
        직원에게 카카오톡으로 계약서를 전송하고,
        <br />
        전자서명으로 바로 체결 완료!
        <br />
        작성된 계약서는 자동 저장되어 법적 증거로
        <br />
        활용할 수 있습니다.
      </>
    ),
  },
];

const ATTENDANCE_STEPS: Step[] = [
  {
    title: "출퇴근 기록하기",
    content: (
      <>
        직원들은 파트너스 앱에서 매장 GPS를 통해
        <br />
        간편하게 출퇴근 기록을 할 수 있습니다.
      </>
    ),
  },
  {
    title: "근무 기록 확인하기",
    content: (
      <>
        직원별 출퇴근 현황을 캘린더에서
        <br />
        빠르게 확인하고, 일자별 상세 기록과
        <br />
        이상 근무도 한눈에 파악할 수 있어요.
      </>
    ),
  },
  {
    title: "출퇴근 타임라인 보기",
    content: (
      <>
        직원이 근무시간 변경을 요청하거나
        <br />
        사장님이 직접 근무 시간을 수정할 수 있고,
        <br />
        하루동안의 근무 시간을 타임라인으로
        <br />
        한눈에 파악할 수 있어요
      </>
    ),
  },
];

const PAYROLL_STEPS: Step[] = [
  {
    title: "주휴수당 및 가산수당 계산",
    content: (
      <>
        근무한 시간만큼 예상 수당을
        <br />
        자동으로 계산합니다.
        <br />
        ※ 급여 계산 방식은 급여 유형별 상이
        <br />
        (시급제 : 근무시간 기준 / 월급제 : 일할 계산)
      </>
    ),
  },
  {
    title: "공제까지 자동 반영",
    content: (
      <>
        공제 방법에 따라 세금 및 보험 공제도
        <br />
        자동으로 계산됩니다.
      </>
    ),
  },
  {
    title: "예상 급여 확인",
    content: (
      <>
        직원별 급여부터 공제, 실지급 금액까지
        <br />
        한번에 확인할 수 있습니다.
      </>
    ),
  },
];

const TABS = [
  { label: "근로 계약서", steps: CONTRACT_STEPS },
  { label: "출퇴근 관리", steps: ATTENDANCE_STEPS },
  { label: "예상급여확인", steps: PAYROLL_STEPS },
];

// 원본 상수: 단계당 3000ms, 3단계, 100ms 간격으로 진행도 갱신
const STEP_MS = 3000;
const STEP_COUNT = 3;
const TICK_MS = 100;
const CYCLE_MS = STEP_MS * STEP_COUNT;

/**
 * 단계 자동 진행 훅 (원본 h = useStepProgress)
 * - progress = ((지금 - 시작시각) % 9000) / 3000  → 0 ~ 3 사이 실수
 * - progress 가 이전보다 작아지면(한 바퀴 돌았으면) onCycleEnd 호출 → 다음 탭
 * - changeStep(n): 시작시각을 n 단계 전으로 당겨서 n 단계부터 다시 진행
 */
function useStepProgress(onCycleEnd: () => void) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const progressRef = useRef(0);
  const onCycleEndRef = useRef(onCycleEnd);

  useEffect(() => {
    onCycleEndRef.current = onCycleEnd;
  }, [onCycleEnd]);

  useEffect(() => {
    startRef.current = Date.now();
    const id = setInterval(() => {
      const next = ((Date.now() - startRef.current) % CYCLE_MS) / STEP_MS;
      const wrapped = next < progressRef.current; // 9초 한 바퀴 완료
      progressRef.current = next;
      setProgress(next);
      if (wrapped) onCycleEndRef.current();
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const changeStep = useCallback((step: number) => {
    startRef.current = Date.now() - ((STEP_MS * step) % CYCLE_MS);
    progressRef.current = step;
    setProgress(step);
  }, []);

  return { currentStep: Math.floor(progress % STEP_COUNT), changeStep };
}

/** 숫자 버튼 사이의 점 2개 구분자 */
function Dots() {
  return (
    <div className="inline-flex gap-[4px]">
      <span className="h-[4px] w-[4px] rounded-full bg-[#dedede]" />
      <span className="h-[4px] w-[4px] rounded-full bg-[#dedede]" />
    </div>
  );
}

/** 선택된 탭의 단계 화면 (탭 변경 시 key 로 재마운트) */
function StepContent({ steps, onCycleEnd }: { steps: Step[]; onCycleEnd: () => void }) {
  const { currentStep, changeStep } = useStepProgress(onCycleEnd);
  const step = steps[currentStep];

  return (
    <div className="relative flex w-full flex-col-reverse lg:flex-row">
      {/* 텍스트: 단계 번호 버튼 + 제목 + 설명 */}
      <div className="relative flex-1">
        <div className="mt-[32px] flex items-center justify-center gap-[6px] lg:mt-[178px] lg:justify-start lg:gap-[10px]">
          {[0, 1, 2].map((n) => (
            <span key={n} className="contents">
              {n > 0 && <Dots />}
              <button
                type="button"
                onClick={() => changeStep(n)}
                className={`inline-flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[6px] text-[16px] font-bold leading-[24px] lg:h-[48px] lg:w-[48px] lg:rounded-[10px] lg:text-[22px] lg:leading-[32px] ${
                  currentStep === n
                    ? "border-0 bg-[#ff5c00] text-white"
                    : "border border-[#dedede] bg-white text-[#333]"
                }`}
              >
                {n + 1}
              </button>
            </span>
          ))}
        </div>
        <h2 className="mt-[20px] text-center text-[22px] font-bold leading-[33px] tracking-[-0.44px] text-[#222] lg:mt-[28px] lg:text-left lg:text-[38px] lg:leading-[56px] lg:tracking-[-1px]">
          {step.title}
        </h2>
        <p className="mt-[8px] h-[108px] text-center text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-[#666] lg:mt-[16px] lg:text-left lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]">
          {step.content}
        </p>
      </div>
      {/* 앱 화면 이미지 (원본 1056×1120) — 단계 변경 시 key 로 재마운트되어 0.5s fade-in */}
      <Placeholder
        key={currentStep}
        label={`${step.title} 기능 안내 화면`}
        className="aspect-[33/35] w-full max-w-[480px] shrink-0 self-center rounded-[20px] opacity-0 [animation:fadeIn_0.5s_ease-in-out_forwards] lg:aspect-auto lg:h-[560px] lg:w-[528px] lg:max-w-none lg:self-auto"
      />
    </div>
  );
}

export default function UsageGuideSection() {
  // 선택된 탭 인덱스
  const [tabIndex, setTabIndex] = useState(0);

  // 3단계가 모두 끝나면 다음 탭으로 (마지막 → 처음)
  const goNextTab = useCallback(() => {
    setTabIndex((t) => (t === TABS.length - 1 ? 0 : t + 1));
  }, []);

  return (
    // ===== 사용법 안내: 탭 + 3단계 자동 슬라이드 =====
    <section className="relative bg-white px-[16px] py-[60px] lg:px-0 lg:py-[140px]">
      <div className="relative mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#202020] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] [&>strong]:text-[#ff5c00]">
          앱 설치 후 단 1분!
          <br />
          <strong>키퍼 사용법, 이렇게 쉽습니다</strong>
        </h2>
        <div className="mt-[36px]">
          {/* 탭 버튼 */}
          <div className="relative mx-auto mt-[28px] flex w-full max-w-[480px] justify-center overflow-hidden rounded-[8px] lg:mt-0 lg:w-[600px] lg:max-w-none lg:rounded-[10px]">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setTabIndex(i)}
                className={`flex h-[52px] flex-1 cursor-pointer items-center justify-center border text-[16px] font-bold leading-[23px] tracking-[-0.32px] transition-all duration-100 ease-in-out lg:h-[68px] lg:text-[22px] lg:leading-[31px] lg:tracking-[-0.44px] ${
                  i === 1 ? "mx-[-1px]" : ""
                } ${
                  tabIndex === i
                    ? "border-[#222] bg-[#222] text-white"
                    : "border-[#EBEDF2] bg-[#f5f5f5] text-[#666]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* 단계 콘텐츠 */}
          <div className="mt-[36px] flex h-full w-full lg:mt-[80px]">
            <StepContent key={tabIndex} steps={TABS[tabIndex].steps} onCycleEnd={goNextTab} />
          </div>
        </div>
      </div>
    </section>
  );
}
