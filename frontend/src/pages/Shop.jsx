import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Filter, SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { allProducts, getProductsByCategory } from '../data/products';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const Shop = () => {
  const { category } = useParams();
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4);

  const products = useMemo(() => {
    let filtered = category ? getProductsByCategory(category) : allProducts;

    // Sort
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [category, sortBy]);

  const getCategoryTitle = () => {
    if (category === 'furniture') return t('nav.furniture');
    if (category === 'electronics') return t('nav.electronics');
    return 'All Products';
  };

  const gridClasses = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-b from-secondary/20 to-transparent">
        <div className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-4">
              {getCategoryTitle()}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium {category || 'products'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="section-padding">
        <div className="luxury-container">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 glass-card rounded-xl">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {products.length} products
              </span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] glass">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  variant={gridCols === 3 ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setGridCols(3)}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={gridCols === 4 ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setGridCols(4)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${gridClasses[gridCols]} gap-6`}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};