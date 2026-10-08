/**
 * 2026 트렌드 리포트 Vol.1 — "Vol.1에는 어떤 내용이 들어있을까?" 섹션 (#fff3eb 배경)
 * - 주황 헤더 카드 3개:
 *   1) 뜨는 업종 vs 지는 업종 (파랑/빨강 비교 박스 + VS 배지 + 요약 수치 3개)
 *   2) 지역의 '진짜' 모습 (자치구별 유동인구 순위 미리보기 막대)
 *   3) 적정 임대료 가이드 (최고/최저 임대료 비교)
 * - 정적 섹션. 부모 white-space: pre-wrap 으로 "\n" 이 줄바꿈된다.
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { CheckCircleIcon, TrendArrowIcon } from "@/components/guides/shared/icons";

/* ---------- 작은 아이콘들 (단순 UI 아이콘 재현) ---------- */

/** 카드 헤더 아이콘: 막대 차트 */
function ChartIcon() {
  return (
    <svg className="h-[16px] w-[16px] lg:h-[28px] lg:w-[28px]" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="3" y="14" width="5" height="11" rx="1.5" fill="white" />
      <rect x="11.5" y="8" width="5" height="17" rx="1.5" fill="white" />
      <rect x="20" y="3" width="5" height="22" rx="1.5" fill="white" />
    </svg>
  );
}
/** 카드 헤더 아이콘: 지도 핀 */
function PinIcon() {
  return (
    <svg className="h-[16px] w-[16px] lg:h-[33px] lg:w-[33px]" viewBox="0 0 33 33" fill="none" aria-hidden>
      <path
        d="M16.5 3C10.98 3 6.5 7.3 6.5 12.6c0 7.2 10 17.4 10 17.4s10-10.2 10-17.4C26.5 7.3 22.02 3 16.5 3Zm0 13.2a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z"
        fill="white"
      />
    </svg>
  );
}
/** 카드 헤더 아이콘: 원화(₩) 기호 */
function WonIcon() {
  return (
    <svg className="h-[16px] w-[16px] lg:h-[33px] lg:w-[33px]" viewBox="0 0 33 33" fill="none" aria-hidden>
      <path d="M16.5 3.625V28.625" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22.75 8.625H13.375a4.375 4.375 0 0 0 0 8.75h6.25a4.375 4.375 0 0 1 0 8.75H9.25"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
/** 미리보기 박스 타이틀 아이콘: 순위 막대 */
function RankIcon() {
  return (
    <svg className="h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="4" y="16" width="6" height="12" rx="1.5" fill="#444" />
      <rect x="13" y="6" width="6" height="22" rx="1.5" fill="#FF6C3A" />
      <rect x="22" y="12" width="6" height="16" rx="1.5" fill="#444" />
    </svg>
  );
}
/** 큰 화살표 장식 (뜨는/지는 업종 박스 우상단, 5% 투명도) */
function BigArrow({ up }: { up: boolean }) {
  return up ? (
    <svg className="h-[121.7px] w-[66.1px] lg:h-[198px] lg:w-[108px]" viewBox="0 0 108 198" fill="none" aria-hidden>
      <path d="M54 0 108 60H74v138H34V60H0L54 0Z" fill="#3F85CB" />
    </svg>
  ) : (
    <svg className="h-[121.7px] w-[66.1px] lg:h-[137px] lg:w-[108px]" viewBox="0 0 108 137" fill="none" aria-hidden>
      <path d="M54 137 108 77H74V0H34v77H0l54 60Z" fill="#6E4949" />
    </svg>
  );
}

/* ---------- 뜨는/지는 업종 비교 박스 ---------- */

type Item = { name: string; value: string };
const RISING: Item[] = [
  { name: "피부관리실", value: "+28.8%" },
  { name: "무인 매장", value: "+22.3%" },
  { name: "특수음식점", value: "+18.5%" },
];
const FALLING: Item[] = [
  { name: "호프/주점", value: "-12.4%" },
  { name: "PC방", value: "-9.7%" },
  { name: "세탁소", value: "-8.2%" },
];

function TrendBox({ up }: { up: boolean }) {
  const items = up ? RISING : FALLING;
  const color = up ? "#3B82F6" : "#EF4444";
  return (
    <div
      className={`relative flex w-full flex-col rounded-[12px] border-[2.5px] p-[18px] lg:w-1/2 lg:rounded-[20px] lg:p-[30px] ${
        up
          ? "border-[rgba(59,130,246,0.2)] bg-[linear-gradient(180deg,#eff8ff_0%,#dbeafe_100%)]"
          : "border-[rgba(239,68,68,0.2)] bg-[linear-gradient(180deg,#fff5f5_0%,#fee2e2_100%)]"
      }`}
    >
      {/* 박스 헤더: 아이콘 + 제목 + 큰 화살표 장식 */}
      <div className="mb-[16px] flex gap-[6px] lg:mb-[32px] lg:gap-[10px]">
        <div
          className={`flex h-[36.88px] w-[36.88px] items-center justify-center rounded-[10.758px] lg:h-[60px] lg:w-[60px] lg:rounded-[17.5px] ${
            up
              ? "bg-[#3b82f6] shadow-[0_12.5px_18.75px_-3.75px_rgba(59,130,246,0.3),0_5px_7.5px_-5px_rgba(59,130,246,0.3)]"
              : "bg-[#ef4444] shadow-[0_12.5px_18.75px_-3.75px_rgba(239,68,68,0.3),0_5px_7.5px_-5px_rgba(239,68,68,0.3)]"
          }`}
        >
          <TrendArrowIcon up={up} color="white" className="h-[18.44px] w-[18.44px] lg:h-[30px] lg:w-[30px]" />
        </div>
        <div>
          <p className={`text-[17px] leading-[1.4] font-bold lg:text-[28px] ${up ? "text-[#3b82f6]" : "text-[#ef4444]"}`}>
            {up ? "뜨는 업종" : "지는 업종"}
          </p>
          <p className={`text-[11px] leading-[1.4] font-medium lg:text-[14px] ${up ? "text-[rgba(59,130,246,0.6)]" : "text-[rgba(239,68,68,0.6)]"}`}>
            {up ? "RISING" : "FALLING"}
          </p>
        </div>
        <div
          className={`absolute opacity-5 ${
            up ? "top-[12px] right-[24px] lg:top-[20px] lg:right-[40px]" : "top-[-20px] right-[18px] lg:top-[-4px] lg:right-[40px]"
          }`}
        >
          <BigArrow up={up} />
        </div>
      </div>

      {/* 업종 리스트 */}
      <div className="relative z-[1] flex flex-col gap-[5px] lg:gap-[8px]">
        {items.map((it) => (
          <div
            key={it.name}
            className={`flex items-center rounded-[9.836px] border-[0.768px] bg-white/70 px-[12.3px] py-[10px] lg:rounded-[16px] lg:border-[1.25px] lg:px-[20px] lg:py-[18px] ${
              up ? "border-[rgba(59,130,246,0.1)]" : "border-[rgba(239,68,68,0.1)]"
            }`}
          >
            <Placeholder label={it.name} kind="icon" className="h-[19.67px] w-[19.67px] shrink-0 rounded-[4px] lg:h-[32px] lg:w-[32px]" />
            <p className="mr-auto ml-[7.38px] text-[12px] leading-[1.4] font-semibold text-[#1e1e30] lg:ml-[12px] lg:text-[18px]">
              {it.name}
            </p>
            <TrendArrowIcon up={up} color={color} className="h-[10.76px] w-[10.76px] lg:h-[18px] lg:w-[18px]" />
            <p
              className={`mr-[2px] ml-[3px] w-[44px] text-left text-[12px] leading-[1.4] font-bold lg:mr-[4px] lg:ml-[5px] lg:w-[60px] lg:text-[18px] lg:leading-[1.5] ${
                up ? "text-[#3b82f6]" : "text-[#ef4444]"
              }`}
            >
              {it.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[10px] flex items-center gap-[3.6px] lg:mt-[20px] lg:gap-[6px]">
        <svg className="h-[12px] w-[12px] lg:h-[18px] lg:w-[18px]" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="7" stroke={up ? "#7CACFA" : "#F58484"} strokeWidth="1.46" />
          <path d="M9 5.5V9l2.3 1.5" stroke={up ? "#7CACFA" : "#F58484"} strokeWidth="1.46" strokeLinecap="round" />
        </svg>
        <p className={`text-[10px] leading-[1.4] font-medium lg:text-[14px] ${up ? "text-[#7cacfa]" : "text-[#f58484]"}`}>
          최근 1년 점포 수 증가율
        </p>
      </div>
    </div>
  );
}

/* ---------- 공통 카드 틀 ---------- */

function ContentBox({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_1.25px_3.75px_0_rgba(0,0,0,0.1),0_1.25px_2.5px_-1.25px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-center gap-[8px] bg-[#ff6c3a] px-[14px] py-[12px] text-[15px] leading-[1.4] font-bold tracking-[-1px] text-white lg:justify-start lg:gap-[16px] lg:px-[30px] lg:pt-[20px] lg:pb-[22px] lg:text-[24px] lg:leading-normal">
        {icon}
        {title}
      </div>
      <div className="px-[16px] py-[24px] lg:px-[40px] lg:py-[32px]">{children}</div>
    </div>
  );
}

/** 체크 아이콘이 붙은 안내 문장 목록 */
function Guides({ rows, className = "" }: { rows: string[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-[6.8px] text-[14px] leading-[1.6] font-normal tracking-[-0.5px] text-[#666] lg:gap-[8px] lg:text-[17px] ${className}`}>
      {rows.map((row) => (
        <p key={row} className="flex items-start gap-[6.8px] lg:items-center lg:gap-[8px]">
          <CheckCircleIcon className="h-[22px] w-[18px] min-w-[18px] lg:h-[20px] lg:w-[20px] lg:min-w-[20px]" />
          {row}
        </p>
      ))}
    </div>
  );
}

const DESC = "text-center text-[14px] leading-[1.4] font-medium tracking-[-0.5px] whitespace-pre-wrap text-[#202020] lg:text-left lg:text-[18px] lg:leading-[1.6] lg:whitespace-nowrap";

// 자치구별 유동인구 순위 미리보기 (막대 길이는 원본 CSS 수치)
const RANKS = [
  { gu: "강남구", width: "92%" },
  { gu: "중구", width: "88.2%" },
  { gu: "종로구", width: "84.2%" },
  { gu: "마포구", width: "76.5%" },
  { gu: "영등포구", width: "72.6%" },
];

export default function Vol1Contents() {
  return (
    // ===== Vol.1 콘텐츠 소개: 주황 헤더 카드 3개 =====
    <div className="relative flex w-full flex-col items-center justify-center bg-[#fff3eb] px-4 py-[64px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[32px] lg:w-[1080px] lg:max-w-none lg:gap-[40px]">
        <h2 className="text-center text-[26px] leading-[1.4] font-bold tracking-[-1px] whitespace-pre-wrap text-black lg:text-[42px] lg:leading-[1.44] lg:whitespace-nowrap">
          {"2026년 창업 트렌드\n Vol.1에는"}
          <br />
          <strong className="text-[#ff5c00]">어떤 내용이 들어있을까?</strong>
        </h2>

        <div className="flex flex-col gap-[24px] lg:gap-[40px]">
          {/* ----- 카드 1: 뜨는 업종 vs 지는 업종 ----- */}
          <ContentBox icon={<ChartIcon />} title="데이터가 증명하는 2026 뜨는 업종 vs 지는 업종">
            <div className={DESC}>
              {"요즘 많이 보이는 업종이라고 해서\n 무턱대고 도전하면 안 돼요!"}
              <br />
              {"점포 수 추이, 개/폐업률 데이터를 통해\n 뜨는 업종과 지는 업종을 확인해보세요."}
            </div>

            {/* 비교 박스 + 가운데 VS 배지 */}
            <div className="relative mt-[32px] mb-[24px] flex flex-col gap-[14px] lg:mt-[24px] lg:mb-[44px] lg:flex-row lg:gap-[24px]">
              <TrendBox up />
              <TrendBox up={false} />
              <div className="absolute top-1/2 left-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3.2px] border-white bg-[#1e1e30] text-[19.2px] leading-[1.5] font-black text-white lg:top-[161px] lg:left-[450px] lg:h-[100px] lg:w-[100px] lg:translate-x-0 lg:translate-y-0 lg:border-[5px] lg:text-[30px]">
                VS
              </div>
            </div>

            <Guides
              rows={[
                "서울시 점포 5개 중 1개는 '한식' 업종, 압도적인 점유율 뒤에 숨겨진 치열한 경쟁 상황 분석",
                "최근 1년간 점포 수 28.8% 급증하며 새로운 블루오션으로 떠오른 '피부관리실' 트렌드 진단",
                " 치킨, 카페 등 포화 업종의 자치구별 점유율 데이터를 통한 진입 장벽 확인",
              ]}
            />

            {/* 요약 수치 3개 */}
            <div className="mt-[32px] flex flex-col gap-[8px] lg:mt-[30px] lg:flex-row lg:gap-[16px]">
              {[
                { v: "20%", label: "한식 점포 점유율", bg: "bg-[#fff5f0]", fg: "text-[#ff6c3a]", c: "#FF6C3A", up: true },
                { v: "+28.8%", label: "피부관리실 증가율", bg: "bg-[#f0f7ff]", fg: "text-[#3b82f6]", c: "#3B82F6", up: true },
                { v: "포화", label: "치킨·카페 업종", bg: "bg-[#fff0f0]", fg: "text-[#ef4444]", c: "#EF4444", up: false },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`flex flex-1 flex-row items-center justify-center rounded-[10px] px-[32px] py-[24px] lg:flex-col lg:rounded-[17.5px] lg:p-[24px] ${s.bg}`}
                >
                  <TrendArrowIcon up={s.up} color={s.c} className="h-[30px] w-[30px]" />
                  <strong className={`mr-[16px] ml-[24px] text-center text-[22px] leading-[1.4] font-extrabold lg:mx-0 lg:mt-[6px] lg:mb-[4px] lg:text-[30px] ${s.fg}`}>
                    {s.v}
                  </strong>
                  <p className="text-[12px] leading-[1.6] font-normal tracking-[-0.5px] text-[#666] lg:text-[15px]">{s.label}</p>
                </div>
              ))}
            </div>
          </ContentBox>

          {/* ----- 카드 2: 지역의 '진짜' 모습 ----- */}
          <ContentBox icon={<PinIcon />} title="내가 가려는 지역의 '진짜' 모습은?">
            <div className={DESC}>{"유동인구의 차이가 매출에 어떤 영향을 줄까요?\n 지역별 인구 밀도와 임대료 추이를 숫자로 확인하세요."}</div>
            <Guides
              className="mt-[16px] mb-[24px] lg:mb-[32px]"
              rows={[
                "단순히 지나가는 '흐르는 인구'와 실제 매출로 이어지는 '머무는 인구'의 상권별 특징 비교",
                "내 업종에 유리한 인구 밀집 지역을 찾기 위한 25개 자치구별 유동인구 순위표 제공",
              ]}
            />
            {/* 순위 미리보기 */}
            <div className="flex flex-col rounded-[10px] bg-[#f5f5f7] p-[16px] lg:rounded-[17.5px] lg:px-[30px] lg:py-[24px]">
              <div className="flex items-center">
                <RankIcon />
                <p className="mr-[14px] ml-[4px] text-[15px] leading-[1.3] font-bold tracking-[-0.5px] text-[#1e1e30] lg:text-[18px]">
                  자치구별 유동인구 순위
                </p>
                <span className="ml-auto flex items-center justify-center rounded-[4px] bg-[#dcdce4] px-[6px] pt-[3px] pb-[3.5px] text-[12px] leading-[1.3] font-semibold text-[#727284] lg:ml-0 lg:text-[13px]">
                  미리보기
                </span>
              </div>
              <div className="mt-[10px] mb-[6px] flex flex-col gap-[13.27px] lg:mt-[24px] lg:mb-[14px] lg:gap-[15px]">
                {RANKS.map((r, i) => (
                  <div key={r.gu} className="flex items-center">
                    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#ff6c3a] text-[10px] leading-[1.5] font-bold text-white lg:h-[28px] lg:w-[28px] lg:text-[12.8px]">
                      {i + 1}
                    </div>
                    <div className="ml-[4px] w-[64px] text-[14px] leading-[1.4] font-normal text-[#3a3a4a] lg:ml-[12px] lg:w-[100px] lg:text-[18px]">
                      {r.gu}
                    </div>
                    <div className="relative flex h-[13px] flex-[1_0_0] rounded-full bg-white lg:h-[15px]">
                      <div
                        className="absolute h-full rounded-full bg-[linear-gradient(270deg,#ff6c3a_0%,#ffaa80_100%)]"
                        style={{ width: r.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-auto text-right text-[10px] leading-[1.5] font-normal tracking-[-0.5px] text-[#717182] lg:text-[14px]">
                *상세 순위는 리포트에서 확인하세요
              </div>
            </div>
          </ContentBox>

          {/* ----- 카드 3: 적정 임대료 가이드 ----- */}
          <ContentBox icon={<WonIcon />} title="내 수익을 지키는 적정 임대료 가이드">
            <Guides
              rows={[
                "평당 25만 원(중구)부터 8만 원(중랑구)까지, 서울 내 3배 이상 벌어지는 임대료 격차 비교",
                "임대료가 높은 상위 지역과 낮은 하위 지역의 실제 임대 비용 격차 분석",
              ]}
            />
            <div className="relative mt-[24px] flex items-center gap-[10px] text-center text-[13px] leading-[1.5] font-normal text-[#717182] lg:mt-[32px] lg:gap-[20px] lg:text-[15px]">
              <div className="flex flex-[1_0_0] flex-col items-center gap-0 rounded-[10px] border-[1.25px] border-[rgba(255,108,58,0.2)] bg-[#fff5f0] py-[24px] lg:gap-[8px] lg:rounded-[17.5px]">
                <p>최고 임대료 (중구)</p>
                <div className="flex items-center text-center text-[16.67px] leading-[1.3] font-extrabold text-[#ff6c3a] lg:text-[20px]">
                  <b className="text-[33.33px] leading-[1.2] lg:text-[40px]">25</b>
                  <span className="translate-y-[4px] lg:translate-y-0"> 만원/평</span>
                </div>
              </div>
              <div className="absolute left-1/2 flex h-[38px] w-[38px] -translate-x-1/2 items-center justify-center rounded-full border-[2.478px] border-white bg-[#eaeaea] text-[16px] leading-[1.5] font-bold text-[#717182] lg:static lg:h-[50px] lg:w-[50px] lg:shrink-0 lg:translate-x-0 lg:border-0 lg:text-[25px]">
                <span>vs</span>
              </div>
              <div className="flex flex-[1_0_0] flex-col items-center gap-0 rounded-[10px] border-[1.25px] border-[rgba(59,130,246,0.2)] bg-[#f0f7ff] py-[24px] lg:gap-[8px] lg:rounded-[17.5px]">
                <p>최저 임대료 (중랑구)</p>
                <div className="flex items-center text-center text-[16.67px] leading-[1.3] font-extrabold text-[#3b82f6] lg:text-[20px]">
                  <b className="text-[33.33px] leading-[1.2] lg:text-[40px]">8</b>
                  <span className="translate-y-[4px] lg:translate-y-0"> 만원/평</span>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>
      </div>
    </div>
  );
}
