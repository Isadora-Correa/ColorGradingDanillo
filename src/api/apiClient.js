const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

export const apiClient = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Falha no login');
    }

    return response.json();
  },

  get: async (entity) => {
    const response = await fetch(`${API_BASE_URL}/${entity}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados para ${entity}`);
    }

    return response.json();
  },

  save: async (entity, data) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao salvar dados para ${entity}`);
    }

    return response.json();
  },
};
