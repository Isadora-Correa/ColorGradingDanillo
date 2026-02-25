import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { ChevronsUp } from 'lucide-react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const STAGE_POSITIONS = {
  before: 16,
  during: 50,
  after: 88,
};

const DEFAULT_COMPARE_SETS = [
  {
    id: 'set-1',
    title_pt: 'Case 01',
    title_en: 'Case 01',
    beforeSrc: '/beforeafter/case1-before.webp',
    duringSrc: '/beforeafter/case1-during.webp',
    afterSrc: '/beforeafter/case1-after.webp',
  },
  {
    id: 'set-2',
    title_pt: 'Case 02',
    title_en: 'Case 02',
    beforeSrc: '/beforeafter/case2-before.webp',
    duringSrc: '/beforeafter/case2-during.webp',
    afterSrc: '/beforeafter/case2-after.webp',
  },
  {
    id: 'set-3',
    title_pt: 'Case 03',
    title_en: 'Case 03',
    beforeSrc: '/beforeafter/case3-before.webp',
    duringSrc: '/beforeafter/case3-during.webp',
    afterSrc: '/beforeafter/case3-after.webp',
  },
];

const normalizeUrl = (value) => {
  const s = String(value ?? '').trim();
  if (!s || s === 'undefined' || s === 'null') return '';
  return s;
};

const stageFromValue = (value) => {
  if (value <= 33.333) return 'before';
  if (value <= 66.666) return 'during';
  return 'after';
};

function ComparePanel({ item, tabs }) {
  const [activeTab, setActiveTab] = useState('before');
  const [sliderX, setSliderX] = useState(STAGE_POSITIONS.before);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const pointerIdRef = useRef(null);
  const startPointRef = useRef({ x: 0, y: 0 });
  const dragLockedRef = useRef(false);

  const sources = useMemo(() => ({
    before: item.beforeSrc || item.duringSrc || item.afterSrc || '',
    during: item.duringSrc || item.beforeSrc || item.afterSrc || '',
    after: item.afterSrc || item.duringSrc || item.beforeSrc || '',
  }), [item.afterSrc, item.beforeSrc, item.duringSrc]);
  const currentImage = sources[activeTab] || sources.before;

  useEffect(() => {
    setActiveTab('before');
    setSliderX(STAGE_POSITIONS.before);
  }, [item.id]);

  const updateFromClientX = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    const clamped = clamp(next, 0, 100);
    const stage = stageFromValue(clamped);
    setSliderX(clamped);
    setActiveTab(stage);
  };

  const setStage = (stageId) => {
    setActiveTab(stageId);
    setSliderX(STAGE_POSITIONS[stageId]);
  };

  const startDrag = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerIdRef.current = e.pointerId;
    startPointRef.current = { x: e.clientX, y: e.clientY };
    dragLockedRef.current = e.pointerType === 'mouse';
    if (e.pointerType === 'mouse') {
      setIsDragging(true);
      updateFromClientX(e.clientX);
      return;
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (pointerIdRef.current === null) return;
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      if (!dragLockedRef.current) {
        const dx = Math.abs(e.clientX - startPointRef.current.x);
        const dy = Math.abs(e.clientY - startPointRef.current.y);
        if (dx < 8 && dy < 8) return;
        if (dy > dx) {
          pointerIdRef.current = null;
          dragLockedRef.current = false;
          setIsDragging(false);
          return;
        }
        dragLockedRef.current = true;
        setIsDragging(true);
      }
      updateFromClientX(e.clientX);
    };

    const onEnd = (e) => {
      if (pointerIdRef.current === null) return;
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      dragLockedRef.current = false;
      setIsDragging(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onEnd);
    window.addEventListener('pointercancel', onEnd);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onEnd);
      window.removeEventListener('pointercancel', onEnd);
    };
  }, []);

  return (
    <div className="mb-8 last:mb-0">
      <div
        ref={trackRef}
        className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 select-none touch-pan-y"
        onPointerDown={startDrag}
      >
        <img
          src={currentImage}
          alt={`${activeTab} stage`}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="auto"
        />

        <div className="absolute inset-y-0 z-10" style={{ left: `${sliderX}%` }}>
          <div className="absolute -left-px top-0 h-full w-0.5 bg-white/95 shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
          <button
            type="button"
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.4)] touch-pan-y"
            aria-label="Compare slider"
            onPointerDown={(e) => {
              e.stopPropagation();
              startDrag(e);
            }}
          >
            <ChevronsUp className="h-6 w-6 rotate-90 text-black" />
          </button>
        </div>

        <div className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStage(tab.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className={`relative min-w-[92px] overflow-hidden rounded-full px-3 py-2.5 text-[11px] font-semibold leading-tight transition-all md:min-w-0 md:px-4 md:py-2 md:text-xs ${
                activeTab === tab.id
                  ? 'bg-black/55 text-white shadow-[0_10px_28px_rgba(0,0,0,0.4)]'
                  : 'bg-black/40 text-zinc-300 hover:bg-black/55 hover:text-white'
              }`}
            >
              {activeTab === tab.id ? (
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full bg-[linear-gradient(90deg,#ff2f6d_0%,#ff8f1f_20%,#d8ff3a_40%,#31f2a7_60%,#26d8ff_78%,#7a6dff_90%,#ff38bd_100%)] opacity-45 blur-md" />
              ) : null}
              <span className="relative hidden md:inline">{tab.label}</span>
              <span className="relative flex flex-col md:hidden">
                <span>{tab.mobileLine1}</span>
                <span>{tab.mobileLine2}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ items, isLoading = false }) {
  const { t } = useLanguage();

  const compareSets = useMemo(() => {
    if (isLoading && (!Array.isArray(items) || items.length === 0)) return [];
    if (!Array.isArray(items) || items.length === 0) return DEFAULT_COMPARE_SETS;

    const normalized = items
      .map((item, index) => {
        const fallback = DEFAULT_COMPARE_SETS[index % DEFAULT_COMPARE_SETS.length];
        const beforeSrc = normalizeUrl(item?.before_url || item?.before_image_url || item?.beforeSrc) || fallback.beforeSrc;
        const duringSrc = normalizeUrl(item?.during_url || item?.during_image_url || item?.duringSrc) || beforeSrc || fallback.duringSrc;
        const afterSrc = normalizeUrl(item?.after_url || item?.after_image_url || item?.afterSrc) || duringSrc || fallback.afterSrc;

        const hasAnyContent = Boolean(
          normalizeUrl(item?.before_url || item?.before_image_url || item?.beforeSrc) ||
          normalizeUrl(item?.during_url || item?.during_image_url || item?.duringSrc) ||
          normalizeUrl(item?.after_url || item?.after_image_url || item?.afterSrc) ||
          item?.title_pt ||
          item?.title_en ||
          item?.description_pt ||
          item?.description_en
        );
        if (!hasAnyContent) return null;

        return {
          id: item?.id || `set-${index + 1}`,
          title_pt: item?.title_pt || `Case ${index + 1}`,
          title_en: item?.title_en || `Case ${index + 1}`,
          order: Number.isFinite(Number(item?.order)) ? Number(item.order) : index,
          beforeSrc,
          duringSrc,
          afterSrc,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.order - b.order);

    return normalized.length > 0 ? normalized : DEFAULT_COMPARE_SETS;
  }, [isLoading, items]);

  const tabs = [
    {
      id: 'before',
      label: t('Antes do Curso', 'Before Course'),
      mobileLine1: t('Antes do', 'Before'),
      mobileLine2: t('Curso', 'Course'),
    },
    {
      id: 'during',
      label: t('Durante o Curso', 'During Course'),
      mobileLine1: t('Durante o', 'During'),
      mobileLine2: t('Curso', 'Course'),
    },
    {
      id: 'after',
      label: t('Depois do Curso', 'After Course'),
      mobileLine1: t('Depois do', 'After'),
      mobileLine2: t('Curso', 'Course'),
    },
  ];

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Aprenda Color Grading', 'Learn Color Grading')}
        highlight={t('de iniciante ao profissional', 'from Beginner to Pro')}
        titleClassName="text-[1.55rem] leading-[1.1] md:text-4xl lg:text-5xl"
      />

      {isLoading && compareSets.length === 0 ? (
        <div className="mb-8">
          <div className="aspect-video rounded-xl border border-white/10 bg-zinc-900/40 animate-pulse" />
        </div>
      ) : null}

      {compareSets.map((item, index) => (
        <ComparePanel
          key={item.id || index}
          item={item}
          tabs={tabs}
        />
      ))}
    </SectionBlock>
  );
}
