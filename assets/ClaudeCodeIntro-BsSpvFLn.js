import{r as n,j as e,L as x}from"./index-CGYqL1dD.js";import{S as o}from"./SEOHead-DE9N4o5m.js";const r=[{id:"install",label:"설치 & 환경 구성"},{id:"first-run",label:"첫 실행 & 인터페이스"},{id:"basic-commands",label:"기본 명령어"},{id:"workflow",label:"기본 워크플로우"}],j=()=>{const[t,i]=n.useState("install");n.useEffect(()=>{const l=()=>{for(let s=r.length-1;s>=0;s--){const d=document.getElementById(r[s].id);if(d&&d.getBoundingClientRect().top<=120){i(r[s].id);break}}};return window.addEventListener("scroll",l,{passive:!0}),()=>window.removeEventListener("scroll",l)},[]);const c=l=>{const s=document.getElementById(l);s&&(s.scrollIntoView({behavior:"smooth",block:"start"}),i(l))};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Claude Code 시작하기",description:"Claude Code 설치부터 첫 실행, 기본 명령어, 워크플로우까지 한눈에 익히는 가이드"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"Claude Code"}),e.jsx("h2",{children:"Claude Code 시작하기"}),e.jsx("p",{children:"설치부터 기본 워크플로우까지 — 터미널 기반 AI 코딩 Agent"})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"lecture-layout",children:[e.jsxs("aside",{className:"lecture-sidebar",children:[e.jsxs("div",{className:"ls-title",children:[e.jsx("i",{className:"fa-solid fa-terminal"}),"목차"]}),e.jsx("ul",{className:"ls-nav",children:r.map(l=>e.jsx("li",{className:"ls-nav-item",children:e.jsxs("button",{className:`ls-nav-link${t===l.id?" active":""}`,onClick:()=>c(l.id),children:[e.jsx("i",{className:"fa-solid fa-circle"}),l.label]})},l.id))}),e.jsx("div",{className:"ls-divider"}),e.jsxs("div",{className:"ls-guide",children:[e.jsx("div",{className:"ls-guide-label",children:"학습 목표"}),e.jsxs("ul",{className:"ls-guide-list",children:[e.jsx("li",{children:"Claude Code를 설치하고 인증을 설정합니다"}),e.jsx("li",{children:"REPL / 단일 명령 모드를 이해합니다"}),e.jsx("li",{children:"핵심 슬래시 명령어를 익힙니다"}),e.jsx("li",{children:"프로젝트 탐색 → 수정 → 커밋 흐름을 실습합니다"})]})]}),e.jsx("div",{className:"ls-divider"}),e.jsxs(x,{to:"/claude-code/markdown",className:"ls-course-link",children:[e.jsx("i",{className:"fa-solid fa-arrow-right"}),"마크다운 개발 전략으로 이동",e.jsx("span",{children:"Next"})]})]}),e.jsx("div",{className:"lecture-main",children:e.jsxs("div",{className:"lecture-page",style:{padding:0,maxWidth:"none"},children:[e.jsxs("div",{id:"install",className:"lecture-section",children:[e.jsx("h3",{children:"1. 설치 & 환경 구성"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1-1. Claude Code란?"}),e.jsxs("p",{children:["Claude Code는 Anthropic이 만든 ",e.jsx("strong",{children:"에이전틱 코딩 도구"}),"입니다. 코드베이스를 읽고, 파일을 수정하고, 명령을 실행하고, 개발 도구와 통합됩니다. 터미널, IDE(VS Code/JetBrains), 데스크톱 앱, 웹 브라우저에서 사용할 수 있습니다."]}),e.jsxs("svg",{viewBox:"0 0 700 320",style:{width:"100%",maxWidth:700,margin:"24px auto",display:"block"},children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"gMain",x1:"0",y1:"0",x2:"1",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#1B2A4A"}),e.jsx("stop",{offset:"100%",stopColor:"#2E4A7A"})]}),e.jsxs("linearGradient",{id:"gSurface",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#4A8FE7"}),e.jsx("stop",{offset:"100%",stopColor:"#3A6FD0"})]})]}),e.jsx("rect",{x:"240",y:"110",width:"220",height:"100",rx:"16",fill:"url(#gMain)"}),e.jsx("text",{x:"350",y:"150",textAnchor:"middle",fill:"#fff",fontSize:"18",fontWeight:"bold",children:"Claude Code"}),e.jsx("text",{x:"350",y:"175",textAnchor:"middle",fill:"#93B5E0",fontSize:"12",children:"Agentic Coding Tool"}),e.jsx("text",{x:"350",y:"195",textAnchor:"middle",fill:"#93B5E0",fontSize:"11",children:"by Anthropic"}),[{x:60,y:30,label:"Terminal",icon:">"},{x:210,y:30,label:"VS Code",icon:"</>"},{x:370,y:30,label:"Desktop",icon:"D"},{x:530,y:30,label:"Web",icon:"W"}].map((l,s)=>e.jsxs("g",{children:[e.jsx("rect",{x:l.x,y:l.y,width:"110",height:"50",rx:"10",fill:"url(#gSurface)"}),e.jsx("text",{x:l.x+55,y:l.y+22,textAnchor:"middle",fill:"#fff",fontSize:"11",fontWeight:"bold",children:l.icon}),e.jsx("text",{x:l.x+55,y:l.y+38,textAnchor:"middle",fill:"#E8F0FE",fontSize:"12",children:l.label}),e.jsx("line",{x1:l.x+55,y1:l.y+50,x2:"350",y2:"110",stroke:"#4A8FE7",strokeWidth:"1.5",strokeDasharray:"4,3",opacity:"0.6"})]},s)),[{x:30,y:250,label:"파일 읽기/수정"},{x:190,y:250,label:"명령 실행"},{x:350,y:250,label:"Git 연동"},{x:510,y:250,label:"MCP 확장"}].map((l,s)=>e.jsxs("g",{children:[e.jsx("rect",{x:l.x,y:l.y,width:"130",height:"42",rx:"8",fill:"#F0F4FF",stroke:"#4A8FE7",strokeWidth:"1.5"}),e.jsx("text",{x:l.x+65,y:l.y+26,textAnchor:"middle",fill:"#1B2A4A",fontSize:"12",fontWeight:"600",children:l.label}),e.jsx("line",{x1:"350",y1:"210",x2:l.x+65,y2:l.y,stroke:"#1B2A4A",strokeWidth:"1.5",strokeDasharray:"4,3",opacity:"0.4"})]},s))]}),e.jsx("h4",{children:"1-2. 시스템 요구사항 (공식 문서 기준)"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"운영체제"}),e.jsx("br",{}),"- macOS 13.0 이상",e.jsx("br",{}),"- Windows 10 1809+ / Windows Server 2019+",e.jsx("br",{}),"- Ubuntu 20.04+ / Debian 10+ / Alpine Linux 3.19+",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"하드웨어"}),": 4GB+ RAM, x64 또는 ARM64 프로세서",e.jsx("br",{}),e.jsx("strong",{children:"셸"}),": Bash, Zsh, PowerShell, 또는 CMD",e.jsx("br",{}),e.jsx("strong",{children:"네트워크"}),": 인터넷 연결 필수",e.jsx("br",{}),e.jsx("strong",{children:"Windows 참고"}),": Git for Windows 설치 권장 (Bash 도구 사용 가능). 미설치 시 PowerShell로 대체"]}),e.jsx("h4",{children:"1-3. 설치 방법 (3가지)"}),e.jsx("div",{className:"prompt-example",children:`# ── 방법 1: Native Install (권장) ──
# macOS, Linux, WSL:
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell:
irm https://claude.ai/install.ps1 | iex

# Windows CMD:
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd

# ── 방법 2: Homebrew (macOS) ──
brew install --cask claude-code

# ── 방법 3: npm ──
npm install -g @anthropic-ai/claude-code`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"Native Install vs npm"}),": Native Install은 자동 업데이트를 지원합니다. npm 설치 시 ",e.jsx("code",{children:"sudo"}),"를 사용하지 마세요 — 권한 문제가 발생할 수 있습니다. Windows에서 WinGet으로도 설치 가능: ",e.jsx("code",{children:"winget install Anthropic.ClaudeCode"})]}),e.jsx("h4",{children:"1-4. 설치 확인 및 인증"}),e.jsx("div",{className:"prompt-example",children:`# 설치 확인
claude --version

# 상세 진단
claude doctor

# 프로젝트에서 첫 실행 (브라우저 로그인 안내)
cd your-project
claude`}),e.jsxs("p",{children:["Claude Code는 ",e.jsx("strong",{children:"Pro, Max, Team, Enterprise"})," 또는 ",e.jsx("strong",{children:"Anthropic Console"})," 계정이 필요합니다. 무료 Claude.ai 플랜은 지원하지 않습니다. Amazon Bedrock, Google Vertex AI 등 서드파티 API 제공자도 지원됩니다."]}),e.jsxs("svg",{viewBox:"0 0 700 110",style:{width:"100%",maxWidth:700,margin:"20px auto",display:"block"},children:[[{x:10,label:"설치",sub:"curl / npm / brew"},{x:185,label:"버전 확인",sub:"claude --version"},{x:360,label:"첫 실행",sub:"claude"},{x:535,label:"브라우저 로그인",sub:"OAuth 인증"}].map((l,s)=>e.jsxs("g",{children:[e.jsx("rect",{x:l.x,y:"15",width:"150",height:"70",rx:"12",fill:s===3?"#1B2A4A":"#F0F4FF",stroke:"#1B2A4A",strokeWidth:"1.5"}),e.jsx("text",{x:l.x+75,y:"42",textAnchor:"middle",fill:s===3?"#fff":"#1B2A4A",fontSize:"14",fontWeight:"bold",children:l.label}),e.jsx("text",{x:l.x+75,y:"62",textAnchor:"middle",fill:s===3?"#93B5E0":"#5A7AAA",fontSize:"10",children:l.sub}),s<3&&e.jsx("polygon",{points:`${l.x+157},50 ${l.x+178},50 ${l.x+178},45 ${l.x+185},50 ${l.x+178},55 ${l.x+178},50`,fill:"#4A8FE7"})]},s)),e.jsx("text",{x:"350",y:"106",textAnchor:"middle",fill:"#888",fontSize:"11",children:"Claude Code 설치 → 인증 흐름"})]})]})]}),e.jsxs("div",{id:"first-run",className:"lecture-section",children:[e.jsx("h3",{children:"2. 첫 실행 & 인터페이스"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"2-1. 대화형(Interactive) 모드"}),e.jsxs("p",{children:["프로젝트 폴더에서 ",e.jsx("code",{children:"claude"}),"를 입력하면 대화형 세션이 시작됩니다. 초기 프롬프트와 함께 시작할 수도 있습니다."]}),e.jsx("div",{className:"prompt-example",children:`# 대화형 세션 시작
claude

# 초기 프롬프트와 함께 시작
claude "이 프로젝트를 설명해줘"

# 가장 최근 대화 이어가기
claude -c

# 특정 세션 이름으로 재개
claude -r "auth-refactor" "이 PR 마무리해줘"`}),e.jsx("h4",{children:"2-2. 단일 명령(Print) 모드"}),e.jsxs("p",{children:[e.jsx("code",{children:"-p"})," 플래그로 한 번의 명령만 실행하고 종료합니다. 스크립트, CI/CD, 파이프라인에서 활용됩니다."]}),e.jsx("div",{className:"prompt-example",children:`# 단일 명령 실행
claude -p "이 함수를 설명해줘"

# 파이프 입력 (로그 분석, 코드 리뷰 등)
cat error.log | claude -p "이 에러 로그를 분석해줘"
git diff main --name-only | claude -p "변경 파일의 보안 이슈를 점검해줘"

# JSON 출력
claude -p "query" --output-format json`}),e.jsx("h4",{children:"2-3. 사용 환경별 특징"}),e.jsxs("svg",{viewBox:"0 0 700 200",style:{width:"100%",maxWidth:700,margin:"20px auto",display:"block"},children:[[{x:10,y:10,w:130,label:"Terminal CLI",desc:`전체 기능, 파일 편집
명령 실행, Git 연동`,color:"#1B2A4A"},{x:150,y:10,w:130,label:"VS Code",desc:`인라인 diff, @멘션
Plan 리뷰, 히스토리`,color:"#2E5A9E"},{x:290,y:10,w:130,label:"JetBrains",desc:`IntelliJ, PyCharm
대화형 diff 뷰`,color:"#3A6FD0"},{x:430,y:10,w:130,label:"Desktop App",desc:`독립 실행, 멀티 세션
비주얼 diff, 스케줄링`,color:"#4A8FE7"},{x:570,y:10,w:120,label:"Web",desc:`브라우저에서 실행
로컬 설치 불필요`,color:"#5BA0F0"}].map((l,s)=>e.jsxs("g",{children:[e.jsx("rect",{x:l.x,y:l.y,width:l.w,height:"55",rx:"10",fill:l.color}),e.jsx("text",{x:l.x+l.w/2,y:l.y+22,textAnchor:"middle",fill:"#fff",fontSize:"12",fontWeight:"bold",children:l.label}),e.jsx("text",{x:l.x+l.w/2,y:l.y+40,textAnchor:"middle",fill:"#C5D8F0",fontSize:"9",children:l.desc.split(`
`)[0]}),l.desc.split(`
`)[1]&&e.jsx("text",{x:l.x+l.w/2,y:l.y+52,textAnchor:"middle",fill:"#C5D8F0",fontSize:"9",children:l.desc.split(`
`)[1]})]},s)),e.jsx("rect",{x:"10",y:"80",width:"680",height:"50",rx:"8",fill:"#F0F4FF",stroke:"#4A8FE7",strokeWidth:"1"}),e.jsx("text",{x:"350",y:"100",textAnchor:"middle",fill:"#1B2A4A",fontSize:"13",fontWeight:"bold",children:"동일한 Claude Code 엔진 — CLAUDE.md, 설정, MCP 서버 공유"}),e.jsx("text",{x:"350",y:"118",textAnchor:"middle",fill:"#5A7AAA",fontSize:"11",children:"어디서든 같은 프로젝트 컨텍스트로 작업 가능"}),e.jsx("rect",{x:"10",y:"145",width:"330",height:"42",rx:"8",fill:"#fff",stroke:"#1B2A4A",strokeWidth:"1"}),e.jsx("text",{x:"175",y:"162",textAnchor:"middle",fill:"#1B2A4A",fontSize:"11",fontWeight:"600",children:"Remote Control: 데스크에서 떠나도 휴대폰에서 이어서 작업"}),e.jsx("text",{x:"175",y:"178",textAnchor:"middle",fill:"#888",fontSize:"10",children:"claude --remote-control"}),e.jsx("rect",{x:"360",y:"145",width:"330",height:"42",rx:"8",fill:"#fff",stroke:"#1B2A4A",strokeWidth:"1"}),e.jsx("text",{x:"525",y:"162",textAnchor:"middle",fill:"#1B2A4A",fontSize:"11",fontWeight:"600",children:"Teleport: 웹 세션을 로컬 터미널로 가져오기"}),e.jsx("text",{x:"525",y:"178",textAnchor:"middle",fill:"#888",fontSize:"10",children:"claude --teleport"})]}),e.jsx("h4",{children:"2-4. 권한 모드 (Permission Modes)"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"Shift+Tab"}),"으로 모드를 순환 전환합니다:",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"default (Suggest)"})," — 파일 수정/Bash 실행 시 사용자 승인 필요 (기본값)",e.jsx("br",{}),e.jsx("strong",{children:"acceptEdits"})," — 파일 수정은 자동 허용, Bash만 승인",e.jsx("br",{}),e.jsx("strong",{children:"plan"})," — 코드 변경 없이 계획만 수립 (Plan Mode)",e.jsx("br",{}),e.jsx("strong",{children:"auto"})," — 모든 작업 자동 실행 (내장 분류기가 위험 명령 차단)",e.jsx("br",{}),e.jsx("strong",{children:"bypassPermissions"})," — 모든 권한 검사 생략 (주의 필요)"]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"공식 권장"}),": 처음에는 기본 default 모드로 시작하세요. Claude가 어떤 변경을 제안하는지 확인하며 신뢰를 쌓은 후 acceptEdits 또는 auto로 전환하면 효율적입니다."]})]})]}),e.jsxs("div",{id:"basic-commands",className:"lecture-section",children:[e.jsx("h3",{children:"3. 기본 명령어"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"3-1. CLI 명령어 (터미널에서 직접 실행)"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"claude"})," — 대화형 세션 시작",e.jsx("br",{}),e.jsx("strong",{children:'claude "query"'})," — 초기 프롬프트와 함께 시작",e.jsx("br",{}),e.jsx("strong",{children:'claude -p "query"'})," — 단일 명령 후 종료 (Print 모드)",e.jsx("br",{}),e.jsx("strong",{children:"claude -c"})," — 가장 최근 대화 이어가기",e.jsx("br",{}),e.jsx("strong",{children:"claude -r <name>"})," — 특정 세션 재개",e.jsx("br",{}),e.jsx("strong",{children:"claude update"})," — 최신 버전으로 업데이트",e.jsx("br",{}),e.jsx("strong",{children:"claude auth login"})," — 계정 로그인",e.jsx("br",{}),e.jsx("strong",{children:"claude auth status"})," — 인증 상태 확인",e.jsx("br",{}),e.jsx("strong",{children:"claude doctor"})," — 설치/설정 진단"]}),e.jsx("h4",{children:"3-2. 세션 내 슬래시 명령어"}),e.jsx("div",{className:"prompt-example",children:`# 세션 관리
/help              # 사용 가능한 모든 명령어 목록
/clear             # 대화 초기화 (새 작업 시작)
/compact           # 대화 요약 (컨텍스트 절약)
/compact [지시]    # 사용자 지정 요약 지시
/cost              # 토큰 사용량과 비용 확인
/status            # 프로젝트 상태 및 Git 정보

# 모드 전환
/model             # 모델 확인/변경 (sonnet, opus 등)
/plan              # Plan Mode 전환 (구현 전 설계)
Shift+Tab          # 권한 모드 순환 전환

# Git 관련
/commit            # 변경사항 분석 → 메시지 생성 → 커밋
/review-pr         # PR 코드 리뷰
/pr-comments       # PR 댓글 확인

# 메모리 & 설정
/memory            # CLAUDE.md / auto memory 관리
/init              # CLAUDE.md 자동 생성
/config            # 설정 메뉴`}),e.jsx("h4",{children:"3-3. 키보드 단축키"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"Ctrl+C"})," — 현재 입력/생성 취소",e.jsx("br",{}),e.jsx("strong",{children:"Ctrl+D"})," — 세션 종료",e.jsx("br",{}),e.jsx("strong",{children:"Esc"})," — Claude 응답 중단 (작업은 유지)",e.jsx("br",{}),e.jsx("strong",{children:"Esc + Esc"})," — 이전 상태로 되돌리기 (Rewind)",e.jsx("br",{}),e.jsx("strong",{children:"Shift+Tab"})," — 권한 모드 전환",e.jsx("br",{}),e.jsx("strong",{children:"Alt+P"})," — 모델 전환",e.jsx("br",{}),e.jsx("strong",{children:"Alt+T"})," — Extended Thinking 토글",e.jsx("br",{}),e.jsx("strong",{children:"Alt+O"})," — Fast Mode 토글",e.jsx("br",{}),e.jsx("strong",{children:"Ctrl+O"})," — 트랜스크립트 뷰어 토글",e.jsx("br",{}),e.jsx("strong",{children:"Ctrl+T"})," — 태스크 리스트 토글",e.jsx("br",{}),e.jsx("strong",{children:"Ctrl+G"})," — 외부 에디터에서 프롬프트 편집"]}),e.jsx("h4",{children:"3-4. 빠른 입력"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"/ (앞에)"})," — 슬래시 명령어 또는 스킬 호출",e.jsx("br",{}),e.jsx("strong",{children:"! (앞에)"})," — 셸 모드 (명령을 바로 실행하고 결과를 세션에 추가)",e.jsx("br",{}),e.jsx("strong",{children:"@"})," — 파일 경로 자동완성 (파일 멘션)"]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"비용 절약 팁"}),": 간단한 작업은 ",e.jsx("code",{children:"/model sonnet"}),"으로 전환하고, 복잡한 아키텍처 설계는 Opus를 사용하세요.",e.jsx("code",{children:"/compact"}),"로 대화를 정기적으로 요약하면 토큰 사용량이 줄어듭니다."]})]})]}),e.jsxs("div",{id:"workflow",className:"lecture-section",children:[e.jsx("h3",{children:"4. 기본 워크플로우"}),e.jsxs("div",{className:"lecture-content",children:[e.jsxs("svg",{viewBox:"0 0 700 170",style:{width:"100%",maxWidth:700,margin:"10px auto 24px",display:"block"},children:[[{x:5,label:"탐색",sub:"구조 파악",icon:"1",color:"#E8F0FE"},{x:145,label:"계획",sub:"/plan",icon:"2",color:"#D4E4FC"},{x:285,label:"구현",sub:"코드 수정",icon:"3",color:"#B8D4FA"},{x:425,label:"검증",sub:"빌드/테스트",icon:"4",color:"#9CC4F8"},{x:565,label:"커밋",sub:"/commit",icon:"5",color:"#1B2A4A"}].map((l,s)=>e.jsxs("g",{children:[e.jsx("rect",{x:l.x,y:"20",width:"125",height:"80",rx:"14",fill:l.color,stroke:"#1B2A4A",strokeWidth:s===4?2:1}),e.jsx("circle",{cx:l.x+25,cy:"42",r:"12",fill:s===4?"#4A8FE7":"#1B2A4A"}),e.jsx("text",{x:l.x+25,y:"47",textAnchor:"middle",fill:"#fff",fontSize:"13",fontWeight:"bold",children:l.icon}),e.jsx("text",{x:l.x+72,y:"50",textAnchor:"middle",fill:s===4?"#fff":"#1B2A4A",fontSize:"15",fontWeight:"bold",children:l.label}),e.jsx("text",{x:l.x+63,y:"80",textAnchor:"middle",fill:s===4?"#93B5E0":"#5A7AAA",fontSize:"11",children:l.sub}),s<4&&e.jsx("polygon",{points:`${l.x+132},60 ${l.x+145},55 ${l.x+145},65`,fill:"#4A8FE7"})]},s)),e.jsx("text",{x:"350",y:"132",textAnchor:"middle",fill:"#1B2A4A",fontSize:"13",fontWeight:"600",children:"Claude Code 기본 워크플로우"}),e.jsx("text",{x:"350",y:"152",textAnchor:"middle",fill:"#888",fontSize:"11",children:"하나의 세션에서 하나의 기능에 집중 → /clear → 다음 기능"})]}),e.jsx("h4",{children:"4-1. 프로젝트 시작하기"}),e.jsx("div",{className:"prompt-example",children:`# 1. 프로젝트 폴더로 이동
cd my-project

# 2. Claude Code 실행
claude

# 3. 프로젝트 파악 요청
> 이 프로젝트의 구조와 주요 기술 스택을 분석해줘

# 4. 작업 요청
> src/components/에 새로운 Button 컴포넌트를 만들어줘`}),e.jsx("h4",{children:"4-2. Claude Code가 할 수 있는 일"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"자동화"})," — 테스트 작성, 린트 에러 수정, 의존성 업데이트, 릴리스 노트 작성",e.jsx("br",{}),e.jsx("strong",{children:"기능 구현"})," — 자연어로 설명하면 여러 파일에 걸쳐 코드 생성/수정",e.jsx("br",{}),e.jsx("strong",{children:"버그 수정"})," — 에러 메시지를 붙여넣으면 원인 추적 및 수정",e.jsx("br",{}),e.jsx("strong",{children:"커밋 & PR"})," — 변경사항 스테이징, 커밋 메시지 작성, 브랜치 생성, PR 오픈",e.jsx("br",{}),e.jsx("strong",{children:"MCP 연동"})," — Google Drive, Jira, Slack 등 외부 도구와 연결",e.jsx("br",{}),e.jsx("strong",{children:"스케줄링"})," — 정기 PR 리뷰, CI 분석, 문서 동기화 자동화"]}),e.jsx("h4",{children:"4-3. 효과적인 요청 방법"}),e.jsx("div",{className:"prompt-example",children:`# 좋은 요청 — 구체적, 맥락 포함, 제약조건 명시
> "src/utils/api.ts의 fetchData 함수에 에러 핸들링을 추가해줘.
   네트워크 에러와 타임아웃을 분리해서 처리하고,
   사용자에게 표시할 에러 메시지도 포함해줘."

# 파이프 활용
> tail -200 app.log | claude -p "이상 징후가 있으면 Slack으로 알려줘"

# 덜 효과적 — 모호하고 맥락 없음
> "에러 핸들링 추가해줘"`}),e.jsx("h4",{children:"4-4. 작업 완료 후 정리"}),e.jsx("div",{className:"prompt-example",children:`# 변경사항 확인 및 커밋
> /commit

# 비용 확인
> /cost

# 대화 초기화 (다음 작업 준비)
> /clear

# 세션 종료
Ctrl+D`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"실습"}),": 기존 프로젝트 폴더에서 ",e.jsx("code",{children:"claude"}),'를 실행하고, "이 프로젝트를 분석해줘"라고 요청해보세요. Claude가 Glob, Grep, Read 도구를 사용해 코드를 탐색하는 과정을 관찰해보세요.']})]})]})]})})]})})]})};export{j as default};
