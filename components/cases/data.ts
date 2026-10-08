/**
 * 시공사례 데이터 (기존 사이트 https://kkcctv.co.kr 시공사례 페이지 → kk/cases.txt)
 * - 원본은 썸네일 이미지 + 네이버 블로그 글 링크만 있고 제목/장소 분류가 없다.
 *   → 제목: 링크된 네이버 블로그 글의 og:title 을 가져와 옮김 (2026-10 기준)
 *   → 장소(place): 제목으로 추정. 추정 불가한 것은 null (TODO) — "전체" 탭에서만 보인다.
 * - 이미지는 Placeholder 로 대체, label 에 원본 경로를 남긴다.
 *   (원본 URL = https://kkcctv.co.kr/wp-content/uploads/<image>)
 * - 상세 페이지 없음: 카드 클릭 시 네이버 블로그 글을 새 탭으로 연다.
 */
import type { PlaceSlug } from "@/lib/site";

export type CaseItem = {
  /** 네이버 블로그 글 번호 (+ 중복 링크 구분용 접미사) */
  id: string;
  title: string;
  /** 장소 분류 — 추정 불가 시 null */
  place: PlaceSlug | null;
  /** 원본 썸네일 경로 (wp-content/uploads 기준) */
  image: string;
  /** 네이버 블로그 글 URL (새 탭) */
  href: string;
};

/** 상단 "전체 시공사례 확인" 버튼 3개 (원본 순서 그대로) */
export const CASE_BLOG_LINKS = [
  { label: "전체 시공사례 확인 1", href: "https://blog.naver.com/PostList.naver?blogId=guy82guy&from=postList&categoryNo=6&parentCategoryNo=6" },
  { label: "전체 시공사례 확인 2", href: "https://blog.naver.com/kkcctv77" },
  { label: "전체 시공사례 확인 3", href: "https://blog.naver.com/PostList.naver?blogId=yonghyup81&from=postList&categoryNo=5&parentCategoryNo=5" },
];

/** 시공사례 카드 9개 (원본 노출 순서 그대로) */
export const CASES: CaseItem[] = [
  {
    id: "223909617928",
    title: "홍천CCTV시공 농막주택 씨씨티비 설치 곳곳의 현장을 실시간으로 감시하는 든든한 보안카메라로만 제공해 드립니다",
    place: "home", // 추정: 농막주택 → 가정
    image: "2025/07/16-e1753091097791.jpg",
    href: "https://blog.naver.com/guy82guy/223909617928",
  },
  {
    id: "223916349192",
    title: "영덕CCTV 설치 선박 보안카메라를 통해 각 구역의 보안을 높여드립니다",
    place: null, // TODO: 선박 — PLACES 5개 중 해당 분류 없음 (사장님 확인 필요)
    image: "2025/07/4-e1753090863799.jpg",
    href: "https://blog.naver.com/guy82guy/223916349192",
  },
  {
    id: "223895925862",
    title: "농막 CCTV 비닐하우스 방범카메라 설치를 통해 각 구역에 사각지대가 생기지 않도록 꼼꼼하게 시공해 드려요",
    place: "factory", // 추정: 비닐하우스(농업시설) → 공장·창고(축사 포함 분류). 사장님 확인 필요
    image: "2025/07/20250715_074324-e1753091547389.jpg",
    href: "https://blog.naver.com/guy82guy/223895925862",
  },
  {
    id: "223916355850",
    title: "안양 CCTV 쓰레기무단투기 방지를 위한 좋은 품질의 보안 카메라로 설치해 드립니다",
    place: null, // TODO: 쓰레기 무단투기 방지 — 설치 장소(주택가/관공서 등) 불명확
    image: "2025/07/20250715_075824-e1753091212211.jpg",
    href: "https://blog.naver.com/guy82guy/223916355850",
  },
  {
    id: "223909645207",
    title: "군산 CCTV 설치 병원 보안카메라 설치를 통해 다양하게 일어나는 사고들을 미리 예방해요",
    place: "store", // 병원 → 매장 (PLACES.store.includes 에 병원 포함)
    image: "2025/07/7-1-e1753090681532.jpg",
    href: "https://blog.naver.com/guy82guy/223909645207",
  },
  {
    id: "223889678117",
    title: "옥천 CCTV설치 공장 보안카메라 사각지대 없는 공간으로 만들어 드립니다",
    place: "factory",
    image: "2025/07/SE-8f43f01b-ec61-4569-af59-5ac127ef5584-e1753091475356.jpg",
    href: "https://blog.naver.com/guy82guy/223889678117",
  },
  {
    id: "223912226591",
    title: "신안 CCTV설치 선박 방범카메라 설치 강한 내구성과 적외선 기능으로 모든 구역의 보안을 강화시켜드립니다",
    place: null, // TODO: 선박 — PLACES 5개 중 해당 분류 없음
    image: "2025/07/20250715_075643-e1753091314940.jpg",
    href: "https://blog.naver.com/guy82guy/223912226591",
  },
  {
    // TODO: 원본에서 첫 번째 카드와 같은 글(223909617928)로 링크됨 — 이미지만 다름. 원래 의도한 글 확인 필요
    id: "223909617928-2",
    title: "홍천CCTV시공 농막주택 씨씨티비 설치 곳곳의 현장을 실시간으로 감시하는 든든한 보안카메라로만 제공해 드립니다",
    place: "home",
    image: "2025/07/20250715_075428-e1753090487261.jpg",
    href: "https://blog.naver.com/guy82guy/223909617928",
  },
  {
    id: "223881858053",
    title: "대구 CCTV설치 매장 씨씨티비 시공으로 모든 분들의 보안을 지켜주는 든든한 지원군이 되어드립니다",
    place: "store",
    image: "2025/07/20250721_160359-e1753091403948.jpg",
    href: "https://blog.naver.com/guy82guy/223881858053",
  },
];
