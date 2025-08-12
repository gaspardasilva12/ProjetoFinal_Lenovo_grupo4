import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRocket, FaCloud, FaShieldAlt, FaIndustry, FaLightbulb, FaUsers, FaChartLine, FaGlobe } from 'react-icons/fa';
import '../styles/Solutions.css';

const Solutions = () => {
    const { solution } = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const solutionsData = {
        ai: {
            title: "Inteligência Artificial",
            subtitle: "Transforme seu negócio com IA",
            description: "Soluções de IA que impulsionam a inovação e eficiência em todos os setores.",
            icon: FaLightbulb,
            features: [
                "Machine Learning avançado",
                "Processamento de linguagem natural",
                "Visão computacional",
                "Automação inteligente",
                "Análise preditiva"
            ],
            useCases: [
                {
                    title: "Automação de Processos",
                    description: "Automatize tarefas repetitivas com IA para aumentar a produtividade."
                },
                {
                    title: "Análise de Dados",
                    description: "Extraia insights valiosos de grandes volumes de dados."
                },
                {
                    title: "Atendimento ao Cliente",
                    description: "Chatbots inteligentes para melhorar a experiência do cliente."
                }
            ]
        },
        "digital-workplace": {
            title: "Digital Workplace",
            subtitle: "Trabalhe de qualquer lugar",
            description: "Soluções para criar um ambiente de trabalho digital moderno e produtivo.",
            icon: FaUsers,
            features: [
                "Colaboração em tempo real",
                "Gerenciamento de dispositivos",
                "Segurança avançada",
                "Integração de aplicações",
                "Mobilidade empresarial"
            ],
            useCases: [
                {
                    title: "Trabalho Remoto",
                    description: "Suporte completo para equipes distribuídas globalmente."
                },
                {
                    title: "Colaboração",
                    description: "Ferramentas para trabalho em equipe eficiente."
                },
                {
                    title: "Produtividade",
                    description: "Aumente a eficiência com soluções digitais integradas."
                }
            ]
        },
        "nuvem-hibrida": {
            title: "Nuvem Híbrida",
            subtitle: "Flexibilidade e escalabilidade",
            description: "Infraestrutura de nuvem híbrida para otimizar recursos e custos.",
            icon: FaCloud,
            features: [
                "Integração on-premises e cloud",
                "Gerenciamento unificado",
                "Escalabilidade automática",
                "Backup e recuperação",
                "Monitoramento em tempo real"
            ],
            useCases: [
                {
                    title: "Migração Gradual",
                    description: "Transição suave para a nuvem mantendo sistemas existentes."
                },
                {
                    title: "Disaster Recovery",
                    description: "Recuperação rápida de desastres com redundância."
                },
                {
                    title: "Otimização de Custos",
                    description: "Reduza custos de infraestrutura com recursos sob demanda."
                }
            ]
        },
        edge: {
            title: "Edge Computing",
            subtitle: "Processamento na borda",
            description: "Soluções de edge computing para aplicações que exigem baixa latência.",
            icon: FaRocket,
            features: [
                "Processamento local",
                "Baixa latência",
                "Conectividade 5G",
                "IoT integrado",
                "Segurança robusta"
            ],
            useCases: [
                {
                    title: "IoT Industrial",
                    description: "Monitoramento e controle de dispositivos IoT em tempo real."
                },
                {
                    title: "Realidade Aumentada",
                    description: "Experiências AR/VR com resposta instantânea."
                },
                {
                    title: "Automação",
                    description: "Sistemas autônomos com tomada de decisão local."
                }
            ]
        },
        sustentabilidade: {
            title: "Sustentabilidade",
            subtitle: "Tecnologia para o futuro",
            description: "Soluções sustentáveis que reduzem o impacto ambiental e promovem ESG.",
            icon: FaGlobe,
            features: [
                "Energia renovável",
                "Eficiência energética",
                "Redução de carbono",
                "Economia circular",
                "Relatórios ESG"
            ],
            useCases: [
                {
                    title: "Eficiência Energética",
                    description: "Reduza o consumo de energia com tecnologias inteligentes."
                },
                {
                    title: "Monitoramento Ambiental",
                    description: "Acompanhe métricas de sustentabilidade em tempo real."
                },
                {
                    title: "Compliance ESG",
                    description: "Atenda aos requisitos regulatórios de sustentabilidade."
                }
            ]
        },
        truscale: {
            title: "TruScale",
            subtitle: "Tecnologia como serviço",
            description: "Modelo de consumo flexível que transforma CAPEX em OPEX.",
            icon: FaChartLine,
            features: [
                "Pagamento por uso",
                "Escalabilidade automática",
                "Gerenciamento simplificado",
                "Atualizações automáticas",
                "Suporte 24/7"
            ],
            useCases: [
                {
                    title: "Flexibilidade Orçamentária",
                    description: "Transforme investimentos em custos operacionais previsíveis."
                },
                {
                    title: "Escalabilidade",
                    description: "Ajuste recursos conforme a demanda do negócio."
                },
                {
                    title: "Inovação Contínua",
                    description: "Acesse sempre as tecnologias mais recentes."
                }
            ]
        }
    };

    const currentSolution = solution ? solutionsData[solution] : null;
    const allSolutions = Object.entries(solutionsData);

    if (currentSolution) {
        return (
            <div className="solutions-detail-container">
                <div className="solution-hero">
                    <div className="solution-hero-content">
                        <div className="solution-icon">
                            <currentSolution.icon />
                        </div>
                        <h1>{currentSolution.title}</h1>
                        <h2>{currentSolution.subtitle}</h2>
                        <p>{currentSolution.description}</p>
                    </div>
                </div>

                <div className="solution-content">
                    <nav className="solution-tabs">
                        <button 
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Visão Geral
                        </button>
                        <button 
                            className={activeTab === 'features' ? 'active' : ''}
                            onClick={() => setActiveTab('features')}
                        >
                            Recursos
                        </button>
                        <button 
                            className={activeTab === 'use-cases' ? 'active' : ''}
                            onClick={() => setActiveTab('use-cases')}
                        >
                            Casos de Uso
                        </button>
                        <button 
                            className={activeTab === 'contact' ? 'active' : ''}
                            onClick={() => setActiveTab('contact')}
                        >
                            Contato
                        </button>
                    </nav>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-content">
                                <div className="overview-grid">
                                    <div className="overview-card">
                                        <h3>Por que escolher?</h3>
                                        <p>{currentSolution.description}</p>
                                    </div>
                                    <div className="overview-card">
                                        <h3>Benefícios</h3>
                                        <ul>
                                            <li>Redução de custos</li>
                                            <li>Aumento da eficiência</li>
                                            <li>Escalabilidade</li>
                                            <li>Segurança avançada</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <div className="features-content">
                                <div className="features-grid">
                                    {currentSolution.features.map((feature, index) => (
                                        <div key={index} className="feature-card">
                                            <div className="feature-icon">✓</div>
                                            <h4>{feature}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'use-cases' && (
                            <div className="use-cases-content">
                                <div className="use-cases-grid">
                                    {currentSolution.useCases.map((useCase, index) => (
                                        <div key={index} className="use-case-card">
                                            <h4>{useCase.title}</h4>
                                            <p>{useCase.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="contact-content">
                                <div className="contact-info">
                                    <h3>Entre em contato</h3>
                                    <p>Nossa equipe de especialistas está pronta para ajudar você a implementar esta solução.</p>
                                    <div className="contact-methods">
                                        <div className="contact-method">
                                            <h4>Telefone</h4>
                                            <p>0800 891 8287</p>
                                        </div>
                                        <div className="contact-method">
                                            <h4>Email</h4>
                                            <p>solucoes@lenovo.com.br</p>
                                        </div>
                                        <div className="contact-method">
                                            <h4>Chat Online</h4>
                                            <p>Disponível 24/7</p>
                                        </div>
                                    </div>
                                    <button className="contact-btn">Solicitar Proposta</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="solutions-container">
            <div className="solutions-hero">
                <h1>Soluções Lenovo</h1>
                <p>Transforme seu negócio com tecnologia inteligente e inovadora</p>
            </div>

            <div className="solutions-grid">
                {allSolutions.map(([key, solution]) => (
                    <Link key={key} to={`/solucoes/${key}`} className="solution-card">
                        <div className="solution-card-icon">
                            <solution.icon />
                        </div>
                        <h3>{solution.title}</h3>
                        <p>{solution.description}</p>
                        <div className="solution-card-arrow">→</div>
                    </Link>
                ))}
            </div>

            <div className="solutions-cta">
                <h2>Precisa de ajuda para escolher?</h2>
                <p>Nossa equipe de especialistas pode ajudar você a encontrar a solução ideal para seu negócio.</p>
                <button className="cta-button">Falar com Especialista</button>
            </div>
        </div>
    );
};

export default Solutions; 