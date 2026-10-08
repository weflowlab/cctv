/**
 * 홈 서비스 소개 카드 4개 (keeper ServiceIntro 틀)
 * - 상단: "서비스 소개" 칩 + 헤드라인.
 * - 카드 4개 (PC: column-count 2 메이슨리 / 모바일: 1열, order 로 설치 → 렌탈 → AS → 스피커 순 재배치)
 *   1. CCTV 설치 (베이지, 큰 카드, 하단 이미지)       → /service/install
 *   2. AS 수리 (회색, 작은 카드)                        → /service/as
 *   3. CCTV+스피커 (주황, 작은 카드)                    → /service/speaker
 *   4. CCTV 렌탈 (배경 이미지 + 상단 어두운 그라데이션, 큰 카드) → /service/rental
 * - 카드 전체가 링크(투명 오버레이), 우하단 원형 화살표는 시각 요소. 카드마다 스크롤 진입 시 slide-in-up.
 * - 카드 문구 출처: kkcctv 설치 패키지 / 렌탈 / AS / 스피커 배너 페이지 요약.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SERVICES, SITE, type ServiceSlug } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

/* 카드 공통 스타일 (keeper 수치 그대로) */
const CARD =
  "group relative mb-0 flex flex-col overflow-hidden rounded-[13px] p-[24px] text-white [break-inside:avoid] lg:mb-[24px] lg:rounded-[20px] lg:pb-[32px] lg:pl-[37px] lg:pr-[32px] lg:pt-[42px]";
const TITLE =
  "z-[2] mb-[4px] mt-[9px] text-[20px] font-bold leading-[1.35] tracking-[-0.26px] lg:mt-[10px] lg:text-[26px] lg:leading-[38px]";
const DESC =
  "z-[2] text-[14px] font-normal leading-[1.4] tracking-[-0.28px] lg:text-[18px] lg:leading-[28.018px] lg:tracking-[-0.36px]";
const BUTTON =
  "absolute bottom-[20px] right-[18px] z-[3] flex h-[36px] w-[36px] items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-[4px] lg:bottom-[30px] lg:right-[32px] lg:h-[48px] lg:w-[48px]";
const ARROW = "h-[14px] w-[14px] text-white lg:h-[20px] lg:w-[20px]";
const CHIP =
  "z-[2] flex w-fit items-center justify-center rounded-[6px] px-[9.095px] py-[2.598px] text-[11px] font-normal leading-[18.201px] tracking-[-0.22px] lg:px-[14px] lg:py-[4px] lg:text-[16px] lg:leading-[28.018px] lg:tracking-[-0.32px]";

/** 서비스 이름 (SERVICES 상수에서 조회) */
const nameOf = (slug: ServiceSlug) => SERVICES.find((s) => s.slug === slug)?.name ?? "";

/** 카드 전체를 덮는 투명 링크 (스크린리더용 이름 포함) */
function CardLink({ slug }: { slug: ServiceSlug }) {
  return (
    <Link href={`/service/${slug}`} className="absolute inset-0 z-[4]" aria-label={`${nameOf(slug)} 페이지로 이동`} />
  );
}

export default function ServiceCards() {
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
            설치부터 렌탈, AS까지
            <br />
            ‘CCTV의 모든 고민’을 <br className="lg:hidden" />
            <strong className="text-brand">{SITE.name}</strong>가 덜어 드립니다.
          </h2>
        </div>

        {/* ===== 카드 그리드: PC 2단 컬럼 / 모바일 1열(order 재배치) ===== */}
        <div className="grid w-full max-w-[480px] grid-cols-1 gap-[16px] lg:block lg:w-[1080px] lg:max-w-none lg:columns-2 lg:gap-[24px]">
          {/* 카드 1: CCTV 설치 — 하단 이미지 */}
          <Reveal threshold={0.1} className={`${CARD} order-1 h-[396px] bg-[#ffe8d5] lg:h-[584px]`}>
            <div className={`${CHIP} bg-[rgba(220,175,139,0.67)] text-[#fafafc]`}>{nameOf("install")}</div>
            <h3 className={`${TITLE} text-[#202020]`}>
              CCTV 설치 <br className="lg:hidden" />
              초특가 패키지
            </h3>
            <p className={`${DESC} text-[#1d1d1f]`}>
              200만 화소 카메라 1대 패키지 45만원부터
              <br />
              꼼꼼한 설치 시공 + 기본 자재 포함,
              <br />
              기계 무상 AS 1년까지 책임집니다.
            </p>
            <span className={`${BUTTON} bg-[#dcaf8b]`}>
              <ArrowRightIcon className={ARROW} />
            </span>
            <Placeholder
              label="CCTV 설치 패키지 (200만 화소 돔 카메라 + DVR)"
              className="absolute bottom-[-20px] left-0 h-[200px] w-full lg:bottom-0 lg:h-[320px]"
            />
            <CardLink slug="install" />
          </Reveal>

          {/* 카드 2: AS 수리 — 회색 */}
          <Reveal threshold={0.1} className={`${CARD} order-3 h-[229px] bg-[#efefef] lg:h-[312px]`}>
            <div className={`${CHIP} bg-[#c8c8c8] text-white`}>{nameOf("as")}</div>
            <h3 className={`${TITLE} text-[#202020]`}>타사 제품도 어디든 방문 수리</h3>
            <p className={`${DESC} text-[#1d1d1f]`}>
              설치업체 연락 두절·책임회피로 곤란하셨다면,
              <br />
              의뢰 후 24시간 이내 방문 진단 및 수리
            </p>
            <span className={`${BUTTON} bg-[#c8c8c8]`}>
              <ArrowRightIcon className={ARROW} />
            </span>
            <CardLink slug="as" />
          </Reveal>

          {/* 카드 3: CCTV+스피커 — 주황 배경 */}
          <Reveal threshold={0.1} className={`${CARD} order-4 h-[229px] bg-brand text-[#fafafc] lg:h-[312px]`}>
            <div className={`${CHIP} bg-white/15 text-white`}>{nameOf("speaker")}</div>
            <h3 className={TITLE}>
              음향 시스템과 보안 솔루션을
              <br />한 번에 동시 시공
            </h3>
            <p className={DESC}>
              공사 기간 단축, 중복 공사비 절약,
              <br />
              일괄 관리로 유지보수까지 편리하게
            </p>
            <span className={`${BUTTON} bg-white/30`}>
              <ArrowRightIcon className={ARROW} />
            </span>
            <CardLink slug="speaker" />
          </Reveal>

          {/* 카드 4: CCTV 렌탈 — 전체 배경 이미지 + 상단 어두운 그라데이션 */}
          <Reveal threshold={0.1} className={`${CARD} order-2 h-[396px] text-white lg:h-[584px]`}>
            <span className="absolute left-0 top-0 z-[1] h-[247px] w-full bg-[linear-gradient(180deg,#0b0908_0%,rgba(11,9,8,0)_100%)] lg:h-[366px]" />
            <div className={`${CHIP} bg-white/10 text-white`}>{nameOf("rental")}</div>
            <h3 className={TITLE}>
              초기비용 0원, <br className="lg:hidden" />
              고객 소유 렌탈
            </h3>
            <p className={`${DESC} opacity-85`}>
              설치비·가입비·보증료 면제
              <br />
              카메라 소유권 처음부터 이전, A/S 완벽 제공
            </p>
            <span className={`${BUTTON} bg-black/[0.68]`}>
              <ArrowRightIcon className={ARROW} />
            </span>
            <Placeholder
              dark
              label="CCTV 렌탈 (초기비용 0원 / 최저가 월비용)"
              className="absolute bottom-0 left-0 z-0 h-full w-full"
            />
            <CardLink slug="rental" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
