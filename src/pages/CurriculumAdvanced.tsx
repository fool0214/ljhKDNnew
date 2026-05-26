import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const TIMELINE = [
  {
    n: '01', time: '09:00 ─ 11:00 · 2시간',
    title: 'Streamlit 소개 & Python 기초',
    points: [
      'Streamlit이란 — Python 데이터 앱 프레임워크',
      'Python 핵심 문법 (변수, 리스트, 딕셔너리, 함수)',
      'Streamlit 설치 및 첫 앱 실행 (streamlit run app.py)',
      'UI 컴포넌트: st.title, st.write, st.button, st.text_input',
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
      'Streamlit Cloud 배포 (GitHub 연동)',
      '최종 프로젝트 시연 준비',
      { p: true, t: '최종 — 프로젝트 발표 및 피드백' },
    ]
  },
];

type TimelinePoint = string | { p: boolean; t: string };

const CurriculumAdvanced = (): ReactElement => {
  return (
    <>
      <SEOHead title="3일차 커리큘럼 — Streamlit & AI 앱" description="바이브코딩 3일차: Streamlit 데이터 앱, AI API 연동, 배포 (5시간)" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Day 3 · 5.28(목) · 5시간</div>
          <h2>3일차 — Streamlit & AI 앱</h2>
          <p>Python Streamlit으로 데이터 앱 개발, AI API 연동, Streamlit Cloud 배포</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 3일차</div>
            <h2 className="section-title-ed"><span className="accent">5시간</span> · 3파트</h2>
            <div className="section-meta">Day 3 — Streamlit & AI App</div>
          </div>

          <div className="curriculum-ed">
            <aside className="curr-aside">
              <h3>{'Streamlit으로\nAI 앱까지'}</h3>
              <p>
                Python Streamlit으로 데이터 앱을 개발하고,
                Claude/ChatGPT API를 연동하여 AI 기능을 추가합니다.
                완성된 앱을 Streamlit Cloud에 배포합니다.
              </p>
              <div className="curr-meta">
                <div className="curr-meta-row"><span className="curr-meta-key">일정</span><span className="curr-meta-val">5.28(목) · 5시간</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">도구</span><span className="curr-meta-val">Streamlit · Python · Claude API</span></div>
                <div className="curr-meta-row"><span className="curr-meta-key">포맷</span><span className="curr-meta-val">실습 + 프로젝트 발표</span></div>
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

export default CurriculumAdvanced;
