import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { scoreCriteria } from './data/quiz-questions';
import '../../styles/practice.css';

/* ── 시나리오 데이터 ── */
const SCENARIOS = [
  {
    id: 'free',
    title: '자유 작성',
    titleEn: 'Free Writing',
    desc: '원하는 주제로 자유롭게 프롬프트를 작성하세요.',
    descEn: 'Write a prompt on any topic you like.',
    icon: 'fa-pen-fancy',
  },
  {
    id: 's1',
    title: '마케팅 콘텐츠 작성',
    titleEn: 'Marketing Content',
    desc: '신제품 출시를 위한 SNS 홍보 문구를 작성하는 프롬프트를 만드세요.',
    descEn: 'Create a prompt to write SNS promotional copy for a new product launch.',
    icon: 'fa-bullhorn',
    hint: '제품 정보, 타깃 고객층, 톤앤매너, 채널, 글자수 제한 등을 포함해보세요.',
    hintEn: 'Include product info, target audience, tone, channel, and character limits.',
  },
  {
    id: 's2',
    title: '코드 리뷰 요청',
    titleEn: 'Code Review Request',
    desc: '작성한 코드에 대한 리뷰를 AI에게 요청하는 프롬프트를 만드세요.',
    descEn: 'Create a prompt asking AI to review your code.',
    icon: 'fa-code',
    hint: '언어, 코드 목적, 리뷰 관점(성능/보안/가독성), 출력 형식 등을 포함해보세요.',
    hintEn: 'Include language, code purpose, review focus (performance/security/readability), output format.',
  },
  {
    id: 's3',
    title: '학습 자료 생성',
    titleEn: 'Learning Material',
    desc: '특정 주제에 대한 교육 자료를 만드는 프롬프트를 작성하세요.',
    descEn: 'Create a prompt to generate educational material on a specific topic.',
    icon: 'fa-graduation-cap',
    hint: '학습 대상, 수준, 분량, 형식(슬라이드/문서/퀴즈), 핵심 내용 등을 포함해보세요.',
    hintEn: 'Include target learners, level, length, format, and key content areas.',
  },
  {
    id: 's4',
    title: '데이터 분석 요청',
    titleEn: 'Data Analysis',
    desc: '데이터를 분석하고 인사이트를 도출하는 프롬프트를 만드세요.',
    descEn: 'Create a prompt for data analysis and insight extraction.',
    icon: 'fa-chart-bar',
    hint: '데이터 유형, 분석 목적, 시각화 방법, 핵심 지표, 보고서 형식 등을 포함해보세요.',
    hintEn: 'Include data type, analysis purpose, visualization, key metrics, and report format.',
  },
  {
    id: 's5',
    title: '이메일 작성',
    titleEn: 'Email Writing',
    desc: '비즈니스 이메일을 작성하는 프롬프트를 만드세요.',
    descEn: 'Create a prompt to write a business email.',
    icon: 'fa-envelope',
    hint: '수신자, 목적, 톤, 핵심 내용, 길이, 포함할 항목 등을 포함해보세요.',
    hintEn: 'Include recipient, purpose, tone, key points, length, and items to include.',
  },
];

/* ── 자동 채점 엔진 ── */
interface ScoreResult {
  S: number; C: number; O: number; R: number; E: number;
  total: number; grade: string;
  feedback: { S: string; C: string; O: string; R: string; E: string };
  feedbackEn: { S: string; C: string; O: string; R: string; E: string };
}

function analyzePrompt(text: string): ScoreResult {
  const t = text.trim();
  if (!t) {
    const empty = { S: 0, C: 0, O: 0, R: 0, E: 0, total: 0, grade: '-' };
    const emptyFb = { S: '', C: '', O: '', R: '', E: '' };
    return { ...empty, feedback: emptyFb, feedbackEn: emptyFb };
  }

  const len = t.length;
  const sentences = t.split(/[.!?\n。]/).filter(s => s.trim().length > 3);

  // ── S: Specificity (구체성) ──
  let sScore = 0;
  const hasNumbers = /\d+/.test(t);
  const hasSpecificWords = /(\d+[개월년일시분초건장자%원달러]|예산|기한|마감|분량|범위|제한|이하|이상|이내)/.test(t)
    || /(\d+\s*(items?|pages?|words?|minutes?|hours?|days?|months?|years?|%))/i.test(t);
  const hasConditions = /(조건|제약|요구사항|제한|constraints?|requirements?|conditions?|limit)/i.test(t);
  const hasDetails = sentences.length >= 2;
  if (len > 30) sScore += 3;
  if (len > 80) sScore += 3;
  if (len > 150) sScore += 2;
  if (hasNumbers) sScore += 4;
  if (hasSpecificWords) sScore += 4;
  if (hasConditions) sScore += 2;
  if (hasDetails) sScore += 2;
  sScore = Math.min(20, sScore);

  let sFb = '', sFbEn = '';
  if (sScore >= 16) { sFb = '구체적이고 명확한 요청입니다.'; sFbEn = 'Very specific and clear request.'; }
  else if (sScore >= 10) { sFb = '어느 정도 구체적이나, 수치나 조건을 더 추가해보세요.'; sFbEn = 'Somewhat specific, but add more numbers or conditions.'; }
  else { sFb = '요청이 모호합니다. 구체적인 수치, 범위, 조건을 추가하세요.'; sFbEn = 'Request is vague. Add specific numbers, ranges, and conditions.'; }

  // ── C: Context (맥락) ──
  let cScore = 0;
  const hasBackground = /(배경|상황|현재|목적|이유|위해|because|background|situation|currently|purpose|in order to)/i.test(t);
  const hasAudience = /(대상|독자|사용자|학생|고객|팀|직장인|교수|for\s+\w+|target|audience|users?|readers?|students?|customers?)/i.test(t);
  const hasPurpose = /(위해|목적|활용|사용|용도|to\s+\w+|purpose|goal|objective|aim)/i.test(t);
  const hasConstraints = /(제약|조건|제한|단|다만|예외|단서|however|except|constraint|limitation|note that)/i.test(t);
  if (hasBackground) cScore += 5;
  if (hasAudience) cScore += 5;
  if (hasPurpose) cScore += 5;
  if (hasConstraints) cScore += 3;
  if (len > 100) cScore += 2;
  cScore = Math.min(20, cScore);

  let cFb = '', cFbEn = '';
  if (cScore >= 16) { cFb = '맥락 정보가 충분합니다.'; cFbEn = 'Context information is sufficient.'; }
  else if (cScore >= 10) { cFb = '맥락이 있으나, 대상/목적/배경을 더 명시해보세요.'; cFbEn = 'Some context exists, but specify audience/purpose/background more.'; }
  else { cFb = '배경 정보, 대상 독자, 사용 목적을 추가하세요.'; cFbEn = 'Add background info, target audience, and purpose.'; }

  // ── O: Output Specification (출력 지정) ──
  let oScore = 0;
  const hasFormat = /(표|목록|리스트|마크다운|JSON|HTML|CSV|슬라이드|문서|보고서|table|list|markdown|format|report|slide|document|bullet)/i.test(t);
  const hasLength = /(글자|단어|문장|문단|페이지|분량|\d+자|\d+글자|words?|sentences?|paragraphs?|pages?|characters?|length)/i.test(t);
  const hasStructure = /(제목|소제목|섹션|항목|챕터|단계|순서|section|heading|chapter|step|structure|outline)/i.test(t);
  const hasStyle = /(톤|어조|스타일|격식|친근|전문|formal|informal|casual|professional|tone|style|manner)/i.test(t);
  if (hasFormat) oScore += 6;
  if (hasLength) oScore += 5;
  if (hasStructure) oScore += 5;
  if (hasStyle) oScore += 4;
  oScore = Math.min(20, oScore);

  let oFb = '', oFbEn = '';
  if (oScore >= 16) { oFb = '출력 형식이 잘 지정되었습니다.'; oFbEn = 'Output format is well specified.'; }
  else if (oScore >= 8) { oFb = '출력 형식이 부분적입니다. 형식/분량/구조를 더 명시해보세요.'; oFbEn = 'Output format is partial. Specify format/length/structure more.'; }
  else { oFb = '원하는 출력 형식(표, 목록, 보고서 등), 분량, 구조를 지정하세요.'; oFbEn = 'Specify desired output format (table, list, report), length, and structure.'; }

  // ── R: Role Assignment (역할 부여) ──
  let rScore = 0;
  const hasRole = /(당신은|너는|역할|전문가|~로서|~처럼|act as|you are|as a|role|expert|specialist|professional|imagine you)/i.test(t);
  const hasExpertise = /(경력|경험|\d+년|전문|석사|박사|수석|시니어|senior|experienced|years?.+experience|PhD|master)/i.test(t);
  const hasPersona = /(관점|입장|시각|perspective|viewpoint|standpoint|approach)/i.test(t);
  if (hasRole) rScore += 10;
  if (hasExpertise) rScore += 6;
  if (hasPersona) rScore += 4;
  rScore = Math.min(20, rScore);

  let rFb = '', rFbEn = '';
  if (rScore >= 16) { rFb = '역할 부여가 잘 되어 있습니다.'; rFbEn = 'Role assignment is well done.'; }
  else if (rScore >= 8) { rFb = '역할이 부여되었으나, 전문성이나 경력을 추가해보세요.'; rFbEn = 'Role is assigned, but add expertise or experience details.'; }
  else { rFb = '"당신은 ~전문가입니다" 형태로 역할을 부여해보세요.'; rFbEn = 'Try assigning a role like "You are a ~ expert."'; }

  // ── E: Effectiveness (효과성) ──
  let eScore = 0;
  const criteriaCount = [sScore > 8, cScore > 8, oScore > 8, rScore > 8].filter(Boolean).length;
  eScore += criteriaCount * 3;
  if (len > 50) eScore += 2;
  if (len > 120) eScore += 2;
  if (sentences.length >= 3) eScore += 2;
  const hasExample = /(예시|예를 들어|예:|예\)|sample|example|e\.g\.|for instance|such as)/i.test(t);
  if (hasExample) eScore += 4;
  eScore = Math.min(20, eScore);

  let eFb = '', eFbEn = '';
  if (eScore >= 16) { eFb = '종합적으로 효과적인 프롬프트입니다.'; eFbEn = 'Overall effective prompt.'; }
  else if (eScore >= 10) { eFb = '대체로 효과적이나, 부족한 SCORE 요소를 보완하세요.'; eFbEn = 'Generally effective, but improve weaker SCORE elements.'; }
  else { eFb = '여러 SCORE 요소가 부족합니다. 위 피드백을 참고하여 보완하세요.'; eFbEn = 'Multiple SCORE elements need improvement. Follow feedback above.'; }

  const total = sScore + cScore + oScore + rScore + eScore;
  let grade = 'D';
  if (total >= 90) grade = 'S';
  else if (total >= 70) grade = 'A';
  else if (total >= 50) grade = 'B';
  else if (total >= 30) grade = 'C';

  return {
    S: sScore, C: cScore, O: oScore, R: rScore, E: eScore,
    total, grade,
    feedback: { S: sFb, C: cFb, O: oFb, R: rFb, E: eFb },
    feedbackEn: { S: sFbEn, C: cFbEn, O: oFbEn, R: rFbEn, E: eFbEn },
  };
}

/* ── 등급 색상 ── */
function gradeColor(grade: string) {
  switch (grade) {
    case 'S': return '#d69e2e';
    case 'A': return '#38a169';
    case 'B': return '#4299e1';
    case 'C': return '#ed8936';
    default: return '#a0aec0';
  }
}

function scoreBarColor(score: number) {
  if (score >= 16) return '#38a169';
  if (score >= 10) return '#d69e2e';
  if (score >= 5) return '#ed8936';
  return '#e53e3e';
}

/* ── 메인 컴포넌트 ── */
export default function PromptWorkshop() {
  const { language } = useLanguage();
  const toast = useToast();
  const isKo = language === 'ko';

  const [selectedScenario, setSelectedScenario] = useState('free');
  const [promptText, setPromptText] = useState('');
  const [evaluated, setEvaluated] = useState(false);
  const [attempts, setAttempts] = useState<Array<{ text: string; score: ScoreResult; time: Date }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  const scenario = SCENARIOS.find(s => s.id === selectedScenario)!;

  useMemo(() => {
    if (!evaluated) return null;
    return analyzePrompt(promptText);
  }, [promptText, evaluated]);

  const handleEvaluate = useCallback(() => {
    if (!promptText.trim()) {
      toast.showToast(isKo ? '프롬프트를 먼저 작성해주세요.' : 'Please write a prompt first.', 'warning');
      return;
    }
    const result = analyzePrompt(promptText);
    setEvaluated(true);
    setAttempts(prev => [...prev, { text: promptText, score: result, time: new Date() }]);
  }, [promptText, isKo, toast]);

  const handleReEvaluate = useCallback(() => {
    if (!promptText.trim()) return;
    const result = analyzePrompt(promptText);
    setAttempts(prev => [...prev, { text: promptText, score: result, time: new Date() }]);
    toast.showToast(isKo ? '재평가 완료! 변경사항을 확인하세요.' : 'Re-evaluated! Check the changes.', 'success');
  }, [promptText, isKo, toast]);

  const handleReset = () => {
    setPromptText('');
    setEvaluated(false);
    setAttempts([]);
    setShowHistory(false);
  };

  const handleScenarioChange = (id: string) => {
    setSelectedScenario(id);
    setPromptText('');
    setEvaluated(false);
    setAttempts([]);
    setShowHistory(false);
  };

  const loadAttempt = (idx: number) => {
    setPromptText(attempts[idx].text);
    setShowHistory(false);
  };

  const latestScore = attempts.length > 0 ? attempts[attempts.length - 1].score : null;
  const prevScore = attempts.length > 1 ? attempts[attempts.length - 2].score : null;

  return (
    <div className="practice-page">
      <SEOHead
        title={isKo ? '프롬프트 작성 평가' : 'Prompt Writing Evaluation'}
        description={isKo ? '프롬프트를 작성하고 SCORE 기준으로 자동 채점받으세요' : 'Write prompts and get auto-scored using SCORE criteria'}
        path="/prompt-eval/workshop"
      />

      <div className="workshop-layout">
        {/* Sidebar */}
        <aside className="workshop-sidebar">
          <h3>{isKo ? '시나리오 선택' : 'Select Scenario'}</h3>
          <ul className="workshop-scenario-list">
            {SCENARIOS.map(s => (
              <li key={s.id}>
                <button
                  className={`workshop-scenario-btn ${selectedScenario === s.id ? 'active' : ''}`}
                  onClick={() => handleScenarioChange(s.id)}
                >
                  <i className={`fa-solid ${s.icon}`} />
                  <span>{isKo ? s.title : s.titleEn}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="workshop-sidebar-divider" />

          <div className="workshop-sidebar-links">
            <Link to="/prompt-eval" className="workshop-sidebar-link">
              <i className="fa-solid fa-book" />
              {isKo ? '프롬프트 학습 가이드' : 'Prompt Learning Guide'}
            </Link>
            <Link to="/prompt-eval/practice" className="workshop-sidebar-link">
              <i className="fa-solid fa-clipboard-check" />
              {isKo ? '종합 실습 (250점)' : 'Full Practice (250pts)'}
            </Link>
          </div>

          {attempts.length > 0 && (
            <>
              <div className="workshop-sidebar-divider" />
              <div className="workshop-attempt-count">
                <i className="fa-solid fa-rotate" />
                {isKo ? `${attempts.length}회 평가 완료` : `${attempts.length} evaluations done`}
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <div className="workshop-content">
          {/* Header */}
          <div className="workshop-header">
            <h1>
              <i className={`fa-solid ${scenario.icon}`} style={{ marginRight: 12, color: 'var(--primary-blue)' }} />
              {isKo ? scenario.title : scenario.titleEn}
            </h1>
            <p>{isKo ? scenario.desc : scenario.descEn}</p>
          </div>

          {/* Hint */}
          {scenario.id !== 'free' && (scenario as any).hint && (
            <div className="workshop-hint">
              <i className="fa-solid fa-lightbulb" />
              <span>{isKo ? (scenario as any).hint : (scenario as any).hintEn}</span>
            </div>
          )}

          {/* SCORE Reference */}
          <div className="workshop-score-ref">
            <h4>{isKo ? 'SCORE 평가 기준' : 'SCORE Criteria'}</h4>
            <div className="workshop-score-ref-grid">
              {scoreCriteria.map((c: any) => (
                <div className="workshop-score-ref-item" key={c.key}>
                  <span className="key">{c.key}</span>
                  <span className="label">{isKo ? c.label : c.labelEn}</span>
                  <span className="desc">{isKo ? c.desc : c.descEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="workshop-input-section">
            <label className="workshop-label">
              <i className="fa-solid fa-pen-to-square" />
              {isKo ? '프롬프트 작성' : 'Write Your Prompt'}
            </label>
            <textarea
              className="workshop-textarea"
              placeholder={isKo
                ? '여기에 프롬프트를 작성하세요...\n\n예) 당신은 10년 경력의 마케팅 전문가입니다. 20대 여성을 타깃으로 한 화장품 신제품 "글로우업 세럼"의 인스타그램 홍보 문구를 5개 작성해주세요. 각 문구는 50자 이내, 해시태그 3개씩 포함해주세요.'
                : 'Write your prompt here...\n\nExample: You are a marketing expert with 10 years of experience. Write 5 Instagram promotional copies for a new cosmetics product "GlowUp Serum" targeting women in their 20s. Each copy should be under 50 words with 3 hashtags.'}
              value={promptText}
              onChange={e => { setPromptText(e.target.value); }}
            />
            <div className="workshop-char-count">
              {promptText.length} {isKo ? '자' : 'chars'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="workshop-actions">
            {!evaluated ? (
              <button className="practice-btn practice-btn-primary" onClick={handleEvaluate} disabled={!promptText.trim()}>
                <i className="fa-solid fa-chart-column" />
                {isKo ? '평가하기' : 'Evaluate'}
              </button>
            ) : (
              <>
                <button className="practice-btn practice-btn-primary" onClick={handleReEvaluate} disabled={!promptText.trim()}>
                  <i className="fa-solid fa-rotate" />
                  {isKo ? '재평가하기' : 'Re-evaluate'}
                </button>
                <button className="practice-btn practice-btn-secondary" onClick={() => setShowHistory(!showHistory)}>
                  <i className="fa-solid fa-clock-rotate-left" />
                  {isKo ? '수정 이력' : 'History'} ({attempts.length})
                </button>
                <button className="practice-btn practice-btn-secondary" onClick={handleReset}>
                  <i className="fa-solid fa-eraser" />
                  {isKo ? '초기화' : 'Reset'}
                </button>
              </>
            )}
          </div>

          {/* Evaluation Result */}
          {evaluated && latestScore && (
            <div className="workshop-result">
              {/* Grade & Total */}
              <div className="workshop-result-header">
                <div className="workshop-grade-circle" style={{ background: gradeColor(latestScore.grade) }}>
                  {latestScore.grade}
                </div>
                <div className="workshop-total-info">
                  <div className="workshop-total-score">{latestScore.total}<span>/100</span></div>
                  <div className="workshop-total-label">
                    {isKo ? 'SCORE 총점' : 'SCORE Total'}
                    {prevScore && (
                      <span className={`workshop-diff ${latestScore.total > prevScore.total ? 'up' : latestScore.total < prevScore.total ? 'down' : 'same'}`}>
                        {latestScore.total > prevScore.total ? `+${latestScore.total - prevScore.total}` :
                         latestScore.total < prevScore.total ? `${latestScore.total - prevScore.total}` : '='}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* SCORE Breakdown */}
              <div className="workshop-score-cards">
                {scoreCriteria.map((c: any) => {
                  const score = latestScore[c.key as keyof typeof latestScore] as number;
                  const prev = prevScore ? prevScore[c.key as keyof typeof prevScore] as number : null;
                  const fb = isKo ? latestScore.feedback[c.key as keyof typeof latestScore.feedback] : latestScore.feedbackEn[c.key as keyof typeof latestScore.feedbackEn];
                  const diff = prev !== null ? score - prev : null;
                  return (
                    <div className="workshop-score-card" key={c.key}>
                      <div className="workshop-score-card-header">
                        <span className="workshop-score-key">{c.key}</span>
                        <span className="workshop-score-name">{isKo ? c.label : c.labelEn}</span>
                        <span className="workshop-score-value" style={{ color: scoreBarColor(score) }}>
                          {score}/20
                          {diff !== null && diff !== 0 && (
                            <span className={`workshop-diff-small ${diff > 0 ? 'up' : 'down'}`}>
                              {diff > 0 ? `+${diff}` : diff}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="workshop-score-bar-bg">
                        <div className="workshop-score-bar-fill" style={{ width: `${(score / 20) * 100}%`, background: scoreBarColor(score) }} />
                      </div>
                      <p className="workshop-score-feedback">{fb}</p>
                    </div>
                  );
                })}
              </div>

              {/* Tips */}
              <div className="workshop-tips">
                <h4><i className="fa-solid fa-wand-magic-sparkles" /> {isKo ? '개선 제안' : 'Improvement Tips'}</h4>
                <ul>
                  {latestScore.S < 14 && <li>{isKo ? '구체적인 수치, 날짜, 범위를 추가하면 구체성(S)이 향상됩니다.' : 'Add specific numbers, dates, ranges to improve Specificity (S).'}</li>}
                  {latestScore.C < 14 && <li>{isKo ? '배경 설명, 대상 독자, 사용 목적을 추가하면 맥락(C)이 향상됩니다.' : 'Add background, target audience, purpose to improve Context (C).'}</li>}
                  {latestScore.O < 14 && <li>{isKo ? '"표 형태로", "5가지로 요약", "마크다운으로" 등 출력 형식을 지정하면 출력지정(O)이 향상됩니다.' : 'Specify output format like "in table format", "summarize in 5 points" to improve Output (O).'}</li>}
                  {latestScore.R < 14 && <li>{isKo ? '"당신은 ~전문가입니다"와 같이 역할을 부여하면 역할부여(R)가 향상됩니다.' : 'Assign a role like "You are a ~ expert" to improve Role (R).'}</li>}
                  {latestScore.E < 14 && <li>{isKo ? '다른 SCORE 요소를 보완하면 전체 효과성(E)이 자동으로 향상됩니다.' : 'Improving other SCORE elements will automatically boost Effectiveness (E).'}</li>}
                  {latestScore.total >= 80 && <li>{isKo ? '훌륭합니다! 예시(Example)를 추가하면 더 완벽해질 수 있습니다.' : 'Great job! Adding examples can make it even more perfect.'}</li>}
                </ul>
              </div>
            </div>
          )}

          {/* Attempt History */}
          {showHistory && attempts.length > 0 && (
            <div className="workshop-history">
              <h3><i className="fa-solid fa-clock-rotate-left" /> {isKo ? '수정 이력' : 'Revision History'}</h3>
              <div className="workshop-history-list">
                {attempts.map((a, i) => (
                  <div className="workshop-history-item" key={i}>
                    <div className="workshop-history-head">
                      <span className="workshop-history-num">#{i + 1}</span>
                      <span className="workshop-history-grade" style={{ background: gradeColor(a.score.grade) }}>
                        {a.score.grade}
                      </span>
                      <span className="workshop-history-total">{a.score.total}/100</span>
                      <span className="workshop-history-scores">
                        S:{a.score.S} C:{a.score.C} O:{a.score.O} R:{a.score.R} E:{a.score.E}
                      </span>
                      <span className="workshop-history-time">
                        {a.time.toLocaleTimeString()}
                      </span>
                      {i < attempts.length - 1 && (
                        <button className="workshop-history-load" onClick={() => loadAttempt(i)}>
                          <i className="fa-solid fa-arrow-rotate-left" /> {isKo ? '불러오기' : 'Load'}
                        </button>
                      )}
                    </div>
                    <div className="workshop-history-text">{a.text}</div>
                    {i > 0 && (
                      <div className={`workshop-history-diff ${a.score.total > attempts[i - 1].score.total ? 'up' : a.score.total < attempts[i - 1].score.total ? 'down' : 'same'}`}>
                        {a.score.total > attempts[i - 1].score.total
                          ? `+${a.score.total - attempts[i - 1].score.total}${isKo ? '점 향상' : 'pts improved'}`
                          : a.score.total < attempts[i - 1].score.total
                            ? `${a.score.total - attempts[i - 1].score.total}${isKo ? '점 감소' : 'pts decreased'}`
                            : isKo ? '변동 없음' : 'No change'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
