/**
 * 블로그 데이터 (원본 API: api-support.keeperplatform.com/v1/post 응답을 정적으로 옮김)
 * - 목록(/blog), 상세(/blog/[slug]), 추천 아티클(이전/다음 글) 에서 공통으로 사용한다.
 * - posts 는 원본과 동일하게 최신순(작성일 내림차순) 정렬.
 * - 썸네일 이미지는 Placeholder 로 대체하므로 URL 은 보관하지 않는다.
 */

export type BlogCategory = { id: number; name: string };

export type BlogPost = {
  /** 원본 게시글 id */
  id: number;
  /** 상세 경로 /blog/{slug} (원본 customUrl) */
  slug: string;
  title: string;
  /** 목록 카드 요약 (원본 subTitle) */
  summary: string;
  categoryId: number;
  /** 작성일 (KST, YYYY.MM.DD — 원본 상세 헤더 표기) */
  date: string;
};

/** 카테고리 탭 순서 (원본 /post/category 응답 순서 그대로, "전체"(id 0)는 탭 컴포넌트에서 앞에 붙임) */
export const BLOG_CATEGORIES: BlogCategory[] = [{"id": 1, "name": "매장관리"}, {"id": 2, "name": "직원관리"}, {"id": 6, "name": "창업"}, {"id": 5, "name": "고객사례"}, {"id": 4, "name": "서비스"}, {"id": 3, "name": "팀스토리"}];

/** 원본 목록 API 의 페이지 크기 (limit: 20) — 무한 스크롤 1회당 추가 개수 */
export const BLOG_PAGE_SIZE = 20;

export const BLOG_POSTS: BlogPost[] = [
  {"id": 954, "slug": "cafe-employee-hiring-checklist", "title": "식당·카페 알바 채용, 보건증부터 근로계약까지 필수 체크리스트 3가지", "summary": "식당·카페 사장님을 위한 알바 보건증, 원산지 표시, 근로계약서 필수 체크리스트. 복잡한 직원 관리를 키퍼로 해결하고 법적 리스크에 체계적으로 대비하세요.", "categoryId": 2, "date": "2026.09.28"},
  {"id": 953, "slug": "store-accident-prevention-cctv", "title": "매장에서 고객이 넘어졌다면? 낙상 사고 배상 책임과 CCTV 증거 확보 가이드", "summary": "매장에서 고객 안전 사고 발생 시 사업주의 법적 책임은? CCTV 증거 확보와 영업배상책임보험으로 배상 리스크 줄이는 실무 가이드, 한화비전 키퍼(Keeper)가 알려드려요.", "categoryId": 1, "date": "2026.09.16"},
  {"id": 952, "slug": "keeper-fireworks-couple-owner-holiday", "title": "주방의 불을 끄고, 진짜 불꽃을 마주한 날 🎇 신혼 3년 차 부부 사장님의 특별한 휴일", "summary": "결혼 3년 차, 직화닭발 브랜드를 만들어 주 6일을 불 앞에서 보냈습니다. 아내에게 늘 미안했던 사장님이 처음으로 주방 불을 끈 날 이야기입니다.", "categoryId": 5, "date": "2026.09.16"},
  {"id": 951, "slug": "keeper-fireworks-mother-daughter-owner", "title": "\"엄마, 우리도 불꽃놀이 보러 가자\" 🎆 365일 불 밝히던 모녀 사장님의 첫 외출", "summary": "스물일곱에 타지에서 혼자 장사를 시작했다가 엄마 곁으로 돌아왔습니다. 낮에는 제 국밥집, 밤에는 엄마 호프집. 장사 시작하고 처음으로 두 가게 문에 팻말을 건 날 이야기입니다.", "categoryId": 5, "date": "2026.09.14"},
  {"id": 950, "slug": "delivery-fee-fixed-cost-reduction", "title": "배달 수수료 9.8% 시대, 지금 당장 줄일 수 있는 매장 고정비는 따로 있다?", "summary": "배달 수수료 9.8% 시대, 팔수록 손해라면? 통제 불가능한 수수료 대신 당장 줄일 수 있는 매장 고정비 절감법을 공개합니다. 월 렌탈료를 0원으로 만드는 자산화 전략과 억울한 클레임을 방어하는 한화비전 키퍼의 3년 무상 보증 혜택을 지금 확인하세요.", "categoryId": 1, "date": "2026.09.07"},
  {"id": 917, "slug": "unmanned-laundromat-startup-cost-security", "title": "무인 빨래방 창업 필수 가이드 – 도난·취식·야간 사고 없애는 무인 보안 시스템 구축법", "summary": "무인 빨래방 창업, 렌탈료 족쇄에서 벗어나세요! 소액 절도 53% 증가 시대에 3년 무상 보증 한화비전 키퍼로 범죄 예방과 고정비 절감을 동시에 잡는 스마트 경영 전략을 공개합니다. 3040 직장인부터 5060 은퇴자까지, 밤잠 설치지 않고 수익을 지키는 24시간 원격 보안 가이드를 확인하세요.", "categoryId": 1, "date": "2026.08.19"},
  {"id": 884, "slug": "gym-sportsclub-staff-management-guide", "title": "헬스 트레이너 무단결근·무인 헬스장 사고, CCTV와 직원 관리 앱으로 동시에 해결하는 법", "summary": "한화비전 키퍼는 출퇴근 기록과 CCTV 영상을 앱 하나에서 관리해요. 트레이너가 위치 기반으로 출퇴근 체크를 하면, 관장님은 앱에서 실시간으로 누가 출근했는지 바로 확인할 수 있습니다.", "categoryId": 2, "date": "2026.08.11"},
  {"id": 851, "slug": "beauty-shop-staff-management-guide", "title": "헤어샵·네일샵 직원 관리, 프리랜서 vs 근로자 구분부터 출퇴근 자동화까지 완전 정복", "summary": "미용실 프리랜서 퇴직금 분쟁, 남의 일이 아닙니다. 역대급 폐업 위기 속에서 원장님을 지켜주는 '가짜 프리랜서' 구별법부터 직원 무단결근 막는 출퇴근 시스템까지! 한화비전 키퍼로 노무 리스크는 줄이고 매장 수익은 높이는 비결을 확인하세요.", "categoryId": 2, "date": "2026.08.05"},
  {"id": 818, "slug": "cafe-management-automation-strategy", "title": "카페 창업 성공하는 사장님들의 3가지 공통점 – 차별화·시스템화·원격 모니터링", "summary": "카페 창업 1년 내 폐업률 10%의 현실, 생존 비결은? 상위 1% 사장님들만 아는 차별화·시스템화·원격 모니터링 전략을 공개합니다. 한화비전 키퍼와 함께 카운터의 감옥에서 벗어나 진짜 '경영자'로 거듭나는 법을 지금 바로 확인하세요.", "categoryId": 6, "date": "2026.07.28"},
  {"id": 786, "slug": "cafe-fixed-cost-reduction", "title": "저가 커피 전쟁 속 개인 카페가 살아남는 법 – 고정비 3가지 절감 전략", "summary": "하루 평균 34곳의 카페가 문을 닫는 현실, 저가 커피 공습 속에서 내 카페를 지키는 비결은? 가격 인하 대신 '보이지 않는 고정비'를 잡아야 합니다. 월 렌탈료 부담을 없애고 순이익을 높이는 3가지 실전 전략과 한화비전 키퍼 활용법을 확인하세요.", "categoryId": 6, "date": "2026.07.23"},
  {"id": 752, "slug": "cctv-installation-delivery-accident-evidence-keeper", "title": "억울한 배달 사고 증거 확보부터 확실한 해결까지, 사장님 손해 막아주는 CCTV", "summary": "\"음식이 안 왔어요\" 한마디에 억울하게 당하셨나요? 배달 사고 증거 확보부터 확실한 해결까지, 사장님의 손해를 막아주는 한화비전 키퍼 CCTV. 렌탈 대신 소유하는 합리적인 선택으로 월 고정비 0원, 3분 만에 분쟁 종결하는 비결을 확인하세요.", "categoryId": 1, "date": "2026.06.22"},
  {"id": 719, "slug": "part-time-worker-attendance-management", "title": "우리 알바생은 왜 항상 5분 늦을까? 출퇴근 관리 이렇게 해보세요.", "summary": "알바생이 매일 5분씩 늦는 이유, 혹시 모르고 넘기진 않으셨나요? 수기 장부·무료 앱의 한계와 GPS 기반 출퇴근 관리로 대리 출근·허위 기록을 원천 차단하는 방법을 확인하세요.", "categoryId": 2, "date": "2026.06.10"},
  {"id": 686, "slug": "teen-worker-hiring-3-checklist", "title": "청소년 알바 채용 전 반드시 점검해야 하는 3가지", "summary": "청소년 알바 채용 전 필수 체크리스트 3가지! 채용 가능 연령, 금지 업종, 필수 서류, 근로시간 제한, 급여 계산까지 사장님이 꼭 알아야 할 법적 요건을 실무 팁과 함께 정리했습니다. 한화비전 Keeper로 간편하게 관리하세요.", "categoryId": 2, "date": "2026.05.28"},
  {"id": 653, "slug": "why-buy-cctv-not-rental", "title": "정수기는 렌탈해도, CCTV는 렌탈하지 마세요: cctv 구매 설치가 필요한 이유", "summary": "CCTV 렌탈 vs 구매 총 비교! 장기 사용 시 구매가 저렴. 케어 서비스 없는 렌탈은 손해? 매장 CCTV 설치 비용, 무이자 할부, 투명한 가격 비교로 현명한 선택하세요", "categoryId": 1, "date": "2026.05.21"},
  {"id": 620, "slug": "fake-freelance-contract-crackdown-2026", "title": "알바생 사업소득세 계약하셨나요? ‘가짜 3.3% 계약’으로 과태료 부과 될 수 있어요!", "summary": "가짜 3.3 계약 단속 본격화! 알바생 프리랜서 계약 시 최대 3년 징역·3천만 원 벌금 처벌 가능. 사업소득세 vs 근로소득세 구분 기준과 안전한 근로계약 방법 알아보기", "categoryId": 2, "date": "2026.05.14"},
  {"id": 587, "slug": "barrier-free-kiosk-mandatory-guide", "title": "매장에서 키오스크 쓰고 계신 사장님 주목! ‘배리어프리 키오스크’ 설치가 의무화되었어요", "summary": "배리어프리 키오스크 의무화 완벽 가이드! 우리 매장 적용 대상인지 확인하고, 최대 500만 원 정부 지원금 받는 방법부터 실전 대응 전략까지 모든 정보를 한눈에 확인하세요.", "categoryId": 1, "date": "2026.05.06"},
  {"id": 554, "slug": "slow-cctv-app-solution-keeper", "title": "긴급 상황 대비! 버벅이는 스마트폰 CCTV 앱, 원인부터 앱 추천까지 총 정리", "summary": "CCTV 앱이 느리고 버벅이는 이유와 안전한 어플 알아보세요. 한화비전 키퍼는 카메라부터 앱까지 직접 개발한 통합 솔루션으로 버튼 클릭 즉시 영상 확인이 가능합니다. 스마트폰 CCTV 최적화의 모든 것!", "categoryId": 1, "date": "2026.04.27"},
  {"id": 521, "slug": "small-business-support-websites-top4", "title": "각종 소상공인 지원 정책 정보, 더이상 놓치지 마세요: 자영업자라면 꼭 알아야 할 사이트 ", "summary": "소상공인 지원금 놓치지 마세요! 기업마당, 소상공인24, 판판대로, 소진공까지 자영업자라면 꼭 알아야 할 필수 지원 정보 사이트 4곳의 특징과 활용법을 정리했습니다. 지역·업종 맞춤 검색부터 원스톱 신청까지 한 번에 해결하세요.", "categoryId": 1, "date": "2026.04.20"},
  {"id": 488, "slug": "overtime-pay-calculation-guide-2026", "title": "휴일 야간에 연장 근무는 시급의 2.5배? 시간외 수당 중복 계산 방법 A to Z", "summary": "2026년 최저시급 10,320원 기준, 연장·야간·휴일 수당 정확한 계산법을 알아보세요. 휴일 야간 근무 시 2.5배 지급? 중복 수당 계산 방법부터 법적 리스크까지, 매장 운영 사장님이 꼭 알아야 할 시간외 수당 완벽 가이드입니다.", "categoryId": 2, "date": "2026.04.13"},
  {"id": 455, "slug": "employee-schedule-management-app-recommendation", "title": " 알바 근무 스케줄 관리 어려우셨죠? 쉽고 정확한 근태관리 어플 추천!", "summary": "알바 근무 스케줄 관리, 아직도 엑셀과 카톡으로 하시나요? 근태관리 어플 키퍼로 근무표 자동 생성, 실시간 푸시 알림, 통합 스케줄 조회까지 한 번에 해결하세요. 62.8%의 사장님이 겪는 근태 관리 어려움, 이제 스마트하게 끝내세요!", "categoryId": 2, "date": "2026.04.10"},
  {"id": 422, "slug": "2026-small-business-policy-fund-loan-guide-keeper", "title": "우리 매장 고정비 아끼는 꿀팁! 소상공인 정책자금 완벽 가이드 2026", "summary": "2026년 3.36조 규모 소상공인 정책자금 완벽 가이드! 일반자금 7천만 원, 시설자금 최대 2억 원 한도 확인법부터 CCTV 렌탈 대신 저금리 대출로 '키퍼' 구매해 고정비 줄이는 꿀팁까지, 사장님을 위한 맞춤형 금융 전략을 지금 확인하세요", "categoryId": 6, "date": "2026.03.26"},
  {"id": 389, "slug": "2026-small-business-policy-fund-loan-guide-apply", "title": "아직 신청 안 하셨나요? 2026 소상공인 경영안정 바우처 신청 가이드", "summary": "2026년 3.36조 규모 소상공인 정책자금 완벽 가이드! 일반자금 7천만 원, 시설자금 최대 2억 원 한도 확인법부터 CCTV 렌탈 대신 저금리 대출로 '키퍼' 구매해 고정비 줄이는 꿀팁까지, 사장님을 위한 맞춤형 금융 전략을 지금 확인하세요", "categoryId": 6, "date": "2026.03.24"},
  {"id": 356, "slug": "cctv-management-tool-practical-guide", "title": "CCTV, 설마 아직 방범용으로만 사용 중?! 매장 CCTV 200% 활용 실전 가이드", "summary": "매장 CCTV, 방범용으로만 쓰시나요? 고객 동선 분석부터 인건비 절감까지, CCTV를 200% 활용해 매출 올리고 운영 효율 높이는 실전 가이드를 확인하세요.", "categoryId": 1, "date": "2026.03.16"},
  {"id": 324, "slug": "spring-air-quality-management-guide", "title": "3월은 황사와 미세먼지의 달! 우리 매장 공기질 쾌적하게 관리하는 방법", "summary": "3월은 미세먼지가 가장 심한 달! 고가 장비 없이도 하루 30분 투자로 매장 공기질을 쾌적하게 관리하는 방법을 알려드립니다. 환기·청소·필터 관리 3단계 실전 루틴으로 고객 만족도를 높이세요.", "categoryId": 1, "date": "2026.03.09"},
  {"id": 323, "slug": "mandatory-fire-insurance-for-business-owners", "title": "우리 가게도 화재보험 의무일까? 가입 대상부터 보장 범위까지 총정리", "summary": "다중이용업소 화재보험 의무 가입 대상부터 보장 범위, 과태료까지 완벽 정리. 음식점·노래연습장·고시원 등 업종별 가입 기준과 보험료, 가입 절차를 한화비전 Keeper가 알려드립니다. 화재 예방부터 사고 대비까지 똑똑하게 준비하세요.", "categoryId": 1, "date": "2026.03.09"},
  {"id": 290, "slug": "cctv-rental-renewal-vs-purchase", "title": "CCTV 렌탈 약정 끝? 재계약 전에 보면 렌탈비 100만원 아낄 수 있어요", "summary": "렌탈 CCTV 재계약 전 필독! 구매 시 100만원 절약, 400만 화소 고화질, 3년 무상 A/S까지. 한화비전 Keeper로 내 자산 CCTV 만들기.", "categoryId": 1, "date": "2026.02.23"},
  {"id": 257, "slug": "small-business-owner-unemployment-insurance-guide", "title": "자영업자 고용보험 완벽 가이드: 정부 지원 받아서 보험료 내고, 실업급여 챙기는 법", "summary": "자영업자 고용보험 완벽 가이드. 1인 사업자도 가입 가능, 정부 지원으로 보험료 50~80% 환급, 폐업 시 월 109만~202만원 실업급여 수령. 가입 조건부터 신청 방법까지 한눈에 정리했습니다.", "categoryId": 2, "date": "2026.02.10"},
  {"id": 225, "slug": "2026-minimum-wage-calculator-guide", "title": "사장님, 2026년 최저시급 잘 계산하고 계신가요? 개정된 최저임금 자동계산 방법", "summary": "2026년 최저시급 10,320원 확정! 주휴수당 계산법, 월급 자동 계산 방법, 4대보험 요율 변경 사항을 한눈에 확인하세요. 법 미반영 시 최대 500만 원 과태료 리스크까지 정리했습니다.", "categoryId": 2, "date": "2026.02.02"},
  {"id": 224, "slug": "stop-illegal-dumping-outdoor-cctv-guide", "title": "우리 매장 앞 쓰레기 무단투기, 실외 CCTV로 완벽 차단하는 방법", "summary": "매장 앞 쓰레기 무단투기 고민되시나요? 실외 CCTV 제대로 고르는 4가지 기준과 한화비전 Keeper의 야간 고화질 촬영, 방수방진 성능으로 24시간 매장을 지키는 방법을 알려드립니다", "categoryId": 1, "date": "2026.02.02"},
  {"id": 194, "slug": "cctv-management-all-in-one", "title": "우리 매장 직원관리, 앱 하나로 해결하는 방법(보안까지 챙기기) ", "summary": "안 그래도 번거로운 직원 관리 업무, 매장 관리 앱 여러 개로 시간 낭비, 비용 낭비 중이신가요? 한화비전 Keeper는 CCTV 보안부터 출퇴근 기록, 급여 계산까지 하나의 앱으로 해결해드립니다.", "categoryId": 2, "date": "2026.01.26"},
  {"id": 193, "slug": "automated-employee-payslip-system", "title": "알바 급여명세서 발급, 엑셀 작업 없이 5분 만에 끝내는 법", "summary": "매달 반복되는 아르바이트생 급여명세서 발급, 번거로우셨죠? 이제 수기 작업 없이 5분 만에 완성할 수 있습니다. 한화비전 Keeper는 주휴수당 자동 계산, 법적 기준 충족, 서류 3년 보관, 급여명세서 발급까지 월 500원이면 됩니다. ", "categoryId": 2, "date": "2026.01.26"},
  {"id": 192, "slug": "employee-management-service-top3", "title": "사장님, 직원 관리 고민하시나요? 사업장 규모에 맞는 서비스 3가지 추천드려요!", "summary": "직원관리 앱, 무엇을 기준으로 골라야 할까요? 사업장 규모, 요금 구조, 5인 미만 여부까지 알바 중심 매장 사장님이 꼭 확인할 5가지 기준과 법적 의무를 정리했어요", "categoryId": 2, "date": "2026.01.19"},
  {"id": 191, "slug": "guide-how-many-cctv-for-store", "title": "우리 매장 CCTV 설치, 몇 대가 적당할까? 평수·업종별 구매 가이드", "summary": "매장 CCTV 구매 고민은 이제 끝! 사각지대, 추가 공간까지 고려한 평수별·업종별 CCTV 필요 대수 계산법부터 실제 배치도 예시까지 보여드립니다. 한화비전 Keeper가 알려주는 실패 없는 CCTV 구매 가이드.", "categoryId": 1, "date": "2026.01.19"},
  {"id": 161, "slug": "how-to-choose-cctv", "title": "저가형 CCTV, 정말 ‘저가’가 맞을까?", "summary": "초기 비용은 저렴하지만 잦은 고장과 A/S 문제로 장기적으로 더 많은 비용이 드는 저가 CCTV의 문제를 TCO로 분석하고, 신뢰할 수 있는 프리미엄 CCTV인 한화비전 Keeper의 장기적 가치를 제시합니다.", "categoryId": 1, "date": "2026.01.07"},
  {"id": 160, "slug": "writing-up-digital-employment-contract", "title": "법에 맞는 전자 근로계약서, 무료로 무제한 작성하는 방법", "summary": "근로계약서 필수 항목부터 전자서명 효력, 3년 보관 의무까지 정리했어요. 한화비전 Keeper로 법정 필수 항목이 담긴 전자 근로계약서를 무료로, 인원 제한 없이 작성해 보세요.", "categoryId": 2, "date": "2026.01.07"},
  {"id": 159, "slug": "blogcctv-rental-vs-factory-direct-comparison", "title": "CCTV 렌탈 vs 제조사 직판, 우리 매장에 유리한 선택은?", "summary": "CCTV 렌탈 vs 제조사 직판 완벽 비교! 위약금·월 고정비·소유권 문제로 손해 보는 렌탈 대신, 2년만 써도 본전 뽑는 제조사 직판이 합리적인 이유를 실제 비용과 기능으로 증명합니다.", "categoryId": 1, "date": "2025.12.26"},
  {"id": 158, "slug": "blogsnow-removal-guide-for-small-business", "title": "겨울철 매장 관리를 위한 제설 작업 완벽 가이드", "summary": "매장 앞 제설은 법적 의무입니다. 사장님들을 위해 제설 시간, 제설제 선택, 재결빙 방지까지 겨울철 매장 안전 관리의 모든 것을 정리했어요. 5단계 제설 매뉴얼과 24시간 스마트 모니터링 솔루션, 지금 확인하세요!", "categoryId": 1, "date": "2025.12.26"},
  {"id": 125, "slug": "bloghow-to-prevent-cctv-hacking", "title": "늘어가는 CCTV 해킹 범죄, 우리 매장은 안전할까요?", "summary": "CCTV 해킹으로 인한 영상 유출, 개인정보보호법 책임까지. 검증된 보안 인증과 암호화 기술로 우리 매장을 안전하게 지키는 방법을 알아보세요.", "categoryId": 1, "date": "2025.12.08"},
  {"id": 107, "slug": "how-to-prepare-to-open-gym", "title": "헬스장 창업 비용, 얼마나 필요할까? 성공적인 창업을 위한 완벽 가이드", "summary": "투자금을 회수하고, 지속 가능한 수익을 만들지에 대한 구체적인 전략이 필요하신가요? 성공적인 헬스장 창업의 핵심을 살펴보겠습니다.", "categoryId": 6, "date": "2025.11.24"},
  {"id": 106, "slug": "franchise-business-act-guide", "title": "본사 관리자가 꼭 알아야 할 ‘가맹사업법(프랜차이즈법)’핵심 가이드", "summary": "프랜차이즈 브랜드 본사 관리자가 계약, 모집, 관리 단계별로 반드시 챙겨야 할 4가지 핵심 절차를 중심으로, 실무에서 놓치기 쉬운 법적 리스크를 완벽하게 점검해 보겠습니다.", "categoryId": 6, "date": "2025.11.24"},
  {"id": 105, "slug": "how-to-choose-startup-idea", "title": "실패하지 않는 창업 아이템 선정법 : 3년 후에도 살아남을 사업계획서 작성은 어떻게?", "summary": "예비 창업자들이 가장 많이 묻는 질문을 중심으로, 차별화할 수 있는 창업 아이템 선정법과 이를 증명할 사업계획서 작성법까지 함께 정리해 보겠습니다.", "categoryId": 6, "date": "2025.11.19"},
  {"id": 104, "slug": "startup-a-to-z-guide", "title": "초보 사장님을 위한 창업 준비 A to Z 가이드북", "summary": "초보 사장님을 위한 창업 비용 최대 40% 절감 비법, 성공하는 사장님의 인사이트를 공개합니다.", "categoryId": 6, "date": "2025.11.03"},
  {"id": 103, "slug": "how-to-register-sole-proprietorship", "title": "창업 준비를 위해 반드시 확인해야 할 개인사업자 등록 방법 A to Z ", "summary": "예비 사장님들이 놓치기 쉬운 업종별 사전 신고·허가 절차부터, 사업의 세금 구조를 결정하는 과세 유형 선택, 그리고 사업자 등록 이후에 챙겨야 할 필수 세무 세팅까지 실무 관점에서 완벽히 정리해보세요! ", "categoryId": 6, "date": "2025.10.28"},
  {"id": 102, "slug": "site-analysis-visit-checklist", "title": "상권 분석 사이트, 100% 믿어도 될까? 현장 답사에서 놓치기 쉬운 체크리스트 총정리", "summary": "상권 분석 사이트의 명확한 한계와, 실패 확률을 낮추기 위해 현장 답사에서 반드시 확인해야 할 체크 포인트를 구체적으로 확인해보겠습니다. ", "categoryId": 6, "date": "2025.10.27"},
  {"id": 101, "slug": "start-bakery-cafe-checklist", "title": "베이커리 카페 창업 vs 일반 카페 창업 비교 : ‘휴게음식점’?! or ‘제과점’ ?", "summary": "베이커리 카페와 일반 카페, 두 업종 모두 커피와 디저트를 판매한다는 점에서 비슷해 보이지만, 실제로 준비해야 할 항목과 운영 방식에는 큰 차이가 있습니다.", "categoryId": 6, "date": "2025.10.14"},
  {"id": 100, "slug": "keeper-cctv-cafe-starting-review", "title": "독특한 창업 아이템으로 차별화에 성공한 부산 수제 전통찻집 이야기", "summary": "카페 창업, 이제는 차별화가 생존의 조건입니다. '남들과 똑같은 메뉴'보다, 지역 특성에 맞는 독특한 아이템으로 확실한 타겟층을 공략하는 것이 더 현실적인 전략이 된 지금. 어떻게 성공적인 카페 창업을 준비할 수 있을까요?", "categoryId": 6, "date": "2025.10.13"},
  {"id": 99, "slug": "preparing-cafe-interior-design-guide", "title": "카페 창업 준비, 인테리어가 반이다? 카페 인테리어 이렇게만 준비하세요! ", "summary": "카페 창업 준비 과정에서 인테리어를 어떻게 접근해야 하는지, 현실적인 예산부터 콘셉트, 실제 실행까지 실무에 바로 적용할 수 있는 가이드를 정리했습니다. ", "categoryId": 6, "date": "2025.10.13"},
  {"id": 98, "slug": "unmanned-store-startup-guide", "title": "무인 점포 창업, 어떻게 시작해야 할까? (무인카페부터 아이스크림 할인점 까지)", "summary": "인건비 절감만 믿고 시작하기엔 위험한 무인 점포 창업. 업종별 투자·운영 포인트와 보안 체크리스트를 꼼꼼히 살펴보세요.", "categoryId": 6, "date": "2025.09.24"},
  {"id": 97, "slug": "startup-funding-roadmap", "title": "사장님을 꿈꾼다면 필독! 정부 창업 지원금 총정리 (ft.청년 창업, 여성 창업 정책자금)", "summary": "복잡한 창업 지원금이 막막하신가요? 지원금, 융자, 보증 3가지 유형부터 청년, 여성, 소상공인 상황별 최적의 신청 로드맵까지 총정리해 드립니다. 2026년 최신 정보를 확인하고 지금 바로 계획을 세워보세요.", "categoryId": 6, "date": "2025.09.17"},
  {"id": 96, "slug": "commercial-analysis-sites-comparison", "title": "상권분석 사이트 추천: 네이버 부동산 vs 오픈업 vs 점포라인 vs 소상공인 365", "summary": "예비 사장님을 위한 상권분석 사이트 완벽 비교! 네이버 부동산, 오픈업, 점포라인, 소상공인 365의 장단점과 창업 단계별 활용 로드맵을 확인하여 실패 없는 입지 선정을 시작하세요.", "categoryId": 6, "date": "2025.09.15"},
  {"id": 95, "slug": "restaurant-registration-checklist", "title": "휴게음식점 영업신고 완벽 가이드 : 식당 창업 준비 필수 체크리스트 5가지", "summary": "휴게음식점 영업신고, 식당 창업 준비의 필수 코스입니다! 건축물대장, 정화조, 환기 시설 등 영업신고 한번에 통과하는 5가지 핵심 체크리스트를 지금 확인하세요.", "categoryId": 6, "date": "2025.09.15"},
  {"id": 91, "slug": "fancafe-keeper-cctv", "title": "글로벌 음악 산업 리더 한터글로벌이 ‘후즈팬카페’의 보안과 운영 효율을 동시에 잡은 방법", "summary": "K-POP 복합문화공간 ‘후즈팬카페’의 키퍼 CCTV 도입 후기, 희귀 굿즈 보호부터 인파 관리, 운영 효율 개선까지!", "categoryId": 5, "date": "2025.06.27"},
  {"id": 90, "slug": "keeper-cctv-vogue-hair-hongdae-review", "title": "국내 최초 ‘할랄 인증’ 받은 보그헤어 홍대거리점, CCTV로 글로벌 관광객 신뢰 200%", "summary": "홍대 미용실 '보그헤어' 박남현 원장님이 전하는 키퍼 CCTV 활용 후기! 압도적 화질과 긴 영상 저장으로 고객 클레임 해결, 매장 운영 효율 높인 비결을 확인하세요.", "categoryId": 5, "date": "2025.06.27"},
  {"id": 89, "slug": "cctv-retention-period", "title": "CCTV 보관 기간, 어기면 과태료 내야 한다고? 법적 보관 기간과 업종별 차이점 Q&A", "summary": "사장님, 우리 가게 CCTV 보관 기간 때문에 고민이신가요? 법적 의무(30일, 60일 규정), 과태료, 업종별 Q&A까지! CCTV 영상 보관의 모든 것을 쉽고 정확하게 알려드립니다.", "categoryId": 1, "date": "2025.06.25"},
  {"id": 88, "slug": "cctv-maintenance-checklist-3-tips", "title": "CCTV 설치보다 중요한 관리, 꼭 알아야 할 CCTV 관리 팁 3가지", "summary": "CCTV 설치 후 놓치기 쉬운 관리 실수와 해결책 3가지! 키퍼(Keeper) CCTV로 스마트하고 간편하게 매장을 관리하는 방법도 알아보세요.", "categoryId": 1, "date": "2025.06.25"},
  {"id": 85, "slug": "keeper-employee-management-contract-guide", "title": "근로계약서 사용 방법", "summary": "오직 우리 매장 전용 근로계약서를 1분만에 완성하는 방법!", "categoryId": 4, "date": "2025.06.18"},
  {"id": 84, "slug": "keeper-employee-management-contract", "title": "단돈 500원으로 근로계약서 무제한 작성하세요!", "summary": "우리매장 직원 근로계약서, 키퍼에서 단 돈 500원으로 무제한 작성하세요!", "categoryId": 4, "date": "2025.06.17"},
  {"id": 83, "slug": "employment-contract-checklist-guide", "title": "근로계약서 미작성시 ‘과태료 500만 원’? 사장님이 꼭 알아야 할 체크리스트", "summary": "근로계약서 미작성시 직원 1명당 최대 500만원 과태료! 주휴수당 분쟁부터 형사고발까지 실제 위험 사례와 3단계 작성법을 알아보세요.", "categoryId": 2, "date": "2025.06.16"},
  {"id": 82, "slug": "cctv-maintenance-cost-saving-guide", "title": "CCTV 유지 비용 얼마나 들까? 대표적인 운영비 3가지와 비용 절감하는 방법", "summary": "CCTV 유지 비용 아끼는 방법 총정리! 출동 비용, 저장 공간, 업데이트 비용까지 줄여주는 똑똑한 CCTV 선택 기준과 키퍼의 차별점을 확인해보세요.", "categoryId": 1, "date": "2025.06.16"},
  {"id": 81, "slug": "cctv-problems-keeper-solution", "title": "렌탈 CCTV 설치, 정말 최선의 방법일까?", "summary": "언제까지 렌탈 CCTV에 우리 가게를 '맡겨두는' 방식에만 기댈 수는 없습니다. 이제는 사장님께서 직접 상황을 챙기고 더 확실하게 매장을 지키는, 보다 적극적인 방법으로 보안에 대한 생각을 바꿔야 할 때입니다.", "categoryId": 1, "date": "2025.05.22"},
  {"id": 80, "slug": "cafe-cctv-night-glare-solution", "title": "통유리창 카페 CCTV, 영상 안 보이는 3가지 이유와 해결 방법", "summary": "통유리창 카페 CCTV, 흐릿한 영상이나 역광, 야간 촬영 문제로 고민이신가요? CCTV 역광 보정부터 노이즈 저감, 최적의 설치 위치까지, 선명한 영상 확보를 위한 해결법을 모두 정리했습니다.", "categoryId": 1, "date": "2025.05.22"},
  {"id": 79, "slug": "cctv-installation-location-blind-spot", "title": "CCTV 설치 위치 고민 끝! 설치 필수 구역 4곳과 사각지대 최소화 하는 팁 ", "summary": "매장 CCTV, 어디에 설치해야 할까요? 필수 설치 위치 4곳과 업종별 팁, CCTV 사각지대 원인 및 최소화 방법까지 총정리! 사장님들의 CCTV 설치 고민을 해결해 드립니다.", "categoryId": 1, "date": "2025.05.22"},
  {"id": 78, "slug": "cctv-installation-checklist", "title": "CCTV 설치 전, 사장님 필수 체크리스트! 설치 당일에 반드시 준비해야 할 것은?", "summary": "매장 CCTV 설치, 아직도 막막하신가요? 키퍼 설치 전문가가 CCTV 설치 문의 전부터 설치 당일, 설치 후 안내판 부착까지 사장님 필수 체크리스트를 알려드립니다. 시간과 비용을 아끼고 성공적인 CCTV 설치를 경험하세요!", "categoryId": 1, "date": "2025.05.21"},
  {"id": 77, "slug": "cctv-installation-cost-guide", "title": "CCTV 설치 가격, 어떤 기준으로 결정되나요? ", "summary": "CCTV 설치 가격, 왜 천차만별일까요? 카메라, 환경, 배선, 기능 등 가격 결정 요인과 설치 난이도(상/중/하)를 알아보고, 셀프/플랫폼/업체/키퍼 비교를 통해 내 가게에 맞는 합리적인 설치 방법을 찾아보세요.", "categoryId": 1, "date": "2025.05.21"},
  {"id": 76, "slug": "cctv-installation-operation-legal-guide", "title": "사장님을 위한 2025 영상정보처리기기 운영 가이드 : CCTV 설치 법적 기준 FAQ", "summary": "매장 CCTV 설치 시 법적 기준을 제대로 알아두세요. 고정형 영상정보처리기기 설치 위치, 운영·관리 방침, 영상 보관 규정까지, 사장님이 알아야 할 필수 법적 절차를 쉽게 설명해드립니다.", "categoryId": 1, "date": "2025.05.21"},
  {"id": 74, "slug": "cctv-quality-investment-store-safety", "title": " 매장 CCTV 영상, 고화질이 아니면 책임 피하기 어려워요!", "summary": "흐릿한 CCTV 영상 때문에 보험 거절, 고객 분쟁, 법적 비용까지? 낮은 CCTV 화질이 부르는 진짜 비용과 고화질 CCTV 투자가 필수인 이유를 알아보세요.", "categoryId": 1, "date": "2025.05.21"},
  {"id": 73, "slug": "cctv-self-check-guide", "title": "CCTV 고장으로 착각하기 쉬운 증상 3가지(feat. 자가 진단 방법)", "summary": "매장 CCTV 고장, 간단한 문제일 수 있습니다. 화면 안 나옴, 화면 오류 등 AS 부르기 전 자가진단 체크리스트로 비용과 시간을 아끼세요", "categoryId": 1, "date": "2025.05.21"},
  {"id": 72, "slug": "keeper-manager-interview-cctv-tip", "title": "“우리 매장 CCTV 설치, 어떻게 시작할까?” 키퍼 설치 전문가가 알려주는 실전 팁", "summary": "CCTV 설치, 어떻게 시작해야 할지 막막하신가요? 키퍼 매니저의 현장 경험을 통해 매장 맞춤 설치 노하우를 알려드립니다.", "categoryId": 3, "date": "2025.05.21"},
  {"id": 71, "slug": "cctv-hacking-prevention-check", "title": "우리 매장 영상이 온라인 사이트에? cctv 해킹 대비하는 방법", "summary": "우리 가게 CCTV 해킹 불안? 비밀번호, 업데이트 등 필수 자가 점검 방법과 국제 표준 인증 보안 솔루션 키퍼(Keeper)로 안심하고 매장 운영하세요. 지금 확인!", "categoryId": 1, "date": "2025.05.20"},
  {"id": 21, "slug": "store-security-insurance-guide", "title": "사장님 안심 가이드: CCTV 설치와 사고 대응을\n한번에! 매장 보안 리스크 3가지", "summary": "예기치 못한 매장 내 보안 사고, 어떤 것들이 있을까요? 매장 보안 리스크 3가지와 매장 보험 가이드를 지금 확인해보세요.", "categoryId": 1, "date": "2025.04.30"},
  {"id": 20, "slug": "cctv-viewing-guide", "title": "CCTV 열람 절차 및 개인정보보호법:\n사장님 필수 가이드", "summary": "경찰, 손님 CCTV 열람 요청 시 개인정보보호법 위반 없이 안전하게 대응하고 관리하는 방법을 확인하세요.", "categoryId": 1, "date": "2025.04.30"},
  {"id": 19, "slug": "pet-cctv-mandatory-guide", "title": "2025 반려동물 영업장 CCTV 설치 의무화?\n동물병원, 애견 미용실, 우리 매장도 포함 될까?", "summary": "2025년부터 동물병원, 미용실 등 모든 반려동물 시설 CCTV 설치가 의무화됩니다. 운영자를 위한 설치 기준, 장소, 시점 확인, 준비 방법과 키퍼 솔루션까지 확인하세요!", "categoryId": 1, "date": "2025.04.30"},
  {"id": 18, "slug": "cctv-government-support-small-business", "title": "정부지원으로 CCTV 설치 비용 0원?\n소상공인을 위한 필수 정부지원사업 3가지", "summary": "소상공인 CCTV 설치 비용을 덜어줄 정부지원사업 3가지 완벽 정리. 신청 조건부터 방법, 활용 팁까지 한 번에 확인하세요.", "categoryId": 1, "date": "2025.04.30"},
  {"id": 17, "slug": "2025-statutory-leisure-pay", "title": "2025 주휴수당 조건, 기준 완벽 가이드 :\n단골 질문과 상황별 예시까지", "summary": "주휴수당 조건, 아무리 정리해도 헷갈린다면? 지급 기준부터 상황별 예시까지 참고해 보세요", "categoryId": 1, "date": "2025.04.22"},
  {"id": 16, "slug": "cctv-storage-period-shop-security-guide", "title": "매장 도난 사고 예방과 대처를 위한\nCCTV 보관기간 완벽 가이드", "summary": "매장 도난 사고 발생 시 대처 방법과 CCTV 보관기간의 중요성을 알아보세요. 최대 4주 영상 보관, 400만 화소 고화질, 해킹 방지 기술이 적용된 키퍼로 매장 보안 걱정 없이 사업에만 집중하세요.", "categoryId": 1, "date": "2025.04.22"},
  {"id": 15, "slug": "customer-case-psychological-counseling-center", "title": "심리상담센터 디어마인드가 CCTV 설치로\n안전한 상담 환경을 구축한 방법", "summary": "심리상담센터에 다양한 내담자가 다녀가도, 소수정예의 상담자가 운영하더라도 보안 걱정 없이 센터를 관리하는 비법을 공개합니다.", "categoryId": 5, "date": "2025.04.22"},
  {"id": 14, "slug": "parttime-pay-calculation-guide", "title": "알바비 계산 단 5분 만에 끝내는 방법\n(feat. 각종 급여, 수당 계산 방법)", "summary": "복잡한 알바비 계산으로 고민하는 사장님을 위한 완벽 가이드! 시급제, 월급제 급여부터 연장·야간·휴일근로수당 계산법까지 쉽게 정리했습니다. 키퍼로 급여 계산 부담을 덜어보세요.", "categoryId": 2, "date": "2025.04.22"},
  {"id": 13, "slug": "unmanned-store-security-cctv-keeper", "title": "무인점포 절도 범죄, 위험은 낮추고\n운영 효율 높이는 방법은?", "summary": "무인점포 절도 건수는 날로 증가하는 추세. 고화질 400만 화소 카메라와 4주 영상 보관으로 매장 안전을 책임지는 키퍼 CCTV로 사장님의 걱정을 덜어드립니다. 스마트폰으로 언제 어디서나 매장 관리까지!", "categoryId": 1, "date": "2025.04.22"},
  {"id": 12, "slug": "cctv-information-storage-period", "title": "식중독 주장 손님, 식당 사장님 억울함 풀려면 CCTV 보관기간이 중요해요!", "summary": "오늘은 매장에서 일어나는 억울한 사건의 증거가 될 만한 CCTV영상 기록의 확보 방법과 조건에 대해서 알아보겠습니다.", "categoryId": 1, "date": "2025.04.16"},
  {"id": 11, "slug": "cctv-installation-cost", "title": "매장용 CCTV 설치 비용 총정리: CCTV 자가 설치를 고민중이라면", "summary": "CCTV 설치 비용, 가장 저렴한 방법은 무엇일까요? 셀프 설치, 렌탈, 올인원 솔루션 3가지를 비교합니다.", "categoryId": 1, "date": "2025.04.16"},
  {"id": 10, "slug": "customer-case-newfit-fitness", "title": "뉴핏휘트니스가 CCTV로 헬스장 분실물 사고를 ZERO로 만든 방법", "summary": "헬스장 CCTV, 어떻게 하면 제대로 쓸 수 있을까요? 뉴핏휘트니스의 이야기를 들려드립니다.", "categoryId": 5, "date": "2025.04.16"},
  {"id": 9, "slug": "2025-cctv-checklist", "title": "[CCTV 관리 체크리스트]\n매장 운영중인 사장님, 4가지 먼저 점검하세요!", "summary": "놓치기 쉬운 CCTV 관리, 제대로 하고 계신가요? 키퍼가 알려드리는 ‘CCTV 관리 체크리스트’로 우리 매장 CCTV가 법 기준에 맞게 잘 관리되고 있는지 지금 바로 점검해보세요.", "categoryId": 1, "date": "2025.04.16"},
  {"id": 8, "slug": "cctv-company-search", "title": "CCTV 업체 선정할 때 반드시 확인해야 할 3가지\n(기술력, 기능과 사용성, 계약방식)", "summary": "CCTV가 보안 장치의 역할을 제대로 할 수 있도록, 업체 선정 시 반드시 확인해야 할 3가지 기준을 알려드릴게요.", "categoryId": 1, "date": "2025.04.16"},
  {"id": 7, "slug": "free-cctv-change", "title": "[경기도 소상공인 경영환경개선 지원사업]\n우리 매장 CCTV 무료로 바꿔보세요", "summary": "우리 매장 CCTV 무료로 바꿔보세요.", "categoryId": 1, "date": "2025.03.25"},
  {"id": 6, "slug": "workforce-social-insurance-parttime", "title": "아르바이트생 4대 보험 꼭 가입해야 할까?\n사장님을 위한 직원 관리 가이드", "summary": "안 들면 안 되는 4대보험, 가입 방법과 예외사항 정리까지 한번에 확인하세요.", "categoryId": 2, "date": "2025.03.12"},
  {"id": 5, "slug": "4-labor-laws-for-part-time-employees", "title": "우리 매장에 아르바이트를 채용했다면\n알아야 할 근로기준법 4가지", "summary": "매장 관리 올인원 솔루션 키퍼가 직원 채용에 도움 되는 근로기준법을 소개합니다.", "categoryId": 2, "date": "2025.03.12"},
  {"id": 3, "slug": "co-working-space-onerooflab", "title": "키퍼로 고객 서비스 품질을 높인\n공유오피스 원루프랩의 대형매장 운영법", "summary": "공유 오피스 사장님이 CCTV를 통해 고객 만족도를 높인 비법, 지금 함께 확인하세요!", "categoryId": 5, "date": "2025.03.12"},
  {"id": 1, "slug": "why-hanwha-vision-created-store-cctv", "title": "글로벌 비전 기업 한화비전이 사장님을 위한\n매장관리 솔루션 키퍼를 만든 이유", "summary": "글로벌 비전 기업 한화비전이 출시한 매장 CCTV 플랫폼 키퍼! 기존 시장을 혁신하는 키퍼 팀의 이야기를 들어보세요.", "categoryId": 3, "date": "2025.03.12"},
  {"id": 2, "slug": "customer-case-bakery-cafe-flink", "title": "베이커리 카페 플링크 사장님이 키퍼로 매장 운영 비용은 낮추고\n고객 만족은 높인 비법", "summary": "단순한 보안을 넘어, 키퍼 CCTV로 효율적인 매장 운영을 만든 베이커리 카페 사례", "categoryId": 5, "date": "2025.02.28"},
];

/** 카테고리 id → 이름 */
export function getCategoryName(id: number): string {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.name ?? "";
}

/** slug 로 글 찾기 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * 추천 아티클 = 원본 /post/{slug}/recommend 응답의 prev(바로 다음으로 최신 글) + next(바로 이전 글)
 * 목록이 최신순이므로 index-1 이 prev, index+1 이 next.
 */
export function getRecommendPosts(slug: string): BlogPost[] {
  const i = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (i < 0) return [];
  return [BLOG_POSTS[i - 1], BLOG_POSTS[i + 1]].filter((p): p is BlogPost => Boolean(p));
}
