import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';

export default function BeforeAfterSlider({ items }) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('after');

  if (!items || items.length === 0) return null;

  const tabs = [
    { id: 'before', label: t('Antes do Curso', 'Before Course') },
    { id: 'during', label: t('Durante o Curso', 'During Course') },
    { id: 'after', label: t('Depois do Curso', 'After Course') },
  ];

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t('Aprenda Color Grading ', 'Learn Color Grading ')}
          <GlowText>{t('do Zero ao Pro', 'from Beginner to Pro')}</GlowText>
        </h2>
      </div>

      {items.map((item, index) => (
        <div key={item.id || index} className="mb-8 last:mb-0">
          {item.title_pt && (
            <p className="text-zinc-400 text-center mb-4">
              {language === 'pt' ? item.title_pt : item.title_en}
            </p>
          )}

          {/* Tab buttons */}
          <div className="flex justify-center gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image display */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
            <motion.img
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={
                activeTab === 'before' ? item.before_image_url :
                activeTab === 'during' ? item.during_image_url :
                item.after_image_url
              }
              alt={tabs.find(t => t.id === activeTab)?.label || 'Image'}
              className="w-full h-full object-cover"
            />
            
            {/* Cinematic bars */}
            <div className="absolute top-0 left-0 right-0 h-[8%] bg-black" />
            <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black" />
          </div>
        </div>
      ))}
    </SectionBlock>
  );
}