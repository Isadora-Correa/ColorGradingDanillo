import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { Check } from 'lucide-react';

const AVAILABLE_LANGUAGES = [
  { flag: 'PT', namePt: 'Portugues', nameEn: 'Portuguese', dub: true, subtitles: true },
  { flag: 'EN', namePt: 'Ingles', nameEn: 'English', dub: true, subtitles: true },
  { flag: 'ES', namePt: 'Espanhol', nameEn: 'Spanish', dub: true, subtitles: true },
  { flag: 'FR', namePt: 'Frances', nameEn: 'French', dub: true, subtitles: true },
  { flag: 'AR', namePt: 'Arabe', nameEn: 'Arabic', dub: true, subtitles: true },
];

export default function LanguagesSection() {
  const { t, language } = useLanguage();
  const langs = AVAILABLE_LANGUAGES;

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Idiomas', 'Languages')}
        highlight={t('Disponiveis', 'Available')}
      />

      <div className="overflow-x-auto rounded-xl border border-white/15 bg-transparent">
        <table className="w-full min-w-full bg-transparent table-fixed">
          <thead>
            <tr className="border-b border-white/15">
              <th className="px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-200 md:px-4 md:text-sm md:tracking-[0.12em]">
                {t('Idioma', 'Language')}
              </th>
              <th className="w-[88px] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-200 md:w-auto md:px-4 md:text-sm md:tracking-[0.12em]">
                {t('Idiomas', 'Languages')}
              </th>
              <th className="w-[88px] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-200 md:w-auto md:px-4 md:text-sm md:tracking-[0.12em]">
                {t('Legendas', 'Subtitles')}
              </th>
            </tr>
          </thead>
          <tbody>
            {langs.map((lang, idx) => (
              <tr key={idx} className="border-b border-white/10 transition-colors hover:bg-white/5">
                <td className="px-2 py-3 md:px-4 md:py-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-zinc-700/60 px-2 py-1 text-xs text-zinc-200">{lang.flag}</span>
                    <span className="truncate text-sm font-medium text-white md:text-base">{language === 'pt' ? lang.namePt : lang.nameEn}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center md:px-4 md:py-4">
                  {lang.dub && <Check className="mx-auto h-5 w-5 text-white" />}
                </td>
                <td className="px-2 py-3 text-center md:px-4 md:py-4">
                  {lang.subtitles && <Check className="mx-auto h-5 w-5 text-white" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        * {t(
          'Espanhol, Arabe e Frances foram gerados por IA usando a melhor tecnologia de dublagem disponivel no mercado.',
          'Spanish, Arabic and French were AI-generated using the best dubbing technology available on the market.'
        )}
      </p>
    </SectionBlock>
  );
}
