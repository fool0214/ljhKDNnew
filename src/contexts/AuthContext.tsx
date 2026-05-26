import { createContext, useContext, useState, useEffect, useCallback, type ReactElement } from 'react';
import type { User } from '@supabase/supabase-js';
import getSupabase from '../utils/supabase';
import { getProfile, updateProfile, signOut as authSignOut } from '../utils/auth';
import { ADMIN_EMAILS } from '../config/admin';
import type { UserProfile, AccountBlock } from '../types';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import ProfileCompleteModal from '../components/ProfileCompleteModal';
import PaymentNudgePopup from '../components/PaymentNudgePopup';
import site from '../config/site';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  needsProfileCompletion: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  accountBlock: AccountBlock | null;
  clearAccountBlock: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountBlock, setAccountBlock] = useState<AccountBlock | null>(null);

  const loadProfile = useCallback(async (authUser: User | null) => {
    if (!authUser) {
      setProfile(null);
      return;
    }
    let p = await getProfile(authUser.id);
    // 프로필 미존재 시 자동 생성 (OAuth 첫 로그인 등)
    if (!p) {
      const client = getSupabase();
      if (client) {
        const meta = authUser.user_metadata || {};
        const currentDomain = window.location.hostname;
        const { data } = await client.from('user_profiles').insert({
          id: authUser.id,
          email: authUser.email || '',
          name: meta.full_name || meta.name || '',
          display_name: meta.full_name || meta.name || '',
          phone: '',
          provider: authUser.app_metadata?.provider || 'email',
          signup_domain: currentDomain,
          visited_sites: [currentDomain],
          role: 'member',
        }).select().single();
        if (data) p = data as UserProfile;
      }
    }
    // signup_domain, role 자동 초기화 + 현재 도메인 visited_sites 자동 추가
    if (p) {
      const updates: Record<string, unknown> = {};
      const currentDomain = window.location.hostname;
      if (!p.signup_domain) updates.signup_domain = currentDomain;
      if (!p.role || p.role === 'user') updates.role = 'member';
      // 현재 도메인이 visited_sites에 없으면 자동 추가
      const sites = Array.isArray(p.visited_sites) ? p.visited_sites : [];
      if (!sites.includes(currentDomain)) {
        updates.visited_sites = [...sites, currentDomain];
      }
      if (Object.keys(updates).length > 0) {
        try {
          const updated = await updateProfile(authUser.id, updates);
          setProfile(updated);
        } catch {
          setProfile(p);
        }
      } else {
        setProfile(p);
      }
    }

    // 계정 상태 체크
    try {
      const client = getSupabase();
      if (client) {
        const { data: statusData } = await client.rpc('check_user_status', {
          target_user_id: authUser.id,
          current_domain: window.location.hostname,
        });
        if (statusData && statusData.status && statusData.status !== 'active') {
          setAccountBlock({
            status: statusData.status,
            reason: statusData.reason || '',
            suspended_until: statusData.suspended_until || null,
          });
          await authSignOut();
          setUser(null);
          setProfile(null);
          return;
        }
      }
    } catch {
      // check_user_status 함수 미존재 시 무시
    }
  }, []);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setLoading(false);
      return;
    }

    // onAuthStateChange 하나로 통합 — INITIAL_SESSION은 OAuth 코드 교환 완료 후 발생
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u);
        // 실제 로그인 시에만 last_sign_in_at 갱신
        if (event === 'SIGNED_IN') {
          client.from('user_profiles')
            .update({ last_sign_in_at: new Date().toISOString() })
            .eq('id', u.id)
            .then(() => {});
        }
      } else {
        setProfile(null);
      }
      // INITIAL_SESSION: 초기 로드 완료 (OAuth 콜백 코드 교환 포함)
      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    // 안전장치: INITIAL_SESSION이 5초 내 안 오면 loading 해제
    const fallbackTimer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn('Auth: INITIAL_SESSION timeout, forcing loading=false');
        return false;
      });
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user);
  }, [user, loadProfile]);

  const allEmails = [
    user?.email,
    user?.user_metadata?.email as string | undefined,
    (user?.identities?.[0]?.identity_data as Record<string, unknown> | undefined)?.email as string | undefined,
    profile?.email,
  ].filter((e): e is string => Boolean(e)).map((e) => e.toLowerCase());
  const isAdmin = allEmails.some((e) => ADMIN_EMAILS.includes(e));
  const isLoggedIn = !!user;
  const needsProfileCompletion = isLoggedIn && !!profile && !profile.name;


  // 10분 무동작 세션 타임아웃
  useIdleTimeout({
  enabled: isLoggedIn,
  onTimeout: () => {
  authSignOut().catch(() => {});
  },
  });

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isLoggedIn,
      isAdmin,
      needsProfileCompletion,
      signOut,
      refreshProfile,
      accountBlock,
      clearAccountBlock: () => setAccountBlock(null),
    }}>
      {children}
      {needsProfileCompletion && (
        <ProfileCompleteModal user={user!} onComplete={refreshProfile} />
      )}
      {isLoggedIn && user && !needsProfileCompletion && (
        <PaymentNudgePopup user={user} siteSlug={site.id} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
