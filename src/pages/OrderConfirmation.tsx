import { useState, useEffect, type ReactElement } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getOrderByNumber } from '../utils/supabase';
import useAOS from '../hooks/useAOS';
import SEOHead from '../components/SEOHead';
import type { Order, PaymentStatus } from '../types';

interface ConfirmLocationState {
  orderNumber?: string;
  userName?: string;
  userEmail?: string;
  totalAmount?: number;
  paymentMethod?: string;
  paymentId?: string;
  items?: { product_title: string; quantity: number; unit_price: number; subtotal: number }[];
  paidAt?: string;
}

const OrderConfirmation = (): ReactElement => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const orderNumber = searchParams.get('orderNumber');
  const isEn = language === 'en';
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useAOS();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setLoading(false);
        return;
      }

      // Try fetching from Supabase first
      try {
        const data = await getOrderByNumber(orderNumber);
        if (data) {
          setOrder(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch order from DB:', err);
      }

      // Fallback: use navigation state passed from Checkout
      const state = location.state as ConfirmLocationState | null;
      if (state?.orderNumber) {
        setOrder({
          id: '',
          order_number: state.orderNumber,
          user_name: state.userName || '',
          user_email: state.userEmail || '',
          user_phone: '',
          total_amount: state.totalAmount || 0,
          payment_method: state.paymentMethod || '',
          payment_status: 'paid',
          paid_at: state.paidAt,
          created_at: new Date().toISOString(),
          items: state.items || []
        });
      }

      setLoading(false);
    };
    fetchOrder();
  }, [orderNumber, location.state]);

  const formatPrice = (price: number): string => {
    return isEn
      ? `\u20A9${Number(price).toLocaleString()}`
      : `${Number(price).toLocaleString()}${t('shop.currency')}`;
  };

  const getStatusLabel = (status: PaymentStatus | string): string => {
    switch (status) {
      case 'paid': return t('order.paid');
      case 'pending': return t('order.pending');
      case 'failed': return t('order.failed');
      case 'cancelled': return isEn ? 'Cancelled' : '취소';
      case 'refunded': return isEn ? 'Refunded' : '환불';
      default: return status;
    }
  };

  const getMethodLabel = (method: string): string => {
    if (method === 'card') return isEn ? 'Credit Card' : '카드결제';
    if (method === 'transfer') return isEn ? 'Bank Transfer' : '계좌이체';
    return method;
  };

  if (loading) {
    return (
      <section className="page-header">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead title="주문 확인" path="/order-confirmation" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('order.title')}</h1>
        </div>
      </section>

      <section className="order-section">
        <div className="container">
          <div className="order-confirmation" data-aos="fade-up">
            <div className="order-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2>{t('order.success')}</h2>

            {(orderNumber || order) && (
              <div className="order-info-box">
                <div className="order-info-row">
                  <span className="order-info-label">{t('order.orderNumber')}</span>
                  <span className="order-info-value">{orderNumber || order?.order_number}</span>
                </div>
                {order && (
                  <>
                    <div className="order-info-row">
                      <span className="order-info-label">{t('order.paymentStatus')}</span>
                      <span className={`order-status-badge ${order.payment_status || 'paid'}`}>
                        {getStatusLabel(order.payment_status || 'paid')}
                      </span>
                    </div>
                    <div className="order-info-row">
                      <span className="order-info-label">{isEn ? 'Payment Method' : '결제수단'}</span>
                      <span className="order-info-value" style={{ fontFamily: 'inherit', fontSize: '14px' }}>
                        {getMethodLabel(order.payment_method)}
                      </span>
                    </div>
                    {order.user_name && (
                      <div className="order-info-row">
                        <span className="order-info-label">{isEn ? 'Customer' : '주문자'}</span>
                        <span className="order-info-value" style={{ fontFamily: 'inherit', fontSize: '14px' }}>
                          {order.user_name}
                        </span>
                      </div>
                    )}
                    {order.paid_at && (
                      <div className="order-info-row">
                        <span className="order-info-label">{isEn ? 'Payment Date' : '결제일시'}</span>
                        <span className="order-info-value" style={{ fontFamily: 'inherit', fontSize: '14px' }}>
                          {new Date(order.paid_at).toLocaleString('ko-KR')}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {order?.items && order.items.length > 0 && (
              <div className="order-details">
                <h3>{t('order.orderDetails')}</h3>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>{t('order.productName')}</th>
                      <th>{t('order.unitPrice')}</th>
                      <th>{t('order.quantity')}</th>
                      <th>{t('order.subtotal')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.product_title}</td>
                        <td>{formatPrice(item.unit_price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>{t('order.totalAmount')}</td>
                      <td className="order-total-cell">{formatPrice(order.total_amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <div className="order-actions">
              {user && (
                <Link to="/mypage/orders" className="btn btn-primary">
                  {isEn ? 'Order History' : '주문 이력'}
                </Link>
              )}
              <Link to="/shop" className={user ? 'btn btn-secondary' : 'btn btn-primary'}>
                {t('order.backToShop')}
              </Link>
              <Link to="/" className="btn btn-secondary">{t('order.backToHome')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderConfirmation;
