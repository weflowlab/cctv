"use client";

/**
 * 블로그 상세 하단 버튼 (원본 sc-df8dba88-*)
 * - "블로그 홈": /blog 로 이동 (router.push)
 * - "공유하기": 현재 URL 을 클립보드에 복사하고 토스트 "링크가 복사되었습니다." 를 2초간 노출
 *   (원본 ToastProvider: 화면 상단 72px 위치, 위에서 내려오는 0.3s 애니메이션, 초록 체크 아이콘)
 */
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./toast.module.css";

const buttonClass =
  "flex h-[52px] cursor-pointer items-center justify-between rounded-[8px] bg-[#f5f5f5] px-[32px] pb-[12px] pt-[14px] text-[16px] font-medium text-[#222] transition-colors duration-300";

export default function PostActions() {
  const router = useRouter();
  // 토스트 노출 여부
  const [toast, setToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 언마운트 시 토스트 타이머 정리
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // 링크 복사 → 토스트 2초
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // 클립보드 권한이 없는 환경에서도 원본처럼 토스트는 띄운다
    }
    setToast(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(false), 2000);
  };

  return (
    <>
      {/* ===== 버튼 2개: 블로그 홈 / 공유하기 ===== */}
      <div className="flex items-center justify-center gap-[12px] pb-[120px]">
        <button type="button" className={buttonClass} onClick={() => router.push("/blog")}>
          <span className="inline-block px-0 lg:px-[32px]">블로그 홈</span>
        </button>
        <button type="button" className={buttonClass} onClick={share}>
          <span className="inline-block px-0 lg:px-[32px]">공유하기</span>
        </button>
      </div>

      {/* ===== 토스트: 링크 복사 완료 알림 ===== */}
      {toast && (
        <div className="pointer-events-none fixed left-1/2 top-[72px] z-[10000009] flex -translate-x-1/2 justify-center">
          <div className={`${styles.toast} flex items-center justify-center gap-[10px] rounded-[8px] bg-[#222] px-[20px] py-[12px] text-[15px] text-white shadow-[0px_4px_5px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.2)]`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={24} height={24} aria-hidden>
              <circle cx="12" cy="12" r="12" fill="#1EB05B" />
              <path
                fill="#fff"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.05 7.833a1.125 1.125 0 0 1-.008 1.591l-7 6.938a1.125 1.125 0 0 1-1.594-.011l-3.5-3.563a1.125 1.125 0 1 1 1.604-1.576l2.709 2.756 6.197-6.142a1.125 1.125 0 0 1 1.591.007"
              />
            </svg>
            <span className="whitespace-nowrap">링크가 복사되었습니다.</span>
          </div>
        </div>
      )}
    </>
  );
}
