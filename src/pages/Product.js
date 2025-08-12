import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';

const Product = () => {
    const { id } = useParams();

    // Simulação de dados do produto - na prática, você buscaria de uma API
    const products = [
        {
            id: '1',
            name: 'Lenovo Yoga Slim 7i',
            description: 'Notebook ultrafino com Intel Core i7-1360P, 16GB RAM, SSD 512GB, tela 14" 2.8K OLED 90Hz, Windows 11 Home',
            price: 6999.99,
            imageUrl: 'https://p3-ofp.static.pub/ShareResource/na/subseries/hero/lenovo-laptop-yoga-slim-7-carbon-13-intel-subseries-hero.png',
            specs: [
                'Processador: Intel Core i7-1360P',
                'Memória: 16GB LPDDR5',
                'Armazenamento: SSD 512GB',
                'Tela: 14" 2.8K (2880 x 1800) OLED, 90Hz',
                'Sistema Operacional: Windows 11 Home',
                'Bateria: 65Wh, até 12 horas de duração',
                'Peso: 1.2kg'
            ],
            colors: ['Prata', 'Preto'],
            rating: 4.8
        },
        // Adicione mais produtos conforme necessário
    ];

    const product = products.find(p => p.id === id) || {
        id: id,
        name: 'Produto não encontrado',
        description: 'Desculpe, o produto solicitado não está disponível.',
        price: '--',
        imageUrl: 'https://via.placeholder.com/300x200?text=Produto+Não+Encontrado'
    };

    return (
        <div className="product-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
            <div style={{ display: 'flex', gap: '48px' }}>
                <div style={{ flex: 1 }}>
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ color: '#e60012', fontWeight: 'bold', fontSize: '1.5rem' }}>
                            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        {product.rating && (
                            <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ color: i < Math.floor(product.rating) ? '#ffc107' : '#ddd' }}>
                                        ★
                                    </span>
                                ))}
                                <span style={{ marginLeft: '8px', fontSize: '0.9rem' }}>({product.rating})</span>
                            </div>
                        )}
                    </div>
                    <p style={{ marginBottom: '24px' }}>{product.description}</p>
                    
                    {product.colors && (
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '8px' }}>Cores disponíveis:</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {product.colors.map(color => (
                                    <button 
                                        key={color}
                                        style={{ 
                                            padding: '8px 16px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px',
                                            backgroundColor: color === 'Prata' ? '#e0e0e0' : color === 'Preto' ? '#333' : '#fff'
                                        }}
                                    >
                                        {color}
                                        
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <button 
                        style={{ 
                            background: '#e60012', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '12px 24px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            fontSize: '1rem',
                            marginRight: '16px'
                        }}
                    >
                        Comprar agora
                    </button>
                    <button 
                        style={{ 
                            background: '#fff', 
                            color: '#e60012', 
                            border: '1px solid #e60012', 
                            padding: '12px 24px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
            
            {product.specs && (
                <div style={{ marginTop: '48px' }}>
                    <h2 style={{ marginBottom: '16px' }}>Especificações técnicas</h2>
                    <ul style={{ columns: 2, gap: '32px' }}>
                        {product.specs.map((spec, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>{spec}</li>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );
};

export default Product;