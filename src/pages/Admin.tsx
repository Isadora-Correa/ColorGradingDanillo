import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Settings, Package, BookOpen, Users, MessageSquare, HelpCircle, Image, LayoutDashboard, LogOut, Plus, Trash2, Save, GripVertical, ArrowUp, ArrowDown, X } from 'lucide-react';

const panel = 'bg-[#0d1117] border-white/10 text-zinc-100';
const input = 'bg-zinc-900 border-white/15 text-zinc-100 placeholder:text-zinc-500 h-11';
const textarea = 'w-full rounded-md border border-white/15 bg-zinc-900 text-zinc-100 p-3 outline-none focus:border-white/30';
const btnPrimary = 'bg-white text-black hover:bg-zinc-200 font-semibold';
const btnOutline = 'border border-white/20 bg-transparent text-zinc-100 hover:bg-white/10';

const toLines = (v) => Array.isArray(v) ? v.join('\n') : '';
const fromLines = (v) => String(v || '').split('\n').map((s) => s.trim()).filter(Boolean);
const num = (v, d = 0) => Number.isFinite(Number(v)) ? Number(v) : d;
const id = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const toDataUrl = (file) => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file); });
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const CROP_PRESETS = [
  { value: 'original', label: 'Original', aspect: null },
  { value: 'landscape', label: '16:9', aspect: 16 / 9 },
  { value: 'square', label: '1:1', aspect: 1 },
  { value: 'portrait', label: '4:5', aspect: 4 / 5 },
];

const loadImageElement = (src) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

async function cropImageToDataUrl(src, options = {}) {
  const image = await loadImageElement(src);
  const sourceAspect = image.width / image.height;
  const targetAspect = options.aspect || sourceAspect;
  const zoom = clamp(Number(options.zoom) || 1, 1, 3);
  const offsetX = clamp(Number(options.offsetX) || 0, -100, 100) / 100;
  const offsetY = clamp(Number(options.offsetY) || 0, -100, 100) / 100;

  let cropWidth = image.width;
  let cropHeight = image.height;

  if (sourceAspect > targetAspect) {
    cropHeight = image.height / zoom;
    cropWidth = cropHeight * targetAspect;
  } else {
    cropWidth = image.width / zoom;
    cropHeight = cropWidth / targetAspect;
  }

  const maxX = Math.max(0, (image.width - cropWidth) / 2);
  const maxY = Math.max(0, (image.height - cropHeight) / 2);
  const sx = clamp((image.width - cropWidth) / 2 + offsetX * maxX, 0, image.width - cropWidth);
  const sy = clamp((image.height - cropHeight) / 2 + offsetY * maxY, 0, image.height - cropHeight);

  const longEdge = 1600;
  const outputWidth = cropWidth >= cropHeight ? longEdge : Math.round(longEdge * targetAspect);
  const outputHeight = cropWidth >= cropHeight ? Math.round(longEdge / targetAspect) : longEdge;

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Nao foi possivel preparar o recorte da imagem.');

  context.drawImage(image, sx, sy, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
  return canvas.toDataURL('image/jpeg', 0.92);
}

const DEFAULT_BEFORE_AFTER = [
  {
    id: 'default-case-1',
    title_pt: 'Case 01',
    title_en: 'Case 01',
    show_in_course: true,
    show_in_luts: false,
    order: 0,
    before_url: '/beforeafter/1.ANTES.webp',
    during_url: '/beforeafter/1.DURANTE.webp',
    after_url: '/beforeafter/1.DEPOIS.webp',
  },
  {
    id: 'default-case-2',
    title_pt: 'Case 02',
    title_en: 'Case 02',
    show_in_course: true,
    show_in_luts: false,
    order: 1,
    before_url: '/beforeafter/3.ANTES.webp',
    during_url: '/beforeafter/3.DURANTE.webp',
    after_url: '/beforeafter/3.DEPOIS.webp',
  },
  {
    id: 'default-case-3',
    title_pt: 'Case 03',
    title_en: 'Case 03',
    show_in_course: true,
    show_in_luts: false,
    order: 2,
    before_url: '/beforeafter/4.ANTES.webp',
    during_url: '/beforeafter/4.DURANTE.webp',
    after_url: '/beforeafter/4.DEPOIS.webp',
  },
  {
    id: 'default-lut-1',
    title_pt: 'LUT 01',
    title_en: 'LUT 01',
    show_in_course: false,
    show_in_luts: true,
    order: 3,
    before_url: '/beforeafterLuts/1.LOG.webp',
    during_url: '/beforeafterLuts/1.REC.709.webp',
    after_url: '/beforeafterLuts/1.FINAL.webp',
  },
  {
    id: 'default-lut-2',
    title_pt: 'LUT 02',
    title_en: 'LUT 02',
    show_in_course: false,
    show_in_luts: true,
    order: 4,
    before_url: '/beforeafterLuts/2.LOG.webp',
    during_url: '/beforeafterLuts/2.REC.709.webp',
    after_url: '/beforeafterLuts/2.FINAL.webp',
  },
  {
    id: 'default-lut-3',
    title_pt: 'LUT 03',
    title_en: 'LUT 03',
    show_in_course: false,
    show_in_luts: true,
    order: 5,
    before_url: '/beforeafterLuts/3.LOG.webp',
    during_url: '/beforeafterLuts/3.REC.709.webp',
    after_url: '/beforeafterLuts/3.FINAL.webp',
  },
];

const normalizeBeforeAfter = (item, index = 0) => ({
  id: item?.id || id(),
  title_pt: item?.title_pt || '',
  title_en: item?.title_en || '',
  order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
  show_in_course: item?.show_in_course !== false,
  show_in_luts: item?.show_in_luts === true,
  before_url: item?.before_url || item?.before_image_url || '',
  during_url: item?.during_url || item?.during_image_url || item?.before_url || item?.before_image_url || '',
  after_url: item?.after_url || item?.after_image_url || '',
});

const toBeforeAfterPayload = (item) => ({
  id: item?.id || id(),
  title_pt: item?.title_pt || '',
  title_en: item?.title_en || '',
  order: num(item?.order, 0),
  show_in_course: item?.show_in_course !== false,
  show_in_luts: item?.show_in_luts === true,
  before_url: item?.before_url || '',
  during_url: item?.during_url || '',
  after_url: item?.after_url || '',
  // compatibilidade
  before_image_url: item?.before_url || '',
  during_image_url: item?.during_url || '',
  after_image_url: item?.after_url || '',
});

const DEFAULT_MODULES = [
  { id: 'module-seed-1', show_in_course: true, show_in_luts: false, title_pt: 'Apresentação', title_en: 'Introduction', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Visão geral do curso e da jornada de aprendizado' }, { id: id(), title: 'Acesso ao Material do Curso' }, { id: id(), title: 'Grupo no Discord' }], order: 0 },
  { id: 'module-seed-2', show_in_course: true, show_in_luts: false, title_pt: 'Project Manager', title_en: 'Project Manager', lessons_count: 2, duration_hours: 1, topics: [{ id: id(), title: 'Como baixar o DaVinci Resolve' }, { id: id(), title: 'Configuração da Biblioteca e Database' }], order: 1 },
  { id: 'module-seed-3', show_in_course: true, show_in_luts: false, title_pt: 'Conform', title_en: 'Conform', lessons_count: 6, duration_hours: 1, topics: [{ id: id(), title: 'O que é Conform?' }, { id: id(), title: 'AAF' }, { id: id(), title: 'EDL' }, { id: id(), title: 'XML' }, { id: id(), title: 'Scene Detection' }, { id: id(), title: 'Conselhos Gerais' }], order: 2 },
  { id: 'module-seed-4', show_in_course: true, show_in_luts: false, title_pt: 'Personalização e Atalhos', title_en: 'Customization and Shortcuts', lessons_count: 1, duration_hours: 1, topics: [{ id: id(), title: 'Configurações essenciais antes de colorir' }], order: 3 },
  { id: 'module-seed-5', show_in_course: true, show_in_luts: false, title_pt: 'Interface do DaVinci Resolve', title_en: 'DaVinci Resolve Interface', lessons_count: 2, duration_hours: 1, topics: [{ id: id(), title: 'O essencial da aba Edit para Color Grading' }, { id: id(), title: 'O essencial da Aba Color' }], order: 4 },
  { id: 'module-seed-6', show_in_course: true, show_in_luts: false, title_pt: 'Gerenciamento de Cor: Básico', title_en: 'Color Management: Basic', lessons_count: 2, duration_hours: 1, topics: [{ id: id(), title: 'Fundamentos do Gerenciamento de Cor' }, { id: id(), title: 'Gerenciamento de Cor na Prática' }], order: 5 },
  { id: 'module-seed-7', show_in_course: true, show_in_luts: false, title_pt: 'Ferramentas Fundamentais do Color Grading', title_en: 'Fundamental Color Grading Tools', lessons_count: 7, duration_hours: 1, topics: [{ id: id(), title: 'Color Balance: Conceitos' }, { id: id(), title: 'Primaries' }, { id: id(), title: 'Scopes' }, { id: id(), title: 'Printer Lights' }, { id: id(), title: 'HDR Color Wheels' }, { id: id(), title: 'Color Matching com Parade' }, { id: id(), title: 'Color Matching com Vectorscope' }], order: 6 },
  { id: 'module-seed-8', show_in_course: true, show_in_luts: false, title_pt: 'Gerenciamento de Cor: Avançado', title_en: 'Color Management: Advanced', lessons_count: 5, duration_hours: 1, topics: [{ id: id(), title: 'Gerenciamento de Cor' }, { id: id(), title: 'ACES' }, { id: id(), title: 'Camera RAW' }, { id: id(), title: 'RCM' }, { id: id(), title: 'Gerenciamento de Cor a Nível de Nodes' }], order: 7 },
  { id: 'module-seed-9', show_in_course: true, show_in_luts: false, title_pt: 'Nodes e Workflow Avançado', title_en: 'Advanced Nodes and Workflow', lessons_count: 1, duration_hours: 1, topics: [{ id: id(), title: 'Nodes e Workflow Avançado na Prática' }], order: 8 },
  { id: 'module-seed-10', show_in_course: true, show_in_luts: false, title_pt: 'Ferramentas Secundárias', title_en: 'Secondary Tools', lessons_count: 9, duration_hours: 1, topics: [{ id: id(), title: 'Curves' }, { id: id(), title: 'Color Warper' }, { id: id(), title: 'Color Slice' }, { id: id(), title: 'Power Window' }, { id: id(), title: 'Qualifiers' }, { id: id(), title: 'Magic Mask' }, { id: id(), title: 'Keyframes' }, { id: id(), title: 'Noise Reduction' }, { id: id(), title: 'Color Checker' }], order: 9 },
  { id: 'module-seed-11', show_in_course: true, show_in_luts: false, title_pt: 'Tratamento de Pele / Skin Tones', title_en: 'Skin Treatment / Skin Tones', lessons_count: 8, duration_hours: 1, topics: [{ id: id(), title: 'Vectorscope: Revisão' }, { id: id(), title: 'Correção de Pele com Cor Subtrativa' }, { id: id(), title: 'Tratamento de Pele' }, { id: id(), title: 'Redução de Ruído' }, { id: id(), title: 'Glow' }, { id: id(), title: 'Tratamento de Pele e Face Refinement' }, { id: id(), title: 'Patch Replacer' }, { id: id(), title: 'Beauty' }], order: 10 },
  { id: 'module-seed-12', show_in_course: true, show_in_luts: false, title_pt: 'Color Balance e Color Matching', title_en: 'Color Balance and Color Matching', lessons_count: 1, duration_hours: 1, topics: [{ id: id(), title: 'Color Balance: Consolidação do Aprendizado' }], order: 11 },
  { id: 'module-seed-13', show_in_course: true, show_in_luts: false, title_pt: 'Criação de Look', title_en: 'Look Creation', lessons_count: 6, duration_hours: 1, topics: [{ id: id(), title: 'O que são LUTS?' }, { id: id(), title: 'Film Print Emulation (FPE)' }, { id: id(), title: 'Cineon Film Log' }, { id: id(), title: 'Grão de película' }, { id: id(), title: 'O que é Halation' }, { id: id(), title: 'Aplicação de Look com “Nava LUTS”' }], order: 12 },
  { id: 'module-seed-14', show_in_course: true, show_in_luts: false, title_pt: 'Projeto Prático 01', title_en: 'Practical Project 01', lessons_count: 2, duration_hours: 1, topics: [{ id: id(), title: 'Grading completo do início ao fim' }, { id: id(), title: 'Correção primária, secundária e look' }], order: 13 },
  { id: 'module-seed-15', show_in_course: true, show_in_luts: false, title_pt: 'Projeto Prático 02', title_en: 'Practical Project 02', lessons_count: 3, duration_hours: 1, topics: [{ id: id(), title: 'Continuação da timeline do Módulo 03' }, { id: id(), title: 'Grading completo de um novo material' }, { id: id(), title: 'Exercício de autonomia e tomada de decisão' }], order: 14 },
  { id: 'module-seed-16', show_in_course: true, show_in_luts: false, title_pt: 'Deliver e Conform Final', title_en: 'Final Deliver and Conform', lessons_count: 2, duration_hours: 1, topics: [{ id: id(), title: 'Exportação de Timeline: Formatos e Métodos' }, { id: id(), title: 'Handles e Exportação de Clips Individuais' }], order: 15 },
  { id: 'module-seed-17', show_in_en: false, show_in_course: true, show_in_luts: false, title_pt: 'Bônus: DaVinci Resolve 20', title_en: 'Bonus: DaVinci Resolve 20', lessons_count: 8, duration_hours: 1, topics: [{ id: id(), title: 'Atualizando o DaVinci Resolve' }, { id: id(), title: 'Chroma Warp: Introdução' }, { id: id(), title: 'Chroma Warp' }, { id: id(), title: 'Depth Map' }, { id: id(), title: 'Magic Mask com IA (V2)' }, { id: id(), title: 'Node Stack Layer' }, { id: id(), title: 'ProRes no Windows' }, { id: id(), title: 'ACES 2.0' }], order: 16 },
];

const DEFAULT_AVAILABLE_LANGUAGES = [
  { code: 'PT', name_pt: 'Português', name_en: 'Portuguese', available: true, hasSubtitles: true },
  { code: 'EN', name_pt: 'Inglês', name_en: 'English', available: true, hasSubtitles: true },
  { code: 'ES', name_pt: 'Espanhol', name_en: 'Spanish', available: true, hasSubtitles: true },
  { code: 'FR', name_pt: 'Francês', name_en: 'French', available: true, hasSubtitles: true },
  { code: 'AR', name_pt: 'Árabe', name_en: 'Arabic', available: true, hasSubtitles: true },
];

const DEFAULT_INSTRUCTOR_SOCIALS = [
  { key: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/navacolorist/', icon: 'https://cdn.simpleicons.org/instagram/FFFFFF' },
  { key: 'vimeo', name: 'Vimeo', url: 'https://vimeo.com/dnava', icon: 'https://cdn.simpleicons.org/vimeo/FFFFFF' },
  { key: 'imdb', name: 'IMDb', url: 'https://www.imdb.com/name/nm15105370/?ref_=nv_sr_srsg_0_tt_0_nm_8_in_0_q_danilo%2520navarro', icon: 'https://cdn.simpleicons.org/imdb/FFFFFF' },
];

const DEFAULT_EXTRA_CONTENT = [
  {
    image_url: '/cards/fashionFilm.webp',
    title_pt: 'Colorindo um Fashion Film de Londres',
    title_en: 'Grading a London Fashion Film',
    desc_pt: 'Acompanhe o workflow real de um colorista em um projeto para um cliente internacional. Do material bruto ao resultado final, Nava aplica na prática as técnicas ensinadas ao longo do curso em um fashion film completo.',
    desc_en: 'Follow a real colorist workflow on a project for an international client. From raw footage to final result, Nava applies in practice the techniques taught throughout the course in a complete fashion film.',
    note_pt: '',
    note_en: '',
  },
  {
    image_url: '/cards/filme.webp',
    title_pt: 'Colorindo um Filme Internacional',
    title_en: 'Grading an International Feature Film',
    desc_pt: 'Acompanhe as principais etapas de color grading de um filme de 2 horas, com foco em organização, narrativa e workflow profissional para projetos de longo-formato.',
    desc_en: 'Follow the key stages of grading a 2-hour film, with a focus on organization, narrative, and professional workflow for long-form projects.',
    note_pt: 'em desenvolvimento, com aulas já disponíveis',
    note_en: 'in development, with lessons already available',
  },
];

const normalizeAvailableLanguages = (items = []) =>
  (Array.isArray(items) ? items : [])
    .map((item, index) => ({
      id: item?.id || `lang-${index}`,
      code: String(item?.code || item?.flag || '').trim().toUpperCase(),
      name_pt: String(item?.name_pt || item?.namePt || item?.name || '').trim(),
      name_en: String(item?.name_en || item?.nameEn || item?.name || '').trim(),
      available: item?.available !== false,
      hasSubtitles: item?.hasSubtitles !== false,
    }))
    .filter((item) => item.code);

const normalizeInstructorSocials = (items = []) =>
  (Array.isArray(items) ? items : [])
    .map((item, index) => ({
      key: item?.key || `social-${index}`,
      name: String(item?.name || '').trim(),
      url: String(item?.url || '').trim(),
      icon: String(item?.icon || '').trim(),
    }))
    .filter((item) => item.name && item.url);

const COURSE_CONTENT_FALLBACK = {
  id: 'main_content',
  hero_title_pt: 'Domine o Color Grading',
  hero_title_en: 'Master Color Grading',
  hero_subtitle_pt: 'O curso definitivo de Color Grading com DaVinci Resolve que vai transformar a qualidade dos seus vídeos.',
  hero_subtitle_en: 'The definitive Color Grading course with DaVinci Resolve that will transform the quality of your videos.',
  hero_image_url: '',
  instructor_name: 'Danilo Navarro',
  instructor_bio_pt:
    'Nava é um colorista profissional que atua em grandes projetos internacionais, colaborando com diretores e fotógrafos em diferentes formatos, de comerciais a séries e filmes.\n\nSeu trabalho é focado em usar a cor como ferramenta narrativa, aplicando workflows reais do mercado para criar imagens com identidade e impacto visual. Ao longo dos anos, assinou projetos para grandes marcas globais, além de séries internacionais, documentários, curtas e filmes premiados.\n\nHoje, além de atuar como Colorista Senior, Nava também compartilha sua experiência com videomakers e coloristas que querem elevar o nível do seu trabalho e dominar o Color Grading de forma criativa, estratégica e profissional.',
  instructor_bio_en:
    'Nava is a professional colorist working on major international projects, collaborating with directors and cinematographers across formats, from high-end commercials to series and films.\n\nHis work uses color as a narrative tool, applying real market workflows to create images with identity and visual impact. Over the years, he has delivered projects for global brands, as well as international series, documentaries, shorts and award-winning films.\n\nToday, in addition to working as a Senior Colorist, Nava shares his experience with videomakers and colorists who want to raise the level of their work and master Color Grading creatively, strategically and professionally.',
  instructor_photo_url: '/nava.webp',
  instructor_showreel_url: 'https://player.vimeo.com/video/944559078?title=0&byline=0&portrait=0&badge=0',
  instructor_career_text_pt: '+10 anos atuando no audiovisual em projetos internacionais',
  instructor_career_text_en: '+10 years! Working in audiovisual in international projects.',
  instructor_students_count_pt: '+ de 150 alunos',
  instructor_students_count_en: '150+ students',
  instructor_clients_count_pt: '+ de 100 comerciais, séries e filmes premiados',
  instructor_clients_count_en: '100+ award-winning commercials, series and films',
  instructor_socials: DEFAULT_INSTRUCTOR_SOCIALS,
  languages_title_pt: 'Idiomas',
  languages_title_en: 'Languages',
  languages_highlight_pt: 'Disponíveis',
  languages_highlight_en: 'Available',
  languages_note_pt: 'Narração em português. Inglês com revisão profissional. Demais idiomas com dublagem em IA utilizando tecnologia líder de mercado.',
  languages_note_en: 'English voiceover professionally reviewed. Spanish, Arabic, and French are provided using industry-leading AI dubbing technology.',
  available_languages: DEFAULT_AVAILABLE_LANGUAGES,
  trailer_url: 'https://player.vimeo.com/video/1079126634?title=0&byline=0&portrait=0&badge=0',
  trailer_title_pt: 'Trailer do curso',
  trailer_title_en: 'Course trailer',
  trailer_title_line1_pt: 'Domine o Color Grading',
  trailer_title_line1_en: 'Master Color Grading',
  trailer_highlight_pt: 'do iniciante ao profissional',
  trailer_highlight_en: 'from beginner to professional',
  highlights_title_pt: 'Conheça o curso que vai trazer COR para sua carreira.',
  highlights_title_en: 'Discover the course that brings COLOR to your career.',
  highlights_title_line1_pt: 'Conheça o curso que vai trazer',
  highlights_title_line1_en: 'Discover the course that brings',
  highlights_title_line2_pt: 'para sua carreira.',
  highlights_title_line2_en: 'to your career.',
  highlight_1_image_url: '/1.1.1_1.1.1.webp',
  highlight_1_title_pt: 'Feito para tornar você um colorista profissional com resultados',
  highlight_1_title_en: 'Built to turn you into a professional colorist with real results',
  highlight_1_desc_pt: 'Um curso robusto do básico ao avançado, com técnicas aplicadas no mercado internacional.',
  highlight_1_desc_en: 'A robust course from fundamentals to advanced, with techniques used in the international market.',
  highlight_2_image_url: '/1.15.1_1.15.1.webp',
  highlight_2_title_pt: 'Seu Portfólio Masterpiece Garantido',
  highlight_2_title_en: 'Your Masterpiece Portfolio Guaranteed',
  highlight_2_desc_pt: 'Ao decorrer do curso, vamos colorir dois projetos inteiros do início ao fim.',
  highlight_2_desc_en: 'Throughout the course, we grade two complete projects from start to finish.',
  highlight_3_image_url: '/1.6.1_1.6.1.webp',
  highlight_3_title_pt: 'Mais de 300GB de material bruto gratuito',
  highlight_3_title_en: 'Over 300GB of free raw practice material',
  highlight_3_desc_pt: 'Incluindo B-Roll e imagens para prática real de color grading.',
  highlight_3_desc_en: 'Including B-roll and footage for real-world color grading practice.',
  highlight_4_image_url: '/1.8.1_1.8.1.webp',
  highlight_4_title_pt: 'Acesso Vitalício',
  highlight_4_title_en: 'Lifetime Access',
  highlight_4_desc_pt: 'Uma vez seu, sempre seu. Seu guia de color grading disponível sempre que você precisar.',
  highlight_4_desc_en: 'Once it is yours, it is always yours. Your color grading guide is available whenever you need it.',
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
  extra_card_1_image_url: DEFAULT_EXTRA_CONTENT[0].image_url,
  extra_card_1_title_pt: DEFAULT_EXTRA_CONTENT[0].title_pt,
  extra_card_1_title_en: DEFAULT_EXTRA_CONTENT[0].title_en,
  extra_card_1_desc_pt: DEFAULT_EXTRA_CONTENT[0].desc_pt,
  extra_card_1_desc_en: DEFAULT_EXTRA_CONTENT[0].desc_en,
  extra_card_1_note_pt: DEFAULT_EXTRA_CONTENT[0].note_pt,
  extra_card_1_note_en: DEFAULT_EXTRA_CONTENT[0].note_en,
  extra_card_2_image_url: DEFAULT_EXTRA_CONTENT[1].image_url,
  extra_card_2_title_pt: DEFAULT_EXTRA_CONTENT[1].title_pt,
  extra_card_2_title_en: DEFAULT_EXTRA_CONTENT[1].title_en,
  extra_card_2_desc_pt: DEFAULT_EXTRA_CONTENT[1].desc_pt,
  extra_card_2_desc_en: DEFAULT_EXTRA_CONTENT[1].desc_en,
  extra_card_2_note_pt: DEFAULT_EXTRA_CONTENT[1].note_pt,
  extra_card_2_note_en: DEFAULT_EXTRA_CONTENT[1].note_en,
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
};

const normalizeCourseContent = (value) => {
  const source = Array.isArray(value) ? (value[0] || {}) : (value || {});
  const merged = { ...COURSE_CONTENT_FALLBACK, ...source };
  const mergedTitlePt =
    String(merged?.highlights_title_pt || '').trim() ||
    [merged?.highlights_title_line1_pt, merged?.highlights_title_line2_pt].filter(Boolean).join(' ').trim();
  const mergedTitleEn =
    String(merged?.highlights_title_en || '').trim() ||
    [merged?.highlights_title_line1_en, merged?.highlights_title_line2_en].filter(Boolean).join(' ').trim();
  return {
    id: merged?.id || 'course-content-main',
    hero_title_pt: String(merged?.hero_title_pt || '').trim(),
    hero_title_en: String(merged?.hero_title_en || '').trim(),
    hero_subtitle_pt: String(merged?.hero_subtitle_pt || '').trim(),
    hero_subtitle_en: String(merged?.hero_subtitle_en || '').trim(),
    hero_image_url: merged?.hero_image_url || '',
    instructor_name: String(merged?.instructor_name || '').trim(),
    instructor_bio_pt: String(merged?.instructor_bio_pt || '').trim(),
    instructor_bio_en: String(merged?.instructor_bio_en || '').trim(),
    instructor_photo_url: merged?.instructor_photo_url || '',
    instructor_showreel_url: String(merged?.instructor_showreel_url || '').trim(),
    instructor_career_text_pt: String(merged?.instructor_career_text_pt || '').trim(),
    instructor_career_text_en: String(merged?.instructor_career_text_en || '').trim(),
    instructor_students_count_pt: String(merged?.instructor_students_count_pt || '').trim(),
    instructor_students_count_en: String(merged?.instructor_students_count_en || '').trim(),
    instructor_clients_count_pt: String(merged?.instructor_clients_count_pt || '').trim(),
    instructor_clients_count_en: String(merged?.instructor_clients_count_en || '').trim(),
    instructor_socials: normalizeInstructorSocials(merged?.instructor_socials || COURSE_CONTENT_FALLBACK.instructor_socials),
    languages_title_pt: String(merged?.languages_title_pt || '').trim(),
    languages_title_en: String(merged?.languages_title_en || '').trim(),
    languages_highlight_pt: String(merged?.languages_highlight_pt || '').trim(),
    languages_highlight_en: String(merged?.languages_highlight_en || '').trim(),
    languages_note_pt: String(merged?.languages_note_pt || '').trim(),
    languages_note_en: String(merged?.languages_note_en || '').trim(),
    available_languages: normalizeAvailableLanguages(merged?.available_languages || COURSE_CONTENT_FALLBACK.available_languages),
    trailer_url: String(merged?.trailer_url || '').trim(),
    trailer_title_pt: String(merged?.trailer_title_pt || '').trim(),
    trailer_title_en: String(merged?.trailer_title_en || '').trim(),
    trailer_title_line1_pt: String(merged?.trailer_title_line1_pt || '').trim(),
    trailer_title_line1_en: String(merged?.trailer_title_line1_en || '').trim(),
    trailer_highlight_pt: String(merged?.trailer_highlight_pt || '').trim(),
    trailer_highlight_en: String(merged?.trailer_highlight_en || '').trim(),
    highlights_title_pt: mergedTitlePt,
    highlights_title_en: mergedTitleEn,
    highlights_title_line1_pt: String(merged?.highlights_title_line1_pt || '').trim(),
    highlights_title_line1_en: String(merged?.highlights_title_line1_en || '').trim(),
    highlights_title_line2_pt: String(merged?.highlights_title_line2_pt || '').trim(),
    highlights_title_line2_en: String(merged?.highlights_title_line2_en || '').trim(),
    highlight_1_image_url: merged?.highlight_1_image_url || '',
    highlight_1_title_pt: String(merged?.highlight_1_title_pt || '').trim(),
    highlight_1_title_en: String(merged?.highlight_1_title_en || '').trim(),
    highlight_1_desc_pt: String(merged?.highlight_1_desc_pt || '').trim(),
    highlight_1_desc_en: String(merged?.highlight_1_desc_en || '').trim(),
    highlight_2_image_url: merged?.highlight_2_image_url || '',
    highlight_2_title_pt: String(merged?.highlight_2_title_pt || '').trim(),
    highlight_2_title_en: String(merged?.highlight_2_title_en || '').trim(),
    highlight_2_desc_pt: String(merged?.highlight_2_desc_pt || '').trim(),
    highlight_2_desc_en: String(merged?.highlight_2_desc_en || '').trim(),
    highlight_3_image_url: merged?.highlight_3_image_url || '',
    highlight_3_title_pt: String(merged?.highlight_3_title_pt || '').trim(),
    highlight_3_title_en: String(merged?.highlight_3_title_en || '').trim(),
    highlight_3_desc_pt: String(merged?.highlight_3_desc_pt || '').trim(),
    highlight_3_desc_en: String(merged?.highlight_3_desc_en || '').trim(),
    highlight_4_image_url: merged?.highlight_4_image_url || '',
    highlight_4_title_pt: String(merged?.highlight_4_title_pt || '').trim(),
    highlight_4_title_en: String(merged?.highlight_4_title_en || '').trim(),
    highlight_4_desc_pt: String(merged?.highlight_4_desc_pt || '').trim(),
    highlight_4_desc_en: String(merged?.highlight_4_desc_en || '').trim(),
    student_results_title_line1_pt: String(merged?.student_results_title_line1_pt || '').trim(),
    student_results_title_line1_en: String(merged?.student_results_title_line1_en || '').trim(),
    student_results_highlight_pt: String(merged?.student_results_highlight_pt || '').trim(),
    student_results_highlight_en: String(merged?.student_results_highlight_en || '').trim(),
    student_results_subtitle_pt: String(merged?.student_results_subtitle_pt || '').trim(),
    student_results_subtitle_en: String(merged?.student_results_subtitle_en || '').trim(),
    client_logos_title_pt: String(merged?.client_logos_title_pt || '').trim(),
    client_logos_title_en: String(merged?.client_logos_title_en || '').trim(),
    modules_title_line1_pt: String(merged?.modules_title_line1_pt || '').trim(),
    modules_title_line1_en: String(merged?.modules_title_line1_en || '').trim(),
    modules_highlight_pt: String(merged?.modules_highlight_pt || '').trim(),
    modules_highlight_en: String(merged?.modules_highlight_en || '').trim(),
    modules_subtitle_pt: String(merged?.modules_subtitle_pt || '').trim(),
    modules_subtitle_en: String(merged?.modules_subtitle_en || '').trim(),
    extra_content_title_line1_pt: String(merged?.extra_content_title_line1_pt || '').trim(),
    extra_content_title_line1_en: String(merged?.extra_content_title_line1_en || '').trim(),
    extra_content_highlight_pt: String(merged?.extra_content_highlight_pt || '').trim(),
    extra_content_highlight_en: String(merged?.extra_content_highlight_en || '').trim(),
    extra_content_subtitle_pt: String(merged?.extra_content_subtitle_pt || '').trim(),
    extra_content_subtitle_en: String(merged?.extra_content_subtitle_en || '').trim(),
    extra_card_1_image_url: merged?.extra_card_1_image_url || '',
    extra_card_1_title_pt: String(merged?.extra_card_1_title_pt || '').trim(),
    extra_card_1_title_en: String(merged?.extra_card_1_title_en || '').trim(),
    extra_card_1_desc_pt: String(merged?.extra_card_1_desc_pt || '').trim(),
    extra_card_1_desc_en: String(merged?.extra_card_1_desc_en || '').trim(),
    extra_card_1_note_pt: String(merged?.extra_card_1_note_pt || '').trim(),
    extra_card_1_note_en: String(merged?.extra_card_1_note_en || '').trim(),
    extra_card_2_image_url: merged?.extra_card_2_image_url || '',
    extra_card_2_title_pt: String(merged?.extra_card_2_title_pt || '').trim(),
    extra_card_2_title_en: String(merged?.extra_card_2_title_en || '').trim(),
    extra_card_2_desc_pt: String(merged?.extra_card_2_desc_pt || '').trim(),
    extra_card_2_desc_en: String(merged?.extra_card_2_desc_en || '').trim(),
    extra_card_2_note_pt: String(merged?.extra_card_2_note_pt || '').trim(),
    extra_card_2_note_en: String(merged?.extra_card_2_note_en || '').trim(),
    testimonials_title_line1_pt: String(merged?.testimonials_title_line1_pt || '').trim(),
    testimonials_title_line1_en: String(merged?.testimonials_title_line1_en || '').trim(),
    testimonials_title_prefix_pt: String(merged?.testimonials_title_prefix_pt || '').trim(),
    testimonials_title_prefix_en: String(merged?.testimonials_title_prefix_en || '').trim(),
    testimonials_highlight_pt: String(merged?.testimonials_highlight_pt || '').trim(),
    testimonials_highlight_en: String(merged?.testimonials_highlight_en || '').trim(),
    certificate_title_prefix_pt: String(merged?.certificate_title_prefix_pt || '').trim(),
    certificate_title_prefix_en: String(merged?.certificate_title_prefix_en || '').trim(),
    certificate_highlight_pt: String(merged?.certificate_highlight_pt || '').trim(),
    certificate_highlight_en: String(merged?.certificate_highlight_en || '').trim(),
    certificate_image_url_pt: merged?.certificate_image_url_pt || '',
    certificate_image_url_en: merged?.certificate_image_url_en || '',
    faq_title_line1_pt: String(merged?.faq_title_line1_pt || '').trim(),
    faq_title_line1_en: String(merged?.faq_title_line1_en || '').trim(),
    faq_highlight_pt: String(merged?.faq_highlight_pt || '').trim(),
    faq_highlight_en: String(merged?.faq_highlight_en || '').trim(),
    faq_subtitle_pt: String(merged?.faq_subtitle_pt || '').trim(),
    faq_subtitle_en: String(merged?.faq_subtitle_en || '').trim(),
  };
};

const normalizeModule = (item, index = 0) => {
  const topicsPt = [
    ...(Array.isArray(item?.topics_pt) ? item.topics_pt : []),
    ...(Array.isArray(item?.lessons_pt) ? item.lessons_pt : []),
  ]
    .map((title) => String(title || '').trim())
    .filter(Boolean);
  const topicsEn = [
    ...(Array.isArray(item?.topics_en) ? item.topics_en : []),
    ...(Array.isArray(item?.lessons_en) ? item.lessons_en : []),
  ]
    .map((title) => String(title || '').trim())
    .filter(Boolean);
  const fallbackTopics =
    Array.isArray(item?.topics)
      ? item.topics
          .map((t) => (typeof t === 'string' ? t : t?.title))
          .map((title) => String(title || '').trim())
          .filter(Boolean)
      : [];
  const normalizedTopicsPt = topicsPt.length > 0 ? topicsPt : fallbackTopics;
  const normalizedTopicsEn = topicsEn.length > 0 ? topicsEn : fallbackTopics;

  return {
    ...item,
    id: item?.id || id(),
    show_in_en: item?.show_in_en !== false,
    show_in_course: item?.show_in_course !== false,
    show_in_luts: item?.show_in_luts === true,
    title_pt: String(item?.title_pt || item?.name_pt || `Modulo ${index + 1}`).trim(),
    title_en: String(item?.title_en || item?.name_en || item?.title_pt || `Module ${index + 1}`).trim(),
    description_pt: String(item?.description_pt || '').trim(),
    description_en: String(item?.description_en || '').trim(),
    lessons_count: Math.max(0, num(item?.lessons_count, Math.max(normalizedTopicsPt.length, normalizedTopicsEn.length))),
    duration_hours: Math.max(0, num(item?.duration_hours, 0)),
    topics_pt: normalizedTopicsPt,
    topics_en: normalizedTopicsEn,
    // compatibilidade para telas antigas
    topics: normalizedTopicsPt.map((title) => ({ id: id(), title })),
    lessons_pt: normalizedTopicsPt,
    lessons_en: normalizedTopicsEn,
    order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
  };
};

const toModulePayload = (item, index) => ({
  id: item?.id || id(),
  show_in_en: item?.show_in_en !== false,
  show_in_course: item?.show_in_course !== false,
  show_in_luts: item?.show_in_luts === true,
  title_pt: String(item?.title_pt || '').trim(),
  title_en: String(item?.title_en || '').trim(),
  description_pt: String(item?.description_pt || '').trim(),
  description_en: String(item?.description_en || '').trim(),
  lessons_count: Math.max(0, num(item?.lessons_count, 0)),
  duration_hours: Math.max(0, num(item?.duration_hours, 0)),
  topics_pt: Array.isArray(item?.topics_pt) ? item.topics_pt.map((x) => String(x || '').trim()).filter(Boolean) : [],
  topics_en: Array.isArray(item?.topics_en) ? item.topics_en.map((x) => String(x || '').trim()).filter(Boolean) : [],
  lessons_pt: Array.isArray(item?.topics_pt) ? item.topics_pt.map((x) => String(x || '').trim()).filter(Boolean) : [],
  lessons_en: Array.isArray(item?.topics_en) ? item.topics_en.map((x) => String(x || '').trim()).filter(Boolean) : [],
  topics: Array.isArray(item?.topics_pt)
    ? item.topics_pt.map((title) => ({ id: id(), title: String(title || '').trim() })).filter((t) => t.title)
    : [],
  order: index,
});

function H({ title, desc, icon: Icon }) {
  return <div className="mb-4"><div className="flex items-center gap-2 mb-1">{Icon ? <Icon className="w-5 h-5" /> : null}<h2 className="text-xl sm:text-2xl font-bold">{title}</h2></div><p className="text-zinc-400 text-sm">{desc}</p></div>;
}

function ReorderButtons({ index, total, onMove, disabled = false }) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        className={`${btnOutline} h-9 px-3`}
        onClick={() => onMove(index - 1)}
        disabled={disabled || index <= 0}
        aria-label="Mover para cima"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        className={`${btnOutline} h-9 px-3`}
        onClick={() => onMove(index + 1)}
        disabled={disabled || index >= total - 1}
        aria-label="Mover para baixo"
      >
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
}

function F({ label, ...props }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><Input className={input} {...props} /></div>;
}

function T({ label, value, onChange, rows = 3 }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><textarea rows={rows} value={value || ''} onChange={onChange} className={textarea} /></div>;
}

function BI({ label, pt, en, setPt, setEn }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><F label="PT" value={pt || ''} onChange={(e) => setPt(e.target.value)} /><F label="EN" value={en || ''} onChange={(e) => setEn(e.target.value)} /></div></div>;
}

function BT({ label, pt, en, setPt, setEn, rows = 3 }) {
  return <div className="space-y-2"><Label className="text-zinc-300">{label}</Label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><T label="PT" value={pt || ''} onChange={(e) => setPt(e.target.value)} rows={rows} /><T label="EN" value={en || ''} onChange={(e) => setEn(e.target.value)} rows={rows} /></div></div>;
}

function ImageCropModal({ open, source, label, cropOptions, onClose, onConfirm }) {
  const availablePresets = Array.isArray(cropOptions?.presets) && cropOptions.presets.length > 0
    ? cropOptions.presets
    : CROP_PRESETS;
  const initialPreset = cropOptions?.defaultPreset || availablePresets[0]?.value || CROP_PRESETS[0].value;
  const [preset, setPreset] = useState(initialPreset);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPreset(initialPreset);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setSaving(false);
  }, [initialPreset, open, source]);

  if (!open || !source) return null;

  const currentPreset = availablePresets.find((item) => item.value === preset) || availablePresets[0] || CROP_PRESETS[0];
  const previewAspect = currentPreset.aspect || 16 / 9;

  const handleConfirm = async () => {
    setSaving(true);
    try {
      const cropped = await cropImageToDataUrl(source, {
        aspect: currentPreset.aspect,
        zoom,
        offsetX,
        offsetY,
      });
      onConfirm(cropped);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0b1016] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Recortar imagem</h3>
            <p className="text-sm text-zinc-400">{label}</p>
          </div>
          <Button type="button" className={`${btnOutline} h-10 px-3`} onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
              <div
                className="relative mx-auto w-full max-w-3xl overflow-hidden bg-black"
                style={{ aspectRatio: String(previewAspect) }}
              >
                <img
                  src={source}
                  alt={label}
                  className="h-full w-full object-cover"
                  style={{
                    transform: `scale(${zoom}) translate(${offsetX / zoom}%, ${offsetY / zoom}%)`,
                    transformOrigin: 'center center',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 border border-white/15 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              Ajuste o enquadramento antes de salvar. Esse recorte sera salvo exatamente no formato usado por essa imagem no site.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
            {cropOptions?.lockPreset ? (
              <div className="space-y-2">
                <Label className="text-zinc-300">Proporção</Label>
                <div className="rounded-lg border border-white/10 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-200">
                  {currentPreset.label}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-zinc-300">Proporção</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePresets.map((item) => (
                    <Button
                      key={item.value}
                      type="button"
                      className={preset === item.value ? `${btnPrimary} h-10` : `${btnOutline} h-10`}
                      onClick={() => setPreset(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-zinc-300">Zoom</Label>
              <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Posição horizontal</Label>
              <input type="range" min="-100" max="100" step="1" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Posição vertical</Label>
              <input type="range" min="-100" max="100" step="1" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button type="button" className={`${btnOutline} flex-1`} onClick={onClose}>
                Cancelar
              </Button>
              <Button type="button" className={`${btnPrimary} flex-1`} onClick={handleConfirm} disabled={saving}>
                {saving ? 'Salvando...' : 'Recortar e usar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Upload({ label, value, onChange, helper = 'PNG/JPG recomendado.', cropOptions = null }) {
  const [busy, setBusy] = useState(false);
  const [pendingSrc, setPendingSrc] = useState('');
  const [showCrop, setShowCrop] = useState(false);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const dataUrl = await toDataUrl(f);
      setPendingSrc(dataUrl);
      setShowCrop(true);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-zinc-300">{label}</Label>
        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-3">
          <Input type="file" accept="image/*" className={`${input} h-auto py-2`} onChange={onFile} />
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <Button type="button" className={btnOutline} onClick={() => onChange('')} disabled={!value}>
              Remover
            </Button>
            <span className="text-xs text-zinc-400">{busy ? 'Carregando...' : `${helper} O crop abre antes de salvar.`}</span>
          </div>
          {value ? <div className="rounded-lg border border-white/10 bg-[#111418] p-2"><img src={value} alt={label} className="max-h-32 object-contain" /></div> : null}
        </div>
      </div>

      <ImageCropModal
        open={showCrop}
        source={pendingSrc}
        label={label}
        cropOptions={cropOptions}
        onClose={() => {
          setShowCrop(false);
          setPendingSrc('');
        }}
        onConfirm={(croppedValue) => {
          onChange(croppedValue);
          setShowCrop(false);
          setPendingSrc('');
        }}
      />
    </>
  );
}

function TopicManager({ topics = [], onChange }) {
  const [newTopic, setNewTopic] = useState('');
  const add = () => {
    const value = String(newTopic || '').trim();
    if (!value) return;
    onChange([...(topics || []), { id: id(), title: value }]);
    setNewTopic('');
  };
  const remove = (topicId) => onChange((topics || []).filter((t) => t.id !== topicId));
  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">Topicos do Modulo *</Label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input className={input} value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Digite um topico" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} />
        <Button type="button" className={btnPrimary} onClick={add}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {(topics || []).map((t) => (
          <div key={t.id} className="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 flex items-center justify-between">
            <span className="text-sm text-zinc-100">{t.title}</span>
            <Button type="button" className="bg-red-600 text-white hover:bg-red-500 h-8 px-2" onClick={() => remove(t.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrudList({ title, desc, icon, data, onNew, onEdit, onDelete, subtitle }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><H title={title} desc={desc} icon={icon} /><Button className={btnPrimary} onClick={onNew}><Plus className="w-4 h-4 mr-2" />Novo</Button></div>
      <div className="grid gap-3">
        {(data || []).map((x) => <div key={x.id} className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="font-medium truncate">{x.name_pt || x.title_pt || x.question_pt || x.student_name || x.name || 'Item'}</p><p className="text-xs text-zinc-400">{subtitle?.(x) || ''}</p></div><div className="flex w-full justify-end gap-2 sm:w-auto"><Button className={btnOutline} onClick={() => onEdit(x)}>Editar</Button><Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)}><Trash2 className="w-4 h-4" /></Button></div></div>)}
      </div>
    </div>
  );
}

export default function Admin() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('settings');
  const q = {
    settings: useQuery({ queryKey: ['settings'], queryFn: () => apiClient.get('settings') }),
    products: useQuery({ queryKey: ['products'], queryFn: () => apiClient.get('products'), initialData: [] }),
    course: useQuery({ queryKey: ['courseContent'], queryFn: () => apiClient.get('courseContent') }),
    modules: useQuery({ queryKey: ['modules'], queryFn: () => apiClient.get('modules'), initialData: [] }),
    students: useQuery({ queryKey: ['students'], queryFn: () => apiClient.get('students'), initialData: [] }),
    logos: useQuery({ queryKey: ['logos'], queryFn: () => apiClient.get('logos'), initialData: [] }),
    testimonials: useQuery({ queryKey: ['testimonials'], queryFn: () => apiClient.get('testimonials'), initialData: [] }),
    faqs: useQuery({ queryKey: ['faqs'], queryFn: () => apiClient.get('faqs'), initialData: [] }),
    beforeAfter: useQuery({ queryKey: ['beforeAfter'], queryFn: () => apiClient.get('beforeAfter'), initialData: [] }),
  };
  const menu = useMemo(() => [
    ['settings', 'Configurações', Settings],
    ['products', 'Produtos', Package],
    ['course', 'Conteudo Curso', BookOpen],
    ['cards', 'Cards', LayoutDashboard],
    ['modules', 'Modulos', BookOpen],
    ['students', 'Alunos', Users],
    ['logos', 'Logos', Image],
    ['testimonials', 'Depoimentos', MessageSquare],
    ['faqs', 'FAQ', HelpCircle],
    ['beforeAfter', 'Antes/Depois', LayoutDashboard],
  ], []);
  const courseData = useMemo(() => normalizeCourseContent(q.course.data), [q.course.data]);

  return (
    <div className="h-screen min-h-dvh overflow-hidden bg-[#050608] text-zinc-100 flex">
      <aside className="w-72 hidden lg:flex flex-col border-r border-white/10 bg-[#0a0d13] h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b border-white/10"><img src="/logo-header.webp" alt="logo" className="h-8 w-auto mb-2" /><p className="text-xs text-zinc-400 uppercase tracking-[0.2em]">Painel Administrativo</p></div>
        <nav className="p-3 space-y-2 flex-1">{menu.map(([k, n, I]) => <button key={k} onClick={() => setTab(k)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${tab === k ? 'bg-white text-black font-semibold' : 'text-zinc-200 hover:bg-white/10'}`}><I className="w-4 h-4" />{n}</button>)}</nav>
        <div className="p-4 border-t border-white/10"><Button className={`${btnOutline} w-full justify-start`} onClick={() => logout('/adm')}><LogOut className="w-4 h-4 mr-2" />Sair</Button></div>
      </aside>
      <main className="flex-1 h-full overflow-y-auto overscroll-y-contain">
        <header className="h-16 border-b border-white/10 bg-[#050608]/90 backdrop-blur sticky top-0 z-20 px-4 md:px-6 flex items-center text-zinc-300">Admin</header>
        <div className="lg:hidden px-4 pt-4">
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-3">
            <Label className="text-zinc-300">Secao</Label>
            <select
              className="mt-2 w-full rounded-md border border-white/15 bg-zinc-900 px-3 py-2 text-zinc-100"
              value={tab}
              onChange={(e) => setTab(e.target.value)}
            >
              {menu.map(([k, n]) => (
                <option key={k} value={k}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 space-y-6">
          {tab === 'settings' && <SettingsTab data={q.settings.data?.[0]} />}
          {tab === 'products' && <ProductsTab data={q.products.data} />}
          {tab === 'course' && <CourseTab data={courseData} />}
          {tab === 'cards' && <CardsTab data={courseData} />}
          {tab === 'modules' && <ModulesTab data={q.modules.data} />}
          {tab === 'students' && <StudentsTab data={q.students.data} />}
          {tab === 'logos' && <LogosTab data={q.logos.data} />}
          {tab === 'testimonials' && <TestimonialsTab data={q.testimonials.data} />}
          {tab === 'faqs' && <FaqTab data={q.faqs.data} />}
          {tab === 'beforeAfter' && <BeforeAfterTab data={q.beforeAfter.data} />}
        </div>
      </main>
    </div>
  );
}

function SettingsTab({ data }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => ({
    ...(data || {}),
    id: data?.id || 'settings-1',
    products_heading_title_pt:
      data?.products_heading_title_pt ||
      [data?.products_heading_line1_pt, data?.products_heading_line2_pt].filter(Boolean).join(' ').trim() ||
      'Conheça os produtos que trazem mais COR para sua carreira.',
    products_heading_title_en:
      data?.products_heading_title_en ||
      [data?.products_heading_line1_en, data?.products_heading_line2_en].filter(Boolean).join(' ').trim() ||
      'Discover products that bring more COLOR to your career.',
    products_heading_line1_pt: data?.products_heading_line1_pt || 'Conheça os produtos que trazem',
    products_heading_line1_en: data?.products_heading_line1_en || 'Discover products that bring',
    products_heading_line2_pt: data?.products_heading_line2_pt || 'mais COR para sua carreira.',
    products_heading_line2_en: data?.products_heading_line2_en || 'more COLOR to your career.',
    products_heading_subtitle_pt: data?.products_heading_subtitle_pt || 'Escolha o melhor para você',
    products_heading_subtitle_en: data?.products_heading_subtitle_en || 'Pick what fits you best',
  }));

  useEffect(() => {
    setF({
      ...(data || {}),
      id: data?.id || 'settings-1',
      products_heading_title_pt:
        data?.products_heading_title_pt ||
        [data?.products_heading_line1_pt, data?.products_heading_line2_pt].filter(Boolean).join(' ').trim() ||
        'Conheça os produtos que trazem mais COR para sua carreira.',
      products_heading_title_en:
        data?.products_heading_title_en ||
        [data?.products_heading_line1_en, data?.products_heading_line2_en].filter(Boolean).join(' ').trim() ||
        'Discover products that bring more COLOR to your career.',
      products_heading_line1_pt: data?.products_heading_line1_pt || 'Conheça os produtos que trazem',
      products_heading_line1_en: data?.products_heading_line1_en || 'Discover products that bring',
      products_heading_line2_pt: data?.products_heading_line2_pt || 'mais COR para sua carreira.',
      products_heading_line2_en: data?.products_heading_line2_en || 'more COLOR to your career.',
      products_heading_subtitle_pt: data?.products_heading_subtitle_pt || 'Escolha o melhor para você',
      products_heading_subtitle_en: data?.products_heading_subtitle_en || 'Pick what fits you best',
    });
  }, [data]);

  const m = useMutation({
    mutationFn: (x) => apiClient.save('settings', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar configuracoes.'),
  });

  const onSave = () => {
    const payload = {
      ...(data || {}),
      ...f,
      id: f.id || data?.id || 'settings-1',
      products_heading_title_pt: String(f.products_heading_title_pt || '').trim(),
      products_heading_title_en: String(f.products_heading_title_en || '').trim(),
      products_heading_line1_pt: String(f.products_heading_line1_pt || '').trim(),
      products_heading_line1_en: String(f.products_heading_line1_en || '').trim(),
      products_heading_line2_pt: String(f.products_heading_line2_pt || '').trim(),
      products_heading_line2_en: String(f.products_heading_line2_en || '').trim(),
      products_heading_subtitle_pt: String(f.products_heading_subtitle_pt || '').trim(),
      products_heading_subtitle_en: String(f.products_heading_subtitle_en || '').trim(),
    };
    m.mutate([payload]);
  };

  return (
    <Card className={panel}>
      <CardHeader>
        <H title="Configurações do Site" desc="Nome e logo continuam travados, mas você pode editar textos da home." icon={Settings} />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 text-sm text-zinc-300">
          <p>Nome do site e logo estao bloqueados para edicao.</p>
          <p className="mt-2 text-zinc-400">Palavras em MAIÚSCULA no título de produtos ficam destacadas automaticamente na home.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
          <p className="text-sm font-semibold text-zinc-100">Início da página - Seção de Produtos</p>
          <BI
            label="Título completo (o sistema separa automaticamente em 2 linhas)"
            pt={f.products_heading_title_pt}
            en={f.products_heading_title_en}
            setPt={(v) => setF({ ...f, products_heading_title_pt: v })}
            setEn={(v) => setF({ ...f, products_heading_title_en: v })}
          />
          <BI
            label="Subtítulo (1 linha)"
            pt={f.products_heading_subtitle_pt}
            en={f.products_heading_subtitle_en}
            setPt={(v) => setF({ ...f, products_heading_subtitle_pt: v })}
            setEn={(v) => setF({ ...f, products_heading_subtitle_en: v })}
          />
        </div>

        <Button className={btnPrimary} onClick={onSave} disabled={m.isPending}>
          {m.isPending ? 'Salvando...' : 'Salvar configuracoes'}
        </Button>
      </CardContent>
    </Card>
  );
}

function ProductsTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [dragId, setDragId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [f, setF] = useState({});

  const m = useMutation({
    mutationFn: (x) => apiClient.save('products', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar produtos.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => ({
          ...x,
          id: x?.id || id(),
          slug: String(x?.slug || '').trim(),
          product_type: String(x?.product_type || 'course').trim() || 'course',
          show_in_pt: x?.show_in_pt !== false,
          show_in_en: x?.show_in_en !== false,
          image_url_pt: x?.image_url_pt || x?.detail_image_url_pt || x?.image_url || x?.detail_image_url || '',
          image_url_en: x?.image_url_en || x?.detail_image_url_en || x?.image_url || x?.detail_image_url || '',
          order: Number.isFinite(Number(x?.order)) ? Number(x.order) : index,
        }))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => ({
      ...x,
      id: x?.id || id(),
      slug: String(x?.slug || '').trim(),
      product_type: String(x?.product_type || 'course').trim() || 'course',
      show_in_pt: x?.show_in_pt !== false,
      show_in_en: x?.show_in_en !== false,
      price_brl: num(x?.price_brl),
      price_usd: num(x?.price_usd),
      compare_at_price_brl: num(x?.compare_at_price_brl),
      compare_at_price_usd: num(x?.compare_at_price_usd),
      features_pt: Array.isArray(x?.features_pt) ? x.features_pt : fromLines(x?.features_pt_text),
      features_en: Array.isArray(x?.features_en) ? x.features_en : fromLines(x?.features_en_text),
      image_url_pt: x?.image_url_pt || x?.detail_image_url_pt || x?.image_url || x?.detail_image_url || '',
      image_url_en: x?.image_url_en || x?.detail_image_url_en || x?.image_url || x?.detail_image_url || '',
      detail_image_url_pt: x?.detail_image_url_pt || x?.image_url_pt || x?.image_url || x?.detail_image_url || '',
      detail_image_url_en: x?.detail_image_url_en || x?.image_url_en || x?.image_url || x?.detail_image_url || '',
      // compatibilidade com campos antigos
      image_url: x?.image_url_pt || x?.image_url_en || x?.image_url || '',
      detail_image_url: x?.detail_image_url_pt || x?.detail_image_url_en || x?.detail_image_url || '',
      order: index,
    }));
    await m.mutateAsync(payload);
  };

  const onNew = () => {
    setOpen(true);
    setEditingId('');
    setF({ product_type: 'course', available: true, show_in_pt: true, show_in_en: true, image_url_pt: '', image_url_en: '' });
  };

  const edit = (x) => {
    setOpen(true);
    setEditingId(x.id);
    setF({
      ...x,
      image_url_pt: x?.image_url_pt || x?.detail_image_url_pt || x?.image_url || x?.detail_image_url || '',
      image_url_en: x?.image_url_en || x?.detail_image_url_en || x?.image_url || x?.detail_image_url || '',
      features_pt_text: toLines(x.features_pt || x.course_highlights_pt),
      features_en_text: toLines(x.features_en || x.course_highlights_en),
    });
  };

  const save = async () => {
    if (savingForm) return;

    const showPt = f.show_in_pt !== false;
    const showEn = f.show_in_en !== false;

    if (!f.slug) return;
    if (!showPt && !showEn) return;
    if (showPt && !String(f.name_pt || '').trim()) return;
    if (showEn && !String(f.name_en || '').trim()) return;

    const item = {
      ...f,
      id: f.id || id(),
      price_brl: num(f.price_brl),
      price_usd: num(f.price_usd),
      compare_at_price_brl: num(f.compare_at_price_brl),
      compare_at_price_usd: num(f.compare_at_price_usd),
      features_pt: fromLines(f.features_pt_text),
      features_en: fromLines(f.features_en_text),
      image_url_pt: f.image_url_pt || f.detail_image_url_pt || f.image_url || '',
      image_url_en: f.image_url_en || f.detail_image_url_en || f.image_url || '',
      detail_image_url_pt: f.detail_image_url_pt || f.image_url_pt || f.image_url || '',
      detail_image_url_en: f.detail_image_url_en || f.image_url_en || f.image_url || '',
      image_url: f.image_url_pt || f.image_url_en || f.image_url || '',
      detail_image_url: f.detail_image_url_pt || f.detail_image_url_en || f.detail_image_url || '',
    };
    delete item.features_pt_text;
    delete item.features_en_text;

    const next = f.id
      ? items.map((p) => (p.id === f.id ? { ...p, ...item } : p))
      : [...items, item];

    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setEditingId('');
      setF({});
    } finally {
      setSavingForm(false);
    }
  };

  const del = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const onDropAt = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    await persist(next);
  };

  const onMoveItem = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    await persist(next);
  };

  const renderForm = () => (
    <Card className={panel}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <BI label="Nome *" pt={f.name_pt} en={f.name_en} setPt={(v) => setF({ ...f, name_pt: v })} setEn={(v) => setF({ ...f, name_en: v })} />
        <BT label="Descrição" pt={f.description_pt} en={f.description_en} setPt={(v) => setF({ ...f, description_pt: v })} setEn={(v) => setF({ ...f, description_en: v })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <F label="Slug *" value={f.slug || ''} onChange={(e) => setF({ ...f, slug: e.target.value })} />
          <F label="Tipo (course/luts) *" value={f.product_type || ''} onChange={(e) => setF({ ...f, product_type: e.target.value })} />
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
          <Label className="text-zinc-300 mb-2 block">Mostrar no site *</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <label className="flex items-center gap-2 text-zinc-200"><input type="checkbox" className="accent-white" checked={f.show_in_pt !== false} onChange={(e) => setF({ ...f, show_in_pt: e.target.checked })} />Português</label>
            <label className="flex items-center gap-2 text-zinc-200"><input type="checkbox" className="accent-white" checked={f.show_in_en !== false} onChange={(e) => setF({ ...f, show_in_en: e.target.checked })} />English</label>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
          <Label className="text-zinc-300 mb-2 block">Disponibilidade</Label>
          <label className="flex items-center gap-2 text-zinc-200">
            <input
              type="checkbox"
              className="accent-white"
              checked={f.available !== false}
              onChange={(e) => setF({ ...f, available: e.target.checked })}
            />
            Produto disponível para compra
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <F label="Preço BRL" type="number" value={f.price_brl || ''} onChange={(e) => setF({ ...f, price_brl: e.target.value })} />
          <F label="Preço USD" type="number" value={f.price_usd || ''} onChange={(e) => setF({ ...f, price_usd: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <F label="Preço Antigo BRL" type="number" value={f.compare_at_price_brl || ''} onChange={(e) => setF({ ...f, compare_at_price_brl: e.target.value })} />
          <F label="Preço Antigo USD" type="number" value={f.compare_at_price_usd || ''} onChange={(e) => setF({ ...f, compare_at_price_usd: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <F label="Link Compra BRL *" value={f.buy_link_brl || ''} onChange={(e) => setF({ ...f, buy_link_brl: e.target.value })} />
          <F label="Link Compra USD *" value={f.buy_link_usd || ''} onChange={(e) => setF({ ...f, buy_link_usd: e.target.value })} />
        </div>
        <BT label="Bullets (uma linha por item)" pt={f.features_pt_text} en={f.features_en_text} setPt={(v) => setF({ ...f, features_pt_text: v })} setEn={(v) => setF({ ...f, features_en_text: v })} rows={5} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Upload
            label="Imagem do Produto (PT)"
            value={f.image_url_pt || ''}
            onChange={(v) => setF({ ...f, image_url_pt: v, detail_image_url_pt: v })}
          />
          <Upload
            label="Imagem do Produto (EN)"
            value={f.image_url_en || ''}
            onChange={(v) => setF({ ...f, image_url_en: v, detail_image_url_en: v })}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>Cancelar</Button>
          <Button className={btnPrimary} disabled={savingForm} onClick={save}>{savingForm ? 'Salvando...' : 'Salvar'}</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H title="Produtos" desc="Arraste e solte para ordenar o catálogo. Cadastro completo de produtos." icon={Package} />
        <Button className={btnPrimary} onClick={onNew}><Plus className="w-4 h-4 mr-2" />Novo</Button>
      </div>

      {open && !editingId ? renderForm() : null}

      <div className="grid gap-3">
        {items.map((x, index) => (
          <div key={x.id} className="space-y-3">
            <div
              draggable
              onDragStart={() => setDragId(x.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropAt(x.id)}
              className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{x.name_pt || x.name_en || x.slug || 'Produto'}</p>
                  <p className="text-xs text-zinc-400">{x.product_type || 'course'} ? R$ {num(x.price_brl)} - ${num(x.price_usd)}</p>
                  <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${x.available !== false ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {x.available !== false ? 'Disponível' : 'Em breve'}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                <ReorderButtons
                  index={index}
                  total={items.length}
                  onMove={(toIndex) => onMoveItem(index, toIndex)}
                  disabled={m.isPending}
                />
                <div className="flex gap-2">
                  <Button className={btnOutline} onClick={() => edit(x)}>Editar</Button>
                  <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => del(x.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
            {open && editingId === x.id ? renderForm() : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseTab({ data }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => normalizeCourseContent(data));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setF(normalizeCourseContent(data));
    setIsEditing(false);
  }, [data]);

  const m = useMutation({
    mutationFn: (x) => apiClient.save('courseContent', [x]),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['courseContent'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar conteúdo do curso.'),
  });

  const onCancelEdit = () => {
    setF(normalizeCourseContent(data));
    setIsEditing(false);
  };

  const onSave = () => {
    m.mutate(normalizeCourseContent(f), {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <Card className={panel}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <H title="Conteúdo do Curso" desc="Edite os textos e blocos principais das páginas do curso." icon={BookOpen} />
          {!isEditing ? (
            <Button className={btnPrimary} onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button className={btnOutline} onClick={onCancelEdit} disabled={m.isPending}>
                Cancelar
              </Button>
              <Button className={btnPrimary} onClick={onSave} disabled={m.isPending}>
                {m.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset disabled={!isEditing} className={!isEditing ? 'opacity-95' : ''}>
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Hero do Curso</p>
            <BI
              label="Título Hero *"
              pt={f.hero_title_pt}
              en={f.hero_title_en}
              setPt={(v) => setF({ ...f, hero_title_pt: v })}
              setEn={(v) => setF({ ...f, hero_title_en: v })}
            />
            <BT
              label="Subtítulo Hero"
              pt={f.hero_subtitle_pt}
              en={f.hero_subtitle_en}
              setPt={(v) => setF({ ...f, hero_subtitle_pt: v })}
              setEn={(v) => setF({ ...f, hero_subtitle_en: v })}
              rows={3}
            />
            <Upload
              label="Imagem Hero"
              value={f.hero_image_url || ''}
              onChange={(v) => setF({ ...f, hero_image_url: v })}
              cropOptions={{
                presets: [{ value: 'hero', label: 'Hero 16:9', aspect: 16 / 9 }],
                defaultPreset: 'hero',
                lockPreset: true,
              }}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Conheca seu professor</p>
            <F label="Nome do Professor *" value={f.instructor_name || ''} onChange={(e) => setF({ ...f, instructor_name: e.target.value })} />
            <BT
              label="Bio do Professor"
              pt={f.instructor_bio_pt}
              en={f.instructor_bio_en}
              setPt={(v) => setF({ ...f, instructor_bio_pt: v })}
              setEn={(v) => setF({ ...f, instructor_bio_en: v })}
              rows={5}
            />
            <Upload
              label="Foto do Professor"
              value={f.instructor_photo_url || ''}
              onChange={(v) => setF({ ...f, instructor_photo_url: v })}
              cropOptions={{
                presets: [{ value: 'instructor', label: 'Professor 16:9', aspect: 16 / 9 }],
                defaultPreset: 'instructor',
                lockPreset: true,
              }}
            />
            <F
              label="URL do Showreel (YouTube/Vimeo)"
              value={f.instructor_showreel_url || ''}
              onChange={(e) => setF({ ...f, instructor_showreel_url: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
            />
            <BI
              label="Tempo de Carreira (card de destaque)"
              pt={f.instructor_career_text_pt}
              en={f.instructor_career_text_en}
              setPt={(v) => setF({ ...f, instructor_career_text_pt: v })}
              setEn={(v) => setF({ ...f, instructor_career_text_en: v })}
            />
            <BI
              label="Alunos (card de destaque)"
              pt={f.instructor_students_count_pt}
              en={f.instructor_students_count_en}
              setPt={(v) => setF({ ...f, instructor_students_count_pt: v })}
              setEn={(v) => setF({ ...f, instructor_students_count_en: v })}
            />
            <BI
              label="Clientes (card de destaque)"
              pt={f.instructor_clients_count_pt}
              en={f.instructor_clients_count_en}
              setPt={(v) => setF({ ...f, instructor_clients_count_pt: v })}
              setEn={(v) => setF({ ...f, instructor_clients_count_en: v })}
            />
            <div className="space-y-3 rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-100">Links sociais do professor</p>
                <Button
                  type="button"
                  className={btnOutline}
                  onClick={() =>
                    setF({
                      ...f,
                      instructor_socials: [
                        ...(Array.isArray(f.instructor_socials) ? f.instructor_socials : []),
                        { key: id(), name: '', url: '', icon: '' },
                      ],
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              {(Array.isArray(f.instructor_socials) ? f.instructor_socials : []).map((social, index) => (
                <div key={social.key || index} className="rounded-lg border border-white/10 bg-zinc-950/50 p-3 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <F label="Nome" value={social.name || ''} onChange={(e) => setF({ ...f, instructor_socials: f.instructor_socials.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item) })} />
                    <F label="URL" value={social.url || ''} onChange={(e) => setF({ ...f, instructor_socials: f.instructor_socials.map((item, itemIndex) => itemIndex === index ? { ...item, url: e.target.value } : item) })} />
                    <F label="Icone (URL)" value={social.icon || ''} onChange={(e) => setF({ ...f, instructor_socials: f.instructor_socials.map((item, itemIndex) => itemIndex === index ? { ...item, icon: e.target.value } : item) })} />
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" className="bg-red-600 text-white hover:bg-red-500" onClick={() => setF({ ...f, instructor_socials: f.instructor_socials.filter((_, itemIndex) => itemIndex !== index) })}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-400">Aceita links de YouTube/Vimeo comuns ou de embed.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Seção de idiomas</p>
            <BI
              label="Título da seção"
              pt={f.languages_title_pt}
              en={f.languages_title_en}
              setPt={(v) => setF({ ...f, languages_title_pt: v })}
              setEn={(v) => setF({ ...f, languages_title_en: v })}
            />
            <BI
              label="Palavra em destaque"
              pt={f.languages_highlight_pt}
              en={f.languages_highlight_en}
              setPt={(v) => setF({ ...f, languages_highlight_pt: v })}
              setEn={(v) => setF({ ...f, languages_highlight_en: v })}
            />
            <BT
              label="Observação da seção"
              pt={f.languages_note_pt}
              en={f.languages_note_en}
              setPt={(v) => setF({ ...f, languages_note_pt: v })}
              setEn={(v) => setF({ ...f, languages_note_en: v })}
              rows={3}
            />
            <div className="space-y-3 rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-100">Idiomas cadastrados</p>
                <Button
                  type="button"
                  className={btnOutline}
                  onClick={() =>
                    setF({
                      ...f,
                      available_languages: [
                        ...(Array.isArray(f.available_languages) ? f.available_languages : []),
                        { id: id(), code: '', name_pt: '', name_en: '', available: true, hasSubtitles: true },
                      ],
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Idioma
                </Button>
              </div>
              {(Array.isArray(f.available_languages) ? f.available_languages : []).map((lang, index) => (
                <div key={lang.id || index} className="rounded-lg border border-white/10 bg-zinc-950/50 p-3 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <F label="Sigla" value={lang.code || ''} onChange={(e) => setF({ ...f, available_languages: f.available_languages.map((item, itemIndex) => itemIndex === index ? { ...item, code: e.target.value.toUpperCase() } : item) })} />
                    <F label="Nome PT" value={lang.name_pt || ''} onChange={(e) => setF({ ...f, available_languages: f.available_languages.map((item, itemIndex) => itemIndex === index ? { ...item, name_pt: e.target.value } : item) })} />
                    <F label="Nome EN" value={lang.name_en || ''} onChange={(e) => setF({ ...f, available_languages: f.available_languages.map((item, itemIndex) => itemIndex === index ? { ...item, name_en: e.target.value } : item) })} />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-zinc-200">
                      <input type="checkbox" className="accent-white" checked={lang.available !== false} onChange={(e) => setF({ ...f, available_languages: f.available_languages.map((item, itemIndex) => itemIndex === index ? { ...item, available: e.target.checked } : item) })} />
                      Disponível
                    </label>
                    <label className="flex items-center gap-2 text-zinc-200">
                      <input type="checkbox" className="accent-white" checked={lang.hasSubtitles !== false} onChange={(e) => setF({ ...f, available_languages: f.available_languages.map((item, itemIndex) => itemIndex === index ? { ...item, hasSubtitles: e.target.checked } : item) })} />
                      Com legenda
                    </label>
                    <Button type="button" className="bg-red-600 text-white hover:bg-red-500 ml-auto" onClick={() => setF({ ...f, available_languages: f.available_languages.filter((_, itemIndex) => itemIndex !== index) })}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Trailer do curso</p>
            <F label="URL do vídeo" value={f.trailer_url || ''} onChange={(e) => setF({ ...f, trailer_url: e.target.value })} />
            <BI
              label="Título do iframe"
              pt={f.trailer_title_pt}
              en={f.trailer_title_en}
              setPt={(v) => setF({ ...f, trailer_title_pt: v })}
              setEn={(v) => setF({ ...f, trailer_title_en: v })}
            />
            <BI
              label="Linha principal"
              pt={f.trailer_title_line1_pt}
              en={f.trailer_title_line1_en}
              setPt={(v) => setF({ ...f, trailer_title_line1_pt: v })}
              setEn={(v) => setF({ ...f, trailer_title_line1_en: v })}
            />
            <BI
              label="Palavra ou frase em destaque"
              pt={f.trailer_highlight_pt}
              en={f.trailer_highlight_en}
              setPt={(v) => setF({ ...f, trailer_highlight_pt: v })}
              setEn={(v) => setF({ ...f, trailer_highlight_en: v })}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Títulos das seções da página</p>
            <BI label="Resultados dos alunos / título" pt={f.student_results_title_line1_pt} en={f.student_results_title_line1_en} setPt={(v) => setF({ ...f, student_results_title_line1_pt: v })} setEn={(v) => setF({ ...f, student_results_title_line1_en: v })} />
            <BI label="Resultados dos alunos / destaque" pt={f.student_results_highlight_pt} en={f.student_results_highlight_en} setPt={(v) => setF({ ...f, student_results_highlight_pt: v })} setEn={(v) => setF({ ...f, student_results_highlight_en: v })} />
            <BT label="Resultados dos alunos / subtítulo" pt={f.student_results_subtitle_pt} en={f.student_results_subtitle_en} setPt={(v) => setF({ ...f, student_results_subtitle_pt: v })} setEn={(v) => setF({ ...f, student_results_subtitle_en: v })} rows={2} />
            <BI label="Clientes / título livre" pt={f.client_logos_title_pt} en={f.client_logos_title_en} setPt={(v) => setF({ ...f, client_logos_title_pt: v })} setEn={(v) => setF({ ...f, client_logos_title_en: v })} />
            <BI label="Módulos / título" pt={f.modules_title_line1_pt} en={f.modules_title_line1_en} setPt={(v) => setF({ ...f, modules_title_line1_pt: v })} setEn={(v) => setF({ ...f, modules_title_line1_en: v })} />
            <BI label="Módulos / destaque" pt={f.modules_highlight_pt} en={f.modules_highlight_en} setPt={(v) => setF({ ...f, modules_highlight_pt: v })} setEn={(v) => setF({ ...f, modules_highlight_en: v })} />
            <BT label="Módulos / subtítulo" pt={f.modules_subtitle_pt} en={f.modules_subtitle_en} setPt={(v) => setF({ ...f, modules_subtitle_pt: v })} setEn={(v) => setF({ ...f, modules_subtitle_en: v })} rows={2} />
            <BI label="Depoimentos / título" pt={f.testimonials_title_line1_pt} en={f.testimonials_title_line1_en} setPt={(v) => setF({ ...f, testimonials_title_line1_pt: v })} setEn={(v) => setF({ ...f, testimonials_title_line1_en: v })} />
            <BI label="Depoimentos / prefixo" pt={f.testimonials_title_prefix_pt} en={f.testimonials_title_prefix_en} setPt={(v) => setF({ ...f, testimonials_title_prefix_pt: v })} setEn={(v) => setF({ ...f, testimonials_title_prefix_en: v })} />
            <BI label="Depoimentos / destaque" pt={f.testimonials_highlight_pt} en={f.testimonials_highlight_en} setPt={(v) => setF({ ...f, testimonials_highlight_pt: v })} setEn={(v) => setF({ ...f, testimonials_highlight_en: v })} />
            <BI label="FAQ / título" pt={f.faq_title_line1_pt} en={f.faq_title_line1_en} setPt={(v) => setF({ ...f, faq_title_line1_pt: v })} setEn={(v) => setF({ ...f, faq_title_line1_en: v })} />
            <BI label="FAQ / destaque" pt={f.faq_highlight_pt} en={f.faq_highlight_en} setPt={(v) => setF({ ...f, faq_highlight_pt: v })} setEn={(v) => setF({ ...f, faq_highlight_en: v })} />
            <BT label="FAQ / subtítulo" pt={f.faq_subtitle_pt} en={f.faq_subtitle_en} setPt={(v) => setF({ ...f, faq_subtitle_pt: v })} setEn={(v) => setF({ ...f, faq_subtitle_en: v })} rows={2} />
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Conteúdo adicional exclusivo</p>
            <BI label="Título da seção" pt={f.extra_content_title_line1_pt} en={f.extra_content_title_line1_en} setPt={(v) => setF({ ...f, extra_content_title_line1_pt: v })} setEn={(v) => setF({ ...f, extra_content_title_line1_en: v })} />
            <BI label="Destaque da seção" pt={f.extra_content_highlight_pt} en={f.extra_content_highlight_en} setPt={(v) => setF({ ...f, extra_content_highlight_pt: v })} setEn={(v) => setF({ ...f, extra_content_highlight_en: v })} />
            <BT label="Subtítulo da seção" pt={f.extra_content_subtitle_pt} en={f.extra_content_subtitle_en} setPt={(v) => setF({ ...f, extra_content_subtitle_pt: v })} setEn={(v) => setF({ ...f, extra_content_subtitle_en: v })} rows={2} />
            {[1, 2].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/20 p-3 space-y-3">
                <p className="text-sm font-medium text-zinc-200">Card extra {item}</p>
                <Upload
                  label={`Imagem do card ${item}`}
                  value={f[`extra_card_${item}_image_url`] || ''}
                  onChange={(v) => setF({ ...f, [`extra_card_${item}_image_url`]: v })}
                  cropOptions={{
                    presets: [{ value: 'extra-card', label: 'Card panorâmico', aspect: 16 / 9 }],
                    defaultPreset: 'extra-card',
                    lockPreset: true,
                  }}
                />
                <BI label={`Título do card ${item}`} pt={f[`extra_card_${item}_title_pt`]} en={f[`extra_card_${item}_title_en`]} setPt={(v) => setF({ ...f, [`extra_card_${item}_title_pt`]: v })} setEn={(v) => setF({ ...f, [`extra_card_${item}_title_en`]: v })} />
                <BT label={`Descrição do card ${item}`} pt={f[`extra_card_${item}_desc_pt`]} en={f[`extra_card_${item}_desc_en`]} setPt={(v) => setF({ ...f, [`extra_card_${item}_desc_pt`]: v })} setEn={(v) => setF({ ...f, [`extra_card_${item}_desc_en`]: v })} rows={3} />
                <BI label={`Etiqueta do card ${item}`} pt={f[`extra_card_${item}_note_pt`]} en={f[`extra_card_${item}_note_en`]} setPt={(v) => setF({ ...f, [`extra_card_${item}_note_pt`]: v })} setEn={(v) => setF({ ...f, [`extra_card_${item}_note_en`]: v })} />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Certificado</p>
            <BI label="Prefixo do título" pt={f.certificate_title_prefix_pt} en={f.certificate_title_prefix_en} setPt={(v) => setF({ ...f, certificate_title_prefix_pt: v })} setEn={(v) => setF({ ...f, certificate_title_prefix_en: v })} />
            <BI label="Texto em destaque" pt={f.certificate_highlight_pt} en={f.certificate_highlight_en} setPt={(v) => setF({ ...f, certificate_highlight_pt: v })} setEn={(v) => setF({ ...f, certificate_highlight_en: v })} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Upload label="Imagem do certificado PT" value={f.certificate_image_url_pt || ''} onChange={(v) => setF({ ...f, certificate_image_url_pt: v })} />
              <Upload label="Imagem do certificado EN" value={f.certificate_image_url_en || ''} onChange={(v) => setF({ ...f, certificate_image_url_en: v })} />
            </div>
          </div>

        </fieldset>
      </CardContent>
    </Card>
  );
}
function CardsTab({ data }) {
  const qc = useQueryClient();
  const [f, setF] = useState(() => normalizeCourseContent(data));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setF(normalizeCourseContent(data));
    setIsEditing(false);
  }, [data]);

  const m = useMutation({
    mutationFn: (x) => apiClient.save('courseContent', [x]),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['courseContent'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar cards.'),
  });

  const onCancelEdit = () => {
    setF(normalizeCourseContent(data));
    setIsEditing(false);
  };

  const onSave = () => {
    m.mutate(normalizeCourseContent(f), {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <Card className={panel}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <H title="Cards" desc="Edite título da seção e os 4 cards de destaque." icon={LayoutDashboard} />
          {!isEditing ? (
            <Button className={btnPrimary} onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button className={btnOutline} onClick={onCancelEdit} disabled={m.isPending}>
                Cancelar
              </Button>
              <Button className={btnPrimary} onClick={onSave} disabled={m.isPending}>
                {m.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset disabled={!isEditing} className={!isEditing ? 'opacity-95' : ''}>
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-4">
            <p className="text-sm font-semibold text-zinc-100">Título da seção</p>
            <BI
              label="Título completo (o site separa automaticamente em 2 linhas)"
              pt={f.highlights_title_pt}
              en={f.highlights_title_en}
              setPt={(v) => setF({ ...f, highlights_title_pt: v })}
              setEn={(v) => setF({ ...f, highlights_title_en: v })}
            />
          </div>

          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rounded-xl border border-cyan-400/25 bg-zinc-950/40 p-4 space-y-4 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">Card {item}</p>
              <Upload
                label={`Imagem de fundo (Card ${item})`}
                value={f[`highlight_${item}_image_url`] || ''}
                onChange={(v) => setF({ ...f, [`highlight_${item}_image_url`]: v })}
                cropOptions={{
                  presets: [{ value: 'home-card', label: 'Card da home 6:5', aspect: 6 / 5 }],
                  defaultPreset: 'home-card',
                  lockPreset: true,
                }}
              />
              <BI
                label={`Título (Card ${item})`}
                pt={f[`highlight_${item}_title_pt`]}
                en={f[`highlight_${item}_title_en`]}
                setPt={(v) => setF({ ...f, [`highlight_${item}_title_pt`]: v })}
                setEn={(v) => setF({ ...f, [`highlight_${item}_title_en`]: v })}
              />
              <BT
                label={`Descrição (Card ${item})`}
                pt={f[`highlight_${item}_desc_pt`]}
                en={f[`highlight_${item}_desc_en`]}
                setPt={(v) => setF({ ...f, [`highlight_${item}_desc_pt`]: v })}
                setEn={(v) => setF({ ...f, [`highlight_${item}_desc_en`]: v })}
                rows={3}
              />
            </div>
          ))}
        </fieldset>
      </CardContent>
    </Card>
  );
}
function ModulesTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [f, setF] = useState({
    show_in_en: true,
    show_in_course: true,
    show_in_luts: false,
    title_pt: '',
    title_en: '',
    description_pt: '',
    description_en: '',
    lessons_count: 0,
    duration_hours: 0,
    topics_pt_text: '',
    topics_en_text: '',
  });
  const [dragId, setDragId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const formRef = React.useRef(null);
  const m = useMutation({
    mutationFn: (x) => apiClient.save('modules', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['modules'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar módulos.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => normalizeModule(x, index))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => toModulePayload(x, index));
    await m.mutateAsync(payload);
  };

  const blankForm = () => ({
    show_in_en: true,
    show_in_course: true,
    show_in_luts: false,
    title_pt: '',
    title_en: '',
    description_pt: '',
    description_en: '',
    lessons_count: 0,
    duration_hours: 0,
    topics_pt_text: '',
    topics_en_text: '',
  });

  const formFromItem = (x) => {
    const normalized = normalizeModule(x);
    return {
      id: normalized.id,
      show_in_en: normalized.show_in_en !== false,
      show_in_course: normalized.show_in_course !== false,
      show_in_luts: normalized.show_in_luts === true,
      title_pt: normalized.title_pt || '',
      title_en: normalized.title_en || '',
      description_pt: normalized.description_pt || '',
      description_en: normalized.description_en || '',
      lessons_count: num(normalized.lessons_count, 0),
      duration_hours: num(normalized.duration_hours, 0),
      topics_pt_text: toLines(normalized.topics_pt || []),
      topics_en_text: toLines(normalized.topics_en || []),
    };
  };

  const edit = (x) => {
    setOpen(true);
    setEditingId(x.id);
    setF(formFromItem(x));
  };

  const onNew = () => {
    setOpen(true);
    setEditingId('');
    setF(blankForm());
  };

  const toFormModule = (formValue, index) => {
    const base = normalizeModule(formValue, index);
    const topicsPt = fromLines(formValue.topics_pt_text);
    const topicsEn = fromLines(formValue.topics_en_text);
    const fallbackEn = topicsEn.length > 0 ? topicsEn : topicsPt;
    return {
      ...base,
      show_in_en: formValue.show_in_en !== false,
      show_in_course: formValue.show_in_course !== false,
      show_in_luts: formValue.show_in_luts === true,
      topics_pt: topicsPt,
      topics_en: fallbackEn,
      lessons_pt: topicsPt,
      lessons_en: fallbackEn,
      topics: topicsPt.map((title) => ({ id: id(), title })),
      lessons_count: Math.max(0, num(formValue.lessons_count, Math.max(topicsPt.length, fallbackEn.length))),
    };
  };

  const save = async () => {
    if (savingForm) return;
    const item = toFormModule(f, items.length);
    const next = f.id ? items.map((x) => x.id === f.id ? item : x) : [...items, item];
    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setEditingId('');
      setF(blankForm());
    } finally {
      setSavingForm(false);
    }
  };
  const del = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const onDropAt = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    await persist(next);
  };

  const onMoveItem = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    await persist(next);
  };

  useEffect(() => {
    if (!open) return;
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [open, editingId]);

  const renderForm = () => (
    <Card className={panel}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <BI label="Título *" pt={f.title_pt} en={f.title_en} setPt={(v) => setF({ ...f, title_pt: v })} setEn={(v) => setF({ ...f, title_en: v })} />
        <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
          <Label className="text-zinc-300 mb-2 block">Exibição do módulo</Label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-zinc-200">
              <input
                type="checkbox"
                className="accent-white"
                checked={f.show_in_course !== false}
                onChange={(e) => setF({ ...f, show_in_course: e.target.checked })}
              />
              Mostrar este módulo no produto Curso
            </label>
            <label className="flex items-center gap-2 text-zinc-200">
              <input
                type="checkbox"
                className="accent-white"
                checked={f.show_in_luts === true}
                onChange={(e) => setF({ ...f, show_in_luts: e.target.checked })}
              />
              Mostrar este módulo no produto LUTs
            </label>
            <label className="flex items-center gap-2 text-zinc-200">
              <input
                type="checkbox"
                className="accent-white"
                checked={f.show_in_en !== false}
                onChange={(e) => setF({ ...f, show_in_en: e.target.checked })}
              />
              Mostrar este módulo em inglês
            </label>
          </div>
        </div>
        <BT label="Descrição" pt={f.description_pt} en={f.description_en} setPt={(v) => setF({ ...f, description_pt: v })} setEn={(v) => setF({ ...f, description_en: v })} rows={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <F label="Licoes *" type="number" min="0" value={f.lessons_count || 0} onChange={(e) => setF({ ...f, lessons_count: e.target.value })} />
          <F label="Duracao (h) *" type="number" min="0" value={f.duration_hours || 0} onChange={(e) => setF({ ...f, duration_hours: e.target.value })} />
        </div>
        <BT
          label="Topicos (uma linha por item)"
          pt={f.topics_pt_text}
          en={f.topics_en_text}
          setPt={(v) => setF({ ...f, topics_pt_text: v })}
          setEn={(v) => setF({ ...f, topics_en_text: v })}
          rows={5}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>
            Cancelar
          </Button>
          <Button className={btnPrimary} disabled={savingForm} onClick={save}>
            {savingForm ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <H title="Módulos" desc="Título, descrição, lições e tópicos (PT/EN). Arraste para ordenar." icon={BookOpen} />
          <Button className={btnPrimary} onClick={onNew}>
            <Plus className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
        {open && !editingId ? (
          <div ref={formRef}>
            {renderForm()}
          </div>
        ) : null}
        <div className="grid gap-3">
          {items.map((x, index) => (
            <div key={x.id} className="space-y-3">
              <div
                draggable
                onDragStart={() => setDragId(x.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDropAt(x.id)}
                className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div>
                  <p className="font-medium truncate">{x.title_pt || x.title_en || 'Item'}</p>
                  <p className="text-xs text-zinc-400">
                    {num(x.lessons_count)} lições - {num(x.duration_hours)}h
                    {' • '}
                    {[
                      x.show_in_course !== false ? 'Curso' : null,
                      x.show_in_luts === true ? 'LUTs' : null,
                    ].filter(Boolean).join(' / ') || 'Oculto'}
                  </p>
                </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                  <ReorderButtons
                    index={index}
                    total={items.length}
                    onMove={(toIndex) => onMoveItem(index, toIndex)}
                    disabled={m.isPending}
                  />
                  <div className="flex gap-2">
                    <Button className={btnOutline} onClick={() => edit(x)}>Editar</Button>
                    <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => del(x.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {open && editingId === x.id ? (
                <div ref={formRef}>
                  {renderForm()}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentLogosUpload({ logos = [], onChange }) {
  const [busy, setBusy] = useState(false);

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    try {
      const urls = await Promise.all(files.map((file) => toDataUrl(file)));
      onChange([...(logos || []), ...urls]);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  const removeLogo = (index) => onChange((logos || []).filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">Logos das Marcas</Label>
      <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-4 space-y-3">
        <Input type="file" accept="image/*" multiple className={`${input} h-auto py-2`} onChange={onFiles} />
        <span className="text-xs text-zinc-400">{busy ? 'Carregando...' : 'Selecione uma ou mais imagens de logo.'}</span>
        {(logos || []).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(logos || []).map((logo, index) => (
              <div key={`${logo}-${index}`} className="rounded-lg border border-white/10 bg-[#111418] p-2 space-y-2">
                <img src={logo} alt={`Logo ${index + 1}`} className="h-12 w-full object-contain" />
                <Button type="button" className="w-full bg-red-600 text-white hover:bg-red-500 h-8" onClick={() => removeLogo(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StudentsTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [dragId, setDragId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [f, setF] = useState({
    name: '',
    photo_url: '',
    showreel_url: '',
    logos: [],
    testimonial_pt: '',
    testimonial_en: '',
  });

  const m = useMutation({
    mutationFn: (x) => apiClient.save('students', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar alunos.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => ({
          ...x,
          id: x?.id || id(),
          name: String(x?.name || '').trim(),
          photo_url: x?.photo_url || x?.image_url || '',
          showreel_url: x?.showreel_url || '',
          logos: Array.isArray(x?.logos) ? x.logos.filter(Boolean) : [],
          testimonial_pt: String(x?.testimonial_pt || '').trim(),
          testimonial_en: String(x?.testimonial_en || '').trim(),
          order: Number.isFinite(Number(x?.order)) ? Number(x.order) : index,
        }))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => ({
      ...x,
      id: x?.id || id(),
      name: String(x?.name || '').trim(),
      photo_url: x?.photo_url || '',
      showreel_url: x?.showreel_url || '',
      logos: Array.isArray(x?.logos) ? x.logos.filter(Boolean) : [],
      testimonial_pt: String(x?.testimonial_pt || '').trim(),
      testimonial_en: String(x?.testimonial_en || '').trim(),
      order: index,
    }));
    await m.mutateAsync(payload);
  };

  const onNew = () => {
    setOpen(true);
    setEditingId('');
    setF({ name: '', photo_url: '', showreel_url: '', logos: [], testimonial_pt: '', testimonial_en: '' });
  };

  const onEdit = (x) => {
    setOpen(true);
    setEditingId(x.id);
    setF({
      id: x.id,
      name: x.name || '',
      photo_url: x.photo_url || '',
      showreel_url: x.showreel_url || '',
      logos: Array.isArray(x.logos) ? x.logos : [],
      testimonial_pt: x.testimonial_pt || '',
      testimonial_en: x.testimonial_en || '',
    });
  };

  const onSave = async () => {
    if (savingForm) return;
    const item = {
      id: f.id || id(),
      name: String(f.name || '').trim(),
      photo_url: f.photo_url || '',
      showreel_url: f.showreel_url || '',
      logos: Array.isArray(f.logos) ? f.logos.filter(Boolean) : [],
      testimonial_pt: String(f.testimonial_pt || '').trim(),
      testimonial_en: String(f.testimonial_en || '').trim(),
    };
    const next = f.id ? items.map((x) => (x.id === f.id ? { ...x, ...item } : x)) : [...items, item];
    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setEditingId('');
      setF({ name: '', photo_url: '', showreel_url: '', logos: [], testimonial_pt: '', testimonial_en: '' });
    } finally {
      setSavingForm(false);
    }
  };

  const onDelete = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const onDropAt = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    await persist(next);
  };

  const onMoveItem = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    await persist(next);
  };

  const renderForm = () => (
    <Card className={panel}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <F label="Nome *" value={f.name || ''} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <Upload
          label="Foto do Aluno"
          value={f.photo_url || ''}
          onChange={(v) => setF({ ...f, photo_url: v })}
          cropOptions={{
            presets: [{ value: 'student', label: 'Foto quadrada 1:1', aspect: 1 }],
            defaultPreset: 'student',
            lockPreset: true,
          }}
        />
        <F label="URL do Showreel (YouTube/Vimeo embed)" value={f.showreel_url || ''} onChange={(e) => setF({ ...f, showreel_url: e.target.value })} />
        <StudentLogosUpload logos={f.logos || []} onChange={(logos) => setF({ ...f, logos })} />
        <BT label="Depoimento *" pt={f.testimonial_pt} en={f.testimonial_en} setPt={(v) => setF({ ...f, testimonial_pt: v })} setEn={(v) => setF({ ...f, testimonial_en: v })} rows={4} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>Cancelar</Button>
          <Button className={btnPrimary} disabled={savingForm} onClick={onSave}>{savingForm ? 'Salvando...' : 'Salvar'}</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H title="Alunos" desc="Arraste e solte para ordenar. Cadastro com foto, showreel e logos por upload." icon={Users} />
        <Button className={btnPrimary} onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      {open && !editingId ? renderForm() : null}

      <div className="grid gap-3">
        {items.map((x, index) => (
          <div key={x.id} className="space-y-3">
            <div
              draggable
              onDragStart={() => setDragId(x.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropAt(x.id)}
              className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="flex items-center gap-3 min-w-0">
                  {x.photo_url ? <img src={x.photo_url} alt={x.name} className="h-10 w-10 rounded-full object-cover border border-white/10" /> : null}
                  <div>
                    <p className="font-medium truncate">{x.name || 'Aluno'}</p>
                    <p className="text-xs text-zinc-400">{(Array.isArray(x.logos) ? x.logos.length : 0)} logos</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                <ReorderButtons
                  index={index}
                  total={items.length}
                  onMove={(toIndex) => onMoveItem(index, toIndex)}
                  disabled={m.isPending}
                />
                <div className="flex gap-2">
                  <Button className={btnOutline} onClick={() => onEdit(x)}>Editar</Button>
                  <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            {open && editingId === x.id ? renderForm() : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogosTab({ data }) { return <GenericSimple title="Logos" icon={Image} desc="Marcas e parceiros." keyName="logos" data={data} template={{ name: '', logo_url: '' }} fields={(f, setF) => <><F label="Nome da Marca *" value={f.name || ''} onChange={(e) => setF({ ...f, name: e.target.value })} /><Upload label="Logo *" value={f.logo_url || ''} onChange={(v) => setF({ ...f, logo_url: v })} cropOptions={{ presets: [{ value: 'logo', label: 'Logo horizontal 16:9', aspect: 16 / 9 }, { value: 'original', label: 'Original', aspect: null }], defaultPreset: 'logo' }} /></>} subtitle={() => ''} />; }

function TestimonialsTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [dragId, setDragId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [f, setF] = useState({
    author_name: '',
    text_pt: '',
    text_en: '',
  });

  const m = useMutation({
    mutationFn: (x) => apiClient.save('testimonials', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar depoimentos.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => ({
          id: x?.id || id(),
          author_name: String(x?.author_name || x?.student_name || '').trim(),
          text_pt: String(x?.text_pt || x?.testimonial_pt || '').trim(),
          text_en: String(x?.text_en || x?.testimonial_en || '').trim(),
          order: Number.isFinite(Number(x?.order)) ? Number(x.order) : index,
        }))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => ({
      id: x?.id || id(),
      author_name: String(x?.author_name || '').trim(),
      author_photo_url: '',
      video_url: '',
      text_pt: String(x?.text_pt || '').trim(),
      text_en: String(x?.text_en || '').trim(),
      order: index,
    }));
    await m.mutateAsync(payload);
  };

  const onNew = () => {
    setOpen(true);
    setEditingId('');
    setF({ author_name: '', text_pt: '', text_en: '' });
  };

  const onEdit = (x) => {
    setOpen(true);
    setEditingId(x.id);
    setF({
      id: x.id,
      author_name: x.author_name || '',
      text_pt: x.text_pt || '',
      text_en: x.text_en || '',
    });
  };

  const onSave = async () => {
    if (savingForm) return;
    const item = {
      id: f.id || id(),
      author_name: String(f.author_name || '').trim(),
      author_photo_url: '',
      video_url: '',
      text_pt: String(f.text_pt || '').trim(),
      text_en: String(f.text_en || '').trim(),
    };
    const next = f.id ? items.map((x) => (x.id === f.id ? { ...x, ...item } : x)) : [...items, item];
    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setEditingId('');
      setF({ author_name: '', text_pt: '', text_en: '' });
    } finally {
      setSavingForm(false);
    }
  };

  const onDelete = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const onDropAt = async (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    await persist(next);
  };

  const onMoveItem = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    await persist(next);
  };

  const renderForm = () => (
    <Card className={panel}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <F label="Nome do Autor *" value={f.author_name || ''} onChange={(e) => setF({ ...f, author_name: e.target.value })} />
        <BT label="Texto do Depoimento *" pt={f.text_pt} en={f.text_en} setPt={(v) => setF({ ...f, text_pt: v })} setEn={(v) => setF({ ...f, text_en: v })} rows={4} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>Cancelar</Button>
          <Button className={btnPrimary} disabled={savingForm} onClick={onSave}>{savingForm ? 'Salvando...' : 'Salvar'}</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H title="Depoimentos" desc="Cadastre quantos depoimentos quiser e arraste para ordenar." icon={MessageSquare} />
        <Button className={btnPrimary} onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      {open && !editingId ? renderForm() : null}

      <div className="grid gap-3">
        {items.map((x, index) => (
          <div key={x.id} className="space-y-3">
            <div
              draggable
              onDragStart={() => setDragId(x.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropAt(x.id)}
              className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <p className="font-medium truncate">{x.author_name || 'Depoimento'}</p>
                  <p className="text-xs text-zinc-400 line-clamp-1">{x.text_pt || x.text_en || ''}</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                <ReorderButtons
                  index={index}
                  total={items.length}
                  onMove={(toIndex) => onMoveItem(index, toIndex)}
                  disabled={m.isPending}
                />
                <div className="flex gap-2">
                  <Button className={btnOutline} onClick={() => onEdit(x)}>Editar</Button>
                  <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            {open && editingId === x.id ? renderForm() : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [f, setF] = useState({
    question_pt: '',
    question_en: '',
    answer_pt: '',
    answer_en: '',
  });

  const m = useMutation({
    mutationFn: (x) => apiClient.save('faqs', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['faqs'] }),
    onError: (err) => window.alert(err?.message || 'Falha ao salvar FAQ.'),
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => ({
          id: x?.id || id(),
          question_pt: String(x?.question_pt || '').trim(),
          question_en: String(x?.question_en || '').trim(),
          answer_pt: String(x?.answer_pt || '').trim(),
          answer_en: String(x?.answer_en || '').trim(),
          order: Number.isFinite(Number(x?.order)) ? Number(x.order) : index,
        }))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  const persist = async (nextItems) => {
    const payload = nextItems.map((x, index) => ({
      id: x?.id || id(),
      question_pt: String(x?.question_pt || '').trim(),
      question_en: String(x?.question_en || '').trim(),
      answer_pt: String(x?.answer_pt || '').trim(),
      answer_en: String(x?.answer_en || '').trim(),
      order: index,
    }));
    await m.mutateAsync(payload);
  };

  const onNew = () => {
    setOpen(true);
    setEditingId('');
    setF({ question_pt: '', question_en: '', answer_pt: '', answer_en: '' });
  };

  const onEdit = (x) => {
    setOpen(true);
    setEditingId(x.id);
    setF({
      id: x.id,
      question_pt: x.question_pt || '',
      question_en: x.question_en || '',
      answer_pt: x.answer_pt || '',
      answer_en: x.answer_en || '',
    });
  };

  const onSave = async () => {
    if (savingForm) return;
    const item = {
      id: f.id || id(),
      question_pt: String(f.question_pt || '').trim(),
      question_en: String(f.question_en || '').trim(),
      answer_pt: String(f.answer_pt || '').trim(),
      answer_en: String(f.answer_en || '').trim(),
    };
    const next = f.id ? items.map((x) => (x.id === f.id ? { ...x, ...item } : x)) : [...items, item];
    try {
      setSavingForm(true);
      await persist(next);
      setOpen(false);
      setEditingId('');
      setF({ question_pt: '', question_en: '', answer_pt: '', answer_en: '' });
    } finally {
      setSavingForm(false);
    }
  };

  const onDelete = async (xid) => {
    await persist(items.filter((x) => x.id !== xid));
  };

  const renderForm = () => (
    <Card className={panel}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <BI label="Pergunta *" pt={f.question_pt} en={f.question_en} setPt={(v) => setF({ ...f, question_pt: v })} setEn={(v) => setF({ ...f, question_en: v })} />
        <BT label="Resposta *" pt={f.answer_pt} en={f.answer_en} setPt={(v) => setF({ ...f, answer_pt: v })} setEn={(v) => setF({ ...f, answer_en: v })} rows={5} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>Cancelar</Button>
          <Button className={btnPrimary} disabled={savingForm} onClick={onSave}>{savingForm ? 'Salvando...' : 'Salvar'}</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H title="FAQ" desc="Perguntas frequentes." icon={HelpCircle} />
        <Button className={btnPrimary} onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      {open && !editingId ? renderForm() : null}

      <div className="grid gap-3">
        {items.map((x) => (
          <div key={x.id} className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium truncate">{x.question_pt || x.question_en || 'Pergunta'}</p>
                <p className="text-xs text-zinc-400 line-clamp-1">{x.answer_pt || x.answer_en || ''}</p>
              </div>
              <div className="flex w-full justify-end gap-2 sm:w-auto">
                <Button className={btnOutline} onClick={() => onEdit(x)}>Editar</Button>
                <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {open && editingId === x.id ? renderForm() : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterTab({ data }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [f, setF] = useState({
    show_in_course: true,
    show_in_luts: false,
    title_pt: '',
    title_en: '',
    before_url: '',
    during_url: '',
    after_url: '',
  });
  const [dragId, setDragId] = useState('');
  const seededRef = React.useRef(false);

  const m = useMutation({
    mutationFn: (x) => apiClient.save('beforeAfter', x),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['beforeAfter'] }),
    onError: (err) => {
      const message = err?.message || 'Falha ao salvar Antes/Depois.';
      window.alert(message);
    },
  });

  const items = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .map((x, index) => normalizeBeforeAfter(x, index))
        .sort((a, b) => a.order - b.order),
    [data]
  );

  useEffect(() => {
    if (seededRef.current) return;
    if (m.isPending) return;
    if (!Array.isArray(data)) return;
    if (data.length > 0) return;
    seededRef.current = true;
    m.mutate(DEFAULT_BEFORE_AFTER.map((x) => toBeforeAfterPayload(x)));
  }, [data, m.isPending]);

  useEffect(() => {
    if (m.isPending) return;
    if (!Array.isArray(data) || data.length === 0) return;

    const normalizedItems = data.map((x, index) => normalizeBeforeAfter(x, index));
    const existingIds = new Set(normalizedItems.map((item) => item.id));
    const missingDefaults = DEFAULT_BEFORE_AFTER.filter((item) => !existingIds.has(item.id));
    const hasLegacyDescriptionFields = data.some((item) => 'description_pt' in (item || {}) || 'description_en' in (item || {}));

    if (missingDefaults.length === 0 && !hasLegacyDescriptionFields) return;

    const nextItems = [...normalizedItems, ...missingDefaults.map((item) => normalizeBeforeAfter(item))];
    persist(nextItems);
  }, [data, m.isPending]);

  const persist = (nextItems, opts = {}) => {
    const withOrder = nextItems.map((x, index) => toBeforeAfterPayload({ ...x, order: index }));
    m.mutate(withOrder, opts);
  };

  const onNew = () => {
    setF({
      show_in_course: true,
      show_in_luts: false,
      title_pt: '',
      title_en: '',
      before_url: '',
      during_url: '',
      after_url: '',
    });
    setOpen(true);
    setEditingId('');
  };

  const onEdit = (x) => {
    const item = normalizeBeforeAfter(x);
    setF(item);
    setOpen(true);
    setEditingId(item.id);
  };

  const onDelete = (xid) => {
    persist(items.filter((x) => x.id !== xid));
  };

  const onSave = async () => {
    if (savingForm) return;
    const item = normalizeBeforeAfter(f, items.length);
    const next = f.id ? items.map((x) => (x.id === f.id ? item : x)) : [...items, item];
    try {
      setSavingForm(true);
      await m.mutateAsync(next.map((x, index) => toBeforeAfterPayload({ ...x, order: index })));
      setOpen(false);
      setEditingId('');
      setF({
        show_in_course: true,
        show_in_luts: false,
        title_pt: '',
        title_en: '',
        before_url: '',
        during_url: '',
        after_url: '',
      });
    } finally {
      setSavingForm(false);
    }
  };

  const onDropAt = (targetId) => {
    if (!dragId || dragId === targetId) return;
    const fromIndex = items.findIndex((x) => x.id === dragId);
    const toIndex = items.findIndex((x) => x.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setDragId('');
    persist(next);
  };

  const onMoveItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    persist(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H
          title="Antes / Depois"
          desc="Arraste e solte para escolher a ordem. 3 fotos por cadastro: antes, durante e depois."
          icon={LayoutDashboard}
        />
        <Button className={btnPrimary} onClick={onNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo
        </Button>
      </div>

      <div className="grid gap-3">
        {items.map((x, index) => (
          <div key={x.id} className="space-y-3">
            <div
              draggable
              onDragStart={() => setDragId(x.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropAt(x.id)}
              className="rounded-xl border border-white/10 bg-[#0d1117] p-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <p className="font-medium truncate">{x.title_pt || x.title_en || 'Item'}</p>
                  <p className="text-xs text-zinc-400">
                    Posição {num(x.order, 0) + 1}
                    {' • '}
                    {[
                      x.show_in_course !== false ? 'Curso' : null,
                      x.show_in_luts === true ? 'LUTs' : null,
                    ].filter(Boolean).join(' / ') || 'Oculto'}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                <ReorderButtons
                  index={index}
                  total={items.length}
                  onMove={(toIndex) => onMoveItem(index, toIndex)}
                  disabled={m.isPending}
                />
                <div className="flex gap-2">
                  <Button className={btnOutline} onClick={() => onEdit(x)}>
                    Editar
                  </Button>
                  <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => onDelete(x.id)} disabled={m.isPending}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            {open && editingId === x.id ? (
              <Card className={panel}>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <BI
                    label="Título *"
                    pt={f.title_pt}
                    en={f.title_en}
                    setPt={(v) => setF({ ...f, title_pt: v })}
                    setEn={(v) => setF({ ...f, title_en: v })}
                  />
                  <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
                    <Label className="text-zinc-300 mb-2 block">Exibição do Antes / Depois</Label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 text-zinc-200">
                        <input
                          type="checkbox"
                          className="accent-white"
                          checked={f.show_in_course !== false}
                          onChange={(e) => setF({ ...f, show_in_course: e.target.checked })}
                        />
                        Mostrar este item no produto Curso
                      </label>
                      <label className="flex items-center gap-2 text-zinc-200">
                        <input
                          type="checkbox"
                          className="accent-white"
                          checked={f.show_in_luts === true}
                          onChange={(e) => setF({ ...f, show_in_luts: e.target.checked })}
                        />
                        Mostrar este item no produto LUTs
                      </label>
                    </div>
                  </div>
                  <Upload
                    label="Imagem Antes *"
                    value={f.before_url || ''}
                    onChange={(v) => setF({ ...f, before_url: v })}
                    cropOptions={{
                      presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                      defaultPreset: 'before-after',
                      lockPreset: true,
                    }}
                  />
                  <Upload
                    label="Imagem Durante *"
                    value={f.during_url || ''}
                    onChange={(v) => setF({ ...f, during_url: v })}
                    cropOptions={{
                      presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                      defaultPreset: 'before-after',
                      lockPreset: true,
                    }}
                  />
                  <Upload
                    label="Imagem Depois *"
                    value={f.after_url || ''}
                    onChange={(v) => setF({ ...f, after_url: v })}
                    cropOptions={{
                      presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                      defaultPreset: 'before-after',
                      lockPreset: true,
                    }}
                  />
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>
                      Cancelar
                    </Button>
                    <Button className={btnPrimary} onClick={onSave} disabled={savingForm}>
                      {savingForm ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ))}
      </div>

      {open && !editingId ? (
        <Card className={panel}>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <BI
              label="Título *"
              pt={f.title_pt}
              en={f.title_en}
              setPt={(v) => setF({ ...f, title_pt: v })}
              setEn={(v) => setF({ ...f, title_en: v })}
            />
            <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
              <Label className="text-zinc-300 mb-2 block">Exibição do Antes / Depois</Label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-zinc-200">
                  <input
                    type="checkbox"
                    className="accent-white"
                    checked={f.show_in_course !== false}
                    onChange={(e) => setF({ ...f, show_in_course: e.target.checked })}
                  />
                  Mostrar este item no produto Curso
                </label>
                <label className="flex items-center gap-2 text-zinc-200">
                  <input
                    type="checkbox"
                    className="accent-white"
                    checked={f.show_in_luts === true}
                    onChange={(e) => setF({ ...f, show_in_luts: e.target.checked })}
                  />
                  Mostrar este item no produto LUTs
                </label>
              </div>
            </div>
            <Upload
              label="Imagem Antes *"
              value={f.before_url || ''}
              onChange={(v) => setF({ ...f, before_url: v })}
              cropOptions={{
                presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                defaultPreset: 'before-after',
                lockPreset: true,
              }}
            />
            <Upload
              label="Imagem Durante *"
              value={f.during_url || ''}
              onChange={(v) => setF({ ...f, during_url: v })}
              cropOptions={{
                presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                defaultPreset: 'before-after',
                lockPreset: true,
              }}
            />
            <Upload
              label="Imagem Depois *"
              value={f.after_url || ''}
              onChange={(v) => setF({ ...f, after_url: v })}
              cropOptions={{
                presets: [{ value: 'before-after', label: 'Antes/Depois 16:9', aspect: 16 / 9 }],
                defaultPreset: 'before-after',
                lockPreset: true,
              }}
            />
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button className={btnOutline} onClick={() => { setOpen(false); setEditingId(''); }}>
                Cancelar
              </Button>
              <Button className={btnPrimary} onClick={onSave} disabled={savingForm}>
                {savingForm ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function GenericSimple({ title, icon, desc, keyName, data, template, fields, subtitle, mapIn = (x) => x, mapOut = (x) => x }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(template);
  const m = useMutation({ mutationFn: (x) => apiClient.save(keyName, x), onSuccess: () => qc.invalidateQueries({ queryKey: [keyName] }) });
  const edit = (x) => { setOpen(true); setF(mapIn(x)); };
  const save = () => { const item = { ...mapOut(f), id: f.id || id() }; const next = f.id ? data.map((x) => x.id === f.id ? item : x) : [...(data || []), item]; m.mutate(next); setOpen(false); setF(template); };
  const del = (xid) => m.mutate((data || []).filter((x) => x.id !== xid));
  return <div className="space-y-6"><CrudList title={title} desc={desc} icon={icon} data={data} onNew={() => { setOpen(true); setF(template); }} onEdit={edit} onDelete={del} subtitle={subtitle} />{open ? <Card className={panel}><CardContent className="p-4 sm:p-6 space-y-4">{fields(f, setF)}<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button className={btnOutline} onClick={() => setOpen(false)}>Cancelar</Button><Button className={btnPrimary} onClick={save}>Salvar</Button></div></CardContent></Card> : null}</div>;
}
