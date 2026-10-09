/**
 * /service/install — CCTV 설치 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 "CCTV 설치 패키지" 페이지
 * - 구성: 히어로 → 패키지·가격(화소/장소 토글) → 시공절차 4단계 → 제휴·대량 도입 문의 → 렌탈 교차 링크
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import InstallPackages from "./InstallPackages";
import { INSTALL_STEPS } from "./data";
import { ArrowIcon, CrossLink, SectionHeading, SpaceOrBreak } from "./ui";

export default function InstallTab() {
  return (
    <>
      {/* ===== 히어로: 초특가 패키지 카피 (keeper employee 히어로 톤, 크림 배경) ===== */}
      <section className="bg-point-light px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="text-center lg:text-left">
            <p className="text-[14px] font-bold tracking-[-0.28px] text-point-strong lg:text-[18px]">CCTV 설치</p>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[46px] lg:tracking-[-2px] [&>strong]:text-point-strong">
              CCTV 설치
              <br />
              <strong>초특가 패키지</strong>
            </h2>
            <p className="mt-[12px] text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] lg:mt-[16px] lg:text-[20px] lg:tracking-[-0.44px]">
              깔끔한 공사부터 유지보수까지 확실한,
              <SpaceOrBreak />
              {SITE.name}의 특가 이벤트 패키지입니다.
            </p>
            <p className="mt-[8px] text-[13px] leading-[1.6] tracking-[-0.26px] text-[#888] lg:text-[16px]">
              큰 규모의 공사 및 정보통신공사는 별도 문의 부탁드립니다.
            </p>
          </div>
          <Placeholder
            label="CCTV 설치 히어로 이미지 (원본 별도 이미지 없음 — 시공 사진 등으로 교체)"
            className="aspect-[4/3] w-full max-w-[480px] rounded-[20px] lg:w-[480px]"
          />
        </div>
      </section>

      {/* ===== 패키지·가격: 화소/장소 토글 + 1~4대 카드 (클라이언트) ===== */}
      <InstallPackages />

      {/* ===== 시공절차: 4단계 카드 (원본 이미지 속 문구를 텍스트로) / 순차 slide-up ===== */}
      <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="PROCESS" title="시공절차" />
          <ol className="mt-[32px] grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:mt-[64px] lg:grid-cols-4 lg:gap-[20px]">
            {INSTALL_STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 150} className="overflow-hidden rounded-[16px] bg-white">
                <Placeholder label={`STEP${i + 1}. ${step.title} (원본 ${step.img})`} className="aspect-[3/2] w-full border-0 border-b" />
                <div className="px-[20px] pb-[24px] pt-[18px]">
                  <p className="text-[13px] font-bold tracking-[-0.26px] text-point-strong lg:text-[15px]">STEP {i + 1}</p>
                  <h3 className="mt-[4px] text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-[#222] lg:text-[22px] lg:leading-[32px]">
                    {step.title}
                  </h3>
                  <p className="mt-[6px] text-[14px] leading-[22px] tracking-[-0.28px] text-[#666] lg:text-[16px] lg:leading-[24px]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 제휴·대량 도입 문의: 프랜차이즈/기업 대량 설치 → /contact?type=business ===== */}
      <section className="bg-white px-[16px] pb-[24px] pt-[60px] lg:px-0 lg:pb-[40px] lg:pt-[120px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[20px] rounded-[20px] bg-[#222] px-[24px] py-[36px] text-center lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:px-[64px] lg:py-[56px] lg:text-left">
          <div>
            <p className="text-[14px] font-bold tracking-[-0.28px] text-point-strong lg:text-[16px]">제휴 · 대량 도입 문의</p>
            <h2 className="mt-[8px] text-[22px] font-bold leading-[32px] tracking-[-0.44px] text-white lg:text-[32px] lg:leading-[46px] lg:tracking-[-0.8px]">
              프랜차이즈 · 기업 대량 설치는
              <SpaceOrBreak />
              별도로 상담해 드립니다
            </h2>
            <p className="mt-[10px] text-[14px] leading-[22px] tracking-[-0.28px] text-white/70 lg:text-[17px] lg:leading-[26px]">
              소규모부터 대규모 현장까지 맞춤 설계·시공·정보통신 공사
            </p>
          </div>
          <Link
            href="/contact?type=business"
            className="inline-flex shrink-0 items-center justify-center gap-[8px] rounded-[100px] bg-brand py-[14px] pl-[24px] pr-[22px] text-[16px] font-bold leading-[1.2] tracking-[-0.32px] text-white transition-colors hover:bg-brand-strong lg:text-[18px]"
          >
            <span>대량 도입 문의하기</span>
            <ArrowIcon className="h-[14px] w-[14px]" />
          </Link>
        </div>
      </section>

      {/* ===== 교차 링크: 렌탈 탭 ===== */}
      <CrossLink href="/service/rental" caption="초기 비용이 부담된다면?" label="월 납부 CCTV 렌탈도 확인해 보세요" />
    </>
  );
}
