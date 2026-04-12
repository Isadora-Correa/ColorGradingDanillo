import React from 'react';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { useLanguage } from '../ui/LanguageContext';

const FEATURE_CARDS = [
  {
    id: 'professional',
    image: '/1.1.1_1.1.1.jpg',
    titlePt: 'Feito para tornar você um colorista profissional com resultados',
    titleEn: 'Built to turn you into a professional colorist with real results',
    descPt: 'Um curso robusto do básico ao avançado, com técnicas aplicadas no mercado internacional.',
    descEn: 'A robust course from fundamentals to advanced, with techniques used in the international market.',
  },
  {
    id: 'portfolio',
    image: '/1.15.1_1.15.1.jpg',
    titlePt: 'Seu Portfólio Masterpiece Garantido',
    titleEn: 'Your Masterpiece Portfolio Guaranteed',
    descPt: 'Ao decorrer do curso, vamos colorir dois projetos inteiros do início ao fim.',
    descEn: 'Throughout the course, we grade two complete projects from start to finish.',
  },
  {
    id: 'material',
    image: '/1.6.1_1.6.1.jpg',
    titlePt: 'Mais de 300GB de material bruto gratuito',
    titleEn: 'Over 300GB of free raw practice material',
    descPt: 'Incluindo B-Roll e imagens para prática real de color grading.',
    descEn: 'Including B-roll and footage for real-world color grading practice.',
  },
  {
    id: 'premiere',
    image: '/1.8.1_1.8.1.jpg',
    titlePt: 'Acesso Vitalício',
    titleEn: 'Lifetime Access',
    descPt: 'Uma vez seu, sempre seu. Seu guia de color grading disponível sempre que você precisar.',
    descEn: 'Once it is yours, it is always yours. Your color grading guide is available whenever you need it.',
  },
];

function splitTitleInTwoLines(text = '') {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return ['', ''];
  const words = normalized.split(' ');
  if (words.length <= 1) return [normalized, ''];

  const totalLength = words.reduce((acc, w) => acc + w.length, 0);
  let bestIndex = 1;
  let bestDiff = Infinity;
  let leftLen = 0;

  for (let i = 1; i < words.length; i += 1) {
    leftLen += words[i - 1].length;
    const rightLen = totalLength - leftLen;
    const diff = Math.abs(leftLen - rightLen);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i;
    }
  }

  return [words.slice(0, bestIndex).join(' '), words.slice(bestIndex).join(' ')];
}

function renderUppercaseHighlight(text = '') {
  const parts = String(text || '').split(/(\s+)/);
  return parts.map((part, index) => {
    const clean = part.replace(/[^A-Za-zÀ-ÿ0-9]/g, '');
    const isUpperWord =
      clean.length > 1 &&
      clean === clean.toUpperCase() &&
      clean !== clean.toLowerCase();

    if (!isUpperWord) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;

    return (
      <GlowText
        key={`${part}-${index}`}
        className="font-extrabold not-italic"
        gradient="from-[#ff4d74] via-[#9be15d] via-[#00dcff] to-[#7e5eff]"
        glowColor="rgba(120,220,255,0.42)"
      >
        {part}
      </GlowText>
    );
  });
}

export default function CourseHighlightsGallery({ content = {} }) {
  const { t } = useLanguage();
  const fallbackImage = '/nava.webp';
  const headingFull = t(
    content.highlights_title_pt ||
      [content.highlights_title_line1_pt, content.highlights_title_line2_pt].filter(Boolean).join(' ').trim() ||
      'Conheça o curso que vai trazer COR para sua carreira.',
    content.highlights_title_en ||
      [content.highlights_title_line1_en, content.highlights_title_line2_en].filter(Boolean).join(' ').trim() ||
      'Discover the course that brings COLOR to your career.'
  );
  const [headingLine1, headingLine2] = splitTitleInTwoLines(headingFull);
  const cards = FEATURE_CARDS.map((card, index) => {
    const item = index + 1;
    return {
      ...card,
      image: content[`highlight_${item}_image_url`] || card.image,
      titlePt: content[`highlight_${item}_title_pt`] || card.titlePt,
      titleEn: content[`highlight_${item}_title_en`] || card.titleEn,
      descPt: content[`highlight_${item}_desc_pt`] || card.descPt,
      descEn: content[`highlight_${item}_desc_en`] || card.descEn,
    };
  });

  return (
    <SectionBlock gradient className="overflow-hidden">
      <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
        <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-white md:text-4xl">
          <span className="block">{renderUppercaseHighlight(headingLine1)}</span>
          <span className="block">{renderUppercaseHighlight(headingLine2)}</span>
        </h3>

        <img
          src="/logo-icone.webp"
          alt="Nava"
          className="hidden h-14 w-14 shrink-0 object-contain md:block"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.id}
            className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/40 md:min-h-[430px]"
          >
            <img
              src={card.image}
              alt={t(card.titlePt, card.titleEn)}
              onError={(event) => {
                event.currentTarget.src = fallbackImage;
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                card.id === 'professional' ? 'object-[center_12%] md:object-[center_6%] lg:object-[center_0%]' : 'object-center'
              }`}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/85" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-black/55 blur-2xl" />

            <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
              <h4 className="mb-2 text-2xl font-semibold leading-tight text-white md:text-4xl">
                {t(card.titlePt, card.titleEn)}
              </h4>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-200/90 md:text-base">
                {t(card.descPt, card.descEn)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionBlock>
  );
}
