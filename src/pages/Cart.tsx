import { useEffect, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import useAOS from '../hooks/useAOS';
import SEOHead from '../components/SEOHead';

const Cart = (): ReactElement => {
  const { language, t } = useLanguage();
  const { cartItems, cartTotal, cartCount, removeItem, updateQuantity } = useCart();
  const isEn = language === 'en';
  useAOS();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const formatPrice = (price: number): string => {
    return isEn
      ? `\u20A9${price.toLocaleString()}`
      : `${price.toLocaleString()}${t('shop.currency')}`;
  };

  return (
    <>
      <SEOHead title="장바구니" path="/cart" noindex />
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{t('cart.title')}</h1>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="cart-empty" data-aos="fade-up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="cart-empty-icon">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p>{t('cart.empty')}</p>
              <Link to="/shop" className="btn btn-primary">{t('cart.continueShopping')}</Link>
            </div>
          ) : (
            <div className="cart-layout" data-aos="fade-up">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{isEn ? item.titleEn : item.title}</h4>
                      <span className="cart-item-price">{formatPrice(item.price)}</span>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          &minus;
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 99}
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label={t('cart.remove')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>{t('cart.orderSummary')}</h3>
                <div className="cart-summary-row">
                  <span>{cartCount} {t('cart.items')}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="cart-summary-total">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <Link to="/checkout" className="btn btn-primary cart-checkout-btn">
                  {t('cart.checkout')}
                </Link>
                <Link to="/shop" className="cart-continue-link">
                  {t('cart.continueShopping')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
