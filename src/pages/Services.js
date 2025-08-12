import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeadset, FaTools, FaShieldAlt, FaCog, FaPhone, FaEnvelope, FaComments, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Services.css';

const Services = () => {
    const { service } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
    });

    const servicesData = {
        consultoria: {
            title: "Serviços de Consultoria",
            subtitle: "Estratégia e planejamento tecnológico",
            description: "Nossa equipe de consultores especializados ajuda você a desenvolver estratégias tecnológicas que impulsionam o crescimento do seu negócio.",
            icon: FaHeadset,
            features: [
                "Análise de infraestrutura atual",
                "Planejamento de transformação digital",
                "Otimização de processos",
                "Roadmap tecnológico",
                "Análise de ROI"
            ],
            offerings: [
                {
                    title: "Consultoria Estratégica",
                    description: "Desenvolvimento de estratégias tecnológicas alinhadas aos objetivos de negócio.",
                    duration: "4-8 semanas",
                    deliverables: ["Relatório de análise", "Roadmap detalhado", "Recomendações de implementação"]
                },
                {
                    title: "Auditoria de TI",
                    description: "Avaliação completa da infraestrutura e processos de TI existentes.",
                    duration: "2-4 semanas",
                    deliverables: ["Relatório de auditoria", "Identificação de gaps", "Plano de correção"]
                },
                {
                    title: "Transformação Digital",
                    description: "Acompanhamento completo do processo de transformação digital.",
                    duration: "6-12 meses",
                    deliverables: ["Plano de transformação", "Acompanhamento contínuo", "Relatórios de progresso"]
                }
            ]
        },
        implantacao: {
            title: "Serviços de Implantação",
            subtitle: "Implementação e configuração",
            description: "Implementamos e configuramos soluções tecnológicas de forma eficiente e com mínima interrupção do seu negócio.",
            icon: FaTools,
            features: [
                "Instalação e configuração",
                "Migração de dados",
                "Testes de funcionalidade",
                "Treinamento da equipe",
                "Documentação completa"
            ],
            offerings: [
                {
                    title: "Implementação de Infraestrutura",
                    description: "Instalação e configuração de servidores, redes e sistemas.",
                    duration: "2-6 semanas",
                    deliverables: ["Sistema funcionando", "Documentação técnica", "Treinamento da equipe"]
                },
                {
                    title: "Migração de Sistemas",
                    description: "Transferência segura de dados e aplicações para novos ambientes.",
                    duration: "1-4 semanas",
                    deliverables: ["Migração concluída", "Validação de dados", "Relatório de migração"]
                },
                {
                    title: "Configuração de Segurança",
                    description: "Implementação de políticas e ferramentas de segurança.",
                    duration: "1-3 semanas",
                    deliverables: ["Sistema seguro", "Políticas implementadas", "Testes de segurança"]
                }
            ]
        },
        gerenciados: {
            title: "Serviços Gerenciados",
            subtitle: "Tecnologia como serviço",
            description: "Gerencie sua infraestrutura de TI de forma proativa e eficiente com nossos serviços gerenciados.",
            icon: FaCog,
            features: [
                "Monitoramento 24/7",
                "Manutenção preventiva",
                "Suporte técnico dedicado",
                "Relatórios de performance",
                "Escalabilidade automática"
            ],
            offerings: [
                {
                    title: "Gerenciamento de Infraestrutura",
                    description: "Monitoramento e manutenção contínua de toda a infraestrutura de TI.",
                    duration: "Contínuo",
                    deliverables: ["Monitoramento 24/7", "Relatórios mensais", "Suporte dedicado"]
                },
                {
                    title: "Gerenciamento de Aplicações",
                    description: "Administração e otimização de aplicações críticas do negócio.",
                    duration: "Contínuo",
                    deliverables: ["Performance otimizada", "Atualizações automáticas", "Suporte especializado"]
                },
                {
                    title: "Gerenciamento de Segurança",
                    description: "Proteção contínua contra ameaças e vulnerabilidades.",
                    duration: "Contínuo",
                    deliverables: ["Segurança proativa", "Relatórios de ameaças", "Resposta a incidentes"]
                }
            ]
        },
        seguranca: {
            title: "Serviços de Segurança",
            subtitle: "Proteção completa",
            description: "Proteja seus dados e sistemas com soluções de segurança avançadas e monitoramento contínuo.",
            icon: FaShieldAlt,
            features: [
                "Análise de vulnerabilidades",
                "Implementação de segurança",
                "Monitoramento de ameaças",
                "Resposta a incidentes",
                "Conformidade regulatória"
            ],
            offerings: [
                {
                    title: "Auditoria de Segurança",
                    description: "Avaliação completa da postura de segurança da organização.",
                    duration: "2-4 semanas",
                    deliverables: ["Relatório de vulnerabilidades", "Plano de correção", "Recomendações de segurança"]
                },
                {
                    title: "Implementação de Segurança",
                    description: "Deploy de soluções de segurança e políticas de proteção.",
                    duration: "2-6 semanas",
                    deliverables: ["Sistema seguro", "Políticas implementadas", "Treinamento de segurança"]
                },
                {
                    title: "SOC como Serviço",
                    description: "Centro de operações de segurança para monitoramento contínuo.",
                    duration: "Contínuo",
                    deliverables: ["Monitoramento 24/7", "Detecção de ameaças", "Resposta a incidentes"]
                }
            ]
        },
        suporte: {
            title: "Serviços de Suporte",
            subtitle: "Suporte técnico especializado",
            description: "Receba suporte técnico rápido e eficiente para todas as suas necessidades tecnológicas.",
            icon: FaHeadset,
            features: [
                "Suporte 24/7",
                "Equipe especializada",
                "Resolução rápida",
                "Múltiplos canais",
                "SLA garantido"
            ],
            offerings: [
                {
                    title: "Suporte Básico",
                    description: "Suporte técnico para questões comuns e configurações básicas.",
                    responseTime: "4 horas",
                    coverage: "8x5",
                    deliverables: ["Resolução de problemas", "Suporte por email/chat", "Base de conhecimento"]
                },
                {
                    title: "Suporte Premium",
                    description: "Suporte prioritário com SLA garantido e acompanhamento dedicado.",
                    responseTime: "2 horas",
                    coverage: "24x7",
                    deliverables: ["Suporte prioritário", "Gerente de conta", "SLA garantido"]
                },
                {
                    title: "Suporte Onsite",
                    description: "Suporte técnico presencial para problemas complexos.",
                    responseTime: "4-8 horas",
                    coverage: "24x7",
                    deliverables: ["Técnico no local", "Resolução presencial", "Relatório detalhado"]
                }
            ]
        }
    };

    const currentService = service ? servicesData[service] : null;
    const allServices = Object.entries(servicesData);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para enviar o formulário
        console.log('Formulário enviado:', contactForm);
        alert('Obrigado! Entraremos em contato em breve.');
        setContactForm({
            name: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            message: ''
        });
    };

    const handleInputChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    if (currentService) {
        return (
            <div className="services-detail-container">
                <div className="service-hero">
                    <div className="service-hero-content">
                        <div className="service-icon">
                            <currentService.icon />
                        </div>
                        <h1>{currentService.title}</h1>
                        <h2>{currentService.subtitle}</h2>
                        <p>{currentService.description}</p>
                    </div>
                </div>

                <div className="service-content">
                    <nav className="service-tabs">
                        <button 
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Visão Geral
                        </button>
                        <button 
                            className={activeTab === 'offerings' ? 'active' : ''}
                            onClick={() => setActiveTab('offerings')}
                        >
                            Nossos Serviços
                        </button>
                        <button 
                            className={activeTab === 'contact' ? 'active' : ''}
                            onClick={() => setActiveTab('contact')}
                        >
                            Solicitar Orçamento
                        </button>
                    </nav>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-content">
                                <div className="overview-grid">
                                    <div className="overview-card">
                                        <h3>Por que escolher?</h3>
                                        <p>{currentService.description}</p>
                                    </div>
                                    <div className="overview-card">
                                        <h3>Recursos Principais</h3>
                                        <ul>
                                            {currentService.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'offerings' && (
                            <div className="offerings-content">
                                <div className="offerings-grid">
                                    {currentService.offerings.map((offering, index) => (
                                        <div key={index} className="offering-card">
                                            <h4>{offering.title}</h4>
                                            <p>{offering.description}</p>
                                            {offering.duration && (
                                                <div className="offering-duration">
                                                    <strong>Duração:</strong> {offering.duration}
                                                </div>
                                            )}
                                            {offering.responseTime && (
                                                <div className="offering-response">
                                                    <strong>Tempo de resposta:</strong> {offering.responseTime}
                                                </div>
                                            )}
                                            {offering.coverage && (
                                                <div className="offering-coverage">
                                                    <strong>Cobertura:</strong> {offering.coverage}
                                                </div>
                                            )}
                                            {offering.deliverables && (
                                                <div className="offering-deliverables">
                                                    <strong>Entregáveis:</strong>
                                                    <ul>
                                                        {offering.deliverables.map((deliverable, idx) => (
                                                            <li key={idx}>{deliverable}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="contact-content">
                                <div className="contact-info">
                                    <h3>Entre em contato</h3>
                                    <p>Preencha o formulário abaixo e nossa equipe entrará em contato para discutir suas necessidades.</p>
                                    
                                    <div className="contact-methods">
                                        <div className="contact-method">
                                            <FaPhone />
                                            <div>
                                                <h4>Telefone</h4>
                                                <p>0800 891 8287</p>
                                            </div>
                                        </div>
                                        <div className="contact-method">
                                            <FaEnvelope />
                                            <div>
                                                <h4>Email</h4>
                                                <p>servicos@lenovo.com.br</p>
                                            </div>
                                        </div>
                                        <div className="contact-method">
                                            <FaComments />
                                            <div>
                                                <h4>Chat Online</h4>
                                                <p>Disponível 24/7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form className="contact-form" onSubmit={handleContactSubmit}>
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
                                            <label htmlFor="company">Empresa</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={contactForm.company}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Telefone</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={contactForm.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="service">Serviço de Interesse</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={contactForm.service}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecione um serviço</option>
                                            <option value="consultoria">Consultoria</option>
                                            <option value="implantacao">Implantação</option>
                                            <option value="gerenciados">Serviços Gerenciados</option>
                                            <option value="seguranca">Segurança</option>
                                            <option value="suporte">Suporte</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Mensagem</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={contactForm.message}
                                            onChange={handleInputChange}
                                            placeholder="Descreva suas necessidades..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        Enviar Solicitação
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="services-container">
            <div className="services-hero">
                <h1>Serviços Lenovo</h1>
                <p>Soluções completas para todas as suas necessidades tecnológicas</p>
            </div>

            <div className="services-grid">
                {allServices.map(([key, service]) => (
                    <div key={key} className="service-card">
                        <div className="service-card-icon">
                            <service.icon />
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="service-card-features">
                            {service.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="feature-tag">{feature}</span>
                            ))}
                        </div>
                        <a href={`/servicos/${key}`} className="service-card-link">
                            Saiba mais →
                        </a>
                    </div>
                ))}
            </div>

            <div className="services-cta">
                <h2>Precisa de um serviço personalizado?</h2>
                <p>Nossa equipe pode desenvolver soluções sob medida para suas necessidades específicas.</p>
                <button className="cta-button">Falar com Especialista</button>
            </div>
        </div>
    );
};

export default Services; 