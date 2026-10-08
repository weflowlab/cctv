/**
 * "앱스토어 또는 구글플레이에서 … 검색 후 다운로드" 섹션 (원본 sc-cad4d6ee)
 * - 연주황 그라데이션 라운드 박스(1080×431) 안에 좌측 안내 카피 + 우측 앱 화면 2장(키퍼 / 키퍼 파트너스).
 * - 앱 화면 하단은 그라데이션(::after)으로 페이드아웃, 각 화면 우하단에 앱 이름 + 앱 로고(110px).
 * - 앱 화면 묶음에 slide-up 스크롤 등장 애니메이션 (<Reveal>).
 */
import Placeholder from "@/components/common/Placeholder";
import Reveal from "@/components/common/Reveal";

const APPS = [
  { name: "키퍼", img: "키퍼 앱 소개 이미지", logo: "키퍼 앱 로고" },
  { name: "키퍼 파트너스", img: "파트너스 앱 소개 이미지", logo: "키퍼 파트너스 앱 로고" },
];

export default function AppInstallSection() {
  return (
    // ===== 앱 설치 안내: 사장님용 "키퍼" / 직원용 "키퍼 파트너스" =====
    <section className="flex justify-center px-[16px] pt-[60px] lg:px-0 lg:pb-[50px] lg:pt-[100px]">
      <div className="relative flex w-full min-w-[320px] max-w-[480px] flex-col items-center rounded-[12px] bg-[linear-gradient(180deg,#fff5ef_0%,#ffede2_100%)] pb-[70px] pt-[36px] lg:block lg:h-[431px] lg:w-[1080px] lg:min-w-0 lg:max-w-none lg:rounded-[20px] lg:p-0">
        {/* 좌측 안내 카피 */}
        <div className="relative z-10 flex flex-col items-center lg:ml-[65px] lg:mt-[127px] lg:items-start">
          <p className="text-[16px] font-normal tracking-[-0.5px] text-[#222] lg:text-[24px] lg:font-[350]">
            앱스토어 또는 구글플레이에서
          </p>
          <p className="mt-[8px] whitespace-pre-line text-center text-[22px] font-normal leading-[1.5] tracking-[-0.839px] text-[#333] lg:mb-[5px] lg:mt-[12px] lg:text-left lg:text-[32px] lg:leading-normal">
            사장님은 <strong className="font-black text-[#ff5c00] lg:font-bold">키퍼</strong>
            {/* 원본: PC "\n", 모바일 ",\n" */}
            <span className="lg:hidden">,</span>
            {"\n"}매장직원은 <strong className="font-black text-[#ff5c00] lg:font-bold">키퍼 파트너스</strong>
          </p>
          <b className="text-[22px] font-bold leading-[1.3] tracking-[-0.839px] text-[#222] lg:text-[30px]">
            검색 후 다운로드 해주세요!
          </b>
        </div>
        {/* 우측 앱 화면 2장 + 하단 페이드 그라데이션 */}
        <Reveal className="relative z-[2] mt-[31px] flex gap-[16px] after:absolute after:bottom-[-16px] after:left-1/2 after:h-[72px] after:w-full after:-translate-x-1/2 after:bg-[linear-gradient(180deg,rgba(255,237,226,0)_0%,#ffede2_76.09%)] after:content-[''] lg:absolute lg:right-[74px] lg:top-[71px] lg:mt-0 lg:gap-[48px] lg:after:bottom-0 lg:after:left-auto lg:after:right-[-40px] lg:after:h-[92px] lg:after:w-[599px] lg:after:translate-x-0">
          {APPS.map((app) => (
            <div key={app.name} className="relative">
              {/* 앱 화면 (원본 369×474, PC 높이 299 / 모바일 너비 136) */}
              <Placeholder label={app.img} className="aspect-[36/47] w-[136px] lg:h-[299px] lg:w-auto" />
              {/* 앱 이름 + 로고 */}
              <div className="absolute bottom-[-46px] left-1/2 z-[2] flex -translate-x-1/2 flex-col-reverse items-center gap-[6px] lg:bottom-[-8px] lg:left-auto lg:right-[9px] lg:translate-x-0 lg:flex-row lg:items-end lg:gap-[10px]">
                <div className="z-[2] mt-[-15px] whitespace-nowrap text-[10px] font-medium tracking-[-0.6px] text-[#473a32] lg:mb-[20px] lg:mr-[-15px] lg:mt-0 lg:text-[14px]">
                  {app.name}
                </div>
                <Placeholder label={app.logo} className="z-[1] h-[94px] w-[94px] rounded-[20px] lg:h-[110px] lg:w-[110px]" />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
