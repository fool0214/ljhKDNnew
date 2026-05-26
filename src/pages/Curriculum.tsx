import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const Curriculum = (): ReactElement => {
  return (
    <>
      <SEOHead title="커리큘럼" description="KDN 바이브코딩 풀스택 웹 개발 교육 3일 21시간 커리큘럼" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Programs</div>
          <h2>커리큘럼</h2>
          <p>바이브코딩으로 풀스택 웹 개발 — 3일 21시간 교육 과정 안내</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 교육 과정</div>
            <h2 className="section-title-ed">3일 완성 <span className="accent">커리큘럼</span></h2>
            <div className="section-meta">21 hours · 3 days</div>
          </div>
          <div className="courses">
            <Link className="course featured" to="/curriculum/basic">
              <div className="course-row">
                <span className="course-tag">DAY / 01</span>
                <span className="course-level"><i className="on" /><i /></span>
              </div>
              <div className="course-num"><span className="slash">/</span>01</div>
              <h3 className="course-title">1일차 — 기획 & 프론트엔드</h3>
              <p className="course-desc">
                바이브코딩 & AI Agent 이해, 개발 환경 구성, 웹 서비스 기획,
                HTML/CSS/JS 기초, React 기반 프론트엔드 UI 구현 실습
              </p>
              <div className="course-meta-row">
                <span>8시간 · 5.26(화)</span><span>입문~초급</span><span>실습 중심</span>
              </div>
              <span className="course-cta">
                1일차 커리큘럼 보기
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
              <h3 className="course-title">2일차 — 백엔드 & 인증</h3>
              <p className="course-desc">
                REST API 설계 및 Node.js 백엔드 구현, Supabase 데이터베이스 연동,
                프론트–백엔드 통합, JWT/OAuth 인증·인가 기능 구현
              </p>
              <div className="course-meta-row">
                <span>8시간 · 5.27(수)</span><span>중급</span><span>실습 중심</span>
              </div>
              <span className="course-cta">
                2일차 커리큘럼 보기
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
              <h3 className="course-title">3일차 — Streamlit & AI 앱</h3>
              <p className="course-desc">
                Python Streamlit으로 데이터 앱 개발, pandas/matplotlib 데이터 시각화,
                AI API 연동, Streamlit Cloud 배포 및 최종 프로젝트 발표
              </p>
              <div className="course-meta-row">
                <span>5시간 · 5.28(목)</span><span>심화</span><span>프로젝트 완성</span>
              </div>
              <span className="course-cta">
                3일차 커리큘럼 보기
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

export default Curriculum;
