"use client";

/**
 * 도입문의 빠른 상담 폼 (원본 sc-a4e9811a-* / 폼 공통 sc-5c91eeb6-* / 체크박스 sc-f07a4707-*)
 * - 필드: 성함(매장명)*, 연락처*(+82 고정 국가코드 + 휴대폰번호), [필수] 개인정보 수집 및 이용 동의
 * - 원본 동작 (react-hook-form + zod):
 *   · 제출 시 유효성 검사 → 첫 에러 필드로 포커스, 필드 아래 주황 에러 문구, 에러 입력칸 테두리 주황
 *   · 한 번 제출한 뒤부터는 입력할 때마다 재검사 (RHF reValidateMode: onChange)
 *   · 연락처는 숫자만 남기고 3-4-4 자동 하이픈 (maxLength 13)
 *   · 동의 문구 클릭으로도 체크 토글, "약관보기" 는 개인정보처리방침 새 창
 *   · 제출 중 버튼 문구 "전송 중..." + 비활성
 *   · 성공 시 폼 초기화 + 화면 가운데 성공 팝업 2초 노출(opacity 0.5s 전환) → 2초 후 /story 로 이동
 */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Values = { name: string; phone: string; agree: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = { name: "", phone: "", agree: false };

/** 원본 zod 스키마와 동일한 검사 규칙/문구 */
function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.length < 2) e.name = "성함은 필수입니다.";
  if (!/^01\d-\d{3,4}-\d{4}$/.test(v.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (v.agree !== true) e.agree = "개인정보 수집 및 이용에 동의해주세요.";
  return e;
}

/** 원본 전화번호 포맷터: 숫자만 → 3-4-4 하이픈, 끝에 남는 하이픈 제거 */
function formatPhone(raw: string) {
  return raw
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/-{1,2}$/g, "");
}

/** 입력칸 공통 스타일 (에러 시 테두리 주황, 포커스 시 주황) */
const inputClass = (hasError: boolean) =>
  `h-[52px] w-full rounded-[8px] border bg-white px-[12px] py-[16px] pr-[6px] text-[14px] font-normal leading-[140%] tracking-[-0.32px] text-[#4a5565] outline-0 placeholder:text-[#999] focus:border-[#ff5c00] lg:h-[54px] lg:p-[18px] lg:pr-[6px] lg:text-[16px] ${
    hasError ? "border-[#ff5c00]" : "border-[#dadde5]"
  }`;

const labelClass =
  "mb-[8px] text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]";

/** 필드 아래 에러 문구 */
function ErrorText({ children, className = "" }: { children?: string; className?: string }) {
  if (!children) return null;
  return <p className={`text-[12px] text-[#ff5c00] ${className}`}>{children}</p>;
}

/** 체크 아이콘 (원본 체크박스 내부 SVG) */
function CheckMark({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[14px] w-[14px] text-white transition-opacity duration-200 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden
    >
      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 칩 체크 아이콘 (원본 11x8 주황 체크) */
function ChipCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={11} height={8} viewBox="0 0 11 8" fill="none" className="w-[7px] lg:w-[11px]" aria-hidden>
      <path stroke="#FF5C00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.99} d="m9.617.995-5.928 5.97L.994 4.25" />
    </svg>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  // 한 번이라도 제출을 시도했는지 (이후 입력마다 재검사)
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 성공 팝업 노출 여부
  const [showSuccess, setShowSuccess] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 언마운트 시 팝업/리다이렉트 타이머 정리
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  // 값 변경 공통 처리: 제출 이후라면 즉시 재검사
  const update = (patch: Partial<Values>) => {
    const next = { ...values, ...patch };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);

    // 첫 번째 에러 필드로 포커스 (RHF shouldFocusError)
    if (errs.name) return nameRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.agree) return agreeRef.current?.focus();

    setIsSubmitting(true);
    // TODO: API 연동 (원본: /api/airtable 로 성함·연락처 + 진입경로 "도입문의" 등 전송)
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);

    // 성공: 팝업 2초 + 폼 초기화, 2초 후 /story 이동 (원본 redirectPathAfterFormSubmit)
    setShowSuccess(true);
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    timers.current.push(setTimeout(() => setShowSuccess(false), 2000));
    timers.current.push(setTimeout(() => router.push("/story"), 2000));
  };

  return (
    <>
      {/* ===== 폼 카드: 흰 배경, 라운드 20px, 최대 528px ===== */}
      <div className="flex h-fit w-full max-w-[528px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_0_rgba(0,0,0,0.04)]">
        <form className="w-full bg-white" onSubmit={handleSubmit} noValidate>
          <div className="flex w-full flex-col p-[24px] lg:p-[44px]">
            {/* ===== 소개: 칩(무약정/설치비 0원) / 제목 / 별점 / 설명 ===== */}
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
                  <strong className="text-[#ff5c00]">바로 </strong>연락드릴게요.
                </span>
              </h2>
              <p className="mb-[9px] text-[11px] font-normal leading-[140%] tracking-[-0.28px] text-[#5a5a5a] lg:mb-[16px] lg:text-[14px]">
                <strong className="text-[#ff7500]">★★★★★ </strong>4.96· 네이버 스마트스토어
              </p>
              <p className="mb-[15px] text-[13px] font-normal leading-[140%] tracking-[-0.32px] text-[#1d1d1f] lg:mb-[24px] lg:text-[16px]">
                매장에 맞는 CCTV와 수량을 추천해드릴게요.
              </p>
            </div>

            {/* ===== 성함(매장명) 입력 ===== */}
            <div className="relative mb-[16px] flex w-full flex-col lg:mb-[10px]">
              <label htmlFor="성함" className={labelClass}>
                성함(매장명) <span className="text-[#f27a1a]">*</span>
              </label>
              <input
                ref={nameRef}
                id="성함"
                name="성함"
                placeholder="성함을 입력해주세요"
                value={values.name}
                onChange={(e) => update({ name: e.target.value })}
                className={inputClass(!!errors.name)}
              />
              <ErrorText>{errors.name}</ErrorText>
            </div>

            {/* ===== 연락처 입력: +82 고정칸 + 자동 하이픈 휴대폰번호 ===== */}
            <div className="relative flex w-full flex-col">
              <label htmlFor="연락처" className={labelClass}>
                연락처 <span className="text-[#f27a1a]">*</span>
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  disabled
                  placeholder="🇰🇷 +82"
                  className={`${inputClass(false)} !h-[56px] !w-[82px] shrink-0 !p-0 !pl-[16px]`}
                />
                <input
                  ref={phoneRef}
                  id="연락처"
                  name="연락처"
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  value={values.phone}
                  onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                  className={inputClass(!!errors.phone)}
                />
              </div>
              <ErrorText>{errors.phone}</ErrorText>
            </div>

            {/* ===== 약관 동의: 원형 체크박스 + 문구(클릭 토글) + 약관보기(새 창) ===== */}
            <div className="mb-[16px] mt-[24px] flex flex-col gap-[16px] lg:mt-[32px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  <label className="relative flex cursor-pointer items-center gap-[8px]">
                    <input
                      ref={agreeRef}
                      type="checkbox"
                      name="약관1"
                      checked={values.agree}
                      onChange={(e) => update({ agree: e.target.checked })}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <div
                      className={`flex h-[20px] w-[20px] items-center justify-center rounded-full transition-all duration-200 ease-in-out peer-focus-visible:border-[#ff5c00] lg:h-[22px] lg:w-[22px] ${
                        values.agree ? "bg-[#FF5C00]" : "border-2 border-[#EEE] bg-white"
                      }`}
                    >
                      <CheckMark visible={values.agree} />
                    </div>
                  </label>
                  <p
                    onClick={() => update({ agree: !values.agree })}
                    className="ml-[8px] cursor-pointer text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#333] lg:ml-[10px] lg:text-[16px]"
                  >
                    [필수] 개인정보 수집 및 이용 동의
                  </p>
                  {/* 원본은 /privacy-policy 새 창 → 클론에서는 개인정보처리방침 페이지 */}
                  <button
                    type="button"
                    onClick={() => window.open("/terms/personal", "_blank")}
                    className="ml-auto flex h-full cursor-pointer items-center text-[12px] font-normal tracking-[-0.28px] text-[#999] underline outline-none focus-visible:text-[#ff5c00] focus-visible:decoration-[#ff5c00] lg:ml-[8px] lg:translate-y-[2px] lg:text-[14px]"
                  >
                    약관보기
                  </button>
                </div>
                <ErrorText className="relative bottom-[-4px]">{errors.agree}</ErrorText>
              </div>
            </div>

            {/* ===== 제출 버튼: 전송 중에는 비활성 + 문구 변경 ===== */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-[8px] bg-[#ff5c00] p-[18px] text-white focus-visible:outline-offset-2 focus-visible:outline-[#ff5c00]"
            >
              <div className="text-[16px] font-bold leading-[1.4] tracking-[-0.36px] lg:text-[20px]">
                {isSubmitting ? "전송 중..." : "빠른 상담하기"}
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* ===== 성공 팝업: 화면 중앙 고정, 2초간 노출 (opacity/visibility 0.5s 전환) ===== */}
      <div
        role="status"
        aria-hidden={!showSuccess}
        className={`fixed left-1/2 top-1/2 z-[100] block w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#fafafa] px-[28px] py-[60px] text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.06)] transition-[opacity,visibility] duration-500 ease-[ease] ${
          showSuccess ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto mb-[24px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-[40px] text-white">
          ✓
        </div>
        <h2 className="mb-[12px] text-[22px] font-bold text-[#1a1a1a]">문의가 접수되었습니다!</h2>
        <p className="text-[15px] leading-[1.6] text-[#666666]">
          빠른 시일 내에 담당자가
          <br />
          연락드릴 예정입니다.
        </p>
      </div>
    </>
  );
}
