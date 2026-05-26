import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getOrdersByUser } from '../utils/supabase';
import type { Order, PaymentStatus } from '../types';
import '../styles/auth.css';

const OrderHistory = (): ReactElement => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isEn = language === 'en';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const loadOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders(data);
    } catch (err) {
      console.error('OrderHistory load error:', err);
      setError(true);
      showToast(t('auth.orderLoadError'), 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast, t]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const formatPrice = (price: number | undefined): string => {
    return isEn
      ? `\u20A9${Number(price || 0).toLocaleString()}`
      : `${Number(price || 0).toLocaleString()}${t('shop.currency')}`;
  };

  const statusBadge = (status: PaymentStatus | string): ReactElement => {
    const labels: Record<string, string> = {
      paid: t('order.paid'),
      pending: t('order.pending'),
      failed: t('order.failed'),
      cancelled: isEn ? 'Cancelled' : '취소',
      refunded: isEn ? 'Refunded' : '환불'
    };
    return (
      <span className={`order-status-badge ${status}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getMethodLabel = (method: string | undefined): string => {
    if (method === 'card') return isEn ? 'Credit Card' : '카드결제';
    if (method === 'transfer') return isEn ? 'Bank Transfer' : '계좌이체';
    return method || '-';
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('auth.orderHistory')}</h1>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)' }}>
                {t('community.loading') || '로딩 중...'}
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '15px' }}>
                  {t('auth.orderLoadError')}
                </p>
                <button
                  onClick={loadOrders}
                  className="btn btn-primary"
                  style={{ marginRight: '12px' }}
                >
                  {t('auth.retry')}
                </button>
                <Link to="/mypage" className="board-btn">{t('auth.myPage')}</Link>
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(0, 70, 200, 0.08)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--primary-blue)" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <line x1="2" y1="9" x2="22" y2="9" />
                    <line x1="7" y1="15" x2="11" y2="15" />
                  </svg>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>{t('auth.noOrders')}</p>
                <Link to="/shop" className="btn btn-primary">{t('order.backToShop')}</Link>
              </div>
            ) : (
              <div className="order-history-list">
                {(() => {
                  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
                  const paged = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
                  return (<>
                {paged.map((order) => {
                  const isExpanded = expandedId === order.id;
                  const items = order.order_items || [];
                  return (
                    <div
                      key={order.id}
                      className="order-history-card"
                      style={{ cursor: items.length > 0 ? 'pointer' : 'default' }}
                      onClick={() => items.length > 0 && setExpandedId(isExpanded ? null : order.id)}
                    >
                      <div className="order-history-header">
                        <div>
                          <span className="order-info-label">{t('order.orderNumber')}</span>
                          <span className="order-info-value" style={{ marginLeft: '8px' }}>
                            {order.order_number}
                          </span>
                        </div>
                        {statusBadge(order.payment_status)}
                      </div>
                      <div className="order-history-meta">
                        <span>{isEn ? 'Date' : '주문일'}: {new Date(order.created_at).toLocaleDateString('ko-KR')}</span>
                        <span>{isEn ? 'Method' : '결제수단'}: {getMethodLabel(order.payment_method)}</span>
                        <span>{isEn ? 'Amount' : '결제금액'}: {formatPrice(order.total_amount)}</span>
                      </div>
                      {order.payment_status === 'cancelled' && (
                        <div className="order-history-cancel-info">
                          {order.cancelled_at && (
                            <span>{isEn ? 'Cancelled' : '취소일'}: {new Date(order.cancelled_at).toLocaleDateString('ko-KR')}</span>
                          )}
                          {order.cancel_reason && (
                            <span>{isEn ? 'Reason' : '사유'}: {order.cancel_reason}</span>
                          )}
                        </div>
                      )}
                      {isExpanded && items.length > 0 && (
                        <div className="order-history-items">
                          {items.map((item, idx) => (
                            <div key={idx} className="order-history-item">
                              <span>{item.product_title} {item.quantity > 1 ? `\u00D7 ${item.quantity}` : ''}</span>
                              <span>{formatPrice(item.subtotal)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {items.length > 0 && (
                        <div style={{
                          textAlign: 'center', paddingTop: '8px',
                          fontSize: '12px', color: 'var(--text-light)'
                        }}>
                          {isExpanded
                            ? (isEn ? '\u25B2 Collapse' : '\u25B2 접기')
                            : (isEn ? '\u25BC View details' : '\u25BC 상세보기')
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
                {totalPages > 1 && (
                  <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    gap: '16px', marginTop: '24px', padding: '16px 0'
                  }}>
                    <button
                      className="board-btn"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      style={{ opacity: page === 1 ? 0.5 : 1 }}
                    >
                      {isEn ? 'Previous' : '이전'}
                    </button>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {page} / {totalPages}
                    </span>
                    <button
                      className="board-btn"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      style={{ opacity: page === totalPages ? 0.5 : 1 }}
                    >
                      {isEn ? 'Next' : '다음'}
                    </button>
                  </div>
                )}
                </>);
                })()}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link to="/mypage" className="board-btn" style={{ marginRight: '12px' }}>{t('auth.myPage')}</Link>
              <Link to="/shop" className="board-btn">{t('order.backToShop')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderHistory;
