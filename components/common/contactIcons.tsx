/**
 * 상담 채널 아이콘 — 플로팅 버튼(FloatingContact) · 문의 페이지 연락 카드(ContactChannels) 공용
 * - 크기·색은 className 으로 지정 (수화기는 fill-* stroke-* 로 색, 말풍선은 카카오 갈색 고정)
 */
/** 수화기 — 채움 + 같은 색 외곽선으로 두껍게 (stroke 가 굵을수록 두꺼워 보임) */
export function PhoneIcon({ className, stroke = 1.6 }: { className: string; stroke?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" strokeWidth={stroke} strokeLinejoin="round" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />
    </svg>
  );
}

/** 카카오톡 말풍선 */
export function KakaoIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 28 26" aria-hidden>
      <path
        fill="#3C1E1E"
        d="M14 1C6.82 1 1 5.6 1 11.27c0 3.66 2.43 6.87 6.09 8.69l-1.24 4.55c-.11.4.35.72.7.49l5.43-3.6c.66.09 1.33.14 2.02.14 7.18 0 13-4.6 13-10.27S21.18 1 14 1"
      />
    </svg>
  );
}
