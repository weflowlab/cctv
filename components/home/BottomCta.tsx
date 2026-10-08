"use client";

/**
 * 하단 CTA 섹션 (원본 te 컴포넌트, sc-c532428)
 * - 주황(#ff6418) 배경 + 노란빛 radial 오버레이 2개.
 * - "우리 매장 관리 / 지금 바로 키퍼 하세요." + "빠른 상담하기" 버튼(→ /contact).
 * - 우측(모바일은 하단) 키퍼 앱 모델 이미지, 그 위에 구글 플레이 / 앱 스토어 버튼(새 창).
 * - 제목, 버튼, 앱스토어 버튼 묶음은 스크롤 진입 시 slide-in-up.
 */
import { useRouter } from "next/navigation";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { AppleLogo, AppStoreWordmark, ArrowRightIcon, GooglePlayLogo, GooglePlayWordmark } from "./icons";

/** 원본 25021 모듈의 앱 마켓 URL */
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.hanwha.keeper&hl=ko&gl=KR&utm_source=apac_med";
const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%ED%82%A4%ED%8D%BC-%EB%A7%A4%EC%9E%A5%EA%B4%80%EB%A6%AC-%EC%86%94%EB%A3%A8%EC%85%98/id6504780897";

export default function BottomCta() {
  const router = useRouter();
  const storeButton =
    "flex h-[42px] w-[144px] shrink-0 items-center justify-center gap-[9px] rounded-[58.05px] bg-[#202020] transition-opacity duration-150 active:opacity-70 lg:h-[59.042px] lg:w-[199.465px] lg:gap-[14.76px] lg:rounded-[92.252px]";

  return (
    // ===== 하단 CTA: 주황 배경 =====
    <div className="relative flex w-full justify-center overflow-hidden bg-[#ff6418] px-[16px] pb-0 pt-[60px] lg:px-0 lg:py-[150px]">
      <section className="relative flex w-full max-w-[1080px] flex-col items-center gap-[48px] pb-0 lg:block lg:pb-[45px]">
        {/* 장식 오버레이 1: 좌상단 큰 노란 radial */}
        <div className="absolute left-[-100px] top-[-342px] z-0 h-[564px] w-[564px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,240,188,0.5)_0%,rgba(255,240,188,0)_100%)] opacity-60 lg:left-[-880px] lg:top-[-860px] lg:h-[1436px] lg:w-[1436px]" />
        {/* 장식 오버레이 2: 우측 원 (PC 전용) */}
        <div className="absolute right-[-180px] top-0 z-0 hidden h-[801px] w-[801px] rounded-full bg-[linear-gradient(180deg,rgba(255,219,198,0.2)_0%,rgba(255,219,198,0)_50.06%)] opacity-[0.24] lg:block" />

        {/* ===== 카피 + 빠른 상담하기 ===== */}
        <div className="relative z-[1] flex w-full flex-col items-center gap-[24px] text-center lg:items-start lg:text-left">
          <Reveal
            as="h3"
            threshold={0.1}
            className="text-[28px] font-bold leading-[1.4] tracking-[-0.28px] text-[#ffef9e] lg:text-[42px] lg:leading-[1.38] lg:tracking-[-0.42px]"
          >
            우리 매장 관리
            <br />
            <b className="text-white">지금 바로 키퍼 하세요.</b>
          </Reveal>
          <Reveal threshold={0.1}>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="flex w-fit cursor-pointer items-center justify-center gap-[4px] rounded-[48px] bg-white py-[12.615px] pl-[19.712px] pr-[17.346px] text-center text-[14px] font-medium leading-[1.2] tracking-[-0.36px] text-black lg:h-[56px] lg:gap-[8px] lg:py-0 lg:pl-[24px] lg:pr-[22px] lg:text-[18px] lg:font-bold lg:text-[#222]"
            >
              <span>빠른 상담하기</span>
              <ArrowRightIcon className="h-[10px] w-[10px] lg:h-[14px] lg:w-[14px]" />
            </button>
          </Reveal>
        </div>

        {/* ===== 앱 모델 이미지 (원본 overview_model_pc.png / 모바일 overview_model_mb.png) ===== */}
        <div className="z-0 w-full max-w-[375px] lg:max-w-none">
          <Placeholder
            label="키퍼 모바일 앱 및 매장 관리 솔루션"
            className="relative bottom-0 aspect-[375/420] w-full lg:absolute lg:bottom-[-151px] lg:right-0 lg:aspect-auto lg:h-[540px] lg:w-[463px]"
          />
        </div>

        {/* ===== 앱 다운로드 버튼 (구글 플레이 / 앱 스토어, 새 창) ===== */}
        <Reveal
          threshold={0.1}
          className="absolute bottom-[40px] left-0 z-[1] flex w-full justify-center gap-[11px] lg:bottom-[-90px] lg:w-auto lg:justify-start"
        >
          <button
            type="button"
            aria-label="구글 플레이 앱 링크"
            className={storeButton}
            onClick={() => window.open(GOOGLE_PLAY_URL, "_blank", "noopener,noreferrer")}
          >
            <GooglePlayLogo className="h-auto w-[17.016px] lg:w-[23.384px]" />
            <GooglePlayWordmark className="h-auto w-[71.402px] lg:w-[98.137px]" />
          </button>
          <button
            type="button"
            aria-label="앱 스토어 앱 링크"
            className={storeButton}
            onClick={() => window.open(APP_STORE_URL, "_blank", "noopener,noreferrer")}
          >
            <AppleLogo className="h-auto w-[17.633px] lg:w-[24.235px]" />
            <AppStoreWordmark className="h-auto w-[64.517px] lg:w-[88.669px]" />
          </button>
        </Reveal>
      </section>
    </div>
  );
}
