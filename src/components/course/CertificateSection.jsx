import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { useLanguage } from '../ui/LanguageContext';

export default function CertificateSection({ imageSrc = '/certificado.jpeg' }) {
  const { t, language } = useLanguage();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const cardRef = useRef(null);

  const transformStyle = useMemo(
    () => ({
      transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1,1,1)`,
      transition: tilt.active ? 'transform 90ms linear' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
    }),
    [tilt],
  );

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 14;

    setTilt({
      rx,
      ry,
      glareX: px * 100,
      glareY: py * 100,
      active: true,
    });
  };

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });
  };

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsMobileDevice(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isMobileDevice) return undefined;

    let rafId = null;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const updateFromScroll = () => {
      rafId = null;
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const inView = rect.top < vh && rect.bottom > 0;
      if (!inView) return;

      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) / (vh / 2);
      const normalized = clamp(offset, -1, 1);

      setTilt({
        rx: clamp(-normalized * 6, -6, 6),
        ry: clamp(normalized * 8, -8, 8),
        glareX: clamp(50 + normalized * 22, 20, 80),
        glareY: clamp(44 - normalized * 10, 25, 75),
        active: true,
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });
    };
  }, [isMobileDevice]);

  return (
    <SectionBlock gradient>
      <div className="mb-6 text-center md:mb-8">
        <h3 className="mx-auto max-w-4xl text-2xl font-semibold leading-tight text-white md:text-4xl">
          {t('Finalize o curso e seja', 'Finish the course and get')}{' '}
          <GlowText
            className="font-extrabold"
            gradient="from-[#ff3d77] via-[#9be15d] via-[#00e5ff] to-[#7b61ff]"
            glowColor="rgba(120,220,255,0.42)"
          >
            {t('certificado pelo Nava Colorist', 'certified by Nava Colorist')}
          </GlowText>
        </h3>
      </div>

      <div className="mx-auto w-full max-w-4xl [perspective:1200px]">
        <div
          ref={cardRef}
          className="group relative rounded-2xl bg-transparent p-0 shadow-[0_35px_70px_rgba(0,0,0,0.45)]"
          onMouseMove={onMove}
          onMouseLeave={resetTilt}
          onMouseUp={resetTilt}
          style={transformStyle}
        >
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={language === 'en' ? '/certificado-ingles.jpg' : imageSrc}
              alt={t('Certificado do curso', 'Course certificate')}
              className="h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
            />

            <div
              className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.24), rgba(255,255,255,0) 34%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0)_28%,rgba(0,0,0,0.2)_75%)]" />
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}
