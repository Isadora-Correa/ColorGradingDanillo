import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { ChevronDown, Play, BookOpen } from 'lucide-react';

export default function CourseModules({ modules }) {
  const { language, t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState(null);

  if (!modules || modules.length === 0) return null;

  // Filter modules for English version
  const filteredModules = modules
    .filter(m => language === 'pt' || m.show_in_en !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('Grade do ', 'Course ')}
          <GlowText>{t('Curso', 'Curriculum')}</GlowText>
        </h2>
        <p className="text-zinc-400">
          {t('Tudo o que você vai aprender', 'Everything you will learn')}
        </p>
      </div>

      <div className="space-y-3">
        {filteredModules.map((module, index) => {
          const isExpanded = expandedModule === index;
          const title = language === 'pt' ? module.title_pt : module.title_en;
          const description = language === 'pt' ? module.description_pt : module.description_en;
          const lessons = language === 'pt' ? module.lessons_pt : module.lessons_en;

          return (
            <motion.div
              key={module.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setExpandedModule(isExpanded ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-white font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    {lessons && (
                      <span className="text-sm text-zinc-500">{lessons.length} {t('aulas', 'lessons')}</span>
                    )}
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-white/5">
                      {description && (
                        <p className="text-sm text-zinc-400 mt-4 mb-4">{description}</p>
                      )}
                      
                      {lessons && lessons.length > 0 && (
                        <ul className="space-y-2">
                          {lessons.map((lesson, lessonIdx) => (
                            <li key={lessonIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                              <Play className="w-4 h-4 text-purple-400" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-zinc-500 flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          {filteredModules.length} {t('módulos', 'modules')} • {filteredModules.reduce((acc, m) => acc + ((language === 'pt' ? m.lessons_pt : m.lessons_en)?.length || 0), 0)} {t('aulas', 'lessons')}
        </p>
      </div>
    </SectionBlock>
  );
}