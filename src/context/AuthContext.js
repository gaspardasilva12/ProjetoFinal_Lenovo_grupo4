import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { authAPI, profileAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                error: null
            };
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
            return {
                ...state,
                token: action.payload
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

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        loading: true,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        error: null
    });

    // Verificar se há token salvo no localStorage ao inicializar
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const savedToken = localStorage.getItem('lenovo-token');
                const savedRefreshToken = localStorage.getItem('lenovo-refresh-token');
                const savedUser = localStorage.getItem('lenovo-user');

                if (savedToken && savedRefreshToken && savedUser) {
                    // Verificar se o token ainda é válido
                    try {
                        const userData = JSON.parse(savedUser);
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                user: userData,
                                token: savedToken,
                                refreshToken: savedRefreshToken
                            }
                        });
                    } catch (error) {
                        // Token inválido, limpar dados
                        localStorage.removeItem('lenovo-token');
                        localStorage.removeItem('lenovo-refresh-token');
                        localStorage.removeItem('lenovo-user');
                    }
                }
            } catch (error) {
                console.error('Erro ao inicializar autenticação:', error);
            } finally {
                dispatch({ type: 'CLEAR_ERROR' });
            }
        };

        initializeAuth();
    }, []);

    // Salvar dados de autenticação no localStorage
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
    }, [state.token, state.refreshToken, state.user, state.isAuthenticated]);

    // Função de login com dados mock
    const login = async (credentials) => {
        try {
            dispatch({ type: 'LOGIN_START' });
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Validação básica
            if (!credentials.email || !credentials.password) {
                throw new Error('E-mail e senha são obrigatórios');
            }
            
            if (credentials.password.length < 6) {
                throw new Error('Senha deve ter pelo menos 6 caracteres');
            }

            // Dados mock do usuário
            const mockUser = {
                id: 1,
                firstName: 'Usuário',
                lastName: 'Teste',
                email: credentials.email,
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
                payload: {
                    user: mockUser,
                    token: mockToken,
                    refreshToken: mockRefreshToken
                }
            });

            return {
                user: mockUser,
                token: mockToken,
                refreshToken: mockRefreshToken
            };
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função de registro com dados mock
    const register = async (userData) => {
        try {
            dispatch({ type: 'LOGIN_START' });
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Validação básica
            if (!userData.email || !userData.senha) {
                throw new Error('E-mail e senha são obrigatórios');
            }
            
            if (userData.senha.length < 6) {
                throw new Error('Senha deve ter pelo menos 6 caracteres');
            }

            // Dados mock do usuário
            const mockUser = {
                id: 1,
                firstName: userData.nome.split(' ')[0] || 'Usuário',
                lastName: userData.nome.split(' ').slice(1).join(' ') || 'Teste',
                email: userData.email,
                phone: userData.telefone || '(11) 99999-9999',
                cpf: userData.cpf || '123.456.789-00',
                address: userData.endereco || 'Rua Teste, 123',
                city: userData.cidade || 'São Paulo',
                state: userData.estado || 'SP',
                zipCode: userData.cep || '01234-567'
            };

            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockRefreshToken = 'mock-refresh-token-' + Date.now();
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: mockUser,
                    token: mockToken,
                    refreshToken: mockRefreshToken
                }
            });

            return {
                user: mockUser,
                token: mockToken,
                refreshToken: mockRefreshToken
            };
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error.message
            });
            throw error;
        }
    };

    // Função de logout
    const logout = async () => {
        try {
            // Simular chamada de API
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            dispatch({ type: 'LOGOUT' });
        }
    };

    // Função para renovar token (mais resiliente)
    const refreshToken = async (forceRefresh = null) => {
        try {
            const tokenToUse = forceRefresh || state.refreshToken;
            if (!tokenToUse) {
                // Não lançar; retornar null para que chamadores tratem estado não autenticado
                console.warn('Refresh token não disponível');
                return null;
            }

            // Tentar usar a API central se disponível
            try {
                // Se houver um serviço de API de autenticação, usá-lo
                // ... evita dependência rígida caso tenha mocking local
                // Ex.: const resp = await authAPI.refreshToken(tokenToUse);
                // if (resp && resp.token) { dispatch({ type: 'UPDATE_TOKEN', payload: resp.token }); return resp.token; }
            } catch (apiErr) {
                console.warn('Falha ao usar authAPI.refreshToken, usando fallback mock:', apiErr);
            }

            // Fallback: gerar token mock (compatível com o restante do contexto)
            const newToken = 'mock-jwt-token-' + Date.now();

            dispatch({
                type: 'UPDATE_TOKEN',
                payload: newToken
            });

            return newToken;
        } catch (error) {
            console.error('Erro ao renovar token:', error);
            // Em caso de erro grave, realizar logout e retornar null em vez de lançar
            dispatch({ type: 'LOGOUT' });
            return null;
        }
    };

    // Função para obter token válido (não lança)
    const getValidToken = async () => {
        try {
            // Se não houver token corrente, tentar renovar
            if (!state.token || isTokenExpired(state.token)) {
                const refreshed = await refreshToken();
                // Pode ser null se não houver refresh token ou falha na renovação
                return refreshed || null;
            }
            return state.token;
        } catch (error) {
            console.error('Erro ao obter token válido:', error);
            return null;
        }
    };

    // Função para atualizar perfil
    const updateProfile = async (profileData) => {
        try {
            if (!state.token) {
                throw new Error('Usuário não autenticado');
            }

            // Simular atualização de perfil
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const updatedUser = { ...state.user, ...profileData };
            
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: updatedUser
            });

            return updatedUser;
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            throw error;
        }
    };

    // Função para alterar senha
    const changePassword = async (currentPassword, newPassword) => {
        try {
            if (!state.token) {
                throw new Error('Usuário não autenticado');
            }

            // Simular alteração de senha
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return { success: true, message: 'Senha alterada com sucesso' };
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            throw error;
        }
    };

    // Função para recuperar senha
    const forgotPassword = async (email) => {
        try {
            // Simular recuperação de senha
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return { success: true, message: 'E-mail de recuperação enviado' };
        } catch (error) {
            console.error('Erro ao solicitar recuperação de senha:', error);
            throw error;
        }
    };

    // Função para redefinir senha
    const resetPassword = async (token, newPassword) => {
        try {
            // Simular redefinição de senha
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return { success: true, message: 'Senha redefinida com sucesso' };
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            throw error;
        }
    };

    // Função para verificar email
    const verifyEmail = async (token) => {
        try {
            // Simular verificação de email
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return { success: true, message: 'E-mail verificado com sucesso' };
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            throw error;
        }
    };

    // Função para reenviar verificação
    const resendVerification = async (email, token) => {
        try {
            // Simular reenvio de verificação
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return { success: true, message: 'E-mail de verificação reenviado' };
        } catch (error) {
            console.error('Erro ao reenviar verificação:', error);
            throw error;
        }
    };

    // Função para limpar erro
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Função para verificar se o token está expirado
    const isTokenExpired = (token) => {
        if (!token) return true;
        
        try {
            // Para tokens mock, sempre retornar false
            if (token.startsWith('mock-jwt-token-')) {
                return false;
            }
            
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    const value = {
        // Estado
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        error: state.error,
        
        // Funções
        login,
        register,
        logout,
        refreshToken,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerification,
        clearError,
        getValidToken,
        isTokenExpired
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };