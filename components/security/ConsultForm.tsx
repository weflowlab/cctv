"use client";

/**
 * 매장보안 페이지 빠른 상담 폼 (원본 sc-a4e9811a "isPage=false" 버전, 진입경로 "매장보안_스마트스토어_페이지")
 * - 좌(PC)/하(모바일) 모델 이미지 + 우측 흰 카드 폼
 * - 필드: 성함(매장명), 연락처(+82 고정 국가코드 + 자동 하이픈), [필수] 개인정보 동의 체크
 * - 유효성(원본 zod 스키마 그대로):
 *   · 성함   : 2자 이상 → "성함은 필수입니다."
 *   · 연락처 : /^01\d-\d{3,4}-\d{4}$/ → "010-0000-0000 형식으로 입력해주세요."
 *   · 약관1  : true → "개인정보 수집 및 이용에 동의해주세요."
 *   최초 제출 시 검사 후, 이후에는 입력할 때마다 재검사 (react-hook-form 기본 동작과 동일)
 * - 제출 성공 시: 폼 초기화 + 화면 중앙 "문의가 접수되었습니다!" 팝업 2초 노출 후 페이드아웃
 */
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Placeholder from "@/components/common/Placeholder";
import { CheckboxCheckIcon, ChipCheckIcon } from "./icons";

type Values = { name: string; phone: string; agree: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = { name: "", phone: "", agree: false };

/** 원본 스키마와 동일한 검증 */
function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.length < 2) e.name = "성함은 필수입니다.";
  if (!/^01\d-\d{3,4}-\d{4}$/.test(v.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요.";
  if (!v.agree) e.agree = "개인정보 수집 및 이용에 동의해주세요.";
  return e;
}

/** 전화번호 자동 하이픈 (원본 정규식 그대로: 숫자만 남기고 3-4-4 로 끊은 뒤 끝 하이픈 제거) */
function formatPhone(raw: string) {
  const only = raw.replace(/[^0-9]/g, "");
  return only.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");
}

export default function ConsultForm() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false); // 한 번 제출한 뒤부터 실시간 재검증
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 값 갱신 + (제출 이후라면) 즉시 재검증
  const update = (patch: Partial<Values>) => {
    const next = { ...values, ...patch };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true); // 버튼 문구 "전송 중..."
    // TODO: API 연동 — 원본은 /api/airtable 로 POST (진입경로: 매장보안_스마트스토어_페이지)
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);

    // 성공 처리: 폼 리셋 + 성공 팝업 2초 노출
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setShowSuccess(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowSuccess(false), 2000);
  };

  const inputCls =
    "h-[52px] w-full rounded-[8px] border border-[#dadde5] bg-white px-[12px] py-[16px] pr-[6px] text-[14px] leading-[1.4] tracking-[-0.32px] text-[#4a5565] outline-0 focus:border-brand lg:h-[54px] lg:p-[18px] lg:pr-[6px] lg:text-[16px]";
  const labelCls = "mb-[8px] text-[13px] font-medium leading-[1.4] tracking-[-0.32px] text-[#1e2939] lg:mb-[12px] lg:text-[16px]";
  const errCls = "text-[12px] text-brand";

  return (
    <div className="relative flex h-auto w-full min-w-[360px] flex-col-reverse items-center justify-start gap-[28px] overflow-hidden bg-brand-light px-[20px] pt-[60px] lg:h-[867px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[32px] lg:px-0 lg:pt-[110px]">
      {/* ===== 모델 이미지 + 하트 장식 (원본 sc-6f6088f0 "short") ===== */}
      <div className="relative -mb-px shrink-0">
        <Placeholder label="모델 안내 이미지" className="h-[300px] w-[203px] lg:h-[757px] lg:w-[512px]" />
        <div className="absolute top-[64px] right-[8px] z-[1] lg:top-[120px] lg:right-[66px]">
          <Placeholder label="장식 그래픽 1" kind="icon" className="h-[54px] w-[81px] lg:h-[81px] lg:w-[122px]" />
        </div>
        <div className="absolute top-[12px] right-[12px] z-[1] [scale:-1_1] rotate-[-60deg] lg:top-[66px] lg:right-0 lg:[scale:1_1] lg:rotate-0">
          <Placeholder label="장식 그래픽 2" kind="icon" className="h-[38px] w-[78.5px] lg:h-[55px] lg:w-[113px]" />
        </div>
      </div>

      {/* ===== 폼 카드 ===== */}
      <div className="flex h-fit w-full max-w-[528px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_24px_0_rgba(0,0,0,0.04)]">
        <form className="w-full bg-white" onSubmit={onSubmit} noValidate>
          <div className="flex w-full flex-col p-[24px] lg:p-[44px]">
            {/* 인트로: 칩 / 타이틀 / 평점 / 설명 */}
            <div className="flex flex-col">
              <div className="mb-[12px] flex gap-[6px] lg:mb-[18px] lg:gap-[10px]">
                {["무약정", "설치비 0원"].map((c) => (
                  <div key={c} className="flex items-center gap-[4px] rounded-[4px] border-[0.663px] border-[#dadde5] bg-white px-[6px] py-[4px] text-[11px] font-medium leading-[1.05] tracking-[-0.2px] text-[#222] lg:gap-[5.306px] lg:rounded-[5.306px] lg:px-[10px] lg:py-[6px] lg:text-[13px] lg:leading-[1.38] lg:tracking-[-0.3px]">
                    <ChipCheckIcon className="w-[7px] lg:w-[11px]" />
                    {c}
                  </div>
                ))}
              </div>
              <h2 className="mb-[4px] whitespace-pre-wrap text-[24px] font-bold leading-[1.4] tracking-[-0.64px] text-[#222] lg:mb-[8px] lg:text-[32px]">
                <span className="whitespace-nowrap">휴대폰번호 알려주시면</span>{" "}
                <span className="whitespace-nowrap">
                  <strong className="text-brand">바로 </strong>연락드릴게요.
                </span>
              </h2>
              <p className="mb-[9px] text-[11px] leading-[1.4] tracking-[-0.28px] text-[#5a5a5a] lg:mb-[16px] lg:text-[14px]">
                <strong className="text-[#ff7500]">★★★★★ </strong>4.96· 네이버 스마트스토어
              </p>
              <p className="mb-[15px] text-[13px] leading-[1.4] tracking-[-0.32px] text-[#1d1d1f] lg:mb-[24px] lg:text-[16px]">매장에 맞는 CCTV와 수량을 추천해드릴게요.</p>
            </div>

            {/* 성함(매장명) */}
            <div className="relative mb-[16px] flex w-full flex-col lg:mb-[10px]">
              <label htmlFor="성함" className={labelCls}>
                성함(매장명) <span className="text-[#f27a1a]">*</span>
              </label>
              <input
                id="성함"
                name="성함"
                placeholder="성함을 입력해주세요"
                className={inputCls}
                value={values.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => update({ name: e.target.value })}
              />
              {errors.name && <p className={errCls}>{errors.name}</p>}
            </div>

            {/* 연락처: 국가코드(비활성) + 번호 입력 (자동 하이픈) */}
            <div className="relative flex w-full flex-col">
              <label htmlFor="연락처" className={labelCls}>
                연락처 <span className="text-[#f27a1a]">*</span>
              </label>
              <div className="flex items-center gap-[10px]">
                {/* 국가코드: 원본 .country (82x56, 왼쪽 패딩 16px 만) */}
                <input
                  className="h-[56px] w-[82px] shrink-0 rounded-[8px] border border-[#dadde5] bg-white p-0 pl-[16px] text-[14px] leading-[1.4] tracking-[-0.32px] text-[#4a5565] outline-0 lg:text-[16px]"
                  type="text"
                  disabled
                  placeholder="🇰🇷 +82"
                />
                <input
                  id="연락처"
                  name="연락처"
                  type="tel"
                  inputMode="numeric"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  className={inputCls}
                  value={values.phone}
                  onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                />
              </div>
              {errors.phone && <p className={errCls}>{errors.phone}</p>}
            </div>

            {/* 약관 동의: 원형 체크박스 + 문구 클릭 토글 + 약관보기(새 창) */}
            <div className="mt-[24px] mb-[16px] flex flex-col gap-[16px] lg:mt-[32px]">
              <div className="flex flex-col">
                <div className="flex items-center gap-0">
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
                        values.agree ? "border-0 bg-brand" : "border-2 border-[#eee] bg-white"
                      }`}
                    >
                      <CheckboxCheckIcon className={`h-[14px] w-[14px] text-white transition-opacity duration-200 ${values.agree ? "opacity-100" : "opacity-0"}`} />
                    </div>
                  </label>
                  <p
                    className="ml-[8px] cursor-pointer text-[13px] font-medium leading-[1.4] tracking-[-0.32px] text-[#333] lg:ml-[10px] lg:text-[16px]"
                    onClick={() => update({ agree: !values.agree })}
                  >
                    [필수] 개인정보 수집 및 이용 동의
                  </p>
                  <button
                    type="button"
                    className="ml-auto flex h-full cursor-pointer items-center text-[12px] tracking-[-0.28px] text-[#999] underline outline-none focus-visible:text-brand focus-visible:decoration-brand lg:ml-[8px] lg:translate-y-[2px] lg:text-[14px]"
                    onClick={() => window.open("/terms/personal", "_blank")}
                  >
                    약관보기
                  </button>
                </div>
                {errors.agree && <p className={`${errCls} relative -bottom-[4px]`}>{errors.agree}</p>}
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer rounded-[8px] bg-brand p-[18px] text-white focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <div className="text-[16px] font-bold leading-[1.4] tracking-[-0.36px] lg:text-[20px]">{submitting ? "전송 중..." : "빠른 상담하기"}</div>
            </button>
          </div>
        </form>
      </div>

      {/* ===== 접수 완료 팝업 (2초 노출, opacity/visibility 0.5s 전환) ===== */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed top-1/2 left-1/2 z-[100] block w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#fafafa] px-[28px] py-[60px] text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.06)] transition-[opacity,visibility] duration-500 ease-in-out ${
          showSuccess ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto mb-[24px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-[40px] text-white">✓</div>
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
