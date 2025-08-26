import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { produtosAPI } from '../services/api';

const ProductList = ({ products: externalProducts }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Se produtos externos forem passados, usá-los; caso contrário, obter da API
                if (externalProducts && externalProducts.length > 0) {
                    setProducts(externalProducts);
                } else {
                    const data = await produtosAPI.getAll();
                    // Mapear os dados da API para o formato esperado pelo componente
                    const mappedProducts = data.map(product => ({
                        id: product.id,
                        name: product.nome,
                        description: product.nome, // A API não tem descrição separada
                        price: product.preco,
                        image: product.imagens && product.imagens.length > 0 ? product.imagens[0].url : '/images/placeholder.jpg',
                        categoriaId: product.categoriaId
                    }));
                    setProducts(mappedProducts);
                }
            } catch (err) {
                console.error('Erro ao carregar produtos:', err);
                setError('Erro ao carregar os produtos. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [externalProducts]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                fontSize: '1.2rem',
                color: '#666'
            }}>
Carregando produtos...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                fontSize: '1.2rem',
                color: '#e60012',
                textAlign: 'center',
                padding: '20px'
            }}>
                {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                fontSize: '1.2rem',
                color: '#666'
            }}>
Nenhum produto encontrado.
            </div>
        );
    }
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