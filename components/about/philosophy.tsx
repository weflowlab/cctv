/**
 * 브랜드 철학 3가지 (Unite Technology / Responsibility / with You) 공용 데이터
 * - 회사소개(/about) PhilosophySection 과 홈 "왜 {SITE.name}인가" 섹션(components/main/WhyUs)에서 함께 사용.
 * - keyword: 카드 안 큰 영문 중 강조(틸) 부분 / highlight + titleRest: 한글 소제목
 * - image: 카드 배경 이미지 자리에 들어갈 사진 설명 (실제 사진 확보 시 기준)
 * - photo / photoAlt: 현재 카드 배경 사진 — 스톡 사진(CC0): public/images/stock/about-*.webp — 실제 사진 확보 시 교체
 * - desc: 회사소개 본문 (줄바꿈 포함 JSX) / summary: 홈 요약 카드용 한두 문장 (desc 에서 발췌)
 * - reverse: 회사소개 PC 텍스트 왼쪽·카드 오른쪽 / 모바일 column-reverse 로 카드가 위 (keeper 지그재그)
 */
import { SITE } from "@/lib/site";

export const PHILOSOPHY = [
  {
    keyword: "Technology",
    highlight: "기술",
    titleRest: "을 하나로",
    image: "장비가 하나로 연결된 시스템 이미지 (카메라·녹화기·네트워크)",
    photo: "/images/stock/about-tech-network-cable.webp",
    photoAlt: "랜 케이블 커넥터 클로즈업",
    desc: (
      <>
        카메라·녹화기·배선·네트워크까지,
        <br />
        현장에 꼭 맞는 장비를 하나의 시스템으로 설계합니다.
        <br />
        따로 노는 장비 없이, 끊김 없는 보안을 만듭니다.
      </>
    ),
    summary: "현장에 꼭 맞는 장비를 하나의 시스템으로 설계합니다. 따로 노는 장비 없이, 끊김 없는 보안을 만듭니다.",
    reverse: false,
  },
  {
    keyword: "Responsibility",
    highlight: "책임",
    titleRest: "을 하나로",
    image: "기사님이 현장에서 CCTV를 수리하는 사진",
    photo: "/images/stock/about-responsibility-repair.webp",
    photoAlt: "공구를 펼쳐 놓고 바닥에 누워 설비를 설치하는 기사",
    desc: (
      <>
        설치한 사람이 끝까지 책임집니다.
        <br />
        설치부터 수리·증설·이전까지,
        {/* 모바일에서만 줄바꿈 (AboutSections 의 MoBr 와 동일 마크업) */}{" "}
        <br className="lg:hidden" />
        연락할 곳은 하나면 충분합니다.
      </>
    ),
    summary: "설치한 사람이 끝까지 책임집니다. 설치부터 수리·증설·이전까지, 연락할 곳은 하나면 충분합니다.",
    reverse: true,
  },
  {
    keyword: "with You",
    highlight: "고객",
    titleRest: "과 하나로",
    image: "고객과 상담하는 모습",
    photo: "/images/stock/about-with-you-meeting.webp",
    photoAlt: "테이블에 둘러앉아 상담하며 메모하는 모습",
    desc: (
      <>
        {SITE.hours}, 필요할 때 언제든 연락되는 파트너.
        <br />
        설치가 끝난 뒤에도 고객의 곁에 함께 있겠습니다.
      </>
    ),
    summary: `${SITE.hours}, 필요할 때 언제든 연락되는 파트너. 설치가 끝난 뒤에도 고객의 곁에 함께 있겠습니다.`,
    reverse: false,
  },
];
