'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { collections, collectionFilters } from '@/data/collections';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function CollectionsPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedHighlight, setSelectedHighlight] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.06 });

  const filteredCollections =
    selectedHighlight === 'all'
      ? collections
      : collections.filter((c) => c.id === selectedHighlight);

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleAttribute = (id) => {
    setSelectedAttributes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buildProductHref = (baseHref) => {
    const [path, existingQuery] = baseHref.split('?');
    const params = new URLSearchParams(existingQuery || '');
    if (selectedColors.length) params.set('color', selectedColors.join(','));
    if (selectedAttributes.length) params.set('style', selectedAttributes.join(','));
    const q = params.toString();
    return q ? `${path}?${q}` : baseHref;
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#FAF9F6] text-[#1a1a1a]'
      }`}
    >
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24"
      >
        {/* Hero */}
        <section className="relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-10 md:pt-14 pb-8 md:pb-12">
          <div className="max-w-[1400px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className={`text-[10px] sm:text-xs tracking-[0.28em] uppercase ${
                isDark ? 'text-white/50' : 'text-[#6B6B6B]'
              }`}
            >
              Curated
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mt-1.5 max-w-3xl"
            >
              Shop by collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className={`mt-4 sm:mt-6 max-w-lg text-sm sm:text-base ${
                isDark ? 'text-white/60' : 'text-[#6B6B6B]'
              }`}
            >
              Discover lamps and shades by line — from portable Ekkam to sculptural Orran & Treya.
            </motion.p>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-transparent via-currentColor to-transparent opacity-20"
          />
        </section>

        {/* Instagram-style circular highlights */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-2 pb-6 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto overflow-y-hidden pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {collections.map((col, i) => {
              const isSelected = selectedHighlight === col.id;
              return (
                <motion.button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedHighlight(col.id)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF9F6] focus-visible:ring-slate-400"
                  style={{ scrollSnapAlign: 'start' }}
                  aria-pressed={isSelected}
                  aria-label={`Show ${col.title}`}
                >
                  <div
                    className={`relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[88px] md:h-[88px] rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-offset-[#FAF9F6] ring-slate-700 shadow-lg'
                        : isDark
                        ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-[#0a0a0a] hover:ring-white/40'
                        : 'ring-2 ring-slate-200 ring-offset-2 ring-offset-[#FAF9F6] hover:ring-slate-400'
                    } ${isDark && isSelected ? 'ring-white/50 ring-offset-[#0a0a0a]' : ''}`}
                  >
                    <img
                      src={col.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {isSelected && (
                      <motion.div
                        layoutId="highlight-ring"
                        className={`absolute inset-0 rounded-full border-2 ${
                          isDark ? 'border-white/60' : 'border-slate-600'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-medium text-center max-w-[80px] sm:max-w-[88px] truncate transition-colors ${
                      isSelected
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                        ? 'text-white/60 group-hover:text-white/80'
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    {col.title}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        {/* Filters – separate section: color + attributes */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className={`rounded-2xl border transition-colors ${
              isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-slate-200/80 shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 rounded-2xl"
              aria-expanded={showFilters}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4 opacity-70" />
                Filters
                {(selectedColors.length > 0 || selectedAttributes.length > 0) && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isDark ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selectedColors.length + selectedAttributes.length}
                  </span>
                )}
              </span>
              <span
                className={`text-xs ${isDark ? 'text-white/50' : 'text-slate-500'}`}
              >
                {showFilters ? 'Hide' : 'Show'} options
              </span>
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 space-y-5 border-t border-white/10 sm:border-slate-200/60">
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wider mb-2.5 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                        Color
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {collectionFilters.colors.map((c) => {
                          const active = selectedColors.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => toggleColor(c.id)}
                              className={`w-8 h-8 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 ${
                                active ? 'border-slate-700 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                              } ${isDark && active ? 'border-white/50' : ''}`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                              aria-pressed={active}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wider mb-2.5 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                        Style
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {collectionFilters.attributes.map((attr) => {
                          const active = selectedAttributes.includes(attr.id);
                          return (
                            <button
                              key={attr.id}
                              type="button"
                              onClick={() => toggleAttribute(attr.id)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 ${
                                active
                                  ? isDark
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-800 text-white'
                                  : isDark
                                  ? 'bg-white/10 text-white/80 hover:bg-white/15'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              aria-pressed={active}
                            >
                              {attr.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Bento grid */}
        <section
          ref={sectionRef}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {filteredCollections.map((col, i) => {
                const isLarge = col.size === 'large';
                const span = isLarge ? 'md:col-span-2 lg:col-span-2' : '';
                return (
                  <motion.div
                    key={col.id}
                    layout
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.04 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${span} min-h-[200px] sm:min-h-[300px] lg:min-h-[320px] ${
                      isLarge ? 'lg:min-h-[360px]' : ''
                    }`}
                  >
                    <Link
                      href={buildProductHref(col.href)}
                      className="group block h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                      style={{
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      <div
                        className={`relative h-full min-h-[200px] sm:min-h-[300px] lg:min-h-[320px] ${
                          isLarge ? 'lg:min-h-[360px]' : ''
                        } bg-slate-800`}
                      >
                        <div className="absolute inset-0">
                          <img
                            src={col.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div
                            className={`absolute inset-0 ${
                              col.accent === 'maroon'
                                ? 'bg-gradient-to-t from-[#3d1515]/95 via-[#1a0a0a]/70 to-transparent'
                                : col.accent === 'warm'
                                ? 'bg-gradient-to-t from-black/90 via-amber-950/40 to-transparent'
                                : col.accent === 'gold'
                                ? 'bg-gradient-to-t from-black/85 via-amber-900/30 to-transparent'
                                : col.accent === 'soft'
                                ? 'bg-gradient-to-t from-black/90 via-slate-900/50 to-transparent'
                                : 'bg-gradient-to-t from-black/85 via-black/40 to-transparent'
                            }`}
                          />
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 md:p-6 lg:p-7">
                          <h2 className="font-serif text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-lg line-clamp-2">
                            {col.title}
                          </h2>
                          <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-white/80 max-w-md leading-relaxed line-clamp-2">
                            {col.subtitle}
                          </p>
                          <span className="mt-2 sm:mt-4 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-white/90 group-hover:gap-2.5 transition-all duration-300">
                            Shop
                            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>

                        <div
                          className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-bl-full"
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-10 md:mt-14"
        >
          <Link
            href={buildProductHref('/products')}
            className={`block rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 text-center border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
            }`}
          >
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
              View all products
            </p>
            <p className={`mt-0.5 text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              Lamps, lampshades and systems
            </p>
          </Link>
        </motion.section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}
