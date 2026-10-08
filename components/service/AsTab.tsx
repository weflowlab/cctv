/**
 * /service/as — AS 수리 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 "AS 수리" 페이지
 * - 구성: 히어로(타사 제품도 수리 + 고객 고민 4가지 칩) → 수리 전문케어 서비스 5종 → AS 핵심 강점 4가지
 *   (원본 강점 9가지 전체는 회사소개로 이동 — 여기서는 AS 관련만)
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import { AS_SERVICES, AS_STRENGTHS, AS_WORRIES } from "./data";
import { SectionHeading, SpaceOrBreak } from "./ui";

export default function AsTab() {
  return (
    <>
      {/* ===== 히어로: AS 수리 전문 출장 서비스 + 타사 제품 수리 안내 + 고민 칩 ===== */}
      <section className="bg-[#fff9f0] px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="text-center lg:text-left">
            <p className="text-[14px] font-bold tracking-[-0.28px] text-[#ff5c00] lg:text-[18px]">AS 수리</p>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[46px] lg:tracking-[-2px] [&>strong]:text-[#ff5c00]">
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
              <strong className="font-bold">어디든 방문하여 수리를 해드립니다.</strong>
            </p>
            {/* 원본 "CCTV AS 이런 문제로 고민해보신 적 있으신가요?" 4가지 → 칩으로 압축 */}
            <ul className="mt-[20px] flex flex-wrap justify-center gap-[6px] lg:justify-start lg:gap-[8px]">
              {AS_WORRIES.map((w) => (
                <li
                  key={w}
                  className="rounded-[100px] border border-[#ffd6bf] bg-white px-[12px] py-[6px] text-[13px] font-medium tracking-[-0.26px] text-[#ff5c00] lg:px-[16px] lg:text-[15px]"
                >
                  # {w}
                </li>
              ))}
            </ul>
          </div>
          <Placeholder
            label="AS 수리 히어로 이미지 (원본 2024/03/CK_td01130002085_l.jpg)"
            className="aspect-[4/3] w-full max-w-[480px] rounded-[20px] lg:w-[480px]"
          />
        </div>
      </section>

      {/* ===== 수리 전문케어 서비스 5종: 이미지 + 이름 카드 (PC 5열 / 모바일 2열), 순차 slide-up ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="SERVICE" title={<>{SITE.name} <strong>수리 전문케어 서비스</strong></>} />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-5 lg:gap-[16px]">
            {AS_SERVICES.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 120}
                className={`overflow-hidden rounded-[14px] bg-[#f6f7fa] ${i === AS_SERVICES.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
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
      <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          {/* TODO: 문구 확정 (원본에 이 섹션 제목 없음) */}
          <SectionHeading eyebrow="WHY US" title="믿고 맡기는 AS" />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-4 lg:gap-[16px]">
            {AS_STRENGTHS.map((s) => (
              <li
                key={s.img}
                className="flex flex-col items-center gap-[12px] rounded-[14px] bg-white px-[12px] py-[24px] text-center lg:gap-[20px] lg:py-[40px]"
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#fff6f1] lg:h-[88px] lg:w-[88px]">
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
