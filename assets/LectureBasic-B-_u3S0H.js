import{r as n,j as e,L as c}from"./index-BqFQR0-H.js";import{S as a}from"./SEOHead-D6795PuP.js";const i=[{id:"part1",label:"Part1. 바이브코딩 & AI Agent 이해"},{id:"part2",label:"Part2. 웹 서비스 기획"},{id:"part3",label:"Part3. 프론트엔드 기초"},{id:"part4",label:"Part4. React UI 구현 실습"}],p=()=>{const[d,r]=n.useState("part1");n.useEffect(()=>{const s=()=>{for(let t=i.length-1;t>=0;t--){const l=document.getElementById(i[t].id);if(l&&l.getBoundingClientRect().top<=120){r(i[t].id);break}}};return window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]);const o=s=>{const t=document.getElementById(s);t&&(t.scrollIntoView({behavior:"smooth",block:"start"}),r(s))};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"1일차 강의안 — 기획 & 프론트엔드",description:"바이브코딩 1일차: AI Agent 이해, 개발 환경, 웹 기획, 프론트엔드 기초, React UI 구현"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"Day 1 Lecture"}),e.jsx("h2",{children:"1일차 강의안 — 기획 & 프론트엔드"}),e.jsx("p",{children:"5.26(화) 09:00~18:00 · 8시간"})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"lecture-layout",children:[e.jsxs("aside",{className:"lecture-sidebar",children:[e.jsxs("div",{className:"ls-title",children:[e.jsx("i",{className:"fa-solid fa-book-open"}),"1일차 목차"]}),e.jsx("ul",{className:"ls-nav",children:i.map(s=>e.jsx("li",{className:"ls-nav-item",children:e.jsxs("button",{className:`ls-nav-link${d===s.id?" active":""}`,onClick:()=>o(s.id),children:[e.jsx("i",{className:"fa-solid fa-circle"}),s.label]})},s.id))}),e.jsx("div",{className:"ls-divider"}),e.jsxs("div",{className:"ls-guide",children:[e.jsx("div",{className:"ls-guide-label",children:"학습 목표"}),e.jsxs("ul",{className:"ls-guide-list",children:[e.jsx("li",{children:"바이브코딩과 AI Agent의 개념을 이해합니다"}),e.jsx("li",{children:"Cursor IDE 등 개발 환경을 구성합니다"}),e.jsx("li",{children:"웹 서비스를 기획하고 요구사항을 정의합니다"}),e.jsx("li",{children:"React 기반 프론트엔드 UI를 구현합니다"})]})]}),e.jsx("div",{className:"ls-divider"}),e.jsxs(c,{to:"/lecture/intermediate",className:"ls-course-link",children:[e.jsx("i",{className:"fa-solid fa-arrow-right"}),"2일차 강의안으로 이동",e.jsx("span",{children:"Day 2"})]})]}),e.jsx("div",{className:"lecture-main",children:e.jsxs("div",{className:"lecture-page",style:{padding:0,maxWidth:"none"},children:[e.jsxs("div",{id:"part1",className:"lecture-section",children:[e.jsx("h3",{children:"Part 1. 바이브코딩 & AI Agent 이해 및 개발 환경 구성 (09:00~12:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. 바이브코딩(Vibe Coding)이란?"}),e.jsx("p",{children:"바이브코딩은 AI에게 자연어로 의도(vibe)를 전달하면 AI가 코드를 생성하는 새로운 개발 방식입니다. 개발자가 코드 한 줄 한 줄을 직접 타이핑하는 대신, AI와 대화하며 프로그램을 만들어갑니다."}),e.jsx("h4",{children:"2. AI Agent와 코딩 어시스턴트"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"AI 코딩 어시스턴트"}),": 코드 자동 완성, 에러 수정, 리팩토링 등을 AI가 보조",e.jsx("br",{}),e.jsx("strong",{children:"AI Agent"}),": 목표를 주면 스스로 계획을 세우고, 파일을 만들고, 코드를 작성하고, 테스트까지 수행",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"주요 도구"}),e.jsx("br",{}),"- ",e.jsx("strong",{children:"Cursor IDE"}),": AI 네이티브 코드 에디터, GPT-4/Claude 내장",e.jsx("br",{}),"- ",e.jsx("strong",{children:"GitHub Copilot"}),": VS Code 기반 AI 코딩 보조",e.jsx("br",{}),"- ",e.jsx("strong",{children:"Claude Code"}),": 터미널 기반 AI 코딩 Agent",e.jsx("br",{}),"- ",e.jsx("strong",{children:"Windsurf"}),": AI 페어 프로그래밍 IDE"]}),e.jsx("h4",{children:"3. 개발 환경 구성"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"16px",margin:"1.2rem 0"},children:[{num:"01",icon:"fa-brands fa-node-js",name:"Node.js",tag:"v20 LTS",desc:"JavaScript 런타임 — React 프로젝트 생성, 패키지 설치, 개발 서버 실행에 필수",color:"#3FB950"},{num:"02",icon:"fa-solid fa-wand-magic-sparkles",name:"Cursor IDE",tag:"Latest",desc:"AI 네이티브 코드 에디터 — GPT-4, Claude 내장으로 바이브코딩 핵심 도구",color:"#A371F7"},{num:"03",icon:"fa-brands fa-git-alt",name:"Git",tag:"Latest",desc:"버전 관리 시스템 — 코드 변경 이력 추적, 브랜치, 되돌리기 지원",color:"#F0883E"},{num:"04",icon:"fa-brands fa-github",name:"GitHub 계정",tag:"Free",desc:"코드 저장소 & 배포 — GitHub Pages로 웹사이트 무료 배포 가능",color:"#58A6FF"}].map(s=>e.jsxs("div",{style:{background:"var(--navy-50)",border:"1px solid var(--line)",borderRadius:"12px",padding:"24px",display:"flex",flexDirection:"column",gap:"10px",borderTop:`3px solid ${s.color}`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:800,color:s.color,opacity:.6},children:s.num}),e.jsx("span",{style:{fontSize:"11px",fontWeight:700,color:s.color,background:`${s.color}18`,padding:"3px 10px",borderRadius:"10px"},children:s.tag})]}),e.jsx("i",{className:s.icon,style:{fontSize:"30px",color:s.color}}),e.jsx("div",{style:{fontSize:"17px",fontWeight:800,color:"var(--navy-800)"},children:s.name}),e.jsx("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.6},children:s.desc})]},s.num))}),e.jsx("h4",{children:"4. Cursor IDE 설치 및 기본 사용법"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"설치"}),": cursor.com에서 다운로드 → 설치 → 로그인"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cmd+K (Ctrl+K)"}),": 인라인 코드 생성/수정"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cmd+L (Ctrl+L)"}),": AI 채팅 패널 열기"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Composer"}),": 여러 파일을 한 번에 생성/수정하는 Agent 모드"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"@파일명"}),": 특정 파일을 참조하며 대화"]})]}),e.jsx("h4",{children:"5. Node.js와 npm 기초"}),e.jsx("div",{className:"prompt-example",children:`# Node.js 버전 확인
node -v

# npm 버전 확인
npm -v

# 새 프로젝트 생성 (Vite + React + TypeScript)
npm create vite@latest my-app -- --template react-ts

# 의존성 설치
cd my-app
npm install

# 개발 서버 실행
npm run dev`}),e.jsx("h4",{children:"6. Git 기초 명령어"}),e.jsx("div",{className:"prompt-example",children:`# 저장소 초기화
git init

# 파일 스테이징
git add .

# 커밋
git commit -m "첫 번째 커밋"

# GitHub에 푸시
git remote add origin https://github.com/username/repo.git
git push -u origin main`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"실습"}),': Cursor IDE를 설치하고, Vite + React + TypeScript 프로젝트를 생성한 뒤, 개발 서버를 실행해보세요. AI에게 "간단한 카운터 앱을 만들어줘"라고 요청해보세요.']})]})]}),e.jsxs("div",{id:"part2",className:"lecture-section",children:[e.jsx("h3",{children:"Part 2. 웹 서비스 기획 및 요구사항 정의 (13:00~15:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. 웹 서비스 기획 프로세스"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"Step 1"}),": 아이디어 도출 — 어떤 문제를 해결할 것인가?",e.jsx("br",{}),e.jsx("strong",{children:"Step 2"}),": 사용자 정의 — 누가 사용하는가?",e.jsx("br",{}),e.jsx("strong",{children:"Step 3"}),": 핵심 기능 정의 — 필수 기능 vs 부가 기능",e.jsx("br",{}),e.jsx("strong",{children:"Step 4"}),": 화면 설계 — 와이어프레임/프로토타입",e.jsx("br",{}),e.jsx("strong",{children:"Step 5"}),": 기술 스택 결정 — 프론트/백엔드/DB/배포"]}),e.jsx("h4",{children:"2. 요구사항 정의서 작성"}),e.jsx("div",{className:"prompt-example",children:`[AI에게 기획 요청하기]
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
5. API 엔드포인트 목록"`}),e.jsx("h4",{children:"3. Figma를 활용한 UI 설계"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Figma"}),": 브라우저 기반 무료 UI/UX 디자인 도구"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"와이어프레임"}),": 기능 배치 중심의 기본 레이아웃 설계"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"프로토타입"}),": 화면 간 이동(Flow)을 시뮬레이션"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AI 활용"}),": Cursor에서 Figma 디자인을 참고해 코드 생성 가능"]})]}),e.jsx("h4",{children:"4. 프로젝트 구조 설계"}),e.jsx("div",{className:"prompt-example",children:`my-app/
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
└── vite.config.ts`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"실습"}),': AI에게 "할 일 관리 웹앱의 요구사항 정의서를 작성해줘"라고 요청하고, 프로젝트 폴더 구조를 생성해보세요.']})]})]}),e.jsxs("div",{id:"part3",className:"lecture-section",children:[e.jsx("h3",{children:"Part 3. 프론트엔드 기초 — HTML/CSS/JS (15:00~16:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. HTML 기초"}),e.jsx("div",{className:"prompt-example",children:`<!DOCTYPE html>
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
</html>`}),e.jsx("h4",{children:"2. CSS 기초 — Flexbox & Grid"}),e.jsx("div",{className:"prompt-example",children:`/* Flexbox: 가로 정렬 */
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
}`}),e.jsx("h4",{children:"3. JavaScript 핵심 문법"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"변수"}),": const (상수), let (변경 가능)",e.jsx("br",{}),e.jsx("strong",{children:"화살표 함수"}),": const add = (a, b) => a + b;",e.jsx("br",{}),e.jsx("strong",{children:"배열 메서드"}),": map, filter, find, reduce",e.jsx("br",{}),e.jsx("strong",{children:"구조 분해"}),": const ","{"," name, age ","}"," = user;",e.jsx("br",{}),e.jsx("strong",{children:"스프레드"}),": const newArr = [...arr, newItem];",e.jsx("br",{}),e.jsx("strong",{children:"비동기"}),": async/await, fetch API"]}),e.jsx("h4",{children:"4. TypeScript 기초"}),e.jsx("div",{className:"prompt-example",children:`// 타입 정의
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
todos.push(addTodo('React 배우기'));`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"바이브코딩 팁"}),': HTML/CSS/JS의 기본 개념만 알면 됩니다. 세부 문법은 AI가 대신 작성해줍니다. 중요한 것은 "무엇을 만들고 싶은지"를 명확하게 전달하는 것입니다.']})]})]}),e.jsxs("div",{id:"part4",className:"lecture-section",children:[e.jsx("h3",{children:"Part 4. React 기반 프론트엔드 UI 구현 실습 (16:00~18:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. React 핵심 개념"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"컴포넌트"}),": UI를 재사용 가능한 단위로 분리 (함수형 컴포넌트)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"JSX"}),": JavaScript 안에서 HTML을 작성하는 문법"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Props"}),": 부모 → 자식 컴포넌트로 데이터 전달"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"State"}),": 컴포넌트 내부의 변경 가능한 데이터 (useState)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Effect"}),": 컴포넌트 생명주기 관리 (useEffect)"]})]}),e.jsx("h4",{children:"2. 컴포넌트 만들기"}),e.jsx("div",{className:"prompt-example",children:`// TodoItem.tsx
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

export default TodoItem;`}),e.jsx("h4",{children:"3. 상태 관리 (useState)"}),e.jsx("div",{className:"prompt-example",children:`import { useState } from 'react';

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
};`}),e.jsx("h4",{children:"4. React Router — 페이지 라우팅"}),e.jsx("div",{className:"prompt-example",children:`import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<TodoApp />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);`}),e.jsx("h4",{children:"5. 바이브코딩으로 UI 만들기"}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"Cursor IDE에서 AI에게 요청하기"}),e.jsx("br",{}),e.jsx("br",{}),'"할 일 관리 앱의 메인 페이지를 만들어줘. 상단에 입력 폼, 하단에 할 일 목록이 표시되고, 각 항목에 체크박스와 삭제 버튼이 있어. 완료된 항목은 취소선으로 표시해줘. 깔끔하고 모던한 CSS도 함께 작성해줘."']}),e.jsx("h4",{children:"6. 1일차 실습 체크리스트"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Cursor IDE 설치 및 기본 사용법 숙지"}),e.jsx("li",{children:"Vite + React + TypeScript 프로젝트 생성"}),e.jsx("li",{children:"웹 서비스 기획 및 요구사항 정의서 작성 (AI 활용)"}),e.jsx("li",{children:"HTML/CSS/JS/TypeScript 기본 문법 이해"}),e.jsx("li",{children:"React 컴포넌트, Props, State 이해 및 실습"}),e.jsx("li",{children:"AI를 활용한 프론트엔드 UI 구현 (Todo 앱)"}),e.jsx("li",{children:"Git 초기화 및 첫 커밋"})]})]})]})]})})]})})]})};export{p as default};
