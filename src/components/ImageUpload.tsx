import { useState, useRef, type ReactElement, type DragEvent, type ChangeEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { uploadImage } from '../utils/storage';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const ImageUpload = ({ value, onChange, folder = 'uploads' }: ImageUploadProps): ReactElement => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('파일 크기는 5MB 이하만 가능합니다.', 'error');
      return;
    }
    setUploading(true);
    setProgress(0);
    // Simulate progress since Supabase doesn't provide upload progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) { clearInterval(progressInterval); return 90; }
        return prev + Math.random() * 15;
      });
    }, 200);
    try {
      const url = await uploadImage(file, folder);
      clearInterval(progressInterval);
      setProgress(100);
      onChange(url);
      showToast(t('auth.uploadComplete') || '업로드 완료', 'success');
    } catch (err) {
      clearInterval(progressInterval);
      console.error('Upload error:', err);
      showToast((err as Error).message, 'error');
    } finally {
      setTimeout(() => { setUploading(false); setProgress(0); }, 300);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="image-upload-wrapper">
      {value ? (
        <div className="image-upload-preview">
          <img src={value} alt="Preview" />
          <button
            type="button"
            className="image-upload-remove"
            onClick={() => onChange('')}
          >
            {t('auth.removeImage')}
          </button>
        </div>
      ) : (
        <div
          className={`image-upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <div className="upload-progress-wrapper">
              <div className="upload-progress-bar">
                <div className="upload-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <span className="upload-progress-text">{t('auth.uploading')} {Math.round(Math.min(progress, 100))}%</span>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{t('auth.dragOrClick')}</span>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
