/**
 * /service/rental — CCTV 렌탈 탭 콘텐츠 (서버 컴포넌트)
 * - 출처: 기존 홈페이지 "CCTV 렌탈" 페이지 + 홈의 "렌탈 할부 통합 공식 가입 센터" 블록
 * - 구성: 히어로 → 혜택 7가지 → 렌탈 월 요금표(원본 이미지 표를 텍스트로) → 진행 5단계(자동 진행)
 *         → 렌탈 통합 가입 센터 + 파트너 로고 → 일시납(설치) 교차 링크
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";
import RentalSteps from "./RentalSteps";
import { RENTAL_BENEFITS, RENTAL_MONTHLY, RENTAL_PARTNERS, formatWon } from "./data";
import { CrossLink, SectionHeading, SpaceOrBreak } from "./ui";

/** 월 요금표 한 묶음 (PC 에서는 1~8대 / 9~16대 두 표를 나란히) */
function PriceTable({ rows }: { rows: typeof RENTAL_MONTHLY }) {
  return (
    <table className="w-full table-fixed border-collapse text-center text-[14px] tracking-[-0.28px] lg:text-[17px]">
      <thead>
        <tr className="bg-[#222] text-white">
          <th scope="col" className="h-[44px] w-[30%] font-bold lg:h-[56px]">카메라 대수</th>
          <th scope="col" className="font-bold">타사 월요금</th>
          <th scope="col" className="bg-[#ff5c00] font-bold">{SITE.name} 월요금</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.count} className="border-b border-[#eee] bg-white">
            <th scope="row" className="h-[44px] font-medium text-[#333] lg:h-[52px]">{r.count}대</th>
            <td className="text-[#bbb] line-through decoration-[#ff3b30]">{formatWon(r.other)}</td>
            <td className="font-bold text-[#222]">{formatWon(r.ours)}원</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function RentalTab() {
  return (
    <>
      {/* ===== 히어로: 고객소유 렌탈 할부 서비스 ===== */}
      <section className="bg-[#fff9f0] px-[16px] py-[56px] lg:px-0 lg:py-[100px]">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-[32px] lg:w-[1080px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="text-center lg:text-left">
            <p className="text-[14px] font-bold tracking-[-0.28px] text-[#ff5c00] lg:text-[18px]">CCTV 렌탈</p>
            <h2 className="mt-[8px] text-[30px] font-bold leading-[1.4] tracking-[-0.6px] text-[#222] lg:text-[46px] lg:tracking-[-2px] [&>strong]:text-[#ff5c00]">
              <strong>고객소유</strong>의
              <br />
              렌탈 할부 서비스
            </h2>
            <p className="mt-[12px] text-[15px] leading-[1.6] tracking-[-0.3px] text-[#1d1d1f] lg:mt-[16px] lg:text-[20px] lg:tracking-[-0.44px]">
              초기비용 0원과 최저가 월비용으로
              <SpaceOrBreak />
              전국 어디든 부담없이 설치하세요.
            </p>
          </div>
          <Placeholder
            label="CCTV 렌탈 히어로 이미지 (원본 2024/04/CK_cb036087621_l.jpg)"
            className="aspect-[4/3] w-full max-w-[480px] rounded-[20px] lg:w-[480px]"
          />
        </div>
      </section>

      {/* ===== 혜택 7가지: 이미지 카드 그리드 (PC 4열 / 모바일 2열), 순차 slide-up ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="BENEFIT" title={<>{SITE.name} 렌탈 <strong>혜택 7가지</strong></>} />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] lg:mt-[64px] lg:grid-cols-4 lg:gap-[20px]">
            {RENTAL_BENEFITS.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 4) * 120} className="overflow-hidden rounded-[14px] bg-[#f6f7fa]">
                <Placeholder label={`혜택${i + 1} (원본 ${b.img})`} className="aspect-[4/3] w-full border-0" />
                <div className="px-[14px] pb-[18px] pt-[14px] lg:px-[20px] lg:pb-[24px] lg:pt-[18px]">
                  <p className="text-[12px] font-bold tracking-[-0.24px] text-[#ff5c00] lg:text-[14px]">혜택 {i + 1}</p>
                  <h3 className="mt-[4px] text-[15px] font-bold leading-[22px] tracking-[-0.3px] text-[#222] lg:text-[18px] lg:leading-[26px]">
                    {b.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 렌탈 월 요금표: 1~16대 타사 대비 월요금 (원본 2024/05/표-1.jpg 를 텍스트 표로) ===== */}
      <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="PRICE" title="CCTV 렌탈 패키지" desc="카메라 대수별 월 요금" />
          <div className="mt-[32px] grid grid-cols-1 gap-0 overflow-hidden rounded-[14px] lg:mt-[56px] lg:grid-cols-2 lg:gap-[2px] lg:rounded-[20px]">
            <PriceTable rows={RENTAL_MONTHLY.slice(0, 8)} />
            <PriceTable rows={RENTAL_MONTHLY.slice(8)} />
          </div>
        </div>
      </section>

      {/* ===== 진행 과정 5단계: 자동 진행 하이라이트 (클라이언트) ===== */}
      <section className="bg-white px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
          <SectionHeading eyebrow="PROCESS" title="렌탈 서비스 진행 과정" />
          <RentalSteps />
        </div>
      </section>

      {/* ===== 렌탈 할부 통합 공식 가입 센터 + 제휴 브랜드 로고 (원본 홈 블록) ===== */}
      <section className="bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
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
                <SpaceOrBreak />
                초기비용 0원과 최저가 월비용으로
                <SpaceOrBreak />
                전국 어디든 부담없는 설치가 가능한
                <SpaceOrBreak />
                {SITE.name}만의 렌탈 서비스도 준비 했습니다.
              </>
            }
          />
          <ul className="mt-[32px] grid grid-cols-2 gap-[10px] sm:grid-cols-3 lg:mt-[56px] lg:grid-cols-5 lg:gap-[16px]">
            {RENTAL_PARTNERS.map((name) => (
              <li key={name} className="flex h-[72px] items-center justify-center rounded-[12px] bg-white px-[12px] lg:h-[100px]">
                <Placeholder label={`${name} 로고 (원본 2024/12/ 로고 이미지)`} className="h-[40px] w-full max-w-[140px] lg:h-[56px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

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
