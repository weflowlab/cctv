/**
 * 이미지/영상 자리 표시용 플레이스홀더
 * - 원본 사이트의 <img>, <video>, <picture>, 배경이미지 자리에 사용한다.
 * - 실제 에셋이 준비되면 이 컴포넌트를 next/image 등으로 교체하면 된다.
 * - label 에는 원본 alt 텍스트(무슨 이미지인지)를, 크기는 원본 비율에 맞춰 className 으로 지정.
 */
type PlaceholderProps = {
  /** 어떤 이미지가 들어갈 자리인지 (원본 alt 텍스트 권장) */
  label: string;
  /** 크기/비율/모서리 등 레이아웃 지정용 Tailwind 클래스 */
  className?: string;
  /** 영상 자리면 "video", 아이콘 같은 작은 자리면 "icon" */
  kind?: "image" | "video" | "icon";
  /** 어두운 섹션 위에 놓일 때 */
  dark?: boolean;
};

export default function Placeholder({
  label,
  className = "",
  kind = "image",
  dark = false,
}: PlaceholderProps) {
  const tone = dark
    ? "bg-white/10 border-white/30 text-white/70"
    : "bg-zinc-100 border-zinc-300 text-zinc-500";

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden border border-dashed text-center ${tone} ${className}`}
    >
      {/* 아이콘 크기 자리에는 텍스트를 숨기고 툴팁만 남김 */}
      {kind === "icon" ? (
        <span title={label} className="text-[10px]">IMG</span>
      ) : (
        <span className="px-3 text-[12px] leading-[1.4] tracking-normal">
          {kind === "video" ? "▶ VIDEO" : "IMAGE"}
          <br />
          {label}
        </span>
      )}
    </div>
  );
}
