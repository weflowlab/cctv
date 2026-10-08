/**
 * 매장보안 페이지 마무리 섹션 모음 (원본 security-store-section27 ~ section30)
 * - 동행 메시지, FAQ BEST 7(모두 펼친 상태의 Q&A 리스트 — 원본도 아코디언 아님), 주문 안내, 구매문의 CTA
 * - 모두 정적 콘텐츠(서버 컴포넌트). 버튼은 원본 router.push("/contact") 를 Link 로 대체.
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { SpaceMbBr, SpacePcBr } from "./Breaks";
import { ArrowFill, DownChevronIcon, WarningIcon } from "./icons";
import styles from "./security.module.css";

/* =====================================================================
   섹션27: "가장 안정적인 동행, 키퍼가 함께 걷겠습니다." — 카피 + 세로 구분선 + 이미지 카드
   ===================================================================== */
export function CompanionSection() {
  return (
    <section id="security-store-section27" className="flex w-full justify-center overflow-hidden bg-[#fdfaf3] pt-[60px] pb-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[40px] px-[16px] lg:w-[1080px] lg:max-w-none lg:gap-[50px] lg:px-0">
        <div className="flex flex-col items-center gap-[7px] lg:gap-[13px]">
          <p className="text-center text-[15px] font-medium leading-[1.4] tracking-[-0.43px] text-[#404040] lg:text-[24px]">
            운영의 즐거움만은 오롯이 즐기시도록,
            <br />
            <span className="text-brand">어려움은 나누어 들겠습니다.</span>
          </p>
          <div className="h-[32px] w-px bg-black/10 lg:h-[55px]" />
          <h2 className="text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-[#222] lg:text-[42px] lg:tracking-[-0.84px]">
            가장 안정적인 동행,
            <br />
            <span className="text-brand">키퍼가 함께 걷겠습니다.</span>
          </h2>
        </div>
        <div className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-[14px] shadow-[0px_3px_8.35px_rgba(0,0,0,0.05)]">
          <div className="relative flex w-full justify-center overflow-hidden lg:h-[317px]">
            <Placeholder label="한화비전 키퍼 파트너" className="aspect-[640/317] w-full lg:h-full" />
          </div>
          <div className="flex items-center justify-center bg-white px-[16px] py-[20px] lg:px-0 lg:py-[34px]">
            <p className="text-center text-[14px] leading-[1.5] tracking-[-0.41px] text-[#525252] lg:text-[20px]">
              설치부터 A/S까지 국내 유일 대기업 제조사
              <SpaceMbBr />
              <strong className="font-bold text-[#171717]">한화비전의 전문가들</strong>이
              <br />
              가장 명확한 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션28: FAQ BEST 7 — "상담 없이 바로 결제" 배지 + FAQ 바로가기(/faq) + Q&A 7개
   Q2 는 매장 규모별 권장 대수 표 + TIP 포함
   ===================================================================== */
const FAQS: { q: string; a: string; table?: boolean; tip?: boolean }[] = [
  { q: "영업사원 상담 없이 바로 구매하면 설치는 어떻게 진행되나요?", a: "네, 바로 결제하셔도 됩니다!\n주문 확인 후 24시간 이내에 전담 설치팀에서 해피콜을 드려 방문 일정을 조율하며, 통상적으로 3~5일 내에 설치가 완료됩니다. 전문 기사가 직접 방문하여 최적의 위치에 정밀하게 설치해 드리며, 최초 설치비는 0원(무료)입니다." },
  { q: "우리 매장 평수나 구조에 맞추려면 카메라는 몇 대나 설치해야 할까요?", a: "매장 규모에 따른 권장 가이드는 다음과 같습니다.", table: true, tip: true },
  { q: "의무 약정이 있어 서비스를 이용 중단할 시 위약금이 발생하나요?", a: "의무 약정도, 위약금도 전혀 없습니다.\n기존 렌탈의 1,000일이 넘는 긴 약정 굴레에서 벗어나세요. 사장님이 제품을 직접 구매하여 소유하는 방식이므로, 언제든 이용을 중단하셔도 위약금이 발생하지 않습니다." },
  { q: "매달 돈을 내는 렌탈 방식보다 구매하는 것이 더 이득인가요?", a: "3년만 사용해도 렌탈 대비 최대 40% 이상 비용이 절감됩니다.\n렌탈 서비스는 중간 마진과 영업사원 수수료가 포함되어 매달 높은 고정비가 지출됩니다. 키퍼는 한화비전이 직접 제조하고 다이렉트로 판매하여 거품을 뺀 만큼, 가장 합리적인 금액으로 제공해 드릴 수 있습니다." },
  { q: "경비업체처럼 출동서비스가 없는데 안심해도 되는 걸까요?", a: "실시간 알림과 안심보험으로 실질적인 해결을 돕습니다. \n이상 징후 감지 시 스마트폰으로 즉시 실시간 알림이 전송되어 사장님이 바로 상황을 확인하고 신고할 수 있습니다. 또한 CCTV 촬영 중 발생한 사고에 대해 최대 1,000만원까지 보장되는 '사장님 안심케어'를 1년간 무료로 제공합니다. 단, 도난·화재로 인한 손해는 보장하지 않습니다. 자세한 보장 범위는 약관을 확인해 주세요." },
  { q: "직원이 매장에 없는데 허위로 출근 체크를 하면 어떡하죠?", a: "GPS 기술 기반으로 허위 출근 체크를 원천 차단합니다.\n키퍼의 출퇴근 버튼은 직원이 설정된 매장 위치 근처에 실제로 도착했을 때만 버튼이 활성화되므로, 매장 밖에서의 부정행위는 불가능하니 안심하셔도 됩니다." },
  { q: "대기업 제품인데, 고장이 난다면 A/S는 어디서 진행할 수 있나요?", a: "글로벌 보안 시장을 선도하는 한화비전이 직접 3년간 무상 A/S를 보증합니다.\n전국적인 서비스 네트워크를 통해 접수 후 24시간 이내에 방문하는 신속한 서비스로 매장 운영에 차질이 없도록 관리해 드립니다." },
];

/** Q2 매장 규모별 권장 대수 표 */
function SizeTable() {
  const head = "px-[10px] py-[6px] text-center text-[14px] font-bold text-white";
  return (
    <div className="my-[10px] flex flex-col gap-[16px]">
      <div className="grid grid-cols-2 gap-px border border-[#ededed] bg-[#ededed]">
        <div className={`${head} bg-[#ff823c]`}>
          <span>소형 매장</span>
          <span className="block font-normal">(10~15평)</span>
        </div>
        <div className={`${head} bg-brand`}>
          <span>중대형 매장</span>
          <span className="block font-normal">(20~40평 이상)</span>
        </div>
        <div className="bg-white p-[10px] text-center">
          <span className="block text-[14px] font-bold text-[#6a6c73]">평균 4대 권장</span>
          <span className="block text-[14px] leading-[1.4] text-[#8e9097]">
            출입구 1대, 카운터/POS 1대
            <br />
            매장 내부 홀 2대
          </span>
        </div>
        <div className="bg-white p-[10px] text-center">
          <span className="block text-[14px] font-bold text-[#6a6c73]">평균 8~10대 권장</span>
          <span className="block text-[14px] leading-[1.4] text-[#8e9097]">
            주방 창고, 사각지대 및
            <br />
            외부 주차장 포함
          </span>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="security-store-section28" className="flex w-full justify-center bg-white py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[10px] px-[16px] lg:w-[1080px] lg:max-w-[1080px] lg:gap-[20px] lg:px-0">
        {/* ===== 헤더 ===== */}
        <div className="flex flex-col items-center">
          <Placeholder label="keeper 로고" kind="icon" className="h-[28.398px] w-[101.324px] lg:h-[51px] lg:w-[182px]" />
          <div className="mt-[30px] mb-[12px] bg-brand px-[12px] py-[10px] text-[24px] font-bold tracking-[-0.84px] text-white lg:mt-[62px] lg:px-[24px] lg:py-[12px] lg:text-[42px]">상담 없이 바로 결제</div>
          <h2 className="whitespace-nowrap text-center text-[24px] font-bold tracking-[-0.84px] text-[#222] lg:whitespace-normal lg:text-[42px]">
            사장님들이 가장 궁금해하는 <span className="text-brand">BEST 7</span>
          </h2>
          <Link href="/faq" className="mt-[24px] flex items-center gap-[8px] rounded-[48px] bg-black py-[14px] pr-[22px] pl-[24px] no-underline lg:mt-[36px]">
            <span className="text-[14px] font-bold tracking-[-0.36px] text-white lg:text-[18px]">FAQ 바로가기</span>
            <ArrowFill color="white" size={22} className="h-[15.769px] w-[15.769px] lg:h-[22px] lg:w-[22px]" />
          </Link>
        </div>

        {/* ===== Q&A 리스트 ===== */}
        <div className="flex w-full max-w-[1080px] flex-col">
          {FAQS.map((f, i) => (
            <div key={f.q} className="flex flex-col">
              <div className="mt-[40px] mb-[24px] h-px w-full bg-black/10 lg:my-[40px]" />
              <div className="flex flex-col gap-[8px]">
                <span className="text-[14px] font-medium tracking-[-0.3px] text-brand">Question.{i + 1}</span>
                <div className="flex flex-col gap-[14px] lg:flex-row lg:justify-between lg:gap-[124px]">
                  <h3 className="w-full text-[20px] font-bold leading-[1.4] tracking-[-0.48px] text-black lg:w-[427px] lg:shrink-0 lg:text-[24px]">{f.q}</h3>
                  <div className="flex flex-1 flex-col">
                    <p className="whitespace-pre-wrap text-[14px] leading-[1.5] tracking-[-0.3px] text-black/80 lg:text-[16px]">{f.a}</p>
                    {f.table && <SizeTable />}
                    {f.tip && (
                      <div className="flex gap-[16px] text-[14px] leading-[1.5] tracking-[-0.3px] lg:text-[16px]">
                        <span className="text-[#4e5056]">TIP</span>
                        <span className="whitespace-pre-wrap leading-[1.4] text-[#6a6c73]">
                          정확한 카메라 위치는 기사님 방문 시 상담을 통해 최종 확정되니,
                          <SpacePcBr />
                          평수에 맞춰 대수만 먼저 선택해 보세요!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션29: 주문 안내 — "총 2대 이상부터 주문 가능" + 실내/실외 원형 이미지 + 교차 주문 박스
   ===================================================================== */
export function OrderGuideSection() {
  const cams = [
    { no: "1", alt: "인도어 실내용 CCTV", label: "인도어 실내용", size: "h-[90.938px] w-[108.632px] lg:h-[144px] lg:w-[172px]" },
    { no: "2", alt: "아웃도어 실외용 CCTV", label: "아웃도어 실외용", size: "h-[90.838px] w-[119.741px] lg:h-[144px] lg:w-[190px]" },
  ];
  return (
    <section id="security-store-section29" className="flex w-full justify-center bg-[#111e38] py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center gap-[42px] px-[16px] lg:gap-[60px] lg:px-0">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <WarningIcon className="h-[26px] w-[30px] lg:h-[33px] lg:w-[38px]" />
          </div>
          <h2 className="mt-[14px] mb-[8px] text-center text-[24px] font-bold leading-[1.4] tracking-[-0.52px] text-white lg:mt-[36px] lg:mb-[30px] lg:text-[42px] lg:tracking-[-0.84px]">
            키퍼 CCTV는 총 2대 이상부터
            <br />
            주문 가능합니다.
          </h2>
          <p className="text-center text-[15px] leading-[1.4] tracking-[-0.48px] text-white/90 lg:text-[24px]">
            *2대 미만 주문 시, 고객님께 직접 취소요청
            <SpaceMbBr />
            드릴 수 있습니다.
          </p>
        </div>

        <div className="flex w-full max-w-[470px] flex-col items-center lg:max-w-none">
          {/* 실내용 / 실외용 */}
          <div className="flex w-full max-w-[470px] items-center justify-between gap-[40px] px-[44px] lg:gap-0 lg:px-0">
            {cams.map((c) => (
              <div key={c.no} className="relative flex flex-col items-center">
                <div className="z-[2] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand text-[11px] font-bold tracking-[-0.226px] text-white lg:h-[34px] lg:w-[34px] lg:text-[18px] lg:tracking-normal">{c.no}</div>
                <div className="relative mt-[18px] mb-[12px] flex h-[96px] w-[96px] items-center justify-center rounded-full bg-white/[0.12] [filter:drop-shadow(3px_3px_13.5px_rgba(0,0,0,0.06))] lg:my-[18px] lg:h-[151px] lg:w-[151px]">
                  <div className={`relative bottom-[8px] shrink-0 lg:bottom-[12px] ${c.size}`}>
                    <Placeholder label={c.alt} dark className="h-full w-full" />
                  </div>
                </div>
                <span className="text-[14px] tracking-[-0.43px] text-white lg:text-[21px]">{c.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-[42px] mb-[24px] flex justify-center lg:my-[36px]">
            <DownChevronIcon className="h-[26.809px] w-[53.618px] lg:h-[36px] lg:w-[72px]" />
          </div>

          {/* 교차 주문 가능 (그라데이션 테두리 박스) */}
          <div className={`relative mx-[46px] w-[calc(100%_-_92px)] max-w-[538px] overflow-hidden rounded-[10px] p-px lg:mx-0 ${styles.gradientBorder}`}>
            <div className="relative flex flex-col items-center gap-[4px] px-0 py-[16px] text-center lg:gap-[6px] lg:p-[24px]">
              <h3 className="text-[18px] font-bold tracking-[-0.48px] text-white lg:text-[24px]">교차 주문 가능</h3>
              <p className="text-[13px] tracking-[-0.36px] text-white lg:text-[18px]">실내용 + 실외용 자유롭게 섞어서 주문하세요!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   섹션30: 구매문의 CTA — 오렌지 배경, 전화번호 + 빠른 상담하기(/contact) + 상담원 이미지
   모바일은 상단에 연노랑 원형 글로우(::before) 추가
   ===================================================================== */
export function ContactCtaSection() {
  return (
    <footer id="security-store-section30" className="relative flex w-full justify-center overflow-hidden bg-brand">
      {/* 모바일 전용 글로우 */}
      <div className="absolute top-[-40%] left-1/2 h-[564px] w-[564px] translate-x-[calc(-50%_-_160px)] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,240,188,0.5)_0%,rgba(255,240,188,0)_100%)] opacity-60 lg:hidden" />

      <div className="relative flex h-auto w-full max-w-[1080px] flex-col items-center justify-between gap-[100px] px-[16px] pt-[60px] lg:h-[530px] lg:flex-row lg:gap-0 lg:p-0">
        <div className="z-[2] flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="text-[28px] font-semibold tracking-[-0.34px] text-[#fff6a7] lg:text-[34px]">키퍼 구매문의</span>
          <h2 className="mt-0 text-[42px] font-bold leading-[1.3] tracking-[-0.56px] text-white lg:mt-[4px] lg:text-[56px]">1670-5773</h2>
          <p className="mt-[10px] text-[15px] tracking-[-0.35px] text-white/80 lg:text-[20px]">AM 09:00 ~ PM 18:00 (월~금)</p>
          <Link
            href="/contact"
            className="mt-[24px] flex items-center gap-[8px] rounded-[48px] bg-white py-[12px] pr-[18px] pl-[20px] transition-[transform,opacity] duration-150 ease-in-out active:opacity-85 lg:py-[16px] lg:pr-[22px] lg:pl-[24px]"
          >
            <span className="text-[14px] font-bold leading-[1.2] tracking-[-0.36px] text-[#222] lg:text-[18px]">빠른 상담하기</span>
            <ArrowFill color="#222222" className="h-[15.769px] w-[15.769px] lg:h-[20px] lg:w-[20px]" />
          </Link>
        </div>
        <div className="relative z-[1] flex h-[320px] items-end lg:h-full">
          <div className="h-[320px] lg:h-[476px]">
            <Placeholder label="키퍼 고객센터 파트너" dark className="aspect-[498/476] h-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}
