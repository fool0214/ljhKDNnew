import { useState, useEffect, type ReactElement } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getPost, deletePost } from '../../utils/board';
import { ADMIN_EMAILS } from '../../config/admin';
import type { Post } from '../../types';
import '../../styles/board.css';

const BOARD_LABELS: Record<string, string> = {
  notice: '공지사항',
  info: '정보게시판',
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

const BoardDetail = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPost(id)
      .then(setPost)
      .catch(() => showToast('게시글을 불러오는 데 실패했습니다.', 'error'))
      .finally(() => setLoading(false));
  }, [id, showToast]);

  const canEdit =
    post &&
    (isAdmin ||
      (user && (user.id === post.author_id || ADMIN_EMAILS.includes(user.email || ''))));

  const handleDelete = async () => {
    if (!post || !window.confirm('게시글을 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await deletePost(post.id);
      showToast('게시글이 삭제되었습니다.', 'success');
      navigate(`/board?type=${post.board_type}`);
    } catch {
      showToast('삭제에 실패했습니다.', 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="board-loading">불러오는 중...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-container">
        <div className="board-empty">게시글을 찾을 수 없습니다.</div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/board" className="board-btn">목록으로</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="board-page">
        {/* 게시판 탭 위치 표시 */}
        <nav className="board-breadcrumb">
          <Link to="/board" className="board-breadcrumb-link">게시판</Link>
          <span className="board-breadcrumb-sep">›</span>
          <Link to={`/board?type=${post.board_type}`} className="board-breadcrumb-link">
            {BOARD_LABELS[post.board_type] || post.board_type}
          </Link>
        </nav>

        <div className="board-detail">
          {/* 헤더 */}
          <div className="board-detail-header">
            {post.is_pinned && (
              <span className="board-pin-badge" style={{ marginBottom: 12, display: 'inline-block' }}>공지</span>
            )}
            {post.category && (
              <span className="board-detail-category">
                <span className="category-badge">{post.category}</span>
              </span>
            )}
            <h1 className="board-detail-title">{post.title}</h1>
            <div className="board-detail-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {post.author_name}
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatDate(post.created_at)}
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                조회 {post.view_count}
              </span>
            </div>
          </div>

          {/* 본문 */}
          <div className="board-detail-body">{post.content}</div>

          {/* 첨부파일 */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="board-attachments">
              <h3 className="board-attachments-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
                첨부파일 ({post.attachments.length})
              </h3>
              <ul className="board-attachment-list">
                {post.attachments.map((att) => (
                  <li key={att.id} className="board-attachment-item">
                    <a href={att.file_url} target="_blank" rel="noopener noreferrer" className="board-attachment-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      {att.file_name}
                      {att.file_size && (
                        <span className="board-attachment-size">{formatFileSize(att.file_size)}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="board-detail-footer">
            <Link to={`/board?type=${post.board_type}`} className="board-btn">
              목록
            </Link>
            {canEdit && (
              <div className="board-detail-actions">
                <Link to={`/board/${post.id}/edit`} className="board-btn">
                  수정
                </Link>
                <button
                  className="board-btn danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
