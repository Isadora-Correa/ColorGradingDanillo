import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import ProductCard from './ProductCard';

export default function ProductCatalog({ products = [] }) {
  const { language, t } = useLanguage();

  const visibleProducts = products
    .filter((product) => product.available !== false)
    .filter((product) => (language === 'pt' ? product.show_in_pt !== false : product.show_in_en !== false))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (visibleProducts.length === 0) return null;

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('Produtos ', 'Products ')}
          <GlowText>{t('em destaque', 'in focus')}</GlowText>
        </h2>
        <p className="text-zinc-400">
          {t('Escolha o melhor para voce', 'Pick what fits you best')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product, index) => (
          <ProductCard key={product.id || product.slug || index} product={product} index={index} />
        ))}
      </div>
    </SectionBlock>
  );
}
