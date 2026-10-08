/**
 * 매장운영 시스템 가이드 — 가이드 내용 2개 섹션
 * 1) "가이드북에는 어떤 내용이 들어있을까?" — PART 01~03 카드 (각 3개 소항목, 좌측 주황 바)
 * 2) "구조 하나 바꾸면" — STEP 01~04 카드 + 그라데이션 화살표 (모바일은 세로, 화살표 90도 회전)
 * - 정적 섹션. 문자열의 "\n" 은 white-space 설정에 따라 줄바꿈(원본 동일).
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

type Part = {
  part: string;
  title: string;
  desc: ReactNode;
  items: { num: string; title: string }[];
};

// 원본 데이터
const PARTS: Part[] = [
  {
    part: "PART 01",
    title: "알바가 남느냐 떠나느냐, \n첫 7일에 달려 있습니다",
    desc: (
      <>
        {"알바가 빨리 그만두는 이유 대부분은 첫 7일 안에 \n결정됩니다. 알바 한 명이 일주일 만에 그만두면 "}
        <br />
        {"채용 공고비, 교육 시간, 대타 비용까지 합쳐 \n실제 손실은 100만원이 넘습니다."}
      </>
    ),
    items: [
      { num: "01", title: "빠르게 적응하는 알바\n4가지 공통점" },
      { num: "02", title: "첫 7일 온보딩\n체크리스트" },
      { num: "03", title: "누가 가르쳐도 기준이 같아지는\n온보딩 문서 작성법 및 예시" },
    ],
  },
  {
    part: "PART 02",
    title: "출퇴근 기록·스케줄 관리·급여 정산, \n기록이 전부입니다",
    desc: "알바 관리가 힘든 이유는 사람이 많아서가 아니에요.\n운영 기준이 사장님 머릿속에만 있어서입니다.",
    items: [
      { num: "01", title: "당일 대타 연락을 막는\n스케줄 운영 원칙 4가지" },
      { num: "02", title: "단톡방 출근 체크가\n결국 분쟁이 되는 이유" },
      { num: "03", title: "급여 정산 시\n놓치기 쉬운 항목" },
    ],
  },
  {
    part: "PART 03",
    title: "사장님 없이도 흔들리지 않는 매장, \n시스템으로 만드세요",
    desc: "알바가 바뀌어도 같은 문제가 반복되는 이유, \n체계가 없어서입니다.",
    items: [
      { num: "01", title: "지각·무단결근·고객 응대 등\n문제 상황별 대응 매뉴얼" },
      { num: "02", title: "사장님이 없을 때 현장을\n파악할 수 있는 방법" },
      { num: "03", title: "출퇴근 기록·스케줄·급여·현장\n확인을 연결하는 운영 구조 만들기" },
    ],
  },
];

export function Parts() {
  return (
    // ===== 가이드북 구성 PART 카드 =====
    <section className="relative w-full bg-[#f4f4f4] px-4 py-[64px] lg:px-0 lg:pt-[148px] lg:pb-[120px]">
      <div className="relative mx-auto flex w-full flex-col items-center lg:w-[1080px]">
        <div className="mb-[40px] flex flex-col items-center gap-[10px] text-center lg:gap-[14px]">
          <h2 className="text-[26px] leading-[1.4] font-bold tracking-[-0.8px] text-[#202020] lg:text-[40px]">
            <span className="text-[#ff5c00]">가이드북</span>에는
            <br />
            어떤 내용이 들어있을까?
          </h2>
          <p className="text-[14px] leading-[1.4] font-normal tracking-[-0.36px] text-[rgba(32,32,32,0.6)] lg:text-[18px]">
            매장 운영의 핵심 3단계, 한 권에 모두 담았습니다.
          </p>
        </div>

        <div className="flex w-full max-w-[420px] flex-col gap-[16px] lg:w-[912px] lg:max-w-none lg:gap-[40px]">
          {PARTS.map((p) => (
            <div
              key={p.part}
              className="flex flex-col items-center gap-[16px] rounded-[14px] border border-black/6 bg-white p-[22px] lg:gap-[34px] lg:px-[50px] lg:py-[37px]"
            >
              {/* 상단: 텍스트 + 아이콘 이미지 (모바일은 이미지가 위 오른쪽) */}
              <div className="flex w-full flex-col-reverse justify-between lg:flex-row">
                <div className="flex flex-col whitespace-pre-wrap lg:whitespace-normal">
                  <span className="text-[14px] leading-[1.4] font-semibold tracking-[0.14px] text-[#ff5c00]">{p.part}</span>
                  <h3 className="mt-[4px] mb-[6px] text-[17px] leading-[1.4] font-semibold tracking-[-0.4px] text-[#202020] lg:text-[20px]">
                    {p.title}
                  </h3>
                  <p className="text-[13px] leading-[1.4] font-normal tracking-[-0.3px] whitespace-pre-line text-[rgba(32,32,32,0.6)] lg:text-[15px]">
                    {p.desc}
                  </p>
                </div>
                <Placeholder
                  label={`${p.part} img`}
                  kind="icon"
                  className="ml-auto mb-[-17px] h-[54px] w-[54px] shrink-0 lg:mb-0 lg:ml-0 lg:h-[90px] lg:w-[90px]"
                />
              </div>

              {/* 소항목 3개 (좌측 주황 바) */}
              <div className="flex w-full flex-col gap-[8px] lg:w-auto lg:flex-row lg:gap-[21px]">
                {p.items.map((it) => (
                  <div
                    key={it.num}
                    className="relative h-auto min-h-[80px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#f9f9f9] px-[26px] py-[16px] lg:h-[102px] lg:min-h-0 lg:w-[258px]"
                  >
                    <p className="mb-[4px] text-[13px] leading-[1.4] font-medium tracking-[-0.32px] text-[rgba(32,32,32,0.4)] lg:text-[16px]">
                      {it.num}
                    </p>
                    <p className="text-[14px] leading-[1.4] font-semibold tracking-[-0.3px] whitespace-pre-line text-[#202020] lg:text-[15px]">
                      {it.title}
                    </p>
                    <div className="absolute top-0 left-0 h-full w-[4px] bg-[#ff5c00]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 섹션 ---------- */

const ICON_PROPS = {
  className: "h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// 각 STEP 의 흰색 선 아이콘 (단순 UI 아이콘 재현)
const STEPS: { step: string; title: string; desc: string; icon: ReactNode }[] = [
  {
    step: "STEP 01",
    title: "기록",
    desc: "출퇴근부터 매장 운영\n데이터를 디지털로 기록",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    step: "STEP 02",
    title: "기준",
    desc: "사장님의 운영 기준을\n누구나 따를 수 있게 정리",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    ),
  },
  {
    step: "STEP 03",
    title: "자동화",
    desc: "급여, 스케줄, 반복 업무를\n시스템으로 자동화",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    step: "STEP 04",
    title: "운영",
    desc: "누가 근무해도 흔들리지\n않는 운영 시스템",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

/** STEP 사이 그라데이션 화살표 (원본 23x15) */
function GradientArrow() {
  return (
    <svg width="23" height="15" viewBox="0 0 23 15" fill="none" aria-hidden>
      <defs>
        <linearGradient id="guide-step-arrow" x1="0" x2="22" y1="7.5" y2="7.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5C00" stopOpacity="0" />
          <stop offset="1" stopColor="#FF5C00" />
        </linearGradient>
      </defs>
      <path d="M0 6.5h17.5L13 2l1.4-1.4L21.3 7.5l-6.9 6.9L13 13l4.5-4.5H0v-2Z" fill="url(#guide-step-arrow)" />
    </svg>
  );
}

export function Steps() {
  return (
    // ===== 구조 하나 바꾸면: STEP 4단계 =====
    <section className="relative w-full bg-[#0a0a0a] px-4 py-[64px] lg:px-0 lg:py-[140px]">
      <div className="relative mx-auto flex w-full flex-col items-center lg:w-[1080px]">
        <div className="mb-[40px] flex flex-col items-center gap-[10px] text-center lg:mb-[50px] lg:gap-[14px]">
          <h2 className="text-[26px] leading-[1.4] font-bold tracking-[-1px] whitespace-nowrap text-white lg:text-[40px] lg:tracking-[-0.8px] lg:whitespace-normal">
            <span className="text-[#ff5c00]">구조 하나 바꾸면,</span>
            <br />
            알바 관리 난이도가 확 달라집니다
          </h2>
          <p className="text-[14px] leading-[1.4] font-normal tracking-[-0.28px] text-white/80 lg:text-[18px] lg:tracking-[-0.36px] lg:text-white/60">
            완벽하게 갖추려 하지 않아도 됩니다.
            <br />
            오늘 딱 하나만 시작해보세요.
          </p>
        </div>

        <div className="flex w-full max-w-[420px] flex-col items-center gap-0 lg:w-auto lg:max-w-none lg:flex-row">
          {STEPS.map((s, i) => (
            <div key={s.step} className="flex w-full flex-col items-center lg:w-auto lg:flex-row">
              <div className="flex w-full flex-col rounded-[14px] border border-white/10 bg-white/4 px-[24px] py-[18px] lg:w-[206px] lg:p-[24px]">
                <div className="flex justify-between">
                  <span className="text-[14px] leading-[1.4] font-semibold tracking-[0.14px] text-[#ff5c00]">{s.step}</span>
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12.5px] bg-[linear-gradient(137deg,#ff8a49_11%,#ff5c00_99%)] lg:h-[50px] lg:w-[50px]">
                    {s.icon}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[18px] leading-[1.4] font-semibold tracking-[-0.4px] text-white lg:text-[20px]">{s.title}</p>
                  <p className="text-[13px] leading-[1.4] font-normal tracking-[-0.3px] whitespace-nowrap text-white/60 lg:text-[15px] lg:whitespace-pre-line">
                    {s.desc}
                  </p>
                </div>
              </div>
              {/* 마지막 STEP 뒤에는 화살표 없음 */}
              {i < STEPS.length - 1 && (
                <div className="my-[14px] shrink-0 rotate-90 lg:mx-[22px] lg:my-0 lg:rotate-0">
                  <GradientArrow />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
