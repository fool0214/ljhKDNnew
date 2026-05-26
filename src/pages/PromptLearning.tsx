import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const PromptLearning = (): ReactElement => {
  return (
    <>
      <SEOHead title="프롬프트 학습" description="생성형AI 프롬프트 작성법과 핵심 기법을 학습합니다" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Prompt Engineering</div>
          <h2>프롬프트 학습</h2>
          <p>ChatGPT 등 생성형AI를 효과적으로 활용하기 위한 프롬프트 작성 기법</p>
        </div>
      </section>

      <section className="section">
        <div className="lecture-page">

          {/* 프롬프트란? */}
          <div className="lecture-section">
            <h3>1. 프롬프트(Prompt)란?</h3>
            <div className="lecture-content">
              <p>
                <strong>프롬프트</strong>란 AI에게 보내는 지시문, 질문, 요청을 말합니다.
                프롬프트의 품질이 AI 응답의 품질을 결정합니다.
              </p>
              <div className="tip-box">
                <strong>핵심 원칙</strong>: 프롬프트가 구체적이고 명확할수록, AI의 답변도 정확하고 유용해집니다.
              </div>

              <h4>좋은 프롬프트 vs 나쁜 프롬프트</h4>
              <div className="example-box">
                <strong>나쁜 예시</strong>: "보고서 써줘"<br />
                → AI가 어떤 보고서를 쓸지 모르기 때문에 모호한 결과가 나옵니다.
              </div>
              <div className="prompt-example">{`[좋은 예시]
"KDN 전력계통운영팀의 2024년 4분기 EMS/SCADA 시스템
운영 실적 보고서를 작성해줘.
- 형식: 서론/본론/결론
- 분량: A4 2페이지 이내
- 어투: 공식 보고서 형식
- 포함사항: 시스템 가동률, 장애 대응 현황, 차기 계획"`}</div>
            </div>
          </div>

          {/* 프롬프트 구성 요소 */}
          <div className="lecture-section">
            <h3>2. 프롬프트 구성 5요소</h3>
            <div className="lecture-content">
              <h4>① 역할 (Role)</h4>
              <p>AI에게 특정 전문가 역할을 부여합니다.</p>
              <div className="prompt-example">{`"너는 10년 경력의 전력IT 시스템 운영 전문가야."`}</div>

              <h4>② 맥락 (Context)</h4>
              <p>배경 정보와 상황을 설명합니다.</p>
              <div className="prompt-example">{`"KDN은 한국전력 자회사로 전력IT 전문기업이야.
EMS/SCADA 운영, 스마트그리드, AMI, 사이버보안, 전력거래시스템 등을 담당하고 있어."`}</div>

              <h4>③ 지시 (Instruction)</h4>
              <p>AI가 수행할 구체적인 작업을 명시합니다.</p>
              <div className="prompt-example">{`"다음 데이터를 분석해서 월별 추이와 개선점을 제시해줘."`}</div>

              <h4>④ 형식 (Format)</h4>
              <p>원하는 출력 형식을 지정합니다.</p>
              <div className="prompt-example">{`"표 형식으로 정리해줘. 항목: 월, 생산량, 전월대비 증감률"
"불릿포인트 5개로 요약해줘."
"A4 1페이지 분량, 공식 보고서 형식으로 작성해줘."`}</div>

              <h4>⑤ 예시 (Example)</h4>
              <p>원하는 결과물의 예시를 제공합니다.</p>
              <div className="prompt-example">{`"다음 예시처럼 작성해줘:

[예시]
시스템명: EMS 3.0
특징: 실시간 계통 감시 정확도 15% 향상
대상: 전력계통 운영센터

이제 AMI 2.0도 같은 형식으로 작성해줘."`}</div>
            </div>
          </div>

          {/* 핵심 프롬프트 기법 */}
          <div className="lecture-section">
            <h3>3. 핵심 프롬프트 기법</h3>
            <div className="lecture-content">
              <h4>① Zero-shot (직접 질문)</h4>
              <p>예시 없이 바로 질문하는 가장 기본적인 방법입니다.</p>
              <div className="prompt-example">{`"전력계통 사이버보안 위협을 예방하는 방법 5가지를 알려줘."`}</div>

              <h4>② Few-shot (예시 제공)</h4>
              <p>원하는 출력 형식의 예시를 먼저 보여주고 같은 형식으로 작업을 요청합니다.</p>
              <div className="prompt-example">{`"다음 예시처럼 시스템 소개를 작성해줘.

[예시 1]
시스템: EMS 3.0 (에너지관리시스템)
핵심: 실시간 계통 감시, 자동 발전 지시, 예측 정확도 15% 향상

[예시 2]
시스템: DAS 2.0 (배전지능화시스템)
핵심: 고장 자동 복구, 배전선로 최적 운영, 정전시간 40% 감소

이제 'AMI 2.0 (원격검침시스템)'도 같은 형식으로 작성해줘."`}</div>

              <h4>③ Chain of Thought (단계별 사고)</h4>
              <p>복잡한 문제를 단계별로 풀어가도록 유도합니다.</p>
              <div className="prompt-example">{`"올해 전력계통 사이버보안 사고가 15% 증가한 문제를
단계별로 분석해줘.

Step 1: 원인 분석 (OT/IT 융합 환경 변화)
Step 2: 현재 보안 체계 평가
Step 3: 개선안 도출
Step 4: 실행 계획 수립"`}</div>

              <h4>④ 반복 개선 (Iterative Refinement)</h4>
              <p>AI의 첫 답변을 받은 후, 후속 질문으로 점점 다듬어 갑니다.</p>
              <div className="tip-box">
                <strong>팁</strong>: "더 자세히", "표로 정리해줘", "전문적인 어투로 바꿔줘",
                "3번 항목을 더 구체적으로" 등의 후속 요청이 효과적입니다.
              </div>
            </div>
          </div>

          {/* 업무별 프롬프트 템플릿 */}
          <div className="lecture-section">
            <h3>4. 업무별 프롬프트 템플릿</h3>
            <div className="lecture-content">
              <h4>이메일 작성</h4>
              <div className="prompt-example">{`"유관부서 담당자에게 보내는 {시스템명} 정기점검
일정 안내 이메일을 작성해줘.
- 공손하고 전문적인 어투
- 점검 사유, 일정, 서비스 중단 시간 포함
- 3문단 이내"`}</div>

              <h4>회의록 작성</h4>
              <div className="prompt-example">{`"다음 내용으로 회의록을 작성해줘.
형식: 날짜, 참석자, 안건, 논의사항, 결정사항, 후속조치
어투: 간결하고 명확하게"`}</div>

              <h4>데이터 분석</h4>
              <div className="prompt-example">{`"다음 월별 데이터를 분석해줘.
1. 추세 분석
2. 이상치 식별
3. 향후 3개월 예측
4. 개선 제안"`}</div>

              <h4>프레젠테이션 구성</h4>
              <div className="prompt-example">{`"'{주제}'에 대해 10슬라이드 분량의
프레젠테이션 구성안을 만들어줘.
각 슬라이드: 제목 + 핵심 내용(불릿 3~4개) + 발표 스크립트(30초)"`}</div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="lecture-section">
            <h3>5. AI 활용 시 주의사항</h3>
            <div className="lecture-content">
              <div className="tip-box">
                <strong>환각(Hallucination)</strong>: AI가 사실이 아닌 내용을 자신 있게 생성할 수 있습니다. 반드시 사실 확인이 필요합니다.
              </div>
              <div className="example-box">
                <strong>보안 주의</strong>: 회사 기밀정보, 개인정보, 미공개 재무 데이터를 AI에 입력하지 마세요.
              </div>
              <ul>
                <li><strong>저작권</strong>: AI 생성물의 저작권 이슈를 인지하고, 최종 검토는 사람이 합니다.</li>
                <li><strong>의존성</strong>: AI는 보조 도구이지 대체가 아닙니다. 최종 판단은 본인이 합니다.</li>
                <li><strong>검증</strong>: 수치, 법률, 전문 지식 등은 반드시 별도 확인 후 사용하세요.</li>
              </ul>
            </div>
          </div>

          {/* CTA - 실습으로 이동 */}
          <section className="cta-ed" style={{ borderRadius: 'var(--radius)', marginTop: '3rem' }}>
            <div className="cta-inner" style={{ padding: '0' }}>
              <div>
                <div className="cta-eyebrow">&mdash; 실습 안내</div>
                <h2 className="cta-title-ed" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                  프롬프트 기법을<br />
                  <span className="accent">직접 실습</span>해보세요
                </h2>
              </div>
              <div className="cta-side">
                <p>OpenAI API Key를 사용하여 ChatGPT와 직접 대화하며 위에서 배운 기법을 연습합니다.</p>
                <Link className="btn btn-cta" to="/practice">
                  AI 실습 시작하기
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </section>
    </>
  );
};

export default PromptLearning;
