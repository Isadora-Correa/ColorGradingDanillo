import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../ui/LanguageContext';
import { motion } from 'framer-motion';

export default function NavHeader({ logoUrl }) {
  const { t } = useLanguage();

  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur-xl md:rounded-full md:px-6">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            {logoUrl ? (
              <div className="h-12 w-[168px] md:h-16 md:w-[224px]">
                <img src={logoUrl} alt="Logo" width="224" height="64" className="h-full w-full object-contain object-left" />
              </div>
            ) : (
              <div className="flex h-12 w-[168px] items-center gap-2 md:h-16 md:w-[224px]">
                <img src="/logo-header.webp" alt="Nava Colorist" width="224" height="64" className="h-full w-full object-contain object-left" />
              </div>
            )}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to={createPageUrl('Home')} className="text-sm text-zinc-300 transition-colors hover:text-white">
              {t('Produtos', 'Products')}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
