/**
 * 보조 연락 수단 카드 (상담 신청 페이지 폼 옆/아래)
 * - 전화: SITE.phone (tel: 링크) / 카카오톡 상담: SITE.kakaoUrl (새 탭)
 * - PC: 폼 오른쪽 세로 배치 / 모바일: 폼 아래 세로 배치
 * - 아이콘: 플로팅 버튼과 같은 모양 (전화 = 흰 원 + 네이비 수화기 / 카카오 = 노란 원 + 말풍선)
 * - 굵은 글씨: 번호 19/21px, 오픈채팅 문구는 글자 수가 많아 살짝 작게 18/20px (눈으로 보는 무게를 맞춤)
 * - 동작: hover 시 테두리 브랜드색 + 위로 4px 이동
 */
import { KakaoIcon, PhoneIcon } from "@/components/common/contactIcons";
import { SITE } from "@/lib/site";

/** 카드 아이콘 원 (플로팅 버튼 축소판) */
const iconCircle = "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]";
/** 카드 굵은 글씨 — 전화번호 / 오픈채팅 문구(글자가 많아 한 단계 작게) */
const mainText = "font-bold tracking-[-0.5px] text-[#222]";

const cardClass =
  "flex items-center gap-[16px] rounded-[20px] border border-transparent bg-white p-[24px] shadow-[0_10px_24px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:border-brand lg:p-[28px]";

export default function ContactChannels() {
  return (
    <div className="flex w-full flex-col gap-[12px] lg:gap-[16px]">
      {/* ===== 전화 상담 카드 ===== */}
      <a href={SITE.phoneHref} className={cardClass}>
        <span className={`${iconCircle} border border-[#e5e5e5] bg-white`}>
          <PhoneIcon className="h-[24px] w-[24px] fill-brand stroke-brand" stroke={2.4} />
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-medium tracking-[-0.3px] text-[#888] lg:text-[14px]">전화 상담 · {SITE.hours}</span>
          <strong className={`${mainText} text-[19px] lg:text-[21px]`}>{SITE.phone}</strong>
        </span>
      </a>

      {/* ===== 카카오톡 상담 카드 (새 탭) ===== */}
      <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        <span className={`${iconCircle} bg-[#FEE500]`}>
          <KakaoIcon className="h-[24px] w-[26px] translate-y-[1px]" />
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-medium tracking-[-0.3px] text-[#888] lg:text-[14px]">카카오톡 상담</span>
          <strong className={`${mainText} text-[18px] lg:text-[20px]`}>오픈채팅으로 문의하기 ↗</strong>
        </span>
      </a>
    </div>
  );
}
