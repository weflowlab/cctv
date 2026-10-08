"use client";

/**
 * 앱 다운로드 CTA 버튼 + QR 모달
 * - 원본 동작 (공통 모듈 29866 의 SI("arbridge_deeplink_N")):
 *   · PC(≥1024px)  : "앱 설치 QR" 모달을 띄움 (542×758, 라운드 28, QR 330×330 중앙에 키퍼 로고)
 *   · 모바일        : Airbridge 딥링크로 앱 열기 → 미설치 시 스토어(iOS 앱스토어 / 구글플레이)로 이동
 * - 여기서는 Airbridge SDK 없이 UA 로 스토어 URL 을 골라 이동한다.
 * - 버튼 모양은 섹션마다 다르므로 className / children 을 그대로 받아 사용.
 */
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Placeholder from "@/components/common/Placeholder";
import { CloseIcon } from "./icons";

// 원본 fallback 스토어 링크
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hanwha.keeper";
const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%ED%82%A4%ED%8D%BC-%EB%A7%A4%EC%9E%A5%EA%B4%80%EB%A6%AC-%EC%86%94%EB%A3%A8%EC%85%98/id6504780897";

type Props = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function AppDownloadCta({ children, className = "", ariaLabel }: Props) {
  // QR 모달 열림 여부 (PC 에서만 사용)
  const [open, setOpen] = useState(false);

  // 클릭: PC 면 QR 모달, 모바일이면 OS 에 맞는 스토어로 이동
  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      setOpen(true);
      return;
    }
    // TODO: Airbridge 딥링크 연동 (원본: keeper.airbridge.io + ctaParams)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.location.href = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
  };

  return (
    <>
      <button type="button" aria-label={ariaLabel} onClick={handleClick} className={className}>
        {children}
      </button>
      {open && <QrModal onClose={() => setOpen(false)} />}
    </>
  );
}

/* ===== QR 모달: 앱 설치 QR 안내 / 딤 클릭·ESC·X 버튼으로 닫힘, 열려있는 동안 body 스크롤 잠금 ===== */
function QrModal({ onClose }: { onClose: () => void }) {
  // ESC 로 닫기 + 배경 스크롤 잠금
  useEffect(() => {
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
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* 딤 배경 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* 모달 본체 */}
      <div className="relative flex h-[758px] max-h-[90%] w-[542px] max-w-[90%] flex-col items-center overflow-hidden rounded-[28px] bg-white shadow-[0_0_21.68px_0_rgba(0,0,0,0.1)]">
        <div className="flex h-[87px] w-full items-center justify-end px-[29px]">
          <button type="button" aria-label="닫기" onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>
        {/* QR 코드 (원본은 qrcode.react 로 keeper.airbridge.io 링크를 그림) + 중앙 로고 */}
        <div className="relative mb-[54px] mt-[27px] flex h-[330px] w-[330px] items-center justify-center">
          <Placeholder label="앱 다운로드 QR 코드" className="h-full w-full" />
          <div className="absolute box-content h-[60px] w-[60px] rounded-[6px] border-[7px] border-white bg-white">
            <Placeholder label="QR logo" kind="icon" className="h-full w-full rounded-[4px]" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[18px] bg-white">
          <p className="text-center text-[26px] font-bold text-[#222]">
            앱을 설치하고 제품을 구매하신 후
            <br />
            키퍼의 다양한 기능을 이용해보세요!
          </p>
          <p className="text-center text-[20px] text-[#666]">
            휴대폰 카메라로 QR 코드를 스캔하면
            <br />
            앱 다운로드 페이지로 이동해요.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
