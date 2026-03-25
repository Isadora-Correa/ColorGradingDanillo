import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// Import corrigido para o alias @
import { apiClient } from '@/api/apiClient'; 
import { useLanguage } from '../components/ui/LanguageContext';
import { LanguageProvider } from '../components/ui/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
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
      // Proteção para garantir que products seja um array
      const productList = Array.isArray(products) ? products : [];
      return productList.find((p) => p.slug === productSlug);
    },
    enabled: !!productSlug,
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => apiClient.get('settings'),
    select: (data) => (Array.isArray(data) ? data[0] : data) || {},
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">{t('Produto nao encontrado', 'Product not found')}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('Voltar', 'Back')}
          </Button>
        </div>
      </div>
    );
  }

  // Lógica de dados do produto (Igual ao seu original)
  const name = language === 'pt' ? (product.name_pt || product.name_en) : (product.name_en || product.name_pt);
  const description = language === 'pt' ? (product.description_pt || product.description_en) : (product.description_en || product.description_pt);
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const comparePrice = language === 'pt' ? product.compare_at_price_brl : product.compare_at_price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const buyLink = language === 'pt' ? (product.buy_link_brl || product.buy_link_usd) : (product.buy_link_usd || product.buy_link_brl);
  
  const features = (language === 'pt' ? product.features_pt : product.features_en) || [];
  const featureItems = (Array.isArray(features) ? features : []).slice(0, 4);

  const detailImage = language === 'pt'
    ? (product.detail_image_url_pt || product.image_url || '/produto1.webp')
    : (product.detail_image_url_en || product.image_url || '/produto1.webp');

  const hasComparePrice = Number.isFinite(comparePrice) && comparePrice > price;
  const savingsPercent = hasComparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(250,120,40,0.22),transparent_40%),radial-gradient(circle_at_82%_22%,rgba(103,232,249,0.2),transparent_36%),radial-gradient(circle_at_50%_85%,rgba(244,63,94,0.18),transparent_42%)]" />
      </div>

      <NavHeader logoUrl={settings?.logo_url} />

      <div className="relative px-4 pb-6 pt-32 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="rounded-full border border-white/20 bg-transparent px-4 text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('Voltar', 'Back')}
            </Button>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              src={detailImage}
              alt={name}
              className="mx-auto h-auto max-h-[34vh] w-full max-w-[900px] object-contain sm:max-h-[46vh] lg:col-span-6 lg:max-h-[66vh]"
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-6"
            >
              <span className="mb-3 inline-flex w-fit text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                {product.product_type === 'course' ? t('Curso', 'Course') : t('Bundle', 'Bundle')}
              </span>

              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {name}
              </h1>

              <div className="mb-4 flex w-fit flex-wrap items-end gap-3">
                <span className="text-3xl font-bold text-white lg:text-4xl">
                  {currency}{price?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
                </span>
                {hasComparePrice && (
                  <span className="text-lg text-zinc-500 line-through">
                    {currency}{comparePrice?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
                {savingsPercent && (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                    {t('Economize', 'Save')} {savingsPercent}%
                  </span>
                )}
              </div>

              <p className="mb-5 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
                {description}
              </p>

              {featureItems.length > 0 && (
                <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                  {featureItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#39e09b]" />
                      <span className="text-xs text-zinc-200 md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-start">
                <Button
                  onClick={() => buyLink && window.open(buyLink, '_blank')}
                  className="h-12 rounded-full bg-black/40 px-10 text-base font-bold text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-black/55 active:scale-[0.98]"
                >
                  <span className="relative inline-flex items-center px-1 py-0.5 leading-none">
                    {/* O EFEITO DE BRILHO VOLTOU AQUI: */}
                    <span className="absolute -inset-1 rounded-md bg-[linear-gradient(90deg,#ff2f6d_0%,#ff8f1f_20%,#d8ff3a_40%,#31f2a7_60%,#26d8ff_78%,#7a6dff_90%,#ff38bd_100%)] opacity-65 blur-md" />
                    <span className="relative text-white">
                      {t('Comprar agora', 'Buy now')}
                    </span>
                  </span>
                </Button>
              </div>
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