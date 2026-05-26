import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'project-structure', label: '프로젝트 폴더 정리' },
  { id: 'git-pr', label: 'Git 연동 & PR 관리' },
  { id: 'hooks', label: 'Hooks & 자동화' },
  { id: 'mcp', label: 'MCP & 확장 기능' },
];

const ClaudeCodeAdvanced = (): ReactElement => {
  const [activeSection, setActiveSection] = useState('project-structure');

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
      <SEOHead title="프로젝트 관리 & 고급" description="프로젝트 폴더 정리, Git/PR 연동, Hooks 자동화, MCP 확장 기능 가이드" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Claude Code</div>
          <h2>프로젝트 관리 & 고급</h2>
          <p>Git 연동, Hooks, MCP 서버로 Claude Code를 최대한 활용하기</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          {/* ── 사이드바 ── */}
          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-gear" />
              목차
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
                <li>프로젝트 폴더를 체계적으로 정리합니다</li>
                <li>Git 연동과 PR 워크플로우를 익힙니다</li>
                <li>Hooks로 작업을 자동화합니다</li>
                <li>MCP 서버로 기능을 확장합니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/claude-code/intro" className="ls-course-link">
              <i className="fa-solid fa-arrow-left" />
              Claude Code 시작하기로 이동
              <span>처음으로</span>
            </Link>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* ═══ 프로젝트 폴더 정리 ═══ */}
              <div id="project-structure" className="lecture-section">
                <h3>1. 프로젝트 폴더 정리</h3>
                <div className="lecture-content">
                  <h4>1-1. Claude Code 프로젝트 권장 구조</h4>
                  <div className="prompt-example">{`my-project/
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
└── Dev_md/                # 개발 이력 문서`}</div>

                  <h4>1-2. 파일 네이밍 규칙</h4>
                  <div className="example-box">
                    <strong>컴포넌트</strong>: PascalCase — <code>UserProfile.tsx</code>, <code>NavBar.tsx</code><br />
                    <strong>유틸리티</strong>: camelCase — <code>formatDate.ts</code>, <code>apiClient.ts</code><br />
                    <strong>스타일</strong>: kebab-case — <code>site.css</code>, <code>global.css</code><br />
                    <strong>설정</strong>: camelCase — <code>site.ts</code>, <code>supabase.ts</code>
                  </div>

                  <h4>1-3. .claude/ 디렉토리 역할 (공식 문서)</h4>

                  {/* ── SVG: .claude 디렉토리 구조 ── */}
                  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    <rect x="10" y="10" width="680" height="180" rx="12" fill="#F8FAFF" stroke="#1B2A4A" strokeWidth="1" />
                    <text x="30" y="35" fill="#1B2A4A" fontSize="14" fontWeight="bold">.claude/ 디렉토리</text>
                    {[
                      { y: 55, file: 'settings.json', desc: '프로젝트 공유 설정 — Git 커밋 가능', color: '#1B2A4A' },
                      { y: 85, file: 'settings.local.json', desc: '개인 로컬 설정 — .gitignore 추가', color: '#2E4A7A' },
                      { y: 115, file: 'CLAUDE.md', desc: '프로젝트 CLAUDE.md 대체 위치', color: '#3A6FD0' },
                      { y: 145, file: 'rules/*.md', desc: '주제별/경로별 규칙 파일 (조건부 로드)', color: '#4A8FE7' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x="30" y={item.y} width="640" height="24" rx="4" fill={i % 2 === 0 ? '#E8F0FE' : '#fff'} />
                        <text x="44" y={item.y + 17} fill={item.color} fontSize="12" fontWeight="bold" fontFamily="monospace">{item.file}</text>
                        <text x="280" y={item.y + 17} fill="#555" fontSize="11">{item.desc}</text>
                      </g>
                    ))}
                  </svg>

                  <div className="tip-box">
                    <strong>핵심</strong>: CLAUDE.md에 디렉토리 구조를 명시하면,
                    Claude Code가 새 파일을 올바른 위치에 생성합니다.
                    <code>.claude/</code>와 <code>CLAUDE.local.md</code>는 <code>.gitignore</code>에 추가하세요.
                  </div>
                </div>
              </div>

              {/* ═══ Git 연동 & PR 관리 ═══ */}
              <div id="git-pr" className="lecture-section">
                <h3>2. Git 연동 & PR 관리</h3>
                <div className="lecture-content">
                  <h4>2-1. /commit 명령어 (공식 프로토콜)</h4>
                  <p>
                    <code>/commit</code>은 Claude Code의 핵심 기능입니다.
                    변경된 파일을 분석하고, 커밋 메시지를 생성하며, git commit을 실행합니다.
                  </p>

                  {/* ── SVG: Git 워크플로우 ── */}
                  <svg viewBox="0 0 700 120" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {[
                      { x: 10, label: 'git status', sub: '변경 파일 확인', color: '#E8F0FE' },
                      { x: 150, label: 'git diff', sub: '변경 내용 분석', color: '#D4E4FC' },
                      { x: 290, label: 'git add', sub: '파일별 스테이징', color: '#B8D4FA' },
                      { x: 430, label: 'git commit', sub: '메시지 자동 생성', color: '#9CC4F8' },
                      { x: 570, label: 'git status', sub: '성공 확인', color: '#1B2A4A' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y="15" width="120" height="60" rx="10" fill={item.color} stroke="#1B2A4A" strokeWidth={i === 4 ? 2 : 1} />
                        <text x={item.x + 60} y="38" textAnchor="middle" fill={i === 4 ? '#fff' : '#1B2A4A'} fontSize="11" fontWeight="bold">{item.label}</text>
                        <text x={item.x + 60} y="56" textAnchor="middle" fill={i === 4 ? '#93B5E0' : '#5A7AAA'} fontSize="9">{item.sub}</text>
                        {i < 4 && <polygon points={`${item.x + 127},45 ${item.x + 143},40 ${item.x + 143},50`} fill="#4A8FE7" />}
                      </g>
                    ))}
                    <text x="350" y="105" textAnchor="middle" fill="#888" fontSize="11">/commit 실행 시 Claude Code의 내부 프로세스</text>
                  </svg>

                  <h4>2-2. Git 안전 프로토콜 (공식 규칙)</h4>
                  <div className="example-box">
                    <strong>Claude Code의 Git 안전 규칙</strong>:<br />
                    - <code>push --force</code>, <code>reset --hard</code> 등 파괴적 명령은 사용자 명시적 요청 시만 실행<br />
                    - 항상 <strong>새 커밋 생성</strong> (기존 커밋 amend 하지 않음)<br />
                    - <code>git add</code> 시 <strong>파일명 명시</strong> (<code>git add .</code> 사용하지 않음)<br />
                    - .env, 인증 정보 등 <strong>민감 파일 커밋 차단</strong><br />
                    - main/master 브랜치에 <strong>force push 경고</strong><br />
                    - Git config는 절대 수정하지 않음<br />
                    - <code>-i</code> (interactive) 플래그 사용하지 않음
                  </div>

                  <h4>2-3. PR 생성 및 관리</h4>
                  <div className="prompt-example">{`# PR 생성 (gh CLI 사용)
> "현재 브랜치로 PR을 만들어줘"

# PR 리뷰
> /review-pr

# PR 코멘트 확인 및 대응
> /pr-comments

# 특정 PR 세션 재개
> claude --from-pr 123

# PR 상태 표시 (footer에 자동 표시)
# 초록: 승인 / 노랑: 대기 / 빨강: 변경 요청`}</div>

                  <h4>2-4. Git Worktree — 격리된 작업 환경</h4>
                  <div className="prompt-example">{`# 격리된 worktree에서 작업
claude -w feature-auth

# 기존 PR을 worktree로 가져오기
claude -w #123

# tmux와 결합 (병렬 작업)
claude -w feature-auth --tmux`}</div>

                  <div className="tip-box">
                    <strong>Best Practice</strong>: 새 기능은 별도 브랜치에서 작업하고,
                    Claude에게 브랜치 생성 → 구현 → /commit → PR 생성까지 전체 흐름을 맡길 수 있습니다.
                    <code>-w</code> 플래그로 worktree를 사용하면 기존 코드에 영향 없이 작업 가능합니다.
                  </div>
                </div>
              </div>

              {/* ═══ Hooks & 자동화 ═══ */}
              <div id="hooks" className="lecture-section">
                <h3>3. Hooks & 자동화</h3>
                <div className="lecture-content">
                  <h4>3-1. Claude Code Hooks란? (공식 문서)</h4>
                  <p>
                    Hooks는 Claude Code의 특정 이벤트에 자동으로 실행되는
                    <strong>셸 명령, HTTP 요청, MCP 도구, 프롬프트, 에이전트</strong>입니다.
                  </p>

                  {/* ── SVG: Hook 타입 ── */}
                  <svg viewBox="0 0 700 110" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {[
                      { x: 10, label: 'Command', desc: '셸 명령 실행', color: '#1B2A4A' },
                      { x: 150, label: 'HTTP', desc: 'POST 요청', color: '#2E4A7A' },
                      { x: 290, label: 'MCP Tool', desc: 'MCP 서버 도구', color: '#3A6FD0' },
                      { x: 430, label: 'Prompt', desc: 'Claude 판단', color: '#4A8FE7' },
                      { x: 570, label: 'Agent', desc: '하위 에이전트', color: '#5BA0F0' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y="10" width="120" height="60" rx="10" fill={item.color} />
                        <text x={item.x + 60} y="32" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{item.label}</text>
                        <text x={item.x + 60} y="52" textAnchor="middle" fill="#C5D8F0" fontSize="10">{item.desc}</text>
                      </g>
                    ))}
                    <text x="350" y="95" textAnchor="middle" fill="#888" fontSize="11">5가지 Hook 타입 — 상황에 맞게 선택</text>
                  </svg>

                  <h4>3-2. 주요 Hook 이벤트</h4>
                  <div className="example-box">
                    <strong>세션</strong>: SessionStart, SessionEnd, Setup<br />
                    <strong>턴</strong>: UserPromptSubmit, Stop, StopFailure<br />
                    <strong>도구</strong>: PreToolUse, PostToolUse, PostToolBatch, PermissionRequest<br />
                    <strong>컨텍스트</strong>: PreCompact, PostCompact, InstructionsLoaded<br />
                    <strong>서브에이전트</strong>: SubagentStart, SubagentStop<br />
                    <strong>기타</strong>: Notification, ConfigChange, FileChanged, CwdChanged
                  </div>

                  <h4>3-3. Hook 설정 예시 (공식 형식)</h4>
                  <div className="prompt-example">{`// .claude/settings.json
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
}`}</div>

                  <h4>3-4. Exit Code 동작</h4>
                  <div className="example-box">
                    <strong>exit 0</strong> — 성공, stdout의 JSON 처리<br />
                    <strong>exit 2</strong> — 차단(blocking), stderr 표시, 액션 차단<br />
                    <strong>기타</strong> — 비차단 에러, stderr 첫 줄 트랜스크립트에 표시
                  </div>

                  <div className="tip-box">
                    <strong>주의</strong>: Hooks는 강력하지만, 너무 많이 설정하면 작업 속도가 느려집니다.
                    <code>/hooks</code> 명령어로 현재 설정된 Hook 목록을 열람할 수 있습니다.
                    <code>disableAllHooks: true</code>로 일괄 비활성화도 가능합니다.
                  </div>
                </div>
              </div>

              {/* ═══ MCP & 확장 기능 ═══ */}
              <div id="mcp" className="lecture-section">
                <h3>4. MCP & 확장 기능</h3>
                <div className="lecture-content">
                  <h4>4-1. MCP(Model Context Protocol)란?</h4>
                  <p>
                    MCP는 Claude Code에 <strong>외부 도구와 데이터를 연결</strong>하는 프로토콜입니다.
                    GitHub, Slack, 데이터베이스, Google Calendar, Notion 등 외부 서비스를
                    Claude Code에서 직접 사용할 수 있습니다.
                  </p>

                  {/* ── SVG: MCP 아키텍처 ── */}
                  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {/* Claude Code 중앙 */}
                    <rect x="250" y="70" width="200" height="60" rx="14" fill="#1B2A4A" />
                    <text x="350" y="95" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Claude Code</text>
                    <text x="350" y="115" textAnchor="middle" fill="#93B5E0" fontSize="10">MCP Client</text>
                    {/* MCP 서버들 */}
                    {[
                      { x: 20, y: 10, label: 'GitHub' },
                      { x: 150, y: 10, label: 'Slack' },
                      { x: 500, y: 10, label: 'PostgreSQL' },
                      { x: 620, y: 10, label: 'Notion' },
                      { x: 20, y: 150, label: 'Calendar' },
                      { x: 150, y: 150, label: 'Filesystem' },
                      { x: 500, y: 150, label: 'Chrome' },
                      { x: 620, y: 150, label: 'Custom' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y={item.y} width="100" height="36" rx="8" fill="#F0F4FF" stroke="#4A8FE7" strokeWidth="1" />
                        <text x={item.x + 50} y={item.y + 22} textAnchor="middle" fill="#1B2A4A" fontSize="11" fontWeight="600">{item.label}</text>
                        <line
                          x1={item.x + 50} y1={item.y < 100 ? item.y + 36 : item.y}
                          x2="350" y2={item.y < 100 ? 70 : 130}
                          stroke="#4A8FE7" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"
                        />
                      </g>
                    ))}
                  </svg>

                  <h4>4-2. MCP 서버 설정</h4>
                  <div className="prompt-example">{`# CLI로 MCP 서버 추가
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
claude --mcp-config ./mcp.json`}</div>

                  <h4>4-3. Headless / SDK 모드</h4>
                  <div className="prompt-example">{`# Headless 모드 — CI/CD, 스크립트 자동화
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
});`}</div>

                  <h4>4-4. 고급 기능 요약</h4>
                  <div className="example-box">
                    <strong>Background Agents</strong> — <code>claude --bg &quot;task&quot;</code>로 백그라운드 에이전트 실행<br />
                    <strong>Agent Teams</strong> — 여러 에이전트를 팀으로 구성하여 병렬 작업<br />
                    <strong>Worktrees</strong> — <code>claude -w name</code>으로 격리된 Git worktree에서 작업<br />
                    <strong>Scheduling</strong> — 정기 작업 스케줄링 (PR 리뷰, CI 분석 등)<br />
                    <strong>Chrome Integration</strong> — <code>claude --chrome</code>으로 브라우저 자동화<br />
                    <strong>Remote Control</strong> — 모바일/다른 장치에서 세션 제어<br />
                    <strong>Teleport</strong> — 웹 세션을 로컬 터미널로 가져오기<br />
                    <strong>Plugins</strong> — 커뮤니티 플러그인 설치 및 커스텀 확장
                  </div>

                  <div className="tip-box">
                    <strong>다음 단계</strong>: Claude Code의 기본기를 익혔다면,
                    실제 프로젝트에서 CLAUDE.md를 작성하고 MCP 서버를 연결해보세요.
                    <code>claude doctor</code>로 설정 상태를 진단하고,
                    <code>/init</code>으로 프로젝트에 맞는 CLAUDE.md를 자동 생성해보세요.
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

export default ClaudeCodeAdvanced;
