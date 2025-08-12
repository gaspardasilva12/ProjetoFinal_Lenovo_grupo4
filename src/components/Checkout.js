import React, { useState } from 'react';

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cpf: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'credit'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{ 
            maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '32px 16px',
            display: 'flex',
            gap: '32px'
        }}>
            <div style={{ flex: 2 }}>
                <h1 style={{ marginBottom: '24px' }}>Finalizar Compra</h1>
                
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h2 style={{ margin: '16px 0 8px' }}>Informações Pessoais</h2>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '4px' }}>Nome</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '4px' }}>Sobrenome</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="phone" style={{ display: 'block', marginBottom: '4px' }}>Telefone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="cpf" style={{ display: 'block', marginBottom: '4px' }}>CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                            required
                        />
                    </div>
                    
                    <h2 style={{ margin: '24px 0 8px' }}>Endereço de Entrega</h2>
                    <div>
                        <label htmlFor="address" style={{ display: 'block', marginBottom: '4px' }}>Endereço</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                border: '1px solid #ddd', 
                                borderRadius: '4px' 
                            }}
                            required
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="city" style={{ display: 'block', marginBottom: '4px' }}>Cidade</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="state" style={{ display: 'block', marginBottom: '4px' }}>Estado</label>
                            <select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px',
                                    background: '#fff'
                                }}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="SP">São Paulo</option>
                                <option value="RJ">Rio de Janeiro</option>
                                {/* Adicione outros estados */}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="zipCode" style={{ display: 'block', marginBottom: '4px' }}>CEP</label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    border: '1px solid #ddd', 
                                    borderRadius: '4px' 
                                }}
                                required
                            />
                        </div>
                    </div>
                    
                    <h2 style={{ margin: '24px 0 8px' }}>Método de Pagamento</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit"
                                checked={formData.paymentMethod === 'credit'}
                                onChange={handleChange}
                            />
                            Cartão de Crédito
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="debit"
                                checked={formData.paymentMethod === 'debit'}
                                onChange={handleChange}
                            />
                            Cartão de Débito
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="pix"
                                checked={formData.paymentMethod === 'pix'}
                                onChange={handleChange}
                            />
                            PIX
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="boleto"
                                checked={formData.paymentMethod === 'boleto'}
                                onChange={handleChange}
                            />
                            Boleto Bancário
                        </label>
                    </div>
                    
                    {formData.paymentMethod === 'credit' && (
                        <div style={{ marginTop: '16px' }}>
                            <h3 style={{ margin: '16px 0 8px' }}>Dados do Cartão</h3>
                            <div>
                                <label htmlFor="cardNumber" style={{ display: 'block', marginBottom: '4px' }}>Número do Cartão</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px', 
                                        border: '1px solid #ddd', 
                                        borderRadius: '4px' 
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="cardName" style={{ display: 'block', marginBottom: '4px' }}>Nome no Cartão</label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        style={{ 
                                            width: '100%', 
                                            padding: '10px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="cardExpiry" style={{ display: 'block', marginBottom: '4px' }}>Validade</label>
                                    <input
                                        type="text"
                                        id="cardExpiry"
                                        placeholder="MM/AA"
                                        style={{ 
                                            width: '100%', 
                                            padding: '10px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                        required
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="cardCvv" style={{ display: 'block', marginBottom: '4px' }}>CVV</label>
                                    <input
                                        type="text"
                                        id="cardCvv"
                                        style={{ 
                                            width: '100%', 
                                            padding: '10px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        style={{ 
                            background: '#e60012', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '12px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            fontSize: '1rem',
                            marginTop: '24px'
                        }}
                    >
                        Confirmar Pedido
                    </button>
                </form>
            </div>
            
            <div style={{ flex: 1 }}>
                <div style={{ 
                    background: '#f9f9f9', 
                    padding: '24px', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ marginTop: 0 }}>Resumo do Pedido</h2>
                    <div style={{ margin: '16px 0' }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <span>Subtotal:</span>
                            <span>R$ 6.999,99</span>
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <span>Frete:</span>
                            <span>Grátis</span>
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            margin: '16px 0',
                            padding: '16px 0',
                            borderTop: '1px solid #ddd',
                            borderBottom: '1px solid #ddd',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                        }}>
                            <span>Total:</span>
                            <span>R$ 6.999,99</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;