import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';

const STUDENT_RESULTS = [
  {
    id: 'seed-julia',
    name: 'Júlia Muniz',
    photo_url: '/julia/julia.webp',
    showreel_url: 'https://player.vimeo.com/video/1167172670?h=950940ccee&title=0&byline=0&portrait=0&badge=0',
    logos: [
      '/julia/Amazon-Prime-Video-Emblem.webp',
      '/julia/farm-rio-logo-0.webp',
      '/julia/heineken-14-logo-png-transparent.webp',
      '/julia/melissa-logo.webp',
    ],
    testimonial_pt:
      '"O curso me deu clareza de processo e confiança para entregar projetos com padrão profissional."',
    testimonial_en:
      '"The course gave me process clarity and confidence to deliver projects at a professional standard."',
    order: 1,
  },
  {
    id: 'seed-clysmann',
    name: 'Clysmann',
    photo_url: '/clys/clys.webp',
    showreel_url: 'https://player.vimeo.com/video/1167178291?h=7f73306080&title=0&byline=0&portrait=0&badge=0',
    logos: [
      '/clys/Disney Plus.webp',
      '/clys/ESPN_wordmark.svg.webp',
      '/clys/Logo_globo_principal-laranja.webp',
      '/clys/prime sports.webp',
    ],
    testimonial_pt:
      '"Com o método do curso, meu workflow ficou mais rápido e minhas entregas ficaram muito mais consistentes."',
    testimonial_en:
      '"With the course method, my workflow became faster and my deliveries much more consistent."',
    order: 2,
  },
];

const normalizeStudent = (item) => ({
  id: item?.id || item?.name,
  name: String(item?.name || '').trim(),
  photo: item?.photo_url || item?.image_url || '',
  videoEmbed: item?.showreel_url || item?.video_url || '',
  logos: Array.isArray(item?.logos) ? item.logos.filter(Boolean) : [],
  reviewPt: item?.testimonial_pt || item?.reviewPt || '',
  reviewEn: item?.testimonial_en || item?.reviewEn || '',
  order: Number.isFinite(Number(item?.order)) ? Number(item.order) : 0,
});

export default function StudentShowcase({ students = [] }) {
  const { t, language } = useLanguage();
  const source = Array.isArray(students) && students.length > 0 ? students : STUDENT_RESULTS;
  const normalizedStudents = source
    .map((s) => normalizeStudent(s))
    .filter((s) => s.name)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <SectionTitle
        line1={t('Resultados dos', 'Student')}
        highlight={t('Alunos', 'Results')}
        singleLine
        subtitle={t('Veja o que nossos alunos conquistaram', 'See what our students have achieved')}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {normalizedStudents.map((student) => (
          <SectionBlock key={student.id || student.name} gradient>
            <div className="flex h-full flex-col items-center text-center">
              <div className="mb-4 flex w-full items-center justify-start gap-4 text-left">
                <img
                  src={student.photo || '/logo-icone.webp'}
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
                  {student.videoEmbed ? (
                    <iframe
                      src={student.videoEmbed}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Showreel ${student.name}`}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-zinc-500 text-sm">
                      {t('Showreel não informado', 'Showreel not provided')}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 w-full">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  {t('Marcas em que o aluno trabalhou', 'Brands this student has worked with')}
                </p>

                {student.logos.length > 0 ? (
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    {student.logos.map((logo) => (
                      <img
                        key={logo}
                        src={logo}
                        alt={t('Marca', 'Brand')}
                        className="max-h-8 w-auto object-contain brightness-0 invert"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                ) : null}

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
