"use client";

/**
 * FAQ 카테고리 탭 + 아코디언 목록 (keeper components/faq 의 탭·카드 스타일 복사)
 * - 탭: [전체·설치·렌탈·AS·기타] — 누른 탭의 질문만 필터 (URL 변경 없음). 탭 바꾸면 열린 항목 닫힘.
 * - 아코디언: 한 번에 하나만 열림. 다시 누르면 닫힘.
 *   펼침 애니메이션은 grid-template-rows 0fr → 1fr 전환(0.3s)으로 높이 자동 계산 없이 부드럽게 처리.
 * - 질문 번호(Q1~)는 현재 보이는 목록 기준으로 매김.
 */
import { useState } from "react";
import { FAQ_ITEMS, FAQ_TABS, type FaqCategory } from "./data";

type Tab = "전체" | FaqCategory;

export default function FaqAccordion() {
  const [tab, setTab] = useState<Tab>("전체");
  // 열린 질문 (question 문자열을 키로 사용, null = 모두 닫힘)
  const [openKey, setOpenKey] = useState<string | null>(null);

  const items = tab === "전체" ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === tab);

  const selectTab = (t: Tab) => {
    setTab(t);
    setOpenKey(null);
  };

  return (
    <>
      {/* ===== 카테고리 탭: 선택 주황 배경, hover 시에도 주황 ===== */}
      <div className="mx-0 mb-[40px] mt-[32px] flex w-full max-w-[1080px] flex-wrap items-center justify-center gap-[10px] px-[12px] lg:mb-[64px] lg:mt-[64px] lg:justify-start lg:gap-[14px] lg:px-0">
        {(["전체", ...FAQ_TABS] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => selectTab(t)}
            aria-pressed={tab === t}
            className={`flex h-[38px] w-max cursor-pointer items-center rounded-[100px] px-[14px] text-[14px] font-semibold leading-[130%] tracking-[-1px] transition-colors duration-200 ease-in-out hover:bg-[#ff5c00] hover:text-white lg:h-[44px] lg:px-[20px] lg:text-[16px] ${
              tab === t ? "bg-[#ff5c00] text-white" : "bg-[#2c2d30] text-[#afb2ba]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ===== 아코디언 목록: 반투명 유리 카드 안에 질문 행, 행 사이 구분선 ===== */}
      <div className="w-full max-w-[1080px] px-[24px] lg:px-0">
        <div className="rounded-[16px] bg-[linear-gradient(159deg,rgba(255,255,255,0.05)_13.88%,rgba(153,153,153,0.06)_91.88%)] px-[20px] py-[8px] backdrop-blur-[32px] lg:rounded-[24px] lg:px-[40px] lg:py-[16px]">
          {items.map((item, i) => {
            const open = openKey === item.question;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={item.question} className="border-b border-white/10 last:border-b-0">
                {/* 질문 행: 클릭 시 열기/닫기 (다른 항목은 자동으로 닫힘) */}
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : item.question)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-start gap-[8px] py-[20px] text-left text-[17px] font-semibold leading-[144%] tracking-[-0.6px] lg:py-[28px] lg:text-[22px]"
                  >
                    <b className="shrink-0 text-[#ff5c00]">Q{i + 1}.</b>
                    <span className="flex-1">{item.question}</span>
                    {/* 펼침 표시: + 아이콘이 45° 회전해 × 로 */}
                    <span
                      aria-hidden
                      className={`ml-[8px] shrink-0 text-[22px] leading-[1.2] transition-transform duration-300 lg:text-[26px] ${
                        open ? "rotate-45 text-[#ff5c00]" : "text-white/60"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* 답변: grid-rows 0fr ↔ 1fr 전환으로 부드럽게 펼침 */}
                <div
                  id={panelId}
                  role="region"
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="whitespace-pre-line pb-[20px] text-[15px] font-normal leading-[160%] tracking-[-0.36px] text-white/80 lg:pb-[28px] lg:pl-[40px] lg:text-[18px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
