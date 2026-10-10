"use client";

/**
 * FAQ 카테고리 탭 + 아코디언 목록 (keeper components/faq 의 탭·카드 스타일 복사)
 * - 탭: [전체·설치·렌탈·AS·기타] — 누른 탭의 질문만 필터 (URL 변경 없음). 탭 바꾸면 열린 항목 닫힘.
 * - 아코디언: 한 번에 하나만 열림. 다시 누르면 닫힘.
 *   펼침 애니메이션은 grid-template-rows 0fr → 1fr 전환(0.3s)으로 높이 자동 계산 없이 부드럽게 처리.
 * - 질문 번호(Q1~)는 현재 보이는 목록 기준으로 매김. 번호 칸 너비를 고정(두 자리 Q10. 기준)해 질문 글 시작선을 맞춤.
 * - 답변은 같은 너비의 "A." 칸 + 본문 → 질문 글과 답변 글 시작선이 같음.
 * - 옵션 props (기본값이면 /faq 화면 그대로):
 *   items — 넘기면 그 목록만 표시하고 카테고리 탭은 숨김 (홈 FAQ BEST 5 용)
 *   tone  — "dark"(기본, /faq 어두운 배경) / "light"(흰 배경 위: 흰 카드 + 진한 글씨)
 */
import { useState } from "react";
import { FAQ_ITEMS, FAQ_TABS, type FaqCategory, type FaqItem } from "./data";

type Tab = "전체" | FaqCategory;

/** Q·A 표시 칸 — 두 자리 번호(Q10.)가 들어가는 고정 너비, 숫자 폭 균일 */
const MARK_COL = "w-[42px] shrink-0 tabular-nums lg:w-[54px]";

type FaqAccordionProps = {
  /** 고정 목록 (넘기면 탭 숨김) */
  items?: FaqItem[];
  /** 배경 톤 — 기본 dark */
  tone?: "dark" | "light";
};

export default function FaqAccordion({ items: fixedItems, tone = "dark" }: FaqAccordionProps = {}) {
  const light = tone === "light";
  const [tab, setTab] = useState<Tab>("전체");
  // 열린 질문 (question 문자열을 키로 사용, null = 모두 닫힘)
  const [openKey, setOpenKey] = useState<string | null>(null);

  const items = fixedItems ?? (tab === "전체" ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === tab));

  const selectTab = (t: Tab) => {
    setTab(t);
    setOpenKey(null);
  };

  return (
    <>
      {/* ===== 카테고리 탭: 선택 브랜드색 배경, hover 시에도 브랜드색 (고정 목록이면 숨김) ===== */}
      {!fixedItems && (
        <div className="mx-0 mb-[40px] mt-[32px] flex w-full max-w-[1080px] flex-wrap items-center justify-center gap-[10px] px-[12px] lg:mb-[64px] lg:mt-[64px] lg:justify-start lg:gap-[14px] lg:px-0">
          {(["전체", ...FAQ_TABS] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => selectTab(t)}
              aria-pressed={tab === t}
              className={`flex h-[38px] w-max cursor-pointer items-center rounded-[100px] px-[14px] text-[14px] font-semibold leading-[130%] tracking-[-1px] transition-colors duration-200 ease-in-out hover:bg-brand hover:text-white lg:h-[44px] lg:px-[20px] lg:text-[16px] ${
                tab === t ? "bg-brand text-white" : "bg-[#2c2d30] text-[#afb2ba]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* ===== 아코디언 목록: 반투명 유리 카드 안에 질문 행, 행 사이 구분선 ===== */}
      <div className="w-full max-w-[1080px] px-[24px] lg:px-0">
        <div
          className={
            light
              ? "rounded-[16px] border border-[#ececec] bg-white px-[20px] py-[8px] text-[#222] lg:rounded-[24px] lg:px-[40px] lg:py-[16px]"
              : "rounded-[16px] bg-[linear-gradient(159deg,rgba(255,255,255,0.05)_13.88%,rgba(153,153,153,0.06)_91.88%)] px-[20px] py-[8px] backdrop-blur-[32px] lg:rounded-[24px] lg:px-[40px] lg:py-[16px]"
          }
        >
          {items.map((item, i) => {
            const open = openKey === item.question;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={item.question} className={`border-b last:border-b-0 ${light ? "border-[#ececec]" : "border-white/10"}`}>
                {/* 질문 행: 클릭 시 열기/닫기 (다른 항목은 자동으로 닫힘) */}
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : item.question)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-start gap-[8px] py-[20px] text-left text-[17px] font-semibold leading-[144%] tracking-[-0.6px] lg:py-[28px] lg:text-[22px]"
                  >
                    <b className={`${MARK_COL} text-point-strong`}>Q{i + 1}.</b>
                    <span className="flex-1">{item.question}</span>
                    {/* 펼침 표시: + 아이콘이 45° 회전해 × 로 */}
                    <span
                      aria-hidden
                      className={`ml-[8px] shrink-0 text-[22px] leading-[1.2] transition-transform duration-300 lg:text-[26px] ${
                        open ? "rotate-45 text-point-strong" : light ? "text-[#999]" : "text-white/60"
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
                    <div className="flex items-start gap-[8px] pb-[20px] lg:pb-[28px]">
                      {/* A. 표시 — 질문 번호 칸과 같은 너비 (글자 크기는 질문과 같게). 줄 높이 기준 위쪽 정렬 → "A." 와 답변 첫 줄의 가운데가 맞음 */}
                      <b
                        className={`${MARK_COL} text-[17px] font-semibold leading-[144%] tracking-[-0.6px] lg:text-[22px] ${
                          light ? "text-[#aaa]" : "text-white/50"
                        }`}
                      >
                        A.
                      </b>
                      <p
                        className={`flex-1 whitespace-pre-line pt-[1px] text-[15px] font-normal leading-[160%] tracking-[-0.36px] lg:pt-[2px] lg:text-[18px] ${
                          light ? "text-[#555]" : "text-white/80"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
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
