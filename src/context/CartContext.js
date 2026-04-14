import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('novaplay_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('novaplay_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (game) => {
    setItems((prev) => {
      if (prev.find((item) => item.title === game.title)) return prev;
      return [...prev, game];
    });
  };

  const removeFromCart = (title) => {
    setItems((prev) => prev.filter((item) => item.title !== title));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (title) => items.some((item) => item.title === title);

  const total = items.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace('$', ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart, total, count: items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
