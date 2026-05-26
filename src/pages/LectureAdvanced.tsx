import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'part1', label: 'Part 1: Streamlit 소개 & Python 기초' },
  { id: 'part2', label: 'Part 2: Streamlit 데이터 앱 개발' },
  { id: 'part3', label: 'Part 3: AI 연동 & 배포' },
];

const LectureAdvanced = (): ReactElement => {
  const [activeSection, setActiveSection] = useState('part1');

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <>
      <SEOHead title="3일차 강의안 — Streamlit & AI 앱" description="바이브코딩 3일차: Streamlit 데이터 앱, AI API 연동, 배포" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Day 3 Lecture · 5시간</div>
          <h2>3일차 강의안 — Streamlit & AI 앱</h2>
          <p>Python Streamlit 데이터 앱 개발, AI API 연동, Streamlit Cloud 배포 강의 자료</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-book-open" />
              3일차 목차
            </div>

            <ul className="ls-nav">
              {sections.map((s) => (
                <li key={s.id} className="ls-nav-item">
                  <button
                    className={`ls-nav-link${activeSection === s.id ? ' active' : ''}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    <i className="fa-solid fa-circle" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="ls-divider" />

            <div className="ls-guide">
              <div className="ls-guide-label">학습 목표</div>
              <ul className="ls-guide-list">
                <li>Python 기초 문법을 이해합니다</li>
                <li>Streamlit으로 데이터 앱을 만듭니다</li>
                <li>pandas/matplotlib로 데이터를 시각화합니다</li>
                <li>AI API를 Streamlit 앱에 연동합니다</li>
                <li>Streamlit Cloud에 앱을 배포합니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/lecture/intermediate" className="ls-course-link">
              <i className="fa-solid fa-arrow-left" />
              2일차 강의안으로
              <span>Day 2</span>
            </Link>
          </aside>

          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* Part 1 */}
              <div id="part1" className="lecture-section">
                <h3>Part 1: Streamlit 소개 & Python 기초 (09:00~11:00)</h3>
                <div className="lecture-content">
                  <h4>1. Streamlit이란?</h4>
                  <p>
                    Streamlit은 Python으로 데이터 앱을 빠르게 만들 수 있는 오픈소스 프레임워크입니다.
                    HTML/CSS/JavaScript 없이도 Python 코드만으로 인터랙티브한 웹 앱을 구축할 수 있어,
                    데이터 분석가와 비개발자도 쉽게 활용할 수 있습니다.
                  </p>

                  <div className="example-box">
                    <strong>Streamlit의 특징</strong><br />
                    1. Python 코드만으로 웹 앱 생성<br />
                    2. 실시간 핫 리로드 (코드 수정 즉시 반영)<br />
                    3. 풍부한 위젯 (슬라이더, 드롭다운, 파일 업로더 등)<br />
                    4. pandas, matplotlib, plotly 등 데이터 라이브러리와 완벽 호환<br />
                    5. Streamlit Cloud로 무료 배포 가능
                  </div>

                  <h4>2. Python 핵심 문법</h4>
                  <p>
                    Streamlit 앱을 만들기 위한 Python 기초 문법을 학습합니다.
                    변수, 자료형, 리스트, 딕셔너리, 함수를 다루고, 실습에 필요한 수준까지 익힙니다.
                  </p>

                  <div className="example-box">
                    <strong>핵심 문법 요약</strong><br />
                    <strong>변수</strong>: name = "KDN" / count = 100<br />
                    <strong>리스트</strong>: items = ["전력", "IT", "보안"]<br />
                    <strong>딕셔너리</strong>: data = &#123;"부서": "전력IT", "인원": 50&#125;<br />
                    <strong>함수</strong>: def calculate(x, y): return x + y<br />
                    <strong>조건문</strong>: if value &gt; 100: print("초과")<br />
                    <strong>반복문</strong>: for item in items: print(item)
                  </div>

                  <h4>3. Streamlit 설치 및 첫 앱 실행</h4>
                  <div className="example-box">
                    <strong>설치 및 실행</strong><br />
                    pip install streamlit<br />
                    streamlit run app.py<br /><br />
                    <strong>기본 컴포넌트</strong><br />
                    st.title("앱 제목") — 제목 표시<br />
                    st.write("내용") — 텍스트/데이터 출력<br />
                    st.button("클릭") — 버튼<br />
                    st.text_input("이름") — 텍스트 입력<br />
                    st.selectbox("선택", options) — 드롭다운
                  </div>

                  <div className="tip-box">
                    <strong>실습</strong>: 자기소개 Streamlit 앱을 만듭니다. 이름, 부서, 관심 분야를 입력받아
                    화면에 표시하는 간단한 앱을 작성합니다.
                  </div>
                </div>
              </div>

              {/* Part 2 */}
              <div id="part2" className="lecture-section">
                <h3>Part 2: Streamlit 데이터 앱 개발 (11:00~12:00)</h3>
                <div className="lecture-content">
                  <h4>1. 레이아웃 & 위젯</h4>
                  <ul>
                    <li><strong>st.sidebar</strong>: 사이드바에 필터/설정 배치</li>
                    <li><strong>st.columns</strong>: 컬럼 레이아웃으로 화면 분할</li>
                    <li><strong>st.slider</strong>: 숫자 범위 선택</li>
                    <li><strong>st.selectbox / st.multiselect</strong>: 드롭다운 선택</li>
                    <li><strong>st.file_uploader</strong>: CSV/Excel 파일 업로드</li>
                    <li><strong>st.metric</strong>: KPI 지표 표시</li>
                    <li><strong>st.tabs / st.expander</strong>: 콘텐츠 정리</li>
                  </ul>

                  <h4>2. pandas/matplotlib 데이터 시각화</h4>
                  <div className="example-box">
                    <strong>pandas 기본 사용법</strong><br />
                    import pandas as pd<br />
                    df = pd.read_csv("data.csv") — CSV 파일 읽기<br />
                    df.describe() — 기본 통계량<br />
                    df.groupby("지역").sum() — 그룹별 합산<br /><br />
                    <strong>Streamlit 차트</strong><br />
                    st.line_chart(df) — 라인 차트<br />
                    st.bar_chart(df) — 막대 차트<br />
                    st.dataframe(df) — 데이터 테이블<br />
                    st.pyplot(fig) — matplotlib 차트 삽입
                  </div>

                  <h4>3. CSV 업로드 & 분석 대시보드</h4>
                  <p>
                    st.file_uploader로 CSV 파일을 업로드하고, pandas로 데이터를 분석한 뒤,
                    차트와 지표를 대시보드 형태로 구성합니다.
                  </p>

                  <div className="tip-box">
                    <strong>실습</strong>: KDN 전력 데이터 분석 대시보드를 만듭니다.
                    전력사용량 CSV를 업로드하여 월별 추이, 지역별 비교, 핵심 KPI를 시각화합니다.
                  </div>
                </div>
              </div>

              {/* Part 3 */}
              <div id="part3" className="lecture-section">
                <h3>Part 3: AI 연동 & Streamlit Cloud 배포 (13:00~15:00)</h3>
                <div className="lecture-content">
                  <h4>1. Claude/ChatGPT API 연동</h4>
                  <p>
                    Streamlit 앱에 AI API를 연동하여 데이터에 대한 질의응답, 요약, 분석 기능을 추가합니다.
                  </p>

                  <div className="example-box">
                    <strong>API 연동 구조</strong><br />
                    1. API 키 설정 (st.secrets 또는 환경변수)<br />
                    2. 사용자 입력 받기 (st.text_area / st.chat_input)<br />
                    3. API 호출 및 응답 처리<br />
                    4. st.chat_message로 대화 UI 구성<br />
                    5. st.session_state로 대화 이력 관리
                  </div>

                  <h4>2. AI 챗봇 기능이 포함된 데이터 앱</h4>
                  <ul>
                    <li>데이터 업로드 + AI 분석 기능 통합</li>
                    <li>"이 데이터에서 이상치를 찾아줘" 같은 자연어 질의</li>
                    <li>AI가 데이터를 분석하고 인사이트를 제공</li>
                    <li>분석 결과를 차트로 자동 시각화</li>
                  </ul>

                  <h4>3. Streamlit Cloud 배포</h4>
                  <div className="example-box">
                    <strong>배포 절차</strong><br />
                    1. GitHub 저장소에 코드 푸시<br />
                    2. requirements.txt 파일 작성 (streamlit, pandas, openai 등)<br />
                    3. share.streamlit.io에서 배포 설정<br />
                    4. Secrets 관리 (API 키 등)<br />
                    5. 배포 완료 — 공유 가능한 URL 생성
                  </div>

                  <h4>4. 최종 프로젝트 발표</h4>
                  <div className="tip-box">
                    <strong>최종 프로젝트 발표</strong>: 3일간 만든 웹 서비스와 Streamlit 데이터 앱을 발표합니다.
                    서비스 기획 의도, 기술 구성, 핵심 기능, 향후 활용 계획을 공유합니다.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LectureAdvanced;
