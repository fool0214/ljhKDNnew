import{r as v,j as e}from"./index-CGYqL1dD.js";import{S as N}from"./SEOHead-DE9N4o5m.js";const A=[{id:1,category:"React UI",title:"React 컴포넌트 생성 요청",situation:"할 일 관리 앱의 메인 페이지를 만들어야 합니다. 상단에 입력 폼, 하단에 할 일 목록이 표시되고, 각 항목에 체크박스와 삭제 버튼이 있어야 합니다.",goal:"AI에게 React 컴포넌트를 요청하는 프롬프트를 작성하세요.",keywords:["React","컴포넌트","할 일","Todo","입력","목록","체크박스","삭제"],roleKeywords:["개발자","프론트엔드","전문가","역할","엔지니어"],formatKeywords:["코드","TypeScript","CSS","파일","형식","구조","컴포넌트"],exampleAnswer:`너는 React + TypeScript 프론트엔드 전문 개발자야.
할 일 관리 앱의 메인 페이지 컴포넌트를 만들어줘.

[기능]
- 상단: 할 일 입력 폼 (텍스트 입력 + 추가 버튼)
- 하단: 할 일 목록 (체크박스 + 제목 + 삭제 버튼)
- 완료된 항목은 취소선으로 표시
- useState로 상태 관리

[조건]
- TypeScript 사용
- 모던하고 깔끔한 CSS 포함
- 반응형 디자인 (모바일 대응)
- TodoItem은 별도 컴포넌트로 분리`},{id:2,category:"API 설계",title:"REST API 엔드포인트 설계",situation:"할 일 관리 앱의 백엔드 API를 설계해야 합니다. 할 일 CRUD와 사용자 인증 기능이 필요하며, Supabase를 백엔드로 사용합니다.",goal:"REST API 엔드포인트를 설계하는 프롬프트를 작성하세요.",keywords:["API","REST","CRUD","엔드포인트","인증","Supabase","설계","JSON"],roleKeywords:["백엔드","개발자","아키텍트","역할","전문가"],formatKeywords:["표","목록","항목","구성","형식","URL","HTTP"],exampleAnswer:`너는 백엔드 API 설계 전문 아키텍트야.
할 일 관리 앱의 REST API를 설계해줘.

[리소스]
- todos: 할 일 (CRUD)
- auth: 사용자 인증 (회원가입/로그인/로그아웃)

[조건]
- Supabase 기반
- JWT 토큰 인증
- RLS(Row Level Security) 적용

[출력 형식]
표 형태 (HTTP 메서드 / URL / 설명 / 인증 필요 여부 / 요청 Body / 응답 예시)
총 10개 이내의 엔드포인트`},{id:3,category:"Streamlit",title:"Streamlit 데이터 대시보드 생성",situation:"KDN 전력사용량 CSV 데이터를 업로드하여 월별 추이, 지역별 비교, 핵심 KPI를 시각화하는 Streamlit 대시보드를 만들어야 합니다.",goal:"Streamlit 대시보드를 만드는 프롬프트를 작성하세요.",keywords:["Streamlit","대시보드","데이터","CSV","시각화","차트","전력","pandas"],roleKeywords:["개발자","Python","전문가","역할","데이터"],formatKeywords:["코드","Python","파일","형식","구조","차트","그래프"],exampleAnswer:`너는 Python Streamlit 전문 개발자야.
KDN 전력사용량 분석 대시보드를 만들어줘.

[기능]
- CSV 파일 업로드 (st.file_uploader)
- 사이드바: 기간 필터, 지역 선택
- 상단: 핵심 KPI 카드 (총 사용량, 전월 대비, 최대 부하)
- 본문: 월별 추이 라인 차트, 지역별 막대 차트
- 하단: 데이터 테이블 (st.dataframe)

[조건]
- pandas로 데이터 처리
- matplotlib 또는 plotly로 차트 생성
- st.columns로 레이아웃 구성
- st.metric으로 KPI 표시
- 한글 폰트 설정 포함`},{id:4,category:"기획",title:"웹 서비스 요구사항 정의서",situation:"KDN 사내 업무 효율화를 위한 AI 챗봇 웹앱을 기획하고 있습니다. 직원들이 사내 규정, FAQ, 업무 매뉴얼을 질문하면 AI가 답변하는 서비스입니다.",goal:"웹 서비스 요구사항 정의서를 요청하는 프롬프트를 작성하세요.",keywords:["요구사항","기획","기능","화면","AI","챗봇","사용자","서비스"],roleKeywords:["기획자","PM","전문가","역할","아키텍트"],formatKeywords:["페이지","구성","형식","목록","분량","목차","표"],exampleAnswer:`너는 웹 서비스 기획 전문가야.
KDN 사내 AI 챗봇 웹앱의 요구사항 정의서를 작성해줘.

[서비스 개요]
- 대상: KDN 직원 (약 3,000명)
- 목적: 사내 규정, FAQ, 업무 매뉴얼 AI 검색/답변
- 기술: React + Supabase + ChatGPT API

[출력 구조]
1. 프로젝트 개요 (목적, 대상, 기대효과)
2. 기능 목록 (필수/선택 구분, 우선순위)
3. 화면 목록 및 와이어프레임 설명
4. 데이터 모델 (테이블 설계)
5. API 엔드포인트
6. 기술 스택 및 아키텍처

[조건]
- A4 3페이지 이내
- 비기술직도 이해할 수 있는 용어 사용`},{id:5,category:"Python 분석",title:"Python 데이터 분석 코드 요청",situation:"KDN 전력 설비 장애 이력 데이터(Excel)를 분석하여 장애 유형별 빈도, 월별 추이, 원인 분석을 수행하는 Python 코드가 필요합니다.",goal:"Python 데이터 분석 코드를 요청하는 프롬프트를 작성하세요.",keywords:["Python","분석","데이터","pandas","Excel","장애","통계","시각화"],roleKeywords:["데이터","분석가","전문가","역할","Python"],formatKeywords:["코드","Python","파일","형식","그래프","차트","출력"],exampleAnswer:`너는 Python 데이터 분석 전문가야.
KDN 전력 설비 장애 이력 데이터를 분석하는 코드를 작성해줘.

[데이터 구조]
- 파일: Excel (.xlsx)
- 컬럼: 일시, 설비유형, 장애유형, 지역, 복구시간(분), 영향범위

[분석 항목]
1. 장애 유형별 발생 빈도 (파이차트)
2. 월별 장애 추이 (라인차트)
3. 지역별 장애 분포 (막대차트)
4. 평균 복구시간 분석
5. 장애 원인 Top 5

[조건]
- pandas, matplotlib, seaborn 사용
- 한글 폰트 설정 포함
- 각 분석 결과를 PNG로 저장
- 요약 통계를 print로 출력`},{id:6,category:"Claude API",title:"Claude API 연동 Streamlit 챗봇",situation:"Streamlit 앱에 Claude API를 연동하여 KDN 업무 관련 질의응답을 처리하는 AI 챗봇을 만들어야 합니다. 대화 이력을 유지하고, 전력IT 전문가 역할을 수행해야 합니다.",goal:"Claude API를 연동한 Streamlit 챗봇 코드를 요청하는 프롬프트를 작성하세요.",keywords:["Claude","API","Streamlit","챗봇","AI","대화","연동","전력"],roleKeywords:["AI","개발자","전문가","역할","Python"],formatKeywords:["코드","Python","파일","형식","구조","Streamlit","설정"],exampleAnswer:`너는 Python + Streamlit + Claude API 전문 개발자야.
KDN 업무용 AI 챗봇 Streamlit 앱을 만들어줘.

[기능]
- Claude API 연동 (anthropic 라이브러리)
- st.chat_input / st.chat_message로 대화 UI
- st.session_state로 대화 이력 관리
- System Prompt: "너는 KDN 전력IT 전문가야"
- 사이드바: API 키 입력, 대화 초기화 버튼

[조건]
- anthropic Python SDK 사용
- 스트리밍 응답 처리
- 에러 핸들링 (API 키 미입력, 호출 실패)
- requirements.txt 포함

[출력]
- app.py (전체 코드)
- requirements.txt
- 실행 방법 안내`}];function W(r,f){const l=r.toLowerCase().replace(/\s+/g," "),h=r.trim().length,i=[];let n=0;const g=f.keywords.filter(u=>l.includes(u.toLowerCase()));g.length>=5?n=20:g.length>=3?n=15:g.length>=2?n=10:g.length>=1&&(n=5),n<15&&i.push(`상황/맥락 키워드를 더 포함하세요 (예: ${f.keywords.slice(0,3).join(", ")})`);let o=0;const d=/\d+/.test(r),R=/[가-힣]+[시군구도]|[가-힣]+(주|건|개|명|억|만|원|%)/.test(r),j=/(20\d{2}|[0-9]+월|[0-9]+일|[0-9]+시간|[0-9]+분)/.test(r),c=/\[.+\]/.test(r);d&&(o+=5),R&&(o+=5),j&&(o+=5),c&&(o+=5),o<10&&i.push("구체적인 숫자, 날짜, 조건 등 데이터를 추가하면 점수가 올라갑니다");let x=0;const w=/(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출)/.test(r),b=(r.match(/(작성|만들|분석|정리|요약|생성|제안|검토|수립|설계|평가|비교|추천|도출)/g)||[]).length,I=/(해줘|해주세요|부탁|하시오)/.test(r);w&&(x+=8),b>=2&&(x+=6),I&&(x+=3),h>=100&&(x+=3),x=Math.min(x,20),x<10&&i.push('"~작성해줘", "~분석해줘" 등 명확한 지시문을 포함하세요');let p=0;const S=f.formatKeywords.filter(u=>l.includes(u.toLowerCase())),t=/[1-9][.)]\s|[-·•]\s|#{1,3}\s|[①②③④⑤]/.test(r),s=/(페이지|문단|자|단어|이내|분량|줄|A4)/.test(r);S.length>=2?p+=8:S.length>=1&&(p+=4),t&&(p+=6),s&&(p+=6),p=Math.min(p,20),p<10&&i.push("출력 형식(표, 목록, 분량 등)을 지정하면 더 좋은 결과를 얻을 수 있습니다");let a=0;const k=f.roleKeywords.filter(u=>l.includes(u.toLowerCase())),C=/(너는|당신은|역할|~전문가|~담당자|~으로서)/.test(r),P=/(금지|하지 마|제외|제한|조건|주의|참고|단,)/.test(r),z=/(예[시를:]|예를 들|예컨대|다음과 같|sample|example)/.test(r);(C||k.length>0)&&(a+=8),P&&(a+=4),z&&(a+=4),h>=200&&(a+=2),h>=400&&(a+=2),a=Math.min(a,20),!C&&k.length===0&&i.push('"너는 ~전문가야" 등 역할 설정을 추가하세요'),P||i.push("제약조건(분량, 어투, 제외사항 등)을 추가하면 더 정확한 결과를 얻습니다");const y=n+o+x+p+a;h<50&&i.unshift("프롬프트가 너무 짧습니다. 최소 100자 이상으로 작성해보세요."),h>=300&&y>=60&&i.push("프롬프트 길이와 구조 모두 우수합니다!");let m="D";return y>=90?m="S":y>=80?m="A":y>=65?m="B":y>=50&&(m="C"),{total:y,situation:n,context:o,objective:x,responseFormat:p,extras:a,feedback:i,grade:m}}const K=()=>{const[r,f]=v.useState(null),[l,h]=v.useState(""),[i,n]=v.useState(null),[g,o]=v.useState(!1),[d,R]=v.useState([]),j=v.useRef(null),c=A.find(t=>t.id===r)||null,x=()=>{if(!c||!l.trim())return;const t=W(l,c);n(t),R(s=>[...s,{scenarioId:c.id,score:t.total,grade:t.grade}].slice(-20))},w=()=>{h(""),n(null),o(!1)},b=t=>{f(t),h(""),n(null),o(!1),setTimeout(()=>j.current?.focus(),100)},I=d.length>0?Math.round(d.reduce((t,s)=>t+s.score,0)/d.length):0,p=t=>t==="S"?"#D4760A":t==="A"?"#1B2A4A":t==="B"?"#00855A":t==="C"?"#5B2C8B":"#999",S=t=>`${t/20*100}%`;return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"바이브코딩 실습 | KDN Vibe Coding",description:"프롬프트 작성 실습 및 자동 채점"}),e.jsx("section",{className:"page-header-ed",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"eyebrow",children:"AI Practice"}),e.jsx("h2",{children:"프롬프트 작성 실습"}),e.jsx("p",{children:"업무 시나리오에 맞는 프롬프트를 작성하고, SCORE 기준으로 자동 채점합니다"})]})}),e.jsx("section",{className:"section-ed",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"practice-layout",children:[e.jsxs("aside",{className:"practice-sidebar",children:[e.jsxs("div",{className:"ps-block",children:[e.jsx("h4",{className:"ps-label",children:"실습 시나리오"}),e.jsx("ul",{className:"ps-steps",style:{gap:"4px"},children:A.map(t=>e.jsx("li",{style:{cursor:"pointer"},onClick:()=>b(t.id),children:e.jsxs("button",{style:{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:r===t.id?"var(--navy-50)":"transparent",border:r===t.id?"1px solid var(--navy-800)":"1px solid var(--line)",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all 0.15s"},children:[e.jsx("span",{style:{width:"28px",height:"28px",borderRadius:"50%",background:r===t.id?"var(--ink-surface)":"var(--navy-100)",color:r===t.id?"var(--gold)":"var(--navy-700)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:800,flexShrink:0},children:String(t.id).padStart(2,"0")}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"var(--navy-800)"},children:t.title}),e.jsx("div",{style:{fontSize:"11px",color:"var(--text-secondary)",marginTop:"1px"},children:t.category})]}),d.find(s=>s.scenarioId===t.id)&&e.jsxs("span",{style:{marginLeft:"auto",fontSize:"11px",fontWeight:800,flexShrink:0,color:p(d.filter(s=>s.scenarioId===t.id).slice(-1)[0].grade)},children:[d.filter(s=>s.scenarioId===t.id).slice(-1)[0].score,"점"]})]})},t.id))})]}),e.jsxs("div",{className:"ps-block",children:[e.jsx("h4",{className:"ps-label",children:"SCORE 채점 기준"}),e.jsxs("ul",{className:"ps-rules",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"S"})," — 상황/맥락 (20점)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"C"})," — 구체적 정보 (20점)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"O"})," — 목표/지시 (20점)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"R"})," — 출력 형식 (20점)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"E"})," — 역할/제약 (20점)"]})]})]}),d.length>0&&e.jsxs("div",{className:"ps-block",children:[e.jsx("h4",{className:"ps-label",children:"실습 현황"}),e.jsxs("div",{style:{textAlign:"center",padding:"8px 0"},children:[e.jsxs("div",{style:{fontSize:"36px",fontWeight:800,color:"var(--navy-800)"},children:[I,e.jsx("span",{style:{fontSize:"14px",color:"var(--gold)"},children:"점"})]}),e.jsxs("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:["평균 점수 (",d.length,"회 실습)"]})]})]})]}),e.jsx("main",{className:"practice-main",children:c?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{padding:"24px 28px",marginBottom:"20px",background:"var(--navy-50)",borderLeft:"4px solid var(--gold)",borderRadius:"0 12px 12px 0"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:700,padding:"3px 10px",background:"var(--ink-surface)",color:"var(--gold)",borderRadius:"4px",letterSpacing:"0.05em"},children:c.category}),e.jsx("span",{style:{fontSize:"18px",fontWeight:800,color:"var(--navy-800)"},children:c.title})]}),e.jsxs("p",{style:{fontSize:"14px",color:"var(--text-secondary)",lineHeight:1.7,margin:"0 0 8px"},children:[e.jsx("strong",{style:{color:"var(--navy-800)"},children:"상황:"})," ",c.situation]}),e.jsxs("p",{style:{fontSize:"14px",color:"var(--navy-800)",fontWeight:600,margin:0,lineHeight:1.7},children:[e.jsx("i",{className:"fa-solid fa-bullseye",style:{color:"var(--gold)",marginRight:"6px"}}),c.goal]})]}),e.jsxs("div",{style:{border:"1px solid var(--line)",borderRadius:"12px",overflow:"hidden",marginBottom:"20px",background:"var(--bg-white)"},children:[e.jsxs("div",{style:{padding:"14px 20px",borderBottom:"1px solid var(--line)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{fontSize:"14px",fontWeight:700,color:"var(--navy-800)"},children:[e.jsx("i",{className:"fa-solid fa-keyboard",style:{color:"var(--gold)",marginRight:"8px"}}),"프롬프트 작성"]}),e.jsxs("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:[l.length,"자"]})]}),e.jsx("textarea",{ref:j,value:l,onChange:t=>{h(t.target.value),n(null)},placeholder:`이 상황에 맞는 프롬프트를 작성해보세요.

좋은 프롬프트 예시:
"너는 ~전문가야. ~상황에서 ~를 작성해줘.
[조건] ...
[출력 형식] ..."`,style:{width:"100%",minHeight:"200px",padding:"20px",border:"none",outline:"none",resize:"vertical",fontFamily:"inherit",fontSize:"14px",lineHeight:1.8,background:"var(--bg-white)",color:"var(--text-primary)",boxSizing:"border-box"}}),e.jsxs("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--line)",display:"flex",gap:"10px",justifyContent:"flex-end",background:"var(--navy-50)"},children:[e.jsxs("button",{onClick:()=>o(!g),style:{padding:"8px 16px",fontSize:"13px",fontWeight:600,background:"var(--bg-white)",color:"var(--navy-800)",border:"1px solid var(--line)",borderRadius:"6px",cursor:"pointer",fontFamily:"inherit"},children:[e.jsx("i",{className:"fa-solid fa-lightbulb",style:{marginRight:"6px",color:"var(--gold)"}}),g?"모범답안 숨기기":"모범답안 보기"]}),e.jsx("button",{onClick:w,style:{padding:"8px 16px",fontSize:"13px",fontWeight:600,background:"var(--bg-white)",color:"var(--text-secondary)",border:"1px solid var(--line)",borderRadius:"6px",cursor:"pointer",fontFamily:"inherit"},children:"초기화"}),e.jsxs("button",{onClick:x,disabled:!l.trim(),style:{padding:"8px 24px",fontSize:"13px",fontWeight:700,background:l.trim()?"var(--ink-surface)":"var(--line)",color:l.trim()?"#fff":"var(--text-secondary)",border:"none",borderRadius:"6px",cursor:l.trim()?"pointer":"not-allowed",fontFamily:"inherit"},children:[e.jsx("i",{className:"fa-solid fa-check",style:{marginRight:"6px"}}),"채점하기"]})]})]}),g&&e.jsxs("div",{style:{padding:"20px 24px",marginBottom:"20px",background:"#263238",color:"#E0E0E0",borderRadius:"10px",fontSize:"13px",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"'Courier New', monospace"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:700,color:"var(--gold)",marginBottom:"12px",letterSpacing:"0.1em"},children:"EXAMPLE PROMPT"}),c.exampleAnswer]}),i&&e.jsxs("div",{style:{border:"2px solid var(--navy-800)",borderRadius:"16px",overflow:"hidden",animation:"rec-fade-in 0.3s ease-out"},children:[e.jsxs("div",{style:{padding:"28px 32px",background:"var(--ink-surface)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"12px",fontWeight:700,color:"var(--gold)",letterSpacing:"0.12em",marginBottom:"8px"},children:"EVALUATION RESULT"}),e.jsx("div",{style:{fontSize:"20px",fontWeight:700},children:"프롬프트 채점 결과"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"48px",fontWeight:800,lineHeight:1,color:i.grade==="S"?"var(--gold)":"#fff"},children:i.grade}),e.jsxs("div",{style:{fontSize:"28px",fontWeight:800,color:"var(--gold)",marginTop:"4px"},children:[i.total,e.jsx("span",{style:{fontSize:"14px",opacity:.7},children:"/100"})]})]})]}),e.jsxs("div",{style:{padding:"28px 32px"},children:[e.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"var(--gold)",letterSpacing:"0.1em",marginBottom:"20px"},children:"SCORE BREAKDOWN"}),[{label:"S — 상황/맥락",value:i.situation},{label:"C — 구체적 정보",value:i.context},{label:"O — 목표/지시",value:i.objective},{label:"R — 출력 형식",value:i.responseFormat},{label:"E — 역할/제약",value:i.extras}].map(t=>e.jsxs("div",{style:{marginBottom:"14px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--navy-800)"},children:t.label}),e.jsxs("span",{style:{fontSize:"13px",fontWeight:800,color:t.value>=15?"var(--navy-800)":t.value>=10?"var(--gold)":"#C8102E"},children:[t.value,"/20"]})]}),e.jsx("div",{style:{height:"8px",background:"var(--navy-100)",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:"4px",transition:"width 0.5s ease",width:S(t.value),background:t.value>=15?"var(--ink-surface)":t.value>=10?"var(--gold)":"#C8102E"}})})]},t.label)),i.feedback.length>0&&e.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"var(--navy-50)",borderRadius:"10px",borderLeft:"4px solid var(--gold)"},children:[e.jsxs("div",{style:{fontSize:"13px",fontWeight:700,color:"var(--navy-800)",marginBottom:"12px"},children:[e.jsx("i",{className:"fa-solid fa-comment-dots",style:{color:"var(--gold)",marginRight:"8px"}}),"개선 피드백"]}),e.jsx("ul",{style:{padding:"0 0 0 18px",margin:0},children:i.feedback.map((t,s)=>e.jsx("li",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.8,marginBottom:"4px"},children:t},s))})]}),e.jsx("div",{style:{marginTop:"20px",display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},children:[{g:"S",range:"90~100",label:"최상"},{g:"A",range:"80~89",label:"우수"},{g:"B",range:"65~79",label:"양호"},{g:"C",range:"50~64",label:"보통"},{g:"D",range:"~49",label:"미흡"}].map(t=>e.jsxs("span",{style:{padding:"4px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:700,background:i.grade===t.g?"var(--ink-surface)":"var(--navy-50)",color:i.grade===t.g?"var(--gold)":"var(--text-secondary)"},children:[t.g," (",t.range,") ",t.label]},t.g))})]})]})]}):e.jsxs("div",{children:[e.jsxs("div",{style:{padding:"36px 32px",marginBottom:"24px",background:"var(--ink-surface)",borderRadius:"16px",color:"#fff"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:700,color:"var(--gold)",letterSpacing:"0.12em",marginBottom:"12px"},children:"PROMPT WRITING PRACTICE"}),e.jsxs("h3",{style:{fontSize:"22px",fontWeight:800,margin:"0 0 12px",lineHeight:1.4},children:["업무 시나리오별",e.jsx("br",{}),e.jsx("span",{style:{color:"var(--gold)"},children:"프롬프트 작성 실습"})]}),e.jsx("p",{style:{fontSize:"14px",opacity:.8,lineHeight:1.7,margin:0},children:"실제 업무 상황에 맞는 프롬프트를 직접 작성하고, SCORE 5가지 기준으로 자동 채점합니다. 왼쪽 사이드바에서 시나리오를 선택하거나, 아래 카드를 클릭해 시작하세요."})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsxs("div",{style:{fontSize:"13px",fontWeight:700,color:"var(--navy-800)",marginBottom:"14px"},children:[e.jsx("i",{className:"fa-solid fa-list-check",style:{color:"var(--gold)",marginRight:"8px"}}),"실습 시나리오 선택"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"14px"},children:A.map(t=>{const s={"React UI":"fa-code","API 설계":"fa-server",Streamlit:"fa-chart-line",기획:"fa-lightbulb","Python 분석":"fa-chart-bar","Claude API":"fa-robot"},a=d.filter(k=>k.scenarioId===t.id).slice(-1)[0];return e.jsxs("button",{onClick:()=>b(t.id),style:{padding:"20px",background:"var(--bg-white)",border:"1px solid var(--line)",borderRadius:"12px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all 0.2s",display:"flex",gap:"14px",alignItems:"flex-start"},children:[e.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"10px",flexShrink:0,background:"var(--navy-50)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("i",{className:`fa-solid ${s[t.category]||"fa-file"}`,style:{fontSize:"16px",color:"var(--navy-800)"}})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:700,color:"var(--gold)"},children:t.category}),a&&e.jsxs("span",{style:{fontSize:"10px",fontWeight:800,padding:"1px 6px",borderRadius:"3px",background:"var(--ink-surface)",color:"var(--gold)"},children:[a.grade," · ",a.score,"점"]})]}),e.jsx("div",{style:{fontSize:"14px",fontWeight:700,color:"var(--navy-800)",marginBottom:"4px"},children:t.title}),e.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)",lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:t.situation})]})]},t.id)})})]}),e.jsxs("div",{style:{padding:"24px 28px",background:"var(--navy-50)",borderRadius:"12px",borderLeft:"4px solid var(--gold)"},children:[e.jsxs("div",{style:{fontSize:"13px",fontWeight:700,color:"var(--navy-800)",marginBottom:"16px"},children:[e.jsx("i",{className:"fa-solid fa-star",style:{color:"var(--gold)",marginRight:"8px"}}),"SCORE 채점 기준 (각 20점, 총 100점)"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"10px"},children:[{key:"S",label:"상황/맥락",desc:"배경과 맥락을 제시"},{key:"C",label:"구체적 정보",desc:"숫자·날짜·조건 포함"},{key:"O",label:"목표/지시",desc:"명확한 요청 지시문"},{key:"R",label:"출력 형식",desc:"표·목록·분량 지정"},{key:"E",label:"역할/제약",desc:"역할 부여·제약조건"}].map(t=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"50%",margin:"0 auto 8px",background:"var(--ink-surface)",color:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:800},children:t.key}),e.jsx("div",{style:{fontSize:"12px",fontWeight:700,color:"var(--navy-800)",marginBottom:"2px"},children:t.label}),e.jsx("div",{style:{fontSize:"11px",color:"var(--text-secondary)",lineHeight:1.4},children:t.desc})]},t.key))})]})]})})]})})})]})};export{K as default};
