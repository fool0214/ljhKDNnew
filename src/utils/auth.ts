/**
 * auth.ts — Supabase Auth 헬퍼 함수
 */
import type { UserProfile } from '../types';
import getSupabase from './supabase';

/** Google OAuth 로그인 */
export async function signInWithGoogle() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (error) throw error;
  return data;
}

/** Kakao OAuth 로그인 */
export async function signInWithKakao() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      scopes: 'profile_nickname profile_image account_email',
    }
  });
  if (error) throw error;
  return data;
}

/** 이메일/비밀번호 로그인 */
export async function signInWithEmail(email: string, password: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** 이메일 회원가입 */
export async function signUp(email: string, password: string, displayName: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: displayName,
        signup_domain: window.location.hostname,
      }
    }
  });
  if (error) throw error;
  return data;
}

/** 로그아웃 — local scope로 OAuth 세션 만료 시 에러 방지 */
export async function signOut() {
  const client = getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut({ scope: 'local' });
  if (error) throw error;
}

/** 프로필 조회 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('getProfile error:', error);
    return null;
  }
  return data as UserProfile;
}

/** 비밀번호 재설정 이메일 전송 */
export async function resetPassword(email: string) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  const { data, error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  if (error) throw error;
  return data;
}

/** 프로필 업데이트 */
export async function updateProfile(
  userId: string,
  updates: Record<string, unknown>
): Promise<UserProfile | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data as UserProfile;
}
