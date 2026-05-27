import { useMemo, type ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNaverMapUrl, getKakaoMapUrl, getRoomTypeBadgeClass } from '../../utils/nursingUtils';
import type { NursingRoom } from '../../types';
import rawData from '../../data/nursingRooms.json';
import '../../styles/nursing.css';

const allRooms = rawData as NursingRoom[];

const NursingRoomDetail = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const room = useMemo(() => allRooms.find((r) => r.id === id) ?? null, [id]);

  if (!room) {
    return (
      <div className="page-container">
        <div className="nursing-detail-page">
          <Link to="/nursing" className="nursing-detail-back">
            ← 목록으로
          </Link>
          <div className="nursing-empty">
            <span className="nursing-empty-icon">😢</span>
            <p className="nursing-empty-title">시설 정보를 찾을 수 없습니다</p>
            <p className="nursing-empty-desc">목록으로 돌아가서 다시 검색해보세요</p>
          </div>
        </div>
      </div>
    );
  }

  const rows: { key: string; value: string | null }[] = [
    { key: '광역시/도', value: room.zoneName },
    { key: '시/군/구', value: room.cityName },
    { key: '주소', value: room.address },
    { key: '건물 내 위치', value: room.location },
    { key: '수유실 종류', value: room.roomTypeName },
    { key: '아빠 이용', value: room.fatherUseName || '정보 없음' },
    { key: '시설 유형', value: room.facilityType || '정보 없음' },
    { key: '연락처', value: room.managerTelNo || '정보 없음' },
  ];

  return (
    <div className="page-container">
      <div className="nursing-detail-page">
        {/* 뒤로가기 */}
        <Link to="/nursing" className="nursing-detail-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          수유시설 목록
        </Link>

        <div className="nursing-detail-card">
          {/* 헤더 */}
          <div className="nursing-detail-header">
            <div className="nursing-detail-badges">
              <span className={`nursing-badge ${getRoomTypeBadgeClass(room.roomTypeName)}`}>
                {room.roomTypeName}
              </span>
              {room.fatherUseName === '가능' && (
                <span className="nursing-badge nursing-badge-father">👨 아빠 이용 가능</span>
              )}
              {room.facilityType && (
                <span className="nursing-badge nursing-badge-default">{room.facilityType}</span>
              )}
            </div>
            <h1 className="nursing-detail-name">{room.roomName}</h1>
            <p className="nursing-detail-region">{room.zoneName} {room.cityName}</p>
          </div>

          {/* 상세 정보 */}
          <div className="nursing-detail-body">
            {rows.map(({ key, value }) => (
              value ? (
                <div className="nursing-detail-row" key={key}>
                  <span className="nursing-detail-key">{key}</span>
                  <span className="nursing-detail-val">{value}</span>
                </div>
              ) : null
            ))}
          </div>

          {/* 지도 버튼 */}
          <div className="nursing-detail-footer">
            <a
              href={getNaverMapUrl(room)}
              target="_blank"
              rel="noopener noreferrer"
              className="nursing-map-btn naver"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              네이버지도로 보기
            </a>
            <a
              href={getKakaoMapUrl(room)}
              target="_blank"
              rel="noopener noreferrer"
              className="nursing-map-btn kakao"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              카카오맵으로 보기
            </a>
            <Link to="/nursing" className="board-btn" style={{ marginLeft: 'auto' }}>
              목록으로
            </Link>
          </div>
        </div>

        {/* 데이터 출처 */}
        <div className="nursing-source">
          데이터 출처: <a href="https://sooyusil.com/home/22.htm" target="_blank" rel="noopener noreferrer">여성가족부 수유시설 현황 (sooyusil.com)</a>
          &nbsp;·&nbsp; 실제 운영 여부는 해당 기관에 직접 문의하세요
        </div>
      </div>
    </div>
  );
};

export default NursingRoomDetail;
