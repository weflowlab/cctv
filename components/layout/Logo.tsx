/**
 * 로고 — 방패 CCTV 엠블럼 + "유니텍 CCTV" 글자 이미지, 누르면 홈(/)으로 이동
 * - 엠블럼: public/images/logo/emblem.webp (고객 로고 원본에서 방패만 떼어 배경을 투명하게 만든 것)
 * - 글자: public/images/logo/wordmark.webp (같은 원본의 엠블럼 아래 "유니텍 CCTV" 파란 입체 글자를 떼어낸 것, 936×136)
 *   2026-10-19: 영문 텍스트(UNITECH CCTV) 대신 원본 글자 이미지로 교체 — 흰·어두운 배경 모두 그대로 쓴다
 * - light: 투명 헤더(어두운 사진 위)에서는 글자에 옅은 그림자를 둬 사진과 분리
 * - size: header(헤더) · footer(푸터, 조금 크게)
 * - 글자 이미지는 원본 태그라인("SECURITY FOR A SAFER TOMORROW")은 뺐다 — 헤더 크기에서는 읽히지 않음
 */
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

type LogoProps = { light?: boolean; size?: "header" | "footer" };

export default function Logo({ light = false, size = "header" }: LogoProps) {
  const footer = size === "footer";
  return (
    <Link href="/" aria-label={`${SITE.name} 홈으로`} className="flex items-center gap-[8px] whitespace-nowrap">
      <Image
        src="/images/logo/emblem.webp"
        alt=""
        width={136}
        height={144}
        loading={footer ? "lazy" : "eager"}
        // -translate-y-[1px]: 방패가 글자보다 내려와 보여 1px 올림 (2px 는 반대로 올라가 보임 — 2026-10-19 확인)
        className={`w-auto -translate-y-[1px] ${footer ? "h-[34px] lg:h-[40px]" : "h-[30px] lg:h-[34px]"}`}
      />
      <Image
        src="/images/logo/wordmark.webp"
        alt={SITE.name}
        width={936}
        height={136}
        loading={footer ? "lazy" : "eager"}
        className={`w-auto ${footer ? "h-[20px] lg:h-[24px]" : "h-[17px] lg:h-[20px]"} ${
          light ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" : ""
        }`}
      />
    </Link>
  );
}
