export default {
  id: 'prompt-examples',
  icon: 'fa-flask',
  title: '실전 예시 & 실습',
  titleEn: 'Examples & Practice',
  sections: [
    {
      title: 'GitHub Copilot 프롬프트 예시',
      titleEn: 'GitHub Copilot Prompt Examples',
      content: `GitHub Copilot에서 실제 사용하는 프롬프트 예시와 평가입니다.

### 코드 생성 프롬프트

**예시 1: API 엔드포인트 생성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "Express.js + TypeScript로 사용자 CRUD API를 만들어줘. Prisma ORM 사용, 입력 검증은 Zod, 에러 핸들링 미들웨어 포함. RESTful 규칙을 따르고 각 엔드포인트에 JSDoc 주석을 달아줘" |
| 평가 점수 | S: 18 / C: 16 / O: 17 / R: 14 / E: 18 = **83점 (A등급)** |
| 강점 | 기술 스택, 구조, 규칙이 모두 명확 |
| 개선점 | "시니어 백엔드 개발자" 역할 추가 시 더 좋은 결과 |

**예시 2: 리팩토링 요청**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "이 컴포넌트를 리팩토링해줘: 1) 커스텀 훅으로 로직 분리, 2) 메모이제이션 적용, 3) TypeScript strict 모드 대응, 4) 각 변경 이유를 주석으로 설명" |
| 평가 점수 | S: 19 / C: 15 / O: 18 / R: 12 / E: 17 = **81점 (A등급)** |
| 강점 | 4단계 구체적 지시, 이유 설명 요청 |
| 개선점 | 대상 컴포넌트의 현재 문제점 설명 추가 |

**예시 3: 테스트 코드 작성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "QA 엔지니어로서 이 함수의 Jest 테스트를 작성해줘. 정상 케이스 3개, 에러 케이스 3개, 엣지 케이스 2개를 포함. describe/it 구조로, 각 테스트의 의도를 명확한 이름으로 표현해줘" |
| 평가 점수 | S: 19 / C: 14 / O: 19 / R: 18 / E: 18 = **88점 (A등급)** |
| 강점 | 역할, 수량, 구조, 네이밍 규칙까지 지정 |
| 개선점 | 테스트 커버리지 목표 추가 시 완벽 |

### Copilot Chat 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 코드 설명 | "@workspace 이 프로젝트의 인증 플로우를 설명해줘. 시퀀스 다이어그램 형태의 마크다운으로" | A |
| 버그 분석 | "/fix 이 useEffect에서 무한 렌더링이 발생해. 의존성 배열과 상태 변경 로직을 분석해줘" | A |
| 성능 개선 | "성능 전문가로서 이 컴포넌트의 렌더링 성능을 분석해줘. React Profiler 기준으로 문제점과 개선안을 표로 정리" | S |

> GitHub Copilot에서는 코드의 맥락(주변 파일, import)이 자동으로 제공되므로, 기술적 지시에 집중하세요.`,
      contentEn: `Real-world prompt examples and evaluations for GitHub Copilot.

### Code Generation Prompts

**Example 1: API Endpoint Creation**

| Item | Content |
|------|---------|
| Prompt | "Create a user CRUD API with Express.js + TypeScript. Use Prisma ORM, Zod for input validation, include error handling middleware. Follow RESTful conventions and add JSDoc comments to each endpoint" |
| Score | S: 18 / C: 16 / O: 17 / R: 14 / E: 18 = **83 (Grade A)** |
| Strengths | Tech stack, structure, and conventions all clear |
| Improvement | Adding "senior backend developer" role would improve results |

**Example 2: Refactoring Request**

| Item | Content |
|------|---------|
| Prompt | "Refactor this component: 1) Extract logic into custom hooks, 2) Apply memoization, 3) Support TypeScript strict mode, 4) Explain each change reason in comments" |
| Score | S: 19 / C: 15 / O: 18 / R: 12 / E: 17 = **81 (Grade A)** |
| Strengths | 4-step specific instructions, explanation requested |
| Improvement | Add description of current component problems |

**Example 3: Test Code Writing**

| Item | Content |
|------|---------|
| Prompt | "As a QA engineer, write Jest tests for this function. Include 3 normal cases, 3 error cases, 2 edge cases. Use describe/it structure, with clear test names expressing intent" |
| Score | S: 19 / C: 14 / O: 19 / R: 18 / E: 18 = **88 (Grade A)** |
| Strengths | Role, quantity, structure, naming conventions all specified |
| Improvement | Adding test coverage target would be perfect |

### Copilot Chat Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Code explanation | "@workspace Explain this project's auth flow. In markdown sequence diagram format" | A |
| Bug analysis | "/fix Infinite rendering occurs in this useEffect. Analyze the dependency array and state change logic" | A |
| Performance | "As a performance expert, analyze this component's rendering performance. Organize problems and improvements in a table based on React Profiler criteria" | S |

> In GitHub Copilot, code context (surrounding files, imports) is automatically provided, so focus on technical instructions.`,
    },
    {
      title: 'M365 Copilot 프롬프트 예시',
      titleEn: 'M365 Copilot Prompt Examples',
      content: `Microsoft 365 Copilot에서 실제 사용하는 프롬프트 예시와 평가입니다.

### Word Copilot 프롬프트

**예시 1: 제안서 작성**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "IT 컨설턴트로서, 중소기업 대상 클라우드 마이그레이션 제안서를 작성해줘. 구성: 1) 현황 분석, 2) 클라우드 전환 필요성, 3) 마이그레이션 로드맵(3단계), 4) 예상 비용/절감효과, 5) 리스크 관리 방안. A4 5페이지 분량, 전문적이지만 비기술 경영진도 이해 가능한 톤으로" |
| 평가 | S: 20 / C: 18 / O: 19 / R: 18 / E: 19 = **94점 (S등급)** |
| 분석 | 역할, 대상, 구조, 분량, 톤 모두 완벽하게 지정 |

**예시 2: 회의록 정리**

| 항목 | 내용 |
|------|------|
| 프롬프트 | "이 회의 녹취록을 다음 형식으로 정리해줘: [참석자], [주요 논의 사항 (3-5개)], [결정 사항], [액션 아이템 - 담당자/기한 포함], [다음 회의 일정]" |
| 평가 | S: 18 / C: 14 / O: 19 / R: 10 / E: 17 = **78점 (B등급)** |
| 개선 | "프로젝트 매니저" 역할 부여 + 회의 배경 설명 추가 |

### Excel Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 매출 분석 | "데이터 분석가로서, 이 매출 데이터에서 1) 월별 성장률 계산, 2) 상위 5개 제품 파레토 분석, 3) 계절 패턴 식별을 해줘. 결과는 각각 별도 시트에 차트 포함" | S |
| 수식 생성 | "B열의 날짜가 이번 달이고 C열 금액이 10만원 이상인 행의 D열 합계를 구하는 SUMPRODUCT 수식을 만들어줘" | A |
| 피벗 테이블 | "이 고객 데이터로 지역별, 분기별 매출 피벗 테이블을 만들고, 전년 동기 대비 증감률을 계산해줘" | A |

### PowerPoint Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 프레젠테이션 | "마케팅 매니저로서, 신제품 런칭 발표 자료를 15장으로 만들어줘. 구성: 시장분석(3) → 제품소개(4) → 마케팅전략(4) → 일정&예산(2) → Q&A(1). 시각적 데이터 차트 포함" | S |
| 요약 발표 | "이 30장 보고서를 경영회의용 5장 요약으로 압축해줘. 핵심 KPI 수치와 전략적 의사결정 포인트만 추출" | A |

### Outlook Copilot 프롬프트

| 용도 | 프롬프트 | 등급 |
|------|---------|------|
| 공식 이메일 | "클라이언트에게 프로젝트 진행상황을 알리는 이메일을 써줘. 완료된 마일스톤 3개, 진행 중인 작업 2개, 다음 주 일정을 포함. 전문적이지만 긍정적인 톤으로" | A |
| 회신 작성 | "이 불만 이메일에 대한 공식 회신을 써줘. 사과 → 원인 설명 → 해결 조치 → 보상안 순서로. 공감적이고 해결 지향적 톤으로" | S |

> M365 Copilot에서는 대상 독자와 톤을 명시하는 것이 결과 품질을 크게 좌우합니다.`,
      contentEn: `Real-world prompt examples and evaluations for Microsoft 365 Copilot.

### Word Copilot Prompts

**Example 1: Proposal Writing**

| Item | Content |
|------|---------|
| Prompt | "As an IT consultant, write a cloud migration proposal for SMBs. Structure: 1) Current state analysis, 2) Cloud transition necessity, 3) Migration roadmap (3 phases), 4) Estimated costs/savings, 5) Risk management plan. 5 A4 pages, professional but understandable by non-technical executives" |
| Score | S: 20 / C: 18 / O: 19 / R: 18 / E: 19 = **94 (Grade S)** |
| Analysis | Role, audience, structure, volume, tone all perfectly specified |

**Example 2: Meeting Minutes**

| Item | Content |
|------|---------|
| Prompt | "Organize these meeting transcripts in this format: [Attendees], [Key Discussion Points (3-5)], [Decisions Made], [Action Items - with owner/deadline], [Next Meeting Schedule]" |
| Score | S: 18 / C: 14 / O: 19 / R: 10 / E: 17 = **78 (Grade B)** |
| Improvement | Add "project manager" role + meeting background description |

### Excel Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Sales analysis | "As a data analyst, from this sales data: 1) Calculate monthly growth rates, 2) Pareto analysis of top 5 products, 3) Identify seasonal patterns. Results on separate sheets with charts" | S |
| Formula creation | "Create a SUMPRODUCT formula to sum column D where column B date is this month and column C amount is over 100,000" | A |
| Pivot table | "Create a regional and quarterly sales pivot table from this customer data, and calculate YoY growth rates" | A |

### PowerPoint Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Presentation | "As a marketing manager, create a 15-slide new product launch presentation. Structure: Market Analysis(3) → Product Intro(4) → Marketing Strategy(4) → Timeline&Budget(2) → Q&A(1). Include visual data charts" | S |
| Summary | "Compress this 30-slide report into a 5-slide executive summary. Extract only key KPI figures and strategic decision points" | A |

### Outlook Copilot Prompts

| Purpose | Prompt | Grade |
|---------|--------|-------|
| Formal email | "Write an email to the client updating project progress. Include 3 completed milestones, 2 in-progress tasks, next week's schedule. Professional but positive tone" | A |
| Reply | "Write a formal reply to this complaint email. Order: Apology → Cause explanation → Resolution → Compensation. Empathetic and solution-oriented tone" | S |

> In M365 Copilot, specifying the target audience and tone significantly impacts result quality.`,
    },
    {
      title: '실습 과제',
      titleEn: 'Practice Exercises',
      content: `프롬프트 작성 능력을 향상시키기 위한 단계별 실습 과제입니다.

### 초급 실습 (Level 1)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | "자기소개서 작성" 프롬프트를 SCORE 80점 이상으로 작성 | 구체성 + 맥락 연습 | 대상 회사, 직무, 톤 지정 여부 |
| 2 | 나쁜 프롬프트 3개를 찾아 개선 버전 작성 | 비교 분석 능력 | Before/After 점수 차이 |
| 3 | 같은 요청을 Zero-shot과 Few-shot으로 각각 작성 | 기법 차이 이해 | 결과물 품질 비교 |

### 중급 실습 (Level 2)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | 하나의 비즈니스 시나리오를 Word, Excel, PowerPoint 프롬프트로 각각 변환 | 환경별 특화 | 각 앱 특성에 맞는 지시 |
| 2 | Chain-of-Thought 기법을 적용한 코드 디버깅 프롬프트 작성 | CoT 기법 실습 | 단계 구분의 논리성 |
| 3 | 페르소나 체이닝을 활용한 프로젝트 기획 프롬프트 시리즈 작성 | 고급 기법 실습 | 역할 간 연결 자연스러움 |

### 고급 실습 (Level 3)

| # | 과제 | 목표 | 평가 포인트 |
|---|------|------|-----------|
| 1 | 동료의 프롬프트를 SCORE 기준으로 평가하고 피드백 문서 작성 | 평가 능력 | 기준별 구체적 점수와 근거 |
| 2 | 특정 업무를 위한 재사용 가능한 프롬프트 템플릿 3개 설계 | 템플릿 설계 | 범용성, 커스터마이즈 용이성 |
| 3 | 메타 프롬프팅을 활용하여 자신의 프롬프트를 3회 반복 개선 | 반복 정제 | 각 라운드별 개선 폭 |

### 팀 실습 과제

| 과제명 | 인원 | 시간 | 내용 |
|--------|------|------|------|
| 프롬프트 배틀 | 2인 | 30분 | 같은 과제를 각자 프롬프트로 작성 → 결과 비교 → 상호 평가 |
| 릴레이 개선 | 3-4인 | 45분 | 한 명이 초안 작성 → 다음 사람이 개선 → 최종 점수 측정 |
| 프롬프트 해커톤 | 4-6인 | 2시간 | 실제 업무 시나리오 3개를 프롬프트로 해결 → 팀별 발표 |
| 평가 워크숍 | 전체 | 1시간 | 수집된 프롬프트를 SCORE 루브릭으로 그룹 평가 |

### 실습 평가 기준

| 등급 | 조건 | 역량 수준 |
|------|------|----------|
| Master | 모든 실습 SCORE 90+ 달성 | 프롬프트 코치/멘토 가능 |
| Expert | Level 3 실습 SCORE 85+ 달성 | 팀 내 프롬프트 리더 |
| Advanced | Level 2 실습 SCORE 80+ 달성 | 독립적 프롬프트 작성 가능 |
| Intermediate | Level 1 실습 SCORE 70+ 달성 | 기본 프롬프트 작성 가능 |
| Beginner | Level 1 실습 진행 중 | 학습 초기 단계 |

> 실습은 혼자보다 동료와 함께할 때 더 빠르게 성장합니다. 팀 실습을 적극 활용하세요.`,
      contentEn: `Step-by-step practice exercises to improve prompt writing skills.

### Beginner Exercises (Level 1)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Write a "self-introduction" prompt scoring SCORE 80+ | Specificity + context practice | Target company, position, tone specified |
| 2 | Find 3 bad prompts and write improved versions | Comparative analysis ability | Before/After score difference |
| 3 | Write the same request using both Zero-shot and Few-shot | Understand technique differences | Result quality comparison |

### Intermediate Exercises (Level 2)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Convert one business scenario into Word, Excel, PowerPoint prompts | Environment-specific skills | Instructions matching each app |
| 2 | Write a code debugging prompt using Chain-of-Thought | CoT technique practice | Logical step separation |
| 3 | Write a project planning prompt series using persona chaining | Advanced technique practice | Natural connections between roles |

### Advanced Exercises (Level 3)

| # | Exercise | Goal | Evaluation Points |
|---|----------|------|-------------------|
| 1 | Evaluate a colleague's prompt using SCORE criteria and write feedback | Evaluation ability | Specific scores and justification per criterion |
| 2 | Design 3 reusable prompt templates for specific tasks | Template design | Versatility, ease of customization |
| 3 | Use meta prompting to iteratively improve your prompt 3 times | Iterative refinement | Improvement margin per round |

### Team Practice Exercises

| Exercise | People | Time | Description |
|----------|--------|------|-------------|
| Prompt Battle | 2 | 30 min | Each writes prompt for same task → Compare results → Mutual evaluation |
| Relay Improvement | 3-4 | 45 min | One writes draft → Next person improves → Measure final score |
| Prompt Hackathon | 4-6 | 2 hours | Solve 3 real work scenarios with prompts → Team presentations |
| Evaluation Workshop | All | 1 hour | Group evaluate collected prompts using SCORE rubric |

### Practice Evaluation Criteria

| Grade | Condition | Competency Level |
|-------|-----------|-----------------|
| Master | All exercises SCORE 90+ | Prompt coach/mentor capable |
| Expert | Level 3 exercises SCORE 85+ | Team prompt leader |
| Advanced | Level 2 exercises SCORE 80+ | Independent prompt writing |
| Intermediate | Level 1 exercises SCORE 70+ | Basic prompt writing |
| Beginner | Working on Level 1 | Early learning stage |

> Practice grows faster with colleagues than alone. Actively use team exercises.`,
    },
  ],
};
