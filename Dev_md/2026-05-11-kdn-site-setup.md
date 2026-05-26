# KDN 바이브코딩 교육 사이트 구축

> **날짜**: 2026-05-11 ~ 05-12
> **작업자**: Claude Opus 4.6
> **사이트**: https://kdn.dreamitbiz.com
> **리포**: https://github.com/aebonlee/kdn
> **대상**: KDN (한국전력 KDN, www.kdn.com) 직원 20명

---

## 개요

dasco 사이트의 디자인/구조를 기반으로 KDN 바이브코딩 교육 사이트를 구축했습니다.
주제: **"바이브코딩으로 풀스택 웹 개발"** (3일, 21시간)

## 교육 정보

| 항목 | 내용 |
|------|------|
| 교육대상 | KDN 직원 20명 (웹 개발 개념, JS 기초 이해자) |
| 교육기간 | 2026.05.26(화) ~ 05.28(목), 3일 21시간 |
| 교육장소 | 본사 교육관 Smart룸(2층) |
| 교육방법 | 강의(20%), 실습(80%) / 집합교육 |
| 강사 | 사외강사 (이애본 강사) |

## 작업 내역

### 1. 프로젝트 복사 (dasco → kdn)
- `D:\dreamit-web\dasco`의 src/, public/, scripts/, .env.example, index.html, package.json, tsconfig.json, vite.config.ts를 kdn에 복사
- node_modules, dist, .git 제외

### 2. 수정 파일

| 파일 | 변경 사항 |
|------|-----------|
| `package.json` | name: `kdn-vibe-coding`, homepage: `https://kdn.dreamitbiz.com` |
| `index.html` | title, meta description, OG tags 업데이트 |
| `src/config/site.ts` | id/name/nameKo/description/dbPrefix/URL/brand/menuItems(3과정)/familySites |
| `src/pages/Home.tsx` | 3일 커리큘럼, 3탭 타임라인, 6개 도구, KDN 교육 일정 |
| `src/pages/CurriculumBasic.tsx` | 1일차 커리큘럼 (기획 & 프론트엔드) |
| `src/pages/CurriculumIntermediate.tsx` | 2일차 커리큘럼 (백엔드 & 인증) |
| `src/pages/CurriculumAdvanced.tsx` | **신규** — 3일차 커리큘럼 (AI & 배포) |
| `src/pages/LectureAdvanced.tsx` | **신규** — 3일차 강의안 |
| `src/layouts/PublicLayout.tsx` | /curriculum/advanced, /lecture/advanced 라우트 추가 |
| `src/utils/translations.ts` | 3일차 메뉴 키 추가 (ko/en) |
| `public/CNAME` | `kdn.dreamitbiz.com` |
| `public/kdn-logo.png` | KDN 로고 이미지 추가 |

### 3. 사이트 구성

#### site.ts 핵심 설정
```typescript
id: 'kdn'
name: 'KDN Vibe Coding'
nameKo: '바이브코딩으로 풀스택 웹 개발'
dbPrefix: 'kdn_'
url: 'https://kdn.dreamitbiz.com'
```

#### 메뉴 구성
- About (제작의도/드림아이티비즈/강사소개)
- 교육과정 (1일차 8H / 2일차 8H / 3일차 5H)
- 학습하기 (1일차 강의안 / 2일차 강의안 / 3일차 강의안)
- 프롬프트 학습 (학습자료 / 작성평가 / 종합테스트)
- 바이브코딩 실습
- 추천사이트

#### 커리큘럼 (3일 21시간)

**1일차 (8시간) — 5.26(화) — 기획 & 프론트엔드**
| 시간 | 내용 |
|------|------|
| 09:00~12:00 | Part1. 바이브코딩 & AI Agent 이해 및 개발 환경 구성 |
| 12:00~13:00 | 중식 |
| 13:00~15:00 | Part2. 웹 서비스 기획 및 요구사항 정의 |
| 15:00~16:00 | Part3. 프론트엔드 기초 (HTML/CSS/JS) |
| 16:00~18:00 | Part4. React 기반 프론트엔드 UI 구현 실습 |

**2일차 (8시간) — 5.27(수) — 백엔드 & 인증**
| 시간 | 내용 |
|------|------|
| 09:00~12:00 | Part1. REST API 설계 및 Node.js 백엔드 구현 |
| 12:00~13:00 | 중식 |
| 13:00~15:00 | Part2. 데이터베이스 연동 및 프론트–백엔드 통합 |
| 16:00~18:00 | Part3. 인증·인가(JWT/OAuth) 기능 구현 |

**3일차 (5시간) — 5.28(목) — AI & 배포**
| 시간 | 내용 |
|------|------|
| 09:00~11:00 | Part1. LLM API 연동 및 AI 기능 구현 |
| 11:00~12:00 | Part2. 서비스 완성 및 QA, 배포 실습 |
| 12:00~13:00 | 중식 |
| 13:00~15:00 | Part3. 보안/성능/비용 최적화 및 실무 적용 전략 |

#### 활용 도구
- Cursor IDE (AI CODING · IDE)
- ChatGPT API (LLM · OpenAI)
- Node.js (RUNTIME · JavaScript)
- React (FRAMEWORK · Frontend)
- Supabase (BAAS · Database)
- Git / GitHub (VERSION CONTROL)
- Figma (UI/UX Design)

### 4. 빌드 & 배포
- `npm run build` — 성공 (tsc -b && vite build)
- `npx gh-pages -d dist` — GitHub Pages 배포 완료
- 배포 URL: https://kdn.dreamitbiz.com

## 기술 스택
- React 19 + Vite 7.3 + TypeScript 5.8
- Supabase (Auth + DB)
- GitHub Pages 배포

## 참고사항
- dasco 사이트의 에디토리얼 레이아웃(hero-editorial, section-ed, curriculum-ed 등) 그대로 유지
- KDN 로고 (public/kdn-logo.png) 다운로드 완료
- LectureBasic, LectureIntermediate 강의안 내용은 아직 dasco 원본 — 추후 바이브코딩 내용으로 수정 필요
- PromptCases, RecommendedSites, Practice 등 공통 페이지는 유지
