/**
 * /business 본문 섹션 모음 (서버 컴포넌트 — 애니메이션은 Reveal / CSS 로만 처리)
 * - BenefitSection   : 프랜차이즈 특별 혜택(3가지 혜택 박스 + 혜택 이미지 3장 + 이메일 문의 배너)
 * - ReasonSection    : "Keeper 를 택한 이유" + 고객사 로고 2줄 무한 흐름(marquee)
 * - CustomerCaseSection : 고객 사례 카드 3개 + "고객사례 더보기"
 */
import type { ReactNode } from "react";
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import styles from "./business.module.css";

/** PC 에선 공백, 모바일에선 줄바꿈 (원본 spaceOrBreak) */
function SpaceOrBreak() {
  return (
    <>
      <span className="hidden lg:inline"> </span>
      <br className="lg:hidden" />
    </>
  );
}

/** 오른쪽 화살표 아이콘 (원본 공용 아이콘 6451) */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 16" fill="none" className={className} aria-hidden="true">
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M18 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1" />
        <path d="M9.293.293a1 1 0 0 0 0 1.414L15.586 8l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0" />
      </g>
    </svg>
  );
}

/* ================================================================== */
/* 프랜차이즈 특별 혜택                                                 */
/* ================================================================== */

/** 혜택 박스 사이 "+" 원형 아이콘 */
function PlusIcon() {
  return (
    <svg viewBox="0 0 22 23" fill="none" className="h-[18px] w-[18px] lg:h-[24px] lg:w-[24px]" aria-hidden="true">
      <path fill="#fff" d="M8.823 22.14v-8.52H.743V9.46h8.08V.94h4.36v8.52h8.08v4.16h-8.08v8.52z" />
    </svg>
  );
}

export function BenefitSection() {
  const plusBase =
    "absolute flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-white bg-[#ff5c00] lg:h-[48px] lg:w-[48px]";

  return (
    <section className="flex justify-center bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <div className="w-full lg:w-[1080px]">
        {/* ===== 타이틀: (5개매장 이상) / 프랜차이즈 직영점·가맹점 특별 혜택 / 설명 ===== */}
        <p className="text-center text-[15px] font-medium leading-[24px] tracking-[-0.15px] text-[rgba(0,0,0,0.5)] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.6px]">
          (5개매장 이상, 일시불 구매 기준)
        </p>
        <h2 className="mt-0 text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-black lg:mt-[4px] lg:text-[44px] lg:leading-[78px] lg:tracking-[-0.44px]">
          프랜차이즈 직영점/가맹점
          <SpaceOrBreak />
          특별 혜택
        </h2>
        <h2 className="mt-[16px] text-center text-[15px] font-normal leading-[24px] tracking-[-0.15px] text-[#4e4e4e] lg:mt-[32px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.2px]">
          <strong className="font-bold">브랜드 매장 CCTV 교체 및 여러 매장 동시 설치 시,</strong>
          <br />
          전문적인 상담을 통한 전담 매니저 배정과 함께 합리적인 견적으로 최대 할인을 제공합니다.
        </h2>

        {/* ===== 혜택 3종 박스: 주황 테두리 박스 + 사이사이 + 아이콘, 아래로 그라데이션 연결선 / 진입 시 왼쪽에서 슬라이드인(0.5s 지연) ===== */}
        <Reveal
          animation="slide-in-left"
          delay={500}
          threshold={0.1}
          className="relative mt-[40px] flex h-[304px] w-full flex-col gap-[26px] rounded-[8px] border-2 border-[#ff5c00] bg-[#ffdcc7] p-[24px] before:absolute before:bottom-[-7px] before:left-1/2 before:h-[14px] before:w-[14px] before:-translate-x-1/2 before:rounded-full before:bg-[#ff5c00] before:content-[''] after:absolute after:bottom-[-38px] after:left-1/2 after:h-[38px] after:w-[2px] after:-translate-x-1/2 after:bg-[linear-gradient(to_bottom,#ff5c00,#fafafa)] after:content-[''] lg:mt-[70px] lg:h-[124px] lg:flex-row lg:gap-[20px] lg:rounded-[12px] lg:px-[19px] lg:py-[17px] lg:after:bottom-[-93px] lg:after:h-[93px]"
        >
          {["설치비 무료는 기본", "수량 별 단가 할인 우대", "전담 매니저 배정"].map((text) => (
            <div
              key={text}
              className="flex grow basis-0 items-center justify-center rounded-[8px] border border-[#ffb68a] bg-white text-[18px] font-bold leading-[26px] tracking-[-0.54px] text-[#202020] lg:h-full lg:rounded-[12px] lg:text-[26px] lg:leading-[37px] lg:tracking-[-0.78px]"
            >
              {text}
            </div>
          ))}
          {/* 첫 번째 + : PC 33% 지점 / 모바일 세로 33% 지점 */}
          <div
            className={`${plusBase} left-1/2 top-[33%] -translate-x-1/2 -translate-y-[33%] lg:left-[33%] lg:top-1/2 lg:-translate-y-1/2`}
          >
            <PlusIcon />
          </div>
          {/* 두 번째 + : PC 67% 지점 / 모바일 세로 67% 지점 */}
          <div
            className={`${plusBase} left-1/2 top-[67%] -translate-x-1/2 -translate-y-[67%] lg:left-[67%] lg:top-1/2 lg:-translate-x-[67%] lg:-translate-y-1/2`}
          >
            <PlusIcon />
          </div>
        </Reveal>

        {/* ===== 혜택 이미지 3장: PC 가로 3열 / 모바일 세로 / 진입 시 슬라이드인 ===== */}
        <Reveal
          animation="slide-in-left"
          delay={500}
          threshold={0.1}
          className="mt-[43px] flex w-full flex-col gap-0 lg:mt-[100px] lg:flex-row lg:gap-[24px]"
        >
          {[1, 2, 3].map((n) => (
            <div key={n} className="grow basis-0">
              <div className="lg:hidden">
                <Placeholder label={`benefit${n} (모바일)`} className="aspect-[726/508] w-full" />
              </div>
              <div className="hidden lg:block">
                <Placeholder label={`benefit${n}`} className="aspect-[689/660] w-full" />
              </div>
            </div>
          ))}
        </Reveal>

        {/* ===== 이메일 문의 배너: PC 배경 이미지 / 모바일 #333 박스 ===== */}
        <div className="relative mt-[60px] flex h-auto w-full flex-col items-center justify-start gap-[10px] rounded-[8px] bg-[#333] px-[24px] py-[20px] lg:mt-[92px] lg:h-[120px] lg:w-[1080px] lg:flex-row lg:justify-between lg:gap-0 lg:rounded-[16px] lg:px-[48px] lg:py-0">
          <div className="absolute inset-0 hidden overflow-hidden rounded-[16px] lg:block">
            <Placeholder label="지금 바로 문의주세요." dark className="h-full w-full" />
          </div>
          <p className="z-10 text-[18px] font-medium leading-[22px] tracking-[-0.36px] text-white lg:text-[24px] lg:font-bold lg:leading-[39px] lg:tracking-[-0.24px]">
            지금 바로 문의주세요.
          </p>
          <div className="z-10 flex items-center gap-[8px] lg:gap-[12px]">
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white lg:h-[32px] lg:w-[32px]">
              {/* 메일 아이콘 (원본 인라인 SVG) */}
              <svg viewBox="0 0 32 32" fill="none" className="h-full w-full" aria-hidden="true">
                <circle cx="16" cy="16" r="16" fill="white" />
                <path d="M25.9983 21.3608V11.7551L18.6807 16.5917L25.9983 21.3608Z" fill="#FF7E36" />
                <path d="M6 21.3571L13.3177 16.5206L6 11.752V21.3571Z" fill="#FF7E36" />
                <path
                  d="M16.0737 18.3155L15.6239 18.0222L13.8932 16.8943L6 22.1115H26L18.1106 16.9699L16.5217 18.0196L16.0737 18.3155Z"
                  fill="#FF7E36"
                />
                <path d="M16.0706 17.5626L26 10.9998H6L16.0706 17.5626Z" fill="#FF7E36" />
              </svg>
            </div>
            {/* 원본 href 는 "hj.gwak@hanwha.com"(상대경로)이지만 동작하도록 mailto: 로 연결 */}
            <a
              href="mailto:hj.gwak@hanwha.com"
              className="text-[16px] font-medium leading-[140%] tracking-[-0.32px] text-white no-underline lg:text-[24px] lg:tracking-[-0.24px]"
            >
              hj.gwak@hanwha.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Keeper 를 택한 이유 + 고객사 로고 marquee                             */
/* ================================================================== */

const LOGO_ROWS = [
  ["bas_burger", "the_taco_booth", "play_junior", "tteok_chelin", "vog_hair"],
  ["whosfan_cafe", "seoul_hotteok", "newfit_fitness", "etinna", "oneroof_lab", "daya"],
];

export function ReasonSection() {
  return (
    <section className="bg-white px-[16px] pb-[15px] lg:p-0">
      {/* ===== 타이틀: [Keeper 로고] 를 택한 이유 + 설명 ===== */}
      <h2 className="flex items-center justify-center text-[26px] font-bold leading-[46px] tracking-[-0.26px] text-black lg:text-[44px] lg:leading-[78px] lg:tracking-[-0.44px]">
        <span className="blind">keeper</span>
        <Placeholder label="Keeper" kind="icon" className="h-[34px] w-[121px] lg:h-[64px] lg:w-[228px]" />
        &nbsp;를 택한 이유
      </h2>
      <p className="mt-[8px] text-center text-[15px] font-normal leading-[24px] tracking-[-0.15px] text-[#4e4e4e] lg:mt-[28px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.2px]">
        사장님들이 키퍼를 선택한 이유,
        <SpaceOrBreak />
        보안부터 직원관리까지 한 번에 끝나니까.
        <br />
        <strong className="font-semibold">이제 매장 운영, 키퍼 하나면 충분해요.</strong>
      </p>

      {/* ===== 고객사 로고 2줄: 1줄은 왼쪽, 2줄은 오른쪽으로 끝없이 흐름 (같은 트랙 2개를 이어 붙여 루프) ===== */}
      <div className="-ml-[16px] mt-[32px] w-[calc(100%+32px)] bg-[#f5f5f5] py-[41px] lg:ml-0 lg:mt-[70px] lg:w-full lg:py-[106px]">
        {LOGO_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex w-full max-w-full overflow-hidden ${rowIdx > 0 ? "mt-[16px] lg:mt-[46px]" : ""}`}
          >
            {/* 원본 트랙 + 복제 트랙(aria-hidden) */}
            {[false, true].map((isClone) => (
              <div
                key={String(isClone)}
                className={`flex gap-[16px] pr-[16px] lg:gap-[46px] lg:pr-[46px] ${
                  rowIdx === 0 ? styles.trackLeft : styles.trackRight
                }`}
              >
                {row.map((name) => (
                  <div
                    key={name}
                    aria-hidden={isClone || undefined}
                    className="flex h-[54px] w-[144px] shrink-0 items-center justify-center rounded-[5px] bg-white shadow-[0_1.429px_5px_0.714px_rgba(90,90,90,0.03)] lg:h-[152px] lg:w-[402px] lg:rounded-[14px] lg:shadow-[0_4px_14px_2px_rgba(90,90,90,0.03)]"
                  >
                    <Placeholder label={name} className="h-[40px] w-[116px] lg:h-[102px] lg:w-[323px]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 고객 사례                                                            */
/* ================================================================== */

type CaseItem = {
  iconName: string;
  logoSize: string; // 원본 로고 width×height (PC)
  title: string;
  content?: ReactNode;
  blogSlug: string;
  customerName: string;
};

const CASES: CaseItem[] = [
  {
    iconName: "flink",
    logoSize: "w-[80px] h-[30px]",
    title: "매장 관리 시간과 노력을 아껴주는 든든한 지원군이에요",
    content: (
      <p>
        예전에는 분실물이나 민원 대응을 위해 보안 업체를 거쳐 영상 확인을 요청해야 해서 시간이 오래
        걸렸습니다.
        <br />
        이제는 키퍼의 고화질 CCTV와 앱 덕분에, 작은 소지품까지 선명하게 확인할 수 있어 원하는 시간대
        영상을 바로 찾아 고객 응대나 증거 확보도 훨씬 빠르고 정확하게 해결하고 있습니다.
      </p>
    ),
    blogSlug: "customer-case-bakery-cafe-flink",
    customerName: "플링크",
  },
  {
    iconName: "oneroof_lab",
    logoSize: "w-[148px] h-[16px]",
    title: "관리자가 없어도 비대면으로 효율적인 공간 운영이 가능해요",
    blogSlug: "co-working-space-onerooflab",
    customerName: "원루프랩",
  },
  {
    iconName: "newfit",
    logoSize: "w-[101px] h-[36px]",
    title: "100평 넘는 헬스장도 사각지대 없이 회원 안전을 지킬 수 있어 든든합니다.",
    blogSlug: "customer-case-newfit-fitness",
    customerName: "뉴핏",
  },
];

/** 고객 사례 카드 — 호버 시 그림자 강조(PC), 화살표 버튼 → 해당 블로그 글 */
function CaseCard({ item }: { item: CaseItem }) {
  return (
    <div className="box-border flex-1 rounded-[24px] bg-white shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out lg:hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1),0px_0px_2px_0px_rgba(0,0,0,0.12)]">
      <div className="flex h-full w-full flex-col justify-between px-[32px] pb-[28px] pt-[32px] lg:p-[40px]">
        <div>
          <div>
            <Placeholder label={item.customerName} kind="icon" className={item.logoSize} />
          </div>
          <h3 className="mt-[16px] text-[20px] font-bold leading-[28px] tracking-[-1px] text-[#333] lg:mt-[24px] lg:text-[24px] lg:leading-[36px]">
            {item.title}
          </h3>
          {item.content && (
            <div className="mt-[6px] break-all text-[14px] font-normal leading-[20px] tracking-[-1px] text-[#666] lg:mt-[12px] lg:text-[18px] lg:leading-[28px]">
              {item.content}
            </div>
          )}
        </div>
        <div className="mt-[20px] flex items-center justify-between lg:mt-0">
          <strong className="text-[14px] font-medium leading-[28px] tracking-[-1px] text-[#333] lg:text-[16px]">
            {item.customerName}
          </strong>
          <Link
            href={`/blog/${item.blogSlug}`}
            aria-label="상세보기"
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#dedede] bg-white text-[#333] lg:h-[48px] lg:w-[48px]"
          >
            <ArrowRight className="h-[13px] w-[15px] lg:h-[16px] lg:w-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CustomerCaseSection() {
  return (
    <section className="flex justify-center bg-[#fafafa] px-[16px] pb-[80px] pt-[60px] lg:px-0 lg:py-[80px]">
      <div className="w-full lg:w-[1082px]">
        {/* ===== 타이틀 ===== */}
        <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.26px] text-black lg:text-[44px] lg:leading-[66px] lg:tracking-[-0.44px]">
          키퍼를 선택한 사장님들은
          <br />
          더 편리한 매장관리를
          <SpaceOrBreak />
          경험하고 있습니다.
        </h2>

        {/* ===== 사례 카드: PC 좌 1개(큰 카드) + 우 2개 / 모바일 세로 나열 ===== */}
        <div className="mt-[32px] flex h-auto w-full flex-col gap-[24px] px-[16px] lg:mt-[70px] lg:h-[616px] lg:flex-row lg:px-0">
          <div className="flex flex-1 flex-col gap-[24px]">
            <CaseCard item={CASES[0]} />
          </div>
          <div className="flex flex-1 flex-col gap-[24px]">
            <CaseCard item={CASES[1]} />
            <CaseCard item={CASES[2]} />
          </div>
        </div>

        {/* ===== 고객사례 더보기 → /blog?category=5 ===== */}
        <footer className="mt-[40px] flex justify-center">
          <Link
            href="/blog?category=5"
            aria-label="고객사례 더보기"
            className="flex h-[42px] w-[168px] cursor-pointer items-center justify-center rounded-[30px] border-0 bg-white text-[14px] font-bold leading-[20px] tracking-[-0.2px] text-[rgba(32,32,32,0.9)] shadow-[0_4px_25px_0_rgba(0,0,0,0.04)] lg:h-[64px] lg:w-[204px] lg:rounded-[62px] lg:text-[20px] lg:leading-[40px]"
          >
            고객사례 더보기
          </Link>
        </footer>
      </div>
    </section>
  );
}
