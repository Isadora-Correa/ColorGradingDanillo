import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import GlowText from '../common/GlowText';
import SectionBlock from '../common/SectionBlock';
import { Check, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CourseHero({ content, product, lutsProduct }) {
  const { language, t } = useLanguage();
  const [addLuts, setAddLuts] = useState(false);

  if (!content || !product) return null;

  const title = language === 'pt' ? content.hero_title_pt : content.hero_title_en;
  const subtitle = language === 'pt' ? content.hero_subtitle_pt : content.hero_subtitle_en;
  const features = language === 'pt' ? content.hero_features_pt : content.hero_features_en;
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const buyLink = language === 'pt' ? product.buy_link_brl : product.buy_link_usd;
  
  const lutsPrice = lutsProduct ? (language === 'pt' ? lutsProduct.price_brl : lutsProduct.price_usd) : 0;
  const lutsBuyLink = lutsProduct ? (language === 'pt' ? lutsProduct.buy_link_brl : lutsProduct.buy_link_usd) : null;

  const totalPrice = addLuts ? price + lutsPrice : price;

  return (
    <SectionBlock className="mt-24" gradient>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
            {content.hero_image_url ? (
              <img 
                src={content.hero_image_url}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-30" />
              </div>
            )}
            
            {/* Halation glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px]" />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-sm text-purple-400 uppercase tracking-wider mb-2">
            {t('Treinamento DaVinci Resolve', 'DaVinci Resolve Training')}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {title || (
              <>
                {t('Torne-se um ', 'Become a ')}
                <GlowText>{t('Colorista Profissional', 'Professional Colorist')}</GlowText>
              </>
            )}
          </h1>

          {subtitle && (
            <p className="text-lg text-zinc-300 mb-6">
              {subtitle}
            </p>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <ul className="space-y-3 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* DaVinci Logo */}
          {content.davinci_logo_url && (
            <div className="mb-6">
              <img 
                src={content.davinci_logo_url} 
                alt="DaVinci Resolve" 
                className="h-8 opacity-70"
              />
            </div>
          )}

          {/* Add LUTs option */}
          {lutsProduct && (
            <div 
              onClick={() => setAddLuts(!addLuts)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all mb-6 ${
                addLuts 
                  ? 'bg-purple-500/20 border-purple-500/50' 
                  : 'bg-zinc-800/50 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  addLuts ? 'bg-purple-500 border-purple-500' : 'border-white/30'
                }`}>
                  {addLuts && <Check className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <span className="text-white font-medium flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {t('Adicionar NAVA LUTs', 'Add NAVA LUTs')}
                  </span>
                  <span className="text-sm text-zinc-400">
                    + {currency} {lutsPrice?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {currency} {totalPrice?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
              </div>
              {addLuts && (
                <span className="text-sm text-green-400">
                  {t('Inclui NAVA LUTs', 'Includes NAVA LUTs')}
                </span>
              )}
            </div>
            
            <Button 
              size="lg"
              onClick={() => window.open(addLuts && lutsBuyLink ? lutsBuyLink : buyLink, '_blank')}
              className="rounded-xl border border-white bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-6 text-lg text-white hover:from-purple-500 hover:to-cyan-500"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t('Comprar Agora', 'Buy Now')}
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionBlock>
  );
}
