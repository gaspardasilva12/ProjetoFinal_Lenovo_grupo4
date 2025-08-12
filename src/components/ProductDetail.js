import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/lenovoData';
import { FaStar, FaHeart, FaShare, FaTruck, FaShieldAlt, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = getProductById(id);
                if (productData) {
                    setProduct(productData);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                ...product,
                quantity: quantity
            });
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="loading-spinner"></div>
                <p>Carregando produto...</p>
            </div>
        );
    }

    if (!product) {
        return <NotFound />;
    }

    const images = [product.image, ...(product.additionalImages || [])];

    return (
        <div className="product-detail-container">
            <div className="breadcrumb">
                <button onClick={() => navigate(-1)} className="back-button">
                    <FaArrowLeft /> Voltar
                </button>
                <span>Produtos</span>
                <span>{product.category}</span>
                <span>{product.name}</span>
            </div>

            <div className="product-detail-content">
                <div className="product-images">
                    <div className="main-image">
                        <img 
                            src={images[selectedImage]} 
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                            }}
                        />
                        {product.badge && (
                            <div className="product-badge">{product.badge}</div>
                        )}
                    </div>
                    <div className="image-thumbnails">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} - Imagem ${index + 1}`}
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
                        <h1 className="product-title">{product.name}</h1>
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar 
                                        key={index} 
                                        className={index < Math.floor(product.rating) ? 'filled' : 'empty'} 
                                    />
                                ))}
                            </div>
                            <span className="rating-text">
                                {product.rating} ({product.reviews} avaliações)
                            </span>
                        </div>
                    </div>

                    <div className="product-price">
                        {product.originalPrice > product.price && (
                            <span className="original-price">
                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                        <span className="current-price">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="discount-badge">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <label>Quantidade:</label>
                            <div className="quantity-controls">
                                <button 
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button 
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
                            </button>
                            <button 
                                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={toggleWishlist}
                            >
                                <FaHeart />
                            </button>
                            <button className="share-btn">
                                <FaShare />
                            </button>
                        </div>
                    </div>

                    <div className="product-features">
                        <h3>Características principais</h3>
                        <ul>
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-benefits">
                        <div className="benefit-item">
                            <FaTruck />
                            <div>
                                <h4>Entrega Grátis</h4>
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
                        <div className="benefit-item">
                            <FaCreditCard />
                            <div>
                                <h4>Parcelamento</h4>
                                <p>Em até 12x sem juros</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-specifications">
                <h2>Especificações Técnicas</h2>
                <div className="specs-grid">
                    {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="spec-item">
                            <span className="spec-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                            <span className="spec-value">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="product-reviews">
                <h2>Avaliações dos Clientes</h2>
                <div className="reviews-summary">
                    <div className="overall-rating">
                        <span className="rating-number">{product.rating}</span>
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <FaStar 
                                    key={index} 
                                    className={index < Math.floor(product.rating) ? 'filled' : 'empty'} 
                                />
                            ))}
                        </div>
                        <span className="total-reviews">{product.reviews} avaliações</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 