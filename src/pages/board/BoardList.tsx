import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Pagination from '../../components/Pagination';
import { getPosts, TOTAL_PAGES } from '../../utils/board';
import type { Post, BoardType } from '../../types';
import '../../styles/board.css';

const BOARD_LABELS: Record<BoardType, string> = {
  notice: '공지사항',
  info: '정보게시판',
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const BoardList = (): ReactElement => {
  const { isLoggedIn, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const boardType: BoardType = (searchParams.get('type') as BoardType) || 'notice';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('q') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(search);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPosts(boardType, page, search);
      setPosts(result.posts);
      setTotal(result.total);
    } catch {
      showToast('게시글을 불러오는 데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  }, [boardType, page, search, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const switchTab = (type: BoardType) => {
    setSearchParams({ type });
    setSearchInput('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ type: boardType, q: searchInput, page: '1' });
  };

  const handlePageChange = (p: number) => {
    const params: Record<string, string> = { type: boardType, page: String(p) };
    if (search) params.q = search;
    setSearchParams(params);
  };

  const canWrite = isLoggedIn || isAdmin;

  return (
    <div className="page-container">
      <div className="board-page">
        {/* 헤더 */}
        <div className="board-page-header">
          <h1 className="board-page-title">{BOARD_LABELS[boardType]}</h1>
          <p className="board-page-desc">
            {boardType === 'notice'
              ? 'KDN 바이브코딩 교육 관련 공지사항을 확인하세요.'
              : '교육 관련 정보와 자료를 공유합니다.'}
          </p>
        </div>

        {/* 탭 */}
        <div className="board-tabs">
          {(Object.entries(BOARD_LABELS) as [BoardType, string][]).map(([type, label]) => (
            <button
              key={type}
              className={`board-tab ${boardType === type ? 'active' : ''}`}
              onClick={() => switchTab(type)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 검색 + 글쓰기 */}
        <div className="board-toolbar">
          <form className="board-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="board-search-input"
              placeholder="제목 또는 내용 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="board-search-btn">검색</button>
            {search && (
              <button
                type="button"
                className="board-search-clear"
                onClick={() => {
                  setSearchInput('');
                  setSearchParams({ type: boardType });
                }}
              >
                초기화
              </button>
            )}
          </form>
          {canWrite && (
            <button
              className="board-btn primary"
              onClick={() => navigate(`/board/write?type=${boardType}`)}
            >
              글쓰기
            </button>
          )}
        </div>

        {/* 검색 결과 안내 */}
        {search && (
          <p className="board-search-result">
            &quot;{search}&quot; 검색 결과: <strong>{total}</strong>건
          </p>
        )}

        {/* 목록 */}
        {loading ? (
          <div className="board-loading">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="board-empty">
            {search ? '검색 결과가 없습니다.' : '등록된 게시글이 없습니다.'}
          </div>
        ) : (
          <table className="board-table">
            <thead>
              <tr>
                <th className="board-th-num">번호</th>
                <th className="board-th-title">제목</th>
                <th className="board-th-author">작성자</th>
                <th className="board-th-date">날짜</th>
                <th className="board-th-views">조회</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={post.id} className={post.is_pinned ? 'board-row-pinned' : 'board-row'}>
                  <td className="board-td-num">
                    {post.is_pinned ? (
                      <span className="board-pin-badge">공지</span>
                    ) : (
                      total - (page - 1) * 15 - idx
                    )}
                  </td>
                  <td className="board-td-title">
                    <Link to={`/board/${post.id}`} className="board-title-link">
                      {post.title}
                      {post.attachments && post.attachments.length > 0 && (
                        <span className="board-attach-icon" title="첨부파일 있음">📎</span>
                      )}
                    </Link>
                  </td>
                  <td className="board-td-author">{post.author_name}</td>
                  <td className="board-td-date">{formatDate(post.created_at)}</td>
                  <td className="board-td-views">{post.view_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          currentPage={page}
          totalPages={TOTAL_PAGES(total)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BoardList;
