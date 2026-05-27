/**
 * scrapeNursingRooms.mjs
 * 여성가족부 수유시설 현황 (sooyusil.com) 크롤링 스크립트
 *
 * 사용법:  node scripts/scrapeNursingRooms.mjs
 * 결과:    src/data/nursingRooms.json
 *
 * 주의:
 *  - 병렬 요청 금지 (순차 요청 + delay 적용)
 *  - 공개 HTML 데이터만 수집
 *  - 과도한 요청을 보내지 않음 (페이지당 1.5초 대기)
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '../src/data/nursingRooms.json');
const BASE_URL = 'https://sooyusil.com/home/22.htm';
const DELAY_MS = 1500; // 페이지 간 대기 (서버 부하 방지)
const MAX_PAGES = 400; // 안전 상한 (실제 약 306페이지)

// cheerio 동적 import (설치 여부 확인)
let load;
try {
  const cheerio = await import('cheerio');
  load = cheerio.load;
  console.log('✅ cheerio 사용');
} catch {
  console.error('❌ cheerio가 설치되지 않았습니다.');
  console.error('   npm install --save-dev cheerio 실행 후 다시 시도하세요.');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// HTML 텍스트 정제
const clean = (text = '') =>
  text.replace(/\s+/g, ' ').replace(/[\r\n\t]/g, '').trim();

// 중복 제거 키 생성
const dedupeKey = (row) =>
  `${row.roomName}|${row.address || ''}|${row.location || ''}`;

async function fetchPage(pageNo) {
  const url = `${BASE_URL}?pageNo=${pageNo}&zoneName=&cityName=&roomTypeCode=`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Referer: BASE_URL,
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${pageNo}`);
  return res.text();
}

function parsePage(html, pageNo) {
  const $ = load(html);
  const rows = [];

  // 첫 페이지에서 컬럼 정보 출력
  if (pageNo === 1) {
    const headers = [];
    $('table thead th, table tr:first-child th').each((_, el) => {
      headers.push(clean($(el).text()));
    });
    if (headers.length) {
      console.log('  📋 컬럼 확인:', headers.join(' | '));
    }
  }

  // tbody의 tr 파싱
  $('table tbody tr').each((_, tr) => {
    const tds = $(tr).find('td');
    if (tds.length < 5) return; // 데이터 행 아님

    const cells = tds.map((_, td) => clean($(td).text())).get();

    // 컬럼 순서: 번호, 광역시/도, 시/군/구, 기관명, 주소, 위치, 용도, 유형
    // (실제 컬럼 수에 따라 유연하게 처리)
    let zoneName, cityName, roomName, address, location, roomTypeName, facilityType;

    if (cells.length >= 8) {
      // [0]=번호, [1]=광역시도, [2]=시군구, [3]=기관명, [4]=주소, [5]=위치, [6]=용도, [7]=유형
      [, zoneName, cityName, roomName, address, location, roomTypeName, facilityType] = cells;
    } else if (cells.length >= 7) {
      [, zoneName, cityName, roomName, address, location, roomTypeName] = cells;
      facilityType = null;
    } else {
      return; // 파싱 불가
    }

    if (!roomName || roomName === '-') return;

    rows.push({
      zoneName: clean(zoneName) || '',
      cityName: clean(cityName) || '',
      roomName: clean(roomName) || '',
      address: clean(address) || '',
      location: clean(location) || '',
      roomTypeName: clean(roomTypeName) || '',
      facilityType: facilityType ? clean(facilityType) : null,
    });
  });

  return rows;
}

// 전체 레코드 수 파싱
function parseTotalCount(html) {
  const $ = load(html);
  const text = $('body').text();
  const match = text.match(/전체\s*([\d,]+)\s*건/);
  if (match) return parseInt(match[1].replace(/,/g, ''), 10);
  return null;
}

async function main() {
  console.log('🚀 수유시설 크롤링 시작');
  console.log(`   대상: ${BASE_URL}`);
  console.log(`   페이지 간 대기: ${DELAY_MS}ms\n`);

  // 1페이지로 전체 수 파악
  let html1;
  try {
    html1 = await fetchPage(1);
  } catch (e) {
    console.error('❌ 1페이지 요청 실패:', e.message);
    console.log('→ 샘플 데이터를 유지합니다.');
    process.exit(0);
  }

  const totalCount = parseTotalCount(html1);
  const estimatedPages = totalCount ? Math.ceil(totalCount / 10) : MAX_PAGES;
  console.log(`📊 전체 데이터: ${totalCount ?? '?'}건 / 예상 페이지: ${estimatedPages}페이지\n`);

  const allRows = [];
  const seen = new Set();
  let emptyPageCount = 0;

  for (let pageNo = 1; pageNo <= Math.min(estimatedPages, MAX_PAGES); pageNo++) {
    try {
      const html = pageNo === 1 ? html1 : await fetchPage(pageNo);
      const rows = parsePage(html, pageNo);

      if (rows.length === 0) {
        emptyPageCount++;
        if (emptyPageCount >= 3) {
          console.log(`\n⚠️ 빈 페이지 3회 연속 → 수집 종료`);
          break;
        }
        console.log(`  페이지 ${pageNo}: 데이터 없음 (${emptyPageCount}/3)`);
      } else {
        emptyPageCount = 0;
        let added = 0;
        for (const row of rows) {
          const key = dedupeKey(row);
          if (!seen.has(key)) {
            seen.add(key);
            allRows.push(row);
            added++;
          }
        }
        process.stdout.write(
          `\r  진행: ${pageNo}/${estimatedPages}페이지 | 수집: ${allRows.length}건 (+${added})`
        );
      }
    } catch (e) {
      console.log(`\n  ⚠️ 페이지 ${pageNo} 실패: ${e.message} (계속 진행)`);
    }

    if (pageNo < Math.min(estimatedPages, MAX_PAGES)) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n\n✅ 수집 완료: ${allRows.length}건 (중복 제거 후)`);

  if (allRows.length === 0) {
    console.log('⚠️ 수집된 데이터가 없습니다. 샘플 데이터를 유지합니다.');
    process.exit(0);
  }

  // 정규화 및 ID 부여
  const now = new Date().toISOString();
  const normalized = allRows.map((row, idx) => ({
    id: `nr-${String(idx + 1).padStart(5, '0')}`,
    roomName: row.roomName,
    zoneName: row.zoneName,
    cityName: row.cityName,
    address: row.address,
    location: row.location,
    roomTypeName: row.roomTypeName,
    fatherUseName: null,
    facilityType: row.facilityType,
    managerTelNo: null,
    latitude: null,
    longitude: null,
    sourceUrl: BASE_URL,
    scrapedAt: now,
  }));

  // 저장
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(normalized, null, 2), 'utf-8');
  console.log(`💾 저장 완료: ${OUTPUT_PATH}`);
  console.log(`   총 ${normalized.length}건`);
}

main().catch((e) => {
  console.error('❌ 크롤링 실패:', e);
  process.exit(1);
});
