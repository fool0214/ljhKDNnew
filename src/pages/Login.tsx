import { useState, useEffect, type ReactElement, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, signInWithKakao, signInWithEmail } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

type LoginStep = 'method' | 'email';

const Login = (): ReactElement | null => {
  const { t } = useLanguage();
  const { isLoggedIn, accountBlock, clearAccountBlock } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const [step, setStep] = useState<LoginStep>('method');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // OAuth 콜백 에러 감지 (리다이렉트 실패 시 URL에 error 파라미터 포함)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get('error');
    const errorDesc = params.get('error_description');
    if (errorCode) {
      setError(errorDesc || `로그인 오류: ${errorCode}`);
      // URL 정리
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }
  }, []);

  if (isLoggedIn) {
    navigate(from, { replace: true });
    return null;
  }

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmail(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    setError('');
    try {
      if (provider === 'google') await signInWithGoogle();
      else if (provider === 'kakao') await signInWithKakao();
    } catch (err) {
      setError((err as Error).message || t('auth.loginError'));
    }
  };

  return (
    <>
    <SEOHead title="로그인" path="/login" noindex />
    <section className="auth-fullpage">
      <div className="auth-center-wrapper">
        <div className="auth-card-google">
          <div className="auth-logo-area">
            <span className="brand-dream">Dream</span>
            <span className="brand-it">IT</span>{' '}
            <span className="brand-biz">Biz</span>
          </div>
          <h2 className="auth-heading">{t('auth.loginTitle')}</h2>
          <p className="auth-sub">{t('auth.loginSubtitle')}</p>

          {accountBlock && (
            <div className="auth-error" style={{ marginBottom: '16px' }}>
              {accountBlock.status === 'banned' && (
                <>
                  계정이 차단되었습니다.
                  {accountBlock.reason && <> 사유: {accountBlock.reason}</>}
                </>
              )}
              {accountBlock.status === 'deleted' && (
                <>탈퇴 처리된 계정입니다.</>
              )}
              <button
                onClick={clearAccountBlock}
                style={{
                  display: 'block', marginTop: '8px', background: 'none',
                  border: 'none', textDecoration: 'underline', cursor: 'pointer',
                  color: 'inherit', fontSize: '12px', padding: 0,
                }}
              >
                닫기
              </button>
            </div>
          )}

          {step === 'method' ? (
            <>
              <div className="auth-methods">
                <button className="auth-method-btn google" onClick={() => handleSocialLogin('google')}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="auth-method-btn kakao" onClick={() => handleSocialLogin('kakao')}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.52 6.6-.2.74-.72 2.68-.82 3.1-.13.5.18.49.38.36.16-.1 2.5-1.7 3.5-2.4.78.12 1.58.18 2.42.18 5.52 0 10-3.58 10-7.9S17.52 3 12 3z" fill="#3C1E1E"/>
                  </svg>
                  <span>Kakao</span>
                </button>
                <button className="auth-method-btn email" onClick={() => setStep('email')}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>Email</span>
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <div className="auth-bottom-link">
                <span>{t('auth.noAccount')}</span>
                <Link to="/register">{t('auth.signUp')}</Link>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleEmailLogin} className="auth-email-form">
                <div className="auth-input-group">
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={t('auth.emailPlaceholder')}
                    required
                    autoFocus
                  />
                </div>
                <div className="auth-input-group">
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder={t('auth.passwordPlaceholder')}
                    required
                  />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <div className="auth-form-actions">
                  <button type="button" className="auth-back-btn" onClick={() => { setStep('method'); setError(''); }}>
                    {t('auth.back') || '뒤로'}
                  </button>
                  <button type="submit" className="auth-next-btn" disabled={loading}>
                    {loading ? t('auth.loggingIn') : t('auth.login')}
                  </button>
                </div>
              </form>

              <div className="auth-forgot-link" style={{ textAlign: 'center', marginBottom: '12px' }}>
                <Link to="/forgot-password" style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <div className="auth-bottom-link">
                <span>{t('auth.noAccount')}</span>
                <Link to="/register">{t('auth.signUp')}</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
