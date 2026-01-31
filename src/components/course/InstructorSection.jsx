import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { Play, Award, Users, Clock } from 'lucide-react';

export default function InstructorSection({ content }) {
  const { language, t } = useLanguage();

  if (!content) return null;

  const bio = language === 'pt' ? content.instructor_bio_pt : content.instructor_bio_en;
  const stats = content.instructor_stats || [];

  const defaultStats = [
    { icon: Users, label: t('+150 alunos', '+150 students'), value: '' },
    { icon: Award, label: t('+100 projetos', '+100 projects'), value: '' },
    { icon: Clock, label: t('15 anos', '15 years'), value: '' },
  ];

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <p className="text-purple-400 uppercase tracking-wider text-sm mb-2">
          {t('Conheça seu professor', 'Meet your instructor')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          <GlowText>{content.instructor_name || 'Nava'}</GlowText>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Photo and Showreel */}
        <div className="space-y-4">
          {content.instructor_photo_url && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img 
                src={content.instructor_photo_url}
                alt={content.instructor_name}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              
              {/* Glow effects */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
            </motion.div>
          )}

          {content.instructor_showreel_url && (
            <a 
              href={content.instructor_showreel_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-zinc-800/50 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-white font-medium">{t('Ver Showreel', 'View Showreel')}</span>
            </a>
          )}
        </div>

        {/* Bio and Stats */}
        <div className="space-y-6">
          {bio && (
            <p className="text-zinc-300 leading-relaxed">
              {bio}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {(stats.length > 0 ? stats : defaultStats).map((stat, idx) => {
              const Icon = stat.icon || Award;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 bg-zinc-800/50 rounded-xl border border-white/5"
                >
                  {stat.icon && <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />}
                  <div className="text-lg font-bold text-white">
                    {stat.value || (language === 'pt' ? stat.label_pt : stat.label_en)}
                  </div>
                  {stat.value && (
                    <div className="text-xs text-zinc-500">
                      {language === 'pt' ? stat.label_pt : stat.label_en}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}