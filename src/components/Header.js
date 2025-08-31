import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaChevronDown, FaBars, FaTimes, FaBox, FaShieldAlt, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const { login, register, isAuthenticated, user, logout } = useAuth();

    // Estados do formulário de login
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    // Estados do formulário de registro
    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        cpf: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    };

    const closeAccountDropdown = () => {
        setIsAccountDropdownOpen(false);
    };

    const openAuthModal = () => {
        setIsAuthModalOpen(true);
        setError('');
        setIsLoginMode(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setError('');
        setLoginForm({ email: '', password: '' });
        setRegisterForm({
            firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
            phone: '', cpf: '', address: '', city: '', state: '', zipCode: ''
        });
    };

    const toggleAuthMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleLoginFormChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterFormChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(loginForm);
            closeAuthModal();
            closeAccountDropdown();
        } catch (error) {
            setError(error.message || 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validação básica
        if (registerForm.password !== registerForm.confirmPassword) {
            setError('As senhas não coincidem');
            setIsLoading(false);
            return;
        }

        if (registerForm.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            setIsLoading(false);
            return;
        }

        try {
            const userData = {
                nome: `${registerForm.firstName} ${registerForm.lastName}`,
                email: registerForm.email,
                senha: registerForm.password,
                telefone: registerForm.phone,
                cpf: registerForm.cpf,
                endereco: registerForm.address,
                cidade: registerForm.city,
                estado: registerForm.state,
                cep: registerForm.zipCode
            };

            await register(userData);
            closeAuthModal();
            closeAccountDropdown();
        } catch (error) {
            setError(error.message || 'Erro ao criar conta');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            closeAccountDropdown();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const renderAuthModal = () => {
        if (!isAuthModalOpen) return null;

        return (
            <div className="auth-modal-overlay" onClick={closeAuthModal}>
                <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="auth-modal-header">
                        <h2>{isLoginMode ? 'Iniciar Sessão' : 'Criar Conta'}</h2>
                        <button className="auth-modal-close" onClick={closeAuthModal}>
                            <FaTimes />
                        </button>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {isLoginMode ? (
                        <form onSubmit={handleLogin} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="login-email">E-mail</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    value={loginForm.email}
                                    onChange={handleLoginFormChange}
                                    required
                                    placeholder="Seu e-mail"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Senha</label>
                                <div className="password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="login-password"
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleLoginFormChange}
                                        required
                                        placeholder="Sua senha"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn-auth-submit" disabled={isLoading}>
                                {isLoading ? <FaSpinner className="spinner" /> : 'Entrar'}
                            </button>

                            <div className="auth-form-footer">
                                <p>Não tem uma conta?</p>
                                <button type="button" className="btn-auth-switch" onClick={toggleAuthMode}>
                                    Criar conta
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="register-firstName">Nome</label>
                                    <input
                                        type="text"
                                        id="register-firstName"
                                        name="firstName"
                                        value={registerForm.firstName}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-lastName">Sobrenome</label>
                                    <input
                                        type="text"
                                        id="register-lastName"
                                        name="lastName"
                                        value={registerForm.lastName}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="Seu sobrenome"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-email">E-mail</label>
                                <input
                                    type="email"
                                    id="register-email"
                                    name="email"
                                    value={registerForm.email}
                                    onChange={handleRegisterFormChange}
                                    required
                                    placeholder="Seu e-mail"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="register-password">Senha</label>
                                    <div className="password-input">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="register-password"
                                            name="password"
                                            value={registerForm.password}
                                            onChange={handleRegisterFormChange}
                                            required
                                            placeholder="Mínimo 6 caracteres"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-confirmPassword">Confirmar Senha</label>
                                    <div className="password-input">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="register-confirmPassword"
                                            name="confirmPassword"
                                            value={registerForm.confirmPassword}
                                            onChange={handleRegisterFormChange}
                                            required
                                            placeholder="Confirme sua senha"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="register-phone">Telefone</label>
                                    <input
                                        type="tel"
                                        id="register-phone"
                                        name="phone"
                                        value={registerForm.phone}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-cpf">CPF</label>
                                    <input
                                        type="text"
                                        id="register-cpf"
                                        name="cpf"
                                        value={registerForm.cpf}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="123.456.789-00"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-address">Endereço</label>
                                <input
                                    type="text"
                                    id="register-address"
                                    name="address"
                                    value={registerForm.address}
                                    onChange={handleRegisterFormChange}
                                    required
                                    placeholder="Rua, número, complemento"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="register-city">Cidade</label>
                                    <input
                                        type="text"
                                        id="register-city"
                                        name="city"
                                        value={registerForm.city}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="Sua cidade"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="register-state">Estado</label>
                                    <input
                                        type="text"
                                        id="register-state"
                                        name="state"
                                        value={registerForm.state}
                                        onChange={handleRegisterFormChange}
                                        required
                                        placeholder="SP"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-zipCode">CEP</label>
                                <input
                                    type="text"
                                    id="register-zipCode"
                                    name="zipCode"
                                    value={registerForm.zipCode}
                                    onChange={handleRegisterFormChange}
                                    required
                                    placeholder="01234-567"
                                />
                            </div>

                            <button type="submit" className="btn-auth-submit" disabled={isLoading}>
                                {isLoading ? <FaSpinner className="spinner" /> : 'Criar Conta'}
                            </button>

                            <div className="auth-form-footer">
                                <p>Já tem uma conta?</p>
                                <button type="button" className="btn-auth-switch" onClick={toggleAuthMode}>
                                    Fazer login
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
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
                        placeholder="Procurar produtos, soluções e serviços..."
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    <button>
                        <FaSearch />
                    </button>
                </div>

                <div className="lenovo-icons">
                    <div className="lenovo-account-dropdown">
                        {isAuthenticated ? (
                            <button 
                                className="lenovo-account"
                                onClick={toggleAccountDropdown}
                                onBlur={() => setTimeout(closeAccountDropdown, 200)}
                            >
                                <FaUser />
                                <span className="desktop-text">{user?.firstName || 'Minha Conta'}</span>
                            </button>
                        ) : (
                            <button 
                                className="lenovo-account"
                                onClick={toggleAccountDropdown}
                                onBlur={() => setTimeout(closeAccountDropdown, 200)}
                            >
                                <FaUser />
                                <span className="desktop-text">Iniciar sessão / Criar conta</span>
                            </button>
                        )}
                        
                        {isAccountDropdownOpen && (
                            <div className="account-dropdown">
                                {isAuthenticated ? (
                                    <>
                                        <div className="dropdown-header">
                                            <h3>Minha Conta Lenovo</h3>
                                            <p>Bem-vindo, {user?.firstName}!</p>
                                        </div>
                                        
                                        <div className="dropdown-options">
                                            <Link to="/conta?tab=profile" className="dropdown-option" onClick={closeAccountDropdown}>
                                                <div className="option-icon">
                                                    <FaUser />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Perfil</h4>
                                                    <p>Editar nome da conta, senha e configurações</p>
                                                </div>
                                            </Link>
                                            
                                            <Link to="/conta?tab=orders" className="dropdown-option" onClick={closeAccountDropdown}>
                                                <div className="option-icon">
                                                    <FaBox />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Pedidos</h4>
                                                    <p>Visualize e acompanhe seus pedidos</p>
                                                </div>
                                            </Link>
                                            
                                            <Link to="/conta?tab=wishlist" className="dropdown-option" onClick={closeAccountDropdown}>
                                                <div className="option-icon">
                                                    <FaHeart />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Lista de Desejos</h4>
                                                    <p>Crie sua lista de produtos favoritos</p>
                                                </div>
                                            </Link>
                                            
                                            <Link to="/conta?tab=product-registration" className="dropdown-option" onClick={closeAccountDropdown}>
                                                <div className="option-icon">
                                                    <FaShieldAlt />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Registro de Produto</h4>
                                                    <p>Registre seu produto e/ou atualize seus dados</p>
                                                </div>
                                            </Link>

                                            <button onClick={handleLogout} className="dropdown-option logout-option">
                                                <div className="option-icon">
                                                    <FaUser />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Sair</h4>
                                                    <p>Fazer logout da sua conta</p>
                                                </div>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="dropdown-header">
                                            <h3>Minha Conta Lenovo</h3>
                                            <p>Acompanhe seus pedidos, listas de desejos e muito mais em um só lugar</p>
                                            <button className="btn-login-create" onClick={openAuthModal}>
                                                Iniciar sessão / Criar conta
                                            </button>
                                        </div>
                                        
                                        <div className="dropdown-options">
                                            <div className="dropdown-option" onClick={openAuthModal}>
                                                <div className="option-icon">
                                                    <FaUser />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Perfil</h4>
                                                    <p>Editar nome da conta, senha e configurações</p>
                                                </div>
                                            </div>
                                            
                                            <div className="dropdown-option" onClick={openAuthModal}>
                                                <div className="option-icon">
                                                    <FaBox />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Pedidos</h4>
                                                    <p>Visualize e acompanhe seus pedidos</p>
                                                </div>
                                            </div>
                                            
                                            <div className="dropdown-option" onClick={openAuthModal}>
                                                <div className="option-icon">
                                                    <FaHeart />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Lista de Desejos</h4>
                                                    <p>Crie sua lista de produtos favoritos</p>
                                                </div>
                                            </div>
                                            
                                            <div className="dropdown-option" onClick={openAuthModal}>
                                                <div className="option-icon">
                                                    <FaShieldAlt />
                                                </div>
                                                <div className="option-content">
                                                    <h4>Registro de Produto</h4>
                                                    <p>Registre seu produto e/ou atualize seus dados</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <Link to="/conta?tab=wishlist" className="lenovo-wishlist">
                        <FaHeart />
                        {getWishlistCount() > 0 && (
                            <span className="wishlist-count">{getWishlistCount()}</span>
                        )}
                        <span className="desktop-text">Lista de Desejos</span>
                    </Link>
                    
                    <Link to="/carrinho" className="lenovo-cart">
                        <FaShoppingCart />
                        {getCartCount() > 0 && (
                            <span className="cart-count">{getCartCount()}</span>
                        )}
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
                            <li><Link to="/produtos/promocoes">Todas as Promoções</Link></li>
                            <li><Link to="/produtos/membros">Membros e Programas</Link></li>
                            <li><Link to="/produtos/outlet">Outlet</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {/* Modal de Autenticação */}
            {renderAuthModal()}
        </>
    );
};

export default Header;