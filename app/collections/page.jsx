'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { collections } from '@/data/collections';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function CollectionsPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark
          ? 'bg-[#0a0a0a] text-white'
          : 'bg-[#FAF9F6] text-[#1a1a1a]'
      }`}
    >
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24"
      >
        {/* Hero */}
        <section className="relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`text-[10px] sm:text-xs tracking-[0.3em] uppercase ${
                isDark ? 'text-white/50' : 'text-[#6B6B6B]'
              }`}
            >
              Curated
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mt-2 max-w-4xl"
            >
              Shop by collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className={`mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg ${
                isDark ? 'text-white/60' : 'text-[#6B6B6B]'
              }`}
            >
              Discover lamps and shades by line — from portable Ekkam to sculptural Orran & Treya.
            </motion.p>
          </div>
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-transparent via-currentColor to-transparent opacity-20"
            style={{ width: '100%' }}
          />
        </section>

        {/* Bento grid */}
        <section
          ref={sectionRef}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 auto-rows-fr">
            {collections.map((col, i) => {
              const isLarge = col.size === 'large';
              const span = isLarge ? 'md:col-span-2 lg:col-span-2' : '';
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${span} min-h-[200px] sm:min-h-[320px] lg:min-h-[340px] ${
                    isLarge ? 'lg:min-h-[380px]' : ''
                  }`}
                >
                  <Link
                    href={col.href}
                    className="group block h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
                  >
                    <div
                      className={`relative h-full min-h-[200px] sm:min-h-[320px] lg:min-h-[340px] ${
                        isLarge ? 'lg:min-h-[380px]' : ''
                      } bg-slate-800`}
                    >
                      {/* Background image */}
                      <div className="absolute inset-0">
                        <img
                          src={col.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Overlay gradients by accent */}
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

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-6 md:p-7 lg:p-8">
                        <h2 className="font-serif text-sm sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg line-clamp-2 sm:line-clamp-none">
                          {col.title}
                        </h2>
                        <p className="mt-1 sm:mt-3 text-[10px] sm:text-base text-white/80 max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {col.subtitle}
                        </p>
                        <span className="mt-2 sm:mt-5 inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold tracking-wide text-white/90 group-hover:gap-3 transition-all duration-300">
                          Shop
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      {/* Subtle corner highlight - hidden on phone to save space */}
                      <div
                        className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none rounded-bl-full"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA strip */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mt-12 md:mt-16"
        >
          <Link
            href="/products"
            className={`block rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
            }`}
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              View all products
            </p>
            <p className={`mt-1 text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              Lamps, lampshades and systems
            </p>
          </Link>
        </motion.section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}
