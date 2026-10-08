/**
 * 매장 관리 올인원 섹션 (원본 k 컴포넌트, sc-8f600f56)
 * - "매장 관리 올인원" 칩 + 헤드라인 + 기능 카드 2개(매장 보안 / 직원 관리).
 * - 카드 전체가 클릭 영역 (원본 div onClick → router.push) → 여기서는 Link 로 동일 이동.
 *   매장 보안 → /security, 직원 관리 → /new-service/employee-contract
 * - PC: 가로 2열 / 모바일: 세로 1열(최대 480px).
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { EmployeeIcon, SecurityIcon } from "./icons";

export default function AllInOne() {
  const cardClass = "flex flex-[1_0_0] cursor-pointer flex-col rounded-[20px]";
  const bodyClass =
    "relative flex flex-col items-start self-stretch rounded-b-[20px] border border-t-0 border-[#e8e8e8] px-[26px] py-[16px] lg:px-[40px] lg:py-[24px]";
  const iconClass = "h-[28px] w-[28px] lg:h-[38px] lg:w-[38px]";
  const titleClass =
    "mb-[2px] mt-[10px] text-[18px] font-bold leading-[24.686px] tracking-[-0.18px] text-[#222] lg:mt-[6px] lg:text-[24px] lg:leading-[38px] lg:tracking-[-0.24px]";
  const descClass =
    "text-[14px] font-normal leading-[16.89px] tracking-[-0.325px] text-[#666] lg:text-[18px] lg:leading-[26px] lg:tracking-[-0.5px]";

  return (
    // ===== 매장 관리 올인원: 흰 배경 =====
    <section className="flex h-full w-full justify-center bg-white px-[16px] py-[50px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더 ===== */}
        <div className="mb-[40px] flex flex-col items-center justify-center gap-[16px] lg:mb-[60px] lg:gap-[20px]">
          <strong className="rounded-[100px] bg-brand-light px-[12px] py-[8px] text-center text-[13px] font-medium text-brand lg:px-[16px] lg:text-[16px]">
            매장 관리 올인원
          </strong>
          <h2 className="text-center text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
            매장보안과 직원 근태관리를 <br className="lg:hidden" />
            APP 하나로!
            <br />
            매장관리 올인원 솔루션, <strong className="text-brand">키퍼</strong>
          </h2>
        </div>

        {/* ===== 기능 카드 2개 ===== */}
        <div className="flex w-full max-w-[480px] flex-col gap-[20px] lg:max-w-none lg:flex-row lg:gap-[24px]">
          {/* 매장 보안 → /security */}
          <Link href="/security" className={cardClass}>
            <Placeholder label="한화비전 문열림 감지" className="aspect-[528/300] w-full rounded-t-[20px]" />
            <div className={bodyClass}>
              <div className="svg-wrap">
                <SecurityIcon className={iconClass} />
              </div>
              <h3 className={titleClass}>매장 보안</h3>
              <p className={descClass}>글로벌 보안 기술력으로 완성하는 매장 안심 CCTV</p>
            </div>
          </Link>

          {/* 직원 관리 → /new-service/employee-contract (우상단 "무료 서비스" 칩) */}
          <Link href="/new-service/employee-contract" className={cardClass}>
            <Placeholder label="한화비전 문열림 감지" className="aspect-[528/300] w-full rounded-t-[20px]" />
            <div className={bodyClass}>
              <div className="svg-wrap">
                <EmployeeIcon className={iconClass} />
                <div className="absolute right-[17px] top-[19px] flex items-center justify-center rounded-[74.769px] bg-[rgba(255,92,0,0.08)] px-[8px] py-[2px] text-[10px] font-medium leading-[2.01] tracking-[-0.35px] text-brand lg:right-[26px] lg:top-[27px] lg:rounded-[100px] lg:px-[10px] lg:text-[13px] lg:leading-[26.205px] lg:tracking-[-0.468px]">
                  무료 서비스
                </div>
              </div>
              <h3 className={titleClass}>직원 관리</h3>
              <p className={descClass}>서류 작업이 사라지는 매장직원 계약 및 근태 서비스</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
