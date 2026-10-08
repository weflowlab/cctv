/**
 * 견적 결과 — 연차별 누적 비용 비교 차트 (렌탈 vs 키퍼, 순수 SVG)
 * - 원본 sc-e6428956(PC 648×225) / sc-f9f0da8b(모바일 648×363) 의 좌표 계산식을 그대로 옮김
 *   · 렌탈 누적 = 월 렌탈료 × 12 × 연차(1~7년, 계속 증가)
 *   · 키퍼 누적 = 월 할부금 × 12 × min(연차, 3) (36개월 완납 후 평평)
 *   · y 축 최대값 = 7년차 렌탈 누적 / 0.885(PC) · 0.915(모바일)
 * - 대수가 바뀌면 path/circle/text 좌표가 0.35초 트랜지션으로 부드럽게 이동 (원본 CSS 동일)
 * - PC/모바일 두 버전을 모두 렌더하고 CSS(lg:)로 하나만 보여준다.
 */
import { KEEPER_TOTAL_BY_COUNT, RENTAL_MONTHLY_BY_COUNT, formatWon } from "@/components/plan/planData";

type Pt = { x: number; y: number };

/** 점 배열 → "M x y L x y ..." 경로 */
const toLine = (pts: Pt[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

/** 원본 SVG 트랜지션 규칙 (d/cx/cy/x/y/transform 애니메이션) */
const TRANSITION_CLS =
  "[&_path]:[transition:d_0.35s_cubic-bezier(0.4,0,0.2,1)] [&_circle]:[transition:cx_0.35s_ease,cy_0.35s_ease] [&_text]:[transition:x_0.35s_ease,y_0.35s_ease] [&_g]:[transition:transform_0.35s_ease] [&_line]:[transition:x1_0.35s_ease,y1_0.35s_ease,x2_0.35s_ease,y2_0.35s_ease]";

/** 공통 데이터 계산 */
function getSeries(cctvCount: number) {
  const keeperMonthly = KEEPER_TOTAL_BY_COUNT[cctvCount] / 36;
  const rentalMonthly = RENTAL_MONTHLY_BY_COUNT[cctvCount];
  const years = [1, 2, 3, 4, 5, 6, 7];
  const rental = years.map((y) => 12 * rentalMonthly * y);
  const keeper = years.map((y) => 12 * keeperMonthly * Math.min(y, 3));
  return { rental, keeper };
}

/* ------------------------------------------------------------------ */
/* PC 차트 (648 × 225)                                                 */
/* ------------------------------------------------------------------ */
function DesktopChart({ cctvCount }: { cctvCount: number }) {
  const { rental, keeper } = getSeries(cctvCount);
  const max = rental[6] / 0.885;
  const xs = [64, 151, 236, 322, 411, 498.5, 585];
  const toPts = (arr: number[]) => arr.map((v, i) => ({ x: xs[i], y: 194.2 - (v / max) * 148.2 }));
  const p = toPts(rental);
  const k = toPts(keeper);
  // 선 아래 영역 (바닥 y=188)
  const area = (pts: Pt[]) => `${toLine(pts)} L ${pts[pts.length - 1].x} 188 L ${pts[0].x} 188 Z`;
  const yLabels = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
    val: Math.round(((max / 6) * i) / 1000),
    y: 194.2 - (i / 6) * 148.2,
  }));
  const done = k[2]; // 3년차(36개월 완납) 지점
  const r7 = p[6]; // 7년차 렌탈
  const k7 = k[6]; // 7년차 키퍼
  const diff = Math.round((rental[6] - keeper[6]) / 10000);

  return (
    <svg viewBox="0 0 648 225" className={`h-auto w-full flex-1 [aspect-ratio:648/225] ${TRANSITION_CLS}`}>
      <rect x="0.5" y="0.5" width="647" height="224" rx="5.5" fill="#FAFAFA" stroke="#F5F5F5" />
      <defs>
        <linearGradient id="rentalGrad" x1="331.5" y1="117" x2="334.5" y2="167" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BBBBBB" />
          <stop offset="1" stopColor="#BBBBBB" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="keeperGrad" x1="353" y1="158" x2="353" y2="181" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5C00" />
          <stop offset="1" stopColor="#FF5C00" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="597.5" y1="63" x2="597.5" y2="157" gradientUnits="userSpaceOnUse">
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#FF5C00" />
        </linearGradient>
        <filter id="shadowOrange" x="0" y="0" width="200%" height="200%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.1" stdDeviation="2.75" floodColor="#FF5C00" floodOpacity="0.45" />
        </filter>
        <filter id="shadowGrey" x="0" y="0" width="200%" height="200%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.1" stdDeviation="2.75" floodColor="#888888" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* 축 */}
      <path d="M44 46V184C44 186.209 45.7909 188 48 188H605" stroke="#DEDEDE" strokeLinecap="round" fill="none" />
      {yLabels.map((l, i) => (
        <text key={i} x={36} y={l.y} textAnchor="end" dominantBaseline="middle" fontSize="10" fontWeight="700" fill="#999999">
          {formatWon(l.val)}
        </text>
      ))}
      {/* 범례 */}
      <g>
        <line x1="21.5" y1="19.5" x2="37.5" y2="19.5" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="29.5" cy="19.5" r="2.5" fill="#888888" stroke="#ffffff" strokeWidth="0.5" filter="url(#shadowGrey)" />
        <text x="51" y="23" fill="#999999" fontSize="11" fontWeight="600">렌탈 CCTV</text>
        <line x1="101.5" y1="19.5" x2="117.5" y2="19.5" stroke="#FF5C00" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="109.5" cy="19.5" r="2.5" fill="#FF5C00" stroke="#ffffff" strokeWidth="0.5" filter="url(#shadowOrange)" />
        <text x="123" y="23" fill="#999999" fontSize="11" fontWeight="600">키퍼 CCTV</text>
      </g>
      {/* 렌탈/키퍼 영역 + 선 */}
      <path d={area(p)} fill="url(#rentalGrad)" fillOpacity="0.28" />
      <path d={toLine(p)} fill="none" stroke="#BBBBBB" strokeWidth="1.3" strokeLinecap="round" />
      <path d={area(k)} fill="url(#keeperGrad)" fillOpacity="0.16" />
      <path d={toLine(k)} fill="none" stroke="#FF5C00" strokeWidth="1.3" strokeLinecap="round" />
      {/* 36개월 완납 지점 점선 + 말풍선 */}
      <line x1={done.x} y1={46.5} x2={done.x} y2={186} stroke="#FF5C00" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round" />
      <g>
        <rect x={done.x - 31} y={done.y - 34.5} width="62" height="18" rx="4" fill="#FF5C00" />
        <text x={done.x} y={done.y - 25.5} fill="white" fontSize="9" fontWeight="800" textAnchor="middle" dominantBaseline="middle" dy="0.5">
          36개월 완납
        </text>
        <path d={`M${done.x + 3.57},${done.y - 16.5} L${done.x},${done.y - 12.2} L${done.x - 3.57},${done.y - 16.5} Z`} fill="#FF5C00" />
      </g>
      {/* 7년차 차액 화살표 + "N만 저렴" */}
      <g>
        <polygon points={`596.5,${r7.y + 5} 594.113,${r7.y} 598.887,${r7.y}`} fill="#474747" />
        <polygon points={`596.5,${k7.y - 5} 594.113,${k7.y} 598.887,${k7.y}`} fill="#FF5C00" />
        <line x1="596.5" y1={r7.y + 5} x2="596.5" y2={k7.y - 5} stroke="url(#arrowGrad)" strokeWidth="1" strokeDasharray="2 2" />
      </g>
      <text x={r7.x + 20} y={(r7.y + k7.y) / 2} fill="#FF5C00" textAnchor="start">
        <tspan x={r7.x + 20} dy="-3" fontSize="12" fontWeight="700">
          {diff}만
        </tspan>
        <tspan fontSize="10" fontWeight="400" x={r7.x + 22} dy="12">
          저렴
        </tspan>
      </text>
      {/* 7년차 렌탈 누적 말풍선 */}
      <g>
        <rect x={r7.x - 33} y={r7.y - 32} width="66" height="17" rx="4" fill="#888888" />
        <text x={r7.x} y={r7.y - 23.5} fill="white" fontSize="9" fontWeight="800" textAnchor="middle" dominantBaseline="middle">
          렌탈 {Math.round(rental[6] / 10000)}만원
        </text>
        <path d={`M${r7.x + 3.57},${r7.y - 15} L${r7.x},${r7.y - 10.7} L${r7.x - 3.57},${r7.y - 15} Z`} fill="#888888" />
      </g>
      <circle cx={done.x} cy={done.y} r="6" fill="#FF5C00" stroke="#ffffff" strokeWidth="2" filter="url(#shadowOrange)" />
      <circle cx={r7.x} cy={r7.y} r="6" fill="#888888" stroke="#ffffff" strokeWidth="2" filter="url(#shadowGrey)" />
      <circle cx={k7.x} cy={k7.y} r="6" fill="#FF5C00" stroke="#ffffff" strokeWidth="2" filter="url(#shadowOrange)" />
      {p.map((pt, i) => (
        <text key={i} x={pt.x} y={206} textAnchor="middle" fontSize="11" fontWeight="600" fill="#999999">
          {i + 1}년차
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 모바일 차트 (648 × 363)                                              */
/* ------------------------------------------------------------------ */
function MobileChart({ cctvCount }: { cctvCount: number }) {
  const { rental, keeper } = getSeries(cctvCount);
  const max = rental[6] / 0.915;
  const xs = [71, 154.75, 238.5, 325.75, 413, 489.25, 565.5];
  const toPts = (arr: number[]) => arr.map((v, i) => ({ x: xs[i], y: 322.5 - (v / max) * 250.3 }));
  const p = toPts(rental);
  const k = toPts(keeper);
  const rentalLine = [p[0], p[2], p[4], p[6]];
  const keeperLine = [k[0], k[2], k[6]];
  const yLabels = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
    val: Math.round(((max / 6) * i) / 1000),
    y: 322.5 - (i / 6) * 250.3,
  }));
  const done = k[2];
  const r7 = p[6];
  const k7 = k[6];
  const diff = Math.round((rental[6] - keeper[6]) / 10000);

  return (
    <svg viewBox="0 0 648 363" className={`h-auto w-full flex-1 [aspect-ratio:648/363] ${TRANSITION_CLS}`}>
      <rect x="0.5" y="0.5" width="647" height="362" rx="5.5" fill="#FAFAFA" stroke="#F5F5F5" />
      <defs>
        <linearGradient id="mbRentalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mbKeeperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FF5C00" />
          <stop offset="1" stopColor="#FF5C00" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mbArrowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#FF5C00" />
        </linearGradient>
        <filter id="mbShadowOrange" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.57215" stdDeviation="3.93038" floodColor="#FF5C00" floodOpacity="0.45" />
        </filter>
        <filter id="mbShadowGrey" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.57215" stdDeviation="3.93038" floodColor="#888888" floodOpacity="0.45" />
        </filter>
      </defs>
      <path d="M48 72V315C48 317.209 49.7909 319 52 319H592" stroke="#DEDEDE" strokeLinecap="round" fill="none" />
      <line x1={done.x} y1={72} x2={done.x} y2={319} stroke="#FF5C00" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round" />
      {yLabels.map((l, i) => (
        <text key={i} x={36} y={l.y} textAnchor="end" dominantBaseline="middle" fontSize="11" fontWeight="700" fill="#999999">
          {formatWon(l.val)}
        </text>
      ))}
      {[
        { text: "1년차", x: p[0].x },
        { text: "3년차", x: p[2].x },
        { text: "5년차", x: p[4].x },
        { text: "7년차", x: p[6].x },
      ].map((l) => (
        <text key={l.text} x={l.x} y={344} textAnchor="middle" fontSize="12" fontWeight="600" fill="#999999">
          {l.text}
        </text>
      ))}
      <g>
        <line x1="14.6" y1="28.1" x2="33.9" y2="28.1" stroke="#888888" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="24.27" cy="28.06" r="3" fill="#888888" stroke="#ffffff" strokeWidth="0.6" filter="url(#mbShadowGrey)" />
        <text x="42.5" y="32" fill="#999999" fontSize="11" fontWeight="600">렌탈 CCTV</text>
        <line x1="111.2" y1="28.1" x2="130.6" y2="28.1" stroke="#FF5C00" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="120.91" cy="28.06" r="3" fill="#FF5C00" stroke="#ffffff" strokeWidth="0.6" filter="url(#mbShadowOrange)" />
        <text x="137" y="32" fill="#999999" fontSize="11" fontWeight="600">키퍼 CCTV</text>
      </g>
      <path d={`M ${p[2].x} ${p[2].y} L ${p[0].x} ${p[0].y} H 565.5 V ${p[6].y} L ${p[4].x} ${p[4].y} Z`} fill="url(#mbRentalGrad)" />
      <path d={toLine(rentalLine)} fill="none" stroke="#BBBBBB" strokeWidth="1.3" strokeLinecap="round" />
      <path d={`M ${k[2].x} ${k[2].y} L ${k[0].x} ${k[0].y} H 566 V ${k[2].y} Z`} fill="url(#mbKeeperGrad)" opacity="0.41" />
      <path d={toLine(keeperLine)} fill="none" stroke="#FF5C00" strokeWidth="1.3" strokeLinecap="round" />
      {/* 36개월 완납 말풍선 */}
      <g transform={`translate(${done.x - 238.5}, ${done.y - 254.5})`}>
        <rect x="199" y="208" width="77" height="23" rx="4" fill="#FF5C00" />
        <text x="237.5" y="220.5" fill="white" fontSize="11" fontWeight="800" textAnchor="middle" dominantBaseline="middle">
          36개월 완납
        </text>
        <path d="M241.07 231 L237.499 235.286 L233.927 231 Z" fill="#FF5C00" />
      </g>
      {/* 7년차 차액 점선 화살표 (원본은 점선 path, 여기선 그라데이션 점선 line 으로 대체) */}
      <line x1={r7.x + 12} y1={r7.y} x2={r7.x + 12} y2={k7.y} stroke="url(#mbArrowGrad)" strokeWidth="1" strokeDasharray="2 2" />
      <g transform={`translate(${k7.x - 565.5}, ${(r7.y + k7.y) / 2 - 174.5})`}>
        <text x="594.585" y="166.681" fill="#FF5C00" textAnchor="start">
          <tspan x="594.585" fontSize="14" fontWeight="800">
            {diff}만
          </tspan>
          <tspan x="598" dy="15.66" fontSize="12" fontWeight="400">
            저렴
          </tspan>
        </text>
      </g>
      <g transform={`translate(${r7.x - 565.5}, ${r7.y - 93.5})`}>
        <rect x="514" y="52" width="91" height="24" rx="4" fill="#888888" />
        <text x="559.5" y="65" fill="white" fontSize="11" fontWeight="800" textAnchor="middle" dominantBaseline="middle">
          렌탈 {Math.round(rental[6] / 10000)}만원
        </text>
        <path d="M563.07 76 L559.499 80.2857 L555.927 76 Z" fill="#888888" />
      </g>
      <circle cx={done.x} cy={done.y} r="8" fill="#FF5C00" stroke="#ffffff" strokeWidth="2" filter="url(#mbShadowOrange)" />
      <circle cx={k7.x} cy={k7.y} r="8" fill="#FF5C00" stroke="#ffffff" strokeWidth="2" filter="url(#mbShadowOrange)" />
      <circle cx={r7.x} cy={r7.y} r="8" fill="#888888" stroke="#ffffff" strokeWidth="2" filter="url(#mbShadowGrey)" />
    </svg>
  );
}

export default function CostChart({ cctvCount }: { cctvCount: number }) {
  return (
    <>
      <div className="hidden lg:flex">
        <DesktopChart cctvCount={cctvCount} />
      </div>
      <div className="flex lg:hidden">
        <MobileChart cctvCount={cctvCount} />
      </div>
    </>
  );
}
