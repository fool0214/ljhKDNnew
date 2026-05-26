import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const TECH_STACK = [
  { name: 'React 19', desc: '최신 React로 모든 사이트 구축', icon: 'fa-brands fa-react' },
  { name: 'Vite 7', desc: '초고속 빌드 도구', icon: 'fa-solid fa-bolt' },
  { name: 'TypeScript', desc: '타입 안전성 확보', icon: 'fa-solid fa-code' },
  { name: 'Supabase', desc: '클라우드 백엔드 인프라', icon: 'fa-solid fa-database' },
  { name: 'GitHub Pages', desc: '전체 사이트 배포 플랫폼', icon: 'fa-brands fa-github' },
  { name: 'Resend', desc: '이메일 알림 시스템', icon: 'fa-solid fa-envelope' },
];

const CompanyIntro = (): ReactElement => {
  return (
    <>
      <SEOHead title="드림아이티비즈(DreamIT Biz) 소개 | KDN Vibe Coding" description="다양한 교육 플랫폼을 운영하는 에듀테크 전문 기업 드림아이티비즈" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">DreamIT Biz</div>
          <h2>드림아이티비즈(DreamIT Biz)</h2>
          <p>다양한 교육 플랫폼을 운영하는 에듀테크 전문 기업</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* 회사 소개 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              marginBottom: '48px',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: '12px' }}>ABOUT US</div>
                <h3 style={{ fontSize: '22px', color: 'var(--navy-800)', fontWeight: 700, lineHeight: 1.4, marginBottom: '16px' }}>
                  교육의 미래를<br />기술로 설계합니다
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  드림아이티비즈(DreamIT Biz)는 대학교, 기업, 공공기관을 대상으로
                  맞춤형 교육 플랫폼을 설계·개발·운영하는 에듀테크 전문 기업입니다.
                  AI 교육, 경영학, 코딩, 자격증, 인문교양 등 다양한 분야의
                  교육 사이트를 *.dreamitbiz.com 도메인 하에 운영하고 있으며,
                  각 교육 대상에 맞춘 최적의 학습 경험을 제공합니다.
                </p>
              </div>
              <div style={{
                background: 'var(--ink-surface)',
                borderRadius: '16px',
                padding: '32px',
                color: '#fff',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', marginBottom: '16px', letterSpacing: '0.08em' }}>COMPANY INFO</div>
                {[
                  ['대표', '이애본 (Ph.D)'],
                  ['사업자', '601-45-20154'],
                  ['통신판매', '제2024-수원팔달-0584호'],
                  ['출판사', '제2026-000026호'],
                  ['소재지', '경기도 수원시 팔달구 매산로 45, 419호'],
                  ['이메일', 'aebon@dreamitbiz.com'],
                  ['도메인', 'www.dreamitbiz.com'],
                ].map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', gap: '12px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--gold)', width: '60px', flexShrink: 0, fontWeight: 600 }}>{key}</span>
                    <span style={{ fontSize: '13px', opacity: 0.85 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 운영 플랫폼 소개 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              운영 플랫폼
            </h3>
            <div style={{
              background: 'var(--navy-50)',
              borderLeft: '4px solid var(--gold)',
              padding: '24px 28px',
              borderRadius: '0 12px 12px 0',
              marginBottom: '32px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.8,
            }}>
              드림아이티비즈는 <strong>인공지능(AI), 경영학, 프로그래밍, 자격증, 인문교양, 대학 교과목</strong> 등
              다양한 분야의 교육 플랫폼을 운영하고 있습니다.
              각 플랫폼은 학습 대상과 목적에 맞게 독립적으로 설계되어 있으며,
              대학교 정규 교과목, 기업 사내 교육, 자격증 학습, 개인 역량 개발 등
              폭넓은 교육 수요에 대응합니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '48px' }}>
              {[
                { icon: 'fa-robot', title: 'AI / 인공지능', desc: 'ChatGPT, Gemini, Claude, Copilot, 프롬프트 엔지니어링, AI 리터러시 등' },
                { icon: 'fa-briefcase', title: '경영 전공', desc: 'HRM, 마케팅, 회계, 기획, 디지털비즈니스, UX디자인 등' },
                { icon: 'fa-code', title: '코딩 / 프로그래밍', desc: 'HTML, React, C, Java, Python, 알고리즘, 데이터베이스 등' },
                { icon: 'fa-graduation-cap', title: '대학 교과목', desc: 'AI·SW개론(한신대), 컴퓨팅 사고(한국기술교육대) 등 정규 교과목' },
                { icon: 'fa-award', title: '자격증 / 취업', desc: '정보처리기사, 리눅스, SQLD, AWS, 취업 지원 등' },
                { icon: 'fa-book-open', title: '교양 / 인문', desc: '통계, 외국어, 프레젠테이션, 안전, ESG 등 교양 교육' },
              ].map((item) => (
                <div key={item.title} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '20px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ fontSize: '20px', color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 기술 스택 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              기술 스택
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
              {TECH_STACK.map((tech) => (
                <div key={tech.name} style={{
                  padding: '20px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  textAlign: 'center',
                }}>
                  <i className={tech.icon} style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '10px', display: 'block' }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)' }}>{tech.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{tech.desc}</div>
                </div>
              ))}
            </div>

            {/* 서비스 영역 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              서비스 영역
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
              {[
                { icon: 'fa-graduation-cap', title: '대학교 교육 플랫폼', desc: '한신대, 한국기술교육대 등 대학 교과목 전용 사이트 제작·운영' },
                { icon: 'fa-building', title: '기업 교육 플랫폼', desc: 'KDN, KOMIPO 등 기업 맞춤 AI·바이브코딩 교육 플랫폼 구축' },
                { icon: 'fa-book', title: '전자출판·도서', desc: 'AI·IT·경영 분야 출판 및 전자책 서비스' },
                { icon: 'fa-laptop', title: 'IT 컨설팅', desc: '디지털 전환, AI 도입, 웹 시스템 구축 컨설팅' },
              ].map((s) => (
                <div key={s.title} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '24px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                }}>
                  <i className={`fa-solid ${s.icon}`} style={{ fontSize: '20px', color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--navy-800)' }}>{s.title}</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              textAlign: 'center',
              padding: '36px',
              background: 'var(--navy-50)',
              borderRadius: '16px',
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                기업 맞춤 교육 플랫폼 제작에 관심이 있으시면 언제든지 문의해주세요.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://www.dreamitbiz.com" target="_blank" rel="noopener noreferrer" style={{
                  padding: '10px 24px',
                  background: 'var(--ink-surface)',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  <i className="fa-solid fa-globe" style={{ marginRight: '6px' }} />
                  DreamIT Biz 방문
                </a>
                <Link to="/about/instructor" style={{
                  padding: '10px 24px',
                  background: 'var(--bg-white)',
                  color: 'var(--navy-800)',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  <i className="fa-solid fa-user" style={{ marginRight: '6px' }} />
                  강사 소개 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyIntro;
