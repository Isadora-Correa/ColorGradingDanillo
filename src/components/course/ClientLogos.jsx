import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';

export default function ClientLogos({ logos, title }) {
  const { t } = useLanguage();

  if (!logos || logos.length === 0) return null;

  return (
    <SectionBlock>
      <div className="text-center mb-8">
        <p className="text-zinc-400 uppercase tracking-wider text-sm">
          {title || t('Marcas que confiam nas técnicas ensinadas', 'Brands that trust the techniques taught')}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.sort((a, b) => (a.order || 0) - (b.order || 0)).map((logo, index) => (
          <motion.div
            key={logo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
          >
            <img 
              src={logo.logo_url} 
              alt={logo.name} 
              className="h-8 md:h-12 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </SectionBlock>
  );
}