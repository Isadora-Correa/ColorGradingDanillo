import React from 'react';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';

const STRATEGIC_LOGOS = [
  {
    name: 'Nike',
    src: '/logos/Imagem-Nike-Logo-PNG-1024x1024-2-white.png',
    sizeClass: 'h-10 md:h-16',
  },
  {
    name: 'Amazon',
    src: '/logos/Amazon_logo.svg-white.png',
  },
  {
    name: 'Cartier',
    src: '/logos/Cartier_logo.svg-white.png',
  },
  {
    name: 'Hyundai',
    src: '/logos/hyundai-logo-white-solid.png',
    sizeClass: 'h-9 md:h-12',
  },
  {
    name: 'Decathlon',
    src: '/logos/Decathlon-Logo-white.png',
    sizeClass: 'h-10 md:h-16',
  },
];

export default function ClientLogos({ title }) {
  const hasCustomTitle = Boolean(title);

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
                Nike, Amazon e Cartier
              </GlowText>
            </>
          )}
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-6 items-center justify-items-center gap-x-3 gap-y-4 pb-2 md:flex md:justify-center md:gap-10 md:pb-0">
        {STRATEGIC_LOGOS.map((logo, index) => (
          <div
            key={logo.name}
            className={`flex h-14 w-full items-center justify-center opacity-90 transition-opacity hover:opacity-100 md:h-16 md:w-auto md:col-auto ${
              index === 3
                ? 'col-span-2 col-start-2'
                : index === 4
                  ? 'col-span-2 col-start-4'
                  : 'col-span-2'
            }`}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className={`max-w-full w-auto object-contain ${logo.sizeClass || 'h-8 md:h-10'} ${logo.imageClassName || ''}`}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
