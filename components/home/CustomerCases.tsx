"use client";

/**
 * 고객사례 섹션 (원본 e1 / eQ 컴포넌트, sc-10938fc1 / sc-4befd8da)
 * - 상단: 헤드라인 + 설명(왼쪽에서 slide-in, 200ms 지연) | 고객사 로고 맵 이미지(좌우 페이드 마스크).
 * - 고객사례 카드 3개: PC 는 [큰 카드 1] | [작은 카드 2 세로] 2열(높이 616px), 모바일은 1열.
 *   카드 호버 시 그림자 강조. 우하단 원형 화살표 → 해당 블로그 글(/blog/<slug>)로 이동.
 *   ※ 원본에는 상세 모달이 없고 페이지 이동만 한다.
 * - "고객사례 더보기" → /blog?category=5 (원본 router.push).
 */
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { ArrowRightIcon } from "./icons";

type CasePost = {
  iconName: "flink" | "oneroof_lab" | "newfit";
  title: string;
  content?: ReactNode;
  blogSlug: string;
  customerName: string;
};

/** 고객사 로고 크기 (원본 r 매핑: flink 80x30, oneroof_lab 148x16, newfit 101x36) */
const LOGO_SIZE: Record<CasePost["iconName"], string> = {
  flink: "h-[30px] w-[80px]",
  oneroof_lab: "h-[16px] w-[148px]",
  newfit: "h-[36px] w-[101px]",
};

/** 고객사례 데이터 (원본 e0 그대로) */
const POSTS: CasePost[] = [
  {
    iconName: "flink",
    title: "매장 관리 시간과 노력을 아껴주는 든든한 지원군이에요",
    content: (
      <p>
        예전에는 분실물이나 민원 대응을 위해 보안 업체를 거쳐 영상 확인을 요청해야 해서 시간이 오래 걸렸습니다.
        <br />
        이제는 키퍼의 고화질 CCTV와 앱 덕분에, 작은 소지품까지 선명하게 확인할 수 있어 원하는 시간대 영상을 바로 찾아 고객
        응대나 증거 확보도 훨씬 빠르고 정확하게 해결하고 있습니다.
      </p>
    ),
    blogSlug: "customer-case-bakery-cafe-flink",
    customerName: "플링크",
  },
  {
    iconName: "oneroof_lab",
    title: "관리자가 없어도 비대면으로 효율적인 공간 운영이 가능해요",
    blogSlug: "co-working-space-onerooflab",
    customerName: "원루프랩",
  },
  {
    iconName: "newfit",
    title: "100평 넘는 헬스장도 사각지대 없이 회원 안전을 지킬 수 있어 든든합니다.",
    blogSlug: "customer-case-newfit-fitness",
    customerName: "뉴핏",
  },
];

/** 고객사례 카드 1장 (원본 eQ) */
function CaseCard({ post, onDetailClick }: { post: CasePost; onDetailClick: () => void }) {
  return (
    <div className="box-border flex-1 rounded-[24px] bg-white shadow-[0px_4px_25px_0px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1),0px_0px_2px_0px_rgba(0,0,0,0.12)]">
      <div className="flex h-full w-full flex-col justify-between px-[32px] pb-[28px] pt-[32px] lg:p-[40px]">
        <div>
          {/* 고객사 로고 (원본 case/<iconName>.png) */}
          <div>
            <Placeholder
              kind="icon"
              label={`${post.customerName} 고객 사례 아이콘`}
              className={`rounded-[4px] ${LOGO_SIZE[post.iconName]}`}
            />
          </div>
          <h3 className="mt-[16px] text-[20px] font-bold leading-[28px] tracking-[-1px] text-[#333] lg:mt-[24px] lg:text-[24px] lg:leading-[36px]">
            {post.title}
          </h3>
          {post.content && (
            <div className="mt-[6px] break-all text-[14px] font-normal leading-[20px] tracking-[-1px] text-[#666] lg:mt-[12px] lg:text-[18px] lg:leading-[28px]">
              {post.content}
            </div>
          )}
        </div>
        <div className="mt-[20px] flex items-center justify-between lg:mt-0">
          {/* 원본 전역 strong 색(#ff5c00)이 적용됨 */}
          <strong className="text-[14px] font-medium leading-[28px] tracking-[-1px] text-brand lg:text-[16px]">
            {post.customerName}
          </strong>
          <button
            type="button"
            aria-label="상세보기"
            onClick={onDetailClick}
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#dedede] bg-white lg:h-[48px] lg:w-[48px]"
          >
            <ArrowRightIcon className="h-[13px] w-[15px] text-[#333] lg:h-[16px] lg:w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CustomerCases() {
  const router = useRouter();
  // 카드 상세 → 블로그 글 상세 페이지
  const goDetail = (slug: string) => router.push(`/blog/${slug}`);

  return (
    // ===== 고객사례: 연회색(#f9f9f9) 배경 =====
    <section className="relative mt-[100px] flex w-full items-center justify-center bg-[#f9f9f9] pb-[100px] pt-[60px] lg:mt-0 lg:py-[150px]">
      <div className="relative w-[1082px] max-w-full">
        {/* ===== 헤더: 헤드라인 + 로고 맵 ===== */}
        <header className="flex flex-col justify-between lg:flex-row">
          <Reveal
            animation="slide-in-left"
            delay={200}
            threshold={0.1}
            className="flex flex-col justify-center gap-[8px] text-center lg:gap-[16px] lg:text-left"
          >
            <h2 className="text-[24px] font-bold leading-[34px] tracking-[-1px] text-[#222] lg:text-[42px] lg:leading-[60px]">
              키퍼를 선택한 사장님들은
              <br />
              더 편리한 매장관리를
              <br />
              경험하고 있습니다.
            </h2>
            <p className="text-[15px] font-normal leading-[24px] tracking-[-1px] text-[rgba(32,32,32,0.6)] lg:text-[22px] lg:leading-[33px]">
              카페부터 식당, 피트니스, 유치원 등 많은 매장이
              <br />
              자영업자앱 키퍼로 일하고 있습니다.
            </p>
          </Reveal>
          {/* 로고 맵 + 좌우 20% 페이드 (원본 ::before / ::after, 둘 다 270deg 그라데이션) */}
          <div className="relative mt-[32px] w-full lg:mt-0 lg:w-auto">
            <span className="absolute bottom-0 left-0 top-0 z-10 w-1/5 bg-[linear-gradient(270deg,rgba(249,249,249,0)_-20%,#f9f9f9_100%)]" />
            <Placeholder
              label="키퍼 도입 고객사 브랜드 맵 (식당, 카페, 피트니스 등)"
              className="aspect-[530/400] w-full lg:aspect-auto lg:h-[400px] lg:w-[530px]"
            />
            <span className="absolute bottom-0 right-0 top-0 z-10 w-1/5 bg-[linear-gradient(270deg,rgba(249,249,249,0)_-20%,#f9f9f9_100%)]" />
          </div>
        </header>

        {/* ===== 카드 영역: 왼쪽 큰 카드 1 + 오른쪽 작은 카드 2 ===== */}
        <Reveal
          delay={200}
          threshold={0.1}
          className="mt-[32px] flex h-auto w-full flex-col gap-[24px] px-[16px] lg:mt-[48px] lg:h-[616px] lg:flex-row lg:px-0"
        >
          <div className="flex flex-1 flex-col gap-[24px]">
            <CaseCard post={POSTS[0]} onDetailClick={() => goDetail(POSTS[0].blogSlug)} />
          </div>
          <div className="flex flex-1 flex-col gap-[24px]">
            <CaseCard post={POSTS[1]} onDetailClick={() => goDetail(POSTS[1].blogSlug)} />
            <CaseCard post={POSTS[2]} onDetailClick={() => goDetail(POSTS[2].blogSlug)} />
          </div>
        </Reveal>

        {/* ===== 고객사례 더보기 → /blog?category=5 ===== */}
        <footer className="mt-[48px] flex justify-center">
          <button
            type="button"
            aria-label="고객사례 더보기"
            onClick={() => router.push("/blog?category=5")}
            className="flex h-[42px] w-[168px] cursor-pointer items-center justify-center rounded-[30px] border-0 bg-white text-[14px] font-bold leading-[20px] tracking-[-1px] text-[rgba(32,32,32,0.9)] lg:h-[76px] lg:w-[264px] lg:rounded-[62px] lg:text-[24px] lg:leading-[40px]"
          >
            고객사례 더보기
          </button>
        </footer>
      </div>
    </section>
  );
}
