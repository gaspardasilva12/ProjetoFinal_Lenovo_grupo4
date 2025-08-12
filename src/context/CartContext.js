import React, { createContext, useContext, useReducer, useEffect } from 'react';

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

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('lenovo-cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                dispatch({ type: 'SET_CART', payload: cartData });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('lenovo-cart', JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
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
        getCartCount
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