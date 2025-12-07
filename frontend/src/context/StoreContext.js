import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '../data/products';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (productId, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const addToCompare = (productId) => {
    setCompareList(prev => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= 4) {
        alert('You can only compare up to 4 products');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const getCartItems = () => {
    return cart.map(item => {
      const product = allProducts.find(p => p.id === item.productId);
      return { ...product, quantity: item.quantity };
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = allProducts.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const isInCompare = (productId) => compareList.includes(productId);
  const isInCart = (productId) => cart.some(item => item.productId === productId);

  const value = {
    cart,
    wishlist,
    compareList,
    user,
    setUser,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    addToCompare,
    removeFromCompare,
    clearCompare,
    getCartItems,
    getCartTotal,
    getCartCount,
    isInWishlist,
    isInCompare,
    isInCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};