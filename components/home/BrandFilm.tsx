/**
 * 브랜드 필름 섹션 (원본 ta 컴포넌트, sc-7bad4525)
 * - "TV에서 못다 한 이야기, 풀버전으로 보세요" + 신혜선 Brand Film 유튜브 임베드.
 * - 원본은 마운트 후에만 iframe src 를 넣는 지연 로딩 iframe
 *   (https://www.youtube.com/embed/5mr-vIe2t1M) → 여기서는 영상 플레이스홀더로 대체.
 * - PC: 1080x610 / 모바일: 최대 528px, 16:9.
 */
import Placeholder from "@/components/common/Placeholder";

export default function BrandFilm() {
  return (
    // ===== 브랜드 필름: 회색(#f0f3f7) 배경, 제목 + 부제 + 유튜브 영상 =====
    <div className="flex w-full justify-center bg-[#f0f3f7] py-[40px] lg:py-[140px]">
      <div className="flex h-full w-full max-w-[1080px] flex-col items-center px-[16px] lg:px-0">
        <h2 className="text-center text-[26px] font-bold leading-[1.14] tracking-[-1px] text-[#1d1d1f] lg:text-[42px]">
          TV에서 못다 한 이야기, <strong className="text-brand">풀버전</strong>으로 보세요
        </h2>
        <p className="mb-[20px] mt-[16px] text-[16px] font-normal leading-[1.5] tracking-[-0.22px] text-[#1d1d1f] lg:mb-[40px] lg:mt-[14px] lg:text-[22px]">
          한화비전 키퍼<strong className="text-brand"> x </strong>신혜선 Brand Film
        </p>
        {/* 유튜브 iframe 자리 (원본 src: https://www.youtube.com/embed/5mr-vIe2t1M?si=JHZTZd8DJoFpl3bg) */}
        <Placeholder
          kind="video"
          label="한화비전 키퍼 x 신혜선 Brand Film (YouTube)"
          className="aspect-video w-full max-w-[528px] rounded-[20px] lg:aspect-auto lg:h-[610px] lg:w-[1080px] lg:max-w-none"
        />
      </div>
    </div>
  );
}
