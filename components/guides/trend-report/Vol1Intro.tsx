/**
 * 2026 트렌드 리포트 Vol.1 — 상단 3개 섹션
 * 1) 히어로: 칩 + 타이틀 이미지 + "카카오 채널 추가하고 Vol.1 무료 리포트 다운로드" 버튼 + 차트 이미지
 *    - 원본: 버튼 클릭 시 이벤트(2026_trend_report1_click) 후 카카오 채널 친구추가 페이지를 새 창으로 연다.
 * 2) 문제 제기: 남색 배경 + 폐업률 원형 게이지 카드 3개(25% / 15% / 70%)
 * 3) 정보의 질: 흰 배경 + 이미지 박스(위쪽 뾰족 장식)
 * - 부모 컨테이너가 white-space: pre-wrap 이라 문자열 안의 "\n" 이 실제 줄바꿈이 된다(원본 동일).
 */
import Placeholder from "@/components/common/Placeholder";
import { DownloadIcon, KakaoIcon } from "@/components/guides/shared/icons";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_Zxjixhn/friend";

/** 원형 게이지 (원본 120x120 SVG: 회색 트랙 + 주황 진행 호) */
function PercentRing({ percent }: { percent: number }) {
  const r = 55.2;
  const c = 2 * Math.PI * r;
  return (
    <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 120 120" fill="none" aria-hidden>
      <circle cx="60" cy="60" r={r} stroke="white" strokeOpacity="0.1" strokeWidth="9.6" />
      <circle
        cx="60"
        cy="60"
        r={r}
        stroke="#FF5C00"
        strokeWidth="9.6"
        strokeLinecap="round"
        strokeDasharray={`${(c * percent) / 100} ${c}`}
      />
    </svg>
  );
}

const STATS = [
  { percent: 25, strong: "창업 1년", rest: " 내 폐업률" },
  { percent: 15, strong: "3년 내", rest: " 추가 폐업률" },
  { percent: 70, strong: "5년 내", rest: " 누적 폐업률" },
];

export function Vol1Hero() {
  return (
    // ===== Vol.1 히어로: 어두운 배경 + 주황 글로우, 카카오 채널 CTA =====
    <div className="relative flex w-full flex-col items-center overflow-hidden bg-[#1f1f1f] pt-[calc(var(--header-height-mobile)+40px)] lg:pt-[calc(var(--header-height)+140px)]">
      <div className="relative m-0 flex w-auto flex-col items-center p-0 lg:w-[1080px] lg:items-stretch lg:pb-[140px]">
        {/* 주황 블러 글로우 */}
        <div className="absolute bottom-[54px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-[531px] bg-[rgba(255,108,58,0.12)] blur-[40px] lg:top-[120px] lg:right-[-740px] lg:bottom-auto lg:left-auto lg:h-[1122px] lg:w-[1286px] lg:translate-x-0 lg:rounded-[1286px] lg:blur-[70px]" />
        {/* 건물 배경 이미지 */}
        <Placeholder
          label="bg"
          dark
          className="absolute bottom-[-54%] left-1/2 h-[300px] w-[360px] -translate-x-1/2 opacity-66 lg:right-[-40%] lg:bottom-[-26px] lg:left-auto lg:h-[560px] lg:w-[900px] lg:translate-x-0"
        />

        <span className="z-[1] mb-[32px] flex w-fit justify-center rounded-full border-[1.25px] border-[rgba(255,108,58,0.3)] bg-[rgba(255,108,58,0.15)] px-[14px] py-[7px] text-[13px] font-semibold tracking-[-1px] text-[#ff6c3a] lg:mb-[44px] lg:px-[21px] lg:py-[10px] lg:text-[18px]">
          Vol.1 무료 리포트
        </span>
        <p className="z-[1] mb-[24px] text-[14px] leading-[1.54] font-medium tracking-[-0.28px] text-white lg:mb-[22px] lg:text-[24px] lg:leading-[1.6] lg:tracking-[-0.48px]">
          2026 창업을 준비하신다면, 감이 아닌 숫자로 시작하세요
        </p>
        {/* 타이틀 이미지 (PC/모바일 SVG 별도) */}
        <Placeholder
          label="title"
          dark
          className="z-[1] mb-[18px] h-[110px] w-[299px] lg:h-[134px] lg:w-[700px]"
        />
        <h1 className="blind">데이터로 찾는 필승 업종 &amp; 상권 분석 리포트</h1>
        <p className="z-[1] mb-[32px] w-[320px] text-center text-[14px] leading-[1.4] font-normal tracking-[-0.28px] break-keep text-white/60 lg:mb-[54px] lg:w-auto lg:text-left lg:text-[20px] lg:leading-[1.6] lg:tracking-[-0.4px]">
          <span>한화비전 키퍼가 서울 시내 63만 개의 점포 데이터를 분석했습니다.</span>
          <br className="hidden lg:inline" />
          {/* 모바일은 <br> 대신 공백으로 이어 붙임 */}
          <span className="before:content-['_'] lg:before:content-none">
            실제 숫자가 가리키는 2026년 창업의 진짜 기회를 담았습니다.
          </span>
        </p>

        {/* TODO: 이벤트 트래킹 2026_trend_report1_click */}
        <a
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="z-[1] flex w-fit cursor-pointer items-center gap-[16px] rounded-[12px] bg-[#ff6c3a] pt-[16px] pr-[30px] pb-[20px] pl-[24px] lg:gap-[24px] lg:px-[30px] lg:py-[20px]"
        >
          <DownloadIcon className="h-[30px] w-[30px] shrink-0" />
          <div className="flex flex-col gap-[4px] text-center leading-[1.4] lg:gap-[8px]">
            <div className="flex w-fit items-center justify-center gap-[4px] rounded-[18px] bg-[#ffde00] px-[13px] py-[5px] text-center text-[12px] font-medium text-[#231815] lg:gap-[5px] lg:px-[17px] lg:py-[7px] lg:text-[16px]">
              <KakaoIcon className="h-[16.4px] w-[15.5px] lg:h-[22px] lg:w-[20px]" />
              키퍼 카카오 채널 추가하고
            </div>
            <div className="text-[16px] font-bold text-white lg:text-[22px]">Vol.1 무료 리포트 다운로드 하기</div>
          </div>
        </a>

        {/* 차트 이미지: PC 우측 상단 절대배치 / 모바일 버튼 아래 */}
        <Placeholder
          label="chart"
          dark
          className="relative top-[-20px] left-0 z-[1] aspect-[600/420] w-[295px] lg:absolute lg:top-[-40px] lg:right-[-180px] lg:left-auto lg:w-[600px]"
        />
      </div>
    </div>
  );
}

export function Vol1Problem() {
  return (
    // ===== 문제 제기: 폐업률 게이지 카드 3개 =====
    <div className="relative flex w-full flex-col items-center justify-center px-4 py-[64px] lg:px-0 lg:py-[140px]">
      {/* 배경: 남색 + 대형 장식 이미지 */}
      <div className="absolute top-0 left-0 flex h-full w-full justify-center overflow-hidden bg-[#202038]">
        <div className="relative h-full w-[1080px]">
          <Placeholder
            label="bg"
            dark
            className="absolute top-[-120px] left-[-240px] h-[1668px] w-[2285px] opacity-40 lg:top-[-460px] lg:left-[-700px]"
          />
        </div>
      </div>

      <div className="relative z-[2] w-full max-w-[420px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[26px] leading-[1.44] font-bold tracking-[-1px] text-white lg:text-[42px]">
          {"내가 고른 이 업종, 이 상권...\n"}
          <strong className="text-[#ff5c00]">정말 괜찮은 걸까?</strong>
        </h2>
        <p className="mt-[16px] mb-[32px] text-center text-[14px] leading-[1.4] font-normal tracking-[-0.28px] whitespace-pre-line text-white/60 lg:mt-[20px] lg:mb-[54px] lg:text-[20px] lg:leading-[1.6] lg:tracking-[-0.4px] lg:whitespace-nowrap">
          <span className="inline-block lg:inline">
            {" 첫 창업을 앞두고 설렘보다 불안함이 크신가요?\n 남들이 돈 벌었다는 아이템, 유동인구가 많아 보이는 길목..."}
          </span>
          <br />
          <span className="inline-block lg:inline">{"하지만 느낌만으로 결정하기엔\n 창업 비용의 무게가 너무나 무겁습니다."}</span>
        </p>

        {/* 게이지 카드: 모바일 세로(가로형 카드) / PC 3열 */}
        <div className="flex flex-col gap-[16px] lg:flex-row lg:gap-[24px]">
          {STATS.map((s) => (
            <div
              key={s.percent}
              className="flex flex-row items-center justify-center gap-[17.6px] rounded-[17.6px] border-[1.1px] border-white/10 bg-white/5 px-0 py-[24px] shadow-[0_3.5px_21px_0_#19192d] backdrop-blur-[5.3px] lg:flex-[1_0_0] lg:flex-col lg:gap-[20px] lg:rounded-[20px] lg:border-[1.25px] lg:px-[31px] lg:py-[30px] lg:shadow-[0_4px_24px_0_#19192d] lg:backdrop-blur-[6px]"
            >
              <div className="relative flex h-[106px] w-[106px] items-center justify-center lg:h-[120px] lg:w-[120px]">
                <PercentRing percent={s.percent} />
                <span className="text-[14px] leading-[1.2] font-extrabold text-white/60 lg:text-[16px]">
                  <b className="text-[26.4px] font-extrabold text-white lg:text-[30px]">{s.percent}</b>%
                </span>
              </div>
              <span className="text-[15.9px] leading-[1.4] font-medium text-white lg:text-[18px]">
                <strong className="text-[#ff5c00]">{s.strong}</strong>
                {s.rest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Vol1Quality() {
  return (
    // ===== 정보의 질: 흰 배경 + 이미지 박스 =====
    <div className="relative flex w-full flex-col items-center justify-center px-4 py-[64px] lg:px-0 lg:py-[140px]">
      <div className="relative z-[2] w-full max-w-[420px] whitespace-pre-line lg:w-[1080px] lg:max-w-none lg:whitespace-nowrap">
        <h2 className="text-center text-[26px] leading-[1.44] font-bold tracking-[-1px] text-black lg:text-[42px]">
          {"왜 누구는 오픈부터\n 줄을 서고,"}
          <br />
          <strong className="text-[#ff5c00]">누구는 파리만 날릴까요?</strong>
        </h2>
        <p className="mt-[16px] mb-[76px] text-center text-[14px] leading-[1.4] font-normal tracking-[-0.28px] text-[rgba(32,32,32,0.8)] lg:mt-[20px] lg:mb-[111px] lg:text-[20px] lg:leading-[1.6] lg:tracking-[-0.4px]">
          {"그 차이는 '정보의 질'에 있습니다.\n 단순히 유동인구가 많다고 장사가 잘되는 시대는 끝났습니다."}
          <br />
          {"지역별 인구 밀도, 업종별 포화도,\n 그리고 감당 가능한 임대료의 기준까지."}
        </p>

        <div className="relative flex h-auto w-full flex-col justify-center gap-[16px] rounded-[24px] lg:h-[340px] lg:gap-[24px]">
          {/* 이미지 위 가운데 솟은 장식 */}
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 lg:top-[-69px]">
            <svg className="h-[44px] w-[274px] lg:h-[71px] lg:w-[507px]" viewBox="0 0 507 71" preserveAspectRatio="none" fill="none" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M253.5 0C253.5 0 253.504 0.0147 253.513 0.0435C254.114 2.0216 276.745 71 507 71L274.523 71L253.5 71L0 71C233.605 71 253.5 0 253.5 0Z"
                fill="#252539"
              />
            </svg>
          </div>
          <Placeholder
            label="unhappy-business people"
            dark
            className="aspect-[343/285] w-full rounded-[24px] lg:aspect-auto lg:h-[340px]"
          />
        </div>
      </div>
    </div>
  );
}
