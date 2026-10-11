/**
 * 한글 → 로마자 (국어의 로마자 표기법 기준, 간이판) — 시공사례 주소(slug) 자동 생성용
 * - 음절을 초성·중성·종성으로 나눠 표에 맞춰 옮긴다: 강남 → gangnam, 해운대 → haeundae, 성남 → seongnam
 * - 연음·자음동화 같은 발음 규칙은 다루지 않는다 (지명은 대부분 이대로 맞고, 어긋나도 주소로 쓰는 데 문제없음)
 * - 한글이 아닌 영문·숫자는 소문자로 그대로 둔다
 */
const INITIAL = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
const MEDIAL = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
const FINAL = ["", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "l", "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];

export function romanize(text: string): string {
  let out = "";
  let prevFinal = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) {
      out += ch.toLowerCase();
      prevFinal = "";
      continue;
    }
    const i = Math.floor(code / 588);
    const m = Math.floor((code % 588) / 28);
    const f = code % 28;
    // ㄹ 받침 뒤 ㄹ 은 l (울릉 → ulleung)
    const initial = i === 5 && prevFinal === "l" ? "l" : INITIAL[i];
    out += initial + MEDIAL[m] + FINAL[f];
    prevFinal = FINAL[f];
  }
  return out;
}

/**
 * 지역 문자열에서 주소에 쓸 지명 한 단어 — 가장 작은 단위(마지막 단어)에서 시·군·구·동·읍·면을 뗀다
 * "서울 강남구" → gangnam, "경기 성남시 분당구" → bundang, "부산 해운대구" → haeundae
 */
export function regionSlug(region: string): string {
  const words = region.trim().split(/\s+/).filter(Boolean);
  const last = words[words.length - 1] ?? "";
  const name = last.length > 2 ? last.replace(/(특별시|광역시|시|군|구|동|읍|면)$/, "") : last;
  return romanize(name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
