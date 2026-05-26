/**
 * commentStorage.ts
 * 댓글 CRUD — Supabase 전용 (boardStorage.js 패턴 준수)
 */

import type { Comment, CommentInput } from '../types';
import getSupabase from './supabase';

function toCamelKey(key: string): string {
  return key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

function toCamel(row: Record<string, unknown> | null): Comment | null {
  if (!row) return null;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[toCamelKey(k)] = v;
  }
  return out as unknown as Comment;
}

/**
 * 특정 게시글의 댓글 목록 조회
 */
export async function getComments(postId: number | string, postType: string): Promise<Comment[]> {
  const client = getSupabase();
  if (!client) return [];
  const { data, error } = await client
    .from('comments')
    .select('*')
    .eq('post_id', Number(postId))
    .eq('post_type', postType)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getComments error:', error);
    return [];
  }
  return (data || []).map(r => toCamel(r as Record<string, unknown>)!);
}

/**
 * 댓글 작성
 */
export async function createComment({ postId, postType, authorId, authorName, content }: CommentInput): Promise<Comment | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('comments')
    .insert({
      post_id: Number(postId),
      post_type: postType,
      author_id: authorId,
      author_name: authorName,
      content,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  if (error) {
    console.error('createComment error:', error);
    return null;
  }
  return toCamel(data as Record<string, unknown>);
}

/**
 * 댓글 삭제
 */
export async function deleteComment(id: number): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;
  const { error } = await client
    .from('comments')
    .delete()
    .eq('id', Number(id));
  if (error) {
    console.error('deleteComment error:', error);
    return false;
  }
  return true;
}
