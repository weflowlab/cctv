/**
 * /cases/[id] — 시공사례 상세 (서버 컴포넌트)
 * - 구성: 목록으로 → 장소 칩 + 제목 → 메타(장소·지역·대수·서비스·날짜) → 사진 갤러리 → 현장 설명(summary)
 *   → [이 사례처럼 견적 받기 → /calculator] → 비슷한 공간 사례(같은 장소 최대 3개) → 하단 상담 CTA
 * - id: 등록된 사례로 generateStaticParams 정적 생성 (이후 등록분은 첫 방문 때 생성), 없는 id 는 notFound()
 * - params 는 페이지 최상단에서 await 하지 않고 Suspense 안 하위 컴포넌트(CaseDetail)에서 읽는다
 *   (Cache Components 의 Instant Navigation 요구사항). 하단 CTA 는 Suspense 밖이라 즉시 표시.
 * - 데이터: lib/cases.ts getCases() (DB — 관리자 > 시공사례 관리)
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CaseBackLink from "@/components/cases/CaseBackLink";
import CaseCard from "@/components/cases/CaseCard";
import CaseGallery from "@/components/cases/CaseGallery";
import { getCases } from "@/lib/cases";
import { formatCaseDate, placeName, serviceName } from "@/components/cases/format";
import ConsultCta from "@/components/common/ConsultCta";
import { SITE } from "@/lib/site";
import Eyebrow from "@/components/common/Eyebrow";

type Props = { params: Promise<{ id: string }> };

/** [← 시공사례 목록] 글자 스타일 */
const BACK_LINK_CLASS =
  "text-[14px] font-semibold tracking-[-0.3px] text-[#444] hover:text-point-strong lg:text-[16px]";

/** id 로 사례 1건 조회 (없으면 undefined) */
async function getCase(id: string) {
  return (await getCases()).find((c) => c.id === id);
}

export async function generateStaticParams() {
  return (await getCases()).map((c) => ({ id: c.id }));
}

/** SEO: "강남 카페 CCTV 8대 설치 | 유니텍CCTV" */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getCase(id);
  if (!item) return {};
  return {
    title: `${item.title} | ${SITE.name}`,
    // 검색 설명: 지역·장소·서비스 키워드를 앞에 두고 현장 요약 (예: "서울 강남구 매장 CCTV 설치 사례 — …")
    description: `${item.region} ${placeName(item.place)} ${serviceName(item.service)} 사례 — ${item.summary}`,
  };
}

export default function CaseDetailPage({ params }: Props) {
  return (
    <>
      {/* 상세 로딩 중엔 높이만 잡아 두어 하단 CTA 가 튀지 않게 */}
      <Suspense fallback={<div className="min-h-[80vh] w-full" />}>
        <CaseDetail params={params} />
      </Suspense>

      {/* ===== 하단 상담 CTA: 시공사례 상세 ===== */}
      <ConsultCta
        lead="이 현장처럼,"
        title="우리 공간도 맞춤 설계해 드립니다."
      />
    </>
  );
}

/** URL 의 id 로 사례를 찾아 상세 렌더 (없는 id → 404) */
async function CaseDetail({ params }: { params: Props["params"] }) {
  const { id } = await params;
  const cases = await getCases();
  const item = cases.find((c) => c.id === id);
  if (!item) notFound();

  const similar = cases.filter((c) => c.place === item.place && c.id !== item.id).slice(0, 3);

  const meta = [
    { label: "장소", value: placeName(item.place) },
    { label: "지역", value: item.region },
    { label: "설치 대수", value: `${item.cameraCount}대` },
    { label: "서비스", value: serviceName(item.service) },
    { label: "시공 시기", value: formatCaseDate(item.date) },
  ];

  return (
    <article className="w-full pb-[100px] lg:pb-[160px]">
      <div className="mx-auto max-w-[1112px] px-[16px]">
        {/* ===== 상단: 목록으로 / CASE STUDY 라벨 / 장소 칩 / 제목 ===== */}
        <div className="mb-[24px] mt-[16px] lg:mb-[40px] lg:mt-[32px]">
          {/* 목록에서 들어왔으면 뒤로가기처럼 보던 탭·스크롤 위치로 복귀 (CaseBackLink) */}
          <Suspense
            fallback={
              <Link href="/cases" className={BACK_LINK_CLASS}>
                ← 시공사례 목록
              </Link>
            }
          >
            <CaseBackLink className={BACK_LINK_CLASS} />
          </Suspense>
          <div className="mt-[20px] lg:mt-[28px]">
            <Eyebrow align="left" className="mb-[14px] lg:mb-[18px]">Case Study</Eyebrow>
            <Link
              href={`/cases/place/${item.place}`}
              className="inline-block rounded-[50px] bg-brand-light px-[12px] py-[4px] text-[13px] font-semibold tracking-[-0.3px] text-brand lg:text-[14px]"
            >
              {placeName(item.place)}
            </Link>
            <h1 className="mt-[10px] break-keep text-[26px] font-bold leading-[140%] tracking-[-1px] text-[#222] lg:mt-[14px] lg:text-[40px]">
              {item.title}
            </h1>
          </div>
        </div>

        {/* ===== 메타: 장소·지역·대수·서비스·날짜 (모바일 2열 / PC 5열) ===== */}
        <dl className="mb-[28px] grid grid-cols-2 gap-x-[16px] gap-y-[14px] rounded-[16px] bg-[#f6f7fa] p-[20px] sm:grid-cols-3 lg:mb-[40px] lg:grid-cols-5 lg:rounded-[20px] lg:px-[32px] lg:py-[24px]">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[13px] font-medium tracking-[-0.3px] text-[#888] lg:text-[14px]">{m.label}</dt>
              <dd className="mt-[2px] text-[15px] font-bold tracking-[-0.3px] text-[#222] lg:text-[17px]">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* ===== 사진 갤러리: 대표 사진 + 썸네일 (클릭 전환 / 모바일 스와이프) ===== */}
        <CaseGallery images={item.images} title={item.title} />

        {/* ===== 현장 설명 + 견적 유도 버튼 ===== */}
        <section className="mt-[32px] lg:mt-[48px]">
          <h2 className="text-[20px] font-bold tracking-[-0.5px] text-[#222] lg:text-[26px]">현장 설명</h2>
          <p className="mt-[12px] break-keep text-[15px] leading-[170%] tracking-[-0.3px] text-[#555] lg:mt-[16px] lg:text-[18px]">
            {item.summary}
          </p>
          <div className="mt-[28px] flex flex-col gap-[10px] rounded-[16px] border border-[#e5e8ee] p-[20px] lg:mt-[40px] lg:flex-row lg:items-center lg:justify-between lg:rounded-[20px] lg:px-[32px] lg:py-[28px]">
            <p className="break-keep text-[16px] font-bold tracking-[-0.4px] text-[#222] lg:text-[20px]">
              우리 공간도 {item.cameraCount}대면 충분할까요?
              <span className="mt-[4px] block text-[14px] font-medium text-[#666] lg:text-[16px]">
                공간과 평수만 고르면 필요한 대수와 예상 비용을 바로 알려 드립니다.
              </span>
            </p>
            <Link
              href="/calculator"
              className="mt-[6px] flex h-[52px] shrink-0 items-center justify-center rounded-[10px] bg-brand px-[24px] text-[16px] font-bold tracking-[-0.3px] text-white transition-colors hover:bg-brand-strong lg:mt-0 lg:h-[56px] lg:text-[17px]"
            >
              이 사례처럼 견적 받기 →
            </Link>
          </div>
        </section>

        {/* ===== 비슷한 공간 사례: 같은 장소 최대 3개 (없으면 숨김) ===== */}
        {similar.length > 0 && (
          <section className="mt-[72px] lg:mt-[120px]">
            <div className="mb-[24px] flex items-end justify-between lg:mb-[36px]">
              <h2 className="text-[20px] font-bold tracking-[-0.5px] text-[#222] lg:text-[28px]">
                비슷한 공간 사례
              </h2>
              <Link
                href={`/cases/place/${item.place}`}
                className="text-[13px] font-medium text-[#787878] hover:text-point-strong lg:text-[16px]"
              >
                {placeName(item.place)} 사례 더보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 sm:gap-x-[24px] lg:grid-cols-3 lg:gap-x-[32px]">
              {similar.map((c) => (
                <CaseCard key={c.id} item={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
