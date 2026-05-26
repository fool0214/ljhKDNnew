import { useState, useEffect, useRef, useCallback, type ReactElement, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { searchAll } from '../utils/searchStorage';
import type { SearchResults, SearchResultItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps): ReactElement | null => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ blog: [], board: [], gallery: [] });
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults({ blog: [], board: [], gallery: [] });
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults({ blog: [], board: [], gallery: [] });
      return;
    }
    setLoading(true);
    try {
      const data = await searchAll(q);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(val), 300);
  };

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const totalResults = results.blog.length + results.board.length + results.gallery.length;
  const hasQuery = query.trim().length > 0;

  if (!isOpen) return null;

  const renderItem = (item: SearchResultItem, type: 'blog' | 'board' | 'gallery') => {
    let path = '/';
    let typeLabel = '';

    if (type === 'blog') {
      path = `/community/blog/${item.id}`;
      typeLabel = 'Blog';
    } else if (type === 'board') {
      path = `/community/board/${item.id}`;
      typeLabel = 'Board';
    } else {
      path = '/community/gallery';
      typeLabel = 'Gallery';
    }

    return (
      <button
        key={`${type}-${item.id}`}
        className="search-result-item"
        onClick={() => handleNavigate(path)}
      >
        <span className="search-result-type">{typeLabel}</span>
        <div className="search-result-info">
          <span className="search-result-title">
            {language === 'en' ? (item.titleEn || item.title) : item.title}
          </span>
          <span className="search-result-meta">
            {type === 'blog' && <>{language === 'en' ? (item.categoryEn || item.category) : item.category} &middot; {item.date}</>}
            {type === 'board' && <>{item.author} &middot; {item.date}</>}
            {type === 'gallery' && <>{item.date}</>}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg className="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder={t('search.placeholder')}
              value={query}
              onChange={handleChange}
            />
            <button className="search-close-btn" onClick={onClose}>ESC</button>
          </div>
        </div>

        <div className="search-modal-body">
          {loading && (
            <div className="search-loading">{t('search.searching')}</div>
          )}

          {!loading && hasQuery && totalResults === 0 && (
            <div className="search-empty">{t('search.noResults')}</div>
          )}

          {!loading && !hasQuery && (
            <div className="search-hint">{t('search.hint')}</div>
          )}

          {!loading && results.blog.length > 0 && (
            <div className="search-group">
              <h4 className="search-group-title">{t('search.blog')}</h4>
              {results.blog.map((item) => renderItem(item, 'blog'))}
            </div>
          )}

          {!loading && results.board.length > 0 && (
            <div className="search-group">
              <h4 className="search-group-title">{t('search.board')}</h4>
              {results.board.map((item) => renderItem(item, 'board'))}
            </div>
          )}

          {!loading && results.gallery.length > 0 && (
            <div className="search-group">
              <h4 className="search-group-title">{t('search.gallery')}</h4>
              {results.gallery.map((item) => renderItem(item, 'gallery'))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
