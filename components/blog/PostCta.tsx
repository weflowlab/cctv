/**
 * 블로그 상세 본문 하단 CTA 박스 (원본 sc-7b90ce5a-*)
 * - 연한 주황 그라데이션 박스: 제목 / 설명 / 버튼(첫 버튼 primary 주황, 이후 secondary 주황 테두리)
 * - 원본은 글마다 CMS 의 cta 설정(title/description/buttons, isHidden)을 사용.
 *   버튼 type "URL" 은 router.push(url), "APP_DOWNLOAD_LINK" 는 OS 별 앱스토어 새 창.
 * - 여기서는 샘플 글(why-buy-cctv-not-rental)의 CTA 값을 기본값으로 모든 글에 사용.
 * - URL 에 contact 가 포함된 버튼에는 원본처럼 click_cta 클래스(전환 추적용)를 붙인다.
 */
import Link from "next/link";

export type CtaButton = { label: string; url: string };
export type Cta = { title: string; description?: string; buttons: CtaButton[] };

/** 샘플 글 CTA (원본 API 응답 값, 도메인만 상대 경로로) */
export const DEFAULT_CTA: Cta = {
  title: "매달 내는 렌탈료가 아깝다면? 이제 CCTV는 소장하세요!",
  description: "평생 쓰는 우리 매장 보안, 키퍼 CCTV로 매달 고정 지출을 제로로 만드세요.",
  buttons: [
    { label: "도입 문의", url: "/contact" },
    { label: "비용 계산해보기", url: "/plan" },
  ],
};

export default function PostCta({ cta = DEFAULT_CTA }: { cta?: Cta }) {
  return (
    <div className="mx-auto w-full py-[36px] lg:py-[64px]">
      <div className="flex min-h-[272px] w-full flex-col items-center justify-center rounded-[32px] bg-[linear-gradient(180deg,#fff7f1_0%,#fff0e5_100%)] px-[20px] py-[40px] lg:min-h-[312px] lg:px-0 lg:py-[56px]">
        {/* ===== CTA 제목 / 설명 (원본은 \n → <br />) ===== */}
        <h2 className="whitespace-pre-line text-center text-[24px] font-bold leading-[34px] tracking-[-1px] text-[#222] lg:text-[32px] lg:leading-[44px]">
          {cta.title}
        </h2>
        {cta.description && (
          <p className="mt-[24px] whitespace-pre-line text-center text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-[#666] lg:mt-[12px] lg:text-[18px] lg:leading-[28px]">
            {cta.description}
          </p>
        )}

        {/* ===== CTA 버튼: 첫 번째 primary, 나머지 secondary / 모바일 세로 전체폭 ===== */}
        {cta.buttons.length > 0 && (
          <div className="mt-[24px] flex w-full flex-col justify-center gap-[8px] lg:flex-row lg:gap-[24px]">
            {cta.buttons.map((b, i) => (
              <Link
                key={b.label}
                href={b.url}
                aria-label={b.label}
                className={`${b.url.split("?")[0].split("/").includes("contact") ? "click_cta " : ""}inline-flex h-[52px] min-w-full cursor-pointer items-center justify-center rounded-[8px] px-[10px] text-[16px] font-medium leading-[23px] tracking-[-0.32px] lg:h-[48px] lg:min-w-[160px] lg:text-[14px] lg:leading-[22px] lg:tracking-[-0.3px] ${
                  i === 0
                    ? "bg-[#ff5c00] text-white"
                    : "border border-[#ff5c00] bg-white text-[#ff5c00]"
                }`}
              >
                {b.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
