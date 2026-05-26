export default {
  id: 'prompt-basics',
  icon: 'fa-lightbulb',
  title: '프롬프트 기초',
  titleEn: 'Prompt Fundamentals',
  sections: [
    {
      title: '프롬프트란 무엇인가',
      titleEn: 'What is a Prompt',
      content: `AI 모델에게 원하는 결과를 얻기 위해 전달하는 입력 텍스트를 **프롬프트(Prompt)**라고 합니다.

### 프롬프트의 정의

프롬프트는 단순한 질문이 아니라, AI와의 **소통 인터페이스**입니다. 좋은 프롬프트는 명확한 지시, 충분한 맥락, 원하는 출력 형식을 포함합니다.

### 프롬프트의 4대 구성요소

| 구성요소 | 설명 | 예시 |
|---------|------|------|
| **역할(Role)** | AI에게 부여할 전문가 역할 | "당신은 시니어 프로젝트 매니저입니다" |
| **맥락(Context)** | 배경 정보 및 상황 설명 | "팀원 5명의 신규 웹 프로젝트에서..." |
| **지시(Instruction)** | 수행할 구체적 작업 | "프로젝트 일정표를 작성해주세요" |
| **출력형식(Format)** | 원하는 응답 형태 | "표 형식으로, 주차별로 구분하여" |

### Copilot에서의 프롬프트 유형

| 유형 | 사용 환경 | 특징 |
|------|----------|------|
| 코드 프롬프트 | GitHub Copilot (IDE) | 주석, 함수명으로 코드 생성 유도 |
| 채팅 프롬프트 | Copilot Chat | 자연어 대화로 질문/요청 |
| 업무 프롬프트 | M365 Copilot | Word, Excel 등에서 문서 작업 지시 |
| 자동화 프롬프트 | Power Platform | 워크플로우/앱 생성 지시 |

> 좋은 프롬프트의 핵심은 **구체성**, **명확성**, **맥락 제공** 세 가지입니다.`,
      contentEn: `The input text you provide to an AI model to get desired results is called a **Prompt**.

### Definition of a Prompt

A prompt is not just a simple question — it's a **communication interface** with AI. Good prompts include clear instructions, sufficient context, and desired output format.

### Four Core Components of a Prompt

| Component | Description | Example |
|-----------|-------------|---------|
| **Role** | Expert role assigned to AI | "You are a senior project manager" |
| **Context** | Background information and situation | "In a new web project with 5 team members..." |
| **Instruction** | Specific task to perform | "Create a project schedule" |
| **Format** | Desired response format | "In table format, organized by week" |

### Prompt Types in Copilot

| Type | Environment | Characteristics |
|------|-------------|-----------------|
| Code Prompts | GitHub Copilot (IDE) | Guide code generation via comments, function names |
| Chat Prompts | Copilot Chat | Natural language Q&A |
| Work Prompts | M365 Copilot | Document tasks in Word, Excel, etc. |
| Automation Prompts | Power Platform | Workflow/app creation instructions |

> The keys to good prompts are **specificity**, **clarity**, and **context**.`,
    },
    {
      title: '프롬프트 작성 원칙',
      titleEn: 'Prompt Writing Principles',
      content: `효과적인 프롬프트를 작성하기 위한 핵심 원칙을 알아봅니다.

### CLEAR 프레임워크

| 원칙 | 설명 | 실천 방법 |
|------|------|----------|
| **C**oncise (간결) | 불필요한 표현 제거 | 핵심 키워드 중심으로 작성 |
| **L**ogical (논리적) | 단계적·구조적 지시 | 번호 매기기, 순서 지정 |
| **E**xplicit (명시적) | 모호함 배제 | 구체적 수치, 범위 지정 |
| **A**daptive (적응적) | 결과 기반 반복 개선 | 출력 확인 후 프롬프트 조정 |
| **R**ole-based (역할 기반) | 전문가 역할 부여 | "~의 관점에서" 지정 |

### 좋은 프롬프트 vs 나쁜 프롬프트

| 구분 | 나쁜 예시 | 좋은 예시 |
|------|----------|----------|
| 코드 작성 | "로그인 만들어줘" | "React + TypeScript로 이메일/비밀번호 로그인 폼을 만들어줘. Supabase Auth를 사용하고, 유효성 검사를 포함해줘" |
| 문서 요약 | "이거 요약해줘" | "이 보고서를 경영진 대상 브리핑용으로 3개 핵심 포인트와 1개 액션 아이템으로 요약해줘" |
| 데이터 분석 | "데이터 분석해줘" | "지난 6개월 매출 데이터에서 월별 성장률을 계산하고, 하락 추세가 있는 제품군을 차트로 시각화해줘" |
| 이메일 작성 | "이메일 써줘" | "고객에게 납기 지연을 알리는 공식 이메일을 작성해줘. 사과 + 새 일정 + 보상안을 포함하고, 전문적이고 진지한 톤으로" |

### 프롬프트 개선 체크리스트

| 체크 항목 | 설명 |
|----------|------|
| 목적이 명확한가? | 무엇을 얻고 싶은지 분명히 명시 |
| 맥락이 충분한가? | 배경 정보, 대상, 용도 포함 |
| 제약 조건이 있는가? | 글자 수, 형식, 스타일 지정 |
| 출력 형식을 지정했는가? | 표, 목록, 코드 등 원하는 형태 |
| 예시를 제공했는가? | 원하는 결과의 샘플 포함 |

> 프롬프트 작성은 "한 번에 완벽하게"가 아니라 "반복적으로 개선"하는 과정입니다.`,
      contentEn: `Learn the core principles for writing effective prompts.

### CLEAR Framework

| Principle | Description | Practice |
|-----------|-------------|----------|
| **C**oncise | Remove unnecessary expressions | Focus on key terms |
| **L**ogical | Step-by-step, structured instructions | Use numbering, specify order |
| **E**xplicit | Eliminate ambiguity | Specify exact numbers, ranges |
| **A**daptive | Iterative improvement based on results | Adjust prompt after checking output |
| **R**ole-based | Assign expert roles | Specify "from the perspective of..." |

### Good Prompts vs Bad Prompts

| Category | Bad Example | Good Example |
|----------|------------|--------------|
| Code | "Make a login" | "Create an email/password login form with React + TypeScript. Use Supabase Auth and include validation" |
| Summary | "Summarize this" | "Summarize this report for an executive briefing with 3 key points and 1 action item" |
| Analysis | "Analyze the data" | "Calculate monthly growth rates from the last 6 months of sales data and visualize product lines with declining trends in a chart" |
| Email | "Write an email" | "Write a formal email notifying a customer of a delivery delay. Include apology + new schedule + compensation, in a professional and sincere tone" |

### Prompt Improvement Checklist

| Check Item | Description |
|-----------|-------------|
| Is the purpose clear? | Clearly state what you want to achieve |
| Is context sufficient? | Include background, audience, use case |
| Are there constraints? | Specify word count, format, style |
| Is output format specified? | Table, list, code, etc. |
| Are examples provided? | Include samples of desired output |

> Prompt writing is not about "getting it perfect the first time" but about "iterative improvement."`,
    },
  ],
};
