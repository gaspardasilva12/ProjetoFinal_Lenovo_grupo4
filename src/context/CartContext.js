import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { carrinhosAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CART_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null
            };
        case 'FETCH_CART_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'ADD_ITEM_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'ADD_ITEM_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null
            };
        case 'ADD_ITEM_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'REMOVE_ITEM_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'REMOVE_ITEM_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null
            };
        case 'REMOVE_ITEM_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'UPDATE_QUANTITY_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'UPDATE_QUANTITY_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null
            };
        case 'UPDATE_QUANTITY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CLEAR_CART_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'CLEAR_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                items: [],
                error: null
            };
        case 'CLEAR_CART_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        loading: false,
        items: [],
        error: null
    });

    const { isAuthenticated, user, getValidToken } = useAuth();

    // Carregar carrinho quando o usuário estiver autenticado
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchCart();
        }
    }, [isAuthenticated, user]);

    // Função para buscar carrinho do usuário
    const fetchCart = async () => {
        try {
            dispatch({ type: 'FETCH_CART_START' });
            
            const token = await getValidToken();
            const cartData = await carrinhosAPI.getByClienteId(user.id, token);
            
            // Converter dados da API para formato local
            const cartItems = cartData.itens || [];
            const formattedItems = cartItems.map(item => ({
                id: item.produtoId,
                nome: item.produto?.nome || 'Produto',
                preco: item.produto?.preco || 0,
                imagem: item.produto?.imagem || '/images/placeholder.jpg',
                quantidade: item.quantidade,
                categoria: item.produto?.categoria || 'Geral'
            }));
            
            dispatch({
                type: 'FETCH_CART_SUCCESS',
                payload: formattedItems
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_CART_FAILURE',
                payload: error.message
            });
        }
    };

    // Função para adicionar item ao carrinho
    const addToCart = async (productOrId, quantity = 1) => {
        if (!productOrId) {
            console.warn('addToCart chamado sem produto:', productOrId);
            return { success: false, error: 'invalid_product' };
        }

        let productId = null;
        if (typeof productOrId === 'number' || typeof productOrId === 'string') {
            productId = productOrId;
        } else if (productOrId && (productOrId.id || productOrId.productId)) {
            productId = productOrId.id || productOrId.productId;
        } else {
            console.warn('addToCart recebeu objeto inválido:', productOrId);
            return { success: false, error: 'invalid_product' };
        }

        const token = await getValidToken();
        if (!token) {
            console.warn('addToCart requer autenticação, token não disponível');
            return { success: false, error: 'auth_required' };
        }

        try {
            dispatch({ type: 'ADD_ITEM_START' });

            // Chama a API para adicionar o item
            await carrinhosAPI.addItem(user.id, {
                produtoId: productId,
                quantidade: quantity
            });

            // Busca o carrinho atualizado
            await fetchCart();

            dispatch({
                type: 'ADD_ITEM_SUCCESS',
                payload: state.items // O fetchCart já atualiza o estado
            });

            return { success: true, data: state.items };
        } catch (err) {
            dispatch({
                type: 'ADD_ITEM_FAILURE',
                payload: err.message
            });
            console.error('Falha ao adicionar ao carrinho:', err);
            return { success: false, error: 'request_failed', details: err };
        }
    };

    // Função para remover item do carrinho
    const removeFromCart = async (productId) => {
        try {
            dispatch({ type: 'REMOVE_ITEM_START' });
            
            const token = await getValidToken();
            const updatedItems = state.items.filter(item => item.id !== productId);
            
            if (updatedItems.length === 0) {
                // Se não restam itens, limpar carrinho
                await carrinhosAPI.delete(user.id, token);
                dispatch({
                    type: 'REMOVE_ITEM_SUCCESS',
                    payload: []
                });
            } else {
                // Atualizar carrinho com itens restantes
                const cartItems = updatedItems.map(item => ({
                    produtoId: item.id,
                    quantidade: item.quantidade
                }));
                
                await carrinhosAPI.update(user.id, {
                    clienteId: user.id,
                    itens: cartItems
                }, token);
                
                dispatch({
                    type: 'REMOVE_ITEM_SUCCESS',
                    payload: updatedItems
                });
            }
        } catch (error) {
            dispatch({
                type: 'REMOVE_ITEM_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para atualizar quantidade
    const updateQuantity = async (productId, quantity) => {
        try {
            if (quantity <= 0) {
                await removeFromCart(productId);
                return;
            }
            
            dispatch({ type: 'UPDATE_QUANTITY_START' });
            
            const token = await getValidToken();
            const updatedItems = state.items.map(item =>
                item.id === productId ? { ...item, quantidade: quantity } : item
            );
            
            const cartItems = updatedItems.map(item => ({
                produtoId: item.id,
                quantidade: item.quantidade
            }));
            
            await carrinhosAPI.update(user.id, {
                clienteId: user.id,
                itens: cartItems
            }, token);
            
            dispatch({
                type: 'UPDATE_QUANTITY_SUCCESS',
                payload: updatedItems
            });
        } catch (error) {
            dispatch({
                type: 'UPDATE_QUANTITY_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para limpar carrinho
    const clearCart = async () => {
        try {
            dispatch({ type: 'CLEAR_CART_START' });
            
            const token = await getValidToken();
            await carrinhosAPI.delete(user.id, token);
            
            dispatch({
                type: 'CLEAR_CART_SUCCESS'
            });
        } catch (error) {
            dispatch({
                type: 'CLEAR_CART_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para obter total do carrinho
    const getCartTotal = () => {
        return state.items.reduce((total, item) => {
            return total + (item.preco || 0) * item.quantidade;
        }, 0);
    };

    // Função para obter contagem de itens
    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantidade, 0);
    };

    // Função para limpar erro
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Função para obter estatísticas do carrinho
    const getCartStats = () => {
        const total = state.items.length;
        const totalValue = getCartTotal();
        const categories = [...new Set(state.items.map(item => item.categoria))];

        return {
            total,
            totalValue,
            categories: categories.length
        };
    };

    // Função para verificar se item está no carrinho
    const isInCart = (productId) => {
        return state.items.some(item => item.id === productId);
    };

    // Função para obter item do carrinho
    const getCartItem = (productId) => {
        return state.items.find(item => item.id === productId);
    };

    // Função para aplicar cupom de desconto
    const applyCoupon = async (couponCode) => {
        try {
            const token = await getValidToken();
            // Implementar lógica de cupom quando a API estiver disponível
            console.log('Aplicando cupom:', couponCode);
            return { success: true, discount: 0.1 }; // 10% de desconto
        } catch (error) {
            throw new Error('Erro ao aplicar cupom');
        }
    };

    // Função para calcular frete
    const calculateShipping = async (zipCode) => {
        try {
            const token = await getValidToken();
            // Implementar cálculo de frete quando a API estiver disponível
            console.log('Calculando frete para CEP:', zipCode);
            return { success: true, shipping: 15.90 }; // Frete fixo
        } catch (error) {
            throw new Error('Erro ao calcular frete');
        }
    };

    const value = {
        // Estado
        items: state.items,
        loading: state.loading,
        error: state.error,
        
        // Funções principais
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Funções auxiliares
        getCartTotal,
        getCartCount,
        clearError,
        getCartStats,
        isInCart,
        getCartItem,
        applyCoupon,
        calculateShipping
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