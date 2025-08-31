import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { produtosAPI, categoriasAPI } from '../services/api';
import { 
    FaStar, FaHeart, FaShare, FaTruck, 
    FaShieldAlt, FaCreditCard, FaArrowLeft 
} from 'react-icons/fa';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getCartCount } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const productData = await produtosAPI.getById(id);
                
                if (productData) {
                    // Criar descrição fallback
                    const descricaoGerada = productData.descricao 
                        || `O ${productData.nome} é um excelente produto que combina qualidade, desempenho e ótimo custo-benefício.`;

                    const mappedProduct = {
                        id: productData.id,
                        name: productData.nome,
                        description: descricaoGerada,
                        price: productData.preco,
                        image: productData.imagens?.length > 0 
                            ? productData.imagens[0].url 
                            : '/images/placeholder.jpg',
                        additionalImages: productData.imagens 
                            ? productData.imagens.slice(1).map(img => img.url) 
                            : [],
                        categoriaId: productData.categoriaId,
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
                    
                    // Buscar categoria
                    if (productData.categoriaId) {
                        try {
                            const categoryData = await categoriasAPI.getById(productData.categoriaId);
                            setCategory(categoryData);
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
                quantidade: quantity
            });
        }
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const toggleWishlist = async () => {
        if (product) {
            if (isInWishlist(product.id)) {
                await removeFromWishlist(product.id);
            } else {
                await addToWishlist(product);
            }
        }
    };

    const isWishlisted = product ? isInWishlist(product.id) : false;
    const cartCount = getCartCount();

    // ---- Renderização ----
    if (loading) {
        return <div className="product-loading">Carregando produto...</div>;
    }

    if (error) {
        return (
            <div className="product-error">
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="btn-primary">
                    <FaArrowLeft /> Voltar
                </button>
            </div>
        );
    }

    if (!product) {
        return <div className="product-not-found">Produto não encontrado</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-images">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="main-image"
                    onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                />
                <div className="thumbnail-list">
                    {[product.image, ...product.additionalImages].map((img, index) => (
                        <img 
                            key={index}
                            src={img}
                            alt={`Imagem ${index + 1}`}
                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                            onClick={() => setSelectedImage(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-description">{product.description}</p>

                <div className="product-price">
                    <span>R$ {product.price.toFixed(2)}</span>
                </div>

                <div className="product-rating">
                    <FaStar className="star" /> {product.rating} ({product.reviews} avaliações)
                </div>

                <div className="product-actions">
                    <div className="quantity-control">
                        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
                    </div>

                    <button className="btn-primary" onClick={handleAddToCart}>
                        Adicionar ao Carrinho
                    </button>

                    <button 
                        className={`btn-wishlist ${isWishlisted ? 'active' : ''}`} 
                        onClick={toggleWishlist}
                    >
                        <FaHeart /> {isWishlisted ? 'Remover da Lista' : 'Adicionar à Lista'}
                    </button>
                </div>

                <div className="product-features">
                    <h3>Benefícios</h3>
                    <ul>
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="product-specs">
                    <h3>Especificações</h3>
                    <ul>
                        {Object.entries(product.specs).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>

                <Link to="/" className="btn-secondary">
                    <FaArrowLeft /> Voltar às compras
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;
