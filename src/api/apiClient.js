// src/api/apiClient.js
const BASE_URL = '/api';

const parseJsonSafe = async (response) => {
  try {
    const data = await response.json();
    return data || [];
  } catch {
    return [];
  }
};

const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    
    if (response.ok) {
      return await parseJsonSafe(response);
    }

    // Se a API não responder (404 ou 500), retorna lista vazia para não quebrar o .find()
    console.warn(`API: ${path} retornou status ${response.status}. Usando fallback [].`);
    return [];
    
  } catch (error) {
    console.error("Erro de conexão com a API:", error);
    return []; 
  }
};

export const apiClient = {
  login: async (credentials) => {
    return request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  },

  get: async (entity) => {
    // Ex: get('products') busca em /api/products
    return request(`/${entity}`, { method: 'GET' });
  },

  save: async (entity, data) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return request(`/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
  },
};