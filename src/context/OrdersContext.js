import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { pedidosAPI } from '../services/api';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

const ordersReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ORDERS_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_ORDERS_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: null
            };
        case 'FETCH_ORDERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CREATE_ORDER_START':
            return {
                ...state,
                creating: true,
                error: null
            };
        case 'CREATE_ORDER_SUCCESS':
            return {
                ...state,
                creating: false,
                orders: [action.payload, ...state.orders],
                error: null
            };
        case 'CREATE_ORDER_FAILURE':
            return {
                ...state,
                creating: false,
                error: action.payload
            };
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id
                        ? { ...order, status: action.payload.status }
                        : order
                )
            };
        case 'CANCEL_ORDER':
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload
                        ? { ...order, status: 'Cancelado' }
                        : order
                )
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

const OrdersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ordersReducer, {
        loading: false,
        creating: false,
        orders: [],
        error: null
    });

    const { isAuthenticated, token, getValidToken } = useAuth();

    // Carregar pedidos quando o usuário estiver autenticado
    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    // Função para buscar todos os pedidos do usuário
    const fetchOrders = async () => {
        try {
            dispatch({ type: 'FETCH_ORDERS_START' });
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Dados mock de pedidos
            const mockOrders = [
                {
                    id: 'PED001',
                    data: '2024-01-15',
                    status: 'Entregue',
                    total: 6999.99,
                    itens: [
                        { id: 1, nome: 'Lenovo Yoga Slim 7i', quantidade: 1, preco: 6999.99 }
                    ]
                },
                {
                    id: 'PED002',
                    data: '2024-01-10',
                    status: 'Enviado',
                    total: 3499.99,
                    itens: [
                        { id: 2, nome: 'Lenovo IdeaPad 3', quantidade: 1, preco: 3499.99 }
                    ]
                },
                {
                    id: 'PED003',
                    data: '2024-01-05',
                    status: 'Pendente',
                    total: 10999.99,
                    itens: [
                        { id: 3, nome: 'Lenovo Legion 5', quantidade: 1, preco: 10999.99 }
                    ]
                }
            ];
            
            dispatch({
                type: 'FETCH_ORDERS_SUCCESS',
                payload: mockOrders
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_ORDERS_FAILURE',
                payload: error.message
            });
        }
    };

    // Função para buscar pedido por ID
    const fetchOrderById = async (orderId) => {
        try {
            // Simular busca de pedido
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const order = state.orders.find(o => o.id === orderId);
            if (!order) {
                throw new Error('Pedido não encontrado');
            }
            return order;
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw error;
        }
    };

    // Função para criar novo pedido
    const createOrder = async (orderData) => {
        try {
            dispatch({ type: 'CREATE_ORDER_START' });
            
            // Simular criação de pedido
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newOrder = {
                id: 'PED' + Date.now(),
                data: new Date().toISOString().split('T')[0],
                status: 'Pendente',
                total: orderData.total || 0,
                itens: orderData.itens || []
            };
            
            dispatch({
                type: 'CREATE_ORDER_SUCCESS',
                payload: newOrder
            });

            return newOrder;
        } catch (error) {
            dispatch({
                type: 'CREATE_ORDER_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função para atualizar status do pedido
    const updateOrderStatus = async (orderId, status) => {
        try {
            // Simular atualização de status
            await new Promise(resolve => setTimeout(resolve, 500));
            
            dispatch({
                type: 'UPDATE_ORDER_STATUS',
                payload: { id: orderId, status }
            });

            return true;
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
            throw error;
        }
    };

    // Função para cancelar pedido
    const cancelOrder = async (orderId) => {
        try {
            // Simular cancelamento de pedido
            await new Promise(resolve => setTimeout(resolve, 500));
            
            dispatch({
                type: 'CANCEL_ORDER',
                payload: orderId
            });

            return true;
        } catch (error) {
            console.error('Erro ao cancelar pedido:', error);
            throw error;
        }
    };

    // Função para atualizar pedido
    const updateOrder = async (orderId, orderData) => {
        try {
            // Simular atualização de pedido
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const updatedOrder = { ...orderData, id: orderId };
            
            dispatch({
                type: 'UPDATE_ORDER_STATUS',
                payload: { id: orderId, ...updatedOrder }
            });

            return updatedOrder;
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            throw error;
        }
    };

    // Função para deletar pedido
    const deleteOrder = async (orderId) => {
        try {
            // Simular exclusão de pedido
            await new Promise(resolve => setTimeout(resolve, 500));
            
            dispatch({
                type: 'FETCH_ORDERS_SUCCESS',
                payload: state.orders.filter(order => order.id !== orderId)
            });

            return true;
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            throw error;
        }
    };

    // Função para buscar pedidos por cliente
    const fetchOrdersByClient = async (clientId) => {
        try {
            // Simular busca de pedidos por cliente
            await new Promise(resolve => setTimeout(resolve, 500));
            
            return state.orders;
        } catch (error) {
            console.error('Erro ao buscar pedidos do cliente:', error);
            throw error;
        }
    };

    // Função para limpar erro
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Função para obter estatísticas dos pedidos
    const getOrderStats = () => {
        const total = state.orders.length;
        const pending = state.orders.filter(order => order.status === 'Pendente').length;
        const processing = state.orders.filter(order => order.status === 'Processando').length;
        const shipped = state.orders.filter(order => order.status === 'Enviado').length;
        const delivered = state.orders.filter(order => order.status === 'Entregue').length;
        const cancelled = state.orders.filter(order => order.status === 'Cancelado').length;

        return {
            total,
            pending,
            processing,
            shipped,
            delivered,
            cancelled
        };
    };

    // Função para filtrar pedidos por status
    const filterOrdersByStatus = (status) => {
        if (!status) return state.orders;
        return state.orders.filter(order => order.status === status);
    };

    // Função para filtrar pedidos por data
    const filterOrdersByDate = (startDate, endDate) => {
        return state.orders.filter(order => {
            const orderDate = new Date(order.data);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && end) {
                return orderDate >= start && orderDate <= end;
            } else if (start) {
                return orderDate >= start;
            } else if (end) {
                return orderDate <= end;
            }

            return true;
        });
    };

    // Função para buscar pedidos por termo
    const searchOrders = (searchTerm) => {
        if (!searchTerm) return state.orders;
        
        const term = searchTerm.toLowerCase();
        return state.orders.filter(order => 
            order.id.toLowerCase().includes(term) ||
            order.itens.some(item => 
                item.nome.toLowerCase().includes(term)
            )
        );
    };

    const value = {
        // Estado
        loading: state.loading,
        creating: state.creating,
        orders: state.orders,
        error: state.error,
        
        // Funções principais
        fetchOrders,
        fetchOrderById,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        updateOrder,
        deleteOrder,
        fetchOrdersByClient,
        
        // Funções auxiliares
        clearError,
        getOrderStats,
        filterOrdersByStatus,
        filterOrdersByDate,
        searchOrders
    };

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    );
};

const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
};

export { OrdersProvider, useOrders };