import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                refreshToken: null,
                error: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                token: null,
                refreshToken: null,
                error: null
            };
        case 'UPDATE_PROFILE':
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };
        case 'UPDATE_TOKEN':
            return { ...state, token: action.payload };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        loading: true,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        error: null
    });

    // 🔄 Inicializar com localStorage
    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('lenovo-token');
            const savedRefreshToken = localStorage.getItem('lenovo-refresh-token');
            const savedUser = localStorage.getItem('lenovo-user');

            if (savedToken && savedRefreshToken && savedUser) {
                const userData = JSON.parse(savedUser);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        user: userData,
                        token: savedToken,
                        refreshToken: savedRefreshToken
                    }
                });
            }
        } catch (error) {
            console.error('Erro ao inicializar auth:', error);
        } finally {
            dispatch({ type: 'CLEAR_ERROR' });
        }
    }, []);

    // 💾 Persistir no localStorage
    useEffect(() => {
        if (state.token && state.refreshToken && state.user) {
            localStorage.setItem('lenovo-token', state.token);
            localStorage.setItem('lenovo-refresh-token', state.refreshToken);
            localStorage.setItem('lenovo-user', JSON.stringify(state.user));
        } else if (!state.isAuthenticated) {
            localStorage.removeItem('lenovo-token');
            localStorage.removeItem('lenovo-refresh-token');
            localStorage.removeItem('lenovo-user');
        }
    }, [state]);

    // 🔐 Função de login (mock)
    const login = async ({ email, password }) => {
        dispatch({ type: 'LOGIN_START' });
        await new Promise(r => setTimeout(r, 1000));

        if (!email || !password) throw new Error('E-mail e senha obrigatórios');
        if (password.length < 6) throw new Error('Senha deve ter pelo menos 6 caracteres');

        const mockUser = {
            id: 1,
            firstName: 'Usuário',
            lastName: 'Teste',
            email,
            phone: '(11) 99999-9999',
            cpf: '123.456.789-00',
            address: 'Rua Teste, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567'
        };

        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockRefreshToken = 'mock-refresh-token-' + Date.now();

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: mockUser, token: mockToken, refreshToken: mockRefreshToken }
        });

        return { user: mockUser, token: mockToken, refreshToken: mockRefreshToken };
    };

    // 📝 Registro (mock)
    const register = async (userData) => {
        return login({ email: userData.email, password: userData.senha });
    };

    // 🚪 Logout
    const logout = async () => {
        await new Promise(r => setTimeout(r, 500));
        dispatch({ type: 'LOGOUT' });
    };

    // ♻️ Renova token
    const refreshAuthToken = async () => {
        if (!state.refreshToken) throw new Error('Refresh token não disponível');
        await new Promise(r => setTimeout(r, 500));
        const newToken = 'mock-jwt-token-' + Date.now();
        dispatch({ type: 'UPDATE_TOKEN', payload: newToken });
        return newToken;
    };

    // 👤 Atualizar perfil
    const updateProfile = async (profileData) => {
        if (!state.token) throw new Error('Usuário não autenticado');
        await new Promise(r => setTimeout(r, 1000));
        dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
        return { ...state.user, ...profileData };
    };

    // 🔑 Alterar senha
    const changePassword = async () => {
        if (!state.token) throw new Error('Usuário não autenticado');
        await new Promise(r => setTimeout(r, 1000));
        return { success: true, message: 'Senha alterada com sucesso' };
    };

    // 🔍 Validar token
    const isTokenExpired = (token) => {
        if (!token) return true;
        if (token.startsWith('mock-jwt-token-')) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    // Obter token válido
    const getValidToken = async () => {
        if (isTokenExpired(state.token)) {
            return await refreshAuthToken();
        }
        return state.token;
    };

    const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            logout,
            updateProfile,
            changePassword,
            refreshAuthToken,
            clearError,
            getValidToken,
            isTokenExpired
        }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
