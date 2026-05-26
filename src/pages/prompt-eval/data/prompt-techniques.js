export default {
  id: 'prompt-techniques',
  icon: 'fa-wand-magic-sparkles',
  title: '프롬프트 기법',
  titleEn: 'Prompt Techniques',
  sections: [
    {
      title: '핵심 프롬프트 기법',
      titleEn: 'Core Prompt Techniques',
      content: `AI에서 효과적으로 사용되는 핵심 프롬프트 기법들을 소개합니다.

### 주요 프롬프트 기법 비교

| 기법 | 설명 | 난이도 | 효과 |
|------|------|--------|------|
| Zero-shot | 예시 없이 바로 지시 | 쉬움 | 보통 |
| Few-shot | 2-3개 예시를 포함하여 지시 | 보통 | 높음 |
| Chain-of-Thought | 단계별 사고 과정을 유도 | 보통 | 높음 |
| Role Prompting | 전문가 역할을 부여 | 쉬움 | 높음 |
| Template Prompting | 미리 정한 틀에 맞춰 요청 | 쉬움 | 높음 |
| Tree-of-Thought | 여러 사고 경로를 탐색 | 어려움 | 매우 높음 |

### 1. Zero-shot 프롬프팅

예시 없이 직접 지시하는 가장 기본적인 기법입니다.

| 상황 | 프롬프트 |
|------|---------|
| 번역 | "다음 문장을 영어로 번역해주세요: 오늘 회의 자료를 준비했습니다" |
| 분류 | "다음 이메일이 스팸인지 정상인지 분류해주세요: ..." |
| 요약 | "다음 기사를 3줄로 요약해주세요: ..." |

### 2. Few-shot 프롬프팅

예시를 제공하여 패턴을 학습시키는 기법입니다.

| 구분 | 내용 |
|------|------|
| 예시 1 | 입력: "이 제품 정말 좋아요!" → 감정: 긍정 |
| 예시 2 | 입력: "배송이 너무 느려요" → 감정: 부정 |
| 예시 3 | 입력: "보통이에요, 그냥 그래요" → 감정: 중립 |
| **실제 요청** | 입력: "가격 대비 품질이 뛰어납니다" → 감정: ? |

### 3. Chain-of-Thought (CoT)

단계별 사고 과정을 명시적으로 유도하는 기법입니다.

| 일반 프롬프트 | CoT 프롬프트 |
|-------------|------------|
| "이 코드의 버그를 찾아줘" | "이 코드를 분석해줘: 1) 먼저 각 함수의 역할을 파악하고, 2) 데이터 흐름을 추적하고, 3) 잠재적 에러 포인트를 식별하고, 4) 버그의 원인과 해결책을 제시해줘" |
| "마케팅 전략을 세워줘" | "마케팅 전략을 단계별로 수립해줘: 1) 현재 시장 상황 분석, 2) 목표 고객 정의, 3) 경쟁사 대비 차별점 도출, 4) 채널별 전략 수립, 5) KPI 설정" |

### 4. Role Prompting

| 역할 | 프롬프트 시작 | 효과 |
|------|-------------|------|
| 코드 리뷰어 | "당신은 10년 경력의 시니어 개발자입니다" | 코드 품질, 보안, 성능 관점의 리뷰 |
| 비즈니스 컨설턴트 | "당신은 McKinsey 출신 경영 컨설턴트입니다" | 전략적, 구조화된 비즈니스 분석 |
| UX 디자이너 | "당신은 사용자 중심 설계 전문가입니다" | 사용성, 접근성 관점의 피드백 |
| 데이터 사이언티스트 | "당신은 통계학 박사 데이터 분석가입니다" | 데이터 기반의 인사이트 도출 |

> 상황에 따라 여러 기법을 조합하면 더 좋은 결과를 얻을 수 있습니다.`,
      contentEn: `Introducing core prompt techniques effectively used with AI.

### Major Prompt Techniques Comparison

| Technique | Description | Difficulty | Effectiveness |
|-----------|-------------|-----------|---------------|
| Zero-shot | Direct instruction without examples | Easy | Moderate |
| Few-shot | Instructions with 2-3 examples | Medium | High |
| Chain-of-Thought | Guide step-by-step reasoning | Medium | High |
| Role Prompting | Assign expert roles | Easy | High |
| Template Prompting | Request within predefined templates | Easy | High |
| Tree-of-Thought | Explore multiple reasoning paths | Hard | Very High |

### 1. Zero-shot Prompting

The most basic technique — direct instruction without examples.

| Situation | Prompt |
|-----------|--------|
| Translation | "Translate the following sentence to Korean: I prepared today's meeting materials" |
| Classification | "Classify whether this email is spam or legitimate: ..." |
| Summarization | "Summarize this article in 3 sentences: ..." |

### 2. Few-shot Prompting

Provide examples to teach patterns.

| Type | Content |
|------|---------|
| Example 1 | Input: "I love this product!" → Sentiment: Positive |
| Example 2 | Input: "Shipping is too slow" → Sentiment: Negative |
| Example 3 | Input: "It's okay, nothing special" → Sentiment: Neutral |
| **Actual Request** | Input: "Excellent quality for the price" → Sentiment: ? |

### 3. Chain-of-Thought (CoT)

Explicitly guide step-by-step reasoning.

| Regular Prompt | CoT Prompt |
|---------------|-----------|
| "Find the bug in this code" | "Analyze this code: 1) First identify each function's role, 2) Trace the data flow, 3) Identify potential error points, 4) Present the bug cause and solution" |
| "Create a marketing strategy" | "Develop a marketing strategy step by step: 1) Current market analysis, 2) Define target customers, 3) Identify differentiators vs competitors, 4) Channel-specific strategies, 5) Set KPIs" |

### 4. Role Prompting

| Role | Prompt Start | Effect |
|------|-------------|--------|
| Code Reviewer | "You are a senior developer with 10 years of experience" | Review focusing on quality, security, performance |
| Business Consultant | "You are a McKinsey management consultant" | Strategic, structured business analysis |
| UX Designer | "You are a user-centered design expert" | Usability and accessibility feedback |
| Data Scientist | "You are a PhD statistician and data analyst" | Data-driven insights |

> Combining multiple techniques based on the situation yields better results.`,
    },
    {
      title: 'Copilot 환경별 기법',
      titleEn: 'Copilot-Specific Techniques',
      content: `각 Copilot 환경에 최적화된 프롬프트 작성 기법입니다.

### GitHub Copilot 프롬프트 기법

**1. 주석 기반 코드 생성**

| 기법 | 예시 |
|------|------|
| 함수 목적 주석 | \`// 이메일 형식 유효성 검사 함수\` |
| JSDoc 스타일 | \`/** @param {string} email @returns {boolean} */\` |
| 단계별 주석 | \`// Step 1: 이메일 형식 검증 → Step 2: 도메인 확인 → Step 3: 결과 반환\` |
| TODO 활용 | \`// TODO: 에러 핸들링 추가 - try/catch로 네트워크 에러 처리\` |

**2. Chat 슬래시 명령어 활용**

| 명령어 | 용도 | 예시 |
|--------|------|------|
| /explain | 코드 설명 요청 | "/explain 이 정규식의 동작 원리" |
| /fix | 버그 수정 요청 | "/fix TypeError가 발생하는 원인과 해결책" |
| /tests | 테스트 생성 | "/tests 이 함수의 유닛 테스트 작성" |
| /doc | 문서화 | "/doc 이 클래스의 JSDoc 문서 생성" |

### M365 Copilot 프롬프트 기법

**Word에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 문서 초안 | "[대상]을 위한 [목적]에 대한 [문서 유형]을 [톤]으로 작성해줘" |
| 문서 요약 | "이 문서를 [대상]이 이해할 수 있도록 [길이]로 요약해줘. [핵심 관점] 중심으로" |
| 문서 개선 | "이 문서의 [측면]을 개선해줘. [구체적 지시]를 적용하여" |

**Excel에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 데이터 분석 | "[데이터]에서 [분석 목표]를 [방법]으로 분석해줘" |
| 수식 생성 | "[조건]을 만족하는 [계산]을 수행하는 수식을 만들어줘" |
| 차트 생성 | "[데이터 범위]를 [차트 유형]으로 시각화해줘. [강조 포인트] 중심으로" |

**PowerPoint에서의 효과적 프롬프트**

| 목적 | 프롬프트 패턴 |
|------|-------------|
| 프레젠테이션 생성 | "[주제]에 대한 [슬라이드 수]장의 프레젠테이션을 만들어줘. 대상: [청중]" |
| 슬라이드 디자인 | "이 슬라이드를 [스타일]로 재디자인해줘. [레이아웃 지시]" |
| 발표 노트 | "각 슬라이드에 [시간]분 분량의 발표 노트를 추가해줘" |

### Power Platform 프롬프트 기법

| 도구 | 프롬프트 패턴 | 예시 |
|------|-------------|------|
| Power Automate | "[트리거] 시 [액션]을 수행하는 플로우" | "새 이메일 수신 시 첨부파일을 SharePoint에 저장하는 플로우를 만들어줘" |
| Power Apps | "[기능]을 가진 [대상]용 앱" | "영업팀이 고객 방문 기록을 입력하고 조회할 수 있는 모바일 앱을 만들어줘" |
| Copilot Studio | "[목적]을 수행하는 봇" | "직원들의 연차/경조사 신청을 처리하는 HR 봇을 만들어줘" |

> 각 환경의 고유한 기능과 제약을 이해하면 더 효과적인 프롬프트를 작성할 수 있습니다.`,
      contentEn: `Prompt writing techniques optimized for each Copilot environment.

### GitHub Copilot Prompt Techniques

**1. Comment-Based Code Generation**

| Technique | Example |
|-----------|---------|
| Function purpose comment | \`// Email format validation function\` |
| JSDoc style | \`/** @param {string} email @returns {boolean} */\` |
| Step-by-step comments | \`// Step 1: Validate email format → Step 2: Check domain → Step 3: Return result\` |
| TODO usage | \`// TODO: Add error handling - handle network errors with try/catch\` |

**2. Chat Slash Commands**

| Command | Purpose | Example |
|---------|---------|---------|
| /explain | Request code explanation | "/explain how this regex works" |
| /fix | Request bug fix | "/fix the cause and solution for this TypeError" |
| /tests | Generate tests | "/tests write unit tests for this function" |
| /doc | Documentation | "/doc generate JSDoc documentation for this class" |

### M365 Copilot Prompt Techniques

**Effective Prompts in Word**

| Purpose | Prompt Pattern |
|---------|---------------|
| Draft document | "Write a [document type] about [purpose] for [audience] in [tone]" |
| Summarize | "Summarize this document in [length] for [audience] to understand, focusing on [key perspective]" |
| Improve | "Improve the [aspect] of this document by applying [specific instructions]" |

**Effective Prompts in Excel**

| Purpose | Prompt Pattern |
|---------|---------------|
| Data analysis | "Analyze [data] for [analysis goal] using [method]" |
| Formula creation | "Create a formula that performs [calculation] satisfying [conditions]" |
| Chart creation | "Visualize [data range] as [chart type], focusing on [emphasis points]" |

**Effective Prompts in PowerPoint**

| Purpose | Prompt Pattern |
|---------|---------------|
| Create presentation | "Create a [slide count]-slide presentation about [topic]. Audience: [audience]" |
| Slide design | "Redesign this slide in [style]. [Layout instructions]" |
| Speaker notes | "Add [time]-minute speaker notes to each slide" |

### Power Platform Prompt Techniques

| Tool | Prompt Pattern | Example |
|------|---------------|---------|
| Power Automate | "A flow that performs [action] when [trigger]" | "Create a flow that saves attachments to SharePoint when a new email is received" |
| Power Apps | "An app for [audience] with [features]" | "Create a mobile app for the sales team to log and view customer visit records" |
| Copilot Studio | "A bot that performs [purpose]" | "Create an HR bot that handles employee leave and event requests" |

> Understanding each environment's unique features and constraints helps write more effective prompts.`,
    },
    {
      title: '고급 프롬프트 전략',
      titleEn: 'Advanced Prompt Strategies',
      content: `전문가 수준의 고급 프롬프트 전략입니다.

### 메타 프롬프팅

AI에게 프롬프트 자체를 개선하도록 요청하는 전략입니다.

| 단계 | 메타 프롬프트 |
|------|-------------|
| 분석 요청 | "내가 작성한 다음 프롬프트를 분석해줘: [프롬프트]" |
| 개선 요청 | "이 프롬프트의 약점을 3가지 찾고, 개선된 버전을 작성해줘" |
| 비교 요청 | "원본과 개선 버전의 예상 결과 차이를 설명해줘" |

### 페르소나 체이닝

여러 전문가 역할을 순차적으로 활용하는 전략입니다.

| 단계 | 페르소나 | 작업 |
|------|---------|------|
| 1단계 | 비즈니스 분석가 | 요구사항 정의 및 범위 설정 |
| 2단계 | 시스템 아키텍트 | 기술 구조 및 설계 결정 |
| 3단계 | 시니어 개발자 | 코드 구현 및 최적화 |
| 4단계 | QA 엔지니어 | 테스트 케이스 및 검증 |
| 5단계 | 테크니컬 라이터 | 문서화 및 가이드 작성 |

### 제약 기반 프롬프팅

의도적으로 제약 조건을 추가하여 결과 품질을 높이는 전략입니다.

| 제약 유형 | 예시 | 효과 |
|----------|------|------|
| 길이 제약 | "200자 이내로 작성" | 핵심만 추출 |
| 난이도 제약 | "중학생이 이해할 수준으로" | 명확한 설명 |
| 형식 제약 | "반드시 표 형식으로만" | 구조화된 결과 |
| 금지 제약 | "전문 용어 사용 금지" | 접근성 향상 |
| 시간 제약 | "5분 안에 발표할 수 있는 분량" | 핵심 압축 |

### 반복 정제 (Iterative Refinement)

| 라운드 | 프롬프트 전략 | 목적 |
|--------|-------------|------|
| 1차 | 넓은 범위로 초안 요청 | 전체 구조 파악 |
| 2차 | 부족한 부분 구체화 요청 | 깊이 보강 |
| 3차 | 특정 섹션 집중 개선 | 품질 향상 |
| 4차 | 전체 일관성 검토 요청 | 최종 정제 |

### 프롬프트 템플릿 라이브러리

**코드 리뷰 템플릿**

| 항목 | 내용 |
|------|------|
| 역할 | "시니어 [언어/프레임워크] 개발자로서" |
| 관점 | "보안, 성능, 가독성, 유지보수성 관점에서" |
| 형식 | "각 항목별로 심각도(높/중/낮)와 개선 코드를 제시하고" |
| 제약 | "긍정적 피드백도 1개 이상 포함해줘" |

**비즈니스 보고서 템플릿**

| 항목 | 내용 |
|------|------|
| 역할 | "[산업] 분야의 비즈니스 애널리스트로서" |
| 구조 | "Executive Summary → 현황 분석 → 핵심 발견 → 제안 → 다음 단계" |
| 형식 | "각 섹션별 2-3문장, 핵심 수치는 볼드 처리" |
| 톤 | "경영진 대상, 전문적이지만 이해하기 쉽게" |

> 고급 전략은 기본 기법을 충분히 익힌 후 활용하면 더욱 효과적입니다.`,
      contentEn: `Expert-level advanced prompt strategies.

### Meta Prompting

A strategy where you ask AI to improve the prompt itself.

| Step | Meta Prompt |
|------|------------|
| Analysis Request | "Analyze the following prompt I wrote: [prompt]" |
| Improvement Request | "Find 3 weaknesses in this prompt and write an improved version" |
| Comparison Request | "Explain the expected result differences between original and improved versions" |

### Persona Chaining

A strategy that sequentially utilizes multiple expert roles.

| Step | Persona | Task |
|------|---------|------|
| Step 1 | Business Analyst | Define requirements and scope |
| Step 2 | System Architect | Technical structure and design decisions |
| Step 3 | Senior Developer | Code implementation and optimization |
| Step 4 | QA Engineer | Test cases and verification |
| Step 5 | Technical Writer | Documentation and guide creation |

### Constraint-Based Prompting

A strategy that intentionally adds constraints to improve result quality.

| Constraint Type | Example | Effect |
|----------------|---------|--------|
| Length | "Write within 200 characters" | Extract essentials only |
| Difficulty | "At a level a middle schooler can understand" | Clear explanation |
| Format | "Must be in table format only" | Structured results |
| Prohibition | "No technical jargon" | Improved accessibility |
| Time | "Content suitable for a 5-minute presentation" | Core compression |

### Iterative Refinement

| Round | Prompt Strategy | Purpose |
|-------|----------------|---------|
| 1st | Request broad draft | Understand overall structure |
| 2nd | Request specifics for weak areas | Depth reinforcement |
| 3rd | Focus on improving specific sections | Quality enhancement |
| 4th | Request overall consistency review | Final refinement |

### Prompt Template Library

**Code Review Template**

| Item | Content |
|------|---------|
| Role | "As a senior [language/framework] developer" |
| Perspective | "From security, performance, readability, maintainability perspectives" |
| Format | "Present severity (high/medium/low) and improved code for each item" |
| Constraint | "Include at least 1 positive feedback" |

**Business Report Template**

| Item | Content |
|------|---------|
| Role | "As a business analyst in the [industry] field" |
| Structure | "Executive Summary → Current Analysis → Key Findings → Recommendations → Next Steps" |
| Format | "2-3 sentences per section, bold key figures" |
| Tone | "For executives, professional but easy to understand" |

> Advanced strategies are most effective when applied after mastering fundamental techniques.`,
    },
  ],
};
