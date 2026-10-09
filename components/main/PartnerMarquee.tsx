/**
 * 제휴 브랜드 띠 — "검증된 제휴 업체와 함께해 믿을 수 있습니다."
 * - 제조사 로고 2줄이 좌우 반대 방향으로 무한히 흐르는 marquee (keeper business ReasonSection 로직 그대로).
 *   같은 트랙 2개(원본 + aria-hidden 복제)를 이어 붙이고 CSS keyframes 로 -100% 이동 → 끊김 없는 루프.
 * - 얇고 차분하게: 작은 로고 칩, 느린 속도, 좌우 끝 페이드 마스크.
 * - 로고 이미지: public/images/partners/*.webp — 기존 사이트의 로고 묶음 이미지 1장(2024/04/참조사진-제품로고들.jpg)을
 *   로고별로 잘라낸 것. 원본 해상도가 낮아(높이 약 30px) 크게 키우면 흐려짐 → 칩 여백을 넉넉히 줘 원본 크기 근처로 표시.
 *   TODO: 고해상도 로고 파일을 구하면 같은 파일명으로 교체.
 */
import Image from "next/image";
import styles from "./main.module.css";

type Logo = { name: string; file: string };

/** 제휴 제조사 로고 2줄 (원본 이미지 속 순서) — file: public/images/partners/<file>.webp */
const LOGO_ROWS: Logo[][] = [
  [
    { name: "JWC", file: "jwc" },
    { name: "한화테크윈", file: "hanwha-techwin" },
    { name: "dahua", file: "dahua" },
    { name: "HIKVISION", file: "hikvision" },
    { name: "IDIS", file: "idis" },
    { name: "3R GLOBAL", file: "3r" },
    { name: "LG전자", file: "lg" },
    { name: "EGPIS", file: "egpis" },
    { name: "Honeywell", file: "honeywell" },
    { name: "WEBGATE", file: "webgate" },
    { name: "SEAGATE", file: "seagate" },
    { name: "NEXT", file: "next" },
    { name: "SOLTECH", file: "soltech" },
    { name: "SeeEyes", file: "seeeyes" },
    { name: "METACOM", file: "metacom" },
    { name: "KEVIS", file: "kevis" },
    { name: "WON", file: "won" },
  ],
  [
    { name: "uniview", file: "uniview" },
    { name: "대산", file: "daesan" },
    { name: "PARAGONTECH", file: "paragontech" },
    { name: "sysmania", file: "sysmania" },
    { name: "HUVIRON", file: "huviron" },
    { name: "AURA", file: "aura" },
    { name: "EGPIS-RED", file: "egpis-red" },
    { name: "NADATEL", file: "nadatel" },
    { name: "금강케이블", file: "kkc" },
    { name: "KCE", file: "kce" },
    { name: "3IT", file: "3it" },
    { name: "XAVVIO", file: "xavvio" },
    { name: "Livezon", file: "livezon" },
    { name: "ERAESEEDS", file: "eraeseeds" },
    { name: "광명통신", file: "kwangmyung" },
    { name: "PRODIA", file: "prodia" },
  ],
];

export default function PartnerMarquee() {
  return (
    // ===== 제휴 브랜드 띠: 흰 배경, 위아래 얇은 경계선 =====
    <section className="w-full border-y border-[#f0f0f0] bg-white py-[48px] lg:py-[72px]">
      {/* ===== 타이틀 ===== */}
      <h2 className="px-[16px] text-center text-[18px] font-bold leading-[28px] tracking-[-0.4px] text-[#222] lg:text-[24px] lg:leading-[36px]">
        검증된 제휴 업체와 함께해 <br className="lg:hidden" />
        믿을 수 있습니다.
      </h2>

      {/* ===== 로고 2줄: 1줄은 왼쪽, 2줄은 오른쪽으로 끝없이 흐름 + 좌우 끝 페이드 ===== */}
      <div className="mt-[24px] w-full [mask-image:linear-gradient(90deg,transparent_0%,#000_8%,#000_92%,transparent_100%)] lg:mt-[40px]">
        {LOGO_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className={`flex w-full overflow-hidden ${rowIdx > 0 ? "mt-[10px] lg:mt-[16px]" : ""}`}>
            {/* 원본 트랙 + 복제 트랙(aria-hidden) */}
            {[false, true].map((isClone) => (
              <div
                key={String(isClone)}
                aria-hidden={isClone || undefined}
                className={`flex shrink-0 gap-[10px] pr-[10px] lg:gap-[16px] lg:pr-[16px] ${
                  rowIdx === 0 ? styles.trackLeft : styles.trackRight
                }`}
              >
                {row.map(({ name, file }) => (
                  <div
                    key={file}
                    className="flex h-[44px] w-[120px] shrink-0 items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white px-[14px] py-[10px] lg:h-[60px] lg:w-[168px] lg:rounded-[10px] lg:px-[20px] lg:py-[14px]"
                  >
                    {/* 로고: 칩 안에 비율 유지(contain). 복제 트랙은 스크린리더에서 숨김 */}
                    <div className="relative h-full w-full">
                      <Image
                        src={`/images/partners/${file}.webp`}
                        alt={isClone ? "" : `${name} 로고`}
                        fill
                        sizes="(min-width: 1024px) 168px, 120px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
