const STORAGE_KEY = 'nava-colorist-data-v1';

const defaultData = {
  settings: [
    {
      id: 'settings-1',
      site_name: 'Nava Colorist',
      logo_url: '',
      hero_video_url: '',
      hero_image_url: '',
    },
  ],
  products: [
    {
      id: 'product-course',
      name_pt: 'Curso de Color Grading',
      name_en: 'Color Grading Course',
      slug: 'course',
      description_pt: 'Treinamento completo de color grading.',
      description_en: 'Complete color grading training.',
      price_brl: 1497,
      price_usd: 299,
      image_url: '',
      product_type: 'course',
      available: true,
      show_in_pt: true,
      show_in_en: true,
      buy_link_brl: 'https://example.com',
      buy_link_usd: 'https://example.com',
      order: 1,
    },
    {
      id: 'product-luts',
      name_pt: 'Pacote de LUTs',
      name_en: 'LUTs Pack',
      slug: 'luts',
      description_pt: 'Colecao de LUTs cinematograficos.',
      description_en: 'Cinematic LUTs collection.',
      price_brl: 197,
      price_usd: 39,
      image_url: '',
      product_type: 'luts',
      available: true,
      show_in_pt: true,
      show_in_en: true,
      buy_link_brl: 'https://example.com',
      buy_link_usd: 'https://example.com',
      order: 2,
    },
  ],
  courseContent: [
    {
      id: 'course-content-1',
      hero_title_pt: 'Domine o Color Grading do zero',
      hero_title_en: 'Master Color Grading from scratch',
      hero_subtitle_pt: 'Um treinamento pratico para elevar seu nivel.',
      hero_subtitle_en: 'Hands-on training to level up your skills.',
      hero_features_pt: ['Aulas passo a passo', 'Projetos reais', 'Suporte direto'],
      hero_features_en: ['Step-by-step lessons', 'Real projects', 'Direct support'],
      hero_image_url: '',
      davinci_logo_url: '',
      career_description_pt: 'Aprenda a entregar looks profissionais e conquistar clientes.',
      career_description_en: 'Learn to deliver professional looks and win clients.',
      instructor_name: 'Danillo',
      instructor_bio_pt: 'Colorista com foco em cinema e publicidade.',
      instructor_bio_en: 'Colorist focused on cinema and advertising.',
      instructor_photo_url: '',
      instructor_showreel_url: '',
      available_languages: [],
    },
  ],
  modules: [
    {
      id: 'module-1',
      title_pt: 'Fundamentos',
      title_en: 'Fundamentals',
      description_pt: 'Ferramentas essenciais e fluxo de trabalho.',
      description_en: 'Core tools and workflow.',
      lessons_pt: ['Interface do DaVinci', 'Scopes e cores', 'Color balance'],
      lessons_en: ['DaVinci interface', 'Scopes and color', 'Color balance'],
      order: 1,
      show_in_en: true,
    },
  ],
  students: [],
  logos: [],
  testimonials: [],
  faqs: [],
  beforeAfter: [],
};

const deepClone = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const mergeData = (stored) => ({
  ...deepClone(defaultData),
  ...stored,
  settings: Array.isArray(stored?.settings) ? stored.settings : deepClone(defaultData.settings),
  products: Array.isArray(stored?.products) ? stored.products : deepClone(defaultData.products),
  courseContent: Array.isArray(stored?.courseContent) ? stored.courseContent : deepClone(defaultData.courseContent),
  modules: Array.isArray(stored?.modules) ? stored.modules : deepClone(defaultData.modules),
  students: Array.isArray(stored?.students) ? stored.students : deepClone(defaultData.students),
  logos: Array.isArray(stored?.logos) ? stored.logos : deepClone(defaultData.logos),
  testimonials: Array.isArray(stored?.testimonials) ? stored.testimonials : deepClone(defaultData.testimonials),
  faqs: Array.isArray(stored?.faqs) ? stored.faqs : deepClone(defaultData.faqs),
  beforeAfter: Array.isArray(stored?.beforeAfter) ? stored.beforeAfter : deepClone(defaultData.beforeAfter),
});

const readStore = () => {
  if (typeof window === 'undefined') {
    return deepClone(defaultData);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return deepClone(defaultData);
  }

  try {
    const parsed = JSON.parse(raw);
    return mergeData(parsed);
  } catch {
    return deepClone(defaultData);
  }
};

const writeStore = (data) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `local_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const list = async (collectionKey) => {
  const data = readStore();
  return deepClone(data[collectionKey] || []);
};

const create = async (collectionKey, payload) => {
  const data = readStore();
  const newItem = { id: createId(), ...payload };
  const next = [...(data[collectionKey] || []), newItem];
  data[collectionKey] = next;
  writeStore(data);
  return deepClone(newItem);
};

const update = async (collectionKey, id, payload) => {
  const data = readStore();
  const next = (data[collectionKey] || []).map((item) =>
    item.id === id ? { ...item, ...payload, id } : item
  );
  data[collectionKey] = next;
  writeStore(data);
  return deepClone(next.find((item) => item.id === id));
};

const remove = async (collectionKey, id) => {
  const data = readStore();
  data[collectionKey] = (data[collectionKey] || []).filter((item) => item.id !== id);
  writeStore(data);
  return { id };
};

const reset = async () => {
  writeStore(deepClone(defaultData));
  return deepClone(defaultData);
};

export const localStore = {
  list,
  create,
  update,
  remove,
  reset,
};
