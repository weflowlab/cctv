/**
 * "REVIEWS — 이미 수많은 사장님들이 키퍼로 직원 관리를 바꿨어요" 섹션 (원본 sc-b5da6c8d)
 * - 상단: 플랫폼별 평점 카드 3개 (App Store / Google Play / 네이버 스마트스토어).
 * - 하단: 사용자 리뷰 카드 3개 (칩 + 별 5개 + 본문 + 구분선 + 아바타·작성자).
 * - PC 가로 3열, 모바일: 평점은 3열 유지(축소), 리뷰는 세로 1열.
 */
import { AvatarIcon, StarIcon } from "./icons";

// 원본 상수 pX (2026년 6월 기준)
const RATINGS = [
  { platform: "App Store", score: "4.8", countText: "평가 59개" },
  { platform: "Google Play", score: "4.7", countText: "리뷰 85개" },
  { platform: "네이버 스마트스토어", score: "4.96", countText: "실구매후기 24개" },
];

const REVIEWS = [
  {
    chip: "출퇴근·급여확인·계약서",
    body: "매장 오픈한 지 얼마 안 된 초보 사장이라 걱정이 많았는데, 키퍼로 하길 정말 잘했어요. 출퇴근 기록에 급여 정리, 근로계약서까지 직원 관리가 편해져서 대만족입니다.",
    avatar: "#889BC7",
    author: "App Store · do******  ",
  },
  {
    chip: "앱 하나로 시간 절약",
    body: "직원 관리와 스케줄 관리가 앱 하나로 가능해 시간이 절약되고, 출퇴근 기록이 자동으로 남아 관리가 훨씬 수월해졌어요.",
    avatar: "#C69C84",
    author: "App Store · 찐**** ",
  },
  {
    chip: "쉬운 앱 사용성 · 신뢰",
    body: "직원 관리, 급여 계산도 탭 몇 번이면 되니까 기계 잘 모르는 저도 금방 익혔어요. 한화비전이라 브랜드 믿음도 있고 앞으로도 계속 쓸 것 같아요.",
    avatar: "#A3C0AC",
    author: "Google Play · 변***  ",
  },
];

function Stars({ className, starClass }: { className: string; starClass: string }) {
  return (
    <div className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={starClass} />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    // ===== 리뷰: 플랫폼 평점 + 사용자 후기 =====
    <section className="flex justify-center bg-[#f8f8f8] px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="relative w-full max-w-[480px] lg:max-w-[1080px]">
        <p className="text-center text-[14px] font-bold leading-none tracking-[-0.28px] text-[#ff5c00] lg:text-[20px] lg:tracking-normal">
          REVIEWS
        </p>
        <h2 className="whitespace-pre-wrap text-center text-[26px] font-bold leading-[1.4] tracking-[-0.52px] text-[#222] lg:whitespace-normal lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] [&>strong]:text-[#ff5c00]">
          이미 수많은 사장님들이
          <br />
          <strong>키퍼</strong>로 직원 관리를 바꿨어요
        </h2>

        {/* 플랫폼별 평점 카드 */}
        <div className="relative mt-[40px] flex gap-[7px] lg:mt-[60px] lg:gap-[22px]">
          {RATINGS.map((r) => (
            <div
              key={r.platform}
              className="flex flex-[1_0_0] flex-col items-center rounded-[9.708px] border border-[#ebedf2] bg-white py-[14px] text-center shadow-[0_2.774px_16.642px_0_rgba(0,0,0,0.04)] lg:rounded-[14px] lg:py-[22px] lg:shadow-[0_4px_24px_0_rgba(0,0,0,0.04)]"
            >
              <p className="text-[10px] font-normal leading-[12.4px] text-[rgba(29,29,31,0.7)] lg:text-[13px] lg:leading-[18px]">
                {r.platform}
              </p>
              <p className="text-[22px] font-bold leading-[41.604px] tracking-[-0.693px] text-[#1a1a1a] lg:text-[40px] lg:leading-[60px] lg:tracking-[-1px]">
                {r.score}
              </p>
              <Stars className="flex items-center gap-[2.4px] lg:gap-[4px]" starClass="h-[13px] w-[13px] lg:h-[22px] lg:w-[22px]" />
              <p className="mt-[2px] text-[10px] font-normal leading-[12.481px] tracking-[-0.5px] text-[rgba(29,29,31,0.3)] lg:text-[13px] lg:leading-[18px] lg:tracking-normal">
                {r.countText}
              </p>
            </div>
          ))}
        </div>
        <p className="mb-[40px] mt-[14px] whitespace-pre-wrap text-center text-[13px] font-normal leading-[18px] tracking-[-0.3px] text-[rgba(29,29,31,0.6)] lg:mb-[48px] lg:mt-[20px] lg:whitespace-normal lg:text-[16px] lg:leading-[24px]">
          {"* 2026년 6월 기준 · 각 플랫폼 공개 평점 \n(수치는 정기적으로 업데이트 예정)"}
        </p>

        {/* 사용자 리뷰 카드 */}
        <div className="relative flex flex-col gap-[16px] lg:flex-row lg:gap-[22px]">
          {REVIEWS.map((r) => (
            <div
              key={r.author}
              className="flex flex-[1_0_0] flex-col rounded-[11.449px] border border-[#ebedf2] bg-white px-[32px] py-[24px] shadow-[0_3.271px_19.627px_0_rgba(0,0,0,0.04)] lg:rounded-[14px] lg:px-[40px] lg:py-[34px] lg:shadow-[0_4px_24px_0_rgba(0,0,0,0.04)]"
            >
              <div className="flex w-fit items-center justify-center rounded-[81.778px] bg-[rgba(255,92,0,0.07)] px-[13px] py-[6.5px] text-[13px] font-medium leading-[19.627px] tracking-[-0.245px] text-[#ff5c00] lg:rounded-[100px] lg:px-[16px] lg:py-[8px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.3px]">
                {r.chip}
              </div>
              <Stars className="mb-[14px] mt-[8px] flex gap-[4px] lg:mb-[20px] lg:mt-[10px] lg:gap-[5px]" starClass="h-[22px] w-[22px] lg:h-[27px] lg:w-[27px]" />
              <p className="h-[80px] w-full text-[13px] font-normal leading-[18px] tracking-[-0.3px] text-[rgba(29,29,31,0.7)] lg:h-[120px] lg:w-[260px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-1px]">
                {r.body}
              </p>
              <div className="my-[14px] h-px w-full shrink-0 bg-black/10 lg:my-[24px]" />
              <div className="flex items-center gap-[6px] lg:gap-[8px]">
                <AvatarIcon fill={r.avatar} />
                <p className="text-[13.084px] font-normal leading-[19.627px] tracking-[-0.245px] text-[rgba(29,29,31,0.7)] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.3px]">
                  {r.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
