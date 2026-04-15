import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, index }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isAvailable = product.available !== false;

  const name = language === 'pt'
    ? (product.name_pt || product.name_en)
    : (product.name_en || product.name_pt);
  const description = language === 'pt'
    ? (product.description_pt || product.description_en)
    : (product.description_en || product.description_pt);
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const externalLink = language === 'pt' ? product.external_link_pt : product.external_link_en;
  const imageSrc = language === 'pt'
    ? (
      product.image_url_pt ||
      product.detail_image_url_pt ||
      product.image_pt_url ||
      product.image_pt ||
      product.image_url ||
      product.detail_image_url ||
      '/produto1.webp'
    )
    : (
      product.image_url_en ||
      product.detail_image_url_en ||
      product.image_en_url ||
      product.image_en ||
      product.image_url ||
      product.detail_image_url ||
      '/produto1.webp'
    );

  const features =
    (language === 'pt' ? product.features_pt : product.features_en) ||
    (language === 'pt' ? product.highlights_pt : product.highlights_en) ||
    (language === 'pt' ? product.course_highlights_pt : product.course_highlights_en) ||
    [];

  const featureList = Array.isArray(features)
    ? features.slice(0, 3)
    : (description || '')
      .split('.')
      .map((part) => part.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map((item) => (item.endsWith('.') ? item : `${item}.`));

  const handleClick = () => {
    if (externalLink && isAvailable) {
      window.open(externalLink, '_blank');
    } else {
      navigate(`/produto/${product.slug}`);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className={`group relative h-full overflow-hidden rounded-xl border border-white/10 bg-[#0c0d12]/85 ${!isAvailable ? 'opacity-90' : ''}`}
    >
      <div
        className="relative cursor-pointer bg-gradient-to-b from-white/5 to-transparent"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={t('Ver detalhes do produto', 'View product details')}
      >
        <img
          key={`${language}-${product.id || product.slug || index}`}
          src={imageSrc}
          alt={name}
          className="h-[340px] w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105 md:h-[390px] lg:h-[430px]"
        />
        {externalLink ? (
          <ExternalLink className="absolute right-3 top-3 h-5 w-5 text-white/70" />
        ) : null}
      </div>

      <div className="p-4 md:p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {product.product_type === 'course' ? t('Curso', 'Course') : 'LUTs'}
        </p>

        <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
          {currency} {price?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
        </h3>

        {description && (
          <p className="mb-3 line-clamp-2 text-sm leading-snug text-zinc-200">
            {description}
          </p>
        )}

        {featureList.length > 0 && (
          <ul className="mb-4 space-y-1.5 text-sm text-zinc-100/95">
            {featureList.map((item, itemIndex) => (
              <li key={`${item}-${itemIndex}`} className="line-clamp-1 leading-snug">
                • {item}
              </li>
            ))}
          </ul>
        )}

        <Button
          type="button"
          onClick={handleClick}
          disabled={!isAvailable}
          className="h-10 rounded-full border-2 border-white bg-white px-5 text-sm font-semibold text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] hover:bg-zinc-200 disabled:opacity-100 disabled:bg-white disabled:text-black disabled:border-white"
        >
          {isAvailable ? t('Ver detalhes', 'View details') : t('EM BREVE', 'COMING SOON')}
        </Button>
      </div>
    </motion.article>
  );
}
