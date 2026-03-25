// src/api/apiClient.js
const BASE_URL = '/api';

const parseJsonSafe = async (response, fallbackValue = []) => {
  try {
    const data = await response.json();
    return data ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const notifyAuthExpired = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:expired'));
  }
};

const request = async (path, options = {}) => {
  const {
    fallbackValue = [],
    throwOnError = false,
    ...fetchOptions
  } = options;

  try {
    const response = await fetch(`${BASE_URL}${path}`, fetchOptions);
    
    if (response.ok) {
      return await parseJsonSafe(response, fallbackValue);
    }

    const errorData = await parseJsonSafe(response, null);
    const message =
      errorData?.message ||
      `API: ${path} retornou status ${response.status}.`;

    if (response.status === 401 || response.status === 403) {
      notifyAuthExpired();
    }

    if (throwOnError) {
      throw new Error(message);
    }

    console.warn(`${message} Usando fallback.`);
    return fallbackValue;
    
  } catch (error) {
    if (throwOnError) {
      throw error;
    }

    console.error("Erro de conexão com a API:", error);
    return fallbackValue; 
  }
};

export const apiClient = {
  login: async (credentials) => {
    return request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      fallbackValue: null,
      throwOnError: true,
    });
  },

  get: async (entity) => {
    // Ex: get('products') busca em /api/products
    return request(`/${entity}`, { method: 'GET', fallbackValue: [] });
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
      fallbackValue: null,
      throwOnError: true,
    });
  },
};
