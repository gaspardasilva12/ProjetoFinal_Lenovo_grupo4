// Serviço API para conectar com a API REST TOTI
const API_BASE_URL = 'https://backend-toti.onrender.com';

// Função auxiliar para tratar respostas da API
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

// Função auxiliar para fazer requisições GET
const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em GET ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições POST
const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em POST ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições PUT
const put = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro em PUT ${endpoint}:`, error);
    throw error;
  }
};

// Função auxiliar para fazer requisições DELETE
const del = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
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
};

// API de Clientes
export const clientesAPI = {
  getAll: () => get('/clientes'),
  getById: (id) => get(`/clientes/${id}`),
  create: (cliente) => post('/clientes', cliente),
  update: (id, cliente) => put(`/clientes/${id}`, cliente),
  delete: (id) => del(`/clientes/${id}`),
};

// API de Carrinhos
export const carrinhosAPI = {
  getAll: () => get('/carrinhos'),
  getByClienteId: (clienteId) => get(`/carrinhos?clienteId=${clienteId}`),
  create: (carrinho) => post('/carrinhos', carrinho),
  update: (id, carrinho) => put(`/carrinhos/${id}`, carrinho),
  delete: (id) => del(`/carrinhos/${id}`),
};

// Exportar todas as APIs
export default {
  metadata: metadataAPI,
  categorias: categoriasAPI,
  produtos: produtosAPI,
  clientes: clientesAPI,
  carrinhos: carrinhosAPI,
};