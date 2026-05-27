import { useState, useMemo, useCallback, type ReactElement, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import {
  filterRooms,
  getZoneList,
  getCityList,
  getRoomTypeBadgeClass,
  getNaverMapUrl,
  ROOM_TYPES,
  type FilterState,
} from '../../utils/nursingUtils';
import type { NursingRoom } from '../../types';
import rawData from '../../data/nursingRooms.json';
import '../../styles/nursing.css';

const allRooms = rawData as NursingRoom[];
const PAGE_SIZE = 20;

const INIT_FILTER: FilterState = { zone: '전체', city: '전체', roomType: '전체', keyword: '' };

const NursingRoomSearch = (): ReactElement => {
  const [filter, setFilter] = useState<FilterState>(INIT_FILTER);
  const [inputKeyword, setInputKeyword] = useState('');
  const [page, setPage] = useState(1);

  const zoneList = useMemo(() => getZoneList(allRooms), []);
  const cityList = useMemo(() => getCityList(allRooms, filter.zone), [filter.zone]);

  const filtered = useMemo(() => filterRooms(allRooms, filter), [filter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter((f) => ({ ...f, keyword: inputKeyword }));
    setPage(1);
  };

  const handleZone = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((f) => ({ ...f, zone: e.target.value, city: '전체' }));
    setPage(1);
  };

  const handleCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((f) => ({ ...f, city: e.target.value }));
    setPage(1);
  };

  const handleRoomType = useCallback((type: string) => {
    setFilter((f) => ({ ...f, roomType: type }));
    setPage(1);
  }, []);

  const handleReset = () => {
    setFilter(INIT_FILTER);
    setInputKeyword('');
    setPage(1);
  };

  const hasFilter =
    filter.zone !== '전체' ||
    filter.city !== '전체' ||
    filter.roomType !== '전체' ||
    filter.keyword !== '';

  return (
    <div className="page-container">
      <div className="nursing-page">
        {/* 헤더 */}
        <div className="nursing-header">
          <span className="nursing-header-icon">🤱</span>
          <h1>수유시설 찾기</h1>
          <p>전국 수유시설 {allRooms.length.toLocaleString()}개 정보를 검색하세요</p>
        </div>

        {/* 검색창 */}
        <form className="nursing-search-box" onSubmit={handleSearch}>
          <input
            type="text"
            className="nursing-search-input"
            placeholder="기관명, 주소, 위치 검색..."
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
          <button type="submit" className="nursing-search-btn">검색</button>
        </form>

        {/* 필터 */}
        <div className="nursing-filters">
          <div className="nursing-filter-group">
            <span className="nursing-filter-label">광역시/도</span>
            <select className="nursing-filter-select" value={filter.zone} onChange={handleZone}>
              {zoneList.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div className="nursing-filter-group">
            <span className="nursing-filter-label">시/군/구</span>
            <select className="nursing-filter-select" value={filter.city} onChange={handleCity}>
              {cityList.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="nursing-filter-group" style={{ minWidth: '100%' }}>
            <span className="nursing-filter-label">수유실 종류</span>
            <div className="nursing-type-tabs">
              {ROOM_TYPES.map((t) => (
                <button
                  key={t}
                  className={`nursing-type-tab ${filter.roomType === t ? 'active' : ''}`}
                  onClick={() => handleRoomType(t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 바 */}
        <div className="nursing-result-bar">
          <span className="nursing-result-count">
            검색 결과 <strong>{filtered.length.toLocaleString()}</strong>건
          </span>
          {hasFilter && (
            <button className="nursing-reset-btn" onClick={handleReset} type="button">
              필터 초기화
            </button>
          )}
        </div>

        {/* 카드 목록 */}
        {pageItems.length === 0 ? (
          <div className="nursing-empty">
            <span className="nursing-empty-icon">🔍</span>
            <p className="nursing-empty-title">검색 결과가 없습니다</p>
            <p className="nursing-empty-desc">다른 검색어나 필터를 사용해보세요</p>
          </div>
        ) : (
          <div className="nursing-grid">
            {pageItems.map((room) => (
              <NursingCard key={room.id} room={room} />
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

        {/* 데이터 출처 */}
        <div className="nursing-source">
          데이터 출처: <a href="https://sooyusil.com/home/22.htm" target="_blank" rel="noopener noreferrer">여성가족부 수유시설 현황 (sooyusil.com)</a>
          &nbsp;·&nbsp; 공개 데이터 수집 기준일: {allRooms[0]?.scrapedAt?.slice(0, 10) || ''}
          &nbsp;·&nbsp; 실제 운영 여부는 해당 기관에 문의하세요
        </div>
      </div>
    </div>
  );
};

// ── 수유시설 카드 ──
const NursingCard = ({ room }: { room: NursingRoom }): ReactElement => (
  <Link to={`/nursing/${room.id}`} className="nursing-card">
    <div className="nursing-card-top">
      <span className="nursing-card-name">{room.roomName}</span>
      <div className="nursing-card-badges">
        <span className={`nursing-badge ${getRoomTypeBadgeClass(room.roomTypeName)}`}>
          {room.roomTypeName}
        </span>
        {room.fatherUseName === '가능' && (
          <span className="nursing-badge nursing-badge-father">아빠 이용 가능</span>
        )}
      </div>
    </div>

    <div className="nursing-card-meta">
      <div className="nursing-card-meta-row">
        <svg className="nursing-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{room.zoneName} {room.cityName} · {room.address}</span>
      </div>
      {room.location && (
        <div className="nursing-card-meta-row">
          <svg className="nursing-card-meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
          <span>{room.location}</span>
        </div>
      )}
    </div>

    <div className="nursing-card-actions" onClick={(e) => e.preventDefault()}>
      <a
        href={getNaverMapUrl(room)}
        target="_blank"
        rel="noopener noreferrer"
        className="nursing-map-btn naver"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        네이버지도
      </a>
      <span className="board-btn" style={{ fontSize: 13 }}>
        상세보기 →
      </span>
    </div>
  </Link>
);

export default NursingRoomSearch;
