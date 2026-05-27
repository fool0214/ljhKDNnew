import { useState, type ReactElement, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import rawData from '../data/nursingRooms.json';
import type { NursingRoom } from '../types';
import '../styles/nursing.css';

const allRooms = rawData as NursingRoom[];

const ZONE_LIST = [...new Set(allRooms.map((r) => r.zoneName).filter(Boolean))].sort();
const TOTAL = allRooms.length;
const ZONE_COUNT = ZONE_LIST.length;
const FAMILY_COUNT = allRooms.filter((r) => r.roomTypeName.includes('가족')).length;
const BREAST_COUNT = allRooms.filter((r) => r.roomTypeName.includes('모유') || r.roomTypeName.includes('착유')).length;

const FEATURES = [
  {
    icon: '🗺️',
    title: '지역별 검색',
    desc: '광역시/도와 시/군/구를 선택해 내 주변 수유시설을 빠르게 찾을 수 있습니다.',
  },
  {
    icon: '🔍',
    title: '키워드 검색',
    desc: '기관명, 주소, 건물 내 위치 키워드로 원하는 시설을 정확하게 검색합니다.',
  },
  {
    icon: '🏷️',
    title: '종류 필터',
    desc: '가족수유실과 모유수유/착유실로 구분하여 필요한 유형만 골라볼 수 있습니다.',
  },
  {
    icon: '📍',
    title: '지도 연동',
    desc: '네이버지도·카카오맵 바로가기로 길찾기까지 한 번에 해결합니다.',
  },
];

const Home = (): ReactElement => {
  const [keyword, setKeyword] = useState('');
  const [zone, setZone] = useState('전체');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (zone !== '전체') params.set('zone', zone);
    if (keyword.trim()) params.set('q', keyword.trim());
    navigate(`/nursing?${params.toString()}`);
  };

  return (
    <>
      <SEOHead
        title="수유시설 찾기 | 전국 수유시설 검색"
        description="전국 3,000여 개 수유시설 정보를 지역·종류별로 빠르게 찾아보세요."
      />

      {/* ── 히어로 ── */}
      <section className="nursing-hero">
        <div className="nursing-hero-inner">
          <span className="nursing-hero-icon">🤱</span>
          <h1 className="nursing-hero-title">
            가까운 수유시설을<br />빠르게 찾아보세요
          </h1>
          <p className="nursing-hero-desc">
            전국 <strong>{TOTAL.toLocaleString()}</strong>개 수유시설 정보 · {ZONE_COUNT}개 광역시/도
          </p>

          {/* 검색 폼 */}
          <form className="nursing-hero-form" onSubmit={handleSearch}>
            <select
              className="nursing-hero-select"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              <option value="전체">전체 지역</option>
              {ZONE_LIST.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
            <input
              type="text"
              className="nursing-hero-input"
              placeholder="기관명, 주소, 위치 검색..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="nursing-hero-btn">검색</button>
          </form>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section className="nursing-stats-section">
        <div className="container">
          <div className="nursing-stats-grid">
            <div className="nursing-stat-card">
              <span className="nursing-stat-num">{TOTAL.toLocaleString()}</span>
              <span className="nursing-stat-label">전국 수유시설</span>
            </div>
            <div className="nursing-stat-card">
              <span className="nursing-stat-num">{ZONE_COUNT}</span>
              <span className="nursing-stat-label">광역시/도</span>
            </div>
            <div className="nursing-stat-card">
              <span className="nursing-stat-num">{FAMILY_COUNT.toLocaleString()}</span>
              <span className="nursing-stat-label">가족수유실</span>
            </div>
            <div className="nursing-stat-card">
              <span className="nursing-stat-num">{BREAST_COUNT.toLocaleString()}</span>
              <span className="nursing-stat-label">모유수유/착유실</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 기능 소개 ── */}
      <section className="nursing-features-section">
        <div className="container">
          <h2 className="nursing-section-title">이런 기능을 제공합니다</h2>
          <div className="nursing-features-grid">
            {FEATURES.map((f) => (
              <div className="nursing-feature-card" key={f.title}>
                <span className="nursing-feature-icon">{f.icon}</span>
                <h3 className="nursing-feature-title">{f.title}</h3>
                <p className="nursing-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 지역 빠른 탐색 ── */}
      <section className="nursing-zones-section">
        <div className="container">
          <h2 className="nursing-section-title">지역별로 바로 찾기</h2>
          <div className="nursing-zones-grid">
            {ZONE_LIST.map((z) => {
              const cnt = allRooms.filter((r) => r.zoneName === z).length;
              return (
                <a
                  key={z}
                  href={`/ljhKDNnew/nursing?zone=${encodeURIComponent(z)}`}
                  className="nursing-zone-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/nursing?zone=${encodeURIComponent(z)}`);
                  }}
                >
                  <span className="nursing-zone-name">{z}</span>
                  <span className="nursing-zone-count">{cnt}개</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="nursing-cta-section">
        <div className="nursing-cta-inner">
          <h2>지금 바로 수유시설을 찾아보세요</h2>
          <p>전국 {TOTAL.toLocaleString()}개 수유시설 정보가 준비되어 있습니다</p>
          <a
            href="/ljhKDNnew/nursing"
            className="nursing-cta-btn"
            onClick={(e) => { e.preventDefault(); navigate('/nursing'); }}
          >
            수유시설 검색하기 →
          </a>
        </div>
      </section>

      {/* 데이터 출처 */}
      <div className="container">
        <div className="nursing-source" style={{ marginBottom: 40 }}>
          데이터 출처: <a href="https://sooyusil.com/home/22.htm" target="_blank" rel="noopener noreferrer">여성가족부 수유시설 현황 (sooyusil.com)</a>
          &nbsp;·&nbsp; 공개 데이터 수집 기준일: {allRooms[0]?.scrapedAt?.slice(0, 10) || ''}
          &nbsp;·&nbsp; 실제 운영 여부는 해당 기관에 문의하세요
        </div>
      </div>
    </>
  );
};

export default Home;
