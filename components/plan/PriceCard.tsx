"use client";

/**
 * /plan 가격 안내 카드 (클라이언트 컴포넌트)
 * - 원본 sc-6d8abdc8 영역: "한화비전 키퍼 CCTV 가격안내"
 *   ① 대당 가격(VAT 포함) + 36개월 할부 월 금액
 *   ② 구매 수량 슬라이더 (− / 드래그 핸들 / +) — 2~16대, 초기 4대
 *   ③ 수량에 따른 키퍼 총액 vs 렌탈업체 36개월 총액 비교 (실시간 계산)
 *   ④ 견적계산기 배너(→ /calculator), 키퍼 혜택 3종
 *   ⑤ 네이버 스토어 / 키퍼 앱 구매 버튼 (앱 버튼: PC 는 QR 모달, 모바일은 스토어 이동)
 */
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Placeholder from "@/components/common/Placeholder";
import QrModal from "./QrModal";
import {
  APP_STORE_URL,
  CAM_RANGE,
  CCTV_PRICE_VAT,
  KEEPER_TOTAL_BY_COUNT,
  NAVER_STORE_URL,
  PLAY_STORE_URL,
  RENTAL_MONTHLY_BY_COUNT,
  formatWon,
} from "./planData";

/* ------------------------------------------------------------------ */
/* 수량 상태 훅 (원본 I 훅과 동일한 규칙)                                  */
/* ------------------------------------------------------------------ */
function useCamNum() {
  const [camNum, setCamNum] = useState<number>(CAM_RANGE.INITIAL);
  // 범위를 벗어나는 값은 무시
  const updateCamNum = useCallback((n: number) => {
    if (n > CAM_RANGE.MAX || n < CAM_RANGE.MIN) return;
    setCamNum(n);
  }, []);
  const addOne = () => setCamNum((n) => (n + 1 > CAM_RANGE.MAX ? n : n + 1));
  const subtractOne = () => setCamNum((n) => (n - 1 < CAM_RANGE.MIN ? n : n - 1));
  return { camNum, updateCamNum, addOne, subtractOne };
}

/* ------------------------------------------------------------------ */
/* 수량 슬라이더                                                        */
/* ------------------------------------------------------------------ */
function QuantitySlider({
  camNum,
  updateCamNum,
  addOne,
  subtractOne,
}: ReturnType<typeof useCamNum>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // 진행률(%) — MIN 이면 0, MAX 면 100 (원본 s())
  const progress =
    camNum <= CAM_RANGE.MIN
      ? 0
      : camNum >= CAM_RANGE.MAX
        ? 100
        : ((camNum - CAM_RANGE.MIN) / (CAM_RANGE.MAX - CAM_RANGE.MIN)) * 100;

  // 드래그 중 포인터 x 좌표 → 트랙 대비 % → 가장 가까운 정수 대수로 반올림 (원본 d())
  // 원본은 PC 에서 (x - 트랙left) / 4.5 로 근사했는데, 여기서는 실제 트랙 폭으로 정확히 계산
  useEffect(() => {
    const moveTo = (clientX: number) => {
      const track = trackRef.current;
      if (!draggingRef.current || !track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(Math.min(((clientX - rect.left) / rect.width) * 100, 100), 0);
      updateCamNum(Math.round(CAM_RANGE.MIN + (CAM_RANGE.MAX - CAM_RANGE.MIN) * (pct / 100)));
    };
    const onMouseMove = (e: MouseEvent) => moveTo(e.clientX);
    const onTouchMove = (e: TouchEvent) => moveTo(e.touches[0].clientX);
    // 핸들 밖에서 손을 떼도 드래그가 끝나도록 window 에서 종료 처리
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [updateCamNum]);

  const stepBtn =
    "flex h-[40px] w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-2 border-[#eee] bg-white text-[#222] hover:bg-[#f8f8f8] disabled:cursor-not-allowed disabled:bg-[#eee] disabled:text-[#bbb] lg:h-[56px] lg:w-[56px]";

  return (
    <div className="mt-[64px] w-full lg:mt-[90px]">
      <div className="relative flex h-[40px] w-full items-center gap-[8px] lg:h-[56px] lg:gap-[32px]">
        {/* − 버튼: 최소(2대)면 비활성 */}
        <button
          type="button"
          aria-label="수량 빼기"
          className={stepBtn}
          disabled={camNum <= CAM_RANGE.MIN}
          onClick={subtractOne}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* 트랙 + 채움 바 + 드래그 핸들 */}
        <div className="relative flex-1">
          <div
            ref={trackRef}
            className="relative h-[16px] w-full rounded-[24px] bg-[#e5e9f1] lg:h-[22px] lg:rounded-[32px]"
          >
            <div
              className="absolute bottom-0 left-0 top-0 z-10 rounded-[24px] bg-[#ffc2a0] lg:rounded-[32px]"
              style={{ width: `${progress}%` }}
            >
              {/* 핸들: mousedown/touchstart 로 드래그 시작 */}
              <button
                type="button"
                aria-label={`구매 수량 ${camNum}대`}
                className="absolute right-[-14px] top-1/2 h-[28px] w-[28px] -translate-y-1/2 cursor-pointer rounded-full bg-[#ff5c00] before:absolute before:left-1/2 before:top-1/2 before:h-[10px] before:w-[10px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:content-[''] lg:right-[-26px] lg:h-[40px] lg:w-[40px] lg:before:h-[14px] lg:before:w-[14px]"
                onMouseDown={() => {
                  draggingRef.current = true;
                }}
                onTouchStart={() => {
                  draggingRef.current = true;
                }}
              >
                {/* 핸들 위 말풍선: "N대" */}
                <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#333] px-[8px] pb-[4px] pt-[3px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#f5f5f5] before:absolute before:left-1/2 before:top-[calc(100%-1px)] before:h-0 before:w-0 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-[#333] before:content-[''] lg:bottom-[calc(100%+12px)] lg:rounded-[8px] lg:px-[10px] lg:pb-[6px] lg:pt-[5px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px] lg:before:border-[8px] lg:before:border-t-[#333]">
                  <strong className="mr-[2px] font-bold text-white">{camNum}</strong>대
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* + 버튼: 최대(16대)면 비활성 */}
        <button
          type="button"
          aria-label="수량 더하기"
          className={stepBtn}
          disabled={camNum >= CAM_RANGE.MAX}
          onClick={addOne}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12 2a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 키퍼 vs 렌탈 비교 박스                                               */
/* ------------------------------------------------------------------ */
function PriceCompare({ camNum }: { camNum: number }) {
  const keeperTotal = KEEPER_TOTAL_BY_COUNT[camNum] || 0;
  const rentalTotal = 36 * (RENTAL_MONTHLY_BY_COUNT[camNum] || 0); // 렌탈 36개월 합계

  const valueCls =
    "relative inline-block text-[20px] font-bold leading-[34px] tracking-[-0.4px] lg:text-[26px] lg:tracking-[-0.52px] [&>span]:relative [&>span]:text-[#666] [&>strong]:relative [&>strong]:text-[#222]";
  // 키퍼 금액에만 하늘색 형광펜 하이라이트(::before)
  const highlightCls =
    "before:absolute before:bottom-[2px] before:left-[-2px] before:right-[-2px] before:h-[14px] before:bg-[#bee4ff] before:content-[''] lg:before:bottom-[-4px] lg:before:left-[-4px] lg:before:right-[-4px] lg:before:h-[18px]";
  const labelCls =
    "relative inline-block text-[16px] font-medium leading-[24px] tracking-[-0.32px] text-[#666] lg:text-[22px] lg:leading-[34px] lg:tracking-[-0.44px]";

  return (
    <div className="mt-[32px] w-full rounded-[12px] bg-[rgba(235,238,245,0.9)] px-[20px] pb-[32px] pt-[24px] lg:mt-[48px] lg:px-[32px] lg:pt-[28px]">
      <div className="relative flex items-center text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-[#222] lg:text-[22px] lg:leading-[34px] lg:tracking-[-0.44px]">
        구매수량 <strong className="ml-[4px] mr-[2px] text-[#ff5c00] lg:mx-[3px]">{camNum}</strong>대
        {/* "설치무료" 말풍선 뱃지 (왼쪽 꼬리 = ::before 삼각형) */}
        <div className="relative ml-[8px] inline-block rounded-[4px] bg-[#2294e6] pb-[2px] pl-[3px] pr-[4px] pt-[1px] text-[11px] font-medium leading-[17px] tracking-[-0.22px] text-white before:absolute before:left-[-4px] before:top-[8px] before:rotate-[-90deg] before:border-x-[2px] before:border-b-[4px] before:border-x-transparent before:border-b-[#2294e6] before:content-[''] lg:ml-[12px] lg:rounded-[8px] lg:px-[6px] lg:pb-[5px] lg:pt-[4px] lg:text-[16px] lg:leading-[22px] lg:tracking-[-0.32px] lg:before:left-[-7px] lg:before:top-[13px] lg:before:border-x-[4px] lg:before:border-b-[8px]">
          설치무료
        </div>
      </div>
      <div className="mt-[16px] w-full border-t border-[#dedede] pt-[20px] lg:mt-[20px] lg:pt-[24px]">
        <div className="relative flex w-full justify-between">
          <div className={labelCls}>키퍼</div>
          <div className={`${valueCls} ${highlightCls}`}>
            <span>총&nbsp;</span>
            <strong>{formatWon(keeperTotal)}원</strong>
          </div>
        </div>
        <div className="relative mt-[14px] flex w-full justify-between">
          <div className={labelCls}>렌탈업체</div>
          <div className={valueCls}>
            <span>총&nbsp;</span>
            <strong>{formatWon(rentalTotal)}원</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 키퍼 혜택 3종                                                        */
/* ------------------------------------------------------------------ */
const BENEFITS = [
  { icon: "settings", lines: ["최초 설치", "무료"] },
  { icon: "install", lines: ["3년 무상", "A/S 제공"] },
  { icon: "insured", lines: ["사장님 안심", "케어 보험"] },
];

function Benefits() {
  return (
    <div className="mt-[32px] w-full lg:mt-[48px]">
      <h4 className="text-[18px] font-bold leading-[22px] tracking-[-0.32px] text-[#222] lg:text-[24px] lg:leading-[34px] lg:tracking-[-0.48px]">
        키퍼 혜택
      </h4>
      <div className="mt-[16px] flex gap-[8px] lg:mt-[20px] lg:gap-[16px]">
        {BENEFITS.map((b) => (
          <div
            key={b.icon}
            className="flex h-[133px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[12px] bg-[rgba(235,238,245,0.9)] p-[4px] lg:h-[236px] lg:gap-[24px] lg:p-0"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white lg:h-[88px] lg:w-[88px]">
              <Placeholder label={b.icon} kind="icon" className="h-[28px] w-[28px] lg:h-[44px] lg:w-[44px]" />
            </div>
            <div className="text-center text-[14px] font-bold leading-[19px] tracking-[-0.28px] text-[#222] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]">
              <p>
                {b.lines[0]}
                <br />
                {b.lines[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 구매 버튼 (네이버 스토어 / 키퍼 앱)                                    */
/* ------------------------------------------------------------------ */
function PurchaseButtons() {
  const [qrOpen, setQrOpen] = useState(false);
  const closeQr = useCallback(() => setQrOpen(false), []);

  // 네이버 스토어: 새 탭으로 스마트스토어 상품 페이지 열기
  const onNaver = () => {
    window.open(NAVER_STORE_URL, "_blank");
  };

  // 키퍼 앱: PC(≥1024px) → QR 모달 / 모바일 → OS 별 앱스토어로 이동 (원본은 airbridge 딥링크 후 스토어 폴백)
  const onKeeperApp = () => {
    if (window.innerWidth > 1023) {
      setQrOpen(true);
      return;
    }
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.location.href = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
  };

  const btnBase =
    "relative flex h-[52px] min-h-[52px] min-w-full flex-[1_1_0] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] text-[16px] font-medium leading-[24px] tracking-[-0.3px] lg:h-[72px] lg:min-h-0 lg:min-w-0 lg:text-[18px] lg:font-bold lg:leading-[26px] lg:tracking-[-0.4px]";

  return (
    <>
      <div className="mt-[64px] flex w-full flex-col-reverse flex-wrap justify-center gap-[8px] lg:mt-[73px] lg:flex-row lg:gap-[14px]">
        <button
          type="button"
          aria-label="네이버 스토어에서 구매하기"
          className={`${btnBase} border-0 bg-[#11d166] text-white`}
          onClick={onNaver}
        >
          <div className="relative inline-flex items-center leading-[24px]">
            <Placeholder label="네이버 로고" kind="icon" className="h-[12px] w-[12px] rounded-full lg:h-[20px] lg:w-[20px]" />
          </div>
          <span>네이버 스토어에서 구매하기</span>
        </button>
        <button
          type="button"
          aria-label="키퍼 앱에서 구매하기"
          className={`${btnBase} border border-[#DEDEDE] bg-white text-[#222] lg:border-0 lg:bg-[#ff5c00] lg:text-white`}
          onClick={onKeeperApp}
        >
          {/* 로고 뒤 주황 원형 배경 (원본 ::before 20px 원) */}
          <div className="relative inline-flex items-center leading-[24px] before:absolute before:left-1/2 before:top-1/2 before:h-[20px] before:w-[20px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[#ff5c00] before:content-['']">
            <Placeholder label="키퍼 로고" kind="icon" className="relative z-[5] h-[10px] w-[10px] lg:h-[15px] lg:w-[15px]" />
          </div>
          <span>키퍼 앱에서 구매하기</span>
          {/* 버튼 위 말풍선 — PC 흰색 / 모바일 주황색 */}
          <div className="absolute bottom-[120%] left-1/2 z-10 flex h-[30px] w-auto -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-[5px] bg-[#ff5c00] px-[8px] text-[13px] font-bold leading-[18px] tracking-[-0.3px] text-white after:absolute after:left-1/2 after:top-[29px] after:ml-[-7px] after:border-solid after:border-x-[6px] after:border-b-0 after:border-t-[7px] after:border-x-transparent after:border-t-[#ff5c00] after:content-[''] lg:h-[34px] lg:w-[231px] lg:bg-white lg:px-[20px] lg:text-[14px] lg:font-medium lg:leading-[20px] lg:tracking-[-0.28px] lg:text-[#333] lg:after:top-[33px] lg:after:ml-[-10px] lg:after:border-x-[7px] lg:after:border-t-[10px] lg:after:border-t-white">
            오직 앱에서만 무이자 36개월 할부
          </div>
        </button>
      </div>
      <QrModal open={qrOpen} onClose={closeQr} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 가격 안내 카드 전체                                                   */
/* ------------------------------------------------------------------ */
export default function PriceCard() {
  const cam = useCamNum();

  return (
    <section className="mt-[48px] w-full rounded-[14px] bg-[#f6f7fa] px-[20px] pb-[24px] pt-[30px] lg:mt-[72px] lg:rounded-[20px] lg:px-[232px] lg:pb-[100px] lg:pt-[88px]">
      <div className="mx-auto w-full lg:w-[616px]">
        {/* ===== 가격 헤더: 대당 396,000원(VAT 포함) + 36개월 할부 월 11,000원 ===== */}
        <h2 className="text-center text-[18px] font-bold leading-[38px] tracking-[-1px] text-[#202020] lg:text-[20px] lg:leading-[48px]">
          한화비전 키퍼 CCTV 가격안내
        </h2>
        <div className="mx-0 mt-[8px] flex w-full flex-col items-center gap-[8px] rounded-[12px] bg-white py-[20px] lg:mx-auto lg:mt-[12px] lg:gap-[10px] lg:pb-[22px] lg:pt-[16px]">
          <p className="text-center text-[18px] font-medium leading-[26px] tracking-[-0.18px] text-[rgba(32,32,32,0.7)] lg:text-[26px] lg:leading-[38px] lg:tracking-[-0.26px]">
            CCTV 대당&nbsp;<strong className="font-bold text-[#222]">{formatWon(CCTV_PRICE_VAT)}원</strong>
            &nbsp;
            <span className="text-[14px] font-normal leading-[26px] tracking-[-0.14px] text-[rgba(32,32,32,0.7)] lg:text-[12px] lg:leading-normal lg:tracking-[-0.12px]">
              (vat 포함)
            </span>
          </p>
          <p className="w-fit rounded-[40px] bg-[#fff6f1] px-[10.5px] pb-[2.5px] pt-[1.5px] text-[12px] font-medium text-[#ff5c00] lg:px-[23px] lg:pb-[5px] lg:pt-[4px] lg:text-[14px]">
            36개월 할부 적용 시 월 {formatWon(CCTV_PRICE_VAT / 36)}원
          </p>
        </div>

        {/* ===== 수량 슬라이더: −/+ 버튼, 핸들 드래그로 2~16대 선택 ===== */}
        <QuantitySlider {...cam} />

        {/* ===== 키퍼 vs 렌탈 비교: 선택 수량에 따라 총액 실시간 갱신 ===== */}
        <PriceCompare camNum={cam.camNum} />

        {/* ===== 견적계산기 배너: 클릭 시 /calculator 이동 ===== */}
        <Link href="/calculator" className="mt-[48px] block w-full cursor-pointer" aria-label="견적계산기 바로가기">
          {/* 원본: PC v2_plan.png(1232×226) / 모바일 v2_plan_mobile.png(909×384) */}
          <div className="lg:hidden">
            <Placeholder label="견적계산기 바로가기 (모바일 배너)" className="aspect-[909/384] w-full" />
          </div>
          <div className="hidden lg:block">
            <Placeholder label="견적계산기 바로가기" className="aspect-[1232/226] w-full" />
          </div>
        </Link>

        {/* ===== 키퍼 혜택: 설치 무료 / 3년 무상 A/S / 안심 케어 보험 ===== */}
        <Benefits />

        {/* ===== 구매 버튼: 네이버 스토어(새 탭) / 키퍼 앱(PC QR 모달, 모바일 스토어) ===== */}
        <PurchaseButtons />
      </div>
    </section>
  );
}
