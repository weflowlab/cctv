"use client";

/**
 * 가이드북/리포트 무료 다운로드 신청 폼 (원본 sc-5c91eeb6-* 폼 공통 + sc-8f1c24f0-1 카드)
 * - 세 페이지(/contact/a-to-z-guide, /contact/2026-trend-report, /contact/shop-management) 공통.
 *   제목/설명/다운로드 파일만 props 로 분기한다.
 * - 필드: 성함(매장명)*, 연락처*(+82 고정칸 + 자동 하이픈), 업종*(뱃지 라디오 10개),
 *   오픈일*(뱃지 라디오 5개), [필수] 개인정보 수집 및 이용 동의
 * - 원본 동작 (react-hook-form + zod):
 *   · 제출 시 유효성 검사 → 첫 에러 필드로 포커스, 필드 아래 주황 에러 문구, 에러 입력칸 테두리 주황
 *   · 한 번 제출한 뒤부터는 입력할 때마다 재검사 (reValidateMode: onChange)
 *   · 제출 중 버튼 문구 "전송 중..." + 비활성
 *   · 성공 시: 화면 중앙 성공 팝업 2초(opacity 0.5s 전환) + PDF 파일 다운로드 + 2초 후 /story 이동
 *     (이 폼은 원본에서도 성공 후 값 초기화를 하지 않음)
 */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import Placeholder from "@/components/common/Placeholder";

type Values = { name: string; phone: string; industry: string; openDate: string; agree: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = { name: "", phone: "", industry: "", openDate: "", agree: false };

/** 원본 zod 스키마와 동일한 검사 규칙/문구 */
function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.length < 2) e.name = "성함은 필수입니다.";
  if (!/^01\d-\d{3,4}-\d{4}$/.test(v.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (v.industry.length < 1) e.industry = "업종을 선택해주세요.";
  if (v.openDate.length < 1) e.openDate = "오픈일을 선택해주세요.";
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

/**
 * 원본 파일 다운로드 유틸 (16298 모듈)
 * - fetch(cors) → blob → objectURL → 임시 <a download> 클릭 → 정리
 * - 실패 시 콘솔 에러만 남김
 */
async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error(`[${filename}] 파일 다운로드 실패:`, err);
  }
}

/** 업종 선택지 (원본 순서 그대로) */
const INDUSTRIES = [
  "카페/디저트",
  "학원/클래스",
  "음식점",
  "운동 (헬스/피트니스)",
  "부동산",
  "병원/약국",
  "미용실/뷰티샵",
  "무인매장",
  "도소매",
  "기타 자영업",
];

/** 오픈일 선택지: 라벨은 "본문 + 작은 괄호 문구(11px)" 형태 */
const OPEN_DATES: { value: string; main: string; sub?: string }[] = [
  { value: "당장 오픈(1개월 이내)", main: "당장 오픈", sub: "(1개월 이내)" },
  { value: "조만간 오픈(3개월 이내)", main: "조만간 오픈", sub: "(3개월 이내)" },
  { value: "입지 선정 중(6개월 이내)", main: "입지 선정 중", sub: "(6개월 이내)" },
  { value: "아이템 검토 중(1년 이내)", main: "아이템 검토 중", sub: "(1년 이내)" },
  { value: "창업 고민중", main: "창업 고민중" },
];

/** 입력칸 공통 스타일 (에러 시 테두리 주황, 포커스 시 주황) */
const inputClass = (hasError: boolean) =>
  `h-[52px] w-full rounded-[8px] border bg-white px-[12px] py-[16px] pr-[6px] text-[14px] font-normal leading-[140%] tracking-[-0.32px] text-[#4a5565] outline-0 placeholder:text-[#999] focus:border-[#ff5c00] lg:h-[54px] lg:p-[18px] lg:pr-[6px] lg:text-[16px] ${
    hasError ? "border-[#ff5c00]" : "border-[#dadde5]"
  }`;

const labelClass =
  "mb-[8px] text-[13px] font-medium leading-[140%] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]";

/** 필수 표시 별표 */
const Required = () => <span className="text-[#f27a1a]">*</span>;

/** 필드 아래 에러 문구 */
function ErrorText({ children, className = "" }: { children?: string; className?: string }) {
  if (!children) return null;
  return <p className={`text-[12px] text-[#ff5c00] ${className}`}>{children}</p>;
}

/** 체크 아이콘 (원본 원형 체크박스 내부 SVG) */
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

/**
 * 뱃지형 라디오 그룹 (원본 SelectGroup)
 * - 실제 radio 는 시각적으로 숨기고(sr-only), 바로 뒤 .badge 를 pill 버튼처럼 표시
 * - 선택 시 주황 테두리 + 연주황 배경 + 주황 글자, 키보드 포커스 시 주황 outline
 * - PC 폭 82.4%, 모바일 100%
 */
function BadgeRadioGroup({
  name,
  options,
  value,
  onChange,
  firstRef,
}: {
  name: string;
  options: { value: string; label: ReactNode }[];
  value: string;
  onChange: (v: string) => void;
  firstRef?: Ref<HTMLInputElement>;
}) {
  return (
    <div className="flex w-full flex-wrap gap-[10px] lg:w-[82.4%]">
      {options.map((opt, i) => (
        <label key={opt.value} htmlFor={opt.value}>
          <input
            ref={i === 0 ? firstRef : undefined}
            id={opt.value}
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="peer sr-only"
          />
          <span className="flex cursor-pointer items-center justify-center rounded-[100px] border border-[#dadde5] px-[10px] py-[6px] text-[14px] font-medium leading-[140%] tracking-[-0.28px] text-[#4a5565] peer-checked:border-[#ff5c00] peer-checked:bg-[#fff5ee] peer-checked:text-[#ff5c00] peer-focus-visible:outline-2 peer-focus-visible:outline-[#ff5c00]">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export type DownloadRequestFormProps = {
  /** 주황 헤더 제목 (원본 기본값: "창업 가이드북 무료배포") */
  title?: string;
  /** 주황 헤더 설명 (\n 줄바꿈 유지) */
  desc?: string;
  /** 성공 시 내려받을 파일 (원본 CDN 주소) */
  file: { url: string; filename: string };
  /** 성공 2초 후 이동할 경로 (원본 redirectPathAfterFormSubmit) */
  redirectPath?: string;
};

export default function DownloadRequestForm({
  title = "창업 가이드북 무료배포",
  desc = "2026 창업을 준비하신다면\n감이 아닌 숫자로 시작하세요!",
  file,
  redirectPath = "/story",
}: DownloadRequestFormProps) {
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
  const industryRef = useRef<HTMLInputElement>(null);
  const openDateRef = useRef<HTMLInputElement>(null);
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

    // 첫 번째 에러 필드로 포커스 (RHF shouldFocusError — 약관 체크박스는 원본도 포커스 대상 아님)
    if (errs.name) return nameRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.industry) return industryRef.current?.focus();
    if (errs.openDate) return openDateRef.current?.focus();
    if (errs.agree) return;

    setIsSubmitting(true);
    // TODO: API 연동 (원본: /api/airtable 로 성함·연락처·업종·오픈일 + 진입경로/페이지경로/UTM 전송)
    await new Promise((r) => setTimeout(r, 500));
    setIsSubmitting(false);

    // 성공 처리 (원본 순서): 파일 다운로드 → 2초 후 이동, 동시에 성공 팝업 2초 노출
    void downloadFile(file.url, file.filename);
    setShowSuccess(true);
    timers.current.push(setTimeout(() => setShowSuccess(false), 2000));
    if (redirectPath) timers.current.push(setTimeout(() => router.push(redirectPath), 2000));
  };

  return (
    <>
      {/* ===== 폼 카드: 라운드 16px, 그림자, 최대 672px ===== */}
      <div className="flex h-fit w-full max-w-[672px] overflow-hidden rounded-[16px] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
        <form className="w-full bg-white" onSubmit={handleSubmit} noValidate>
          {/* ===== 폼 헤더: 주황 배경, 흰 키퍼 로고 + 제목, 설명(줄바꿈 유지) ===== */}
          <div className="flex flex-col items-center justify-center gap-[4px] bg-[#ff5c00] px-[24px] py-[16px] lg:gap-[6px] lg:px-0 lg:py-[20px]">
            <div className="flex w-full items-center justify-center gap-[6px]">
              <Placeholder label="Keeper" kind="icon" dark className="ml-[1px] mt-[1px] h-[18px] w-[61px] lg:m-0 lg:h-[22px] lg:w-[78px]" />
              <h1 className="text-[16px] font-bold leading-[140%] tracking-[-0.4px] text-[#fafafc] lg:text-[20px]">{title}</h1>
            </div>
            {desc && (
              <p className="w-full whitespace-pre-line text-center text-[14px] font-normal leading-[150%] tracking-[-0.3px] text-[#f6f7fa] lg:text-[16px]">
                {desc}
              </p>
            )}
          </div>

          {/* ===== 폼 본문 ===== */}
          <div className="flex w-full flex-col gap-[24px] p-[24px] lg:px-[44px] lg:pb-[40px] lg:pt-[32px]">
            {/* ===== 성함 + 연락처: PC 가로 2열(gap 16px), 모바일 세로 ===== */}
            <div className="flex w-full flex-col items-center gap-[24px] lg:flex-row lg:gap-[16px]">
              <div className="relative flex w-full flex-col">
                <label htmlFor="성함" className={labelClass}>
                  성함(매장명) <Required />
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

              {/* 연락처: +82 고정칸 + 숫자 입력 시 자동 하이픈 */}
              <div className="relative flex w-full flex-col">
                <label htmlFor="연락처" className={labelClass}>
                  연락처 <Required />
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
            </div>

            {/* ===== 업종: 뱃지 라디오 10개 ===== */}
            <div className="relative flex w-full flex-col">
              <label className={labelClass}>
                업종 <Required />
              </label>
              <BadgeRadioGroup
                name="업종"
                firstRef={industryRef}
                value={values.industry}
                onChange={(v) => update({ industry: v })}
                options={INDUSTRIES.map((v) => ({ value: v, label: v }))}
              />
              <ErrorText>{errors.industry}</ErrorText>
            </div>

            {/* ===== 오픈일: 뱃지 라디오 5개 (괄호 기간은 작은 글씨) ===== */}
            <div className="relative flex w-full flex-col">
              <label className={labelClass}>
                오픈일 <Required />
              </label>
              <BadgeRadioGroup
                name="오픈일"
                firstRef={openDateRef}
                value={values.openDate}
                onChange={(v) => update({ openDate: v })}
                options={OPEN_DATES.map((o) => ({
                  value: o.value,
                  label: o.sub ? (
                    <div className="flex items-center gap-[4px]">
                      {o.main} <span className="text-[11px] font-normal">{o.sub}</span>
                    </div>
                  ) : (
                    <div>{o.main}</div>
                  ),
                }))}
              />
              <ErrorText>{errors.openDate}</ErrorText>
            </div>

            {/* ===== 약관 동의: 원형 체크박스 + 문구(클릭 토글) + 약관보기(새 창) ===== */}
            <div className="mb-[-8px] flex flex-col gap-[16px] lg:mt-[4px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
                  <label className="relative flex cursor-pointer items-center gap-[8px]">
                    <input
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
                {isSubmitting ? "전송 중..." : "무료 다운로드 받기"}
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
