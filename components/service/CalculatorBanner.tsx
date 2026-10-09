/**
 * 견적 계산기 유도 배너 (keeper /plan "견적계산기 바로가기" 브랜드색 배너 틀)
 * - 배너 전체가 /calculator 링크. 호버 시 버튼 화살표가 오른쪽으로 살짝 이동.
 * - 배치: 렌탈 탭 요금 슬라이더 아래(RentalSlider), 설치 탭 패키지 가격 카드 아래(InstallPackages)
 * - 오른쪽은 계산기 스톡 사진(CC0, next/image). 훅이 없어 서버/클라이언트 어디서든 사용 가능.
 */
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "./ui";

export default function CalculatorBanner({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/calculator"
      className={`group flex items-center justify-between gap-[16px] overflow-hidden rounded-[14px] bg-brand px-[20px] py-[24px] lg:rounded-[20px] lg:px-[56px] lg:py-[36px] ${className}`}
    >
      {/* ===== 카피 + 바로가기 버튼 ===== */}
      <div className="min-w-0">
        <p className="text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-white lg:text-[28px] lg:leading-[40px] lg:tracking-[-0.7px]">
          몇 대가 필요할지 고민되시나요?
        </p>
        <p className="mt-[4px] text-[13px] leading-[20px] tracking-[-0.26px] text-white/85 lg:mt-[6px] lg:text-[18px] lg:leading-[28px] lg:tracking-[-0.36px]">
          공간 정보를 입력하시면 CCTV 설치 수량을 추천해 드려요
        </p>
        <span className="mt-[16px] inline-flex items-center gap-[6px] rounded-[100px] bg-white py-[10px] pl-[16px] pr-[14px] text-[14px] font-bold leading-[1.2] tracking-[-0.28px] text-point-strong lg:mt-[20px] lg:gap-[8px] lg:py-[14px] lg:pl-[24px] lg:pr-[22px] lg:text-[17px]">
          견적 계산기 바로가기
          <ArrowIcon className="h-[12px] w-[12px] transition-transform duration-200 group-hover:translate-x-[3px] lg:h-[14px] lg:w-[14px]" />
        </span>
      </div>

      {/* ===== 계산기 사진 (keeper 원본: 계산기 일러스트) =====
          스톡 사진(CC0): public/images/stock/calculator-banner.webp — 실제 사진 확보 시 교체 */}
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[12px] lg:h-[150px] lg:w-[200px]">
        <Image
          src="/images/stock/calculator-banner.webp"
          alt="계산기와 연필, 메모지"
          fill
          sizes="(min-width: 1024px) 200px, 88px"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
