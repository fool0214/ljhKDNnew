import{r as l,j as e,L as n}from"./index-DVR_7w-1.js";import{S as c}from"./SEOHead-CotNkwjF.js";const r=[{id:"part1",label:"Part1. REST API & Node.js 백엔드"},{id:"part2",label:"Part2. DB 연동 & 프론트–백엔드 통합"},{id:"part3",label:"Part3. 인증·인가 (JWT/OAuth)"}],u=()=>{const[o,t]=l.useState("part1");l.useEffect(()=>{const s=()=>{for(let a=r.length-1;a>=0;a--){const i=document.getElementById(r[a].id);if(i&&i.getBoundingClientRect().top<=120){t(r[a].id);break}}};return window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]);const d=s=>{const a=document.getElementById(s);a&&(a.scrollIntoView({behavior:"smooth",block:"start"}),t(s))};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"2일차 강의안 — 백엔드 & 인증",description:"바이브코딩 2일차: REST API, Node.js, Supabase DB, JWT/OAuth 인증 구현"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"Day 2 Lecture"}),e.jsx("h2",{children:"2일차 강의안 — 백엔드 & 인증"}),e.jsx("p",{children:"5.27(수) 09:00~18:00 · 8시간"})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"lecture-layout",children:[e.jsxs("aside",{className:"lecture-sidebar",children:[e.jsxs("div",{className:"ls-title",children:[e.jsx("i",{className:"fa-solid fa-graduation-cap"}),"2일차 목차"]}),e.jsx("ul",{className:"ls-nav",children:r.map(s=>e.jsx("li",{className:"ls-nav-item",children:e.jsxs("button",{className:`ls-nav-link${o===s.id?" active":""}`,onClick:()=>d(s.id),children:[e.jsx("i",{className:"fa-solid fa-circle"}),s.label]})},s.id))}),e.jsx("div",{className:"ls-divider"}),e.jsxs("div",{className:"ls-guide",children:[e.jsx("div",{className:"ls-guide-label",children:"학습 목표"}),e.jsxs("ul",{className:"ls-guide-list",children:[e.jsx("li",{children:"REST API 개념을 이해하고 Node.js로 구현합니다"}),e.jsx("li",{children:"Supabase로 데이터베이스를 연동합니다"}),e.jsx("li",{children:"프론트엔드와 백엔드를 통합합니다"}),e.jsx("li",{children:"JWT/OAuth 기반 인증 시스템을 구축합니다"})]})]}),e.jsx("div",{className:"ls-divider"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsxs(n,{to:"/lecture/basic",className:"ls-course-link",children:[e.jsx("i",{className:"fa-solid fa-arrow-left"}),"1일차 강의안으로 이동",e.jsx("span",{children:"Day 1"})]}),e.jsxs(n,{to:"/lecture/advanced",className:"ls-course-link",children:[e.jsx("i",{className:"fa-solid fa-arrow-right"}),"3일차 강의안으로 이동",e.jsx("span",{children:"Day 3"})]})]})]}),e.jsx("div",{className:"lecture-main",children:e.jsxs("div",{className:"lecture-page",style:{padding:0,maxWidth:"none"},children:[e.jsxs("div",{id:"part1",className:"lecture-section",children:[e.jsx("h3",{children:"Part 1. REST API 설계 및 Node.js 백엔드 구현 (09:00~12:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. REST API란?"}),e.jsx("p",{children:"REST(Representational State Transfer)는 웹에서 데이터를 주고받는 표준 방식입니다. HTTP 메서드(GET, POST, PUT, DELETE)를 사용해 리소스를 조작합니다."}),e.jsx("h4",{children:"2. HTTP 메서드와 CRUD"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"GET"})," → Read (조회): GET /api/todos",e.jsx("br",{}),e.jsx("strong",{children:"POST"})," → Create (생성): POST /api/todos",e.jsx("br",{}),e.jsx("strong",{children:"PUT/PATCH"})," → Update (수정): PUT /api/todos/:id",e.jsx("br",{}),e.jsx("strong",{children:"DELETE"})," → Delete (삭제): DELETE /api/todos/:id",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"상태 코드"}),e.jsx("br",{}),"200 OK / 201 Created / 400 Bad Request / 401 Unauthorized / 404 Not Found / 500 Server Error"]}),e.jsx("h4",{children:"3. API 엔드포인트 설계"}),e.jsx("div",{className:"prompt-example",children:`[AI에게 API 설계 요청하기]
"할 일 관리 앱의 REST API를 설계해줘.

리소스: todos, users
기능: CRUD + 사용자 인증
인증: JWT 토큰 방식

각 엔드포인트에 대해:
- HTTP 메서드 + URL
- 요청 Body (있는 경우)
- 응답 예시 (JSON)
- 인증 필요 여부
를 표로 정리해줘."`}),e.jsx("h4",{children:"4. Node.js + Express 서버 구축"}),e.jsx("div",{className:"prompt-example",children:`// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/todos — 할 일 목록 조회
app.get('/api/todos', (req, res) => {
  res.json({ todos: [] });
});

// POST /api/todos — 할 일 추가
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  };
  res.status(201).json(newTodo);
});

app.listen(3001, () => {
  console.log('서버 실행: http://localhost:3001');
});`}),e.jsx("h4",{children:"5. 미들웨어 패턴"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"CORS"}),": 프론트엔드 도메인에서 API 접근 허용",e.jsx("br",{}),e.jsx("strong",{children:"express.json()"}),": JSON 요청 body 파싱",e.jsx("br",{}),e.jsx("strong",{children:"인증 미들웨어"}),": JWT 토큰 검증",e.jsx("br",{}),e.jsx("strong",{children:"에러 핸들러"}),": 전역 에러 처리",e.jsx("br",{}),e.jsx("strong",{children:"로깅"}),": 요청/응답 로그 기록"]}),e.jsx("h4",{children:"6. API 테스트 (Postman / Thunder Client)"}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"실습"}),': Express 서버를 만들고, Postman이나 Thunder Client(VS Code 확장)로 API를 테스트해보세요. AI에게 "Express로 Todo CRUD API를 만들어줘"라고 요청하면 빠르게 구축할 수 있습니다.']})]})]}),e.jsxs("div",{id:"part2",className:"lecture-section",children:[e.jsx("h3",{children:"Part 2. 데이터베이스 연동 및 프론트–백엔드 통합 (13:00~15:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. Supabase 소개"}),e.jsx("p",{children:"Supabase는 오픈소스 Firebase 대안으로, PostgreSQL 데이터베이스, 인증, 스토리지, 실시간 구독 등을 제공하는 BaaS(Backend-as-a-Service)입니다."}),e.jsxs("ul",{children:[e.jsx("li",{children:"PostgreSQL 기반 — 강력한 SQL 쿼리 지원"}),e.jsx("li",{children:"자동 REST API 생성 — 테이블 만들면 API 자동 생성"}),e.jsx("li",{children:"인증 시스템 내장 — Email, Google, Kakao OAuth"}),e.jsx("li",{children:"실시간 구독 — 데이터 변경 시 자동 알림"}),e.jsx("li",{children:"무료 티어 — 개인 프로젝트에 충분"})]}),e.jsx("h4",{children:"2. Supabase 프로젝트 설정"}),e.jsx("div",{className:"prompt-example",children:`# 1. supabase.com에서 프로젝트 생성
# 2. 프로젝트 URL과 anon key 복사

# 3. Supabase 클라이언트 설치
npm install @supabase/supabase-js

# 4. 환경 변수 설정 (.env)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...`}),e.jsx("h4",{children:"3. 테이블 생성 및 CRUD"}),e.jsx("div",{className:"prompt-example",children:`-- SQL로 테이블 생성 (Supabase SQL Editor)
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 본인 데이터만 접근 가능하도록 정책 생성
CREATE POLICY "Users can manage own todos"
  ON todos FOR ALL
  USING (auth.uid() = user_id);`}),e.jsx("h4",{children:"4. Supabase 클라이언트 사용"}),e.jsx("div",{className:"prompt-example",children:`import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 조회
const { data: todos } = await supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false });

// 추가
await supabase.from('todos').insert({
  title: '새 할 일',
  user_id: user.id,
});

// 수정
await supabase.from('todos')
  .update({ completed: true })
  .eq('id', todoId);

// 삭제
await supabase.from('todos')
  .delete()
  .eq('id', todoId);`}),e.jsx("h4",{children:"5. 프론트–백엔드 통합"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"방법 1: 직접 Supabase 연동"}),e.jsx("br",{}),"- React에서 Supabase 클라이언트를 직접 사용",e.jsx("br",{}),"- RLS(Row Level Security)로 보안 확보",e.jsx("br",{}),"- 별도 백엔드 서버 불필요",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"방법 2: Express + Supabase"}),e.jsx("br",{}),"- Express 서버가 Supabase와 통신",e.jsx("br",{}),"- 비즈니스 로직을 서버에서 처리",e.jsx("br",{}),"- 더 세밀한 권한 제어 가능"]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"실습"}),': Supabase에 todos 테이블을 생성하고, React에서 할 일을 추가/조회/삭제하는 기능을 구현하세요. AI에게 "Supabase와 연동하는 Todo 앱의 CRUD를 구현해줘"라고 요청해보세요.']})]})]}),e.jsxs("div",{id:"part3",className:"lecture-section",children:[e.jsx("h3",{children:"Part 3. 인증·인가(JWT/OAuth) 기능 구현 (16:00~18:00)"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1. 인증(Authentication) vs 인가(Authorization)"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"인증(Authentication)"}),': "너는 누구인가?" — 로그인/회원가입',e.jsx("br",{}),e.jsx("strong",{children:"인가(Authorization)"}),': "너는 무엇을 할 수 있는가?" — 권한 확인',e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"인증 방식"}),e.jsx("br",{}),"- ",e.jsx("strong",{children:"세션 기반"}),": 서버에 세션 저장, 쿠키로 세션ID 전달",e.jsx("br",{}),"- ",e.jsx("strong",{children:"토큰 기반 (JWT)"}),": 서버가 토큰 발행, 클라이언트가 토큰 저장/전송",e.jsx("br",{}),"- ",e.jsx("strong",{children:"OAuth 2.0"}),": Google, Kakao 등 외부 서비스로 로그인"]}),e.jsx("h4",{children:"2. JWT (JSON Web Token) 구조"}),e.jsx("div",{className:"prompt-example",children:`// JWT 구조: Header.Payload.Signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTIzIn0.xxxxx

// Header: 알고리즘, 토큰 타입
{ "alg": "HS256", "typ": "JWT" }

// Payload: 사용자 정보 (Claims)
{ "user_id": "123", "email": "user@kdn.com", "exp": 1717200000 }

// Signature: Header + Payload를 비밀키로 서명
HMACSHA256(base64(header) + "." + base64(payload), secret)`}),e.jsx("h4",{children:"3. Supabase Auth — 이메일 로그인"}),e.jsx("div",{className:"prompt-example",children:`// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@kdn.com',
  password: 'securePassword123',
});

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@kdn.com',
  password: 'securePassword123',
});

// 현재 사용자 확인
const { data: { user } } = await supabase.auth.getUser();

// 로그아웃
await supabase.auth.signOut();

// 세션 변경 감지
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});`}),e.jsx("h4",{children:"4. OAuth — Google/Kakao 로그인"}),e.jsx("div",{className:"prompt-example",children:`// Google OAuth 로그인
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: window.location.origin,
  },
});

// Kakao OAuth 로그인
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'kakao',
  options: {
    redirectTo: window.location.origin,
  },
});`}),e.jsx("h4",{children:"5. React에서 인증 상태 관리 (Context)"}),e.jsx("div",{className:"prompt-example",children:`// AuthContext.tsx
const AuthContext = createContext<AuthState>(null!);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};`}),e.jsx("h4",{children:"6. 보호된 라우트 (AuthGuard)"}),e.jsx("div",{className:"prompt-example",children:`// AuthGuard.tsx
const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return children;
};

// 사용
<Route path="/mypage"
  element={<AuthGuard><MyPage /></AuthGuard>}
/>`}),e.jsx("h4",{children:"7. 2일차 실습 체크리스트"}),e.jsxs("ul",{children:[e.jsx("li",{children:"REST API 개념 이해 및 엔드포인트 설계"}),e.jsx("li",{children:"Node.js + Express 서버 구축 (또는 Supabase 직접 연동)"}),e.jsx("li",{children:"Supabase 프로젝트 생성 및 테이블 설계"}),e.jsx("li",{children:"React에서 Supabase CRUD 구현"}),e.jsx("li",{children:"이메일 기반 회원가입/로그인 구현"}),e.jsx("li",{children:"OAuth(Google/Kakao) 로그인 연동"}),e.jsx("li",{children:"AuthContext로 인증 상태 관리"}),e.jsx("li",{children:"보호된 라우트(AuthGuard) 구현"})]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"종합 실습"}),': 1일차에 만든 프론트엔드 앱에 Supabase를 연동하고, 로그인/회원가입 기능을 추가하세요. AI에게 "Supabase Auth를 사용해서 이메일 로그인과 Google OAuth를 구현해줘"라고 요청해보세요.']})]})]})]})})]})})]})};export{u as default};
