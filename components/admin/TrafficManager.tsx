"use client";

/**
 * 유입 관리 (weflow 관리자 "유입 관리" 이식) — 최근 30일 방문 기록 원본을 받아 화면에서 집계
 * - 방문자 = 세션(기기당 하루). 유입 소스는 그날 첫 페이지 기준 (광고 클릭을 따로 나누지 않는다)
 * - 카드: 요약 지표 4개 → 가장 많이 들어온 곳 → 유입 경로 / 접속 기기
 *         → 날짜별 방문자(최근 14일) → 시간대별 / 이탈 페이지
 * - 데이터: GET /api/admin/analytics?days=30 (PageTracker 가 /api/track 으로 쌓은 기록)
 */
import type { LucideIcon } from "lucide-react";
import { Clock, DoorOpen, Eye, LogIn, MousePointerClick, Smartphone, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PageView } from "@/lib/pageViews";
import { PLACES, SERVICES } from "@/lib/site";
import { RefreshButton } from "./InquiryManager";
import { adminFetch, pad, PeriodSelect, withinPeriod, type PeriodSel } from "./ui";

// 유입 소스 표기·색 — 채널별 브랜드 컬러
const SOURCE_KO: Record<string, string> = {
  kakao: "카카오",
  naver: "네이버",
  instagram: "인스타그램",
  facebook: "페이스북",
  google: "구글",
  daum: "다음",
  twitter: "X(트위터)",
  youtube: "유튜브",
  band: "밴드",
  threads: "스레드",
  daangn: "당근",
  direct: "직접 유입",
};
const SOURCE_COLOR: Record<string, string> = {
  kakao: "#fae100",
  naver: "#03c75a",
  instagram: "#f06595",
  facebook: "#1877f2",
  google: "#ea4335",
  daum: "#06b6d4",
  twitter: "#111111",
  youtube: "#ff0000",
  band: "#00c73c",
  threads: "#333333",
  daangn: "#ff6f0f",
  direct: "#94a3b8",
};
// utm 약자·별칭 소스 통합 (예: ig → instagram) — 같은 채널을 한 줄로 합침
const SOURCE_ALIAS: Record<string, string> = {
  ig: "instagram",
  insta: "instagram",
  fb: "facebook",
  meta: "facebook",
  yt: "youtube",
  x: "twitter",
  "band.us": "band",
  // 스레드 — 링크 리다이렉트 도메인이 소스로 남은 예전 기록을 합친다
  "l.threads.com": "threads",
  threads_net: "threads",
};
// 소스 문자열 정규화 — 소문자화 + 별칭 흡수, 값이 없으면 직접 유입
function normSource(s: string): string {
  const k = (s || "direct").toLowerCase();
  return SOURCE_ALIAS[k] || k;
}
// 경로 → 한글 페이지 이름 (이탈 페이지 표기용)
const PAGE_KO: Record<string, string> = {
  "/": "메인",
  "/about": "회사 소개",
  "/calculator": "견적 계산기",
  "/cases": "시공사례",
  "/contact": "상담 신청",
  "/contact/success": "상담 신청 완료",
  "/faq": "자주 묻는 질문",
  "/terms/service": "이용약관",
  "/terms/personal": "개인정보처리방침",
  "/terms/location": "위치기반 이용약관",
  // 서비스 탭 · 장소별 시공사례 — 사이트 설정(SERVICES·PLACES)에서 이름을 가져온다
  ...Object.fromEntries(SERVICES.map((s) => [`/service/${s.slug}`, `서비스 · ${s.name}`])),
  ...Object.fromEntries(PLACES.map((p) => [`/cases/place/${p.slug}`, `시공사례 · ${p.name}`])),
};
// 경로 → 사람이 알아보는 한글 이름 (쿼리·해시 제거, 미등록 경로는 경로 그대로)
function pageName(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (PAGE_KO[clean]) return PAGE_KO[clean];
  // 사례 상세는 주소 그대로 보여준다 (/cases/gangnam-cafe-cctv-installation 등)
  if (/^\/cases\/[a-z0-9-]+$/i.test(clean)) return clean;
  // 그 밖은 우리 사이트에 없는 주소 — 봇·잘못 복사된 링크가 남긴 기록이라 한 줄로 묶는다
  return "없는 주소";
}
// 접속 기기 표기·색
const DEVICE_KO: Record<string, string> = {
  mobile: "모바일",
  tablet: "태블릿",
  desktop: "데스크탑",
};
const DEVICE_COLOR: Record<string, string> = {
  mobile: "var(--accent)",
  tablet: "#f59e0b",
  desktop: "#22c55e",
};

// 머문 시간 표기 — ms → "45초" / "2분 10초"
function fmtDur(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}초`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem ? `${m}분 ${rem}초` : `${m}분`;
}

function TrafficMetric({
  Icon,
  label,
  value,
  sub,
  tint,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tint: string;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "1.3rem 1.4rem",
        borderTop: `4px solid ${tint}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.7rem",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${tint}1a`,
            color: tint,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={2.2} />
        </span>
        <p
          className="emphasized"
          style={{
            color: "var(--text-secondary)",
            margin: 0,
            fontSize: "0.95rem",
            wordBreak: "keep-all",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          margin: 0,
          lineHeight: 1.05,
          fontSize: "2.35rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            margin: "0.45rem 0 0",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionHead({
  Icon,
  title,
  desc,
  tint,
}: {
  Icon: LucideIcon;
  title: string;
  /** 설명 — 모바일 줄바꿈이 필요하면 <br className="br-mobile" /> 를 섞어 넘긴다 */
  desc: React.ReactNode;
  tint: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.7rem",
        marginBottom: "1.2rem",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: 11,
          background: `${tint}1a`,
          color: tint,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={21} strokeWidth={2.2} />
      </span>
      <div>
        <h3
          style={{
            margin: "0 0 0.15rem",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            wordBreak: "keep-all",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function BarRow({
  label,
  color,
  value,
  max,
  right,
  labelWidth = 92,
  wrapLabel = false,
  rightWidth = 92,
}: {
  label: string;
  color: string;
  value: number;
  max: number;
  right: string;
  /** 라벨 칸 너비(px) — 키워드처럼 긴 라벨은 넓힌다 */
  labelWidth?: number;
  /** true 면 말줄임 대신 줄바꿈으로 글자를 전부 보여준다 */
  wrapLabel?: boolean;
  /** 오른쪽 숫자 칸 너비(px) — 모든 카드가 같은 값을 써서 숫자 시작선이 맞는다 */
  rightWidth?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
      {/* 라벨 칸 너비를 고정해 막대 시작선이 전부 같은 자리에 온다.
          다만 화면이 아주 좁거나 확대된 상태에서는 줄어들 수 있게 해 칸 밖으로 밀려나지 않는다 */}
      <span
        title={label}
        style={{
          flex: `0 1 ${labelWidth}px`,
          minWidth: 0,
          fontSize: "0.86rem",
          color: "var(--text-secondary)",
          ...(wrapLabel
            ? { wordBreak: "break-all", lineHeight: 1.35 }
            : {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }),
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: "1 1 0",
          minWidth: 0,
          height: 18,
          borderRadius: 5,
          background: "var(--bg-secondary)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${max ? (value / max) * 100 : 0}%`,
            height: "100%",
            background: color,
            borderRadius: 5,
          }}
        />
      </div>
      <span
        style={{
          flex: `0 1 ${rightWidth}px`,
          minWidth: 0,
          textAlign: "right",
          fontSize: "0.88rem",
          fontWeight: 700,
          color: "var(--text)",
          whiteSpace: "nowrap",
        }}
      >
        {right}
      </span>
    </div>
  );
}

function TrafficView({
  pageViews: allPageViews,
  loading,
  onRefresh,
}: {
  pageViews: PageView[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const card: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "1.4rem 1.5rem",
  };

  // 기간 선택
  const [period, setPeriod] = useState<PeriodSel>({ key: "today" });
  const pageViews = withinPeriod(allPageViews, period);

  // 날짜별 방문자 차트(가로 스크롤)를 진입 시 맨 오른쪽(최근)으로 이동
  const dailyScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = dailyScrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [allPageViews.length]);

  // 세션 단위로 묶기 (createdAt 오름차순 가정)
  const sessions = new Map<string, PageView[]>();
  pageViews.forEach((v) => {
    const arr = sessions.get(v.sessionId);
    if (arr) arr.push(v);
    else sessions.set(v.sessionId, [v]);
  });
  const sessionList = Array.from(sessions.values());

  // 날짜별 방문자 차트는 기간 선택과 무관하게 최근 14일 전체를 보여줌
  // → 기간 필터가 걸린 pageViews가 아니라 전체 데이터로 세션을 다시 묶는다
  const allSessions = new Map<string, PageView[]>();
  allPageViews.forEach((v) => {
    const arr = allSessions.get(v.sessionId);
    if (arr) arr.push(v);
    else allSessions.set(v.sessionId, [v]);
  });
  const allSessionList = Array.from(allSessions.values());

  const totalSessions = sessionList.length;
  const totalViews = pageViews.length;

  // 유입 소스별 세션 (첫 페이지 기준)
  const sourceCount: Record<string, number> = {};
  const deviceCount: Record<string, number> = {};
  const exitCount: Record<string, number> = {};
  let bounced = 0;
  let durSum = 0,
    durN = 0;
  sessionList.forEach((views) => {
    const entry = views[0];
    const exit = views[views.length - 1];
    // 유입 소스는 그날 첫 페이지 기준 (광고 클릭도 따로 나누지 않고 그 채널로 센다)
    const src = normSource(entry.source);
    sourceCount[src] = (sourceCount[src] || 0) + 1;
    deviceCount[entry.device] = (deviceCount[entry.device] || 0) + 1;
    exitCount[exit.path] = (exitCount[exit.path] || 0) + 1;
    if (views.length === 1) bounced++;
    const sessionDur = views.reduce((a, v) => a + (v.durationMs || 0), 0);
    if (sessionDur > 0) {
      durSum += sessionDur;
      durN++;
    }
  });
  const bounceRate = totalSessions
    ? Math.round((bounced / totalSessions) * 100)
    : 0;
  const avgDur = durN ? durSum / durN : 0;

  const sourceRows = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]);
  const maxSource = Math.max(1, ...sourceRows.map((r) => r[1]));
  const deviceRows = Object.entries(deviceCount).sort((a, b) => b[1] - a[1]);
  const exitRows = Object.entries(exitCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxExit = Math.max(1, ...exitRows.map((r) => r[1]));
  // 이탈 페이지 합계 = 방문 수 (방문 한 건당 마지막 페이지 하나) — 퍼센트의 분모로 쓴다
  const exitTotal = Object.values(exitCount).reduce((a, b) => a + b, 0);

  // 일별 방문(세션 수) — 최근 14일
  const DAYS = 14;
  const today = new Date();
  const days: { key: string; label: string; v: number }[] = [];
  const didx: Record<string, number> = {};
  for (let n = DAYS - 1; n >= 0; n--) {
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - n,
    );
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    didx[key] = days.length;
    days.push({ key, label: `${d.getMonth() + 1}/${d.getDate()}`, v: 0 });
  }
  allSessionList.forEach((views) => {
    const d = new Date(views[0].createdAt);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (key in didx) days[didx[key]].v++;
  });
  const maxDay = Math.max(1, ...days.map((d) => d.v));

  // 시간대별 (0~23시, 페이지뷰 기준)
  const hours = Array.from({ length: 24 }, () => 0);
  pageViews.forEach((v) => {
    hours[new Date(v.createdAt).getHours()]++;
  });
  const maxHour = Math.max(1, ...hours);

  if (loading && allPageViews.length === 0) {
    return (
      <p className="subhead c-muted" style={{ padding: "2rem 0" }}>
        불러오는 중…
      </p>
    );
  }
  if (!loading && allPageViews.length === 0) {
    return (
      <div style={card}>
        <p
          className="subhead"
          style={{
            color: "var(--text-muted)",
            margin: 0,
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          아직 수집된 방문 데이터가 없습니다.
          <br />
          방문이 기록되면 여기에 유입·이탈 통계가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* 상단 바 — 기간 선택 (왼쪽) · 새로고침 (오른쪽) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
        <PeriodSelect value={period} onChange={setPeriod} />
        <RefreshButton loading={loading} onClick={onRefresh} />
      </div>

      {/* 요약 지표 */}
      <div
        className="traffic-metric-grid"
        style={{ display: "grid", gap: "1rem" }}
      >
        <TrafficMetric
          Icon={Users}
          tint="#0a2d5b"
          label="방문자 수"
          value={`${totalSessions}명`}
          sub="선택 기간 방문 고객"
        />
        <TrafficMetric
          Icon={Eye}
          tint="#8b5cf6"
          label="본 페이지 수"
          value={`${totalViews}회`}
          sub="고객들이 열어본 페이지"
        />
        <TrafficMetric
          Icon={MousePointerClick}
          tint="#f59e0b"
          label="즉시 이탈률"
          value={`${bounceRate}%`}
          sub={`한 페이지만 보고 이탈 (${bounced}명)`}
        />
        <TrafficMetric
          Icon={Clock}
          tint="#00a7ab"
          label="평균 머문 시간"
          value={avgDur ? fmtDur(avgDur) : "-"}
          sub="한 명이 머문 평균 시간"
        />
      </div>

      {/* 핵심 한 줄 하이라이트 */}
      {sourceRows.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            background: "linear-gradient(135deg, var(--accent-light), var(--surface-container))",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "1.15rem 1.4rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: SOURCE_COLOR[sourceRows[0][0]] || "var(--accent)",
              color: "var(--on-accent)",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <TrendingUp size={24} strokeWidth={2.4} />
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "1.15rem",
              color: "var(--text)",
              wordBreak: "keep-all",
              lineHeight: 1.45,
            }}
          >
            고객이 가장 많이 들어온 곳은{" "}
            <strong
              // 흰 배경이라 카카오 노랑만 어둡게 눌러 쓴다 (그대로 쓰면 글자가 안 보인다)
              style={{
                color: sourceRows[0][0] === "kakao" ? "#a16207" : SOURCE_COLOR[sourceRows[0][0]] || "var(--accent)",
              }}
            >
              {SOURCE_KO[sourceRows[0][0]] || sourceRows[0][0]}
            </strong>{" "}
            이에요 — 전체 방문자의{" "}
            <strong>
              {totalSessions
                ? Math.round((sourceRows[0][1] / totalSessions) * 100)
                : 0}
              %
            </strong>
          </p>
        </div>
      )}

      {/* 유입 소스 + 기기별 */}
      <div className="analytics-2col">
        <section style={card}>
          <SectionHead
            Icon={LogIn}
            tint="#0a2d5b"
            title="어디서 들어왔나요?"
            desc="고객들이 우리 사이트를 찾은 경로"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {sourceRows.length === 0 && (
              <p className="c-muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                데이터 없음
              </p>
            )}
            {sourceRows.map(([src, cnt]) => (
              <BarRow
                key={src}
                label={SOURCE_KO[src] || src}
                color={SOURCE_COLOR[src] || "var(--accent)"}
                value={cnt}
                max={maxSource}
                right={`${cnt}명 (${totalSessions ? Math.round((cnt / totalSessions) * 100) : 0}%)`}
              />
            ))}
          </div>
        </section>

        <section style={card} className="dev-card">
          <SectionHead
            Icon={Smartphone}
            tint="#8b5cf6"
            title="무엇으로 봤나요?"
            desc="휴대폰·컴퓨터 등 접속 기기"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {deviceRows.map(([dev, cnt]) => (
              <BarRow
                key={dev}
                label={DEVICE_KO[dev] || dev}
                color={DEVICE_COLOR[dev] || "var(--accent)"}
                value={cnt}
                max={Math.max(1, ...deviceRows.map((r) => r[1]))}
                right={`${cnt}명 (${totalSessions ? Math.round((cnt / totalSessions) * 100) : 0}%)`}
              />
            ))}
          </div>
        </section>

      </div>

      {/* 일별 방문 추이 */}
      <section style={card}>
        <SectionHead
          Icon={TrendingUp}
          tint="#00a7ab"
          title="날짜별 방문자"
          desc="최근 14일 동안 하루에 몇 명이 왔는지"
        />
        <div ref={dailyScrollRef} style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "0.5rem",
            height: 160,
            minWidth: 620,
          }}
        >
          {days.map((d) => (
            <div
              key={d.key}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                }}
              >
                {d.v || ""}
              </span>
              <div
                title={`${d.label} · ${d.v}명`}
                style={{
                  width: "100%",
                  maxWidth: 34,
                  height: `${(d.v / maxDay) * 100}%`,
                  minHeight: d.v ? 4 : 0,
                  background: "var(--accent)",
                  borderRadius: "5px 5px 0 0",
                  transition: "height 0.2s",
                }}
              />
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 시간대별 + 이탈 페이지 */}
      <div className="analytics-2col">
        <section style={card}>
          <SectionHead
            Icon={Clock}
            tint="#0a2d5b"
            title="언제 많이 오나요?"
            desc="하루 중 방문이 몰리는 시간대 (0~23시)"
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: 130,
            }}
          >
            {hours.map((h, i) => (
              <div
                key={i}
                title={`${i}시 · ${h}회`}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${(h / maxHour) * 100}%`,
                    minHeight: h ? 3 : 0,
                    background:
                      i >= 9 && i <= 18 ? "var(--accent)" : "var(--outline)",
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.4rem",
              fontSize: "0.68rem",
              color: "var(--text-muted)",
            }}
          >
            <span>0시</span>
            <span>6시</span>
            <span>12시</span>
            <span>18시</span>
            <span>23시</span>
          </div>
        </section>

        <section style={card}>
          <SectionHead
            Icon={DoorOpen}
            tint="#ef4444"
            title="어느 페이지에서 나갔나요?"
            desc="고객이 마지막으로 보고 떠난 페이지"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            {exitRows.length === 0 && (
              <p
                className="c-muted"
                style={{ margin: 0, fontSize: "0.9rem" }}
              >
                데이터 없음
              </p>
            )}
            {exitRows.map(([path, cnt]) => (
              <BarRow
                key={path}
                label={pageName(path)}
                color="#ef4444"
                value={cnt}
                max={maxExit}
                right={`${cnt}회 (${exitTotal ? Math.round((cnt / exitTotal) * 100) : 0}%)`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/** /admin/traffic — 방문 기록을 불러와 TrafficView 로 */
export default function TrafficManager() {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch<PageView[]>("/api/admin/analytics?days=30");
      if (ok && Array.isArray(data)) setPageViews(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 화면 진입 시 한 번 불러온다
    load();
  }, []);

  return <TrafficView pageViews={pageViews} loading={loading} onRefresh={load} />;
}
