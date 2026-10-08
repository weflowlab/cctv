/**
 * 제휴 브랜드 띠 — "검증된 제휴 업체와 함께해 믿을 수 있습니다."
 * - 제조사 로고 2줄이 좌우 반대 방향으로 무한히 흐르는 marquee (keeper business ReasonSection 로직 그대로).
 *   같은 트랙 2개(원본 + aria-hidden 복제)를 이어 붙이고 CSS keyframes 로 -100% 이동 → 끊김 없는 루프.
 * - 얇고 차분하게: 작은 로고 칩, 느린 속도, 좌우 끝 페이드 마스크.
 * - 원본은 로고 묶음 이미지 1장(2024/04/참조사진-제품로고들.jpg) → 로고별 Placeholder 로 분리.
 */
import Placeholder from "@/components/common/Placeholder";
import styles from "./main.module.css";

/** 제휴 제조사 로고 2줄 (원본 이미지 속 로고 순서) */
const LOGO_ROWS = [
  ["한화테크윈", "dahua", "HIKVISION", "IDIS", "3R", "LG전자", "EGPIS", "Honeywell", "WEBGATE", "SEAGATE", "NEXT", "SOLTECH", "SeeEyes", "METACOM", "KEYIS", "WON"],
  ["uniview", "대산", "PARAGONTECH", "sysmania", "HUVIRON", "AURA", "EGPIS-RED", "NADATEL", "금강케이블", "KCE", "3IT", "XAVVIO", "Livezon", "ERASEEDS", "광명통신", "PRODIA"],
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
                {row.map((name) => (
                  <div
                    key={name}
                    className="flex h-[44px] w-[120px] shrink-0 items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white p-[4px] lg:h-[60px] lg:w-[168px] lg:rounded-[10px]"
                  >
                    <Placeholder label={name} className="h-full w-full rounded-[4px] border-0" />
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
