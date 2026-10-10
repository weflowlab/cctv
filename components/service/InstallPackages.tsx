"use client";

/**
 * CCTV 설치 패키지·가격 카드 (클라이언트 컴포넌트)
 * - 원본은 [200만 실내 / 200만 실외 / 500만 실내 / 500만 실외] 4개 묶음 × 1~4대 카드(총 16장)를 세로로 나열.
 *   여기서는 keeper /plan 가격 카드 틀(회색 라운드 박스)에 토글 2개를 얹어 한 묶음씩 보여준다.
 * - 인터랙션
 *   ① 화소 토글 [200만 화소 | 500만 화소]
 *   ② 설치환경 토글 [실내용 (돔) | 실외용 (방수)]
 *   → 두 값 조합으로 INSTALL_PRICES 에서 1~4대 가격을 골라 카드 4장 렌더.
 *   토글이 바뀌면 카드 묶음을 key 로 다시 마운트해 0.5s fade-in.
 * - 각 카드의 [문의하기] → /contact
 * - 모바일: 카드 4장을 가로 슬라이드(MobileCarousel — 다음 카드 살짝 보임 + 위치 점) / PC: 4열
 * - 카드 아래 "풀세트 구성품": 설치 장소 토글에 따라 실내 9종 ↔ 실외 10종 (01 카메라 교체 + 실외는 10 방수 하이박스 추가).
 *   원본의 실내·실외 구성품 묶음 2개를 토글 하나로 합침.
 * - 가격 카드 박스 아래에 견적 계산기 유도 배너 (CalculatorBanner)
 */
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import MobileCarousel from "@/components/common/MobileCarousel";
import CalculatorBanner from "./CalculatorBanner";
import {
  CAMERA_NAME,
  FULLSET_CAMERA,
  FULLSET_COMMON,
  FULLSET_OUTDOOR_ONLY,
  INSTALL_PRICES,
  PACKAGE_COMMON_ITEMS,
  PACKAGE_IMAGES,
  PACKAGE_NOTES,
  PLACEMENT_OPTIONS,
  RESOLUTION_OPTIONS,
  formatWon,
  type Placement,
  type Resolution,
} from "./data";

/** 세그먼트 토글 (선택 = 흰 배경 + 진한 글자, keeper UsageGuide 탭 톤) */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex w-full rounded-[10px] bg-[#e5e9f1] p-[4px] lg:w-auto">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`h-[40px] flex-1 cursor-pointer whitespace-nowrap rounded-[8px] px-[12px] text-[14px] leading-[20px] tracking-[-0.28px] transition-all duration-150 lg:h-[48px] lg:flex-none lg:px-[24px] lg:text-[17px] ${
              selected ? "bg-white font-bold text-[#222] shadow-[0_2px_6px_rgba(0,0,0,0.08)]" : "font-medium text-[#888]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function InstallPackages() {
  const [resolution, setResolution] = useState<Resolution>("2MP");
  const [placement, setPlacement] = useState<Placement>("indoor");

  const prices = INSTALL_PRICES[resolution][placement];
  const resolutionLabel = resolution === "2MP" ? "200만 화소" : "500만 화소";
  const equipment = `1TB HDD/4CH DVR/${resolutionLabel} ${CAMERA_NAME[placement]}`;
  // 풀세트 구성품: 카메라(화소·설치 장소 반영) + 공통 8종 (+ 실외는 방수 하이박스)
  const fullset = [
    { name: `${resolutionLabel} ${FULLSET_CAMERA[placement].name}`, image: FULLSET_CAMERA[placement].image },
    ...FULLSET_COMMON,
    ...(placement === "outdoor" ? FULLSET_OUTDOOR_ONLY : []),
  ];

  return (
    <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
          설치 패키지 가격
        </h2>
        <p className="mt-[12px] text-center text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[16px] lg:text-[20px] lg:leading-[30px]">
          화소와 설치 장소를 선택해 보세요.
        </p>

        <div className="mt-[32px] rounded-[14px] bg-[#f6f7fa] px-[16px] pb-[28px] pt-[24px] lg:mt-[56px] lg:rounded-[20px] lg:px-[48px] lg:pb-[56px] lg:pt-[48px]">
          {/* ===== 토글: 화소 / 설치환경 — 조합에 따라 아래 카드 가격이 바뀜 ===== */}
          <div className="flex flex-col items-stretch gap-[8px] lg:flex-row lg:justify-center lg:gap-[16px]">
            <Segmented label="카메라 화소" options={RESOLUTION_OPTIONS} value={resolution} onChange={setResolution} />
            <Segmented label="설치 장소" options={PLACEMENT_OPTIONS} value={placement} onChange={setPlacement} />
          </div>

          {/* ===== 패키지 카드 4장: 1~4대 (토글 변경 시 key 재마운트 → fade-in, 슬라이드 위치도 처음으로) ===== */}
          <MobileCarousel
            key={`${resolution}-${placement}`}
            wrapperClassName="mt-[24px] opacity-0 [animation:fadeIn_0.5s_ease-in-out_forwards] lg:mt-[40px]"
            className="lg:grid lg:grid-cols-4 lg:gap-[16px]"
          >
            {prices.map((price, i) => (
              <li key={i} className="flex flex-col overflow-hidden rounded-[12px] bg-white max-lg:w-[85%]">
                {/* 패키지 구성 사진 (기존 사이트 제품 사진) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#eee] bg-[#efefef]">
                  <Image
                    src={PACKAGE_IMAGES[placement][i]}
                    alt={`CCTV ${i + 1}대 패키지 구성 — 녹화기·하드디스크·카메라 ${i + 1}대`}
                    fill
                    sizes="(min-width: 1024px) 250px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-[20px] pb-[20px] pt-[18px]">
                  <h3 className="text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-[#222] lg:text-[20px] lg:leading-[28px]">
                    CCTV <span className="text-point-strong">{i + 1}대</span> 패키지
                  </h3>
                  <ul className="mt-[10px] flex-1 space-y-[4px] text-[13px] leading-[20px] tracking-[-0.26px] text-[#666] lg:text-[14px]">
                    {[equipment, ...PACKAGE_COMMON_ITEMS].map((item) => (
                      <li key={item} className="flex gap-[6px]">
                        <span aria-hidden className="text-[#bbb]">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-[16px] text-right text-[24px] font-bold leading-[34px] tracking-[-0.48px] text-[#222] lg:text-[26px]">
                    {formatWon(price)}
                    <span className="ml-[2px] text-[16px] font-medium text-[#666]">원</span>
                  </p>
                  <Link
                    href="/contact"
                    className="mt-[12px] flex h-[44px] items-center justify-center rounded-[8px] bg-brand-light text-[15px] font-bold tracking-[-0.3px] text-point-strong transition-colors hover:bg-brand hover:text-white"
                  >
                    문의하기
                  </Link>
                </div>
              </li>
            ))}
          </MobileCarousel>

          {/* ===== 풀세트 구성품: 실내 9종 / 실외 10종 (설치 장소 토글 연동) ===== */}
          {/* id="fullset": 홈 "풀세트 구성품" 카드에서 바로 이동하는 앵커 (고정 헤더에 가리지 않게 scroll-margin) */}
          <div
            id="fullset"
            className="mt-[28px] scroll-mt-[140px] border-t border-[#e5e9f1] pt-[24px] lg:mt-[40px] lg:scroll-mt-[160px] lg:pt-[36px]"
          >
            <h3 className="text-[16px] font-bold leading-[24px] tracking-[-0.32px] text-[#222] lg:text-[20px] lg:leading-[30px]">
              패키지 풀세트 구성품{" "}
              <span className="text-point-strong">{fullset.length}종</span>
            </h3>
            <ul className="mt-[12px] grid grid-cols-3 gap-[8px] lg:mt-[16px] lg:grid-cols-5 lg:gap-[12px]">
              {fullset.map((item, i) => (
                <li key={item.name} className="overflow-hidden rounded-[12px] bg-white">
                  {/* 구성품 사진 (기존 사이트 제품 사진에서 번호·이름 띠를 잘라낸 것) */}
                  <div className="relative aspect-square w-full overflow-hidden border-b border-[#eee] bg-[#efefef]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 200px, 33vw"
                      className="object-contain p-[8px] lg:p-[12px]"
                    />
                  </div>
                  <p className="flex gap-[4px] px-[8px] py-[8px] text-[12px] font-medium leading-[17px] tracking-[-0.24px] text-[#222] lg:gap-[6px] lg:px-[12px] lg:py-[12px] lg:text-[14px] lg:leading-[20px]">
                    <span className="font-bold text-point-strong">{String(i + 1).padStart(2, "0")}</span>
                    {item.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== 안내 문구 (원본 * 주석 2줄) ===== */}
          <ul className="mt-[20px] space-y-[4px] text-[12px] leading-[18px] tracking-[-0.24px] text-[#888] max-lg:whitespace-pre-line lg:mt-[28px] lg:text-[14px] lg:leading-[22px]">
            {PACKAGE_NOTES.map((n) => (
              <li key={n}>* {n}</li>
            ))}
          </ul>
        </div>

        {/* ===== 견적 계산기 유도 배너 → /calculator ===== */}
        <CalculatorBanner className="mt-[24px] lg:mt-[40px]" />
      </div>
    </section>
  );
}
