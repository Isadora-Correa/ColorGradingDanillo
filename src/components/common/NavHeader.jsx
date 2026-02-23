import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../ui/LanguageContext';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function NavHeader({ logoUrl }) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur-xl md:rounded-full md:px-6">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            {logoUrl ? (
              <div className="h-12 w-[168px] md:h-16 md:w-[224px]">
                <img src={logoUrl} alt="Logo" width="224" height="64" className="h-full w-full object-contain object-left" />
              </div>
            ) : (
              <div className="flex h-12 w-[168px] items-center gap-2 md:h-16 md:w-[224px]">
                <img src="/logo-header.png" alt="Nava Colorist" width="224" height="64" className="h-full w-full object-contain object-left" />
              </div>
            )}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to={createPageUrl('Home')} className="text-sm text-zinc-300 transition-colors hover:text-white">
              {t('Produtos', 'Products')}
            </Link>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-200 md:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={`${mobileOpen ? 'mt-3 block' : 'hidden'} border-t border-white/10 pt-3 md:hidden`}>
          <div className="mb-3 flex flex-col gap-2">
            <Link
              to={createPageUrl('Home')}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200"
            >
              {t('Produtos', 'Products')}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    </motion.header>
  );
}
