import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, GitCompare, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const ProductCard = ({ product, index = 0 }) => {
  const { t, i18n } = useTranslation();
  const { addToCart, toggleWishlist, addToCompare, isInWishlist, isInCompare } = useStore();
  const isUA = i18n.language === 'ua';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast.success(
      `${isUA ? product.nameUA : product.name} ${t('products.addToCart').toLowerCase()}`
    );
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(
      isInWishlist(product.id)
        ? `Removed from ${t('nav.wishlist').toLowerCase()}`
        : `${isUA ? product.nameUA : product.name} added to ${t('nav.wishlist').toLowerCase()}`
    );
  };

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCompare(product.id)) {
      addToCompare(product.id);
      toast.success(`${isUA ? product.nameUA : product.name} added to compare`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="group relative glass-card rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-secondary/20">
            <img
              src={product.image}
              alt={isUA ? product.nameUA : product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.new && (
                <Badge className="bg-accent text-background font-semibold">
                  {t('products.new')}
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">
                  {t('products.outOfStock')}
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <Button
                variant="glass"
                size="icon"
                className="rounded-full"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-accent text-accent' : ''}`}
                />
              </Button>
              <Button
                variant="glass"
                size="icon"
                className="rounded-full"
                onClick={handleAddToCompare}
              >
                <GitCompare
                  className={`h-4 w-4 ${isInCompare(product.id) ? 'text-accent' : ''}`}
                />
              </Button>
              <Button
                variant="glass"
                size="icon"
                className="rounded-full"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button - appears on hover */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Button
                className="w-full"
                variant="gold"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('products.addToCart')}
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {isUA ? product.nameUA : product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {isUA ? product.descriptionUA : product.description}
            </p>

            {/* Price and Stock */}
            <div className="mt-auto flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gradient-gold">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  {t('common.currency')}
                </span>
              </div>
              
              {product.inStock && (
                <Badge variant="outline" className="text-success border-success/50">
                  {t('products.inStock')}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};