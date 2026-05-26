import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const TIMELINE = [
  {
    n: '01', time: '09:00 ─ 12:00 · 3시간',
    title: 'REST API 설계 및 Node.js 백엔드 구현',
    points: [
      'REST API 설계 원칙과 엔드포인트 설계',
      'Node.js + Express 서버 구축',
      'API 엔드포인트 구현 (CRUD)',
      '미들웨어와 에러 처리',
      'Cursor AI로 백엔드 코드 자동 생성',
      { p: true, t: '실습 — AI로 백엔드 API 자동 생성하기' },
    ]
  },
  {
    n: '02', time: '13:00 ─ 15:00 · 2시간',
    title: '데이터베이스 연동 및 프론트–백엔드 통합',
    points: [
      'Supabase(PostgreSQL) 설정 및 테이블 설계',
      'CRUD 기능 구현 및 데이터 모델링',
      '프론트엔드 ↔ 백엔드 API 연동',
      '데이터 흐름 디버깅 및 테스트',
      { p: true, t: '실습 — 풀스택 데이터 흐름 완성하기' },
    ]
  },
  {
    n: '03', time: '16:00 ─ 18:00 · 2시간',
    title: '인증·인가(JWT/OAuth) 기능 구현',
    points: [
      'JWT 토큰 기반 인증 원리',
      'OAuth 소셜 로그인 구현 (Google, Kakao)',
      '세션 관리와 보안 처리',
      '인증 미들웨어 적용',
      { p: true, t: '실습 — 로그인/회원가입 기능 구현하기' },
    ]
  },
];

type TimelinePoint = string | { p: boolean; t: string };

const CurriculumIntermediate = (): ReactElement => {
  return (
    <>
      <SEOHead title="2일차 커리큘럼 — 백엔드 & 인증" description="바이브코딩 2일차: REST API, Node.js, Supabase, JWT/OAuth (8시간)" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Day 2 · 5.27(수) · 8시간</div>
          <h2>2일차 — 백엔드 & 인증</h2>
          <p>REST API 설계, Node.js 백엔드, Supabase DB 연동, JWT/OAuth 인증</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 2일차</div>
            <h2 className="section-title-ed"><span className="accent">8시간</span> · 3파트</h2>
            <div className="section-meta">Day 2 — Backend & Auth</div>
          </div>

          <div className="curriculum-ed">
            <aside className="curr-aside">
              <h3>{'API에서\n인증까지'}</h3>
              <p>
                Node.js로 REST API를 설계·구현하고, Supabase 데이터베이스를
                연동합니다. 프론트–백엔드를 통합한 뒤 JWT/OAuth
                인증 기능까지 구현합니다.
              </p>
              <div className="curr-meta">
                <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.27(수) · 8시간</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Node.js · Supabase · JWT</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">포맷</span><span className="curr-meta-val">강의 20% + 실습 80%</span></div>
              </div>
            </aside>

            <div className="timeline">
              {TIMELINE.map((item) => (
                <div className="tl-item" key={item.n}>
                  <div>
                    <div className="tl-time">{item.time}</div>
                    <div className="tl-num">{item.n}<span>/03</span></div>
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

export default CurriculumIntermediate;
