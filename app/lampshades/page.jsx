'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import LampshadeCard from '@/components/LampshadeCard';
import SystemSelector from '@/components/SystemSelector';
import SystemAddToCart from '@/components/SystemAddToCart';
import lampshadesData from '@/data/lampshades.json';

export default function LampshadesOnlyPage() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLampshade, setSelectedLampshade] = useState(null);
  const [systemFilter, setSystemFilter] = useState('all');

  const isDark = theme === 'dark';

  const filteredLampshades = useMemo(() => {
    if (systemFilter === 'all') return lampshadesData;
    return lampshadesData.filter((l) => l.system === systemFilter);
  }, [systemFilter]);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white' : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]'}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pt-20 sm:pt-24 md:pt-28 pb-32 md:pb-20"
      >
        <section className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-3 sm:space-y-5 md:space-y-6">
                <div className="space-y-1.5 sm:space-y-3 md:space-y-4">
                  <p className={`text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                    Lampshades Only
                  </p>
                  <h1 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    This page is <span className="text-red-600">lampshades only</span>
                  </h1>
                  <p className={`max-w-2xl text-[11px] sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                    No full lamps here—only interchangeable lampshades. Each lampshade fits one system (Bullet or CoreMount). Choose by system below; add a system separately if you need one.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 shadow-sm ${
                    isDark 
                      ? 'bg-red-500/10 border-red-500/30' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                      <p className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        System is not included — system must be purchased separately
                      </p>
                      <p className={`text-[11px] sm:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Lampshades are sold alone. To use them you need a compatible system (Bullet or CoreMount). Add a system to cart from the block on this page.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <span className={`text-[11px] sm:text-sm font-medium w-full sm:w-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Filter by System:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      { id: 'all', label: 'All Systems' },
                      { id: 'bullet', label: 'Bullet System' },
                      { id: 'coremount', label: 'CoreMount System' },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setSystemFilter(filter.id)}
                        className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[9px] sm:text-xs font-medium transition-all shadow-sm ${
                          systemFilter === filter.id
                            ? isDark
                              ? 'bg-white text-black shadow-lg'
                              : 'bg-black text-white shadow-lg'
                            : isDark
                            ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 lg:gap-6">
                {filteredLampshades.map((lampshade, index) => (
                  <motion.div
                    key={lampshade.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <LampshadeCard
                      lampshade={lampshade}
                      onSelect={setSelectedLampshade}
                      isSelected={selectedLampshade?.id === lampshade.id}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </div>

              {selectedLampshade && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8"
                >
                  <SystemSelector lampshade={selectedLampshade} theme={theme} />
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-4 max-lg:order-last">
              <div className="max-lg:sticky max-lg:bottom-0 max-lg:z-10 lg:sticky lg:top-24">
                <SystemAddToCart theme={theme} />
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}
