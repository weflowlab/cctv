/**
 * 가이드북 다운로드 신청 페이지 본문 (원본 sc-8f1c24f0-0 래퍼)
 * - 서버 컴포넌트. 헤더 스크롤 연동/폼만 클라이언트.
 * - 레이아웃:
 *   · 연한 주황(#fff6f1) 배경이 헤더 밑까지 깔림 (음수 margin-top + 헤더 높이만큼 padding-top)
 *   · PC: [모델 이미지 | 폼 카드(최대 672px)] 가로 배치, gap 32px, 상단 여백 헤더+90px
 *   · 모바일: 세로 역순(폼 카드 위, 모델 이미지 아래), 좌우 20px, 상단 여백 헤더+24px
 * - 헤더: 스크롤 100px 미만 "transparent-black"(투명 + 검은 글자), 이후 흰 헤더.
 */
import ContactModel from "@/components/contact/ContactModel";
import DownloadRequestForm, { type DownloadRequestFormProps } from "./DownloadRequestForm";
import HeaderScrollStyle from "./HeaderScrollStyle";

export default function DownloadRequestSection(props: DownloadRequestFormProps) {
  return (
    <>
      {/* ===== 헤더 스타일: 상단에서는 투명+검은 글자, 100px 스크롤 후 흰색 ===== */}
      <HeaderScrollStyle threshold={100} topStyle="transparent-black" scrolledStyle="white" />

      {/* ===== 다운로드 신청 섹션: 모델 이미지(장식 SVG 포함) + 신청 폼 카드 ===== */}
      <div className="relative -mt-[var(--header-height-mobile)] flex w-full min-w-[360px] flex-auto flex-col-reverse items-center justify-start gap-[32px] bg-[#fff6f1] px-[20px] pt-[calc(var(--header-height-mobile)+24px)] lg:-mt-[var(--header-height)] lg:flex-[1_0_0] lg:flex-row lg:items-stretch lg:justify-center lg:px-0 lg:pt-[calc(var(--header-height)+90px)]">
        <ContactModel />
        <DownloadRequestForm {...props} />
      </div>
    </>
  );
}
