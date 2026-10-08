/**
 * FAQ 페이지 본문 (원본 sc-4b09ebbe-* 섹션)
 * - 구성: 어두운 배경(#131320) + 주황 블러 원형 배경 장식 → 제목 → 카테고리 탭 → 카테고리별 Q&A 카드
 * - 원본은 아코디언이 아니라 모든 답변이 펼쳐진 상태로 노출된다. (탭은 해당 카테고리로 스크롤 이동)
 * - 질문 번호(Q1~Q34)는 카테고리를 넘어 전체 순서대로 증가.
 * - 섹션이 헤더 아래까지 깔리도록 헤더 높이만큼 음수 margin-top + padding-top (원본 top/margin-bottom 음수 처리와 동일한 결과)
 */
import { FAQ_CATEGORIES } from "./data";
import FaqTabs from "./FaqTabs";

/** 답변 앞 체크 아이콘 (원본 인라인 SVG, PC 에서만 노출) */
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="none"
      className="hidden h-[27px] min-h-[27px] w-[26px] min-w-[26px] lg:block"
      aria-hidden
    >
      <path
        d="M11.2862 19.1457L6.47461 14.5524L8.28711 12.6948L11.2209 15.4951L21.5493 5L23.4271 6.79345L11.2862 19.1457Z"
        fill="white"
        fillOpacity="0.8"
      />
      <path
        d="M16.2218 23.9724L4.40199 23.9249C2.8376 23.9186 1.56985 22.6541 1.5762 21.1066L1.62473 9.29454C1.63108 7.74697 2.90926 6.49286 4.47365 6.49914L16.2934 6.5467L16.2876 8.03504L4.46776 7.98748C3.73296 7.98434 3.13242 8.57393 3.1297 9.30037L3.08117 21.1124C3.07799 21.8393 3.67354 22.4334 4.40834 22.4361L16.2281 22.4836C16.9629 22.4868 17.563 21.8972 17.5662 21.1707L17.5852 16.5146L19.0898 16.5204L19.0707 21.1766C19.0644 22.7241 17.7862 23.9782 16.2218 23.972V23.9724Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default function FaqSection() {
  // 카테고리를 넘어 이어지는 질문 번호 계산용 시작 인덱스
  const starts = FAQ_CATEGORIES.reduce<number[]>((acc, cat, i) => {
    acc.push(i === 0 ? 1 : acc[i - 1] + FAQ_CATEGORIES[i - 1].items.length);
    return acc;
  }, []);

  return (
    <section className="relative -mt-[var(--header-height-mobile)] flex min-w-[360px] justify-center bg-[#131320] pt-[var(--header-height-mobile)] lg:-mt-[var(--header-height)] lg:pt-[var(--header-height)]">
      {/* ===== 배경 장식: 주황 블러 원 16개 / 원본 sc-4b09ebbe-1~3 — 2개씩 짝지어 아래로 3000px(모바일 1500px) 간격 반복 ===== */}
      <div className="absolute top-0 flex h-full w-full justify-center overflow-hidden" aria-hidden>
        <div className="relative h-full w-[400px] lg:w-[2012px]">
          {Array.from({ length: 16 }, (_, n) => {
            const index = Math.floor(n / 2);
            const odd = n % 2 === 0; // nth-of-type(odd) = 1,3,5… 번째 (0-based 짝수)
            return (
              <div
                key={n}
                style={{ ["--i" as string]: index }}
                className={`absolute z-[1] h-[320px] w-[331px] rounded-[331px] bg-[#ff5c00] opacity-[0.11] blur-[100px] lg:h-[1514px] lg:w-[1514px] lg:rounded-[1514px] lg:blur-[323.8px] ${
                  odd
                    ? "left-[176px] top-[calc(170px_+_var(--i)_*_1500px)] lg:left-[1059px] lg:top-[calc(-806px_+_var(--i)_*_3000px)]"
                    : "right-[194px] top-[calc(971px_+_var(--i)_*_1500px)] lg:right-[1038px] lg:top-[calc(603px_+_var(--i)_*_3000px)]"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="z-[2] flex w-full flex-col items-center py-[64px] text-white lg:py-[140px]">
        {/* ===== 제목: "자주 묻는 질문 (FAQ)" — (FAQ) 만 주황 ===== */}
        <h1 className="text-center text-[26px] font-bold leading-[144%] tracking-[-1px] lg:text-[42px]">
          자주 묻는 질문 <b className="text-[#ff5c00]">(FAQ)</b>
        </h1>

        {/* ===== 카테고리 탭: 클릭 시 해당 섹션으로 즉시 스크롤 (클라이언트 컴포넌트) ===== */}
        <FaqTabs labels={FAQ_CATEGORIES.map((c) => c.label)} />

        {/* ===== 카테고리별 Q&A: 주황 세로 바 + 카테고리명, 반투명 유리 카드 안에 질문/답변 목록 ===== */}
        <div className="flex w-full max-w-[1080px] flex-col gap-[54px] px-[24px] lg:gap-[80px] lg:px-0">
          {FAQ_CATEGORIES.map((cat, ci) => (
            <div
              key={cat.label}
              id={cat.label}
              className="scroll-mt-[calc(var(--header-height-mobile)+24px)] lg:scroll-mt-[calc(var(--header-height)+48px)]"
            >
              <div className="flex items-center gap-[12px]">
                <div className="h-[16px] w-[3px] bg-[#ff5c00] lg:h-[20px]" />
                <h2 className="text-[20px] font-bold leading-[130%] tracking-[-1px] text-white lg:text-[24px]">
                  {cat.label}
                </h2>
              </div>
              <div className="mt-[20px] flex flex-col gap-[40px] rounded-[16px] bg-[linear-gradient(159deg,rgba(255,255,255,0.05)_13.88%,rgba(153,153,153,0.06)_91.88%)] px-[20px] py-[24px] backdrop-blur-[32px] lg:mt-[24px] lg:rounded-[24px] lg:p-[40px]">
                {cat.items.map((item, qi) => (
                  <dl key={item.question} className="flex flex-col gap-[10px] lg:gap-[16px]">
                    <dt className="flex items-center">
                      <h3 className="flex gap-[8px] whitespace-pre-wrap text-[20px] font-semibold leading-[144%] tracking-[-1px] lg:text-[24px]">
                        <b className="text-[#ff5c00]">Q{starts[ci] + qi}.</b> <span>{item.question}</span>
                      </h3>
                    </dt>
                    <dd className="flex whitespace-pre-line text-[16px] font-normal leading-[160%] tracking-[-0.36px] text-white/80 lg:text-[18px]">
                      <CheckIcon />
                      <div className="mr-[6px] lg:ml-[6px] lg:mr-[10px]">•</div>
                      <div className="relative">{item.answer}</div>
                    </dd>
                  </dl>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
