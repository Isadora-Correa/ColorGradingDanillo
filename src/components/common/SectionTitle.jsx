import React from 'react';
import GlowText from './GlowText';

export default function SectionTitle({
  line1,
  line2Prefix = '',
  highlight,
  line2Suffix = '',
  line2Content = null,
  subtitle = '',
  className = '',
  titleClassName = '',
  singleLine = false,
}) {
  const hasSecondLine = Boolean(line2Content || line2Prefix || highlight || line2Suffix);

  return (
    <div className={`mb-8 text-center ${className}`}>
      <h2 className={`mx-auto max-w-4xl text-3xl font-semibold leading-[1.14] tracking-tight text-white md:text-4xl lg:text-5xl ${titleClassName}`}>
        {singleLine ? (
          <span className="block">
            {line1}
            {highlight ? ' ' : null}
            {highlight ? (
              <GlowText
                className="font-extrabold not-italic"
                gradient="from-[#ff9f1c] via-[#9be15d] via-[#00d2ff] to-[#a45bff]"
                glowColor="rgba(120, 220, 255, 0.45)"
              >
                {highlight}
              </GlowText>
            ) : null}
            {line2Suffix ? ` ${line2Suffix}` : null}
          </span>
        ) : (
          <span className="block">{line1}</span>
        )}
        {!singleLine && hasSecondLine ? (
          <span className="block italic font-medium text-zinc-100">
            {line2Content ? (
              line2Content
            ) : (
              <>
                {line2Prefix ? <>{line2Prefix} </> : null}
                <GlowText
                  className="font-extrabold not-italic"
                  gradient="from-[#ff9f1c] via-[#9be15d] via-[#00d2ff] to-[#a45bff]"
                  glowColor="rgba(120, 220, 255, 0.45)"
                >
                  {highlight}
                </GlowText>
                {line2Suffix ? ` ${line2Suffix}` : null}
              </>
            )}
          </span>
        ) : null}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300 md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
