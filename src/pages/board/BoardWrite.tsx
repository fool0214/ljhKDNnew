import { useState, useEffect, useRef, type ReactElement, type ChangeEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { getPost, createPost, updatePost } from '../../utils/board';
import type { Post, PostInput, PostAttachment, BoardType } from '../../types';
import '../../styles/board.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

const BOARD_LABELS: Record<BoardType, string> = {
  notice: '공지사항',
  info: '정보게시판',
};

const BoardWrite = (): ReactElement => {
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const { user, profile, isAdmin, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(id);
  const defaultType = (searchParams.get('type') as BoardType) || 'notice';

  const [boardType, setBoardType] = useState<BoardType>(defaultType);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<PostAttachment[]>([]);
  const [deletedAttachmentIds, setDeletedAttachmentIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [original, setOriginal] = useState<Post | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (isEdit && id) {
      getPost(id)
        .then((post) => {
          if (!post) { navigate('/board'); return; }
          // 권한 확인: 작성자 또는 관리자
          if (!isAdmin && user?.id !== post.author_id) {
            showToast('수정 권한이 없습니다.', 'error');
            navigate(`/board/${id}`);
            return;
          }
          setOriginal(post);
          setBoardType(post.board_type);
          setTitle(post.title);
          setContent(post.content);
          setIsPinned(post.is_pinned);
          setExistingAttachments(post.attachments || []);
        })
        .catch(() => showToast('게시글을 불러오는 데 실패했습니다.', 'error'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, isAdmin, isLoggedIn, user, navigate, showToast]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const totalCount = existingAttachments.length - deletedAttachmentIds.length + newFiles.length + selected.length;

    if (totalCount > MAX_FILES) {
      showToast(`첨부파일은 최대 ${MAX_FILES}개까지 가능합니다.`, 'error');
      return;
    }

    const oversized = selected.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      showToast('파일 크기는 10MB 이하만 가능합니다.', 'error');
      return;
    }

    setNewFiles((prev) => [...prev, ...selected]);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingAttachment = (attId: string) => {
    setDeletedAttachmentIds((prev) => [...prev, attId]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { showToast('제목을 입력해주세요.', 'error'); return; }
    if (!content.trim()) { showToast('내용을 입력해주세요.', 'error'); return; }
    if (!user) { showToast('로그인이 필요합니다.', 'error'); return; }

    setSubmitting(true);
    try {
      const authorName = profile?.display_name || profile?.name || user.email?.split('@')[0] || '익명';

      if (isEdit && id) {
        await updatePost(
          id,
          { board_type: boardType, title, content, is_pinned: isAdmin ? isPinned : original?.is_pinned },
          newFiles,
          deletedAttachmentIds
        );
        showToast('게시글이 수정되었습니다.', 'success');
        navigate(`/board/${id}`);
      } else {
        const input: PostInput = {
          board_type: boardType,
          title,
          content,
          author_id: user.id,
          author_name: authorName,
          author_email: user.email || null,
          is_pinned: isAdmin ? isPinned : false,
        };
        const created = await createPost(input, newFiles);
        showToast('게시글이 등록되었습니다.', 'success');
        navigate(`/board/${created.id}`);
      }
    } catch (err) {
      showToast((err as Error).message || '저장에 실패했습니다.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="board-loading">불러오는 중...</div>
      </div>
    );
  }

  const visibleAttachments = existingAttachments.filter((a) => !deletedAttachmentIds.includes(a.id));

  return (
    <div className="page-container">
      <div className="board-page">
        <form onSubmit={handleSubmit}>
          <div className="board-write">
            <h2>{isEdit ? '게시글 수정' : '글쓰기'}</h2>

            {/* 게시판 선택 */}
            <div className="board-form-group">
              <label>게시판</label>
              <select
                value={boardType}
                onChange={(e) => setBoardType(e.target.value as BoardType)}
              >
                {(Object.entries(BOARD_LABELS) as [BoardType, string][]).map(([type, label]) => (
                  <option key={type} value={type}>{label}</option>
                ))}
              </select>
            </div>

            {/* 제목 */}
            <div className="board-form-group">
              <label>제목 <span className="required">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                maxLength={200}
                required
              />
            </div>

            {/* 내용 */}
            <div className="board-form-group">
              <label>내용 <span className="required">*</span></label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                required
              />
            </div>

            {/* 첨부파일 */}
            <div className="board-form-group">
              <label>첨부파일 (최대 {MAX_FILES}개, 파일당 10MB 이하)</label>

              {/* 기존 첨부파일 */}
              {visibleAttachments.length > 0 && (
                <ul className="board-attachment-list board-attachment-edit">
                  {visibleAttachments.map((att) => (
                    <li key={att.id} className="board-attachment-item">
                      <span className="board-attachment-name">{att.file_name}</span>
                      <button
                        type="button"
                        className="board-attachment-remove"
                        onClick={() => removeExistingAttachment(att.id)}
                        title="삭제"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* 새 파일 */}
              {newFiles.length > 0 && (
                <ul className="board-attachment-list board-attachment-edit">
                  {newFiles.map((file, idx) => (
                    <li key={idx} className="board-attachment-item new-file">
                      <span className="board-attachment-name">{file.name}</span>
                      <button
                        type="button"
                        className="board-attachment-remove"
                        onClick={() => removeNewFile(idx)}
                        title="삭제"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                className="board-btn"
                onClick={() => fileRef.current?.click()}
                disabled={visibleAttachments.length + newFiles.length >= MAX_FILES}
              >
                파일 추가
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* 공지 고정 (관리자만) */}
            {isAdmin && (
              <div className="board-form-group">
                <label className="board-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                  />
                  공지 상단 고정
                </label>
              </div>
            )}

            <div className="board-form-actions">
              <button
                type="button"
                className="board-btn"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                취소
              </button>
              <button type="submit" className="board-btn primary" disabled={submitting}>
                {submitting ? '저장 중...' : isEdit ? '수정 완료' : '등록'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;
