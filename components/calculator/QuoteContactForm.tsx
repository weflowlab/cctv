"use client";

/**
 * 견적계산기 2단계: 휴대폰 번호 입력 폼 (원본 Recatch/Airtable 폼, entryPoint "견적계산기")
 * - 구성: 좌측 모델 이미지(PC) / 우측 폼 카드 (모바일은 폼이 위, 이미지가 아래)
 * - 인터랙션
 *   · 헤더: 스크롤 100px 미만 "투명-검정", 이후 흰색 (원본 useHeaderScroll(100, "transparent-black"))
 *   · 진입 시 페이지 맨 위로 스크롤
 *   · 연락처 입력 시 숫자만 남기고 010-0000-0000 형태로 자동 하이픈 (최대 13자)
 *   · 제출 시 검증: 연락처 형식(/^01\d-\d{3,4}-\d{4}$/), 개인정보 동의 필수 → 에러 문구 표시
 *     (첫 제출 이후에는 입력할 때마다 재검증 — react-hook-form 기본 동작과 동일)
 *   · "약관보기" → /privacy-policy 새 탭
 *   · 검증 통과 시 onSubmitted() 호출 → 로딩 단계로 전환
 */
import { useLayoutEffect, useState, type FormEvent } from "react";
import Placeholder from "@/components/common/Placeholder";
import { useHeaderScrollStyle } from "@/components/business/useHeaderScrollStyle";

type Errors = { phone?: string; agree?: string };

/** 원본 TextField(type="tel") onChange 포맷 로직 그대로 */
function formatPhone(raw: string) {
  return raw
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/-{1,2}$/g, "");
}

function validate(phone: string, agree: boolean): Errors {
  const errors: Errors = {};
  if (!/^01\d-\d{3,4}-\d{4}$/.test(phone)) errors.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (!agree) errors.agree = "개인정보 수집 및 이용에 동의해주세요.";
  return errors;
}

/** 칩 앞 체크 아이콘 */
function ChipCheck() {
  return (
    <svg viewBox="0 0 11 8" fill="none" className="w-[7px] lg:w-[11px]" aria-hidden="true">
      <path d="M1 4l3 3 6-6" stroke="#ff5c00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QuoteContactForm({ onSubmitted }: { onSubmitted: () => void }) {
  useHeaderScrollStyle(100, "transparent-black", "white");

  // 단계 진입 시 즉시 맨 위로
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false); // 한 번 제출 시도 후엔 실시간 재검증
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPhoneChange = (value: string) => {
    const next = formatPhone(value);
    setPhone(next);
    if (submitted) setErrors(validate(next, agree));
  };
  const onAgreeChange = (value: boolean) => {
    setAgree(value);
    if (submitted) setErrors(validate(phone, value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(phone, agree);
    setErrors(next);
    if (next.phone || next.agree) return;

    setIsSubmitting(true);
    // TODO: API 연동 — 원본은 /api/airtable 로 연락처 + 계산 결과(localStorage calculator_result) + UTM 을 전송
    await new Promise((r) => setTimeout(r, 300));
    setIsSubmitting(false);
    onSubmitted();
  };

  return (
    // 헤더 밑으로 깔리는 연주황 배경 영역 (원본 .minus-top-margin)
    <div className="relative mt-[calc(-1*var(--header-height-mobile))] flex h-auto w-full min-w-[360px] flex-auto flex-col-reverse items-center justify-start gap-[28px] overflow-hidden bg-[#fff6f1] px-[20px] pt-[calc(var(--header-height-mobile)+24px)] lg:mt-[calc(-1*var(--header-height))] lg:h-[867px] lg:flex-[1_0_0] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[32px] lg:px-0 lg:pt-[calc(var(--header-height)+90px)]">
      {/* ===== 모델 이미지: PC 폭 512px(하단 그라데이션 페이드) / 모바일 높이 300px ===== */}
      <div className="relative -mb-px lg:h-max lg:after:absolute lg:after:bottom-0 lg:after:left-[-40px] lg:after:h-[349px] lg:after:w-full lg:after:bg-[linear-gradient(180deg,rgba(255,246,241,0)_0%,#fff6f1_75.64%)] lg:after:content-['']">
        <div className="lg:hidden">
          <Placeholder label="모델 안내 이미지 (모바일)" className="aspect-[399/449] h-[300px]" />
        </div>
        <div className="hidden lg:block">
          <Placeholder label="모델 안내 이미지" className="aspect-[912/1760] w-[512px]" />
        </div>
      </div>

      {/* ===== 폼 카드 ===== */}
      <div className="flex h-fit w-full max-w-[528px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_0_rgba(0,0,0,0.04)]">
        <form className="w-full bg-white" onSubmit={handleSubmit} noValidate>
          <div className="flex w-full flex-col p-[24px] lg:p-[44px]">
            {/* 안내 문구: 칩 / 타이틀 / 리뷰 / 설명 */}
            <div className="flex flex-col">
              <div className="mb-[12px] flex gap-[6px] lg:mb-[18px] lg:gap-[10px]">
                {["무약정", "설치비 0원"].map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center gap-[4px] rounded-[4px] border-[0.663px] border-[#dadde5] bg-white px-[6px] py-[4px] text-[11px] font-medium leading-[1.05] tracking-[-0.2px] text-[#222] lg:gap-[5.306px] lg:rounded-[5.306px] lg:px-[10px] lg:py-[6px] lg:text-[13px] lg:leading-[1.38] lg:tracking-[-0.3px]"
                  >
                    <ChipCheck />
                    {chip}
                  </div>
                ))}
              </div>
              <h2 className="mb-[4px] whitespace-pre-wrap text-[24px] font-bold leading-[140%] tracking-[-0.64px] text-[#222] lg:mb-[8px] lg:text-[32px]">
                <span className="whitespace-nowrap">휴대폰번호 알려주시면</span>{" "}
                <span className="whitespace-nowrap">
                  <strong className="text-[#ff5c00]">카톡으로 견적 </strong>연락드릴게요.
                </span>
              </h2>
              <p className="mb-[9px] text-[11px] font-normal leading-[140%] tracking-[-0.28px] text-[#5a5a5a] lg:mb-[16px] lg:text-[14px]">
                <strong className="text-[#ff7500]">★★★★★ </strong>4.96· 네이버 스마트스토어
              </p>
              <p className="mb-[15px] text-[13px] font-normal leading-[140%] tracking-[-0.32px] text-[#1d1d1f] lg:mb-[24px] lg:text-[16px]">
                매장에 맞는 CCTV와 수량을 추천해드릴게요.
              </p>
            </div>

            {/* 연락처 필드: 국가코드(고정) + 번호 입력(자동 하이픈) */}
            <div className="relative mb-[16px] flex w-full flex-col lg:mb-0">
              <label
                htmlFor="연락처"
                className="mb-[8px] text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]"
              >
                연락처 <span className="text-[#f27a1a]">*</span>
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  disabled
                  placeholder="🇰🇷 +82"
                  className="h-[56px] w-[82px] shrink-0 rounded-[8px] border border-[#dadde5] bg-white p-0 pl-[16px] text-[14px] text-[#4a5565] outline-0 lg:text-[16px]"
                />
                <input
                  id="연락처"
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  className={`h-[52px] w-full rounded-[8px] border bg-white px-[12px] py-[16px] pr-[6px] text-[14px] font-normal leading-[140%] tracking-[-0.32px] text-[#4a5565] outline-0 placeholder:text-[#999] focus:border-[#ff5c00] lg:h-[54px] lg:p-[18px] lg:pr-[6px] lg:text-[16px] ${
                    errors.phone ? "border-[#ff5c00]" : "border-[#dadde5]"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[12px] text-[#ff5c00]">{errors.phone}</p>}
            </div>

            {/* 약관 동의: 원형 체크박스 + 문구(클릭 토글) + 약관보기 */}
            <div className="mb-[16px] mt-[32px] flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  <label className="relative flex cursor-pointer items-center gap-[8px]">
                    <input
                      type="checkbox"
                      name="약관1"
                      checked={agree}
                      onChange={(e) => onAgreeChange(e.target.checked)}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <div
                      className={`flex h-[20px] w-[20px] items-center justify-center rounded-full transition-all duration-200 ease-in-out peer-focus-visible:border-[#ff5c00] lg:h-[22px] lg:w-[22px] ${
                        agree ? "border-0 bg-[#FF5C00]" : "border-2 border-[#EEE] bg-white"
                      }`}
                    >
                      <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        className={`h-[14px] w-[14px] text-white transition-opacity duration-200 ${agree ? "opacity-100" : "opacity-0"}`}
                        aria-hidden="true"
                      >
                        <path
                          d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                  <p
                    onClick={() => onAgreeChange(!agree)}
                    className="ml-[8px] cursor-pointer text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#333] lg:ml-[10px] lg:text-[16px]"
                  >
                    [필수] 개인정보 수집 및 이용 동의
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open("/terms/personal", "_blank")}
                    className="ml-auto flex h-full cursor-pointer items-center text-[12px] font-normal tracking-[-0.28px] text-[#999] underline outline-none focus-visible:text-[#ff5c00] lg:ml-[8px] lg:translate-y-[2px] lg:text-[14px]"
                  >
                    약관보기
                  </button>
                </div>
                {errors.agree && <p className="relative bottom-[-4px] text-[12px] text-[#ff5c00]">{errors.agree}</p>}
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-[8px] bg-[#ff5c00] p-[18px] text-white focus-visible:outline-offset-2 focus-visible:outline-[#ff5c00]"
            >
              <div className="text-[16px] font-bold leading-[1.4] tracking-[-0.36px] lg:text-[20px]">
                {isSubmitting ? "전송 중..." : "CCTV 견적확인"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
