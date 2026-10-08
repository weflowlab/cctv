/**
 * 매장운영 시스템 가이드 — 마무리 2개 섹션
 * 1) "이런 분들에게 강력 추천합니다!" — 인물 이미지 + 흰 말풍선, 홀/짝 줄마다 좌우 반전(지그재그)
 * 2) 최종 CTA — 주황 배경 + 흰 버튼 "무료가이드북 다운로드 받기"
 *    - 원본: 이벤트(leadgen_shop-management-guide_click) 후 /contact/shop-management 이동
 */
import Link from "next/link";
import Placeholder from "@/components/common/Placeholder";
import { DownloadIcon } from "@/components/guides/shared/icons";

const PEOPLE = [
  "알바가 바뀔 때마다 처음부터 \n다시 설명하느라 지치는 사장님",
  "급여 계산이 매달 헷갈리고 알바와 \n의견이 엇갈리는 사장님",
  "알바 지각·무단 결근이 반복되는데 \n어떻게 대응해야 할지 모르는 사장님",
  "매장을 잠깐 비울 때도 \n무슨 일이 생길까 불안한 사장님",
];

/** 말풍선 꼬리 (왼쪽을 가리키는 흰 삼각형, 원본 24x27) */
function BubbleTail() {
  return (
    <svg className="h-[17px] w-[17px] lg:h-[27px] lg:w-[24px]" viewBox="0 0 24 27" fill="none" aria-hidden>
      <path d="M24 0v27L1.2 15.2a2 2 0 0 1 0-3.4L24 0Z" fill="#fff" />
    </svg>
  );
}

export function Recommend() {
  return (
    // ===== 추천 대상: 지그재그 말풍선 =====
    <section className="relative w-full bg-[#ffefd5] px-4 py-[64px] lg:px-0 lg:py-[140px]">
      <div className="relative mx-auto flex w-full flex-col items-center lg:w-[1080px]">
        <div className="mb-[40px] flex flex-col items-center text-center lg:mb-[60px]">
          <h2 className="text-[26px] leading-[1.4] font-bold tracking-[-0.8px] text-[#202020] lg:text-[40px]">
            이런 분들에게
            <br />
            <span className="text-[#ff5c00]">강력 추천</span>합니다!
          </h2>
        </div>

        <div className="flex w-full max-w-[420px] flex-col gap-[24px] lg:w-[947px] lg:max-w-none lg:gap-0">
          {PEOPLE.map((text, i) => {
            const even = i % 2 === 1; // nth-of-type(even) → 좌우 반전
            return (
              <div
                key={text}
                className={`flex w-full items-center gap-[20px] lg:gap-[40px] ${even ? "flex-row-reverse" : "flex-row"} ${
                  i < PEOPLE.length - 1 ? "lg:mb-[-24px]" : ""
                }`}
              >
                <Placeholder label={`사람들${i + 1}`} className="h-[88px] w-[88px] shrink-0 lg:h-[180px] lg:w-[180px]" />
                <div className="relative flex w-full items-center justify-center rounded-[8px] bg-white px-[20px] py-[12px] text-center lg:w-[704px] lg:px-[40px] lg:py-[24px]">
                  {/* 꼬리: 홀수 줄은 왼쪽, 짝수 줄은 오른쪽(180도 회전) */}
                  <div
                    className={`absolute top-[11px] lg:top-1/2 lg:-translate-y-1/2 ${
                      even ? "right-[-11px] rotate-180 lg:right-[-22px]" : "left-[-11px] lg:left-[-22px]"
                    }`}
                  >
                    <BubbleTail />
                  </div>
                  <p className="text-left text-[12px] leading-[1.4] font-medium tracking-[-0.44px] whitespace-pre-wrap text-[#1e1e30] lg:text-center lg:text-[22px] lg:whitespace-nowrap">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    // ===== 최종 다운로드 CTA =====
    <section className="relative w-full bg-[#fc6a38] px-4 py-[64px] lg:px-[20px] lg:py-[100px]">
      <div className="relative mx-auto flex w-full flex-col items-center gap-[24px] text-center lg:w-[1080px] lg:gap-[40px]">
        <h2 className="text-[26px] leading-[1.5] font-bold tracking-[-0.5px] whitespace-pre-wrap text-white lg:text-[36px] lg:leading-[50px] lg:tracking-[-1px] lg:whitespace-normal">
          {"사람이 바뀌어도,\n 사장님이 자리를 비워도"}
          <br />
          {"흔들리지 않는 매장,\n 지금 바로 만들어보세요."}
        </h2>
        {/* TODO: 이벤트 트래킹 leadgen_shop-management-guide_click */}
        <Link
          href="/contact/shop-management"
          className="inline-flex cursor-pointer items-center justify-center gap-[10px] rounded-[50px] bg-white px-[22px] py-[10px] text-[16px] font-bold text-[#ff6c3a] transition-opacity duration-200 hover:opacity-90 lg:gap-[16px] lg:rounded-[10px] lg:px-[50px] lg:py-[18px] lg:text-[20px]"
        >
          <DownloadIcon color="#FF6C3A" className="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]" />
          무료가이드북 다운로드 받기
        </Link>
      </div>
    </section>
  );
}
