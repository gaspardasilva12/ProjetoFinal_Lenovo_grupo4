import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    const footerLinks = [
        {
            title: 'Comprar',
            links: [
                { text: 'Notebooks', url: '/produtos/notebooks' },
                { text: 'Desktops', url: '/produtos/desktops' },
                { text: 'Workstations', url: '/produtos/workstations' },
                { text: 'Tablets', url: '/produtos/tablets' },
                { text: 'Gaming', url: '/produtos/gaming' },
                { text: 'Acessórios', url: '/produtos/acessorios' }
            ]
        },
        {
            title: 'Serviços',
            links: [
                { text: 'Lenovo Services', url: '/servicos' },
                { text: 'Suporte Técnico', url: '/suporte' },
                { text: 'Garantia Estendida', url: '/garantia' },
                { text: 'Reciclagem', url: '/reciclagem' },
                { text: 'Treinamentos', url: '/treinamentos' }
            ]
        },
        {
            title: 'Sobre a Lenovo',
            links: [
                { text: 'Nossa Empresa', url: '/sobre' },
                { text: 'Sustentabilidade', url: '/sustentabilidade' },
                { text: 'Diversidade e Inclusão', url: '/diversidade' },
                { text: 'Trabalhe Conosco', url: '/carreiras' },
                { text: 'Imprensa', url: '/imprensa' }
            ]
        },
        {
            title: 'Ajuda',
            links: [
                { text: 'Central de Ajuda', url: '/ajuda' },
                { text: 'Status do Pedido', url: '/pedidos' },
                { text: 'Frete e Entrega', url: '/frete' },
                { text: 'Devoluções', url: '/devolucoes' },
                { text: 'FAQ', url: '/faq' }
            ]
        }
    ];

    const socialLinks = [
        { icon: FaFacebook, url: 'https://facebook.com/lenovo', label: 'Facebook' },
        { icon: FaTwitter, url: 'https://twitter.com/lenovo', label: 'Twitter' },
        { icon: FaInstagram, url: 'https://instagram.com/lenovo', label: 'Instagram' },
        { icon: FaLinkedin, url: 'https://linkedin.com/company/lenovo', label: 'LinkedIn' },
        { icon: FaYoutube, url: 'https://youtube.com/lenovo', label: 'YouTube' }
    ];

    return (
        <footer className="lenovo-footer">
            <div className="footer-content">
                {footerLinks.map((section, index) => (
                    <div key={index} className="footer-section">
                        <h3>{section.title}</h3>
                        <ul>
                            {section.links.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                
                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Receba as últimas novidades e ofertas exclusivas da Lenovo.</p>
                    <div className="footer-newsletter">
                        <div className="newsletter-form">
                            <input type="email" placeholder="Seu e-mail" />
                            <button>Inscrever</button>
                        </div>
                    </div>
                    
                    <div className="footer-social">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.url} aria-label={social.label}>
                                <social.icon />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Contato</h3>
                    <div className="footer-contact">
                        <p>
                            <FaPhone />
                            <strong>0800 777 0191</strong>
                        </p>
                        <p>
                            <FaEnvelope />
                            <strong>contato@lenovo.com.br</strong>
                        </p>
                        <p>
                            <FaMapMarkerAlt />
                            <strong>São Paulo, SP - Brasil</strong>
                        </p>
                    </div>
                    <p>Atendimento de segunda a sexta, das 8h às 18h</p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Lenovo. Todos os direitos reservados.</p>
                    <div className="footer-links">
                        <a href="/termos">Termos de Uso</a>
                        <a href="/privacidade">Política de Privacidade</a>
                        <a href="/cookies">Cookies</a>
                        <a href="/mapa-site">Mapa do Site</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;