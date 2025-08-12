import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const { getCartCount } = useCart();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="lenovo-header">
                <div className="lenovo-logo">
                    <Link to="/">
                        <div className="lenovo-logo-red">
                            <span>Lenovo</span>
                        </div>
                    </Link>
                </div>

                <div className={`lenovo-search ${isSearchFocused ? 'focused' : ''}`}>
                    <input
                        type="text"
                        placeholder="Procurar"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    <button>
                        <FaSearch />
                    </button>
                </div>

                <div className="lenovo-icons">
                    <div className="lenovo-account">
                        <FaUser />
                        <span className="desktop-text">Iniciar sessão / Criar conta</span>
                    </div>
                    <div className="lenovo-wishlist">
                        <FaHeart />
                    </div>
                    <Link to="/carrinho" className="lenovo-cart">
                        <FaShoppingCart />
                        <span className="desktop-text">Carrinho ({getCartCount()})</span>
                    </Link>
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>
            <div className="lenovo-categories-bar">
                <Link to="/empresas" className="lenovo-category-link">Empresas</Link>
                <span className="lenovo-category-separator">|</span>
                <Link to="/educacao" className="lenovo-category-link">Educação</Link>
                <span className="lenovo-category-separator">|</span>
                <Link to="/gaming" className="lenovo-category-link">Gaming</Link>
            </div>

            <nav className={`lenovo-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="lenovo-nav-main">
                    <li className="nav-produtos-dropdown">
                        <Link to="/produtos" className="nav-produtos">
                            Produtos
                        </Link>
                        <ul className="nav-produtos-submenu">
                            <li><Link to="/produtos/promocoes">Promoções</Link></li>
                            <li><Link to="/produtos/notebooks">Notebooks</Link></li>
                            <li><Link to="/produtos/desktops">Desktops</Link></li>
                            <li><Link to="/produtos/workstations">Workstations</Link></li>
                            <li><Link to="/produtos/tablets">Tablets</Link></li>
                            <li><Link to="/produtos/servidores-armazenamento">Servidores e Armazenamento</Link></li>
                            <li><Link to="/produtos/acessorios">Acessórios</Link></li>
                            <li><Link to="/produtos/monitores">Monitores</Link></li>
                            <li><Link to="/produtos/servicos">Serviços</Link></li>
                            <li><Link to="/produtos/ia">IA</Link></li>
                        </ul>
                    </li>
                    <li className="nav-solucoes-dropdown">
                        <Link to="/solucoes" className="nav-solucoes">
                            Soluções
                        </Link>
                        <ul className="nav-solucoes-submenu">
                            <li><Link to="/solucoes/ia">IA</Link></li>
                            <li><Link to="/solucoes/digital-workplace">Digital Workplace</Link></li>
                            <li><Link to="/solucoes/nuvem-hibrida">Nuvem Híbrida</Link></li>
                            <li><Link to="/solucoes/edge">Edge</Link></li>
                            <li><Link to="/solucoes/sustentabilidade">Sustentabilidade</Link></li>
                            <li><Link to="/solucoes/truscale">TruScale</Link></li>
                            <li><Link to="/solucoes/industria">Soluções por Indústria</Link></li>
                            <li><Link to="/solucoes/parceiros">Parceiros da Aliança</Link></li>
                            <li><Link to="/solucoes/outras">Outras Soluções</Link></li>
                            <li><Link to="/solucoes/recursos">Recursos</Link></li>
                        </ul>
                    </li>
                    <li className="nav-servicos-dropdown">
                        <Link to="/servicos" className="nav-servicos">
                            Serviços
                        </Link>
                        <ul className="nav-servicos-submenu">
                            <li><Link to="/servicos/consultoria">Serviços de Consultoria</Link></li>
                            <li><Link to="/servicos/implantacao">Serviços de Implantação</Link></li>
                            <li><Link to="/servicos/gerenciados">Serviços Gerenciados</Link></li>
                            <li><Link to="/servicos/seguranca">Serviços de Segurança</Link></li>
                            <li><Link to="/servicos/suporte">Serviços de Suporte</Link></li>
                            <li><Link to="/servicos/truscale">TruScale</Link></li>
                            <li><Link to="/servicos/garantia">Consulta de Garantia</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/suporte">Suporte</Link></li>
                    <li className="nav-sobre-dropdown">
                        <Link to="/sobre" className="nav-sobre">
                            Sobre Lenovo
                        </Link>
                        <ul className="nav-sobre-submenu">
                            <li><Link to="/sobre/quem-somos">Quem Somos</Link></li>
                            <li><Link to="/sobre/lideres">Nossos Líderes</Link></li>
                            <li><Link to="/sobre/inovacao">Inovação</Link></li>
                            <li><Link to="/sobre/impacto">Nosso Impacto</Link></li>
                        </ul>
                    </li>
                    <li className="nav-promocoes-dropdown">
                        <Link to="/promocoes" className="nav-promocoes">
                            Promoções
                        </Link>
                        <ul className="nav-promocoes-submenu">
                            <li><Link to="/promocoes/todas">Todas as Promoções</Link></li>
                            <li><Link to="/promocoes/membros">Membros e Programas</Link></li>
                            <li><Link to="/promocoes/outlet">Outlet</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;