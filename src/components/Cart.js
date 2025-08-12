import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 29.99;
    const total = subtotal + shipping;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <div className="cart-empty-content">
                    <h2>Seu carrinho está vazio</h2>
                    <p>Adicione produtos para começar suas compras</p>
                    <Link to="/" className="btn-primary">
                        <FaArrowLeft /> Continuar Comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Carrinho de Compras</h1>
                <button onClick={clearCart} className="btn-clear-cart">
                    Limpar Carrinho
                </button>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <div className="cart-item-price">
                                    <span className="current-price">{item.price}</span>
                                    {item.originalPrice && (
                                        <span className="original-price">{item.originalPrice}</span>
                                    )}
                                </div>
                            </div>

                            <div className="cart-item-quantity">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="quantity-btn"
                                >
                                    <FaMinus />
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="quantity-btn"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            <div className="cart-item-total">
                                <span>
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>

                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="btn-remove-item"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Resumo do Pedido</h3>
                    
                    <div className="summary-item">
                        <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="summary-item">
                        <span>Frete</span>
                        <span>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                    </div>
                    
                    {shipping > 0 && (
                        <div className="free-shipping-notice">
                            <p>Adicione mais {formatPrice(500 - subtotal)} para frete grátis!</p>
                        </div>
                    )}
                    
                    <div className="summary-total">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    <Link to="/checkout" className="btn-checkout">
                        Finalizar Compra
                    </Link>

                    <Link to="/" className="btn-continue-shopping">
                        <FaArrowLeft /> Continuar Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;