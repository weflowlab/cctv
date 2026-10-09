/**
 * /service/as — AS 수리 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 "AS 수리" 페이지
 * - 흐름: 문제제기 → 해결 → (하단 ConsultCta 는 layout 에서 렌더)
 *   히어로(타사 제품도 수리) → 고객 고민 4가지 카드 → 수리 전문케어 서비스 5종 → AS 핵심 강점 4가지
 *   (원본 강점 9가지 전체는 회사소개로 이동 — 여기서는 AS 관련만)
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import { AS_SERVICES, AS_STRENGTHS, AS_WORRIES } from "./data";
import { SectionHeading, SpaceOrBreak } from "./ui";

type WorryIcon = (typeof AS_WORRIES)[number]["icon"];

/** 고민 카드용 단순 라인 아이콘 (stroke=currentColor) — 홈 문제 제기 섹션(components/main/ProblemSection)에서도 사용 */
export function WorryIconSvg({ name }: { name: WorryIcon }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-[26px] w-[26px] lg:h-[32px] lg:w-[32px]",
  };
  switch (name) {
    case "shield": // 책임회피 — 금 간 방패
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
          <path d="m12 8-1.5 3.5L13 13l-1 3" />
        </svg>
      );
    case "tool": // 조작미숙 — 렌치 + 물음표
      return (
        <svg {...common}>
          <path d="M14.5 6.5a4 4 0 0 1-5.3 5.3L4 17a1.4 1.4 0 0 0 2 2l5.2-5.2a4 4 0 0 0 5.3-5.3l-2.3 2.3-2-2 2.3-2.3Z" />
          <path d="M18 14.5a1.8 1.8 0 1 1 2.2 1.8c-.4.1-.7.4-.7.8v.4" />
          <path d="M19.5 20h.01" />
        </svg>
      );
    case "phone": // 연락두절 — 수화기 + 사선
      return (
        <svg {...common}>
          <path d="M5 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3L14 12.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2Z" />
          <path d="m15 4 5 5M20 4l-5 5" />
        </svg>
      );
    case "chat": // 불친절 — 말풍선 + 찌푸린 표정
      return (
        <svg {...common}>
          <path d="M4 5h16v11H9l-5 4V5Z" />
          <path d="M9 9.5h.01M15 9.5h.01" />
          <path d="M9.5 13.5a3.5 3.5 0 0 1 5 0" />
        </svg>
      );
  }
}

export default function AsTab() {
  return (
    <>
      {/* ===== 히어로: AS 수리 전문 출장 서비스 + 타사 제품 수리 안내 ===== */}
      <section className="bg-point-light px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="text-center lg:text-left">
            <p className="text-[14px] font-bold tracking-[-0.28px] text-point-strong lg:text-[18px]">AS 수리</p>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[46px] lg:tracking-[-2px] [&>strong]:text-point-strong">
              AS 수리 전문
              <br />
              <strong>출장 서비스</strong>
            </h2>
            <p className="mt-[12px] text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] lg:mt-[16px] lg:text-[19px] lg:tracking-[-0.44px]">
              설치업체의 연락 두절, 불친절, 책임회피로
              <SpaceOrBreak />
              AS를 제대로 받지 못하는 고객님들을 위해
              <br />
              <strong className="font-bold">타사 제품이라도 {SITE.name}가</strong>
              <SpaceOrBreak />
              <strong className="font-bold">직접 방문하여 수리해 드립니다.</strong>
            </p>
          </div>
          <Placeholder
            label="AS 수리 히어로 이미지 (원본 2024/03/CK_td01130002085_l.jpg)"
            className="aspect-[4/3] w-full max-w-[480px] rounded-[20px] lg:w-[480px]"
          />
        </div>
      </section>

      {/* ===== 문제제기: 고객 고민 4가지 카드 (PC 4열 / 모바일 2열), 순차 slide-up + 해결 연결 문구 =====
          원본 이미지(2024/03/CK_td01130002085_l.jpg)는 히어로 Placeholder 에 이미 배치되어 여기서는 생략 */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading
            eyebrow="CHECK"
            title={
              <>
                CCTV AS, 이런 문제로
                <SpaceOrBreak />
                <strong>고민해 보신 적</strong> 있으신가요?
              </>
            }
          />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-4 lg:gap-[16px]">
            {AS_WORRIES.map((w, i) => (
              <Reveal
                as="li"
                key={w.title}
                delay={i * 120}
                className="flex flex-col items-center gap-[12px] rounded-[14px] bg-[#f6f7fa] px-[14px] py-[24px] text-center lg:gap-[16px] lg:px-[20px] lg:py-[36px]"
              >
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-light text-brand lg:h-[68px] lg:w-[68px]">
                  <WorryIconSvg name={w.icon} />
                </div>
                <h3 className="text-[16px] font-bold tracking-[-0.32px] text-[#222] lg:text-[19px]">{w.title}</h3>
                <p className="text-[13px] leading-[20px] tracking-[-0.26px] text-[#666] break-keep lg:text-[15px] lg:leading-[23px]">
                  &ldquo;{w.desc}&rdquo;
                </p>
              </Reveal>
            ))}
          </ul>
          {/* 해결 연결 문구 (원본 "기존 설치했던 업체의 불친절함, 책임회피 등의 문제로…" 다듬음) */}
          <Reveal delay={AS_WORRIES.length * 120}>
            <p className="mt-[28px] rounded-[14px] bg-point-light px-[20px] py-[20px] text-center text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] break-keep lg:mt-[40px] lg:py-[28px] lg:text-[19px] lg:tracking-[-0.4px]">
              기존 업체의 책임회피·불친절로 해결되지 않은 장애,
              <SpaceOrBreak />
              <strong className="font-bold text-point-strong">
                {SITE.name}는 타사 제품이라도 직접 방문해 합리적인 가격으로 해결해 드립니다.
              </strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 해결: 수리 전문케어 서비스 5종 — 이미지 + 이름 카드 (PC 5열 / 모바일 2열), 순차 slide-up ===== */}
      <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading
            eyebrow="SOLUTION"
            title={<>{SITE.name} <strong>수리 전문케어 서비스</strong></>}
            desc="고장 진단부터 수리·교체·유지보수까지, 문제를 끝까지 해결해 드립니다."
          />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-5 lg:gap-[16px]">
            {AS_SERVICES.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 120}
                className={`overflow-hidden rounded-[14px] bg-white ${i === AS_SERVICES.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <Placeholder label={`${s.title} (원본 ${s.img})`} className="aspect-[4/3] w-full border-0" />
                <h3 className="px-[14px] py-[14px] text-center text-[16px] font-bold tracking-[-0.32px] text-[#222] lg:py-[18px] lg:text-[19px]">
                  {s.title}
                </h3>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== AS 핵심 강점 4가지: 아이콘 + 2줄 문구 (원본 강점 9가지 중 발췌) ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          {/* TODO: 문구 확정 (원본에 이 섹션 제목 없음) */}
          <SectionHeading eyebrow="WHY US" title="믿고 맡기는 AS" />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-4 lg:gap-[16px]">
            {AS_STRENGTHS.map((s) => (
              <li
                key={s.img}
                className="flex flex-col items-center gap-[12px] rounded-[14px] bg-[#f6f7fa] px-[12px] py-[24px] text-center lg:gap-[20px] lg:py-[40px]"
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-brand-light lg:h-[88px] lg:w-[88px]">
                  <Placeholder label={`강점 아이콘 (원본 ${s.img})`} kind="icon" className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px]" />
                </div>
                <p className="text-[14px] font-medium leading-[21px] tracking-[-0.28px] text-[#666] lg:text-[17px] lg:leading-[26px]">
                  {s.title[0]}
                  <br />
                  <strong className="font-bold text-[#222]">{s.title[1]}</strong>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
