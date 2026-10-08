/**
 * 2026 트렌드 리포트 Vol.2 — 상단 3개 섹션
 * 1) Vol.2 히어로(#report2): 칩 + 타이틀 이미지 + 설명 + "Vol.2 무료 리포트 다운로드 하기" 버튼 + 우측 이미지 2장
 *    - 원본: 버튼 클릭 시 이벤트(leadgen_2026_trend_report_click) 후 /contact/2026-trend-report 이동
 * 2) 매장 생존율 타임라인: 1/2/3/5년 차 생존율 막대
 * 3) 상권의 유통기한: 이미지 박스(위쪽 뾰족 장식)
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { BreakOrSpace, SpaceOrBreak } from "@/components/guides/shared/Breaks";
import { DownloadIcon } from "@/components/guides/shared/icons";

export function Vol2Hero() {
  return (
    // ===== Vol.2 히어로: 앵커 #report2 (헤더 높이만큼 scroll-margin) =====
    <section
      id="report2"
      className="flex w-full scroll-mt-[var(--header-height-mobile)] items-center justify-center overflow-x-hidden bg-[#101627] p-0 lg:scroll-mt-[var(--header-height)] lg:px-0 lg:py-[140px]"
    >
      <div className="relative w-full px-[16px] pt-[48px] pb-[368px] lg:w-[1080px] lg:p-0">
        {/* 칩 */}
        <div className="relative z-[3]">
          <span className="relative left-1/2 inline-flex -translate-x-1/2 rounded-[1000px] border border-[rgba(255,108,58,0.3)] bg-[rgba(255,108,58,0.15)] px-[14px] py-[7px] text-[13px] leading-[17px] font-semibold tracking-[-0.6px] text-[#ff6c3a] lg:left-0 lg:translate-x-0 lg:rounded-full lg:px-[21px] lg:py-[10px] lg:text-[18px] lg:leading-[23px] lg:tracking-[-1px]">
            Vol.2 무료 리포트
          </span>
        </div>

        {/* 서브카피 + 타이틀 이미지 */}
        <div className="relative z-[3] mt-[32px] lg:mt-[44px]">
          <p className="text-center text-[14px] leading-[21px] font-medium tracking-[-0.28px] text-white lg:text-left lg:text-[24px] lg:leading-[38px] lg:tracking-[-0.48px]">
            10명 중 4명이 폐업을 고려하는 자영업자 현실
          </p>
          <h2 className="mt-[24px] lg:mt-[20px]">
            <span className="blind">창업 보다 중요한 것은 &quot;생존의 기술&quot;</span>
            <Placeholder
              label="창업 보다 중요한 것은 &quot;생존의 기술&quot;"
              dark
              className="relative left-1/2 aspect-[542/150] w-full max-w-[420px] -translate-x-1/2 lg:left-0 lg:w-[542px] lg:max-w-none lg:translate-x-0"
            />
          </h2>
        </div>

        {/* 설명 2줄 */}
        <div className="relative z-[3] mt-[16px] lg:mt-[28px]">
          <p className="text-center text-[14px] leading-[22px] font-normal tracking-[-0.28px] text-white/80 lg:text-left lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
            상권 분석 데이터로 증명하는 5년 생존
            <SpaceOrBreak />
            롱런(Long-run) 리포트
          </p>
          <p className="mt-[6px] text-center text-[13px] leading-[21px] font-normal tracking-[-0.26px] text-white/60 lg:mt-[8px] lg:text-left lg:text-[18px] lg:leading-[29px] lg:tracking-[-0.36px]">
            한화비전 키퍼가 서울 자치구별 영업 기간과
            <SpaceOrBreak />
            업종별 생존 리스크를
            <BreakOrSpace />
            심층 분석했습니다.
            <SpaceOrBreak />
            오래가는 매장들의 공통적인 특징을 확인하세요.
          </p>
        </div>

        {/* 다운로드 버튼 */}
        <div className="relative z-[3] mt-[34px] lg:mt-[54px]">
          {/* TODO: 이벤트 트래킹 leadgen_2026_trend_report_click */}
          <Link
            href="/contact/2026-trend-report"
            aria-label="무료 리포트 다운로드 하기"
            className="relative left-1/2 z-[1] flex h-[41px] w-fit -translate-x-1/2 items-center gap-[16px] rounded-[50px] bg-[#ff6c3a] px-[22px] text-[14px] leading-[20px] font-bold text-white lg:left-0 lg:h-[82px] lg:translate-x-0 lg:rounded-[100px] lg:px-[50px] lg:text-[24px] lg:leading-[34px] lg:font-extrabold lg:hover:bg-[#e83b05]"
          >
            <DownloadIcon className="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]" />
            Vol.2 무료 리포트 다운로드 하기
          </Link>
        </div>

        {/* 우측(모바일 하단) 이미지 2장 */}
        <Placeholder
          label="img1"
          dark
          className="absolute bottom-0 left-[45%] z-[1] aspect-[1020/700] w-[580px] -translate-x-1/2 lg:top-[-100px] lg:bottom-auto lg:left-[468px] lg:w-[1020px] lg:translate-x-0"
        />
        <Placeholder
          label="img2"
          dark
          className="absolute bottom-[45px] left-1/2 z-[2] aspect-[440/500] w-[250px] -translate-x-1/2 lg:top-[48px] lg:bottom-auto lg:left-[750px] lg:w-[440px] lg:translate-x-0"
        />
      </div>
    </section>
  );
}

// 생존율 타임라인 데이터 (원본)
const SURVIVAL = [
  { year: 1, percent: 75 },
  { year: 2, percent: 60 },
  { year: 3, percent: 50 },
  { year: 5, percent: 30 },
];

export function Vol2Timeline() {
  return (
    // ===== 생존율 타임라인: 그라데이션 남색 배경 + 반투명 카드 =====
    <section className="relative flex justify-center overflow-hidden bg-[linear-gradient(180deg,#252540_0%,#1a1a2d_100%)] px-4 py-[60px] lg:px-0 lg:py-[140px]">
      <div className="relative z-[1] w-full max-w-[420px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[28px] leading-[40px] font-bold tracking-[-1px] text-white lg:text-[42px] lg:leading-[60px]">
          창업 5년 뒤,
          <BreakOrSpace />
          <strong className="text-[#ff5c00]">당신의 매장은 어떤 모습일까요?</strong>
        </h2>
        <p className="mt-[14px] text-center text-[14px] leading-[20px] font-normal tracking-[-0.28px] text-white/60 lg:mt-[20px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
          대한민국에서 신규 매장이 5년 안에 문을 닫을 확률은
          <SpaceOrBreak />
          무려 50%가 넘습니다.
          <br />
          열심히만 한다고 살아남는 시대는 지났습니다.
          <SpaceOrBreak />
          이제는 &apos;오래 버티는 구조&apos;를 먼저 설계해야 합니다.
        </p>

        <div className="relative left-1/2 mt-[32px] flex w-full -translate-x-1/2 items-center justify-center rounded-[16px] border border-white/10 bg-white/5 px-[16px] py-[24px] shadow-[0_4px_24px_0_#19192d] backdrop-blur-[17px] lg:mt-[54px] lg:w-[714px] lg:px-[54px] lg:py-[34px]">
          <div className="w-full">
            <h3 className="text-center text-[18px] leading-[26px] font-semibold tracking-normal text-white">매장 생존율 타임라인</h3>
            <div className="mt-[24px] flex w-full flex-col gap-[24px]">
              {SURVIVAL.map((s) => (
                <div key={s.year} className="flex items-center gap-[16px]">
                  <span className="shrink-0 text-[13px] leading-[19px] font-normal tracking-normal text-[#acacb7]">{s.year}년 차</span>
                  {/* 진행 막대 (주황 그라데이션, 폭 = 생존율%) */}
                  <div className="relative h-[16px] shrink grow overflow-hidden rounded-full bg-white/12">
                    <div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-[linear-gradient(90deg,#ff9500_0%,#ff5100_100%)]"
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-[13px] leading-[20px] font-bold text-white/60">
                    <strong className="text-[16px] leading-[24px] font-bold tracking-normal text-white">{s.percent}</strong>%
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-[20px] text-center text-[12px] leading-[17px] font-normal tracking-normal text-[#9292a0]">
              *전국 평균 기준, <strong className="font-semibold">자세한 데이터는 리포트</strong>에서 확인
            </p>
          </div>
        </div>
      </div>
      {/* 하단 배경 이미지 (1920px 중앙) */}
      <Placeholder
        label="생존율 배경"
        dark
        className="absolute bottom-0 left-1/2 h-[300px] w-[1920px] -translate-x-1/2 lg:h-[500px]"
      />
    </section>
  );
}

export function Vol2Expiry() {
  return (
    // ===== 상권의 유통기한: 흰 배경 + 이미지 박스 =====
    <section className="relative flex justify-center px-4 py-[60px] lg:px-0 lg:py-[140px]">
      <div className="w-full lg:w-[1080px]">
        <h2 className="text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-black lg:text-[42px] lg:leading-[60px]">
          왜 어떤 동네는
          <SpaceOrBreak />
          <strong className="text-[#ff5c00]">유독 폐업이 잦을까요?</strong>
        </h2>
        <p className="mt-[16px] text-center text-[14px] leading-[20px] font-normal tracking-[-0.28px] text-[rgba(32,32,32,0.8)] lg:mt-[20px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
          상권에도 &apos;유통기한&apos;이 있습니다. 어떤 곳은 평균 4년을
          <SpaceOrBreak />
          버티지만, 어떤 곳은 3년도 채 버티지 못하고 간판이 바뀝니다.
          <br />
          내 자본금이 회수되기 전에 상권이 죽어버린다면
          <SpaceOrBreak />그 창업은 실패한 것입니다.
        </p>

        <div className="relative mx-auto mt-[76px] flex aspect-[343/285] h-auto w-full max-w-[400px] flex-col justify-center rounded-[24px] bg-[#252539] p-0 lg:mt-[110px] lg:aspect-auto lg:h-[340px] lg:max-w-none lg:px-[172px]">
          {/* 위로 솟은 장식 */}
          <svg
            className="absolute top-[1px] left-1/2 w-full max-w-[400px] -translate-x-1/2 -translate-y-full lg:top-[-70px] lg:w-[507px] lg:max-w-none lg:translate-y-0"
            viewBox="0 0 507 71"
            fill="none"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M253.5 0C253.5 0 253.504 0.0147 253.513 0.0435C254.114 2.0216 276.745 71 507 71L274.523 71L253.5 71L0 71C233.605 71 253.5 0 253.5 0Z"
              fill="#252539"
            />
          </svg>
          <Placeholder label="상권 유통기한 이미지" dark className="absolute top-0 left-0 h-full w-full rounded-[24px]" />
        </div>
      </div>
    </section>
  );
}
