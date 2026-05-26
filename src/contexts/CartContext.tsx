import { createContext, useContext, useState, useEffect, useCallback, type ReactElement } from 'react';
import type { CartItem, Product } from '../types';
import site from '../config/site';

interface CartContextValue {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = `${site.id}_cart`;

const loadCart = (): CartItem[] => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): ReactElement => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback((product: Product) => {
    if (product.isSoldOut) return;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1 || quantity > 99) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      cartCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const EMPTY_CART: CartContextValue = {
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  // CartProvider가 없으면 (features.shop === false) 빈 카트 반환
  return context ?? EMPTY_CART;
};
