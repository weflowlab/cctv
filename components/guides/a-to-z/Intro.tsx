/**
 * 창업 A to Z 가이드 — 인트로 섹션 (검정 배경)
 * - "창업 비용 최대 40% 절감 비법" 헤드라인 + 말풍선 + 사장님 일러스트 + 소개 문단.
 * - 원본은 PC/모바일 문단의 줄바꿈 위치가 달라 두 벌을 렌더링하고 CSS 로 전환한다.
 */
import Placeholder from "@/components/common/Placeholder";
import { SpaceOrBreak } from "@/components/guides/shared/Breaks";

export default function Intro() {
  return (
    // ===== 인트로: 문제 공감 헤드라인 / 정적 섹션 =====
    <section className="relative block w-full bg-black px-4 py-[60px] text-center lg:flex lg:justify-center lg:px-0 lg:py-[140px]">
      <div className="w-full lg:w-[1080px]">
        <h2 className="text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-white lg:text-[42px] lg:leading-[60px]">
          초보 사장님을 위한
          <SpaceOrBreak />
          창업 비용 최대 40% 절감 비법,
          <br />
          <strong className="text-[#ff5c00]">
            성공하는 사장님의
            <SpaceOrBreak />
            인사이트를 공개합니다.
          </strong>
        </h2>

        {/* 말풍선 (아래쪽 삼각형 꼬리) */}
        <div className="relative mt-[32px] inline-block rounded-[100px] bg-white px-[16px] py-[10px] text-[14px] leading-[23px] font-medium tracking-[-0.28px] text-[#333] lg:mt-[62px] lg:px-[26px] lg:py-[12px] lg:text-[26px] lg:leading-[42px] lg:tracking-[-0.52px]">
          <strong className="font-bold text-[#ff5c00]">첫 창업</strong>을 앞두고 설레임보다 막막함만 커지셨나요?
          <span
            aria-hidden
            className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-x-[8px] border-t-[7px] border-b-0 border-solid border-x-transparent border-t-white lg:bottom-[-14px] lg:border-x-[16px] lg:border-t-[15px]"
          />
        </div>

        {/* 일러스트 영역: 배경 + 사장님 2명, 하단 검정 그라데이션 페이드 */}
        <div className="relative left-1/2 mt-[54px] w-[375px] -translate-x-1/2 overflow-hidden lg:w-[662px]">
          <Placeholder label="배경 이미지" dark className="aspect-[662/440] w-full" />
          <Placeholder
            label="사장님1"
            dark
            className="absolute top-[27px] left-[47px] aspect-[269/380] w-[152px] lg:top-[48px] lg:left-[57px] lg:w-[269px]"
          />
          <Placeholder
            label="사장님2"
            dark
            className="absolute top-[30px] right-[46px] aspect-[184/380] w-[104px] lg:top-[28px] lg:right-[107px] lg:w-[184px]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] lg:h-[120px]" />
        </div>

        <p className="mt-[24px] text-center text-[15px] leading-[24px] font-normal tracking-[-0.3px] text-white opacity-85 lg:mt-[54px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px]">
          {/* PC 줄바꿈 버전 */}
          <span className="hidden lg:inline">
            아이템 선정, 자금 계획, 상권 분석, 인테리어,인허가 절차까지 창업 앞에서는
            <br />
            누구라도 확실한 방향을 잡기 어렵습니다.
            <br />
            <br />
            그래서, 한화비전 키퍼가
            <br />
            수많은 창업 현장에서 보고 배운 사장님들의
            <br />
            단계별 창업 준비 비법을 책 한 권에 담았습니다.
            <br />
            <br />
            창업 9개월 전부터 오픈 이후까지,
            <br />
            실제 창업 준비 과정에서 바로 활용할 수 있는 체계적인 로드맵과
            <br />
            리스크 관리 전략을 담은 실전형 가이드 북, 지금 확인하세요!
          </span>
          {/* 모바일 줄바꿈 버전 */}
          <span className="lg:hidden">
            아이템 선정, 자금 계획, 상권 분석, 인테리어,
            <br />
            인허가 절차까지 창업 앞에서는
            <br />
            누구라도 확실한 방향을 잡기 어렵습니다.
            <br />
            <br />
            그래서, 한화비전 키퍼가
            <br />
            수많은 창업 현장에서 보고 배운
            <br />
            사장님들의 단계별 창업 준비 비법을
            <br />
            책 한 권에 담았습니다.
            <br />
            <br />
            창업 9개월 전부터 오픈 이후까지,
            <br />
            실제 창업 준비 과정에서 바로 활용할 수 있는
            <br />
            실전형 가이드 북, 지금 확인하세요!
          </span>
        </p>
      </div>
    </section>
  );
}
