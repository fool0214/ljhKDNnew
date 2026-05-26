/**
 * storage.ts — Supabase Storage 업로드/삭제 헬퍼
 */
import getSupabase from './supabase';

const BUCKET = 'media';

/**
 * 이미지 업로드 → 공개 URL 반환
 */
export async function uploadImage(file: File, folder = 'uploads'): Promise<string> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await client.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: urlData } = client.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

/**
 * Storage에서 파일 삭제
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  // URL에서 파일 경로 추출
  const bucketUrl = `/storage/v1/object/public/${BUCKET}/`;
  const idx = publicUrl.indexOf(bucketUrl);
  if (idx === -1) return;

  const filePath = publicUrl.substring(idx + bucketUrl.length);
  const { error } = await client.storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) console.error('deleteImage error:', error);
}
