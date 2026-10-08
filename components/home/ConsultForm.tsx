"use client";

/**
 * 홈 상담 신청 폼 (원본 2946 청크 16217 모듈 → entryPoint "메인_페이지" → er 컴포넌트 isPage=false)
 * - 연한 주황(#fff6f1) 배경. PC: [모델 이미지 + 손글씨 장식] | [폼 카드] 가로 배치 / 모바일: 폼이 위, 모델이 아래.
 * - 입력: 성함(매장명), 연락처(🇰🇷 +82 고정칸 + 숫자 입력 시 자동 하이픈 010-0000-0000, 최대 13자).
 * - 약관: 원형 체크박스 + 문구 클릭으로 토글, "약관보기" 클릭 시 개인정보 처리방침을 새 창으로 연다(원본 window.open).
 * - 유효성(원본 zod 스키마 그대로, 제출 시 검사 → 이후 입력할 때마다 재검사):
 *   · 성함 2자 이상  · 연락처 /^01\d-\d{3,4}-\d{4}$/  · 약관 동의 필수
 * - 제출 성공 시: 화면 중앙에 "문의가 접수되었습니다!" 카드가 0.5s 페이드 인 → 2초 후 사라짐, 폼 초기화.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import Placeholder from "@/components/common/Placeholder";
import { CheckboxCheckIcon, ChipCheckIcon } from "./icons";

type Values = { name: string; phone: string; agree: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = { name: "", phone: "", agree: false };

/** 원본 zod 스키마(en)와 동일한 검사 */
function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.length < 2) errors.name = "성함은 필수입니다.";
  if (!/^01\d-\d{3,4}-\d{4}$/.test(v.phone)) errors.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (v.agree !== true) errors.agree = "개인정보 수집 및 이용에 동의해주세요.";
  return errors;
}

/** 원본 TextField(type="tel") onChange: 숫자만 남기고 3-4-4 로 하이픈 삽입, 끝의 하이픈 제거 */
function formatPhone(raw: string) {
  return raw
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/-{1,2}$/g, "");
}

const INPUT =
  "h-[52px] w-full rounded-[8px] border border-[#dadde5] bg-white py-[16px] pl-[12px] pr-[6px] text-[14px] font-normal leading-[1.4] tracking-[-0.32px] text-[#4a5565] outline-0 placeholder:text-[#999] focus:border-brand lg:h-[54px] lg:py-[18px] lg:pl-[18px] lg:text-[16px]";
const LABEL =
  "mb-[8px] text-[13px] font-medium leading-[1.4] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]";
const ERROR = "text-[12px] text-brand";

export default function ConsultForm() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  // react-hook-form 기본 동작: 첫 제출 전에는 검사하지 않고, 제출 이후에는 값이 바뀔 때마다 재검사
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  // 값 갱신 + (제출 이후라면) 즉시 재검사
  const update = (patch: Partial<Values>) => {
    const next = { ...values, ...patch };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const result = validate(values);
    setErrors(result);
    if (Object.keys(result).length > 0) return;

    setSubmitting(true);
    // TODO: API 연동 — 원본은 /api/airtable 로 POST (성함·연락처 + UTM/진입경로 "메인_페이지"), 실패 시 alert
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);

    // 성공: 접수 완료 카드 표시 → 폼 초기화 → 2초 후 숨김
    setShowSuccess(true);
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    // ===== 상담 폼 섹션: 모델 이미지 + 폼 카드 =====
    <div className="relative flex h-auto w-full min-w-[360px] flex-col-reverse items-center justify-start gap-[28px] overflow-hidden bg-brand-light px-[20px] pt-[60px] lg:h-[867px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[32px] lg:px-0 lg:pt-[110px]">
      {/* ===== 모델 이미지 + 손글씨 장식 2개 (원본 sc-6f6088f0, type "short") ===== */}
      <div className="relative mb-[-1px]">
        <Placeholder label="모델 안내 이미지" className="h-[300px] w-[240px] lg:h-[757px] lg:w-[512px]" />
        {/* 손글씨 문구 장식 (원본 122x81 주황 SVG) */}
        <div className="absolute right-[8px] top-[64px] z-[1] lg:right-[66px] lg:top-[120px]">
          <Placeholder kind="icon" label="손글씨 장식 문구" className="h-[54px] w-[81px] lg:h-[81px] lg:w-[122px]" />
        </div>
        {/* 손글씨 화살표 장식 (원본 113x55, 모바일 -60도 회전 + 좌우반전) */}
        <div className="absolute right-[12px] top-[12px] z-[1] -scale-x-100 -rotate-60 lg:right-0 lg:top-[66px] lg:scale-x-100 lg:rotate-0">
          <Placeholder kind="icon" label="손글씨 화살표 장식" className="h-[38px] w-[78.505px] lg:h-[55px] lg:w-[113px]" />
        </div>
      </div>

      {/* ===== 폼 카드 ===== */}
      <div className="flex h-fit w-full max-w-[528px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_0_rgba(0,0,0,0.04)]">
        <form className="w-full bg-white" onSubmit={onSubmit} noValidate>
          <div className="flex w-full flex-col p-[24px] lg:p-[44px]">
            {/* --- 폼 헤더: 칩 2개 + 타이틀 + 별점 + 설명 --- */}
            <div className="flex flex-col">
              <div className="mb-[12px] flex gap-[6px] lg:mb-[18px] lg:gap-[10px]">
                {["무약정", "설치비 0원"].map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center gap-[4px] rounded-[4px] border-[0.663px] border-[#dadde5] bg-white px-[6px] py-[4px] text-[11px] font-medium leading-[1.05] tracking-[-0.2px] text-[#222] lg:gap-[5.306px] lg:rounded-[5.306px] lg:px-[10px] lg:py-[6px] lg:text-[13px] lg:leading-[1.38] lg:tracking-[-0.3px]"
                  >
                    <ChipCheckIcon className="w-[7px] lg:w-[11px]" />
                    {chip}
                  </div>
                ))}
              </div>
              <h2 className="mb-[4px] whitespace-pre-wrap text-[24px] font-bold leading-[1.4] tracking-[-0.64px] text-[#222] lg:mb-[8px] lg:text-[32px]">
                <span className="whitespace-nowrap">휴대폰번호 알려주시면</span>{" "}
                <span className="whitespace-nowrap">
                  <strong className="text-brand">바로 </strong>연락드릴게요.
                </span>
              </h2>
              <p className="mb-[9px] text-[11px] font-normal leading-[1.4] tracking-[-0.28px] text-[#5a5a5a] lg:mb-[16px] lg:text-[14px]">
                <strong className="text-[#ff7500]">★★★★★ </strong>4.96· 네이버 스마트스토어
              </p>
              <p className="mb-[15px] text-[13px] font-normal leading-[1.4] tracking-[-0.32px] text-[#1d1d1f] lg:mb-[24px] lg:text-[16px]">
                매장에 맞는 CCTV와 수량을 추천해드릴게요.
              </p>
            </div>

            {/* --- 성함(매장명) --- */}
            <div className="relative mb-[16px] flex w-full flex-col lg:mb-[10px]">
              <label htmlFor="성함" className={LABEL}>
                성함(매장명) <span className="text-[#f27a1a]">*</span>
              </label>
              <input
                id="성함"
                name="성함"
                placeholder="성함을 입력해주세요"
                className={INPUT}
                value={values.name}
                onChange={(e) => update({ name: e.target.value })}
              />
              {errors.name && <p className={ERROR}>{errors.name}</p>}
            </div>

            {/* --- 연락처: 국가코드(비활성) + 자동 하이픈 입력 --- */}
            <div className="relative flex w-full flex-col">
              <label htmlFor="연락처" className={LABEL}>
                연락처 <span className="text-[#f27a1a]">*</span>
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  disabled
                  placeholder="🇰🇷 +82"
                  className={`${INPUT} h-[56px]! w-[82px] shrink-0 p-0! pl-[16px]!`}
                />
                <input
                  id="연락처"
                  name="연락처"
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  className={INPUT}
                  value={values.phone}
                  // 입력할 때마다 숫자만 추출 후 010-0000-0000 형태로 하이픈 자동 삽입
                  onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                />
              </div>
              {errors.phone && <p className={ERROR}>{errors.phone}</p>}
            </div>

            {/* --- 약관 동의 --- */}
            <div className="mb-[16px] mt-[24px] flex flex-col gap-[16px] lg:mt-[32px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  {/* 원형 커스텀 체크박스 (실제 input 은 숨김, 포커스 시 테두리 주황) */}
                  <label className="relative flex cursor-pointer items-center gap-[8px]">
                    <input
                      type="checkbox"
                      name="약관1"
                      className="peer absolute h-0 w-0 opacity-0"
                      checked={values.agree}
                      onChange={(e) => update({ agree: e.target.checked })}
                    />
                    <div
                      className={`flex h-[20px] w-[20px] items-center justify-center rounded-full transition-all duration-200 ease-in-out peer-focus-visible:border-brand lg:h-[22px] lg:w-[22px] ${
                        values.agree ? "border-0 bg-[#FF5C00]" : "border-2 border-[#EEE] bg-white"
                      }`}
                    >
                      <CheckboxCheckIcon
                        className={`h-[14px] w-[14px] text-white transition-opacity duration-200 ease-in-out ${
                          values.agree ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </label>
                  {/* 문구 클릭으로도 토글 (원본 p onClick) */}
                  <p
                    className="ml-[8px] cursor-pointer text-[13px] font-medium leading-[1.4] tracking-[-0.32px] text-[#333] lg:ml-[10px] lg:text-[16px]"
                    onClick={() => update({ agree: !values.agree })}
                  >
                    [필수] 개인정보 수집 및 이용 동의
                  </p>
                  {/* 약관보기: 원본은 /privacy-policy 새 창 → 클론에서는 개인정보처리방침 페이지 */}
                  <button
                    type="button"
                    className="ml-auto flex h-full cursor-pointer items-center text-[12px] font-normal tracking-[-0.28px] text-[#999] underline outline-none focus-visible:text-brand lg:ml-[8px] lg:translate-y-[2px] lg:text-[14px]"
                    onClick={() => window.open("/terms/personal", "_blank")}
                  >
                    약관보기
                  </button>
                </div>
                {errors.agree && <p className={`${ERROR} relative bottom-[-4px]`}>{errors.agree}</p>}
              </div>
            </div>

            {/* --- 제출 버튼 (전송 중에는 비활성 + 문구 변경) --- */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer rounded-[8px] bg-brand p-[18px] text-white focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <div className="text-[16px] font-bold leading-[1.4] tracking-[-0.36px] lg:text-[20px]">
                {submitting ? "전송 중..." : "빠른 상담하기"}
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* ===== 접수 완료 카드: 화면 중앙 fixed, 0.5s 페이드 (2초 후 자동 숨김) ===== */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 top-1/2 z-[100] w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#fafafa] px-[28px] py-[60px] text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.06)] transition-[opacity,visibility] duration-500 ease-in-out ${
          showSuccess ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto mb-[24px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-[40px] text-white">
          ✓
        </div>
        <h2 className="mb-[12px] text-[22px] font-bold text-[#1a1a1a]">문의가 접수되었습니다!</h2>
        <p className="text-[15px] leading-[1.6] text-[#666]">
          빠른 시일 내에 담당자가
          <br />
          연락드릴 예정입니다.
        </p>
      </div>
    </div>
  );
}
