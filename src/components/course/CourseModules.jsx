import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { ChevronDown, Play, BookOpen } from 'lucide-react';

const MODULES = [
  { id: 1, order: 1, show_in_en: true, title_pt: 'Apresentação', title_en: 'Introduction', lessons_pt: ['Visão geral do curso e da jornada de aprendizado', 'Acesso ao Material do Curso', 'Grupo no Discord'], lessons_en: ['Course overview and learning journey', 'Access to the course materials', 'Discord group'] },
  { id: 2, order: 2, show_in_en: true, title_pt: 'Project Manager', title_en: 'Project Manager', lessons_pt: ['Como baixar o DaVinci Resolve', 'Configuração da Biblioteca e Database'], lessons_en: ['How to download DaVinci Resolve', 'Library and Database setup'] },
  { id: 3, order: 3, show_in_en: true, title_pt: 'Conform', title_en: 'Conform', lessons_pt: ['O que é Conform?', 'AAF', 'EDL', 'XML', 'Scene Detection', 'Conselhos Gerais'], lessons_en: ['What is conform?', 'AAF', 'EDL', 'XML', 'Scene Detection', 'General tips'] },
  { id: 4, order: 4, show_in_en: true, title_pt: 'Personalização e Atalhos', title_en: 'Customization and Shortcuts', lessons_pt: ['Configurações essenciais antes de colorir'], lessons_en: ['Essential settings before grading'] },
  { id: 5, order: 5, show_in_en: true, title_pt: 'Interface do DaVinci Resolve', title_en: 'DaVinci Resolve Interface', lessons_pt: ['O essencial da aba Edit para Color Grading', 'O essencial da Aba Color'], lessons_en: ['Edit page essentials for color grading', 'Color page essentials'] },
  { id: 6, order: 6, show_in_en: true, title_pt: 'Gerenciamento de Cor: Básico', title_en: 'Color Management: Basic', lessons_pt: ['Fundamentos do Gerenciamento de Cor', 'Gerenciamento de Cor na Prática'], lessons_en: ['Color management fundamentals', 'Color management in practice'] },
  { id: 7, order: 7, show_in_en: true, title_pt: 'Ferramentas Fundamentais do Color Grading', title_en: 'Fundamental Color Grading Tools', lessons_pt: ['Color Balance: Conceitos', 'Primaries', 'Scopes', 'Printer Lights', 'HDR Color Wheels', 'Color Matching com Parade', 'Color Matching com Vectorscope'], lessons_en: ['Color Balance: concepts', 'Primaries', 'Scopes', 'Printer Lights', 'HDR Color Wheels', 'Color matching with Parade', 'Color matching with Vectorscope'] },
  { id: 8, order: 8, show_in_en: true, title_pt: 'Gerenciamento de Cor: Avançado', title_en: 'Color Management: Advanced', lessons_pt: ['Gerenciamento de Cor', 'ACES', 'Camera RAW', 'RCM', 'Gerenciamento de Cor a Nível de Nodes'], lessons_en: ['Color management', 'ACES', 'Camera RAW', 'RCM', 'Node-level color management'] },
  { id: 9, order: 9, show_in_en: true, title_pt: 'Nodes e Workflow Avançado', title_en: 'Advanced Nodes and Workflow', lessons_pt: ['Nodes e Workflow Avançado na Prática'], lessons_en: ['Advanced nodes and workflow in practice'] },
  { id: 10, order: 10, show_in_en: true, title_pt: 'Ferramentas Secundárias', title_en: 'Secondary Tools', lessons_pt: ['Curves', 'Color Warper', 'Color Slice', 'Power Window', 'Qualifiers', 'Magic Mask', 'Keyframes', 'Noise Reduction', 'Color Checker'], lessons_en: ['Curves', 'Color Warper', 'Color Slice', 'Power Window', 'Qualifiers', 'Magic Mask', 'Keyframes', 'Noise Reduction', 'Color Checker'] },
  { id: 11, order: 11, show_in_en: true, title_pt: 'Tratamento de Pele / Skin Tones', title_en: 'Skin Treatment / Skin Tones', lessons_pt: ['Vectorscope: Revisão', 'Correção de Pele com Cor Subtrativa', 'Tratamento de Pele', 'Redução de Ruído', 'Glow', 'Tratamento de Pele e Face Refinement', 'Patch Replacer', 'Beauty'], lessons_en: ['Vectorscope: review', 'Skin correction with subtractive color', 'Skin treatment', 'Noise reduction', 'Glow', 'Skin treatment and Face Refinement', 'Patch Replacer', 'Beauty'] },
  { id: 12, order: 12, show_in_en: true, title_pt: 'Color Balance e Color Matching', title_en: 'Color Balance and Color Matching', lessons_pt: ['Color Balance: Consolidação do Aprendizado'], lessons_en: ['Color Balance: learning consolidation'] },
  { id: 13, order: 13, show_in_en: true, title_pt: 'Criação de Look', title_en: 'Look Creation', lessons_pt: ['O que são LUTS?', 'Film Print Emulation (FPE)', 'Cineon Film Log', 'Grão de película', 'O que é Halation', 'Aplicação de Look com "Nava LUTS"'], lessons_en: ['What are LUTs?', 'Film Print Emulation (FPE)', 'Cineon Film Log', 'Film grain', 'What is halation?', 'Applying a look with "Nava LUTS"'] },
  { id: 14, order: 14, show_in_en: true, title_pt: 'Projeto Prático 01', title_en: 'Practical Project 01', lessons_pt: ['Grading completo do início ao fim', 'Correção primária, secundária e look'], lessons_en: ['Full grading from start to finish', 'Primary, secondary and look correction'] },
  { id: 15, order: 15, show_in_en: true, title_pt: 'Projeto Prático 02', title_en: 'Practical Project 02', lessons_pt: ['Continuação da timeline do Módulo 03', 'Grading completo de um novo material', 'Exercício de autonomia e tomada de decisão'], lessons_en: ['Timeline continuation from Module 03', 'Full grading of new footage', 'Autonomy and decision-making exercise'] },
  { id: 16, order: 16, show_in_en: true, title_pt: 'Deliver e Conform Final', title_en: 'Final Deliver and Conform', lessons_pt: ['Exportação de Timeline: Formatos e Métodos', 'Handles e Exportação de Clips Individuais'], lessons_en: ['Timeline export: formats and methods', 'Handles and individual clip export'] },
  { id: 17, order: 17, show_in_en: false, title_pt: 'Bônus: DaVinci Resolve 20', title_en: 'Bonus: DaVinci Resolve 20', lessons_pt: ['Atualizando o DaVinci Resolve', 'Chroma Warp: Introdução', 'Chroma Warp', 'Depth Map', 'Magic Mask com IA (V2)', 'Node Stack Layer', 'ProRes no Windows', 'ACES 2.0'], lessons_en: ['Updating DaVinci Resolve', 'Chroma Warp: introduction', 'Chroma Warp', 'Depth Map', 'Magic Mask with AI (V2)', 'Node Stack Layer', 'ProRes on Windows', 'ACES 2.0'] },
];

const normalizePtText = (text = '') =>
  String(text)
    .replaceAll('Apresentacao', 'Apresentação')
    .replaceAll('Visao', 'Visão')
    .replaceAll('pratica', 'prática')
    .replaceAll('modulos', 'módulos')
    .replaceAll('organizacao', 'organização')
    .replaceAll('Configuracao', 'Configuração')
    .replaceAll('Protecao', 'Proteção')
    .replaceAll('escalavel', 'escalável')
    .replaceAll('Personalizacoes', 'Personalizações')
    .replaceAll('Configuracoes', 'Configurações')
    .replaceAll('Otimizacao', 'Otimização')
    .replaceAll('pos-producao', 'pós-produção')
    .replaceAll('Basico', 'Básico')
    .replaceAll('introducao', 'introdução')
    .replaceAll('espacos', 'espaços')
    .replaceAll('transformacoes', 'transformações')
    .replaceAll('primarias', 'primárias')
    .replaceAll('Avancado', 'Avançado')
    .replaceAll('nivel', 'nível')
    .replaceAll('Secundarias', 'Secundárias')
    .replaceAll('avancado', 'avançado')
    .replaceAll('tecnico', 'técnico')
    .replaceAll('estetico', 'estético')
    .replaceAll('Correcao', 'Correção')
    .replaceAll('precisao', 'precisão')
    .replaceAll('Tecnicas', 'Técnicas')
    .replaceAll('cinematograficos', 'cinematográficos')
    .replaceAll('Pratica', 'Prática')
    .replaceAll('Exercicio', 'Exercício')
    .replaceAll('pratico', 'prático')
    .replaceAll('multiplos', 'múltiplos')
    .replaceAll('Consistencia', 'Consistência')
    .replaceAll('cameras', 'câmeras')
    .replaceAll('exposicao', 'exposição')
    .replaceAll('tecnico', 'técnico')
    .replaceAll('Criacao', 'Criação')
    .replaceAll('tecnicos', 'técnicos')
    .replaceAll('Introducao', 'Introdução')
    .replaceAll('utilizacao', 'utilização')
    .replaceAll('Grao Analogico', 'Grão Analógico')
    .replaceAll('avancadas', 'avançadas')
    .replaceAll('Construcao', 'Construção')
    .replaceAll('Pratico', 'Prático')
    .replaceAll('inicio', 'início')
    .replaceAll('primaria', 'primária')
    .replaceAll('secundaria', 'secundária')
    .replaceAll('Consolidacao', 'Consolidação')
    .replaceAll('aplicacao', 'aplicação')
    .replaceAll('Continuacao', 'Continuação')
    .replaceAll('Modulo', 'Módulo')
    .replaceAll('decisao', 'decisão')
    .replaceAll('Experiencia', 'Experiência')
    .replaceAll('metodos', 'métodos')
    .replaceAll('voce', 'você');

const toLessonList = (module, language) => {
  const candidates =
    language === 'pt'
      ? [module?.topics_pt, module?.lessons_pt, module?.topics]
      : [module?.topics_en, module?.lessons_en, module?.topics_pt, module?.lessons_pt, module?.topics];

  for (const list of candidates) {
    if (!Array.isArray(list) || list.length === 0) continue;
    const normalized = list
      .map((x) => (typeof x === 'string' ? x : x?.title))
      .map((x) => String(x || '').trim())
      .filter(Boolean);
    if (normalized.length > 0) {
      return language === 'pt' ? normalized.map(normalizePtText) : normalized;
    }
  }
  return [];
};

export default function CourseModules({ modules = [] }) {
  const { language, t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState(null);

  const filteredModules = useMemo(
    () =>
      (Array.isArray(modules) && modules.length > 0 ? modules : MODULES)
        .filter((m) => language === 'pt' || m.show_in_en !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [modules, language]
  );
  const lessonsByModule = useMemo(
    () => filteredModules.map((m) => toLessonList(m, language)),
    [filteredModules, language]
  );
  const totalLessons = useMemo(
    () => lessonsByModule.reduce((acc, lessons) => acc + lessons.length, 0),
    [lessonsByModule]
  );

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Grade do', 'Course')}
        highlight={t('Curso', 'Curriculum')}
        singleLine
        subtitle={t('Tudo o que você vai aprender', 'Everything you will learn')}
      />

      <div className="space-y-3">
        {filteredModules.map((module, index) => {
          const isExpanded = expandedModule === index;
          const title = language === 'pt'
            ? (module.title_pt || module.title_en)
            : (module.title_en || module.title_pt);
          const displayTitle = language === 'pt' ? normalizePtText(title) : title;
          const lessons = lessonsByModule[index];

          return (
            <motion.div
              key={module.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: Math.min(index * 0.04, 0.3),
              }}
              className="bg-zinc-800/50 rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setExpandedModule(isExpanded ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#ff2f6d_0%,#ff9c1f_18%,#d7ff3f_35%,#27f2a2_52%,#23dbff_70%,#635bff_84%,#ff38bd_100%)]" />
                    <span className="absolute inset-[2.5px] rounded-full bg-zinc-950" />
                    <span className="relative text-sm font-bold tracking-tight text-white">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <div>
                    <h3 className="text-white font-medium">{displayTitle}</h3>
                    <span className="text-sm text-zinc-500">{lessons.length} {t('aulas', 'lessons')}</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: 'top' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-white/5">
                      <ul className="mt-4 space-y-2">
                        {lessons.map((lesson, lessonIdx) => (
                          <li key={lessonIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                            <Play className="w-4 h-4 text-purple-400" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-zinc-500 flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          {filteredModules.length} {t('módulos', 'modules')} - {totalLessons} {t('aulas', 'lessons')}
        </p>
      </div>
    </SectionBlock>
  );
}
