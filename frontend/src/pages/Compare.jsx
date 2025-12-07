import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GitCompare, Trash2, ShoppingCart, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { allProducts } from '../data/products';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Compare = () => {
  const { t, i18n } = useTranslation();
  const { compareList, removeFromCompare, clearCompare, addToCart } = useStore();
  const isUA = i18n.language === 'ua';

  const compareProducts = compareList.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full glass-card flex items-center justify-center">
            <GitCompare className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-serif font-bold">{t('compare.empty')}</h2>
          <p className="text-muted-foreground">{t('compare.addProducts')}</p>
          <Link to="/shop">
            <Button size="lg" variant="gold">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get all unique spec keys
  const allSpecs = Array.from(
    new Set(compareProducts.flatMap(p => Object.keys(p.specs || {})))
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-4">{t('compare.title')}</h1>
              <p className="text-muted-foreground">
                Comparing {compareProducts.length} products
              </p>
            </div>
            {compareProducts.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  clearCompare();
                  toast.success('Comparison cleared');
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${compareProducts.length}, minmax(280px, 1fr))` }}>
                {/* Product Cards */}
                {compareProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-xl overflow-hidden"
                  >
                    {/* Remove Button */}
                    <div className="p-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          removeFromCompare(product.id);
                          toast.success('Removed from comparison');
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Image */}
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden bg-secondary/20">
                        <img
                          src={product.image}
                          alt={isUA ? product.nameUA : product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-6 space-y-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-serif text-xl font-semibold hover:text-accent transition-colors line-clamp-2">
                          {isUA ? product.nameUA : product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gradient-gold">
                          {product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t('common.currency')}
                        </span>
                      </div>

                      {/* Specs */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {allSpecs.map(spec => (
                          <div key={spec} className="flex flex-col">
                            <span className="text-xs text-muted-foreground capitalize mb-1">
                              {spec}
                            </span>
                            <span className="text-sm font-medium">
                              {product.specs?.[spec] || '-'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="gold"
                        className="w-full mt-4"
                        onClick={() => {
                          addToCart(product.id);
                          toast.success('Added to cart');
                        }}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t('products.addToCart')}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {compareProducts.length < 4 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                You can compare up to 4 products. Add more to compare.
              </p>
              <Link to="/shop">
                <Button variant="outline">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};