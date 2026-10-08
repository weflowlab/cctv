/**
 * 매장보안 페이지 CHAPTER 01~06 섹션 모음 (원본 security-store-section14 ~ section26)
 * - ChapterHeader : "CHAPTER 0N" 오렌지 pill + keeper 워드마크 + 제목 (밝은/어두운 테마)
 * - 화질(영상 4개), 저장/감지(이미지 4개), 보안(2개), 방수방진, 직원관리 탭, 서비스 3종
 * - EmployeeTabs 만 클라이언트 컴포넌트, 나머지는 서버 컴포넌트
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { SpaceMbBr, SpacePcBr } from "./Breaks";
import EmployeeTabs from "./EmployeeTabs";
import { BoltIcon, CircleCheckIcon, FolderIcon, HorizonIcon, LockIcon, MoonIcon, SearchIcon, SirenIcon, SunIcon } from "./icons";

/* =====================================================================
   CHAPTER 헤더: CHAPTER 01·02 는 "keeper" 텍스트, 03~06 은 keeper 로고(SVG) 사용
   dark=true 이면 남색 배경(#111b31) + 상단 블루 글로우 (CHAPTER 03, 04)
   ===================================================================== */
function ChapterHeader({ id, chapter, title, dark = false, logo = false }: { id: string; chapter: string; title: ReactNode; dark?: boolean; logo?: boolean }) {
  return (
    <section
      id={id}
      className={`relative flex w-full flex-col items-center gap-[14px] overflow-hidden px-[16px] py-[30px] lg:gap-[20px] lg:px-0 lg:py-[60px] ${dark ? "bg-[#111b31]" : "bg-[#fffaef]"}`}
    >
      {dark && (
        <div className="absolute top-[-322px] left-1/2 h-[504px] w-[1692px] -translate-x-1/2 rounded-[1692px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(45,143,255,0.86)_0%,rgba(45,143,255,0)_100%)] opacity-40" />
      )}
      <div className="z-[1] rounded-[100px] border-[0.62px] border-white/10 bg-brand px-[14px] py-[8px] text-[12.3px] font-bold uppercase leading-[1.3] text-white lg:border lg:px-[26px] lg:py-[14px] lg:text-[20px]">
        {chapter}
      </div>
      <div className="z-[1] flex flex-col items-center gap-[4px] lg:flex-row lg:gap-[10px]">
        {logo ? (
          <Placeholder label="keeper 로고" kind="icon" dark={dark} className="h-[24px] w-[84px] lg:h-[42px] lg:w-[148px]" />
        ) : (
          <span className="text-[20px] font-extrabold tracking-[-0.75px] text-brand lg:text-[36px]">keeper</span>
        )}
        <h2
          className={`text-center text-[26px] font-bold tracking-[-0.42px] lg:text-left lg:text-[36px] lg:tracking-[-0.75px] ${
            dark ? "leading-[1.45] text-white" : `${logo ? "leading-[1.45]" : "leading-[1.13]"} text-[#171717] lg:leading-[1.45]`
          }`}
        >
          {title}
        </h2>
      </div>
    </section>
  );
}

export const Chapter01 = () => <ChapterHeader id="security-store-section14" chapter="CHAPTER 01" title="가장 선명한 눈을 지니다" />;
export const Chapter02 = () => <ChapterHeader id="security-store-section16" chapter="CHAPTER 02" title="가장 디테일한 센스를 지니다" />;
export const Chapter03 = () => <ChapterHeader id="security-store-section18" chapter="CHAPTER 03" title="가장 철통 같은 보안을 지니다" dark logo />;
export const Chapter04 = () => <ChapterHeader id="security-store-section20" chapter="CHAPTER 04" title="가장 튼튼한 내구성을 지니다" dark logo />;
export const Chapter05 = () => (
  <ChapterHeader
    id="security-store-section22"
    chapter="CHAPTER 05"
    logo
    title={
      <>
        가장 새로운
        <SpaceMbBr />
        ‘직원관리 솔루션’을 지니다
      </>
    }
  />
);
export const Chapter06 = () => <ChapterHeader id="security-store-section25" chapter="CHAPTER 06" title="가장 필요한 서비스를 지니다" logo />;

/* =====================================================================
   기능 행 공통 데이터 타입: 배지(아이콘+문구) / 2줄 제목 / 설명 / 미디어
   reverse=true 이면 PC 에서 미디어가 왼쪽 (모바일은 항상 텍스트 → 미디어 순)
   ===================================================================== */
type Feature = { icon: ReactNode; badge: string; sub: string; main: ReactNode; desc: ReactNode; media: string; video?: boolean; reverse?: boolean };

/* =====================================================================
   섹션15 (CHAPTER 01): 화질 — 텍스트 + 자동재생 영상 4개 지그재그
   원본 video: autoPlay loop muted playsInline (영상 자리는 Placeholder)
   ===================================================================== */
const CH1: Feature[] = [
  {
    icon: <SearchIcon />, badge: "작은 물체까지 선명하게", sub: "2배 더 촘촘한", main: "400만 화소 QHD",
    desc: <>일반적인 CCTV의 2배인 400만 QHD 화질을<SpaceMbBr />넣어<SpacePcBr />보다 작은 소지품에도 지폐 권종까지<SpaceMbBr />또렷하게 포함합니다</>,
    media: "section15-1 영상: 400만 화소 QHD", video: true,
  },
  {
    icon: <SunIcon />, badge: "역광에도 선명한 화면", sub: "시야의 밸런스를 잡는", main: "역광보정 (WDR)",
    desc: <>햇빛이 내리쬐는 공간부터 어두운 구석까지,<SpaceMbBr />독보적인 WDR<SpacePcBr />기술로 빛의 균형을 맞춰<SpaceMbBr />사각지대 없는 시야를 제공합니다</>,
    media: "section15-2 영상: 역광보정 WDR", video: true, reverse: true,
  },
  {
    icon: <MoonIcon />, badge: "어두운 곳도 또렷하게", sub: "어두운 공간에서도", main: "뚜렷하게 구분되는 선명함",
    desc: <>고성능 IR LED와 저조도·SSNR 노이즈 저감 기술로,<SpaceMbBr />빛이 없는<SpacePcBr />환경에서도 최대 30m까지 선명하게<SpaceMbBr />담아냅니다</>,
    media: "section15-3 영상: 야간 선명도", video: true,
  },
  {
    icon: <HorizonIcon />, badge: "렌즈 왜곡 자동 보정", sub: "왜곡과 휘어짐, 흔들림까지", main: "차단한 클린뷰",
    desc: <>렌즈 왜곡을 보정해 실제 눈으로 보는 듯한 화면을<SpaceMbBr />구현하고,<SpacePcBr />자동 흔들림 보정으로 안정적인 영상을<SpaceMbBr />제공합니다</>,
    media: "section15-4 영상: 클린뷰", video: true, reverse: true,
  },
];

export function ClaritySection() {
  return (
    <section id="security-store-section15" className="flex w-full justify-center bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[48px] px-[16px] text-center lg:w-[1080px] lg:max-w-none lg:gap-[60px] lg:px-0 lg:text-left">
        {CH1.map((f) => (
          <div key={f.badge} className={`flex items-center justify-between gap-[24px] lg:flex-row lg:gap-[68px] ${f.reverse ? "flex-col-reverse" : "flex-col"}`}>
            {f.reverse && <FeatureMedia f={f} className="bg-[#f2f2f2]" />}
            <div className="flex w-full flex-col items-center gap-[8px] lg:w-[388px] lg:items-start">
              <div className="flex items-center gap-[5px] rounded-[100px] bg-[#fbf7ed] px-[24px] py-[8px] text-[14px] font-medium tracking-[-0.28px] text-[rgba(23,23,23,0.8)]">
                {f.icon}
                <span>{f.badge}</span>
              </div>
              <div className="flex flex-col items-center gap-[2px] lg:items-start">
                <span className="text-[24px] font-bold leading-[1.3] tracking-[-0.68px] text-[#171717] lg:text-[34px]">{f.sub}</span>
                <span className="text-[24px] font-bold leading-[1.3] tracking-[-0.68px] text-brand lg:text-[34px]">{f.main}</span>
              </div>
              <p className="mt-[4px] whitespace-nowrap text-[14px] leading-[1.4] tracking-[-0.32px] text-[#525252] lg:text-[16px]">{f.desc}</p>
            </div>
            {!f.reverse && <FeatureMedia f={f} className="bg-[#f2f2f2]" />}
          </div>
        ))}
      </div>
    </section>
  );
}

/** 기능 행의 미디어(영상/이미지) 박스: PC 565x286, 모바일 풀폭 동일 비율 */
function FeatureMedia({ f, className = "", dark = false }: { f: Feature; className?: string; dark?: boolean }) {
  return (
    <div className={`aspect-[565/286] w-full shrink-0 overflow-hidden rounded-[14px] lg:aspect-auto lg:h-[286px] lg:w-[565px] ${className}`}>
      <Placeholder label={f.media} kind={f.video ? "video" : "image"} dark={dark} className="h-full w-full" />
    </div>
  );
}

/* =====================================================================
   섹션17 (CHAPTER 02): 저장·감지·검색 — 이미지 4개 지그재그 (reverse 행은 PC 오른쪽 여백 60px)
   ===================================================================== */
const CH2: Feature[] = [
  {
    icon: <FolderIcon />, badge: "최대 4주+ 넉넉한 저장", sub: "화질은 그대로,", main: "저장 기간은 1.5배",
    desc: <>Wise Stream 압축 기술로 용량은 줄이고 화질은<SpaceMbBr />그대로,<SpacePcBr />최대 4주 이상 넉넉하게 보관이 가능합니다</>,
    media: "홈CCTV 캘린더",
  },
  {
    icon: <LockIcon />, badge: "소중한 기록 안전 보호", sub: "유실 위험을 최소화한", main: "HDD 저장 방식",
    desc: <>단순 SD 카드가 아닌, 안정성이 검증된 고품질 HDD<br />저장 방식을 채택해 소중한 기록을 안전하게 보호합니다</>,
    media: "HDD 저장 방식", reverse: true,
  },
  {
    icon: <BoltIcon />, badge: "즉각 알림, 빠른 대처", sub: "빈틈없는 실시간", main: "충격 및 방해 감지",
    desc: <>카메라 방향 변경·렌즈 가림 등 이상 상황을 즉시 감지하고,<br />실시간 알림으로 빠르게 대응합니다</>,
    media: "충격 및 방해 감지",
  },
  {
    icon: <SearchIcon />, badge: "원하는 장면 즉시 찾기", sub: "찾기는 빠르게,", main: "공유는 간편하게",
    desc: <>1초 만에 원하는 영상을 찾고, 맞춤 타임스탬프로 빠르게<br />확인해 공유나 제출까지 안전하게 한 번에 처리할 수 있습니다</>,
    media: "타임라인 영상 재생 플레이어", reverse: true,
  },
];

export function StorageSection() {
  return (
    <section id="security-store-section17" className="flex w-full justify-center overflow-hidden bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[80px] px-[16px] lg:w-[1080px] lg:max-w-none lg:gap-[60px] lg:px-0">
        {CH2.map((f) => (
          <div key={f.badge} className={`flex items-center justify-between gap-[40px] lg:flex-row lg:gap-[68px] ${f.reverse ? "flex-col-reverse lg:pr-[60px]" : "flex-col"}`}>
            {f.reverse && <FeatureMedia f={f} />}
            <div className="flex w-full flex-col items-center gap-[14px] text-center lg:w-auto lg:items-start lg:gap-[10px] lg:text-left">
              <div className="flex w-fit items-center gap-[4.474px] rounded-[100px] bg-[#fbf7ed] px-[21.474px] py-[7.158px] text-[13px] font-medium leading-[17.537px] tracking-[-0.28px] text-[rgba(23,23,23,0.8)] lg:gap-[5px] lg:px-[24px] lg:py-[8px] lg:text-[14px] lg:leading-[1.4]">
                {f.icon}
                <span>{f.badge}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-bold leading-[1.3] tracking-[-0.68px] text-[#171717] lg:text-[34px]">{f.sub}</span>
                <span className="text-[26px] font-bold leading-[1.3] tracking-[-0.68px] text-brand lg:text-[34px]">{f.main}</span>
              </div>
              <p className="mt-[4px] whitespace-nowrap text-[15px] leading-[1.4] tracking-[-0.32px] text-[#525252] lg:text-[16px]">{f.desc}</p>
            </div>
            {!f.reverse && <FeatureMedia f={f} />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =====================================================================
   섹션19 (CHAPTER 03): 보안 — 남색 배경, 블루 배지, 이미지 2개 지그재그
   ===================================================================== */
const CH3: Feature[] = [
  {
    icon: <SirenIcon className="h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]" />, badge: "보안 이슈 즉각 대응", sub: "데이터를 보호하는",
    main: <>사이버 보안 전담 대응팀 <span className="text-white">운영</span></>,
    desc: <>해킹과 외부 침입에 대비한 사이버 보안 전담 대응팀을<br />상시 운영해, 보안 이슈 발생 시 빠르게 대응합니다</>,
    media: "Wisenet 사이버 보안 전담 칩셋",
  },
  {
    icon: <LockIcon color="#85A6FF" />, badge: "글로벌 기준 보안 시스템", sub: "국내·외에서 인정한", main: "글로벌 수준의 보안",
    desc: <>국내 보안 및 개인정보 보호 규정은 물론, 글로벌 보안<br />기준까지 준수한 최고 수준의 보안 시스템을 제공합니다</>,
    media: "한화비전 사옥 건물", reverse: true,
  },
];

export function CyberSecuritySection() {
  return (
    <section id="security-store-section19" className="flex w-full justify-center bg-[#0b1325] py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col gap-[80px] px-[16px] lg:w-[1080px] lg:max-w-none lg:px-0">
        {CH3.map((f) => (
          <div key={f.badge} className={`flex items-center justify-between gap-[24px] lg:flex-row lg:gap-[67px] ${f.reverse ? "flex-col-reverse" : "flex-col"}`}>
            {f.reverse && <FeatureMedia f={f} dark />}
            <div className="flex w-full flex-col items-center gap-[8px] lg:w-[490px] lg:items-start">
              <div className="flex items-center gap-[4px] rounded-[100px] bg-[rgba(34,56,114,0.6)] px-[24px] py-[8px] text-[14px] font-medium tracking-[-0.28px] text-white/80">
                {f.icon}
                <span>{f.badge}</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-center text-[24px] font-bold leading-[1.3] tracking-[-0.68px] text-white lg:text-left lg:text-[34px]">{f.sub}</span>
                <span className="text-center text-[24px] font-bold leading-[1.3] tracking-[-0.68px] text-brand lg:text-left lg:text-[34px]">{f.main}</span>
              </div>
              <p className="mt-[4px] text-center text-[15px] leading-[1.4] tracking-[-0.32px] text-white lg:text-left lg:text-[16px]">{f.desc}</p>
            </div>
            {!f.reverse && <FeatureMedia f={f} dark />}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =====================================================================
   섹션21 (CHAPTER 04): IP66 방수·방진 — 검은 배경, keeper | Hanwha Vision 배지 + 제품 이미지
   ===================================================================== */
export function DurabilitySection() {
  return (
    <section id="security-store-section21" className="flex w-full justify-center bg-[#010000] py-[60px] lg:py-[120px]">
      <div className="flex w-full max-w-[1920px] flex-col items-center gap-[40px] px-[16px] lg:gap-[77px] lg:px-[420px]">
        <div className="flex flex-col items-center">
          <div className="inline-block rounded-[1000px] bg-[rgba(255,241,230,0.18)] px-[21.2px] py-[8.8px] lg:px-[24px] lg:py-[10px]">
            <div className="flex items-center gap-[9.3px]">
              <div className="text-[16px] font-extrabold tracking-[-0.5px] lg:text-[18px]">
                <span className="text-brand">keeper</span>
              </div>
              <div className="h-[12.3px] w-px bg-white/20" />
              <div className="flex items-center gap-[6px]">
                <Placeholder label="Hanwha Vision 로고" kind="icon" dark className="h-[18px] w-[116px]" />
              </div>
            </div>
          </div>
          <h2 className="mt-[20px] text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-white lg:mt-[24px] lg:text-[42px] lg:tracking-[-0.84px]">
            장대비에도, 먼지바람에도
            <br />
            끄떡없는 <span className="text-brand">IP66 방수·방진</span>
          </h2>
          <p className="mt-[14px] text-center text-[15px] leading-[1.4] tracking-[-0.4px] text-white/[0.88] lg:mt-[10px] lg:text-[20px]">
            거센 빗줄기, 미세한 먼지에도 손상되지 않는
            <SpaceMbBr />
            IP66 등급의 방수·방진 기술력
            <SpacePcBr />
            어떤 악천후 속에서도
            <SpaceMbBr />
            안정적으로 보안을 지켜드립니다.
          </p>
        </div>
        <div className="flex w-full max-w-[643px] justify-center">
          <Placeholder label="IP66 방수 방진 CCTV" dark className="aspect-[643/276] w-full" />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션23 (CHAPTER 05): 키퍼 APP 직원 관리 기능 — 탭 + 스텝 자동 진행 (EmployeeTabs)
   ===================================================================== */
export function EmployeeSection() {
  return (
    <section id="security-store-section23" className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[120px]">
      <div className="w-full lg:w-[1080px]">
        <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-[#1d1d1f] lg:text-[42px] lg:tracking-[-0.84px]">
          키퍼 APP을 통한
          <br />
          <strong className="text-brand">다양한 직원 관리 기능</strong>
        </h2>
        <EmployeeTabs />
      </div>
    </section>
  );
}

/* =====================================================================
   섹션26 (CHAPTER 06): 서비스 3종 — 설치비 무료 / 3년 무상 A/S / 안심케어 1년 무료
   원본은 행마다 이미지를 앞뒤로 2번 렌더링하고 CSS 로 하나만 노출:
   · PC 홀수 행: 텍스트 좌 + 이미지 우 / PC 짝수 행: 이미지 좌 + 텍스트 우
   · 모바일: 항상 텍스트 위 + 이미지 아래
   ===================================================================== */
const SERVICES = [
  {
    badge: "매장 맞춤 최적 설치",
    alt: "전문 설치기사 매장 방문 최초 설치비 무료 안내",
    title: <>부담 없는 시작을 위한<br /><strong className="text-brand">최초 설치비 무료</strong></>,
    desc: <>추가 비용 없이 시작하는 CCTV 솔루션으로, 전문 설치<br />기사가 매장에 직접 방문해 최적의 위치에 설치해드립니다</>,
  },
  {
    badge: "수리 부담 없는 안심 사용",
    alt: "한화비전 3년 무상 A/S 및 품질 보증 안내",
    title: <>안심하고 사용하는<br /><strong className="text-brand">3년 무상 A/S</strong></>,
    desc: <>국내 유일 대기업 제조사만이 가능한 3년 무상 A/S로,<br />사용 중 발생할 수 있는 수리 부담까지 덜어드립니다</>,
  },
  {
    badge: "사장님 안심케어 지원",
    alt: "캐롯손해보험 매장 안심보험 1년 무료 혜택 안내",
    title: <>최대 1,000만원 보장<br /><strong className="text-brand">사장님 안심케어 1년 무료</strong></>,
    desc: (
      <>
        한화손해보험 캐롯과 함께하는 &apos;사장님 안심케어&apos;를 <br className="lg:hidden" />
        1년간 무료로 제공하며, CCTV 촬영 중 발생한 매장 내 <br className="lg:hidden" />
        기물 파손·고객 상해·해킹 사고에 대해 <br className="lg:hidden" />
        최대 1,000만원까지 보장합니다
      </>
    ),
  },
];

export function ServiceSection() {
  return (
    <section id="security-store-section26" className="flex w-full justify-center overflow-hidden bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center lg:block lg:w-[1080px] lg:max-w-none">
        {SERVICES.map((s, i) => {
          const even = i % 2 === 1; // nth-child(even)
          const img = (cls: string) => (
            <div className={`w-full overflow-hidden rounded-[14px] lg:w-[544px] ${cls}`}>
              <Placeholder label={s.alt} className="aspect-[544/340] w-full" />
            </div>
          );
          return (
            <div
              key={s.badge}
              className={`flex flex-col items-center justify-start gap-[40px] lg:flex-row lg:gap-[68px] ${even ? "lg:justify-start" : "lg:justify-between"} ${i > 0 ? "mt-[80px] lg:mt-[60px]" : ""}`}
            >
              {/* 앞쪽 이미지: 모바일 항상 숨김, PC 는 짝수 행에서만 노출 */}
              {img(even ? "hidden lg:block" : "hidden")}
              <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
                <div>
                  <div className="inline-flex items-center justify-center gap-[6px] rounded-[90px] bg-[#fbf7ed] px-[24px] py-[8px] text-[13px] font-medium leading-[18px] tracking-[-0.28px] text-[rgba(23,23,23,0.8)] lg:text-[14px] lg:leading-[20px]">
                    <CircleCheckIcon />
                    {s.badge}
                  </div>
                </div>
                <h3 className="mt-[10px] text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#171717] lg:text-[34px] lg:leading-[48px] lg:tracking-[-0.68px]">{s.title}</h3>
                <p className="mt-[10px] max-w-[434px] whitespace-nowrap text-[15px] leading-[23px] tracking-[-0.32px] text-[#525252] lg:whitespace-normal lg:text-[16px]">{s.desc}</p>
              </div>
              {/* 뒤쪽 이미지: 모바일 항상 노출, PC 는 짝수 행에서 숨김 */}
              {img(even ? "lg:hidden" : "")}
            </div>
          );
        })}
      </div>
    </section>
  );
}
