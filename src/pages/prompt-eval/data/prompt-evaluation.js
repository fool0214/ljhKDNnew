export default {
  id: 'prompt-evaluation',
  icon: 'fa-clipboard-check',
  title: '평가 기준 & 루브릭',
  titleEn: 'Evaluation Criteria & Rubrics',
  sections: [
    {
      title: '프롬프트 평가 기준',
      titleEn: 'Prompt Evaluation Criteria',
      content: `프롬프트의 품질을 객관적으로 평가하기 위한 5대 평가 기준입니다.

### 5대 평가 기준 (SCORE)

| 기준 | 약자 | 설명 | 배점 |
|------|------|------|------|
| **구체성** (Specificity) | S | 요청이 구체적이고 명확한가 | 20점 |
| **맥락** (Context) | C | 충분한 배경 정보를 제공했는가 | 20점 |
| **출력지정** (Output) | O | 원하는 결과 형식을 명시했는가 | 20점 |
| **역할부여** (Role) | R | 적절한 전문가 역할을 지정했는가 | 20점 |
| **효과성** (Effectiveness) | E | 실제로 원하는 결과를 얻었는가 | 20점 |

### 평가 등급 체계

| 등급 | 점수 범위 | 설명 |
|------|----------|------|
| S (탁월) | 90-100 | 모든 요소가 완벽하게 갖춰진 프롬프트 |
| A (우수) | 80-89 | 대부분의 요소가 잘 갖춰진 프롬프트 |
| B (보통) | 70-79 | 기본 요소는 있으나 개선 여지가 있음 |
| C (미흡) | 60-69 | 핵심 요소가 부족하여 결과가 불만족 |
| D (부족) | 0-59 | 프롬프트로서 기본 기능을 하지 못함 |

### 기준별 세부 평가 항목

**S - 구체성 (Specificity)**

| 점수 | 수준 | 설명 |
|------|------|------|
| 17-20 | 탁월 | 정확한 수치, 범위, 조건이 모두 명시됨 |
| 13-16 | 우수 | 대부분 구체적이나 일부 모호한 부분 존재 |
| 9-12 | 보통 | 기본적인 요청은 명확하나 세부 사항 부족 |
| 5-8 | 미흡 | 막연한 요청으로 해석의 여지가 큼 |
| 0-4 | 부족 | 무엇을 요청하는지 파악이 어려움 |

**C - 맥락 (Context)**

| 점수 | 수준 | 설명 |
|------|------|------|
| 17-20 | 탁월 | 배경, 대상, 용도, 제약조건이 모두 포함 |
| 13-16 | 우수 | 핵심 맥락은 있으나 일부 정보 누락 |
| 9-12 | 보통 | 기본 배경만 제공, 추가 맥락 필요 |
| 5-8 | 미흡 | 맥락이 거의 없어 AI가 추측해야 함 |
| 0-4 | 부족 | 맥락 정보가 전혀 없음 |

> SCORE 평가 모델을 활용하면 프롬프트 품질을 체계적으로 측정하고 개선할 수 있습니다.`,
      contentEn: `Five key evaluation criteria for objectively assessing prompt quality.

### 5 Evaluation Criteria (SCORE)

| Criterion | Code | Description | Points |
|-----------|------|-------------|--------|
| **Specificity** | S | Is the request specific and clear? | 20 |
| **Context** | C | Is sufficient background information provided? | 20 |
| **Output** | O | Is the desired result format specified? | 20 |
| **Role** | R | Is an appropriate expert role assigned? | 20 |
| **Effectiveness** | E | Does it actually produce the desired result? | 20 |

### Grading System

| Grade | Score Range | Description |
|-------|-----------|-------------|
| S (Excellent) | 90-100 | All elements perfectly covered |
| A (Great) | 80-89 | Most elements well covered |
| B (Average) | 70-79 | Basic elements present but room for improvement |
| C (Below Average) | 60-69 | Key elements lacking, unsatisfactory results |
| D (Poor) | 0-59 | Fails to function as a proper prompt |

### Detailed Evaluation Items by Criterion

**S - Specificity**

| Score | Level | Description |
|-------|-------|-------------|
| 17-20 | Excellent | Exact numbers, ranges, and conditions all specified |
| 13-16 | Great | Mostly specific with minor ambiguities |
| 9-12 | Average | Basic request is clear but lacks details |
| 5-8 | Below Average | Vague request with much room for interpretation |
| 0-4 | Poor | Difficult to understand what is being requested |

**C - Context**

| Score | Level | Description |
|-------|-------|-------------|
| 17-20 | Excellent | Background, audience, purpose, constraints all included |
| 13-16 | Great | Core context present but some info missing |
| 9-12 | Average | Only basic background provided, needs more context |
| 5-8 | Below Average | Almost no context, AI must guess |
| 0-4 | Poor | No context information at all |

> Using the SCORE evaluation model allows systematic measurement and improvement of prompt quality.`,
    },
    {
      title: '평가 루브릭 & 채점표',
      titleEn: 'Rubric & Scoring Sheet',
      content: `실무에서 바로 사용할 수 있는 프롬프트 평가 루브릭과 채점표입니다.

### 종합 평가 루브릭

| 평가 영역 | 탁월 (5점) | 우수 (4점) | 보통 (3점) | 미흡 (2점) | 부족 (1점) |
|----------|-----------|-----------|-----------|-----------|-----------|
| 목적 명확성 | 목표가 구체적이고 측정 가능 | 목표가 명확함 | 목표가 있으나 모호 | 목표가 불분명 | 목표 없음 |
| 맥락 제공 | 완벽한 배경 정보 | 핵심 맥락 포함 | 기본 맥락만 제공 | 맥락 부족 | 맥락 없음 |
| 구조 & 형식 | 체계적 구조 + 형식 지정 | 구조적 + 일부 형식 | 기본 구조 있음 | 구조 미흡 | 비구조적 |
| 제약 조건 | 범위, 길이, 톤 등 명시 | 주요 제약 포함 | 일부 제약 있음 | 제약 부족 | 제약 없음 |
| 예시 & 참고 | 구체적 예시 + 참고자료 | 예시 포함 | 간단한 참고 | 예시 부족 | 예시 없음 |

### Copilot 환경별 특화 기준

**GitHub Copilot (코드)**

| 항목 | 평가 내용 | 비중 |
|------|----------|------|
| 주석 품질 | 함수 목적, 매개변수, 반환값 설명 | 25% |
| 네이밍 | 의미 있는 함수명/변수명 사용 | 20% |
| 컨텍스트 파일 | 관련 파일/타입 import 유무 | 20% |
| 테스트 케이스 | 엣지 케이스 포함 여부 | 15% |
| 단계적 분해 | 복잡한 작업의 단계 구분 | 20% |

**M365 Copilot (업무)**

| 항목 | 평가 내용 | 비중 |
|------|----------|------|
| 작업 목적 | 문서/분석의 목적 명시 | 25% |
| 대상 독자 | 결과물의 수신자/활용자 | 20% |
| 톤 & 스타일 | 공식/비공식, 전문적/친근 | 15% |
| 분량 & 형식 | 길이, 구조, 시각적 요소 | 20% |
| 참고 자료 | 활용할 데이터/문서 명시 | 20% |

### 채점 예시

**프롬프트**: "React로 할 일 목록 앱 만들어줘"

| 평가 기준 | 점수 | 이유 |
|----------|------|------|
| 구체성 (S) | 8/20 | 기본 요구만 있고 세부 기능 미지정 |
| 맥락 (C) | 4/20 | 프로젝트 배경, 사용 환경 미제공 |
| 출력지정 (O) | 6/20 | "앱"이라는 큰 범위만 지정 |
| 역할부여 (R) | 0/20 | 역할 미지정 |
| 효과성 (E) | 8/20 | 기본 기능만 생성 가능 |
| **총점** | **26/100** | **등급: D (부족)** |

**개선된 프롬프트**: "시니어 React 개발자로서, TypeScript + Zustand 상태관리를 사용한 할 일 목록 앱을 만들어줘. 기능: 추가/삭제/완료처리/필터(전체·미완료·완료). localStorage 영속성 포함. 컴포넌트는 TodoInput, TodoList, TodoItem, FilterBar로 분리해줘."

| 평가 기준 | 점수 | 이유 |
|----------|------|------|
| 구체성 (S) | 18/20 | 기능, 컴포넌트 구조까지 명확 |
| 맥락 (C) | 14/20 | 기술 스택 명시 (배경은 약간 부족) |
| 출력지정 (O) | 16/20 | 컴포넌트 구조 지정 |
| 역할부여 (R) | 18/20 | 시니어 React 개발자 역할 |
| 효과성 (E) | 17/20 | 원하는 결과를 높은 확률로 달성 |
| **총점** | **83/100** | **등급: A (우수)** |

> 같은 주제라도 프롬프트 품질에 따라 결과물의 수준이 극적으로 달라집니다.`,
      contentEn: `Ready-to-use prompt evaluation rubrics and scoring sheets for practical use.

### Comprehensive Evaluation Rubric

| Area | Excellent (5) | Great (4) | Average (3) | Below Avg (2) | Poor (1) |
|------|-------------|----------|-----------|-------------|---------|
| Purpose Clarity | Specific & measurable goal | Clear goal | Goal exists but vague | Unclear goal | No goal |
| Context | Complete background info | Core context included | Basic context only | Lacking context | No context |
| Structure & Format | Systematic + format specified | Structured + some format | Basic structure | Poor structure | Unstructured |
| Constraints | Scope, length, tone specified | Key constraints included | Some constraints | Few constraints | No constraints |
| Examples & Refs | Specific examples + references | Examples included | Simple references | Lacking examples | No examples |

### Environment-Specific Criteria

**GitHub Copilot (Code)**

| Item | Evaluation Content | Weight |
|------|-------------------|--------|
| Comment Quality | Function purpose, params, return value | 25% |
| Naming | Meaningful function/variable names | 20% |
| Context Files | Related file/type imports | 20% |
| Test Cases | Edge case coverage | 15% |
| Step Decomposition | Breaking complex tasks into steps | 20% |

**M365 Copilot (Business)**

| Item | Evaluation Content | Weight |
|------|-------------------|--------|
| Task Purpose | Document/analysis purpose specified | 25% |
| Target Audience | Result recipients/users | 20% |
| Tone & Style | Formal/informal, professional/friendly | 15% |
| Volume & Format | Length, structure, visual elements | 20% |
| References | Data/documents to use | 20% |

### Scoring Example

**Prompt**: "Make a to-do list app with React"

| Criterion | Score | Reason |
|-----------|-------|--------|
| Specificity (S) | 8/20 | Only basic request, no detailed features |
| Context (C) | 4/20 | No project background or environment |
| Output (O) | 6/20 | Only "app" as broad scope |
| Role (R) | 0/20 | No role assigned |
| Effectiveness (E) | 8/20 | Only basic functionality possible |
| **Total** | **26/100** | **Grade: D (Poor)** |

**Improved Prompt**: "As a senior React developer, create a to-do list app using TypeScript + Zustand state management. Features: add/delete/complete/filter (all·incomplete·complete). Include localStorage persistence. Separate components into TodoInput, TodoList, TodoItem, FilterBar."

| Criterion | Score | Reason |
|-----------|-------|--------|
| Specificity (S) | 18/20 | Features and component structure clear |
| Context (C) | 14/20 | Tech stack specified (background slightly lacking) |
| Output (O) | 16/20 | Component structure specified |
| Role (R) | 18/20 | Senior React developer role |
| Effectiveness (E) | 17/20 | High probability of achieving desired result |
| **Total** | **83/100** | **Grade: A (Great)** |

> Even with the same topic, the quality of results dramatically changes based on prompt quality.`,
    },
    {
      title: '자기 평가 워크시트',
      titleEn: 'Self-Assessment Worksheet',
      content: `프롬프트를 작성한 후 스스로 점검할 수 있는 자기 평가 워크시트입니다.

### 작성 전 체크리스트

| # | 체크 항목 | 확인 |
|---|----------|------|
| 1 | 이 프롬프트로 달성하려는 목표를 한 문장으로 말할 수 있는가? | ☐ |
| 2 | AI가 아닌 사람에게 같은 요청을 한다면 충분히 이해할 수 있는가? | ☐ |
| 3 | 결과물의 형태(코드, 문서, 표 등)를 미리 정했는가? | ☐ |
| 4 | 필요한 배경 정보를 모두 파악했는가? | ☐ |
| 5 | 한 번에 하나의 작업만 요청하는가? (복합 작업은 분리) | ☐ |

### 작성 후 자기 평가표

| 영역 | 질문 | 1 | 2 | 3 | 4 | 5 |
|------|------|---|---|---|---|---|
| 명확성 | 요청이 한 가지로만 해석되는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 구체성 | 수치, 범위, 조건을 명시했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 맥락 | 배경과 목적을 충분히 제공했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 역할 | AI에게 적절한 전문가 역할을 부여했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 형식 | 출력 형식을 지정했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 제약 | 길이, 톤, 스타일 등 제약을 명시했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 예시 | 원하는 결과의 예시를 포함했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |
| 간결성 | 불필요한 정보를 제거했는가? | ☐ | ☐ | ☐ | ☐ | ☐ |

### 결과 분석 가이드

| 총점 | 등급 | 조언 |
|------|------|------|
| 35-40 | S | 탁월한 프롬프트! 그대로 사용하세요 |
| 28-34 | A | 우수합니다. 약간의 보완으로 완벽해질 수 있습니다 |
| 20-27 | B | 기본은 갖추었으나 구체성과 맥락을 보강하세요 |
| 12-19 | C | 핵심 요소가 부족합니다. 역할과 형식을 추가하세요 |
| 8-11 | D | 전면 재작성이 필요합니다 |

### 개선 반복 프로세스

| 단계 | 활동 | 핵심 질문 |
|------|------|----------|
| 1. 초안 작성 | 첫 번째 프롬프트 작성 | "무엇을 원하는가?" |
| 2. 자기 평가 | 위 체크리스트로 점검 | "빠진 요소는 없는가?" |
| 3. 실행 & 확인 | AI에 입력 후 결과 확인 | "기대한 결과인가?" |
| 4. 분석 | 부족한 부분 파악 | "왜 기대와 다른가?" |
| 5. 개선 | 프롬프트 수정 후 재실행 | "어떤 요소를 보강할까?" |
| 6. 기록 | 성공 패턴 정리 | "재사용할 수 있는가?" |

> 프롬프트 작성 능력은 타고나는 것이 아니라, 반복 연습으로 향상됩니다.`,
      contentEn: `A self-assessment worksheet for reviewing your prompts after writing them.

### Pre-Writing Checklist

| # | Check Item | Done |
|---|-----------|------|
| 1 | Can you describe the goal of this prompt in one sentence? | ☐ |
| 2 | Would a person (not AI) understand this request sufficiently? | ☐ |
| 3 | Have you decided the output format (code, document, table, etc.)? | ☐ |
| 4 | Have you gathered all necessary background information? | ☐ |
| 5 | Are you requesting only one task at a time? (separate complex tasks) | ☐ |

### Post-Writing Self-Assessment

| Area | Question | 1 | 2 | 3 | 4 | 5 |
|------|----------|---|---|---|---|---|
| Clarity | Can the request be interpreted in only one way? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Specificity | Are numbers, ranges, conditions specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Context | Is background and purpose sufficiently provided? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Role | Is an appropriate expert role assigned to AI? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Format | Is the output format specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Constraints | Are length, tone, style constraints specified? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Examples | Are examples of desired output included? | ☐ | ☐ | ☐ | ☐ | ☐ |
| Conciseness | Is unnecessary information removed? | ☐ | ☐ | ☐ | ☐ | ☐ |

### Result Analysis Guide

| Total | Grade | Advice |
|-------|-------|--------|
| 35-40 | S | Excellent prompt! Use as is |
| 28-34 | A | Great. Minor refinements can make it perfect |
| 20-27 | B | Basics covered but strengthen specificity and context |
| 12-19 | C | Key elements missing. Add role and format |
| 8-11 | D | Complete rewrite needed |

### Iterative Improvement Process

| Step | Activity | Key Question |
|------|----------|-------------|
| 1. Draft | Write first prompt | "What do I want?" |
| 2. Self-assess | Review with checklist | "Are any elements missing?" |
| 3. Execute & Check | Input to AI, check results | "Is this the expected result?" |
| 4. Analyze | Identify gaps | "Why is it different from expectations?" |
| 5. Improve | Modify prompt and re-run | "Which elements should I strengthen?" |
| 6. Record | Document successful patterns | "Can this be reused?" |

> Prompt writing skill is not innate — it improves with repeated practice.`,
    },
  ],
};
