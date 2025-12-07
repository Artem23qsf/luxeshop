import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, GitCompare, Minus, Plus, ArrowLeft, Package, Shield, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProductById } from '../data/products';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Phone3D } from '../components/3d/Phone3D';
import { Furniture3D } from '../components/3d/Furniture3D';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addToCart, toggleWishlist, addToCompare, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [show3D, setShow3D] = useState(false);

  const product = getProductById(id);
  const isUA = i18n.language === 'ua';

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success(`${quantity}x ${isUA ? product.nameUA : product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(
      isInWishlist(product.id)
        ? 'Removed from wishlist'
        : `${isUA ? product.nameUA : product.name} added to wishlist`
    );
  };

  const handleAddToCompare = () => {
    addToCompare(product.id);
    toast.success(`${isUA ? product.nameUA : product.name} added to compare`);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-8 border-b border-white/10">
        <div className="luxury-container">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="-ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </section>

      {/* Product Detail */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
                {show3D ? (
                  <Suspense fallback={<div className="flex items-center justify-center h-full">Loading 3D...</div>}>
                    {product.category === 'electronics' ? <Phone3D /> : <Furniture3D />}
                  </Suspense>
                ) : (
                  <img
                    src={product.image}
                    alt={isUA ? product.nameUA : product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShow3D(!show3D)}
              >
                {show3D ? 'Show Photo' : 'View in 3D'}
              </Button>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex gap-2">
                {product.new && (
                  <Badge className="bg-accent text-background">
                    {t('products.new')}
                  </Badge>
                )}
                {product.inStock ? (
                  <Badge variant="outline" className="text-success border-success/50">
                    {t('products.inStock')}
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    {t('products.outOfStock')}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
                  {isUA ? product.nameUA : product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {isUA ? product.descriptionUA : product.description}
                </p>
              </div>

              {/* Price */}
              <div className="py-6 border-y border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gradient-gold">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-2xl text-muted-foreground">
                    {t('common.currency')}
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="gold"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t('products.addToCart')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-accent text-accent' : ''}`}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAddToCompare}
                >
                  <GitCompare className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="flex flex-col items-center text-center p-4 glass-card rounded-xl">
                  <Truck className="h-8 w-8 text-accent mb-2" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 glass-card rounded-xl">
                  <Shield className="h-8 w-8 text-accent mb-2" />
                  <span className="text-xs text-muted-foreground">Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 glass-card rounded-xl">
                  <Package className="h-8 w-8 text-accent mb-2" />
                  <span className="text-xs text-muted-foreground">Premium Box</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="glass-card">
                <TabsTrigger value="specs">{t('products.specifications')}</TabsTrigger>
                <TabsTrigger value="description">{t('products.description')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('products.reviews')}</TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="mt-8">
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="text-2xl font-serif font-bold mb-6">Specifications</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-white/10">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description" className="mt-8">
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="text-2xl font-serif font-bold mb-6">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isUA ? product.descriptionUA : product.description}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-8">
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="text-2xl font-serif font-bold mb-6">Customer Reviews</h3>
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
};