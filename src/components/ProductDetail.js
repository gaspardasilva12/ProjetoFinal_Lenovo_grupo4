import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { produtosAPI, categoriasAPI } from '../services/api';
import { FaStar, FaHeart, FaShare, FaTruck, FaShieldAlt, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Obter o produto por ID
                const productData = await produtosAPI.getById(id);
                
                if (productData) {
                    // Mapear os dados da API para o formato esperado
                    const mappedProduct = {
                        id: productData.id,
                        name: productData.nome,
                        description: productData.nome, // A API não tem descrição separada
                        price: productData.preco,
                        image: productData.imagens && productData.imagens.length > 0 ? productData.imagens[0].url : '/images/placeholder.jpg',
                        additionalImages: productData.imagens ? productData.imagens.slice(1).map(img => img.url) : [],
                        categoriaId: productData.categoriaId,
                        // Valores padrão para campos que não estão na API
                        rating: 4.5,
                        reviews: 127,
                        inStock: true,
                        features: [
                            'Produto de alta qualidade',
                            'Garantia do fabricante',
                            'Envio rápido e seguro'
                        ],
                        specs: {
                            'Preço': `R$ ${productData.preco.toFixed(2)}`,
                            'Categoria': 'Carregando...'
                        }
                    };
                    
                    setProduct(mappedProduct);
                    
                    // Obter informações da categoria
                    if (productData.categoriaId) {
                        try {
                            const categoryData = await categoriasAPI.getById(productData.categoriaId);
                            setCategory(categoryData);
                            
                            // Atualizar as especificações com a categoria
                            setProduct(prev => ({
                                ...prev,
                                category: categoryData.nome,
                                specs: {
                                    ...prev.specs,
                                    'Categoria': categoryData.nome
                                }
                            }));
                        } catch (categoryError) {
                            console.error('Erro ao carregar categoria:', categoryError);
                        }
                    }
                } else {
                    setError('Produto não encontrado');
                }
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                setError('Erro ao carregar o produto. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
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
            <div className="product-detail-loading" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                <div className="loading-spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #e60012',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '20px'
                }}></div>
                <p>Carregando produto...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                fontSize: '1.2rem',
                color: '#e60012',
                textAlign: 'center',
                padding: '20px'
            }}>
                <h2>Produto não encontrado</h2>
                <p>{error || 'O produto que você procura não existe.'}</p>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        backgroundColor: '#e60012',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    <FaArrowLeft style={{ marginRight: '8px' }} />
                    Voltar
                </button>
            </div>
        );
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
                        <span className="current-price" style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#e60012'
                        }}>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(product.price)}
                        </span>
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

                        <div className="action-buttons" style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '20px'
                        }}>
                            <button 
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                style={{
                                    flex: 1,
                                    padding: '16px 24px',
                                    backgroundColor: product.inStock ? '#e60012' : '#ccc',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
                            </button>
                            <button 
                                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={toggleWishlist}
                                style={{
                                    padding: '16px',
                                    backgroundColor: isWishlisted ? '#e60012' : '#f8f9fa',
                                    color: isWishlisted ? '#fff' : '#666',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaHeart />
                            </button>
                            <button 
                                className="share-btn"
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#f8f9fa',
                                    color: '#666',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.2s'
                                }}
                            >
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