/**
 * 홈 문제 제기 섹션 — "평소엔 잊고 지내던 CCTV, 막상 문제가 생기면 혼자 감당해야 합니다"
 * - keeper "평소에는 잊고 지냈던 CCTV / 막상 문제가 생기면…" 틀: 네이비 배경 + 공감 제목.
 * - AS 고민 4가지 카드: components/service/data.ts AS_WORRIES 재사용, 아이콘은 AsTab 의 WorryIconSvg 재사용
 *   (AS 탭 카드 렌더 방식 그대로, 색만 네이비 배경용 반투명 흰색). PC 4열 / 모바일 2열, 순차 slide-in-up.
 * - 해결 연결 문구로 끝내고 바로 아래 해결(Solution) 섹션으로 이어짐 — 별도 이동 버튼 없음.
 */
import Reveal from "@/components/common/Reveal";
import { WorryIconSvg } from "@/components/service/AsTab";
import { AS_WORRIES } from "@/components/service/data";
import { SITE } from "@/lib/site";
import { HomeSectionHeader } from "./HomeSection";

export default function ProblemSection() {
  return (
    // ===== 문제 제기: 네이비 배경 + 하단 틸 radial 글로우 =====
    <section className="relative flex w-full justify-center overflow-hidden bg-brand px-[16px] py-[80px] lg:px-0 lg:py-[140px]">
      <div className="relative z-[1] flex w-full max-w-[1080px] flex-col items-center">
        {/* ===== 섹션 헤더: 공감 제목 ===== */}
        <HomeSectionHeader
          dark
          chip="THE PROBLEM"
          title={
            <>
              평소엔 잊고 지내던 CCTV,
              <br />
              막상 문제가 생기면
              <br />
              <strong>혼자 감당해야 합니다</strong>
            </>
          }
          desc="화면이 꺼지거나 녹화가 안 되는 걸, 영상이 필요한 순간에야 알게 됩니다. 그런데 연락할 곳이 마땅치 않습니다."
          className="mb-[40px] lg:mb-[64px]"
        />

        {/* ===== AS 고민 4가지 카드 (AS_WORRIES) ===== */}
        <ul className="grid w-full grid-cols-2 gap-[10px] lg:grid-cols-4 lg:gap-[16px]">
          {AS_WORRIES.map((w, i) => (
            <Reveal
              as="li"
              key={w.title}
              delay={i * 120}
              className="flex flex-col items-center gap-[12px] rounded-[14px] border border-white/10 bg-white/[0.06] px-[14px] py-[24px] text-center lg:gap-[16px] lg:px-[20px] lg:py-[36px]"
            >
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-point lg:h-[68px] lg:w-[68px]">
                <WorryIconSvg name={w.icon} />
              </div>
              <h3 className="text-[16px] font-bold tracking-[-0.32px] text-white lg:text-[19px]">{w.title}</h3>
              <p className="break-keep text-[13px] leading-[20px] tracking-[-0.26px] text-white/70 lg:text-[15px] lg:leading-[23px]">
                &ldquo;{w.desc}&rdquo;
              </p>
            </Reveal>
          ))}
        </ul>

        {/* ===== 해결 연결 문구 (다음 해결 섹션으로 이어짐) ===== */}
        <Reveal className="mt-[40px] flex flex-col items-center gap-[24px] lg:mt-[64px] lg:gap-[32px]">
          <p className="break-keep text-center text-[18px] font-bold leading-[1.5] tracking-[-0.4px] text-white lg:text-[28px] lg:tracking-[-0.7px]">
            설치한 곳이 어디든 괜찮습니다.
            <br />
            <span className="text-point">{SITE.name}가 직접 방문해 해결해 드립니다.</span>
          </p>
        </Reveal>
      </div>

      {/* ===== 하단 틸 radial 글로우 (SpeakerPromo 와 같은 장식) ===== */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[35%] w-[200%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(0,167,171,0.22)_0%,rgba(0,167,171,0)_70%)] lg:h-1/2 lg:bg-[radial-gradient(ellipse_60%_100%_at_bottom,rgba(0,167,171,0.22)_0%,rgba(0,167,171,0)_70%)]" />
    </section>
  );
}
