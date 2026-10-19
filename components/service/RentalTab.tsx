/**
 * /service/rental — CCTV 렌탈 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 "CCTV 렌탈" 페이지 + 홈의 "렌탈 할부 통합 공식 가입 센터" 블록
 * - 구성: 히어로 → 혜택 7가지 → 렌탈 월 요금 슬라이더(원본 표-1.jpg 요금을 대수별로) + 견적 계산기 배너 → 진행 5단계(자동 진행)
 *         → 렌탈 통합 가입 센터 + 파트너 로고(기존 회사 자료 — LEGACY.partners 로 숨김) → 일시납(설치) 교차 링크
 */
import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { LEGACY, SITE } from "@/lib/site";
import RentalSlider from "./RentalSlider";
import RentalSteps from "./RentalSteps";
import { RENTAL_BENEFITS, RENTAL_PARTNERS } from "./data";
import { CrossLink, SectionHeading, SpaceOrBreak } from "./ui";
import Eyebrow from "@/components/common/Eyebrow";

/** 렌탈 혜택 7가지 카드 사진 (RENTAL_BENEFITS 순서와 동일) — 혜택 1~4 는 스톡 사진(CC0), 5·6·7 은 실제 시공 사진 */
const BENEFIT_PHOTOS = [
  { src: "/images/stock/rental-benefit1-coins.webp", alt: "테이블 위에 쌓인 동전" }, // 설치비/가입비/보증료 면제 (스톡)
  { src: "/images/stock/rental-benefit2-handshake.webp", alt: "악수를 청하며 손을 내민 정장 차림의 남성" }, // 소유권 이전 (스톡)
  { src: "/images/stock/rental-benefit3-toolkit.webp", alt: "나무 바닥 위에 가지런히 놓인 공구들" }, // A/S 서비스 (스톡)
  { src: "/images/stock/rental-benefit4-dome-camera.webp", alt: "무늬 천장에 설치된 돔형 카메라" }, // 국내 인증 제품 (스톡)
  { src: "/images/site/rental-benefit5-ptz-dome.webp", alt: "항구에 설치된 고급형 PTZ 돔 카메라" }, // FULL HD 최고급형 카메라 (평택항)
  { src: "/images/site/rental-benefit6-phone-app.webp", alt: "스마트폰 앱으로 매장 CCTV 화면을 보는 모습" }, // 전용 앱 모니터링 (안산 매장)
  { src: "/images/site/monitor-wall.webp", alt: "벽에 걸린 여러 대의 CCTV 모니터" }, // 24시간 영상 확인 (남양주 빌딩)
];

export default function RentalTab() {
  return (
    <>
      {/* ===== 히어로: 고객소유 렌탈 할부 서비스 ===== */}
      <section className="bg-point-light px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="text-center lg:text-left">
            <Eyebrow align="left" className="mb-[6px] max-lg:items-center">Rental</Eyebrow>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[46px] lg:tracking-[-2px] [&>strong]:text-point-strong">
              <strong>고객소유</strong>의
              <br />
              렌탈 할부 서비스
            </h2>
            <p className="mt-[12px] text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] lg:mt-[16px] lg:text-[20px] lg:tracking-[-0.44px]">
              초기비용 0원과 최저가 월비용으로
              <SpaceOrBreak />
              목돈 부담 없이 설치하세요.
            </p>
          </div>
          {/* 실제 시공 사진 (관리자 시공사례 — 오산 물류창고): public/images/site/rental-hero-dome-closeup.webp */}
          <div className="relative aspect-[4/3] w-full max-w-[480px] shrink-0 overflow-hidden rounded-[20px] lg:w-[480px]">
            <Image
              src="/images/site/rental-hero-dome-closeup.webp"
              alt="흰 벽에 설치된 돔형 CCTV 카메라 클로즈업"
              fill
              sizes="(min-width: 512px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== 혜택 7가지: 이미지 카드 그리드 (PC 위 3개 · 아래 4개 — 12칸 격자에서 4칸/3칸씩 / 모바일: 혜택 1 큰 카드 + 2열), 순차 slide-up ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="BENEFIT" title={<>{SITE.name} 렌탈 <strong>혜택 7가지</strong></>} />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-12 lg:gap-[20px]">
            {RENTAL_BENEFITS.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={(i < 3 ? i : i - 3) * 120}
                className={`overflow-hidden rounded-[14px] bg-[#f6f7fa] ${i === 0 ? "col-span-2 lg:col-span-4" : i < 3 ? "lg:col-span-4" : "lg:col-span-3"}`}
              >
                {/* 사진: BENEFIT_PHOTOS (혜택 1~4 스톡 / 5·6·7 실제 시공 사진 public/images/site/rental-*.webp) */}
                {/* 혜택 1(첫 카드)은 모바일에서 2칸 큰 카드 → 사진 비율을 가로로 넓게 (AS 탭 솔루션 섹션과 같은 방식) */}
                <div className={`relative w-full ${i === 0 ? "aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/3]"}`}>
                  <Image
                    src={BENEFIT_PHOTOS[i].src}
                    alt={BENEFIT_PHOTOS[i].alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 347px, (min-width: 580px) 580px, 100vw" : "(min-width: 1024px) 347px, (min-width: 580px) 285px, 50vw"}
                    className="object-cover"
                  />
                </div>
                <div className="px-[14px] pb-[18px] pt-[14px] lg:px-[20px] lg:pb-[24px] lg:pt-[18px]">
                  <p className="text-[12px] font-bold tracking-[-0.24px] text-point-strong lg:text-[14px]">혜택 {i + 1}</p>
                  <h3 className="mt-[4px] text-[15px] font-bold leading-[22px] tracking-[-0.3px] text-[#222] lg:text-[18px] lg:leading-[26px]">
                    {b.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 렌탈 월 요금: 대수 슬라이더 + 자사/타사 비교 + 견적 계산기 배너 (클라이언트) ===== */}
      <RentalSlider />

      {/* ===== 진행 과정 5단계: 자동 진행 하이라이트 (클라이언트) ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="PROCESS" title="렌탈 서비스 진행 과정" />
          <RentalSteps />
        </div>
      </section>

      {/* ===== 렌탈 할부 통합 공식 가입 센터 + 제휴 브랜드 로고 (원본 홈 블록)
           기존 회사(대한민국CCTV) 제휴 자료 → LEGACY.partners 가 true 일 때만 표시 ===== */}
      {LEGACY.partners && (
      <section className="bg-[#f6f7fa] py-[60px] lg:py-[120px]">
        <div className="mx-auto w-full max-w-[612px] px-[16px] lg:w-[1080px] lg:max-w-none lg:px-0">
          <SectionHeading
            title={
              <>
                국내 CCTV 총 브랜드
                <br />
                <strong>렌탈 할부 통합 공식 가입 센터</strong>
              </>
            }
            desc={
              <>
                일시납 공사의 목돈이 부담스러우신 고객님들을 위해
                <br />
                초기비용 0원과 최저가 월비용으로
                <SpaceOrBreak />
                전국 어디든 부담없는 설치가 가능한
                <SpaceOrBreak />
                {SITE.name}만의 렌탈 서비스도 준비 했습니다.
              </>
            }
          />
        </div>

        {/* 브랜드 로고 띠: 화면 끝까지 왼쪽으로 끝없이 흐름 (globals.css .marquee-left)
            로고가 5개뿐이라 한 트랙에 4번 반복해 화면보다 길게 → 같은 트랙 복제(aria-hidden)로 끊김 없이 이어 붙임 */}
        <div className="mt-[32px] flex w-full overflow-hidden lg:mt-[56px]">
          {[false, true].map((isClone) => (
            <ul
              key={String(isClone)}
              aria-hidden={isClone || undefined}
              className="marquee-left flex shrink-0 gap-[10px] pr-[10px] lg:gap-[16px] lg:pr-[16px]"
            >
              {Array.from({ length: 4 }, () => RENTAL_PARTNERS).flat().map(({ name, file }, i) => (
                <li
                  key={`${file}-${i}`}
                  className="flex h-[72px] w-[140px] shrink-0 items-center justify-center rounded-[12px] bg-white px-[16px] lg:h-[100px] lg:w-[200px] lg:px-[24px]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={`/images/rental-partners/${file}.webp`}
                      alt={isClone || i >= RENTAL_PARTNERS.length ? "" : `${name} 로고`}
                      fill
                      sizes="(min-width: 1024px) 200px, 140px"
                      className="object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
      )}

      {/* ===== 교차 링크: 일시납(설치 패키지) ===== */}
      <CrossLink
        href="/service/install"
        caption="한 번에 구매하는 게 낫다면?"
        label="일시납 설치 패키지 가격 보기"
        className="pt-[60px] lg:pt-[120px]"
      />
    </>
  );
}
