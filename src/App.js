import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { OrdersProvider } from './context/OrdersContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Support from './pages/Support';
import Account from './components/Account';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductsCategory from './components/ProductsCategory';
import SearchResults from './components/SearchResults';
import NotFound from './components/NotFound';
import SimpleTest from './components/SimpleTest';
import './styles/main.css';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teste" element={<SimpleTest />} />
                <Route path="/produtos" element={<ProductsCategory />} />
                <Route path="/produtos/:category" element={<ProductsCategory />} />
                <Route path="/produto/:id" element={<Product />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/solucoes" element={<Solutions />} />
                <Route path="/suporte" element={<Support />} />
                <Route path="/conta" element={<Account />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/busca" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </Router>
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;