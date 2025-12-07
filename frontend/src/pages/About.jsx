import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Package, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Only the finest materials and craftsmanship',
    },
    {
      icon: Package,
      title: 'Exclusive Collection',
      description: 'Curated selection of luxury items',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Express shipping worldwide',
    },
    {
      icon: Shield,
      title: 'Warranty',
      description: 'Extended warranty on all products',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
              {t('nav.about')} LUXE
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a premium online store dedicated to bringing you the finest selection 
              of designer furniture and cutting-edge electronics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024, LUXE was born from a passion for exceptional design 
                  and the desire to make luxury accessible to those who appreciate quality.
                </p>
                <p>
                  We carefully curate every product in our collection, ensuring that each 
                  piece meets our exacting standards for craftsmanship, innovation, and style.
                </p>
                <p>
                  From timeless furniture pieces that transform living spaces to the latest 
                  premium electronics that enhance daily life, we believe in offering products 
                  that combine beauty with functionality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden glass-card"
            >
              <img
                src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBmdXJuaXR1cmV8ZW58MHx8fHwxNzY1MDU4MTc1fDA&ixlib=rb-4.1.0&q=85"
                alt="About LUXE"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Why Choose LUXE</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing an exceptional shopping experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl text-center group hover:shadow-xl hover:shadow-accent/20 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-all">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="glass-card p-12 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500+', label: 'Products' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '4.9', label: 'Average Rating' },
                { value: '100+', label: 'Countries' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};