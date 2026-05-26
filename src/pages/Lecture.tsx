import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const Lecture = (): ReactElement => {
  return (
    <>
      <SEOHead title="강의안" description="KDN 바이브코딩 풀스택 웹 개발 강의 자료" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Lecture Notes</div>
          <h2>강의안</h2>
          <p>바이브코딩으로 풀스택 웹 개발 — 일차별 강의 자료</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 강의 자료</div>
            <h2 className="section-title-ed">일차별 <span className="accent">강의안</span></h2>
            <div className="section-meta">3 days · detailed notes</div>
          </div>
          <div className="courses">
            <Link className="course featured" to="/lecture/basic">
              <div className="course-row">
                <span className="course-tag">LECTURE / 01</span>
                <span className="course-level"><i className="on" /><i /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>01</div>
              <h3 className="course-title">1일차 강의안</h3>
              <p className="course-desc">
                바이브코딩 개요, 개발 환경 구성, 웹 서비스 기획,
                프론트엔드 기초, React UI 구현 실습 강의 자료
              </p>
              <div className="course-meta-row">
                <span>8시간 분량</span><span>기획 & 프론트엔드</span>
              </div>
              <span className="course-cta">
                1일차 강의안 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>

            <Link className="course" to="/lecture/intermediate">
              <div className="course-row">
                <span className="course-tag">LECTURE / 02</span>
                <span className="course-level"><i className="on" /><i className="on" /><i /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>02</div>
              <h3 className="course-title">2일차 강의안</h3>
              <p className="course-desc">
                REST API 설계, Node.js 백엔드, Supabase DB 연동,
                프론트–백엔드 통합, JWT/OAuth 인증 구현 강의 자료
              </p>
              <div className="course-meta-row">
                <span>8시간 분량</span><span>백엔드 & 인증</span>
              </div>
              <span className="course-cta">
                2일차 강의안 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>

            <Link className="course" to="/lecture/advanced">
              <div className="course-row">
                <span className="course-tag">LECTURE / 03</span>
                <span className="course-level"><i className="on" /><i className="on" /><i className="on" /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>03</div>
              <h3 className="course-title">3일차 강의안</h3>
              <p className="course-desc">
                Python Streamlit 데이터 앱, pandas/matplotlib 시각화,
                AI API 연동, Streamlit Cloud 배포 강의 자료
              </p>
              <div className="course-meta-row">
                <span>5시간 분량</span><span>Streamlit & AI 앱</span>
              </div>
              <span className="course-cta">
                3일차 강의안 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Lecture;
