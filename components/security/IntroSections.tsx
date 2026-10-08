/**
 * 매장보안 페이지 도입부 섹션 모음 (원본 security-store-section1 ~ section7)
 * - 히어로, 6가지 POINT 카드, 리뷰/통계, 체험 CTA, 사고 말풍선, 렌탈 문제점, 가격/안심케어
 * - 모두 정적 콘텐츠(서버 컴포넌트). 버튼은 원본의 router.push("/contact") 를 Link 로 대체.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { MbBr, PcBr, SpaceMbBr, SpacePcBr } from "./Breaks";
import { ArrowFill, StatCoinIcon, StatHomeIcon, StatPieIcon, StatsCurve, UserIcon } from "./icons";

/* =====================================================================
   섹션1: 히어로 — 헤더 밑으로 깔리는 밝은 배경(#fffdf7) + 카피 + 모델 이미지
   원본: margin-top 을 -헤더높이 만큼 당기고 padding-top 으로 보정 (헤더는 transparent-black)
   ===================================================================== */
export function HeroSection() {
  return (
    <section
      id="security-store-section1"
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#fffdf7] mt-[calc(-1*var(--header-height-mobile))] pt-[var(--header-height-mobile)] pb-[60px] lg:mt-[calc(-1*var(--header-height))] lg:min-h-[861px] lg:pt-[var(--header-height)] lg:pb-0"
    >
      {/* ===== 카피: "사장님, 오늘도 혼자 고민하셨나요?" ===== */}
      <div className="z-[2] mt-[36px] px-[20px] text-center lg:mt-[66px] lg:px-0">
        <h1 className="text-[28px] font-bold leading-[1.4] tracking-[-1px] text-[#222] lg:text-[42px] lg:tracking-[-2px]">
          사장님, 오늘도 혼자 고민
          <MbBr />
          하셨나요?
          <PcBr /> 이제 <MbBr />
          <span className="text-brand">든든한 ‘내 편’</span> 하나 두세요
        </h1>
      </div>

      {/* ===== 비주얼: 배경 곡선 + 모델 이미지 ===== */}
      <div className="relative mt-[68px] flex w-full max-w-[1920px] items-end justify-center lg:mt-[60px]">
        <div className="pointer-events-none absolute bottom-0 left-0 z-[1] w-full">
          <Placeholder label="배경 곡선 그래픽" className="aspect-[1920/345] w-full" />
        </div>
        <div className="relative z-[2] h-[332px] w-[324px] lg:h-[537px] lg:w-[523px]">
          <Placeholder label="키퍼 매장 보안 솔루션 고객 모델" className="h-full w-full" />
        </div>
      </div>

      {/* 하단 페이드 그라데이션 (원본 sc-597aefc3-7) */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[3] h-[222px] w-full bg-[linear-gradient(180deg,rgba(255,253,247,0)_9.34%,#fffdf7_54.84%)]" />
    </section>
  );
}

/* =====================================================================
   섹션2: 한 눈에 보는 압.도.적 키퍼 — 6개 POINT 카드 그리드 (PC 3열 / 모바일 1열)
   ===================================================================== */
const POINTS = [
  { bg: "#f2f2f2", alt: "전문 설치기사 방문 설치", no: "POINT 01", title: "설치비 0원 · 3년 무상 A/S", desc: ["전문 설치기사 방문으로 최적의 위치에 설치", "무려 3년간 든든한 무상 A/S까지!"] },
  { bg: "#f9f4e5", alt: "400만 화소 QHD 카메라", no: "POINT 02", title: "확대해도 선명한 QHD 화질", desc: ["일반적 CCTV의 2배, 400만 QHD 화소", "최소 4주 이상 저장으로 선명하게 더 오래!"] },
  { bg: "#f2f2f2", alt: "키퍼 앱 모니터링", no: "POINT 03", title: "확인·공유까지 빠른 APP", desc: ["심플한 화면, 간단한 조작, 1초 로딩", "필요한 순간은 저장 및 공유까지!"] },
  { bg: "#3696ec", alt: "실시간 알림 원격 경비", no: "POINT 04", title: "실시간 알림·원격 확인", desc: ["실시간 알림 ‘원격 경비모드’", "움직임 감지 시간만 클릭해 확인까지 빠르게!"] },
  { bg: "#ffa876", alt: "직원 관리 키퍼 앱", no: "POINT 05", title: "직원관리까지 되는 키퍼 APP", desc: ["GPS 출퇴근 관리, 근로계약서 작성,", "스케줄 관리까지 키퍼 APP이면 OK!"] },
  { bg: "#fff8ee", alt: "Carrot 손해보험", no: "POINT 06", title: "캐롯 안심보험 최대 1,000만원 보장", desc: ["CCTV 촬영 중 발생한 기물 파손·고객 상해·해킹을 ", "보장하는 ‘사장님 안심케어보험’ 1년 무상 제공 "], note: "*도난·화재로 인한 손해는 보장하지 않습니다." },
];

export function OverviewSection() {
  return (
    <section id="security-store-section2" className="relative flex w-full justify-center gap-[40px] overflow-hidden bg-white px-[16px] py-[80px] lg:gap-0 lg:px-0 lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-[34px] lg:w-[1080px] lg:gap-[60px]">
        {/* ===== 타이틀: 로고 배지 + "한 눈에 보는 압.도.적 키퍼" ===== */}
        <div className="flex max-w-[660px] flex-col items-center gap-[24px] text-center">
          <div className="flex items-center justify-center">
            <Placeholder label="keeper Hanwha Vision logo" kind="icon" className="h-[20px] w-[150px] lg:h-[26px] lg:w-[196px]" />
          </div>
          <div className="flex flex-col items-center gap-[4px] lg:gap-[10px]">
            <h2 className="text-[26px] font-bold leading-[1.4] tracking-[-0.5px] text-[#222] lg:text-[42px] lg:tracking-[-0.84px]">
              한 눈에 보는 <span className="text-brand">압.도.적</span> 키퍼
            </h2>
            <p className="text-[15px] leading-[1.4] tracking-[-0.4px] text-[#202020] lg:text-[20px]">
              매장 운영에 꼭 필요한 6가지를 압도적인
              <SpaceMbBr />
              품질로 제공합니다.
            </p>
          </div>
        </div>

        {/* ===== POINT 카드 6장 ===== */}
        <div className="grid w-full max-w-[350px] grid-cols-1 justify-center gap-[15px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,350px)]">
          {POINTS.map((p) => (
            <div key={p.no} className="z-[1] flex w-full flex-col overflow-hidden rounded-[14px] border border-black/[0.06] bg-white lg:w-[350px]">
              <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden lg:h-[186px] lg:w-[350px]" style={{ backgroundColor: p.bg }}>
                <Placeholder label={p.alt} className="relative -bottom-px h-[calc(100%_+_1px)] w-full" />
              </div>
              <div className="relative -top-px z-[2] flex flex-col gap-[4px] bg-white p-[20px]">
                <span className="text-[13px] font-bold leading-[1.4] tracking-[-0.26px] text-brand">{p.no}</span>
                <h3 className="text-[18px] font-bold leading-[1.4] tracking-[-0.4px] text-[#202020]">{p.title}</h3>
                <p className="text-[15px] leading-[1.4] tracking-[-0.32px] text-[rgba(32,32,32,0.9)]">
                  {p.desc[0]}
                  <br />
                  {p.desc[1]}
                  {p.note && (
                    <>
                      <br />
                      <span className="inline-block pt-[2px] text-[12px] leading-[140%] tracking-[-0.24px] text-[rgba(32,32,32,0.5)]">{p.note}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 배경 그라데이션 이미지 (PC 전용) */}
      <div className="absolute bottom-0 left-1/2 z-0 hidden h-full w-[1920px] -translate-x-1/2 lg:block">
        <Placeholder label="배경 그라데이션" className="h-full w-full" />
      </div>
    </section>
  );
}

/* =====================================================================
   섹션3: REVIEWS — 실사용 후기 6개 카드 + 통계 바(3,000+ / 최대 1,000만원 / 90%)
   ===================================================================== */
const REVIEWS = [
  { author: "ijin**** · 매장 실외용 CCTV", text: "생각보다 너무 선명해요. 실제로 화질도 좋고, 구매부터 설치 과정까지 잘 서포트해주셔서 기분 좋은 설치였습니다. 후회 없는 선택이라고 생각합니다.", bg: "#2b3d65" },
  { author: "k34j**** · 매장 실내용 CCTV", text: "실시간 CCTV 확인 시, 언제 어디서 녹화된 영상을 확인해도 버벅이거나 끊김 없이 바로 확인이 가능합니다.", bg: "#614d42" },
  { author: "bo**** · 매장 실내용 CCTV", text: "가격이 부담됐지만 월 요금을 합산해보니 오히려 더 경제적이었습니다. 설치도 다음날 바로 진행됐고 상담 역시 만족스러웠습니다.", bg: "#384e3f" },
  { author: "App Store · do******", text: "매장 오픈 초기라 걱정이 많았는데, 키퍼 덕분에 직원 관리가 훨씬 편해졌어요. 출퇴근 기록부터 급여 정리, 근로계약서 관리까지 만족스럽습니다.", bg: "#614d42" },
  { author: "App Store · 찐****", text: "직원 관리와 스케줄 관리가 앱 하나로 가능해 시간이 절약되고, 출퇴근 기록이 자동으로 남아 관리가 훨씬 수월해졌어요.", bg: "#384e3f" },
  { author: "Google Play · 변***", text: "직원 관리, 급여 계산도 탭 몇 번이면 되니까 기계 잘 모르는 저도 금방 익혔어요. 한화비전이라 브랜드 믿음도 있고 앞으로도 계속 쓸 것 같아요.", bg: "#2b3d65" },
];

const STATS = [
  { icon: <StatHomeIcon />, value: "3,000+", label: "키퍼 서비스 도입 매장" },
  { icon: <StatPieIcon />, value: "최대 1,000만원", label: "CCTV 촬영 중 사고보장" },
  { icon: <StatCoinIcon />, value: "90%", label: "한달 무료체험 후 구매전환율" },
];

/** 통계 사이 구분선 (PC 세로 / 모바일 가로 그라데이션) */
function StatDivider() {
  return (
    <div className="my-[24px] h-px w-full bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,#fff_50%,rgba(255,255,255,0)_100%)] opacity-70 lg:mx-[50px] lg:my-0 lg:h-[80px] lg:w-px lg:bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,#fff_50%,rgba(255,255,255,0)_100%)]" />
  );
}

export function ReviewsSection() {
  return (
    <section id="security-store-section3" className="relative flex w-full flex-col items-center overflow-hidden bg-[#111b31]">
      {/* 상단 블루 글로우 */}
      <div className="absolute left-1/2 z-0 h-[346px] w-[764px] -translate-x-1/2 -translate-y-[200px] rounded-[764px] bg-[radial-gradient(50%_50%_at_50%_50%,#2d8fff_0%,rgba(45,143,255,0)_100%)] opacity-[0.43] lg:h-[444px] lg:w-[1115px] lg:-translate-y-[168px] lg:rounded-[1115px]" />

      <div className="flex w-full flex-col items-center gap-[36px] px-[16px] py-[60px] lg:gap-[60px] lg:px-0 lg:py-[120px]">
        {/* ===== 타이틀 ===== */}
        <div className="flex flex-col items-center gap-[8px] text-center">
          <span className="text-[14px] font-bold leading-[1.6] text-brand lg:text-[20px]">REVIEWS</span>
          <h2 className="text-[26px] font-bold leading-[1.4] tracking-[-1px] text-[#fafafc] lg:text-[42px]">
            이미, 전국 <span className="text-brand">3,000곳 이상</span>의
            <SpaceMbBr />
            매장이
            <SpacePcBr />
            <span className="text-brand">키퍼</span>의 남다름을
            <SpaceMbBr />
            경험하고 있습니다.
          </h2>
        </div>

        {/* ===== 리뷰 카드 6장 ===== */}
        <div className="grid w-full max-w-[350px] grid-cols-1 justify-center gap-[24px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,350px)] lg:gap-[15px]">
          {REVIEWS.map((r) => (
            <div key={r.author} className="flex w-full flex-col gap-[12px] rounded-[10px] bg-black/30 p-[24px] lg:w-[350px]">
              <div className="flex items-center gap-[14px]">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: r.bg }}>
                  <UserIcon />
                </div>
                <span className="text-[15px] leading-[1.4] tracking-[-0.36px] text-white/60 lg:text-[18px]">{r.author}</span>
              </div>
              <p className="text-[15px] leading-[1.4] tracking-[-0.32px] text-white/80 lg:text-[16px]">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 통계 바 ===== */}
      <div className="relative flex w-full flex-col items-center justify-center bg-[#091121] pt-[80px] pb-[60px] lg:h-[300px] lg:flex-row lg:py-0">
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <StatsCurve className="h-[41px] w-auto lg:h-[67px]" />
        </div>
        {STATS.map((s, i) => (
          <div key={s.value} className="contents">
            {i > 0 && <StatDivider />}
            <div className="flex w-[280px] items-center lg:w-auto">
              <div className="mr-[30px] flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] bg-white/[0.13]">{s.icon}</div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[28px] font-bold leading-[1.4] tracking-[-0.96px] text-white lg:text-[36px]">{s.value}</span>
                <span className="text-[14px] leading-[1.4] tracking-[-0.32px] text-white/80 lg:text-[18px]">{s.label}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="relative mt-[40px] text-center text-[11px] leading-[17.903px] tracking-[-0.256px] text-white/50 lg:absolute lg:bottom-[70px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:text-[13px]">
          *안심케어 보험은 도난·화재로 인한 손해는 보장하지 않습니다.
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션4: 체험 CTA — 오렌지 배경 + "문의하기" 버튼(/contact 이동) + 모델 이미지
   원본 버튼: hover 시 위로 2px 이동 + 흰 배경, 클릭(active) 시 opacity 0.85
   ===================================================================== */
export function TrialCtaSection() {
  return (
    <section id="security-store-section4" className="relative flex w-full justify-center overflow-hidden bg-brand pt-[80px] lg:h-[480px] lg:pt-0">
      {/* 배경 원형 장식 2개 */}
      <div className="absolute top-0 left-1/2 h-[2147px] w-[2146px] rounded-full bg-white opacity-[0.07] [transform:translate(calc(-50%_+_-240px),-1200px)]" />
      <div className="absolute top-0 left-1/2 h-[1211px] w-[1211px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,240,188,0.5)_0%,rgba(255,240,188,0)_100%)] opacity-[0.55] [transform:translate(calc(-50%_+_-800px),-50%)]" />

      <div className="relative flex w-full flex-col items-center px-[20px] lg:w-[1080px] lg:flex-row lg:px-0">
        <div className="z-[2] flex flex-col items-center gap-[24px] text-center lg:items-start lg:gap-[30px] lg:text-left">
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-[26px] font-bold leading-[1.3] tracking-[-1px] text-[#fafafc] lg:text-[42px]">
              한 번 써보신 분들은,
              <br />
              <span className="text-[#fff6a7]">키퍼</span>의 ‘다름’을 압니다.
            </h2>
            <p className="text-[15px] leading-[1.4] tracking-[-0.4px] text-[#fafafc] lg:text-[20px]">
              직접 사용해보지 않으면 알 수 없는 차이
              <br />
              부담없는 체험으로 keeper의 진짜 가치를 느껴보세요.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex h-[42px] w-fit items-center justify-center gap-[4px] whitespace-nowrap rounded-[48px] bg-[#fafafc] py-[14px] pr-[18px] pl-[20px] text-[14px] font-bold tracking-[-0.36px] text-[#1d1d1f] transition-[transform,background-color,opacity] duration-200 hover:-translate-y-[2px] hover:bg-white active:opacity-85 lg:inline-flex lg:h-[56px] lg:gap-[8px] lg:px-[24px] lg:py-0 lg:text-[18px]"
          >
            <span>문의하기</span>
            <ArrowFill className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px]" />
          </Link>
        </div>

        {/* ===== 모델 이미지 + 손글씨 장식 ===== */}
        <div className="relative -bottom-px -left-[12px] z-[1] mt-[40px] w-[343px] lg:absolute lg:right-[40px] lg:bottom-0 lg:left-auto lg:mt-0 lg:w-[462px]">
          <div className="absolute top-[40px] right-0 lg:top-[79px] lg:-right-[36px]">
            <Placeholder label="손글씨 장식 그래픽" kind="icon" dark className="h-[54px] w-[83px] lg:h-[80px] lg:w-[122px]" />
          </div>
          <Placeholder label="키퍼 CCTV 도입 매장 모델 이미지" dark className="aspect-[462/400] w-full" />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션5: 매장 사고 말풍선 — PC 는 절대좌표로 흩뿌린 4개 말풍선, 모바일은 좌우 지그재그 세로 배치
   ===================================================================== */
const BUBBLES = [
  { cls: "ml-[40px] mr-auto lg:m-0 lg:top-[58px] lg:left-[211px]", side: "left", alt: "고객 캐릭터 1", text: "제가 거기 지갑을 두고 온 것 같아서요" },
  { cls: "ml-auto mr-[40px] mb-[20px] lg:m-0 lg:top-[115px] lg:left-[496px]", side: "right", alt: "고객 캐릭터 3", text: "음식은 받았는데, 음료를 안 보내신 것 같아요." },
  { cls: "ml-[40px] mr-auto lg:m-0 lg:top-[193px] lg:left-[138px]", side: "left", alt: "고객 캐릭터 2", text: "어, 여기 있던 컵 누가 가져간 것 같은데.." },
  { cls: "ml-auto mr-[40px] lg:m-0 lg:top-[275px] lg:left-[414px]", side: "right", alt: "알바 캐릭터 4", text: "사장님, 3번 테이블 계산 안하고 그냥 갔어요!" },
] as const;

export function IncidentSection() {
  return (
    <section id="security-store-section5" className="flex w-full items-center justify-center overflow-hidden bg-[#091327] py-[80px] lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-[30px] lg:w-[1080px] lg:gap-[34px]">
        {/* ===== 말풍선 4개 ===== */}
        <div className="relative flex w-full max-w-[480px] flex-col items-center gap-[24px] lg:block lg:h-[344px] lg:max-w-[1080px]">
          {BUBBLES.map((b) => {
            const avatar = (
              <div className={`absolute ${b.side === "left" ? "-top-[36px] -left-[24px] lg:-top-[50px] lg:-left-[20px]" : "-top-[36px] -right-[36px] lg:-top-[40px] lg:-right-[30px]"}`}>
                <Placeholder label={b.alt} kind="icon" dark className="h-[51px] w-[51px] lg:h-[60px] lg:w-[60px]" />
              </div>
            );
            return (
              <div
                key={b.alt}
                className={`relative flex items-center whitespace-nowrap rounded-[40px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(9,17,33,0.12)_114.29%)] px-[28px] py-[16px] backdrop-blur-[10px] lg:absolute lg:rounded-[100px] lg:px-[40px] lg:py-[24px] ${b.cls}`}
              >
                {b.side === "left" && avatar}
                <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.4px] text-white lg:text-[20px]">{b.text}</span>
                {b.side === "right" && avatar}
              </div>
            );
          })}
        </div>

        {/* 연결 점선 */}
        <div className="flex h-[40px] justify-center lg:h-[68px]">
          <Placeholder label="연결점" kind="icon" dark className="h-full w-[8px]" />
        </div>

        {/* ===== 카피 ===== */}
        <div className="flex flex-col items-center gap-[10px] text-center lg:gap-[14px]">
          <p className="text-[15px] leading-[1.4] tracking-[-0.4px] text-white/50 lg:text-[20px]">
            분실물, 배달 사고, 무전취식, 절도까지…
            <br />
            사고가 발생했을 때 가장 먼저 떠오르는 건
          </p>
          <h2 className="text-[24px] font-bold leading-[1.4] tracking-[-0.84px] text-white lg:text-[42px]">
            평소에는 잊고 지냈던 <span className="text-brand">CCTV</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션6: "막상 문제가 생기면, 혼자 감당해야 합니다." — 기존 렌탈의 문제점 카드 3장
   ===================================================================== */
const PAINS = [
  { alt: "경찰서 직접 신고", sub: "출동 서비스가 있다고 해도", main: "경찰서에는 직접 신고해야 하죠." },
  { alt: "3년 약정 렌탈금액", sub: "게다가 최소 3년간 약정으로", main: "매달 나가는 렌탈금액에," },
  { alt: "위약금 폭탄", sub: "해약하면 고스란히 내야하는", main: "위약금 폭탄까지" },
];

export function AloneSection() {
  return (
    <section id="security-store-section6" className="flex w-full items-center justify-center bg-[#0f1d39] py-[60px] lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-[34px] px-[16px] lg:w-[1080px] lg:gap-[60px] lg:px-0">
        <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-white lg:text-[42px] lg:tracking-[-0.84px]">
          막상 문제가 생기면,
          <SpaceMbBr />
          <span className="text-brand">혼자 감당</span>해야 합니다.
        </h2>
        <div className="grid w-full max-w-[400px] grid-cols-1 justify-center gap-[20px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,350px)] lg:gap-[15px]">
          {PAINS.map((p) => (
            <div key={p.alt} className="flex w-full flex-col overflow-hidden rounded-[13.72px] border border-white/[0.06] bg-white/[0.04] lg:w-[350px] lg:rounded-[14px]">
              <div className="relative w-full overflow-hidden bg-[#202027] lg:h-[186px] lg:w-[350px]">
                <Placeholder label={p.alt} dark className="aspect-[350/186] w-full lg:h-full" />
              </div>
              <div className="flex flex-col px-[19.6px] py-[23.5px] lg:px-[20px] lg:py-[24px]">
                <p className="text-[15.68px] leading-[1.4] tracking-[-0.31px] text-white/90 lg:text-[16px] lg:tracking-[-0.32px]">{p.sub}</p>
                <p className="text-[17.64px] font-bold leading-[1.4] tracking-[-0.35px] text-white lg:text-[18px] lg:tracking-[-0.36px]">{p.main}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션7: "기존 CCTV 렌탈비의 단 60% 비용으로" — 오렌지 안심케어 카드 + 혜택 카드 3장
   ===================================================================== */
const BENEFITS = [
  { alt: "고정 지출 절감", title: "고정 지출은 줄이고", desc: ["기존 CCTV 렌탈비를 40% 절감하여,", "매달 빠져나가는 지출 부담 완화"] },
  { alt: "안심케어 보험", title: "안심케어 보험까지", desc: ["CCTV 사용 중 발생한 사고까지,", "최대 1,000만원 보장"] },
  { alt: "실질적 솔루션", title: "실질적 솔루션 제공", desc: ["막연한 안심이 아닌, 실질적인 해결까지", "keeper가 끝까지 함께"] },
];

export function PriceSection() {
  return (
    <section id="security-store-section7" className="flex w-full justify-center bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[40px] px-[16px] lg:w-[1080px] lg:max-w-none lg:gap-[60px] lg:px-0">
        <div className="flex flex-col items-center gap-[24px] lg:flex-row lg:justify-between lg:gap-0">
          {/* ===== 좌측 카피 ===== */}
          <div className="flex flex-col gap-[14px] text-center lg:text-left">
            <h2 className="whitespace-nowrap text-[26px] font-bold leading-[1.4] tracking-[-1px] text-[#202020] lg:text-[42px]">
              기존 CCTV 렌탈비의
              <br />
              <span className="text-brand">단 60% 비용으로</span> 평생 소장까지
            </h2>
            <p className="text-[15px] leading-[1.4] tracking-[-0.4px] text-[#202020] lg:text-[20px]">
              매달 빠져나가는 고정 지출은 줄이고,
              <br />
              막연한 안심이 아닌, 실질적인 해결까지 제공합니다.
            </p>
          </div>

          {/* ===== 우측 오렌지 안심케어 카드 ===== */}
          <div className="flex w-full flex-col items-center gap-0 rounded-[16px] bg-[linear-gradient(165deg,#ff8a3d_8.5%,#ff5c00_91.5%)] px-[26px] py-[18px] text-center lg:w-[466px] lg:items-stretch lg:gap-[20px] lg:rounded-[24px] lg:p-[40px] lg:text-left">
            <div className="flex flex-col items-center gap-[6px] lg:items-start lg:gap-[10px]">
              <Placeholder label="안심케어 실드" kind="icon" dark className="h-[28px] w-[24px]" />
              <div className="flex flex-col gap-[4px]">
                <span className="text-[11px] font-medium leading-[1.4] tracking-[-0.3px] text-white/90 lg:text-[15px]">CCTV 촬영 중 사고를</span>
                <h3 className="text-[18px] font-bold leading-[1.4] tracking-[-0.6px] text-white lg:text-[30px]">
                  최대 1,000만원을
                  <br />
                  보장하는 사장님 안심케어
                </h3>
              </div>
            </div>
            <div className="mt-[14px] mb-[8px] rounded-[8px] bg-white/15 px-[15px] py-[11px] lg:m-0 lg:px-[24px] lg:py-[18px]">
              <p className="text-[11px] leading-[19px] tracking-[-0.23px] text-white lg:text-[13px]">
                매달 빠져나가는 고정 지출은 줄이고, 막연한 안심이 아닌,
                <br />
                <strong className="font-bold">실질적인 해결까지 제공</strong>합니다.
              </p>
            </div>
            <p className="text-[11px] leading-[15px] tracking-[-0.22px] text-white/70">
              *도난·화재로 인한 손해는 보장하지 않습니다.
              <br />
              *1년 무상 제공 후 매년 갱신되며, <MbBr />
              보험료 및 보장 조건이 변동될 수 있습니다.
            </p>
          </div>
        </div>

        {/* ===== 혜택 카드 3장 ===== */}
        <div className="flex w-full flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-center lg:gap-[21px]">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex w-full flex-col rounded-[10px] bg-[#fff9f4] px-[34px] py-[18px] lg:w-[346px] lg:rounded-[14px] lg:p-[24px]">
              <div className="flex h-[33.26px] w-[33.26px] items-center justify-center rounded-[10px] bg-[#ffecde] lg:h-[42px] lg:w-[42px]">
                <Placeholder label={b.alt} kind="icon" className="h-[19px] w-[19px] lg:h-[24px] lg:w-[24px]" />
              </div>
              <h4 className="mt-[18px] mb-[2px] text-[18px] font-bold leading-[1.4] tracking-[-0.48px] text-[#171717] lg:mt-[24px] lg:mb-[8px] lg:text-[24px] lg:leading-[33.6px]">{b.title}</h4>
              <p className="text-[14px] leading-[1.4] tracking-[-0.32px] text-[#525252] lg:text-[16px] lg:leading-[22.4px]">
                {b.desc[0]}
                <br />
                {b.desc[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
