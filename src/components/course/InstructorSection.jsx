import React, { useState } from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { Clock3, Users, Film } from 'lucide-react';

const SHOWREEL_EMBED = 'https://player.vimeo.com/video/944559078?title=0&byline=0&portrait=0&badge=0';

const STATS = {
  pt: [
    { icon: Clock3, title: 'Tempo de carreira', text: 'Atuando no audiovisual em projetos internacionais.' },
    { icon: Users, title: '+ de 150 alunos', text: 'Formando videomakers e coloristas em nivel profissional.' },
    { icon: Film, title: '+ de 100 projetos', text: 'Comerciais, series e filmes premiados.' },
  ],
  en: [
    { icon: Clock3, title: 'Career time', text: 'Working in audiovisual with international projects.' },
    { icon: Users, title: '+150 students', text: 'Training videomakers and colorists at a professional level.' },
    { icon: Film, title: '+100 projects', text: 'Commercials, series and award-winning films.' },
  ],
};

const BIO = {
  pt: [
    'Nava e um colorista profissional que atua em grandes projetos internacionais, colaborando com diretores e fotografos em diferentes formatos, de comerciais high end a series e filmes.',
    'Seu trabalho e focado em usar a cor como ferramenta narrativa, aplicando workflows reais do mercado para criar imagens com identidade e impacto visual. Ao longo dos anos, assinou projetos para grandes marcas globais, alem de series internacionais, documentarios, curtas e filmes premiados.',
    'Hoje, alem de atuar como Colorista Senior, Nava tambem compartilha sua experiencia com videomakers e coloristas que querem elevar o nivel do seu trabalho e dominar o Color Grading de forma criativa, estrategica e profissional.',
  ],
  en: [
    'Nava is a professional colorist working on major international projects, collaborating with directors and cinematographers across formats, from high-end commercials to series and films.',
    'His work uses color as a narrative tool, applying real market workflows to create images with identity and visual impact. Over the years, he has delivered projects for global brands, as well as international series, documentaries, shorts and award-winning films.',
    'Today, in addition to working as a Senior Colorist, Nava shares his experience with videomakers and colorists who want to raise the level of their work and master Color Grading creatively, strategically and professionally.',
  ],
};

export default function InstructorSection() {
  const { language, t } = useLanguage();
  const [photoSrc, setPhotoSrc] = useState('/nava.jpg');

  const isPt = language === 'pt';
  const stats = isPt ? STATS.pt : STATS.en;
  const bioParagraphs = isPt ? BIO.pt : BIO.en;
  const instructorName = 'Danilo Navarro';

  return (
    <SectionBlock gradient noPadding className="overflow-hidden">
      <div className="relative h-[280px] w-full md:h-[360px] lg:h-[420px]">
        <img
          src={photoSrc}
          alt={instructorName}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setPhotoSrc('/nava.jpg')}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b13]/75 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-zinc-300">
            {t('Conheca seu professor', 'Meet your instructor')}
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

      <div className="grid grid-cols-1 gap-6 p-5 md:p-8 lg:grid-cols-12">
        <div className="space-y-4 text-zinc-200 lg:col-span-7">
          {bioParagraphs.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-black/25 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  <p className="font-semibold text-white">{item.title}</p>
                </div>
                <p className="text-sm text-zinc-300">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-12">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60">
            <div className="aspect-video w-full">
              <iframe
                src={SHOWREEL_EMBED}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
                title={t('Showreel do Danilo Navarro', 'Danilo Navarro showreel')}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}
