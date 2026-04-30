import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MangoVariety } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (variety: MangoVariety, quantity: number, selectedWeight: number, giftOptions?: import('../types').GiftOptions) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sterling-mangoes-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sterling-mangoes-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (variety: MangoVariety, quantity: number, selectedWeight: number, giftOptions?: import('../types').GiftOptions) => {
    setItems(prev => [...prev, { variety, quantity, selectedWeight, giftOptions }]);
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.variety.pricePerKg * item.selectedWeight * item.quantity), 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, itemCount }}>
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
