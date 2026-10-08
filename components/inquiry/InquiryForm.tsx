"use client";

/**
 * 상담 신청(견적 문의) 폼 (keeper components/contact/ContactForm 틀 복사 + 기존 사이트 필드)
 * - 필드: 성함*, 연락처*, 서비스 선택(칩형 다중선택), 희망 서비스일(date), 전달 내용(textarea),
 *         [필수] 개인정보 수집 및 이용 동의 (약관보기 → /terms/personal 새 창)
 * - 동작 (keeper 폼과 동일):
 *   · 제출 시 유효성 검사 → 첫 에러 필드로 포커스, 필드 아래 주황 에러 문구, 에러 입력칸 테두리 주황
 *   · 한 번 제출한 뒤부터는 입력할 때마다 재검사
 *   · 연락처는 숫자만 남기고 3-4-4 자동 하이픈 (maxLength 13)
 *   · 제출 중 버튼 문구 "전송 중..." + 비활성
 *   · 성공 시 폼 초기화 + 화면 가운데 성공 팝업 2초 노출 (keeper 와 달리 페이지 이동 없음)
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

/** 서비스 선택지 (기존 사이트 3개 + CCTV+스피커) */
const SERVICE_OPTIONS = ["CCTV 설치", "CCTV 수리", "CCTV 렌탈", "CCTV+스피커"] as const;
type ServiceOption = (typeof SERVICE_OPTIONS)[number];

type Values = {
  name: string;
  phone: string;
  services: ServiceOption[];
  date: string;
  message: string;
  agree: boolean;
};
type Errors = Partial<Record<"name" | "phone" | "agree", string>>;

const INITIAL: Values = { name: "", phone: "", services: [], date: "", message: "", agree: false };

/** keeper zod 스키마와 동일한 검사 규칙/문구 (필수: 성함·연락처·동의) */
function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "성함은 필수입니다.";
  if (!/^01\d-\d{3,4}-\d{4}$/.test(v.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (v.agree !== true) e.agree = "개인정보 수집 및 이용에 동의해주세요.";
  return e;
}

/** keeper 전화번호 포맷터: 숫자만 → 3-4-4 하이픈, 끝에 남는 하이픈 제거 */
function formatPhone(raw: string) {
  return raw
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/-{1,2}$/g, "");
}

/** 입력칸 공통 스타일 (에러 시 테두리 주황, 포커스 시 주황) */
const inputClass = (hasError: boolean) =>
  `h-[52px] w-full rounded-[8px] border bg-white px-[12px] py-[16px] text-[14px] font-normal leading-[140%] tracking-[-0.32px] text-[#4a5565] outline-0 placeholder:text-[#999] focus:border-[#ff5c00] lg:h-[54px] lg:px-[18px] lg:text-[16px] ${
    hasError ? "border-[#ff5c00]" : "border-[#dadde5]"
  }`;

const labelClass =
  "mb-[8px] text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]";

/** 필드 아래 에러 문구 */
function ErrorText({ children, className = "" }: { children?: string; className?: string }) {
  if (!children) return null;
  return <p className={`mt-[6px] text-[12px] text-[#ff5c00] ${className}`}>{children}</p>;
}

/** 체크 아이콘 (keeper 체크박스 내부 SVG) */
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

export default function InquiryForm() {
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

  // 언마운트 시 팝업 타이머 정리
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

  // 서비스 칩 토글 (다중 선택)
  const toggleService = (s: ServiceOption) => {
    update({
      services: values.services.includes(s) ? values.services.filter((x) => x !== s) : [...values.services, s],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);

    // 첫 번째 에러 필드로 포커스
    if (errs.name) return nameRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.agree) return agreeRef.current?.focus();

    setIsSubmitting(true);
    // TODO: API 연동 (성함·연락처·서비스·희망일·전달 내용 전송)
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);

    // 성공: 폼 초기화 + 팝업 2초 (페이지 이동 없음)
    setShowSuccess(true);
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    timers.current.push(setTimeout(() => setShowSuccess(false), 2000));
  };

  return (
    <>
      {/* ===== 폼 카드: 흰 배경, 라운드 20px ===== */}
      <div className="flex h-fit w-full overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_0_rgba(0,0,0,0.04)]">
        <form className="w-full bg-white" onSubmit={handleSubmit} noValidate>
          <div className="flex w-full flex-col p-[24px] lg:p-[44px]">
            {/* ===== 제목: 기존 사이트 문구 ===== */}
            <div className="mb-[24px] flex flex-col lg:mb-[32px]">
              <p className="mb-[4px] text-[14px] font-bold leading-[140%] tracking-[-0.3px] text-[#ff5c00] lg:mb-[8px] lg:text-[16px]">
                행복한 만남을 기대합니다
              </p>
              <h1 className="text-[24px] font-bold leading-[140%] tracking-[-0.64px] text-[#222] lg:text-[32px]">
                언제든 부담 없이 <span className="whitespace-nowrap">견적 문의해 주세요</span>
              </h1>
            </div>

            {/* ===== 성함 입력 ===== */}
            <div className="mb-[16px] flex w-full flex-col lg:mb-[20px]">
              <label htmlFor="inq-name" className={labelClass}>
                성함 <span className="text-[#f27a1a]">*</span>
              </label>
              <input
                ref={nameRef}
                id="inq-name"
                name="name"
                autoComplete="name"
                placeholder="성함을 입력해주세요"
                value={values.name}
                onChange={(e) => update({ name: e.target.value })}
                className={inputClass(!!errors.name)}
              />
              <ErrorText>{errors.name}</ErrorText>
            </div>

            {/* ===== 연락처 입력: 자동 하이픈 ===== */}
            <div className="mb-[16px] flex w-full flex-col lg:mb-[20px]">
              <label htmlFor="inq-phone" className={labelClass}>
                연락처 <span className="text-[#f27a1a]">*</span>
              </label>
              <input
                ref={phoneRef}
                id="inq-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="010-0000-0000"
                maxLength={13}
                value={values.phone}
                onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                className={inputClass(!!errors.phone)}
              />
              <ErrorText>{errors.phone}</ErrorText>
            </div>

            {/* ===== 서비스 선택: 칩형 다중 선택 (선택 시 주황 테두리/글자) ===== */}
            <fieldset className="mb-[16px] flex w-full flex-col lg:mb-[20px]">
              <legend className={labelClass}>서비스 선택</legend>
              <div className="flex flex-wrap gap-[8px]">
                {SERVICE_OPTIONS.map((s) => {
                  const selected = values.services.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      aria-pressed={selected}
                      className={`h-[40px] cursor-pointer rounded-[50px] border px-[16px] text-[14px] font-medium tracking-[-0.3px] transition-colors duration-200 lg:h-[44px] lg:px-[20px] lg:text-[15px] ${
                        selected
                          ? "border-[#ff5c00] bg-[#fff6f1] text-[#ff5c00]"
                          : "border-[#dadde5] bg-white text-[#666] hover:border-[#ff5c00]"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* ===== 희망 서비스일 ===== */}
            <div className="mb-[16px] flex w-full flex-col lg:mb-[20px]">
              <label htmlFor="inq-date" className={labelClass}>
                희망 서비스일
              </label>
              <input
                id="inq-date"
                name="date"
                type="date"
                value={values.date}
                onChange={(e) => update({ date: e.target.value })}
                className={inputClass(false)}
              />
            </div>

            {/* ===== 전달 내용 ===== */}
            <div className="flex w-full flex-col">
              <label htmlFor="inq-message" className={labelClass}>
                전달 내용
              </label>
              <textarea
                id="inq-message"
                name="message"
                rows={4}
                placeholder="설치 장소, 카메라 대수 등 궁금하신 내용을 자유롭게 남겨주세요"
                value={values.message}
                onChange={(e) => update({ message: e.target.value })}
                className={`${inputClass(false)} !h-auto resize-none`}
              />
            </div>

            {/* ===== 약관 동의: 원형 체크박스 + 문구(클릭 토글) + 약관보기(새 창) ===== */}
            <div className="mb-[16px] mt-[24px] flex flex-col lg:mt-[32px]">
              <div className="flex items-center gap-0">
                <label className="relative flex cursor-pointer items-center gap-[8px]">
                  <input
                    ref={agreeRef}
                    type="checkbox"
                    name="agree"
                    checked={values.agree}
                    onChange={(e) => update({ agree: e.target.checked })}
                    className="peer absolute h-0 w-0 opacity-0"
                  />
                  <div
                    className={`flex h-[20px] w-[20px] items-center justify-center rounded-full transition-all duration-200 ease-in-out peer-focus-visible:outline-2 peer-focus-visible:outline-[#ff5c00] lg:h-[22px] lg:w-[22px] ${
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
                <button
                  type="button"
                  onClick={() => window.open("/terms/personal", "_blank")}
                  className="ml-auto flex h-full cursor-pointer items-center text-[12px] font-normal tracking-[-0.28px] text-[#999] underline outline-none focus-visible:text-[#ff5c00] lg:ml-[8px] lg:translate-y-[2px] lg:text-[14px]"
                >
                  약관보기
                </button>
              </div>
              <ErrorText>{errors.agree}</ErrorText>
            </div>

            {/* ===== 제출 버튼: 전송 중에는 비활성 + 문구 변경 ===== */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-[8px] bg-[#ff5c00] p-[18px] text-white focus-visible:outline-offset-2 focus-visible:outline-[#ff5c00] disabled:opacity-70"
            >
              <div className="text-[16px] font-bold leading-[1.4] tracking-[-0.36px] lg:text-[20px]">
                {isSubmitting ? "전송 중..." : "신청하기"}
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* ===== 성공 팝업: 화면 중앙 고정, 2초간 노출 (opacity/visibility 0.5s 전환) ===== */}
      <div
        role="status"
        aria-hidden={!showSuccess}
        className={`fixed left-1/2 top-1/2 z-[100] block w-[calc(100%-32px)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#fafafa] px-[28px] py-[60px] text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.06)] transition-[opacity,visibility] duration-500 ease-[ease] ${
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
          <br />
          급하신 경우 {SITE.phone} 로 전화 주세요.
        </p>
      </div>
    </>
  );
}
