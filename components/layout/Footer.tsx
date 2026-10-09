/**
 * 전역 푸터 + 플로팅 상담 버튼
 * - keeper 푸터 레이아웃 그대로: 로고, 회사 정보(상호/대표/사업자번호/주소) | 통합콜센터 번호,
 *   약관 링크 3개, 카피라이트. 값은 모두 SITE(@/lib/site) 에서 가져온다.
 * - PC: 회사정보(폭 560px) | 문의번호 가로 배치 / 모바일(≤1023px): 세로 배치 + 작은 글자.
 * - 서버 컴포넌트. 카피라이트 연도(현재 연도)는 Cache Components 규칙상 "use cache" 로 계산.
 * - app/layout.tsx 를 건드리지 않기 위해 모든 페이지 공통 플로팅 버튼(FloatingContact)도 여기서 렌더.
 */
import Link from "next/link";
import FloatingContact from "@/components/common/FloatingContact";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

/** 정보 사이 세로 구분선 */
function Divider() {
  return (
    <span className="relative top-[1px] mx-[6px] inline-block h-[9px] w-px bg-[#dedede] lg:top-[2px] lg:mx-[8px] lg:h-[14px]" />
  );
}

/** 문의 번호 한 줄 (라벨 / 번호 / 부가설명) */
function ContactLine({ label, phone, href, note }: { label: string; phone: string; href: string; note?: string }) {
  return (
    <div className="flex items-center text-[12px] leading-[1.5] tracking-[-1px] text-[#666] lg:text-[16px]">
      <strong className="mr-[6px] font-bold text-[#333]">{label}</strong>
      <a href={href} className="text-[#666] no-underline">
        {phone}
      </a>
      {note && (
        <span className="ml-[4px] text-[10px] leading-[1.4] tracking-[-0.2px] text-[#999] lg:ml-[6px] lg:text-[15px] lg:leading-[1.5] lg:tracking-[-0.3px]">
          {note}
        </span>
      )}
    </div>
  );
}

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

          <div className="mt-[20px] block w-full lg:flex">
            {/* ===== 회사 정보: 상호 / 대표 / 사업자등록번호 / 주소 ===== */}
            <div className="flex shrink-0 basis-[560px] flex-col gap-[4px] text-[11px] font-normal leading-[1.4] tracking-[-1px] text-[#333] lg:text-[14px] lg:leading-[22px] [&_a]:text-[#333] [&_a]:no-underline">
              <div>
                <span>상호 : {SITE.legalName}</span>
                <Divider />
                <span>대표 : {SITE.ceo}</span>
              </div>
              <div>
                <span>사업자 등록번호 : {SITE.bizNumber}</span>{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${SITE.bizNumber.replace(/-/g, "")}`}
                >
                  [사업자 정보 확인]
                </a>
              </div>
              <div>주소 : {SITE.address}</div>
            </div>

            {/* ===== 통합콜센터 번호 ===== */}
            <div className="mt-[20px] grow space-y-[8px] lg:mt-0">
              <ContactLine label="대표전화" phone={SITE.phone} href={SITE.phoneHref} note={SITE.hours} />
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
