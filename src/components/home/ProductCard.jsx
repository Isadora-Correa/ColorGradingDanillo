import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function ProductCard({ product, index }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const name = language === 'pt' ? product.name_pt : product.name_en;
  const description = language === 'pt' ? product.description_pt : product.description_en;
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const externalLink = language === 'pt' ? product.external_link_pt : product.external_link_en;

  const CardContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-zinc-900/80 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-50" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
        
        {/* Product type badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/10">
            {product.product_type === 'course' ? t('Curso', 'Course') : 'LUTs'}
          </span>
        </div>

        {externalLink && (
          <div className="absolute top-4 right-4">
            <ExternalLink className="w-5 h-5 text-white/60" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="relative p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
          {name}
        </h3>
        
        {description && (
          <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            {currency} {price?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
          </span>
          
          <span className="text-sm text-purple-400 group-hover:text-cyan-400 transition-colors">
            {t('Ver detalhes', 'View details')} →
          </span>
        </div>
      </div>
    </motion.div>
  );

  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
    } else {
      navigate(createPageUrl('ProductDetail') + '?slug=' + product.slug);
    }
  };

  return (
    <div onClick={handleClick}>
      <CardContent />
    </div>
  );
}