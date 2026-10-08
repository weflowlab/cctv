/**
 * 2026 트렌드 리포트 Vol.2 — "Vol.2에는 어떤 내용이 들어있을까?" 섹션 (#fff3eb 배경)
 * - 주황 헤더 카드 3개:
 *   1) 지역이 결정하는 생존 확률 (종로구 안정형 vs 관악구 변동형)
 *   2) 상권의 유통기한 (자치구별 평균 영업 기간 막대 6개)
 *   3) 5대 핵심 업종별 명당 (Best 자치구 카드 5개, 모바일 3+2 그리드)
 * - 정적 섹션.
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { SpaceOrBreak } from "@/components/guides/shared/Breaks";
import { CheckCircleIcon } from "@/components/guides/shared/icons";

/* ---------- 헤더 아이콘 (단순 UI 아이콘 재현) ---------- */
const HEAD_ICON = "h-[16px] w-[16px] shrink-0 lg:h-[30px] lg:w-[30px]";

function PinIcon() {
  return (
    <svg className={HEAD_ICON} viewBox="0 0 33 33" fill="none" aria-hidden>
      <path
        d="M16.5 3C10.98 3 6.5 7.3 6.5 12.6c0 7.2 10 17.4 10 17.4s10-10.2 10-17.4C26.5 7.3 22.02 3 16.5 3Zm0 13.2a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z"
        fill="white"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className={HEAD_ICON} viewBox="0 0 30 30" fill="none" aria-hidden>
      <circle cx="15" cy="15" r="12.5" fill="white" stroke="white" strokeWidth="2.5" />
      <path d="M15 7.5V15L20 17.5" stroke="#FF6C3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg className={HEAD_ICON} viewBox="0 0 30 30" fill="none" aria-hidden>
      <path d="M9 4h12v7a6 6 0 0 1-12 0V4Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7H5v2a4 4 0 0 0 4 4M21 7h4v2a4 4 0 0 1-4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 17v5M10 26h10M12 22h6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RankIcon() {
  return (
    <svg className="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="16" width="6" height="12" rx="1.5" fill="#444" />
      <rect x="13" y="6" width="6" height="22" rx="1.5" fill="#FF6C3A" />
      <rect x="22" y="12" width="6" height="16" rx="1.5" fill="#444" />
    </svg>
  );
}

/* ---------- 공통 틀 ---------- */

/** 주황 헤더 카드 */
function ReportCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="mt-[24px] overflow-hidden rounded-[20px] shadow-[0_1.25px_3.75px_0_rgba(0,0,0,0.1),0_1.25px_2.5px_-1.25px_rgba(0,0,0,0.1)] lg:mt-[40px]">
      <header className="flex h-[45px] items-center justify-center gap-[8px] bg-[#ff6c3a] px-[14px] lg:h-[75px] lg:justify-start lg:gap-[15px] lg:px-[30px]">
        {icon}
        <h3 className="text-[15px] leading-[21px] font-bold tracking-[-1px] text-white lg:text-[24px] lg:leading-[32px]">{title}</h3>
      </header>
      <div className="bg-white px-[16px] pt-[24px] pb-[16px] lg:px-[40px] lg:pt-[32px] lg:pb-[40px]">{children}</div>
    </section>
  );
}

const LEAD = "text-center text-[14px] leading-[20px] font-medium tracking-[-0.5px] text-[#202020] lg:text-left lg:text-[18px] lg:leading-[29px]";

/** 체크 아이콘 + 안내문 2줄 */
function CheckRows({ rows }: { rows: string[] }) {
  return (
    <div className="mt-[16px]">
      {rows.map((row) => (
        <div
          key={row}
          className="flex items-stretch gap-[6px] text-[14px] leading-[22px] font-normal tracking-[-0.42px] text-[#666] [&+&]:mt-[8px] lg:items-center lg:gap-[8px] lg:text-[17px] lg:leading-[28px] lg:tracking-[-0.5px]"
        >
          <CheckCircleIcon className="mt-[4px] h-[16px] w-[16px] shrink-0 self-start lg:mt-0 lg:h-[20px] lg:w-[20px] lg:self-auto" />
          {row}
        </div>
      ))}
    </div>
  );
}

/* ---------- 카드 1: 안정형 vs 변동형 ---------- */

function GuCard({ tone, name, category, img }: { tone: "green" | "red"; name: string; category: string; img: string }) {
  const style =
    tone === "green"
      ? { box: "border-[rgba(34,197,94,0.20)] bg-[#F0FFF4]", text: "text-[#22C55E]" }
      : { box: "border-[rgba(239,68,68,0.20)] bg-[#FFF0F0]", text: "text-[#FF5E5E]" };
  return (
    <div className={`relative flex grow flex-col items-center justify-center rounded-[18px] border py-[26px] lg:py-[28px] ${style.box}`}>
      <Placeholder label={img} kind="icon" className="aspect-square w-[76px] lg:w-[108px]" />
      <div className="mt-[18px] flex flex-col items-center justify-center gap-[4px] lg:flex-row lg:gap-[8px]">
        <strong className="text-[17px] leading-[22px] font-bold tracking-normal text-[#3c3c3c] lg:text-[24px] lg:leading-[30px]">{name}</strong>
        <span className={`text-[13px] leading-[21px] font-medium tracking-[-0.5px] lg:text-[18px] lg:leading-[29px] ${style.text}`}>{category}</span>
      </div>
    </div>
  );
}

/* ---------- 카드 2: 평균 영업 기간 ---------- */

const BAR_COLORS = { green: "#22C55E", yellow: "#EAB308", red: "#EF4444" } as const;
const DURATIONS: { color: keyof typeof BAR_COLORS; left: string; right: string; percent: number }[] = [
  { color: "green", left: "중구", right: "4년", percent: 75 },
  { color: "green", left: "종로구", right: "3.9년", percent: 73 },
  { color: "yellow", left: "서초구", right: "3.7년", percent: 69 },
  { color: "yellow", left: "마포구", right: "3.5년", percent: 65 },
  { color: "red", left: "강서구", right: "3.3년", percent: 61 },
  { color: "red", left: "강북구", right: "3.2년", percent: 60 },
];

/* ---------- 카드 3: 업종별 명당 ---------- */

const BEST = [
  { type: "한식", gu: "종로구" },
  { type: "카페", gu: "서초구" },
  { type: "치킨", gu: "강남구" },
  { type: "미용", gu: "마포구" },
  { type: "편의점", gu: "중구" },
];

export default function Vol2Contents() {
  return (
    // ===== Vol.2 콘텐츠 소개 =====
    <section className="relative flex justify-center bg-[#fff3eb] px-4 py-[60px] lg:px-0 lg:py-[140px]">
      <div className="relative w-full max-w-[420px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-black lg:text-[42px] lg:leading-[60px]">
          2026년 창업 트렌드 Vol.2에는
          <br />
          <strong className="text-[#ff5c00]">어떤 내용이 들어있을까?</strong>
        </h2>

        {/* ----- 카드 1 ----- */}
        <ReportCard icon={<PinIcon />} title="지역이 결정하는 생존 확률">
          <p className={LEAD}>
            종로구(57%)와 관악구(41%)의 생존율 차이는
            <SpaceOrBreak />
            어디에서 올까요?
            <br />
            내가 들어갈 상권의 기초 체력을 미리 파악하세요.
          </p>
          <CheckRows
            rows={[
              "신규 창업 대비 폐업률이 낮은 '안정형 상권'과 회전율이 높은 '변동형 상권'의 특징 분석",
              "내 사업장의 예상 수명을 미리 가늠해 볼 수 있는 25개 자치구 연차별 생존 확률 전수 공개",
            ]}
          />
          <div className="relative mt-[24px] flex items-center gap-[22px] lg:mt-[32px] lg:gap-[20px]">
            <GuCard tone="green" name="종로구" category="안정형 상권" img="종로구" />
            <div className="absolute top-1/2 left-1/2 z-[1] inline-flex h-[54px] w-[54px] shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#eaeaea] text-[23px] leading-[34px] font-bold tracking-normal text-[#717182] lg:static lg:h-[50px] lg:w-[50px] lg:translate-x-0 lg:translate-y-0 lg:border-0 lg:text-[25px] lg:leading-[38px]">
              VS
            </div>
            <GuCard tone="red" name="관악구" category="변동형 상권" img="관악구" />
          </div>
        </ReportCard>

        {/* ----- 카드 2 ----- */}
        <ReportCard icon={<ClockIcon />} title="상권의 유통기한 파악하기">
          <p className={LEAD}>
            내가 진입하려는 업종이 이 상권에서 평균 몇 년을 버티는지, 투자금 회수를 위한 필수 정보를 확인해보세요.
          </p>
          <CheckRows
            rows={[
              "평균 영업 기간 4년(중구) vs 3.2년(강북구) 데이터를 바탕으로 본 상권의 수명 주기 파악",
              "우리 동네 매장들의 평균적인 교체 주기를 파악할 수 있는 업력 데이터 분석",
            ]}
          />
          <div className="mt-[24px] w-full rounded-[18px] bg-[#f5f5f7] p-[16px] lg:mt-[32px] lg:px-[30px] lg:py-[24px]">
            <div className="flex items-center">
              <RankIcon />
              <h4 className="ml-[4px] text-[15px] leading-[20px] font-bold tracking-[-0.5px] text-[#1e1e30] lg:text-[18px] lg:leading-[24px]">
                자치구별 평균 영업 기간
              </h4>
              <div className="ml-auto inline-block rounded-[4px] bg-[#dcdce4] px-[5px] py-[2px] text-[12px] leading-[16px] font-semibold text-[#727284] lg:ml-[14px] lg:text-[13px] lg:leading-[17px]">
                미리보기
              </div>
            </div>
            <div className="mt-[16px] flex flex-col gap-[8px] lg:mt-[36px] lg:grid lg:grid-cols-2 lg:gap-x-[16px] lg:gap-y-[10px]">
              {DURATIONS.map((d) => (
                <div key={d.left} className="h-[48px] w-full flex-1 rounded-[8px] bg-white px-[24px] py-[16px] lg:h-auto lg:rounded-[12px]">
                  <div className="flex w-full items-center gap-[10px] lg:gap-[15px]">
                    <p className="shrink-0 basis-[44px] text-left text-[14px] leading-[20px] font-semibold tracking-[-0.5px] text-[#1e1e30] lg:basis-[50px] lg:text-[17px] lg:leading-[24px] lg:tracking-normal">
                      {d.left}
                    </p>
                    <div className="relative h-[13px] shrink grow rounded-full bg-[#f5f5f7]">
                      <div
                        className="absolute top-0 bottom-0 left-0 rounded-full"
                        style={{ width: `${d.percent}%`, backgroundColor: BAR_COLORS[d.color] }}
                      />
                    </div>
                    <p
                      className="shrink-0 basis-[44px] text-right text-[14px] leading-[20px] font-semibold tracking-[-0.5px] lg:basis-[50px] lg:text-[17px] lg:leading-[24px] lg:tracking-normal"
                      style={{ color: BAR_COLORS[d.color] }}
                    >
                      {d.right}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[16px] text-right text-[10px] leading-[15px] font-normal tracking-normal text-[#717182] lg:text-[14px] lg:leading-[21px]">
              *상세 순위는 리포트에서 확인하세요
            </p>
          </div>
        </ReportCard>

        {/* ----- 카드 3 ----- */}
        <ReportCard icon={<TrophyIcon />} title="5대 핵심 업종별 맞춤 명당 분석">
          <p className={LEAD}>각 업종이 가장 긴 생존력을 보이는 자치구는 어디인지, 데이터로 증명된 &apos;명당&apos;을 공개합니다.</p>
          <CheckRows
            rows={[
              "각 업종이 가장 강력한 생존력을 보이는 '꿀 상권' 공개",
              "동일 업종이라도 자치구에 따라 달라지는 생존 기간과 폐업률 데이터 비교",
            ]}
          />
          {/* 모바일: 6열 그리드에서 앞 2개 span 3, 나머지 span 2 / PC: 5열 flex */}
          <div className="mt-[32px] grid grid-cols-6 gap-[8px] lg:flex lg:gap-[16px]">
            {BEST.map((b, i) => (
              <div
                key={b.type}
                className={`flex-1 rounded-[8px] bg-[#f5f5f7] p-[16px] lg:rounded-[20px] lg:p-[24px] ${i < 2 ? "col-span-3" : "col-span-2"}`}
              >
                <p className="text-center text-[15px] leading-[19px] font-bold tracking-normal text-[#1e1e30] lg:text-[20px] lg:leading-[25px]">{b.type}</p>
                <div className="mt-[4px] flex items-center justify-center gap-[4px] text-[14px] leading-[18px] font-bold tracking-[-0.4px] text-[#ff6c3a] lg:mt-[12px] lg:text-[17px] lg:leading-[22px] lg:tracking-[-0.5px]">
                  <div className="inline-block rounded-[831px] bg-[#ff6c3a] px-[5px] pt-0 pb-[1px] text-[8px] leading-[10px] font-semibold tracking-normal text-white lg:rounded-[1000px] lg:text-[13px] lg:leading-[17px]">
                    Best
                  </div>
                  {b.gu}
                </div>
              </div>
            ))}
          </div>
          {/* PC 에서만 노출되는 안내 문구 */}
          <p className="mt-[18px] hidden text-center text-[14px] leading-[21px] font-normal tracking-normal text-[#919191] lg:block">
            *실제 데이터 기반 명당 분석 결과는 리포트에서 확인하세요
          </p>
        </ReportCard>
      </div>
    </section>
  );
}
