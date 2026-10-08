"use client";

/**
 * 견적계산기 결과 화면 (/calculator/result?cctvs=1,1,2,0)
 * - 원본 page 청크(app/calculator/result/page-*.js) 로직 재현
 *   · cctvs = [출입구, 계산대, 홀, 주방(추가공간)] 위치별 대수 → 합계가 권장 대수
 *   · 쿼리가 없거나, 4개가 아니거나, 음수가 있거나, 합계가 2~16 밖이면 /calculator 로 되돌림
 *   · 권장 대수(origin)는 고정, 사용자가 range 슬라이더로 2~16대 조정(cctvCount) → 모든 금액/차트 즉시 재계산
 *   · 헤더: 스크롤 100px 미만 "투명-검정", 이후 흰색
 * - 섹션: 히어로 → 맞춤 견적 카드 → 렌탈 비교(할부/일시불 탭 + 7년 누적 차트) → 특별 혜택 → 하단 고정 구매 바
 * - useSearchParams 사용 → page.tsx 에서 <Suspense> 로 감쌈
 */
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import { useHeaderScrollStyle } from "@/components/business/useHeaderScrollStyle";
import QrModal from "@/components/plan/QrModal";
import {
  APP_STORE_URL,
  KEEPER_TOTAL_BY_COUNT,
  PLAY_STORE_URL,
  RENTAL_MONTHLY_BY_COUNT,
  formatWon,
} from "@/components/plan/planData";
import CostChart from "./CostChart";
import styles from "./result.module.css";

const MIN = 2;
const MAX = 16;

/** cctvs 쿼리 파싱 + 유효성 검사 (원본 useLayoutEffect 조건과 동일) */
function parseCctvs(raw: string | null) {
  if (!raw) return null;
  const list = raw.split(",").map(Number);
  if (list.length !== 4 || !list.every((n) => n >= 0)) return null;
  const total = list.reduce((a, b) => a + b, 0);
  if (total < MIN || total > MAX) return null;
  return { list, total };
}

/** 모바일에서만 보이는 줄바꿈 (원본 sc-733bd00-1) */
const MobileBr = () => <br className="hidden max-lg:block" />;

/* ================================================================== */
/* 히어로                                                              */
/* ================================================================== */
function ResultHero({ originCount }: { originCount: number }) {
  return (
    <section className="-mt-[var(--header-height-mobile)] flex w-full flex-col items-center overflow-hidden lg:-mt-[var(--header-height)]">
      {/* 헤더 높이만큼의 빈 공간 (원본 sc-b7a14713-1) */}
      <div className="flex h-[var(--header-height-mobile)] bg-[#fff6f1] lg:h-[var(--header-height)]" />
      <div className="flex w-full flex-col items-center bg-[#fffcfa] px-[16px] pb-[40px] pt-[20px] lg:px-0 lg:pb-[156px] lg:pt-[132px]">
        <div className="relative flex w-full max-w-[1080px] flex-col items-center text-center lg:items-start lg:text-left">
          {/* ===== "AI 분석 결과" 뱃지 ===== */}
          <span className="flex items-center gap-[6px] rounded-[70.747px] bg-[#ffe8db] px-[12px] py-[6px] text-center text-[12px] font-medium leading-[140%] tracking-[-0.32px] text-[#ff5c00] lg:px-[12.734px] lg:py-[5.66px] lg:text-[16px]">
            <div className="h-[4.245px] w-[4.245px] rounded-full bg-[#ff5c00]" />
            AI 분석 결과
          </span>
          {/* ===== 권장 대수 타이틀 ===== */}
          <h1 className="mb-[6px] mt-[4px] text-[26px] font-bold leading-[135%] text-[#222] lg:text-[42px] lg:leading-[130%]">
            사장님 매장엔
            <br />
            <strong>CCTV {originCount}대</strong>면 충분해요
          </h1>
          <p className="text-[14px] font-normal leading-[145%] tracking-[-0.4px] text-[#4e5056] lg:text-[20px] lg:leading-[140%]">
            출입구·계산대·홀·주방까지, 사각지대 없이
            <br />꼭 필요한 만큼만 계산했어요
          </p>
          {/* 모델 이미지: PC 우측 하단 absolute(333.6px) / 모바일 본문 아래(320px) */}
          <Placeholder
            label="계산기를 들고 있는 신혜선"
            className="relative bottom-[-41px] aspect-[501/681] w-[320px] lg:absolute lg:bottom-[-157px] lg:right-0 lg:w-[333.6px]"
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 맞춤 견적 카드 (월 할부금 + 대수 조정 + 설치 기준)                       */
/* ================================================================== */
function EstimateCard({
  originCount,
  cctvCount,
  setCctvCount,
  locations,
}: {
  originCount: number;
  cctvCount: number;
  setCctvCount: (n: number) => void;
  locations: number[];
}) {
  const total = KEEPER_TOTAL_BY_COUNT[cctvCount];
  const percentage = ((cctvCount - MIN) / (MAX - MIN)) * 100; // 슬라이더 채움 비율

  return (
    <section className="flex w-full max-w-[708px] flex-col items-center px-[16px] lg:px-0">
      <div className="flex w-full flex-col items-center overflow-hidden rounded-[10px] bg-white">
        {/* ===== 상단 주황 띠: 권장 대수 ===== */}
        <div className="flex w-full items-center justify-center bg-[#ff5c00] py-[12px] text-[14px] font-medium leading-[120%] tracking-[-0.36px] text-white lg:py-[14px] lg:text-[18px]">
          <span>사장님 매장 맞춤 분석 · 권장 {originCount}대</span>
        </div>
        <div className="flex w-full flex-col px-[20px] py-[16px] lg:px-[40px] lg:py-[34px]">
          {/* ===== 월 할부금 (36개월 무이자) + 일시불 ===== */}
          <div className="flex flex-col items-center rounded-[8px] bg-[#fff6f1] px-0 py-[16px] lg:px-[34px] lg:py-[20px]">
            <p className="mb-[8px] text-center text-[14px] font-normal leading-[22px] tracking-[-0.3px] text-[#222]">
              <strong>키퍼</strong>로 시작하면 사장님 매장은
            </p>
            <h2 className="text-[32px] font-bold leading-[140%] tracking-[-0.48px] text-[#2c2d30] lg:text-[40px]">
              <span className="text-[20px] lg:text-[24px]">월 </span>
              <strong>{formatWon(total / 36)}</strong>
              <strong className="text-[20px] lg:text-[24px]">원</strong>
            </h2>
            <p className="mt-[4px] text-[14px] font-normal leading-[22px] tracking-[-0.3px] text-black lg:mb-[2px] lg:mt-[8px]">
              36개월 무이자 할부 기준 · <strong>완납 후 0원</strong>
            </p>
            <p className="text-center text-[13px] font-normal leading-[18px] tracking-[-0.3px] text-[rgba(29,29,31,0.6)]">
              일시불 {formatWon(total)}원 (vat 포함)
            </p>
          </div>
          <p className="mt-[6px] text-center text-[12px] font-normal leading-[18px] tracking-[-0.3px] text-[rgba(29,29,31,0.5)] lg:mt-[10px] lg:text-[13px]">
            *카드사 별 할부 정책에 따라 조건이 다를 수 있으니 결제 창에서 확인 부탁드립니다.
          </p>

          {/* ===== 대수 조정 range 슬라이더 (2~16) + 현재 대수 ===== */}
          <div className="my-[24px] flex w-full flex-col-reverse items-center justify-between lg:mb-[24px] lg:mt-[34px] lg:flex-row">
            <div className="flex w-full max-w-[412px] flex-col gap-[6px] lg:gap-[14px]">
              <p className="text-center text-[14px] font-medium leading-[22px] tracking-[-0.3px] text-[#333] lg:text-left">
                대수를 직접 조정해 보세요 <MobileBr />
                <span className="font-normal text-[#888]">(사장님 매장 권장 카메라 수)</span>
              </p>
              <div className="relative w-full">
                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  value={cctvCount}
                  aria-label="CCTV 대수 조정"
                  onChange={(e) => setCctvCount(Number(e.target.value))}
                  className={styles.range}
                  style={{
                    background: `linear-gradient(to right, #FF5C00 0%, #FF5C00 ${percentage}%, #EAEAEA ${percentage}%, #EAEAEA 100%)`,
                  }}
                />
                <div className="flex items-center justify-between text-[12px] font-normal leading-[1.5] tracking-[-0.3px] text-[#ccc] lg:text-[14px] lg:leading-[22px]">
                  <span>2대</span>
                  <span>16대</span>
                </div>
              </div>
            </div>
            <p className="text-[20px] font-bold leading-[140%] tracking-[-0.179px] text-[#2c2d30] lg:text-[17.862px]">
              <strong className="text-[32px] font-black! tracking-[-0.429px] lg:text-[42.899px]">{cctvCount}</strong>대
            </p>
          </div>

          {/* ===== 설치 기준: 위치별 권장 대수 (쿼리 값 그대로, 대수 조정과 무관) ===== */}
          <p className="mb-[10px] text-[14px] font-medium leading-[1.5] tracking-[-0.3px] text-[#333] lg:mb-[14px]">설치 기준</p>
          <div className="grid w-full grid-cols-2 gap-[10px] lg:grid-cols-4 lg:gap-[12px]">
            {["출입구", "계산대 / 포스", "홀 (객석)", "주방 (분리 공간)"].map((name, i) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center gap-[3.603px] rounded-[3.593px] bg-[#f5f5f5] px-[27.02px] py-[12.609px]"
              >
                <span className="text-center text-[11px] font-normal leading-[140%] tracking-[-0.22px] text-[rgba(78,80,86,0.6)]">
                  {name}
                </span>
                <span className="text-[13px] font-bold leading-[18px] tracking-[-0.3px] text-[#333]">
                  <strong className="text-[18px] leading-[1.33] tracking-[-0.4px] lg:text-[24px] lg:leading-[32px]">
                    {Number.isFinite(locations[i]) ? locations[i] : "-"}
                  </strong>
                  대
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 렌탈 비교 (할부/일시불 탭 + 누적 비용 차트)                              */
/* ================================================================== */

/** "절감" 옆 아래 화살표 아이콘 */
function DownArrowIcon() {
  return (
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden="true">
      <path
        d="M13.998 0C14.5696 0.000116994 15.0329 0.463618 15.0332 1.03516V15.5205H18.1123C19.0313 15.5205 19.4636 16.6563 18.7773 17.2676L10.2226 24.8887C9.8435 25.2264 9.27071 25.2264 8.89158 24.8887L0.336891 17.2676C-0.349338 16.6563 0.0829293 15.5205 1.00193 15.5205H3.96677V1.03516C3.96704 0.463546 4.43026 0 5.00193 0H13.998Z"
        fill="url(#resultDownArrowGrad)"
      />
      <defs>
        <linearGradient id="resultDownArrowGrad" x1="9.55711" y1="1.41058" x2="9.55711" y2="25.142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5C00" stopOpacity="0" />
          <stop offset="1" stopColor="#FF5C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** 비교 행: 왼쪽 라벨/설명, 오른쪽 금액 */
function CompareRow({
  label,
  desc,
  amount,
  prefix,
  suffix,
  highlight = false,
}: {
  label: string;
  desc: string;
  amount: string;
  prefix?: string;
  suffix: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start gap-0 lg:flex-row lg:items-center lg:gap-[6px]">
        <span
          className={
            highlight
              ? "text-[17px] font-bold leading-[120%] tracking-[-0.36px] text-[#ff5c00] lg:text-[18px]"
              : "text-[15px] font-medium leading-[1.5] tracking-[-0.3px] text-[#6a6c73] lg:text-[16px]"
          }
        >
          {label}
        </span>
        <span className="text-[13px] font-normal leading-[18px] tracking-[-0.3px] text-[#afb2ba]">{desc}</span>
      </div>
      <span
        className={
          highlight
            ? "text-right text-[15px] font-medium leading-[22px] tracking-[-0.3px] text-[#2c2d30] lg:text-[14px]"
            : "text-right text-[12px] font-medium leading-[17.39px] tracking-[-0.237px] text-[#2c2d30] lg:text-[11px]"
        }
      >
        {prefix}
        <span
          className={
            highlight
              ? "text-[25px] font-bold leading-[32px] tracking-[-0.4px] text-[#ff5c00] lg:text-[24px]"
              : "text-[21px] font-bold leading-[25.295px] tracking-[-0.316px] lg:text-[20px]"
          }
        >
          {amount}
        </span>
        {suffix}
      </span>
    </div>
  );
}

function RentalCompare({ cctvCount }: { cctvCount: number }) {
  // 결제 방식 탭: 할부·무이자(기본) / 일시불
  const [payType, setPayType] = useState<"INSTALLMENT" | "LUMP_SUM">("INSTALLMENT");
  const keeperTotal = KEEPER_TOTAL_BY_COUNT[cctvCount];
  const rentalMonthly = RENTAL_MONTHLY_BY_COUNT[cctvCount];
  const rental36 = 36 * rentalMonthly;
  const savingPct = Math.round(rental36 > 0 ? ((rental36 - keeperTotal) / rental36) * 100 : 0);

  const tabCls = (active: boolean) =>
    `flex-1 cursor-pointer rounded-[10px] border-none py-[12px] text-center text-[15px] font-bold outline-none transition-all duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:text-[#222] ${
      active ? "bg-white text-[#222] shadow-[0px_2px_6px_rgba(0,0,0,0.06)]" : "bg-transparent text-[#666]"
    }`;

  return (
    <section className="flex w-full max-w-[708px] flex-col gap-[20px] px-[16px] lg:px-0">
      {/* ===== 섹션 타이틀 ===== */}
      <div className="flex flex-col">
        <h2 className="text-[18px] font-bold leading-[26px] tracking-[-0.4px] text-[#1d1d1f]">
          <strong>키퍼</strong>는 36개월이면 끝나요.
        </h2>
        <p className="text-[14px] font-normal leading-[140%] tracking-[-0.28px] text-[#1d1d1f]">렌탈은 그 후에도 계속 나갑니다.</p>
      </div>

      {/* ===== 36개월 기준 절감률 + 탭 + 비교 행 ===== */}
      <div className="flex w-full flex-col items-center rounded-[10px] bg-white px-[20px] py-[30px] lg:px-[26px]">
        <div className="flex items-center gap-[8px] text-[16px] font-medium leading-[140%] tracking-[-0.32px] text-[#1d1d1f]">
          36개월 기준
          <span className="rounded-[4.029px] border-[0.482px] border-[rgba(255,92,0,0.4)] bg-[#fff6f1] px-[7.714px] pb-[6px] pt-[4px] text-center text-[13px] font-normal leading-[18.131px] tracking-[-0.201px] text-[#4e5056]">
            약 <strong className="text-[21.214px] font-bold!">{savingPct}%</strong> 절감
          </span>
          <DownArrowIcon />
        </div>
        <div className="mb-[30px] mt-[30px] flex w-full rounded-[12px] bg-[rgba(34,34,34,0.06)] p-[4px]">
          <button type="button" className={tabCls(payType === "INSTALLMENT")} onClick={() => setPayType("INSTALLMENT")}>
            할부 · 무이자
          </button>
          <button type="button" className={tabCls(payType === "LUMP_SUM")} onClick={() => setPayType("LUMP_SUM")}>
            일시불
          </button>
        </div>
        <div className="w-full">
          {payType === "INSTALLMENT" ? (
            // 할부 탭: 월 납부액 비교
            <div className="flex w-full flex-col gap-[6px]">
              <CompareRow label="일반렌탈 200만화소 기준" desc="3년 약정 후에도 계속 납부" prefix="월 " amount={formatWon(rentalMonthly)} suffix="원~" />
              <CompareRow label="키퍼 400만화소" desc="36개월이면 납부 끝" prefix="월 " amount={formatWon(keeperTotal / 36)} suffix="원" highlight />
            </div>
          ) : (
            // 일시불 탭: 36개월 총액 비교
            <div className="flex w-full flex-col gap-[6px]">
              <CompareRow label="일반렌탈 200만화소 기준" desc="36개월간 납부금액 · 이후에도 계속납부" amount={formatWon(rental36)} suffix="원" />
              <CompareRow label="키퍼 400만화소" desc="한 번 구매로 나의자산 · 추가비용 0원" amount={formatWon(keeperTotal)} suffix="원" highlight />
            </div>
          )}
          {/* 비교 기준 각주: 12대 이상은 추정치 문구 */}
          <p className="mt-[12px] text-[9px] font-normal leading-[1.4] tracking-[-0.3px] text-[#8e9097] lg:mt-[20px] lg:text-[10px]">
            {cctvCount < 12
              ? "비교 기준 : 200만 화소 렌탈 CCTV의 공개된 채널별 최저가(2026.6 조사)·3년 약정 기준, 렌탈요금은 업체·시점·협상 조건에 따라 달라질 수 있습니다."
              : "비교 기준 : 12대 이상은 렌탈사 공개 표준요금이 없어, 시장에서 통용되는 최저가(대당 11,000원,vat포함)를 가정한 추정치입니다. 실제 금액은 업체·구성·협상에 따라 달라지며, 정확한 비교는 상담 시 안내드립니다."}
          </p>
        </div>
      </div>

      {/* ===== 7년 누적 비용 차트 ===== */}
      <div className="flex w-full flex-col items-center rounded-[10px] bg-white px-[20px] py-[30px] lg:px-[26px]">
        <div className="relative flex w-full flex-col gap-[20px]">
          <h3 className="text-[18px] font-bold leading-[140%] tracking-[-0.4px] text-black lg:text-[20px]">
            36개월 뒤,{" "}
            <strong className="relative z-[1] before:absolute before:bottom-[4px] before:z-[-1] before:h-[6px] before:w-full before:bg-[rgba(255,246,167,0.66)] before:content-['']">
              키퍼는 0원.
            </strong>
            <br />
            렌탈은 계속 나갑니다.
          </h3>
          <CostChart cctvCount={cctvCount} />
        </div>
        <p className="mt-[20px] text-center text-[16px] font-bold tracking-[-0.4px] text-[#222] lg:mt-[34px]">
          <span className="text-[#ff5c00]">키퍼는 3년이면 납부 끝</span> <span className="max-lg:hidden">·</span> <MobileBr />
          렌탈은 그 후에도 계속 비용이 나갑니다.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 특별 혜택                                                           */
/* ================================================================== */
const BENEFITS = [
  { title: "제품 설치", subTitle: "최초 설치 무상 지원", iconName: "settings", color: "#FF5C00" },
  { title: "경비모드", subTitle: "IoT 센서 무상 제공", iconName: "iot", color: "#F8BC37" },
  { title: "A/S 서비스", subTitle: "3년 무상 지원", iconName: "install", color: "#2294E6" },
  { title: "매장 보험", subTitle: "1년 무상 제공", iconName: "insured", color: "#00BDA0" },
  { title: "CCTV", subTitle: "한 번 구매로\n평생 보안 서비스 무료", iconName: "video", color: "#A760FF" },
  { title: "저장장치", subTitle: "고용량 전용 저장장치\n무상 제공", iconName: "storage", color: "#FF548D" },
];

function SpecialBenefits() {
  return (
    <div className="flex w-full max-w-[708px] flex-col px-[16px] lg:px-0">
      <h2 className="text-[16px] font-medium leading-[140%] tracking-[-0.32px] text-[#ff5c00]">오직 키퍼에서만</h2>
      <h2 className="mb-[20px] text-[20px] font-bold leading-[140%] tracking-[-0.4px] text-black">키퍼 특별 혜택 서비스</h2>
      <div className="grid w-full grid-cols-2 gap-[12px] lg:grid-cols-3 lg:gap-[16px]">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="relative flex flex-col-reverse justify-between gap-[2px] whitespace-pre-wrap rounded-[16px] border border-[#eee] bg-white p-[24px]"
          >
            <div>
              <p className="text-[14px] font-medium leading-[140%] tracking-[-0.28px]" style={{ color: b.color }}>
                {b.title}
              </p>
              <p className="mt-[2px] text-[16px] font-bold leading-[140%] tracking-[-0.32px] text-[#222]">{b.subTitle}</p>
            </div>
            <div className="ml-auto flex shrink-0 justify-end">
              <Placeholder label={b.title} kind="icon" className="h-[46px] w-[46px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* 하단 고정 구매 바                                                     */
/* ================================================================== */
function StickyPurchaseBar({ cctvCount }: { cctvCount: number }) {
  const keeperTotal = KEEPER_TOTAL_BY_COUNT[cctvCount];
  const rental36 = 36 * RENTAL_MONTHLY_BY_COUNT[cctvCount];
  const savingPct = Math.round(rental36 > 0 ? ((rental36 - keeperTotal) / rental36) * 100 : 0);
  const [qrOpen, setQrOpen] = useState(false);
  const closeQr = useCallback(() => setQrOpen(false), []);

  // 앱 구매: PC → QR 모달 / 모바일 → 스토어 (원본 airbridge 딥링크 대체)
  const onAppPurchase = () => {
    if (window.innerWidth > 1023) {
      setQrOpen(true);
      return;
    }
    window.location.href = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? APP_STORE_URL : PLAY_STORE_URL;
  };

  return (
    // 스크롤해도 화면 하단에 붙어 있는 sticky 바 (원본 z-index 10000001)
    <div className="sticky bottom-0 left-0 right-0 z-[10000001] flex justify-center bg-white py-[16px] shadow-[0_-4px_24.7px_0_rgba(0,0,0,0.04)] lg:py-[24px]">
      <div className="flex w-full max-w-[708px] flex-col items-center px-[16px] lg:px-0">
        <div className="flex w-full items-center justify-between">
          <span className="text-[14px] font-normal leading-[1.5] tracking-[-0.3px] text-[#888] lg:text-[16px]">
            카메라 {cctvCount}대 · 렌탈보다{" "}
            <b>
              <strong>{savingPct}%</strong>
            </b>{" "}
            저렴
          </span>
          <div className="flex flex-col items-end gap-0 lg:flex-row lg:items-center lg:gap-[10px]">
            <span className="m-0 text-[14px] font-medium leading-[1.5] tracking-[-0.3px] text-[#ccc] line-through lg:text-[16px]">
              {formatWon(rental36)}원
            </span>
            <span className="text-right text-[20px] font-bold leading-[1.33] tracking-[-0.4px] text-[#ff5c00] lg:text-[24px]">
              {formatWon(keeperTotal)}원
            </span>
          </div>
        </div>
        <div className="mx-0 mb-[6px] mt-[10px] flex h-[52px] w-full gap-[12px] lg:mb-[10px] lg:mt-[24px] lg:h-[58px]">
          <button
            type="button"
            aria-label="키퍼 앱에서 구매하기"
            onClick={onAppPurchase}
            className="flex flex-[1_0_0] items-center justify-center gap-[6px] rounded-[8px] bg-[#ff5c00] text-[16px] font-bold leading-[120%] tracking-[-0.36px] text-white lg:text-[18px]"
          >
            앱에서 바로 구매하기
          </button>
          <a
            href="tel:1670-5773"
            aria-label="도입 문의하기"
            className="click_cta flex w-[37.7%] min-w-[37.7%] items-center justify-center gap-[6px] rounded-[8px] border border-[#dedede] bg-white text-[16px] font-bold leading-[120%] tracking-[-0.36px] text-[#222] visited:text-[#222] lg:text-[18px]"
          >
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" aria-hidden="true">
              <path
                d="M4.32226 0.398578L6.26853 2.87757C7.76437 4.4614 4.39056 7.28105 4.38264 7.28944C4.17574 7.50851 5.50922 9.27682 6.8734 10.7223C8.23757 12.1678 9.90764 13.5797 10.1155 13.3596C10.1235 13.3512 12.7874 9.77891 14.2823 11.3627L16.6236 13.4235C18.452 15.6446 13.4814 22.5774 4.7123 13.2914C4.66874 13.2453 4.6242 13.1981 4.57965 13.151C4.5351 13.1038 4.49055 13.0566 4.44699 13.0105C-4.32311 3.72556 2.22452 -1.53744 4.32226 0.398578Z"
                fill="#FF5C00"
              />
            </svg>
            상담 전화걸기
          </a>
        </div>
        <p className="text-center text-[12px] font-normal leading-[22px] tracking-[-0.3px] text-[#999] lg:text-[14px]">
          이미 받은 번호로 안내드려요 · 연락처를 다시 입력하지 않아요
        </p>
      </div>
      <QrModal open={qrOpen} onClose={closeQr} />
    </div>
  );
}

/* ================================================================== */
/* 결과 페이지 본체                                                      */
/* ================================================================== */
export default function CalculatorResult() {
  useHeaderScrollStyle(100, "transparent-black", "white");
  const router = useRouter();
  const raw = useSearchParams().get("cctvs");
  const parsed = parseCctvs(raw);

  // 권장 대수(고정)와 사용자가 조정하는 대수
  const originCount = parsed ? Math.min(parsed.total, MAX) : 0;
  const [cctvCount, setCctvCount] = useState(originCount);

  // 잘못된 쿼리면 계산기로 되돌림
  const isValid = parsed !== null;
  useEffect(() => {
    if (!isValid) router.push("/calculator");
  }, [isValid, router]);

  if (!parsed) return null;

  return (
    // 페이지 배경 #fff6f1, 모든 strong 은 주황 (원본 sc-e1bdb9d7-0)
    <div className="relative w-full min-w-[360px] bg-[#fff6f1] [&_strong]:[font-weight:inherit] [&_strong]:text-[#ff5c00]">
      {/* ===== 히어로: AI 분석 결과 · 권장 N대 ===== */}
      <ResultHero originCount={originCount} />
      <div className="flex flex-col items-center gap-[60px] py-[60px] lg:gap-[80px] lg:py-[80px]">
        {/* ===== 맞춤 견적 카드: 월 할부금 · 대수 조정 · 설치 기준 ===== */}
        <EstimateCard
          originCount={originCount}
          cctvCount={cctvCount}
          setCctvCount={setCctvCount}
          locations={parsed.list}
        />
        {/* ===== 렌탈 비교: 할부/일시불 탭 + 7년 누적 차트 ===== */}
        <RentalCompare cctvCount={cctvCount} />
        {/* ===== 키퍼 특별 혜택 6종 ===== */}
        <SpecialBenefits />
      </div>
      {/* ===== 하단 고정 구매 바: 렌탈 대비 할인율 · 앱 구매 · 상담 전화 ===== */}
      <StickyPurchaseBar cctvCount={cctvCount} />
    </div>
  );
}
