/**
 * 신뢰 섹션 — 수상 내역 + 고객사 로고 그리드
 * - 상단: 한국브랜드 선호도 3년 연속 1위 수상 (메달 이미지 자리 + 원본 문구). PC 좌 메달 / 우 문구, 모바일 세로.
 * - 하단: "많은 기업이 {SITE.name}를 선택해 주셨습니다." + 고객사 로고 29개 그리드 (PC 5열 / 모바일 3열).
 * - 기존 회사(대한민국CCTV) 자료 → 홈에서 LEGACY.award / LEGACY.clients 스위치로 각각 켜고 끔 (props showAward / showClients).
 * - 고객사 로고 이미지: public/images/clients/*.webp (기존 사이트 kkcctv.co.kr 홈에서 가져옴, 흰 배경 PNG 로 변환).
 */
import Image from "next/image";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

/** 고객사 로고 (기존 사이트 화면 순서) — file: public/images/clients/<file>.webp */
const CLIENTS = [
  { name: "서울대학교", file: "snu" },
  { name: "한국도로공사", file: "ex" },
  { name: "POSTECH", file: "postech" },
  { name: "서울특별시", file: "seoul" },
  { name: "삼성화재", file: "samsung-fire" },
  { name: "LX", file: "lx" },
  { name: "강화군", file: "ganghwa" },
  { name: "인천광역시", file: "incheon" },
  { name: "SK D&D", file: "sk-dnd" },
  { name: "서울교통공사", file: "seoul-metro" },
  { name: "아워홈", file: "ourhome" },
  { name: "부영그룹", file: "booyoung" },
  { name: "대우조선해양건설", file: "dsc" },
  { name: "경정·경륜", file: "kboat-kcycle" },
  { name: "아주네트웍스", file: "aju-networks" },
  { name: "로젠택배", file: "logen" },
  { name: "김포경찰서", file: "gimpo-police" },
  { name: "투썸플레이스", file: "twosome" },
  { name: "심원", file: "simwon" },
  { name: "F&F", file: "fnf" },
  { name: "HL", file: "hl" },
  { name: "디에스종합건설", file: "ds-construction" },
  { name: "골프존파크", file: "golfzon-park" },
  { name: "세림건설", file: "serim" },
  { name: "LS전선", file: "ls-cable" },
  { name: "IBK기업은행", file: "ibk" },
  { name: "빽다방", file: "paiks-coffee" },
  { name: "한성기업", file: "hansung" },
  { name: "인천항시설관리센터", file: "ipfc" },
];

export default function TrustSection({
  showAward = true,
  showClients = true,
}: {
  /** 수상 블록 표시 (LEGACY.award) */
  showAward?: boolean;
  /** 고객사 로고 블록 표시 (LEGACY.clients) */
  showClients?: boolean;
}) {
  if (!showAward && !showClients) return null;
  return (
    // ===== 신뢰 섹션: 흰 배경 =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 수상: 메달 이미지 + 문구 (LEGACY.award) ===== */}
        {showAward && (
          <Reveal
            threshold={0.1}
            className="flex w-full flex-col items-center gap-[24px] rounded-[20px] bg-brand-light px-[24px] py-[40px] lg:flex-row lg:justify-center lg:gap-[64px] lg:py-[56px]"
          >
            <Placeholder
              label="한국브랜드 선호도 3년 연속 1위 수상 메달 (원본 2025/07/스크린샷_2025-07-21_165045-removebg-preview.png)"
              className="aspect-square w-[160px] shrink-0 rounded-full lg:w-[200px]"
            />
            <div className="text-center lg:text-left">
              <h2 className="text-[24px] font-bold leading-[34px] tracking-[-0.5px] text-[#222] lg:text-[36px] lg:leading-[50px] lg:tracking-[-1px]">
                {SITE.name}는
                <br />
                한국브랜드 선호도
                <br />
                <strong className="text-point-strong">
                  3년 연속 1위 수상
                </strong>{" "}
                기업입니다.
              </h2>
              <p className="mt-[12px] text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[16px] lg:text-[18px] lg:leading-[28px]">
                3년 연속 한국브랜드 선호도 1위로 선정되었습니다.
                <br />
                {SITE.name}의 검증된 제품과 서비스를 확인해보세요.
              </p>
            </div>
          </Reveal>
        )}

        {/* ===== 고객사: 헤드라인 + 로고 그리드 (LEGACY.clients) ===== */}
        {showClients && (
          <>
            <h2
              className={`${showAward ? "mt-[80px] lg:mt-[120px]" : ""} text-center text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]`}
            >
              많은 기업이
              <br />
              <strong className="text-point-strong">{SITE.name}</strong>를
              선택해 주셨습니다.
            </h2>
            <Reveal
              threshold={0.05}
              className="mt-[32px] grid w-full grid-cols-3 gap-[8px] lg:mt-[56px] lg:grid-cols-5 lg:gap-[16px]"
            >
              {CLIENTS.map(({ name, file }) => (
                <div
                  key={file}
                  className="flex h-[56px] items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white p-[6px] lg:h-[88px] lg:rounded-[12px] lg:p-[12px]"
                >
                  {/* 로고: 박스 안에 비율 유지(contain) */}
                  <div className="relative h-full w-full">
                    <Image
                      src={`/images/clients/${file}.webp`}
                      alt={`${name} 로고`}
                      fill
                      sizes="(min-width: 1024px) 200px, 30vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
