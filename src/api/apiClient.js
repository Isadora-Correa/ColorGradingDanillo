const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
const dynamicHostname =
  typeof window !== 'undefined' && window.location?.hostname
    ? window.location.hostname
    : null;
const dynamicProtocol =
  typeof window !== 'undefined' && window.location?.protocol
    ? window.location.protocol
    : 'http:';
const dynamicApiPort = import.meta.env.VITE_API_PORT || '3002';
const dynamicBaseUrl = dynamicHostname
  ? `${dynamicProtocol}//${dynamicHostname}:${dynamicApiPort}/api`
  : null;

const candidateBaseUrls = Array.from(
  new Set(
    [
      dynamicBaseUrl,
      configuredBaseUrl,
      'http://localhost:3002/api',
      'http://localhost:3001/api',
    ].filter(Boolean)
  )
);

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const shouldFallbackByStatus = (status) => status === 404 || status === 405;
const isAuthError = (status) => status === 401 || status === 403;

const requestWithFallback = async (path, options) => {
  let lastNetworkError = null;
  const hasAuthHeader = Boolean(options?.headers?.Authorization);

  for (const baseUrl of candidateBaseUrls) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);
      if (response.ok) {
        return parseJsonSafe(response);
      }

      if (shouldFallbackByStatus(response.status)) {
        continue;
      }

      const errorData = await parseJsonSafe(response);

      if (hasAuthHeader && isAuthError(response.status) && typeof window !== 'undefined') {
        window.localStorage.removeItem('authToken');
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }

      const httpError = new Error(errorData.message || `Falha na requisicao: ${response.status}`);
      httpError.isHttpError = true;
      throw httpError;
    } catch (error) {
      if (error?.isHttpError) {
        throw error;
      }
      lastNetworkError = error;
    }
  }

  throw lastNetworkError || new Error('Nao foi possivel conectar com a API.');
};

export const apiClient = {
  login: async (credentials) => {
    return requestWithFallback('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  },

  get: async (entity) => {
    return requestWithFallback(`/${entity}`, {
      method: 'GET',
    });
  },

  save: async (entity, data) => {
    const token = localStorage.getItem('authToken');
    return requestWithFallback(`/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },
};
