import { useState, useEffect, useRef, type ReactElement, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { createOrder, verifyPayment, updateOrderStatus } from '../utils/supabase';
import { requestPayment } from '../utils/portone';
import useAOS from '../hooks/useAOS';
import SEOHead from '../components/SEOHead';
import type { PaymentError } from '../types';

interface ConfirmState {
  orderNumber: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  paymentMethod: string;
  paymentId: string;
  items: { product_title: string; quantity: number; unit_price: number; subtotal: number }[];
  paidAt: string;
}

const Checkout = (): ReactElement | null => {
  const { language, t } = useLanguage();
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isEn = language === 'en';
  useAOS();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const paymentDone = useRef(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Auto-fill form when logged in
  useEffect(() => {
    if (profile || user) {
      const email = user?.email
        || (user?.user_metadata?.email as string | undefined)
        || ((user?.identities?.[0]?.identity_data as Record<string, unknown> | undefined)?.email as string | undefined)
        || profile?.email
        || '';
      setForm(prev => ({
        name: prev.name || profile?.display_name || (user?.user_metadata?.full_name as string | undefined) || '',
        email: prev.email || email,
        phone: prev.phone || profile?.phone || ''
      }));
    }
  }, [profile, user]);

  useEffect(() => {
    if (cartItems.length === 0 && !paymentDone.current) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const formatPrice = (price: number): string => {
    return isEn
      ? `\u20A9${price.toLocaleString()}`
      : `${price.toLocaleString()}${t('shop.currency')}`;
  };

  const generateOrderNumber = (): string => {
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `DIT-${y}${m}${d}-${rand}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed || processing) return;

    // Form validation
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      showToast(isEn ? 'Please enter your name.' : '이름을 입력해 주세요.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast(isEn ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주세요.', 'error');
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      showToast(isEn ? 'Please enter a valid phone number (at least 10 digits).' : '올바른 전화번호를 입력해 주세요 (최소 10자리).', 'error');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const orderNumber = generateOrderNumber();

      // 1. Create order in Supabase
      const orderData = {
        order_number: orderNumber,
        user_email: form.email,
        user_name: form.name,
        user_phone: form.phone,
        total_amount: cartTotal,
        payment_method: paymentMethod,
        user_id: user?.id || null,
        items: cartItems.map(item => ({
          product_title: isEn ? item.titleEn : item.title,
          quantity: item.quantity,
          unit_price: item.price,
          subtotal: item.price * item.quantity
        }))
      };

      const order = await createOrder(orderData);
      const orderId = order?.id || orderNumber;

      // 2. Request payment via PortOne
      const itemCount = cartCount;
      const orderName = isEn
        ? `DreamIT Biz - ${itemCount} item${itemCount > 1 ? 's' : ''}`
        : `DreamIT Biz 상품 ${itemCount}건`;

      const paymentResult = await requestPayment({
        orderId: orderId,
        orderName,
        totalAmount: cartTotal,
        payMethod: paymentMethod === 'card' ? 'CARD' : 'TRANSFER',
        customer: {
          fullName: form.name,
          email: form.email,
          phoneNumber: form.phone
        }
      });

      if ('code' in paymentResult) {
        // Payment failed or cancelled
        setError((paymentResult as PaymentError).message || (isEn ? 'Payment was cancelled.' : '결제가 취소되었습니다.'));
        setProcessing(false);
        return;
      }

      // 3. Verify payment and update order status (non-blocking)
      try {
        await verifyPayment(paymentResult.paymentId, orderId);
      } catch {
        try {
          await updateOrderStatus(orderId, 'paid', paymentResult.paymentId);
        } catch (updateErr) {
          console.warn('Order status update failed (payment was successful):', updateErr);
        }
      }

      // 4. Payment successful - clear cart and redirect
      paymentDone.current = true;
      const confirmState: ConfirmState = {
        orderNumber,
        userName: form.name,
        userEmail: form.email,
        totalAmount: cartTotal,
        paymentMethod,
        paymentId: paymentResult.paymentId,
        items: cartItems.map(item => ({
          product_title: isEn ? item.titleEn : item.title,
          quantity: item.quantity,
          unit_price: item.price,
          subtotal: item.price * item.quantity
        })),
        paidAt: new Date().toISOString()
      };
      clearCart();
      navigate(`/order-confirmation?orderNumber=${orderNumber}`, { state: confirmState });

    } catch (err) {
      console.error('Checkout error:', err);
      setError(isEn ? 'An error occurred. Please try again.' : '오류가 발생했습니다. 다시 시도해주세요.');
      setProcessing(false);
    }
  };

  if (cartItems.length === 0 && !paymentDone.current) return null;

  return (
    <>
      <SEOHead title="결제" path="/checkout" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('checkout.title')}</h1>
        </div>
      </section>

      <section className="checkout-section">
        <div className="container">
          <form className="checkout-layout" onSubmit={handleSubmit} data-aos="fade-up">
            <div className="checkout-form">
              {/* Customer Info */}
              <div className="checkout-block">
                <h3>{t('checkout.customerInfo')}</h3>
                <div className="form-group">
                  <label>{t('checkout.name')}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={t('checkout.namePlaceholder')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('checkout.email')}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder={t('checkout.emailPlaceholder')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('checkout.phone')}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder={t('checkout.phonePlaceholder')}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="checkout-block">
                <h3>{t('checkout.paymentMethod')}</h3>
                <div className="payment-methods">
                  <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <span>{t('checkout.card')}</span>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'transfer' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                    />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="18" rx="2" />
                      <line x1="2" y1="9" x2="22" y2="9" />
                      <line x1="7" y1="15" x2="11" y2="15" />
                    </svg>
                    <span>{t('checkout.bankTransfer')}</span>
                  </label>
                </div>
              </div>

              {/* Agreement */}
              <div className="checkout-block">
                <label className="checkout-agree">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                  <span>{t('checkout.agree')}</span>
                </label>
              </div>

              {error && <div className="checkout-error">{error}</div>}
              {!agreed && !error && (
                <div className="checkout-hint">{isEn ? 'Please agree to the terms to proceed.' : '결제를 진행하려면 약관에 동의해 주세요.'}</div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-summary">
              <h3>{t('checkout.orderSummary')}</h3>
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <span className="checkout-item-name">
                      {isEn ? item.titleEn : item.title}
                      {item.quantity > 1 && ` \u00D7 ${item.quantity}`}
                    </span>
                    <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-total">
                <span>{t('checkout.totalAmount')}</span>
                <span className="checkout-total-price">{formatPrice(cartTotal)}</span>
              </div>
              <button
                type="submit"
                className="btn btn-primary checkout-pay-btn"
                disabled={!agreed || processing || !form.name || !form.email || !form.phone}
              >
                {processing ? t('checkout.processing') : t('checkout.pay')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
