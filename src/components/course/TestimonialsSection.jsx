import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { Play, Quote } from 'lucide-react';

export default function TestimonialsSection({ testimonials }) {
  const { language, t } = useLanguage();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          <GlowText>{t('Depoimentos', 'Testimonials')}</GlowText>
        </h2>
        <p className="text-zinc-400">
          {t('O que nossos alunos dizem', 'What our students say')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.sort((a, b) => (a.order || 0) - (b.order || 0)).map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <SectionBlock className="h-full">
              {testimonial.video_url ? (
                <a 
                  href={testimonial.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video rounded-xl overflow-hidden bg-zinc-800 mb-4 group relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </a>
              ) : (
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-purple-400 opacity-50" />
                </div>
              )}

              {(testimonial.text_pt || testimonial.text_en) && (
                <p className="text-sm text-zinc-300 mb-4 line-clamp-4">
                  "{language === 'pt' ? testimonial.text_pt : testimonial.text_en}"
                </p>
              )}

              <div className="flex items-center gap-3 mt-auto">
                {testimonial.author_photo_url && (
                  <img 
                    src={testimonial.author_photo_url}
                    alt={testimonial.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className="text-white font-medium">{testimonial.author_name}</span>
              </div>
            </SectionBlock>
          </motion.div>
        ))}
      </div>
    </div>
  );
}