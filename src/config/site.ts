/**
 * KDN 바이브코딩 교육 사이트 설정
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'nursing',

  name: '수유시설 찾기',
  nameKo: '전국 수유시설 검색',
  description: '전국 3,000여 개 수유시설 정보를 지역·종류별로 빠르게 찾아보세요. 외출 중인 부모를 위한 수유시설 검색 서비스입니다.',
  url: 'https://fool0214.github.io/ljhKDNnew',

  dbPrefix: 'kdn_',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: '🤱 ', className: 'brand-dream' },
      { text: '수유시설', className: 'brand-it' },
      { text: ' 찾기', className: 'brand-biz' }
    ]
  },

  themeColor: '#1B2A4A',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    publisherNumber: '제2026-000026호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },

  features: {
    shop: false,
    community: false,
    search: false,
    auth: true,
    license: false,
  },

  colors: [
    { name: 'blue', color: '#1B2A4A' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'purple', color: '#5B2C8B' },
    { name: 'orange', color: '#D4760A' },
  ],

  menuItems: [
    { path: '/', labelKey: 'site.nav.home', activePath: '/' },
    { path: '/nursing', labelKey: 'site.nav.nursing', activePath: '/nursing' },
    {
      labelKey: 'site.nav.board',
      path: '/board',
      activePath: '/board',
      dropdown: [
        { path: '/board?type=notice', labelKey: 'site.nav.boardNotice' },
        { path: '/board?type=info', labelKey: 'site.nav.boardInfo' },
      ]
    },
  ],

  footerLinks: [
    { path: '/', labelKey: 'site.nav.home' },
    { path: '/nursing', labelKey: 'site.nav.nursing' },
    { path: '/board?type=notice', labelKey: 'site.nav.boardNotice' },
  ],

  familySites: [
    { name: '여성가족부 수유시설 현황', url: 'https://sooyusil.com/home/22.htm' },
  ]
};

export default site;
