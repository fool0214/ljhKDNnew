import { useState, type ReactElement, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { signUp } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const Register = (): ReactElement | null => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '', passwordConfirm: '', displayName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (isLoggedIn) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(form.password)) {
      setError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(form.email, form.password, form.displayName);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message || t('auth.signUpError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="auth-fullpage">
        <div className="auth-center-wrapper">
          <div className="auth-card-google">
            <div className="auth-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h2>{t('auth.signUpSuccess')}</h2>
              <p>{t('auth.checkEmail')}</p>
              <Link to="/login" className="auth-next-btn auth-btn-full">
                {t('auth.goToLogin')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <SEOHead title="회원가입" path="/register" noindex />
    <section className="auth-fullpage">
      <div className="auth-center-wrapper">
        <div className="auth-card-google">
          <div className="auth-logo-area">
            <span className="brand-dream">Dream</span>
            <span className="brand-it">IT</span>{' '}
            <span className="brand-biz">Biz</span>
          </div>
          <h2 className="auth-heading">{t('auth.signUpTitle')}</h2>
          <p className="auth-sub">{t('auth.signUpSubtitle')}</p>

          <form onSubmit={handleSubmit} className="auth-email-form">
            <div className="auth-input-group">
              <input
                type="text"
                value={form.displayName}
                onChange={e => setForm({ ...form, displayName: e.target.value })}
                placeholder={t('auth.displayNamePlaceholder')}
                required
                autoFocus
              />
            </div>
            <div className="auth-input-group">
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={t('auth.emailPlaceholder')}
                required
              />
            </div>
            <div className="auth-input-group">
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder={t('auth.passwordPlaceholder')}
                minLength={8}
                required
              />
            </div>
            <div className="auth-input-group">
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={e => setForm({ ...form, passwordConfirm: e.target.value })}
                placeholder={t('auth.passwordConfirmPlaceholder')}
                required
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-next-btn auth-btn-full" disabled={loading}>
              {loading ? t('auth.signingUp') : t('auth.signUp')}
            </button>
          </form>

          <div className="auth-bottom-link">
            <span>{t('auth.hasAccount')}</span>
            <Link to="/login">{t('auth.login')}</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
