/**
 * 전역 푸터 (원본 layout 청크의 `eZ` 컴포넌트, sc-1776113b)
 * - 한화비전 로고, 회사 정보(대표/사업자번호/통신판매업/주소/개인정보 책임자), 구매·A/S 문의 번호,
 *   약관 링크 3개, 카피라이트.
 * - PC: 회사정보(폭 560px) | 문의번호 가로 배치 / 모바일(≤1023px): 세로 배치 + 작은 글자.
 * - 서버 컴포넌트. 카피라이트 연도(현재 연도)는 Cache Components 규칙상 "use cache" 로 계산.
 * - 경로별 노출/하단 고정 상담바 제어는 클라이언트 FooterShell 이 담당.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import FooterShell from "./FooterShell";

/** 원본 eR: 정보 사이 세로 구분선 */
function Divider() {
  return (
    <span className="relative top-[1px] mx-[6px] inline-block h-[9px] w-px bg-[#dedede] lg:top-[2px] lg:mx-[8px] lg:h-[14px]" />
  );
}

/** 원본 eN: 문의 번호 한 줄 (라벨 / 번호 / 운영시간) */
function ContactLine({ label, phone, hours }: { label: string; phone: string; hours: string }) {
  return (
    <div className="flex items-center text-[12px] leading-[1.5] tracking-[-1px] text-[#666] lg:text-[16px]">
      <strong className="mr-[6px] font-bold text-[#333]">{label}</strong>
      <span>{phone}</span>
      <span className="ml-[4px] text-[10px] leading-[1.4] tracking-[-0.2px] text-[#999] lg:ml-[6px] lg:text-[15px] lg:leading-[1.5] lg:tracking-[-0.3px]">
        {hours}
      </span>
    </div>
  );
}

export default async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <FooterShell>
      <div className="mx-auto w-full max-w-[1080px] bg-white px-[16px] py-[38px] lg:px-[20px] lg:pb-[60px] lg:pt-[52px]">
        {/* ===== 한화비전 로고 ===== */}
        <Placeholder label="한화비전" className="h-[36px] w-[218px] rounded-[4px]" />

        <div className="mt-[20px] block w-full lg:flex">
          {/* ===== 회사 정보 ===== */}
          <div className="flex shrink-0 basis-[560px] flex-col gap-[4px] text-[11px] font-normal leading-[1.4] tracking-[-1px] text-[#333] lg:text-[14px] lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
            <div>
              <span>대표 : 김기철</span>
              <Divider />
              <span>사업자 등록번호 : 680-86-03414</span>{" "}
              <a target="_blank" rel="noreferrer" href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6808603414">
                [사업자 정보 확인]
              </a>
            </div>
            <div>
              <span>통신판매업 신고번호: 제 2025-성남분당A-0113호</span>
            </div>
            <div>주소 : 경기도 성남시 분당구 판교로 319번길 6 (삼평동)</div>
            <div>
              <span>개인정보 보호책임자 : 김현섭</span>
              <Divider />
              <span>이메일 : privacy.htw@hanwha.com</span>
            </div>
          </div>

          {/* ===== 구매 / A/S 문의 번호 ===== */}
          <div className="mt-[20px] grow space-y-[8px] lg:mt-0">
            <ContactLine label="키퍼 구매문의" phone="1670-5773" hours="09:00~18:00 (월~금)" />
            <ContactLine label="제품 A/S문의" phone="1670-5772" hours="09:00 ~ 22:00 (365일 연중무휴)" />
          </div>
        </div>

        {/* ===== 약관 링크 + 카피라이트 ===== */}
        <div className="mt-[27px]">
          <div className="flex flex-wrap gap-[13px] text-[11px] font-medium leading-[1.4] tracking-[-0.3px] text-[#333] lg:gap-[32px] lg:text-[14px] lg:font-normal lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
            <Link href="/terms/service">
              <span>서비스이용약관</span>
            </Link>
            <Link href="/terms/personal">
              <strong>개인정보처리방침</strong>
            </Link>
            <Link href="/terms/location">
              <span>위치정보 이용약관</span>
            </Link>
          </div>
          <div className="mt-[16px] text-[11px] leading-[1.4] tracking-[-0.22px] text-[#8e9097] lg:mt-[12px] lg:text-[14px] lg:leading-[22px] lg:tracking-[-0.3px] lg:text-[#888]">
            © {year} Hanwha Vision Co., Ltd. All rights Reserved.
          </div>
        </div>
      </div>
    </FooterShell>
  );
}
