-- =============================================
-- dasco_settings 테이블 생성 (AI 실습 API Key 저장 등)
-- Supabase SQL Editor에서 실행
-- =============================================

CREATE TABLE IF NOT EXISTS dasco_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE dasco_settings ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (API Key를 클라이언트에서 사용해야 하므로)
CREATE POLICY "dasco_settings_public_select"
  ON dasco_settings FOR SELECT
  USING (true);

-- superadmin만 쓰기 가능
CREATE POLICY "dasco_settings_admin_insert"
  ON dasco_settings FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

CREATE POLICY "dasco_settings_admin_update"
  ON dasco_settings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

CREATE POLICY "dasco_settings_admin_delete"
  ON dasco_settings FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'superadmin')
  );
