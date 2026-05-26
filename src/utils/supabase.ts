import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { OrderData, Order, PaymentStatus } from '../types';
import site from '../config/site';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Supabase 테이블명 (site.dbPrefix 기반) */
export const TABLES = {
  orders: `${site.dbPrefix}orders`,
  order_items: `${site.dbPrefix}order_items`,
} as const;

// Supabase client - initialized only when env vars are set
let supabase: SupabaseClient | null = null;
let _memoryOrders: Order[] = [];

const getSupabase = (): SupabaseClient | null => {
  if (!supabase && supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
      }
    });
  }
  return supabase;
};

/**
 * Create an order with order items
 * Falls back to in-memory store when Supabase is not configured
 */
// user_id 제외 — auth.users FK "permission denied" 방지, DB에서 DEFAULT auth.uid() 사용
export const createOrder = async (orderData: OrderData): Promise<Order> => {
  const client = getSupabase();

  if (!client) {
    const order: Order = {
      id: crypto.randomUUID(),
      ...orderData,
      payment_status: 'pending',
      created_at: new Date().toISOString()
    };
    _memoryOrders.push(order);
    return order;
  }

  // Insert order (bare INSERT — no .select() to avoid RLS/FK issues)
  const orderPayload: Record<string, unknown> = {
    order_number: orderData.order_number,
    user_email: orderData.user_email,
    user_name: orderData.user_name,
    user_phone: orderData.user_phone,
    total_amount: orderData.total_amount,
    payment_method: orderData.payment_method
  };

  const { error: orderError } = await client
    .from(TABLES.orders)
    .insert(orderPayload);

  if (orderError) throw orderError;

  // Insert order items — 별도 조회로 order UUID를 가져온 뒤 삽입
  if (orderData.items && orderData.items.length > 0) {
    try {
      const { data: row } = await client
        .from(TABLES.orders)
        .select('id')
        .eq('order_number', orderData.order_number)
        .maybeSingle();

      if (row?.id) {
        await client
          .from(TABLES.order_items)
          .insert(
            orderData.items.map(item => ({
              order_id: row.id,
              product_title: item.product_title,
              quantity: item.quantity,
              unit_price: item.unit_price,
              subtotal: item.subtotal
            }))
          );
      }
    } catch {
      /* order_items 실패해도 결제 플로우는 계속 진행 */
    }
  }

  return { id: orderData.order_number, order_number: orderData.order_number } as unknown as Order;
};

/**
 * Get order by order number
 * Falls back to in-memory store when Supabase is not configured
 */
export const getOrderByNumber = async (orderNumber: string): Promise<Order | null> => {
  const client = getSupabase();

  if (!client) {
    return _memoryOrders.find(o => o.order_number === orderNumber) || null;
  }

  const { data: orders, error } = await client
    .from(TABLES.orders)
    .select('*')
    .eq('order_number', orderNumber)
    .limit(1);

  if (error) throw error;
  if (!orders || orders.length === 0) return null;

  const order = orders[0];

  // Fetch order items
  const { data: items } = await client
    .from(TABLES.order_items)
    .select('*')
    .eq('order_id', order.id);

  return { ...order, items: items || [] } as Order;
};

/**
 * Update order payment status
 * orderId에 UUID 또는 order_number 모두 사용 가능 — 자동 감지
 */
export const updateOrderStatus = async (
  orderId: string,
  status: PaymentStatus,
  paymentId?: string,
  cancelReason?: string
): Promise<Order | null | undefined> => {
  const client = getSupabase();

  if (!client) {
    const idx = _memoryOrders.findIndex(o => o.id === orderId || o.order_number === orderId);
    if (idx >= 0) {
      _memoryOrders[idx].payment_status = status;
      if (paymentId) _memoryOrders[idx].portone_payment_id = paymentId;
      if (status === 'paid') _memoryOrders[idx].paid_at = new Date().toISOString();
      if (status === 'cancelled') {
        _memoryOrders[idx].cancelled_at = new Date().toISOString();
        if (cancelReason) _memoryOrders[idx].cancel_reason = cancelReason;
      }
    }
    return _memoryOrders[idx];
  }

  // UUID vs order_number 자동 감지
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(orderId);
  const filterCol = isUUID ? 'id' : 'order_number';

  const updatePayload: Record<string, unknown> = { payment_status: status };
  if (status === 'paid') updatePayload.paid_at = new Date().toISOString();
  if (status === 'cancelled') {
    updatePayload.cancelled_at = new Date().toISOString();
    if (cancelReason) updatePayload.cancel_reason = cancelReason;
  }

  // Build full payload with optional columns (may not exist in DB yet)
  const extras: Record<string, unknown> = {};
  if (paymentId) extras.portone_payment_id = paymentId;

  let result: Order[] | null = null;

  try {
    const { data, error } = await client
      .from(TABLES.orders)
      .update({ ...updatePayload, ...extras })
      .eq(filterCol, orderId)
      .select();

    if (error) throw error;
    result = data as Order[] | null;
  } catch {
    // Fallback: update without optional columns (portone_payment_id 등 컬럼 미존재 시)
    try {
      const { data, error } = await client
        .from(TABLES.orders)
        .update(updatePayload)
        .eq(filterCol, orderId)
        .select();

      if (error) throw error;
      result = data as Order[] | null;
    } catch {
      console.warn('updateOrderStatus: fallback update also failed for', filterCol, orderId);
      return null;
    }
  }

  if (!result || result.length === 0) {
    console.warn('updateOrderStatus: no rows updated for', filterCol, orderId);
    return null;
  }

  return result[0];
};

/**
 * Verify payment via Edge Function
 */
export const verifyPayment = async (
  paymentId: string,
  orderId: string
): Promise<{ verified: boolean }> => {
  const client = getSupabase();
  if (!client) {
    // Fallback: auto-approve for dev/demo
    await updateOrderStatus(orderId, 'paid', paymentId);
    return { verified: true };
  }

  const { data, error } = await client.functions.invoke('verify-payment', {
    body: { paymentId, orderId }
  });

  if (error) throw error;
  return data as { verified: boolean };
};

/**
 * Get orders by user ID
 */
export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  const client = getSupabase();
  if (!client) return [];

  const selectQuery = `*, ${TABLES.order_items}(*)`;
  const { data, error } = await client
    .from(TABLES.orders)
    .select(selectQuery)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getOrdersByUser error:', error);
    return [];
  }
  return (data || []) as unknown as Order[];
};

export default getSupabase;
