import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

/* ── 카테고리 ── */
interface Category {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

const CATEGORIES: Category[] = [
  { id: 'web', label: '웹 개발', icon: 'fa-globe', desc: 'React + TypeScript 프론트엔드' },
  { id: 'streamlit', label: '스트림릿', icon: 'fa-chart-line', desc: 'Python Streamlit 데이터 앱' },
  { id: 'data', label: '데이터 분석', icon: 'fa-chart-bar', desc: 'Python 데이터 분석 & 시각화' },
  { id: 'ai', label: 'AI 앱', icon: 'fa-robot', desc: 'Claude/ChatGPT API 연동' },
];

/* ── 프로젝트 ── */
interface Project {
  id: number;
  categoryId: string;
  title: string;
  description: string;
  difficulty: '초급' | '중급' | '고급';
  duration: string;
  techStack: string[];
  steps: string[];
  prompt: string;
}

const PROJECTS: Project[] = [
  /* ── 웹 개발 ── */
  {
    id: 1, categoryId: 'web',
    title: 'Todo 앱',
    description: 'React + TypeScript로 할 일 관리 앱을 만듭니다. 입력, 체크, 삭제, 필터링 기능과 localStorage 데이터 유지를 구현합니다.',
    difficulty: '초급', duration: '30분',
    techStack: ['React', 'TypeScript', 'CSS'],
    steps: ['Claude Code로 새 React + Vite 프로젝트 생성', 'TodoItem 컴포넌트 설계', 'useState로 상태 관리', '추가/삭제/완료토글 구현', 'localStorage 연동', 'CSS 스타일링 및 반응형'],
    prompt: `너는 React + TypeScript 전문 프론트엔드 개발자야.
할 일 관리 웹 앱을 만들어줘.

[기능]
- 상단: 할 일 입력 폼 (텍스트 + 추가 버튼)
- 중앙: 필터 탭 (전체 / 진행중 / 완료)
- 하단: 할 일 목록 (체크박스 + 제목 + 삭제 버튼)
- 완료 항목은 취소선 + 흐린 색상
- localStorage로 데이터 영속화

[조건]
- TypeScript 사용, Vite 기반
- TodoItem은 별도 컴포넌트로 분리
- 모던하고 깔끔한 CSS 포함
- 모바일 반응형 디자인`,
  },
  {
    id: 2, categoryId: 'web',
    title: '포트폴리오 사이트',
    description: '개인 포트폴리오 SPA를 제작합니다. Hero, About, Skills, Projects, Contact 섹션과 스크롤 애니메이션을 적용합니다.',
    difficulty: '중급', duration: '45분',
    techStack: ['React', 'TypeScript', 'CSS', 'AOS'],
    steps: ['섹션별 컴포넌트 설계', 'Navbar 스크롤 이벤트 처리', 'CSS Grid/Flexbox 반응형 레이아웃', 'AOS 라이브러리 스크롤 애니메이션', 'Contact 폼 UI', 'GitHub Pages 배포'],
    prompt: `너는 React 프론트엔드 전문 개발자야.
개인 포트폴리오 SPA 웹사이트를 만들어줘.

[페이지 구성]
1. Hero — 이름, 직함, 간단 소개, CTA 버튼
2. About — 자기소개, 프로필 이미지
3. Skills — 기술 스택 (아이콘 + 프로그레스 바)
4. Projects — 프로젝트 카드 그리드 (이미지, 제목, 설명, GitHub 링크)
5. Contact — 이메일/전화 정보, SNS 링크

[조건]
- React + TypeScript + Vite
- 반응형 디자인 (mobile-first)
- 스크롤 시 Navbar 배경색 변경
- 각 섹션 진입 시 fade-in 애니메이션
- 다크 네이비 (#1B2A4A) + 골드 (#D4760A) 색상 테마`,
  },
  {
    id: 3, categoryId: 'web',
    title: '실시간 게시판',
    description: 'Supabase 백엔드로 회원가입, 로그인, 게시글 CRUD, 댓글 기능이 있는 게시판을 구현합니다.',
    difficulty: '고급', duration: '60분',
    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    steps: ['Supabase 프로젝트 생성 및 테이블 설계', 'Auth 회원가입/로그인 구현', 'RLS 정책 설정', '게시글 CRUD 기능', '댓글 기능 추가', 'React Router 라우팅'],
    prompt: `너는 React + Supabase 풀스택 전문 개발자야.
게시판 웹 앱을 만들어줘.

[DB 테이블]
- posts: id, title, content, author_id, created_at
- comments: id, post_id, content, author_id, created_at

[기능]
- 회원가입 / 로그인 (Supabase Auth)
- 게시글: 목록(페이지네이션), 상세보기, 작성, 수정, 삭제
- 댓글: 작성, 삭제 (본인만)
- RLS로 본인 글만 수정/삭제 가능

[조건]
- React + TypeScript + Vite + Supabase
- React Router v6 사용
- 카드형 게시글 목록 UI
- 모바일 반응형`,
  },
  {
    id: 4, categoryId: 'web',
    title: '랜딩 페이지 빌더',
    description: '마케팅용 원페이지 랜딩 페이지를 만듭니다. 히어로 배너, 특징 소개, 가격표, CTA, FAQ 아코디언을 포함합니다.',
    difficulty: '중급', duration: '40분',
    techStack: ['React', 'TypeScript', 'CSS'],
    steps: ['섹션 구조 설계 (Hero, Features, Pricing, FAQ, CTA)', '히어로 배너 (그라디언트 배경 + CTA 버튼)', '특징 카드 그리드 (아이콘 + 설명)', '가격표 3열 비교 카드', 'FAQ 아코디언 (클릭 시 펼침)', 'Smooth Scroll 네비게이션'],
    prompt: `너는 React 프론트엔드 전문 개발자야.
SaaS 마케팅용 원페이지 랜딩 사이트를 만들어줘.

[섹션 구성]
1. Hero — 대형 타이틀, 서브텍스트, 2개 CTA 버튼, 그라디언트 배경
2. Features — 6개 특징 카드 (아이콘 + 제목 + 설명), 3열 그리드
3. Pricing — 3개 플랜 비교 카드 (Basic/Pro/Enterprise), 추천 강조
4. FAQ — 5개 질문 아코디언 (클릭 시 답변 펼침)
5. CTA — 최종 행동 유도 섹션, 이메일 입력 + 가입 버튼

[조건]
- React + TypeScript + Vite
- 네이비 (#1B2A4A) + 골드 (#D4760A) 테마
- Smooth Scroll로 섹션 이동
- 반응형 디자인 (모바일 1열)
- AOS로 스크롤 애니메이션`,
  },
  {
    id: 16, categoryId: 'web',
    title: '날씨 앱',
    description: 'OpenWeatherMap API를 연동하여 도시별 현재 날씨, 5일 예보, 날씨 아이콘을 표시하는 반응형 앱입니다.',
    difficulty: '초급', duration: '35분',
    techStack: ['React', 'TypeScript', 'CSS', 'API'],
    steps: ['OpenWeatherMap API 키 발급', '도시 검색 입력 폼 구현', '현재 날씨 카드 (온도, 습도, 풍속)', '5일 예보 가로 스크롤 카드', '날씨 아이콘 및 배경색 동적 변경', '최근 검색 도시 localStorage 저장'],
    prompt: `너는 React + TypeScript 전문 프론트엔드 개발자야.
날씨 정보 웹 앱을 만들어줘.

[기능]
1. 도시 검색 — 입력 후 Enter 또는 검색 버튼
2. 현재 날씨 카드 — 도시명, 온도(°C), 체감온도, 습도(%), 풍속(m/s), 날씨 아이콘
3. 5일 예보 — 날짜별 카드 (최고/최저 온도, 아이콘)
4. 배경 그라디언트 — 날씨 상태에 따라 동적 변경 (맑음: 파랑, 흐림: 회색, 비: 남색)
5. 최근 검색 5개 도시 표시 (localStorage)

[조건]
- OpenWeatherMap API 사용 (무료 플랜)
- React + TypeScript + Vite
- API 키는 .env 파일로 관리
- 모바일 반응형
- 로딩 스피너 및 에러 핸들링`,
  },
  {
    id: 17, categoryId: 'web',
    title: '관리자 대시보드',
    description: 'Chart.js로 매출, 사용자, 주문 통계를 시각화하는 관리자 대시보드입니다. 사이드바 네비게이션과 다크모드를 포함합니다.',
    difficulty: '고급', duration: '60분',
    techStack: ['React', 'TypeScript', 'Chart.js', 'CSS'],
    steps: ['사이드바 네비게이션 구현', 'KPI 카드 4개 (매출, 사용자, 주문, 방문)', '매출 추이 라인 차트 (Chart.js)', '카테고리별 도넛 차트', '최근 주문 테이블', '다크/라이트 모드 토글'],
    prompt: `너는 React + TypeScript 전문 프론트엔드 개발자야.
관리자 대시보드 웹앱을 만들어줘.

[레이아웃]
- 왼쪽: 사이드바 (로고, 메뉴 5개, 다크모드 토글)
- 오른쪽 상단: 헤더 (검색바, 알림 아이콘, 프로필)
- 오른쪽 메인: 대시보드 콘텐츠

[대시보드 콘텐츠]
1. KPI 카드 4개 — 총 매출, 신규 사용자, 주문 수, 방문자 (전월 대비 증감)
2. 매출 추이 — 6개월 라인 차트 (Chart.js)
3. 카테고리 비율 — 도넛 차트
4. 최근 주문 — 테이블 (주문번호, 고객명, 금액, 상태 뱃지)
5. 활동 로그 — 타임라인 형태

[조건]
- React + TypeScript + Vite
- Chart.js (react-chartjs-2) 사용
- 다크/라이트 모드 CSS 변수 활용
- 반응형 (모바일에서 사이드바 접기)
- 샘플 데이터 JSON으로 포함`,
  },

  /* ── 스트림릿 ── */
  {
    id: 5, categoryId: 'streamlit',
    title: '전력 데이터 대시보드',
    description: 'CSV를 업로드하여 KDN 전력사용량을 월별/지역별로 시각화하는 Streamlit 대시보드입니다.',
    difficulty: '중급', duration: '30분',
    techStack: ['Streamlit', 'pandas', 'plotly'],
    steps: ['Streamlit 프로젝트 설정 및 requirements.txt', 'CSV 업로드 위젯 구현', '사이드바 필터 (기간, 지역)', 'KPI 카드 3개 (st.metric)', '월별 추이 라인 차트', '지역별 비교 막대 차트'],
    prompt: `너는 Python Streamlit 전문 개발자야.
KDN 전력사용량 분석 대시보드를 만들어줘.

[기능]
- CSV 파일 업로드 (st.file_uploader)
- 사이드바: 기간 필터 (st.date_input), 지역 선택 (st.multiselect)
- 상단: 핵심 KPI 카드 3개 (st.metric) — 총 사용량, 전월 대비, 최대 부하
- 본문: 월별 추이 라인 차트, 지역별 막대 차트 (plotly)
- 하단: 데이터 테이블 (st.dataframe)

[예상 CSV 컬럼]
date, region, usage_mwh, peak_load, temperature

[조건]
- pandas로 데이터 처리, plotly로 인터랙티브 차트
- st.columns로 2열 레이아웃
- 한글 폰트 설정 포함
- 데이터가 없을 때 샘플 데이터 자동 생성`,
  },
  {
    id: 6, categoryId: 'streamlit',
    title: 'CSV 데이터 탐색기',
    description: '어떤 CSV 파일이든 업로드하면 자동으로 데이터 요약, 통계, 시각화를 제공하는 범용 도구입니다.',
    difficulty: '초급', duration: '25분',
    techStack: ['Streamlit', 'pandas', 'plotly'],
    steps: ['CSV 업로드 및 자동 인식', '데이터 미리보기 및 기본 통계', '컬럼별 타입 자동 감지', '수치형 컬럼 히스토그램', '상관관계 히트맵', '필터링 및 CSV 다운로드'],
    prompt: `너는 Python Streamlit 전문 개발자야.
범용 CSV 데이터 탐색기 Streamlit 앱을 만들어줘.

[기능]
1. CSV 업로드 (st.file_uploader)
2. 데이터 개요 탭 — 행/열 수, 컬럼명, 데이터 타입, 결측값 현황
3. 통계 분석 탭 — describe() 결과, 히스토그램, 상관관계 히트맵
4. 시각화 탭 — X/Y축 선택 → 산점도/라인/막대 차트
5. 필터링 탭 — 조건 필터 → 필터된 데이터 CSV 다운로드

[조건]
- st.tabs로 탭 구성
- plotly로 인터랙티브 차트
- st.download_button으로 필터 결과 CSV 다운로드
- 모든 한글 데이터 정상 표시`,
  },
  {
    id: 7, categoryId: 'streamlit',
    title: '자기소개 앱',
    description: 'Streamlit으로 만드는 첫 번째 앱입니다. 이름, 사진, 경력, 스킬 바, 취미를 표시하는 인터랙티브 자기소개 페이지입니다.',
    difficulty: '초급', duration: '15분',
    techStack: ['Streamlit'],
    steps: ['streamlit 설치 및 app.py 생성', 'st.title, st.header로 제목 설정', 'st.image로 프로필 사진 표시', 'st.progress로 스킬 바 구현', 'st.sidebar로 네비게이션', 'streamlit run app.py로 실행'],
    prompt: `너는 Python Streamlit 전문 개발자야.
인터랙티브 자기소개 Streamlit 앱을 만들어줘.

[기능]
- st.title: 이름 + 직함
- st.image: 프로필 사진 (URL 또는 로컬 파일)
- 2열 레이아웃 (st.columns)
  - 왼쪽: 기본 정보 (이름, 부서, 이메일, 연락처)
  - 오른쪽: 스킬 바 (st.progress) — Python 80%, Excel 90%, SQL 70%
- st.expander: 경력 사항 (접었다 펼치기)
- st.sidebar: 테마 선택 (st.radio) — "밝은 테마" / "어두운 테마"
- st.balloons(): 페이지 하단 "축하" 버튼

[조건]
- 한 파일(app.py)로 완성
- st.set_page_config로 페이지 타이틀, 아이콘 설정
- requirements.txt 포함`,
  },
  {
    id: 8, categoryId: 'streamlit',
    title: '업무 일지 관리 앱',
    description: '일일 업무 일지를 작성하고 저장하는 Streamlit 앱입니다. 날짜별 조회, 카테고리 분류, JSON 저장 기능을 포함합니다.',
    difficulty: '중급', duration: '30분',
    techStack: ['Streamlit', 'pandas', 'json'],
    steps: ['업무 일지 입력 폼 설계', '날짜/카테고리/내용 입력 위젯', 'JSON 파일로 저장/불러오기', '날짜별 필터링 및 조회', '카테고리별 통계 차트', '일지 삭제 기능'],
    prompt: `너는 Python Streamlit 전문 개발자야.
업무 일지 관리 Streamlit 앱을 만들어줘.

[기능]
1. 일지 작성 폼
   - 날짜 선택 (st.date_input)
   - 카테고리 선택 (st.selectbox): 회의, 개발, 교육, 기타
   - 제목 (st.text_input)
   - 내용 (st.text_area)
   - 중요도 (st.slider): 1~5
   - 저장 버튼
2. 일지 조회 (st.tabs)
   - 전체 목록: 날짜 역순 정렬
   - 날짜별 조회: 날짜 범위 필터
   - 통계: 카테고리별 건수 차트, 주간 추이
3. 일지 삭제 기능

[조건]
- JSON 파일로 영속 저장 (work_logs.json)
- st.session_state로 상태 관리
- 한 파일(app.py)로 완성
- 깔끔한 카드형 일지 표시`,
  },
  {
    id: 18, categoryId: 'streamlit',
    title: '이미지 갤러리 뷰어',
    description: '이미지 파일을 업로드하면 갤러리 형태로 표시하고, 필터(밝기/대비/흑백)를 적용할 수 있는 Streamlit 앱입니다.',
    difficulty: '초급', duration: '20분',
    techStack: ['Streamlit', 'Pillow'],
    steps: ['이미지 업로드 위젯 (복수 파일)', '갤러리 그리드 레이아웃', '이미지 선택 및 확대', '필터 슬라이더 (밝기, 대비)', '흑백/세피아 변환', '처리된 이미지 다운로드'],
    prompt: `너는 Python Streamlit 전문 개발자야.
이미지 갤러리 뷰어 Streamlit 앱을 만들어줘.

[기능]
1. 이미지 업로드 (st.file_uploader, 복수 파일 허용: jpg, png, gif)
2. 갤러리 — st.columns로 3열 그리드 표시
3. 이미지 선택 시 확대 표시
4. 필터 적용 (사이드바)
   - 밝기 조절 (st.slider: 0.5~2.0)
   - 대비 조절 (st.slider: 0.5~2.0)
   - 흑백 변환 (st.checkbox)
   - 세피아 변환 (st.checkbox)
5. 필터 적용된 이미지 다운로드 (st.download_button)

[조건]
- Pillow (PIL)로 이미지 처리
- st.session_state로 선택 이미지 관리
- 한 파일(app.py)로 완성
- requirements.txt 포함`,
  },
  {
    id: 19, categoryId: 'streamlit',
    title: '가계부 앱',
    description: '수입/지출을 기록하고 월별 통계와 카테고리별 지출 차트를 보여주는 Streamlit 가계부입니다.',
    difficulty: '중급', duration: '35분',
    techStack: ['Streamlit', 'pandas', 'plotly', 'json'],
    steps: ['수입/지출 입력 폼', '카테고리 분류 (식비, 교통, 문화 등)', '월별 수입/지출 막대 차트', '카테고리별 지출 도넛 차트', '일별 잔액 추이 라인 차트', 'JSON 데이터 저장 및 CSV 내보내기'],
    prompt: `너는 Python Streamlit 전문 개발자야.
개인 가계부 Streamlit 앱을 만들어줘.

[기능]
1. 거래 입력 폼
   - 날짜 (st.date_input)
   - 유형 (st.radio): 수입 / 지출
   - 카테고리 (st.selectbox): 급여, 식비, 교통, 문화, 쇼핑, 의료, 교육, 기타
   - 금액 (st.number_input)
   - 메모 (st.text_input)
2. 대시보드 (st.tabs)
   - 월별 요약: 수입/지출/잔액 (st.metric) + 막대 차트
   - 카테고리별: 지출 도넛 차트 + 상세 테이블
   - 추이: 일별 잔액 라인 차트
3. 거래 목록: 날짜 역순, 삭제 버튼
4. CSV 내보내기 (st.download_button)

[조건]
- JSON 파일로 영속 저장
- plotly로 인터랙티브 차트
- 금액 천 단위 콤마 표시
- requirements.txt 포함`,
  },

  /* ── 데이터 분석 ── */
  {
    id: 9, categoryId: 'data',
    title: '설비 장애 분석기',
    description: '전력 설비 장애 이력 Excel 데이터를 분석하여 유형별 빈도, 월별 추이, 지역별 분포, 복구시간 통계를 시각화합니다.',
    difficulty: '중급', duration: '35분',
    techStack: ['Streamlit', 'pandas', 'plotly', 'openpyxl'],
    steps: ['Excel/CSV 업로드 위젯', '장애 유형별 도넛 차트', '월별 장애 추이 라인 차트', '지역별 분포 막대 차트', '평균 복구시간 통계', '장애 원인 Top 5'],
    prompt: `너는 Python 데이터 분석 + Streamlit 전문 개발자야.
KDN 전력 설비 장애 분석 Streamlit 앱을 만들어줘.

[예상 데이터 컬럼]
일시, 설비유형, 장애유형, 지역, 복구시간(분), 영향범위, 원인

[분석 & 시각화]
1. 장애 유형별 발생 빈도 — 도넛 차트
2. 월별 장애 추이 — 라인 차트 (전년 대비)
3. 지역별 장애 분포 — 수평 막대 차트
4. 평균 복구시간 — 설비유형별 비교 차트
5. 장애 원인 Top 5 — 테이블 + 비율

[조건]
- Excel(.xlsx) 및 CSV 모두 지원
- 사이드바: 기간 필터, 설비유형 필터, 지역 필터
- plotly로 인터랙티브 차트
- 데이터가 없을 때 샘플 데이터 자동 생성 (50건)
- st.tabs로 분석 항목별 탭 구성`,
  },
  {
    id: 10, categoryId: 'data',
    title: 'Excel 자동 보고서',
    description: 'Python으로 Excel 데이터를 읽어 자동으로 요약 통계, 차트, 서식이 적용된 보고서를 생성합니다.',
    difficulty: '중급', duration: '30분',
    techStack: ['Streamlit', 'pandas', 'openpyxl', 'xlsxwriter'],
    steps: ['Excel 업로드 및 시트 선택', '데이터 요약 통계 자동 계산', '차트 자동 생성 (매출 추이, 부서별 비교)', '서식 적용된 Excel 보고서 생성', '보고서 다운로드 버튼', '멀티 시트 지원'],
    prompt: `너는 Python 데이터 분석 + 엑셀 자동화 전문 개발자야.
Excel 데이터를 분석하고 자동 보고서를 생성하는 Streamlit 앱을 만들어줘.

[기능]
1. Excel 업로드 (st.file_uploader) → 시트 선택 (st.selectbox)
2. 데이터 미리보기 및 기본 통계 표시
3. 자동 분석
   - 수치형 컬럼 합계, 평균, 최대, 최소
   - 카테고리형 컬럼 빈도 분석
   - 월별/분기별 추이 차트
4. 보고서 Excel 생성 (xlsxwriter)
   - 요약 시트: 핵심 지표 + 서식 적용
   - 차트 시트: 자동 생성 차트 삽입
   - 원본 시트: 원본 데이터 복사
5. 다운로드 버튼 (st.download_button)

[조건]
- pandas + openpyxl로 읽기, xlsxwriter로 쓰기
- 보고서에 회사 로고, 날짜, 헤더 서식 자동 적용
- 데이터가 없을 때 샘플 데이터 생성
- requirements.txt 포함`,
  },
  {
    id: 11, categoryId: 'data',
    title: '설문 결과 분석기',
    description: '설문조사 CSV 데이터를 업로드하여 응답 분포, 교차 분석, 워드 클라우드를 자동 생성합니다.',
    difficulty: '중급', duration: '30분',
    techStack: ['Streamlit', 'pandas', 'plotly', 'wordcloud'],
    steps: ['CSV 업로드 및 컬럼 자동 분류', '단일 선택 문항 → 막대/파이 차트', '복수 선택 문항 → 수평 막대 차트', '리커트 척도 → 평균 점수 비교', '주관식 → 워드 클라우드', '교차 분석 (부서별 × 만족도)'],
    prompt: `너는 Python 설문 데이터 분석 전문가야.
설문조사 결과 분석 Streamlit 앱을 만들어줘.

[기능]
1. CSV 업로드 → 컬럼 자동 분류 (단일선택/복수선택/척도/주관식)
2. 분석 대시보드 (st.tabs)
   - 전체 요약: 응답 수, 완료율, 응답 기간
   - 문항별 분석: 선택형 → 막대/파이 차트, 척도형 → 평균 비교
   - 교차 분석: 2개 문항 선택 → 교차표 히트맵
   - 주관식 분석: 워드 클라우드 + 핵심 키워드 추출
3. 보고서 다운로드 (PDF 또는 Excel)

[예상 CSV 컬럼]
부서, 직급, Q1_만족도(1-5), Q2_추천의향, Q3_개선사항(주관식)

[조건]
- plotly로 인터랙티브 차트
- 데이터가 없을 때 샘플 설문 데이터 100건 생성
- 한글 워드 클라우드 지원
- requirements.txt 포함`,
  },
  {
    id: 20, categoryId: 'data',
    title: '매출 데이터 분석',
    description: '회사 매출 CSV를 업로드하면 월별 추이, 제품별 점유율, 전년 대비 성장률, 예측 트렌드를 자동 분석합니다.',
    difficulty: '초급', duration: '25분',
    techStack: ['Streamlit', 'pandas', 'plotly'],
    steps: ['CSV 업로드 및 데이터 검증', '월별 매출 추이 라인 차트', '제품별 매출 점유율 도넛 차트', '전년 대비 성장률 계산', 'KPI 카드 (총매출, 평균, 최고월)', '필터링된 데이터 다운로드'],
    prompt: `너는 Python 데이터 분석 + Streamlit 전문 개발자야.
매출 데이터 분석 Streamlit 앱을 만들어줘.

[예상 CSV 컬럼]
date, product, category, quantity, unit_price, total_amount, region

[분석 & 시각화]
1. KPI 카드 — 총매출, 월평균, 최고매출월, 전월대비 증감
2. 월별 매출 추이 — 라인 차트 (올해 vs 전년)
3. 제품별 매출 비율 — 도넛 차트
4. 지역별 매출 비교 — 수평 막대 차트
5. 상위 10개 제품 — 매출 순위 테이블

[조건]
- 사이드바: 기간 필터, 카테고리 필터, 지역 필터
- plotly로 인터랙티브 차트
- 데이터가 없을 때 샘플 데이터 자동 생성
- 금액 천 단위 콤마 표시
- requirements.txt 포함`,
  },
  {
    id: 21, categoryId: 'data',
    title: '인사 데이터 대시보드',
    description: '직원 인사 데이터를 분석하여 부서별 인원, 연차 분포, 성별 비율, 퇴직률 추이를 시각화합니다.',
    difficulty: '중급', duration: '35분',
    techStack: ['Streamlit', 'pandas', 'plotly'],
    steps: ['Excel/CSV 업로드 위젯', '부서별 인원 현황 막대 차트', '연차 분포 히스토그램', '성별/직급별 교차 분석', '월별 입사/퇴사 추이', '핵심 인사 지표 KPI 카드'],
    prompt: `너는 Python 데이터 분석 + Streamlit 전문 개발자야.
인사 데이터 분석 대시보드 Streamlit 앱을 만들어줘.

[예상 CSV 컬럼]
사번, 이름, 부서, 직급, 성별, 입사일, 퇴사일, 연봉, 평가등급

[분석 & 시각화]
1. KPI 카드 — 총 인원, 평균 근속, 퇴직률, 평균 연봉
2. 부서별 인원 — 수평 막대 차트
3. 직급별 분포 — 파이 차트
4. 근속 연수 분포 — 히스토그램
5. 성별 × 직급 교차표 — 히트맵
6. 월별 입사/퇴사 추이 — 라인 차트

[조건]
- 사이드바: 부서 필터, 직급 필터, 기간 필터
- plotly로 인터랙티브 차트
- 데이터가 없을 때 샘플 인사 데이터 200건 생성
- st.tabs로 분석 항목별 탭 구성
- requirements.txt 포함`,
  },
  {
    id: 22, categoryId: 'data',
    title: '웹 로그 분석기',
    description: '웹 서버 접속 로그를 분석하여 시간대별 트래픽, 인기 페이지, 브라우저 분포, 에러율을 시각화합니다.',
    difficulty: '고급', duration: '40분',
    techStack: ['Streamlit', 'pandas', 'plotly', 're'],
    steps: ['로그 파일 업로드 및 정규식 파싱', '시간대별 접속 수 히트맵', '인기 페이지 Top 10 바 차트', 'HTTP 상태 코드 분포', '브라우저/OS 분석', '에러율 추이 라인 차트'],
    prompt: `너는 Python 데이터 분석 + Streamlit 전문 개발자야.
웹 서버 로그 분석 Streamlit 앱을 만들어줘.

[예상 로그 형식 - Apache Combined]
IP - - [날짜] "METHOD /path HTTP/1.1" 상태코드 바이트 "referrer" "user-agent"

[분석 & 시각화]
1. KPI 카드 — 총 요청 수, 고유 IP 수, 평균 응답 크기, 에러율(4xx+5xx)
2. 시간대별 트래픽 — 히트맵 (요일 × 시간)
3. 인기 페이지 Top 10 — 수평 막대 차트
4. HTTP 상태 코드 분포 — 도넛 차트 (2xx, 3xx, 4xx, 5xx)
5. 브라우저 분포 — 파이 차트 (user-agent 파싱)
6. 시간별 에러율 추이 — 라인 차트

[조건]
- 정규식으로 로그 파싱 (re 모듈)
- 사이드바: 날짜 필터, 상태 코드 필터
- plotly로 인터랙티브 차트
- 샘플 로그 500줄 자동 생성 옵션
- requirements.txt 포함`,
  },

  /* ── AI 앱 ── */
  {
    id: 12, categoryId: 'ai',
    title: 'AI 질의응답 챗봇 (풀스택)',
    description: 'Claude API와 Supabase를 연동하여 대화 이력이 저장되는 AI 챗봇 웹앱을 React로 만듭니다.',
    difficulty: '고급', duration: '60분',
    techStack: ['React', 'TypeScript', 'Supabase', 'Claude API'],
    steps: ['React 채팅 UI 컴포넌트 구현', 'Supabase Edge Function에서 Claude API 호출', 'System Prompt 역할 설정', '대화 이력 DB 저장', '스트리밍 응답 처리', '대화 목록 및 불러오기'],
    prompt: `너는 React + Supabase + Claude API 풀스택 전문 개발자야.
AI 질의응답 챗봇 웹앱을 만들어줘.

[아키텍처]
- 프론트엔드: React + TypeScript
- 백엔드: Supabase Edge Function → Claude API 호출
- DB: conversations, messages 테이블

[기능]
- 채팅 UI (사용자/AI 메시지 버블)
- Claude API 연동 (System Prompt: "너는 KDN 전력IT 전문가야")
- 대화 이력 DB 저장 및 불러오기
- 새 대화 시작 / 이전 대화 목록

[조건]
- API 키는 Supabase Edge Function에서 관리
- 스트리밍 응답 처리
- 에러 핸들링
- 모바일 반응형`,
  },
  {
    id: 13, categoryId: 'ai',
    title: 'Streamlit AI 챗봇',
    description: 'Claude API를 연동한 Streamlit 채팅 앱입니다. 대화 이력을 유지하고, 전력IT 전문가 역할을 수행합니다.',
    difficulty: '중급', duration: '30분',
    techStack: ['Streamlit', 'anthropic'],
    steps: ['Streamlit 채팅 UI 구현', 'anthropic SDK 설치 및 연동', 'System Prompt 설정', 'session_state로 대화 이력 관리', '사이드바 설정 (API 키, 초기화)', '스트리밍 응답 처리'],
    prompt: `너는 Python + Streamlit + Claude API 전문 개발자야.
KDN 업무용 AI 챗봇 Streamlit 앱을 만들어줘.

[기능]
- Claude API 연동 (anthropic Python SDK)
- st.chat_input / st.chat_message로 대화 UI
- st.session_state로 대화 이력 관리
- System Prompt: "너는 KDN 전력IT 전문가야"
- 사이드바: API 키 입력 (type="password"), 모델 선택, 대화 초기화

[조건]
- anthropic Python SDK 사용
- 스트리밍 응답 (st.write_stream)
- 에러 핸들링 (API 키 미입력, 호출 실패)
- requirements.txt 포함`,
  },
  {
    id: 14, categoryId: 'ai',
    title: 'AI 보고서 생성기',
    description: 'CSV 데이터를 업로드하면 Claude API가 자동으로 분석 보고서를 작성합니다.',
    difficulty: '고급', duration: '45분',
    techStack: ['Streamlit', 'pandas', 'plotly', 'anthropic'],
    steps: ['CSV 업로드 및 자동 통계 추출', 'Claude API로 분석 보고서 생성', '마크다운 보고서 렌더링', '주요 트렌드 자동 차트', '분석 관점 커스텀 설정', '보고서 다운로드'],
    prompt: `너는 Python + Streamlit + Claude API 전문 개발자야.
CSV 데이터를 AI가 분석하여 보고서를 생성하는 Streamlit 앱을 만들어줘.

[기능]
1. CSV 업로드 → pandas로 기본 통계 추출
2. 사이드바: API 키 입력, 분석 관점 선택
   - "일반 분석", "트렌드 분석", "이상값 탐지", "요약 보고서"
3. "보고서 생성" 버튼 → Claude API에 통계 요약 전송 → 마크다운 보고서
4. 결과: st.markdown 렌더링, st.metric으로 핵심 수치
5. 보고서 다운로드 (st.download_button)

[조건]
- Claude에 전송하는 데이터는 통계 요약만 (원본 전체 X)
- 스트리밍 응답 처리
- requirements.txt 포함`,
  },
  {
    id: 15, categoryId: 'ai',
    title: 'AI 문서 요약기',
    description: '긴 문서나 텍스트를 붙여넣으면 Claude API가 핵심 요약, 키워드 추출, 3줄 요약을 생성합니다.',
    difficulty: '중급', duration: '25분',
    techStack: ['Streamlit', 'anthropic'],
    steps: ['텍스트 입력 영역 구현', 'Claude API 연동', '요약 모드 선택 (3줄/1문단/상세)', '핵심 키워드 자동 추출', '요약 결과 마크다운 표시', '결과 복사/다운로드'],
    prompt: `너는 Python + Streamlit + Claude API 전문 개발자야.
AI 문서 요약기 Streamlit 앱을 만들어줘.

[기능]
1. 텍스트 입력 (st.text_area — 최대 10,000자)
2. 요약 모드 선택 (st.radio)
   - "3줄 요약" / "1문단 요약" / "상세 요약 (핵심+인사이트)"
3. "요약하기" 버튼 클릭 시 Claude API 호출
4. 결과 표시
   - 요약문 (st.markdown)
   - 핵심 키워드 5개 (태그 형태)
   - 원문 글자 수 vs 요약 글자 수 비교
5. 결과 복사 버튼, 텍스트 다운로드

[조건]
- anthropic Python SDK
- 사이드바: API 키 입력, 언어 설정 (한국어/영어)
- 스트리밍 응답 처리
- 에러 핸들링
- requirements.txt 포함`,
  },
  {
    id: 23, categoryId: 'ai',
    title: 'AI 번역기',
    description: '한국어↔영어↔일본어↔중국어 다국어 번역기입니다. Claude API를 활용하여 자연스러운 번역과 문체 선택이 가능합니다.',
    difficulty: '초급', duration: '20분',
    techStack: ['Streamlit', 'anthropic'],
    steps: ['언어 선택 UI (출발/도착 언어)', '텍스트 입력 영역', 'Claude API 번역 호출', '문체 옵션 (격식/비격식/비즈니스)', '번역 결과 표시 및 복사', '번역 이력 표시'],
    prompt: `너는 Python + Streamlit + Claude API 전문 개발자야.
AI 다국어 번역기 Streamlit 앱을 만들어줘.

[기능]
1. 출발 언어 선택 (st.selectbox): 한국어, 영어, 일본어, 중국어
2. 도착 언어 선택 (st.selectbox): 한국어, 영어, 일본어, 중국어
3. 텍스트 입력 (st.text_area — 최대 5,000자)
4. 문체 선택 (st.radio): 격식체 / 비격식체 / 비즈니스
5. "번역하기" 버튼 → Claude API 호출
6. 결과 표시
   - 번역문 (st.markdown)
   - 복사 버튼 (st.button + clipboard)
   - 원문/번역문 글자 수 비교
7. 번역 이력 (st.session_state — 최근 5건)

[조건]
- anthropic Python SDK
- 사이드바: API 키 입력
- 출발/도착 언어 스왑 버튼
- 에러 핸들링
- requirements.txt 포함`,
  },
  {
    id: 24, categoryId: 'ai',
    title: 'AI 코드 리뷰어',
    description: '코드를 붙여넣으면 Claude API가 버그, 보안 취약점, 개선 사항을 분석하고 리팩토링 제안을 합니다.',
    difficulty: '고급', duration: '35분',
    techStack: ['Streamlit', 'anthropic'],
    steps: ['코드 입력 영역 및 언어 선택', 'Claude API 코드 분석 호출', '리뷰 결과 마크다운 렌더링', '심각도별 이슈 분류 (Error/Warning/Info)', '리팩토링 제안 코드 표시', '리뷰 이력 관리'],
    prompt: `너는 Python + Streamlit + Claude API 전문 개발자야.
AI 코드 리뷰어 Streamlit 앱을 만들어줘.

[기능]
1. 코드 입력 (st.text_area — 최대 10,000자)
2. 프로그래밍 언어 선택 (st.selectbox): Python, JavaScript, TypeScript, Java, Go
3. 리뷰 관점 선택 (st.multiselect)
   - "버그 탐지", "보안 취약점", "성능 최적화", "코드 스타일", "리팩토링"
4. "코드 리뷰" 버튼 → Claude API 호출
5. 결과 표시 (st.tabs)
   - 요약: 전체 점수(100점), 이슈 개수 (Error/Warning/Info)
   - 상세 리뷰: 줄 번호 + 이슈 설명 + 제안 코드
   - 리팩토링: 개선된 전체 코드 (st.code)
6. 결과 다운로드 (마크다운)

[조건]
- anthropic Python SDK
- 사이드바: API 키 입력
- 심각도별 색상 구분 (Error: 빨강, Warning: 주황, Info: 파랑)
- 스트리밍 응답 처리
- requirements.txt 포함`,
  },
];

const difficultyColor = (d: string) => {
  if (d === '초급') return { bg: '#E8F5E9', text: '#2E7D32' };
  if (d === '중급') return { bg: '#E3F2FD', text: '#1565C0' };
  return { bg: '#FFF3E0', text: '#E65100' };
};

/* ── 컴포넌트 ── */
const VibePractice = (): ReactElement => {
  const [catId, setCatId] = useState<string>('web');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = PROJECTS.filter(p => p.categoryId === catId);
  const selected = selectedId !== null ? PROJECTS.find(p => p.id === selectedId) : null;

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectCategory = (id: string) => {
    setCatId(id);
    setSelectedId(null);
  };

  return (
    <>
      <SEOHead title="바이브코딩 실습 | KDN Vibe Coding" description="분야별 실전 프로젝트 — 웹 개발, 스트림릿, 데이터 분석, AI 앱" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Vibe Coding Lab</div>
          <h2>바이브코딩 실습</h2>
          <p>분야별 실전 프로젝트를 선택하고, Claude Code로 직접 만들어봅니다</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          <div className="practice-layout">

            {/* ── 왼쪽 사이드바 ── */}
            <aside className="practice-sidebar">
              {/* 카테고리 */}
              <div className="ps-block">
                <h4 className="ps-label">분야 선택</h4>
                <ul className="ps-steps" style={{ gap: '3px' }}>
                  {CATEGORIES.map(c => (
                    <li key={c.id} style={{ cursor: 'pointer' }} onClick={() => handleSelectCategory(c.id)}>
                      <button style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '6px 10px',
                        background: catId === c.id ? 'var(--navy-50)' : 'transparent',
                        border: catId === c.id ? '1px solid var(--navy-800)' : '1px solid var(--line)',
                        borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                        transition: 'all 0.15s',
                      }}>
                        <span style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: catId === c.id ? 'var(--ink-surface)' : 'var(--navy-100)',
                          color: catId === c.id ? 'var(--gold)' : 'var(--navy-700)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', flexShrink: 0,
                        }}>
                          <i className={`fa-solid ${c.icon}`} />
                        </span>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navy-800)' }}>{c.label}</div>
                        <span style={{
                          marginLeft: 'auto', fontSize: '10px', fontWeight: 700, flexShrink: 0,
                          color: 'var(--text-secondary)',
                          background: 'var(--navy-50)', padding: '1px 6px', borderRadius: '10px',
                        }}>
                          {PROJECTS.filter(p => p.categoryId === c.id).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 프로젝트 목록 */}
              <div className="ps-block">
                <h4 className="ps-label">{CATEGORIES.find(c => c.id === catId)?.label} 프로젝트</h4>
                <ul className="ps-steps" style={{ gap: '3px' }}>
                  {filtered.map((p, idx) => {
                    const dc = difficultyColor(p.difficulty);
                    return (
                      <li key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedId(p.id)}>
                        <button style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '6px 10px',
                          background: selectedId === p.id ? 'var(--navy-50)' : 'transparent',
                          border: selectedId === p.id ? '1px solid var(--navy-800)' : '1px solid var(--line)',
                          borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                          transition: 'all 0.15s',
                        }}>
                          <span style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: selectedId === p.id ? 'var(--ink-surface)' : 'var(--navy-100)',
                            color: selectedId === p.id ? 'var(--gold)' : 'var(--navy-700)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: 800, flexShrink: 0,
                          }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navy-800)' }}>{p.title}</div>
                          </div>
                          <span style={{
                            fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px',
                            background: dc.bg, color: dc.text, flexShrink: 0,
                          }}>{p.difficulty}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 총 현황 */}
              <div className="ps-block">
                <h4 className="ps-label">실습 현황</h4>
                <div style={{ textAlign: 'center', padding: '4px 0' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.2 }}>
                    {PROJECTS.length}<span style={{ fontSize: '12px', color: 'var(--gold)' }}>개</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>전체 프로젝트 ({CATEGORIES.length}개 분야)</div>
                </div>
              </div>
            </aside>

            {/* ── 오른쪽 메인 영역 ── */}
            <main className="practice-main">
              {!selected ? (
                /* 프로젝트 미선택 — 카테고리 안내 */
                <div>
                  <div style={{
                    padding: '36px 32px', marginBottom: '24px',
                    background: 'var(--ink-surface)', borderRadius: '16px', color: '#fff',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                      VIBE CODING LAB
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.4 }}>
                      프로젝트를 선택하고,<br />
                      <span style={{ color: 'var(--gold)' }}>프롬프트를 복사</span>하여 Claude Code에 붙여넣으세요
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.7, margin: 0 }}>
                      왼쪽에서 분야와 프로젝트를 선택하면 Claude Code에서 바로 사용할 수 있는 프롬프트가 표시됩니다.
                    </p>
                  </div>

                  {/* 선택된 카테고리의 프로젝트 카드 그리드 */}
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '14px' }}>
                    <i className={`fa-solid ${CATEGORIES.find(c => c.id === catId)?.icon}`} style={{ color: 'var(--gold)', marginRight: '8px' }} />
                    {CATEGORIES.find(c => c.id === catId)?.label} 프로젝트
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {filtered.map(p => {
                      const dc = difficultyColor(p.difficulty);
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedId(p.id)}
                          style={{
                            padding: '20px', background: 'var(--bg-white)',
                            border: '1px solid var(--line)', borderRadius: '12px',
                            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                            transition: 'all 0.2s', display: 'flex', gap: '14px', alignItems: 'flex-start',
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{
                                fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                                background: dc.bg, color: dc.text,
                              }}>{p.difficulty}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                <i className="fa-regular fa-clock" style={{ marginRight: '4px' }} />{p.duration}
                              </span>
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '6px' }}>{p.title}</div>
                            <div style={{
                              fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
                              overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                            }}>{p.description}</div>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                              {p.techStack.slice(0, 3).map(t => (
                                <span key={t} style={{
                                  padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                                  background: 'var(--navy-50)', color: 'var(--navy-800)',
                                }}>{t}</span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* 프로젝트 상세 */
                <>
                  {/* 프로젝트 헤더 */}
                  <div style={{
                    padding: '24px 28px', marginBottom: '20px',
                    background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)',
                    borderRadius: '0 12px 12px 0',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                        background: 'var(--ink-surface)', color: 'var(--gold)',
                        borderRadius: '4px',
                      }}>{CATEGORIES.find(c => c.id === selected.categoryId)?.label}</span>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px',
                        background: difficultyColor(selected.difficulty).bg,
                        color: difficultyColor(selected.difficulty).text,
                      }}>{selected.difficulty}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <i className="fa-regular fa-clock" style={{ marginRight: '4px' }} />{selected.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '8px' }}>{selected.title}</div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{selected.description}</p>
                  </div>

                  {/* 기술 스택 + 진행 단계 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div style={{
                      padding: '20px', border: '1px solid var(--line)',
                      borderRadius: '12px', background: 'var(--bg-white)',
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '12px' }}>
                        <i className="fa-solid fa-layer-group" style={{ color: 'var(--gold)', marginRight: '6px' }} />
                        기술 스택
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {selected.techStack.map(t => (
                          <span key={t} style={{
                            padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                            background: 'var(--navy-50)', color: 'var(--navy-800)',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{
                      padding: '20px', border: '1px solid var(--line)',
                      borderRadius: '12px', background: 'var(--bg-white)',
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '12px' }}>
                        <i className="fa-solid fa-shoe-prints" style={{ color: 'var(--gold)', marginRight: '6px' }} />
                        진행 단계
                      </div>
                      <ol style={{ padding: '0 0 0 18px', margin: 0 }}>
                        {selected.steps.map((s, i) => (
                          <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Claude Code 프롬프트 */}
                  <div style={{
                    border: '2px solid var(--navy-800)', borderRadius: '12px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '14px 20px', background: 'var(--ink-surface)', color: '#fff',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>
                        <i className="fa-solid fa-terminal" style={{ color: 'var(--gold)', marginRight: '8px' }} />
                        Claude Code 프롬프트 — 터미널에 붙여넣기
                      </div>
                      <button
                        onClick={() => handleCopy(selected.prompt, selected.id)}
                        style={{
                          padding: '6px 16px', fontSize: '12px', fontWeight: 600,
                          background: copiedId === selected.id ? '#2E7D32' : 'rgba(255,255,255,0.15)',
                          color: '#fff', border: 'none', borderRadius: '6px',
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        <i className={`fa-solid ${copiedId === selected.id ? 'fa-check' : 'fa-copy'}`} style={{ marginRight: '6px' }} />
                        {copiedId === selected.id ? '복사됨!' : '복사'}
                      </button>
                    </div>
                    <pre style={{
                      padding: '20px', background: '#263238', color: '#E0E0E0',
                      fontSize: '13px', lineHeight: 1.7, margin: 0,
                      whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace",
                      overflowX: 'auto',
                    }}>
                      {selected.prompt}
                    </pre>
                  </div>

                  {/* 뒤로가기 */}
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedId(null)}
                      style={{
                        padding: '8px 20px', fontSize: '13px', fontWeight: 600,
                        background: 'var(--bg-white)', color: 'var(--text-secondary)',
                        border: '1px solid var(--line)', borderRadius: '6px',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }} />
                      프로젝트 목록으로
                    </button>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default VibePractice;
