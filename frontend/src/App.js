import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Compare } from './pages/Compare';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import './i18n';
import './App.css';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass-card p-8 rounded-xl">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4">
          <div className="h-4 bg-accent/20 rounded w-3/4"></div>
          <div className="h-4 bg-accent/20 rounded"></div>
          <div className="h-4 bg-accent/20 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <div className="App min-h-screen bg-background text-foreground">
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
          <Footer />
          <Toaster position="top-right" richColors />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
