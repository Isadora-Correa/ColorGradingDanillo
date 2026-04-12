import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import ProductCard from './ProductCard';
import GlowText from '../common/GlowText';
import SectionTitle from '../common/SectionTitle';

function renderUppercaseHighlight(text = '') {
  const parts = String(text || '').split(/(\s+)/);
  return parts.map((part, index) => {
    const clean = part.replace(/[^A-Za-zÀ-ÿ0-9]/g, '');
    const isUpperWord =
      clean.length > 1 &&
      clean === clean.toUpperCase() &&
      clean !== clean.toLowerCase();

    if (!isUpperWord) {
      return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
    }

    return (
      <GlowText
        key={`${part}-${index}`}
        className="font-extrabold not-italic"
        gradient="from-[#ff9f1c] via-[#9be15d] via-[#00d2ff] to-[#a45bff]"
        glowColor="rgba(120, 220, 255, 0.45)"
      >
        {part}
      </GlowText>
    );
  });
}

function splitTitleInTwoLines(text = '') {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return ['', ''];
  const words = normalized.split(' ');
  if (words.length <= 1) return [normalized, ''];

  const totalLength = words.reduce((acc, w) => acc + w.length, 0);
  let bestIndex = 1;
  let bestDiff = Infinity;
  let leftLen = 0;

  for (let i = 1; i < words.length; i += 1) {
    leftLen += words[i - 1].length;
    const rightLen = totalLength - leftLen;
    const diff = Math.abs(leftLen - rightLen);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i;
    }
  }

  return [words.slice(0, bestIndex).join(' '), words.slice(bestIndex).join(' ')];
}

export default function ProductCatalog({ products = [], settings = {} }) {
  const { language, t } = useLanguage();

  const visibleProducts = products
    .filter((product) => product.available !== false)
    .filter((product) => (language === 'pt' ? product.show_in_pt !== false : product.show_in_en !== false))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (visibleProducts.length === 0) return null;
  const gridColsClass = visibleProducts.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  const titleFull = language === 'pt'
    ? (
      settings?.products_heading_title_pt ||
      [settings?.products_heading_line1_pt, settings?.products_heading_line2_pt].filter(Boolean).join(' ').trim() ||
      'Conheça os produtos que trazem mais COR para sua carreira.'
    )
    : (
      settings?.products_heading_title_en ||
      [settings?.products_heading_line1_en, settings?.products_heading_line2_en].filter(Boolean).join(' ').trim() ||
      'Discover tools that bring more COLOR to your career.'
    );
  const [titleLine1, titleLine2] = splitTitleInTwoLines(titleFull);
  const subtitle = language === 'pt'
    ? (settings?.products_heading_subtitle_pt || 'Escolha o melhor para você')
    : (settings?.products_heading_subtitle_en || 'Choose what fits you best.');

  return (
    <section aria-label={t('Catálogo de produtos', 'Product catalog')} className="space-y-6">
      <SectionTitle
        line1={renderUppercaseHighlight(titleLine1)}
        line2Content={renderUppercaseHighlight(titleLine2)}
        subtitle={subtitle}
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
