import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const { language, t } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <SectionBlock gradient>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('Perguntas ', 'Frequently Asked ')}
          <GlowText>{t('Frequentes', 'Questions')}</GlowText>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.sort((a, b) => (a.order || 0) - (b.order || 0)).map((faq, index) => {
          const isExpanded = expandedFaq === index;
          const question = language === 'pt' ? faq.question_pt : faq.question_en;
          const answer = language === 'pt' ? faq.answer_pt : faq.answer_en;

          return (
            <motion.div
              key={faq.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(isExpanded ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-white font-medium">{question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pl-14">
                      <p className="text-zinc-400 leading-relaxed">{answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionBlock>
  );
}