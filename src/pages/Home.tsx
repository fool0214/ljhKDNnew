import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import type { ReactElement } from 'react';

/* ── Data ── */
const TIMELINE_DAY1 = [
  {
    n: '01', time: '09:00 ─ 12:00 · 3시간',
    title: '바이브코딩 개요 및 개발 환경 구성',
    points: [
      '바이브코딩이란 — AI Agent와 자연어로 개발하는 패러다임',
      'Cursor IDE 설치 및 환경 설정',
      'Node.js / Git / GitHub 개발 환경 구성',
      'ChatGPT API 연동 기초',
      { p: true, t: '실습 — Cursor IDE로 첫 프로젝트 생성하기' },
    ]
  },
  {
    n: '02', time: '13:00 ─ 15:00 · 2시간',
    title: '웹 서비스 기획 및 요구사항 정의',
    points: [
      '서비스 아이디어 도출 및 기획',
      'Figma를 활용한 UI/UX 설계',
      '요구사항 명세서 작성',
      '프로젝트 구조 설계',
      { p: true, t: '실습 — 나만의 웹 서비스 기획서 작성' },
    ]
  },
  {
    n: '03', time: '15:00 ─ 16:00 · 1시간',
    title: '프론트엔드 기초 (HTML/CSS/JS)',
    points: [
      'HTML 구조와 시맨틱 태그',
      'CSS 레이아웃과 반응형 디자인',
      'JavaScript 핵심 문법 복습',
      { p: true, t: '실습 — 바이브코딩으로 랜딩 페이지 만들기' },
    ]
  },
  {
    n: '04', time: '16:00 ─ 18:00 · 2시간',
    title: 'React 기반 프론트엔드 UI 구현',
    points: [
      'React 컴포넌트와 JSX',
      'State 관리와 이벤트 처리',
      'React Router로 페이지 라우팅',
      'Cursor AI로 컴포넌트 자동 생성',
      { p: true, t: '실습 — AI로 React UI 컴포넌트 구현하기' },
    ]
  },
];

const TIMELINE_DAY2 = [
  {
    n: '01', time: '09:00 ─ 12:00 · 3시간',
    title: 'REST API 설계 및 Node.js 백엔드 구현',
    points: [
      'REST API 설계 원칙',
      'Node.js + Express 서버 구축',
      'API 엔드포인트 구현',
      '에러 처리 및 미들웨어',
      { p: true, t: '실습 — AI로 백엔드 API 자동 생성하기' },
    ]
  },
  {
    n: '02', time: '13:00 ─ 15:00 · 2시간',
    title: '데이터베이스 연동 및 프론트–백엔드 통합',
    points: [
      'Supabase(PostgreSQL) 설정 및 테이블 설계',
      'CRUD 기능 구현',
      '프론트엔드 ↔ 백엔드 API 연동',
      '데이터 흐름 디버깅',
      { p: true, t: '실습 — 풀스택 데이터 흐름 완성하기' },
    ]
  },
  {
    n: '03', time: '16:00 ─ 18:00 · 2시간',
    title: '인증·인가(JWT/OAuth) 기능 구현',
    points: [
      'JWT 토큰 기반 인증 원리',
      'OAuth 소셜 로그인 구현',
      '세션 관리와 보안 처리',
      { p: true, t: '실습 — 로그인/회원가입 기능 구현하기' },
    ]
  },
];

const TIMELINE_DAY3 = [
  {
    n: '01', time: '09:00 ─ 11:00 · 2시간',
    title: 'Streamlit 소개 & Python 기초',
    points: [
      'Streamlit이란 — Python 데이터 앱 프레임워크',
      'Python 핵심 문법 (변수, 리스트, 딕셔너리, 함수)',
      'Streamlit 설치 및 첫 앱 실행',
      { p: true, t: '실습 — 자기소개 Streamlit 앱 만들기' },
    ]
  },
  {
    n: '02', time: '11:00 ─ 12:00 · 1시간',
    title: 'Streamlit 데이터 앱 개발',
    points: [
      '레이아웃 & 위젯 (slider, selectbox, file_uploader 등)',
      'pandas/matplotlib를 활용한 데이터 시각화',
      'CSV 업로드 & 분석 대시보드 구축',
      { p: true, t: '실습 — KDN 전력 데이터 분석 대시보드' },
    ]
  },
  {
    n: '03', time: '13:00 ─ 15:00 · 2시간',
    title: 'AI 연동 & Streamlit Cloud 배포',
    points: [
      'Claude/ChatGPT API를 Streamlit에 연동',
      'AI 챗봇 기능이 포함된 데이터 앱 완성',
      'Streamlit Cloud 배포',
      { p: true, t: '최종 — 프로젝트 발표 및 피드백' },
    ]
  },
];

const TOOLS = [
  { name: 'Cursor IDE', cat: 'AI CODING · IDE', desc: 'AI 기반 코드 에디터. 자연어로 코드 작성·수정·디버깅.', mark: 'C' },
  { name: 'ChatGPT API', cat: 'LLM · OpenAI', desc: 'AI 기능 구현을 위한 대화형 API. 챗봇·요약·분석.', mark: 'G' },
  { name: 'Node.js', cat: 'RUNTIME · JavaScript', desc: '서버 사이드 JavaScript 런타임. Express 기반 백엔드.', mark: 'N' },
  { name: 'React', cat: 'FRAMEWORK · Frontend', desc: '컴포넌트 기반 UI 라이브러리. SPA 프론트엔드 개발.', mark: 'R' },
  { name: 'Supabase', cat: 'BAAS · Database', desc: 'PostgreSQL 기반 백엔드 서비스. 인증·DB·API.', mark: 'S' },
  { name: 'Git / GitHub', cat: 'VERSION CONTROL', desc: '코드 버전 관리 및 협업. 배포 자동화.', mark: 'G' },
  { name: 'Streamlit', cat: 'FRAMEWORK · Python', desc: 'Python 데이터 앱 프레임워크. 대시보드·시각화·AI 앱.', mark: 'St' },
  { name: 'Python', cat: 'LANGUAGE · Data', desc: '데이터 분석과 AI 개발의 핵심 언어. pandas·matplotlib.', mark: 'Py' },
];

const PILLARS = [
  { n: '/01', t: '바이브코딩 우선', d: '코드를 외우는 게 아니라 AI와 대화하며 만듭니다. Cursor IDE와 ChatGPT를 활용해 자연어로 프로그래밍합니다.' },
  { n: '/02', t: '풀스택 완성', d: '프론트엔드(React)부터 백엔드(Node.js), 데이터베이스(Supabase), Streamlit 데이터 앱, AI 연동, 배포까지. 3일 만에 완성합니다.' },
  { n: '/03', t: '실무 결과물', d: '교육이 끝나면 직접 만든 웹 앱, 데이터 대시보드, AI 챗봇을 가져갑니다. 다양한 프로젝트를 통해 노코드 코딩을 체득합니다.' },
];

type TimelinePoint = string | { p: boolean; t: string };

const Home = (): ReactElement => {
  const [tab, setTab] = useState<'day1' | 'day2' | 'day3'>('day1');
  const data = tab === 'day1' ? TIMELINE_DAY1 : tab === 'day2' ? TIMELINE_DAY2 : TIMELINE_DAY3;

  const marqueePhrase = 'Vibe Coding · Cursor IDE · React · Node.js · Supabase · ChatGPT API · Streamlit · Python · Deploy';

  return (
    <>
      <SEOHead
        title={`${site.name} | ${site.nameKo}`}
        description={site.description}
      />

      {/* ── Hero ── */}
      <section className="hero-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div style={{ marginBottom: '16px' }}>
                <img src="/kdn-logo.png" alt="KDN" style={{ height: '48px' }} />
              </div>
              <div className="hero-eyebrow">
                <span>KDN / 2026 · 바이브코딩 풀스택 교육</span>
              </div>
              <h1 className="hero-title-ed">
                코드를 몰라도<br />
                <span className="accent">노코드로 코딩하는</span><br />
                <span className="accent">3일 (21시간)</span>
              </h1>
              <p className="hero-lead">
                KDN 직원을 위한 바이브코딩 실습 중심 교육.
                AI와 대화하며 웹 앱, 데이터 분석, AI 챗봇까지
                다양한 프로젝트를 직접 만들어보는 21시간 집중 과정입니다.
              </p>
              <div className="hero-actions-ed">
                <Link className="btn btn-primary" to="/curriculum/basic">
                  커리큘럼 살펴보기
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" to="/practice">
                  실습 시작하기
                </Link>
              </div>
            </div>

            <div className="hero-side">
              <div className="metric-stack">
                <div className="metric">
                  <div className="metric-num"><span className="accent">3</span></div>
                  <div className="metric-label">교육 일수</div>
                </div>
                <div className="metric">
                  <div className="metric-num">21<span className="small">h</span></div>
                  <div className="metric-label">총 교육 시간</div>
                </div>
                <div className="metric">
                  <div className="metric-num">6+</div>
                  <div className="metric-label">개발 도구</div>
                </div>
                <div className="metric">
                  <div className="metric-num"><span className="accent">80</span><span className="small">%</span></div>
                  <div className="metric-label">실습 비율</div>
                </div>
              </div>

              <div className="hero-card">
                <div className="hero-card-eyebrow">2026 · KDN Vibe Coding</div>
                <div className="hero-card-title">교육 일정 안내</div>
                <ul className="hero-card-list">
                  <li>1일차 — 5.26(화) 09:00~18:00 (8H)</li>
                  <li>2일차 — 5.27(수) 09:00~18:00 (8H)</li>
                  <li>3일차 — 5.28(목) 09:00~15:00 (5H)</li>
                  <li>장소 — 본사 교육관 Smart룸(2층)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee">
        <div className="marquee-track">
          <span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                {marqueePhrase.split(' · ').map((w, j) => (
                  <span key={`${i}-${j}`}>{w}<span className="dot">&#10022;</span></span>
                ))}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* ── Courses ── */}
      <section className="section-ed" id="curriculum">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 01 / Programs</div>
            <h2 className="section-title-ed">3일의 <span className="accent">커리큘럼</span></h2>
            <div className="section-meta">21 hours · 3 days · full-stack</div>
          </div>
          <div className="courses">
            <Link className="course featured" to="/curriculum/basic">
              <div className="course-row">
                <span className="course-tag">DAY / 01</span>
                <span className="course-level"><i className="on" /><i /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>01</div>
              <h3 className="course-title">기획 & 프론트엔드</h3>
              <p className="course-desc">
                바이브코딩 개념과 개발 환경을 구성하고, 서비스를 기획한 뒤 React로 프론트엔드 UI를 구현합니다.
              </p>
              <div className="course-meta-row">
                <span>8시간</span><span>5.26(화)</span><span>실습 포함</span>
              </div>
              <span className="course-cta">
                커리큘럼 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
            <Link className="course" to="/curriculum/intermediate">
              <div className="course-row">
                <span className="course-tag">DAY / 02</span>
                <span className="course-level"><i className="on" /><i className="on" /><i /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>02</div>
              <h3 className="course-title">백엔드 & 인증</h3>
              <p className="course-desc">
                REST API 설계, Node.js 백엔드, Supabase 데이터베이스 연동, JWT/OAuth 인증까지 풀스택을 완성합니다.
              </p>
              <div className="course-meta-row">
                <span>8시간</span><span>5.27(수)</span><span>심화 실습</span>
              </div>
              <span className="course-cta">
                커리큘럼 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
            <Link className="course" to="/curriculum/advanced">
              <div className="course-row">
                <span className="course-tag">DAY / 03</span>
                <span className="course-level"><i className="on" /><i className="on" /><i className="on" /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>03</div>
              <h3 className="course-title">Streamlit & AI 앱</h3>
              <p className="course-desc">
                Python Streamlit으로 데이터 앱을 개발하고, AI API를 연동하여 Streamlit Cloud에 배포합니다.
              </p>
              <div className="course-meta-row">
                <span>5시간</span><span>5.28(목)</span><span>프로젝트 완성</span>
              </div>
              <span className="course-cta">
                커리큘럼 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Curriculum Timeline ── */}
      <section className="section-ed" id="curriculum-detail" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 02 / Schedule</div>
            <h2 className="section-title-ed"><span className="accent">3일</span> &times; 21시간</h2>
            <div className="section-meta">
              {tab === 'day1' ? 'Day 1 — 기획 & 프론트엔드' : tab === 'day2' ? 'Day 2 — 백엔드 & 인증' : 'Day 3 — Streamlit & AI 앱'}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {(['day1', 'day2', 'day3'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setTab(d)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '20px',
                    border: tab === d ? '2px solid var(--ink-surface)' : '1px solid var(--line)',
                    background: tab === d ? 'var(--ink-surface)' : 'var(--bg-white)',
                    color: tab === d ? '#fff' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: tab === d ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  {d === 'day1' ? '1일차 (8H)' : d === 'day2' ? '2일차 (8H)' : '3일차 (5H)'}
                </button>
              ))}
            </div>
          </div>

          <div className="curriculum-ed">
            <aside className="curr-aside">
              <h3>
                {tab === 'day1' ? '기획에서\nUI까지'
                  : tab === 'day2' ? 'API에서\n인증까지'
                  : 'Streamlit으로\nAI 앱까지'}
              </h3>
              <p>
                {tab === 'day1'
                  ? '바이브코딩과 개발 환경을 이해하고, Figma로 서비스를 기획한 뒤 React로 프론트엔드를 구현합니다.'
                  : tab === 'day2'
                  ? 'Node.js로 REST API를 구축하고, Supabase를 연동하며, JWT/OAuth 인증 기능을 구현합니다.'
                  : 'Python Streamlit으로 데이터 앱을 개발하고, AI API를 연동하여 Streamlit Cloud에 배포합니다.'}
              </p>
              <div className="curr-tabs">
                <button className={`curr-tab ${tab === 'day1' ? 'active' : ''}`} onClick={() => setTab('day1')}>1일차</button>
                <button className={`curr-tab ${tab === 'day2' ? 'active' : ''}`} onClick={() => setTab('day2')}>2일차</button>
                <button className={`curr-tab ${tab === 'day3' ? 'active' : ''}`} onClick={() => setTab('day3')}>3일차</button>
              </div>
              <div className="curr-meta">
                {tab === 'day1' ? (
                  <>
                    <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.26(화) · 8시간</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">주제</span><span className="curr-meta-val">기획 + 프론트엔드</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Cursor · Figma · React</span></div>
                  </>
                ) : tab === 'day2' ? (
                  <>
                    <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.27(수) · 8시간</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">주제</span><span className="curr-meta-val">백엔드 + 인증</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Node.js · Supabase · JWT</span></div>
                  </>
                ) : (
                  <>
                    <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.28(목) · 5시간</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">주제</span><span className="curr-meta-val">Streamlit + AI 앱</span></div>
                    <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Streamlit · Python · Claude API</span></div>
                  </>
                )}
              </div>
            </aside>

            <div className="timeline">
              {data.map((item) => (
                <div className="tl-item" key={item.n}>
                  <div>
                    <div className="tl-time">{item.time}</div>
                    <div className="tl-num">{item.n}<span>/{tab === 'day3' ? '03' : '04'}</span></div>
                  </div>
                  <div className="tl-body">
                    <h4>{item.title}</h4>
                    <ul>
                      {item.points.map((p: TimelinePoint, i: number) => (
                        typeof p === 'string'
                          ? <li key={i}>{p}</li>
                          : <li key={i} className="practice">{p.t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="section-ed" id="tools" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 03 / Toolkit</div>
            <h2 className="section-title-ed">다루는 <span className="accent">도구들</span></h2>
            <div className="section-meta">8 core tools · hands-on</div>
          </div>
          <div className="tools-grid">
            {TOOLS.map((t, i) => (
              <div className="tool" key={i}>
                <div className="tool-mark">{t.mark}</div>
                <div>
                  <div className="tool-cat">{t.cat}</div>
                  <div className="tool-name">{t.name}</div>
                </div>
                <p className="tool-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="section-ed" id="approach" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 04 / Approach</div>
            <h2 className="section-title-ed">학습 하는 <span className="accent">방식</span></h2>
            <div className="section-meta">3 principles</div>
          </div>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <div className="pillar" key={i}>
                <div className="pillar-num">{p.n}</div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-ed">
        <div className="container">
          <div className="cta-inner">
            <div>
              <div className="cta-eyebrow">&mdash; 교육 안내</div>
              <h2 className="cta-title-ed">
                3일 후,<br />
                <span className="accent">노코드 코딩</span>이 가능해집니다.
              </h2>
            </div>
            <div className="cta-side">
              <p>
                강의 20% · 실습 80%의 집중 과정. 코딩 경험이 없어도
                AI 도구와 함께라면 충분합니다.
                20명 정원으로 진행됩니다.
              </p>
              <Link className="btn btn-cta" to="/login">
                로그인하고 시작하기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
