import React from 'react';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';

const STRATEGIC_LOGOS = [
  {
    id: 'nike',
    name: 'Nike',
    src: '/logos/Imagem-Nike-Logo-PNG-1024x1024-2-white.webp',
    sizeClass: 'h-10 md:h-16',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    src: '/logos/Amazon_logo.svg-white.webp',
  },
  {
    id: 'cartier',
    name: 'Cartier',
    src: '/logos/Cartier_logo.svg-white.webp',
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    src: '/logos/hyundai-logo-white-solid.webp',
    sizeClass: 'h-9 md:h-12',
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    src: '/logos/Decathlon-Logo-white.webp',
    sizeClass: 'h-10 md:h-16',
  },
];

const normalizeLogos = (logos = []) =>
  (Array.isArray(logos) ? logos : [])
    .map((item, index) => ({
      id: item?.id || `logo-${index}`,
      name: String(item?.name || '').trim() || `Marca ${index + 1}`,
      src: item?.logo_url || '',
      order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
    }))
    .filter((item) => item.src)
    .sort((a, b) => a.order - b.order);

export default function ClientLogos({ title, logos = [] }) {
  const hasCustomTitle = Boolean(title);
  const dynamicLogos = normalizeLogos(logos);
  const list = dynamicLogos.length > 0 ? dynamicLogos : STRATEGIC_LOGOS;
  const highlightedBrands = list.slice(0, 3).map((x) => x.name).join(', ');

  return (
    <SectionBlock>
      <div className="mb-7 text-center md:mb-9">
        <h2 className="mx-auto max-w-4xl text-xl font-semibold leading-tight tracking-tight text-zinc-100 md:text-3xl lg:text-4xl">
          {hasCustomTitle ? (
            title
          ) : (
            <>
              Acesse o conhecimento profundo de quem atua com marcas globais como{' '}
              <GlowText
                className="font-extrabold"
                gradient="from-[#ff3d77] via-[#9be15d] via-[#00e5ff] to-[#7b61ff]"
                glowColor="rgba(120, 220, 255, 0.42)"
              >
                {highlightedBrands || 'Nike, Amazon e Cartier'}
              </GlowText>
            </>
          )}
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 pb-2 md:gap-10 md:pb-0">
        {list.map((logo) => (
          <div key={logo.id || logo.name} className="flex h-14 items-center justify-center opacity-90 transition-opacity hover:opacity-100 md:h-16">
            <img
              src={logo.src}
              alt={logo.name}
              className={`max-w-full w-auto object-contain ${logo.sizeClass || 'h-8 md:h-10'} ${logo.imageClassName || ''}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
