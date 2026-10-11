"use client";

/**
 * 전체 현황 (/admin) — weflow "전체 현황" 탭과 같은 구성
 * - 요약 카드: 오늘 문의 · 대기 · 진행중 · 전체 문의
 * - 최근 문의 10건 (상태 변경·삭제 가능) → [전체 보기] 문의 관리
 */
import { useRouter } from "next/navigation";
import { InquiryTable, RefreshButton, useInquiries } from "./InquiryManager";
import { PageHead, StatCard, withinPeriod } from "./ui";

export default function AdminDashboard() {
  const router = useRouter();
  const { inquiries, loading, error, load, updateStatus, remove } = useInquiries();
  const today = withinPeriod(inquiries, { key: "today" }).length;
  const count = (s: string) => inquiries.filter((i) => i.status === s).length;

  return (
    <>
      <PageHead title="전체 현황" action={<RefreshButton loading={loading} onClick={load} />} />
      <div className="stat-grid-4">
        <StatCard label="오늘 들어온 문의" value={today} color="teal" />
        <StatCard label="대기중 문의" value={count("pending")} />
        <StatCard label="진행중 문의" value={count("in_progress")} color="teal" />
        <StatCard label="전체 문의" value={inquiries.length} />
      </div>
      {error && <p style={{ margin: 0, color: "var(--danger)" }}>{error}</p>}
      <InquiryTable
        title="최근 문의"
        rows={inquiries.slice(0, 10)}
        loading={loading}
        onStatusChange={updateStatus}
        onDelete={remove}
        onSeeAll={() => router.push("/admin/inquiries")}
      />
    </>
  );
}
