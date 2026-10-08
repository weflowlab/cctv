"use client";

/**
 * 앱 다운로드 QR 모달 (PC 전용)
 * - 원본: PC 에서 "키퍼 앱에서 구매하기" 클릭 시 airbridge 링크 QR 코드를 담은 542×758 카드 모달을 띄움.
 *   (모바일은 모달 없이 앱 딥링크 → 스토어 폴백)
 * - 동작: 배경(딤) 클릭 / 우상단 X 버튼 / ESC 키로 닫힘, 열려 있는 동안 body 스크롤 잠금.
 * - QR 이미지는 플레이스홀더로 대체.
 */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Placeholder from "@/components/common/Placeholder";

type QrModalProps = { open: boolean; onClose: () => void };

export default function QrModal({ open, onClose }: QrModalProps) {
  // 열려 있을 때: ESC 로 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    // 딤 배경 — 클릭 시 닫힘
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="키퍼 앱 다운로드 QR"
    >
      {/* ===== QR 카드: 닫기 버튼 / QR 코드 / 안내 문구 ===== */}
      <div
        className="relative flex h-[758px] max-h-[calc(100vh-32px)] w-[542px] flex-col items-center overflow-hidden rounded-[28px] bg-white shadow-[0px_0px_21.68px_0px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()} // 카드 내부 클릭은 닫히지 않게
      >
        <div className="flex h-[87px] w-full items-center justify-end px-[29px]">
          <button type="button" aria-label="닫기" onClick={onClose} className="cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="relative mb-[54px] mt-[27px] flex h-[330px] w-[330px] items-center justify-center">
          <Placeholder label="키퍼 앱 다운로드 QR 코드" className="h-full w-full" />
          {/* QR 가운데 키퍼 로고 (원본: 흰 테두리 7px 의 60×60 로고) */}
          <div className="absolute box-content h-[60px] w-[60px] rounded-[6px] border-[7px] border-white bg-white">
            <Placeholder label="QR logo" kind="icon" className="h-full w-full" />
          </div>
        </div>
        <div className="flex h-fit w-fit flex-col items-center justify-center gap-[18px] bg-white">
          <p className="text-center text-[26px] font-bold text-[#222]">
            앱을 설치하고 제품을 구매하신 후
            <br />
            키퍼의 다양한 기능을 이용해보세요!
          </p>
          <p className="text-center text-[20px] text-[#666]">
            휴대폰 카메라로 QR 코드를 스캔하면
            <br />앱 다운로드 페이지로 이동해요.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
