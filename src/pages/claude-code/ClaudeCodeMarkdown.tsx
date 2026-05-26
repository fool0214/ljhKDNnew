import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'claude-md', label: 'CLAUDE.md 작성법' },
  { id: 'plan-mode', label: 'Plan Mode 활용' },
  { id: 'documentation', label: '프로젝트 문서화 전략' },
  { id: 'prompt-patterns', label: '효과적인 프롬프트 패턴' },
];

const ClaudeCodeMarkdown = (): ReactElement => {
  const [activeSection, setActiveSection] = useState('claude-md');

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
      <SEOHead title="마크다운 개발 전략" description="CLAUDE.md 작성법, Plan Mode 활용, 프로젝트 문서화, 효과적인 프롬프트 패턴 학습" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Claude Code</div>
          <h2>마크다운 개발 전략</h2>
          <p>CLAUDE.md와 문서화로 AI의 맥락 이해도를 극대화하는 방법</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          {/* ── 사이드바 ── */}
          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-file-lines" />
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
                <li>CLAUDE.md의 역할과 계층 구조를 이해합니다</li>
                <li>Plan Mode로 구현 전 설계를 수행합니다</li>
                <li>Auto Memory와 문서화 전략을 수립합니다</li>
                <li>효과적인 프롬프트 공식을 익힙니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/claude-code/skills" className="ls-course-link">
              <i className="fa-solid fa-arrow-right" />
              스킬 & 명령어로 이동
              <span>Next</span>
            </Link>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* ═══ CLAUDE.md 작성법 ═══ */}
              <div id="claude-md" className="lecture-section">
                <h3>1. CLAUDE.md 작성법</h3>
                <div className="lecture-content">
                  <h4>1-1. CLAUDE.md vs Auto Memory (공식 문서)</h4>
                  <p>
                    Claude Code에는 두 가지 메모리 시스템이 있습니다.
                    둘 다 매 대화 시작 시 로드되며, 서로 보완적으로 작동합니다.
                  </p>
                  <div className="example-box">
                    <strong>CLAUDE.md (사용자가 작성)</strong><br />
                    - 프로젝트 지침과 규칙을 담는 마크다운 파일<br />
                    - 코딩 표준, 워크플로우, 아키텍처 결정 기술<br />
                    - 프로젝트/사용자/조직 범위로 관리<br /><br />
                    <strong>Auto Memory (Claude가 작성)</strong><br />
                    - Claude가 작업하며 스스로 메모하는 시스템<br />
                    - 빌드 명령어, 디버깅 패턴, 코드 스타일 등 학습<br />
                    - 리포지토리별 <code>~/.claude/projects/&lt;project&gt;/memory/</code>에 저장<br />
                    - <code>/memory</code> 명령어로 열람/편집 가능
                  </div>

                  {/* ── SVG: CLAUDE.md 계층 구조 ── */}
                  <svg viewBox="0 0 700 260" style={{ width: '100%', maxWidth: 700, margin: '20px auto', display: 'block' }}>
                    <defs>
                      <linearGradient id="gScope" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1B2A4A" />
                        <stop offset="100%" stopColor="#2E5A9E" />
                      </linearGradient>
                    </defs>
                    <text x="350" y="20" textAnchor="middle" fill="#1B2A4A" fontSize="14" fontWeight="bold">CLAUDE.md 계층 구조 (공식 문서 기준)</text>
                    {[
                      { y: 35, label: 'Managed Policy', path: '/etc/claude-code/CLAUDE.md', desc: '조직 전체 — IT/DevOps 관리', w: 680, color: '#1B2A4A' },
                      { y: 85, label: 'User Instructions', path: '~/.claude/CLAUDE.md', desc: '개인 전체 프로젝트 — 나만의 설정', w: 580, color: '#2E4A7A' },
                      { y: 135, label: 'Project Instructions', path: './CLAUDE.md 또는 ./.claude/CLAUDE.md', desc: '팀 공유 — Git으로 버전 관리', w: 480, color: '#3A6FD0' },
                      { y: 185, label: 'Local Instructions', path: './CLAUDE.local.md (.gitignore)', desc: '개인 프로젝트별 — 로컬 전용', w: 380, color: '#4A8FE7' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={(700 - item.w) / 2} y={item.y} width={item.w} height="42" rx="8" fill={item.color} opacity="0.9" />
                        <text x={(700 - item.w) / 2 + 14} y={item.y + 18} fill="#fff" fontSize="12" fontWeight="bold">{item.label}</text>
                        <text x={(700 - item.w) / 2 + 14} y={item.y + 34} fill="#C5D8F0" fontSize="10">{item.path}</text>
                        <text x={(700 + item.w) / 2 - 14} y={item.y + 26} textAnchor="end" fill="#93B5E0" fontSize="10">{item.desc}</text>
                      </g>
                    ))}
                    <text x="350" y="248" textAnchor="middle" fill="#888" fontSize="11">아래로 갈수록 우선순위 높음 — 더 구체적인 설정이 상위를 덮어씀</text>
                  </svg>

                  <h4>1-2. CLAUDE.md에 추가해야 할 때 (공식 가이드)</h4>
                  <ul>
                    <li>Claude가 <strong>같은 실수를 두 번째</strong> 할 때</li>
                    <li>코드 리뷰에서 Claude가 알았어야 할 것이 지적될 때</li>
                    <li>지난 세션에서 <strong>동일한 수정/설명을 다시 입력</strong>할 때</li>
                    <li>새 팀원이 알아야 할 <strong>동일한 맥락</strong>이 필요할 때</li>
                  </ul>

                  <h4>1-3. 효과적인 CLAUDE.md 작성 원칙</h4>
                  <div className="example-box">
                    <strong>크기</strong>: CLAUDE.md 파일 당 200줄 이하 권장. 길면 컨텍스트를 차지하고 준수율 저하<br />
                    <strong>구조</strong>: 마크다운 헤더와 불릿으로 관련 지침을 그룹화<br />
                    <strong>구체성</strong>: &quot;코드를 잘 포맷하라&quot; → &quot;2칸 들여쓰기를 사용하라&quot;<br />
                    <strong>일관성</strong>: 서로 모순되는 규칙이 없도록 정기 검토
                  </div>

                  <h4>1-4. CLAUDE.md 구조 예시</h4>
                  <div className="prompt-example">{`# CLAUDE.md — 프로젝트 가이드

## 프로젝트 개요
- 프로젝트명: My Todo App
- 기술 스택: React 19 + Vite + TypeScript + Supabase

## 빌드 & 테스트
\`\`\`bash
npm run build     # tsc -b && vite build
npm run dev       # 개발 서버
npm test          # 테스트 실행
\`\`\`

## 코딩 규칙
- 함수형 컴포넌트 + TypeScript strict mode
- 2칸 들여쓰기, 세미콜론 사용
- CSS Modules 대신 일반 CSS + BEM 네이밍

## 주의사항
- .env 파일 절대 커밋 금지
- main 브랜치에 직접 push 금지`}</div>

                  <h4>1-5. 파일 임포트와 Rules</h4>
                  <div className="prompt-example">{`# CLAUDE.md에서 다른 파일 임포트 (@path 문법)
@README.md 프로젝트 개요
@package.json 사용 가능한 npm 명령어
@docs/git-instructions.md Git 워크플로우

# .claude/rules/ 디렉토리 — 파일 유형별 규칙 분리
.claude/rules/
├── code-style.md      # 코드 스타일 가이드
├── testing.md         # 테스트 컨벤션
└── security.md        # 보안 요구사항

# 특정 파일에만 적용되는 규칙 (YAML frontmatter)
---
paths:
  - "src/api/**/*.ts"
---
# API 개발 규칙
- 모든 API 엔드포인트에 입력 검증 포함
- 표준 에러 응답 포맷 사용`}</div>

                  <div className="tip-box">
                    <strong>/init</strong> 명령어로 CLAUDE.md를 자동 생성할 수 있습니다.
                    Claude가 코드베이스를 분석하여 빌드 명령어, 테스트 지침, 프로젝트 규칙을 발견해 작성합니다.
                    기존 CLAUDE.md가 있으면 덮어쓰지 않고 개선안을 제안합니다.
                  </div>
                </div>
              </div>

              {/* ═══ Plan Mode 활용 ═══ */}
              <div id="plan-mode" className="lecture-section">
                <h3>2. Plan Mode 활용</h3>
                <div className="lecture-content">
                  <h4>2-1. Plan Mode란?</h4>
                  <p>
                    Plan Mode는 코드를 바로 수정하지 않고, <strong>구현 계획을 먼저 세우는 모드</strong>입니다.
                    <code>Shift+Tab</code>으로 권한 모드를 순환하면 plan 모드로 전환됩니다.
                  </p>

                  {/* ── SVG: Plan Mode 흐름 ── */}
                  <svg viewBox="0 0 700 120" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {[
                      { x: 10, label: 'Plan 모드', sub: 'Shift+Tab', color: '#4A8FE7' },
                      { x: 185, label: '코드 탐색', sub: 'Read, Grep 도구 사용', color: '#3A6FD0' },
                      { x: 360, label: '계획 수립', sub: '파일/변경 범위 제안', color: '#2E4A7A' },
                      { x: 535, label: 'Act 전환', sub: 'Shift+Tab → 구현', color: '#1B2A4A' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y="15" width="155" height="65" rx="12" fill={item.color} />
                        <text x={item.x + 78} y="42" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">{item.label}</text>
                        <text x={item.x + 78} y="60" textAnchor="middle" fill="#C5D8F0" fontSize="10">{item.sub}</text>
                        {i < 3 && (
                          <polygon points={`${item.x + 170},47 ${item.x + 185},42 ${item.x + 185},52`} fill="#93B5E0" />
                        )}
                      </g>
                    ))}
                    <text x="350" y="105" textAnchor="middle" fill="#888" fontSize="11">Plan Mode에서는 코드 수정/생성 없이 계획만 수립</text>
                  </svg>

                  <h4>2-2. Plan Mode 사용 방법</h4>
                  <div className="prompt-example">{`# 방법 1: Shift+Tab으로 모드 전환
# default → acceptEdits → plan → auto → ...

# 방법 2: CLI 플래그
claude --permission-mode plan

# 방법 3: 프롬프트에 명시
> "코드를 수정하기 전에 먼저 구현 계획을 세워줘"

# Plan 결과 확인 후 구현 지시
> "이 계획대로 구현해줘" (Shift+Tab으로 default/acceptEdits로 전환)`}</div>

                  <h4>2-3. 언제 Plan Mode를 사용할까?</h4>
                  <ul>
                    <li><strong>3개 이상 파일 수정</strong>이 필요한 작업</li>
                    <li><strong>아키텍처 결정</strong>이 필요할 때 (REST vs GraphQL 등)</li>
                    <li><strong>리팩토링</strong> — 기존 코드 구조를 변경할 때</li>
                    <li><strong>복잡한 버그</strong> — 원인 분석이 필요할 때</li>
                    <li><strong>팀 소통</strong> — 계획을 팀원과 공유하여 합의할 때</li>
                  </ul>

                  <div className="tip-box">
                    <strong>Best Practice</strong>: Plan Mode에서 Claude는 파일을 읽고 검색할 수 있지만
                    수정하지 않습니다. 계획을 확인한 뒤 <code>Shift+Tab</code>으로 default/acceptEdits로
                    전환하고 &quot;이 계획대로 구현해줘&quot;라고 지시하면 됩니다.
                  </div>
                </div>
              </div>

              {/* ═══ 프로젝트 문서화 전략 ═══ */}
              <div id="documentation" className="lecture-section">
                <h3>3. 프로젝트 문서화 전략</h3>
                <div className="lecture-content">
                  <h4>3-1. Auto Memory 활용</h4>
                  <p>
                    Auto Memory는 Claude가 세션 중 스스로 메모하는 기능입니다.
                    빌드 명령어, 디버깅 패턴, 아키텍처 결정, 코드 스타일 등을 자동 기록합니다.
                  </p>
                  <div className="example-box">
                    <strong>저장 위치</strong>: <code>~/.claude/projects/&lt;project&gt;/memory/</code><br />
                    <strong>구조</strong>: MEMORY.md (인덱스) + 주제별 파일 (debugging.md, api-conventions.md 등)<br />
                    <strong>로드</strong>: MEMORY.md의 처음 200줄 또는 25KB를 매 세션 시작 시 로드<br />
                    <strong>관리</strong>: <code>/memory</code> 명령으로 열람, 편집, 삭제 가능<br />
                    <strong>비활성화</strong>: 설정에서 <code>autoMemoryEnabled: false</code>
                  </div>

                  <h4>3-2. CLAUDE.md vs Auto Memory 사용 시점</h4>

                  {/* ── SVG: 비교 테이블 ── */}
                  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: 700, margin: '16px auto', display: 'block' }}>
                    {/* 헤더 */}
                    <rect x="10" y="10" width="330" height="35" rx="6" fill="#1B2A4A" />
                    <text x="175" y="33" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">CLAUDE.md (사용자 작성)</text>
                    <rect x="360" y="10" width="330" height="35" rx="6" fill="#4A8FE7" />
                    <text x="525" y="33" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">Auto Memory (Claude 작성)</text>
                    {/* 내용 */}
                    {[
                      { left: '코딩 표준, 워크플로우', right: '빌드 명령어, 디버깅 패턴' },
                      { left: '아키텍처 결정, 금지 패턴', right: '사용자 선호도, 습관' },
                      { left: '프로젝트/사용자/조직 범위', right: '리포지토리별 로컬 저장' },
                      { left: 'Git으로 팀과 공유 가능', right: 'Plain markdown, 직접 편집 가능' },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x="10" y={55 + i * 35} width="330" height="30" rx="4" fill={i % 2 === 0 ? '#F0F4FF' : '#fff'} stroke="#E0E8F0" strokeWidth="0.5" />
                        <text x="24" y={75 + i * 35} fill="#1B2A4A" fontSize="11">{item.left}</text>
                        <rect x="360" y={55 + i * 35} width="330" height="30" rx="4" fill={i % 2 === 0 ? '#F0F8FF' : '#fff'} stroke="#E0E8F0" strokeWidth="0.5" />
                        <text x="374" y={75 + i * 35} fill="#1B2A4A" fontSize="11">{item.right}</text>
                      </g>
                    ))}
                  </svg>

                  <h4>3-3. 개발 이력 문서화 (Dev_md 패턴)</h4>
                  <div className="prompt-example">{`# Dev_md/2026-05-12.md — 개발 이력 기록

## Claude Code 메뉴 추가
- 변경: 학습하기 다음에 Claude Code 드롭다운 메뉴 추가
- 파일: site.ts, translations.ts, PublicLayout.tsx
- 신규: 4개 페이지 (Intro, Markdown, Skills, Advanced)
- 패턴: LectureBasic.tsx의 sidebar-layout 재사용

## CSS 패치
- 문제: .container max-width 불일치
- 해결: 전 사이트 1280px + padding 40px 통일`}</div>

                  <h4>3-4. .claude/rules/ 디렉토리 활용</h4>
                  <p>
                    큰 프로젝트에서는 CLAUDE.md 하나에 모든 규칙을 넣지 말고,
                    <code>.claude/rules/</code> 디렉토리에 주제별로 분리하세요.
                    경로 기반 규칙은 해당 파일 작업 시에만 로드되므로 컨텍스트를 절약합니다.
                  </p>

                  <div className="tip-box">
                    <strong>핵심</strong>: CLAUDE.md는 &quot;매 세션 Claude가 알아야 할 사실&quot;만 담으세요.
                    멀티스텝 절차나 특정 모듈에만 필요한 내용은 <code>.claude/rules/</code>의 경로 규칙이나
                    스킬(skill)로 분리하면 컨텍스트 효율이 올라갑니다.
                  </div>
                </div>
              </div>

              {/* ═══ 효과적인 프롬프트 패턴 ═══ */}
              <div id="prompt-patterns" className="lecture-section">
                <h3>4. 효과적인 프롬프트 패턴</h3>
                <div className="lecture-content">
                  <h4>4-1. 프롬프트 공식: [역할] + [맥락] + [지시] + [제약]</h4>

                  {/* ── SVG: 프롬프트 공식 ── */}
                  <svg viewBox="0 0 700 100" style={{ width: '100%', maxWidth: 700, margin: '12px auto', display: 'block' }}>
                    {[
                      { x: 10, label: '역할', desc: 'React 전문 개발자야', color: '#1B2A4A', w: 160 },
                      { x: 180, label: '맥락', desc: 'Supabase 기반 교육 플랫폼', color: '#2E4A7A', w: 175 },
                      { x: 365, label: '지시', desc: 'FAQ 페이지를 만들어줘', color: '#3A6FD0', w: 165 },
                      { x: 540, label: '제약', desc: '기존 CSS만 재사용', color: '#4A8FE7', w: 150 },
                    ].map((item, i) => (
                      <g key={i}>
                        <rect x={item.x} y="10" width={item.w} height="55" rx="10" fill={item.color} />
                        <text x={item.x + item.w / 2} y="30" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">{item.label}</text>
                        <text x={item.x + item.w / 2} y="48" textAnchor="middle" fill="#C5D8F0" fontSize="9">{item.desc}</text>
                        {i < 3 && (
                          <text x={item.x + item.w + 5} y="42" fill="#4A8FE7" fontSize="18" fontWeight="bold">+</text>
                        )}
                      </g>
                    ))}
                    <text x="350" y="88" textAnchor="middle" fill="#888" fontSize="11">4요소를 조합하면 Claude의 응답 품질이 비약적으로 향상됩니다</text>
                  </svg>

                  <div className="prompt-example">{`# 프롬프트 공식 적용 예시
"너는 React 전문 개발자야. [역할]
이 프로젝트는 Supabase를 백엔드로 사용하는 교육 플랫폼이야. [맥락]
src/pages/에 새로운 FAQ 페이지를 만들어줘. [지시]
기존 LectureBasic.tsx의 sidebar 패턴을 따르고,
CSS는 추가하지 말고 기존 클래스를 재사용해줘." [제약]`}</div>

                  <h4>4-2. 맥락 제공 기법</h4>
                  <div className="example-box">
                    <strong>@파일명 참조</strong> — <code>@src/config/site.ts 이 파일의 menuItems에 새 항목 추가해줘</code><br />
                    <strong>에러 메시지 포함</strong> — 정확한 에러 내용을 붙여넣기<br />
                    <strong>기대 결과 명시</strong> — 원하는 결과를 구체적으로 설명<br />
                    <strong>! 셸 모드</strong> — <code>! npm test</code>로 테스트 결과를 맥락에 추가
                  </div>

                  <h4>4-3. 단계별 지시 패턴</h4>
                  <div className="prompt-example">{`"다음 순서로 작업해줘:
1. src/config/site.ts의 menuItems에 새 메뉴 항목 추가
2. src/utils/translations.ts에 한국어/영어 번역 키 추가
3. src/layouts/PublicLayout.tsx에 라우트 추가
4. src/pages/에 새 페이지 컴포넌트 생성
5. npm run build로 빌드 확인"`}</div>

                  <h4>4-4. 피해야 할 패턴</h4>
                  <ul>
                    <li><strong>모호한 요청</strong> — &quot;이거 고쳐줘&quot; → 무엇이 문제인지 명시</li>
                    <li><strong>너무 큰 범위</strong> — &quot;전체 리팩토링해줘&quot; → 작은 단위로 분할</li>
                    <li><strong>맥락 없는 요청</strong> — 관련 파일이나 에러 메시지 없이 요청</li>
                    <li><strong>중복 지시</strong> — 같은 내용을 다른 말로 반복하여 혼란 유발</li>
                  </ul>

                  <div className="tip-box">
                    <strong>핵심 원칙</strong>: Claude Code에게는 &quot;무엇을 원하는지&quot;를 명확히 전달하되,
                    &quot;어떻게 구현할지&quot;는 Claude에게 맡기세요.
                    단, 반드시 지켜야 할 제약조건(기존 패턴 사용, 특정 라이브러리 제외 등)은 반드시 명시하세요.
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

export default ClaudeCodeMarkdown;
