import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';

const SHOWREEL_EMBED = 'https://player.vimeo.com/video/944559078?title=0&byline=0&portrait=0&badge=0';

const SOCIALS = [
  {
    key: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/navacolorist/',
    icon: 'https://cdn.simpleicons.org/instagram/FFFFFF',
  },
  {
    key: 'vimeo',
    name: 'Vimeo',
    url: 'https://vimeo.com/dnava',
    icon: 'https://cdn.simpleicons.org/vimeo/FFFFFF',
  },
  {
    key: 'imdb',
    name: 'IMDb',
    url: 'https://www.imdb.com/name/nm15105370/?ref_=nv_sr_srsg_0_tt_0_nm_8_in_0_q_danilo%2520navarro',
    icon: 'https://cdn.simpleicons.org/imdb/FFFFFF',
  },
];

const BIO = {
  pt: [
    'Nava é um colorista profissional que atua em grandes projetos internacionais, colaborando com diretores e fotógrafos em diferentes formatos, de comerciais a séries e filmes.',
    'Seu trabalho é focado em usar a cor como ferramenta narrativa, aplicando workflows reais do mercado para criar imagens com identidade e impacto visual. Ao longo dos anos, assinou projetos para grandes marcas globais, além de séries internacionais, documentários, curtas e filmes premiados.',
    'Hoje, além de atuar como Colorista Senior, Nava também compartilha sua experiência com videomakers e coloristas que querem elevar o nível do seu trabalho e dominar o Color Grading de forma criativa, estratégica e profissional.',
  ],
  en: [
    'Nava is a professional colorist working on major international projects, collaborating with directors and cinematographers across formats, from high-end commercials to series and films.',
    'His work uses color as a narrative tool, applying real market workflows to create images with identity and visual impact. Over the years, he has delivered projects for global brands, as well as international series, documentaries, shorts and award-winning films.',
    'Today, in addition to working as a Senior Colorist, Nava shares his experience with videomakers and colorists who want to raise the level of their work and master Color Grading creatively, strategically and professionally.',
  ],
};

const DEFAULT_HIGHLIGHTS = {
  pt: [
    {
      title: 'Tempo de carreira',
      value: 'Atuando no audiovisual em projetos internacionais.',
    },
    {
      title: 'Alunos',
      value: '+ de 150 alunos',
    },
    {
      title: 'Clientes',
      value: '+ de 100 comerciais, séries e filmes premiados',
    },
  ],
  en: [
    {
      title: 'Career time',
      value: 'Working in audiovisual with international projects.',
    },
    {
      title: 'Students',
      value: '150+ students',
    },
    {
      title: 'Clients',
      value: '100+ award-winning commercials, series and films',
    },
  ],
};

function toEmbedUrl(rawUrl) {
  const url = String(rawUrl || '').trim();
  if (!url) return SHOWREEL_EMBED;
  if (url.includes('player.vimeo.com/video/') || url.includes('youtube.com/embed/')) return url;

  const youtubeWatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (youtubeWatch?.[1]) return `https://www.youtube.com/embed/${youtubeWatch[1]}`;

  const youtubeShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (youtubeShort?.[1]) return `https://www.youtube.com/embed/${youtubeShort[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo?.[1]) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return url;
}

function splitBio(rawText) {
  return String(rawText || '')
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function splitHighlightValue(text) {
  const raw = String(text || '').trim();
  const match = raw.match(/(\+\s*de\s*\d+\s*anos?|\+\s*de\s*\d+|\+\s*\d+\s*anos?|\d+\+\s*years?|\+\s*\d+|\d+\+)/i);
  if (!match) return { number: '', detail: raw };
  const number = match[0].replace(/\s+/g, ' ').trim();
  const detail = raw.replace(match[0], '').replace(/^[\s,.-]+/, '').trim();
  return { number, detail };
}

export default function InstructorSection({ content = {} }) {
  const { language, t } = useLanguage();
  const [photoSrc, setPhotoSrc] = useState(content.instructor_photo_url || '/nava.webp');
  const [iconError, setIconError] = useState({});

  useEffect(() => setPhotoSrc(content.instructor_photo_url || '/nava.webp'), [content.instructor_photo_url]);

  const isPt = language === 'pt';
  const instructorName = String(content.instructor_name || '').trim() || 'Danilo Navarro';

  const bioParagraphs = useMemo(() => {
    const fallback = isPt ? BIO.pt : BIO.en;
    const raw = isPt ? content.instructor_bio_pt : content.instructor_bio_en;
    const dynamicBio = splitBio(raw);
    return dynamicBio.length > 0 ? dynamicBio : fallback;
  }, [content.instructor_bio_en, content.instructor_bio_pt, isPt]);

  const highlights = useMemo(() => {
    if (isPt) {
      return [
        {
          title: DEFAULT_HIGHLIGHTS.pt[0].title,
          value: content.instructor_career_text_pt || DEFAULT_HIGHLIGHTS.pt[0].value,
        },
        {
          title: DEFAULT_HIGHLIGHTS.pt[1].title,
          value: content.instructor_students_count_pt || DEFAULT_HIGHLIGHTS.pt[1].value,
        },
        {
          title: DEFAULT_HIGHLIGHTS.pt[2].title,
          value: content.instructor_clients_count_pt || DEFAULT_HIGHLIGHTS.pt[2].value,
        },
      ];
    }

    return [
      {
        title: DEFAULT_HIGHLIGHTS.en[0].title,
        value: content.instructor_career_text_en || DEFAULT_HIGHLIGHTS.en[0].value,
      },
      {
        title: DEFAULT_HIGHLIGHTS.en[1].title,
        value: content.instructor_students_count_en || DEFAULT_HIGHLIGHTS.en[1].value,
      },
      {
        title: DEFAULT_HIGHLIGHTS.en[2].title,
        value: content.instructor_clients_count_en || DEFAULT_HIGHLIGHTS.en[2].value,
      },
    ];
  }, [
    content.instructor_career_text_en,
    content.instructor_career_text_pt,
    content.instructor_clients_count_en,
    content.instructor_clients_count_pt,
    content.instructor_students_count_en,
    content.instructor_students_count_pt,
    isPt,
  ]);

  const showreelUrl = useMemo(() => toEmbedUrl(content.instructor_showreel_url), [content.instructor_showreel_url]);

  return (
    <SectionBlock gradient noPadding className="overflow-hidden">
      <div className="relative h-[280px] w-full md:h-[360px] lg:h-[420px]">
        <div className="absolute right-4 top-4 z-20 flex flex-col items-center gap-2 md:right-6 md:top-6">
          {SOCIALS.map((item) => {
            const hasIcon = !iconError[item.key];
            return (
              <a
                key={item.key}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                title={item.name}
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-black/45 p-2 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-black/70"
              >
                {hasIcon ? (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                    onError={() => setIconError((prev) => ({ ...prev, [item.key]: true }))}
                  />
                ) : (
                  <span className="text-[10px] font-semibold text-zinc-100">{item.name.slice(0, 2).toUpperCase()}</span>
                )}
              </a>
            );
          })}
        </div>

        <img
          src={photoSrc}
          alt={instructorName}
          className="h-full w-full object-cover object-center md:object-[center_22%] lg:object-[center_24%]"
          loading="lazy"
          decoding="async"
          onError={() => {
            if (photoSrc !== '/nava.webp') setPhotoSrc('/nava.webp');
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b13]/80 via-[#080b13]/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-zinc-300">
            {t('Conheça o seu professor', 'Meet your instructor')}
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            <GlowText
              className="font-extrabold"
              gradient="from-[#ff3d77] via-[#9be15d] via-[#00e5ff] to-[#7b61ff]"
              glowColor="rgba(120,220,255,0.35)"
            >
              {instructorName}
            </GlowText>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 md:p-8 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-4 text-zinc-200 lg:col-span-8">
          {bioParagraphs.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed text-[15px] md:text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
          {highlights.map((item) => {
            const parts = splitHighlightValue(item.value);
            return (
            <div
              key={`${item.title}-${item.value}`}
              className="rounded-xl border border-white/10 bg-black/30 p-3.5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {item.title}
              </p>
              {parts.number ? (
                <p className="mt-1 text-2xl font-extrabold leading-none text-white">{parts.number}</p>
              ) : null}
              <p className={`mt-1 leading-relaxed text-zinc-200 ${parts.number ? 'text-xs' : 'text-sm font-medium'}`}>
                {parts.detail || item.value}
              </p>
            </div>
          );
          })}
        </div>

        <div className="lg:col-span-12">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60">
            <div className="aspect-video w-full">
              <iframe
                src={showreelUrl}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                title={t(`Showreel do ${instructorName}`, `${instructorName} showreel`)}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}
