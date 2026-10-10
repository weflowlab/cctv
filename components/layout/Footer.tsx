/**
 * 전역 푸터 + 플로팅 상담 버튼
 * - 로고 → 운영 시간(24시간 연중무휴, 네이비 강조) → 상호 / 대표 / 사업자번호 / 주소 / 대표전화 (PC·모바일 모두 한 줄씩)
 *   약관 링크 3개, 카피라이트. 값은 모두 SITE(@/lib/site) 에서 가져온다.
 * - PC·모바일 같은 세로 배치, 모바일(≤1023px)은 글자만 작게.
 * - 서버 컴포넌트. 카피라이트 연도(현재 연도)는 Cache Components 규칙상 "use cache" 로 계산.
 * - app/layout.tsx 를 건드리지 않기 위해 모든 페이지 공통 플로팅 버튼(FloatingContact)도 여기서 렌더.
 */
import Link from "next/link";
import FloatingContact from "@/components/common/FloatingContact";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

/** 카피라이트 연도 — Cache Components 규칙상 현재 시각 읽기는 캐시 함수 안에서만 */
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <>
      <footer id="footer-main" className="relative border-t border-[#f0f0f0]">
        <div className="mx-auto w-full max-w-[1080px] bg-white px-[16px] py-[38px] lg:px-[20px] lg:pb-[60px] lg:pt-[52px]">
          {/* ===== 로고 (영문 텍스트, 누르면 홈) ===== */}
          <Logo size="footer" />

          {/* ===== 운영 시간 + 회사 정보: PC·모바일 모두 한 줄에 하나씩 ===== */}
          <div className="mt-[20px] flex flex-col gap-[4px] text-[11px] font-normal leading-[1.4] tracking-[-0.3px] text-[#333] lg:mt-[24px] lg:gap-[6px] lg:text-[14px] lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
            {/* 운영 시간: 맨 위, 브랜드 네이비로 강조 */}
            <div className="mb-[4px] text-[13px] font-bold tracking-[-0.3px] text-brand lg:text-[15px]">{SITE.hours}</div>
            <div>상호 : {SITE.legalName}</div>
            <div>대표 : {SITE.ceo}</div>
            <div>사업자 등록번호 : {SITE.bizNumber}</div>
            <div>주소 : {SITE.address}</div>
            <div>
              대표전화 : <a href={SITE.phoneHref}>{SITE.phone}</a>
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
              © {year} {SITE.legalName}. All rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* ===== 플로팅 상담 버튼 (카카오톡 / 전화 / 맨 위로) ===== */}
      <FloatingContact />
    </>
  );
}
