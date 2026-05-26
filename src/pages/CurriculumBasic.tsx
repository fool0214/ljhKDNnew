import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const TIMELINE = [
  {
    n: '01', time: '09:00 ─ 12:00 · 3시간',
    title: '바이브코딩 개요 및 개발 환경 구성',
    points: [
      '바이브코딩이란 — AI Agent와 자연어로 개발하는 패러다임',
      'Cursor IDE 설치 및 환경 설정',
      'Node.js / Git / GitHub 개발 환경 구성',
      'ChatGPT API 연동 기초',
      '프로젝트 초기 설정 및 폴더 구조 이해',
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
      'AI를 활용한 기획서 자동 생성',
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
      'DOM 조작과 이벤트 처리',
      { p: true, t: '실습 — 바이브코딩으로 랜딩 페이지 만들기' },
    ]
  },
  {
    n: '04', time: '16:00 ─ 18:00 · 2시간',
    title: 'React 기반 프론트엔드 UI 구현',
    points: [
      'React 컴포넌트와 JSX 문법',
      'State 관리와 이벤트 처리',
      'React Router로 페이지 라우팅',
      'Cursor AI로 컴포넌트 자동 생성',
      'Props와 컴포넌트 간 데이터 전달',
      { p: true, t: '실습 — AI로 React UI 컴포넌트 구현하기' },
    ]
  },
];

type TimelinePoint = string | { p: boolean; t: string };

const CurriculumBasic = (): ReactElement => {
  return (
    <>
      <SEOHead title="1일차 커리큘럼 — 기획 & 프론트엔드" description="바이브코딩 1일차: 개발환경 구성, 서비스 기획, React 프론트엔드 (8시간)" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Day 1 · 5.26(화) · 8시간</div>
          <h2>1일차 — 기획 & 프론트엔드</h2>
          <p>바이브코딩 개요, 개발 환경 구성, 웹 서비스 기획, React UI 구현</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 1일차</div>
            <h2 className="section-title-ed"><span className="accent">8시간</span> · 4파트</h2>
            <div className="section-meta">Day 1 — Planning & Frontend</div>
          </div>

          <div className="curriculum-ed">
            <aside className="curr-aside">
              <h3>{'기획에서\nUI까지'}</h3>
              <p>
                바이브코딩과 AI Agent를 이해하고 개발 환경을 구성합니다.
                Figma로 서비스를 기획한 뒤, HTML/CSS/JS 기초를 거쳐
                React로 프론트엔드 UI를 구현합니다.
              </p>
              <div className="curr-meta">
                <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.26(화) · 8시간</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Cursor · Figma · React</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">포맷</span><span className="curr-meta-val">강의 20% + 실습 80%</span></div>
              </div>
            </aside>

            <div className="timeline">
              {TIMELINE.map((item) => (
                <div className="tl-item" key={item.n}>
                  <div>
                    <div className="tl-time">{item.time}</div>
                    <div className="tl-num">{item.n}<span>/04</span></div>
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
    </>
  );
};

export default CurriculumBasic;
