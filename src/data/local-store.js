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
      description_pt: 'Torne-se um colorista profissional aprendendo com um profissional de renome internacional. Você sairá com portfólio pronto para o mercado de trabalho.',
      description_en: 'Become a professional colorist learning from an internationally renowned professional. You will graduate with a portfolio ready for the job market.',
      price_brl: 1997,
      price_usd: 397,
      image_url_pt: '/course/course-cover-pt.webp',
      image_url_en: '/course/course-cover-en.webp',
      detail_image_url_pt: '/course/course-detail-pt.webp',
      detail_image_url_en: '/course/course-detail-en.webp',
      product_type: 'course',
      available: true,
      show_in_pt: true,
      show_in_en: true,
      buy_link_brl: 'https://pay.hotmart.com/H99463968S?off=gwgzo4l7&checkoutMode=10',
      buy_link_usd: 'https://navacolorist.podia.com/nava-colorist-the-complete-color-grading-course/buy',
      order: 1,
      davinci_logo_url: '',
      course_highlights_pt: ['Mais de 300GB de material', 'Técnicas eficazes comprovadas', 'Usadas em comerciais e projetos long format', 'Suporte direto do instrutor'],
      course_highlights_en: ['Over 300GB of material', 'Proven effective techniques', 'Used in commercials and long format projects', 'Direct instructor support'],
    },
    {
      id: 'product-luts',
      name_pt: 'Nava LUTs',
      name_en: 'Nava LUTs',
      slug: 'luts',
      description_pt: 'Coleção de LUTs cinematográficos profissionais criados por Nava, prontos para elevar suas cores.',
      description_en: 'Professional cinematic LUT collection created by Nava, ready to elevate your colors.',
      price_brl: 347,
      price_usd: 69,
      image_url_pt: '/course/luts-cover.webp',
      image_url_en: '/course/luts-cover.webp',
      detail_image_url_pt: '/course/luts-detail.webp',
      detail_image_url_en: '/course/luts-detail.webp',
      product_type: 'luts',
      available: true,
      show_in_pt: true,
      show_in_en: true,
      buy_link_brl: 'https://pay.hotmart.com/J99218585O?off=5g3mlwoi',
      buy_link_usd: 'https://navacolorist.podia.com/nava-luts/buy',
      order: 2,
    },
  ],

  courseContent: [
    {
      id: 'course-content-1',
      hero_title_pt: 'Domine o Color Grading',
      hero_title_en: 'Master Color Grading',
      hero_subtitle_pt: 'Treinamento prático com um colorista de renome internacional',
      hero_subtitle_en: 'Hands-on training with a renowned international colorist',
      hero_features_pt: ['Aulas passo a passo', 'Projetos reais', 'Suporte direto'],
      hero_features_en: ['Step-by-step lessons', 'Real projects', 'Direct support'],
      hero_image_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1000" height="800"%3E%3Cdefs%3E%3ClinearGradient id="h1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3Cstop offset="50%25" style="stop-color:%230c6b8a;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23000000;stop-opacity:1" /%3E%3C/linearGradient%3E%3CradialGradient id="h2" cx="50%25" cy="50%25" r="50%25"%3E%3Cstop offset="0%25" style="stop-color:%2306b6d4;stop-opacity:0.4" /%3E%3Cstop offset="100%25" style="stop-color:%230c6b8a;stop-opacity:0" /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width="1000" height="800" fill="url(%23h1)"/%3E%3Ccircle cx="700" cy="200" r="250" fill="url(%23h2)"/%3E%3Ctext x="500" y="400" font-size="64" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle"%3EColor Grading%3C/text%3E%3C/svg%3E',
      davinci_logo_url: '',
      career_description_pt: 'O curso que vai mudar sua carreira',
      career_description_en: 'The course that will change your career',
      instructor_name: 'Danilo Navarro',
      instructor_bio_pt: 'Nava é um colorista profissional que atua em grandes projetos internacionais, colaborando com diretores e fotógrafos em diferentes formatos, de comerciais a séries e filmes.\n\nSeu trabalho é focado em usar a cor como ferramenta narrativa, aplicando workflows reais do mercado para criar imagens com identidade e impacto visual. Ao longo dos anos, assinou projetos para grandes marcas globais, além de séries internacionais, documentários, curtas e filmes premiados.\n\nHoje, além de atuar como Colorista Senior, Nava também compartilha sua experiência com videomakers e coloristas que querem elevar o nível do seu trabalho e dominar o Color Grading de forma criativa, estratégica e profissional.',
      instructor_bio_en: 'Nava is a professional colorist working on major international projects, collaborating with directors and DPs across a wide range of formats, from high-end commercials to TV series and feature films.\n\nHis work uses color as a narrative tool, applying real-world workflows to create images with strong identity and visual impact. Over the years, he has delivered projects for global brands, as well as international series, documentaries, short films, and award-winning productions.\n\nToday, alongside his work as a Senior Colorist, Nava shares his experience with filmmakers and colorists around the world who want to elevate their craft and master color grading creatively, strategically, and professionally.',
      instructor_photo_url: '/nava.webp',
      instructor_showreel_url: 'https://player.vimeo.com/video/944559078?title=0&byline=0&portrait=0&badge=0',
      instructor_career_text_pt: '+10 anos atuando no audiovisual em projetos internacionais',
      instructor_career_text_en: '+10 years! Working in audiovisual in international projects.',
      instructor_clients_count_pt: '+ de 100 comerciais, séries e filmes premiados',
      instructor_clients_count_en: '+ 100 award-winning commercials, series and films',
      instructor_students_count_pt: '+ de 150 alunos',
      instructor_students_count_en: '150+ students',
      instructor_socials: [
        { key: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/navacolorist/', icon: 'https://cdn.simpleicons.org/instagram/FFFFFF' },
        { key: 'vimeo', name: 'Vimeo', url: 'https://vimeo.com/dnava', icon: 'https://cdn.simpleicons.org/vimeo/FFFFFF' },
        { key: 'imdb', name: 'IMDb', url: 'https://www.imdb.com/name/nm15105370/?ref_=nv_sr_srsg_0_tt_0_nm_8_in_0_q_danilo%2520navarro', icon: 'https://cdn.simpleicons.org/imdb/FFFFFF' },
      ],
      languages_title_pt: 'Idiomas',
      languages_title_en: 'Languages',
      languages_highlight_pt: 'Disponíveis',
      languages_highlight_en: 'Available',
      languages_note_pt: 'Narração em português. Inglês com revisão profissional. Demais idiomas com dublagem em IA utilizando tecnologia líder de mercado.',
      languages_note_en: 'English voiceover professionally reviewed. Spanish, Arabic, and French are provided using industry-leading AI dubbing technology.',
      available_languages: [
        { code: 'PT', name_pt: 'Português', name_en: 'Portuguese', available: true, hasSubtitles: true },
        { code: 'EN', name_pt: 'Inglês', name_en: 'English', available: true, hasSubtitles: true },
        { code: 'ES', name_pt: 'Espanhol', name_en: 'Spanish', available: true, hasSubtitles: true },
        { code: 'FR', name_pt: 'Francês', name_en: 'French', available: true, hasSubtitles: true },
        { code: 'AR', name_pt: 'Árabe', name_en: 'Arabic', available: true, hasSubtitles: true }
      ],
      trailer_url: 'https://player.vimeo.com/video/1079126634?title=0&byline=0&portrait=0&badge=0',
      trailer_title_pt: 'Trailer do curso',
      trailer_title_en: 'Course trailer',
      trailer_title_line1_pt: 'Domine o Color Grading',
      trailer_title_line1_en: 'Master Color Grading',
      trailer_highlight_pt: 'do iniciante ao profissional',
      trailer_highlight_en: 'from beginner to professional',
      student_results_title_line1_pt: 'Resultados dos',
      student_results_title_line1_en: 'Student',
      student_results_highlight_pt: 'Alunos',
      student_results_highlight_en: 'Results',
      student_results_subtitle_pt: 'Veja o que nossos alunos conquistaram',
      student_results_subtitle_en: 'See what our students have achieved',
      client_logos_title_pt: '',
      client_logos_title_en: '',
      modules_title_line1_pt: 'Grade do',
      modules_title_line1_en: 'Course',
      modules_highlight_pt: 'Curso',
      modules_highlight_en: 'Curriculum',
      modules_subtitle_pt: 'Tudo o que você vai aprender',
      modules_subtitle_en: 'Everything you will learn',
      extra_content_title_line1_pt: 'Conteúdo Adicional',
      extra_content_title_line1_en: 'Additional Content',
      extra_content_highlight_pt: 'Exclusivo',
      extra_content_highlight_en: 'Exclusive',
      extra_content_subtitle_pt: 'Módulos extras com workflows de projetos reais.',
      extra_content_subtitle_en: 'Extra modules with real-project workflows.',
      extra_card_1_image_url: '/cards/fashionFilm.webp',
      extra_card_1_title_pt: 'Colorindo um Fashion Film de Londres',
      extra_card_1_title_en: 'Grading a London Fashion Film',
      extra_card_1_desc_pt: 'Acompanhe o workflow real de um colorista em um projeto para um cliente internacional. Do material bruto ao resultado final, Nava aplica na prática as técnicas ensinadas ao longo do curso em um fashion film completo.',
      extra_card_1_desc_en: 'Follow a real colorist workflow on a project for an international client. From raw footage to final result, Nava applies in practice the techniques taught throughout the course in a complete fashion film.',
      extra_card_1_note_pt: '',
      extra_card_1_note_en: '',
      extra_card_2_image_url: '/cards/filme.webp',
      extra_card_2_title_pt: 'Colorindo um Filme Internacional',
      extra_card_2_title_en: 'Grading an International Feature Film',
      extra_card_2_desc_pt: 'Acompanhe as principais etapas de color grading de um filme de 2 horas, com foco em organização, narrativa e workflow profissional para projetos de longo-formato.',
      extra_card_2_desc_en: 'Follow the key stages of grading a 2-hour film, with a focus on organization, narrative, and professional workflow for long-form projects.',
      extra_card_2_note_pt: 'em desenvolvimento, com aulas já disponíveis',
      extra_card_2_note_en: 'in development, with lessons already available',
      testimonials_title_line1_pt: 'Depoimentos',
      testimonials_title_line1_en: 'Testimonials',
      testimonials_title_prefix_pt: 'O que nossos',
      testimonials_title_prefix_en: 'What our',
      testimonials_highlight_pt: 'alunos dizem',
      testimonials_highlight_en: 'students say',
      certificate_title_prefix_pt: 'Finalize o curso e seja',
      certificate_title_prefix_en: 'Finish the course and get',
      certificate_highlight_pt: 'certificado pelo Nava Colorist',
      certificate_highlight_en: 'certified by Nava Colorist',
      certificate_image_url_pt: '/certificado.webp',
      certificate_image_url_en: '/certificado-ingles.webp',
      faq_title_line1_pt: 'Perguntas',
      faq_title_line1_en: 'Frequently Asked',
      faq_highlight_pt: 'Frequentes',
      faq_highlight_en: 'Questions',
      faq_subtitle_pt: '',
      faq_subtitle_en: '',
    },
  ],
  modules: [
    {
      id: 'module-1',
      order: 1,
      show_in_course: true,
      show_in_luts: false,
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
      show_in_course: true,
      show_in_luts: false,
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
      show_in_course: true,
      show_in_luts: false,
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
      show_in_course: true,
      show_in_luts: false,
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
      author_name: 'William Almeida',
      author_photo_url: '',
      text_pt: 'Muito obrigado por dividir esse conhecimento com seus alunos! Aprendendo demais com vc! Parabéns 👏🏽✨️',
      text_en: 'Muito obrigado por dividir esse conhecimento com seus alunos! Aprendendo demais com vc! Parabéns 👏🏽✨️',
      order: 0,
    },
    {
      id: 'testimonial-2',
      author_name: 'Opeu',
      author_photo_url: '',
      text_pt: 'Quase terminando seu curso, continua sendo o melhor que já comprei!',
      text_en: 'Quase terminando seu curso, continua sendo o melhor que já comprei!',
      order: 1,
    },
    {
      id: 'testimonial-3',
      author_name: 'Guilherme Shimojo',
      author_photo_url: '',
      text_pt: 'Melhor curso! Já terminei e vou revisar tudo. Cara, foi o único curto que assisti inteiro!',
      text_en: 'Melhor curso! Já terminei e vou revisar tudo. Cara, foi o único curto que assisti inteiro!',
      order: 2,
    },
    {
      id: 'testimonial-4',
      author_name: 'Eduardo Kunioshi',
      author_photo_url: '',
      text_pt: 'Eu tô fazendo o curso e cara, QUE CURSO BOM, eu não era iniciante, tinha conhecimento de várias coisas no davinci, mas vc entrou em detalhes que eu nunca tinha visto, parabéns pela qualidade',
      text_en: 'Eu tô fazendo o curso e cara, QUE CURSO BOM, eu não era iniciante, tinha conhecimento de várias coisas no davinci, mas vc entrou em detalhes que eu nunca tinha visto, parabéns pela qualidade',
      order: 3,
    },
    {
      id: 'testimonial-5',
      author_name: 'Clysmann',
      author_photo_url: '',
      text_pt: 'Cheguei em um resultado muito legal, com o estudo do curso.',
      text_en: 'Cheguei em um resultado muito legal, com o estudo do curso.',
      order: 4,
    },
    {
      id: 'testimonial-6',
      author_name: 'Gustavo Watanab',
      author_photo_url: '',
      text_pt: 'Sou aluno do curso e sinto que evolui bastante de um tempo pra cá, criei até coragem de começar a postar algumas coisas aqui no insta.',
      text_en: 'Sou aluno do curso e sinto que evolui bastante de um tempo pra cá, criei até coragem de começar a postar algumas coisas aqui no insta.',
      order: 5,
    },
    {
      id: 'testimonial-7',
      author_name: 'Victor Hugo',
      author_photo_url: '',
      text_pt: 'E parabéns pelo curso, tá muito completo! Ajudando demais!',
      text_en: 'E parabéns pelo curso, tá muito completo! Ajudando demais!',
      order: 6,
    },
    {
      id: 'testimonial-8',
      author_name: 'Igor Angelo',
      author_photo_url: '',
      text_pt: 'Material de alta qualidade hein. O curso tá bem completo.',
      text_en: 'Material de alta qualidade hein. O curso tá bem completo.',
      order: 7,
    },
    {
      id: 'testimonial-9',
      author_name: 'João Vitor',
      author_photo_url: '',
      text_pt: 'Curso muito bem organizado, lindo demais de se ver, realmente diferenciado, parabéns!',
      text_en: 'Curso muito bem organizado, lindo demais de se ver, realmente diferenciado, parabéns!',
      order: 8,
    },
    {
      id: 'testimonial-10',
      author_name: 'George Fonseca',
      author_photo_url: '',
      text_pt: 'Já estou no time. Adquiri o curso e estou devorando o conhecimento que vc disponibilizou',
      text_en: 'Já estou no time. Adquiri o curso e estou devorando o conhecimento que vc disponibilizou',
      order: 9,
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
      title_pt: 'Case 01',
      title_en: 'Case 01',
      show_in_course: true,
      show_in_luts: false,
      before_url: '/beforeafter/1.ANTES.jpg',
      during_url: '/beforeafter/1.DURANTE.jpg',
      after_url: '/beforeafter/1.DEPOIS.jpg',
      order: 0,
    },
    {
      id: 'before-after-2',
      title_pt: 'Case 02',
      title_en: 'Case 02',
      show_in_course: true,
      show_in_luts: false,
      before_url: '/beforeafter/3.ANTES.webp',
      during_url: '/beforeafter/3.DURANTE.webp',
      after_url: '/beforeafter/3.DEPOIS.webp',
      order: 1,
    },
    {
      id: 'before-after-3',
      title_pt: 'Case 03',
      title_en: 'Case 03',
      show_in_course: true,
      show_in_luts: false,
      before_url: '/beforeafter/4.ANTES.webp',
      during_url: '/beforeafter/4.DURANTE.webp',
      after_url: '/beforeafter/4.DEPOIS.webp',
      order: 2,
    },
    {
      id: 'before-after-lut-1',
      title_pt: 'LUT 01',
      title_en: 'LUT 01',
      show_in_course: false,
      show_in_luts: true,
      before_url: '/beforeafterLuts/1.LOG.webp',
      during_url: '/beforeafterLuts/1.REC.709.webp',
      after_url: '/beforeafterLuts/1.FINAL.webp',
      order: 3,
    },
    {
      id: 'before-after-lut-2',
      title_pt: 'LUT 02',
      title_en: 'LUT 02',
      show_in_course: false,
      show_in_luts: true,
      before_url: '/beforeafterLuts/2.LOG.webp',
      during_url: '/beforeafterLuts/2.REC.709.webp',
      after_url: '/beforeafterLuts/2.FINAL.webp',
      order: 4,
    },
    {
      id: 'before-after-lut-3',
      title_pt: 'LUT 03',
      title_en: 'LUT 03',
      show_in_course: false,
      show_in_luts: true,
      before_url: '/beforeafterLuts/3.LOG.webp',
      during_url: '/beforeafterLuts/3.REC.709.webp',
      after_url: '/beforeafterLuts/3.FINAL.webp',
      order: 5,
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
