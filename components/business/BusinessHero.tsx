"use client";

/**
 * /business 히어로 섹션 (클라이언트 컴포넌트)
 * - 원본 sc-bca79b24: 헤더 아래로 깔리는 1080px 높이 배경 이미지 + 좌측 카피 + CTA 버튼
 * - 인터랙션
 *   · 헤더: 스크롤 100px 미만이면 투명(흰 글자), 넘어가면 흰 배경 (원본 useHeaderScroll(100))
 *   · "프랜차이즈 직영점/가맹점 특별 혜택 받기" → /contact/franchised-promotion 을 새 탭으로 연다
 *     (원본은 최초 진입 시 저장한 UTM 쿼리를 붙여서 연다)
 */
import Placeholder from "@/components/common/Placeholder";
import { useHeaderScrollStyle } from "./useHeaderScrollStyle";

/** 원본 q8(): 첫 진입 시 sessionStorage 에 저장한 쿼리(INITIAL_SEARCH_PARAMS)를 경로 뒤에 붙임 */
function withInitialParams(path: string) {
  try {
    const raw = sessionStorage.getItem("INITIAL_SEARCH_PARAMS");
    const params = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const query = Object.entries(params)
      .filter(([, v]) => ["string", "number", "boolean"].includes(typeof v))
      .map(([k, v]) => `${k}=${String(v)}`)
      .join("&");
    return query ? `${path}?${query}` : path;
  } catch {
    return path;
  }
}

export default function BusinessHero() {
  // 스크롤 100px 기준으로 헤더 투명 ↔ 흰색 전환
  useHeaderScrollStyle(100, "transparent", "white");

  const openPromotion = () => {
    window.open(withInitialParams("/contact/franchised-promotion"), "_blank");
  };

  return (
    // 헤더 높이만큼 위로 끌어올려 헤더 밑에 깔림
    <section className="relative mt-[calc(-1*var(--header-height-mobile))] h-auto w-full lg:mt-[calc(-1*var(--header-height))] lg:h-[1080px]">
      {/* ===== 배경 이미지: PC 1920×1080(높이 100% 가운데 정렬) / 모바일 375×609 ===== */}
      <div className="relative flex h-full w-full justify-center overflow-hidden">
        <div className="w-full lg:hidden">
          <Placeholder label="keeper (비즈니스 상단 배경 · 모바일)" className="aspect-[375/609] w-full" />
        </div>
        <div className="hidden h-full shrink-0 lg:block">
          <Placeholder label="keeper (비즈니스 상단 배경)" className="aspect-[1920/1080] h-full" />
        </div>
      </div>

      {/* ===== 카피 + CTA: PC 는 top 270px · 1080 폭 좌측 정렬, 모바일은 top 77vw 가운데 정렬 ===== */}
      <div className="absolute left-0 top-[77vw] w-full lg:left-1/2 lg:top-[270px] lg:w-[1080px] lg:-translate-x-1/2">
        <h1 className="text-center text-[18px] font-normal leading-[26px] tracking-[-0.36px] text-[#333] lg:text-left lg:text-[26px] lg:leading-[28px] lg:tracking-[-0.5px]">
          브랜드 매장 CCTV,
          <span className="hidden lg:inline"> </span>
          <br className="lg:hidden" />
          한꺼번에 교체하고 싶다면?
        </h1>
        <h2 className="mt-[6px] text-center text-[30px] font-bold leading-[45px] tracking-[-0.6px] text-[#222] lg:mt-[24px] lg:text-left lg:text-[56px] lg:leading-[78px] lg:tracking-[-1px]">
          요즘 사장님들의
          <br />
          매장 관리 올인원 솔루션
          <br />
          <strong className="text-[#ff5c00]">키퍼</strong>가 정답입니다!
        </h2>
        <div className="mt-[36px] flex justify-center lg:mt-[40px] lg:block">
          <button
            type="button"
            onClick={openPromotion}
            className="inline-flex h-[54px] w-auto cursor-pointer items-center rounded-[588px] bg-[linear-gradient(96deg,#ff5c00_-0.01%,#ff4d00_123.7%)] px-[36px] text-[16px] font-medium leading-[24px] tracking-[-0.32px] text-white shadow-[inset_0_1.742px_1.5px_0_rgba(255,255,255,0.25)] lg:h-[74px] lg:rounded-[1352px] lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.3px] lg:shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.25)] lg:hover:bg-[#e83b05] lg:hover:bg-none"
          >
            프랜차이즈 직영점/가맹점 특별 혜택 받기
          </button>
        </div>
      </div>
    </section>
  );
}
