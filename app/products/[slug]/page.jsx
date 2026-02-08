'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { ShieldCheck, RotateCcw, Truck, CreditCard, BadgeCheck } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import TrendingSocials from '@/components/TrendingSocials';
import productsData from '@/data/products.json';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const product = useMemo(
    () => productsData.find((p) => p.slug === slug),
    [slug]
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const base = product.images?.on;
    const gallery = product.images?.gallery && product.images.gallery.length > 0
      ? product.images.gallery
      : [];

    if (gallery.length >= 3) return gallery;

    // Repeat primary image to fill up to 4 slots if gallery is small
    const filled = [...gallery];
    while (filled.length < 4) {
      filled.push(base);
    }
    return filled.slice(0, 4);
  }, [product]);

  const { theme, toggleTheme } = useTheme();
  const topSectionRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState('tech');
  const [activeFaqTab, setActiveFaqTab] = useState('product');
  const [quantity, setQuantity] = useState(1);
  const [sliderValue, setSliderValue] = useState(40);
  const [activeLightModeId, setActiveLightModeId] = useState(
    product?.lightModes && product.lightModes.length > 0 ? product.lightModes[0].id : 'ambient'
  );

  const isDark = theme === 'dark';

  const [showFloatingSummary, setShowFloatingSummary] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!topSectionRef.current) return;
      const rect = topSectionRef.current.getBoundingClientRect();
      const threshold = 80; // approx below navbar
      const shouldShow = rect.bottom <= threshold;
      setShowFloatingSummary(shouldShow);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <NavBar theme="light" />
        <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16">
          <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            The lamp you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="px-5 py-2 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-900 hover:text-white transition-colors"
          >
            Back to products
          </button>
        </main>
        <Footer theme="light" />
      </div>
    );
  }

  const formatPrice = (v) => `₹${v.toLocaleString('en-IN')}`;

  const lightModes = product.lightModes || [
    { id: 'ambient', label: 'Ambient', temperatureK: 2700 },
    { id: 'focus', label: 'Focus', temperatureK: 3200 },
  ];

  const otherProducts = productsData.filter((p) => p.id !== product.id).slice(0, 3);

  // Placeholder verified reviews (replace with backend real data later)
  const ratingValue = product.rating?.average?.toFixed(1) ?? '4.6';
  const reviewCount = product.rating?.count ?? 76;
  const placeholderReviews = [
    { name: 'Priya S.', text: 'Looks even better in person. The glow is super soft and premium—exactly what we wanted for our bedroom.', stars: 5 },
    { name: 'Rahul M.', text: 'Battery life is impressive. We use it every evening and charge maybe once a week. Beautiful design.', stars: 5 },
    { name: 'Ananya K.', text: 'Gifted this to my parents. They love how easy it is to move around. Warm light is very soothing.', stars: 5 },
    { name: 'Vikram R.', text: 'Solid build and the touch control is responsive. Fits our minimal setup perfectly. Happy with the purchase.', stars: 5 },
  ];

  const sections = [
    {
      id: 'tech',
      title: 'Technical specifications',
      content: [
        `Brightness modes: ${(product.lightModes || []).map((m) => m.label).join(', ') || 'Soft ambient modes'}`,
        `Battery life: ${product.battery?.lifeHours || '24+'} hours (typical)`,
        `Charge time: ${product.battery?.chargeTimeHours || 3} hours via ${product.battery?.connector || 'USB‑C'}`,
        `Dimensions: ${product.dimensions?.heightCm || '–'}cm (H) × ${product.dimensions?.diameterCm || '–'}cm (D)`,
        `Weight: ${product.dimensions?.weightKg || '–'} kg`,
      ],
    },
    {
      id: 'material',
      title: 'Material and care',
      content: [
        `Shell: ${(product.materials || [])[0] || 'Bio‑plastic shell'}`,
        `Structure: ${(product.materials || [])[1] || 'Powder‑coated aluminium/steel'}`,
        'Wipe with a soft, dry cloth. Avoid harsh chemicals and direct water spray.',
        'Indoor use only. Keep away from direct heat sources and open flames.',
      ],
    },
    {
      id: 'box',
      title: 'In the box',
      content: [
        `${product.name} lamp`,
        'Charging cable (USB‑C)',
        'Quick start guide & care card',
      ],
    },
    {
      id: 'extra',
      title: 'Additional details',
      content: [
        'Designed and made in India in small batches.',
        'Every lamp is individually QC-checked before shipping.',
        'Minor surface variations are normal and part of the crafted character.',
      ],
    },
  ];

  const faqs = {
    product: [
      {
        q: `What spaces is ${product.name} best for?`,
        a: `Most customers use ${product.name} on dining tables, consoles and bedside tables. It is wireless, so you can move it around easily for mood lighting.`,
      },
      {
        q: 'Is the light harsh or glaring?',
        a: 'The light source is fully diffused through the sculpted shell, so you see a soft glow, not a naked LED. It is comfortable to look at, even in a dark room.',
      },
      {
        q: 'Can I use it outdoors?',
        a: 'You can occasionally use it on covered balconies or terraces, but avoid rain and direct moisture. It is not IP-rated for permanent outdoor use.',
      },
    ],
    troubleshooting: [
      {
        q: 'The lamp does not turn on after charging.',
        a: 'Check that the cable is fully inserted and the adapter is working. Charge for at least 30 minutes and then try the power button again. If it still does not turn on, contact support with your order ID.',
      },
      {
        q: 'Brightness feels low.',
        a: 'Switch through the different brightness/scene modes. In very bright rooms, the lamp is designed to be soft, not a main work light.',
      },
    ],
    technical: [
      {
        q: 'Which charger should I use?',
        a: 'Use a standard 5V/2A USB adapter. Fast chargers are supported but do not reduce the recommend charge time significantly.',
      },
      {
        q: 'Does it get hot?',
        a: 'The LEDs run cool; the shell may get slightly warm after long use, but never too hot to touch.',
      },
    ],
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 5) return 5;
      return next;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white' : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]'}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24"
      >
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Breadcrumb + back */}
          <div className={`flex items-center justify-between text-xs lg:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <span className="text-sm sm:text-base">←</span>
              <span>Back</span>
            </button>
            <div className="hidden sm:block">
              Home / Products / <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-medium`}>{product.name}</span>
            </div>
          </div>

          {/* Floating summary bar (desktop) – fixed bottom-right */}
          {showFloatingSummary && (
            <div
              className={`hidden lg:flex fixed right-6 bottom-6 z-40 items-center gap-3 rounded-xl border px-3.5 py-2.5 shadow-[0_14px_40px_rgba(15,23,42,0.22)]
                ${isDark ? 'border-white/10 bg-black/85 backdrop-blur-md' : 'border-slate-200 bg-white/95 backdrop-blur-md'}
              `}
            >
              {/* Thumbnail */}
              <img
                src={galleryImages[0]}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />

              {/* Name + collection + price */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {product.name}
                </p>
                <p className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {product.collection}
                </p>
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Quantity + compact CTAs */}
              <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`inline-flex items-center rounded-full border text-sm ${
                      isDark ? 'border-white/20 text-slate-200' : 'border-slate-300 text-slate-700'
                    }`}
                  >
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/10"
                  >
                    –
                  </button>
                  <span className="w-8 sm:w-9 text-center text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/10"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em]
                    ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'}
                  `}
                >
                  Buy
                </button>

                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] border
                    ${isDark
                      ? 'border-white/40 text-white hover:bg-white/10'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-50'}
                  `}
                >
                  Cart
                </button>
              </div>
            </div>
          )}

          {/* Main grid: on phone order = image+thumbs → product info → before/after; on lg = (image+thumbs, before/after) | product info */}
          <div ref={topSectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-start lg:grid-rows-[auto_auto]">
            {/* Block A: Main image + thumbnails (phone: first; lg: row 1 col 1) */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5 order-1 lg:col-start-1 lg:row-start-1">
              <motion.div
                className="relative rounded-lg overflow-hidden bg-slate-100 shadow-[0_40px_120px_rgba(15,23,42,0.25)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  draggable={false}
                  className="w-full h-full object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-[480px] select-none pointer-events-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/[0.06] via-transparent to-black/[0.12]" />
              </motion.div>

              <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative rounded-lg overflow-hidden flex-shrink-0 border transition-all duration-200 ${
                      activeImage === idx
                        ? 'border-slate-900 ring-2 ring-slate-900/60'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      draggable={false}
                      className="w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 object-cover select-none"
                    />
                  </button>
                ))}
              </div>

              {/* Product name + short description below image (centered) */}
              <div className="text-center space-y-1.5 sm:space-y-2">
                <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  {product.name}
                </h2>
                <p className={`text-sm sm:text-base leading-snug line-clamp-2 max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-[#6B6B6B]'}`}>
                  {product.shortDescription}
                </p>
              </div>
            </div>

            {/* Block B: Product info (phone: second, right after image; lg: col 2, span 2 rows) */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-7 lg:sticky lg:top-32 order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            {/* Title & badges */}
              <div className="space-y-2 sm:space-y-3">
                 <div className={`flex flex-wrap gap-1.5 sm:gap-2 text-sm sm:text-xs lg:text-sm uppercase tracking-[0.18em] ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                  <span>{product.collection}</span>
                  {product.badge && (
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-[10px] sm:text-xs ${isDark ? 'bg-red-600/20 text-red-400 border-red-600/30' : 'bg-red-600/10 text-red-600 border-red-600/20'}`}>
                      {product.badge}
                    </span>
                  )}
                  {product.flags?.isBestseller && (
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-[10px] sm:text-xs ${isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      Bestseller
                    </span>
                  )}
                </div>
                 <h1 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  {product.name}
                </h1>
                 <p className={`text-sm sm:text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                  {product.longDescription}
                </p>
                 <div className={`flex items-center gap-2 text-sm sm:text-xs sm:text-sm lg:text-base pt-1 ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span>{product.rating?.average?.toFixed(1) ?? '4.8'}</span>
                  </span>
                  <span>•</span>
                  <span>{product.rating?.count ?? 0} reviews</span>
                </div>
              </div>

              {/* Why this lamp / benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className={`rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 ${isDark ? 'bg-white/8' : 'bg-slate-50'}`}>
                  <p
                    className={`font-semibold text-xs sm:text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] mb-1 ${
                      isDark ? 'text-white' : 'text-[#1a1a1a]'
                    }`}
                  >
                    Soft glow
                  </p>
                  <p className={`text-xs sm:text-[10px] sm:text-xs lg:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                    Fully diffused light that flatters skin tones & dinner tables.
                  </p>
                </div>
                <div className={`rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 ${isDark ? 'bg-white/8' : 'bg-slate-50'}`}>
                  <p
                    className={`font-semibold text-xs sm:text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] mb-1 ${
                      isDark ? 'text-white' : 'text-[#1a1a1a]'
                    }`}
                  >
                    All‑day battery
                  </p>
                  <p className={`text-xs sm:text-[10px] sm:text-xs lg:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                    {product.battery?.lifeHours || '24+'} hours of cable‑free glow on a full charge.
                  </p>
                </div>
                <div className={`rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 ${isDark ? 'bg-white/8' : 'bg-slate-50'}`}>
                  <p
                    className={`font-semibold text-xs sm:text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] mb-1 ${
                      isDark ? 'text-white' : 'text-[#1a1a1a]'
                    }`}
                  >
                    Crafted here
                  </p>
                  <p className={`text-xs sm:text-[10px] sm:text-xs lg:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                    Designed & made in India in small batches, QC‑checked one by one.
                  </p>
                </div>
              </div>

              {/* Price & quantity */}
               <div className={`flex flex-col gap-2 sm:gap-3 border-y py-3 sm:py-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-end gap-2 sm:gap-3 flex-wrap">
                   <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp && (
                     <span className={`text-sm sm:text-xs sm:text-sm lg:text-base line-through ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                  {product.mrp && product.price && (
                    <span className="text-xs sm:text-[10px] sm:text-xs font-semibold text-emerald-600 px-2 py-0.5 sm:py-1 rounded-full bg-emerald-50">
                      Save&nbsp;
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}
                      %
                    </span>
                  )}
                </div>

                {/* Delivery promise */}
                 <p className={`text-xs sm:text-[10px] sm:text-xs rounded-full inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 w-fit
                   ${isDark ? 'text-emerald-300 bg-emerald-900/40' : 'text-emerald-700 bg-emerald-50'}
                 `}>
                  <span className="text-[10px] sm:text-[10px]">●</span>
                  <span className="leading-tight">Order today for dispatch in 24 hours. Pan‑India delivery in 7 days.</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`text-slate-500 uppercase tracking-[0.16em] text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Quantity
                    </span>
                    <div className={`inline-flex items-center rounded-full border overflow-hidden ${isDark ? 'border-white/20' : 'border-slate-200'}`}>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-lg ${isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
                      >
                        –
                      </button>
                      <span className={`w-9 sm:w-10 text-center text-sm sm:text-base font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-lg ${isDark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary uses chips */}
               <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(product.primaryUse || []).map((use) => (
                  <span
                    key={use}
                     className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-[10px] sm:text-xs ${isDark ? 'bg-white/10 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {use}
                  </span>
                ))}
              </div>

              {/* CTAs — wavy lines flow top to bottom, pause on hover/click; side by side on all screens */}
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4">
                <motion.button
                  type="button"
                  className={`group relative flex-1 min-w-0 sm:flex-initial sm:min-w-0 overflow-hidden px-3 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition-colors
                     ${isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}
                   `}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none" aria-hidden>
                    {/* 3×32px tiles = 96px so button stays filled during 32px scroll; seamless loop */}
                    <div className="cta-wavy-run animate-wavy-flow absolute left-0 right-0 w-full h-[96px]" style={{ top: 0 }}>
                      {[0, 32, 64].map((top) => (
                        <svg key={top} className="absolute left-0 w-full" width="100%" height="32" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid slice" style={{ top }}>
                          {[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30].map((y) => (
                            <path key={y} d={`M0 ${y} Q20 ${y-6} 40 ${y} T80 ${y}`} stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="0.7" />
                          ))}
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="relative z-10">Buy now</span>
                </motion.button>

                <motion.button
                  type="button"
                  className={`group relative flex-1 min-w-0 sm:flex-initial sm:min-w-0 overflow-hidden px-3 sm:px-8 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm lg:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors
                     ${isDark
                       ? 'border-white/30 text-white bg-slate-800 hover:bg-slate-700'
                       : 'border-black/20 text-[#1a1a1a] bg-slate-200 hover:bg-slate-300'}
                   `}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none" aria-hidden>
                    <div className="cta-wavy-run animate-wavy-flow absolute left-0 right-0 w-full h-[96px]" style={{ top: 0 }}>
                      {[0, 32, 64].map((top) => (
                        <svg key={top} className="absolute left-0 w-full" width="100%" height="32" viewBox="0 0 80 32" preserveAspectRatio="xMidYMid slice" style={{ top }}>
                          {[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30].map((y) => (
                            <path key={y} d={`M0 ${y} Q20 ${y-6} 40 ${y} T80 ${y}`} stroke={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.07)'} fill="none" strokeWidth="0.7" />
                          ))}
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="relative z-10">Add to cart</span>
                </motion.button>
              </div>

              {/* Policy icons */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium block text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px]">1‑year warranty</span>
                    <span className={`text-[11px] md:text-[8px] sm:text-[9px] lg:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Against manufacturing defects.</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium block text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px]">Easy Returns</span>
                    <span className={`text-[11px] md:text-[8px] sm:text-[9px] lg:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      48‑hour return window. <a href="#termcondition" className={`underline underline-offset-1 ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Terms & conditions</a> apply.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Truck size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium block text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px]">Free shipping</span>
                    <span className={`text-[11px] md:text-[8px] sm:text-[9px] lg:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Above a minimum cart value.</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <CreditCard size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium block text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px]">COD available</span>
                    <span className={`text-[11px] md:text-[8px] sm:text-[9px] lg:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Pay on delivery in most pin codes.</span>
                  </div>
                </div>
              </div>

              {/* Energy & safety callout */}
               <div className={`mt-2 sm:mt-3 rounded-lg border px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-[9px] sm:text-[10px] lg:text-[11px] space-y-1 sm:space-y-1.5
                 ${isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}
               `}>
                 <p className={`font-semibold text-sm sm:text-[10px] sm:text-[11px] lg:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Good to know</p>
                <p>Consumes less than 6W – cheaper than a regular bulb to keep on all evening.</p>
                <p>Tested for 10,000+ on/off cycles for everyday reliability.</p>
              </div>

              {/* Accordion sections */}
               <div className="space-y-1.5 sm:space-y-2 pt-1">
                {sections.map((section) => (
                   <div key={section.id} className={`border rounded-lg overflow-hidden ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSection((prev) => (prev === section.id ? '' : section.id))
                      }
                       className={`w-full flex items-center justify-between px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 text-left text-sm sm:text-xs sm:text-sm font-medium
                         ${isDark ? 'text-slate-100' : 'text-slate-800'}
                       `}
                    >
                      <span>{section.title}</span>
                      <span className={`text-slate-400 text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-400'}`}>
                        {activeSection === section.id ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {activeSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                           className={`px-3 sm:px-4 lg:px-5 pb-2.5 sm:pb-3 lg:pb-4 text-sm sm:text-[10px] lg:text-sm space-y-1 sm:space-y-1.5 border-t
                             ${isDark ? 'text-slate-300 border-white/10' : 'text-slate-600 border-slate-200'}
                           `}
                        >
                          {section.content.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Block C: Before / After (phone: third; lg: row 2 col 1) */}
              <div className="w-full order-3 lg:col-start-1 lg:row-start-2">
                 <div className={`rounded-lg border px-2 sm:px-3 lg:px-2 py-2 sm:py-3 lg:py-2 space-y-2 sm:space-y-3
                   ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}
                 `}>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div>
                       <p className={`text-xs sm:text-[10px] lg:text-xs uppercase tracking-[0.22em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Before / After
                      </p>
                       <p className={`text-sm sm:text-sm lg:text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        See how the scene changes with {product.name}
                      </p>
                    </div>
                   
                  </div>

                   <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100">
                    {/* Full-size images: no overlap, no movement – only the clip edge moves */}
                    {/* AFTER (right side) – full container, always visible */}
                    <img
                      src={product.images?.beforeAfter?.after || product.images?.on || galleryImages[0]}
                      alt={`${product.name} after`}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover object-left select-none pointer-events-none"
                    />
                    {/* BEFORE (left side) – full container size, clipped by slider; image never resizes */}
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                    >
                      <img
                        src={product.images?.beforeAfter?.before || product.images?.off || galleryImages[0]}
                        alt={`${product.name} before`}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-left select-none"
                      />
                    </div>

                    {/* Divider line – no image movement, only line moves */}
                    <div
                      className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none z-10"
                      style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
                    />

                    {/* Handle */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                      style={{ left: `${sliderValue}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200/80 shadow-md flex items-center justify-center text-slate-500 text-[10px] sm:text-xs">
                        ↔
                      </div>
                    </div>

                    {/* Slider input – only captures drag */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-[5]"
                    />
                  </div>
                </div>
              </div>
            </div>

          {/* FAQ, comparison and social proof */}
          <div className="grid lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* FAQs + comparison (left column) — pill-style UI for accessibility */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div className="space-y-2">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  Frequently asked questions
                </h2>
                <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Find answers by category below.
                </p>
              </div>

              {/* Pill-style category tabs — easy to find and tap */}
              <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="FAQ categories">
                {[
                  { id: 'product', label: 'Product' },
                  { id: 'troubleshooting', label: 'Troubleshooting' },
                  { id: 'technical', label: 'Technical' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeFaqTab === tab.id}
                    aria-controls={`faq-panel-${tab.id}`}
                    id={`faq-tab-${tab.id}`}
                    onClick={() => setActiveFaqTab(tab.id)}
                    className={`rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-medium transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      activeFaqTab === tab.id
                        ? isDark
                          ? 'bg-red-500 text-white focus-visible:ring-red-400 shadow-lg'
                          : 'bg-red-600 text-white focus-visible:ring-red-500 shadow-lg'
                        : isDark
                        ? 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10 focus-visible:ring-slate-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 focus-visible:ring-slate-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FAQ list — pill-style cards, high contrast, easy to read */}
              <div
                id={`faq-panel-${activeFaqTab}`}
                role="tabpanel"
                aria-labelledby={`faq-tab-${activeFaqTab}`}
                className="space-y-3 sm:space-y-4"
              >
                {faqs[activeFaqTab].map((item) => (
                  <details
                    key={item.q}
                    className={`group rounded-2xl overflow-hidden border transition-colors ${
                      isDark ? 'bg-white/5 border-white/10 hover:border-white/15' : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <summary className="flex items-start justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500/50">
                      <span className={`flex-1 text-left text-sm sm:text-base lg:text-lg font-semibold leading-snug pr-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg sm:text-xl font-medium transition-colors ${
                        isDark ? 'bg-white/10 text-slate-300 group-open:bg-red-500/20 group-open:text-red-300' : 'bg-slate-200 text-slate-600 group-open:bg-red-100 group-open:text-red-600'
                      }`} aria-hidden>
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>
                    <div
                      className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-0 sm:pt-0 text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>

              {/* Comparison table – directly under FAQs */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  Why Muvelo vs a generic lamp?
                </h2>
                 <div className={`overflow-hidden rounded-lg border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                   <div className={`grid grid-cols-3 text-xs sm:text-[10px] lg:text-xs font-medium border-b px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5
                     ${isDark ? 'text-slate-200 border-white/10 bg-white/5' : 'text-slate-500 border-slate-200 bg-slate-50'}
                   `}>
                    <span />
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>{product.name}</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-500'}>Generic lamp</span>
                  </div>
                   <div className={`divide-y text-xs sm:text-[10px] lg:text-xs ${isDark ? 'divide-white/10' : 'divide-slate-200'}`}>
                    <div className="grid grid-cols-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Light quality</span>
                      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>Soft, diffused glow</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Harsh LED hotspot</span>
                    </div>
                    <div className="grid grid-cols-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Power</span>
                      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>Wireless, all‑day battery</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Needs socket, cable clutter</span>
                    </div>
                    <div className="grid grid-cols-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Design</span>
                      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>Sculpted & display‑worthy</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Functional, not decor</span>
                    </div>
                    <div className="grid grid-cols-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Support</span>
                      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>1‑year warranty, India‑based</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Limited or none</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: reviews – pills, verified indicator, customer reviews */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              <div className="space-y-3 sm:space-y-4">
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  Customer reviews
                </h2>

                {/* Separate pills: rating + review count */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-semibold ${isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    <span className="text-amber-500">★</span>
                    {ratingValue}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium ${isDark ? 'bg-white/10 text-slate-200 border border-white/10' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                    {reviewCount} reviews
                  </span>
                  {/* Certified / verified reviews indicator */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${isDark ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                    <BadgeCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0" aria-hidden />
                    Verified reviews
                  </span>
                </div>

                {/* Review cards – verified users with name + text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {placeholderReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl sm:rounded-2xl border p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50/80'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`font-semibold text-sm sm:text-base truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {review.name}
                          </span>
                          <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-blue-500" aria-label="Verified purchase" />
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs sm:text-sm flex-shrink-0">
                          {'★'.repeat(review.stars)}
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended lamps – premium horizontal scroller */}
           <div className="mt-6 sm:mt-8 lg:mt-10 space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                 <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                You may also like
              </h2>
              <span className={`text-xs sm:text-[10px] lg:text-[11px] uppercase tracking-[0.18em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Curated picks from the Muvelo collection
              </span>
            </div>

             <div className="relative">
               <div
                 className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-2 sm:pb-3 scrollbar-hide"
                 style={{ scrollSnapType: 'x mandatory' }}
               >
                {otherProducts.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                     className={`snap-start flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] rounded-lg border overflow-hidden shadow-[0_14px_40px_rgba(15,23,42,0.16)]
                       ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}
                     `}
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={p.images?.on}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                     <div className="px-2 sm:px-3 py-2 sm:py-2.5 space-y-1 sm:space-y-1.5">
                       <p className={`text-xs sm:text-[11px] font-medium line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {p.name}
                      </p>
                       <p className={`text-xs sm:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.collection}</p>
                       <p className={`text-xs sm:text-[11px] font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending socials at bottom */}
           <div className="mt-8 sm:mt-12 lg:mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
             <TrendingSocials theme={isDark ? 'dark' : 'light'} />
          </div>
        </section>
      </motion.main>

       <Footer theme={theme} />
    </div>
  );
}
