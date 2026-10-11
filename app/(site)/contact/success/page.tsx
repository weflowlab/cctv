/**
 * /contact/success — 상담 신청 완료 화면 (weflow /diagnosis/success 와 같은 구성)
 * - 상담 신청 폼(InquiryForm)이 접수에 성공하면 이 주소로 이동한다 (팝업 대신)
 * - 주소를 따로 두면 뒤로가기·새로고침이 자연스럽고, 유입 관리에서 "완료까지 간 사람"을 이 주소로 셀 수 있다
 * - 신청 없이 주소로 바로 들어와도 깨지지 않는다 — 고정 안내 문구뿐
 * - 구성: 초록 체크 → "상담 신청 완료!" → 안내 → [바로 전화하기] [다시 신청하기]
 */
import type { Metadata } from "next";
import Link from "next/link";
import { PhoneIcon } from "@/components/common/contactIcons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `상담 신청 완료 | ${SITE.name}`,
  // 검색에 뜰 이유가 없는 페이지 — 신청서(/contact)가 대신 잡혀야 한다
  robots: { index: false, follow: false },
};

export default function ContactSuccessPage() {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center px-[16px] py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[460px] flex-col items-center text-center">
        {/* ===== 완료 체크 ===== */}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#dcfce7] lg:h-[88px] lg:w-[88px]">
          <svg viewBox="0 0 24 24" fill="none" className="h-[34px] w-[34px] text-[#16a34a] lg:h-[40px] lg:w-[40px]" aria-hidden>
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="mt-[24px] text-[26px] font-bold tracking-[-0.8px] text-[#222] lg:mt-[32px] lg:text-[40px]">상담 신청 완료!</h1>
        <p className="mt-[14px] break-keep text-[15px] leading-[1.8] tracking-[-0.3px] text-sub lg:mt-[18px] lg:text-[18px]">
          담당자가 확인 후 <strong className="font-bold text-[#222]">빠르게 연락</strong>드리겠습니다.
          <br />
          {SITE.hours} 상담 가능합니다.
        </p>

        {/* ===== 버튼 2개 — 글자 길이에 맞춘 같은 너비 (긴 쪽 기준) ===== */}
        <div className="mt-[28px] inline-grid auto-cols-fr grid-flow-col gap-[10px] lg:mt-[36px] lg:gap-[12px]">
          <a
            href={SITE.phoneHref}
            className="flex h-[52px] items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] bg-brand px-[22px] lg:px-[28px] text-[15px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-brand-strong lg:h-[56px] lg:text-[17px]"
          >
            <PhoneIcon className="h-[16px] w-[16px] fill-white stroke-white lg:h-[18px] lg:w-[18px]" stroke={1} />
            바로 전화하기
          </a>
          <Link
            href="/contact"
            className="flex h-[52px] items-center justify-center whitespace-nowrap rounded-[10px] border border-brand px-[22px] lg:px-[28px] bg-white text-[15px] font-bold tracking-[-0.3px] text-brand transition-colors hover:bg-brand-light lg:h-[56px] lg:text-[17px]"
          >
            다시 신청하기
          </Link>
        </div>
      </div>
    </section>
  );
}
