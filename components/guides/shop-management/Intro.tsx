/**
 * 매장운영 시스템 가이드 — 상단 2개 섹션
 * 1) 히어로: 남색 배경, 좌측 카피 + "무료 다운로드 받기" 버튼, 우측 가이드북 이미지(배경 + 조명 + 책)
 *    - 원본: 이벤트(leadgen_shop-management-guide_click) 후 /contact/shop-management 이동
 * 2) 알바 이탈 사이클: STEP 01~04 카드가 네 모서리에 배치되고 가운데 "ROOT CAUSE 운영 시스템 부재" 원형
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { DownloadIcon } from "@/components/guides/shared/icons";

export function Hero() {
  return (
    // ===== 히어로: 헤더 밑까지 끌어올린 남색 배경 =====
    <section className="relative -mt-[var(--header-height-mobile)] flex h-auto w-full flex-col items-center overflow-hidden bg-[#101627] px-4 pt-[calc(var(--header-height-mobile)+24px)] pb-0 lg:-mt-[var(--header-height)] lg:px-0 lg:py-[220px]">
      <div className="relative flex w-full flex-col justify-center lg:w-[1080px]">
        {/* 카피 영역 */}
        <div className="flex w-full flex-col items-center text-center lg:w-[620px] lg:items-stretch lg:text-left">
          <span className="flex w-fit rounded-full border-[1.325px] border-[rgba(255,108,58,0.3)] bg-[rgba(255,108,58,0.15)] px-[16px] py-[7px] text-[13px] leading-[1.28] font-medium text-[#ff6c3a] lg:px-[22px] lg:py-[10px] lg:text-[19px]">
            알바관리에 지친 사장님을 위한
          </span>
          {/* 원본 손글씨 폰트 'Ttangsbudaejjigae' (globals.css 에서 @font-face 로드) */}
          <div className="mt-[24px] mb-[12px] flex flex-col [font-family:'Ttangsbudaejjigae',var(--font-sans)] lg:mt-[30px] lg:mb-[20px]">
            <h1 className="text-[24px] leading-[1.45] font-bold tracking-[-1px] text-white lg:text-[44px]">
              출퇴근·스케줄·급여까지
              <br />
              알바관리가 쉬워지는
            </h1>
            <h2 className="text-[28px] leading-[1.42] font-bold tracking-[-1px] text-[#ff5c00] lg:text-[54px]">매장운영 시스템 가이드</h2>
          </div>
          <p className="text-[14px] leading-[1.4] font-normal tracking-[-0.4px] whitespace-pre-wrap text-white/60 lg:text-[20px] lg:whitespace-normal">
            {"알바를 아무리 잘 뽑아도 그만두는 이유,\n 알고 보면 채용 문제가 아니에요."}
            <br />
            누가 와도 잘 돌아가는 매장 구조, 지금 바로 만들어보세요!
          </p>
          {/* TODO: 이벤트 트래킹 leadgen_shop-management-guide_click */}
          <Link
            href="/contact/shop-management"
            className="mt-[24px] flex w-fit cursor-pointer items-center justify-center gap-[10px] rounded-[50px] bg-[#ff5c00] px-[22px] py-[10px] text-[14px] leading-[1.4] font-bold text-white transition-opacity duration-200 hover:opacity-90 lg:mt-[40px] lg:gap-[16px] lg:rounded-[10px] lg:px-[40px] lg:py-[16px] lg:text-[20px]"
          >
            <DownloadIcon className="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]" />
            무료 다운로드 받기
          </Link>
        </div>

        {/* 가이드북 비주얼: PC 우측 절대배치 / 모바일 카피 아래 */}
        <div className="relative top-auto left-auto w-full pt-[66px] pb-[56px] lg:absolute lg:top-[24px] lg:left-[582px] lg:w-auto lg:p-0">
          <div className="relative flex justify-center lg:block">
            {/* 배경 이미지 */}
            <div className="absolute top-[-145px] left-[-100px] flex w-full justify-center lg:left-[-200px] lg:block lg:w-auto">
              <Placeholder label="가이드북 배경" dark className="h-[580px] w-[580px] lg:h-[876px] lg:w-[876px]" />
            </div>
            {/* 조명 글로우 (원본 radial-gradient SVG) */}
            <div className="absolute top-[-34px] left-[-60px] flex w-full justify-center lg:top-[-10px] lg:left-[302px] lg:block lg:w-auto">
              <div className="h-[113px] w-[119px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.25)_20%,rgba(255,255,255,0)_60%)] mix-blend-screen" />
            </div>
            {/* 가이드북 이미지 */}
            <Placeholder label="매장운영 시스템 가이드북" dark className="relative aspect-[963/620] w-[484px] lg:w-[963px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

// 사이클 카드 4개 (원본 데이터) — tl/tr/br/bl 은 그리드 영역 이름
const CYCLE = [
  { step: "STEP 01", title: "신규 채용", sub: "공고·면접 다시", area: "[grid-area:tl]" },
  { step: "STEP 02", title: "처음부터 교육", sub: "같은 설명 반복", area: "[grid-area:tr]" },
  { step: "STEP 03", title: "운영 불안정", sub: "지각·결근 반복", area: "[grid-area:br]" },
  { step: "STEP 04", title: "알바 이탈", sub: "1주만에 그만둠", area: "[grid-area:bl]" },
];

/** 가운데 원 바깥의 주황 호(4조각) 장식 */
function OuterRing() {
  return (
    <svg className="h-full w-full" viewBox="0 0 300 300" fill="none" aria-hidden>
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d="M150 8 A142 142 0 0 1 270 72"
          stroke="#FF5C00"
          strokeOpacity="0.9"
          strokeWidth="4.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 150 150)`}
        />
      ))}
    </svg>
  );
}

export function Cycle() {
  return (
    // ===== 알바 이탈 사이클 =====
    <section className="relative w-full overflow-hidden bg-[#21213a] px-4 py-[64px] lg:px-0 lg:pt-[140px] lg:pb-[126px]">
      {/* 상단 파란 글로우 */}
      <div className="absolute top-[-144px] left-1/2 h-[299px] w-[660px] -translate-x-1/2 rounded-[660px] bg-[radial-gradient(50%_50%_at_50%_50%,#2d8fff_0%,rgba(45,143,255,0)_100%)] opacity-43 lg:top-[-360px] lg:h-[661px] lg:w-[1458px] lg:rounded-[1458px]" />

      <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center lg:w-[1080px] lg:max-w-none">
        <div className="mb-[40px] flex flex-col items-center gap-[16px] text-center lg:mb-[100px] lg:gap-[20px]">
          <h2 className="text-[26px] leading-[1.4] font-bold tracking-[-0.8px] whitespace-pre-wrap text-white lg:text-[40px] lg:whitespace-normal">
            <span className="text-[18px] lg:text-[40px]">알바 관리, 왜 이렇게 힘든걸까요?</span>
            <br />
            알바가 남느냐 떠나느냐, <span className="text-[#ff5c00]">{"\n"}첫 7일에 달려 있습니다.</span>
          </h2>
          <p className="text-[14px] leading-[1.4] font-normal text-white/60 lg:text-[18px]">
            알바생이 빨리 그만두는 이유는 대부분 첫 7일 안에 생깁니다.
            <br />
            누가 와도 빠르게 적응할 수 있는 구조, 지금 만들어 두세요.
            <br />
            그 다음은 훨씬 쉬워집니다!
          </p>
        </div>

        {/* PC: 4모서리 그리드 + 가운데 원 겹침 / 모바일: 원 위, 2x2 그리드 아래 */}
        <div className="relative mb-[16px] flex h-auto w-full flex-col-reverse items-center justify-center gap-[28px] lg:mb-[60px] lg:h-[340px] lg:w-[720px] lg:flex-col lg:gap-0">
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[10px] [grid-template-areas:'tl_tr'_'br_bl'] lg:grid-cols-[max-content_auto_max-content] lg:grid-rows-[max-content_auto_max-content] lg:gap-0 lg:[grid-template-areas:'tl_._tr'_'._._.'_'bl_._br']">
            {CYCLE.map((c) => (
              <div
                key={c.step}
                className={`flex min-w-0 flex-col items-center gap-[6px] rounded-[12px] border-[1.2px] border-[rgba(255,92,0,0.35)] bg-[rgba(42,42,42,0.63)] px-[24px] pt-[12px] pb-[14px] shadow-[0_12px_37px_rgba(0,0,0,0.45)] backdrop-blur-[4px] lg:min-w-[184px] lg:gap-[4px] lg:px-[23px] lg:py-[18px] ${c.area}`}
              >
                <span className="text-[13px] leading-[1.4] font-medium tracking-[0.13px] text-[#ff5c00]">{c.step}</span>
                <p className="text-center text-[16px] leading-[1.4] font-bold text-white lg:text-[20px]">{c.title}</p>
                <p className="text-center text-[14px] leading-[1.4] font-normal text-white/60 lg:text-[15px]">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* ROOT CAUSE 원형 */}
          <div className="relative flex h-[226px] w-[226px] items-center justify-center lg:absolute lg:h-[300px] lg:w-[300px]">
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute h-[226px] w-[226px] lg:h-[300px] lg:w-[300px]">
                <OuterRing />
              </div>
              <div className="absolute top-1/2 left-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-50 mix-blend-overlay blur-[44px] lg:h-[240px] lg:w-[240px]" />
              {/* 주황 구체 (원본 ring SVG: radial-gradient + 그림자) */}
              <div className="absolute h-[206px] w-[206px] rounded-full bg-[radial-gradient(circle_at_50%_30%,#FF8A4D_0%,#FF5C00_50%,#CC4A00_100%)] shadow-[0_0_49px_rgba(255,92,0,0.45),0_0_0_8px_rgba(255,92,0,0.12),inset_0_-8px_25px_rgba(0,0,0,0.2)]" />
              <div className="z-[5] flex flex-col items-center text-center">
                <span className="text-[9px] leading-[1.4] font-semibold tracking-[1.687px] text-white lg:text-[12px]">ROOT CAUSE</span>
                <p className="text-[18px] leading-[1.4] font-bold tracking-[-0.472px] text-white lg:text-[23px]">
                  운영 시스템
                  <br />
                  부재
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 결론 박스 */}
        <div className="flex w-full max-w-[712px] items-center justify-center rounded-[8px] border-t-2 border-[#ff5c00] bg-white/4 px-[40px] py-[20px]">
          <p className="text-center text-[15px] leading-[1.4] font-normal tracking-[-0.32px] whitespace-pre-wrap text-white lg:text-[16px] lg:whitespace-normal">
            <strong className="font-bold">채용을 더 잘하는 것</strong>
            {"으로는 \n이 사이클이 끊기지 않습니다."}
            <br />
            {"구조 하나만 바꾸면, \n반복되던 문제가 한 번에 사라집니다."}
          </p>
        </div>
      </div>
    </section>
  );
}
