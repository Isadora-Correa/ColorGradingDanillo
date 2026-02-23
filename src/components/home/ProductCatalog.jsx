import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import ProductCard from './ProductCard';
import SectionTitle from '../common/SectionTitle';

export default function ProductCatalog({ products = [] }) {
  const { language, t } = useLanguage();

  const visibleProducts = products
    .filter((product) => product.available !== false)
    .filter((product) => (language === 'pt' ? product.show_in_pt !== false : product.show_in_en !== false))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (visibleProducts.length === 0) return null;
  const gridColsClass = visibleProducts.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
  const line1 = language === 'pt'
    ? (
      <>
        <span className="md:hidden">Conheca os produtos</span>
        <span className="hidden md:inline">Conheca os produtos que trazem</span>
      </>
    )
    : (
      <>
        <span className="md:hidden">Discover products</span>
        <span className="hidden md:inline">Discover products that bring</span>
      </>
    );
  const line2Prefix = language === 'pt'
    ? (
      <>
        <span className="md:hidden">que trazem mais</span>
        <span className="hidden md:inline">mais</span>
      </>
    )
    : (
      <>
        <span className="md:hidden">that bring more</span>
        <span className="hidden md:inline">more</span>
      </>
    );

  return (
    <section aria-label={t('Catalogo de produtos', 'Product catalog')} className="space-y-6">
      <SectionTitle
        line1={line1}
        line2Prefix={line2Prefix}
        highlight={t('COR', 'COLOR')}
        line2Suffix={t('para sua carreira.', 'to your career.')}
        subtitle={t('Escolha o melhor para voce', 'Pick what fits you best')}
      />

      <div className="rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm md:p-6">
        <ul className={`grid list-none grid-cols-1 gap-4 p-0 ${gridColsClass}`}>
          {visibleProducts.map((product, index) => (
            <li key={product.id || product.slug || index}>
              <ProductCard product={product} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
