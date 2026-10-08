/**
 * 2026 트렌드 리포트 — 마무리 2개 섹션
 * 1) 응원 메시지: 연주황 배경 + 뒤쪽 장식 이미지
 * 2) 최종 CTA: 주황 배경 + 흰 버튼 "Vol.2 무료 리포트 다운로드 하기"
 *    - 원본: 이벤트(leadgen_2026_trend_report_click) 후 /contact/2026-trend-report 이동
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { DownloadIcon } from "@/components/guides/shared/icons";

export function Cheer() {
  return (
    // ===== 응원 메시지 =====
    <div className="relative flex w-full flex-col items-center justify-center bg-[#fff3eb] px-4 py-[64px] lg:px-0 lg:py-[140px]">
      <div className="relative z-[1] flex w-full max-w-[420px] flex-col items-center whitespace-pre-line lg:w-[1080px] lg:max-w-none lg:whitespace-nowrap">
        <h2 className="text-center text-[26px] leading-[1.44] font-bold tracking-[-1px] text-[#202020] lg:text-[42px]">
          2026년 도전을 준비하는
          <br />
          <strong className="text-[#ff5c00]">{"예비 사장님의 성공을\n 응원"}</strong>합니다!
        </h2>
        <p className="mt-[16px] text-center text-[14px] leading-[1.4] font-normal tracking-[-0.28px] text-[rgba(32,32,32,0.8)] lg:mt-[20px] lg:text-[20px] lg:leading-[1.6] lg:tracking-[-0.4px]">
          {"시작하는 것만큼 중요한 것이 버티는 힘입니다.\n 사장님의 매장이 성공적인 창업을 넘어"}
          <br />
          {"안정적으로 자리잡을 수 있도록,\n 키퍼가 든든한 가이드가 되어 드리겠습니다."}
        </p>
      </div>
      {/* 장식 배경 이미지 (섹션 높이에 맞춤, 클릭 통과) */}
      <Placeholder
        label="bg"
        className="pointer-events-none absolute top-[5%] left-1/2 h-[90%] w-[343px] -translate-x-1/2 lg:top-0 lg:h-full lg:w-[1400px]"
      />
    </div>
  );
}

export function FinalCta() {
  return (
    // ===== 최종 CTA =====
    <div className="relative flex w-full flex-col items-center justify-center bg-[#fc6a38] px-4 py-[64px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full max-w-[420px] flex-col items-center whitespace-pre-line lg:w-[1080px] lg:max-w-none lg:whitespace-nowrap">
        <h2 className="text-center text-[26px] leading-[1.44] font-bold tracking-[-1px] text-white lg:text-[42px]">
          {"검증된 데이터로\n 리스크를 줄이고,"}
          <br />
          남들보다 한 발 앞서가세요
        </h2>
        <p className="mt-[10px] mb-[24px] text-center text-[14px] leading-[1.4] font-normal tracking-[-0.28px] text-white/80 lg:mt-[20px] lg:mb-[44px] lg:text-[20px] lg:leading-[1.6] lg:tracking-[-0.4px]">
          시작하는 것만큼 중요한 것이 버티는 힘입니다.
          <br />
          지금 바로 리포트 전문을 무료로 다운로드하실 수 있습니다.
        </p>
        {/* TODO: 이벤트 트래킹 leadgen_2026_trend_report_click */}
        <Link
          href="/contact/2026-trend-report"
          className="flex h-[41px] cursor-pointer items-center gap-[4.467px] rounded-[20px] bg-white px-[22.333px] text-[14px] leading-[1.4] font-extrabold text-[#ff6c3a] lg:h-auto lg:gap-[16px] lg:px-[50px] lg:py-[24px] lg:text-[24px]"
        >
          <DownloadIcon color="#FF6C3A" className="h-[19.77px] w-[19.77px] lg:h-[30px] lg:w-[30px]" />
          Vol.2 무료 리포트 다운로드 하기
        </Link>
      </div>
    </div>
  );
}
