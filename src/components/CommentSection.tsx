import { useState, useEffect, type ReactElement, type FormEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getComments, createComment, deleteComment } from '../utils/commentStorage';
import type { Comment } from '../types';

interface CommentSectionProps {
  postId: number;
  postType: string;
}

const CommentSection = ({ postId, postType }: CommentSectionProps): ReactElement => {
  const { t } = useLanguage();
  const { user, isAdmin, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(postId, postType);
        setComments(data);
      } catch (err) {
        console.error('Comments load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId, postType]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setSubmitting(true);
    try {
      const newComment = await createComment({
        postId,
        postType,
        authorId: user.id,
        authorName: profile?.display_name || user.email!.split('@')[0],
        content: content.trim()
      });
      if (newComment) {
        setComments((prev) => [...prev, newComment]);
        setContent('');
      }
    } catch (err) {
      console.error('Comment submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm(t('comments.deleteConfirm'))) return;
    try {
      const success = await deleteComment(commentId);
      if (success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (err) {
      console.error('Comment delete error:', err);
    }
  };

  const canDelete = (comment: Comment): boolean => {
    return isAdmin || (!!user && comment.authorId === user.id);
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
      ' ' + d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="comment-section">
      <h3 className="comment-section-title">
        {t('comments.title')} ({comments.length})
      </h3>

      {loading ? (
        <div className="comment-loading">{t('comments.loading')}</div>
      ) : comments.length === 0 ? (
        <div className="comment-empty">{t('comments.empty')}</div>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-author-info">
                  <span className="comment-author-avatar">
                    {(comment.authorName || '?')[0].toUpperCase()}
                  </span>
                  <span className="comment-author-name">{comment.authorName}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                {canDelete(comment) && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleDelete(comment.id)}
                    title={t('comments.delete')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="comment-body">{comment.content}</div>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-textarea"
            rows={3}
            placeholder={t('comments.placeholder')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="comment-form-actions">
            <button
              type="submit"
              className="board-btn primary"
              disabled={submitting || !content.trim()}
            >
              {submitting ? t('comments.submitting') : t('comments.submit')}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-notice">{t('comments.loginRequired')}</div>
      )}
    </div>
  );
};

export default CommentSection;
