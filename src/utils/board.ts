import getSupabase from './supabase';
import { uploadImage, deleteImage } from './storage';
import site from '../config/site';
import type { Post, PostInput, PostAttachment, BoardType } from '../types';

export const BOARD_TABLES = {
  posts: `${site.dbPrefix}posts`,
  attachments: `${site.dbPrefix}post_attachments`,
} as const;

const PAGE_SIZE = 15;

export interface PostsResult {
  posts: Post[];
  total: number;
}

export async function getPosts(
  boardType: BoardType,
  page = 1,
  search = ''
): Promise<PostsResult> {
  const client = getSupabase();
  if (!client) return { posts: [], total: 0 };

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = client
    .from(BOARD_TABLES.posts)
    .select('*', { count: 'exact' })
    .eq('board_type', boardType)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (search.trim()) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, count, error } = await query;
  if (error) throw error;

  return { posts: (data || []) as Post[], total: count || 0 };
}

export async function getPost(id: string): Promise<Post | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data: post, error } = await client
    .from(BOARD_TABLES.posts)
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) return null;

  const { data: attachments } = await client
    .from(BOARD_TABLES.attachments)
    .select('*')
    .eq('post_id', id)
    .order('created_at');

  // 조회수 +1 (fire-and-forget)
  client.from(BOARD_TABLES.posts).update({ view_count: (post.view_count || 0) + 1 }).eq('id', id);

  return { ...(post as Post), attachments: (attachments || []) as PostAttachment[] };
}

export async function createPost(input: PostInput, files: File[] = []): Promise<Post> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase가 설정되지 않았습니다.');

  const { data, error } = await client
    .from(BOARD_TABLES.posts)
    .insert({
      board_type: input.board_type,
      category: input.category || null,
      title: input.title,
      content: input.content,
      author_id: input.author_id || null,
      author_name: input.author_name,
      author_email: input.author_email || null,
      is_pinned: input.is_pinned ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  const post = data as Post;

  if (files.length > 0) {
    await uploadAttachments(post.id, files);
  }

  return post;
}

export async function updatePost(
  id: string,
  input: Partial<PostInput>,
  newFiles: File[] = [],
  deletedAttachmentIds: string[] = []
): Promise<Post> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase가 설정되지 않았습니다.');

  const { data, error } = await client
    .from(BOARD_TABLES.posts)
    .update({
      ...('board_type' in input && { board_type: input.board_type }),
      ...('category' in input && { category: input.category || null }),
      ...('title' in input && { title: input.title }),
      ...('content' in input && { content: input.content }),
      ...('is_pinned' in input && { is_pinned: input.is_pinned }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // 삭제된 첨부파일 처리
  if (deletedAttachmentIds.length > 0) {
    const { data: toDelete } = await client
      .from(BOARD_TABLES.attachments)
      .select('file_url')
      .in('id', deletedAttachmentIds);

    if (toDelete) {
      await Promise.allSettled(toDelete.map((a: { file_url: string }) => deleteImage(a.file_url)));
    }

    await client.from(BOARD_TABLES.attachments).delete().in('id', deletedAttachmentIds);
  }

  if (newFiles.length > 0) {
    await uploadAttachments(id, newFiles);
  }

  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase가 설정되지 않았습니다.');

  // 첨부파일 Storage 삭제
  const { data: attachments } = await client
    .from(BOARD_TABLES.attachments)
    .select('file_url')
    .eq('post_id', id);

  if (attachments) {
    await Promise.allSettled(attachments.map((a: { file_url: string }) => deleteImage(a.file_url)));
  }

  const { error } = await client.from(BOARD_TABLES.posts).delete().eq('id', id);
  if (error) throw error;
}

async function uploadAttachments(postId: string, files: File[]): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  const uploaded = await Promise.all(
    files.map(async (file) => {
      const url = await uploadImage(file, 'board');
      return {
        post_id: postId,
        file_name: file.name,
        file_url: url,
        file_size: file.size,
        file_type: file.type,
      };
    })
  );

  await client.from(BOARD_TABLES.attachments).insert(uploaded);
}

export const TOTAL_PAGES = (total: number): number => Math.max(1, Math.ceil(total / PAGE_SIZE));
