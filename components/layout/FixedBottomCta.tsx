"use client";

/**
 * 하단 고정 상담바 (원본 layout 청크의 `ey` 컴포넌트)
 * - PC: 화면 하단 60px 위에 떠 있는 폭 1080px 알약(pill) 바 — 왼쪽 배지+문구, 오른쪽 CTA 버튼.
 * - 모바일: 하단 36px, 좌우 16px 여백 카드(radius 12px), 문구 위 / 버튼 아래 세로 배치. 배지는 PC 에서만.
 * - 경로별로 배지/문구/버튼 구성이 달라진다 (원본 switch 그대로).
 * - 노출 조건은 FooterShell 에서 판단(홈은 첫 화면 높이만큼 스크롤 후, 푸터가 20% 보이면 숨김).
 */
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";

/** 원본 eS 버튼: fill(오렌지 채움) / line(흰 배경 + 오렌지 테두리) */
function CtaButton({
  styleType,
  onClick,
  size,
  children,
}: {
  styleType: "fill" | "line";
  onClick: () => void;
  /** action: 원본 .action-cta (PC 폭 230px) / bar: .cctv-fixed-bar-btn (PC 폭 224px) */
  size?: "action" | "bar";
  children: ReactNode;
}) {
  const color =
    styleType === "line"
      ? "bg-white text-[#ff5c00] hover:bg-white lg:hover:bg-[#f5f5f5]"
      : "bg-[#ff5c00] text-white hover:bg-[#ff5c00] lg:hover:bg-[#e83b05]";
  const width = size === "action" ? "lg:w-[230px] lg:px-0" : size === "bar" ? "lg:w-[224px] lg:px-0" : "lg:px-[20px]";
  return (
    <button
      type="button"
      aria-label={typeof children === "string" ? children : undefined}
      onClick={onClick}
      className={`flex h-[50px] flex-1 cursor-pointer items-center justify-center rounded-[100px] border border-[#ff5c00] px-[2px] py-[8px] text-[14px] font-bold leading-[20px] tracking-[-0.28px] transition-all duration-100 ease-in-out lg:flex-none lg:py-0 lg:text-[20px] lg:font-medium lg:leading-[28px] lg:tracking-[-0.4px] ${color} ${width}`}
    >
      {children}
    </button>
  );
}

/** 원본 eI 배지 (기본: 하늘색 "서비스 오픈") */
function Badge({ children, variant = "blue" }: { children: ReactNode; variant?: "blue" | "orange" }) {
  const tone =
    variant === "orange" ? "border-[#ffdbc6] bg-[#fff6f1]" : "border-[#d1ecff] bg-[#f4faff] text-[#2294e6]";
  return (
    <div
      className={`hidden h-[28px] items-center rounded-[46px] border px-[10px] text-center text-[13px] font-bold leading-[18px] tracking-[-0.3px] lg:flex ${tone}`}
    >
      {children}
    </div>
  );
}

export default function FixedBottomCta() {
  const pathname = usePathname();
  const router = useRouter();

  // ===== CTA 동작 =====
  // TODO: 이벤트 트래킹(cctv_consulting_click 등) 연동
  const openContact = () => window.open("/contact", "_blank");
  const openFranchise = () => window.open("/contact/franchised-promotion", "_blank");
  const openAtoZ = () => window.open("/contact/a-to-z-guide", "_blank");
  const goCalculator = () => router.push("/calculator");
  // 원본: Airbridge 딥링크(arbridge_deeplink_4)로 앱 설치 페이지 이동 — TODO: 딥링크 연동
  const openApp = () => window.open("#", "_blank");

  // ===== 경로별 배지 (PC 전용) =====
  let badge: ReactNode;
  switch (pathname) {
    case "/business":
      badge = (
        <Badge variant="orange">
          <Placeholder label="Keeper" className="h-[16px] w-[58px] rounded-[2px]" />
          <Placeholder label="BUSINESS" className="ml-[4px] h-[8px] w-[43px] rounded-[2px]" />
        </Badge>
      );
      break;
    case "/a-to-z-guide":
      badge = <Badge>키퍼 창업 가이드</Badge>;
      break;
    case "/plan":
      badge = <Badge>다이렉트 구매</Badge>;
      break;
    default:
      badge = <Badge>서비스 오픈</Badge>;
  }

  // ===== 경로별 문구 =====
  const message =
    {
      "/new-service/employee-contract": "직원 수 제한 없이, 간편하게 바로 관리!",
      "/business": "브랜드 매장 CCTV, 한꺼번에 교체하고 싶다면?",
      "/a-to-z-guide": "첫 창업 준비에 꼭 필요한 핵심 안내 가이드",
      "/plan": "중간마진 없이, 필요한 만큼만 바로 구매하세요",
    }[pathname] ?? "약정없는 CCTV 설치, 중간마진 없이 다이렉트로";

  // ===== 경로별 버튼 =====
  let buttons: ReactNode;
  switch (pathname) {
    case "/new-service/employee-contract":
      buttons = <CtaButton styleType="fill" onClick={openApp}>앱 다운로드하기</CtaButton>;
      break;
    case "/business":
      buttons = <CtaButton styleType="fill" onClick={openFranchise}>프랜차이즈 직영점/가맹점 특별 혜택 받기</CtaButton>;
      break;
    case "/a-to-z-guide":
      buttons = (
        <>
          <CtaButton styleType="line" onClick={openContact}>CCTV 도입문의</CtaButton>
          <CtaButton styleType="fill" onClick={openAtoZ}>가이드북 무료 다운로드</CtaButton>
        </>
      );
      break;
    case "/plan":
      buttons = (
        <>
          <CtaButton styleType="line" onClick={goCalculator}>내 매장 CCTV 수량·견적</CtaButton>
          <CtaButton styleType="fill" size="action" onClick={openContact}>도입 문의하기</CtaButton>
        </>
      );
      break;
    default:
      buttons = (
        <>
          <CtaButton styleType="fill" size="bar" onClick={goCalculator}>내 매장 CCTV 수량·견적</CtaButton>
          <CtaButton styleType="line" size="bar" onClick={openContact}>빠른 상담하기</CtaButton>
        </>
      );
  }

  return (
    <div className="fixed bottom-[36px] left-1/2 z-[90] flex h-auto w-[calc(100%-32px)] -translate-x-1/2 flex-col justify-start gap-[12px] rounded-[12px] border border-[#eee] bg-white/95 px-[16px] py-[12px] shadow-[0_12px_21px_0_rgba(25,33,61,0.05)] lg:bottom-[60px] lg:h-[70px] lg:w-[1080px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:rounded-[100px] lg:py-[10px] lg:pl-[18px] lg:pr-[12px]">
      {/* ===== 왼쪽: 배지 + 문구 ===== */}
      <div className="block items-center gap-[8px] lg:inline-flex">
        {badge}
        <p className="text-center text-[15px] font-bold leading-[21px] tracking-[-0.3px] text-[#222] lg:text-left lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px] lg:text-[#333]">
          {message}
        </p>
      </div>
      {/* ===== 오른쪽: CTA 버튼 ===== */}
      <div className="flex w-full items-center gap-[8px] lg:inline-flex lg:w-auto lg:gap-[10px]">{buttons}</div>
    </div>
  );
}
