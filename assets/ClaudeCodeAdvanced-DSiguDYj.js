import{r as t,j as e,L as n}from"./index-CGYqL1dD.js";import{S as a}from"./SEOHead-DE9N4o5m.js";const o=[{id:"project-structure",label:"프로젝트 폴더 정리"},{id:"git-pr",label:"Git 연동 & PR 관리"},{id:"hooks",label:"Hooks & 자동화"},{id:"mcp",label:"MCP & 확장 기능"}],j=()=>{const[d,i]=t.useState("project-structure");t.useEffect(()=>{const s=()=>{for(let l=o.length-1;l>=0;l--){const r=document.getElementById(o[l].id);if(r&&r.getBoundingClientRect().top<=120){i(o[l].id);break}}};return window.addEventListener("scroll",s,{passive:!0}),()=>window.removeEventListener("scroll",s)},[]);const c=s=>{const l=document.getElementById(s);l&&(l.scrollIntoView({behavior:"smooth",block:"start"}),i(s))};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"프로젝트 관리 & 고급",description:"프로젝트 폴더 정리, Git/PR 연동, Hooks 자동화, MCP 확장 기능 가이드"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"Claude Code"}),e.jsx("h2",{children:"프로젝트 관리 & 고급"}),e.jsx("p",{children:"Git 연동, Hooks, MCP 서버로 Claude Code를 최대한 활용하기"})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"lecture-layout",children:[e.jsxs("aside",{className:"lecture-sidebar",children:[e.jsxs("div",{className:"ls-title",children:[e.jsx("i",{className:"fa-solid fa-gear"}),"목차"]}),e.jsx("ul",{className:"ls-nav",children:o.map(s=>e.jsx("li",{className:"ls-nav-item",children:e.jsxs("button",{className:`ls-nav-link${d===s.id?" active":""}`,onClick:()=>c(s.id),children:[e.jsx("i",{className:"fa-solid fa-circle"}),s.label]})},s.id))}),e.jsx("div",{className:"ls-divider"}),e.jsxs("div",{className:"ls-guide",children:[e.jsx("div",{className:"ls-guide-label",children:"학습 목표"}),e.jsxs("ul",{className:"ls-guide-list",children:[e.jsx("li",{children:"프로젝트 폴더를 체계적으로 정리합니다"}),e.jsx("li",{children:"Git 연동과 PR 워크플로우를 익힙니다"}),e.jsx("li",{children:"Hooks로 작업을 자동화합니다"}),e.jsx("li",{children:"MCP 서버로 기능을 확장합니다"})]})]}),e.jsx("div",{className:"ls-divider"}),e.jsxs(n,{to:"/claude-code/intro",className:"ls-course-link",children:[e.jsx("i",{className:"fa-solid fa-arrow-left"}),"Claude Code 시작하기로 이동",e.jsx("span",{children:"처음으로"})]})]}),e.jsx("div",{className:"lecture-main",children:e.jsxs("div",{className:"lecture-page",style:{padding:0,maxWidth:"none"},children:[e.jsxs("div",{id:"project-structure",className:"lecture-section",children:[e.jsx("h3",{children:"1. 프로젝트 폴더 정리"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"1-1. Claude Code 프로젝트 권장 구조"}),e.jsx("div",{className:"prompt-example",children:`my-project/
├── CLAUDE.md              # AI 프로젝트 가이드 (필수)
├── README.md              # 사람을 위한 프로젝트 설명
├── .claude/               # Claude Code 설정 (gitignore)
│   ├── settings.json      # 프로젝트 설정
│   ├── settings.local.json # 로컬 설정 (gitignore)
│   └── rules/             # 주제별 규칙 파일
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
├── CLAUDE.local.md        # 개인 프로젝트 설정 (gitignore)
├── .env                   # 환경 변수 (gitignore)
├── public/
├── src/
│   ├── components/        # 재사용 UI 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── config/            # 설정 파일
│   ├── contexts/          # React Context
│   ├── hooks/             # Custom Hooks
│   ├── utils/             # 유틸리티 함수
│   ├── types/             # TypeScript 타입
│   └── styles/            # CSS 파일
└── Dev_md/                # 개발 이력 문서`}),e.jsx("h4",{children:"1-2. 파일 네이밍 규칙"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"컴포넌트"}),": PascalCase — ",e.jsx("code",{children:"UserProfile.tsx"}),", ",e.jsx("code",{children:"NavBar.tsx"}),e.jsx("br",{}),e.jsx("strong",{children:"유틸리티"}),": camelCase — ",e.jsx("code",{children:"formatDate.ts"}),", ",e.jsx("code",{children:"apiClient.ts"}),e.jsx("br",{}),e.jsx("strong",{children:"스타일"}),": kebab-case — ",e.jsx("code",{children:"site.css"}),", ",e.jsx("code",{children:"global.css"}),e.jsx("br",{}),e.jsx("strong",{children:"설정"}),": camelCase — ",e.jsx("code",{children:"site.ts"}),", ",e.jsx("code",{children:"supabase.ts"})]}),e.jsx("h4",{children:"1-3. .claude/ 디렉토리 역할 (공식 문서)"}),e.jsxs("svg",{viewBox:"0 0 700 200",style:{width:"100%",maxWidth:700,margin:"16px auto",display:"block"},children:[e.jsx("rect",{x:"10",y:"10",width:"680",height:"180",rx:"12",fill:"#F8FAFF",stroke:"#1B2A4A",strokeWidth:"1"}),e.jsx("text",{x:"30",y:"35",fill:"#1B2A4A",fontSize:"14",fontWeight:"bold",children:".claude/ 디렉토리"}),[{y:55,file:"settings.json",desc:"프로젝트 공유 설정 — Git 커밋 가능",color:"#1B2A4A"},{y:85,file:"settings.local.json",desc:"개인 로컬 설정 — .gitignore 추가",color:"#2E4A7A"},{y:115,file:"CLAUDE.md",desc:"프로젝트 CLAUDE.md 대체 위치",color:"#3A6FD0"},{y:145,file:"rules/*.md",desc:"주제별/경로별 규칙 파일 (조건부 로드)",color:"#4A8FE7"}].map((s,l)=>e.jsxs("g",{children:[e.jsx("rect",{x:"30",y:s.y,width:"640",height:"24",rx:"4",fill:l%2===0?"#E8F0FE":"#fff"}),e.jsx("text",{x:"44",y:s.y+17,fill:s.color,fontSize:"12",fontWeight:"bold",fontFamily:"monospace",children:s.file}),e.jsx("text",{x:"280",y:s.y+17,fill:"#555",fontSize:"11",children:s.desc})]},l))]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"핵심"}),": CLAUDE.md에 디렉토리 구조를 명시하면, Claude Code가 새 파일을 올바른 위치에 생성합니다.",e.jsx("code",{children:".claude/"}),"와 ",e.jsx("code",{children:"CLAUDE.local.md"}),"는 ",e.jsx("code",{children:".gitignore"}),"에 추가하세요."]})]})]}),e.jsxs("div",{id:"git-pr",className:"lecture-section",children:[e.jsx("h3",{children:"2. Git 연동 & PR 관리"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"2-1. /commit 명령어 (공식 프로토콜)"}),e.jsxs("p",{children:[e.jsx("code",{children:"/commit"}),"은 Claude Code의 핵심 기능입니다. 변경된 파일을 분석하고, 커밋 메시지를 생성하며, git commit을 실행합니다."]}),e.jsxs("svg",{viewBox:"0 0 700 120",style:{width:"100%",maxWidth:700,margin:"16px auto",display:"block"},children:[[{x:10,label:"git status",sub:"변경 파일 확인",color:"#E8F0FE"},{x:150,label:"git diff",sub:"변경 내용 분석",color:"#D4E4FC"},{x:290,label:"git add",sub:"파일별 스테이징",color:"#B8D4FA"},{x:430,label:"git commit",sub:"메시지 자동 생성",color:"#9CC4F8"},{x:570,label:"git status",sub:"성공 확인",color:"#1B2A4A"}].map((s,l)=>e.jsxs("g",{children:[e.jsx("rect",{x:s.x,y:"15",width:"120",height:"60",rx:"10",fill:s.color,stroke:"#1B2A4A",strokeWidth:l===4?2:1}),e.jsx("text",{x:s.x+60,y:"38",textAnchor:"middle",fill:l===4?"#fff":"#1B2A4A",fontSize:"11",fontWeight:"bold",children:s.label}),e.jsx("text",{x:s.x+60,y:"56",textAnchor:"middle",fill:l===4?"#93B5E0":"#5A7AAA",fontSize:"9",children:s.sub}),l<4&&e.jsx("polygon",{points:`${s.x+127},45 ${s.x+143},40 ${s.x+143},50`,fill:"#4A8FE7"})]},l)),e.jsx("text",{x:"350",y:"105",textAnchor:"middle",fill:"#888",fontSize:"11",children:"/commit 실행 시 Claude Code의 내부 프로세스"})]}),e.jsx("h4",{children:"2-2. Git 안전 프로토콜 (공식 규칙)"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"Claude Code의 Git 안전 규칙"}),":",e.jsx("br",{}),"- ",e.jsx("code",{children:"push --force"}),", ",e.jsx("code",{children:"reset --hard"})," 등 파괴적 명령은 사용자 명시적 요청 시만 실행",e.jsx("br",{}),"- 항상 ",e.jsx("strong",{children:"새 커밋 생성"})," (기존 커밋 amend 하지 않음)",e.jsx("br",{}),"- ",e.jsx("code",{children:"git add"})," 시 ",e.jsx("strong",{children:"파일명 명시"})," (",e.jsx("code",{children:"git add ."})," 사용하지 않음)",e.jsx("br",{}),"- .env, 인증 정보 등 ",e.jsx("strong",{children:"민감 파일 커밋 차단"}),e.jsx("br",{}),"- main/master 브랜치에 ",e.jsx("strong",{children:"force push 경고"}),e.jsx("br",{}),"- Git config는 절대 수정하지 않음",e.jsx("br",{}),"- ",e.jsx("code",{children:"-i"})," (interactive) 플래그 사용하지 않음"]}),e.jsx("h4",{children:"2-3. PR 생성 및 관리"}),e.jsx("div",{className:"prompt-example",children:`# PR 생성 (gh CLI 사용)
> "현재 브랜치로 PR을 만들어줘"

# PR 리뷰
> /review-pr

# PR 코멘트 확인 및 대응
> /pr-comments

# 특정 PR 세션 재개
> claude --from-pr 123

# PR 상태 표시 (footer에 자동 표시)
# 초록: 승인 / 노랑: 대기 / 빨강: 변경 요청`}),e.jsx("h4",{children:"2-4. Git Worktree — 격리된 작업 환경"}),e.jsx("div",{className:"prompt-example",children:`# 격리된 worktree에서 작업
claude -w feature-auth

# 기존 PR을 worktree로 가져오기
claude -w #123

# tmux와 결합 (병렬 작업)
claude -w feature-auth --tmux`}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"Best Practice"}),": 새 기능은 별도 브랜치에서 작업하고, Claude에게 브랜치 생성 → 구현 → /commit → PR 생성까지 전체 흐름을 맡길 수 있습니다.",e.jsx("code",{children:"-w"})," 플래그로 worktree를 사용하면 기존 코드에 영향 없이 작업 가능합니다."]})]})]}),e.jsxs("div",{id:"hooks",className:"lecture-section",children:[e.jsx("h3",{children:"3. Hooks & 자동화"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"3-1. Claude Code Hooks란? (공식 문서)"}),e.jsxs("p",{children:["Hooks는 Claude Code의 특정 이벤트에 자동으로 실행되는",e.jsx("strong",{children:"셸 명령, HTTP 요청, MCP 도구, 프롬프트, 에이전트"}),"입니다."]}),e.jsxs("svg",{viewBox:"0 0 700 110",style:{width:"100%",maxWidth:700,margin:"16px auto",display:"block"},children:[[{x:10,label:"Command",desc:"셸 명령 실행",color:"#1B2A4A"},{x:150,label:"HTTP",desc:"POST 요청",color:"#2E4A7A"},{x:290,label:"MCP Tool",desc:"MCP 서버 도구",color:"#3A6FD0"},{x:430,label:"Prompt",desc:"Claude 판단",color:"#4A8FE7"},{x:570,label:"Agent",desc:"하위 에이전트",color:"#5BA0F0"}].map((s,l)=>e.jsxs("g",{children:[e.jsx("rect",{x:s.x,y:"10",width:"120",height:"60",rx:"10",fill:s.color}),e.jsx("text",{x:s.x+60,y:"32",textAnchor:"middle",fill:"#fff",fontSize:"12",fontWeight:"bold",children:s.label}),e.jsx("text",{x:s.x+60,y:"52",textAnchor:"middle",fill:"#C5D8F0",fontSize:"10",children:s.desc})]},l)),e.jsx("text",{x:"350",y:"95",textAnchor:"middle",fill:"#888",fontSize:"11",children:"5가지 Hook 타입 — 상황에 맞게 선택"})]}),e.jsx("h4",{children:"3-2. 주요 Hook 이벤트"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"세션"}),": SessionStart, SessionEnd, Setup",e.jsx("br",{}),e.jsx("strong",{children:"턴"}),": UserPromptSubmit, Stop, StopFailure",e.jsx("br",{}),e.jsx("strong",{children:"도구"}),": PreToolUse, PostToolUse, PostToolBatch, PermissionRequest",e.jsx("br",{}),e.jsx("strong",{children:"컨텍스트"}),": PreCompact, PostCompact, InstructionsLoaded",e.jsx("br",{}),e.jsx("strong",{children:"서브에이전트"}),": SubagentStart, SubagentStop",e.jsx("br",{}),e.jsx("strong",{children:"기타"}),": Notification, ConfigChange, FileChanged, CwdChanged"]}),e.jsx("h4",{children:"3-3. Hook 설정 예시 (공식 형식)"}),e.jsx("div",{className:"prompt-example",children:`// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_FILE_PATH",
            "timeout": 30
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "echo 'rm 명령이 감지되었습니다'",
            "timeout": 10
          }
        ]
      }
    ]
  }
}`}),e.jsx("h4",{children:"3-4. Exit Code 동작"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"exit 0"})," — 성공, stdout의 JSON 처리",e.jsx("br",{}),e.jsx("strong",{children:"exit 2"})," — 차단(blocking), stderr 표시, 액션 차단",e.jsx("br",{}),e.jsx("strong",{children:"기타"})," — 비차단 에러, stderr 첫 줄 트랜스크립트에 표시"]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"주의"}),": Hooks는 강력하지만, 너무 많이 설정하면 작업 속도가 느려집니다.",e.jsx("code",{children:"/hooks"})," 명령어로 현재 설정된 Hook 목록을 열람할 수 있습니다.",e.jsx("code",{children:"disableAllHooks: true"}),"로 일괄 비활성화도 가능합니다."]})]})]}),e.jsxs("div",{id:"mcp",className:"lecture-section",children:[e.jsx("h3",{children:"4. MCP & 확장 기능"}),e.jsxs("div",{className:"lecture-content",children:[e.jsx("h4",{children:"4-1. MCP(Model Context Protocol)란?"}),e.jsxs("p",{children:["MCP는 Claude Code에 ",e.jsx("strong",{children:"외부 도구와 데이터를 연결"}),"하는 프로토콜입니다. GitHub, Slack, 데이터베이스, Google Calendar, Notion 등 외부 서비스를 Claude Code에서 직접 사용할 수 있습니다."]}),e.jsxs("svg",{viewBox:"0 0 700 200",style:{width:"100%",maxWidth:700,margin:"16px auto",display:"block"},children:[e.jsx("rect",{x:"250",y:"70",width:"200",height:"60",rx:"14",fill:"#1B2A4A"}),e.jsx("text",{x:"350",y:"95",textAnchor:"middle",fill:"#fff",fontSize:"14",fontWeight:"bold",children:"Claude Code"}),e.jsx("text",{x:"350",y:"115",textAnchor:"middle",fill:"#93B5E0",fontSize:"10",children:"MCP Client"}),[{x:20,y:10,label:"GitHub"},{x:150,y:10,label:"Slack"},{x:500,y:10,label:"PostgreSQL"},{x:620,y:10,label:"Notion"},{x:20,y:150,label:"Calendar"},{x:150,y:150,label:"Filesystem"},{x:500,y:150,label:"Chrome"},{x:620,y:150,label:"Custom"}].map((s,l)=>e.jsxs("g",{children:[e.jsx("rect",{x:s.x,y:s.y,width:"100",height:"36",rx:"8",fill:"#F0F4FF",stroke:"#4A8FE7",strokeWidth:"1"}),e.jsx("text",{x:s.x+50,y:s.y+22,textAnchor:"middle",fill:"#1B2A4A",fontSize:"11",fontWeight:"600",children:s.label}),e.jsx("line",{x1:s.x+50,y1:s.y<100?s.y+36:s.y,x2:"350",y2:s.y<100?70:130,stroke:"#4A8FE7",strokeWidth:"1",strokeDasharray:"4,3",opacity:"0.5"})]},l))]}),e.jsx("h4",{children:"4-2. MCP 서버 설정"}),e.jsx("div",{className:"prompt-example",children:`# CLI로 MCP 서버 추가
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# .claude/settings.json에 직접 설정
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}

# 외부 MCP 설정 파일 로드
claude --mcp-config ./mcp.json`}),e.jsx("h4",{children:"4-3. Headless / SDK 모드"}),e.jsx("div",{className:"prompt-example",children:`# Headless 모드 — CI/CD, 스크립트 자동화
claude -p "README를 업데이트해줘" \\
  --allowedTools "Read,Write,Edit" \\
  --output-format json \\
  --max-turns 5 \\
  --max-budget-usd 1.00

# 빠른 시작 (--bare)
claude --bare -p "package.json 버전 확인"

# SDK 프로그래밍 활용
import { claude } from '@anthropic-ai/claude-code';

const result = await claude({
  prompt: '이 프로젝트를 분석해줘',
  cwd: '/path/to/project',
  allowedTools: ['Read', 'Glob', 'Grep'],
});`}),e.jsx("h4",{children:"4-4. 고급 기능 요약"}),e.jsxs("div",{className:"example-box",children:[e.jsx("strong",{children:"Background Agents"})," — ",e.jsx("code",{children:'claude --bg "task"'}),"로 백그라운드 에이전트 실행",e.jsx("br",{}),e.jsx("strong",{children:"Agent Teams"})," — 여러 에이전트를 팀으로 구성하여 병렬 작업",e.jsx("br",{}),e.jsx("strong",{children:"Worktrees"})," — ",e.jsx("code",{children:"claude -w name"}),"으로 격리된 Git worktree에서 작업",e.jsx("br",{}),e.jsx("strong",{children:"Scheduling"})," — 정기 작업 스케줄링 (PR 리뷰, CI 분석 등)",e.jsx("br",{}),e.jsx("strong",{children:"Chrome Integration"})," — ",e.jsx("code",{children:"claude --chrome"}),"으로 브라우저 자동화",e.jsx("br",{}),e.jsx("strong",{children:"Remote Control"})," — 모바일/다른 장치에서 세션 제어",e.jsx("br",{}),e.jsx("strong",{children:"Teleport"})," — 웹 세션을 로컬 터미널로 가져오기",e.jsx("br",{}),e.jsx("strong",{children:"Plugins"})," — 커뮤니티 플러그인 설치 및 커스텀 확장"]}),e.jsxs("div",{className:"tip-box",children:[e.jsx("strong",{children:"다음 단계"}),": Claude Code의 기본기를 익혔다면, 실제 프로젝트에서 CLAUDE.md를 작성하고 MCP 서버를 연결해보세요.",e.jsx("code",{children:"claude doctor"}),"로 설정 상태를 진단하고,",e.jsx("code",{children:"/init"}),"으로 프로젝트에 맞는 CLAUDE.md를 자동 생성해보세요."]})]})]})]})})]})})]})};export{j as default};
