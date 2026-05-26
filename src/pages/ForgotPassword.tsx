import { useState, type ReactElement, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { resetPassword } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const ForgotPassword = (): ReactElement => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError((err as Error).message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SEOHead title="비밀번호 찾기" path="/forgot-password" noindex />
    <section className="auth-fullpage">
      <div className="auth-center-wrapper">
        <div className="auth-card-google">
          <div className="auth-logo-area">
            <span className="brand-dream">Dream</span>
            <span className="brand-it">IT</span>{' '}
            <span className="brand-biz">Biz</span>
          </div>
          <h2 className="auth-heading">{t('auth.forgotPasswordTitle')}</h2>
          <p className="auth-sub">{t('auth.forgotPasswordSubtitle')}</p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
              }}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {t('auth.resetEmailSent')}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {t('auth.checkEmailForReset')}
              </p>
              <Link to="/login" className="auth-next-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                {t('auth.backToLogin')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-email-form">
              <div className="auth-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')}
                  required
                  autoFocus
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <div className="auth-form-actions">
                <Link to="/login" className="auth-back-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                  {t('auth.backToLogin')}
                </Link>
                <button type="submit" className="auth-next-btn" disabled={loading}>
                  {loading ? t('auth.sending') : t('auth.sendResetLink')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default ForgotPassword;
