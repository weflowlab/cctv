/**
 * 신뢰 섹션 — 수상 내역 + 고객사 로고 그리드
 * - 상단: 한국브랜드 선호도 3년 연속 1위 수상 (메달 이미지 자리 + 원본 문구). PC 좌 메달 / 우 문구, 모바일 세로.
 * - 하단: "많은 기업이 {SITE.name}를 선택해 주셨습니다." + 고객사 로고 29개 그리드 (PC 5열 / 모바일 3열).
 * - 로고 이름은 기존 사이트 스크린샷 기준. 원본 로고 파일(순서대로, 이름 매칭은 미확인):
 *   2024/03/다운로드-11.jpg, 다운로드-4.jpg, 다운로드-17-e1711522795901.jpg, 456457-removebg-preview.png, 다운로드.jpg,
 *   56754687.jpg, 다운로드-14.jpg, 다운로드-8.jpg, 다운로드-15-e1711522876573.jpg, 34575467-removebg-preview.png,
 *   다운로드-7-e1711522820975.jpg, 568756478.jpg, 3426465.jpg, 534675467.jpg, 다운로드-6.jpg, 다운로드-9.jpg, 다운로드-5.jpg,
 *   다운로드-2.jpg, 다운로드-12-e1711522906779.jpg, 다운로드-10.jpg, 23423.jpg, 다운로드-16.jpg, 다운로드-3-e1711522972923.jpg,
 *   다운로드-19-e1711523079672.jpg, 다운로드-18.jpg, 다운로드-13-e1711522941678.jpg, 다운로드__1_-removebg-preview-e1711612169348.png,
 *   2025/07/KakaoTalk_20250723_121043223-removebg-preview-e1753255119368.png, 2024/05/noname01wwww-scaled.bmp
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

/** 고객사 로고 이름 (스크린샷 순서) */
const CLIENTS = [
  "서울대", "한국도로공사", "POSTECH", "서울특별시", "삼성화재", "LX", "강화군", "인천", "SK D&D", "서울교통공사",
  "아워홈", "부영그룹", "대우조선해양건설", "경정경륜", "아주네트웍스", "로젠택배", "경찰", "투썸플레이스", "심원", "F&F",
  "HL", "디에스종합건설", "골프존파크", "세림건설", "LS전선", "IBK기업은행", "백다방", "한성기업", "인천항시설관리센터",
];

export default function TrustSection() {
  return (
    // ===== 신뢰 섹션: 흰 배경 =====
    <section className="flex w-full justify-center bg-white px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 수상: 메달 이미지 + 문구 ===== */}
        <Reveal
          threshold={0.1}
          className="flex w-full flex-col items-center gap-[24px] rounded-[20px] bg-[#fff6f1] px-[24px] py-[40px] lg:flex-row lg:justify-center lg:gap-[64px] lg:py-[56px]"
        >
          <Placeholder
            label="한국브랜드 선호도 3년 연속 1위 수상 메달 (원본 2025/07/스크린샷_2025-07-21_165045-removebg-preview.png)"
            className="aspect-square w-[160px] shrink-0 rounded-full lg:w-[200px]"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-[24px] font-bold leading-[34px] tracking-[-0.5px] text-[#222] lg:text-[36px] lg:leading-[50px] lg:tracking-[-1px]">
              {SITE.name}는
              <br />
              한국브랜드 선호도
              <br />
              <strong className="text-brand">3년 연속 1위 수상</strong> 기업입니다.
            </h2>
            <p className="mt-[12px] text-[15px] leading-[24px] tracking-[-0.3px] text-[#666] lg:mt-[16px] lg:text-[18px] lg:leading-[28px]">
              3년 연속 한국브랜드 선호도 1위로 선정되었습니다.
              <br />
              {SITE.name}의 검증된 제품과 서비스를 확인해보세요.
            </p>
          </div>
        </Reveal>

        {/* ===== 고객사: 헤드라인 + 로고 그리드 ===== */}
        <h2 className="mt-[80px] text-center text-[26px] font-bold leading-[1.35] tracking-[-0.26px] text-[#222] lg:mt-[120px] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px]">
          많은 기업이
          <br />
          <strong className="text-brand">{SITE.name}</strong>를 선택해 주셨습니다.
        </h2>
        <Reveal
          threshold={0.05}
          className="mt-[32px] grid w-full grid-cols-3 gap-[8px] lg:mt-[56px] lg:grid-cols-5 lg:gap-[16px]"
        >
          {CLIENTS.map((name) => (
            <div
              key={name}
              className="flex h-[56px] items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white p-[6px] lg:h-[88px] lg:rounded-[12px] lg:p-[12px]"
            >
              <Placeholder label={`${name} 로고`} className="h-full w-full rounded-[4px] border-0" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
