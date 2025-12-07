import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Cart = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { getCartItems, getCartTotal, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const cartItems = getCartItems();
  const isUA = i18n.language === 'ua';

  const handleCheckout = () => {
    toast.success('Checkout feature coming soon!');
    // navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full glass-card flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-serif font-bold">{t('cart.empty')}</h2>
          <p className="text-muted-foreground">Add some products to get started</p>
          <Link to="/shop">
            <Button size="lg" variant="gold">
              {t('cart.continueShopping')}
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container">
          <h1 className="text-5xl font-serif font-bold mb-4">{t('cart.title')}</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Items</h2>
                <Button variant="ghost" size="sm" onClick={handleClearCart}>
                  Clear All
                </Button>
              </div>

              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link to={`/product/${item.id}`}>
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={isUA ? item.nameUA : item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-lg font-semibold hover:text-accent transition-colors mb-2">
                          {isUA ? item.nameUA : item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {isUA ? item.descriptionUA : item.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-gradient-gold">
                            {(item.price * item.quantity).toLocaleString()} {t('common.currency')}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFromCart(item.id);
                              toast.success('Item removed from cart');
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl sticky top-24 space-y-6">
                <h2 className="text-2xl font-serif font-bold">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cart.subtotal')}</span>
                    <span>{subtotal.toLocaleString()} {t('common.currency')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cart.shipping')}</span>
                    <span>
                      {shipping === 0 ? t('common.free') : `${shipping.toLocaleString()} ${t('common.currency')}`}
                    </span>
                  </div>
                  {subtotal > 50000 && (
                    <div className="text-sm text-success">
                      ✓ Free shipping applied!
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>{t('cart.total')}</span>
                      <span className="text-gradient-gold">
                        {total.toLocaleString()} {t('common.currency')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="gold"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  {t('cart.checkout')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    {t('cart.continueShopping')}
                  </Button>
                </Link>

                <div className="pt-4 border-t border-white/10 text-sm text-muted-foreground space-y-2">
                  <p>• Secure payment</p>
                  <p>• Free returns within 30 days</p>
                  <p>• Premium packaging included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};