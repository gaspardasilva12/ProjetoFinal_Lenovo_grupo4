import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { carrinhosAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CART_START':
        case 'ADD_ITEM_START':
        case 'REMOVE_ITEM_START':
        case 'UPDATE_QUANTITY_START':
        case 'CLEAR_CART_START':
            return { ...state, loading: true, error: null };

        case 'FETCH_CART_SUCCESS':
        case 'ADD_ITEM_SUCCESS':
        case 'REMOVE_ITEM_SUCCESS':
        case 'UPDATE_QUANTITY_SUCCESS':
            return { ...state, loading: false, items: action.payload, error: null };

        case 'CLEAR_CART_SUCCESS':
            return { ...state, loading: false, items: [], error: null };

        case 'FETCH_CART_FAILURE':
        case 'ADD_ITEM_FAILURE':
        case 'REMOVE_ITEM_FAILURE':
        case 'UPDATE_QUANTITY_FAILURE':
        case 'CLEAR_CART_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

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

    // Carregar carrinho quando logado
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchCart();
        } else {
            // Carregar do localStorage quando não autenticado
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            dispatch({ type: 'FETCH_CART_SUCCESS', payload: storedCart });
        }
    }, [isAuthenticated, user]);

    // Buscar carrinho da API
    const fetchCart = async () => {
        try {
            if (!isAuthenticated || !user) return;

            dispatch({ type: 'FETCH_CART_START' });
            const token = await getValidToken();
            const cartData = await carrinhosAPI.getByClienteId(user.id, token);

            const cartItems = cartData.itens || [];
            const formattedItems = cartItems.map(item => ({
                id: item.produtoId,
                nome: item.produto?.nome || 'Produto',
                preco: item.produto?.preco || 0,
                imagem: item.produto?.imagem || '/images/placeholder.jpg',
                quantidade: item.quantidade,
                categoria: item.produto?.categoria || 'Geral'
            }));

            dispatch({ type: 'FETCH_CART_SUCCESS', payload: formattedItems });
        } catch (error) {
            dispatch({ type: 'FETCH_CART_FAILURE', payload: error.message });
        }
    };

    // Adicionar item
    const addToCart = async (product) => {
        try {
            dispatch({ type: 'ADD_ITEM_START' });

            if (!isAuthenticated || !user) {
                // Modo offline
                const existingItem = state.items.find(i => i.id === product.id);
                let updatedItems;
                if (existingItem) {
                    updatedItems = state.items.map(i =>
                        i.id === product.id ? { ...i, quantidade: i.quantidade + 1 } : i
                    );
                } else {
                    updatedItems = [...state.items, { ...product, quantidade: 1 }];
                }
                localStorage.setItem('cart', JSON.stringify(updatedItems));
                dispatch({ type: 'ADD_ITEM_SUCCESS', payload: updatedItems });
                return;
            }

            // Modo autenticado
            const token = await getValidToken();
            const existingItem = state.items.find(i => i.id === product.id);

            let updatedItems;
            if (existingItem) {
                updatedItems = state.items.map(i =>
                    i.id === product.id ? { ...i, quantidade: i.quantidade + 1 } : i
                );
            } else {
                updatedItems = [...state.items, { ...product, quantidade: 1 }];
            }

            const cartItems = updatedItems.map(i => ({ produtoId: i.id, quantidade: i.quantidade }));
            await carrinhosAPI.update(user.id, { clienteId: user.id, itens: cartItems }, token);

            dispatch({ type: 'ADD_ITEM_SUCCESS', payload: updatedItems });
        } catch (error) {
            dispatch({ type: 'ADD_ITEM_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Remover item
    const removeFromCart = async (productId) => {
        try {
            dispatch({ type: 'REMOVE_ITEM_START' });

            if (!isAuthenticated || !user) {
                // Modo offline
                const updatedItems = state.items.filter(i => i.id !== productId);
                localStorage.setItem('cart', JSON.stringify(updatedItems));
                dispatch({ type: 'REMOVE_ITEM_SUCCESS', payload: updatedItems });
                return;
            }

            const token = await getValidToken();
            const updatedItems = state.items.filter(i => i.id !== productId);

            if (updatedItems.length === 0) {
                await carrinhosAPI.delete(user.id, token);
                dispatch({ type: 'REMOVE_ITEM_SUCCESS', payload: [] });
            } else {
                const cartItems = updatedItems.map(i => ({ produtoId: i.id, quantidade: i.quantidade }));
                await carrinhosAPI.update(user.id, { clienteId: user.id, itens: cartItems }, token);
                dispatch({ type: 'REMOVE_ITEM_SUCCESS', payload: updatedItems });
            }
        } catch (error) {
            dispatch({ type: 'REMOVE_ITEM_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Atualizar quantidade
    const updateQuantity = async (productId, quantity) => {
        try {
            if (quantity <= 0) {
                await removeFromCart(productId);
                return;
            }

            dispatch({ type: 'UPDATE_QUANTITY_START' });

            if (!isAuthenticated || !user) {
                // Modo offline
                const updatedItems = state.items.map(i =>
                    i.id === productId ? { ...i, quantidade: quantity } : i
                );
                localStorage.setItem('cart', JSON.stringify(updatedItems));
                dispatch({ type: 'UPDATE_QUANTITY_SUCCESS', payload: updatedItems });
                return;
            }

            const token = await getValidToken();
            const updatedItems = state.items.map(i =>
                i.id === productId ? { ...i, quantidade: quantity } : i
            );

            const cartItems = updatedItems.map(i => ({ produtoId: i.id, quantidade: i.quantidade }));
            await carrinhosAPI.update(user.id, { clienteId: user.id, itens: cartItems }, token);

            dispatch({ type: 'UPDATE_QUANTITY_SUCCESS', payload: updatedItems });
        } catch (error) {
            dispatch({ type: 'UPDATE_QUANTITY_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Limpar carrinho
    const clearCart = async () => {
        try {
            dispatch({ type: 'CLEAR_CART_START' });

            if (!isAuthenticated || !user) {
                localStorage.removeItem('cart');
                dispatch({ type: 'CLEAR_CART_SUCCESS' });
                return;
            }

            const token = await getValidToken();
            await carrinhosAPI.delete(user.id, token);
            dispatch({ type: 'CLEAR_CART_SUCCESS' });
        } catch (error) {
            dispatch({ type: 'CLEAR_CART_FAILURE', payload: error.message });
            throw error;
        }
    };

    // Auxiliares
    const getCartTotal = () =>
        state.items.reduce((total, i) => total + (i.preco || 0) * i.quantidade, 0);

    const getCartCount = () =>
        state.items.reduce((count, i) => count + i.quantidade, 0);

    const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

    const getCartStats = () => {
        const total = state.items.length;
        const totalValue = getCartTotal();
        const categories = [...new Set(state.items.map(i => i.categoria))];
        return { total, totalValue, categories: categories.length };
    };

    const isInCart = (productId) => state.items.some(i => i.id === productId);
    const getCartItem = (productId) => state.items.find(i => i.id === productId);

    const applyCoupon = async (couponCode) => {
        try {
            if (!isAuthenticated) return { success: true, discount: 0.1 };
            const token = await getValidToken();
            console.log('Aplicando cupom com token:', couponCode, token);
            return { success: true, discount: 0.1 };
        } catch {
            throw new Error('Erro ao aplicar cupom');
        }
    };

    const calculateShipping = async (zipCode) => {
        try {
            if (!isAuthenticated) return { success: true, shipping: 15.9 };
            const token = await getValidToken();
            console.log('Calculando frete com token:', zipCode, token);
            return { success: true, shipping: 15.9 };
        } catch {
            throw new Error('Erro ao calcular frete');
        }
    };

    const value = {
        items: state.items,
        loading: state.loading,
        error: state.error,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

export { CartProvider, useCart };
