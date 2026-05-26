import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'part1', label: 'Part1. 바이브코딩 & AI Agent 이해' },
  { id: 'part2', label: 'Part2. 웹 서비스 기획' },
  { id: 'part3', label: 'Part3. 프론트엔드 기초' },
  { id: 'part4', label: 'Part4. React UI 구현 실습' },
];

const LectureBasic = (): ReactElement => {
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
      <SEOHead title="1일차 강의안 — 기획 & 프론트엔드" description="바이브코딩 1일차: AI Agent 이해, 개발 환경, 웹 기획, 프론트엔드 기초, React UI 구현" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Day 1 Lecture</div>
          <h2>1일차 강의안 — 기획 & 프론트엔드</h2>
          <p>5.26(화) 09:00~18:00 · 8시간</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          {/* ── 사이드바 ── */}
          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-book-open" />
              1일차 목차
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
                <li>바이브코딩과 AI Agent의 개념을 이해합니다</li>
                <li>Cursor IDE 등 개발 환경을 구성합니다</li>
                <li>웹 서비스를 기획하고 요구사항을 정의합니다</li>
                <li>React 기반 프론트엔드 UI를 구현합니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/lecture/intermediate" className="ls-course-link">
              <i className="fa-solid fa-arrow-right" />
              2일차 강의안으로 이동
              <span>Day 2</span>
            </Link>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* ═══ Part 1 ═══ */}
              <div id="part1" className="lecture-section">
                <h3>Part 1. 바이브코딩 & AI Agent 이해 및 개발 환경 구성 (09:00~12:00)</h3>
                <div className="lecture-content">
                  <h4>1. 바이브코딩(Vibe Coding)이란?</h4>
                  <p>
                    바이브코딩은 AI에게 자연어로 의도(vibe)를 전달하면 AI가 코드를 생성하는 새로운 개발 방식입니다.
                    개발자가 코드 한 줄 한 줄을 직접 타이핑하는 대신, AI와 대화하며 프로그램을 만들어갑니다.
                  </p>

                  <h4>2. AI Agent와 코딩 어시스턴트</h4>
                  <div className="example-box">
                    <strong>AI 코딩 어시스턴트</strong>: 코드 자동 완성, 에러 수정, 리팩토링 등을 AI가 보조<br />
                    <strong>AI Agent</strong>: 목표를 주면 스스로 계획을 세우고, 파일을 만들고, 코드를 작성하고, 테스트까지 수행<br /><br />
                    <strong>주요 도구</strong><br />
                    - <strong>Cursor IDE</strong>: AI 네이티브 코드 에디터, GPT-4/Claude 내장<br />
                    - <strong>GitHub Copilot</strong>: VS Code 기반 AI 코딩 보조<br />
                    - <strong>Claude Code</strong>: 터미널 기반 AI 코딩 Agent<br />
                    - <strong>Windsurf</strong>: AI 페어 프로그래밍 IDE
                  </div>

                  <h4>3. 개발 환경 구성</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '1.2rem 0' }}>
                    {[
                      { num: '01', icon: 'fa-brands fa-node-js', name: 'Node.js', tag: 'v20 LTS', desc: 'JavaScript 런타임 — React 프로젝트 생성, 패키지 설치, 개발 서버 실행에 필수', color: '#3FB950' },
                      { num: '02', icon: 'fa-solid fa-wand-magic-sparkles', name: 'Cursor IDE', tag: 'Latest', desc: 'AI 네이티브 코드 에디터 — GPT-4, Claude 내장으로 바이브코딩 핵심 도구', color: '#A371F7' },
                      { num: '03', icon: 'fa-brands fa-git-alt', name: 'Git', tag: 'Latest', desc: '버전 관리 시스템 — 코드 변경 이력 추적, 브랜치, 되돌리기 지원', color: '#F0883E' },
                      { num: '04', icon: 'fa-brands fa-github', name: 'GitHub 계정', tag: 'Free', desc: '코드 저장소 & 배포 — GitHub Pages로 웹사이트 무료 배포 가능', color: '#58A6FF' },
                    ].map(item => (
                      <div key={item.num} style={{
                        background: 'var(--navy-50)', border: '1px solid var(--line)',
                        borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px',
                        borderTop: `3px solid ${item.color}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: item.color, opacity: 0.6 }}>{item.num}</span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}18`, padding: '3px 10px', borderRadius: '10px' }}>{item.tag}</span>
                        </div>
                        <i className={item.icon} style={{ fontSize: '30px', color: item.color }} />
                        <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy-800)' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  <h4>4. Cursor IDE 설치 및 기본 사용법</h4>
                  <ul>
                    <li><strong>설치</strong>: cursor.com에서 다운로드 → 설치 → 로그인</li>
                    <li><strong>Cmd+K (Ctrl+K)</strong>: 인라인 코드 생성/수정</li>
                    <li><strong>Cmd+L (Ctrl+L)</strong>: AI 채팅 패널 열기</li>
                    <li><strong>Composer</strong>: 여러 파일을 한 번에 생성/수정하는 Agent 모드</li>
                    <li><strong>@파일명</strong>: 특정 파일을 참조하며 대화</li>
                  </ul>

                  <h4>5. Node.js와 npm 기초</h4>
                  <div className="prompt-example">{`# Node.js 버전 확인
node -v

# npm 버전 확인
npm -v

# 새 프로젝트 생성 (Vite + React + TypeScript)
npm create vite@latest my-app -- --template react-ts

# 의존성 설치
cd my-app
npm install

# 개발 서버 실행
npm run dev`}</div>

                  <h4>6. Git 기초 명령어</h4>
                  <div className="prompt-example">{`# 저장소 초기화
git init

# 파일 스테이징
git add .

# 커밋
git commit -m "첫 번째 커밋"

# GitHub에 푸시
git remote add origin https://github.com/username/repo.git
git push -u origin main`}</div>

                  <div className="tip-box">
                    <strong>실습</strong>: Cursor IDE를 설치하고, Vite + React + TypeScript 프로젝트를
                    생성한 뒤, 개발 서버를 실행해보세요. AI에게 &quot;간단한 카운터 앱을 만들어줘&quot;라고 요청해보세요.
                  </div>
                </div>
              </div>

              {/* ═══ Part 2 ═══ */}
              <div id="part2" className="lecture-section">
                <h3>Part 2. 웹 서비스 기획 및 요구사항 정의 (13:00~15:00)</h3>
                <div className="lecture-content">
                  <h4>1. 웹 서비스 기획 프로세스</h4>
                  <div className="example-box">
                    <strong>Step 1</strong>: 아이디어 도출 — 어떤 문제를 해결할 것인가?<br />
                    <strong>Step 2</strong>: 사용자 정의 — 누가 사용하는가?<br />
                    <strong>Step 3</strong>: 핵심 기능 정의 — 필수 기능 vs 부가 기능<br />
                    <strong>Step 4</strong>: 화면 설계 — 와이어프레임/프로토타입<br />
                    <strong>Step 5</strong>: 기술 스택 결정 — 프론트/백엔드/DB/배포
                  </div>

                  <h4>2. 요구사항 정의서 작성</h4>
                  <div className="prompt-example">{`[AI에게 기획 요청하기]
"너는 웹 서비스 기획 전문가야.
다음 조건으로 할 일 관리(Todo) 웹앱의 요구사항 정의서를 작성해줘.

[조건]
- 사용자: 개인 사용자
- 핵심 기능: 할 일 추가/수정/삭제, 완료 체크, 카테고리 분류
- 기술 스택: React + Supabase
- 인증: 이메일 로그인

[출력 형식]
1. 프로젝트 개요
2. 기능 목록 (필수/선택 구분)
3. 화면 목록
4. 데이터 모델 (테이블 설계)
5. API 엔드포인트 목록"`}</div>

                  <h4>3. Figma를 활용한 UI 설계</h4>
                  <ul>
                    <li><strong>Figma</strong>: 브라우저 기반 무료 UI/UX 디자인 도구</li>
                    <li><strong>와이어프레임</strong>: 기능 배치 중심의 기본 레이아웃 설계</li>
                    <li><strong>프로토타입</strong>: 화면 간 이동(Flow)을 시뮬레이션</li>
                    <li><strong>AI 활용</strong>: Cursor에서 Figma 디자인을 참고해 코드 생성 가능</li>
                  </ul>

                  <h4>4. 프로젝트 구조 설계</h4>
                  <div className="prompt-example">{`my-app/
├── public/           # 정적 파일 (이미지, 아이콘)
├── src/
│   ├── components/   # 재사용 가능한 UI 컴포넌트
│   ├── pages/        # 페이지 컴포넌트
│   ├── contexts/     # React Context (상태 관리)
│   ├── utils/        # 유틸리티 함수
│   ├── types/        # TypeScript 타입 정의
│   ├── App.tsx       # 라우터 설정
│   └── main.tsx      # 엔트리 포인트
├── package.json
├── tsconfig.json
└── vite.config.ts`}</div>

                  <div className="tip-box">
                    <strong>실습</strong>: AI에게 &quot;할 일 관리 웹앱의 요구사항 정의서를 작성해줘&quot;라고 요청하고,
                    프로젝트 폴더 구조를 생성해보세요.
                  </div>
                </div>
              </div>

              {/* ═══ Part 3 ═══ */}
              <div id="part3" className="lecture-section">
                <h3>Part 3. 프론트엔드 기초 — HTML/CSS/JS (15:00~16:00)</h3>
                <div className="lecture-content">
                  <h4>1. HTML 기초</h4>
                  <div className="prompt-example">{`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
</head>
<body>
  <header>
    <h1>할 일 관리</h1>
    <nav>
      <a href="/">홈</a>
      <a href="/about">소개</a>
    </nav>
  </header>
  <main>
    <section>
      <input type="text" placeholder="할 일을 입력하세요" />
      <button>추가</button>
    </section>
    <ul id="todo-list">
      <li>React 공부하기</li>
    </ul>
  </main>
</body>
</html>`}</div>

                  <h4>2. CSS 기초 — Flexbox & Grid</h4>
                  <div className="prompt-example">{`/* Flexbox: 가로 정렬 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

/* Grid: 카드 레이아웃 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}`}</div>

                  <h4>3. JavaScript 핵심 문법</h4>
                  <div className="example-box">
                    <strong>변수</strong>: const (상수), let (변경 가능)<br />
                    <strong>화살표 함수</strong>: const add = (a, b) =&gt; a + b;<br />
                    <strong>배열 메서드</strong>: map, filter, find, reduce<br />
                    <strong>구조 분해</strong>: const {'{'} name, age {'}'} = user;<br />
                    <strong>스프레드</strong>: const newArr = [...arr, newItem];<br />
                    <strong>비동기</strong>: async/await, fetch API
                  </div>

                  <h4>4. TypeScript 기초</h4>
                  <div className="prompt-example">{`// 타입 정의
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// 함수에 타입 적용
const addTodo = (title: string): Todo => ({
  id: Date.now(),
  title,
  completed: false,
  createdAt: new Date(),
});

// 배열 타입
const todos: Todo[] = [];
todos.push(addTodo('React 배우기'));`}</div>

                  <div className="tip-box">
                    <strong>바이브코딩 팁</strong>: HTML/CSS/JS의 기본 개념만 알면 됩니다.
                    세부 문법은 AI가 대신 작성해줍니다. 중요한 것은 &quot;무엇을 만들고 싶은지&quot;를 명확하게 전달하는 것입니다.
                  </div>
                </div>
              </div>

              {/* ═══ Part 4 ═══ */}
              <div id="part4" className="lecture-section">
                <h3>Part 4. React 기반 프론트엔드 UI 구현 실습 (16:00~18:00)</h3>
                <div className="lecture-content">
                  <h4>1. React 핵심 개념</h4>
                  <ul>
                    <li><strong>컴포넌트</strong>: UI를 재사용 가능한 단위로 분리 (함수형 컴포넌트)</li>
                    <li><strong>JSX</strong>: JavaScript 안에서 HTML을 작성하는 문법</li>
                    <li><strong>Props</strong>: 부모 → 자식 컴포넌트로 데이터 전달</li>
                    <li><strong>State</strong>: 컴포넌트 내부의 변경 가능한 데이터 (useState)</li>
                    <li><strong>Effect</strong>: 컴포넌트 생명주기 관리 (useEffect)</li>
                  </ul>

                  <h4>2. 컴포넌트 만들기</h4>
                  <div className="prompt-example">{`// TodoItem.tsx
interface Props {
  todo: { id: number; title: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default TodoItem;`}</div>

                  <h4>3. 상태 관리 (useState)</h4>
                  <div className="prompt-example">{`import { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, {
      id: Date.now(),
      title: input,
      completed: false,
    }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => t.id === id
        ? { ...t, completed: !t.completed }
        : t
      )
    );
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map(t => (
          <TodoItem key={t.id} todo={t} onToggle={toggleTodo} />
        ))}
      </ul>
    </div>
  );
};`}</div>

                  <h4>4. React Router — 페이지 라우팅</h4>
                  <div className="prompt-example">{`import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<TodoApp />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);`}</div>

                  <h4>5. 바이브코딩으로 UI 만들기</h4>
                  <div className="tip-box">
                    <strong>Cursor IDE에서 AI에게 요청하기</strong><br /><br />
                    &quot;할 일 관리 앱의 메인 페이지를 만들어줘.
                    상단에 입력 폼, 하단에 할 일 목록이 표시되고,
                    각 항목에 체크박스와 삭제 버튼이 있어.
                    완료된 항목은 취소선으로 표시해줘.
                    깔끔하고 모던한 CSS도 함께 작성해줘.&quot;
                  </div>

                  <h4>6. 1일차 실습 체크리스트</h4>
                  <ul>
                    <li>Cursor IDE 설치 및 기본 사용법 숙지</li>
                    <li>Vite + React + TypeScript 프로젝트 생성</li>
                    <li>웹 서비스 기획 및 요구사항 정의서 작성 (AI 활용)</li>
                    <li>HTML/CSS/JS/TypeScript 기본 문법 이해</li>
                    <li>React 컴포넌트, Props, State 이해 및 실습</li>
                    <li>AI를 활용한 프론트엔드 UI 구현 (Todo 앱)</li>
                    <li>Git 초기화 및 첫 커밋</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LectureBasic;
