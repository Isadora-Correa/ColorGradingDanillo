const BASE_URL = '/api';

/**
 * Tenta transformar a resposta em JSON. 
 * Se falhar, retorna um array vazio para evitar erros de .find() no Front-end.
 */
const parseJsonSafe = async (response) => {
  try {
    const data = await response.json();
    // Se a resposta for nula ou não for o que o componente espera, 
    // retornamos um fallback seguro (array vazio).
    return data || [];
  } catch {
    return [];
  }
};

const request = async (path, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    
    // Se a resposta for OK (200), processa o JSON
    if (response.ok) {
      return await parseJsonSafe(response);
    }

    // Se a Vercel retornar 404 ou 500, retornamos [] para o site não ficar branco
    console.warn(`API retornou status ${response.status} para ${path}. Usando fallback vazio.`);
    return [];
    
  } catch (error) {
    // Erro de rede (ex: sem internet ou API offline)
    console.error("Erro crítico na requisição:", error);
    return []; // Retorna lista vazia para o componente não crashar
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

  /**
   * get('products') buscará em /api/products
   * Se a API falhar, retornará [] e o erro 'products.find is not a function' sumirá.
   */
  get: async (entity) => {
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