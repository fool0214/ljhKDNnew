/**
 * productStorage.ts — 상품 CRUD (Supabase products 테이블)
 * 템플릿: 본사이트 데이터 의존성 제거, fallback은 빈 배열
 */
import type { Product, ProductInput, ProductRow } from '../types';
import getSupabase from './supabase';

// 템플릿: fallback 데이터 없음 (각 사이트에서 Supabase로 관리)
const fallbackProducts: Product[] = [];

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    titleEn: row.title_en,
    description: row.description,
    descriptionEn: row.description_en,
    price: row.price,
    imageUrl: row.image_url,
    isSoldOut: row.is_sold_out,
    isActive: row.is_active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

/** 전체 상품 조회 (활성 상품만) */
export async function getProducts(includeInactive = false): Promise<Product[]> {
  const client = getSupabase();
  if (!client) return fallbackProducts;

  let query = client
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) {
    console.error('getProducts error:', error);
    return fallbackProducts;
  }
  if (!data || data.length === 0) return fallbackProducts;
  return (data as ProductRow[]).map(toProduct);
}

/** 단일 상품 조회 */
export async function getProduct(id: number): Promise<Product | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('products')
    .select('*')
    .eq('id', Number(id))
    .single();
  if (error) {
    console.error('getProduct error:', error);
    return null;
  }
  return toProduct(data as ProductRow);
}

/** 상품 등록 */
export async function createProduct(productData: ProductInput): Promise<Product | null> {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('products')
    .insert({
      slug: productData.slug,
      category: productData.category,
      title: productData.title,
      title_en: productData.titleEn,
      description: productData.description,
      description_en: productData.descriptionEn,
      price: productData.price,
      image_url: productData.imageUrl,
      sort_order: productData.sortOrder || 0
    })
    .select()
    .single();
  if (error) throw error;
  return toProduct(data as ProductRow);
}

/** 상품 수정 */
export async function updateProduct(id: number, updates: ProductInput): Promise<Product | null> {
  const client = getSupabase();
  if (!client) return null;
  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.title !== undefined) payload.title = updates.title;
  if (updates.titleEn !== undefined) payload.title_en = updates.titleEn;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.descriptionEn !== undefined) payload.description_en = updates.descriptionEn;
  if (updates.price !== undefined) payload.price = updates.price;
  if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
  if (updates.isSoldOut !== undefined) payload.is_sold_out = updates.isSoldOut;
  if (updates.isActive !== undefined) payload.is_active = updates.isActive;
  if (updates.sortOrder !== undefined) payload.sort_order = updates.sortOrder;

  const { data, error } = await client
    .from('products')
    .update(payload)
    .eq('id', Number(id))
    .select()
    .single();
  if (error) throw error;
  return toProduct(data as ProductRow);
}

/** 상품 삭제 (소프트 삭제) */
export async function deleteProduct(id: number): Promise<Product | null> {
  return updateProduct(id, { isActive: false });
}

/** 판매완료 토글 */
export async function toggleSoldOut(id: number, isSoldOut: boolean): Promise<Product | null> {
  return updateProduct(id, { isSoldOut });
}
