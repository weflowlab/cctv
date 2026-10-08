/**
 * /story (키퍼 스토리) 페이지 섹션 모음 — 서버 컴포넌트
 * - 원본 keeper.ceo/story 는 인터랙션이 없는 정적 페이지(디바이스 판별용 resize 리스너만 존재)라
 *   모든 섹션을 서버 컴포넌트로 구성한다.
 * - 구성: ① Why Keeper(문제 제기 → 배경 이미지 위 "바꿔보기로 했습니다" → 키퍼를 만든 이유)
 *         ② 브랜드 철학(Keep your Space/Time/Life 카드)
 *         ③ 하단 배경 이미지 위 "그리고 우리는 믿습니다."
 * - 반응형 기준: 원본 max-width:1023px = 모바일 → Tailwind 기본(모바일) + lg:(PC)
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

/* ------------------------------------------------------------------ */
/* 공통 조각                                                            */
/* ------------------------------------------------------------------ */

/** 회색 라벨 뱃지 (원본 sc-d89c794d-0) — "브랜드 스토리 ㅣ Why Keeper?" */
function SectionBadge({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[8px] bg-[#f8f8f8] px-[24px] py-[14px] text-[14px] font-medium text-[#202020e0] lg:text-[24px]">
      <span className="text-[#20202066]">{label} ㅣ</span> {children}
    </div>
  );
}

/**
 * 큰 제목 (원본 sc-34a225c0-0)
 * - tone: dark(#202020) / white(#fff)
 * - 모바일에서는 최대폭 300px, 내부 span 은 block 으로 줄바꿈
 * - strong 은 주황색 + 줄바꿈 금지
 */
function Title({ tone = "dark", children }: { tone?: "dark" | "white"; children: ReactNode }) {
  return (
    <h2
      className={`max-w-[300px] text-center text-[26px] font-bold leading-[40px] tracking-[-0.28px] [&_span]:block [&_strong]:whitespace-nowrap [&_strong]:text-[#ff5c00] lg:mb-[16px] lg:max-w-none lg:text-[46px] lg:leading-[68px] lg:tracking-[-0.36px] lg:[&_span]:inline ${
        tone === "white" ? "text-white" : "text-[#202020]"
      }`}
    >
      {children}
    </h2>
  );
}

/**
 * 본문 문단 (원본 sc-8ece32ff-1) — white-space:pre-line 으로 원본 줄바꿈(\n) 그대로 유지
 * - size "md": 24/36 (모바일 13/21), "lg": 36/50 (모바일 20/30)
 */
function Body({
  color,
  size = "md",
  children,
}: {
  color: string;
  size?: "md" | "lg";
  children: ReactNode;
}) {
  const sizeCls =
    size === "lg"
      ? "text-[20px] leading-[30px] lg:text-[36px] lg:leading-[50px]"
      : "text-[13px] leading-[21px] lg:text-[24px] lg:leading-[36px]";
  return (
    <div className="flex flex-col items-center justify-center gap-[24px]">
      <p className={`whitespace-pre-line break-all font-normal ${sizeCls}`} style={{ color }}>
        {children}
      </p>
    </div>
  );
}

/** 배경 이미지 위에 흰 글씨가 올라가는 블록 (원본 sc-c79c3374-*) */
function ImageBackdrop({
  label,
  minHeightPc,
  children,
}: {
  label: string;
  minHeightPc: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative flex h-auto w-full items-center justify-center ${minHeightPc}`}>
      {/* 원본: background:url(...) center/cover — 실제 이미지 대신 플레이스홀더 */}
      {/* 흰 글씨 가독성을 위해 어두운 바탕 위에 dark 플레이스홀더를 깐다 */}
      <div className="absolute inset-0 bg-[#2a2a2a]">
        <Placeholder label={label} dark className="h-full w-full" />
      </div>
      <div className="relative z-[1] flex flex-col items-center justify-center gap-[14px] px-[20px] py-[100px] lg:gap-[24px] lg:py-[200px]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ① Why Keeper                                                        */
/* ------------------------------------------------------------------ */

export function WhyKeeperSection() {
  return (
    <section className="w-full">
      <h1 className="blind">사장님 매장을 위한 한화비전 프리미엄 CCTV, Keeper</h1>

      {/* ===== 문제 제기: 뱃지 + "왜 아직도 CCTV 구매는 이렇게 복잡할까요?" + 설명 / 정적 텍스트 ===== */}
      <div className="flex flex-col items-center justify-center gap-[14px] px-[20px] pb-[120px] pt-[40px] lg:gap-[24px] lg:pb-[200px] lg:pt-[180px]">
        <SectionBadge label="브랜드 스토리">Why Keeper?</SectionBadge>
        <Title>왜 아직도 CCTV 구매는 이렇게 복잡할까요?</Title>
        <Body color="#787878">
          {`보험 가입도, 예약도 모바일로 하는 시대에 CCTV는 여전히 영업사원과
상담하고, 가격 협상하고, 장기 계약을 맺어야 합니다.

CCTV를 만들지도 않는 보안 업체는 중간마진을 더하고
평생 발생할까 말까하는 출동 서비스를 추가해 가격을 올립니다.

과연 이게 합리적일까요?`}
        </Body>
      </div>

      {/* ===== 배경 이미지(story_top) 위 "그래서, 우리는 바꿔보기로 했습니다" / PC min-height 826px ===== */}
      <ImageBackdrop label="스토리 상단 배경 이미지 (story_top)" minHeightPc="lg:min-h-[826px]">
        <Title tone="white">
          <span>그래서, 우리는</span> 바꿔보기로 했습니다
        </Title>
        <Body color="#FFFFFFE5">
          {`사장님이 직접, 스마트하게 선택할 수 있도록.
온라인에서 TV를 고르듯 CCTV도 직접 보고, 투명한 가격으로,
꼭 필요한 기능만 담은 제품을 선택할 수 있도록 했습니다.

그리고 알게 되었습니다.

오히려 CCTV가 단순한 보안 장비가 아닌,
직원 관리, 출근부, 급여 계산까지 도울 수 있는
사장님의 파트너가 될 수 있다는 사실을...`}
        </Body>
      </ImageBackdrop>

      {/* ===== 키퍼를 만든 이유: 연주황 배경 + 세로 구분선 + 결론 문구 ===== */}
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[32px] bg-[#fffaf7] py-[100px] lg:py-[200px]">
        <Body color="#20202099" size="lg">
          {`불필요한 비용은 줄이고, 꼭 필요한 서비스만 담아
사장님의 공간과 시간, 일상을 더 편하게 만드는 것.`}
        </Body>
        <div className="h-[67px] w-px bg-[#202020] lg:h-[162px]" />
        <Title>
          그게 우리가 <strong>키퍼를 만든 이유</strong>입니다.
        </Title>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ② 브랜드 철학                                                        */
/* ------------------------------------------------------------------ */

/** Keep your ○○ 카드 데이터 (원본 순서/색상 그대로) */
const PHILOSOPHY = [
  {
    keyword: "Space",
    cardColor: "#59A9FF",
    highlight: "공간",
    highlightColor: "#349aff",
    titleRest: "을 안전하게",
    desc: `고성능 CCTV와 신뢰할 수 있는 품질로,
어떤 상황에서도 매장을 지킬 수 있는
든든한 파트너가 되겠습니다.`,
    reverse: false,
  },
  {
    keyword: "Time",
    cardColor: "#79C15E",
    highlight: "시간",
    highlightColor: "#5fa93c",
    titleRest: "을 더 가치있게",
    desc: `출퇴근 기록, 급여 정산, 운영 확인까지.
CCTV와 연동된 스마트한 방식으로,
사장님의 하루를 더 여유롭게 돌려드립니다.`,
    reverse: true, // PC: 텍스트 왼쪽 / 카드 오른쪽, 모바일: column-reverse 로 카드가 위
  },
  {
    keyword: "Life",
    cardColor: "#F5972A",
    highlight: "삶",
    highlightColor: "#ff7e36",
    titleRest: "에 여유와 균형을",
    desc: `렌탈료, 복잡한 절차, 반복되는 관리 업무까지
신경 써야 할 일들을 줄이고,
사장님의 건강한 삶을 찾아드립니다.`,
    reverse: false,
  },
];

export function PhilosophySection() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-[14px] overflow-hidden px-[20px] pb-[160px] pt-[100px] lg:max-w-[1082px] lg:gap-[24px] lg:overflow-visible lg:px-0 lg:py-[200px]">
      {/* ===== 섹션 타이틀: 브랜드 철학 뱃지 + "키퍼는 단순한 CCTV 서비스가 아닙니다." ===== */}
      <SectionBadge label="브랜드 철학">우리가 지키고 싶은 것</SectionBadge>
      <Title>
        <span>
          <strong>키퍼</strong>는 단순한
        </span>
        CCTV 서비스가 아닙니다.
      </Title>
      <Placeholder
        label="키퍼 어플을 보고 있는 모습"
        className="aspect-[1920/760] w-full rounded-[4px] lg:rounded-[20px]"
      />

      {/* ===== 철학 본문: 좌측 큰 제목 / 우측 설명 → Keep your Space·Time·Life 3개 행 (지그재그) ===== */}
      <article className="flex w-full flex-col items-center justify-start gap-[100px] pb-[160px] pt-[5px] lg:gap-[140px] lg:pb-[376px] lg:pt-[16px]">
        <div className="block w-full lg:flex lg:items-center lg:justify-center">
          <h3 className="flex-1 pb-[10px] pt-[5px] text-center text-[20px] font-bold leading-[32px] text-[#20202066] lg:p-0 lg:text-left lg:text-[42px] lg:leading-[64px]">
            공간을 지키는 기술,{" "}
            <span className="inline text-[#202020] lg:block">삶을 지키는 약속</span>
          </h3>
          <p className="flex-1 text-center text-[13px] leading-[20px] text-[#787878] lg:text-left lg:text-[24px] [&>span]:block [&>span]:leading-[21px] lg:[&>span]:leading-[31px]">
            <span>우리는 사장님의 공간과 시간, 그리고 삶의 균형을 함께</span>
            <span>지켜드리고자 합니다. CCTV를 넘어서, 일상을 지키는</span>
            <span>기술이 되겠다는 약속, 그것이 우리의 철학입니다.</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-[40px] whitespace-pre-line lg:gap-[80px]">
          {PHILOSOPHY.map((item) => {
            const card = (
              <div
                className="flex h-[152px] w-full items-center justify-center whitespace-nowrap rounded-[12px] text-[24px] font-bold leading-[38px] text-white lg:h-[244px] lg:rounded-[20px] lg:text-[32px] lg:leading-normal"
                style={{ backgroundColor: item.cardColor }}
              >
                Keep your&nbsp;<span className="text-[#FFD93D]">{item.keyword}</span>
              </div>
            );
            const text = (
              <div className="flex w-full flex-col items-center justify-center gap-[4px] p-0 lg:items-start lg:gap-[20px]">
                <h4 className="text-[16px] font-bold lg:text-[30px]">
                  사장님의 <span style={{ color: item.highlightColor }}>{item.highlight}</span>
                  {item.titleRest}
                </h4>
                <p className="text-center text-[13px] font-normal leading-[21px] text-[#878d99] lg:text-left lg:text-[22px] lg:leading-[34px]">
                  {item.desc}
                </p>
              </div>
            );
            return (
              <div
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
              </div>
            );
          })}
        </div>
      </article>

      {/* ===== 사람들 소개: "우리는 사장님의 일상을 지키고 싶은 사람들입니다." + 단체 이미지 + 설명 ===== */}
      <Title>우리는 사장님의 일상을 지키고 싶은 사람들입니다.</Title>
      <Placeholder
        label="사장님의 일상을 지키고 싶은 사람들"
        className="aspect-[1081/450] w-full rounded-[4px] lg:rounded-[20px]"
      />
      <Body color="#20202099">
        {`우리는 30년 넘게 보안 시장에서 CCTV만 개발해온 전문가들이었습니다.
하지만 사장님을 위한 투명하고 실용적인 CCTV는 없었죠.

그래서 우린 사장님만을 위한 CCTV 브랜드 ‘키퍼’를 만들었습니다.
키퍼는 단순한 CCTV를 넘어, 사장님의 시간과 일상을 지키는 파트너가 되고자 합니다.`}
      </Body>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ③ 마무리: 그리고 우리는 믿습니다                                      */
/* ------------------------------------------------------------------ */

export function BeliefSection() {
  return (
    <section className="w-full p-0 lg:py-[200px]">
      {/* ===== 배경 이미지(story_bottom) 위 마무리 메시지 / PC min-height 407px ===== */}
      <ImageBackdrop label="스토리 하단 배경 이미지 (story_bottom)" minHeightPc="lg:min-h-[407px]">
        <Title tone="white">그리고 우리는 믿습니다.</Title>
        <Body color="#FFFFFFE5">
          {`사장님이 더 잘 살아야, 우리가 존재할 이유가 생긴다고. 키퍼는 중간 마진 없는
투명한 가격, 불필요한 기능을 덜어낸 합리적인 서비스, 그리고 사장님의 삶을 이해하는
진심으로 만들어졌습니다.`}
        </Body>
      </ImageBackdrop>
    </section>
  );
}
