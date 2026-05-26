import { useState, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

/* ── 실습 시나리오 ── */
interface Scenario {
  id: number;
  category: string;
  title: string;
  situation: string;
  goal: string;
  keywords: string[];        // 포함 시 가점 키워드
  roleKeywords: string[];    // 역할 설정 키워드
  formatKeywords: string[];  // 출력 형식 키워드
  exampleAnswer: string;     // 모범 프롬프트 예시
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    category: 'React UI',
    title: 'React 컴포넌트 생성 요청',
    situation: '할 일 관리 앱의 메인 페이지를 만들어야 합니다. 상단에 입력 폼, 하단에 할 일 목록이 표시되고, 각 항목에 체크박스와 삭제 버튼이 있어야 합니다.',
    goal: 'AI에게 React 컴포넌트를 요청하는 프롬프트를 작성하세요.',
    keywords: ['React', '컴포넌트', '할 일', 'Todo', '입력', '목록', '체크박스', '삭제'],
    roleKeywords: ['개발자', '프론트엔드', '전문가', '역할', '엔지니어'],
    formatKeywords: ['코드', 'TypeScript', 'CSS', '파일', '형식', '구조', '컴포넌트'],
    exampleAnswer: `너는 React + TypeScript 프론트엔드 전문 개발자야.\n할 일 관리 앱의 메인 페이지 컴포넌트를 만들어줘.\n\n[기능]\n- 상단: 할 일 입력 폼 (텍스트 입력 + 추가 버튼)\n- 하단: 할 일 목록 (체크박스 + 제목 + 삭제 버튼)\n- 완료된 항목은 취소선으로 표시\n- useState로 상태 관리\n\n[조건]\n- TypeScript 사용\n- 모던하고 깔끔한 CSS 포함\n- 반응형 디자인 (모바일 대응)\n- TodoItem은 별도 컴포넌트로 분리`,
  },
  {
    id: 2,
    category: 'API 설계',
    title: 'REST API 엔드포인트 설계',
    situation: '할 일 관리 앱의 백엔드 API를 설계해야 합니다. 할 일 CRUD와 사용자 인증 기능이 필요하며, Supabase를 백엔드로 사용합니다.',
    goal: 'REST API 엔드포인트를 설계하는 프롬프트를 작성하세요.',
    keywords: ['API', 'REST', 'CRUD', '엔드포인트', '인증', 'Supabase', '설계', 'JSON'],
    roleKeywords: ['백엔드', '개발자', '아키텍트', '역할', '전문가'],
    formatKeywords: ['표', '목록', '항목', '구성', '형식', 'URL', 'HTTP'],
    exampleAnswer: `너는 백엔드 API 설계 전문 아키텍트야.\n할 일 관리 앱의 REST API를 설계해줘.\n\n[리소스]\n- todos: 할 일 (CRUD)\n- auth: 사용자 인증 (회원가입/로그인/로그아웃)\n\n[조건]\n- Supabase 기반\n- JWT 토큰 인증\n- RLS(Row Level Security) 적용\n\n[출력 형식]\n표 형태 (HTTP 메서드 / URL / 설명 / 인증 필요 여부 / 요청 Body / 응답 예시)\n총 10개 이내의 엔드포인트`,
  },
  {
    id: 3,
    category: 'Streamlit',
    title: 'Streamlit 데이터 대시보드 생성',
    situation: 'KDN 전력사용량 CSV 데이터를 업로드하여 월별 추이, 지역별 비교, 핵심 KPI를 시각화하는 Streamlit 대시보드를 만들어야 합니다.',
    goal: 'Streamlit 대시보드를 만드는 프롬프트를 작성하세요.',
    keywords: ['Streamlit', '대시보드', '데이터', 'CSV', '시각화', '차트', '전력', 'pandas'],
    roleKeywords: ['개발자', 'Python', '전문가', '역할', '데이터'],
    formatKeywords: ['코드', 'Python', '파일', '형식', '구조', '차트', '그래프'],
    exampleAnswer: `너는 Python Streamlit 전문 개발자야.\nKDN 전력사용량 분석 대시보드를 만들어줘.\n\n[기능]\n- CSV 파일 업로드 (st.file_uploader)\n- 사이드바: 기간 필터, 지역 선택\n- 상단: 핵심 KPI 카드 (총 사용량, 전월 대비, 최대 부하)\n- 본문: 월별 추이 라인 차트, 지역별 막대 차트\n- 하단: 데이터 테이블 (st.dataframe)\n\n[조건]\n- pandas로 데이터 처리\n- matplotlib 또는 plotly로 차트 생성\n- st.columns로 레이아웃 구성\n- st.metric으로 KPI 표시\n- 한글 폰트 설정 포함`,
  },
  {
    id: 4,
    category: '기획',
    title: '웹 서비스 요구사항 정의서',
    situation: 'KDN 사내 업무 효율화를 위한 AI 챗봇 웹앱을 기획하고 있습니다. 직원들이 사내 규정, FAQ, 업무 매뉴얼을 질문하면 AI가 답변하는 서비스입니다.',
    goal: '웹 서비스 요구사항 정의서를 요청하는 프롬프트를 작성하세요.',
    keywords: ['요구사항', '기획', '기능', '화면', 'AI', '챗봇', '사용자', '서비스'],
    roleKeywords: ['기획자', 'PM', '전문가', '역할', '아키텍트'],
    formatKeywords: ['페이지', '구성', '형식', '목록', '분량', '목차', '표'],
    exampleAnswer: `너는 웹 서비스 기획 전문가야.\nKDN 사내 AI 챗봇 웹앱의 요구사항 정의서를 작성해줘.\n\n[서비스 개요]\n- 대상: KDN 직원 (약 3,000명)\n- 목적: 사내 규정, FAQ, 업무 매뉴얼 AI 검색/답변\n- 기술: React + Supabase + ChatGPT API\n\n[출력 구조]\n1. 프로젝트 개요 (목적, 대상, 기대효과)\n2. 기능 목록 (필수/선택 구분, 우선순위)\n3. 화면 목록 및 와이어프레임 설명\n4. 데이터 모델 (테이블 설계)\n5. API 엔드포인트\n6. 기술 스택 및 아키텍처\n\n[조건]\n- A4 3페이지 이내\n- 비기술직도 이해할 수 있는 용어 사용`,
  },
  {
    id: 5,
    category: 'Python 분석',
    title: 'Python 데이터 분석 코드 요청',
    situation: 'KDN 전력 설비 장애 이력 데이터(Excel)를 분석하여 장애 유형별 빈도, 월별 추이, 원인 분석을 수행하는 Python 코드가 필요합니다.',
    goal: 'Python 데이터 분석 코드를 요청하는 프롬프트를 작성하세요.',
    keywords: ['Python', '분석', '데이터', 'pandas', 'Excel', '장애', '통계', '시각화'],
    roleKeywords: ['데이터', '분석가', '전문가', '역할', 'Python'],
    formatKeywords: ['코드', 'Python', '파일', '형식', '그래프', '차트', '출력'],
    exampleAnswer: `너는 Python 데이터 분석 전문가야.\nKDN 전력 설비 장애 이력 데이터를 분석하는 코드를 작성해줘.\n\n[데이터 구조]\n- 파일: Excel (.xlsx)\n- 컬럼: 일시, 설비유형, 장애유형, 지역, 복구시간(분), 영향범위\n\n[분석 항목]\n1. 장애 유형별 발생 빈도 (파이차트)\n2. 월별 장애 추이 (라인차트)\n3. 지역별 장애 분포 (막대차트)\n4. 평균 복구시간 분석\n5. 장애 원인 Top 5\n\n[조건]\n- pandas, matplotlib, seaborn 사용\n- 한글 폰트 설정 포함\n- 각 분석 결과를 PNG로 저장\n- 요약 통계를 print로 출력`,
  },
  {
    id: 6,
    category: 'Claude API',
    title: 'Claude API 연동 Streamlit 챗봇',
    situation: 'Streamlit 앱에 Claude API를 연동하여 KDN 업무 관련 질의응답을 처리하는 AI 챗봇을 만들어야 합니다. 대화 이력을 유지하고, 전력IT 전문가 역할을 수행해야 합니다.',
    goal: 'Claude API를 연동한 Streamlit 챗봇 코드를 요청하는 프롬프트를 작성하세요.',
    keywords: ['Claude', 'API', 'Streamlit', '챗봇', 'AI', '대화', '연동', '전력'],
    roleKeywords: ['AI', '개발자', '전문가', '역할', 'Python'],
    formatKeywords: ['코드', 'Python', '파일', '형식', '구조', 'Streamlit', '설정'],
    exampleAnswer: `너는 Python + Streamlit + Claude API 전문 개발자야.\nKDN 업무용 AI 챗봇 Streamlit 앱을 만들어줘.\n\n[기능]\n- Claude API 연동 (anthropic 라이브러리)\n- st.chat_input / st.chat_message로 대화 UI\n- st.session_state로 대화 이력 관리\n- System Prompt: "너는 KDN 전력IT 전문가야"\n- 사이드바: API 키 입력, 대화 초기화 버튼\n\n[조건]\n- anthropic Python SDK 사용\n- 스트리밍 응답 처리\n- 에러 핸들링 (API 키 미입력, 호출 실패)\n- requirements.txt 포함\n\n[출력]\n- app.py (전체 코드)\n- requirements.txt\n- 실행 방법 안내`,
  },
];

/* ── SCORE 기반 채점 기준 ── */
interface ScoreResult {
  total: number;
  situation: number;    // S: 상황/맥락 (0~20)
  context: number;      // C: 구체적 데이터/정보 (0~20)
  objective: number;    // O: 명확한 목표/지시 (0~20)
  responseFormat: number; // R: 출력 형식 지정 (0~20)
  extras: number;       // E: 역할 설정, 예시, 제약조건 등 (0~20)
  feedback: string[];
  grade: string;
}

function evaluatePrompt(input: string, scenario: Scenario): ScoreResult {
  const text = input.toLowerCase().replace(/\s+/g, ' ');
  const len = input.trim().length;
  const feedback: string[] = [];

  // ── S: 상황/맥락 (0~20) ──
  let situation = 0;
  const matchedKw = scenario.keywords.filter(kw => text.includes(kw.toLowerCase()));
  if (matchedKw.length >= 5) situation = 20;
  else if (matchedKw.length >= 3) situation = 15;
  else if (matchedKw.length >= 2) situation = 10;
  else if (matchedKw.length >= 1) situation = 5;
  if (situation < 15) feedback.push(`상황/맥락 키워드를 더 포함하세요 (예: ${scenario.keywords.slice(0, 3).join(', ')})`);

  // ── C: 구체적 데이터/정보 (0~20) ──
  let context = 0;
  const hasNumbers = /\d+/.test(input);
  const hasSpecific = /[가-힣]+[시군구도]|[가-힣]+(주|건|개|명|억|만|원|%)/.test(input);
  const hasDateOrTime = /(20\d{2}|[0-9]+월|[0-9]+일|[0-9]+시간|[0-9]+분)/.test(input);
  const hasBrackets = /\[.+\]/.test(input);
  if (hasNumbers) context += 5;
  if (hasSpecific) context += 5;
  if (hasDateOrTime) context += 5;
  if (hasBrackets) context += 5;
  if (context < 10) feedback.push('구체적인 숫자, 날짜, 조건 등 데이터를 추가하면 점수가 올라갑니다');

  // ── O: 명확한 목표/지시 (0~20) ──
  let objective = 0;
  const hasAction = /(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출)/.test(input);
  const hasMultiTask = (input.match(/(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출)/g) || []).length;
  const hasClear = /(해줘|해주세요|부탁|하시오)/.test(input);
  if (hasAction) objective += 8;
  if (hasMultiTask >= 2) objective += 6;
  if (hasClear) objective += 3;
  if (len >= 100) objective += 3;
  objective = Math.min(objective, 20);
  if (objective < 10) feedback.push('"~작성해줘", "~분석해줘" 등 명확한 지시문을 포함하세요');

  // ── R: 출력 형식 지정 (0~20) ──
  let responseFormat = 0;
  const fmtMatched = scenario.formatKeywords.filter(kw => text.includes(kw.toLowerCase()));
  const hasStructure = /[1-9][.)]\s|[-·•]\s|#{1,3}\s|[①②③④⑤]/.test(input);
  const hasLength = /(페이지|문단|자|단어|이내|분량|줄|A4)/.test(input);
  if (fmtMatched.length >= 2) responseFormat += 8;
  else if (fmtMatched.length >= 1) responseFormat += 4;
  if (hasStructure) responseFormat += 6;
  if (hasLength) responseFormat += 6;
  responseFormat = Math.min(responseFormat, 20);
  if (responseFormat < 10) feedback.push('출력 형식(표, 목록, 분량 등)을 지정하면 더 좋은 결과를 얻을 수 있습니다');

  // ── E: 역할, 예시, 제약 (0~20) ──
  let extras = 0;
  const roleMatched = scenario.roleKeywords.filter(kw => text.includes(kw.toLowerCase()));
  const hasRole = /(너는|당신은|역할|~전문가|~담당자|~으로서)/.test(input);
  const hasConstraint = /(금지|하지 마|제외|제한|조건|주의|참고|단,)/.test(input);
  const hasExample = /(예[시를:]|예를 들|예컨대|다음과 같|sample|example)/.test(input);
  if (hasRole || roleMatched.length > 0) extras += 8;
  if (hasConstraint) extras += 4;
  if (hasExample) extras += 4;
  if (len >= 200) extras += 2;
  if (len >= 400) extras += 2;
  extras = Math.min(extras, 20);
  if (!hasRole && roleMatched.length === 0) feedback.push('"너는 ~전문가야" 등 역할 설정을 추가하세요');
  if (!hasConstraint) feedback.push('제약조건(분량, 어투, 제외사항 등)을 추가하면 더 정확한 결과를 얻습니다');

  const total = situation + context + objective + responseFormat + extras;

  // 길이 보너스/페널티 반영 (총점에 직접 가감은 안 함, 피드백만)
  if (len < 50) feedback.unshift('프롬프트가 너무 짧습니다. 최소 100자 이상으로 작성해보세요.');
  if (len >= 300 && total >= 60) feedback.push('프롬프트 길이와 구조 모두 우수합니다!');

  let grade = 'D';
  if (total >= 90) grade = 'S';
  else if (total >= 80) grade = 'A';
  else if (total >= 65) grade = 'B';
  else if (total >= 50) grade = 'C';

  return { total, situation, context, objective, responseFormat, extras, feedback, grade };
}

/* ── 컴포넌트 ── */
const Practice = (): ReactElement => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [showExample, setShowExample] = useState(false);
  const [history, setHistory] = useState<{ scenarioId: number; score: number; grade: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scenario = SCENARIOS.find(s => s.id === selectedId) || null;

  const handleEvaluate = () => {
    if (!scenario || !input.trim()) return;
    const res = evaluatePrompt(input, scenario);
    setResult(res);
    setHistory(prev => {
      const next = [...prev, { scenarioId: scenario.id, score: res.total, grade: res.grade }];
      return next.slice(-20); // 최근 20개까지만
    });
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setShowExample(false);
  };

  const handleSelectScenario = (id: number) => {
    setSelectedId(id);
    setInput('');
    setResult(null);
    setShowExample(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const avgScore = history.length > 0
    ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length)
    : 0;

  const gradeColor = (grade: string) => {
    if (grade === 'S') return '#D4760A';
    if (grade === 'A') return '#1B2A4A';
    if (grade === 'B') return '#00855A';
    if (grade === 'C') return '#5B2C8B';
    return '#999';
  };

  const barWidth = (v: number) => `${(v / 20) * 100}%`;

  return (
    <>
      <SEOHead title="바이브코딩 실습 | KDN Vibe Coding" description="프롬프트 작성 실습 및 자동 채점" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">AI Practice</div>
          <h2>프롬프트 작성 실습</h2>
          <p>업무 시나리오에 맞는 프롬프트를 작성하고, SCORE 기준으로 자동 채점합니다</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="practice-layout">

            {/* ── 왼쪽 사이드바 ── */}
            <aside className="practice-sidebar">
              {/* 시나리오 목록 */}
              <div className="ps-block">
                <h4 className="ps-label">실습 시나리오</h4>
                <ul className="ps-steps" style={{ gap: '4px' }}>
                  {SCENARIOS.map(s => (
                    <li key={s.id} style={{ cursor: 'pointer' }} onClick={() => handleSelectScenario(s.id)}>
                      <button
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          background: selectedId === s.id ? 'var(--navy-50)' : 'transparent',
                          border: selectedId === s.id ? '1px solid var(--navy-800)' : '1px solid var(--line)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                      >
                        <span style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: selectedId === s.id ? 'var(--ink-surface)' : 'var(--navy-100)',
                          color: selectedId === s.id ? 'var(--gold)' : 'var(--navy-700)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 800, flexShrink: 0,
                        }}>
                          {String(s.id).padStart(2, '0')}
                        </span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)' }}>{s.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>{s.category}</div>
                        </div>
                        {history.find(h => h.scenarioId === s.id) && (
                          <span style={{
                            marginLeft: 'auto', fontSize: '11px', fontWeight: 800, flexShrink: 0,
                            color: gradeColor(history.filter(h => h.scenarioId === s.id).slice(-1)[0].grade),
                          }}>
                            {history.filter(h => h.scenarioId === s.id).slice(-1)[0].score}점
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SCORE 채점 기준 */}
              <div className="ps-block">
                <h4 className="ps-label">SCORE 채점 기준</h4>
                <ul className="ps-rules">
                  <li><strong>S</strong> &mdash; 상황/맥락 (20점)</li>
                  <li><strong>C</strong> &mdash; 구체적 정보 (20점)</li>
                  <li><strong>O</strong> &mdash; 목표/지시 (20점)</li>
                  <li><strong>R</strong> &mdash; 출력 형식 (20점)</li>
                  <li><strong>E</strong> &mdash; 역할/제약 (20점)</li>
                </ul>
              </div>

              {/* 실습 현황 */}
              {history.length > 0 && (
                <div className="ps-block">
                  <h4 className="ps-label">실습 현황</h4>
                  <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--navy-800)' }}>{avgScore}<span style={{ fontSize: '14px', color: 'var(--gold)' }}>점</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>평균 점수 ({history.length}회 실습)</div>
                  </div>
                </div>
              )}
            </aside>

            {/* ── 오른쪽 메인 영역 ── */}
            <main className="practice-main">
              {!scenario ? (
                /* 시나리오 미선택 — 풍성한 안내 화면 */
                <div>
                  {/* 상단 인트로 배너 */}
                  <div style={{
                    padding: '36px 32px', marginBottom: '24px',
                    background: 'var(--ink-surface)', borderRadius: '16px',
                    color: '#fff',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                      PROMPT WRITING PRACTICE
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.4 }}>
                      업무 시나리오별<br />
                      <span style={{ color: 'var(--gold)' }}>프롬프트 작성 실습</span>
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.7, margin: 0 }}>
                      실제 업무 상황에 맞는 프롬프트를 직접 작성하고, SCORE 5가지 기준으로 자동 채점합니다.
                      왼쪽 사이드바에서 시나리오를 선택하거나, 아래 카드를 클릭해 시작하세요.
                    </p>
                  </div>

                  {/* 시나리오 선택 카드 그리드 */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '14px' }}>
                      <i className="fa-solid fa-list-check" style={{ color: 'var(--gold)', marginRight: '8px' }} />
                      실습 시나리오 선택
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                      {SCENARIOS.map(s => {
                        const icons: Record<string, string> = {
                          'React UI': 'fa-code', 'API 설계': 'fa-server', 'Streamlit': 'fa-chart-line',
                          '기획': 'fa-lightbulb', 'Python 분석': 'fa-chart-bar', 'Claude API': 'fa-robot',
                        };
                        const lastResult = history.filter(h => h.scenarioId === s.id).slice(-1)[0];
                        return (
                          <button
                            key={s.id}
                            onClick={() => handleSelectScenario(s.id)}
                            style={{
                              padding: '20px', background: 'var(--bg-white)',
                              border: '1px solid var(--line)', borderRadius: '12px',
                              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                              transition: 'all 0.2s', display: 'flex', gap: '14px', alignItems: 'flex-start',
                            }}
                          >
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                              background: 'var(--navy-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <i className={`fa-solid ${icons[s.category] || 'fa-file'}`} style={{ fontSize: '16px', color: 'var(--navy-800)' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)' }}>{s.category}</span>
                                {lastResult && (
                                  <span style={{
                                    fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '3px',
                                    background: 'var(--ink-surface)', color: 'var(--gold)',
                                  }}>{lastResult.grade} · {lastResult.score}점</span>
                                )}
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '4px' }}>{s.title}</div>
                              <div style={{
                                fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
                                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                              }}>{s.situation}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SCORE 채점 기준 안내 */}
                  <div style={{
                    padding: '24px 28px', background: 'var(--navy-50)',
                    borderRadius: '12px', borderLeft: '4px solid var(--gold)',
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '16px' }}>
                      <i className="fa-solid fa-star" style={{ color: 'var(--gold)', marginRight: '8px' }} />
                      SCORE 채점 기준 (각 20점, 총 100점)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                      {[
                        { key: 'S', label: '상황/맥락', desc: '배경과 맥락을 제시' },
                        { key: 'C', label: '구체적 정보', desc: '숫자·날짜·조건 포함' },
                        { key: 'O', label: '목표/지시', desc: '명확한 요청 지시문' },
                        { key: 'R', label: '출력 형식', desc: '표·목록·분량 지정' },
                        { key: 'E', label: '역할/제약', desc: '역할 부여·제약조건' },
                      ].map(item => (
                        <div key={item.key} style={{ textAlign: 'center' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto 8px',
                            background: 'var(--ink-surface)', color: 'var(--gold)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', fontWeight: 800,
                          }}>{item.key}</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '2px' }}>{item.label}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* 시나리오 설명 */}
                  <div style={{
                    padding: '24px 28px', marginBottom: '20px',
                    background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)',
                    borderRadius: '0 12px 12px 0',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{
                        fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                        background: 'var(--ink-surface)', color: 'var(--gold)',
                        borderRadius: '4px', letterSpacing: '0.05em',
                      }}>{scenario.category}</span>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-800)' }}>{scenario.title}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 8px' }}>
                      <strong style={{ color: 'var(--navy-800)' }}>상황:</strong> {scenario.situation}
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--navy-800)', fontWeight: 600, margin: 0, lineHeight: 1.7 }}>
                      <i className="fa-solid fa-bullseye" style={{ color: 'var(--gold)', marginRight: '6px' }} />
                      {scenario.goal}
                    </p>
                  </div>

                  {/* 프롬프트 입력 영역 */}
                  <div style={{
                    border: '1px solid var(--line)', borderRadius: '12px',
                    overflow: 'hidden', marginBottom: '20px', background: 'var(--bg-white)',
                  }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)' }}>
                        <i className="fa-solid fa-keyboard" style={{ color: 'var(--gold)', marginRight: '8px' }} />
                        프롬프트 작성
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {input.length}자
                      </div>
                    </div>
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => { setInput(e.target.value); setResult(null); }}
                      placeholder={`이 상황에 맞는 프롬프트를 작성해보세요.\n\n좋은 프롬프트 예시:\n"너는 ~전문가야. ~상황에서 ~를 작성해줘.\n[조건] ...\n[출력 형식] ..."`}
                      style={{
                        width: '100%', minHeight: '200px', padding: '20px',
                        border: 'none', outline: 'none', resize: 'vertical',
                        fontFamily: 'inherit', fontSize: '14px', lineHeight: 1.8,
                        background: 'var(--bg-white)', color: 'var(--text-primary)',
                        boxSizing: 'border-box',
                      }}
                    />
                    <div style={{
                      padding: '12px 20px', borderTop: '1px solid var(--line)',
                      display: 'flex', gap: '10px', justifyContent: 'flex-end',
                      background: 'var(--navy-50)',
                    }}>
                      <button
                        onClick={() => setShowExample(!showExample)}
                        style={{
                          padding: '8px 16px', fontSize: '13px', fontWeight: 600,
                          background: 'var(--bg-white)', color: 'var(--navy-800)',
                          border: '1px solid var(--line)', borderRadius: '6px',
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        <i className="fa-solid fa-lightbulb" style={{ marginRight: '6px', color: 'var(--gold)' }} />
                        {showExample ? '모범답안 숨기기' : '모범답안 보기'}
                      </button>
                      <button
                        onClick={handleReset}
                        style={{
                          padding: '8px 16px', fontSize: '13px', fontWeight: 600,
                          background: 'var(--bg-white)', color: 'var(--text-secondary)',
                          border: '1px solid var(--line)', borderRadius: '6px',
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        초기화
                      </button>
                      <button
                        onClick={handleEvaluate}
                        disabled={!input.trim()}
                        style={{
                          padding: '8px 24px', fontSize: '13px', fontWeight: 700,
                          background: input.trim() ? 'var(--ink-surface)' : 'var(--line)',
                          color: input.trim() ? '#fff' : 'var(--text-secondary)',
                          border: 'none', borderRadius: '6px',
                          cursor: input.trim() ? 'pointer' : 'not-allowed',
                          fontFamily: 'inherit',
                        }}
                      >
                        <i className="fa-solid fa-check" style={{ marginRight: '6px' }} />
                        채점하기
                      </button>
                    </div>
                  </div>

                  {/* 모범답안 */}
                  {showExample && (
                    <div style={{
                      padding: '20px 24px', marginBottom: '20px',
                      background: '#263238', color: '#E0E0E0', borderRadius: '10px',
                      fontSize: '13px', lineHeight: 1.8, whiteSpace: 'pre-wrap',
                      fontFamily: "'Courier New', monospace",
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', marginBottom: '12px', letterSpacing: '0.1em' }}>
                        EXAMPLE PROMPT
                      </div>
                      {scenario.exampleAnswer}
                    </div>
                  )}

                  {/* 채점 결과 */}
                  {result && (
                    <div style={{
                      border: '2px solid var(--navy-800)', borderRadius: '16px',
                      overflow: 'hidden', animation: 'rec-fade-in 0.3s ease-out',
                    }}>
                      {/* 헤더: 등급 + 총점 */}
                      <div style={{
                        padding: '28px 32px', background: 'var(--ink-surface)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                            EVALUATION RESULT
                          </div>
                          <div style={{ fontSize: '20px', fontWeight: 700 }}>프롬프트 채점 결과</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '48px', fontWeight: 800, lineHeight: 1,
                            color: result.grade === 'S' ? 'var(--gold)' : '#fff',
                          }}>
                            {result.grade}
                          </div>
                          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gold)', marginTop: '4px' }}>
                            {result.total}<span style={{ fontSize: '14px', opacity: 0.7 }}>/100</span>
                          </div>
                        </div>
                      </div>

                      {/* SCORE 상세 */}
                      <div style={{ padding: '28px 32px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '20px' }}>
                          SCORE BREAKDOWN
                        </div>
                        {[
                          { label: 'S — 상황/맥락', value: result.situation },
                          { label: 'C — 구체적 정보', value: result.context },
                          { label: 'O — 목표/지시', value: result.objective },
                          { label: 'R — 출력 형식', value: result.responseFormat },
                          { label: 'E — 역할/제약', value: result.extras },
                        ].map(item => (
                          <div key={item.label} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy-800)' }}>{item.label}</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: item.value >= 15 ? 'var(--navy-800)' : item.value >= 10 ? 'var(--gold)' : '#C8102E' }}>
                                {item.value}/20
                              </span>
                            </div>
                            <div style={{ height: '8px', background: 'var(--navy-100)', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{
                                height: '100%', borderRadius: '4px', transition: 'width 0.5s ease',
                                width: barWidth(item.value),
                                background: item.value >= 15 ? 'var(--ink-surface)' : item.value >= 10 ? 'var(--gold)' : '#C8102E',
                              }} />
                            </div>
                          </div>
                        ))}

                        {/* 피드백 */}
                        {result.feedback.length > 0 && (
                          <div style={{
                            marginTop: '24px', padding: '20px 24px',
                            background: 'var(--navy-50)', borderRadius: '10px',
                            borderLeft: '4px solid var(--gold)',
                          }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '12px' }}>
                              <i className="fa-solid fa-comment-dots" style={{ color: 'var(--gold)', marginRight: '8px' }} />
                              개선 피드백
                            </div>
                            <ul style={{ padding: '0 0 0 18px', margin: 0 }}>
                              {result.feedback.map((fb, i) => (
                                <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '4px' }}>
                                  {fb}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 등급 안내 */}
                        <div style={{
                          marginTop: '20px', display: 'flex', gap: '8px',
                          justifyContent: 'center', flexWrap: 'wrap',
                        }}>
                          {[
                            { g: 'S', range: '90~100', label: '최상' },
                            { g: 'A', range: '80~89', label: '우수' },
                            { g: 'B', range: '65~79', label: '양호' },
                            { g: 'C', range: '50~64', label: '보통' },
                            { g: 'D', range: '~49', label: '미흡' },
                          ].map(item => (
                            <span key={item.g} style={{
                              padding: '4px 12px', borderRadius: '4px',
                              fontSize: '11px', fontWeight: 700,
                              background: result.grade === item.g ? 'var(--ink-surface)' : 'var(--navy-50)',
                              color: result.grade === item.g ? 'var(--gold)' : 'var(--text-secondary)',
                            }}>
                              {item.g} ({item.range}) {item.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Practice;
