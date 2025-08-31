// O serviço de api para se conectar com a API REST TOTI
const API_BASE_URL = 'https://backend-toti.onrender.com';

// Função auxiliar para tratar respostas da API
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Erro ${response.status}: ${errorData.message || response.statusText}`);
  }
  return await response.json();
};

// Função auxiliar para fazer requisições GET
const get = async (endpoint, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em GET ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições POST
const post = async (endpoint, data, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em POST ${endpoint}:`, error);
    throw error;
  }
};


// Função auxiliar para fazer requisições PUT
const put = async (endpoint, data, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em PUT ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições PATCH
const patch = async (endpoint, data, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em PATCH ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições DELETE
const del = async (endpoint, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em DELETE ${endpoint}:`, error);
    throw error;
  }
};

// API de Metadata
export const metadataAPI = {
  getMetadata: () => get('/metadata'),
};

// API de Categorías
export const categoriasAPI = {
  getAll: () => get('/categorias'),
  getById: (id) => get(`/categorias/${id}`),
  create: (categoria) => post('/categorias', categoria),
  update: (id, categoria) => put(`/categorias/${id}`, categoria),
  delete: (id) => del(`/categorias/${id}`),

};

// API de Produtos
export const produtosAPI = {
  getAll: () => get('/produtos'),
  getById: (id) => get(`/produtos/${id}`),
  create: (produto) => post('/produtos', produto),
  update: (id, produto) => put(`/produtos/${id}`, produto),
  delete: (id) => del(`/produtos/${id}`),
  search: (query) => get(`/produtos?search=${encodeURIComponent(query)}`),
  getByCategory: (categoryId) => get(`/produtos?categoriaId=${categoryId}`),
};

// API de Clientes
export const clientesAPI = {
  getAll: () => get('/clientes'),
  getById: (id) => get(`/clientes/${id}`),
  create: (cliente) => post('/clientes', cliente),
  update: (id, cliente) => put(`/clientes/${id}`, cliente),
  delete: (id) => del(`/clientes/${id}`),
  getByEmail: (email) => get(`/clientes?email=${encodeURIComponent(email)}`),
};

// API de Carrinhos
export const carrinhosAPI = {
  getAll: () => get('/carrinhos'),
  getByClienteId: (clienteId) => get(`/carrinhos?clienteId=${clienteId}`),
  create: (carrinho) => post('/carrinhos', carrinho),
  update: (id, carrinho) => put(`/carrinhos/${id}`, carrinho),
  delete: (id) => del(`/carrinhos/${id}`),
  addItem: (id, item) => patch(`/carrinhos/${id}/items`, item),
  removeItem: (id, itemId) => del(`/carrinhos/${id}/items/${itemId}`),
  updateItemQuantity: (id, itemId, quantity) => patch(`/carrinhos/${id}/items/${itemId}`, { quantidade: quantity }),
};

// API de Pedidos
export const pedidosAPI = {
  getAll: (token) => get('/pedidos', token),
  getById: (id, token) => get(`/pedidos/${id}`, token),
  getByClienteId: (clienteId, token) => get(`/pedidos?clienteId=${clienteId}`, token),
  create: (pedido, token) => post('/pedidos', pedido, token),
  update: (id, pedido, token) => put(`/pedidos/${id}`, pedido, token),
  delete: (id, token) => del(`/pedidos/${id}`, token),
  updateStatus: (id, status, token) => patch(`/pedidos/${id}/status`, { status }, token),
  cancelOrder: (id, token) => patch(`/pedidos/${id}/cancel`, {}, token),
};

// API de Lista de Desejos
export const wishlistAPI = {
  getAll: (token) => get('/wishlist', token),
  getByClienteId: (clienteId, token) => get(`/wishlist?clienteId=${clienteId}`, token),
  addItem: (item, token) => post('/wishlist', item, token),
  removeItem: (id, token) => del(`/wishlist/${id}`, token),
  clearWishlist: (clienteId, token) => del(`/wishlist/clear/${clienteId}`, token),
  moveToCart: (id, token) => post(`/wishlist/${id}/move-to-cart`, {}, token),
};

// API de Registro de Produtos
export const produtoRegistroAPI = {
  getAll: (token) => get('/produto-registro', token),
  getByClienteId: (clienteId, token) => get(`/produto-registro?clienteId=${clienteId}`, token),
  getBySerialNumber: (serialNumber) => get(`/produto-registro/serial/${serialNumber}`),
  register: (produto, token) => post('/produto-registro', produto, token),
  update: (id, produto, token) => put(`/produto-registro/${id}`, produto, token),
  delete: (id, token) => del(`/produto-registro/${id}`, token),
  extendWarranty: (id, token) => patch(`/produto-registro/${id}/warranty`, {}, token),
  getWarrantyInfo: (id, token) => get(`/produto-registro/${id}/warranty`, token),
};

// API de Autenticação
export const authAPI = {
  login: (credentials) => post('/auth/login', credentials),
  register: (userData) => post('/auth/register', userData),
  logout: (token) => post('/auth/logout', {}, token),

  // Versão segura: busca no parâmetro ou no localStorage; não lança exceção — retorna null se não houver token
  refreshToken: async (refreshToken) => {
    const tokenToUse = refreshToken || localStorage.getItem('refreshToken');
    if (!tokenToUse) {
      console.warn('Refresh token não disponível');
      // Retorna null para que o chamador possa tratar (ex.: redirecionar ao login)
      return null;
    }
    try {
      return await post('/auth/refresh', { refreshToken: tokenToUse });
    } catch (error) {
      console.error('Erro ao atualizar refresh token:', error);
      throw error;
    }
  },

  forgotPassword: (email) => post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => post('/auth/reset-password', { token, newPassword }),
  changePassword: (currentPassword, newPassword, token) => post('/auth/change-password', { currentPassword, newPassword }, token),
  verifyEmail: (token) => post('/auth/verify-email', { token }),
  resendVerification: (email, token) => post('/auth/resend-verification', { email }, token),
};

// API de Perfil do Usuário
export const profileAPI = {
  getProfile: (token) => get('/profile', token),
  updateProfile: (profileData, token) => put('/profile', profileData, token),
  updateAvatar: (avatarData, token) => post('/profile/avatar', avatarData, token),
  deleteAvatar: (token) => del('/profile/avatar', token),
  updatePreferences: (preferences, token) => patch('/profile/preferences', preferences, token),
  getPreferences: (token) => get('/profile/preferences', token),
};

// API de Endereços
export const enderecosAPI = {
  getAll: (token) => get('/enderecos', token),
  getById: (id, token) => get(`/enderecos/${id}`, token),
  create: (endereco, token) => post('/enderecos', endereco, token),
  update: (id, endereco, token) => put(`/enderecos/${id}`, endereco, token),
  delete: (id, token) => del(`/enderecos/${id}`, token),
  setDefault: (id, token) => patch(`/enderecos/${id}/default`, {}, token),
};

// API de Pagamentos
export const pagamentosAPI = {
  getMethods: (token) => get('/pagamentos/methods', token),
  addMethod: (methodData, token) => post('/pagamentos/methods', methodData, token),
  removeMethod: (id, token) => del(`/pagamentos/methods/${id}`, token),
  setDefault: (id, token) => patch(`/pagamentos/methods/${id}/default`, {}, token),
  processPayment: (paymentData, token) => post('/pagamentos/process', paymentData, token),
  getPaymentHistory: (token) => get('/pagamentos/history', token),
};

// API de Notificações
export const notificacoesAPI = {
  getAll: (token) => get('/notificacoes', token),
  getUnread: (token) => get('/notificacoes/unread', token),
  markAsRead: (id, token) => patch(`/notificacoes/${id}/read`, {}, token),
  markAllAsRead: (token) => patch('/notificacoes/read-all', {}, token),
  updatePreferences: (preferences, token) => patch('/notificacoes/preferences', preferences, token),
  getPreferences: (token) => get('/notificacoes/preferences', token),
};


// API de Suporte
export const suporteAPI = {
  createTicket: (ticketData, token) => post('/suporte/tickets', ticketData, token),
  getTickets: (token) => get('/suporte/tickets', token),
  getTicket: (id, token) => get(`/suporte/tickets/${id}`, token),
  updateTicket: (id, ticketData, token) => put(`/suporte/tickets/${id}`, ticketData, token),
  closeTicket: (id, token) => patch(`/suporte/tickets/${id}/close`, {}, token),
  addComment: (id, comment, token) => post(`/suporte/tickets/${id}/comments`, comment, token),
  getComments: (id, token) => get(`/suporte/tickets/${id}/comments`, token),
};

// Exportar todas as APIs
export default {
  metadata: metadataAPI,
  categorias: categoriasAPI,
  produtos: produtosAPI,
  clientes: clientesAPI,
  carrinhos: carrinhosAPI,
  pedidos: pedidosAPI,
  wishlist: wishlistAPI,
  produtoRegistro: produtoRegistroAPI,
  auth: authAPI,
  profile: profileAPI,
  enderecos: enderecosAPI,
  pagamentos: pagamentosAPI,
  notificacoes: notificacoesAPI,
  suporte: suporteAPI,
};