'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const values = [
  {
    title: 'Designed to move',
    body: 'Portable, cord-free light that goes where you do—bedside, balcony, or a new home.',
  },
  {
    title: 'Warmth first',
    body: 'We tune every lamp to a soft, golden glow. No harsh whites, no cold blues.',
  },
  {
    title: 'Built to last',
    body: 'Thoughtful materials and repairable design. Less waste, more years of use.',
  },
];

const stats = [
  { value: '2700K', label: 'Warm light temperature' },
  { value: '8h+', label: 'Battery life' },
  { value: '100%', label: 'Cord-free portable' },
];

export default function AboutPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const pageBg = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]';
  const muted = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const cardBg = isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/90 border-black/6';
  const accent = isDark ? 'text-amber-200/90' : 'text-amber-700';

  return (
    <div className={`min-h-screen flex flex-col ${pageBg}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28"
      >
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mb-14 sm:mb-20 md:mb-24">
            <p className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 ${muted}`}>
              About MUVELO
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]">
              Light that fits your life
            </h1>
            <p className={`mt-6 text-base sm:text-lg leading-relaxed ${muted}`}>
              We started with a simple idea: lighting should be warm, portable, and beautiful. No cords, no cold white bulbs—just a soft glow you can carry from room to room, and from place to place.
            </p>
          </div>

          {/* Quote / statement */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative pl-4 sm:pl-6 border-l-2 ${isDark ? 'border-amber-400/50' : 'border-amber-600/50'} py-2 my-12 sm:my-16`}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-snug italic">
              This isn&rsquo;t just a lamp. It&rsquo;s MUVELO — designed to move.
            </p>
          </motion.blockquote>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`grid grid-cols-3 gap-4 sm:gap-6 py-8 sm:py-10 rounded-2xl border ${cardBg} mb-14 sm:mb-20`}
          >
            {stats.map((item, i) => (
              <div key={item.label} className="text-center px-2 sm:px-4">
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${accent}`}>
                  {item.value}
                </div>
                <div className={`mt-1 text-[10px] sm:text-xs tracking-[0.14em] uppercase ${muted}`}>
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <div className="mb-14 sm:mb-20">
            <p className={`text-[10px] sm:text-xs tracking-[0.18em] uppercase mb-8 sm:mb-10 ${muted}`}>
              What we believe
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-xl border ${cardBg} p-6 sm:p-8 transition-all duration-300 hover:border-white/15 hover:shadow-lg`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${muted}`}>
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-2xl border ${cardBg} p-8 sm:p-10 md:p-12 text-center`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Explore our collection
            </h2>
            <p className={`max-w-md mx-auto text-sm sm:text-base mb-6 ${muted}`}>
              Lamps that move with you. Warm light, no cords, built to last.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold tracking-[0.14em] uppercase bg-white text-black hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              View products
            </Link>
          </motion.div>
        </section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}
