/**
 * 시공사례 목록 공통 레이아웃 — /cases, /cases/place/[slug] 에만 적용 (route group "(list)")
 * - 상세 /cases/[id] 는 이 그룹 밖(app/cases/[id])이라 칩 바가 나오지 않는다.
 * - 구성: 타이틀 띠(CasesHero: 제목·설명·요약 숫자) → 장소 칩 바(sticky, Link 이동) → {목록 콘텐츠: page.tsx} → 상담 신청 CTA 배너
 * - URL 값(params)을 읽지 않으므로 칩 이동 시 이 껍데기는 즉시 그대로 보이고,
 *   목록 콘텐츠만 교체된다 (Instant Navigation). 현재 칩 강조는 CasePlaceChips 가 URL 에서 직접 판단.
 * - 구 "장소별 CCTV"(/places) 메뉴를 이곳으로 합침 — /places/* 는 영구 리다이렉트.
 */
import CasePlaceChips from "@/components/cases/CasePlaceChips";
import CasesHero from "@/components/cases/CasesHero";
import CasesListMemo from "@/components/cases/CasesListMemo";
import ConsultCta from "@/components/common/ConsultCta";
import { countByPlace, getCases } from "@/lib/cases";

export default async function CasesListLayout({ children }: LayoutProps<"/cases">) {
  // 칩 건수 — 캐시된 사례 목록에서 계산 (params 를 읽지 않으므로 껍데기는 그대로 정적)
  const cases = await getCases();
  return (
    <>
      {/* ===== 타이틀 띠: 라벨 + 제목("{장소} CCTV 시공사례", SEO) + 설명 + 요약 숫자 3개 ===== */}
      <CasesHero />

      {/* ===== 장소 칩 바: 전체 / 주택·빌라 / 상가·매장 / 사무실·빌딩 / 공장·축사 / 관공서·시설 / 건설·산업현장 (페이지 이동, scroll={false}) ===== */}
      <CasePlaceChips total={cases.length} counts={countByPlace(cases)} />

      {/* ===== 목록 콘텐츠 (page.tsx): 안내 문구 또는 장소 소개 + 카드 그리드 ===== */}
      <section className="w-full pb-[120px] pt-[28px] lg:pb-[160px] lg:pt-[40px]">
        <div className="mx-auto max-w-[1112px] px-[16px]">
          {/* 상세로 들어갈 때 지금 목록 주소 기록 → 상세의 [← 시공사례 목록] 이 뒤로가기처럼 동작 */}
          <CasesListMemo>{children}</CasesListMemo>
        </div>
      </section>

      {/* ===== 하단 상담 CTA: 시공사례 목록 ===== */}
      {/* 모바일에서만 줄바꿈 */}
      <ConsultCta
        lead={
          <>
            우리 공간도<br className="lg:hidden" /> 이렇게 바뀔 수 있습니다.
          </>
        }
        title={
          <>
            비슷한 현장 사례로<br className="lg:hidden" /> 안내해 드립니다.
          </>
        }
      />
    </>
  );
}
