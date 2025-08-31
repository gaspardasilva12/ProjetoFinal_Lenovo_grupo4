import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { produtosAPI } from '../services/api';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import '../styles/ProductList.css';

const ProductList = ({ products: externalProducts }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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

    const handleAddToCart = (product) => {
        addToCart({
            ...product,
            quantity: 1
        });
    };

    const handleToggleWishlist = async (product) => {
        if (isInWishlist(product.id)) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    if (loading) {
        return (
            <div className="product-list-loading">
                <div className="loading-spinner"></div>
                <p>Carregando produtos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-error">
                <p>{error}</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="product-list-empty">
                <p>Nenhum produto encontrado.</p>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <div className="product-card-image">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                            }}
                        />
                        
                        {/* Botões de ação */}
                        <div className="product-card-actions">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleWishlist(product);
                                }}
                                className={`action-button wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                                title={isInWishlist(product.id) ? 'Remover da Lista de Desejos' : 'Adicionar à Lista de Desejos'}
                            >
                                <FaHeart />
                            </button>
                        </div>
                    </div>
                    
                    <div className="product-card-content">
                        <h3 className="product-card-title">
                            {product.name}
                        </h3>
                        
                        <p className="product-card-description">
                            {product.description}
                        </p>
                        
                        <div className="product-card-price">
                            R$ {product.price.toFixed(2)}
                        </div>
                        
                        <div className="product-card-buttons">
                            <Link 
                                to={`/produto/${product.id}`}
                                className="view-details-button"
                            >
                                <FaEye /> Ver Detalhes
                            </Link>
                            
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                                className="add-to-cart-button"
                            >
                                <FaShoppingCart /> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;