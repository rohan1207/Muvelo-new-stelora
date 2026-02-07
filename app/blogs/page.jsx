'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import blogsData from '@/data/blogs';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const categories = ['All', ...new Set(blogsData.map((b) => b.category))];

export default function BlogsPage() {
  const { theme, toggleTheme } = useTheme();
  const [category, setCategory] = useState('All');

  const isDark = theme === 'dark';

  const filteredBlogs = useMemo(() => {
    if (category === 'All') return blogsData;
    return blogsData.filter((b) => b.category === category);
  }, [category]);

  const featured = useMemo(() => blogsData.filter((b) => b.featured), []);

  const pageBg = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]';
  const muted = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const cardBg = isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white/80 border-black/8';
  const pillActive = isDark ? 'bg-white text-black' : 'bg-black text-white';
  const pillInactive = isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-black/5 text-gray-700 hover:bg-black/10';

  return (
    <div className={`min-h-screen flex flex-col ${pageBg}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28"
      >
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-6 sm:mb-14 md:mb-16">
            <p className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1.5 sm:mb-2 ${muted}`}>
              MUVELO Journal
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl">
              Light, design &amp; the art of living well
            </h1>
            <p className={`mt-3 sm:mt-4 max-w-xl text-xs sm:text-base leading-relaxed ${muted}`}>
              Stories on warm light, minimal spaces, and the small rituals that make home feel like home.
            </p>
          </div>

          {/* Featured strip — 2 cols on phone, 3 cols from sm (desktop unchanged) */}
          {featured.length > 0 && (
            <div className="mb-8 sm:mb-16">
              <p className={`text-[10px] sm:text-xs tracking-[0.18em] uppercase mb-3 sm:mb-6 ${muted}`}>
                Featured
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                {featured.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <Link href={`/blogs/${post.slug}`} className="block">
                      <div className={`relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border ${cardBg} transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl`}>
                        <img
                          src={`${post.image}?v=${post.imageVersion ?? post.date}`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-5">
                          <span className={`text-[9px] sm:text-xs tracking-[0.18em] uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {post.category} · {post.readTime} min
                          </span>
                          <h2 className="mt-0.5 sm:mt-1 text-xs sm:text-xl font-semibold tracking-tight line-clamp-2 text-white drop-shadow-lg">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-6 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs tracking-[0.16em] uppercase transition-colors ${category === cat ? pillActive : pillInactive}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog grid — 2 cols on phone, 2 from sm, 3 from lg (desktop unchanged) */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 lg:gap-10"
          >
            {filteredBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link href={`/blogs/${post.slug}`} className="block">
                  <div className={`rounded-lg sm:rounded-xl overflow-hidden border ${cardBg} transition-all duration-300 group-hover:shadow-lg group-hover:border-white/15`}>
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <img
                        src={`${post.image}?v=${post.imageVersion ?? post.date}`}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5 sm:p-5">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs tracking-[0.18em] uppercase text-gray-400 mb-1 sm:mb-2">
                        <span>{post.category}</span>
                        <span aria-hidden>·</span>
                        <span>{post.readTime} min</span>
                      </div>
                      <h2 className="text-xs sm:text-xl font-semibold tracking-tight leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-2">
                        {post.title}
                      </h2>
                      <p className={`mt-1 sm:mt-2 text-[10px] sm:text-sm leading-relaxed line-clamp-2 ${muted}`}>
                        {post.excerpt}
                      </p>
                      <p className={`mt-2 sm:mt-3 text-[9px] sm:text-xs line-clamp-1 ${muted}`}>
                        {formatDate(post.date)} · {post.author}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}
