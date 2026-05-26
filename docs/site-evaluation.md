# KDN 사이트 개발 평가 보고서

> 작성일: 2026-05-12
> 사이트: https://kdn.dreamitbiz.com
> 리포지토리: https://github.com/aebonlee/kdn

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **사이트 ID** | kdn |
| **사이트명 (EN)** | KDN Vibe Coding |
| **사이트명 (KO)** | 바이브코딩으로 풀스택 웹 개발 |
| **목적** | KDN 직원 대상 바이브코딩 활용 풀스택 웹 개발 교육 (3일, 21시간) |
| **테마 컬러** | `#1B2A4A` (Navy Blue) |
| **DB Prefix** | `kdn_` |
| **배포** | GitHub Pages (`kdn.dreamitbiz.com`) |

---

## 2. 기술 스택

| 레이어 | 기술 |
|--------|------|
| **프론트엔드** | React 19 + Vite 7 + TypeScript 5.8 |
| **라우팅** | React Router v7 |
| **스타일링** | 커스텀 CSS 디자인 시스템 (11,300+ lines) |
| **백엔드** | Supabase (PostgreSQL + Auth + Edge Functions) |
| **인증** | Supabase Auth (Email, Google, Kakao OAuth) |
| **콘텐츠** | Markdown (react-markdown + rehype-raw + remark-gfm) |
| **알림** | Resend (이메일) + icode TCP (SMS) |
| **배포** | GitHub Pages (gh-pages) |
| **테마** | 다크/라이트/자동 + 5색 컬러 테마 |
| **다국어** | 한국어/영어 전환 |

---

## 3. 코드베이스 규모

### 3-1. 파일 구성

| 카테고리 | 파일 수 | 비고 |
|----------|---------|------|
| 페이지 컴포넌트 | 27개 | Home, About(3), Curriculum(4), Lecture(5), ClaudeCode(4), Practice(6), Auth(4), Shop(3), 기타(2) |
| 공통 컴포넌트 | 12+개 | Navbar, Footer, AuthGuard, SearchModal, SEOHead 등 |
| Context 프로바이더 | 5개 | Auth, Theme, Language, Cart, Toast |
| 유틸리티 | 11개 | supabase, auth, notifications, translations 등 |
| CSS 파일 | 15개 | 총 11,300+ lines |
| 설정 파일 | 1개 | site.ts (136 lines) |
| 레이아웃 | 1개 | PublicLayout.tsx (140 lines) |

### 3-2. CSS 파일별 규모

| 파일 | 라인 수 | 역할 |
|------|---------|------|
| `site.css` | 1,743 | 사이트 전용 스타일 |
| `practice.css` | 1,682 | 프롬프트 실습 페이지 |
| `dark-mode.css` | 1,472 | 다크 테마 오버라이드 |
| `responsive.css` | 1,299 | 반응형 미디어 쿼리 |
| `guide-pages.css` | 922 | 가이드/강의 페이지 |
| `shop.css` | 914 | 상점 (비활성) |
| `community.css` | 793 | 커뮤니티 (비활성) |
| `navbar.css` | 644 | 네비게이션 바 |
| `auth.css` | 540 | 로그인/회원가입 |
| `base.css` | 396 | 기본 변수 & 리셋 |
| `hero.css` | 365 | 히어로 섹션 |
| `search.css` | 189 | 검색 모달 |
| `toast.css` | 148 | 토스트 알림 |
| `footer.css` | 138 | 푸터 |
| `animations.css` | 55 | 애니메이션 |
| **합계** | **11,300+** | |

### 3-3. 라우트 구성

**총 33개 라우트** (PublicLayout.tsx)

| 그룹 | 라우트 수 | 경로 |
|------|----------|------|
| 홈 | 1 | `/` |
| 소개 | 3 | `/about`, `/about/company`, `/about/instructor` |
| 교육과정 | 4 | `/curriculum`, `/curriculum/basic`, `/curriculum/intermediate`, `/curriculum/advanced` |
| 학습하기 | 5 | `/lecture`, `/lecture/setup`, `/lecture/basic`, `/lecture/intermediate`, `/lecture/advanced` |
| Claude Code | 5 | `/claude-code`, `/claude-code/intro`, `/claude-code/markdown`, `/claude-code/skills`, `/claude-code/advanced` |
| 프롬프트 실습 | 3 | `/prompt-eval`, `/prompt-eval/workshop`, `/prompt-eval/practice` |
| AI 실습 | 1 | `/practice` |
| 프롬프트 사례 | 1 | `/prompt-cases` |
| 바이브코딩 실습 | 1 | `/vibe-practice` |
| 인증 | 5 | `/login`, `/register`, `/forgot-password`, `/mypage`, `/mypage/orders` |
| 상점 | 3 | `/cart`, `/checkout`, `/order-confirmation` (조건부) |
| 추천사이트 | 1 | `/recommended` |
| 404 | 1 | `*` |

### 3-4. 메뉴 구조 (7개 메인)

1. **소개** — 3개 드롭다운 (교육 소개, 회사 소개, 강사 소개)
2. **교육과정** — 3개 드롭다운 (Day 1~3)
3. **학습하기** — 4개 드롭다운 (환경설정, Day 1~3 강의)
4. **Claude Code** — 4개 드롭다운 (시작하기, 마크다운, 스킬, 고급)
5. **프롬프트 실습** — 5개 드롭다운 (실습, 사례, 자료, 워크숍, 모의고사)
6. **바이브코딩 실습** — 단일 페이지
7. **추천사이트** — 단일 페이지

---

## 4. 기능 평가

### 4-1. 활성화된 기능

| 기능 | 상태 | 설명 |
|------|------|------|
| **인증 시스템** | ✅ 완료 | Supabase Auth (Email, Google, Kakao OAuth) |
| **다크/라이트 테마** | ✅ 완료 | 자동/수동 전환, 커스텀 다크 팔레트 적용 |
| **5색 컬러 테마** | ✅ 완료 | Blue, Red, Green, Purple, Orange |
| **한/영 다국어** | ✅ 완료 | 전체 UI 한국어/영어 전환 |
| **교육 콘텐츠** | ✅ 완료 | 교육과정(3일) + 학습(4페이지) + Claude Code(4페이지) |
| **프롬프트 실습** | ✅ 완료 | AI 채점, 등급 시스템, 카테고리 분류 |
| **바이브코딩 실습** | ✅ 완료 | 프로젝트 기반 실습 예제 |
| **프롬프트 평가** | ✅ 완료 | 워크숍 + 모의고사 |
| **반응형 디자인** | ✅ 완료 | 1,299 lines 반응형 CSS |
| **idle 타임아웃** | ✅ 완료 | 비활동 시 자동 로그아웃 |
| **관리자 도구** | ✅ 완료 | Admin FAB으로 실습 문제 편집 |

### 4-2. 비활성화된 기능

| 기능 | 상태 | 설명 |
|------|------|------|
| **상점 (Shop)** | ❌ 비활성 | 기업 교육이므로 결제 불필요 |
| **커뮤니티** | ❌ 비활성 | 포럼/게시판 미사용 |
| **검색** | ❌ 비활성 | 사이트 내 검색 미사용 |
| **라이선스** | ❌ 비활성 | 라이선스 관리 불필요 |

---

## 5. 다크 모드 컬러 시스템 평가

### 5-1. 설계 구조

```
[data-theme="dark"] {
    배경계층: #0F1419 (base) → #1A1F2E (surface) → #242938 (elevated)
    텍스트:   #E6E8EB (primary) → #A0A6B0 (secondary) → #6B7280 (tertiary)
    보더:     #2D3548 (light) → #3D4558 (medium)
    액센트:   #3B82F6 (primary) → #60A5FA (light)
}
```

### 5-2. ink-surface 아키텍처

**문제**: Navy 변수 반전 방식(`--navy-800: #D0D7E0`)은 텍스트에는 적합하나,
`background: var(--navy-800)` + `color: white` 조합 시 밝은 배경 + 흰 글씨 → 가독성 0.

**해결**: `--ink-surface` / `--ink-surface-hover` 시맨틱 변수 도입
- 라이트 모드: `var(--navy-800)` / `var(--navy-900)` (어두운 배경)
- 다크 모드: `#1A1F2E` / `#242938` (어두운 배경 유지)
- 적용: 8개 TSX 파일(21개 인라인 스타일) + 5개 CSS 파일

### 5-3. 평가

| 항목 | 점수 | 비고 |
|------|------|------|
| 대비율 적합성 | ⭐⭐⭐⭐ | WCAG AA 기준 대부분 충족 |
| 변수 일관성 | ⭐⭐⭐⭐ | ink-surface 도입으로 해결 |
| 테마 전환 안정성 | ⭐⭐⭐⭐ | 깜빡임 없는 부드러운 전환 |
| 5색 테마 다크 대응 | ⭐⭐⭐⭐⭐ | 모든 컬러 테마 다크 모드 지원 |

---

## 6. 아키텍처 평가

### 6-1. 강점

| 항목 | 설명 |
|------|------|
| **템플릿 기반 확장** | templete-ref v5.1 기반으로 84개 사이트 일관성 유지 |
| **설정 중심 구조** | `site.ts` 하나로 사이트 ID, 메뉴, 기능 플래그 관리 |
| **CSS 변수 시스템** | 100+ 커스텀 프로퍼티로 체계적 디자인 토큰 |
| **Lazy Loading** | 모든 페이지 컴포넌트 `React.lazy()` + `Suspense` |
| **Context 분리** | Auth, Theme, Language, Cart, Toast 독립 프로바이더 |
| **교육 콘텐츠 풍부** | 교육과정 + 강의 + Claude Code + 실습 + 평가 체계 |
| **다크 모드 완성도** | 1,472 lines 전용 CSS로 세밀한 다크 모드 지원 |

### 6-2. 개선 가능 사항

| 항목 | 현황 | 제안 |
|------|------|------|
| **인라인 스타일** | TSX 파일에 다수의 인라인 스타일 존재 | CSS 클래스로 점진적 이전 |
| **CSS 파일 규모** | 일부 CSS 1,700+ lines | 기능별 분리 또는 CSS Modules 검토 |
| **미사용 CSS** | shop.css(914L), community.css(793L) 비활성 | 조건부 import 또는 제거 |
| **TypeScript 엄격성** | `as any` 또는 타입 단언 일부 사용 | strict 모드 강화 |
| **테스트** | 테스트 파일 미확인 | 주요 컴포넌트 단위 테스트 추가 |

---

## 7. 최근 개발 이력 (이번 세션)

| 커밋 | 작업 내용 | 영향 범위 |
|------|----------|----------|
| `e191b36` | Tailwind Slate 다크 팔레트 + 흰 배경 박스 수정 | 229 추가, 76 삭제 |
| `184f310` | 커스텀 다크 팔레트 적용 (전체 hex 값 교체) | 232 추가, 232 삭제 |
| `5f60392` | ink-surface 변수 도입 (배경/텍스트 분리) | 15개 파일, 56 추가 |
| `49cc6dd` | VibePractice 스크롤바 제거 | 1개 파일 |

### 다크 모드 개선 타임라인

```
Tailwind Slate 팔레트 적용
    ↓
커스텀 다크 팔레트로 교체 (사용자 제공 hex)
    ↓
Navy 반전 + 배경 충돌 문제 발견
    ↓
ink-surface 변수 도입 → 해결
    ↓
전체 빌드 & 배포 완료
```

---

## 8. 종합 평가

### 점수 요약

| 평가 항목 | 점수 (5점) | 비고 |
|-----------|-----------|------|
| **코드 구조** | ⭐⭐⭐⭐ | 설정 중심 + Context 분리, 인라인 스타일 일부 존재 |
| **디자인 시스템** | ⭐⭐⭐⭐⭐ | 100+ CSS 변수, 5색 테마, 다크/라이트 완전 지원 |
| **다크 모드** | ⭐⭐⭐⭐ | 1,472L 전용 CSS, ink-surface 아키텍처 |
| **반응형** | ⭐⭐⭐⭐ | 1,299L 미디어 쿼리, 모바일~데스크탑 |
| **교육 콘텐츠** | ⭐⭐⭐⭐⭐ | 4개 카테고리, 20+ 교육 페이지 |
| **기능 완성도** | ⭐⭐⭐⭐ | 인증, 실습, 채점, 관리자 도구 |
| **성능** | ⭐⭐⭐⭐ | Lazy loading, Vite 7 빌드 최적화 |
| **유지보수성** | ⭐⭐⭐⭐ | 템플릿 기반, 설정 분리, CSS 변수 |
| **종합** | **⭐⭐⭐⭐ (4.3/5)** | **성숙한 교육 플랫폼** |

### 결론

KDN 사이트는 **3일(21시간) 바이브코딩 교육**에 최적화된 완성도 높은 플랫폼입니다.

**핵심 성과:**
- 커스텀 다크 모드 컬러 시스템 (ink-surface 아키텍처)
- 5색 컬러 테마 × 다크/라이트 = 10가지 시각 환경
- 교육과정 → 강의 → Claude Code → 실습 → 평가의 체계적 학습 흐름
- 33개 라우트, 27개 페이지, 11,300+ lines CSS

**기업 교육용 사이트로서 기능적 완성도가 매우 높으며**, 특히 프롬프트 실습과 바이브코딩 실습의 AI 채점 시스템이 차별화 요소입니다.

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**
