import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const sections = [
  { id: 'vscode', label: 'VS Code 설치 & 설정' },
  { id: 'git', label: 'Git 설치 & 이메일 등록' },
  { id: 'nodejs', label: 'Node.js 설치' },
  { id: 'github', label: 'GitHub 계정 & 설정' },
  { id: 'cursor', label: 'Cursor IDE 설치' },
  { id: 'verify', label: '설치 확인 & 검증' },
];

const LectureSetup = (): ReactElement => {
  const [activeSection, setActiveSection] = useState('vscode');

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
      <SEOHead title="실습 환경 설정" description="바이브코딩 교육 실습을 위한 개발 환경 설정 가이드 — VS Code, Git, Node.js, GitHub, Cursor IDE" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Environment Setup</div>
          <h2>실습 환경 설정</h2>
          <p>교육 시작 전 필수 개발 도구 설치 및 환경 구성 가이드</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-layout">

          {/* ── 사이드바 ── */}
          <aside className="lecture-sidebar">
            <div className="ls-title">
              <i className="fa-solid fa-gear" />
              환경 설정 목차
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
              <div className="ls-guide-label">준비 목표</div>
              <ul className="ls-guide-list">
                <li>VS Code를 설치하고 기본 설정을 완료합니다</li>
                <li>Git을 설치하고 사용자 정보를 등록합니다</li>
                <li>Node.js를 설치하고 npm을 사용합니다</li>
                <li>GitHub 계정을 생성하고 연동합니다</li>
                <li>Cursor IDE를 설치합니다</li>
              </ul>
            </div>

            <div className="ls-divider" />

            <Link to="/lecture/basic" className="ls-course-link">
              <i className="fa-solid fa-arrow-right" />
              1일차 강의안으로 이동
              <span>Day 1</span>
            </Link>
          </aside>

          {/* ── 메인 콘텐츠 ── */}
          <div className="lecture-main">
            <div className="lecture-page" style={{ padding: 0, maxWidth: 'none' }}>

              {/* ═══ VS Code 설치 & 설정 ═══ */}
              <div id="vscode" className="lecture-section">
                <h3>1. VS Code 설치 & 설정</h3>
                <div className="lecture-content">
                  <h4>VS Code란?</h4>
                  <p>
                    Visual Studio Code(VS Code)는 Microsoft에서 개발한 무료 코드 에디터입니다.
                    가볍고 빠르며, 수천 개의 확장 프로그램을 지원합니다. 바이브코딩 교육의 기본 코드 에디터로 사용합니다.
                  </p>

                  {/* VS Code 인터페이스 레이아웃 SVG */}
                  <svg viewBox="0 0 720 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <rect x="1" y="1" width="718" height="338" rx="12" fill="#2A2D32" stroke="#333" strokeWidth="2" />
                    {/* 타이틀 바 */}
                    <rect x="1" y="1" width="718" height="32" rx="12" fill="#3C3F44" />
                    <rect x="1" y="20" width="718" height="13" fill="#3C3F44" />
                    <circle cx="22" cy="17" r="6" fill="#FF5F56" /><circle cx="42" cy="17" r="6" fill="#FFBD2E" /><circle cx="62" cy="17" r="6" fill="#27C93F" />
                    <text x="360" y="22" textAnchor="middle" fill="#ccc" fontSize="12" fontFamily="system-ui">Visual Studio Code</text>
                    {/* 액티비티 바 */}
                    <rect x="1" y="33" width="44" height="306" fill="#333" />
                    <text x="23" y="60" textAnchor="middle" fill="#858585" fontSize="16">&#9776;</text>
                    <text x="23" y="90" textAnchor="middle" fill="#fff" fontSize="16">&#128269;</text>
                    <text x="23" y="120" textAnchor="middle" fill="#858585" fontSize="14">&#9741;</text>
                    <text x="23" y="150" textAnchor="middle" fill="#858585" fontSize="16">&#9881;</text>
                    <rect x="4" y="52" width="2" height="18" rx="1" fill="#007ACC" />
                    {/* 사이드바 (파일 탐색기) */}
                    <rect x="45" y="33" width="160" height="306" fill="#333639" />
                    <text x="55" y="52" fill="#BBBBBB" fontSize="10" fontWeight="bold" fontFamily="system-ui">EXPLORER</text>
                    <text x="60" y="72" fill="#E8E8E8" fontSize="11" fontFamily="monospace">&#9660; src/</text>
                    <text x="76" y="88" fill="#C8C8C8" fontSize="11" fontFamily="monospace">&#9660; pages/</text>
                    <text x="92" y="104" fill="#4EC9B0" fontSize="11" fontFamily="monospace">Home.tsx</text>
                    <text x="92" y="120" fill="#4EC9B0" fontSize="11" fontFamily="monospace">About.tsx</text>
                    <text x="76" y="136" fill="#C8C8C8" fontSize="11" fontFamily="monospace">&#9660; components/</text>
                    <text x="92" y="152" fill="#4EC9B0" fontSize="11" fontFamily="monospace">Navbar.tsx</text>
                    <text x="60" y="172" fill="#E8E8E8" fontSize="11" fontFamily="monospace">&#9654; public/</text>
                    <text x="60" y="188" fill="#DCDCAA" fontSize="11" fontFamily="monospace">package.json</text>
                    {/* 에디터 영역 */}
                    <rect x="205" y="33" width="514" height="200" fill="#2A2D32" />
                    {/* 탭 */}
                    <rect x="205" y="33" width="120" height="28" fill="#2A2D32" />
                    <rect x="325" y="33" width="120" height="28" fill="#383B40" />
                    <text x="220" y="51" fill="#fff" fontSize="11" fontFamily="monospace">Home.tsx</text>
                    <text x="340" y="51" fill="#888" fontSize="11" fontFamily="monospace">About.tsx</text>
                    <line x1="205" y1="61" x2="719" y2="61" stroke="#007ACC" strokeWidth="2" />
                    {/* 코드 */}
                    <text x="220" y="82" fill="#569CD6" fontSize="11" fontFamily="monospace">import</text>
                    <text x="268" y="82" fill="#9CDCFE" fontSize="11" fontFamily="monospace">React</text>
                    <text x="303" y="82" fill="#569CD6" fontSize="11" fontFamily="monospace">from</text>
                    <text x="335" y="82" fill="#CE9178" fontSize="11" fontFamily="monospace">'react'</text>
                    <text x="220" y="100" fill="#569CD6" fontSize="11" fontFamily="monospace">export default function</text>
                    <text x="382" y="100" fill="#DCDCAA" fontSize="11" fontFamily="monospace">Home()</text>
                    <text x="432" y="100" fill="#D4D4D4" fontSize="11" fontFamily="monospace">{'{'}</text>
                    <text x="234" y="118" fill="#C586C0" fontSize="11" fontFamily="monospace">return</text>
                    <text x="280" y="118" fill="#D4D4D4" fontSize="11" fontFamily="monospace">(</text>
                    <text x="248" y="136" fill="#808080" fontSize="11" fontFamily="monospace">&lt;</text>
                    <text x="258" y="136" fill="#569CD6" fontSize="11" fontFamily="monospace">div</text>
                    <text x="279" y="136" fill="#808080" fontSize="11" fontFamily="monospace">&gt;</text>
                    <text x="262" y="154" fill="#D4D4D4" fontSize="11" fontFamily="monospace">Hello, World!</text>
                    <text x="248" y="172" fill="#808080" fontSize="11" fontFamily="monospace">&lt;/</text>
                    <text x="264" y="172" fill="#569CD6" fontSize="11" fontFamily="monospace">div</text>
                    <text x="285" y="172" fill="#808080" fontSize="11" fontFamily="monospace">&gt;</text>
                    {/* 라인 넘버 */}
                    <text x="210" y="82" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">1</text>
                    <text x="210" y="100" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">2</text>
                    <text x="210" y="118" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">3</text>
                    <text x="210" y="136" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">4</text>
                    <text x="210" y="154" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">5</text>
                    <text x="210" y="172" fill="#5A5A5A" fontSize="10" fontFamily="monospace" textAnchor="end">6</text>
                    {/* 터미널 */}
                    <rect x="205" y="233" width="514" height="106" fill="#262A2F" />
                    <rect x="205" y="233" width="514" height="22" fill="#333639" />
                    <text x="215" y="248" fill="#ccc" fontSize="10" fontFamily="system-ui">TERMINAL</text>
                    <text x="215" y="272" fill="#4EC9B0" fontSize="11" fontFamily="monospace">$</text>
                    <text x="228" y="272" fill="#D4D4D4" fontSize="11" fontFamily="monospace">npm run dev</text>
                    <text x="215" y="290" fill="#6A9955" fontSize="11" fontFamily="monospace">VITE v7.3.3 ready</text>
                    <text x="215" y="308" fill="#569CD6" fontSize="11" fontFamily="monospace">→ Local: http://localhost:5173/</text>
                    {/* 레이블 화살표 */}
                    <rect x="540" y="80" width="130" height="24" rx="4" fill="#007ACC" />
                    <text x="605" y="96" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="system-ui">코드 편집 영역</text>
                    <rect x="540" y="280" width="130" height="24" rx="4" fill="#007ACC" />
                    <text x="605" y="296" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="system-ui">내장 터미널</text>
                    <rect x="55" y="200" width="130" height="24" rx="4" fill="#007ACC" />
                    <text x="120" y="216" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="system-ui">파일 탐색기</text>
                  </svg>

                  <h4>다운로드 & 설치</h4>
                  <div className="tip-box">
                    <strong>다운로드 링크</strong><br />
                    <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
                      https://code.visualstudio.com
                    </a>
                  </div>

                  <div className="example-box">
                    <strong>운영체제별 설치</strong><br /><br />
                    <strong>Windows</strong><br />
                    1. 위 링크에서 &quot;Download for Windows&quot; 클릭<br />
                    2. 다운로드된 <code>VSCodeUserSetup-x64-*.exe</code> 실행<br />
                    3. &quot;PATH에 추가&quot; 옵션 체크 (중요!)<br />
                    4. 설치 완료 후 재시작<br /><br />
                    <strong>macOS</strong><br />
                    1. 위 링크에서 &quot;Download for Mac&quot; 클릭<br />
                    2. 다운로드된 .zip 압축 해제<br />
                    3. Visual Studio Code.app을 Applications 폴더로 이동<br />
                    4. 실행 후 Cmd+Shift+P → &quot;Shell Command: Install &#39;code&#39; command in PATH&quot; 실행
                  </div>

                  <h4>필수 확장 프로그램 설치</h4>
                  <p>VS Code 왼쪽 사이드바의 확장(Extensions) 아이콘(Ctrl+Shift+X)을 클릭하고 아래 확장을 검색하여 설치합니다.</p>
                  <div className="example-box">
                    <strong>필수 확장 프로그램</strong><br /><br />
                    1. <strong>Korean Language Pack</strong> — VS Code 한국어 지원<br />
                    2. <strong>ESLint</strong> — JavaScript/TypeScript 코드 검사<br />
                    3. <strong>Prettier</strong> — 코드 자동 정렬<br />
                    4. <strong>Auto Rename Tag</strong> — HTML 태그 자동 이름 변경<br />
                    5. <strong>Live Server</strong> — HTML 실시간 미리보기<br />
                    6. <strong>GitLens</strong> — Git 이력 시각화
                  </div>

                  <h4>기본 설정</h4>
                  <p>Ctrl+, (Settings)를 열고 아래 설정을 적용합니다.</p>
                  <div className="prompt-example">{`// settings.json (Ctrl+Shift+P → "Open User Settings JSON")
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.wordWrap": "on",
  "files.autoSave": "afterDelay",
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}`}</div>

                  <div className="tip-box">
                    <strong>터미널에서 VS Code 열기</strong><br />
                    설치 시 &quot;PATH에 추가&quot; 옵션을 체크했다면, 터미널에서 <code>code .</code> 명령으로 현재 폴더를 VS Code에서 열 수 있습니다.
                  </div>
                </div>
              </div>

              {/* ═══ Git 설치 & 이메일 등록 ═══ */}
              <div id="git" className="lecture-section">
                <h3>2. Git 설치 & 이메일 등록</h3>
                <div className="lecture-content">
                  <h4>Git이란?</h4>
                  <p>
                    Git은 코드의 변경 이력을 관리하는 버전 관리 시스템입니다.
                    여러 사람이 동시에 작업하거나, 이전 버전으로 되돌리거나, 브랜치를 나누어 개발할 수 있게 해줍니다.
                  </p>

                  {/* Git 워크플로우 다이어그램 */}
                  <svg viewBox="0 0 720 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <defs>
                      <marker id="arrowG" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto"><polygon points="0 0, 10 3.5, 0 7" fill="#007ACC" /></marker>
                    </defs>
                    <rect width="720" height="200" rx="12" fill="#1C2836" />
                    {/* 내 PC 영역 */}
                    <rect x="20" y="16" width="500" height="168" rx="8" fill="none" stroke="#3D5168" strokeWidth="1.5" strokeDasharray="6 3" />
                    <text x="36" y="36" fill="#A3B1C2" fontSize="11" fontFamily="system-ui">내 PC (로컬)</text>
                    {/* Working Directory */}
                    <rect x="40" y="60" width="130" height="100" rx="8" fill="#253345" stroke="#F0883E" strokeWidth="2" />
                    <text x="105" y="86" textAnchor="middle" fill="#F0883E" fontSize="12" fontWeight="bold" fontFamily="system-ui">Working</text>
                    <text x="105" y="102" textAnchor="middle" fill="#F0883E" fontSize="12" fontWeight="bold" fontFamily="system-ui">Directory</text>
                    <text x="105" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">파일 수정</text>
                    <text x="105" y="140" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">코드 작성</text>
                    {/* 화살표 1 */}
                    <line x1="170" y1="108" x2="210" y2="108" stroke="#007ACC" strokeWidth="2" markerEnd="url(#arrowG)" />
                    <text x="190" y="98" textAnchor="middle" fill="#58A6FF" fontSize="9" fontFamily="monospace">git add</text>
                    {/* Staging Area */}
                    <rect x="215" y="60" width="130" height="100" rx="8" fill="#253345" stroke="#3FB950" strokeWidth="2" />
                    <text x="280" y="86" textAnchor="middle" fill="#3FB950" fontSize="12" fontWeight="bold" fontFamily="system-ui">Staging</text>
                    <text x="280" y="102" textAnchor="middle" fill="#3FB950" fontSize="12" fontWeight="bold" fontFamily="system-ui">Area</text>
                    <text x="280" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">커밋할 파일</text>
                    <text x="280" y="140" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">선택 & 준비</text>
                    {/* 화살표 2 */}
                    <line x1="345" y1="108" x2="385" y2="108" stroke="#007ACC" strokeWidth="2" markerEnd="url(#arrowG)" />
                    <text x="365" y="98" textAnchor="middle" fill="#58A6FF" fontSize="9" fontFamily="monospace">commit</text>
                    {/* Local Repository */}
                    <rect x="390" y="60" width="120" height="100" rx="8" fill="#253345" stroke="#A371F7" strokeWidth="2" />
                    <text x="450" y="86" textAnchor="middle" fill="#A371F7" fontSize="12" fontWeight="bold" fontFamily="system-ui">Local</text>
                    <text x="450" y="102" textAnchor="middle" fill="#A371F7" fontSize="12" fontWeight="bold" fontFamily="system-ui">Repository</text>
                    <text x="450" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">커밋 이력</text>
                    <text x="450" y="140" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">버전 관리</text>
                    {/* 화살표 3 */}
                    <line x1="510" y1="108" x2="555" y2="108" stroke="#007ACC" strokeWidth="2" markerEnd="url(#arrowG)" />
                    <text x="533" y="98" textAnchor="middle" fill="#58A6FF" fontSize="9" fontFamily="monospace">push</text>
                    {/* Remote (GitHub) */}
                    <rect x="560" y="60" width="140" height="100" rx="8" fill="#253345" stroke="#58A6FF" strokeWidth="2" />
                    <text x="630" y="86" textAnchor="middle" fill="#58A6FF" fontSize="12" fontWeight="bold" fontFamily="system-ui">Remote</text>
                    <text x="630" y="102" textAnchor="middle" fill="#58A6FF" fontSize="12" fontWeight="bold" fontFamily="system-ui">(GitHub)</text>
                    <text x="630" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">온라인 저장소</text>
                    <text x="630" y="140" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">협업 & 배포</text>
                    {/* 클라우드 표시 */}
                    <text x="700" y="36" textAnchor="end" fill="#A3B1C2" fontSize="11" fontFamily="system-ui">Cloud</text>
                  </svg>

                  <h4>다운로드 & 설치</h4>
                  <div className="tip-box">
                    <strong>다운로드 링크</strong><br />
                    <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">
                      https://git-scm.com
                    </a>
                  </div>

                  <div className="example-box">
                    <strong>Windows 설치</strong><br /><br />
                    1. 위 링크에서 &quot;Download for Windows&quot; 클릭<br />
                    2. 설치 중 &quot;Git Bash Here&quot; 옵션 체크 (기본값)<br />
                    3. 기본 에디터: &quot;Use Visual Studio Code as Git&#39;s default editor&quot; 선택<br />
                    4. PATH 환경: &quot;Git from the command line and also from 3rd-party software&quot; 선택<br />
                    5. 나머지 옵션은 기본값으로 진행<br /><br />
                    <strong>macOS 설치</strong><br />
                    터미널에서 아래 명령 실행 (Xcode Command Line Tools 설치됨):
                  </div>
                  <div className="prompt-example">{`# macOS — Xcode CLI Tools로 설치
xcode-select --install

# 또는 Homebrew로 설치
brew install git`}</div>

                  <h4>사용자 정보 등록 (필수!)</h4>
                  <p>Git을 처음 설치한 뒤 반드시 이름과 이메일을 등록해야 합니다. 커밋할 때 이 정보가 기록됩니다.</p>
                  <div className="prompt-example">{`# 사용자 이름 설정
git config --global user.name "홍길동"

# 이메일 설정 (GitHub 가입 이메일과 동일하게!)
git config --global user.email "honggildong@example.com"

# 설정 확인
git config --global --list`}</div>

                  <div className="tip-box">
                    <strong>중요!</strong> 이메일은 이후 GitHub 계정에 등록할 이메일과 동일하게 설정해야 합니다.
                    이메일이 다르면 GitHub에서 커밋 이력이 본인 계정과 연결되지 않습니다.
                  </div>

                  <h4>기본 브랜치 이름 설정</h4>
                  <div className="prompt-example">{`# 기본 브랜치를 main으로 설정 (권장)
git config --global init.defaultBranch main`}</div>

                  <h4>줄 바꿈 설정 (Windows 사용자)</h4>
                  <p>Windows와 macOS는 줄 바꿈 문자가 다릅니다. Windows 사용자는 아래 설정을 추가합니다.</p>
                  <div className="prompt-example">{`# Windows: 체크아웃 시 CRLF, 커밋 시 LF로 변환
git config --global core.autocrlf true`}</div>

                  <h4>Git 설치 확인</h4>
                  <div className="prompt-example">{`# 버전 확인
git --version
# 출력 예: git version 2.47.0`}</div>
                </div>
              </div>

              {/* ═══ Node.js 설치 ═══ */}
              <div id="nodejs" className="lecture-section">
                <h3>3. Node.js 설치</h3>
                <div className="lecture-content">
                  <h4>Node.js란?</h4>
                  <p>
                    Node.js는 JavaScript를 브라우저 밖에서 실행할 수 있게 해주는 런타임 환경입니다.
                    React 프로젝트를 생성하고, 패키지를 설치하고, 개발 서버를 실행하는 데 필요합니다.
                  </p>

                  {/* Node.js 에코시스템 다이어그램 */}
                  <svg viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <rect width="720" height="220" rx="12" fill="#1C2836" />
                    {/* Node.js 중앙 */}
                    <rect x="270" y="20" width="180" height="60" rx="10" fill="#2B7042" stroke="#3FB950" strokeWidth="2" />
                    <text x="360" y="46" textAnchor="middle" fill="#3FB950" fontSize="16" fontWeight="bold" fontFamily="system-ui">Node.js</text>
                    <text x="360" y="64" textAnchor="middle" fill="#A3B1C2" fontSize="11" fontFamily="system-ui">JavaScript 런타임</text>
                    {/* npm */}
                    <rect x="40" y="120" width="140" height="70" rx="8" fill="#253345" stroke="#CB2431" strokeWidth="1.5" />
                    <text x="110" y="148" textAnchor="middle" fill="#CB2431" fontSize="14" fontWeight="bold" fontFamily="system-ui">npm</text>
                    <text x="110" y="166" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">패키지 매니저</text>
                    <text x="110" y="180" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">npm install, npm run</text>
                    {/* Vite */}
                    <rect x="210" y="120" width="140" height="70" rx="8" fill="#253345" stroke="#BD34FE" strokeWidth="1.5" />
                    <text x="280" y="148" textAnchor="middle" fill="#BD34FE" fontSize="14" fontWeight="bold" fontFamily="system-ui">Vite</text>
                    <text x="280" y="166" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">빌드 도구</text>
                    <text x="280" y="180" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">빠른 개발 서버</text>
                    {/* React */}
                    <rect x="380" y="120" width="140" height="70" rx="8" fill="#253345" stroke="#61DAFB" strokeWidth="1.5" />
                    <text x="450" y="148" textAnchor="middle" fill="#61DAFB" fontSize="14" fontWeight="bold" fontFamily="system-ui">React</text>
                    <text x="450" y="166" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">UI 프레임워크</text>
                    <text x="450" y="180" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">컴포넌트 기반</text>
                    {/* TypeScript */}
                    <rect x="550" y="120" width="140" height="70" rx="8" fill="#253345" stroke="#3178C6" strokeWidth="1.5" />
                    <text x="620" y="148" textAnchor="middle" fill="#3178C6" fontSize="14" fontWeight="bold" fontFamily="system-ui">TypeScript</text>
                    <text x="620" y="166" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">타입 안전성</text>
                    <text x="620" y="180" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">.ts / .tsx 파일</text>
                    {/* 연결선 */}
                    <line x1="310" y1="80" x2="110" y2="120" stroke="#3D5168" strokeWidth="1.5" />
                    <line x1="340" y1="80" x2="280" y2="120" stroke="#3D5168" strokeWidth="1.5" />
                    <line x1="380" y1="80" x2="450" y2="120" stroke="#3D5168" strokeWidth="1.5" />
                    <line x1="410" y1="80" x2="620" y2="120" stroke="#3D5168" strokeWidth="1.5" />
                  </svg>

                  <h4>다운로드 & 설치</h4>
                  <div className="tip-box">
                    <strong>다운로드 링크</strong><br />
                    <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
                      https://nodejs.org
                    </a><br />
                    <strong>LTS(Long Term Support) 버전</strong>을 다운로드하세요 (v20 이상 권장).
                  </div>

                  <div className="example-box">
                    <strong>Windows</strong><br />
                    1. 위 링크에서 LTS 버전 다운로드<br />
                    2. 설치 파일 실행 → 기본 옵션으로 설치<br />
                    3. &quot;Automatically install the necessary tools&quot; 체크<br /><br />
                    <strong>macOS</strong><br />
                    1. 위 링크에서 macOS Installer 다운로드<br />
                    2. 또는 Homebrew 사용:
                  </div>
                  <div className="prompt-example">{`# macOS Homebrew로 설치
brew install node@20`}</div>

                  <h4>설치 확인</h4>
                  <div className="prompt-example">{`# Node.js 버전 확인
node -v
# 출력 예: v20.18.0

# npm 버전 확인 (Node.js와 함께 설치됨)
npm -v
# 출력 예: 10.8.2`}</div>

                  <h4>npm 기본 명령어</h4>
                  <div className="example-box">
                    <strong>자주 사용하는 npm 명령어</strong><br /><br />
                    <code>npm init -y</code> — 새 프로젝트 초기화 (package.json 생성)<br />
                    <code>npm install 패키지명</code> — 패키지 설치<br />
                    <code>npm run dev</code> — 개발 서버 실행<br />
                    <code>npm run build</code> — 프로덕션 빌드<br />
                    <code>npx 명령</code> — 패키지를 설치하지 않고 실행
                  </div>

                  <h4>React + Vite 프로젝트 생성 테스트</h4>
                  <div className="prompt-example">{`# React + TypeScript 프로젝트 생성
npm create vite@latest my-test-app -- --template react-ts

# 프로젝트 폴더로 이동
cd my-test-app

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173 에서 확인`}</div>

                  <div className="tip-box">
                    <strong>성공!</strong> 브라우저에서 <code>http://localhost:5173</code>을 열었을 때 Vite + React 기본 화면이 보이면 Node.js 설치가 정상적으로 완료된 것입니다. <code>Ctrl+C</code>로 서버를 종료합니다.
                  </div>
                </div>
              </div>

              {/* ═══ GitHub 계정 & 설정 ═══ */}
              <div id="github" className="lecture-section">
                <h3>4. GitHub 계정 & 설정</h3>
                <div className="lecture-content">
                  <h4>GitHub란?</h4>
                  <p>
                    GitHub는 Git 저장소를 온라인에 호스팅하는 서비스입니다.
                    코드 저장, 협업, 배포(GitHub Pages) 등을 제공합니다. 바이브코딩 교육에서는 코드 관리와 웹 배포에 사용합니다.
                  </p>

                  {/* GitHub 배포 플로우 다이어그램 */}
                  <svg viewBox="0 0 720 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <defs>
                      <marker id="arrowH" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto"><polygon points="0 0, 10 3.5, 0 7" fill="#58A6FF" /></marker>
                    </defs>
                    <rect width="720" height="180" rx="12" fill="#1C2836" />
                    {/* Step 1 — 코드 작성 */}
                    <rect x="20" y="40" width="140" height="100" rx="10" fill="#253345" stroke="#F0883E" strokeWidth="2" />
                    <text x="90" y="68" textAnchor="middle" fill="#F0883E" fontSize="20" fontFamily="system-ui">&#128187;</text>
                    <text x="90" y="92" textAnchor="middle" fill="#E6EDF3" fontSize="12" fontWeight="bold" fontFamily="system-ui">코드 작성</text>
                    <text x="90" y="110" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">Cursor IDE에서</text>
                    <text x="90" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">바이브코딩</text>
                    {/* 화살표 */}
                    <line x1="160" y1="90" x2="195" y2="90" stroke="#58A6FF" strokeWidth="2" markerEnd="url(#arrowH)" />
                    {/* Step 2 — git commit */}
                    <rect x="200" y="40" width="140" height="100" rx="10" fill="#253345" stroke="#A371F7" strokeWidth="2" />
                    <text x="270" y="68" textAnchor="middle" fill="#A371F7" fontSize="20" fontFamily="system-ui">&#128190;</text>
                    <text x="270" y="92" textAnchor="middle" fill="#E6EDF3" fontSize="12" fontWeight="bold" fontFamily="system-ui">git commit</text>
                    <text x="270" y="110" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">변경사항 저장</text>
                    <text x="270" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">버전 기록</text>
                    {/* 화살표 */}
                    <line x1="340" y1="90" x2="375" y2="90" stroke="#58A6FF" strokeWidth="2" markerEnd="url(#arrowH)" />
                    {/* Step 3 — git push */}
                    <rect x="380" y="40" width="140" height="100" rx="10" fill="#253345" stroke="#58A6FF" strokeWidth="2" />
                    <text x="450" y="68" textAnchor="middle" fill="#58A6FF" fontSize="20" fontFamily="system-ui">&#9729;</text>
                    <text x="450" y="92" textAnchor="middle" fill="#E6EDF3" fontSize="12" fontWeight="bold" fontFamily="system-ui">git push</text>
                    <text x="450" y="110" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">GitHub에 업로드</text>
                    <text x="450" y="124" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">온라인 저장</text>
                    {/* 화살표 */}
                    <line x1="520" y1="90" x2="555" y2="90" stroke="#58A6FF" strokeWidth="2" markerEnd="url(#arrowH)" />
                    {/* Step 4 — GitHub Pages */}
                    <rect x="560" y="40" width="140" height="100" rx="10" fill="#253345" stroke="#3FB950" strokeWidth="2" />
                    <text x="630" y="68" textAnchor="middle" fill="#3FB950" fontSize="20" fontFamily="system-ui">&#127760;</text>
                    <text x="630" y="92" textAnchor="middle" fill="#E6EDF3" fontSize="12" fontWeight="bold" fontFamily="system-ui">GitHub Pages</text>
                    <text x="630" y="110" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">웹사이트 배포</text>
                    <text x="630" y="124" textAnchor="middle" fill="#3FB950" fontSize="10" fontFamily="system-ui">username.github.io</text>
                  </svg>

                  <h4>계정 생성</h4>
                  <div className="tip-box">
                    <strong>가입 링크</strong><br />
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      https://github.com
                    </a>
                  </div>
                  <div className="example-box">
                    <strong>가입 순서</strong><br /><br />
                    1. github.com에서 &quot;Sign up&quot; 클릭<br />
                    2. 이메일 입력 — <strong>Git 설정에 등록한 이메일과 동일하게!</strong><br />
                    3. 비밀번호 설정 (15자 이상 또는 숫자+문자 8자 이상)<br />
                    4. 사용자이름(Username) 설정 — 영문, 숫자, 하이픈만 가능<br />
                    5. 이메일 인증 완료
                  </div>

                  <h4>GitHub에 처음 푸시하기</h4>
                  <div className="prompt-example">{`# 1. GitHub에서 새 리포지토리 생성 (New repository)
#    → 리포지토리 이름 입력 (예: my-test-app)
#    → Public 선택 → Create repository

# 2. 로컬 프로젝트와 연결
cd my-test-app
git init
git add .
git commit -m "첫 번째 커밋"
git remote add origin https://github.com/사용자명/my-test-app.git
git push -u origin main`}</div>

                  <div className="tip-box">
                    <strong>인증 방식</strong><br />
                    처음 push할 때 GitHub 로그인 창이 뜹니다. 브라우저에서 &quot;Authorize&quot;를 클릭하면 인증이 완료됩니다.
                    이후에는 자동으로 인증됩니다.
                  </div>

                  <h4>GitHub Pages 배포 (교육 중 사용)</h4>
                  <div className="prompt-example">{`# gh-pages 패키지 설치
npm install -D gh-pages

# package.json에 deploy 스크립트 추가 후
npm run build
npx gh-pages -d dist

# → https://사용자명.github.io/리포이름/ 에서 확인`}</div>
                </div>
              </div>

              {/* ═══ Cursor IDE 설치 ═══ */}
              <div id="cursor" className="lecture-section">
                <h3>5. Cursor IDE 설치</h3>
                <div className="lecture-content">
                  <h4>Cursor IDE란?</h4>
                  <p>
                    Cursor는 AI 네이티브 코드 에디터로, VS Code를 기반으로 만들어졌습니다.
                    GPT-4, Claude 등 AI 모델이 내장되어 있어 코드 생성, 수정, 리팩토링을 AI와 대화하며 할 수 있습니다.
                    바이브코딩의 핵심 도구입니다.
                  </p>

                  {/* Cursor = VS Code + AI 다이어그램 */}
                  <svg viewBox="0 0 720 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <rect width="720" height="190" rx="12" fill="#1C2836" />
                    {/* VS Code */}
                    <rect x="40" y="40" width="180" height="110" rx="10" fill="#253345" stroke="#007ACC" strokeWidth="2" />
                    <text x="130" y="72" textAnchor="middle" fill="#007ACC" fontSize="28" fontFamily="system-ui">&#9998;</text>
                    <text x="130" y="98" textAnchor="middle" fill="#007ACC" fontSize="14" fontWeight="bold" fontFamily="system-ui">VS Code</text>
                    <text x="130" y="118" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">코드 편집, 터미널</text>
                    <text x="130" y="132" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">확장 프로그램, Git</text>
                    {/* + 기호 */}
                    <text x="270" y="102" textAnchor="middle" fill="#58A6FF" fontSize="32" fontWeight="bold" fontFamily="system-ui">+</text>
                    {/* AI */}
                    <rect x="310" y="40" width="180" height="110" rx="10" fill="#253345" stroke="#A371F7" strokeWidth="2" />
                    <text x="400" y="72" textAnchor="middle" fill="#A371F7" fontSize="28" fontFamily="system-ui">&#129302;</text>
                    <text x="400" y="98" textAnchor="middle" fill="#A371F7" fontSize="14" fontWeight="bold" fontFamily="system-ui">AI Models</text>
                    <text x="400" y="118" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">GPT-4, Claude</text>
                    <text x="400" y="132" textAnchor="middle" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">코드 생성 & 수정</text>
                    {/* = 기호 */}
                    <text x="540" y="102" textAnchor="middle" fill="#58A6FF" fontSize="32" fontWeight="bold" fontFamily="system-ui">=</text>
                    {/* Cursor */}
                    <rect x="580" y="30" width="120" height="130" rx="10" fill="#283350" stroke="#3FB950" strokeWidth="2.5" />
                    <text x="640" y="66" textAnchor="middle" fill="#3FB950" fontSize="28" fontFamily="system-ui">&#9889;</text>
                    <text x="640" y="92" textAnchor="middle" fill="#3FB950" fontSize="16" fontWeight="bold" fontFamily="system-ui">Cursor</text>
                    <text x="640" y="112" textAnchor="middle" fill="#E6EDF3" fontSize="10" fontFamily="system-ui">AI 네이티브</text>
                    <text x="640" y="126" textAnchor="middle" fill="#E6EDF3" fontSize="10" fontFamily="system-ui">코드 에디터</text>
                    <text x="640" y="146" textAnchor="middle" fill="#3FB950" fontSize="9" fontFamily="system-ui">바이브코딩 핵심 도구</text>
                  </svg>

                  <h4>다운로드 & 설치</h4>
                  <div className="tip-box">
                    <strong>다운로드 링크</strong><br />
                    <a href="https://cursor.com" target="_blank" rel="noopener noreferrer">
                      https://cursor.com
                    </a>
                  </div>

                  <div className="example-box">
                    <strong>설치 순서</strong><br /><br />
                    1. cursor.com에서 &quot;Download&quot; 클릭<br />
                    2. 운영체제에 맞는 버전 다운로드 후 설치<br />
                    3. 실행 후 Google/GitHub 계정으로 로그인<br />
                    4. &quot;Import VS Code Settings?&quot; → Yes (기존 VS Code 설정 가져오기)<br />
                    5. AI 모델 선택 화면에서 기본값 사용
                  </div>

                  <h4>핵심 단축키</h4>
                  <div className="example-box">
                    <strong>Cursor AI 기능 단축키</strong><br /><br />
                    <code>Ctrl+K</code> (Mac: <code>Cmd+K</code>) — 인라인 코드 생성/수정<br />
                    <code>Ctrl+L</code> (Mac: <code>Cmd+L</code>) — AI 채팅 패널 열기<br />
                    <code>Ctrl+I</code> (Mac: <code>Cmd+I</code>) — Composer (멀티파일 Agent 모드)<br />
                    <code>@파일명</code> — 채팅에서 특정 파일 참조<br />
                    <code>@codebase</code> — 전체 코드베이스 참조
                  </div>

                  <h4>VS Code와의 차이점</h4>
                  <div className="example-box">
                    <strong>Cursor vs VS Code</strong><br /><br />
                    - VS Code의 모든 기능 + 확장 프로그램 호환<br />
                    - AI 코드 생성/수정이 에디터에 내장<br />
                    - Composer: 여러 파일을 한 번에 생성/수정하는 Agent 모드<br />
                    - @references: 파일, 문서, 웹을 참조하여 맥락 있는 코드 생성<br />
                    - 무료 플랜으로 교육 중 충분히 사용 가능
                  </div>

                  <div className="tip-box">
                    <strong>참고</strong>: Cursor IDE를 설치하면 VS Code와 동일한 인터페이스에 AI 기능이 추가됩니다.
                    VS Code의 확장 프로그램, 테마, 단축키를 모두 그대로 사용할 수 있습니다.
                  </div>
                </div>
              </div>

              {/* ═══ 설치 확인 & 검증 ═══ */}
              <div id="verify" className="lecture-section">
                <h3>6. 설치 확인 & 검증</h3>
                <div className="lecture-content">
                  {/* 전체 도구 구성도 */}
                  <svg viewBox="0 0 720 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="setup-diagram">
                    <rect width="720" height="260" rx="12" fill="#1C2836" />
                    <text x="360" y="28" textAnchor="middle" fill="#E6EDF3" fontSize="14" fontWeight="bold" fontFamily="system-ui">개발 환경 전체 구성도</text>
                    {/* 상단 — 에디터 레이어 */}
                    <rect x="30" y="44" width="660" height="60" rx="8" fill="#253345" stroke="#3D5168" strokeWidth="1" />
                    <text x="50" y="64" fill="#58A6FF" fontSize="10" fontWeight="bold" fontFamily="system-ui">에디터</text>
                    <rect x="50" y="72" width="120" height="24" rx="4" fill="#1A54B5" />
                    <text x="110" y="88" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="system-ui">VS Code</text>
                    <rect x="190" y="72" width="120" height="24" rx="4" fill="#236B3F" />
                    <text x="250" y="88" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="bold" fontFamily="system-ui">Cursor IDE</text>
                    <text x="340" y="88" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">+ ESLint, Prettier, GitLens 등 확장 프로그램</text>
                    {/* 중단 — 런타임 & 도구 레이어 */}
                    <rect x="30" y="114" width="320" height="60" rx="8" fill="#253345" stroke="#3D5168" strokeWidth="1" />
                    <text x="50" y="134" fill="#3FB950" fontSize="10" fontWeight="bold" fontFamily="system-ui">런타임 & 빌드</text>
                    <rect x="50" y="142" width="90" height="24" rx="4" fill="#2B7042" />
                    <text x="95" y="158" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="bold" fontFamily="system-ui">Node.js</text>
                    <rect x="150" y="142" width="60" height="24" rx="4" fill="#5E2858" />
                    <text x="180" y="158" textAnchor="middle" fill="#BD34FE" fontSize="11" fontWeight="bold" fontFamily="system-ui">Vite</text>
                    <rect x="220" y="142" width="60" height="24" rx="4" fill="#5E2525" />
                    <text x="250" y="158" textAnchor="middle" fill="#CB2431" fontSize="11" fontWeight="bold" fontFamily="system-ui">npm</text>
                    <rect x="290" y="142" width="50" height="24" rx="4" fill="#284E62" />
                    <text x="315" y="158" textAnchor="middle" fill="#3178C6" fontSize="11" fontWeight="bold" fontFamily="system-ui">TS</text>
                    <rect x="370" y="114" width="320" height="60" rx="8" fill="#253345" stroke="#3D5168" strokeWidth="1" />
                    <text x="390" y="134" fill="#F0883E" fontSize="10" fontWeight="bold" fontFamily="system-ui">버전 관리 & 배포</text>
                    <rect x="390" y="142" width="60" height="24" rx="4" fill="#523A15" />
                    <text x="420" y="158" textAnchor="middle" fill="#F0883E" fontSize="11" fontWeight="bold" fontFamily="system-ui">Git</text>
                    <rect x="460" y="142" width="80" height="24" rx="4" fill="#1E3D5E" />
                    <text x="500" y="158" textAnchor="middle" fill="#58A6FF" fontSize="11" fontWeight="bold" fontFamily="system-ui">GitHub</text>
                    <rect x="550" y="142" width="120" height="24" rx="4" fill="#1B5232" />
                    <text x="610" y="158" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="bold" fontFamily="system-ui">GitHub Pages</text>
                    {/* 하단 — 프레임워크 레이어 */}
                    <rect x="30" y="184" width="660" height="60" rx="8" fill="#253345" stroke="#3D5168" strokeWidth="1" />
                    <text x="50" y="204" fill="#A371F7" fontSize="10" fontWeight="bold" fontFamily="system-ui">프레임워크 & 라이브러리</text>
                    <rect x="50" y="212" width="80" height="24" rx="4" fill="#1A455C" />
                    <text x="90" y="228" textAnchor="middle" fill="#61DAFB" fontSize="11" fontWeight="bold" fontFamily="system-ui">React</text>
                    <rect x="140" y="212" width="120" height="24" rx="4" fill="#2A2A52" />
                    <text x="200" y="228" textAnchor="middle" fill="#A371F7" fontSize="11" fontWeight="bold" fontFamily="system-ui">React Router</text>
                    <rect x="270" y="212" width="100" height="24" rx="4" fill="#2A522A" />
                    <text x="320" y="228" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="bold" fontFamily="system-ui">Supabase</text>
                    <rect x="380" y="212" width="90" height="24" rx="4" fill="#3C3C1A" />
                    <text x="425" y="228" textAnchor="middle" fill="#DCDCAA" fontSize="11" fontWeight="bold" fontFamily="system-ui">gh-pages</text>
                    <text x="495" y="228" fill="#A3B1C2" fontSize="10" fontFamily="system-ui">+ 기타 npm 패키지들</text>
                  </svg>

                  <h4>전체 설치 확인 명령어</h4>
                  <p>터미널(Git Bash 또는 Terminal)을 열고 아래 명령어를 실행하여 모든 도구가 정상 설치되었는지 확인합니다.</p>
                  <div className="prompt-example">{`# VS Code 확인
code --version

# Git 확인
git --version

# Git 사용자 정보 확인
git config --global user.name
git config --global user.email

# Node.js 확인
node -v

# npm 확인
npm -v`}</div>

                  <h4>설치 체크리스트</h4>
                  <div className="example-box">
                    <strong>모든 항목이 확인되면 준비 완료!</strong><br /><br />
                    &#9745; VS Code 설치됨 (code --version 출력 확인)<br />
                    &#9745; Git 설치됨 (git --version 출력 확인)<br />
                    &#9745; Git 사용자 이름 설정됨<br />
                    &#9745; Git 이메일 설정됨 (GitHub 이메일과 동일)<br />
                    &#9745; Node.js v20+ 설치됨 (node -v 출력 확인)<br />
                    &#9745; npm 설치됨 (npm -v 출력 확인)<br />
                    &#9745; GitHub 계정 생성됨<br />
                    &#9745; Cursor IDE 설치됨
                  </div>

                  <h4>문제 해결</h4>
                  <div className="example-box">
                    <strong>자주 발생하는 문제</strong><br /><br />
                    <strong>Q. <code>code</code> 명령이 인식되지 않아요</strong><br />
                    A. VS Code 설치 시 &quot;PATH에 추가&quot; 옵션을 체크하지 않았습니다. VS Code를 재설치하거나, VS Code 내에서 Cmd+Shift+P → &quot;Shell Command: Install &#39;code&#39; command in PATH&quot;를 실행합니다.<br /><br />
                    <strong>Q. <code>git</code> 명령이 인식되지 않아요</strong><br />
                    A. 터미널을 닫고 다시 열어보세요. 그래도 안 되면 Git을 재설치합니다. Windows에서는 Git Bash를 사용하세요.<br /><br />
                    <strong>Q. <code>npm create vite</code>가 에러가 나요</strong><br />
                    A. Node.js 버전이 v18 미만일 수 있습니다. <code>node -v</code>로 확인 후 v20 LTS로 재설치합니다.<br /><br />
                    <strong>Q. GitHub 푸시 시 인증 에러가 나요</strong><br />
                    A. 브라우저에서 GitHub에 로그인한 상태에서 다시 시도합니다. 또는 Git Credential Manager를 확인합니다.
                  </div>

                  <div className="tip-box">
                    <strong>준비 완료!</strong><br />
                    위 체크리스트가 모두 완료되면 바이브코딩 교육을 위한 개발 환경이 준비된 것입니다.
                    1일차 강의에서 본격적으로 프로젝트를 시작합니다.
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

export default LectureSetup;
