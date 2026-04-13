import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials, content = {} }) {
  const { language, t } = useLanguage();

  if (!testimonials || testimonials.length === 0) return null;

  const orderedTestimonials = [...testimonials].sort((a, b) => (a.order || 0) - (b.order || 0));
  const getCardClassName = (index) => {
    const isLast = index === orderedTestimonials.length - 1;
    if (isLast) return 'md:col-span-2 xl:col-span-3';
    return 'xl:col-span-1';
  };
  const getNameClassName = (name = '') => {
    const length = String(name).trim().length;
    if (length > 18) return 'text-[1.45rem] md:text-[1.6rem] leading-[0.96]';
    if (length > 12) return 'text-[1.58rem] md:text-[1.72rem] leading-[0.96]';
    return 'text-[1.72rem] md:text-[1.88rem] leading-[0.95]';
  };
  const getTextClassName = (text = '') => {
    const length = String(text).trim().length;
    if (length > 140) return 'text-[0.88rem] md:text-[0.93rem] leading-6';
    if (length > 95) return 'text-[0.9rem] md:text-[0.96rem] leading-6';
    return 'text-[0.93rem] md:text-[0.99rem] leading-6';
  };

  return (
    <div>
      <SectionTitle
        line1={t(content.testimonials_title_line1_pt || 'Depoimentos', content.testimonials_title_line1_en || 'Testimonials')}
        line2Prefix={t(content.testimonials_title_prefix_pt || 'O que nossos', content.testimonials_title_prefix_en || 'What our')}
        highlight={t(content.testimonials_highlight_pt || 'alunos dizem', content.testimonials_highlight_en || 'students say')}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orderedTestimonials.map((testimonial, index) => {
          const isLast = index === orderedTestimonials.length - 1;

          return (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={getCardClassName(index)}
          >
            <SectionBlock className="relative h-full overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -right-8 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative flex h-full flex-col gap-4 p-4 md:p-5">
                <div className="flex min-h-[92px] items-start justify-between gap-3 md:min-h-[100px]">
                  <div className="flex min-h-[76px] flex-col justify-between space-y-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {t('Depoimento', 'Testimonial')}
                    </span>
                    <p
                      className={`font-semibold tracking-[-0.03em] text-white ${
                        isLast ? 'max-w-none whitespace-nowrap' : 'max-w-[10ch] text-balance'
                      } ${getNameClassName(testimonial.author_name)}`}
                    >
                      {testimonial.author_name}
                    </p>
                  </div>
                  <span className="relative mt-1 block h-8 w-8 shrink-0">
                    <Quote className="absolute inset-0 h-8 w-8 text-fuchsia-400/80" />
                    <Quote className="absolute inset-0 h-8 w-8 -translate-y-[0.5px] translate-x-[0.5px] text-cyan-300/85 mix-blend-screen" />
                  </span>
                </div>

                <p className={`max-w-4xl text-zinc-200 ${getTextClassName(language === 'pt' ? testimonial.text_pt : testimonial.text_en)}`}>
                  "{language === 'pt' ? testimonial.text_pt : testimonial.text_en}"
                </p>
              </div>
            </SectionBlock>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
