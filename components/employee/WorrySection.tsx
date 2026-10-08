/**
 * "사장님! 이런 고민…" 섹션 (원본 sc-9e40d3d7 / 카드 sc-613435dd)
 * - PC: 2열 그리드(row-gap 62, column-gap 74) / 모바일: 1열(gap 36).
 * - 원본은 카드 그리드 전체에 slide-up(50px, 1000ms) 스크롤 등장 애니메이션을 건다 → <Reveal>.
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SpaceOrBreak } from "./icons";

const WORRIES = [
  { title: "“몇 시에 왔더라?”", content: "매번 직원들 출퇴근 시간 확인하느라 시간과 에너지 낭비" },
  { title: "“스케줄표 만들기 너무 복잡해”", content: "직원별 근무시간 정리하고 스케줄표 작성하는 번거로움" },
  { title: "“시간이 부족해”", content: "9시간 영업 중 관리업무?! 매장 운영도 바쁜데 서류까지" },
  { title: "“또 손으로 써야 해?”", content: "사소한 오류에도 처음부터 다시 써야하는 불편함" },
];

export default function WorrySection() {
  return (
    // ===== 고민 공감 섹션: 4개 고민 카드 (이미지 + 제목 + 설명) =====
    <section className="relative w-full bg-white px-[16px] py-[60px] lg:px-0 lg:pb-[160px] lg:pt-[120px]">
      <div className="relative mx-auto w-full max-w-[580px] lg:w-[1080px] lg:max-w-none">
        <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#222] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
          사장님!
          <br />
          이런 고민, 매일 반복되고
          <SpaceOrBreak />
          있지 않나요?
        </h2>
        <Reveal className="mt-[36px] flex w-full flex-col gap-[36px] lg:mt-[104px] lg:grid lg:grid-cols-2 lg:gap-x-[74px] lg:gap-y-[62px]">
          {WORRIES.map((w) => (
            <div key={w.title}>
              <Placeholder label={w.title} className="aspect-[755/429] w-full" />
              <h2 className="mt-[16px] px-[8px] text-[18px] font-bold leading-[27px] tracking-[-0.36px] text-[#222] lg:text-[24px] lg:leading-[34px] lg:tracking-[-0.48px]">
                {w.title}
              </h2>
              <p className="mt-[6px] break-words px-[8px] text-[14px] font-normal leading-[22px] tracking-[-0.14px] text-[#666] lg:mt-[8px] lg:text-[20px] lg:font-medium lg:leading-[28px] lg:tracking-[-0.4px]">
                {w.content}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
