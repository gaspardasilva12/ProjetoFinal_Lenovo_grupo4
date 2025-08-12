import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    return (
        <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '32px',
            padding: '0 32px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {products.map(product => (
                <div key={product.id} style={{ 
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '16px',
                    transition: 'transform 0.2s',
                    ':hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                }}>
                    <Link to={`/produto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ 
                                width: '100%', 
                                height: '200px',
                                objectFit: 'contain',
                                marginBottom: '16px'
                            }} 
                        />
                        <h3 style={{ margin: '0 0 8px' }}>{product.name}</h3>
                        <p style={{ margin: '0 0 16px', color: '#666' }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#e60012', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            <button 
                                style={{ 
                                    background: '#e60012', 
                                    color: '#fff', 
                                    border: 'none', 
                                    padding: '8px 16px', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Adicionar ao carrinho
                                }}
                            >
                                Comprar
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;