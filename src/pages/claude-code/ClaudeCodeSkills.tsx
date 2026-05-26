import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'slash-commands', label: '슬래시 명령어 레퍼런스' },
  { id: 'tools', label: '도구(Tools) 시스템' },
  { id: 'context', label: '컨텍스트 관리' },
  { id: 'advanced-prompts', label: '고급 프롬프트 기법' },
];

const ClaudeCodeSkills = (): ReactElement => {
  const [activeSection, setActiveSection] = useState('slash-commands');

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
      <SEOHead title="스킬 & 명령어" description="Claude Code 슬래시 명령어, 도구 시스템, 컨텍스트 관리, 고급 프롬프트 기법 레퍼런스" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Claude Code</div>
          <h2>스킬 & 명령어</h2>
          <p>슬래시 명령어, 도구 시스템, 컨텍스트 관리의 모든 것</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          {/* ── 사이드바 ── */}
          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-wand-magic-sparkles" />
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
                <li>CLI 명령어와 슬래시 명령어를 숙지합니다</li>
                <li>Claude Code의 내장 도구를 이해합니다</li>
                <li>200K 토큰 컨텍스트를 효과적으로 관리합니다</li>
                <li>고급 프롬프트 기법을 활용합니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/claude-code/advanced" className="ls-course-link">
              <i className="fa-solid fa-arrow-right" />
              프로젝트 관리 & 고급으로 이동
              <span>Next</span>
            </Link>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* ═══ 슬래시 명령어 레퍼런스 ═══ */}
              <div id="slash-commands" className="lecture-section">
                <h3>1. 슬래시 명령어 레퍼런스</h3>
                <div className="lecture-content">
                  <h4>1-1. CLI 명령어 (터미널에서 실행)</h4>
                  <div className="example-box">
                    <strong>claude</strong> — 대화형 세션 시작<br />
                    <strong>claude &quot;query&quot;</strong> — 초기 프롬프트와 함께 시작<br />
                    <strong>claude -p &quot;query&quot;</strong> — Print 모드 (결과 출력 후 종료)<br />
                    <strong>claude -c</strong> — 최근 대화 이어가기<br />
                    <strong>claude -r &lt;name&gt; &quot;query&quot;</strong> — 특정 세션 재개<br />
                    <strong>claude update</strong> — 최신 버전 업데이트<br />
                    <strong>claude auth login</strong> — 로그인 (--console: API 과금)<br />
                    <strong>claude auth status</strong> — 인증 상태 확인<br />
                    <strong>claude doctor</strong> — 설치/설정 진단<br />
                    <strong>claude agents</strong> — 백그라운드 세션 모니터링<br />
                    <strong>claude mcp</strong> — MCP 서버 설정<br />
                    <strong>claude --bg &quot;task&quot;</strong> — 백그라운드 에이전트 실행
                  </div>

                  <h4>1-2. 주요 CLI 플래그</h4>
                  <div className="example-box">
                    <strong>--model</strong> — 모델 지정 (sonnet, opus, 또는 전체 모델명)<br />
                    <strong>--permission-mode</strong> — 권한 모드 (default, acceptEdits, plan, auto)<br />
                    <strong>--allowedTools</strong> — 특정 도구만 허용 (예: &quot;Read,Grep&quot;)<br />
                    <strong>--max-turns</strong> — 최대 턴 수 제한 (Print 모드)<br />
                    <strong>--max-budget-usd</strong> — 비용 상한 설정<br />
                    <strong>--output-format</strong> — 출력 형식 (text, json, stream-json)<br />
                    <strong>--append-system-prompt</strong> — 시스템 프롬프트에 지시 추가<br />
                    <strong>--add-dir</strong> — 추가 작업 디렉토리 지정<br />
                    <strong>--worktree, -w</strong> — 격리된 Git worktree에서 실행<br />
                    <strong>--bare</strong> — 최소 모드 (빠른 시작, 스크립팅용)
                  </div>

                  <h4>1-3. 세션 내 슬래시 명령어 전체 목록</h4>

                  {/* ── SVG: 명령어 카테고리 ── */}
                  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {[
                      { x: 10, y: 10, label: '세션 관리', items: '/help  /clear\n/compact  /cost\n/status', color: '#1B2A4A' },
                      { x: 185, y: 10, label: 'Git 연동', items: '/commit\n/review-pr\n/pr-comments', color: '#2E4A7A' },
                      { x: 360, y: 10, label: '모드 & 설정', items: '/model  /plan\n/config\n/memory  /init', color: '#3A6FD0' },
                      { x: 535, y: 10, label: '고급 기능', items: '/btw  /hooks\n/resume  /rename\n/loop  /schedule', color: '#4A8FE7' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y={item.y} width="160" height="120" rx="10" fill={item.color} />
                        <text x={item.x + 80} y={item.y + 22} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{item.label}</text>
                        <line x1={item.x + 15} y1={item.y + 32} x2={item.x + 145} y2={item.y + 32} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {item.items.split('\n').map((line, j) => (
                          <text key={j} x={item.x + 80} y={item.y + 52 + j * 22} textAnchor="middle" fill="#C5D8F0" fontSize="11" fontFamily="monospace">{line}</text>
                        ))}
                      </g>
                    ))}
                    <text x="350" y="155" textAnchor="middle" fill="#888" fontSize="11">/ 입력 후 문자를 타이핑하면 필터링됩니다</text>
                  </svg>

                  <div className="tip-box">
                    <strong>팁</strong>: <code>/compact</code>는 대화가 길어져 응답 품질이 떨어질 때 유용합니다.
                    <code>/compact 코드 변경사항 위주로 요약해줘</code>처럼 지시를 추가할 수 있습니다.
                  </div>
                </div>
              </div>

              {/* ═══ 도구(Tools) 시스템 ═══ */}
              <div id="tools" className="lecture-section">
                <h3>2. 도구(Tools) 시스템</h3>
                <div className="lecture-content">
                  <h4>2-1. 파일 관련 도구</h4>
                  <div className="example-box">
                    <strong>Read</strong> — 파일 내용 읽기 (줄번호 표시, 범위/페이지 지정, 이미지/PDF 지원)<br />
                    <strong>Write</strong> — 새 파일 작성 (기존 파일 덮어쓰기)<br />
                    <strong>Edit</strong> — 파일의 특정 부분만 수정 (정확한 문자열 매칭 기반)<br />
                    <strong>Glob</strong> — 파일 패턴 검색 (예: **/*.tsx, src/**/*.ts)<br />
                    <strong>Grep</strong> — 파일 내용 검색 (정규식, 파일타입 필터, 멀티라인 지원)
                  </div>

                  <h4>2-2. 실행 & 검색 도구</h4>
                  <div className="example-box">
                    <strong>Bash</strong> — 터미널 명령 실행 (git, npm, 빌드, 테스트 등)<br />
                    <strong>Task</strong> — 하위 에이전트 생성 (Explore, Plan, Bash 등 전문 에이전트)<br />
                    <strong>WebFetch</strong> — URL에서 콘텐츠 가져와 분석<br />
                    <strong>WebSearch</strong> — 웹 검색 수행
                  </div>

                  {/* ── SVG: 도구 동작 흐름 ── */}
                  <svg viewBox="0 0 700 220" style={{ width: '100%', maxWidth: 700, margin: '20px auto', display: 'block' }}>
                    {/* 사용자 */}
                    <rect x="10" y="10" width="160" height="50" rx="10" fill="#F0F4FF" stroke="#1B2A4A" strokeWidth="1.5" />
                    <text x="90" y="40" textAnchor="middle" fill="#1B2A4A" fontSize="13" fontWeight="bold">사용자 (자연어)</text>
                    {/* 화살표 */}
                    <line x1="170" y1="35" x2="220" y2="35" stroke="#4A8FE7" strokeWidth="2" />
                    <polygon points="220,30 230,35 220,40" fill="#4A8FE7" />
                    {/* Claude Code */}
                    <rect x="230" y="10" width="200" height="50" rx="10" fill="#1B2A4A" />
                    <text x="330" y="40" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">Claude Code (도구 선택)</text>
                    {/* 도구 화살표 */}
                    {[
                      { x: 500, y: 10, label: 'Read / Grep / Glob', desc: '코드 탐색' },
                      { x: 500, y: 60, label: 'Edit / Write', desc: '코드 수정' },
                      { x: 500, y: 110, label: 'Bash', desc: '명령 실행' },
                      { x: 500, y: 160, label: 'Task (Sub-agent)', desc: '병렬 작업' },
                    ].map((item, i) => (
                      <g key={i}>
                        <line x1="430" y1="35" x2={item.x} y2={item.y + 18} stroke="#4A8FE7" strokeWidth="1.5" strokeDasharray="4,3" />
                        <rect x={item.x} y={item.y} width="190" height="38" rx="8" fill="#F0F4FF" stroke="#4A8FE7" strokeWidth="1" />
                        <text x={item.x + 10} y={item.y + 16} fill="#1B2A4A" fontSize="11" fontWeight="bold">{item.label}</text>
                        <text x={item.x + 10} y={item.y + 30} fill="#5A7AAA" fontSize="10">{item.desc}</text>
                      </g>
                    ))}
                  </svg>

                  <h4>2-3. Edit 도구의 동작 원리</h4>
                  <p>
                    Edit 도구는 <strong>정확한 문자열 매칭</strong>으로 동작합니다.
                    변경할 텍스트(old_string)가 파일에서 유일해야 하며,
                    유일하지 않으면 더 많은 주변 코드를 포함하여 고유하게 만듭니다.
                    <code>replace_all</code> 옵션으로 모든 일치 항목을 한 번에 변경할 수도 있습니다.
                  </p>

                  <h4>2-4. Task 도구 — 하위 에이전트</h4>
                  <div className="example-box">
                    <strong>Explore</strong> — 코드베이스 탐색 전문 에이전트 (빠른 검색)<br />
                    <strong>Plan</strong> — 구현 계획 설계 전문 에이전트<br />
                    <strong>Bash</strong> — 명령 실행 전문 에이전트<br />
                    <strong>general-purpose</strong> — 범용 에이전트 (멀티스텝 작업)<br /><br />
                    여러 에이전트를 <strong>병렬로</strong> 실행하여 속도를 높일 수 있습니다.
                    <code>claude --bg &quot;task&quot;</code>로 백그라운드 에이전트도 지원됩니다.
                  </div>

                  <div className="tip-box">
                    <strong>사용자가 알아야 할 것</strong>: 도구는 Claude Code가 자동으로 선택합니다.
                    사용자는 &quot;파일을 읽어줘&quot;, &quot;수정해줘&quot; 같은 자연어로 요청하면 됩니다.
                    도구의 존재를 아는 것은 Claude의 동작을 이해하고 효과적으로 소통하는 데 도움됩니다.
                  </div>
                </div>
              </div>

              {/* ═══ 컨텍스트 관리 ═══ */}
              <div id="context" className="lecture-section">
                <h3>3. 컨텍스트 관리</h3>
                <div className="lecture-content">
                  <h4>3-1. 200K 토큰 컨텍스트 윈도우</h4>
                  <p>
                    Claude Code는 약 <strong>200,000 토큰</strong>의 컨텍스트를 유지합니다.
                    대화가 길어지면 자동 컴팩션(요약)이 수행되지만, 전략적 관리가 중요합니다.
                  </p>

                  <h4>3-2. 컨텍스트 절약 전략</h4>
                  <div className="example-box">
                    <strong>/compact</strong> — 대화가 길어지면 주기적으로 요약 (프로젝트 루트 CLAUDE.md는 요약 후에도 유지)<br />
                    <strong>/clear</strong> — 완전히 새로운 작업은 초기화 후 시작<br />
                    <strong>구체적 요청</strong> — @파일명으로 정확한 파일 지정<br />
                    <strong>작은 단위 작업</strong> — 한 세션에 한 기능 집중<br />
                    <strong>/model sonnet</strong> — 간단한 작업은 가벼운 모델로 전환
                  </div>

                  <h4>3-3. @파일명 멘션</h4>
                  <div className="prompt-example">{`# 특정 파일을 맥락으로 포함
> @src/config/site.ts 이 파일의 menuItems에 새 항목 추가해줘

# 여러 파일 참조
> @src/App.tsx @src/types/index.ts 이 파일들을 참고해서
  새로운 라우트와 타입을 추가해줘

# ! 셸 모드로 결과를 맥락에 추가
! npm test
> 실패한 테스트를 수정해줘`}</div>

                  <h4>3-4. /btw — 사이드 질문</h4>
                  <p>
                    <code>/btw</code>는 대화 히스토리에 추가하지 않고 빠른 질문을 할 수 있는 기능입니다.
                    Claude가 작업 중일 때도 사용 가능하며, 현재 대화의 전체 맥락을 볼 수 있지만
                    파일 읽기/명령 실행은 불가합니다.
                  </p>
                  <div className="prompt-example">{`# 작업 중 빠른 질문 (히스토리에 추가되지 않음)
/btw 방금 그 설정 파일 이름이 뭐였지?
/btw TypeScript에서 Partial 타입 문법이 뭐야?`}</div>

                  <div className="tip-box">
                    <strong>Best Practice</strong>: 하나의 세션에서 하나의 기능에 집중하세요.
                    기능 A를 완료하고 <code>/commit</code>한 뒤, <code>/clear</code>로 초기화하고
                    기능 B를 시작하면 컨텍스트를 가장 효율적으로 사용할 수 있습니다.
                  </div>
                </div>
              </div>

              {/* ═══ 고급 프롬프트 기법 ═══ */}
              <div id="advanced-prompts" className="lecture-section">
                <h3>4. 고급 프롬프트 기법</h3>
                <div className="lecture-content">
                  <h4>4-1. Extended Thinking</h4>
                  <p>
                    <code>Alt+T</code>로 Extended Thinking을 토글하면 Claude가 더 깊이 사고합니다.
                    복잡한 아키텍처 결정, 버그 분석, 보안 검토 시 유용합니다.
                  </p>
                  <div className="prompt-example">{`# Extended Thinking 활성화 (Alt+T)
> "이 인증 시스템의 보안 취약점을 분석하고 개선 방안을 제시해줘"

# 단계적 사고 유도
> "단계별로 분석해줘:
   1. 현재 코드의 문제점
   2. 가능한 해결 방법과 장단점
   3. 추천 방법과 구현 계획"`}</div>

                  <h4>4-2. 멀티턴 전략</h4>

                  {/* ── SVG: 멀티턴 전략 ── */}
                  <svg viewBox="0 0 700 130" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {[
                      { x: 5, label: '1. 분석', desc: '프로젝트 파악', color: '#E8F0FE' },
                      { x: 145, label: '2. 계획', desc: 'Plan Mode', color: '#D4E4FC' },
                      { x: 285, label: '3. 구현', desc: '코드 생성/수정', color: '#B8D4FA' },
                      { x: 425, label: '4. 검증', desc: '빌드+테스트', color: '#9CC4F8' },
                      { x: 565, label: '5. 커밋', desc: '/commit', color: '#1B2A4A' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y="10" width="125" height="60" rx="10" fill={item.color} stroke="#1B2A4A" strokeWidth={i === 4 ? 2 : 1} />
                        <text x={item.x + 63} y="35" textAnchor="middle" fill={i === 4 ? '#fff' : '#1B2A4A'} fontSize="13" fontWeight="bold">{item.label}</text>
                        <text x={item.x + 63} y="55" textAnchor="middle" fill={i === 4 ? '#93B5E0' : '#5A7AAA'} fontSize="10">{item.desc}</text>
                        {i < 4 && <polygon points={`${item.x + 132},40 ${item.x + 145},35 ${item.x + 145},45`} fill="#4A8FE7" />}
                      </g>
                    ))}
                    <text x="350" y="95" textAnchor="middle" fill="#1B2A4A" fontSize="12" fontWeight="600">한 턴에 모든 걸 하지 말고, 단계적으로 접근하세요</text>
                    <text x="350" y="115" textAnchor="middle" fill="#888" fontSize="11">각 단계의 결과를 확인한 후 다음 단계 진행</text>
                  </svg>

                  <h4>4-3. 코드 리뷰 & PR 패턴</h4>
                  <div className="prompt-example">{`# 내장 PR 리뷰
> /review-pr

# 전체 변경사항 리뷰
> "지금까지 수정한 파일들을 리뷰해줘.
   버그, 보안 이슈, 성능 문제가 있는지 확인해줘"

# 특정 파일 보안 리뷰
> "src/utils/auth.ts를 보안 관점에서 리뷰해줘"

# PR 상태 확인 (footer에 컬러 표시)
# 초록: 승인 / 노랑: 대기 / 빨강: 변경 요청 / 보라: 머지`}</div>

                  <h4>4-4. 디버깅 패턴</h4>
                  <div className="prompt-example">{`# 에러 메시지 기반
> "다음 에러를 수정해줘:
   TypeError: Cannot read property 'map' of undefined
   at UserList.tsx:25"

# 빌드 에러 자동 수정
> "npm run build 실행하고 에러가 있으면 수정해줘"

# 파이프 기반 로그 분석
> tail -200 app.log | claude -p "이상 징후를 분석해줘"

# Esc+Esc: 변경 되돌리기
# Claude의 수정이 잘못되었으면 Esc를 두 번 눌러 이전 상태로 복원`}</div>

                  <div className="tip-box">
                    <strong>Rewind 기능</strong>: <code>Esc + Esc</code>를 누르면 코드와 대화를
                    이전 시점으로 되돌릴 수 있습니다. Claude의 수정이 잘못된 방향일 때 유용합니다.
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

export default ClaudeCodeSkills;
