import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { produtosAPI } from '../services/api';
import '../styles/ProductDetail.css';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productData = await produtosAPI.getById(id);
                setProduct(productData);
            } catch (err) {
                setError('Erro ao carregar o produto');
                console.error('Erro ao buscar produto:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                nome: product.nome,
                preco: product.preco,
                imagem: product.imagens[0],
                quantidade: quantity
            });
        }
    };

    const handleWishlistToggle = () => {
        if (product) {
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist({
                    id: product.id,
                    nome: product.nome,
                    preco: product.preco,
                    imagem: product.imagens[0]
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="product-loading">
                <div className="loading-spinner"></div>
                <p>Carregando produto...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-error">
                <h2>Produto não encontrado</h2>
                <p>{error || 'O produto solicitado não foi encontrado.'}</p>
                <button onClick={() => navigate('/produtos')} className="btn-back">
                    <FaArrowLeft /> Voltar aos Produtos
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <div className="product-navigation">
                <button onClick={() => navigate(-1)} className="btn-back">
                    <FaArrowLeft /> Voltar
                </button>
            </div>

            <div className="product-content">
                <div className="product-images">
                    <div className="main-image">
                        <img 
                            src={product.imagens[selectedImage]} 
                            alt={product.nome}
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                            }}
                        />
                    </div>
                    <div className="image-thumbnails">
                        {product.imagens.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.nome} - Imagem ${index + 1}`}
                                className={selectedImage === index ? 'active' : ''}
                                onClick={() => setSelectedImage(index)}
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <div className="product-header">
                        <h1 className="product-title">{product.nome}</h1>
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar 
                                        key={index} 
                                        className={index < Math.floor(product.avaliacao || 0) ? 'star filled' : 'star'}
                                    />
                                ))}
                            </div>
                            <span className="rating-text">
                                {product.avaliacao || 0} ({product.numAvaliacoes || 0} avaliações)
                            </span>
                        </div>
                    </div>

                    <div className="product-price">
                        <span className="current-price">
                            R$ {product.preco.toFixed(2).replace('.', ',')}
                        </span>
                        {product.precoOriginal && product.precoOriginal > product.preco && (
                            <span className="original-price">
                                R$ {product.precoOriginal.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                    </div>

                    <div className="product-description">
                        <p>{product.descricao}</p>
                    </div>

                    <div className="product-features">
                        {product.caracteristicas && product.caracteristicas.length > 0 && (
                            <div className="features-list">
                                <h3>Características Principais</h3>
                                <ul>
                                    {product.caracteristicas.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Quantidade:</label>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                                <button onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button 
                                className="btn-add-to-cart"
                                onClick={handleAddToCart}
                            >
                                <FaShoppingCart />
                                Adicionar ao Carrinho
                            </button>
                            
                            <button 
                                className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={handleWishlistToggle}
                            >
                                <FaHeart />
                                {isInWishlist(product.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                            </button>
                        </div>
                    </div>

                    <div className="product-benefits">
                        <div className="benefit-item">
                            <FaTruck />
                            <div>
                                <h4>Frete Grátis</h4>
                                <p>Para compras acima de R$ 99</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <FaShieldAlt />
                            <div>
                                <h4>Garantia Estendida</h4>
                                <p>Até 3 anos de garantia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {product.especificacoes && (
                <div className="product-specifications">
                    <h2>Especificações Técnicas</h2>
                    <div className="specs-grid">
                        {Object.entries(product.especificacoes).map(([key, value]) => (
                            <div key={key} className="spec-item">
                                <span className="spec-label">{key}</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;