/**
 * /about (회사소개) 페이지 섹션 모음 — 서버 컴포넌트
 * - keeper /story(components/story/StorySections.tsx) 의 틀(뱃지 · 큰 제목 · pre-line 본문)을 복사해 재구성.
 * - 내용 출처: 기존 홈페이지 kkcctv.co.kr 회사소개(인사말·조직도) / AS(강점 9가지) / 홈(수상·전국 지사)
 * - 구성: ① 회사 소개(인사말 전문) ② 강점 9가지(카드 그리드, Reveal 순차 등장)
 *         ③ 한국브랜드 선호도 3년 연속 1위 ④ 조직도 ⑤ 전국 지사 요약
 * - 회사명은 추후 변경 예정 → 화면 텍스트의 회사명은 모두 {SITE.name}
 * - 반응형: Tailwind 기본(모바일) + lg:(PC)
 */
import type { ReactNode } from "react";
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";
import { SITE } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* 공통 조각 (keeper story 와 동일 수치)                                  */
/* ------------------------------------------------------------------ */

/** 회색 라벨 뱃지 — "회사소개 ㅣ 인사말" */
function SectionBadge({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[8px] bg-[#f8f8f8] px-[24px] py-[14px] text-[14px] font-medium text-[#202020e0] lg:text-[24px]">
      <span className="text-[#20202066]">{label} ㅣ</span> {children}
    </div>
  );
}

/** 큰 제목 — strong 은 주황색, 모바일에서 span 은 block 줄바꿈 */
function Title({ as: Tag = "h2", children }: { as?: "h1" | "h2"; children: ReactNode }) {
  return (
    <Tag className="max-w-[320px] text-center text-[26px] font-bold leading-[40px] tracking-[-0.28px] text-[#202020] [&_span]:block [&_strong]:text-[#ff5c00] lg:mb-[16px] lg:max-w-none lg:text-[46px] lg:leading-[68px] lg:tracking-[-0.36px] lg:[&_span]:inline">
      {children}
    </Tag>
  );
}

/** 본문 문단 — white-space:pre-line 으로 원본 줄바꿈 유지 */
function Body({ children }: { children: ReactNode }) {
  return (
    <p className="whitespace-pre-line break-keep text-center text-[14px] leading-[24px] text-[#787878] lg:text-[22px] lg:leading-[38px]">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* ① 회사 소개 (인사말)                                                  */
/* ------------------------------------------------------------------ */

export function GreetingSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-[14px] px-[20px] pb-[100px] pt-[40px] lg:gap-[24px] lg:pb-[160px] lg:pt-[140px]">
      {/* ===== 인사말: 뱃지 + 대표 문구 + 인사말 전문(원본 그대로) / 정적 ===== */}
      <SectionBadge label="회사소개">인사말</SectionBadge>
      <Title as="h1">
        <span>대한민국 CCTV 1등 브랜드,</span> 보안 솔루션 전문 기업 <strong>{SITE.name}</strong>
      </Title>
      <Placeholder
        label="회사 대표 이미지 (원본 없음 — 사무실/시공 현장 사진 권장)"
        className="my-[10px] aspect-[1081/450] w-full max-w-[1082px] rounded-[4px] lg:my-[24px] lg:rounded-[20px]"
      />
      <Body>
        {`안녕하세요,
${SITE.name} 홈페이지를 방문해 주셔서 감사드립니다.

고객이 신뢰하고 믿을 수 있는
CCTV 전문 업체 ${SITE.name}입니다.

이제 보안은 선택이 아니라 필수입니다.
지난 시간 동안 소비자에게 인정받는 CCTV 전문 회사로 성장해 왔습니다.
소중한 우리 가족과 재산을 지키려는 고객님들께 시간과 비용을 낭비하지 않게
최선을 다하여 질 높은 CCTV를 설치해 드리고 있습니다.

전국 어디든 빠른 설치와 AS가 가능한 인프라는 물론이고
전문가의 가장 효율적인 설치 컨설팅부터 꼼꼼한 유지 보수까지 모든 고민을 덜어 드립니다.

저희 ${SITE.name}는 신뢰받는 최적의 기술 및 케어 서비스로
고객의 만족을 위하여 서비스 리더가 될 것을 약속드립니다.

감사합니다.`}
      </Body>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ② 강점 9가지                                                          */
/* ------------------------------------------------------------------ */

/** 강점 카드 데이터 — 원본 AS 페이지 "1~9" 순서/문구 그대로, icon 은 원본 아이콘 파일 경로 */
const STRENGTHS = [
  { title: "당사 설치 시\n모든 부품 무상 AS 1년", icon: "2024/03/010.png" },
  { title: "전국 인프라 구성으로\n어디든 설치가 가능", icon: "2024/03/011.png" },
  { title: "스마트폰 24시간\n원격 감시 무료 제공", icon: "2024/03/012.png" },
  { title: "1:1 유지 보수\n담당자 배정", icon: "2024/03/015.png" },
  { title: "합리적인 견적의\n최저가 솔루션", icon: "2024/03/014.png" },
  { title: "정기적인 점검", icon: "2024/03/018.png" },
  { title: "의뢰 후 24시간 이내\n방문 진단 및 수리", icon: "2024/03/017.png" },
  { title: "직영 공사팀의\n치밀한 공사와 맞춤 컨설팅", icon: "2024/03/013.png" },
  { title: "증설 및 이전\n전문 서비스", icon: "2024/03/019.png" },
];

export function StrengthsSection() {
  return (
    <section className="flex w-full flex-col items-center bg-[#fffaf7] px-[20px] py-[100px] lg:py-[160px]">
      <div className="flex w-full max-w-[1082px] flex-col items-center gap-[14px] lg:gap-[24px]">
        {/* ===== 섹션 타이틀 ===== */}
        <SectionBadge label="왜 선택할까요">{SITE.name}의 강점</SectionBadge>
        <Title>
          <span>믿고 맡길 수 있는</span> <strong>9가지 약속</strong>
        </Title>

        {/* ===== 강점 카드 그리드: 모바일 2열 / PC 3열
             인터랙션: 각 카드를 Reveal 로 감싸 화면 진입 시 slide-in-up,
             같은 행(3개) 안에서 100ms 씩 지연을 줘 순차적으로 등장 ===== */}
        <ul className="mt-[16px] grid w-full grid-cols-2 gap-[10px] lg:mt-[24px] lg:grid-cols-3 lg:gap-[20px]">
          {STRENGTHS.map((item, i) => (
            <Reveal as="li" key={item.icon} delay={(i % 3) * 100} className="h-full">
              <div className="flex h-full flex-col items-center gap-[12px] rounded-[12px] bg-white px-[12px] py-[24px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] lg:gap-[20px] lg:rounded-[20px] lg:px-[24px] lg:py-[40px]">
                <span className="text-[13px] font-bold text-[#ff5c00] lg:text-[18px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Placeholder
                  label={`강점 아이콘 (${item.icon})`}
                  kind="icon"
                  className="h-[48px] w-[48px] rounded-full lg:h-[80px] lg:w-[80px]"
                />
                <p className="whitespace-pre-line break-keep text-[14px] font-bold leading-[22px] text-[#202020] lg:text-[22px] lg:leading-[34px]">
                  {item.title}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ③ 수상: 한국브랜드 선호도 3년 연속 1위                                  */
/* ------------------------------------------------------------------ */

export function AwardSection() {
  return (
    <section className="flex w-full flex-col items-center gap-[14px] px-[20px] py-[100px] lg:gap-[24px] lg:py-[160px]">
      {/* ===== 수상 메달 이미지 + 문구 / 정적 ===== */}
      <Reveal animation="fade-in">
        <Placeholder
          label="한국브랜드 선호도 수상 메달 (2025/07/스크린샷_2025-07-21_165045-removebg-preview.png)"
          className="h-[160px] w-[160px] rounded-full lg:h-[240px] lg:w-[240px]"
        />
      </Reveal>
      <SectionBadge label="수상">한국브랜드 선호도</SectionBadge>
      <Title>
        <strong>3년 연속 1위</strong> 수상
      </Title>
      <Body>
        {`${SITE.name}는 한국브랜드 선호도 3년 연속 1위 수상 기업입니다.
${SITE.name}의 검증된 제품과 서비스를 확인해보세요.`}
      </Body>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ④ 조직도                                                              */
/* ------------------------------------------------------------------ */

export function OrgChartSection() {
  return (
    <section className="flex w-full flex-col items-center gap-[14px] bg-[#f8f8f8] px-[20px] py-[100px] lg:gap-[24px] lg:py-[160px]">
      {/* ===== 조직도 이미지 / 정적 ===== */}
      <SectionBadge label="회사소개">조직도</SectionBadge>
      <Title>조직도</Title>
      <Placeholder
        label="조직도 (2025/07/제목을-입력해주세요_-004.png)"
        className="aspect-[4/3] w-full max-w-[1082px] rounded-[4px] bg-white lg:aspect-[16/9] lg:rounded-[20px]"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ⑤ 전국 지사 요약                                                      */
/* ------------------------------------------------------------------ */

/** 본사 + 6개 지사 — 원본 홈 "전국 서비스 구축 현황" 주소 그대로 (첫 주소가 대표 주소) */
const BRANCHES = [
  { name: "본사", addresses: [SITE.address] },
  {
    name: "중부지사",
    addresses: [
      "경기도 하남시 하남대로777번길 14",
      "경기도 구리시 원수택로12번길 33, 1층",
      "인천광역시 부평구 부흥로360번길 7",
      "인천광역시 남동구 논현동 563-3",
      "충청북도 진천군 이월면 진광로 808",
      "경기도 수원시 권선구 세권로304번길 1-22",
      "충청남도 천안시 서북구 불당11로 20",
      "경기도 파주시 금촌동 962-25",
      "경기도 성남시 분당구 매화로37번길 16",
    ],
  },
  {
    name: "강원지사",
    addresses: [
      "강원특별자치도 춘천시 백령로 190",
      "강원특별자치도 속초시 중앙로 56",
      "강원특별자치도 원주시 무실로 136",
    ],
  },
  {
    name: "호남지사",
    addresses: [
      "광주광역시 북구 신임로32번길 35 모아 더 스카이",
      "전라남도 장흥군 장흥읍 동교2길 50",
      "전북특별자치도 전주시 덕진구 팔달로 341",
      "전라남도 광양시 구마1길 3-9",
    ],
  },
  {
    name: "경북지사",
    addresses: [
      "경상북도 문경시 점촌로 20",
      "대구광역시 중구 동덕로 115 진석타워",
      "경상북도 울진군 울진읍 월변1길 9",
    ],
  },
  {
    name: "경남지사",
    addresses: [
      "부산광역시 동래구 아시아드대로164번가길 18",
      "경상남도 고성군 고성읍 동외리 649-32",
      "경상남도 진주시 돗골로 149",
    ],
  },
  {
    name: "제주지사",
    addresses: ["제주특별자치도 제주시 아라이동 3008-1", "제주특별자치도 서귀포시 서문로 2-1"],
  },
];

export function BranchesSection() {
  return (
    <section className="flex w-full flex-col items-center px-[20px] py-[100px] lg:py-[160px]">
      <div className="flex w-full max-w-[1082px] flex-col items-center gap-[14px] lg:gap-[24px]">
        {/* ===== 섹션 타이틀 + 통합 콜센터 번호(SITE.phone) ===== */}
        <SectionBadge label="전국 서비스 구축 현황">본사 · 6개 지사</SectionBadge>
        <Title>
          <span>전국 어디든</span> <strong>빠른 설치와 AS</strong>
        </Title>
        <Body>
          통합 콜센터 운영{" "}
          <a href={SITE.phoneHref} className="font-bold text-[#ff5c00]">
            {SITE.phone}
          </a>
        </Body>

        {/* ===== 지사 카드: 대표 주소(굵게) + 나머지 거점 주소 목록 / 모바일 1열, PC 2열 ===== */}
        <ul className="mt-[16px] grid w-full grid-cols-1 gap-[10px] text-left lg:mt-[24px] lg:grid-cols-2 lg:gap-[20px]">
          {BRANCHES.map((b) => (
            <li
              key={b.name}
              className={`rounded-[12px] border border-[#eee] p-[20px] lg:rounded-[20px] lg:p-[32px] ${
                b.name === "본사" ? "lg:col-span-2 border-[#ff5c00] bg-[#fffaf7]" : ""
              }`}
            >
              <h3 className="text-[16px] font-bold text-[#ff5c00] lg:text-[22px]">{b.name}</h3>
              <p className="mt-[6px] break-keep text-[14px] font-bold leading-[22px] text-[#202020] lg:mt-[10px] lg:text-[18px] lg:leading-[28px]">
                {b.addresses[0]}
              </p>
              {b.addresses.length > 1 && (
                <ul className="mt-[8px] flex flex-col gap-[2px] text-[12px] leading-[20px] text-[#878d99] lg:mt-[12px] lg:text-[15px] lg:leading-[24px]">
                  {b.addresses.slice(1).map((addr) => (
                    <li key={addr} className="break-keep">
                      · {addr}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
