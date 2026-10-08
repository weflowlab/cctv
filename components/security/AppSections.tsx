/**
 * 매장보안 페이지 중반부 섹션 모음 (원본 security-store-section9 ~ section13)
 * - 동행 파트너(앱 소개), 매장 케어 3가지, 앱 평점, CCTV 스펙 리스트, 한화비전 글로벌 기술력
 * - 모두 정적 콘텐츠(서버 컴포넌트)
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { MbBr, PcBr, SpaceMbBr } from "./Breaks";
import { ArrowStroke, CareIcon, ServiceIcon, SpecCheckIcon, StarIcon, TechnicalIcon } from "./icons";

/* =====================================================================
   섹션9: 키퍼가 CCTV를 넘어 '동행 파트너'인 이유 — 좌측 카피+문의하기 버튼, 우측 인물 이미지+말풍선
   ===================================================================== */
export function PartnerSection() {
  return (
    <section id="security-store-section9" className="flex w-full justify-center bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[40px] px-[16px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[60px] lg:px-0">
        {/* ===== 카피 + 버튼 ===== */}
        <div className="flex max-w-full flex-col items-center gap-[24px] text-center lg:max-w-[456px] lg:items-start lg:gap-[30px] lg:text-left">
          <div className="flex flex-col gap-[14px]">
            <h2 className="text-[26px] font-bold leading-[1.4] tracking-[-1px] text-[#202020] lg:text-[42px]">
              <span className="text-brand">키퍼</span>가 CCTV를 넘어
              <br />
              <span className="text-brand">‘동행 파트너’</span>인 이유
            </h2>
            <p className="text-[15px] leading-[1.4] tracking-[-0.4px] text-[#202020] lg:text-[20px]">
              쉽게 보는 유X브, 넷X스처럼 사용도 확인도
              <br />
              간편한 화면 구성으로 처음 사용해도 어려움이 없어요.
            </p>
          </div>
          {/* 원본: router.push("/contact"), hover 시 진한 오렌지 */}
          <Link
            href="/contact"
            className="inline-flex h-[42px] w-fit items-center gap-[4px] whitespace-nowrap rounded-[48px] bg-brand py-[14px] pr-[18px] pl-[20px] text-[15px] font-medium tracking-[-0.36px] text-white transition-colors duration-200 hover:bg-[#e55300] lg:h-[56px] lg:gap-[8px] lg:px-[24px] lg:py-0 lg:text-[18px]"
          >
            <span>문의하기</span>
            <ArrowStroke />
          </Link>
        </div>

        {/* ===== 이미지 + 말풍선 ===== */}
        <div className="relative flex w-full flex-col items-center lg:w-auto">
          <div className="w-full overflow-hidden rounded-[14px] bg-[#fbf0d3] lg:h-[374px] lg:w-auto">
            <Placeholder label="키퍼 동행 파트너" className="aspect-[560/374] w-full lg:h-full lg:w-[560px]" />
          </div>
          <div className="relative z-[2] -mt-[16px] flex flex-col items-center rounded-[9.3px] border-[0.93px] border-[#e9e9e9] bg-white px-[16px] py-[10px] text-center text-[13px] leading-[1.4] tracking-[-0.37px] text-[#202020] shadow-[0px_3.7px_3.25px_rgba(0,0,0,0.17)] lg:-mt-[20px] lg:px-[22px] lg:py-[13px] lg:text-[18.5px]">
            <span>핸드폰 하나로 매장 안전은 물론 직원관리까지</span>
            <span>
              한 번에 해결하는 <span className="font-bold text-brand">키퍼 전용 APP</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션10: 매장 케어, 3가지로 충분합니다 — 회색 카드 3장 (첫 카드 제목은 PC/모바일 문구가 다름)
   ===================================================================== */
export function CareSection() {
  const cards = [
    {
      title: (
        <>
          <span className="hidden lg:inline">실시간 영상확인, 딱 1초</span>
          <span className="inline lg:hidden">확인에 필요한 시간, 단 5초</span>
        </>
      ),
      desc: (
        <>
          지연 없이 빠르게 확인하는
          <br />
          매장 모니터링
        </>
      ),
      alt: "실시간 1초 영상확인 일러스트",
    },
    {
      title: "실시간 침입 감지, 캡쳐모드",
      desc: (
        <>
          낯선 출입부터 침입 감지까지,
          <br />
          놓치지 않는 실시간 알림
        </>
      ),
      alt: "실시간 침입 감지 일러스트",
    },
    {
      title: "바로 확인하고, 바로 내보내기 OK",
      desc: (
        <>
          필요한 순간만 빠르게. 키퍼 영상 클립으로 확인,
          <SpaceMbBr />
          캡처, 공유까지 간편하게
        </>
      ),
      alt: "영상 클립 캡처 및 공유 일러스트",
    },
  ];

  return (
    <section id="security-store-section10" className="flex w-full justify-center bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[28px] px-[16px] lg:w-[1080px] lg:max-w-none lg:gap-[60px] lg:px-0">
        <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.84px] text-[#222] lg:text-[42px]">
          매장 케어,
          <SpaceMbBr />
          <span className="text-brand">3가지로 충분</span>합니다.
        </h2>
        <div className="grid w-full max-w-[420px] grid-cols-1 justify-center gap-[24px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,350px)] lg:gap-[15px]">
          {cards.map((c) => (
            <div key={c.alt} className="flex h-auto w-full flex-col justify-between gap-[22px] overflow-hidden rounded-[13.72px] bg-[#f6f6f6] lg:h-[459px] lg:w-[350px] lg:gap-0 lg:rounded-[14px]">
              <div className="flex flex-col gap-[2px] px-[20px] pt-[28px] text-center lg:gap-[4px] lg:pt-[45px]">
                <h3 className="text-[18px] font-bold leading-[1.4] tracking-[-0.44px] text-[#202020] lg:text-[22px]">{c.title}</h3>
                <p className="text-[16px] leading-[1.4] tracking-[-0.36px] text-[#202020] lg:text-[18px]">{c.desc}</p>
              </div>
              <div className="relative flex w-full justify-center">
                <Placeholder label={c.alt} className="relative -bottom-px h-[170px] w-[240px] lg:h-[240px] lg:w-[300px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션11: 앱 평점 — App Store / Google Play / 네이버 스마트스토어 점수 카드
   ===================================================================== */
const RATINGS = [
  { platform: "App Store", score: "4.8", count: "평가 59개" },
  { platform: "Google Play", score: "4.7", count: "리뷰 85개" },
  { platform: "네이버 스마트스토어", score: "4.96", count: "실구매후기 24개" },
];

export function RatingSection() {
  return (
    <section id="security-store-section11" className="flex w-full justify-center bg-[#fffaec] py-[60px] lg:py-[120px]">
      <div className="flex w-full flex-col items-center gap-[34px] px-[16px] lg:w-[1080px] lg:gap-[60px] lg:px-0">
        <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.84px] text-[#222] lg:text-[42px]">
          <span className="text-brand">키퍼</span>의 높은 고객만족도,
          <br />
          <span className="text-brand">압도적인 평점</span>으로 증명합니다.
        </h2>
        <div className="flex w-full flex-col items-center gap-[20px]">
          <div className="grid w-full max-w-[344px] grid-cols-1 justify-center gap-[16px] lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,344px)] lg:gap-[22px]">
            {RATINGS.map((r) => (
              <div key={r.platform} className="flex w-full flex-col items-center gap-[4px] rounded-[14px] bg-white px-[24px] py-[20px] text-center shadow-[0px_4px_12px_rgba(0,0,0,0.04)] lg:w-[344px] lg:px-[52px] lg:py-[24px]">
                <span className="text-[13px] leading-[18px] text-[rgba(29,29,31,0.7)]">{r.platform}</span>
                <span className="text-[40px] font-bold leading-[60px] tracking-[-1px] text-[#1a1a1a]">{r.score}</span>
                <div className="flex flex-col items-center gap-[2px]">
                  <span className="text-[16px] tracking-[2px]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                  <span className="text-[14px] leading-[18px] text-[rgba(29,29,31,0.4)]">{r.count}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] leading-[24px] tracking-[-0.3px] text-[rgba(29,29,31,0.6)] lg:text-[16px]">
            * 2026년 6월 기준 · 각 플랫폼 공개 평점 (수치는 정기적으로 업데이트 예정)
          </p>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션12: CCTV의 기본은 '잘 보이게' — 반투명 블러 카드에 스펙 7개 + 우측 하단 배경 이미지
   ===================================================================== */
const SPECS = [
  "일반 CCTV 2배 이상의 QHD 400만 화소",
  "낮과 밤 모두 선명한 역광 보정&야간 자외선",
  "왜곡과 노이즈/흔들림 완벽 삭제",
  "IP66 방수 방진 등급",
  "IK10 충격 보호 등급",
  "자체 압축 기술로 고화질 그대로 4주 이상 저장",
  "글로벌 수준의 사이버 보안 관리",
];

export function SpecSection() {
  return (
    <section id="security-store-section12" className="relative flex w-full flex-col items-center overflow-hidden bg-white pt-[80px] pb-0 lg:flex-row lg:justify-center lg:py-[120px]">
      <div className="relative z-[2] flex w-full max-w-[420px] flex-col items-center gap-[34px] px-[16px] lg:w-[1920px] lg:max-w-none lg:gap-[60px] lg:px-0">
        <div className="z-[1] flex flex-col items-center gap-[10px]">
          <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.84px] text-[#222] lg:text-[42px]">
            물론, CCTV의 기본은
            <br />
            <span className="text-brand">‘잘 보이게’</span> 만드는 것이죠.
          </h2>
          <p className="text-center text-[15px] leading-[1.6] tracking-[-0.4px] text-[#222] lg:text-[20px]">
            한화비전의 기술력을 담아, 영상의 스펙과
            <SpaceMbBr />
            퀄리티를 최상으로 끌어올렸습니다.
          </p>
        </div>

        {/* ===== 스펙 리스트 (블러 카드) ===== */}
        <div className="z-[1] flex w-full flex-col gap-[10px] rounded-[8.528px] bg-[linear-gradient(114.6deg,rgba(248,248,248,0.86)_7.7%,rgba(248,248,248,0.69)_99.5%)] px-[38px] py-[22px] backdrop-blur-[10px] lg:w-auto lg:gap-[18px] lg:rounded-[14px] lg:px-[88px] lg:py-[32px]">
          {SPECS.map((s) => (
            <div key={s} className="flex items-center gap-[6.09px] border-b border-black/[0.06] pb-[14px] last:border-b-0 last:pb-0 lg:gap-[11px]">
              <SpecCheckIcon className="h-[15px] w-[15px] shrink-0 lg:h-[27px] lg:w-[27px]" />
              <span className="text-[13px] leading-[1.6] tracking-[-0.26px] text-[#222] lg:text-[21.9px] lg:tracking-[-0.44px]">{s}</span>
            </div>
          ))}
        </div>

        {/* ===== 배경 이미지 (PC: 우측 하단 절대배치 / 모바일: 카드 아래 풀폭) ===== */}
        <div className="pointer-events-none relative bottom-0 z-0 aspect-[91/60] h-auto w-[calc(100%_+_32px)] lg:absolute lg:right-0 lg:-bottom-[123px] lg:aspect-auto lg:h-[587px] lg:w-[903px]">
          <Placeholder label="한화비전 CCTV 스펙" className="h-full w-full" />
          <div className="absolute top-0 left-0 h-[200px] w-full bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute top-0 left-0 hidden h-full w-[300px] bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0)_100%)] lg:block" />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션13: 글로벌 기술력 — 검은 배경, 로고 배지 + 카피 + Care/Technical/Service 카드
   ===================================================================== */
const PILLARS = [
  { title: "Care", Icon: CareIcon },
  { title: "Technical", Icon: TechnicalIcon },
  { title: "Service", Icon: ServiceIcon },
];

export function BrandSection() {
  return (
    <section id="security-store-section13" className="flex w-full items-center justify-center bg-[#0c0c0c] px-[16px] py-[80px] lg:px-0 lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[34px] lg:w-[1080px] lg:max-w-none lg:gap-[60px]">
        <div className="flex flex-col items-center gap-[22px] lg:gap-[24px]">
          <div className="flex items-center justify-center rounded-[1000px] bg-[rgba(255,241,230,0.08)] px-[21.2px] py-[8.8px] lg:bg-[rgba(255,241,230,0.13)] lg:px-[24px] lg:py-[10px]">
            <div className="flex items-center gap-[8.2px] lg:gap-[9.3px]">
              <Placeholder label="keeper Hanwha Vision logo" kind="icon" dark className="h-[18px] w-[150px] lg:h-[20px] lg:w-[170px]" />
            </div>
          </div>
          <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-white lg:text-[42px] lg:tracking-[-0.84px]">
            이제, <span className="text-brand">글로벌 기술력</span>을
            <br /> 가장 합리적인 서비스로 <MbBr /> 만나보세요!
          </h2>
          <p className="max-w-[781px] text-center text-[15px] leading-[1.4] tracking-[-0.3px] text-white lg:text-[20px] lg:tracking-[-0.4px] lg:text-white/[0.88]">
            35년동안 오직 CCTV 한 길만 걸어온 국내 유일 대기업
            <MbBr /> 제조사 한화비전
            <PcBr />
            그런 한화비전이 설계, 제조, 보안 테스트
            <MbBr />
            까지 자체 진행하며 마침내 완성한 CCTV솔루션, 키퍼
          </p>
        </div>
        <div className="flex w-full max-w-[1080px] items-center justify-center gap-[10px] lg:gap-[24px]">
          {PILLARS.map(({ title, Icon }) => (
            <div key={title} className="flex h-[126.4px] flex-1 flex-col items-center justify-center gap-[7.5px] rounded-[9.5px] border-[0.68px] border-white/10 bg-white/[0.04] lg:h-[204px] lg:gap-[11px] lg:rounded-[14px] lg:border">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8.6px] bg-brand p-[8.9px] lg:h-[65px] lg:w-[65px] lg:rounded-[14px] lg:p-[14.5px]">
                <Icon className="h-[22px] w-[22px] lg:h-[36px] lg:w-[36px]" />
              </div>
              <span className="text-center text-[14px] font-bold leading-[1.63] tracking-[-0.33px] text-white lg:text-[20px] lg:font-medium lg:leading-[1.68] lg:tracking-[-0.48px]">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
