import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';

const STUDENT_RESULTS = [
  {
    name: 'Julia Muniz',
    photo: '/julia/julia.png',
    videoEmbed: 'https://player.vimeo.com/video/1167172670?h=950940ccee&title=0&byline=0&portrait=0&badge=0',
    logos: [
      '/julia/Amazon-Prime-Video-Emblem.png',
      '/julia/farm-rio-logo-0.png',
      '/julia/heineken-14-logo-png-transparent.png',
      '/julia/melissa-logo.png',
    ],
    reviewPt:
      '"O curso me deu clareza de processo e confiança para entregar projetos com padrão profissional."',
    reviewEn:
      '"The course gave me process clarity and confidence to deliver projects at a professional standard."',
  },
  {
    name: 'Clysmann',
    photo: '/clys/clys.png',
    videoEmbed: 'https://player.vimeo.com/video/1167178291?h=7f73306080&title=0&byline=0&portrait=0&badge=0',
    logos: [
      '/clys/Disney%20Plus.png',
      '/clys/ESPN_wordmark.svg.png',
      '/clys/Logo_globo_principal-laranja.png',
      '/clys/prime%20sports.jpg',
    ],
    reviewPt:
      '"Com o método do curso, meu workflow ficou mais rápido e minhas entregas ficaram muito mais consistentes."',
    reviewEn:
      '"With the course method, my workflow became faster and my deliveries much more consistent."',
  },
];

export default function StudentShowcase() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <SectionTitle
        line1={t('Resultados dos Alunos', 'Student Results')}
        subtitle={t('Veja o que nossos alunos conquistaram', 'See what our students have achieved')}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {STUDENT_RESULTS.map((student) => (
          <SectionBlock key={student.name} gradient>
            <div className="flex h-full flex-col items-center text-center">
              <div className="mb-4 flex w-full items-center justify-start gap-4 text-left">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-16 w-16 rounded-full border border-white/20 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60">
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe
                    src={student.videoEmbed}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Showreel ${student.name}`}
                  />
                </div>
              </div>

              <div className="mt-4 w-full">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  {t('Marcas que o aluno trabalhou', 'Brands this student has worked with')}
                </p>

                <div
                  className={`mb-4 flex items-center gap-x-6 gap-y-3 ${
                    student.name === 'Clysmann'
                      ? 'w-full flex-nowrap justify-between overflow-hidden md:flex-wrap md:justify-center'
                      : 'flex-wrap justify-center'
                  }`}
                >
                  {student.logos.map((logo) => (
                    <img
                      key={logo}
                      src={logo}
                      alt="Marca"
                      className={`shrink-0 w-auto object-contain brightness-0 invert ${
                        student.name === 'Clysmann'
                          ? logo.includes('prime%20sports')
                            ? 'max-h-10'
                            : logo.includes('Logo_globo')
                              ? 'max-h-11'
                              : 'max-h-6'
                          : logo.includes('prime%20sports')
                            ? 'max-h-14'
                            : logo.includes('farm-rio-logo-0')
                              ? 'max-h-11'
                              : 'max-h-8'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>

                <p className="text-sm italic leading-relaxed text-zinc-300">
                  {language === 'pt' ? student.reviewPt : student.reviewEn}
                </p>
              </div>
            </div>
          </SectionBlock>
        ))}
      </div>
    </div>
  );
}
