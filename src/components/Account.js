import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 🔹 ADICIONADO
import { 
    FaUser, FaHistory, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaTrash, 
    FaEye, FaShoppingCart, FaShieldAlt, FaPlus, FaSearch, FaSpinner 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useWishlist } from '../context/WishlistContext';
import { produtoRegistroAPI } from '../services/api';
import '../styles/Account.css';

const TABS = [
    { id: 'profile', icon: <FaUser />, label: 'Meu Perfil' },
    { id: 'orders', icon: <FaHistory />, label: 'Meus Pedidos' },
    { id: 'wishlist', icon: <FaHeart />, label: 'Lista de Desejos' },
    { id: 'product-registration', icon: <FaShieldAlt />, label: 'Registro de Produto' },
    { id: 'settings', icon: <FaCog />, label: 'Configurações' }
];

const InputField = ({ label, id, type = 'text', value = '', onChange, required, placeholder = '', disabled = false }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
        />
    </div>
);

const Account = () => {
    const navigate = useNavigate();      // 🔹 ADICIONADO
    const location = useLocation();      // 🔹 ADICIONADO
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [registeredProducts, setRegisteredProducts] = useState([]);
    const [searchSerial, setSearchSerial] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    const { user, updateProfile, changePassword, logout, clearError } = useAuth();
    const { orders, loading: ordersLoading, error: ordersError, fetchOrders, cancelOrder, clearError: clearOrdersError } = useOrders();
    const { items: wishlistItems, loading: wishlistLoading, error: wishlistError, removeFromWishlist, clearWishlist, clearError: clearWishlistError } = useWishlist();

    // Carregar dados quando o componente montar
    useEffect(() => {
        if (user) {
            fetchOrders();
            fetchRegisteredProducts();
        }
    }, [user]);

    // 🔹 Detectar se o usuário acabou de logar e veio de um redirect
    useEffect(() => {
        if (user && location.state?.redirectToTab) {
            setActiveTab(location.state.redirectToTab);
        }
    }, [user, location]);

    // Limpar mensagens após 5 segundos
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // ... (todo o restante das funções que você já tem: fetchRegisteredProducts, handleProfileSubmit, etc)

    // Se não houver usuário, mostrar mensagem de login
    if (!user) {
        return (
            <div className="account-container">
                <div className="login-required">
                    <h2>Login Necessário</h2>
                    <p>Você precisa fazer login para acessar sua conta.</p>
                    <button 
                        className="btn-primary"
                        onClick={() => navigate("/login", { state: { redirectTo: "/conta", redirectToTab: "wishlist" } })}
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="account-container">
            {/* Mensagens de feedback */}
            {message.text && (
                <div className={`message message-${message.type}`}>
                    {message.text}
                    <button onClick={() => setMessage({ type: '', text: '' })} className="message-close">×</button>
                </div>
            )}

            {/* Sidebar */}
            <aside className="account-sidebar">
                <div className="account-user">
                    <div className="user-avatar">
                        <FaUser />
                    </div>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>{user.email}</p>
                </div>
                <nav>
                    <ul>
                        {TABS.map(tab => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={activeTab === tab.id ? 'active' : ''}
                                    aria-current={activeTab === tab.id ? 'page' : undefined}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={logout} className="logout-btn">
                                <FaSignOutAlt /> Sair
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <section className="account-content">
                <h2>{TABS.find(t => t.id === activeTab)?.label}</h2>
                <div className="account-tab-content">
                    {(() => {
                        switch (activeTab) {
                            case 'profile': return renderProfileForm();
                            case 'orders': return renderOrders();
                            case 'wishlist': return renderWishlist();
                            case 'product-registration': return renderProductRegistration();
                            case 'settings': return renderSettingsForm();
                            default: return null;
                        }
                    })()}
                </div>
            </section>
        </div>
    );
};

export default Account;
