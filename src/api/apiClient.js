// src/api/apiClient.js
const BASE_URL = '/api'; 

const parseJsonSafe = async (response) => {
  try {
    const data = await response.json();
    return data;
  } catch {
    return {};
  }
};

const request = async (path, options = {}) => {
  try {
    // Na Vercel, o fetch relativo (/api/...) já sabe que deve olhar para o próprio domínio
    const response = await fetch(`${BASE_URL}${path}`, options);
    
    if (response.ok) {
      return parseJsonSafe(response);
    }

    const errorData = await parseJsonSafe(response);
    throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
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
    // Se chamar get('products'), ele vai buscar em /api/products
    return request(`/${entity}`, { method: 'GET' });
  },

  save: async (entity, data) => {
    const token = localStorage.getItem('authToken');
    return request(`/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },
};