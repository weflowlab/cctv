"use client";

/**
 * 전국 서비스망 섹션 — "전국 서비스 구축 현황 / 통합 콜 센터 운영 {SITE.phone}"
 * - PC: 좌 지도 이미지 자리 / 우 지사 칩 + 주소 목록. 모바일: 세로 스택.
 * - 인터랙션: 지사 칩(탭) 클릭 → 해당 지사의 주소 목록으로 전환 (useState, 기본 본사).
 *   칩은 role="tab"/aria-selected, 목록은 role="tabpanel".
 * - 주소 출처: 기존 kkcctv 메인 "전국 서비스 구축 현황" (본사 주소는 SITE.address 사용).
 */
import { useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

type Branch = { id: string; name: string; addresses: string[] };

const BRANCHES: Branch[] = [
  { id: "hq", name: "본사", addresses: [SITE.address] },
  {
    id: "central",
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
    id: "gangwon",
    name: "강원지사",
    addresses: ["강원특별자치도 춘천시 백령로 190", "강원특별자치도 속초시 중앙로 56", "강원특별자치도 원주시 무실로 136"],
  },
  {
    id: "honam",
    name: "호남지사",
    addresses: [
      "광주광역시 북구 신임로32번길 35 모아 더 스카이",
      "전라남도 장흥군 장흥읍 동교2길 50",
      "전북특별자치도 전주시 덕진구 팔달로 341",
      "전라남도 광양시 구마1길 3-9",
    ],
  },
  {
    id: "gyeongbuk",
    name: "경북지사",
    addresses: ["경상북도 문경시 점촌로 20", "대구광역시 중구 동덕로 115 진석타워", "경상북도 울진군 울진읍 월변1길 9"],
  },
  {
    id: "gyeongnam",
    name: "경남지사",
    addresses: ["부산광역시 동래구 아시아드대로164번가길 18", "경상남도 고성군 고성읍 동외리 649-32", "경상남도 진주시 돗골로 149"],
  },
  {
    id: "jeju",
    name: "제주지사",
    addresses: ["제주특별자치도 제주시 아라이동 3008-1", "제주특별자치도 서귀포시 서문로 2-1"],
  },
];

export default function ServiceNetwork() {
  // 선택된 지사 id (기본: 본사)
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const active = BRANCHES.find((b) => b.id === activeId) ?? BRANCHES[0];

  return (
    // ===== 전국 서비스망: 흰 배경 =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <div className="mb-[40px] flex flex-col items-center gap-[12px] text-center lg:mb-[60px] lg:gap-[16px]">
          <h2 className="text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            전국 서비스 구축 현황
          </h2>
          <p className="text-[16px] font-medium text-[#666] lg:text-[22px]">
            통합 콜 센터 운영{" "}
            <a href={SITE.phoneHref} className="font-bold text-point-strong">
              {SITE.phone}
            </a>
          </p>
        </div>

        <Reveal threshold={0.1} className="flex w-full flex-col gap-[24px] lg:flex-row lg:gap-[48px]">
          {/* ===== 지도 이미지 자리 ===== */}
          <Placeholder
            label="전국 서비스망 지도 (원본 2024/04/바른CCTV-074-1-e1713334324437.png)"
            className="aspect-[4/5] w-full max-w-[420px] self-center rounded-[20px] lg:w-[460px] lg:max-w-none lg:shrink-0"
          />

          {/* ===== 지사 칩 + 주소 목록 ===== */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div role="tablist" aria-label="지사 선택" className="flex flex-wrap gap-[8px]">
              {BRANCHES.map((branch) => {
                const selected = branch.id === activeId;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    role="tab"
                    id={`branch-tab-${branch.id}`}
                    aria-selected={selected}
                    aria-controls="branch-panel"
                    onClick={() => setActiveId(branch.id)}
                    className={[
                      "h-[36px] cursor-pointer rounded-[100px] border px-[14px] text-[14px] font-medium tracking-[-0.2px] transition-colors duration-150 lg:h-[44px] lg:px-[20px] lg:text-[16px]",
                      selected
                        ? "border-brand bg-brand text-white"
                        : "border-[#e2e2e2] bg-white text-[#555] hover:border-brand hover:text-point-strong",
                    ].join(" ")}
                  >
                    {branch.name}
                  </button>
                );
              })}
            </div>

            {/* 선택된 지사의 주소 목록 (key 로 전환 시 페이드 인) */}
            <div
              key={active.id}
              id="branch-panel"
              role="tabpanel"
              aria-labelledby={`branch-tab-${active.id}`}
              className="fade-in mt-[20px] flex-1 rounded-[20px] bg-[#f9f9f9] p-[24px] lg:mt-[24px] lg:p-[36px]"
            >
              <h3 className="text-[18px] font-bold text-[#222] lg:text-[24px]">
                {active.name}
                <span className="ml-[8px] text-[14px] font-medium text-[#999] lg:text-[16px]">
                  {active.addresses.length}곳
                </span>
              </h3>
              <ul className="mt-[16px] flex flex-col gap-[10px] lg:mt-[20px] lg:gap-[14px]">
                {active.addresses.map((addr) => (
                  <li key={addr} className="flex items-start gap-[8px] text-[14px] leading-[22px] text-[#555] lg:text-[16px] lg:leading-[26px]">
                    <span className="mt-[8px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand lg:mt-[10px]" />
                    {addr}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
