import React from 'react';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { useLanguage } from '../ui/LanguageContext';

const FEATURE_CARDS = [
  {
    id: 'professional',
    image: '/imagem1.webp',
    titlePt: 'Feito para tornar voce um colorista profissional com resultados',
    titleEn: 'Built to turn you into a professional colorist with real results',
    descPt: 'Um curso robusto do basico ao avancado, com tecnicas aplicadas no mercado internacional.',
    descEn: 'A robust course from fundamentals to advanced, with techniques used in the international market.',
  },
  {
    id: 'portfolio',
    image: '/imagem2.webp',
    titlePt: 'Seu Portfolio Masterpiece Garantido',
    titleEn: 'Your Masterpiece Portfolio Guaranteed',
    descPt: 'Ao decorrer do curso, vamos colorir dois projetos inteiros do inicio ao fim.',
    descEn: 'Throughout the course, we grade two complete projects from start to finish.',
  },
  {
    id: 'material',
    image: '/produto1.webp',
    titlePt: 'Mais de 300GB de material bruto gratuito',
    titleEn: 'Over 300GB of free raw practice material',
    descPt: 'Incluindo B-Roll e imagens para pratica real de color grading.',
    descEn: 'Including B-roll and footage for real-world color grading practice.',
  },
  {
    id: 'premiere',
    image: '/imagem3.webp',
    titlePt: 'Colorir no Premiere e mais dificil e ineficaz',
    titleEn: 'Color grading in Premiere is harder and less effective',
    descPt: 'Aqui voce aprende a extrair todo o potencial com fluxo profissional.',
    descEn: 'Here you learn to unlock full potential with a professional workflow.',
  },
];

export default function CourseHighlightsGallery() {
  const { t } = useLanguage();

  return (
    <SectionBlock gradient className="overflow-hidden">
      <div className="mb-6 flex items-start justify-between gap-4 md:mb-8">
        <h3 className="max-w-3xl text-2xl font-semibold leading-tight text-white md:text-4xl">
          <span className="block">
            {t('Conheca o curso que vai trazer', 'Discover the course that brings')}{' '}
            <GlowText
              className="font-extrabold"
              gradient="from-[#ff4d74] via-[#9be15d] via-[#00dcff] to-[#7e5eff]"
              glowColor="rgba(120,220,255,0.42)"
            >
              {t('COR', 'COLOR')}
            </GlowText>
          </span>
          <span className="block">{t('para sua carreira.', 'to your career.')}</span>
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
        {FEATURE_CARDS.map((card) => (
          <article
            key={card.id}
            className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/40 md:min-h-[430px]"
          >
            <img
              src={card.image}
              alt={t(card.titlePt, card.titleEn)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
