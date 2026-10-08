/**
 * 창업 A to Z 가이드 — "가이드북에는 어떤 내용이 들어있을까?" 섹션 (#f6f7fa 배경)
 * - 5개의 콘텐츠 카드(아이콘/제목/설명/체크리스트). 첫 카드는 PC 에서 2열 전체를 차지하는 가로형.
 * - 하단 "무료 다운로드하기" 버튼 → /contact/a-to-z-guide (원본 router.push).
 */
import Link from "next/link";
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import { BreakOrSpace, SpaceOrBreak } from "@/components/guides/shared/Breaks";
import { ArrowRightIcon, CheckOutlineIcon } from "@/components/guides/shared/icons";

type Card = {
  icon: string;
  title: ReactNode;
  content?: ReactNode;
  checkList?: string[];
};

// 원본 데이터 그대로 (icon 은 a_to_z/icon_{icon}.png)
const CARDS: Card[] = [
  {
    icon: "chart",
    title: "시기별 창업 준비 로드맵",
    content: (
      <>
        창업 9개월 전부터 오픈 이후까지,
        <br />
        각 시점에 꼭 해야 할 준비 항목을 정리했습니다.
      </>
    ),
    checkList: [
      "창업 9개월, 6개월, 3개월 전 그리고 오픈 이후에는 어떤 준비가 필요할까요?",
      "업종 및 아이템 구체화, 자금 계획 수립, 입지 분석과 인허가 절차까지 다양한 점검 포인트를 지금 한 눈에 살펴보세요.",
    ],
  },
  {
    icon: "book",
    title: (
      <>
        바로 활용 가능한
        <BreakOrSpace />
        체크리스트 5종
      </>
    ),
    content:
      "모든 창업 준비는 ‘해야 할 일’을 아는 것보다 ‘누락되지 않게 관리하는 것’이 더 중요합니다. 각 단계마다 필요한 행정 절차, 계약 확인 항목, 오픈 준비 사항 등을 체크박스 형태로 정리해 창업 과정 전체를 스스로 점검할 수 있습니다.",
  },
  {
    icon: "doc",
    title: (
      <>
        놓치기 쉬운 정부 지원,
        <br />
        정책자금 활용 가이드
      </>
    ),
    content:
      "예비 창업자 유형별로 받을 수 있는 주요 지원사업과 융자 제도, 활용 순서를 꼼꼼하게 정리해 실제 신청까지 연결할 수 있도록 구성했습니다.",
  },
  {
    icon: "hourglass",
    title: (
      <>
        실제 일어날 수 있는
        <br />
        리스크와 해결 방법
      </>
    ),
    content: "선배 사장님들의 실패 사례와 해결 방법을 수록했습니다.",
    checkList: [
      "점포 계약 전 놓치기 쉬운 법적 확인 포인트",
      "불필요한 초기비용을 줄이는 인테리어 노하우",
      "오픈 첫 주 매출, 고객 데이터를 정확하게 분석하는 방법",
    ],
  },
  {
    icon: "computer",
    title: (
      <>
        창업 가이드,
        <br />
        이런 분들에게 추천합니다.
      </>
    ),
    checkList: [
      "처음 창업을 준비하며 무엇부터 해야 할지 막막한 예비 사장님",
      "정보의 홍수 속에서, ‘내 상황에 맞는 단계별 계획’을 찾고 싶은 누구나",
      "사업 방향을 다시 점검하고 싶은 1년 차 이하의 자영업자",
    ],
  },
];

/** 콘텐츠 카드 — isHorizontal(첫 카드)이면 PC 높이 284px 가로 배치, 나머지는 446px 세로 배치 */
function ContentCard({ card, isHorizontal }: { card: Card; isHorizontal: boolean }) {
  return (
    <div
      className={`flex h-auto w-full flex-col justify-between rounded-[20px] border border-[#eee] bg-white p-[24px] lg:px-[48px] lg:py-[44px] ${
        isHorizontal ? "lg:h-[284px] lg:flex-row" : "lg:h-[446px] lg:flex-col"
      }`}
    >
      <div className="shrink-0">
        <Placeholder label="icon" kind="icon" className="h-[56px] w-[56px] lg:h-[80px] lg:w-[80px]" />
        <h3 className="mt-[10px] text-[20px] leading-[27px] font-bold tracking-[-0.2px] text-[#222] lg:mt-[16px] lg:text-[28px] lg:leading-[38px] lg:tracking-[-0.28px]">
          {card.title}
        </h3>
        {card.content && (
          <p className="mt-[8px] text-[14px] leading-[23px] font-normal tracking-[-0.5px] text-[#666] lg:text-[17px] lg:leading-[28px]">
            {card.content}
          </p>
        )}
      </div>

      {/* 체크리스트는 2개 이상일 때만 노출 (원본 조건) */}
      {card.checkList && card.checkList.length > 1 && (
        <div className={`flex max-w-[490px] ${isHorizontal ? "items-end" : "items-start"}`}>
          <div className="mt-[16px] flex w-full flex-col gap-[8px] lg:mt-0">
            {card.checkList.map((item) => (
              <div key={item} className="relative flex w-full gap-[6px] rounded-[6px] bg-[#f6f7fa] px-[10px] py-[8px]">
                <div className="shrink-0 basis-[20px] text-[#666]">
                  <CheckOutlineIcon width={20} height={20} />
                </div>
                <p className="text-[13px] leading-[21px] font-normal tracking-[-0.5px] text-[#666] lg:text-[15px] lg:leading-[24px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contents() {
  return (
    // ===== 가이드북 구성: 카드 그리드 + 다운로드 버튼 =====
    <section className="relative block w-full bg-[#f6f7fa] px-4 py-[60px] lg:flex lg:justify-center lg:px-0 lg:py-[140px]">
      <div className="relative w-full lg:w-[1080px]">
        <h2 className="text-center text-[26px] leading-[37px] font-bold tracking-[-1px] text-[#222] lg:text-[42px] lg:leading-[60px]">
          창업 준비 <strong className="text-[#ff5c00]">가이드북</strong>에는
          <SpaceOrBreak />
          어떤 내용이 들어있을까?
        </h2>

        {/* 모바일: 세로 스택 / PC: 2열 그리드(첫 카드 전체폭) */}
        <div className="mt-[64px] flex flex-col gap-[16px] lg:grid lg:grid-cols-2 lg:gap-[24px] lg:[&>:first-child]:col-span-full">
          {CARDS.map((card, i) => (
            <ContentCard key={card.icon} card={card} isHorizontal={i === 0} />
          ))}
        </div>

        <div className="mt-[16px] flex w-full justify-center lg:mt-[36px]">
          {/* TODO: 이벤트 트래킹 leadgen_startupguide_atoz_click */}
          <Link
            href="/contact/a-to-z-guide"
            aria-label="무료 다운로드하기"
            className="mx-auto mt-[16px] inline-flex h-[44px] w-[182px] items-center justify-center gap-[6px] rounded-[36px] bg-[#ff5c00] text-[15px] leading-[22px] font-bold tracking-[-0.3px] text-white lg:m-0 lg:h-[58px] lg:w-[318px] lg:gap-[8px] lg:rounded-[48px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px] lg:hover:bg-[#e83b05]"
          >
            무료 다운로드하기
            <ArrowRightIcon className="w-[12px] lg:w-[16px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
