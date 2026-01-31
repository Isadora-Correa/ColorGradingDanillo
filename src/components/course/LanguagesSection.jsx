import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { Check, Volume2, Subtitles, Bot } from 'lucide-react';

const defaultLanguages = [
  { language: 'English', flag: '🇺🇸', audio: true, subtitles: true, ai_generated: false },
  { language: 'Português', flag: '🇧🇷', audio: true, subtitles: true, ai_generated: false },
  { language: 'Español', flag: '🇪🇸', audio: true, subtitles: true, ai_generated: true },
  { language: 'Français', flag: '🇫🇷', audio: true, subtitles: true, ai_generated: true },
  { language: 'العربية', flag: '🇸🇦', audio: true, subtitles: true, ai_generated: true },
];

export default function LanguagesSection({ languages }) {
  const { t } = useLanguage();
  
  const langs = languages && languages.length > 0 ? languages : defaultLanguages;

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('Idiomas ', 'Languages ')}
          <GlowText>{t('Disponíveis', 'Available')}</GlowText>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 text-zinc-400 font-medium">{t('Idioma', 'Language')}</th>
              <th className="text-center py-4 text-zinc-400 font-medium">
                <div className="flex items-center justify-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  {t('Áudio', 'Audio')}
                </div>
              </th>
              <th className="text-center py-4 text-zinc-400 font-medium">
                <div className="flex items-center justify-center gap-2">
                  <Subtitles className="w-4 h-4" />
                  {t('Legendas', 'Subtitles')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {langs.map((lang, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-white font-medium">{lang.language}</span>
                    {lang.ai_generated && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300">
                        <Bot className="w-3 h-3" />
                        AI
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center py-4">
                  {lang.audio && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                </td>
                <td className="text-center py-4">
                  {lang.subtitles && <Check className="w-5 h-5 text-green-400 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-zinc-500 mt-4 text-center">
        * {t(
          'Os idiomas Espanhol, Árabe e Francês foram gerados por IA utilizando a melhor tecnologia de dublagem disponível.',
          'Spanish, Arabic and French audio were AI-generated using the best dubbing technology available.'
        )}
      </p>
    </SectionBlock>
  );
}