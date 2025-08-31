import React, { useState, useEffect } from 'react';
import { FaUser, FaHistory, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaTrash, FaEye, FaShoppingCart, FaShieldAlt, FaPlus, FaSearch, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useWishlist } from '../context/WishlistContext';
import { produtoRegistroAPI } from '../services/api';
import '../styles/Account.css';

const TABS = [
    { id: 'profile', icon: <FaUser />, label: 'Meu Perfil' },
    { id: 'orders', icon: <FaHistory />, label: 'Meus Pedidos' },
    { id: 'wishlist', icon: <FaHeart />, label: 'Lista de Desejos' },
    { id: 'settings', icon: <FaCog />, label: 'Configurações' }
];

const InputField = ({ label, id, type = 'text', defaultValue = '', required }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            defaultValue={defaultValue}
            required={required}
        />
    </div>
);

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderProfileForm = () => (
        <form className="account-form">
            <div className="form-row">
                <InputField label="Nome" id="firstName" defaultValue="João" required />
                <InputField label="Sobrenome" id="lastName" defaultValue="Silva" required />
            </div>
            <InputField label="E-mail" id="email" type="email" defaultValue="joao.silva@email.com" required />
            <InputField label="Telefone" id="phone" type="tel" defaultValue="(11) 99999-9999" required />
            <InputField label="CPF" id="cpf" defaultValue="123.456.789-00" required />
            <button type="submit" className="btn-primary">Salvar Alterações</button>
                </form>
    );

    const renderOrders = () => (
                    <p>Você ainda não fez nenhum pedido.</p>
    );

    const renderWishlist = () => (
                    <p>Sua lista de desejos está vazia.</p>
    );

    const renderSettingsForm = () => (
        <form className="account-form">
                <h3>Alterar Senha</h3>
            <InputField label="Senha Atual" id="currentPassword" type="password" required />
            <InputField label="Nova Senha" id="newPassword" type="password" required />
            <InputField label="Confirmar Nova Senha" id="confirmPassword" type="password" required />

                <h3>Preferências de Comunicação</h3>
                    <label className="checkbox-label">
                <input type="checkbox" /> Desejo receber ofertas e novidades por e-mail
                    </label>

            <button type="submit" className="btn-primary">Salvar Configurações</button>
            </form>
    );

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'profile': return renderProfileForm();
            case 'orders': return renderOrders();
            case 'wishlist': return renderWishlist();
            case 'settings': return renderSettingsForm();
            default: return null;
        }
    };

    return (
        <div className="account-container">
            {/* Sidebar */}
            <aside className="account-sidebar">
                <div className="account-user">
                    <div className="user-avatar"><FaUser /></div>
                    <h3>João Silva</h3>
                    <p>joao.silva@email.com</p>
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
                            <button className="logout-btn">
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
                    {renderActiveTabContent()}
                </div>
            </section>
        </div>
    );
};

export default Account;