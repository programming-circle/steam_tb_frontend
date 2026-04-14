import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('novaplay_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('novaplay_wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (game) => {
    setItems((prev) => {
      if (prev.find((item) => item.title === game.title)) return prev;
      return [...prev, game];
    });
  };

  const removeFromWishlist = (title) => {
    setItems((prev) => prev.filter((item) => item.title !== title));
  };

  const isInWishlist = (title) => items.some((item) => item.title === title);

  const toggleWishlist = (game) => {
    if (isInWishlist(game.title)) {
      removeFromWishlist(game.title);
    } else {
      addToWishlist(game);
    }
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
