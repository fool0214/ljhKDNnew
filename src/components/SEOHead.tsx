import { useLanguage } from '../contexts/LanguageContext';
import site from '../config/site';
import type { ReactElement } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOHead = ({ title, description, path = '', ogImage, noindex = false }: SEOHeadProps): ReactElement => {
  const SITE = `${site.name} | ${site.nameKo}`;
  const BASE = site.url;
  const DEFAULT_DESC = site.description;
  const fullTitle = title ? `${title} | ${SITE}` : SITE;
  const desc = description || DEFAULT_DESC;
  const image = ogImage || `${BASE}/og-image-v2.png`;

  // useLanguage is called to stay consistent with original (future i18n SEO)
  useLanguage();

  // React 19+ natively hoists <title>, <meta>, <link> to <head>
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${BASE}${path}`} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${BASE}${path}`} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export default SEOHead;
