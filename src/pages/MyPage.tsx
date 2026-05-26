import { useState, useEffect, type ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import '../styles/auth.css';

const MyPage = (): ReactElement => {
  const { t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '', avatarUrl: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({
        displayName: profile.display_name || '',
        avatarUrl: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user!.id, {
        display_name: form.displayName,
        avatar_url: form.avatarUrl
      });
      await refreshProfile();
      setEditing(false);
      setMessage(t('auth.profileUpdated'));
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="마이페이지" path="/mypage" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('auth.myPage')}</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="mypage-card">
            <div className="mypage-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} loading="lazy" />
              ) : (
                <div className="mypage-avatar-placeholder">
                  {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="mypage-info">
              {editing ? (
                <div className="mypage-edit-form">
                  <div className="auth-form-group">
                    <label>{t('auth.displayName')}</label>
                    <input
                      type="text"
                      value={form.displayName}
                      onChange={e => setForm({ ...form, displayName: e.target.value })}
                    />
                  </div>
                  <div className="mypage-edit-actions">
                    <button className="board-btn primary" onClick={handleSave} disabled={saving}>
                      {saving ? t('auth.saving') : t('auth.save')}
                    </button>
                    <button className="board-btn" onClick={() => setEditing(false)}>
                      {t('community.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mypage-name">{profile?.display_name || t('auth.noName')}</h2>
                  <p className="mypage-email">{user?.email}</p>
                  <p className="mypage-provider">
                    {profile?.provider ? `${t('auth.loginWith')} ${profile.provider}` : t('auth.emailAccount')}
                  </p>
                  {profile?.role === 'admin' && (
                    <span className="mypage-role-badge">{t('auth.admin')}</span>
                  )}
                  <button className="board-btn" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                    {t('auth.editProfile')}
                  </button>
                </>
              )}

              {message && <div className="auth-message">{message}</div>}
            </div>

            <div className="mypage-sections">
              <Link to="/mypage/orders" className="mypage-link-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>{t('auth.orderHistory')}</span>
              </Link>
            </div>

            <div className="mypage-footer">
              <button className="board-btn danger" onClick={handleSignOut}>
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
