import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../ui/LanguageContext';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function NavHeader({ logoUrl }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10">
        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
          {logoUrl ? (
            /* Aumentado de h-8 md:h-10 para h-12 md:h-16 */
            <img src={logoUrl} alt="Logo" className="h-12 md:h-16 object-contain" />
          ) : (
            <div className="flex items-center gap-2">
              <img 
                src="/logo-header.png" 
                alt="Nava Colorist" 
                className="h-10 md:h-14 object-contain" 
              />
            </div>
          )}
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to={createPageUrl('Home')}
            className="text-sm text-zinc-300 hover:text-white transition-colors hidden md:block"
          >
            {t('Produtos', 'Products')}
          </Link>
          
          <LanguageSwitcher />

          <button
            onClick={() => navigate(createPageUrl('Admin'))}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Admin"
          >
            <Settings className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}