import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsCategory from './components/ProductsCategory';
import ProductDetail from './components/ProductDetail';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Support from './pages/Support';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Account from './components/Account';
import NotFound from './components/NotFound';
import SearchResults from './components/SearchResults';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produtos" element={<ProductsCategory />} />
                    <Route path="/produtos/:category" element={<ProductsCategory />} />
                    <Route path="/produto/:id" element={<ProductDetail />} />
                    <Route path="/solucoes" element={<Solutions />} />
                    <Route path="/solucoes/:solution" element={<Solutions />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/servicos/:service" element={<Services />} />
                    <Route path="/suporte" element={<Support />} />
                    <Route path="/busca" element={<SearchResults />} />
                    <Route path="/carrinho" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/conta" element={<Account />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
};

export default App;