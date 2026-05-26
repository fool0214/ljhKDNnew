/**
 * GuidePage — 공유 가이드 페이지 컴포넌트
 * 단일 데이터파일: 섹션 직접 표시
 * 다중 데이터파일: 접이식 그룹 (클릭 시 확장/접기)
 */
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from './SEOHead';
import CodeBlock from './CodeBlock';
import TipBox from './TipBox';

interface Section {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

interface DataFile {
  id: string;
  icon: string;
  title: string;
  titleEn: string;
  sections: Section[];
}

interface GuidePageProps {
  seoTitle: string;
  seoTitleEn?: string;
  seoDescription?: string;
  path: string;
  dataFiles: DataFile[];
  ctaBanner?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
}

const markdownComponents = {
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match) return <CodeBlock code={String(children).replace(/\n$/, '')} language={match[1]} />;
    if (!inline && !match && String(children).includes('\n')) return <CodeBlock code={String(children).replace(/\n$/, '')} language="" />;
    return <code className="inline-code" {...props}>{children}</code>;
  },
  table({ children }: any) { return <div className="table-responsive"><table>{children}</table></div>; },
  blockquote({ children }: any) { return <TipBox type="tip">{children}</TipBox>; },
  a({ href, children, ...props }: any) {
    if (href && href.startsWith('/')) return <a href={href} {...props}>{children}</a>;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },
};

export default function GuidePage({ seoTitle, seoTitleEn, seoDescription, path, dataFiles, ctaBanner, sidebarFooter }: GuidePageProps) {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  const allSections: { section: Section; fileIndex: number }[] = [];
  dataFiles.forEach((df, fi) => {
    df.sections.forEach(sec => {
      allSections.push({ section: sec, fileIndex: fi });
    });
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const active = allSections[activeIndex];
  const activeFileIndex = active?.fileIndex ?? 0;

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasMultipleFiles = dataFiles.length > 1;

  const fileStartIndices: number[] = [];
  let cumIdx = 0;
  dataFiles.forEach(df => {
    fileStartIndices.push(cumIdx);
    cumIdx += df.sections.length;
  });

  return (
    <div className="guide-page">
      <SEOHead
        title={isKo ? seoTitle : (seoTitleEn || seoTitle)}
        description={seoDescription}
        path={path}
      />
      <div className="guide-layout">
        <aside className="guide-sidebar">
          <div className="guide-sidebar-title">{isKo ? '목차' : 'Contents'}</div>
          <ul className="guide-nav">
            {hasMultipleFiles ? (
              dataFiles.map((df, dfIdx) => {
                const isExpanded = dfIdx === activeFileIndex;
                const startIdx = fileStartIndices[dfIdx];
                return (
                  <li key={df.id} className={`guide-nav-group${isExpanded ? ' expanded' : ''}`}>
                    <button
                      className={`guide-nav-group-toggle${isExpanded ? ' active' : ''}`}
                      onClick={() => handleSelect(startIdx)}
                    >
                      {isKo ? df.title : df.titleEn}
                      <i className={`fa-solid fa-chevron-${isExpanded ? 'down' : 'right'} group-chevron`} />
                    </button>
                    {isExpanded && (
                      <ul className="guide-nav-sub-list">
                        {df.sections.map((sec, secIdx) => {
                          const globalIdx = startIdx + secIdx;
                          return (
                            <li key={globalIdx} className="guide-nav-item">
                              <button
                                className={`guide-nav-link guide-nav-sub ${globalIdx === activeIndex ? 'active' : ''}`}
                                onClick={() => handleSelect(globalIdx)}
                              >
                                {isKo ? sec.title : sec.titleEn}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })
            ) : (
              allSections.map((item, i) => (
                <li key={i} className="guide-nav-item">
                  <button
                    className={`guide-nav-link ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => handleSelect(i)}
                  >
                    {isKo ? item.section.title : item.section.titleEn}
                  </button>
                </li>
              ))
            )}
          </ul>
          {sidebarFooter && (
            <div className="guide-sidebar-footer">
              {sidebarFooter}
            </div>
          )}
        </aside>
        <div className="guide-content">
          <div className="guide-content-header">
            <h1>{isKo ? active.section.title : active.section.titleEn}</h1>
          </div>
          <div className="guide-section">
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents as any}>
                {isKo ? active.section.content : active.section.contentEn}
              </ReactMarkdown>
            </div>
          </div>
          {ctaBanner}
          <div className="guide-section-nav">
            <button disabled={activeIndex === 0} onClick={() => handleSelect(activeIndex - 1)}>
              <i className="fa-solid fa-chevron-left" /> {isKo ? '이전' : 'Previous'}
            </button>
            <button disabled={activeIndex === allSections.length - 1} onClick={() => handleSelect(activeIndex + 1)}>
              {isKo ? '다음' : 'Next'} <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
