import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaHeart, FaLock, FaTruck, FaShieldAlt, FaCreditCard, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/Cart.css';

const Cart = () => {
    const { 
        items, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal, 
        clearCart, 
        loading, 
        error, 
        clearError 
    } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
    const [isUpdating, setIsUpdating] = useState({});
    const [isMovingToWishlist, setIsMovingToWishlist] = useState({});
    const [localError, setLocalError] = useState(null);

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 29.99;
    const total = subtotal + shipping;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handleQuantityUpdate = async (productId, newQuantity) => {
        setIsUpdating(prev => ({ ...prev, [productId]: true }));
        setLocalError(null);
        
        try {
            if (newQuantity <= 0) {
                await removeFromCart(productId);
            } else {
                await updateQuantity(productId, newQuantity);
            }
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            setLocalError(`Erro ao atualizar quantidade: ${error.message}`);
        } finally {
            setIsUpdating(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleMoveToWishlist = async (item) => {
        setIsMovingToWishlist(prev => ({ ...prev, [item.id]: true }));
        setLocalError(null);
        
        try {
            await removeFromCart(item.id);
            if (!isInWishlist(item.id)) {
                await addToWishlist(item);
            }
        } catch (error) {
            console.error('Erro ao mover para wishlist:', error);
            setLocalError(`Erro ao mover para lista de desejos: ${error.message}`);
        } finally {
            setIsMovingToWishlist(prev => ({ ...prev, [item.id]: false }));
        }
    };

    const handleClearCart = async () => {
        setLocalError(null);
        try {
            await clearCart();
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            setLocalError(`Erro ao limpar carrinho: ${error.message}`);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        setLocalError(null);
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            setLocalError(`Erro ao remover item: ${error.message}`);
        }
    };

    // Mostrar loading se estiver carregando
    if (loading && items.length === 0) {
        return (
            <div className="cart-loading">
                <div className="loading-spinner">
                    <FaSpinner className="spinner" />
                    <p>Carregando carrinho...</p>
                </div>
            </div>
        );
    }

    // Mostrar erro se houver
    if (error) {
        return (
            <div className="cart-error">
                <div className="error-content">
                    <FaExclamationTriangle className="error-icon" />
                    <h2>Erro ao carregar carrinho</h2>
                    <p>{error}</p>
                    <button onClick={clearError} className="btn-primary">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <div className="empty-cart-icon">
                        <FaHeart />
                    </div>
                    <h2>Seu carrinho está vazio</h2>
                    <p>Adicione produtos para começar suas compras</p>
                    <div className="empty-cart-actions">
                        <Link to="/" className="btn-primary">
                            <FaArrowLeft /> Continuar Comprando
                        </Link>
                        <Link to="/conta?tab=wishlist" className="btn-secondary">
                            <FaHeart /> Ver Lista de Desejos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Carrinho de Compras</h1>
                <div className="cart-header-actions">
                    <button 
                        onClick={handleClearCart} 
                        className="btn-clear-cart"
                        disabled={loading}
                    >
                        {loading ? <FaSpinner className="spinner" /> : 'Limpar Carrinho'}
                    </button>
                </div>
            </div>

            {localError && (
                <div className="cart-local-error">
                    <FaExclamationTriangle className="error-icon" />
                    <span>{localError}</span>
                    <button onClick={() => setLocalError(null)} className="btn-dismiss">
                        ×
                    </button>
                </div>
            )}

            <div className="cart-content">
                <div className="cart-main">
                    <div className="cart-items">
                        <div className="cart-items-header">
                            <span>Produto</span>
                            <span>Preço</span>
                            <span>Quantidade</span>
                            <span>Total</span>
                            <span>Ações</span>
                        </div>
                        
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img 
                                        src={item.imagem || item.image || '/images/placeholder.jpg'} 
                                        alt={item.nome || item.name}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3>{item.nome || item.name}</h3>
                                    <div className="cart-item-specs">
                                        {item.categoria && (
                                            <span className="item-category">{item.categoria}</span>
                                        )}
                                        {item.specs && (
                                            <span className="item-specs">{item.specs}</span>
                                        )}
                                    </div>
                                    <div className="cart-item-price">
                                        <span className="current-price">
                                            {formatPrice(item.preco || item.price)}
                                        </span>
                                        {item.precoOriginal && (
                                            <span className="original-price">
                                                {formatPrice(item.precoOriginal)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="cart-item-quantity">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleQuantityUpdate(item.id, (item.quantidade || item.quantity) - 1)}
                                            disabled={isUpdating[item.id]}
                                            className="quantity-btn"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="quantity-display">
                                            {item.quantidade || item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityUpdate(item.id, (item.quantidade || item.quantity) + 1)}
                                            disabled={isUpdating[item.id]}
                                            className="quantity-btn"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    {isUpdating[item.id] && <FaSpinner className="spinner small" />}
                                </div>
                                
                                <div className="cart-item-total">
                                    {formatPrice((item.preco || item.price) * (item.quantidade || item.quantity))}
                                </div>
                                
                                <div className="cart-item-actions">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        disabled={loading}
                                        className="btn-remove"
                                        title="Remover do carrinho"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handleMoveToWishlist(item)}
                                        disabled={isMovingToWishlist[item.id]}
                                        className="btn-move-wishlist"
                                        title="Mover para lista de desejos"
                                    >
                                        {isMovingToWishlist[item.id] ? (
                                            <FaSpinner className="spinner small" />
                                        ) : (
                                            <FaHeart />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-sidebar">
                    <div className="cart-summary">
                        <h3>Resumo do Pedido</h3>
                        
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>Frete:</span>
                            <span>
                                {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                            </span>
                        </div>
                        
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        
                        <div className="cart-benefits">
                            <div className="benefit-item">
                                <FaTruck />
                                <div>
                                    <h4>Frete Grátis</h4>
                                    <p>Para compras acima de R$ 500</p>
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
                                    <h4>Pagamento Seguro</h4>
                                    <p>Múltiplas formas de pagamento</p>
                                </div>
                            </div>
                        </div>
                        
                        <Link to="/checkout" className="btn-checkout">
                            <FaLock /> Finalizar Compra
                        </Link>
                        
                        <Link to="/" className="btn-continue-shopping">
                            <FaArrowLeft /> Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;