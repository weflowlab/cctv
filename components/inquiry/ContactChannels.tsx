/**
 * 보조 연락 수단 카드 (상담 신청 페이지 폼 옆/아래)
 * - 전화: SITE.phone (tel: 링크) / 카카오톡 상담: SITE.kakaoUrl (새 탭)
 * - PC: 폼 오른쪽 세로 배치 / 모바일: 폼 아래 세로 배치
 * - 동작: hover 시 테두리 브랜드색 + 위로 4px 이동
 */
import { SITE } from "@/lib/site";

const cardClass =
  "flex items-center gap-[16px] rounded-[20px] border border-transparent bg-white p-[24px] shadow-[0_10px_24px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:border-brand lg:p-[28px]";

export default function ContactChannels() {
  return (
    <div className="flex w-full flex-col gap-[12px] lg:gap-[16px]">
      {/* ===== 전화 상담 카드 ===== */}
      <a href={SITE.phoneHref} className={cardClass}>
        <span aria-hidden className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-brand-light text-[22px]">
          ☎
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-medium tracking-[-0.3px] text-[#888] lg:text-[14px]">전화 상담 · {SITE.hours}</span>
          <strong className="text-[22px] font-bold tracking-[-0.5px] text-[#222] lg:text-[26px]">{SITE.phone}</strong>
        </span>
      </a>

      {/* ===== 카카오톡 상담 카드 (새 탭) ===== */}
      <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        <span aria-hidden className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#fee500] text-[13px] font-bold text-[#3c1e1e]">
          TALK
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-medium tracking-[-0.3px] text-[#888] lg:text-[14px]">카카오톡 상담</span>
          <strong className="text-[18px] font-bold tracking-[-0.5px] text-[#222] lg:text-[20px]">오픈채팅으로 문의하기 ↗</strong>
        </span>
      </a>
    </div>
  );
}
