import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { carrinhosAPI, clientesAPI } from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            };

        case 'SET_CART':
            return {
                ...state,
                items: action.payload
            };

        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: []
    });
    const [clienteId, setClienteId] = useState(null);
    const [carrinhoId, setCarrinhoId] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncPending, setSyncPending] = useState(false);

    // Detectar mudanças na conectividade
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (syncPending) {
                syncCartWithAPI();
            }
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [syncPending]);

    // Inicializar carrinho ao montar o componente
    useEffect(() => {
        initializeCart();
    }, []);

    const initializeCart = async () => {
        try {
            // Carregar carrinho do localStorage primeiro
            const savedCart = localStorage.getItem('lenovo-cart');
            const savedClienteId = localStorage.getItem('lenovo-cliente-id');
            const savedCarrinhoId = localStorage.getItem('lenovo-carrinho-id');

            if (savedCart) {
                try {
                    const cartData = JSON.parse(savedCart);
                    dispatch({ type: 'SET_CART', payload: cartData });
                } catch (error) {
                    console.error('Erro ao carregar carrinho do localStorage:', error);
                }
            }

            if (savedClienteId) {
                setClienteId(parseInt(savedClienteId));
            }

            if (savedCarrinhoId) {
                setCarrinhoId(parseInt(savedCarrinhoId));
            }

            // Se estamos online, tentar sincronizar com a API
            if (isOnline) {
                await syncCartWithAPI();
            }
        } catch (error) {
            console.error('Erro ao inicializar carrinho:', error);
        }
    };

    const syncCartWithAPI = async () => {
        if (!isOnline) {
            setSyncPending(true);
            return;
        }

        try {
            // Se não temos um cliente, criar um temporário
            if (!clienteId) {
                const newCliente = await clientesAPI.create({
                    nome: 'Cliente Temporário',
                    email: `temp_${Date.now()}@example.com`
                });
                setClienteId(newCliente.id);
                localStorage.setItem('lenovo-cliente-id', newCliente.id.toString());
            }

            // Se temos itens no carrinho local mas não um carrinhoId, criar um novo
            if (state.items.length > 0 && !carrinhoId) {
                const cartItems = state.items.map(item => ({
                    produtoId: item.id,
                    quantidade: item.quantity
                }));

                const newCarrinho = await carrinhosAPI.create({
                    clienteId: clienteId,
                    itens: cartItems
                });

                setCarrinhoId(newCarrinho.id);
                localStorage.setItem('lenovo-carrinho-id', newCarrinho.id.toString());
            }

            setSyncPending(false);
        } catch (error) {
            console.error('Erro ao sincronizar carrinho com API:', error);
            setSyncPending(true);
        }
    };

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('lenovo-cart', JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = async (product) => {
        // Adicionar ao estado local imediatamente
        dispatch({ type: 'ADD_ITEM', payload: product });

        // Tentar sincronizar com a API se estamos online
        if (isOnline && clienteId) {
            try {
                if (carrinhoId) {
                    // Atualizar carrinho existente
                    const updatedItems = [...state.items];
                    const existingItem = updatedItems.find(item => item.id === product.id);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        updatedItems.push({ ...product, quantity: 1 });
                    }

                    const cartItems = updatedItems.map(item => ({
                        produtoId: item.id,
                        quantidade: item.quantity
                    }));

                    await carrinhosAPI.update(carrinhoId, {
                        clienteId: clienteId,
                        itens: cartItems
                    });
                } else {
                    // Criar novo carrinho
                    await syncCartWithAPI();
                }
            } catch (error) {
                console.error('Erro ao adicionar ao carrinho API:', error);
                setSyncPending(true);
            }
        } else {
            setSyncPending(true);
        }
    };

    const removeFromCart = async (productId) => {
        // Remover do estado local imediatamente
        dispatch({ type: 'REMOVE_ITEM', payload: productId });

        // Tentar sincronizar com a API se estamos online
        if (isOnline && carrinhoId && clienteId) {
            try {
                const updatedItems = state.items.filter(item => item.id !== productId);
                
                if (updatedItems.length === 0) {
                    // Se não restam itens, eliminar o carrinho
                    await carrinhosAPI.delete(carrinhoId);
                    setCarrinhoId(null);
                    localStorage.removeItem('lenovo-carrinho-id');
                } else {
                    // Atualizar carrinho com itens restantes
                    const cartItems = updatedItems.map(item => ({
                        produtoId: item.id,
                        quantidade: item.quantity
                    }));

                    await carrinhosAPI.update(carrinhoId, {
                        clienteId: clienteId,
                        itens: cartItems
                    });
                }
            } catch (error) {
                console.error('Erro ao remover do carrinho API:', error);
                setSyncPending(true);
            }
        } else {
            setSyncPending(true);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity <= 0) {
            await removeFromCart(productId);
        } else {
            // Atualizar estado local imediatamente
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });

            // Tentar sincronizar com a API se estamos online
            if (isOnline && carrinhoId && clienteId) {
                try {
                    const updatedItems = state.items.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    );

                    const cartItems = updatedItems.map(item => ({
                        produtoId: item.id,
                        quantidade: item.quantity
                    }));

                    await carrinhosAPI.update(carrinhoId, {
                        clienteId: clienteId,
                        itens: cartItems
                    });
                } catch (error) {
                    console.error('Erro ao atualizar quantidade no carrinho API:', error);
                    setSyncPending(true);
                }
            } else {
                setSyncPending(true);
            }
        }
    };

    const clearCart = async () => {
        // Limpar estado local imediatamente
        dispatch({ type: 'CLEAR_CART' });

        // Tentar eliminar carrinho da API se estamos online
        if (isOnline && carrinhoId) {
            try {
                await carrinhosAPI.delete(carrinhoId);
                setCarrinhoId(null);
                localStorage.removeItem('lenovo-carrinho-id');
            } catch (error) {
                console.error('Erro ao limpar carrinho API:', error);
            }
        }
    };

    const getCartTotal = () => {
        return state.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isOnline,
        syncPending,
        clienteId,
        carrinhoId
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };