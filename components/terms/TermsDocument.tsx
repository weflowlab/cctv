/**
 * TermsDocument - 약관 본문 렌더러 (서버 컴포넌트)
 *
 * 원본(keeper.ceo /terms/*) 동작:
 * - 페이지 컴포넌트가 Word/Google Docs 에서 export 한 HTML 문자열을 DOMPurify 로 정제한 뒤
 *   `max-width:1000px; margin:0 auto; padding:60px 20px;` 컨테이너 안에 dangerouslySetInnerHTML 로 그대로 출력.
 * - 탭/버전 선택/목차 등 별도 인터랙션은 없음 (page 청크 JS 확인 결과 useEffect 로 sanitize 후 주입하는 로직뿐).
 *
 * 이 클론에서는 HTML 을 그대로 주입하지 않고, 파이썬으로 추출한 구조화 데이터(TermsBlock[])를
 * 원문 문서 스타일(맑은 고딕 10pt≈13.33px, 검정 텍스트, 1pt 검정 테두리 표 등)에 맞춰 렌더합니다.
 */
import type { TermsBlock, TermsCell, TermsRun } from "./data/types";

/** 텍스트 조각 렌더: 굵은 글씨는 <strong> */
function Runs({ runs }: { runs: TermsRun[] }) {
  return (
    <>
      {runs.map((r, i) =>
        typeof r === "string" ? (
          <span key={i}>{r}</span>
        ) : (
          <strong key={i} className="font-bold">
            {r.b}
          </strong>
        ),
      )}
    </>
  );
}

/** 표 셀 렌더: 셀 내부 문단(줄)을 블록으로 쌓음 */
function Cell({ cell, head }: { cell: TermsCell; head: boolean }) {
  const Tag = head ? "th" : "td";
  return (
    <Tag
      rowSpan={cell.rowSpan}
      colSpan={cell.colSpan}
      className={`border border-black px-[7px] py-[4px] align-top text-left ${
        head ? "bg-[#f2f2f2] font-bold text-center align-middle" : "font-normal"
      }`}
    >
      {cell.lines.map((line, i) => (
        <p key={i} className="whitespace-pre-line">
          <Runs runs={line} />
        </p>
      ))}
    </Tag>
  );
}

/** 표 블록: 모바일에서는 가로 스크롤 */
function Table({ block }: { block: Extract<TermsBlock, { t: "table" }> }) {
  const [first, ...rest] = block.rows;
  const bodyRows = block.head ? rest : block.rows;
  return (
    <div className="my-[8px] w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse border border-black text-[12px] leading-[1.5] lg:text-[13.33px]">
        {block.head && first && (
          <thead>
            <tr>
              {first.map((c, i) => (
                <Cell key={i} cell={c} head />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <Cell key={ci} cell={c} head={false} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 단일 블록 렌더 */
function Block({ block, paragraphGap }: { block: TermsBlock; paragraphGap: boolean }) {
  switch (block.t) {
    case "gap":
      // 원문 빈 문단 → 한 줄 높이 간격
      return <div aria-hidden className="h-[1.6em]" />;
    case "h":
      if (block.level === 1) {
        // 문서 제목: 16pt 굵게 가운데
        return (
          <h1 className="pb-[8px] pt-[16px] text-center text-[18px] font-bold leading-[1.3] lg:text-[21.33px]">
            <Runs runs={block.runs} />
          </h1>
        );
      }
      if (block.level === 2) {
        // 대제목: 굵게 + 밑줄 (Google Docs h2 스타일)
        return (
          <h2 className="pb-[10px] pt-[6px] font-bold underline underline-offset-[3px]">
            <Runs runs={block.runs} />
          </h2>
        );
      }
      // 소제목: 밑줄
      return (
        <h3 className="pb-[6px] pt-[4px] underline underline-offset-[3px]">
          <Runs runs={block.runs} />
        </h3>
      );
    case "p":
      return (
        <p
          className={`whitespace-pre-line text-justify ${paragraphGap ? "pb-[10px]" : ""} ${
            block.align === "center" ? "text-center" : ""
          } ${
            block.indent ? "pl-[20px] lg:pl-[28px]" : ""
          }`}
        >
          <Runs runs={block.runs} />
        </p>
      );
    case "li": {
      // 목록 항목: 마커(번호 또는 기호) + 내어쓰기
      const marker = block.n !== undefined ? `${block.n}.` : block.marker ?? "•";
      return (
        <div
          className={`flex gap-[6px] pb-[4px] ${block.level > 0 ? "pl-[40px] lg:pl-[60px]" : "pl-[12px] lg:pl-[20px]"}`}
        >
          <span className={`shrink-0 ${block.n !== undefined ? "min-w-[18px]" : "min-w-[12px]"}`}>{marker}</span>
          <span className="whitespace-pre-line text-justify">
            <Runs runs={block.runs} />
          </span>
        </div>
      );
    }
    case "table":
      return <Table block={block} />;
  }
}

/**
 * 약관 문서 전체
 * @param blocks 구조화된 약관 본문
 * @param paragraphGap 문단마다 아래 여백(원문 Google Docs 문단 padding-bottom 8pt)을 줄지 여부 — 개인정보처리방침용
 */
export default function TermsDocument({
  blocks,
  paragraphGap = false,
}: {
  blocks: TermsBlock[];
  paragraphGap?: boolean;
}) {
  return (
    // ===== 약관 컨테이너: 원본 sc-c77a98c1-0 (max-width 1000px, 가운데 정렬, padding 60px 20px) =====
    <div className="mx-auto max-w-[1000px] px-[20px] py-[60px]">
      {/* ===== 약관 본문: 원문 문서 기본 서체 10pt, 검정, 줄간격 1.6 ===== */}
      <article className="break-keep text-[13.33px] leading-[1.6] text-black">
        {blocks.map((b, i) => (
          <Block key={i} block={b} paragraphGap={paragraphGap} />
        ))}
      </article>
    </div>
  );
}
