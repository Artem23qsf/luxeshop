import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, GitCompare, User, Search, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { getCartCount, wishlist, compareList } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/shop/furniture', label: t('nav.furniture') },
    { to: '/shop/electronics', label: t('nav.electronics') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10">
      <div className="luxury-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-glow" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-background">L</span>
              </div>
            </div>
            <span className="text-2xl font-serif font-bold text-gradient-gold hidden sm:block">
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all hover:bg-accent/10 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden md:block">
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center"
                >
                  <Input
                    type="search"
                    placeholder={t('nav.search')}
                    className="glass"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-white/10">
                <DropdownMenuItem onClick={() => changeLang('ua')} className="cursor-pointer">
                  <span className="mr-2">🇺🇦</span> Українська
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLang('en')} className="cursor-pointer">
                  <span className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Compare */}
            <Link to="/compare">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <GitCompare className="h-5 w-5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-background text-xs flex items-center justify-center font-semibold">
                    {compareList.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-background text-xs flex items-center justify-center font-semibold">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-background text-xs flex items-center justify-center font-semibold">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Profile */}
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hidden sm:flex"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 py-4 border-t border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 pt-2">
                  <Input
                    type="search"
                    placeholder={t('nav.search')}
                    className="glass w-full"
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};