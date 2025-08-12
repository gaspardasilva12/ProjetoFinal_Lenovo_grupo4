import React, { useState } from 'react';
import { FaSearch, FaBook, FaPhone, FaEnvelope, FaComments, FaTools, FaDownload, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/Support.css';

const Support = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        product: '',
        issue: '',
        description: ''
    });

    const supportCategories = [
        {
            id: 'hardware',
            name: 'Hardware',
            icon: FaTools,
            description: 'Suporte para notebooks, desktops, tablets e acessórios',
            articles: [
                'Como resolver problemas de bateria',
                'Solução para tela azul',
                'Problemas de conectividade Wi-Fi',
                'Manutenção preventiva'
            ]
        },
        {
            id: 'software',
            name: 'Software',
            icon: FaDownload,
            description: 'Drivers, atualizações e problemas de sistema',
            articles: [
                'Atualização de drivers',
                'Instalação do Windows',
                'Configuração de antivírus',
                'Recuperação de sistema'
            ]
        },
        {
            id: 'warranty',
            name: 'Garantia',
            icon: FaExclamationTriangle,
            description: 'Informações sobre garantia e reparo',
            articles: [
                'Como verificar a garantia',
                'Processo de reparo',
                'Cobertura da garantia',
                'Solicitar reparo'
            ]
        },
        {
            id: 'account',
            name: 'Conta e Pedidos',
            icon: FaQuestionCircle,
            description: 'Gerenciamento de conta e acompanhamento de pedidos',
            articles: [
                'Recuperar senha',
                'Acompanhar pedido',
                'Alterar dados pessoais',
                'Histórico de compras'
            ]
        }
    ];

    const popularArticles = [
        {
            title: 'Como resolver problemas de bateria',
            category: 'Hardware',
            views: 15420,
            rating: 4.8
        },
        {
            title: 'Atualização de drivers',
            category: 'Software',
            views: 12850,
            rating: 4.6
        },
        {
            title: 'Configuração de Wi-Fi',
            category: 'Hardware',
            views: 11230,
            rating: 4.7
        },
        {
            title: 'Recuperação de sistema',
            category: 'Software',
            views: 9870,
            rating: 4.5
        }
    ];

    const handleContactSubmit = (e) => {
        e.preventDefault();
        console.log('Formulário de suporte enviado:', contactForm);
        alert('Sua solicitação foi enviada! Entraremos em contato em breve.');
        setContactForm({
            name: '',
            email: '',
            product: '',
            issue: '',
            description: ''
        });
    };

    const handleInputChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const filteredCategories = selectedCategory === 'all' 
        ? supportCategories 
        : supportCategories.filter(cat => cat.id === selectedCategory);

    return (
        <div className="support-container">
            <div className="support-hero">
                <h1>Suporte Lenovo</h1>
                <p>Estamos aqui para ajudar você com qualquer questão</p>
                
                <div className="support-search">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Digite sua pergunta ou problema..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-btn">Buscar</button>
                    </div>
                </div>
            </div>

            <div className="support-quick-actions">
                <div className="quick-action-card">
                    <FaPhone className="action-icon" />
                    <h3>Suporte por Telefone</h3>
                    <p>0800 891 8287</p>
                    <span className="availability">24/7</span>
                </div>
                
                <div className="quick-action-card">
                    <FaComments className="action-icon" />
                    <h3>Chat Online</h3>
                    <p>Converse com um especialista</p>
                    <span className="availability">Disponível</span>
                </div>
                
                <div className="quick-action-card">
                    <FaEnvelope className="action-icon" />
                    <h3>Email</h3>
                    <p>suporte@lenovo.com.br</p>
                    <span className="availability">24h</span>
                </div>
                
                <div className="quick-action-card">
                    <FaBook className="action-icon" />
                    <h3>Base de Conhecimento</h3>
                    <p>Artigos e tutoriais</p>
                    <span className="availability">Sempre</span>
                </div>
            </div>

            <div className="support-content">
                <div className="support-sidebar">
                    <h3>Categorias</h3>
                    <div className="category-filters">
                        <button 
                            className={selectedCategory === 'all' ? 'active' : ''}
                            onClick={() => setSelectedCategory('all')}
                        >
                            Todas as Categorias
                        </button>
                        {supportCategories.map(category => (
                            <button
                                key={category.id}
                                className={selectedCategory === category.id ? 'active' : ''}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="popular-articles">
                        <h3>Artigos Populares</h3>
                        {popularArticles.map((article, index) => (
                            <div key={index} className="popular-article">
                                <h4>{article.title}</h4>
                                <div className="article-meta">
                                    <span className="category">{article.category}</span>
                                    <span className="views">{article.views} visualizações</span>
                                    <span className="rating">★ {article.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="support-main">
                    <div className="knowledge-base">
                        <h2>Base de Conhecimento</h2>
                        <p>Encontre respostas para as perguntas mais frequentes</p>
                        
                        <div className="categories-grid">
                            {filteredCategories.map(category => (
                                <div key={category.id} className="category-card">
                                    <div className="category-header">
                                        <category.icon className="category-icon" />
                                        <h3>{category.name}</h3>
                                    </div>
                                    <p>{category.description}</p>
                                    <div className="category-articles">
                                        <h4>Artigos relacionados:</h4>
                                        <ul>
                                            {category.articles.map((article, index) => (
                                                <li key={index}>
                                                    <a href="#" className="article-link">{article}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contact-support">
                        <h2>Precisa de ajuda personalizada?</h2>
                        <p>Nossa equipe de suporte está pronta para ajudar você</p>
                        
                        <div className="contact-methods">
                            <div className="contact-method">
                                <FaPhone className="method-icon" />
                                <div>
                                    <h3>Telefone</h3>
                                    <p className="phone-number">0800 891 8287</p>
                                    <p className="availability">Disponível 24/7</p>
                                    <p className="description">Para suporte técnico e consultas sobre produtos</p>
                                </div>
                            </div>
                            
                            <div className="contact-method">
                                <FaComments className="method-icon" />
                                <div>
                                    <h3>Chat Online</h3>
                                    <p className="availability">Disponível agora</p>
                                    <p className="description">Converse em tempo real com nossos especialistas</p>
                                    <button className="chat-btn">Iniciar Chat</button>
                                </div>
                            </div>
                            
                            <div className="contact-method">
                                <FaEnvelope className="method-icon" />
                                <div>
                                    <h3>Email</h3>
                                    <p className="email">suporte@lenovo.com.br</p>
                                    <p className="availability">Resposta em até 24h</p>
                                    <p className="description">Para questões não urgentes e documentação</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="support-form-section">
                        <h2>Enviar Solicitação de Suporte</h2>
                        <p>Preencha o formulário abaixo e nossa equipe entrará em contato</p>
                        
                        <form className="support-form" onSubmit={handleContactSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nome *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="product">Produto</label>
                                    <input
                                        type="text"
                                        id="product"
                                        name="product"
                                        value={contactForm.product}
                                        onChange={handleInputChange}
                                        placeholder="Modelo do produto (opcional)"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="issue">Tipo de Problema</label>
                                    <select
                                        id="issue"
                                        name="issue"
                                        value={contactForm.issue}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecione o tipo de problema</option>
                                        <option value="hardware">Problema de Hardware</option>
                                        <option value="software">Problema de Software</option>
                                        <option value="warranty">Questão de Garantia</option>
                                        <option value="account">Problema de Conta</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descrição do Problema *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    value={contactForm.description}
                                    onChange={handleInputChange}
                                    placeholder="Descreva detalhadamente o problema que está enfrentando..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Enviar Solicitação
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support; 