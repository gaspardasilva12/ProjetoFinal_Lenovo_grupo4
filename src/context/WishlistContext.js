import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_WISHLIST_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_WISHLIST_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null
            };
        case 'FETCH_WISHLIST_FAILURE':
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
                items: [...state.items, action.payload],
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
                items: state.items.filter(item => item.id !== action.payload),
                error: null
            };
        case 'REMOVE_ITEM_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CLEAR_WISHLIST_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'CLEAR_WISHLIST_SUCCESS':
            return {
                ...state,
                loading: false,
                items: [],
                error: null
            };
        case 'CLEAR_WISHLIST_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'MOVE_TO_CART_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'MOVE_TO_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                items: state.items.filter(item => item.id !== action.payload),
                error: null
            };
        case 'MOVE_TO_CART_FAILURE':
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

const WishlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, {
        loading: false,
        items: [],
        error: null
    });

    const { isAuthenticated, user, getValidToken } = useAuth();

    // Carregar wishlist quando o usuário estiver autenticado
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchWishlist();
        }
    }, [isAuthenticated, user]);

    // Função para buscar wishlist
    const fetchWishlist = async () => {
        try {
            dispatch({ type: 'FETCH_WISHLIST_START' });
            
            const token = await getValidToken();
            const wishlistData = await wishlistAPI.getByClienteId(user.id, token);
            
            // Converter dados da API para formato local
            const formattedItems = wishlistData.map(item => ({
                id: item.produtoId,
                nome: item.produto?.nome || 'Produto',
                preco: item.produto?.preco || 0,
                imagem: item.produto?.imagem || '/images/placeholder.jpg',
                categoria: item.produto?.categoria || 'Geral',
                dataAdicionado: item.dataAdicionado || new Date().toISOString()
            }));
            
            dispatch({
                type: 'FETCH_WISHLIST_SUCCESS',
                payload: formattedItems
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_WISHLIST_FAILURE',
                payload: error.message
            });
        }
    };

    // Função para adicionar item à wishlist
    const addToWishlist = async (item) => {
        try {
            dispatch({ type: 'ADD_ITEM_START' });
            
            const token = await getValidToken();
            
            // Verificar se o item já existe
            if (state.items.find(existingItem => existingItem.id === item.id)) {
                throw new Error('Item já está na lista de desejos');
            }
            
            // Adicionar à API
            const wishlistItem = {
                clienteId: user.id,
                produtoId: item.id,
                dataAdicionado: new Date().toISOString()
            };
            
            await wishlistAPI.addItem(wishlistItem, token);
            
            const newItem = {
                ...item,
                dataAdicionado: wishlistItem.dataAdicionado
            };
            
            dispatch({
                type: 'ADD_ITEM_SUCCESS',
                payload: newItem
            });

            return newItem;
        } catch (error) {
            dispatch({
                type: 'ADD_ITEM_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para remover item da wishlist
    const removeFromWishlist = async (itemId) => {
        try {
            dispatch({ type: 'REMOVE_ITEM_START' });
            
            const token = await getValidToken();
            await wishlistAPI.removeItem(itemId, token);
            
            dispatch({
                type: 'REMOVE_ITEM_SUCCESS',
                payload: itemId
            });

            return true;
        } catch (error) {
            dispatch({
                type: 'REMOVE_ITEM_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para limpar wishlist
    const clearWishlist = async () => {
        try {
            dispatch({ type: 'CLEAR_WISHLIST_START' });
            
            const token = await getValidToken();
            await wishlistAPI.clearWishlist(user.id, token);
            
            dispatch({
                type: 'CLEAR_WISHLIST_SUCCESS'
            });

            return true;
        } catch (error) {
            dispatch({
                type: 'CLEAR_WISHLIST_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para mover item para o carrinho
    const moveToCart = async (itemId) => {
        try {
            dispatch({ type: 'MOVE_TO_CART_START' });
            
            const token = await getValidToken();
            await wishlistAPI.moveToCart(itemId, token);
            
            dispatch({
                type: 'MOVE_TO_CART_SUCCESS',
                payload: itemId
            });

            return true;
        } catch (error) {
            dispatch({
                type: 'MOVE_TO_CART_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para verificar se item está na wishlist
    const isInWishlist = (itemId) => {
        return state.items.some(item => item.id === itemId);
    };

    // Função para obter item da wishlist
    const getWishlistItem = (itemId) => {
        return state.items.find(item => item.id === itemId);
    };

    // Função para buscar wishlist por cliente
    const fetchWishlistByClient = async (clientId) => {
        try {
            const token = await getValidToken();
            const wishlistData = await wishlistAPI.getByClienteId(clientId, token);
            
            // Converter dados da API para formato local
            const formattedItems = wishlistData.map(item => ({
                id: item.produtoId,
                nome: item.produto?.nome || 'Produto',
                preco: item.produto?.preco || 0,
                imagem: item.produto?.imagem || '/images/placeholder.jpg',
                categoria: item.produto?.categoria || 'Geral',
                dataAdicionado: item.dataAdicionado || new Date().toISOString()
            }));
            
            return formattedItems;
        } catch (error) {
            console.error('Erro ao buscar wishlist do cliente:', error);
            throw error;
        }
    };

    // Função para limpar erro
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Função para obter estatísticas da wishlist
    const getWishlistStats = () => {
        const total = state.items.length;
        const totalValue = state.items.reduce((sum, item) => sum + (item.preco || 0), 0);
        const categories = [...new Set(state.items.map(item => item.categoria))];

        return {
            total,
            totalValue,
            categories: categories.length
        };
    };

    // Função para filtrar por categoria
    const filterByCategory = (category) => {
        if (!category) return state.items;
        return state.items.filter(item => item.categoria === category);
    };

    // Função para filtrar por faixa de preço
    const filterByPriceRange = (minPrice, maxPrice) => {
        return state.items.filter(item => {
            if (minPrice && maxPrice) {
                return item.preco >= minPrice && item.preco <= maxPrice;
            } else if (minPrice) {
                return item.preco >= minPrice;
            } else if (maxPrice) {
                return item.preco <= maxPrice;
            }
            return true;
        });
    };

    // Função para buscar na wishlist
    const searchWishlist = (searchTerm) => {
        if (!searchTerm) return state.items;
        
        const term = searchTerm.toLowerCase();
        return state.items.filter(item => 
            item.nome.toLowerCase().includes(term) ||
            item.categoria.toLowerCase().includes(term)
        );
    };

    // Função para ordenar wishlist
    const sortWishlist = (sortBy = 'nome', order = 'asc') => {
        const sortedItems = [...state.items];
        
        sortedItems.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
        
        return sortedItems;
    };

    // Função para obter contagem de itens
    const getWishlistCount = () => {
        return state.items.length;
    };

    // Função para adicionar múltiplos itens
    const addMultipleItems = async (items) => {
        try {
            const token = await getValidToken();
            const promises = items.map(item => 
                wishlistAPI.addItem({
                    clienteId: user.id,
                    produtoId: item.id,
                    dataAdicionado: new Date().toISOString()
                }, token)
            );
            
            await Promise.all(promises);
            
            // Recarregar wishlist
            await fetchWishlist();
            
            return true;
        } catch (error) {
            throw new Error('Erro ao adicionar múltiplos itens');
        }
    };

    // Função para exportar wishlist
    const exportWishlist = (format = 'json') => {
        try {
            if (format === 'json') {
                const dataStr = JSON.stringify(state.items, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'wishlist.json';
                link.click();
                URL.revokeObjectURL(url);
            } else if (format === 'csv') {
                const headers = ['Nome', 'Preço', 'Categoria', 'Data Adicionado'];
                const csvContent = [
                    headers.join(','),
                    ...state.items.map(item => [
                        `"${item.nome}"`,
                        item.preco,
                        `"${item.categoria}"`,
                        item.dataAdicionado
                    ].join(','))
                ].join('\n');
                
                const dataBlob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'wishlist.csv';
                link.click();
                URL.revokeObjectURL(url);
            }
            
            return true;
        } catch (error) {
            throw new Error('Erro ao exportar wishlist');
        }
    };

    const value = {
        // Estado
        items: state.items,
        loading: state.loading,
        error: state.error,
        
        // Funções principais
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        moveToCart,
        isInWishlist,
        
        // Funções auxiliares
        getWishlistItem,
        fetchWishlistByClient,
        clearError,
        getWishlistStats,
        filterByCategory,
        filterByPriceRange,
        searchWishlist,
        sortWishlist,
        getWishlistCount,
        addMultipleItems,
        exportWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export { WishlistProvider, useWishlist };