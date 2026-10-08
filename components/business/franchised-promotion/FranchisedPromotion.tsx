/**
 * 프랜차이즈 특별 혜택 상담 신청 화면 (서버 컴포넌트)
 * - 원본 /contact/franchised-promotion 은 공용 상담 폼(entryPoint "프랜차이즈_혜택",
 *   redirectPathAfterFormSubmit "/story")을 그대로 렌더한다.
 *   → /contact(도입문의)와 마크업·동작이 동일하므로 contact 담당 컴포넌트를 import 해서 재사용
 *     · ContactModel : 좌측(모바일 하단) 모델 이미지 + 하단 그라데이션
 *     · ContactForm  : 성함·연락처(자동 하이픈)·동의 검증 → 성공 팝업 2초 → /story 이동
 * - 레이아웃 (원본 sc-a4e9811a-0.minus-top-margin): 연주황 배경이 헤더 밑까지 깔림,
 *   PC 높이 867px 가로 배치 / 모바일 세로 역순
 */
import ContactForm from "@/components/contact/ContactForm";
import ContactModel from "@/components/contact/ContactModel";
import PromotionHeaderStyle from "./PromotionHeaderStyle";

export default function FranchisedPromotion() {
  return (
    <>
      {/* ===== 헤더: 상단 투명+검은 글자 → 스크롤 100px 이후 흰색 ===== */}
      <PromotionHeaderStyle />

      {/* ===== 상담 신청 섹션: 모델 이미지 + 빠른 상담 폼 ===== */}
      {/* TODO: API 연동 시 진입경로를 "프랜차이즈_혜택" 으로 전송해야 함 (현재 ContactForm 은 전송 없이 성공 UI 만) */}
      <div className="relative mt-[calc(-1*var(--header-height-mobile))] flex h-auto w-full min-w-[360px] flex-auto flex-col-reverse items-center justify-start gap-[28px] overflow-hidden bg-[#fff6f1] px-[20px] pt-[calc(var(--header-height-mobile)+24px)] lg:mt-[calc(-1*var(--header-height))] lg:h-[867px] lg:flex-[1_0_0] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[32px] lg:px-0 lg:pt-[calc(var(--header-height)+90px)]">
        <ContactModel />
        <ContactForm />
      </div>
    </>
  );
}
