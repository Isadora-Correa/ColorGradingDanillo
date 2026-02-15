import { localStore } from '@/data/local-store';

const createEntityApi = (collectionKey) => ({
  list: () => localStore.list(collectionKey),
  create: (payload) => localStore.create(collectionKey, payload),
  update: (id, payload) => localStore.update(collectionKey, id, payload),
  delete: (id) => localStore.remove(collectionKey, id),
  // Adicionando métodos get e save para compatibilidade com o que o resto do código pede
  get: () => localStore.list(collectionKey),
  save: (data) => localStore.saveAll?.(collectionKey, data) || localStore.create(collectionKey, data),
});

export const localClient = {
  entities: {
    SiteSettings: createEntityApi('settings'),
    Product: createEntityApi('products'),
    CourseContent: createEntityApi('courseContent'),
    CourseModule: createEntityApi('modules'),
    Student: createEntityApi('students'),
    ClientLogo: createEntityApi('logos'),
    Testimonial: createEntityApi('testimonials'),
    FAQ: createEntityApi('faqs'),
    BeforeAfter: createEntityApi('beforeAfter'),
  },
};

// --- O SEGREDO ESTÁ AQUI ---
// Criamos o objeto apiClient que o seu front-end está procurando
export const apiClient = {
  get: (key) => localStore.list(key),
  // Se for uma lista (array) substitui a coleção inteira, caso contrário cria um item
  save: (key, data) => Array.isArray(data) ? localStore.saveAll?.(key, data) : localStore.create(key, data),
};