import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import SEOHead from '../../components/SEOHead';
import { quizQuestions, evalQuestions, writeQuestions, scoreCriteria } from './data/quiz-questions';
import { saveScore, getHistory, calcGrade } from '../../utils/practice';
import '../../styles/practice.css';

type Phase = 'quiz' | 'eval' | 'write' | 'result';

const GRADES = ['S', 'A', 'B', 'C', 'D'];

export default function PromptPractice() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const toast = useToast();
  const isKo = language === 'ko';

  /* ── state ── */
  const [phase, setPhase] = useState<Phase>('quiz');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [evalAnswers, setEvalAnswers] = useState<Record<string, string>>({});
  const [evalSubmitted, setEvalSubmitted] = useState(false);
  const [writeTexts, setWriteTexts] = useState<Record<string, string>>({});
  const [writeScores, setWriteScores] = useState<Record<string, Record<string, number>>>(() => {
    const init: Record<string, Record<string, number>> = {};
    writeQuestions.forEach((q: any) => {
      init[q.id] = { S: 10, C: 10, O: 10, R: 10, E: 10 };
    });
    return init;
  });
  const [finalScores, setFinalScores] = useState({ quiz: 0, eval: 0, write: 0, total: 0, grade: 'D' });
  const [history, setHistory] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  /* ── 점수 계산 ── */
  const calcQuizScore = useCallback(() => {
    let score = 0;
    quizQuestions.forEach((q: any) => {
      if (quizAnswers[q.id] === q.answer) score += 10;
    });
    return score;
  }, [quizAnswers]);

  const calcEvalScore = useCallback(() => {
    let score = 0;
    evalQuestions.forEach((q: any) => {
      if (evalAnswers[q.id] === q.correctGrade) score += 10;
    });
    return score;
  }, [evalAnswers]);

  const calcWriteScore = useCallback(() => {
    let total = 0;
    writeQuestions.forEach((q: any) => {
      const scores = writeScores[q.id] || { S: 0, C: 0, O: 0, R: 0, E: 0 };
      const qTotal = Object.values(scores).reduce((s, v) => s + v, 0);
      total += qTotal / 5;
    });
    return Math.round(total);
  }, [writeScores]);

  /* ── 진행률 ── */
  const progress = phase === 'quiz' ? 0 : phase === 'eval' ? 33 : phase === 'write' ? 66 : 100;

  const steps: { key: Phase; label: string; labelEn: string; icon: string }[] = [
    { key: 'quiz', label: '선택형 퀴즈', labelEn: 'Multiple Choice', icon: 'fa-circle-question' },
    { key: 'eval', label: '프롬프트 평가', labelEn: 'Prompt Evaluation', icon: 'fa-clipboard-check' },
    { key: 'write', label: '프롬프트 작성', labelEn: 'Prompt Writing', icon: 'fa-pen-to-square' },
    { key: 'result', label: '결과 확인', labelEn: 'Results', icon: 'fa-chart-column' },
  ];

  /* ── 단계 이동 ── */
  const goNext = async () => {
    if (phase === 'quiz') {
      setQuizSubmitted(true);
      setPhase('eval');
    } else if (phase === 'eval') {
      setEvalSubmitted(true);
      setPhase('write');
    } else if (phase === 'write') {
      const quiz = calcQuizScore();
      const ev = calcEvalScore();
      const wr = calcWriteScore();
      const total = quiz + ev + wr;
      const grade = calcGrade(total);
      setFinalScores({ quiz, eval: ev, write: wr, total, grade });
      setPhase('result');

      if (user) {
        setSaving(true);
        try {
          await saveScore({
            userId: user.id,
            userName: user.user_metadata?.name || user.email?.split('@')[0] || '',
            quizScore: quiz,
            evalScore: ev,
            writeScore: wr,
            totalScore: total,
            grade,
            detail: { quizAnswers, evalAnswers, writeScores },
          });
          toast.showToast(isKo ? '점수가 저장되었습니다!' : 'Score saved!', 'success');
          const h = await getHistory(user.id);
          setHistory(h);
        } catch {
          toast.showToast(isKo ? '저장에 실패했습니다.' : 'Failed to save.', 'error');
        } finally {
          setSaving(false);
        }
      }
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (user && phase === 'result') {
      getHistory(user.id).then(setHistory).catch(() => {});
    }
  }, [user, phase]);

  const restart = () => {
    setPhase('quiz');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setEvalAnswers({});
    setEvalSubmitted(false);
    setWriteTexts({});
    const init: Record<string, Record<string, number>> = {};
    writeQuestions.forEach((q: any) => { init[q.id] = { S: 10, C: 10, O: 10, R: 10, E: 10 }; });
    setWriteScores(init);
    window.scrollTo(0, 0);
  };

  return (
    <div className="practice-page">
      <SEOHead
        title={isKo ? '프롬프트 실습' : 'Prompt Practice'}
        description={isKo ? '프롬프트 작성 실습과 점수 평가' : 'Prompt writing practice and scoring'}
        path="/prompt-eval/practice"
      />

      <div className="practice-layout">
        <aside className="practice-sidebar">
          <h3>{isKo ? '실습 진행' : 'Progress'}</h3>
          <div className="practice-progress">
            <div className="practice-progress-bar">
              <div className="practice-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="practice-progress-text">{progress}%</div>
          </div>
          <ul className="practice-steps">
            {steps.map(s => {
              const done = steps.findIndex(x => x.key === phase) > steps.findIndex(x => x.key === s.key);
              const active = s.key === phase;
              return (
                <li key={s.key}>
                  <button
                    className={`practice-step ${active ? 'active' : ''} ${done ? 'completed' : ''}`}
                    onClick={() => { if (done || active) setPhase(s.key); }}
                    disabled={!done && !active}
                  >
                    <span className="practice-step-icon">
                      <i className={`fa-solid ${done ? 'fa-check' : s.icon}`} />
                    </span>
                    {isKo ? s.label : s.labelEn}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="practice-content">
          {phase === 'quiz' && <QuizPhase isKo={isKo} answers={quizAnswers} setAnswers={setQuizAnswers} submitted={quizSubmitted} />}
          {phase === 'eval' && <EvalPhase isKo={isKo} answers={evalAnswers} setAnswers={setEvalAnswers} submitted={evalSubmitted} />}
          {phase === 'write' && <WritePhase isKo={isKo} texts={writeTexts} setTexts={setWriteTexts} scores={writeScores} setScores={setWriteScores} />}
          {phase === 'result' && (
            <ResultPhase
              isKo={isKo}
              scores={finalScores}
              history={history}
              user={user}
              saving={saving}
              quizAnswers={quizAnswers}
              evalAnswers={evalAnswers}
              writeScores={writeScores}
              writeTexts={writeTexts}
            />
          )}

          <div className="practice-actions">
            {phase !== 'quiz' && phase !== 'result' && (
              <button className="practice-btn practice-btn-secondary" onClick={() => {
                const prev = phase === 'eval' ? 'quiz' : phase === 'write' ? 'eval' : phase;
                setPhase(prev as Phase);
                window.scrollTo(0, 0);
              }}>
                <i className="fa-solid fa-chevron-left" /> {isKo ? '이전' : 'Back'}
              </button>
            )}
            {phase === 'quiz' && <div />}
            {phase !== 'result' ? (
              <button className="practice-btn practice-btn-primary" onClick={goNext}>
                {phase === 'write'
                  ? (isKo ? '결과 확인' : 'View Results')
                  : (isKo ? '다음 단계' : 'Next Step')} <i className="fa-solid fa-chevron-right" />
              </button>
            ) : (
              <button className="practice-btn practice-btn-primary" onClick={restart}>
                <i className="fa-solid fa-rotate-right" /> {isKo ? '다시 도전하기' : 'Try Again'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

/* ── Quiz Phase ── */
function QuizPhase({ isKo, answers, setAnswers, submitted }: {
  isKo: boolean; answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>; submitted: boolean;
}) {
  return (
    <>
      <div className="practice-header">
        <h1>{isKo ? '1단계: 선택형 퀴즈' : 'Step 1: Multiple Choice'}</h1>
        <p>{isKo ? '프롬프트 개념과 SCORE 평가 기준에 관한 10문항입니다. (문항당 10점, 총 100점)' : '10 questions about prompt concepts and SCORE criteria. (10pts each, 100 total)'}</p>
      </div>
      {quizQuestions.map((q: any, i: any) => {
        const options = isKo ? q.options : q.optionsEn;
        const selected = answers[q.id];
        return (
          <div className="quiz-card" key={q.id}>
            <div className="quiz-card-number">Q{i + 1}</div>
            <h3>{isKo ? q.question : q.questionEn}</h3>
            <div className="quiz-options">
              {options.map((opt: any, oi: any) => {
                let cls = 'quiz-option';
                if (selected === oi) cls += ' selected';
                if (submitted && oi === q.answer) cls += ' correct';
                if (submitted && selected === oi && oi !== q.answer) cls += ' wrong';
                return (
                  <div key={oi} className={cls} onClick={() => { if (!submitted) setAnswers(prev => ({ ...prev, [q.id]: oi })); }}>
                    <span className="quiz-option-radio" />
                    {opt}
                  </div>
                );
              })}
            </div>
            {submitted && (
              <div className="quiz-explanation">
                {selected === q.answer ? (isKo ? '✓ 정답!' : '✓ Correct!') : (isKo ? '✗ 오답' : '✗ Wrong')}{' — '}
                {isKo ? q.explanation : q.explanationEn}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ── Eval Phase ── */
function EvalPhase({ isKo, answers, setAnswers, submitted }: {
  isKo: boolean; answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>; submitted: boolean;
}) {
  return (
    <>
      <div className="practice-header">
        <h1>{isKo ? '2단계: 프롬프트 평가' : 'Step 2: Prompt Evaluation'}</h1>
        <p>{isKo ? '아래 프롬프트의 SCORE 등급(S/A/B/C/D)을 판정하세요. (문항당 10점, 총 50점)' : 'Judge the SCORE grade (S/A/B/C/D) for each prompt. (10pts each, 50 total)'}</p>
      </div>
      {evalQuestions.map((q: any, i: any) => {
        const selected = answers[q.id];
        return (
          <div className="eval-card" key={q.id}>
            <div className="quiz-card-number">{isKo ? '프롬프트' : 'Prompt'} {i + 1}</div>
            <div className="eval-prompt-box">{isKo ? q.prompt : q.promptEn}</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
              {isKo ? '이 프롬프트의 등급은?' : 'What grade is this prompt?'}
            </p>
            <div className="eval-grade-options">
              {GRADES.map(g => {
                let cls = 'eval-grade-btn';
                if (selected === g) cls += ' selected';
                if (submitted && g === q.correctGrade) cls += ' correct';
                if (submitted && selected === g && g !== q.correctGrade) cls += ' wrong';
                return (
                  <button key={g} className={cls} onClick={() => { if (!submitted) setAnswers(prev => ({ ...prev, [q.id]: g })); }}>
                    {g}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <>
                <div className="quiz-explanation">
                  {selected === q.correctGrade ? (isKo ? '✓ 정답!' : '✓ Correct!') : (isKo ? `✗ 오답 (정답: ${q.correctGrade})` : `✗ Wrong (Answer: ${q.correctGrade})`)}{' — '}
                  {isKo ? q.explanation : q.explanationEn}
                </div>
                <div className="eval-score-breakdown">
                  {(Object.entries(q.scores) as [string, number][]).map(([k, v]) => (
                    <div className="eval-score-item" key={k}>
                      <div className="label">{k}</div>
                      <div className="value">{v}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ── Write Phase ── */
function WritePhase({ isKo, texts, setTexts, scores, setScores }: {
  isKo: boolean;
  texts: Record<string, string>; setTexts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  scores: Record<string, Record<string, number>>; setScores: React.Dispatch<React.SetStateAction<Record<string, Record<string, number>>>>;
}) {
  return (
    <>
      <div className="practice-header">
        <h1>{isKo ? '3단계: 프롬프트 작성' : 'Step 3: Prompt Writing'}</h1>
        <p>{isKo ? '시나리오에 맞는 프롬프트를 작성하고, SCORE 기준으로 자기 채점하세요. (5문항 × SCORE 100점 / 5 = 총 100점)' : 'Write prompts for each scenario and self-evaluate with SCORE criteria. (5 items, 100 total)'}</p>
      </div>
      {writeQuestions.map((q: any, i: any) => (
        <div className="write-card" key={q.id}>
          <div className="quiz-card-number">{isKo ? '시나리오' : 'Scenario'} {i + 1}</div>
          <div className="write-scenario">{isKo ? q.scenario : q.scenarioEn}</div>
          <div className="write-task">{isKo ? q.task : q.taskEn}</div>
          <div className="write-hint">
            <i className="fa-solid fa-lightbulb" style={{ marginRight: 6, color: '#d69e2e' }} />
            {isKo ? q.hint : q.hintEn}
          </div>
          <textarea
            className="write-textarea"
            placeholder={isKo ? '프롬프트를 작성하세요...' : 'Write your prompt here...'}
            value={texts[q.id] || ''}
            onChange={e => setTexts(prev => ({ ...prev, [q.id]: e.target.value }))}
          />
          <div className="score-self-eval">
            <h4>{isKo ? 'SCORE 자기 평가' : 'SCORE Self-Evaluation'}</h4>
            {scoreCriteria.map((c: any) => (
              <div className="score-slider-row" key={c.key}>
                <span className="score-slider-label" title={isKo ? c.desc : c.descEn}>
                  {c.key} - {isKo ? c.label : c.labelEn}
                </span>
                <input
                  type="range" min={0} max={20} step={1}
                  className="score-slider-input"
                  value={scores[q.id]?.[c.key] ?? 10}
                  onChange={e => setScores(prev => ({
                    ...prev,
                    [q.id]: { ...prev[q.id], [c.key]: Number(e.target.value) },
                  }))}
                />
                <span className="score-slider-value">{scores[q.id]?.[c.key] ?? 10}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
   Result Phase — 전문 해설 + 정답률 + 추천
   ═══════════════════════════════════════════ */

function gradeColor(grade: string) {
  if (grade === 'S') return '#d69e2e';
  if (grade === 'A') return '#38a169';
  if (grade === 'B') return '#4299e1';
  if (grade === 'C') return '#ed8936';
  return '#a0aec0';
}

function ResultPhase({ isKo, scores, history, user, saving, quizAnswers, evalAnswers, writeScores, writeTexts }: {
  isKo: boolean;
  scores: { quiz: number; eval: number; write: number; total: number; grade: string };
  history: any[]; user: any; saving: boolean;
  quizAnswers: Record<string, number>;
  evalAnswers: Record<string, string>;
  writeScores: Record<string, Record<string, number>>;
  writeTexts: Record<string, string>;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggleSection = (key: string) => setExpandedSection(prev => prev === key ? null : key);

  /* ── 정답률 계산 ── */
  const quizCorrect = quizQuestions.filter((q: any) => quizAnswers[q.id] === q.answer).length;
  const quizTotal = quizQuestions.length;
  const quizRate = Math.round((quizCorrect / quizTotal) * 100);

  const evalCorrect = evalQuestions.filter((q: any) => evalAnswers[q.id] === q.correctGrade).length;
  const evalTotal = evalQuestions.length;
  const evalRate = Math.round((evalCorrect / evalTotal) * 100);

  /* ── 프롬프트 작성 SCORE 평균 ── */
  const writeAvg = { S: 0, C: 0, O: 0, R: 0, E: 0 };
  writeQuestions.forEach((q: any) => {
    const sc = writeScores[q.id] || { S: 10, C: 10, O: 10, R: 10, E: 10 };
    writeAvg.S += sc.S; writeAvg.C += sc.C; writeAvg.O += sc.O; writeAvg.R += sc.R; writeAvg.E += sc.E;
  });
  const wCount = writeQuestions.length || 1;
  writeAvg.S = Math.round(writeAvg.S / wCount);
  writeAvg.C = Math.round(writeAvg.C / wCount);
  writeAvg.O = Math.round(writeAvg.O / wCount);
  writeAvg.R = Math.round(writeAvg.R / wCount);
  writeAvg.E = Math.round(writeAvg.E / wCount);
  const writeAvgTotal = writeAvg.S + writeAvg.C + writeAvg.O + writeAvg.R + writeAvg.E;

  /* ── 취약 영역 분석 ── */
  const weakQuiz = quizRate < 70;
  const weakEval = evalRate < 60;
  const weakS = writeAvg.S < 12;
  const weakC = writeAvg.C < 12;
  const weakO = writeAvg.O < 12;
  const weakR = writeAvg.R < 12;
  // weakE intentionally unused (kept for future use)
  void (writeAvg.E < 12);

  return (
    <>
      <div className="practice-header">
        <h1>{isKo ? '종합 실습 결과' : 'Comprehensive Results'}</h1>
        <p>{isKo ? '선택형 퀴즈, 프롬프트 평가, 프롬프트 작성 3개 영역의 종합 분석 결과입니다.' : 'Comprehensive analysis of Quiz, Prompt Evaluation, and Prompt Writing.'}</p>
      </div>

      {/* ── 총점 & 등급 ── */}
      <div className="result-summary">
        <div className={`result-grade grade-${scores.grade}`}>{scores.grade}</div>
        <div className="result-total">
          {scores.total} <span>/ 250</span>
        </div>
        <div className="result-grade-label" style={{ color: gradeColor(scores.grade) }}>
          {scores.grade === 'S' ? (isKo ? '탁월 — 프롬프트 전문가 수준입니다!' : 'Outstanding — Expert level!') :
           scores.grade === 'A' ? (isKo ? '우수 — 실무 활용에 충분합니다.' : 'Excellent — Ready for practical use.') :
           scores.grade === 'B' ? (isKo ? '양호 — 핵심 개념을 이해하고 있습니다.' : 'Good — You understand core concepts.') :
           scores.grade === 'C' ? (isKo ? '보통 — 추가 학습이 필요합니다.' : 'Average — More practice needed.') :
           (isKo ? '노력 필요 — 기초부터 다시 학습하세요.' : 'Needs work — Review fundamentals.')}
        </div>
      </div>

      {/* ── 3영역 정답률 카드 ── */}
      <div className="result-breakdown">
        <div className="result-card">
          <div className="result-card-icon" style={{ background: 'rgba(66,153,225,0.1)', color: '#4299e1' }}>
            <i className="fa-solid fa-circle-question" />
          </div>
          <h4>{isKo ? '선택형 퀴즈' : 'Quiz'}</h4>
          <div className="score">{scores.quiz}</div>
          <div className="max">/ 100</div>
          <div className="result-rate-bar">
            <div className="result-rate-fill" style={{ width: `${quizRate}%`, background: quizRate >= 80 ? '#38a169' : quizRate >= 50 ? '#d69e2e' : '#e53e3e' }} />
          </div>
          <div className="result-rate-text">{isKo ? `정답률 ${quizRate}% (${quizCorrect}/${quizTotal})` : `${quizRate}% correct (${quizCorrect}/${quizTotal})`}</div>
        </div>
        <div className="result-card">
          <div className="result-card-icon" style={{ background: 'rgba(128,90,213,0.1)', color: '#805ad5' }}>
            <i className="fa-solid fa-clipboard-check" />
          </div>
          <h4>{isKo ? '프롬프트 평가' : 'Evaluation'}</h4>
          <div className="score">{scores.eval}</div>
          <div className="max">/ 50</div>
          <div className="result-rate-bar">
            <div className="result-rate-fill" style={{ width: `${evalRate}%`, background: evalRate >= 80 ? '#38a169' : evalRate >= 50 ? '#d69e2e' : '#e53e3e' }} />
          </div>
          <div className="result-rate-text">{isKo ? `정답률 ${evalRate}% (${evalCorrect}/${evalTotal})` : `${evalRate}% correct (${evalCorrect}/${evalTotal})`}</div>
        </div>
        <div className="result-card">
          <div className="result-card-icon" style={{ background: 'rgba(56,161,105,0.1)', color: '#38a169' }}>
            <i className="fa-solid fa-pen-to-square" />
          </div>
          <h4>{isKo ? '프롬프트 작성' : 'Writing'}</h4>
          <div className="score">{scores.write}</div>
          <div className="max">/ 100</div>
          <div className="result-rate-bar">
            <div className="result-rate-fill" style={{ width: `${writeAvgTotal}%`, background: writeAvgTotal >= 70 ? '#38a169' : writeAvgTotal >= 40 ? '#d69e2e' : '#e53e3e' }} />
          </div>
          <div className="result-rate-text">{isKo ? `SCORE 평균 ${writeAvgTotal}/100` : `SCORE avg ${writeAvgTotal}/100`}</div>
        </div>
      </div>

      {/* ── 1. 선택형 퀴즈 상세 해설 ── */}
      <div className="result-detail-section">
        <button className="result-detail-toggle" onClick={() => toggleSection('quiz')}>
          <span>
            <i className="fa-solid fa-circle-question" style={{ color: '#4299e1', marginRight: 10 }} />
            {isKo ? '1단계: 선택형 퀴즈 상세 분석' : 'Step 1: Quiz Detailed Analysis'}
          </span>
          <span className="result-detail-badge" style={{ background: quizRate >= 80 ? '#c6f6d5' : quizRate >= 50 ? '#fefcbf' : '#fed7d7', color: quizRate >= 80 ? '#276749' : quizRate >= 50 ? '#744210' : '#c53030' }}>
            {quizCorrect}/{quizTotal} {isKo ? '정답' : 'correct'}
          </span>
          <i className={`fa-solid fa-chevron-${expandedSection === 'quiz' ? 'up' : 'down'}`} />
        </button>
        {expandedSection === 'quiz' && (
          <div className="result-detail-body">
            <p className="result-detail-desc">
              {isKo
                ? '프롬프트의 기본 개념, SCORE 평가 모델, 주요 기법(역할 부여, Few-shot, 체이닝 등)에 대한 이해도를 측정합니다.'
                : 'Measures understanding of prompt fundamentals, SCORE model, and key techniques (role assignment, few-shot, chaining, etc.).'}
            </p>
            <div className="result-quiz-list">
              {quizQuestions.map((q: any, i: any) => {
                const selected = quizAnswers[q.id];
                const correct = selected === q.answer;
                const options = isKo ? q.options : q.optionsEn;
                return (
                  <div className={`result-quiz-item ${correct ? 'correct' : 'wrong'}`} key={q.id}>
                    <div className="result-quiz-head">
                      <span className={`result-quiz-badge ${correct ? 'correct' : 'wrong'}`}>
                        {correct ? (isKo ? '정답' : 'O') : (isKo ? '오답' : 'X')}
                      </span>
                      <span className="result-quiz-q">Q{i + 1}. {isKo ? q.question : q.questionEn}</span>
                    </div>
                    <div className="result-quiz-answer">
                      {!correct && (
                        <div className="result-quiz-your">
                          <span className="label">{isKo ? '내 답:' : 'Yours:'}</span>
                          {selected !== undefined ? options[selected] : (isKo ? '미응답' : 'No answer')}
                        </div>
                      )}
                      <div className="result-quiz-correct">
                        <span className="label">{isKo ? '정답:' : 'Answer:'}</span>
                        {options[q.answer]}
                      </div>
                    </div>
                    <div className="result-quiz-explain">
                      <i className="fa-solid fa-lightbulb" style={{ color: '#d69e2e', marginRight: 6 }} />
                      {isKo ? q.explanation : q.explanationEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 2. 프롬프트 평가 상세 해설 ── */}
      <div className="result-detail-section">
        <button className="result-detail-toggle" onClick={() => toggleSection('eval')}>
          <span>
            <i className="fa-solid fa-clipboard-check" style={{ color: '#805ad5', marginRight: 10 }} />
            {isKo ? '2단계: 프롬프트 평가 상세 분석' : 'Step 2: Evaluation Detailed Analysis'}
          </span>
          <span className="result-detail-badge" style={{ background: evalRate >= 80 ? '#c6f6d5' : evalRate >= 50 ? '#fefcbf' : '#fed7d7', color: evalRate >= 80 ? '#276749' : evalRate >= 50 ? '#744210' : '#c53030' }}>
            {evalCorrect}/{evalTotal} {isKo ? '정답' : 'correct'}
          </span>
          <i className={`fa-solid fa-chevron-${expandedSection === 'eval' ? 'up' : 'down'}`} />
        </button>
        {expandedSection === 'eval' && (
          <div className="result-detail-body">
            <p className="result-detail-desc">
              {isKo
                ? '실제 프롬프트를 보고 SCORE 등급을 판별하는 능력을 측정합니다. 좋은 프롬프트와 부족한 프롬프트를 구별하는 안목이 중요합니다.'
                : 'Measures your ability to judge prompt quality using SCORE grades. Distinguishing good from poor prompts is key.'}
            </p>
            <div className="result-eval-list">
              {evalQuestions.map((q: any, i: any) => {
                const selected = evalAnswers[q.id];
                const correct = selected === q.correctGrade;
                return (
                  <div className={`result-eval-item ${correct ? 'correct' : 'wrong'}`} key={q.id}>
                    <div className="result-eval-head">
                      <span className={`result-quiz-badge ${correct ? 'correct' : 'wrong'}`}>
                        {correct ? (isKo ? '정답' : 'O') : (isKo ? '오답' : 'X')}
                      </span>
                      <span className="result-eval-label">{isKo ? '프롬프트' : 'Prompt'} {i + 1}</span>
                    </div>
                    <div className="result-eval-prompt">{isKo ? q.prompt : q.promptEn}</div>
                    <div className="result-eval-grades">
                      {!correct && (
                        <span className="result-eval-grade-tag wrong">{isKo ? '내 답' : 'Yours'}: {selected || '-'}</span>
                      )}
                      <span className="result-eval-grade-tag correct">{isKo ? '정답' : 'Answer'}: {q.correctGrade}</span>
                      <span className="result-eval-grade-tag total">SCORE: {q.total}/100</span>
                    </div>
                    <div className="eval-score-breakdown" style={{ marginTop: 8, marginBottom: 8 }}>
                      {(Object.entries(q.scores) as [string, number][]).map(([k, v]) => (
                        <div className="eval-score-item" key={k}>
                          <div className="label">{k}</div>
                          <div className="value">{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="result-quiz-explain">
                      <i className="fa-solid fa-lightbulb" style={{ color: '#d69e2e', marginRight: 6 }} />
                      {isKo ? q.explanation : q.explanationEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 3. 프롬프트 작성 SCORE 분석 ── */}
      <div className="result-detail-section">
        <button className="result-detail-toggle" onClick={() => toggleSection('write')}>
          <span>
            <i className="fa-solid fa-pen-to-square" style={{ color: '#38a169', marginRight: 10 }} />
            {isKo ? '3단계: 프롬프트 작성 SCORE 분석' : 'Step 3: Writing SCORE Analysis'}
          </span>
          <span className="result-detail-badge" style={{ background: 'rgba(56,161,105,0.15)', color: '#276749' }}>
            {isKo ? `평균 ${writeAvgTotal}/100` : `Avg ${writeAvgTotal}/100`}
          </span>
          <i className={`fa-solid fa-chevron-${expandedSection === 'write' ? 'up' : 'down'}`} />
        </button>
        {expandedSection === 'write' && (
          <div className="result-detail-body">
            <p className="result-detail-desc">
              {isKo
                ? '5개 시나리오에서 작성한 프롬프트에 대한 SCORE 자기 평가 결과입니다. 각 항목의 평균 점수로 강점과 약점을 확인하세요.'
                : 'Self-evaluation results for prompts written across 5 scenarios. Review average scores to identify strengths and weaknesses.'}
            </p>

            {/* SCORE 레이더 (바 차트로 표현) */}
            <div className="result-write-radar">
              <h4>{isKo ? 'SCORE 항목별 평균 (5문항)' : 'SCORE Average by Criterion (5 items)'}</h4>
              {scoreCriteria.map((c: any) => {
                const avg = writeAvg[c.key as keyof typeof writeAvg];
                const pct = (avg / 20) * 100;
                return (
                  <div className="result-write-bar-row" key={c.key}>
                    <span className="result-write-bar-label">
                      <strong>{c.key}</strong> {isKo ? c.label : c.labelEn}
                    </span>
                    <div className="result-write-bar-track">
                      <div className="result-write-bar-fill" style={{ width: `${pct}%`, background: avg >= 14 ? '#38a169' : avg >= 8 ? '#d69e2e' : '#e53e3e' }} />
                    </div>
                    <span className="result-write-bar-value">{avg}/20</span>
                  </div>
                );
              })}
            </div>

            {/* 시나리오별 상세 */}
            {writeQuestions.map((q: any, i: any) => {
              const sc = writeScores[q.id] || { S: 10, C: 10, O: 10, R: 10, E: 10 };
              const total = Object.values(sc).reduce((a, b) => a + b, 0);
              const text = writeTexts[q.id] || '';
              return (
                <div className="result-write-item" key={q.id}>
                  <div className="result-write-item-head">
                    <span>{isKo ? '시나리오' : 'Scenario'} {i + 1}</span>
                    <span className="result-write-item-score">{total}/100</span>
                  </div>
                  <div className="result-write-item-scenario">{isKo ? q.scenario : q.scenarioEn}</div>
                  {text && (
                    <div className="result-write-item-text">
                      <span className="label">{isKo ? '작성한 프롬프트:' : 'Your prompt:'}</span>
                      {text}
                    </div>
                  )}
                  <div className="eval-score-breakdown" style={{ marginTop: 8 }}>
                    {(Object.entries(sc) as [string, number][]).map(([k, v]) => (
                      <div className="eval-score-item" key={k}>
                        <div className="label">{k}</div>
                        <div className="value" style={{ color: v >= 14 ? '#38a169' : v >= 8 ? '#d69e2e' : '#e53e3e' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 전문가 총평 & 학습 추천 ── */}
      <div className="result-expert-comment">
        <h3>
          <i className="fa-solid fa-user-graduate" style={{ marginRight: 8 }} />
          {isKo ? '종합 분석 및 학습 추천' : 'Overall Analysis & Recommendations'}
        </h3>

        {/* 전문가 총평 */}
        <div className="result-comment-box">
          <div className="result-comment-title">
            <i className="fa-solid fa-stethoscope" />
            {isKo ? '종합 진단' : 'Diagnosis'}
          </div>
          <p>
            {isKo ? (
              scores.total >= 225
                ? '모든 영역에서 뛰어난 성적을 보여주셨습니다. 프롬프트 기본 개념에 대한 깊은 이해와 함께, 실제 프롬프트를 분석하고 작성하는 실무 능력도 탁월합니다. 고급 프롬프트 기법이나 다양한 AI 도구 활용으로 영역을 확장해보세요.'
                : scores.total >= 200
                  ? '전반적으로 우수한 프롬프트 역량을 갖추고 계십니다. 대부분의 개념을 정확히 이해하고 있으며, 실무에서 효과적인 프롬프트를 작성할 수 있는 수준입니다. 약간의 보완으로 전문가 수준에 도달할 수 있습니다.'
                  : scores.total >= 175
                    ? '프롬프트의 핵심 개념은 이해하고 있으나, 일부 영역에서 보강이 필요합니다. 특히 약점으로 드러난 영역에 집중하여 학습하면 빠르게 실력이 향상될 것입니다.'
                    : scores.total >= 150
                      ? '프롬프트 기초 개념에 대한 이해가 부분적입니다. SCORE 모델을 다시 복습하고, 좋은 프롬프트와 나쁜 프롬프트의 차이를 구체적으로 분석해보는 연습이 필요합니다.'
                      : '프롬프트 엔지니어링의 기초부터 체계적인 학습이 필요합니다. 먼저 프롬프트 기초 가이드를 정독하고, SCORE 모델의 각 요소를 하나씩 이해하는 것부터 시작하세요.'
            ) : (
              scores.total >= 225
                ? 'Excellent across all areas. You demonstrate deep understanding and practical ability. Explore advanced techniques and diverse AI tools.'
                : scores.total >= 200
                  ? 'Strong overall prompt skills. You understand most concepts and can write effective prompts. Small improvements will reach expert level.'
                  : scores.total >= 175
                    ? 'Core concepts understood but some areas need reinforcement. Focus on identified weak areas for rapid improvement.'
                    : scores.total >= 150
                      ? 'Partial understanding of fundamentals. Review the SCORE model and practice analyzing prompt quality differences.'
                      : 'Systematic study from basics needed. Start with the prompt fundamentals guide and understand each SCORE element.'
            )}
          </p>
        </div>

        {/* 영역별 피드백 */}
        <div className="result-feedback-grid">
          <div className={`result-feedback-card ${quizRate >= 80 ? 'good' : quizRate >= 50 ? 'mid' : 'weak'}`}>
            <div className="result-feedback-card-head">
              <i className="fa-solid fa-circle-question" />
              {isKo ? '개념 이해력' : 'Concept Understanding'}
            </div>
            <p>
              {isKo ? (
                quizRate >= 80
                  ? '프롬프트 개념과 SCORE 모델에 대한 정확한 이해를 갖고 계십니다.'
                  : quizRate >= 50
                    ? '기본 개념은 알고 있으나 일부 기법(체이닝, Few-shot 등)에 대한 복습이 필요합니다.'
                    : '프롬프트의 정의, SCORE 각 항목의 의미, 주요 기법을 다시 학습하세요.'
              ) : (
                quizRate >= 80
                  ? 'Solid understanding of prompt concepts and SCORE model.'
                  : quizRate >= 50
                    ? 'Basic concepts known but review techniques like chaining and few-shot.'
                    : 'Review prompt definitions, SCORE criteria meanings, and key techniques.'
              )}
            </p>
          </div>
          <div className={`result-feedback-card ${evalRate >= 80 ? 'good' : evalRate >= 50 ? 'mid' : 'weak'}`}>
            <div className="result-feedback-card-head">
              <i className="fa-solid fa-clipboard-check" />
              {isKo ? '분석 판별력' : 'Analytical Judgment'}
            </div>
            <p>
              {isKo ? (
                evalRate >= 80
                  ? '프롬프트의 품질을 정확히 판별할 수 있는 눈을 갖추고 계십니다.'
                  : evalRate >= 50
                    ? '좋은 프롬프트는 구분하지만, 중간 등급(B~C)의 미묘한 차이를 놓치는 경향이 있습니다.'
                    : '다양한 프롬프트 예시를 보면서 어떤 요소가 등급 차이를 만드는지 분석하는 연습이 필요합니다.'
              ) : (
                evalRate >= 80
                  ? 'Strong ability to accurately judge prompt quality.'
                  : evalRate >= 50
                    ? 'Can identify good prompts but miss subtle differences in mid-range grades (B~C).'
                    : 'Practice analyzing what elements create grade differences across prompt examples.'
              )}
            </p>
          </div>
          <div className={`result-feedback-card ${writeAvgTotal >= 70 ? 'good' : writeAvgTotal >= 40 ? 'mid' : 'weak'}`}>
            <div className="result-feedback-card-head">
              <i className="fa-solid fa-pen-to-square" />
              {isKo ? '작성 실무력' : 'Writing Ability'}
            </div>
            <p>
              {isKo ? (
                writeAvgTotal >= 70
                  ? 'SCORE 기준을 고르게 반영한 프롬프트를 작성할 수 있습니다. 실무에서 바로 활용 가능한 수준입니다.'
                  : writeAvgTotal >= 40
                    ? '프롬프트 작성의 기본 틀은 갖추었으나, 특정 SCORE 요소(아래 참조)를 의식적으로 포함하는 연습이 필요합니다.'
                    : 'SCORE의 각 요소를 하나씩 의도적으로 프롬프트에 포함시키는 연습부터 시작하세요.'
              ) : (
                writeAvgTotal >= 70
                  ? 'Can write prompts with balanced SCORE criteria. Ready for practical use.'
                  : writeAvgTotal >= 40
                    ? 'Basic framework present but practice deliberately including specific SCORE elements.'
                    : 'Start by deliberately including each SCORE element one at a time in your prompts.'
              )}
            </p>
          </div>
        </div>

        {/* 추천 학습 콘텐츠 */}
        <div className="result-recommend">
          <div className="result-recommend-title">
            <i className="fa-solid fa-graduation-cap" />
            {isKo ? '맞춤 학습 추천' : 'Personalized Recommendations'}
          </div>
          <div className="result-recommend-list">
            {weakQuiz && (
              <Link to="/prompt-eval" className="result-recommend-item">
                <div className="result-recommend-icon" style={{ background: 'rgba(66,153,225,0.1)', color: '#4299e1' }}>
                  <i className="fa-solid fa-book" />
                </div>
                <div>
                  <strong>{isKo ? '프롬프트 기초 가이드 복습' : 'Review Prompt Basics Guide'}</strong>
                  <span>{isKo ? '프롬프트 정의, SCORE 모델, 기본 기법을 다시 정리하세요.' : 'Review prompt definitions, SCORE model, and basic techniques.'}</span>
                </div>
              </Link>
            )}
            {weakEval && (
              <Link to="/prompt-eval" className="result-recommend-item">
                <div className="result-recommend-icon" style={{ background: 'rgba(128,90,213,0.1)', color: '#805ad5' }}>
                  <i className="fa-solid fa-magnifying-glass-chart" />
                </div>
                <div>
                  <strong>{isKo ? '프롬프트 평가 기준 학습' : 'Study Evaluation Criteria'}</strong>
                  <span>{isKo ? 'SCORE 등급 기준표를 숙지하고, 등급별 프롬프트 예시를 비교 분석하세요.' : 'Master SCORE grade criteria and compare prompt examples by grade.'}</span>
                </div>
              </Link>
            )}
            {(weakS || weakC || weakO || weakR) && (
              <Link to="/prompt-eval/workshop" className="result-recommend-item">
                <div className="result-recommend-icon" style={{ background: 'rgba(56,161,105,0.1)', color: '#38a169' }}>
                  <i className="fa-solid fa-wand-magic-sparkles" />
                </div>
                <div>
                  <strong>{isKo ? '프롬프트 작성 평가 워크숍' : 'Prompt Writing Workshop'}</strong>
                  <span>
                    {isKo
                      ? `약한 영역 (${[weakS && 'S-구체성', weakC && 'C-맥락', weakO && 'O-출력지정', weakR && 'R-역할부여'].filter(Boolean).join(', ')})을 집중 연습하세요.`
                      : `Practice weak areas: ${[weakS && 'S-Specificity', weakC && 'C-Context', weakO && 'O-Output', weakR && 'R-Role'].filter(Boolean).join(', ')}.`}
                  </span>
                </div>
              </Link>
            )}
            {!weakQuiz && !weakEval && !weakS && !weakC && !weakO && !weakR && (
              <Link to="/prompt-eval/workshop" className="result-recommend-item">
                <div className="result-recommend-icon" style={{ background: 'rgba(214,158,46,0.1)', color: '#d69e2e' }}>
                  <i className="fa-solid fa-trophy" />
                </div>
                <div>
                  <strong>{isKo ? '고급 프롬프트 워크숍 도전' : 'Try Advanced Workshop'}</strong>
                  <span>{isKo ? '다양한 시나리오로 프롬프트 작성 실력을 더 높여보세요.' : 'Elevate your skills with diverse scenario challenges.'}</span>
                </div>
              </Link>
            )}
            <Link to="/prompt-eval" className="result-recommend-item">
              <div className="result-recommend-icon" style={{ background: 'rgba(237,137,54,0.1)', color: '#ed8936' }}>
                <i className="fa-solid fa-layer-group" />
              </div>
              <div>
                <strong>{isKo ? '프롬프트 기법 & 실전 예시' : 'Techniques & Real Examples'}</strong>
                <span>{isKo ? 'Few-shot, 체이닝, 역할 부여 등 고급 기법과 실전 예시를 학습하세요.' : 'Study advanced techniques: few-shot, chaining, role assignment with examples.'}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Login prompt */}
      {!user && (
        <div className="quiz-explanation" style={{ marginBottom: 24 }}>
          <i className="fa-solid fa-circle-info" style={{ marginRight: 6 }} />
          {isKo ? '로그인하면 점수를 저장하고 성장 추이를 확인할 수 있습니다.' : 'Log in to save your score and track your progress.'}
        </div>
      )}

      {saving && (
        <div style={{ textAlign: 'center', padding: 16, color: 'var(--text-light)' }}>
          <i className="fa-solid fa-spinner fa-spin" /> {isKo ? '저장 중...' : 'Saving...'}
        </div>
      )}

      {/* History */}
      {user && history.length > 0 && (
        <div className="result-history">
          <h3>{isKo ? '과거 실습 이력' : 'Practice History'}</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>{isKo ? '날짜' : 'Date'}</th>
                <th>{isKo ? '퀴즈' : 'Quiz'}</th>
                <th>{isKo ? '평가' : 'Eval'}</th>
                <th>{isKo ? '작성' : 'Write'}</th>
                <th>{isKo ? '총점' : 'Total'}</th>
                <th>{isKo ? '등급' : 'Grade'}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h: any) => (
                <tr key={h.id}>
                  <td>{new Date(h.created_at).toLocaleDateString()}</td>
                  <td>{h.quiz_score}</td>
                  <td>{h.eval_score}</td>
                  <td>{h.write_score}</td>
                  <td><strong>{h.total_score}</strong></td>
                  <td><strong>{h.grade}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
