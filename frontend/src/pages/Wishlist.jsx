import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { allProducts } from '../data/products';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Wishlist = () => {
  const { t, i18n } = useTranslation();
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const isUA = i18n.language === 'ua';

  const wishlistProducts = wishlist.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  const handleMoveToCart = (productId) => {
    addToCart(productId);
    removeFromWishlist(productId);
    toast.success('Item moved to cart');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full glass-card flex items-center justify-center">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-serif font-bold">{t('wishlist.empty')}</h2>
          <p className="text-muted-foreground">Save your favorite items here</p>
          <Link to="/shop">
            <Button size="lg" variant="gold">
              Discover Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container">
          <h1 className="text-5xl font-serif font-bold mb-4">{t('wishlist.title')}</h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl overflow-hidden group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-secondary/20">
                    <img
                      src={product.image}
                      alt={isUA ? product.nameUA : product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <div className="p-5 space-y-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg font-semibold text-foreground hover:text-accent transition-colors line-clamp-2">
                      {isUA ? product.nameUA : product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gradient-gold">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t('common.currency')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={() => handleMoveToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t('wishlist.moveToCart')}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        removeFromWishlist(product.id);
                        toast.success('Removed from wishlist');
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};