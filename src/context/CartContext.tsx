import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MangoVariety } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (variety: MangoVariety, quantity: number, selectedWeight: number, giftOptions?: import('../types').GiftOptions) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  orderGiftWrap: boolean;
  setOrderGiftWrap: (wrap: boolean) => void;
  orderGiftNote: string;
  setOrderGiftNote: (note: string) => void;
  giftWrapTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sterling-mangoes-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orderGiftWrap, setOrderGiftWrap] = useState(() => {
    const saved = localStorage.getItem('sterling-mangoes-order-wrap');
    return saved === 'true';
  });
  const [orderGiftNote, setOrderGiftNote] = useState(() => {
    return localStorage.getItem('sterling-mangoes-order-note') || '';
  });

  useEffect(() => {
    localStorage.setItem('sterling-mangoes-cart', JSON.stringify(items));
    localStorage.setItem('sterling-mangoes-order-wrap', orderGiftWrap.toString());
    localStorage.setItem('sterling-mangoes-order-note', orderGiftNote);
  }, [items, orderGiftWrap, orderGiftNote]);

  const addToCart = (variety: MangoVariety, quantity: number, selectedWeight: number, giftOptions?: import('../types').GiftOptions) => {
    setItems(prev => [...prev, { variety, quantity, selectedWeight, giftOptions }]);
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
    setOrderGiftWrap(false);
    setOrderGiftNote('');
  };

  const itemsTotal = items.reduce((sum, item) => sum + (item.variety.pricePerKg * item.selectedWeight * item.quantity), 0);
  const giftWrapTotal = orderGiftWrap ? 49 : 0;
  const total = itemsTotal + giftWrapTotal;
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, itemCount, orderGiftWrap, setOrderGiftWrap, orderGiftNote, setOrderGiftNote, giftWrapTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
