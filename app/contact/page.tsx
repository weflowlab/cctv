/**
 * /contact 페이지 — 키퍼 도입문의 (원본 https://keeper.ceo/contact, 진입경로 "도입문의")
 * - 서버 컴포넌트. 폼(ContactForm)과 헤더 스크롤 연동만 클라이언트.
 * - 레이아웃 (원본 sc-a4e9811a-0.minus-top-margin):
 *   · 연한 주황(#fff6f1) 배경이 헤더 밑까지 깔림 (음수 margin-top + 헤더 높이만큼 padding-top)
 *   · PC: 높이 867px, [모델 이미지 | 폼 카드] 가로 배치, gap 32px
 *   · 모바일: 세로 역순(폼 카드 위, 모델 이미지 아래), 좌우 20px
 * - 헤더: 스크롤 100px 미만 "transparent-black"(투명 + 검은 글자), 이후 흰 헤더.
 */
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactModel from "@/components/contact/ContactModel";
import HeaderScrollStyle from "@/components/faq/HeaderScrollStyle";

export const metadata: Metadata = {
  title: "키퍼 도입문의 | 한화비전 키퍼",
  description: "매장관리 올인원 솔루션 키퍼 도입 및 무료 방문 견적 상담 신청",
};

export default function ContactPage() {
  return (
    <>
      {/* ===== 헤더 스타일: 상단에서는 투명+검은 글자, 스크롤 후 흰색 ===== */}
      <HeaderScrollStyle threshold={100} topStyle="transparent-black" scrolledStyle="white" />

      {/* ===== 도입문의 섹션: 모델 이미지 + 빠른 상담 폼 ===== */}
      <div className="relative -mt-[var(--header-height-mobile)] flex h-auto w-full min-w-[360px] flex-auto flex-col-reverse items-center justify-start gap-[28px] overflow-hidden bg-[#fff6f1] px-[20px] pt-[calc(var(--header-height-mobile)+24px)] lg:-mt-[var(--header-height)] lg:h-[867px] lg:flex-[1_0_0] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[32px] lg:px-0 lg:pt-[calc(var(--header-height)+90px)]">
        <ContactModel />
        <ContactForm />
      </div>
    </>
  );
}
