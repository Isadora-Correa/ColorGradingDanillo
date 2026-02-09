import { localStore } from '@/data/local-store';

const createEntityApi = (collectionKey) => ({
  list: () => localStore.list(collectionKey),
  create: (payload) => localStore.create(collectionKey, payload),
  update: (id, payload) => localStore.update(collectionKey, id, payload),
  delete: (id) => localStore.remove(collectionKey, id),
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
