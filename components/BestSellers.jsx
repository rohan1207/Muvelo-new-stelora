'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

const BESTSELLERS_BASE = [
  {
    id: 1,
    badge: 'NEW LAUNCH',
    name: 'Muvelo Classic ',
    description: 'Smart oil-filled heater with soft ambient glow this is a test description.',
    price: '₹13,999',
    mrp: '₹19,999',
    rating: '4.8',
    reviews: '112',
    imageId: 'product1',
  },
  {
    id: 2,
    badge: 'TRENDING',
    name: 'Muvelo Modern',
    description: 'Slim profile heater designed for modern homes this is a test description.',
    price: '₹9,499',
    mrp: '₹14,999',
    rating: '4.9',
    reviews: '98',
    imageId: 'product2',
  },
  {
    id: 3,
    badge: 'ICONIC',
    name: 'Muvelo Elegant',
    description: 'Compact radiant heater with sculpted form this is a test description.',
    price: '₹7,999',
    mrp: '₹11,499',
    rating: '4.7',
    reviews: '76',
    imageId: 'product3',
  },
  {
    id: 4,
    badge: 'MOST LOVED',
    name: 'Muvelo Premium',
    description: 'All‑rounder cleaning companion for warm spaces this is a test description.',
    price: '₹12,499',
    mrp: '₹17,999',
    rating: '4.9',
    reviews: '134',
    imageId: 'product4',
  },
  {
    id: 5,
    badge: 'NEW LAUNCH',
    name: 'Muvelo Studio',
    description: 'Smart oil-filled heater with soft ambient glow this is a test description.',
    price: '₹13,999',
    mrp: '₹19,999',
    rating: '4.8',
    reviews: '112',
    imageId: 'product5',
  },
  {
    id: 6,
    badge: 'TRENDING',
    name: 'Muvelo Luxe',
    description: 'Slim profile heater designed for modern homes this is a test description.',
    price: '₹9,499',
    mrp: '₹14,999',
    rating: '4.9',
    reviews: '98',
    imageId: 'product6',
  },
  {
    id: 7,
    badge: 'ICONIC',
    name: 'Muvelo Artisan',
    description: 'Compact radiant heater with sculpted form this is a test description.',
    price: '₹7,999',
    mrp: '₹11,499',
    rating: '4.7',
    reviews: '76',
    imageId: 'product7',
  },
  {
    id: 8,
    badge: 'MOST LOVED',
    name: 'Muvelo Signature',
    description: 'All‑rounder cleaning companion for warm spaces this is a test description.',
    price: '₹12,499',
    mrp: '₹17,999',
    rating: '4.9',
    reviews: '134',
    imageId: 'product8',
  },
];

const BestSellers = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const BESTSELLERS = useMemo(() => {
    return BESTSELLERS_BASE.map(item => ({
      ...item,
      imageSrc: getCloudinaryImageUrl(item.imageId, {
        quality: 'auto:good',
        format: 'auto',
        width: 'auto',
        crop: 'scale',
      }),
    }));
  }, []);

  const bgClass = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]';

  const headingColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const subColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const productNameColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const productDescColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const mrpColor = isDark ? 'text-gray-400' : 'text-[#6B6B6B]';
  const priceColor = isDark ? 'text-white' : 'text-[#1a1a1a]';

  return (
    <section
      className={`w-full ${bgClass} py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${headingColor} leading-tight`}
          >
            Bestsellers this <span className="text-red-600">season</span>
          </h2>
          <p className={`text-xs sm:text-sm md:text-base ${subColor} max-w-xl leading-relaxed`}>
            Curated pieces that our community keeps coming back to – warm
            silhouettes, timeless finishes, and effortless everyday luxury.
          </p>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-7 overflow-x-auto pb-3 sm:pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {BESTSELLERS.map((item) => (
              <motion.article
                key={item.id}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] relative group"
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden ">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.15] group-hover:-translate-y-[10%]"
                      style={{ transformOrigin: 'center top' }}
                    />
                  </div>

                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-[0.16em] uppercase backdrop-blur-md
                      ${isDark ? 'bg-black/70 text-gray-100' : 'bg-white/80 text-black'}
                    `}>
                      {item.badge}
                    </span>
                  </div>

                  <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] text-amber-300 backdrop-blur-md
                    ${isDark ? 'bg-black/70' : 'bg-white/85 text-amber-500'}
                  `}>
                    <span>★ {item.rating}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5 mt-3 sm:mt-3.5">
                  <h3 className={`text-base sm:text-lg font-bold ${productNameColor} leading-tight`}>
                    {item.name}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${productDescColor} line-clamp-2`}>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex flex-col gap-0.5">
                      {item.mrp && (
                        <span className={`text-xs sm:text-sm line-through ${mrpColor}`}>
                          {item.mrp}
                        </span>
                      )}
                      <span className={`text-base sm:text-lg font-bold ${priceColor}`}>
                        {item.price}
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 touch-manipulation whitespace-nowrap
                        ${isDark
                          ? 'bg-black text-white hover:bg-black/80 active:bg-black/70 border border-white/20'
                          : 'bg-black text-white hover:bg-black/80 active:bg-black/70'
                        }
                      `}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
