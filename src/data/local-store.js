const STORAGE_KEY = 'nava-colorist-data-v2';

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
      name_pt: 'Nava Color Academy',
      name_en: 'Color Grading Course',
      slug: 'course',
      description_pt: 'Torne-se um colorista profissional aprendendo com um profissional de renome internacional. VocÃª sairÃ¡ com portfÃ³lio pronto para o mercado de trabalho.',
      description_en: 'Become a professional colorist learning from an internationally renowned professional. You will graduate with a portfolio ready for the job market.',
      price_brl: 1997,
      price_usd: 299.99,
      image_url_pt: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%236366f1;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230ea5e9;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23g1)"/%3E%3Ctext x="400" y="300" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3EDaVinci Resolve%3C/text%3E%3C/svg%3E',
      image_url_en: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="g1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%236366f1;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230ea5e9;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23g1)"/%3E%3Ctext x="400" y="300" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3EDaVinci Resolve%3C/text%3E%3C/svg%3E',
      product_type: 'course',
      available: true,
      show_in_pt: true,
      show_in_en: true,
      buy_link_brl: 'https://example.com',
      buy_link_usd: 'https://example.com',
      order: 1,
      davinci_logo_url: '',
      course_highlights_pt: ['Mais de 300GB de material', 'TÃ©cnicas eficazes comprovadas', 'Usadas em comerciais e projetos long format', 'Suporte direto do instrutor'],
      course_highlights_en: ['Over 300GB of material', 'Proven effective techniques', 'Used in commercials and long format projects', 'Direct instructor support'],
    },
    {
      id: 'product-luts',
      name_pt: 'Nava LUTs',
      name_en: 'Nava LUTs',
      slug: 'luts',
      description_pt: 'ColeÃ§Ã£o de LUTs cinematogrÃ¡ficos profissionais criados por Nava, prontos para elevar suas cores.',
      description_en: 'Professional cinematic LUT collection created by Nava, ready to elevate your colors.',
      price_brl: 197,
      price_usd: 39,
      image_url_pt: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23g2)"/%3E%3Ctext x="400" y="300" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3ENava LUTs%3C/text%3E%3C/svg%3E',
      image_url_en: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="800" height="600" fill="url(%23g2)"/%3E%3Ctext x="400" y="300" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3ENava LUTs%3C/text%3E%3C/svg%3E',
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
      hero_title_pt: 'Aprenda Color Grading do Zero ao Pro',
      hero_title_en: 'Learn Color Grading: Beginner to Pro',
      hero_subtitle_pt: 'Treinamento pratico com um colorista de renome internacional',
      hero_subtitle_en: 'Hands-on training with a renowned international colorist',
      hero_features_pt: ['Aulas passo a passo', 'Projetos reais', 'Suporte direto'],
      hero_features_en: ['Step-by-step lessons', 'Real projects', 'Direct support'],
      hero_image_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1000" height="800"%3E%3Cdefs%3E%3ClinearGradient id="h1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3Cstop offset="50%25" style="stop-color:%230c6b8a;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23000000;stop-opacity:1" /%3E%3C/linearGradient%3E%3CradialGradient id="h2" cx="50%25" cy="50%25" r="50%25"%3E%3Cstop offset="0%25" style="stop-color:%2306b6d4;stop-opacity:0.4" /%3E%3Cstop offset="100%25" style="stop-color:%230c6b8a;stop-opacity:0" /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width="1000" height="800" fill="url(%23h1)"/%3E%3Ccircle cx="700" cy="200" r="250" fill="url(%23h2)"/%3E%3Ctext x="500" y="400" font-size="64" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3EColor Grading%3C/text%3E%3C/svg%3E',
      davinci_logo_url: '',
      career_description_pt: 'O curso que vai mudar sua carreira',
      career_description_en: 'The course that will change your career',
      instructor_name: 'Danilo Navarro',
      instructor_bio_pt: 'Nava e um colorista profissional que atua em grandes projetos internacionais, colaborando com diretores e fotografos em diferentes formatos, de comerciais high end a series e filmes.\n\nSeu trabalho e focado em usar a cor como ferramenta narrativa, aplicando workflows reais do mercado para criar imagens com identidade e impacto visual. Ao longo dos anos, assinou projetos para grandes marcas globais, alem de series internacionais, documentarios, curtas e filmes premiados.\n\nHoje, alem de atuar como Colorista Senior, Nava tambem compartilha sua experiencia com videomakers e coloristas que querem elevar o nivel do seu trabalho e dominar o Color Grading de forma criativa, estrategica e profissional.',
      instructor_bio_en: 'Nava is a professional colorist working on major international projects, collaborating with directors and cinematographers across different formats, from high-end commercials to series and films.\n\nHis work focuses on using color as a narrative tool, applying real market workflows to create images with identity and visual impact. Over the years, he has signed projects for major global brands, as well as international series, documentaries, shorts, and award-winning films.\n\nToday, in addition to working as a Senior Colorist, Nava also shares his experience with videomakers and colorists who want to elevate their work and master Color Grading in a creative, strategic, and professional way.',
      instructor_photo_url: '/nava.webp',
      instructor_showreel_url: 'https://player.vimeo.com/video/944559078?title=0&byline=0&portrait=0&badge=0',
      instructor_career_text_pt: 'Atuando no audiovisual em projetos internacionais.',
      instructor_career_text_en: 'Working in audiovisual with international projects.',
      instructor_clients_count_pt: '+ de 100 comerciais, series e filmes premiados',
      instructor_clients_count_en: '+ 100 award-winning commercials, series and films',
      instructor_students_count_pt: '+ de 150 alunos',
      instructor_students_count_en: '150+ students',
      available_languages: [
        { code: 'en', name: 'English', available: true },
        { code: 'pt', name: 'Portugues', available: true },
        { code: 'es', name: 'Espanol', available: true, auto_generated: true },
        { code: 'fr', name: 'Francais', available: true, auto_generated: true },
        { code: 'ar', name: 'Arabic', available: true, auto_generated: true }
      ],
    },
  ],
  modules: [
    {
      id: 'module-1',
      order: 1,
      title_pt: 'Fundamentos de Color Grading',
      title_en: 'Color Grading Fundamentals',
      description_pt: 'Aprenda os conceitos bÃ¡sicos de cor, espaÃ§os de cor, curvas e suas aplicaÃ§Ãµes prÃ¡ticas.',
      description_en: 'Learn the basics of color, color spaces, curves and their practical applications.',
      lessons_count: 12,
      duration_hours: 8,
      video_count: 15,
      project_count: 3,
    },
    {
      id: 'module-2',
      order: 2,
      title_pt: 'Workflows em DaVinci Resolve',
      title_en: 'DaVinci Resolve Workflows',
      description_pt: 'Workflows profissionais usando DaVinci Resolve, interface, atalhos e otimizaÃ§Ã£o.',
      description_en: 'Professional DaVinci Resolve workflows, interface, shortcuts and optimization.',
      lessons_count: 14,
      duration_hours: 10,
      video_count: 18,
      project_count: 4,
    },
    {
      id: 'module-3',
      order: 3,
      title_pt: 'CorreÃ§Ã£o vs. Criatividade',
      title_en: 'Correction vs. Creativity',
      description_pt: 'Domine a correÃ§Ã£o de cor e depois a criatividade com LUTs, matrizes e efeitos.',
      description_en: 'Master color correction and then creativity with LUTs, matrices and effects.',
      lessons_count: 16,
      duration_hours: 12,
      video_count: 20,
      project_count: 5,
    },
    {
      id: 'module-4',
      order: 4,
      title_pt: 'Casos Reais: Comerciais e SÃ©ries',
      title_en: 'Real Cases: Commercials & Series',
      description_pt: 'Projetos reais de comerciais e sÃ©ries. Veja como profissionais trabalham no dia a dia.',
      description_en: 'Real projects from commercials and series. See how professionals work daily.',
      lessons_count: 10,
      duration_hours: 9,
      video_count: 14,
      project_count: 3,
    },
  ],
  students: [
    {
      id: 'student-1',
      name: 'Carlos Santos',
      role_pt: 'Produtor de VÃ­deo',
      role_en: 'Video Producer',
      testimonial_pt: 'O curso mudou completamente minha forma de trabalhar com cor. Agora consigo entregar looks profissionais que meus clientes adoram.',
      testimonial_en: 'The course completely changed how I work with color. Now I can deliver professional looks that my clients love.',
      image_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="s1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234f46e5;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%235b21b6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="100" cy="100" r="100" fill="url(%23s1)"/%3E%3Ccircle cx="100" cy="70" r="25" fill="white"/%3E%3Cellipse cx="100" cy="130" rx="35" ry="45" fill="white"/%3E%3C/svg%3E',
      showreel_url: '',
      rating: 5,
      order: 1,
    },
    {
      id: 'student-2',
      name: 'Marina Costa',
      role_pt: 'Cinegrafista Freelancer',
      role_en: 'Freelance Cinematographer',
      testimonial_pt: 'Depois do curso, consegui aumentar meu faturamento em 300%. Os clientes querem meus projetos coloridos!',
      testimonial_en: 'After the course, I was able to increase my revenue by 300%. Clients want my colored projects!',
      image_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="s2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="100" cy="100" r="100" fill="url(%23s2)"/%3E%3Ccircle cx="100" cy="70" r="25" fill="white"/%3E%3Cellipse cx="100" cy="130" rx="35" ry="45" fill="white"/%3E%3C/svg%3E',
      showreel_url: '',
      rating: 5,
      order: 2,
    },
    {
      id: 'student-3',
      name: 'Pedro Oliveira',
      role_pt: 'Editor de VÃ­deo',
      role_en: 'Video Editor',
      testimonial_pt: 'NÃ£o sabia nem por onde comeÃ§ar com color grading. O curso Ã© claro, objetivo e muito prÃ¡tico.',
      testimonial_en: 'I didn\'t even know where to start with color grading. The course is clear, objective and very practical.',
      image_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="s3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2310b981;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230ea5e9;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="100" cy="100" r="100" fill="url(%23s3)"/%3E%3Ccircle cx="100" cy="70" r="25" fill="white"/%3E%3Cellipse cx="100" cy="130" rx="35" ry="45" fill="white"/%3E%3C/svg%3E',
      showreel_url: '',
      rating: 5,
      order: 3,
    },
  ],
  logos: [
    { id: 'logo-1', name: 'Brand A', logo_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80"%3E%3Crect width="150" height="80" fill="%23ffffff"/%3E%3Ctext x="75" y="40" font-size="16" font-weight="bold" fill="%234f46e5" text-anchor="middle" dominant-baseline="middle"%3EBRAND A%3C/text%3E%3C/svg%3E', order: 1 },
    { id: 'logo-2', name: 'Brand B', logo_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80"%3E%3Crect width="150" height="80" fill="%23ffffff"/%3E%3Ctext x="75" y="40" font-size="16" font-weight="bold" fill="%23ec4899" text-anchor="middle" dominant-baseline="middle"%3EBRAND B%3C/text%3E%3C/svg%3E', order: 2 },
    { id: 'logo-3', name: 'Brand C', logo_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80"%3E%3Crect width="150" height="80" fill="%23ffffff"/%3E%3Ctext x="75" y="40" font-size="16" font-weight="bold" fill="%2310b981" text-anchor="middle" dominant-baseline="middle"%3EBRAND C%3C/text%3E%3C/svg%3E', order: 3 },
    { id: 'logo-4', name: 'Brand D', logo_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80"%3E%3Crect width="150" height="80" fill="%23ffffff"/%3E%3Ctext x="75" y="40" font-size="16" font-weight="bold" fill="%238b5cf6" text-anchor="middle" dominant-baseline="middle"%3EBRAND D%3C/text%3E%3C/svg%3E', order: 4 },
    { id: 'logo-5', name: 'Brand E', logo_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="80"%3E%3Crect width="150" height="80" fill="%23ffffff"/%3E%3Ctext x="75" y="40" font-size="16" font-weight="bold" fill="%230ea5e9" text-anchor="middle" dominant-baseline="middle"%3EBRAND E%3C/text%3E%3C/svg%3E', order: 5 },
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      student_name: 'Carlos Santos',
      role_pt: 'Produtor de VÃ­deo',
      role_en: 'Video Producer',
      testimonial_pt: 'NÃ£o tenho dÃºvidas em recomendar esse curso. Transformou a forma como trabalho com cor.',
      testimonial_en: 'No doubt about recommending this course. It transformed how I work with color.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Cdefs%3E%3ClinearGradient id="t1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234f46e5;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%235b21b6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="50" cy="50" r="50" fill="url(%23t1)"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cellipse cx="50" cy="60" rx="20" ry="25" fill="white"/%3E%3C/svg%3E',
      order: 1,
    },
    {
      id: 'testimonial-2',
      student_name: 'Marina Costa',
      role_pt: 'Cinegrafista',
      role_en: 'Cinematographer',
      testimonial_pt: 'Voltei a estudar depois de 10 anos parado. O Nava tem um jeito de ensinar que facilita muito.',
      testimonial_en: 'I returned to study after 10 years out. Nava has a way of teaching that makes it very easy.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Cdefs%3E%3ClinearGradient id="t2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx="50" cy="50" r="50" fill="url(%23t2)"/%3E%3Ccircle cx="50" cy="35" r="15" fill="white"/%3E%3Cellipse cx="50" cy="60" rx="20" ry="25" fill="white"/%3E%3C/svg%3E',
      order: 2,
    },
    {
      id: 'testimonial-3',
      student_name: 'Pedro Oliveira',
      role_pt: 'Editor de VÃ­deo',
      role_en: 'Video Editor',
      testimonial_pt: 'Melhor investimento que fiz na minha carreira. Recomendo para todo mundo!',
      testimonial_en: 'Best investment I made in my career. I recommend it to everyone!',
      avatar_url: '',
      order: 3,
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question_pt: 'Qual Ã© o prÃ©-requisito para fazer o curso?',
      question_en: 'What are the prerequisites for taking the course?',
      answer_pt: 'NÃ£o Ã© necessÃ¡rio ter experiÃªncia anterior. O curso comeÃ§a do zero e leva vocÃª atÃ© nÃ­vel profissional.',
      answer_en: 'No prior experience necessary. The course starts from zero and takes you to professional level.',
      order: 1,
    },
    {
      id: 'faq-2',
      question_pt: 'Como funciona a licenÃ§a do DaVinci Resolve?',
      question_en: 'How does the DaVinci Resolve license work?',
      answer_pt: 'O DaVinci Resolve tem uma versÃ£o gratuita que Ã© mais que suficiente para aprender. A versÃ£o Studio tem mais ferramentas avanÃ§adas.',
      answer_en: 'DaVinci Resolve has a free version that\'s more than enough to learn. Studio version has more advanced tools.',
      order: 2,
    },
    {
      id: 'faq-3',
      question_pt: 'Por quanto tempo tenho acesso ao curso?',
      question_en: 'How long do I have access to the course?',
      answer_pt: 'Acesso vitalÃ­cio! Qualquer atualizaÃ§Ã£o do curso, vocÃª recebe automaticamente.',
      answer_en: 'Lifetime access! Any course updates, you receive automatically.',
      order: 3,
    },
    {
      id: 'faq-4',
      question_pt: 'Posso descarregar as aulas?',
      question_en: 'Can I download the lessons?',
      answer_pt: 'Sim, todos os vÃ­deos podem ser baixados para assistir offline.',
      answer_en: 'Yes, all videos can be downloaded to watch offline.',
      order: 4,
    },
    {
      id: 'faq-5',
      question_pt: 'E se eu nÃ£o gostar do curso?',
      question_en: 'What if I don\'t like the course?',
      answer_pt: 'Oferecemos garantia de 7 dias. Se nÃ£o ficar satisfeito, devolvemos seu dinheiro integralmente.',
      answer_en: 'We offer a 7-day guarantee. If you\'re not satisfied, we refund your money in full.',
      order: 5,
    },
  ],
  beforeAfter: [
    {
      id: 'before-after-1',
      title_pt: 'CorreÃ§Ã£o de Cinematic Look',
      title_en: 'Cinematic Look Correction',
      before_image: '',
      after_image: '',
      description_pt: 'Exemplo de color grading aplicado a uma cena de narrativa. Veja como a cor define o tom emocional.',
      description_en: 'Example of color grading applied to a narrative scene. See how color sets the emotional tone.',
      order: 1,
    },
    {
      id: 'before-after-2',
      title_pt: 'CorreÃ§Ã£o de Comercial',
      title_en: 'Commercial Correction',
      before_image: '',
      after_image: '',
      description_pt: 'Um exemplo de correÃ§Ã£o aplicada a um comercial de alta qualidade.',
      description_en: 'An example of correction applied to a high-quality commercial.',
      order: 2,
    },
    {
      id: 'before-after-3',
      title_pt: 'SÃ©rie Streaming',
      title_en: 'Streaming Series',
      before_image: '',
      after_image: '',
      description_pt: 'Workflow de color grading em um projeto de sÃ©rie para streaming.',
      description_en: 'Color grading workflow in a streaming series project.',
      order: 3,
    },
  ],
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

// Adiciona a funÃ§Ã£o saveAll para substituir uma coleÃ§Ã£o inteira (Ãºtil para o painel Admin)
export async function saveAll(collectionKey, dataArray) {
  const data = readStore();
  data[collectionKey] = deepClone(Array.isArray(dataArray) ? dataArray : []);
  writeStore(data);
  return deepClone(data[collectionKey]);
}

// TambÃ©m expÃµe saveAll dentro do objeto localStore para compatibilidade
localStore.saveAll = saveAll;

