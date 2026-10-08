/**
 * /contact 페이지 — 상담 신청 (keeper 도입문의 틀 + 기존 사이트 견적문의 필드)
 * - 서버 컴포넌트. 폼(InquiryForm)과 헤더 스크롤 연동만 클라이언트.
 * - 레이아웃:
 *   · 연한 주황(#fff6f1) 배경이 헤더 밑까지 깔림 (음수 margin-top + 헤더 높이만큼 padding-top)
 *   · PC: [폼 카드 | 보조 연락수단 카드] 가로 배치 / 모바일: 폼 아래 연락수단 카드
 * - 헤더: 스크롤 100px 미만 "transparent-black"(투명 + 검은 글자), 이후 흰 헤더.
 * - 이 페이지 자체가 상담 폼이므로 ConsultCta 는 넣지 않음.
 */
import type { Metadata } from "next";
import ContactChannels from "@/components/inquiry/ContactChannels";
import InquiryForm from "@/components/inquiry/InquiryForm";
import HeaderScrollStyle from "@/components/support-faq/HeaderScrollStyle";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `상담 신청 | ${SITE.name}`,
  description: "CCTV 설치·수리·렌탈 견적을 부담 없이 문의해 주세요.",
};

export default function ContactPage() {
  return (
    <>
      {/* ===== 헤더 스타일: 상단에서는 투명+검은 글자, 스크롤 후 흰색 ===== */}
      <HeaderScrollStyle threshold={100} topStyle="transparent-black" scrolledStyle="white" />

      {/* ===== 상담 신청 섹션: 폼 카드 + 보조 연락수단 ===== */}
      <section className="relative -mt-[var(--header-height-mobile)] w-full min-w-[360px] bg-[#fff6f1] px-[16px] pb-[80px] pt-[calc(var(--header-height-mobile)+24px)] lg:-mt-[var(--header-height)] lg:pb-[140px] lg:pt-[calc(var(--header-height)+90px)]">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-[16px] lg:flex-row lg:items-start lg:gap-[32px]">
          <div className="w-full lg:flex-1">
            <InquiryForm />
          </div>
          <aside className="w-full lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:w-[360px] lg:shrink-0">
            <ContactChannels />
          </aside>
        </div>
      </section>
    </>
  );
}
