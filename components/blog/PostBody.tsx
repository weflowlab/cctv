/**
 * 블로그 상세 본문 (원본 sc-fd6653c0-0: 에디터 HTML 을 dangerouslySetInnerHTML 로 렌더)
 * - 샘플 글(why-buy-cctv-not-rental)은 원본 본문 내용을 JSX 로 그대로 옮겼다.
 * - 그 외 slug 는 같은 템플릿(요약 박스 → 소제목/이미지/문단 → FAQ)에 제목·요약만 바꾼 더미 본문.
 * - 본문 안 이미지는 Placeholder 로 대체 (비율은 원본 이미지 실제 크기 기준).
 */
import type { CSSProperties } from "react";
import Placeholder from "@/components/common/Placeholder";
import type { BlogPost } from "./data";
import styles from "./postContent.module.css";

/** 원본 에디터가 문단마다 넣는 text-align: justify */
const J: CSSProperties = { textAlign: "justify" };

/** 본문 이미지 + 캡션 (원본 figure > a > img + figcaption) */
function Figure({ alt, caption, ratio }: { alt: string; caption?: string; ratio: string }) {
  return (
    <figure>
      <Placeholder label={alt} className={`w-full ${ratio}`} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** 샘플 글: 정수기는 렌탈해도, CCTV는 렌탈하지 마세요 (원본 본문 그대로) */
function SampleArticle() {
  return (
    <>
      {/* ===== 요약 박스: 💡 오늘의 핵심 내용 ===== */}
      <blockquote>
        <p style={{ textAlign: "left" }}>
          <strong>💡 오늘의 핵심 내용</strong>
        </p>
        <ul>
          <li>
            <p style={J}>
              <strong>CCTV 렌탈의 함정</strong>: 매달 렌탈료를 내도 케어 서비스 없고 소유권도 없음. 약정 끝나도 재계약 또는 반납해야 하며, 고장 시 수리비 별도 청구
            </p>
          </li>
          <li>
            <p style={J}>
              <strong>렌탈 vs 구매 비용 비교</strong>: 2년 차부터 구매가 렌탈보다 저렴. 5년 사용 시 키퍼 구매가 렌탈 대비 200만 원 이상 절감
            </p>
          </li>
          <li>
            <p style={J}>
              <strong>키퍼의 합리적 구매 옵션</strong>: 투명한 온라인 가격 공개 + 무이자 개월 할부 (앱 구매 시 36개월) + 할부 종료 후 월 비용 제로
            </p>
          </li>
          <li>
            <p style={J}>
              <strong>추가 비용 없는 완전 소유</strong>: 설치비·수리비·보험료 별도 청구 없음. 30년 업력 한화비전의 검증된 품질로 평생 내 자산으로 사용 가능
            </p>
          </li>
        </ul>
      </blockquote>

      {/* ===== 본문 1: 케어 서비스 없는 CCTV 렌탈 ===== */}
      <h2>케어 서비스 없는 CCTV 렌탈, 왜 매달 렌탈료를 납부하시나요?</h2>
      <Figure
        alt="CCTV를 렌탈할지 구매할지 고민하는 자영업자 / AI 생성"
        caption="CCTV를 렌탈할지 구매할지 고민하는 자영업자 / AI 생성"
        ratio="aspect-[976/768]"
      />
      <p style={J}>
        매장에 있는 정수기, 렌탈하신 사장님들 많으실 텐데요. 아마 구매할 때 가격이 부담스럽기도 하고 주기적으로 필터를 교체하고 청소해주는 ‘케어 서비스’ 때문에 빌리셨을 거예요.
      </p>
      <p style={J}>그렇다면 CCTV는 왜 렌탈하고 계시나요? CCTV도 매달 해주는 케어 서비스가 필요할까요?</p>
      <p style={J}>
        정수기나 공기청정기와 달리, CCTV는 한번 설치하면 특별한 관리가 거의 필요 없는 장비입니다. 그런데도 상당수의 사장님이 초기 비용 부담 때문에 렌탈을 선택하시죠. 월 약 6만 원, 작은 돈 같지만 3년이면 200만 원이 넘는 큰 금액이 됩니다.
      </p>

      {/* ===== 본문 2: 렌탈 vs 구매 비교 ===== */}
      <h2 style={J}>렌탈 서비스, 정수기같은 생활가전은 이득이지만 CCTV는 손해예요.</h2>
      <h3 style={J}>매달 몇 만원 씩 내는데 소유권도 관리도 없는 CCTV 렌탈 서비스</h3>
      <p style={J}>
        CCTV 렌탈료에는 &apos;관리비&apos;가 포함되어 있다고 생각하기 쉽지만, 실상은 장비 대여료에 불과한 경우가 대부분입니다. 심지어 3년이나 5년의 긴 약정이 끝나도 장비의 소유권은 사장님에게 이전되지 않는 조건이 많아요. 약정이 끝나면 장비를 반납하거나, 월 이용료를 계속 내면서 재계약을 해야 하는 구조죠.
      </p>
      <p style={J}></p>
      <p style={J}>
        심지어 렌탈 기간에 장비가 고장 나면 수리비나 A/S 비용이 별도로 청구되는 일도 적지 않습니다. CCTV는 설치 후 물리적 관리가 거의 필요 없는 고정형 장비임에도, 관리비를 내는 것 같은데 정작 필요할 때 추가 비용이 발생하는 셈이에요.
      </p>
      <h3 style={J}>렌탈 vs 구매, 기간별 총비용 비교로 보는 합리적 선택</h3>
      <p style={J}>
        이렇듯 CCTV 렌탈은 할부 구매보다 훨씬 비싼 이자를 내는 셈이고, 오랜 기간 돈을 내도 최종적으로 사장님의 자산으로 남지 않아요. 그렇다면 구체적인 비용 차이를 한번 살펴볼까요?
      </p>
      <Figure alt="렌탈 vs 구매 기간별 총비용 비교 표" ratio="aspect-[972/315]" />
      <p style={J}>
        표에서 보듯, 2년 차부터 렌탈 비용은 구매 비용을 역전하기 시작해 5년이면 260만 원 이상의 차이가 발생합니다. 따라서 장기적으로 보면 구매가 훨씬 경제적인 선택이라고 할 수 있어요.
      </p>

      {/* ===== 본문 3: Keeper 구매 이점 3가지 ===== */}
      <h2 style={J}>한화비전 Keeper CCTV 구매하면 이득보는 3가지 이유</h2>
      <h3 style={J}>1. 명확한 가격을 온라인에서 바로 확인할 수 있어요.</h3>
      <p style={J}>
        복잡한 상담이나 불투명한 견적 대신, 키퍼는 웹사이트에서 바로 확인할 수 있는 명확한 가격을 제공해요. 내 매장에 필요한 카메라 대수를 직접 선택하면 총 비용이 실시간으로 바로 나옵니다. 숨겨진 비용이나 복잡한 계약 조건 없이 모든 가격 정책이 투명하게 공개되어 있어서 안심하고 선택할 수 있죠.
      </p>
      <Figure
        alt="온라인으로 투명하게 가격 확인이 가능한 한화비전 Keeper"
        caption="온라인으로 투명하게 가격 확인이 가능한 한화비전 Keeper"
        ratio="aspect-[761/698]"
      />
      <h3 style={J}>2. 무이자 할부로 초기 부담은 낮추고, 소유권은 바로 가질 수 있어요.</h3>
      <p style={J}>
        초기 비용 때문에 렌탈을 고민하셨다면, 키퍼의 무이자 24개월 할부가 합리적인 대안이 될 거예요. 렌탈처럼 매달 나눠서 내지만, 24개월 후에는 장비가 완전히 사장님 소유가 되거든요. 게다가 키퍼 앱에서 구매하시면 무이자 36개월 할부까지 가능해요. 큰 목돈 없이도 글로벌 보안 기업 한화비전의 고품질 CCTV를 설치하실 수 있습니다.
      </p>
      <h3 style={J}>3. 구매 후에는 월 비용 ZERO, 평생 추가 지출도 없어요.</h3>
      <Figure
        alt="다양한 혜택으로 추가적인 지출을 방지하는 한화비전 Keeper"
        caption="다양한 혜택으로 추가적인 지출을 방지하는 한화비전 Keeper"
        ratio="aspect-[627/245]"
      />
      <p style={J}>
        CCTV 렌탈은 3년, 5년 약정이 끝나도 재계약을 하거나 계속 월 이용료를 내야 하는 경우가 많습니다. 반면에 키퍼는 할부 기간이 끝나면 이후 월 비용 지출이 종료돼요. 약정 기간이나 위약금, 매달 나가는 고정비 걱정 없이 평생 내 자산으로 안심하고 사용할 수 있습니다.
      </p>
      <p style={J}></p>
      <p style={J}>
        게다가 설치비, 수리비, 보험료도 별도로 청구되지 않으니, 장기적으로 매장을 운영할 계획이라면 압도적인 경제성을 경험하실 수 있어요.
      </p>

      {/* ===== 마무리 + 견적 링크 ===== */}
      <h2 style={J}>합리적인 CCTV 설치, 이제 Keeper로 시작하세요</h2>
      <p style={J}>
        CCTV는 정수기처럼 매달 관리가 필요한 가전이 아닙니다. 소유권도 없는 렌탈로 소중한 운영비를 낭비하기보다는, 합리적인 비용으로 내 매장의 든든한 자산을 만들어보세요.
      </p>
      <p style={J}></p>
      <p style={J}>
        30년 업력의 한화비전이 만든 키퍼는 제조부터 설치까지 전 과정을 한화비전이 담당해 검증된 품질을 자랑합니다.&nbsp;선명한 화질과 안정적인 성능으로 사장님의 매장을 24시간 지키며, 직원 관리와 비용 절감까지 한 번에 해결해드려요.
      </p>
      <p style={J}>사장님의 현명한 선택, 키퍼가 함께하겠습니다.</p>
      <h3 style={J}>
        <a target="_blank" rel="noopener noreferrer nofollow" href="/plan">
          2년 뒤 월 0원이 되는 내 CCTV, 30초 견적 바로 확인하기
        </a>
      </h3>

      {/* ===== 본문 FAQ ===== */}
      <h2 style={J}>FAQ</h2>
      <h3 style={J}>Q1. CCTV 렌탈 vs 구매, 어떤 게 더 저렴한가요?</h3>
      <p style={J}>
        <strong>A.</strong>&nbsp;2년 이상 장기 사용 시 구매 방식이 저렴합니다. 렌탈은 5년이면 405만 원, 키퍼 구매는 144만 원으로 261만 원 차이가 나요.
      </p>
      <h3 style={J}>Q2. 매장 CCTV 설치 비용은 얼마나 드나요?</h3>
      <p style={J}>
        <strong>A.</strong>&nbsp;보통 카메라 4대 기준 15만원 내외이지만, 키퍼 CCTV는 무료로 설치가 가능합니다.
      </p>
      <h3 style={J}>Q3. 업소용 CCTV, 초기 비용 부담 없이 구매할 수 있나요?</h3>
      <p style={J}>
        <strong>A.</strong>&nbsp;키퍼는 최대 무이자 36개월 할부(앱 구매 시에만 적용)로 렌탈처럼 매달 나눠 내되, 할부 종료 후 완전 소유 + 월 비용 제로입니다.
      </p>
      <h3 style={J}>Q4. CCTV 가격 비교 시 꼭 확인해야 할 게 뭔가요?</h3>
      <p style={J}>
        <strong>A.</strong>&nbsp;① 설치비 포함 여부 ② 월 관리비 유무 ③ 약정 후 소유권 이전 여부 ④ 수리비 별도 청구 여부를 확인하세요. 키퍼는 모두 투명하게 공개합니다.
      </p>
    </>
  );
}

/** 샘플 외 글: 같은 템플릿에 제목/요약만 바꾼 더미 본문 */
function DummyArticle({ post }: { post: BlogPost }) {
  return (
    <>
      {/* ===== 요약 박스 (더미: 목록 요약문 사용) ===== */}
      <blockquote>
        <p style={{ textAlign: "left" }}>
          <strong>💡 오늘의 핵심 내용</strong>
        </p>
        <ul>
          <li>
            <p style={J}>{post.summary}</p>
          </li>
        </ul>
      </blockquote>

      {/* ===== 본문 (더미) ===== */}
      <h2>{post.title}</h2>
      <Figure alt={post.title} caption={post.title} ratio="aspect-[976/768]" />
      <p style={J}>
        본문 준비 중입니다. 이 영역에는 원본 블로그 글의 본문(소제목, 문단, 이미지, 표 등)이 들어갑니다.
      </p>
      <p style={J}>{post.summary}</p>
      <h3 style={J}>소제목 예시</h3>
      <p style={J}>
        문단 예시입니다. 실제 콘텐츠는 CMS(API) 연동 시 에디터 HTML 로 교체됩니다.
      </p>
      <Figure alt="본문 이미지" ratio="aspect-[16/9]" />
      <h2 style={J}>FAQ</h2>
      <h3 style={J}>Q1. 질문 예시</h3>
      <p style={J}>
        <strong>A.</strong>&nbsp;답변 예시입니다.
      </p>
    </>
  );
}

export const SAMPLE_SLUG = "why-buy-cctv-not-rental";

export default function PostBody({ post }: { post: BlogPost }) {
  return (
    <div className={styles.content}>
      {post.slug === SAMPLE_SLUG ? <SampleArticle /> : <DummyArticle post={post} />}
    </div>
  );
}
