import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const EXPERTISE = [
  { area: '생성형 AI 교육', detail: 'ChatGPT, Gemini, Claude, Copilot 등 AI 도구 활용 교육', icon: 'fa-robot' },
  { area: '프롬프트 엔지니어링', detail: 'SCORE 프레임워크, Chain-of-Thought, Few-shot 등 고급 기법', icon: 'fa-wand-magic-sparkles' },
  { area: '에듀테크 플랫폼', detail: 'React + Supabase 기반 86개 교육 사이트 설계·개발·운영', icon: 'fa-laptop-code' },
  { area: 'IT/디지털 전환', detail: '기업 DX 컨설팅, 웹 시스템 구축, 데이터 분석', icon: 'fa-chart-line' },
  { area: '대학 교육', detail: 'AI·SW개론, 컴퓨팅 사고 등 대학 교과목 강의', icon: 'fa-graduation-cap' },
  { area: '출판/콘텐츠', detail: 'AI·IT·경영 분야 전문 도서 기획·출판', icon: 'fa-book' },
];

const CAREER = [
  { period: '현재', role: '드림아이티비즈(DreamIT Biz) 대표', detail: '에듀테크 전문 기업 경영, 86개 교육 사이트 운영' },
  { period: '2018~2023', role: '경기대학교 겸임교수', detail: '소프트웨어 기초 및 파이썬 프로그래밍, Warm-Up 과정 담당' },
  { period: '현재', role: '한신대학교 AI·SW대학 겸임교수', detail: 'AI·SW개론, 공학설계입문, 자바프로그래밍, 웹프로그래밍 담당' },
  { period: '현재', role: '한국기술교육대학교 외래교수', detail: '"컴퓨팅 사고" 교과목 담당' },
  { period: '2001~', role: '기업 AI 교육 전문 강사', detail: '고용노동부 직업능력개발훈련교사 — 정보통신분야 인공지능, 프로그래밍 개발, UI/UX디자인 외 다수' },
];

const EDUCATION_SITES = [
  { name: 'AI 프롬프트 교육', url: 'https://ai-prompt.dreamitbiz.com' },
  { name: 'ChatGPT 활용', url: 'https://chatgpt.dreamitbiz.com' },
  { name: 'Gemini 활용', url: 'https://gemini.dreamitbiz.com' },
  { name: 'Claude AI', url: 'https://claude.dreamitbiz.com' },
  { name: 'AI 리터러시', url: 'https://ai-literacy.dreamitbiz.com' },
  { name: '바이브코딩', url: 'https://vibe.dreamitbiz.com' },
];

const InstructorIntro = (): ReactElement => {
  return (
    <>
      <SEOHead title="강사 소개 | KDN Vibe Coding" description="기업 AI 교육 전문 강사 이애본 박사 프로필" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Instructor</div>
          <h2>강사 소개</h2>
          <p>기업 AI 교육 전문 강사 프로필</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* 프로필 카드 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              gap: '36px',
              marginBottom: '48px',
              padding: '36px',
              background: 'var(--bg-white)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
            }}>
              {/* 프로필 이미지 영역 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ink-surface), var(--ink-surface-hover))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold)',
                  fontSize: '64px',
                  fontWeight: 800,
                  fontFamily: "'Playfair Display', serif",
                }}>
                  A
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-800)' }}>이애본</div>
                  <div style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, marginTop: '2px' }}>Ph.D Aebon Lee</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { icon: 'fa-solid fa-envelope', href: 'mailto:aebon@dreamitbiz.com' },
                    { icon: 'fa-solid fa-globe', href: 'https://www.dreamitbiz.com' },
                  ].map((s) => (
                    <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--navy-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--navy-800)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}>
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* 프로필 정보 */}
              <div>
                <div style={{
                  background: 'var(--navy-50)',
                  borderLeft: '4px solid var(--gold)',
                  padding: '20px 24px',
                  borderRadius: '0 12px 12px 0',
                  marginBottom: '24px',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.8,
                }}>
                  생성형 인공지능 교육과 에듀테크 플랫폼 개발을 전문으로 하는 강사입니다.
                  86개의 교육 사이트를 직접 설계·개발·운영하고 있으며,
                  대학교(한신대, 한국기술교육대, 경기대)와 기업(KDN, KOMIPO 등)에서
                  AI 활용 교육을 진행하고 있습니다.
                </div>

                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', marginBottom: '12px', letterSpacing: '0.08em' }}>KEY INFO</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    ['직위', '드림아이티비즈 대표'],
                    ['학위', '박사 (Ph.D)'],
                    ['전공', 'AI / IT / 경영학'],
                    ['교육 사이트', '다수 운영'],
                    ['교육 대상', '대학·기업·공공기관'],
                  ].map(([key, val]) => (
                    <div key={key} style={{
                      padding: '8px 12px',
                      background: 'var(--navy-50)',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{key}</span>
                      <span style={{ marginLeft: '8px', color: 'var(--navy-800)', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 전문 분야 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              전문 분야
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '48px' }}>
              {EXPERTISE.map((e) => (
                <div key={e.area} style={{
                  padding: '20px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                }}>
                  <i className={`fa-solid ${e.icon}`} style={{ fontSize: '20px', color: 'var(--gold)', marginBottom: '12px', display: 'block' }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '4px' }}>{e.area}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e.detail}</div>
                </div>
              ))}
            </div>

            {/* 경력 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              주요 경력
            </h3>
            <div style={{ marginBottom: '48px' }}>
              {CAREER.map((c, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '16px 0',
                  borderBottom: i < CAREER.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    width: '72px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    flexShrink: 0,
                    paddingTop: '2px',
                  }}>
                    {c.period}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)' }}>{c.role}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI 교육 콘텐츠 */}
            <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>
              주요 AI 교육 사이트
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
              {EDUCATION_SITES.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  padding: '16px 20px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                }}>
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: 'var(--gold)', fontSize: '12px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy-800)' }}>{s.name}</span>
                </a>
              ))}
            </div>

            {/* 교육 철학 */}
            <div style={{
              padding: '32px',
              background: 'var(--ink-surface)',
              borderRadius: '16px',
              color: '#fff',
              marginBottom: '48px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', marginBottom: '16px', letterSpacing: '0.08em' }}>
                TEACHING PHILOSOPHY
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.4 }}>
                &ldquo;AI는 도구이고, 진짜 혁신은 사람이 만듭니다.&rdquo;
              </h4>
              <div style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.8 }}>
                <p style={{ marginBottom: '12px' }}>
                  교육의 핵심은 기술을 '아는 것'이 아니라 '할 수 있는 것'으로 만드는 데 있습니다.
                  이론 30%, 실습 70%의 구성으로 교육 현장에서 바로 적용할 수 있는 실무 역량을 키우는 것을 목표로 합니다.
                </p>
                <p style={{ margin: 0 }}>
                  86개 교육 사이트를 직접 개발·운영한 경험을 바탕으로,
                  수강생이 교육 이후에도 지속적으로 학습하고 성장할 수 있는 플랫폼을 함께 제공합니다.
                </p>
              </div>
            </div>

            {/* 하단 링크 */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link to="/about/company" style={{
                padding: '10px 24px',
                background: 'var(--navy-50)',
                color: 'var(--navy-800)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}>
                <i className="fa-solid fa-building" style={{ marginRight: '6px' }} />
                드림아이티비즈 소개
              </Link>
              <Link to="/about" style={{
                padding: '10px 24px',
                background: 'var(--navy-50)',
                color: 'var(--navy-800)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}>
                <i className="fa-solid fa-info-circle" style={{ marginRight: '6px' }} />
                제작의도
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorIntro;
