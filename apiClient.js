const API_BASE_URL = 'http://localhost:3001/api';

export const apiClient = {
  /**
   * Logs in the user.
   * @param {{username: string, password: string}} credentials 
   * @returns {Promise<{token: string}>}
   */
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no login');
    }
    return response.json();
  },
  /**
   * Fetches data for a given entity from the backend.
   * @param {string} entity - The name of the data entity (e.g., 'products', 'settings').
   * @returns {Promise<any>} The JSON data from the backend.
   */
  get: async (entity) => {
    const response = await fetch(`${API_BASE_URL}/${entity}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados para ${entity}`);
    }
    return response.json();
  },

  /**
   * Saves data for a given entity to the backend.
   * @param {string} entity - The name of the data entity.
   * @param {any} data - The data to be saved.
   * @returns {Promise<any>} The response from the backend.
   */
  save: async (entity, data) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ao salvar dados para ${entity}`);
    }
    return response.json();
  },
};