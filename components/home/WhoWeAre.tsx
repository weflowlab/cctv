/**
 * Who We Are 섹션 (원본 eu 컴포넌트, sc-d8f14b5d)
 * - PC: 좌 이미지(한화비전 사옥) | 우 주황 패널, 높이 960px 반반 분할.
 * - 모바일: column-reverse → 주황 텍스트 패널이 위, 이미지가 아래. 가운데 정렬.
 * - 본문 후반부("특히, CCTV 전용 반도체부터…")는 원본에서 isDesktop 일 때만 렌더 → CSS 로 PC 에서만 노출.
 * - 제목 묶음과 본문은 스크롤 진입 시 오른쪽에서 슬라이드 인(원본 direction "right").
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";

export default function WhoWeAre() {
  return (
    // ===== Who We Are: 이미지 + 주황 패널 =====
    <section className="flex h-auto w-full flex-col-reverse overflow-hidden lg:h-[960px] lg:flex-row">
      {/* 이미지 (원본 home/whoweare.png, object-fit: cover) */}
      <article className="flex-[1_1_300px]">
        <Placeholder label="CCTV 전문 대기업 한화비전" className="h-full min-h-[300px] w-full" />
      </article>

      {/* 주황 패널 */}
      <article className="flex-[1_1_300px] bg-brand">
        <div className="box-border flex h-full w-full flex-col items-center justify-between gap-[12px] px-[16px] py-[60px] lg:items-stretch lg:gap-0 lg:px-[100px] lg:py-[90px]">
          <Reveal animation="slide-in-right" threshold={0.1} className="flex flex-col items-center gap-[16px] text-center lg:items-start lg:gap-[20px] lg:text-left">
            <strong className="flex h-[40px] w-fit items-center justify-center rounded-[100px] bg-brand-light px-[16px] text-[16px] font-medium text-brand">
              Who We Are
            </strong>
            <h2 className="text-[26px] font-bold leading-[36px] text-white lg:text-[42px] lg:leading-[56px]">
              차원이 다른 글로벌 기술력
              <br />
              CCTV 전문 대기업
              <br />
              한화비전이기에 가능합니다.
            </h2>
          </Reveal>
          <Reveal
            as="p"
            animation="slide-in-right"
            threshold={0.1}
            className="mt-[12px] text-center text-[15px] font-normal leading-[24px] text-white lg:mt-0 lg:text-left lg:text-[20px] lg:leading-[34px]"
          >
            한화비전은 30년 이상 영상보안 분야를 선도해온
            <br />
            글로벌 보안 전문 기업입니다.
            <br />
            세계 100여 개국에 수출되는 검증된 기술력을 바탕으로,
            <br />
            <b>사장님의 매장을 더 안전하고 스마트하게 지켜드립니다.</b>
            {/* PC 전용 문단 (원본 isDesktop 조건부 렌더) */}
            <span className="hidden lg:inline">
              <br />
              <br />
              특히, CCTV 전용 반도체부터 렌즈, 본체, 저장장치까지
              <br />
              보안 솔루션의 핵심 부품을 모두 자체 개발·생산할 수 있는
              <br />
              전 세계 유일의 기업으로, 타사와는 차원이 다른
              <br />
              통합 기술력과 안정성을 제공합니다.
            </span>
          </Reveal>
        </div>
      </article>
    </section>
  );
}
