import type { NursingRoom } from '../types';

// ── 지도 링크 생성 ──
export function getNaverMapUrl(room: NursingRoom): string {
  const q = room.address || `${room.zoneName} ${room.cityName} ${room.roomName}`;
  return `https://map.naver.com/v5/search/${encodeURIComponent(q)}`;
}

export function getKakaoMapUrl(room: NursingRoom): string {
  const q = room.address || `${room.zoneName} ${room.cityName} ${room.roomName}`;
  return `https://map.kakao.com/?q=${encodeURIComponent(q)}`;
}

// ── 거리 계산 (Haversine) ──
export function calcDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

// ── 광역시/도 목록 추출 ──
export function getZoneList(rooms: NursingRoom[]): string[] {
  const set = new Set(rooms.map((r) => r.zoneName).filter(Boolean));
  return ['전체', ...Array.from(set).sort()];
}

// ── 시/군/구 목록 추출 (선택된 광역시/도 기준) ──
export function getCityList(rooms: NursingRoom[], zone: string): string[] {
  const filtered = zone === '전체' ? rooms : rooms.filter((r) => r.zoneName === zone);
  const set = new Set(filtered.map((r) => r.cityName).filter(Boolean));
  return ['전체', ...Array.from(set).sort()];
}

// ── 데이터 필터링 ──
export interface FilterState {
  zone: string;
  city: string;
  roomType: string;
  keyword: string;
}

export function filterRooms(rooms: NursingRoom[], f: FilterState): NursingRoom[] {
  return rooms.filter((r) => {
    if (f.zone !== '전체' && r.zoneName !== f.zone) return false;
    if (f.city !== '전체' && r.cityName !== f.city) return false;
    if (f.roomType !== '전체' && r.roomTypeName !== f.roomType) return false;
    if (f.keyword.trim()) {
      const kw = f.keyword.trim().toLowerCase();
      const target = `${r.roomName} ${r.address} ${r.location}`.toLowerCase();
      if (!target.includes(kw)) return false;
    }
    return true;
  });
}

// ── 용도 레이블 ──
export const ROOM_TYPES = ['전체', '가족수유실', '모유수유/착유실'];

// ── 용도 뱃지 색상 ──
export function getRoomTypeBadgeClass(type: string): string {
  if (type.includes('가족')) return 'nursing-badge-family';
  if (type.includes('모유') || type.includes('착유')) return 'nursing-badge-breast';
  return 'nursing-badge-default';
}
