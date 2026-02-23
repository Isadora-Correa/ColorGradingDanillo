import React from 'react';

export default function GlowText({
  children,
  className = '',
  as: Component = 'span',
}) {
  return (
    <Component className={`relative isolate inline-block ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span
          className="absolute -left-[16%] -right-[16%] top-1/2 h-[2.05em] -translate-y-1/2 rounded-full opacity-70 blur-[42px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,47,109,0.95) 0%, rgba(255,127,42,0.92) 18%, rgba(255,225,74,0.9) 34%, rgba(84,240,107,0.88) 52%, rgba(31,224,208,0.9) 72%, rgba(46,140,255,0.95) 100%)',
          }}
        />
        <span
          className="absolute -left-[8%] -right-[8%] top-1/2 h-[1.35em] -translate-y-1/2 rounded-full opacity-58 blur-[22px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,47,109,0.85) 0%, rgba(255,127,42,0.82) 18%, rgba(255,225,74,0.8) 34%, rgba(84,240,107,0.78) 52%, rgba(31,224,208,0.8) 72%, rgba(46,140,255,0.85) 100%)',
          }}
        />
        <span
          className="absolute -left-[10%] -right-[10%] top-1/2 h-[1.9em] -translate-y-1/2 rounded-full opacity-30 blur-[34px]"
          style={{
            background:
              'radial-gradient(32% 90% at 10% 50%, rgba(255,47,109,0.75), transparent 75%), radial-gradient(28% 85% at 30% 50%, rgba(255,127,42,0.7), transparent 76%), radial-gradient(28% 85% at 50% 50%, rgba(255,225,74,0.68), transparent 76%), radial-gradient(28% 85% at 70% 50%, rgba(84,240,107,0.66), transparent 76%), radial-gradient(32% 90% at 90% 50%, rgba(31,224,208,0.7), transparent 75%)',
          }}
        />
      </span>

      <span className="relative text-white" style={{ textShadow: '0 0 11px rgba(255,255,255,0.24)' }}>
        {children}
      </span>
    </Component>
  );
}
