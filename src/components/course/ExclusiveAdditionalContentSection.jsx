import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';

const EXTRA_CARDS = [
  {
    id: 'fashion-film',
    image: '/cards/fashionFilm.jpg',
    align: 'right',
    titlePt: 'Colorindo um Fashion Film de Londres',
    titleEn: 'Grading a London Fashion Film',
    descPt:
      'Acompanhe o workflow real de um colorista em um projeto para um cliente internacional. Do material bruto ao resultado final, Nava aplica na prática as técnicas ensinadas ao longo do curso em um fashion film completo.',
    descEn:
      'Follow a real colorist workflow on a project for an international client. From raw footage to final result, Nava applies in practice the techniques taught throughout the course in a complete fashion film.',
  },
  {
    id: 'feature-film',
    image: '/cards/filme.jpg',
    align: 'left',
    titlePt: 'Colorindo um Filme Internacional',
    titleEn: 'Grading an International Feature Film',
    descPt:
      'Acompanhe as principais etapas de color grading de um filme de 2 horas, com foco em organização, narrativa e workflow profissional para projetos de longo-formato.',
    descEn:
      'Follow the key stages of grading a 2-hour film, with a focus on organization, narrative, and professional workflow for long-form projects.',
    notePt: 'em desenvolvimento, com aulas já disponíveis',
    noteEn: 'in development, with lessons already available',
  },
];

export default function ExclusiveAdditionalContentSection() {
  const { t } = useLanguage();

  return (
    <SectionBlock gradient className="overflow-hidden">
      <SectionTitle
        line1={t('Conteúdo Adicional', 'Additional Content')}
        highlight={t('Exclusivo', 'Exclusive')}
        subtitle={t(
          'Módulos extras com workflows de projetos reais.',
          'Extra modules with real-project workflows.'
        )}
      />

      <div className="space-y-4 md:space-y-5">
        {EXTRA_CARDS.map((card, index) => {
          const isRight = card.align === 'right';

          return (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/60 md:min-h-[420px]"
            >
              <img
                src={card.image}
                alt={t(card.titlePt, card.titleEn)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/18 md:from-black/75 md:via-black/35 md:to-transparent" />
              <div
                className={`absolute inset-y-0 w-full md:w-[58%] ${
                  isRight
                    ? 'right-0 bg-gradient-to-l from-black/85 via-black/55 to-transparent'
                    : 'left-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent'
                }`}
              />

              <div
                className={`relative z-10 flex min-h-[340px] items-end p-5 md:min-h-[420px] md:p-8 ${
                  isRight ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`max-w-[520px] ${isRight ? 'text-right' : 'text-left'}`}>
                  {card.notePt ? (
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300/80">
                      {t(card.notePt, card.noteEn)}
                    </p>
                  ) : null}
                  <h3 className="mb-3 text-3xl font-semibold leading-[1.02] tracking-tight text-white md:text-5xl">
                    {t(card.titlePt, card.titleEn)}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-zinc-200/90 md:text-base">
                    {t(card.descPt, card.descEn)}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionBlock>
  );
}
