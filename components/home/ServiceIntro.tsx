"use client";

/**
 * 서비스 소개 섹션 (원본 F 컴포넌트, sc-973229ea)
 * - 상단: "서비스 소개" 칩 + 헤드라인.
 * - 카드 4개 (PC: column-count 2 메이슨리 / 모바일: 1열, 순서 1→4→3→2 로 재배치)
 *   1. 매장 보안 (베이지, 584px, 하단 이미지)      → /security
 *   2. 별점 4.96 (회색, 312px)                     → 네이버 스마트스토어 새 창
 *   3. KEEPER STORY (주황, 312px)                  → /story
 *   4. 직원 관리 (배경 이미지 + 상단 어두운 그라데이션, 584px) → /new-service/employee-contract
 * - 각 카드 우하단 원형 화살표 버튼 클릭 시 이동, 카드마다 스크롤 진입 시 slide-in-up(1s).
 */
import { useRouter } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { ArrowRightIcon } from "./icons";

/** 원본 D.HN: 네이버 스마트스토어 상품 URL */
const NAVER_STORE_URL = "https://smartstore.naver.com/shopmanager_keeper/products/11980485529";

/* 카드 공통 스타일 (원본 `& > div`) */
const CARD =
  "relative mb-0 flex flex-col overflow-hidden rounded-[13px] p-[24px] text-white [break-inside:avoid] lg:mb-[24px] lg:rounded-[20px] lg:pb-[32px] lg:pl-[37px] lg:pr-[32px] lg:pt-[42px]";
const TITLE =
  "z-[2] mb-[4px] mt-[9px] text-[20px] font-bold leading-[1.35] tracking-[-0.26px] lg:mt-[10px] lg:text-[26px] lg:leading-[38px]";
const DESC =
  "z-[2] text-[14px] font-normal leading-[1.4] tracking-[-0.28px] lg:text-[18px] lg:leading-[28.018px] lg:tracking-[-0.36px]";
const BUTTON =
  "btn-active absolute bottom-[20px] right-[18px] z-[3] flex h-[36px] w-[36px] items-center justify-center rounded-full transition-[transform,opacity] duration-150 active:opacity-70 lg:bottom-[30px] lg:right-[32px] lg:h-[48px] lg:w-[48px]";
const ARROW = "h-[14px] w-[14px] text-white lg:h-[20px] lg:w-[20px]";
const CHIP =
  "z-[2] flex w-fit items-center justify-center rounded-[6px] px-[9.095px] py-[2.598px] text-[11px] font-normal leading-[18.201px] tracking-[-0.22px] lg:px-[14px] lg:py-[4px] lg:text-[16px] lg:leading-[28.018px] lg:tracking-[-0.32px]";

export default function ServiceIntro() {
  const router = useRouter();

  return (
    // ===== 서비스 소개: 흰 배경, 칩 + 헤드라인 + 카드 4개 =====
    <section className="flex h-full w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <div className="mb-[40px] flex flex-col items-center justify-center gap-[16px] lg:mb-[60px] lg:gap-[20px]">
          <strong className="rounded-[100px] bg-brand-light px-[12px] py-[8px] text-center text-[13px] font-medium text-brand lg:px-[16px] lg:text-[16px]">
            서비스 소개
          </strong>
          <h2 className="text-center text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            사장님은 고객과 <br className="lg:hidden" />
            매출에만 집중하세요
            <br />
            나머지는 <strong className="text-brand">키퍼</strong>가 책임집니다.
          </h2>
        </div>

        {/* ===== 카드 그리드: PC 2단 컬럼 / 모바일 1열(order 재배치) ===== */}
        <div className="grid w-[343px] grid-cols-1 gap-[16px] lg:block lg:w-[1080px] lg:columns-2 lg:gap-[24px]">
          {/* 카드 1: 매장 보안 — 하단 이미지 */}
          <Reveal threshold={0.1} className={`${CARD} order-1 h-[396px] bg-[#ffe8d5] lg:h-[584px]`}>
            <div className={`${CHIP} bg-[rgba(220,175,139,0.67)] text-[#fafafc]`}>매장 보안</div>
            <h3 className={`${TITLE} text-[#202020]`}>
              매장 전용 CCTV, <br className="lg:hidden" />
              부가 비용 ZERO
            </h3>
            <p className={`${DESC} text-[#1d1d1f]`}>
              렌탈 하지않고 구매하니까
              <br />
              사설 보안 업체 대비 최대 40% 비용 절감!
              <br />
              월 이용료, 설치비, 약정 기한이 없습니다.
            </p>
            <button
              type="button"
              aria-label="매장 보안 페이지로 이동"
              className={`${BUTTON} bg-[#dcaf8b]`}
              onClick={() => router.push("/security")}
            >
              <ArrowRightIcon className={ARROW} />
            </button>
            <Placeholder
              label="매장 전용 CCTV, 부가 비용 ZERO"
              className="absolute bottom-[-20px] left-0 h-[230px] w-full lg:bottom-0 lg:h-[340px]"
            />
          </Reveal>

          {/* 카드 2: 별점 / 스마트스토어 — 모바일에서는 맨 마지막 */}
          <Reveal threshold={0.1} className={`${CARD} order-4 h-[229px] bg-[#efefef] lg:h-[312px]`}>
            <div>
              <span className="text-[15.591px] font-normal leading-[1.23] tracking-[-0.65px] text-[#ff7500] lg:text-[24px] lg:tracking-[-1px]">
                ★★★★★{" "}
              </span>
              <span className="text-[12.992px] font-normal leading-[18.201px] tracking-[-0.26px] text-[#1d1d1f] opacity-85 lg:text-[20px] lg:leading-[28.018px] lg:tracking-[-0.4px]">
                4.96{" "}
              </span>
              <span className="text-[11.693px] font-normal leading-[18.201px] tracking-[-0.234px] text-[rgba(29,29,31,0.5)] opacity-85 lg:text-[18px] lg:leading-[28.018px] lg:tracking-[-0.36px]">
                (네이버 스마트스토어 기준)
              </span>
            </div>
            <h3 className={`${TITLE} text-[#202020]`}>사장님들이 먼저 증명했어요</h3>
            <p className={`${DESC} text-[#1d1d1f]`}>
              네이버·App Store·Google Play
              <br />
              누적후기 168개가 입증하는 한화비전 키퍼,
              <br />
              지금 바로 스마트스토어를 통해 구매하세요
            </p>
            <button
              type="button"
              aria-label="네이버 스토어로 이동"
              className={`${BUTTON} bg-[#c8c8c8]`}
              onClick={() => window.open(NAVER_STORE_URL, "_blank")}
            >
              <ArrowRightIcon className={ARROW} />
            </button>
          </Reveal>

          {/* 카드 3: KEEPER STORY — 주황 배경 */}
          <Reveal threshold={0.1} className={`${CARD} order-3 h-[229px] bg-brand text-[#fafafc] lg:h-[312px]`}>
            <div className={`${CHIP} bg-white/15 text-white`}>KEEPER STORY</div>
            <h3 className={TITLE}>
              공간을 지키는 기술,
              <br />
              삶을 지키는 키퍼의 약속
            </h3>
            {/* 원본 color:inherit → 카드 글자색(#fafafc) 상속 */}
            <p className={DESC}>
              한화비전이 만든 매장관리 올인원 솔루션,
              <br />
              키퍼의 이야기를 확인하세요
            </p>
            <button
              type="button"
              aria-label="스토리 페이지로 이동"
              className={`${BUTTON} bg-white/30`}
              onClick={() => router.push("/story")}
            >
              <ArrowRightIcon className={ARROW} />
            </button>
          </Reveal>

          {/* 카드 4: 직원 관리 — 전체 배경 이미지 + 상단 어두운 그라데이션 */}
          <Reveal threshold={0.1} className={`${CARD} order-2 h-[396px] text-white lg:h-[584px]`}>
            {/* 원본 ::before: 상단 247px(모바일)/366px(PC) 그라데이션 */}
            <span className="absolute left-0 top-0 z-[1] h-[247px] w-full bg-[linear-gradient(180deg,#0b0908_0%,rgba(11,9,8,0)_100%)] lg:h-[366px]" />
            <div className={`${CHIP} bg-white/10 text-white`}>직원 관리</div>
            <h3 className={TITLE}>
              직원 근태관리, <br className="lg:hidden" />
              앱 하나로 간편하게
            </h3>
            <p className={`${DESC} opacity-85`}>
              근로계약서 작성, 출퇴근 체크, 급여 확인
              <br />
              종이서류 작업 없이 모바일로 한 번에.
            </p>
            <button
              type="button"
              aria-label="직원관리 페이지로 이동"
              className={`${BUTTON} bg-black/[0.68]`}
              onClick={() => router.push("/new-service/employee-contract")}
            >
              <ArrowRightIcon className={ARROW} />
            </button>
            <Placeholder
              dark
              label="직원 근태관리, 앱 하나로 간편하게"
              className="absolute bottom-0 left-0 z-0 h-full w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
