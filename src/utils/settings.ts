import getSupabase from './supabase';
import site from '../config/site';

const TABLE = `${site.dbPrefix}settings`;

/** 설정값 읽기 */
export async function getSetting(key: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from(TABLE)
    .select('value')
    .eq('key', key)
    .maybeSingle();
  return data?.value ?? null;
}

/** 설정값 저장 (upsert) — 관리자 전용 */
export async function setSetting(key: string, value: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase not initialized');
  const { error } = await supabase
    .from(TABLE)
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
}

/** 설정값 삭제 — 관리자 전용 */
export async function deleteSetting(key: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase not initialized');
  const { error } = await supabase.from(TABLE).delete().eq('key', key);
  if (error) throw error;
}
