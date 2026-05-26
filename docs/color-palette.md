# KDN 사이트 CSS 컬러 팔레트 문서

> 작성일: 2026-05-12
> 대상: https://kdn.dreamitbiz.com

---

## 1. 라이트 모드 (기본)

### 1-1. Navy 팔레트 (기본 Blue 테마)

| 변수 | HEX | 용도 |
|------|-----|------|
| `--navy-900` | `#0A1428` | 최진 제목, 강조 |
| `--navy-800` | `#0F1B33` | 부제목, ink 기본값 |
| `--navy-700` | `#1B2A4A` | 본문 네비, 테마 컬러 |
| `--navy-600` | `#2A3A5C` | 중간 강조 |
| `--navy-500` | `#4A5A7C` | 보조 텍스트 |
| `--navy-400` | `#7A89AB` | 연한 텍스트 |
| `--navy-300` | `#B8C0D6` | 보더 강조 |
| `--navy-200` | `#DDE2EE` | 보더 기본 |
| `--navy-100` | `#F0F2F8` | 배경 중간 |
| `--navy-50`  | `#F8F9FC` | 배경 연한 |
| `--gold`     | `#3D6FE0` | 강조 포인트 |

### 1-2. 시맨틱 토큰

| 변수 | 값 | 용도 |
|------|-----|------|
| `--ink` | `var(--navy-800)` | 기본 텍스트 색 |
| `--ink-soft` | `var(--navy-500)` | 보조 텍스트 |
| `--ink-surface` | `var(--navy-800)` | 어두운 배경 표면 |
| `--ink-surface-hover` | `var(--navy-900)` | 어두운 배경 호버 |
| `--line` | `var(--navy-200)` | 기본 보더 |
| `--line-strong` | `var(--navy-300)` | 강조 보더 |

### 1-3. 배경 & 텍스트

| 변수 | HEX | 용도 |
|------|-----|------|
| `--bg-white` | `#FFFFFF` | 기본 배경 |
| `--bg-light-gray` | `#F8F9FC` | 연한 배경 |
| `--bg-medium-gray` | `#F0F2F8` | 중간 배경 |
| `--text-primary` | `#0F1B33` | 주요 텍스트 |
| `--text-secondary` | `#4A5A7C` | 보조 텍스트 |
| `--text-light` | `#7A89AB` | 연한 텍스트 |
| `--text-white` | `#FFFFFF` | 밝은 배경 위 텍스트 |

### 1-4. 보더 & 그림자

| 변수 | 값 | 용도 |
|------|-----|------|
| `--border-light` | `#DDE2EE` | 기본 보더 |
| `--border-medium` | `#B8C0D6` | 강조 보더 |
| `--border-color` | `#DDE2EE` | 레거시 보더 |
| `--shadow-sm` | `0 1px 3px rgba(15,27,51,0.06)` | 작은 그림자 |
| `--shadow-md` | `0 4px 6px rgba(15,27,51,0.06), ...` | 중간 그림자 |
| `--shadow-lg` | `0 10px 25px rgba(15,27,51,0.08), ...` | 큰 그림자 |
| `--shadow-xl` | `0 20px 40px rgba(15,27,51,0.1), ...` | 초대형 그림자 |

### 1-5. 액센트 & 그라디언트

| 변수 | 값 | 용도 |
|------|-----|------|
| `--primary-blue` | `#1B2A4A` | 주 액센트 |
| `--primary-blue-dark` | `#0F1B33` | 어두운 액센트 |
| `--primary-blue-light` | `#3D6FE0` | 밝은 액센트 |
| `--primary-gradient` | `linear-gradient(135deg, #1B2A4A 0%, #3D6FE0 100%)` | 주 그라디언트 |
| `--accent-gradient` | `linear-gradient(135deg, #0F1B33 0%, #1B2A4A 50%, #3D6FE0 100%)` | 3단 그라디언트 |
| `--hero-bg` | `linear-gradient(135deg, #1B2A4A 0%, #0F1B33 50%, #0A1428 100%)` | 히어로 배경 |

### 1-6. 글래스모피즘

| 변수 | 값 | 용도 |
|------|-----|------|
| `--glass-bg` | `rgba(255,255,255,0.85)` | 유리 효과 배경 |
| `--glass-border` | `rgba(255,255,255,0.3)` | 유리 효과 보더 |
| `--glass-blur` | `12px` | 블러 강도 |

---

## 2. 다크 모드 (`[data-theme="dark"]`)

### 2-1. Custom Dark Palette

| 변수 | HEX | 용도 |
|------|-----|------|
| `--bg-white` | `#0F1419` | 기본 배경 (base) |
| `--bg-light-gray` | `#1A1F2E` | 표면 배경 (surface) |
| `--bg-medium-gray` | `#242938` | 엘리베이티드 배경 (elevated) |
| `--text-primary` | `#E6E8EB` | 주요 텍스트 |
| `--text-secondary` | `#A0A6B0` | 보조 텍스트 |
| `--text-light` | `#6B7280` | 연한 텍스트 |
| `--border-light` | `#2D3548` | 기본 보더 |
| `--border-medium` | `#3D4558` | 강조 보더 |

### 2-2. Navy 반전 스케일 (다크 모드)

텍스트용으로 밝은 값으로 반전됩니다.

| 변수 | HEX | 용도 |
|------|-----|------|
| `--navy-900` | `#E6E8EB` | 제목 (밝은) |
| `--navy-800` | `#D0D7E0` | 부제목 (밝은) |
| `--navy-700` | `#A0A6B0` | 본문/네비 |
| `--navy-600` | `#8B949E` | 중간 텍스트 |
| `--navy-500` | `#6B7280` | 보조 텍스트 |
| `--navy-400` | `#3D4558` | 연한 보더 |
| `--navy-300` | `#2D3548` | 보더 |
| `--navy-200` | `#1A1F2E` | 표면 배경 |
| `--navy-100` | `#0F1419` | 기본 배경 |
| `--navy-50`  | `#151A28` | 미묘한 엘리베이션 |

### 2-3. ink-surface 변수 (배경 전용)

> Navy 변수가 텍스트용으로 밝게 반전되는 문제를 해결하기 위해 도입.
> 배경에 사용 시 항상 어두운 값을 유지합니다.

| 변수 | 라이트 모드 | 다크 모드 | 용도 |
|------|------------|----------|------|
| `--ink-surface` | `var(--navy-800)` → `#0F1B33` | `#1A1F2E` | 어두운 표면 배경 |
| `--ink-surface-hover` | `var(--navy-900)` → `#0A1428` | `#242938` | 어두운 호버 배경 |

### 2-4. 다크 모드 액센트

| 변수 | HEX | 용도 |
|------|-----|------|
| `--primary-blue` | `#3B82F6` | 주 액센트 |
| `--primary-blue-dark` | `#2563EB` | 어두운 액센트 |
| `--primary-blue-light` | `#60A5FA` | 밝은 액센트 |
| `--glass-bg` | `rgba(15,20,25,0.90)` | 유리 효과 배경 |
| `--glass-border` | `rgba(255,255,255,0.06)` | 유리 효과 보더 |

---

## 3. 5색 컬러 테마

`html[data-color="..."]`로 전환. 각 테마는 라이트/다크 모두 지원.

### 3-1. Blue (기본 — Navy)

| 속성 | 라이트 | 다크 |
|------|--------|------|
| `--primary-blue` | `#1B2A4A` | `#3B82F6` |
| `--primary-blue-dark` | `#0F1B33` | `#2563EB` |
| `--primary-blue-light` | `#3D6FE0` | `#60A5FA` |

### 3-2. Red

| 속성 | 라이트 | 다크 |
|------|--------|------|
| `--primary-blue` | `#C8102E` | `#E74A5A` |
| `--primary-blue-dark` | `#8A001A` | `#C42B3B` |
| `--primary-blue-light` | `#E74A5A` | `#FD9393` |

### 3-3. Green

| 속성 | 라이트 | 다크 |
|------|--------|------|
| `--primary-blue` | `#00855A` | `#4AE79A` |
| `--primary-blue-dark` | `#005C3E` | `#2BC46A` |
| `--primary-blue-light` | `#4AE79A` | `#93FDC5` |

### 3-4. Purple

| 속성 | 라이트 | 다크 |
|------|--------|------|
| `--primary-blue` | `#5B2C8B` | `#B04AE7` |
| `--primary-blue-dark` | `#3C1A5E` | `#8B2BC4` |
| `--primary-blue-light` | `#B04AE7` | `#D493FD` |

### 3-5. Orange

| 속성 | 라이트 | 다크 |
|------|--------|------|
| `--primary-blue` | `#D4760A` | `#E7A04A` |
| `--primary-blue-dark` | `#8A4E00` | `#C4832B` |
| `--primary-blue-light` | `#E7A04A` | `#FDCF93` |

---

## 4. Practice 페이지 전용 컬러

### 4-1. 등급 뱃지 색상

| 등급 | 배경 | 텍스트 |
|------|------|--------|
| S+ | `#FFD700` (gold) | `#1B2A4A` |
| S | `linear-gradient(135deg, var(--ink-surface), var(--primary-blue))` | `#fff` |
| A+ | `var(--primary-blue)` | `#fff` |
| A | `var(--primary-blue-light)` | `#fff` |
| B+ | `#10B981` (emerald) | `#fff` |
| B | `linear-gradient(135deg, var(--ink-surface), #10B981)` | `#fff` |
| C | `#F59E0B` (amber) | `#fff` |
| D | `#EF4444` (red) | `#fff` |

### 4-2. 점수 바 색상

| 범위 | 색상 |
|------|------|
| 90~100% | `#10B981` (emerald) |
| 70~89% | `var(--primary-blue-light)` |
| 50~69% | `#F59E0B` (amber) |
| 0~49% | `#EF4444` (red) |

### 4-3. 시맨틱 뱃지

| 유형 | 배경 | 텍스트 |
|------|------|--------|
| 기초 | `rgba(59,130,246,0.1)` | `#3B82F6` |
| 중급 | `rgba(16,185,129,0.1)` | `#10B981` |
| 고급 | `rgba(139,92,246,0.1)` | `#8B5CF6` |
| 실전 | `rgba(245,158,11,0.1)` | `#F59E0B` |

### 4-4. 코드 블록 (다크 모드)

| 요소 | 색상 |
|------|------|
| 배경 | `#0F1419` |
| 텍스트 | `#E6E8EB` |
| 주석 | `#6B7280` |
| 키워드 | `#60A5FA` |
| 문자열 | `#4AE79A` |
| 함수명 | `#E7A04A` |
| 라인 넘버 | `#3D4558` |

---

## 5. 디자인 토큰 요약

### 스페이싱 스케일

| 변수 | 값 |
|------|-----|
| `--s-1` | `4px` |
| `--s-2` | `8px` |
| `--s-3` | `12px` |
| `--s-4` | `16px` |
| `--s-5` | `24px` |
| `--s-6` | `32px` |
| `--s-7` | `48px` |
| `--s-8` | `64px` |
| `--s-9` | `96px` |
| `--s-10` | `128px` |
| `--s-11` | `160px` |

### 레이디어스

| 변수 | 값 |
|------|-----|
| `--radius` | `4px` |
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `20px` |
| `--radius-full` | `9999px` |

### 기타 레이아웃

| 변수 | 값 |
|------|-----|
| `--nav-height` | `80px` |
| `--section-padding` | `80px` |
| `--container-max` | `1280px` |
| `--transition-base` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 6. ink-surface 설계 배경

### 문제
`background: var(--navy-800)` + `color: white` 조합의 섹션들이 다크 모드에서
navy-800이 밝은색(`#D0D7E0`)으로 반전되면서 **흰 배경 + 흰 글씨 = 가독성 0** 발생.

### 해결
`--ink-surface` / `--ink-surface-hover` 변수를 도입:
- 라이트 모드: `var(--navy-800)` / `var(--navy-900)` (어두운 배경 유지)
- 다크 모드: `#1A1F2E` / `#242938` (어두운 배경 유지)

### 적용 범위
- **TSX 인라인 스타일** (8개 파일, 21개 사용처): `background: 'var(--navy-800)'` → `'var(--ink-surface)'`
- **CSS 파일** (5개 파일): `background: var(--navy-800)` / `var(--navy-900)` → `var(--ink-surface)` / `var(--ink-surface-hover)`

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**
