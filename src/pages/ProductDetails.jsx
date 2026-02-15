import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from "../api/apiClient";
import { useLanguage } from '../components/ui/LanguageContext';
import { LanguageProvider } from '../components/ui/LanguageContext';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import NavHeader from '../components/common/NavHeader';

function ProductDetailContent() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('slug');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      const products = await apiClient.get('products');
      return products.find(p => p.slug === productSlug);
    },
    enabled: !!productSlug,
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => apiClient.get('settings'),
    select: (data) => data?.[0] || {},
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">{t('Produto não encontrado', 'Product not found')}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('Voltar', 'Back')}
          </Button>
        </div>
      </div>
    );
  }

  const name = language === 'pt' ? product.name_pt : product.name_en;
  const description = language === 'pt' ? product.description_pt : product.description_en;
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const buyLink = language === 'pt' ? product.buy_link_brl : product.buy_link_usd;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <NavHeader logoUrl={settings?.logo_url} />
      
      {/* Close Button - Fixed Top Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => navigate('/')}
        className="fixed top-44 right-40 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
        title={t('Fechar', 'Close')}
      >
        <X className="w-6 h-6" />
      </motion.button>
      
      <div className="pt-40 pb-16 px-4 md:pr-20">
        <div className="max-w-6xl mx-auto">
          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-50" />
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Product type badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-4 w-fit">
                {product.product_type === 'course' ? t('Curso Digital', 'Digital Course') : 'LUTs Pack'}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {currency}{price?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Description */}
              {description && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-3">{t('Descrição', 'Description')}</h2>
                  <p className="text-zinc-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              )}

              {/* Additional Details Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.product_type === 'course' && (
                  <>
                    {product.modules_count && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-zinc-500 text-sm mb-1">{t('Módulos', 'Modules')}</p>
                        <p className="text-xl font-bold text-white">{product.modules_count}</p>
                      </div>
                    )}
                    {product.duration && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-zinc-500 text-sm mb-1">{t('Duração', 'Duration')}</p>
                        <p className="text-xl font-bold text-white">{product.duration}</p>
                      </div>
                    )}
                  </>
                )}
                {product.product_type !== 'course' && (
                  <>
                    {product.luts_count && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-zinc-500 text-sm mb-1">{t('LUTs', 'LUTs')}</p>
                        <p className="text-xl font-bold text-white">{product.luts_count}</p>
                      </div>
                    )}
                    {product.formats && (
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-zinc-500 text-sm mb-1">{t('Formatos', 'Formats')}</p>
                        <p className="text-xl font-bold text-white">{product.formats}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Buy Button */}
              {buyLink ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    className="w-full px-8 h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                  >
                    <a href={buyLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      {t('Comprar Agora', 'Buy Now')}
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              ) : (
                <Button
                  disabled
                  className="w-full px-8 h-14 text-lg font-semibold"
                >
                  {t('Em breve', 'Coming soon')}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <LanguageProvider>
      <ProductDetailContent />
    </LanguageProvider>
  );
}
