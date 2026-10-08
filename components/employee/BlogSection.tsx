"use client";

/**
 * "지금 당장 써먹을 수 있는 직원 관리의 모든 것" 블로그 섹션 (원본 sc-e008acb9 / 카드 sc-622f5cd4)
 * - 원본은 API(/v1/post?categoryId=2, PC limit 50 / 모바일 limit 2)로 직원관리 카테고리 글을 받아옴.
 *   여기서는 API 응답을 정적 데이터로 넣어둠. // TODO: API 연동
 * - PC: Swiper 캐러셀 — slidesPerView "auto"(슬라이드 516px), centeredSlides, initialSlide 2,
 *   spaceBetween 44, 드래그 가능한 스크롤바.
 * - 모바일: 상위 2개 글만 세로 리스트(gap 48).
 * - "키퍼 블로그 바로가기" → /blog?category=2
 */
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import Placeholder from "@/components/common/Placeholder";
import { ArrowIcon, SpaceOrBreak } from "./icons";

type Post = { customUrl: string; title: string; subTitle: string };

// 원본 API(categoryId=2) 응답의 글 목록 (title / subTitle / customUrl)
const POSTS: Post[] = [
  { customUrl: "cafe-employee-hiring-checklist", title: "식당·카페 알바 채용, 보건증부터 근로계약까지 필수 체크리스트 3가지", subTitle: "식당·카페 사장님을 위한 알바 보건증, 원산지 표시, 근로계약서 필수 체크리스트. 복잡한 직원 관리를 키퍼로 해결하고 법적 리스크에 체계적으로 대비하세요." },
  { customUrl: "gym-sportsclub-staff-management-guide", title: "헬스 트레이너 무단결근·무인 헬스장 사고, CCTV와 직원 관리 앱으로 동시에 해결하는 법", subTitle: "한화비전 키퍼는 출퇴근 기록과 CCTV 영상을 앱 하나에서 관리해요. 트레이너가 위치 기반으로 출퇴근 체크를 하면, 관장님은 앱에서 실시간으로 누가 출근했는지 바로 확인할 수 있습니다." },
  { customUrl: "beauty-shop-staff-management-guide", title: "헤어샵·네일샵 직원 관리, 프리랜서 vs 근로자 구분부터 출퇴근 자동화까지 완전 정복", subTitle: "미용실 프리랜서 퇴직금 분쟁, 남의 일이 아닙니다. 역대급 폐업 위기 속에서 원장님을 지켜주는 '가짜 프리랜서' 구별법부터 직원 무단결근 막는 출퇴근 시스템까지! 한화비전 키퍼로 노무 리스크는 줄이고 매장 수익은 높이는 비결을 확인하세요." },
  { customUrl: "part-time-worker-attendance-management", title: "우리 알바생은 왜 항상 5분 늦을까? 출퇴근 관리 이렇게 해보세요.", subTitle: "알바생이 매일 5분씩 늦는 이유, 혹시 모르고 넘기진 않으셨나요? 수기 장부·무료 앱의 한계와 GPS 기반 출퇴근 관리로 대리 출근·허위 기록을 원천 차단하는 방법을 확인하세요." },
  { customUrl: "teen-worker-hiring-3-checklist", title: "청소년 알바 채용 전 반드시 점검해야 하는 3가지", subTitle: "청소년 알바 채용 전 필수 체크리스트 3가지! 채용 가능 연령, 금지 업종, 필수 서류, 근로시간 제한, 급여 계산까지 사장님이 꼭 알아야 할 법적 요건을 실무 팁과 함께 정리했습니다. 한화비전 Keeper로 간편하게 관리하세요." },
  { customUrl: "fake-freelance-contract-crackdown-2026", title: "알바생 사업소득세 계약하셨나요? ‘가짜 3.3% 계약’으로 과태료 부과 될 수 있어요!", subTitle: "가짜 3.3 계약 단속 본격화! 알바생 프리랜서 계약 시 최대 3년 징역·3천만 원 벌금 처벌 가능. 사업소득세 vs 근로소득세 구분 기준과 안전한 근로계약 방법 알아보기" },
  { customUrl: "overtime-pay-calculation-guide-2026", title: "휴일 야간에 연장 근무는 시급의 2.5배? 시간외 수당 중복 계산 방법 A to Z", subTitle: "2026년 최저시급 10,320원 기준, 연장·야간·휴일 수당 정확한 계산법을 알아보세요. 휴일 야간 근무 시 2.5배 지급? 중복 수당 계산 방법부터 법적 리스크까지, 매장 운영 사장님이 꼭 알아야 할 시간외 수당 완벽 가이드입니다." },
  { customUrl: "employee-schedule-management-app-recommendation", title: " 알바 근무 스케줄 관리 어려우셨죠? 쉽고 정확한 근태관리 어플 추천!", subTitle: "알바 근무 스케줄 관리, 아직도 엑셀과 카톡으로 하시나요? 근태관리 어플 키퍼로 근무표 자동 생성, 실시간 푸시 알림, 통합 스케줄 조회까지 한 번에 해결하세요. 62.8%의 사장님이 겪는 근태 관리 어려움, 이제 스마트하게 끝내세요!" },
  { customUrl: "small-business-owner-unemployment-insurance-guide", title: "자영업자 고용보험 완벽 가이드: 정부 지원 받아서 보험료 내고, 실업급여 챙기는 법", subTitle: "자영업자 고용보험 완벽 가이드. 1인 사업자도 가입 가능, 정부 지원으로 보험료 50~80% 환급, 폐업 시 월 109만~202만원 실업급여 수령. 가입 조건부터 신청 방법까지 한눈에 정리했습니다." },
  { customUrl: "2026-minimum-wage-calculator-guide", title: "사장님, 2026년 최저시급 잘 계산하고 계신가요? 개정된 최저임금 자동계산 방법", subTitle: "2026년 최저시급 10,320원 확정! 주휴수당 계산법, 월급 자동 계산 방법, 4대보험 요율 변경 사항을 한눈에 확인하세요. 법 미반영 시 최대 500만 원 과태료 리스크까지 정리했습니다." },
  { customUrl: "cctv-management-all-in-one", title: "우리 매장 직원관리, 앱 하나로 해결하는 방법(보안까지 챙기기) ", subTitle: "안 그래도 번거로운 직원 관리 업무, 매장 관리 앱 여러 개로 시간 낭비, 비용 낭비 중이신가요? 한화비전 Keeper는 CCTV 보안부터 출퇴근 기록, 급여 계산까지 하나의 앱으로 해결해드립니다." },
  { customUrl: "automated-employee-payslip-system", title: "알바 급여명세서 발급, 엑셀 작업 없이 5분 만에 끝내는 법", subTitle: "매달 반복되는 아르바이트생 급여명세서 발급, 번거로우셨죠? 이제 수기 작업 없이 5분 만에 완성할 수 있습니다. 한화비전 Keeper는 주휴수당 자동 계산, 법적 기준 충족, 서류 3년 보관, 급여명세서 발급까지 월 500원이면 됩니다. " },
  { customUrl: "employee-management-service-top3", title: "사장님, 직원 관리 고민하시나요? 사업장 규모에 맞는 서비스 3가지 추천드려요!", subTitle: "직원관리 앱, 무엇을 기준으로 골라야 할까요? 사업장 규모, 요금 구조, 5인 미만 여부까지 알바 중심 매장 사장님이 꼭 확인할 5가지 기준과 법적 의무를 정리했어요" },
  { customUrl: "writing-up-digital-employment-contract", title: "법에 맞는 전자 근로계약서, 무료로 무제한 작성하는 방법", subTitle: "근로계약서 필수 항목부터 전자서명 효력, 3년 보관 의무까지 정리했어요. 한화비전 Keeper로 법정 필수 항목이 담긴 전자 근로계약서를 무료로, 인원 제한 없이 작성해 보세요." },
  { customUrl: "employment-contract-checklist-guide", title: "근로계약서 미작성시 ‘과태료 500만 원’? 사장님이 꼭 알아야 할 체크리스트", subTitle: "근로계약서 미작성시 직원 1명당 최대 500만원 과태료! 주휴수당 분쟁부터 형사고발까지 실제 위험 사례와 3단계 작성법을 알아보세요." },
  { customUrl: "parttime-pay-calculation-guide", title: "알바비 계산 단 5분 만에 끝내는 방법\n(feat. 각종 급여, 수당 계산 방법)", subTitle: "복잡한 알바비 계산으로 고민하는 사장님을 위한 완벽 가이드! 시급제, 월급제 급여부터 연장·야간·휴일근로수당 계산법까지 쉽게 정리했습니다. 키퍼로 급여 계산 부담을 덜어보세요." },
  { customUrl: "workforce-social-insurance-parttime", title: "아르바이트생 4대 보험 꼭 가입해야 할까?\n사장님을 위한 직원 관리 가이드", subTitle: "안 들면 안 되는 4대보험, 가입 방법과 예외사항 정리까지 한번에 확인하세요." },
  { customUrl: "4-labor-laws-for-part-time-employees", title: "우리 매장에 아르바이트를 채용했다면\n알아야 할 근로기준법 4가지", subTitle: "매장 관리 올인원 솔루션 키퍼가 직원 채용에 도움 되는 근로기준법을 소개합니다." },
];

/** 블로그 카드 (원본 79694: 썸네일 + 제목 + 부제 1줄 말줄임) */
function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.customUrl}`} className="block w-full">
      <Placeholder
        label={post.title}
        className="aspect-[658/439] w-full rounded-[12px] lg:aspect-auto lg:h-[315px] lg:rounded-[32px]"
      />
      <h3 className="mt-[16px] whitespace-normal break-keep px-[8px] text-left text-[20px] font-bold leading-[30px] tracking-[-0.4px] text-[#202020] [overflow-wrap:break-word] lg:px-[12px] lg:text-[26px] lg:leading-[38px] lg:tracking-[-0.26px]">
        {post.title}
      </h3>
      <h4 className="mt-[6px] overflow-hidden text-ellipsis whitespace-nowrap px-[8px] text-left text-[14px] font-normal leading-[22px] tracking-[-0.14px] text-[#535353] lg:mt-[12px] lg:px-[12px] lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.5px]">
        {post.subTitle}
      </h4>
    </Link>
  );
}

export default function BlogSection() {
  return (
    // ===== 블로그: 직원관리 실무 글 캐러셀 =====
    <section className="relative px-[16px] py-[60px] text-center lg:px-0 lg:pb-[200px] lg:pt-[150px]">
      <h2 className="text-center text-[26px] font-bold leading-[37px] tracking-[-0.52px] text-[#202020] lg:text-[42px] lg:leading-[60px] lg:tracking-[-1px] [&>strong]:text-[#ff5c00]">
        지금 당장 써먹을 수 있는
        <br />
        <strong>직원 관리의 모든 것</strong>
      </h2>
      <h2 className="mt-[12px] text-center text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#333] lg:mt-[20px] lg:text-[20px] lg:leading-[32px] lg:tracking-[-0.4px] lg:opacity-85">
        매장 운영에 꼭 필요한 실무 노하우를
        <SpaceOrBreak />
        키퍼가 알려드려요!
      </h2>
      <Link
        href="/blog?category=2"
        aria-label="키퍼 블로그 바로가기"
        className="relative z-10 mt-[20px] inline-flex cursor-pointer items-center justify-center gap-[8px] rounded-[48px] bg-[#ff5c00] px-[30px] py-[12px] text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-all duration-100 ease-in-out hover:bg-[#e83b05] lg:mt-[36px] lg:py-[14px] lg:text-[20px] lg:leading-[28px] lg:tracking-[-0.4px]"
      >
        <span>키퍼 블로그 바로가기</span>
        <ArrowIcon width={14} height={14} />
      </Link>

      {/* PC: Swiper 캐러셀 (가운데 정렬, 3번째 글부터 시작, 스크롤바 드래그) */}
      <div className="relative mt-[108px] hidden min-h-[482px] w-screen lg:block [&_.swiper-slide]:w-[516px]">
        <Swiper
          modules={[Scrollbar]}
          initialSlide={2}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={44}
          scrollbar={{ draggable: true }}
          className="!pb-[40px]"
        >
          {POSTS.map((post) => (
            <SwiperSlide key={post.customUrl}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 모바일: 2개 글 세로 리스트 */}
      <div className="mt-[36px] flex w-full flex-col gap-[48px] lg:hidden">
        {POSTS.slice(0, 2).map((post) => (
          <BlogCard key={post.customUrl} post={post} />
        ))}
      </div>
    </section>
  );
}
