/**
 * KDN 바이브코딩 교육 사이트 설정
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'kdn',

  name: 'KDN Vibe Coding',
  nameKo: '바이브코딩으로 풀스택 웹 개발',
  description: 'KDN 직원 대상 바이브코딩을 활용한 프론트엔드·백엔드·배포 전 과정 교육 플랫폼 (3일, 21시간)',
  url: 'https://kdn.dreamitbiz.com',

  dbPrefix: 'kdn_',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: 'KDN', className: 'brand-dream' },
      { text: ' Vibe', className: 'brand-it' },
      { text: ' Coding', className: 'brand-biz' }
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
    {
      labelKey: 'site.nav.about',
      path: '/',
      activePath: '/about',
      dropdown: [
        { path: '/about', labelKey: 'site.nav.aboutIntent' },
        { path: '/about/company', labelKey: 'site.nav.aboutCompany' },
        { path: '/about/instructor', labelKey: 'site.nav.aboutInstructor' },
      ]
    },
    {
      labelKey: 'site.nav.curriculum',
      path: '/curriculum',
      activePath: '/curriculum',
      dropdown: [
        { path: '/curriculum/basic', labelKey: 'site.nav.day1' },
        { path: '/curriculum/intermediate', labelKey: 'site.nav.day2' },
        { path: '/curriculum/advanced', labelKey: 'site.nav.day3' }
      ]
    },
    {
      labelKey: 'site.nav.learning',
      path: '/lecture',
      activePath: '/lecture',
      dropdown: [
        { path: '/lecture/setup', labelKey: 'site.nav.lectureSetup' },
        { path: '/lecture/basic', labelKey: 'site.nav.lectureDay1' },
        { path: '/lecture/intermediate', labelKey: 'site.nav.lectureDay2' },
        { path: '/lecture/advanced', labelKey: 'site.nav.lectureDay3' }
      ]
    },
    {
      labelKey: 'site.nav.claudeCode',
      path: '/claude-code/intro',
      activePath: '/claude-code',
      dropdown: [
        { path: '/claude-code/intro', labelKey: 'site.nav.claudeCodeIntro' },
        { path: '/claude-code/markdown', labelKey: 'site.nav.claudeCodeMarkdown' },
        { path: '/claude-code/skills', labelKey: 'site.nav.claudeCodeSkills' },
        { path: '/claude-code/advanced', labelKey: 'site.nav.claudeCodeAdvanced' },
      ]
    },
    {
      labelKey: 'site.nav.promptPractice',
      path: '/practice',
      activePath: '/practice',
      dropdown: [
        { path: '/practice', labelKey: 'site.nav.practiceMain' },
        { path: '/prompt-cases', labelKey: 'site.nav.promptCases' },
        { path: '/prompt-eval', labelKey: 'site.nav.promptMaterials' },
        { path: '/prompt-eval/workshop', labelKey: 'site.nav.promptEvalWriting' },
        { path: '/prompt-eval/practice', labelKey: 'site.nav.promptCompTest' }
      ]
    },
    { path: '/vibe-practice', labelKey: 'site.nav.vibePractice', activePath: '/vibe-practice' },
    { path: '/recommended', labelKey: 'site.nav.recommended', activePath: '/recommended' },
  ],

  footerLinks: [
    { path: '/curriculum', labelKey: 'site.nav.curriculum' },
    { path: '/practice', labelKey: 'site.nav.promptPractice' },
    { path: '/vibe-practice', labelKey: 'site.nav.vibePractice' },
    { path: '/recommended', labelKey: 'site.nav.recommended' }
  ],

  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'AI 프롬프트 교육', url: 'https://ai-prompt.dreamitbiz.com' },
    { name: 'ChatGPT 활용', url: 'https://chatgpt.dreamitbiz.com' },
    { name: 'Claude Code 교육', url: 'https://claude-code.dreamitbiz.com' }
  ]
};

export default site;
