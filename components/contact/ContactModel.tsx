/**
 * 도입문의 페이지 모델 이미지 영역 (원본 sc-6f6088f0-0, type="long")
 * - 모델 사진 + 손글씨 장식 SVG 2개(주황 122x81, 베이지 113x55)를 우측 상단에 겹쳐 배치.
 * - PC: 이미지 폭 512px(원본 912x1760), 하단 349px 구간을 배경색(#fff6f1)으로 페이드 아웃하는 그라데이션.
 * - 모바일: 이미지 높이 300px(원본 399x449), 그라데이션 없음, 장식 위치/회전 변경.
 */
import Placeholder from "@/components/common/Placeholder";

export default function ContactModel() {
  return (
    <div className="relative mb-[-1px] h-max lg:after:absolute lg:after:bottom-0 lg:after:left-[-40px] lg:after:h-[349px] lg:after:w-full lg:after:bg-[linear-gradient(180deg,rgba(255,246,241,0)_0%,#fff6f1_75.64%)] lg:after:content-['']">
      {/* ===== 모델 이미지 (원본 picture: 모바일 form_model_mb / PC form_model_pc) ===== */}
      <Placeholder label="모델 안내 이미지" className="h-[300px] w-[267px] lg:h-[988px] lg:w-[512px]" />

      {/* ===== 장식 1: 주황 손글씨 화살표 (원본 인라인 SVG 122x81) ===== */}
      <div className="absolute right-[8px] top-[64px] z-[1] lg:right-[66px] lg:top-[120px]">
        <Placeholder label="주황 손글씨 장식" kind="icon" className="h-[54px] w-[81px] lg:h-[81px] lg:w-[122px]" />
      </div>

      {/* ===== 장식 2: 베이지 손글씨 (원본 인라인 SVG 113x55, 모바일은 -60deg 회전 + 좌우 반전) ===== */}
      <div className="absolute right-[12px] top-[12px] z-[1] -scale-x-100 -rotate-60 lg:right-0 lg:top-[66px] lg:scale-x-100 lg:rotate-0">
        <Placeholder label="베이지 손글씨 장식" kind="icon" className="h-[38px] w-[78.5px] lg:h-[55px] lg:w-[113px]" />
      </div>
    </div>
  );
}
