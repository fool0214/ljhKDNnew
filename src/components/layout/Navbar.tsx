import { useState, useEffect, useRef, type ReactElement, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchModal from '../SearchModal';
import site from '../../config/site';
import type { MenuItem } from '../../types';

interface ResolvedMenuItem extends MenuItem {
  label: string;
  dropdown?: (MenuItem & { label: string })[];
}

const Navbar = (): ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { mode, toggleTheme, colorTheme, setColorTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { cartCount } = useCart();
  const { isLoggedIn, isAdmin, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setShowUserMenu(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const menuItems: ResolvedMenuItem[] = site.menuItems.map((item) => ({
    ...item,
    label: t(item.labelKey),
    dropdown: item.dropdown
      ? item.dropdown.map((sub) => ({ ...sub, label: t(sub.labelKey) }))
      : undefined
  }));

  const isActive = (item: ResolvedMenuItem): boolean => {
    const checkPath = item.activePath || item.path;
    if (checkPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(checkPath);
  };

  const userInitial = (profile?.display_name || profile?.email || '?')[0].toUpperCase();

  return (
    <>
      {/* TopBar */}
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span className="topbar-tag">기업강의 맞춤제작 2026.05.18</span>
            <span className="topbar-tag topbar-tag-extra">DreamIT Biz -  Ph.D Aebon</span>
          </div>
          <div className="topbar-right">
            <button onClick={toggleLanguage}>{language === 'ko' ? 'KR / EN' : 'EN / KR'}</button>
            <span>{site.company.phone}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            <div className="logo">
              <Link to="/">
                <span className="brand-mark">
                  KDN<span className="brand-ampersand"> </span><span className="brand-accent">Vibe Coding</span>
                </span>
              </Link>
            </div>

            <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${item.dropdown ? 'nav-item-dropdown' : ''} ${activeDropdown === index ? 'active' : ''}`}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <>
                      <Link
                        to={item.path}
                        className={`nav-link ${isActive(item) ? 'active' : ''}`}
                        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                          if (window.innerWidth <= 1100) {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === index ? null : index);
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                      <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                        {item.dropdown.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subItem.path}>{subItem.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.path} className={`nav-link ${isActive(item) ? 'active' : ''}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              {site.features.search && (
                <button className="nav-search-btn" onClick={() => setShowSearch(true)} aria-label="Search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              )}
              {site.features.shop && (
                <Link to="/cart" className="cart-icon-link" aria-label="Cart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cart-icon-svg">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              )}
              <div className="color-picker-wrapper">
                <button
                  className="color-picker-btn"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  aria-label="Color theme"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="13.5" cy="6.5" r="2.5" style={{ fill: '#C8102E', stroke: 'none' }} />
                    <circle cx="17.5" cy="10.5" r="2.5" style={{ fill: '#C87200', stroke: 'none' }} />
                    <circle cx="8.5" cy="7.5" r="2.5" style={{ fill: '#00855A', stroke: 'none' }} />
                    <circle cx="6.5" cy="12" r="2.5" style={{ fill: '#1B2A4A', stroke: 'none' }} />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.24-.3-.39-.65-.39-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.5-9-10-9z" />
                  </svg>
                </button>
                {showColorPicker && (
                  <>
                    <div className="color-picker-overlay" onClick={() => setShowColorPicker(false)} />
                    <div className="color-picker-tooltip">
                      <div className="color-picker-arrow" />
                      {site.colors.map((c) => (
                        <button
                          key={c.name}
                          className={`color-dot${colorTheme === c.name ? ' active' : ''}`}
                          style={{ background: c.color }}
                          onClick={() => { setColorTheme(c.name); setShowColorPicker(false); }}
                          aria-label={`${c.name} theme`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Theme toggle" title={mode === 'dark' ? '다크 모드' : mode === 'light' ? '라이트 모드' : '자동'}>
                {mode === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
              </button>
              {/* User Auth */}
              {isLoggedIn ? (
                <div className="nav-user-menu" ref={userMenuRef}>
                  <button className="nav-user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                    <span className="nav-user-avatar-placeholder">{userInitial}</span>
                  </button>
                  {showUserMenu && (
                    <div className="nav-user-dropdown">
                      <div className="dropdown-user-header">
                        <span className="dropdown-user-avatar">{userInitial}</span>
                        <div className="dropdown-user-info">
                          <span className="dropdown-user-name">{profile?.display_name || ''}</span>
                          <span className="dropdown-user-email">{profile?.email || ''}</span>
                        </div>
                      </div>
                      <div className="divider" />
                      <Link to="/mypage" className="dropdown-menu-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {t('auth.myPage')}
                      </Link>
                      <Link to="/mypage/orders" className="dropdown-menu-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                        {t('auth.orderHistory')}
                      </Link>
                      {isAdmin && (
                        <a href={site.parentSite.url + '/admin'} className="dropdown-menu-item" target="_blank" rel="noopener noreferrer">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                          관리자
                        </a>
                      )}
                      <div className="divider" />
                      <button onClick={handleSignOut} className="dropdown-menu-item logout">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="nav-login-btn">Login</Link>
              )}
              <button
                className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="메뉴 토글"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        {site.features.search && <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />}
      </nav>
    </>
  );
};

export default Navbar;
