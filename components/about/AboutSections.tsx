/**
 * /about (회사소개) 페이지 섹션 모음 — 서버 컴포넌트 (등장 애니메이션만 클라이언트 Reveal 로 감쌈)
 * - keeper /story 페이지(Why Keeper → 브랜드 철학 → "그리고 우리는 믿습니다") 의 레이아웃·수치를 따르고
 *   색만 브랜드 토큰(brand 네이비 / point 틸)으로 바꿈. 카피는 회사소개 스토리 카피(about_copy) 기준.
 * - 구성: ① 브랜드 스토리("저렴한 게 전부일까요?" 문제 제기 → 네이비 배경 위 "기준을 먼저 세웠습니다" → 만든 이유)
 *         ② 브랜드 철학(Unite Technology / Responsibility / with You 3카드, 지그재그)
 *         ③ 마무리("우리는 고객의 현장을 지키는 사람들입니다." → 배경 위 "그리고 우리는 믿습니다.")
 *         ④ 강점 9가지(카드 그리드, Reveal 순차 등장)
 *         ⑤ 한국브랜드 선호도 3년 연속 1위 ⑥ 조직도 ⑦ 전국 지사 요약
 * - ⑤⑥⑦ 은 기존 회사(대한민국CCTV) 자료 → 숨김 처리(지우지 않음).
 *   ⑤ LEGACY.award / ⑦ LEGACY.branches (@/lib/site) / ⑥ 파일 내 SHOW_ORG_CHART 가 false 면 null 반환.
 * - 회사명·슬로건·운영시간은 추후 변경 가능 → 화면 텍스트는 모두 SITE.name / SITE.slogan / SITE.hours
 * - 줄바꿈: 카피의 줄 단위는 <br />, PC 에서만 끊을 곳은 <PcBr />, 모바일에서만 끊을 곳은 <MoBr />
 *   (keeper 의 PC/모바일 전용 <br> 패턴). 나머지는 break-keep 으로 어절 단위 자연 줄바꿈.
 * - 반응형: Tailwind 기본(모바일) + lg:(PC)
 */
import type { ReactNode } from "react";
import Eyebrow from "@/components/common/Eyebrow";
import Image from "next/image";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { LEGACY, SITE } from "@/lib/site";
import { PHILOSOPHY } from "./philosophy";
import {
  CalendarCheckIcon,
  CameraPlusIcon,
  ClockIcon,
  HardHatIcon,
  PersonIcon,
  PhoneEyeIcon,
  ShieldCheckIcon,
  WonCoinIcon,
  WrenchIcon,
} from "./strengthIcons";

/**
 * 조직도 노출 여부 — 현재 조직도 이미지는 기존 회사(대한민국CCTV) 자료라 숨김 (LEGACY.branches 와 같은 취지).
 * 신규 회사 조직도가 준비되면 이미지 교체 후 true.
 */
const SHOW_ORG_CHART = false;

/* ------------------------------------------------------------------ */
/* 공통 조각 (keeper story 와 동일 수치)                                  */
/* ------------------------------------------------------------------ */

/** 모바일에서만 줄바꿈 (PC 는 공백으로 이어짐) */
function MoBr() {
  return (
    <>
      {" "}
      <br className="lg:hidden" />
    </>
  );
}

/** 회색 라벨 뱃지 — "브랜드 스토리 ㅣ Why 유니텍CCTV?" */
/** 섹션 머리 라벨 — 영문 대문자 + 틸 라인 (브랜드 가이드 스타일, 공용 Eyebrow) */
function SectionBadge({ children }: { children: ReactNode }) {
  return <Eyebrow>{children}</Eyebrow>;
}

/**
 * 큰 제목 — 모바일에서 span 은 block 줄바꿈, PC 에서는 inline
 * - tone: dark(흰 배경, strong = point-strong) / white(네이비 배경, strong = point)
 */
function Title({
  as: Tag = "h2",
  tone = "dark",
  children,
}: {
  as?: "h1" | "h2";
  tone?: "dark" | "white";
  children: ReactNode;
}) {
  const toneCls =
    tone === "white" ? "text-white [&_strong]:text-point" : "text-[#202020] [&_strong]:text-point-strong";
  return (
    <Tag
      className={`max-w-[320px] break-keep text-center text-[26px] font-bold leading-[40px] tracking-[-0.28px] [&_span]:block [&_strong]:whitespace-nowrap lg:mb-[16px] lg:max-w-none lg:text-[46px] lg:leading-[68px] lg:tracking-[-0.36px] lg:[&_span]:inline ${toneCls}`}
    >
      {children}
    </Tag>
  );
}

/**
 * 본문 문단 — 가운데 정렬 + 넉넉한 행간
 * - size "md": 모바일 14/24, PC 24/40 (keeper 24/36 보다 행간 여유) / "lg": 모바일 20/30, PC 36/50
 * - tone: gray(#787878) / white(흰 90%) / soft(#20202099)
 * - [&_b] 는 강조 문단(그래서·그리고·그게…) 볼드 + 진한 색
 */
function Body({
  tone = "gray",
  size = "md",
  children,
}: {
  tone?: "gray" | "white" | "soft";
  size?: "md" | "lg";
  children: ReactNode;
}) {
  const sizeCls =
    size === "lg"
      ? "text-[20px] leading-[30px] lg:text-[36px] lg:leading-[50px]"
      : "text-[14px] leading-[24px] lg:text-[24px] lg:leading-[40px]";
  const toneCls = {
    gray: "text-[#787878] [&_b]:text-[#202020]",
    white: "text-white/90 [&_b]:text-white",
    soft: "text-[#20202099] [&_b]:text-[#202020]",
  }[tone];
  return (
    <p className={`break-keep text-center font-normal [&_b]:font-bold ${sizeCls} ${toneCls}`}>{children}</p>
  );
}

/** 네이비 배경 사진 위에 흰 글씨가 올라가는 블록 — keeper ImageBackdrop 과 동일 수치 */
function ImageBackdrop({
  label,
  photo,
  minHeightPc,
  children,
}: {
  /** 실제 사진 확보 시 들어갈 사진 설명 (현재 스톡 사진의 alt 로 사용) */
  label: string;
  /** 배경 사진 경로 — 스토리: 실제 시공 사진(public/images/site) / 마무리: 스톡 사진(public/images/stock) */
  photo: string;
  minHeightPc: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative flex h-auto w-full items-center justify-center ${minHeightPc}`}>
      {/* 배경 사진 + 브랜드 네이비 오버레이(흰 글씨 가독성) */}
      <div className="absolute inset-0 overflow-hidden bg-brand">
        <Image src={photo} alt={label} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-brand/80" />
      </div>
      <div className="relative z-[1] flex flex-col items-center justify-center gap-[14px] px-[20px] py-[100px] lg:gap-[24px] lg:py-[200px]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ① 브랜드 스토리 (Why 유니텍CCTV?)                                      */
/* ------------------------------------------------------------------ */

export function StorySection() {
  return (
    <section className="w-full">
      {/* ===== 문제 제기: 뱃지 + "CCTV, 저렴한 게 전부일까요?" + 3문단 / 문단 Reveal 순차 등장
           주제: "CCTV는 싸게 다는 게 전부가 아니다" — 견적서의 가격만 보고 고르면 정작 필요한 순간에 쓸모없을 수 있다는 이야기.
           (특정 업체를 깎아내리지 않고, 고객이 실제로 겪는 상황으로. AS 탭의 "연락 두절" 문구와 겹치지 않게 표현 다르게) ===== */}
      <div className="flex flex-col items-center justify-center gap-[14px] px-[20px] pb-[120px] pt-[52px] lg:gap-[24px] lg:pb-[150px] lg:pt-[140px]">
        <Reveal>
          <SectionBadge>Brand Story</SectionBadge>
        </Reveal>
        <Reveal delay={100}>
          <Title as="h1">
            <span>CCTV, 저렴한 게</span> 전부일까요?
          </Title>
        </Reveal>
        <div className="flex flex-col items-center gap-[24px] lg:gap-[40px]">
          <Reveal delay={200}>
            <Body>
              견적을 받아 보면
              <MoBr />
              가격이 제일 먼저 눈에 들어옵니다.
              <br />
              몇만 원이라도 싼 곳이 좋아 보이는 건
              <MoBr />
              당연한 일이죠.
            </Body>
          </Reveal>
          <Reveal delay={300}>
            <Body>
              그런데 설치하고 나서야 알게 됩니다.
              <br />
              녹화는 잘 되고 있는지, 밤에도 제대로 보이는지,
              <br />
              고장 나면 누가 와 주는지는
              <MoBr />
              견적서에 적혀 있지 않았다는 걸.
            </Body>
          </Reveal>
          <Reveal delay={400}>
            <Body>
              우리 공간을 지키려고 단 CCTV가
              <MoBr />
              정작 필요한 순간에 도움이 되지 않는다면,
              <br />
              그 가격은 결코 싼 게 아닙니다.
            </Body>
          </Reveal>
        </div>
      </div>

      {/* ===== 네이비 배경(이미지 자리) 위 "그래서, 우리는 기준을 먼저 세웠습니다" + "그리고 알게 되었습니다" / PC min-height 826px ===== */}
      <ImageBackdrop
        label="기사 두 명이 사다리에 올라 아파트 주차장 천장에 CCTV를 설치하는 모습"
        // 실제 시공 사진 (관리자 시공사례 — 대전 아파트): public/images/site/about-story-garage-install.webp
        photo="/images/site/about-story-garage-install.webp"
        minHeightPc="lg:min-h-[826px]"
      >
        <Reveal>
          <Title tone="white">
            <span>그래서, 우리는</span> 기준을 먼저 세웠습니다.
          </Title>
        </Reveal>
        <div className="flex flex-col items-center gap-[24px] lg:gap-[40px]">
          <Reveal delay={100}>
            <Body tone="white">
              현장에 맞지 않는 장비는 권하지 않고,
              <MoBr />
              필요한 만큼만 정직하게 설계할 것.
              <br />
              설치한 사람이 끝까지 책임지고,
              <MoBr />
              고장 나면 언제든 연락이 닿을 것.
            </Body>
          </Reveal>
          <Reveal delay={200}>
            <Body tone="white">
              <b>그리고 알게 되었습니다.</b>
              <br />
              고객이 원하는 건 가장 싼 카메라가 아니라,
              <br />
              믿고 맡겨도 된다는 &lsquo;안심&rsquo;이라는 것을.
            </Body>
          </Reveal>
        </div>
      </ImageBackdrop>

      {/* ===== 만든 이유: 연한 틸 배경 + 세로 구분선 + "그게 우리가 유니텍CCTV를 만든 이유입니다." ===== */}
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[32px] bg-point-light px-[20px] py-[100px] lg:py-[200px]">
        <Reveal>
          <Body tone="soft" size="lg">
            저렴한 CCTV보다,
            <MoBr />
            끝까지 믿을 수 있는 CCTV.
          </Body>
        </Reveal>
        <Reveal delay={150}>
          <div className="h-[67px] w-px bg-brand lg:h-[162px]" />
        </Reveal>
        <Reveal delay={300}>
          <Title>
            <span>그게 우리가</span> <strong>{SITE.name}를 만든 이유</strong>입니다.
          </Title>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ② 브랜드 철학 (우리가 지키고 싶은 것)                                   */
/* ------------------------------------------------------------------ */

/** Unite ○○ 카드 데이터는 홈 "왜 {SITE.name}인가" 섹션과 공유 → ./philosophy.tsx */

export function PhilosophySection() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-[14px] overflow-hidden px-[20px] pb-[100px] pt-[100px] lg:max-w-[1082px] lg:gap-[24px] lg:overflow-visible lg:px-0 lg:pb-[140px] lg:pt-[200px]">
      {/* ===== 섹션 타이틀: 브랜드 철학 뱃지 + "유니텍CCTV는 단순한 설치 업체가 아닙니다." + 대표 이미지 ===== */}
      <Reveal>
        <SectionBadge>Philosophy</SectionBadge>
      </Reveal>
      <Reveal delay={100}>
        <Title>
          <span>
            <strong>{SITE.name}</strong>는 단순한
          </span>{" "}
          설치 업체가 아닙니다.
        </Title>
      </Reveal>
      <Reveal delay={200} className="w-full">
        {/* 실제 시공 사진 (관리자 시공사례에서 고름): public/images/site/install-house-exterior.webp */}
        <div className="relative aspect-[1920/760] w-full overflow-hidden rounded-[4px] lg:rounded-[20px]">
          <Image
            src="/images/site/install-house-exterior.webp"
            alt={`${SITE.name} 시공 기사가 건물 벽에서 작업하는 모습`}
            fill
            sizes="(min-width: 1024px) 1082px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* ===== 철학 본문: 좌측 슬로건 / 우측 이름 뜻(UNITECH) 설명 → Unite 3카드 (지그재그) / 카드 Reveal 순차 등장 ===== */}
      <article className="flex w-full flex-col items-center justify-start gap-[100px] pt-[5px] lg:gap-[140px] lg:pt-[16px]">
        <Reveal className="block w-full lg:flex lg:items-center lg:justify-center lg:gap-[40px]">
          <h3 className="flex-1 break-keep pb-[10px] pt-[5px] text-center text-[20px] font-bold leading-[32px] text-[#202020] lg:p-0 lg:text-left lg:text-[42px] lg:leading-[64px]">
            {SITE.slogan}
          </h3>
          <p className="flex-1 break-keep text-center text-[13px] leading-[21px] text-[#787878] lg:text-left lg:text-[24px] lg:leading-[36px]">
            하나된 기술과 책임 있는 시공으로
            <br />
            고객의 공간과 일상을 끝까지 지키겠다는 약속,
            <br />
            그것이 우리의 철학입니다.
          </p>
        </Reveal>

        <div className="flex w-full flex-col items-center justify-start gap-[40px] lg:gap-[80px]">
          {PHILOSOPHY.map((item) => {
            // 카드: 배경 사진 위에 네이비 오버레이 + 큰 영문 "Unite ○○"
            const card = (
              <div className="relative flex h-[152px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-brand lg:h-[244px] lg:rounded-[20px]">
                {/* 실제 시공 사진: public/images/site/about-*.webp (philosophy.tsx photo) */}
                <Image
                  src={item.photo}
                  alt={item.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand/70" />
                <p className="relative whitespace-nowrap text-[24px] font-bold leading-[38px] text-white lg:text-[32px] lg:leading-normal">
                  Unite&nbsp;<span className="text-point">{item.keyword}</span>
                </p>
              </div>
            );
            const text = (
              <div className="flex w-full flex-col items-center justify-center gap-[4px] p-0 lg:items-start lg:gap-[20px]">
                <h4 className="text-[16px] font-bold text-[#202020] lg:text-[30px]">
                  <span className="text-point-strong">{item.highlight}</span>
                  {item.titleRest}
                </h4>
                <p className="break-keep text-center text-[13px] font-normal leading-[21px] text-[#878d99] lg:text-left lg:text-[22px] lg:leading-[34px]">
                  {item.desc}
                </p>
              </div>
            );
            return (
              <Reveal
                key={item.keyword}
                className={`relative flex w-full items-center justify-center gap-[14px] lg:static lg:flex-row lg:justify-normal lg:gap-[53px] ${
                  item.reverse ? "flex-col-reverse" : "flex-col"
                }`}
              >
                {item.reverse ? (
                  <>
                    {text}
                    {card}
                  </>
                ) : (
                  <>
                    {card}
                    {text}
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </article>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ③ 마무리: 우리는 고객의 현장을 지키는 사람들입니다 / 그리고 우리는 믿습니다 */
/* ------------------------------------------------------------------ */

export function ClosingSection() {
  return (
    <section className="flex w-full flex-col items-center">
      {/* ===== 사람들 소개: 제목 + 팀 이미지 + 2문단 / 문단 Reveal 순차 등장 ===== */}
      <div className="flex w-full flex-col items-center gap-[14px] px-[20px] pb-[100px] pt-[60px] lg:max-w-[1082px] lg:gap-[24px] lg:px-0 lg:pb-[200px] lg:pt-[100px]">
        <Reveal>
          <Title>
            <span>우리는 고객의 현장을</span> 지키는 사람들입니다.
          </Title>
        </Reveal>
        <Reveal delay={100} className="w-full">
          {/* 실제 시공 사진 (관리자 시공사례에서 고름 — 기사님 여러 명이 실내 설치): public/images/site/team-indoor-install.webp */}
          <div className="relative aspect-[1081/450] w-full overflow-hidden rounded-[4px] lg:rounded-[20px]">
            <Image
              src="/images/site/team-indoor-install.webp"
              alt="기사님들이 사다리에 올라 실내 천장에 CCTV를 설치하는 모습"
              fill
              sizes="(min-width: 1024px) 1082px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="flex flex-col items-center gap-[24px] lg:gap-[40px]">
          <Reveal delay={200}>
            <Body tone="soft">
              우리는 현장에서 직접 CCTV를 설치하고, 고치고,
              <MoBr />
              관리해 온 사람들입니다.
              {/* TODO: 고객 확인 후 "○○년간 ○○건의 현장을…" 같은 실적 문장으로 교체 가능 */}
              <br />
              수많은 현장에서 본 건, 가격만 보고 달았다가
              <br />
              정작 필요할 때 쓰지 못하는 CCTV였습니다.
            </Body>
          </Reveal>
          <Reveal delay={300}>
            <Body tone="soft">
              그래서 우리는 {SITE.name}를 만들었습니다.
              <br />
              <b>복잡한 보안은 쉽게, 사후관리는 확실하게.</b>
            </Body>
          </Reveal>
        </div>
      </div>

      {/* ===== 네이비 배경(이미지 자리) 위 "그리고 우리는 믿습니다." / PC min-height 407px ===== */}
      <div className="w-full lg:pb-[200px]">
        <ImageBackdrop
          label="햇빛이 드는 밝고 깔끔한 사무 공간"
          // 스톡 사진(CC0): public/images/stock/about-closing-bright-interior.webp (실제 시공 사진으로 바꿔 봤으나 대표 요청으로 스톡 유지)
          photo="/images/stock/about-closing-bright-interior.webp"
          minHeightPc="lg:min-h-[407px]"
        >
          <Reveal>
            <Title tone="white">그리고 우리는 믿습니다.</Title>
          </Reveal>
          <Reveal delay={150}>
            <Body tone="white">
              좋은 CCTV는 가격표가 아니라, 안심으로 증명된다고.
              <br />
              {SITE.name}는 현장에 꼭 맞는 설계, 끝까지 책임지는 시공,
              <br />
              언제든 연락되는 사후관리로
              <MoBr />
              고객의 믿을 수 있는 기술 파트너가 되겠습니다.
            </Body>
          </Reveal>
        </ImageBackdrop>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ④ 강점 9가지                                                          */
/* ------------------------------------------------------------------ */

/**
 * 강점 카드 데이터 — 원본 AS 페이지 "1~9" 순서/문구 기준, Icon 은 원본 아이콘(2024/03/010~019.png) 대신 라인 아이콘
 * TODO: 신규 회사 정책 확인 — 무상 AS 1년 / 24시간 원격 감시 / 1:1 담당자 / 정기 점검 / 24시간 이내 방문 / 직영 공사팀은
 *       기존 회사(대한민국CCTV) 정책 수치. 유니텍CCTV 도 동일한지 고객 확인 필요.
 * - 02번 원문 "전국 인프라 구성으로 어디든 설치가 가능" 은 신규 회사가 단정할 수 없는 실적이라 브랜드 스토리 문구로 교체.
 */
const STRENGTHS = [
  { title: "당사 설치 시\n모든 부품 무상 AS 1년", Icon: ShieldCheckIcon }, // TODO: 신규 회사 정책 확인
  { title: "설치부터 수리까지\n한 곳에서 책임 시공", Icon: WrenchIcon },
  { title: "스마트폰 24시간\n원격 감시 무료 제공", Icon: PhoneEyeIcon },
  { title: "1:1 유지 보수\n담당자 배정", Icon: PersonIcon },
  { title: "합리적인 견적의\n최저가 솔루션", Icon: WonCoinIcon },
  { title: "정기적인 점검", Icon: CalendarCheckIcon },
  { title: "의뢰 후 24시간 이내\n방문 진단 및 수리", Icon: ClockIcon }, // TODO: 신규 회사 정책 확인
  { title: "직영 공사팀의\n치밀한 공사와 맞춤 컨설팅", Icon: HardHatIcon },
  { title: "증설 및 이전\n전문 서비스", Icon: CameraPlusIcon },
];

export function StrengthsSection() {
  return (
    <section className="flex w-full flex-col items-center bg-[#f4f7fb] px-[20px] py-[100px] lg:py-[160px]">
      <div className="flex w-full max-w-[1082px] flex-col items-center gap-[14px] lg:gap-[24px]">
        {/* ===== 섹션 타이틀 ===== */}
        <SectionBadge>Strengths</SectionBadge>
        <Title>
          <span>믿고 맡길 수 있는</span> <strong>9가지 약속</strong>
        </Title>

        {/* ===== 강점 카드 그리드: 모바일 2열 / PC 3열
             인터랙션: 각 카드를 Reveal 로 감싸 화면 진입 시 slide-in-up,
             같은 행(3개) 안에서 100ms 씩 지연을 줘 순차적으로 등장 ===== */}
        <ul className="mt-[16px] grid w-full grid-cols-2 gap-[10px] lg:mt-[24px] lg:grid-cols-3 lg:gap-[20px]">
          {STRENGTHS.map((item, i) => {
            // 모바일 2열: 1번 카드를 가로로 길게(2칸) → 나머지 8개가 2열로 딱 맞음. 안 배치는 다른 카드와 같음(번호 → 아이콘 → 문구, 가운데)
            const wide = i === 0;
            return (
              <Reveal as="li" key={item.title} delay={(i % 3) * 100} className={`h-full ${wide ? "max-lg:col-span-2" : ""}`}>
                <div
                  className="flex h-full flex-col items-center gap-[12px] rounded-[12px] bg-white px-[12px] py-[24px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] lg:gap-[20px] lg:rounded-[20px] lg:px-[24px] lg:py-[40px]"
                >
                  <span className="text-[13px] font-bold text-point-strong lg:text-[18px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* 아이콘: 옅은 틸 원 + 진한 틸 라인 아이콘 */}
                  <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-point-light text-point-strong lg:h-[80px] lg:w-[80px]">
                    <item.Icon className="h-[28px] w-[28px] lg:h-[42px] lg:w-[42px]" />
                  </span>
                  <p className="whitespace-pre-line break-keep text-[14px] font-bold leading-[22px] text-[#202020] lg:text-[22px] lg:leading-[34px]">
                    {item.title}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ⑤ 수상: 한국브랜드 선호도 3년 연속 1위                                  */
/* ------------------------------------------------------------------ */

export function AwardSection() {
  // 기존 회사 수상 내역 — 신규 회사 명의 사용 확인 전까지 숨김
  if (!LEGACY.award) return null;
  return (
    <section className="flex w-full flex-col items-center gap-[14px] px-[20px] py-[100px] lg:gap-[24px] lg:py-[160px]">
      {/* ===== 수상 메달 이미지 + 문구 / 정적 ===== */}
      <Reveal animation="fade-in">
        {/* 메달 3개 이미지 (기존 사이트 원본 2025/07/스크린샷_2025-07-21_165045-removebg-preview.png → WebP) */}
        <Image
          src="/images/award/kbpa-medals.webp"
          alt="한국브랜드 선호도 1위 수상 메달 3개 (2018 · 2019 · 2020)"
          width={621}
          height={350}
          className="h-auto w-[260px] lg:w-[400px]"
        />
      </Reveal>
      <SectionBadge>Award</SectionBadge>
      <Title>
        <strong>3년 연속 1위</strong> 수상
      </Title>
      {/* 제목 ↔ 설명 간격: 섹션 gap(14/24px)만으로는 붙어 보여 조금 더 내림 (2026-10-21 대표 요청) */}
      <div className="mt-[10px] lg:mt-[16px]">
        <Body>
          {`${SITE.name}는 한국브랜드 선호도 3년 연속 1위 수상 기업입니다.
${SITE.name}의 검증된 제품과 서비스를 확인해보세요.`}
        </Body>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ⑥ 조직도                                                              */
/* ------------------------------------------------------------------ */

export function OrgChartSection() {
  // 기존 회사 조직도 이미지 — 숨김 (상단 SHOW_ORG_CHART 참고)
  if (!SHOW_ORG_CHART) return null;
  return (
    <section className="flex w-full flex-col items-center gap-[14px] bg-[#f8f8f8] px-[20px] py-[100px] lg:gap-[24px] lg:py-[160px]">
      {/* ===== 조직도 이미지 / 정적 ===== */}
      <SectionBadge>Organization</SectionBadge>
      <Title>조직도</Title>
      <Placeholder
        label="조직도 (2025/07/제목을-입력해주세요_-004.png)"
        className="aspect-[4/3] w-full max-w-[1082px] rounded-[4px] bg-white lg:aspect-[16/9] lg:rounded-[20px]"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ⑦ 전국 지사 요약                                                      */
/* ------------------------------------------------------------------ */

/** 본사 + 6개 지사 — 원본 홈 "전국 서비스 구축 현황" 주소 그대로 (첫 주소가 대표 주소) */
const BRANCHES = [
  { name: "본사", addresses: [SITE.address] },
  {
    name: "중부지사",
    addresses: [
      "경기도 하남시 하남대로777번길 14",
      "경기도 구리시 원수택로12번길 33, 1층",
      "인천광역시 부평구 부흥로360번길 7",
      "인천광역시 남동구 논현동 563-3",
      "충청북도 진천군 이월면 진광로 808",
      "경기도 수원시 권선구 세권로304번길 1-22",
      "충청남도 천안시 서북구 불당11로 20",
      "경기도 파주시 금촌동 962-25",
      "경기도 성남시 분당구 매화로37번길 16",
    ],
  },
  {
    name: "강원지사",
    addresses: [
      "강원특별자치도 춘천시 백령로 190",
      "강원특별자치도 속초시 중앙로 56",
      "강원특별자치도 원주시 무실로 136",
    ],
  },
  {
    name: "호남지사",
    addresses: [
      "광주광역시 북구 신임로32번길 35 모아 더 스카이",
      "전라남도 장흥군 장흥읍 동교2길 50",
      "전북특별자치도 전주시 덕진구 팔달로 341",
      "전라남도 광양시 구마1길 3-9",
    ],
  },
  {
    name: "경북지사",
    addresses: [
      "경상북도 문경시 점촌로 20",
      "대구광역시 중구 동덕로 115 진석타워",
      "경상북도 울진군 울진읍 월변1길 9",
    ],
  },
  {
    name: "경남지사",
    addresses: [
      "부산광역시 동래구 아시아드대로164번가길 18",
      "경상남도 고성군 고성읍 동외리 649-32",
      "경상남도 진주시 돗골로 149",
    ],
  },
  {
    name: "제주지사",
    addresses: ["제주특별자치도 제주시 아라이동 3008-1", "제주특별자치도 서귀포시 서문로 2-1"],
  },
];

export function BranchesSection() {
  // 기존 회사 전국 지사 — 신규 회사 명의 사용 확인 전까지 숨김
  if (!LEGACY.branches) return null;
  return (
    <section className="flex w-full flex-col items-center px-[20px] py-[100px] lg:py-[160px]">
      <div className="flex w-full max-w-[1082px] flex-col items-center gap-[14px] lg:gap-[24px]">
        {/* ===== 섹션 타이틀 + 통합 콜센터 번호(SITE.phone) ===== */}
        <SectionBadge>Network</SectionBadge>
        <Title>
          <span>전국 어디든</span> <strong>빠른 설치와 AS</strong>
        </Title>
        <Body>
          통합 콜센터 운영{" "}
          <a href={SITE.phoneHref} className="font-bold text-point-strong">
            {SITE.phone}
          </a>
        </Body>

        {/* ===== 지사 카드: 대표 주소(굵게) + 나머지 거점 주소 목록 / 모바일 1열, PC 2열 ===== */}
        <ul className="mt-[16px] grid w-full grid-cols-1 gap-[10px] text-left lg:mt-[24px] lg:grid-cols-2 lg:gap-[20px]">
          {BRANCHES.map((b) => (
            <li
              key={b.name}
              className={`rounded-[12px] border border-[#eee] p-[20px] lg:rounded-[20px] lg:p-[32px] ${
                b.name === "본사" ? "lg:col-span-2 border-brand bg-[#f4f7fb]" : ""
              }`}
            >
              <h3 className="text-[16px] font-bold text-point-strong lg:text-[22px]">{b.name}</h3>
              <p className="mt-[6px] break-keep text-[14px] font-bold leading-[22px] text-[#202020] lg:mt-[10px] lg:text-[18px] lg:leading-[28px]">
                {b.addresses[0]}
              </p>
              {b.addresses.length > 1 && (
                <ul className="mt-[8px] flex flex-col gap-[2px] text-[12px] leading-[20px] text-[#878d99] lg:mt-[12px] lg:text-[15px] lg:leading-[24px]">
                  {b.addresses.slice(1).map((addr) => (
                    <li key={addr} className="break-keep">
                      · {addr}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
