/**
 * "키퍼만의 특별한 장점" 섹션 (원본 sc-891c8b25)
 * - 회색(#f6f7fa) 배경, 카드 3장 (이미지 540×315 + 흰 텍스트 박스 540×315).
 * - PC: 1·3번 카드는 [이미지 | 텍스트(좌측정렬)], 2번 카드는 [텍스트(우측정렬) | 이미지].
 *   모바일: 모두 이미지 위 / 텍스트 아래, 좌측 정렬.
 * - 카드 묶음에 slide-up 스크롤 등장 애니메이션 (<Reveal>).
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SpaceOrBreak } from "./icons";

type TextBoxProps = {
  align: "left" | "right";
  color: string;
  label: string;
  title: ReactNode;
  desc: ReactNode;
  note?: string;
};

/** 텍스트 박스 (원본 eC: $align 에 따라 PC 정렬만 바뀜) */
function TextBox({ align, color, label, title, desc, note }: TextBoxProps) {
  return (
    <div
      className={`flex h-auto w-full flex-col justify-center bg-white p-[24px] text-left lg:h-[315px] lg:w-[540px] lg:px-[44px] lg:py-0 ${
        align === "right" ? "lg:text-right" : "lg:text-left"
      }`}
    >
      <h3
        className="text-[14px] font-bold leading-[20px] tracking-[-0.28px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]"
        style={{ color }}
      >
        {label}
      </h3>
      <h4 className="mt-[4px] text-[20px] font-bold leading-[30px] tracking-[-0.4px] text-[#333] lg:mt-[8px] lg:text-[24px] lg:leading-[34px] lg:tracking-[-0.48px]">
        {title}
      </h4>
      <p className="mt-[6px] text-[14px] font-normal leading-[22px] tracking-[-0.14px] text-[#888] lg:mt-[24px] lg:text-[16px] lg:leading-[23px] lg:tracking-[-0.32px]">
        {desc}
      </p>
      {note && (
        <p className="mt-[6px] text-[12px] font-normal leading-[17px] tracking-[-0.24px] text-[#bbb] lg:mt-[8px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.28px]">
          {note}
        </p>
      )}
    </div>
  );
}

/** 카드 이미지 (원본 1080×630) */
function CardImage({ label }: { label: string }) {
  return (
    <Placeholder
      label={label}
      className="aspect-[12/7] w-full shrink-0 lg:aspect-auto lg:h-[315px] lg:w-[540px]"
    />
  );
}

export default function AdvantageSection() {
  return (
    // ===== 키퍼 장점: 시간 절약 / 비용 절약 / 전문 지원 =====
    <div className="relative flex flex-col items-center bg-[#f6f7fa] px-[16px] py-[60px] lg:px-0 lg:py-[120px]">
      <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#222] lg:text-[42px] lg:leading-[63px] lg:tracking-[-1.26px]">
        키퍼만의 특별한 장점
      </h2>
      <h2 className="mt-[12px] text-center text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#333] lg:mt-[24px] lg:text-[22px] lg:leading-[31px] lg:tracking-[-0.44px]">
        사장님의 현실적인 고민을
        <SpaceOrBreak />
        정확히 해결하는 차별화된 솔루션
      </h2>
      <Reveal className="relative mt-[36px] w-full max-w-[480px] lg:mt-[80px] lg:w-[1080px] lg:max-w-none">
        {/* 1. 시간 절약 */}
        <div className="flex w-full flex-col overflow-hidden rounded-[20px] lg:flex-row">
          <CardImage label="시간 절약" />
          <TextBox
            align="left"
            color="#2294E6"
            label="시간 절약"
            title={
              <>
                계약서만 써도
                <SpaceOrBreak />
                스케줄표까지 자동 완성!
              </>
            }
            desc={
              <>
                근로계약서에 근무시간 한 번만 입력하면
                <br />
                스케줄표에 자동으로 반영됩니다.
                <br />
                더 이상 엑셀로 따로 정리하느라 시간 낭비하지 마세요!
              </>
            }
          />
        </div>
        {/* 2. 비용 절약 — PC 에서는 텍스트가 왼쪽(우측 정렬), 모바일은 이미지 먼저 */}
        <div className="mt-[62px] flex w-full flex-col-reverse overflow-hidden rounded-[20px] lg:flex-row">
          <TextBox
            align="right"
            color="#8EC63F"
            label="비용 절약"
            title={
              <>
                알바든 정규직이든,
                <SpaceOrBreak />
                채용 전 월급 미리 계산!
              </>
            }
            desc={
              <>
                복잡한 계약직·정규직 월급 세팅도
                <SpaceOrBreak />
                키퍼에서 간편하게!
                <br />
                비용을 절약하고, 앱에서 쉽게 처리하세요!
              </>
            }
          />
          <CardImage label="비용 절약" />
        </div>
        {/* 3. 전문 지원 */}
        <div className="mt-[62px] flex w-full flex-col overflow-hidden rounded-[20px] lg:flex-row">
          <CardImage label="전문 지원" />
          <TextBox
            align="left"
            color="#FF5C00"
            label="전문 지원"
            title="막막할 땐 키퍼가 도와드려요"
            desc={
              <>
                근로기준법? 4대 보험? 어려운게 너무 많죠.
                <br />
                키퍼 전문 상담을 통해 매장 운영에 꼭 필요한
                <br />
                실무 인사이트를 얻으세요!
                <br />
              </>
            }
            note="(고객센터: 1670-5772)"
          />
        </div>
      </Reveal>
    </div>
  );
}
