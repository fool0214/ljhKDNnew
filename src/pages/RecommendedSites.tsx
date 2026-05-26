import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

interface SiteLink {
  name: string;
  nameEn: string;
  url: string;
  desc: string;
  tag: string;
}

const DREAMIT_SITES: SiteLink[] = [
  {
    name: 'KDN Vibe Coding',
    nameEn: 'KDN 바이브코딩 교육',
    url: 'https://kdn.dreamitbiz.com',
    desc: 'KDN 직원을 위한 바이브코딩 풀스택 웹 개발 교육 플랫폼. 3일 21시간 커리큘럼, 강의안, 프롬프트 학습을 제공합니다.',
    tag: '현재 사이트',
  },
  {
    name: 'ChatGPT 활용 교육',
    nameEn: 'ChatGPT Education',
    url: 'https://chatgpt.dreamitbiz.com',
    desc: 'OpenAI ChatGPT의 기본 사용법부터 고급 프롬프트 엔지니어링까지, 실무 중심 ChatGPT 활용 교육 과정입니다.',
    tag: 'ChatGPT',
  },
  {
    name: 'Gemini 활용 교육',
    nameEn: 'Gemini Education',
    url: 'https://gemini.dreamitbiz.com',
    desc: 'Google Gemini의 검색 통합, 이미지 분석, Google Workspace 연동 등 업무 활용법을 학습합니다.',
    tag: 'Google',
  },
  {
    name: 'Claude 활용 교육',
    nameEn: 'Claude Education',
    url: 'https://claude.dreamitbiz.com',
    desc: 'Anthropic Claude의 긴 문서 분석, 코딩 보조, 논리적 추론 등 전문 활용 교육 과정입니다.',
    tag: 'Anthropic',
  },
  {
    name: 'Genspark 활용 교육',
    nameEn: 'Genspark Education',
    url: 'https://genspark.dreamitbiz.com',
    desc: 'Genspark AI 검색 엔진의 Sparkpage, 멀티소스 분석, 실시간 정보 수집 활용법을 학습합니다.',
    tag: 'Genspark',
  },
  {
    name: '프레젠테이션 스킬',
    nameEn: 'Presentation Skills',
    url: 'https://presentation.dreamitbiz.com',
    desc: '효과적인 프레젠테이션 기획, 슬라이드 디자인, 발표 기법 등 비즈니스 프레젠테이션 역량을 강화하는 교육 과정입니다.',
    tag: '프레젠테이션',
  },
];

const AI_SERVICES: SiteLink[] = [
  {
    name: 'ChatGPT',
    nameEn: 'OpenAI',
    url: 'https://chat.openai.com',
    desc: '가장 대중적인 AI 대화 서비스. GPT-4o 기반으로 텍스트 생성, 코딩, 이미지 생성, 데이터 분석 등 범용 활용이 가능합니다.',
    tag: '필수',
  },
  {
    name: 'Google Gemini',
    nameEn: 'Google',
    url: 'https://gemini.google.com',
    desc: 'Google 검색과 통합된 AI. 최신 정보 기반 답변, 이미지 인식, Google Docs/Sheets 연동이 강점입니다.',
    tag: '추천',
  },
  {
    name: 'Claude',
    nameEn: 'Anthropic',
    url: 'https://claude.ai',
    desc: '긴 문서 분석과 논리적 추론에 강한 AI. PDF 업로드 분석, 코딩, 기술 문서 작성에 우수합니다.',
    tag: '추천',
  },
  {
    name: 'Microsoft Copilot',
    nameEn: 'Microsoft',
    url: 'https://copilot.microsoft.com',
    desc: 'Word, Excel, PowerPoint, Outlook 등 Microsoft 365와 통합된 AI 업무 보조 도구입니다.',
    tag: 'Office',
  },
  {
    name: 'Genspark',
    nameEn: 'Genspark AI',
    url: 'https://www.genspark.ai',
    desc: 'AI 기반 차세대 검색 엔진. Sparkpage로 여러 소스를 종합 분석한 깊이 있는 결과를 제공합니다.',
    tag: '검색',
  },
  {
    name: 'Perplexity',
    nameEn: 'Perplexity AI',
    url: 'https://www.perplexity.ai',
    desc: 'AI 기반 검색 엔진. 질문에 대해 출처와 함께 정확한 답변을 제공하며, 학술 연구에 유용합니다.',
    tag: '검색',
  },
];

const AI_TOOLS: SiteLink[] = [
  {
    name: 'Gamma',
    nameEn: 'Presentations',
    url: 'https://gamma.app',
    desc: 'AI로 프레젠테이션, 문서, 웹페이지를 자동 생성. 텍스트만 입력하면 전문적인 슬라이드를 만들어줍니다.',
    tag: '프레젠테이션',
  },
  {
    name: 'Canva AI',
    nameEn: 'Design',
    url: 'https://www.canva.com',
    desc: 'AI 기반 디자인 도구. 포스터, SNS 이미지, 프레젠테이션 등을 드래그앤드롭으로 제작합니다.',
    tag: '디자인',
  },
  {
    name: 'DeepL',
    nameEn: 'Translation',
    url: 'https://www.deepl.com',
    desc: '자연스러운 번역 품질로 유명한 AI 번역 서비스. 비즈니스 문서 번역에 Google 번역보다 정확합니다.',
    tag: '번역',
  },
  {
    name: 'Notion AI',
    nameEn: 'Workspace',
    url: 'https://www.notion.so',
    desc: 'AI 기반 워크스페이스. 문서 작성, 프로젝트 관리, 회의록 정리 등 팀 협업에 최적화되어 있습니다.',
    tag: '문서/협업',
  },
];

const SiteCard = ({ site: s, index }: { site: SiteLink; index: number }): ReactElement => (
  <a
    href={s.url}
    target="_blank"
    rel="noopener noreferrer"
    className="rec-card"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <div className="rec-card-top">
      <span className="rec-tag">{s.tag}</span>
      <svg className="rec-external" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 3h7v7M13 3L6 10" />
      </svg>
    </div>
    <h3 className="rec-name">{s.name}</h3>
    <span className="rec-name-en">{s.nameEn}</span>
    <p className="rec-desc">{s.desc}</p>
    <span className="rec-url">{s.url.replace('https://', '')}</span>
  </a>
);

const RecommendedSites = (): ReactElement => {
  return (
    <>
      <SEOHead title="추천사이트" description="생성형AI 관련 추천 사이트 및 교육 플랫폼 모음" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Recommended</div>
          <h2>추천사이트</h2>
          <p>생성형AI 교육 플랫폼 및 업무 활용에 유용한 AI 서비스 모음</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          {/* DreamIT Biz 교육 사이트 */}
          <div className="section-head">
            <div className="section-num">&mdash; 01</div>
            <h2 className="section-title-ed" style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>DreamIT Biz <span className="accent">교육 사이트</span></h2>
            <div className="section-meta">6 sites</div>
          </div>
          <div className="rec-grid">
            {DREAMIT_SITES.map((s, i) => <SiteCard key={s.url} site={s} index={i} />)}
          </div>

          {/* AI 서비스 */}
          <div className="section-head" style={{ marginTop: 'var(--s-11)' }}>
            <div className="section-num">&mdash; 02</div>
            <h2 className="section-title-ed" style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>AI <span className="accent">서비스</span></h2>
            <div className="section-meta">6 services</div>
          </div>
          <div className="rec-grid">
            {AI_SERVICES.map((s, i) => <SiteCard key={s.url} site={s} index={i} />)}
          </div>

          {/* AI 업무 도구 */}
          <div className="section-head" style={{ marginTop: 'var(--s-11)' }}>
            <div className="section-num">&mdash; 03</div>
            <h2 className="section-title-ed" style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>AI <span className="accent">업무 도구</span></h2>
            <div className="section-meta">4 tools</div>
          </div>
          <div className="rec-grid">
            {AI_TOOLS.map((s, i) => <SiteCard key={s.url} site={s} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecommendedSites;
