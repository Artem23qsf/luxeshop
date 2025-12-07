import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Package, Sofa } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import { motion } from 'framer-motion';
import { Phone3D } from '../components/3d/Phone3D';
import { Furniture3D } from '../components/3d/Furniture3D';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative luxury-container z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Premium Collection 2024</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="xl" variant="gold" className="group">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/3d-showcase">
                <Button size="xl" variant="glass">
                  {t('hero.explore3d')}
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-gradient-gold">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-gold">50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-gold">4.9</div>
                <div className="text-sm text-muted-foreground mt-1">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
              <img
                src="https://images.unsplash.com/photo-1540932428079-887d0d7a8fa5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmdXJuaXR1cmV8ZW58MHx8fHwxNzY1MDU4MTc1fDA&ixlib=rb-4.1.0&q=85"
                alt="Luxury Furniture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-2xl rotate-12 blur-xl opacity-50 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-2xl -rotate-12 blur-xl opacity-50 animate-float" style={{ animationDelay: '1.5s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 'furniture',
      name: t('categories.furniture'),
      image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBmdXJuaXR1cmV8ZW58MHx8fHwxNzY1MDU4MTc1fDA&ixlib=rb-4.1.0&q=85',
      icon: Sofa,
      link: '/shop/furniture',
    },
    {
      id: 'electronics',
      name: t('categories.electronics'),
      image: 'https://images.unsplash.com/photo-1758186370179-5b033011187b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZWxlY3Ryb25pY3N8ZW58MHx8fHwxNzY1MDU4MjA0fDA&ixlib=rb-4.1.0&q=85',
      icon: Package,
      link: '/shop/electronics',
    },
  ];

  return (
    <section className="section-padding">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            {t('categories.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link to={category.link}>
                <div className="group relative h-96 rounded-2xl overflow-hidden glass-card transition-all hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-all">
                      <category.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <Button variant="ghost" className="group-hover:text-accent">
                      Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="section-padding bg-secondary/20">
      <div className="luxury-container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
              {t('products.featured')}
            </h2>
            <p className="text-muted-foreground">
              Handpicked premium collection for you
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="hidden sm:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link to="/shop">
            <Button variant="outline">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Showcase3D = () => {
  const { t } = useTranslation();
  const [activeModel, setActiveModel] = useState('phone');

  return (
    <section className="section-padding">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            {t('hero.explore3d')} Models
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interact with our products in stunning 3D. Rotate, zoom, and explore every detail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <div className="relative aspect-square rounded-2xl glass-card overflow-hidden">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-muted-foreground">Loading 3D model...</div>
              </div>
            }>
              {activeModel === 'phone' ? <Phone3D /> : <Furniture3D />}
            </Suspense>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold">
              Interactive 3D Showcase
            </h3>
            <p className="text-muted-foreground">
              Experience our products like never before. Use your mouse to rotate and explore the intricate details of our premium collection.
            </p>

            <div className="space-y-3">
              <Button
                variant={activeModel === 'phone' ? 'gold' : 'outline'}
                className="w-full justify-start"
                onClick={() => setActiveModel('phone')}
              >
                <Package className="mr-3 h-5 w-5" />
                Premium Smartphone
              </Button>
              <Button
                variant={activeModel === 'furniture' ? 'gold' : 'outline'}
                className="w-full justify-start"
                onClick={() => setActiveModel('furniture')}
              >
                <Sofa className="mr-3 h-5 w-5" />
                Designer Chair
              </Button>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                • Click and drag to rotate<br />
                • Auto-rotation enabled<br />
                • Real-time lighting effects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Showcase3D />
    </div>
  );
};