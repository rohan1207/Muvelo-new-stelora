'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

const PRODUCTS_BASE = [
  {
    id: 1,
    name: 'Muvelo Classic',
    price: '₹12,999',
    imageOffId: 'product1-off',
    imageOnId: 'product1',
  },
  {
    id: 2,
    name: 'Muvelo Modern',
    price: '₹15,499',
    imageOffId: 'product2-off',
    imageOnId: 'product2',
  },
  {
    id: 3,
    name: 'Muvelo Elegant',
    price: '₹18,999',
    imageOffId: 'product3-off',
    imageOnId: 'product3',
  },
  {
    id: 4,
    name: 'Muvelo Premium',
    price: '₹22,499',
    imageOffId: 'product4-off',
    imageOnId: 'product4',
  },
  {
    id: 5,
    name: 'Muvelo Studio',
    price: '₹14,999',
    imageOffId: 'product5-off',
    imageOnId: 'product5',
  },
  {
    id: 6,
    name: 'Muvelo Luxe',
    price: '₹19,999',
    imageOffId: 'product6-off',
    imageOnId: 'product6',
  },
  {
    id: 7,
    name: 'Muvelo Artisan',
    price: '₹16,499',
    imageOffId: 'product7-off',
    imageOnId: 'product7',
  },
  {
    id: 8,
    name: 'Muvelo Signature',
    price: '₹24,999',
    imageOffId: 'product8-off',
    imageOnId: 'product8',
  },
];

const ProductShowcase = ({ theme = 'dark' }) => {
  const [isOn, setIsOn] = useState(false);
  const isDark = theme === 'dark';

  const PRODUCTS = useMemo(() => {
    return PRODUCTS_BASE.map(product => ({
      ...product,
      imageOff: getCloudinaryImageUrl(product.imageOffId, {
        quality: 'auto:good',
        format: 'auto',
        width: 'auto',
        crop: 'scale',
      }),
      imageOn: getCloudinaryImageUrl(product.imageOnId, {
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

  const TOTAL_CARDS_MOBILE = 8;
  const TOTAL_CARDS_DESKTOP = 15;
  const columnedProducts = useMemo(() => {
    const mobileCols = Array.from({ length: 2 }, () => []);
    const desktopCols = Array.from({ length: 5 }, () => []);
    
    const mobileExtended = [];
    for (let i = 0; i < TOTAL_CARDS_MOBILE; i += 1) {
      const baseProduct = PRODUCTS[i % PRODUCTS.length];
      mobileExtended.push({
        ...baseProduct,
        gridId: `mobile-${baseProduct.id}-${i}`,
      });
    }
    mobileExtended.forEach((product, index) => {
      mobileCols[index % 2].push(product);
    });

    const desktopExtended = [];
    for (let i = 0; i < TOTAL_CARDS_DESKTOP; i += 1) {
      const baseProduct = PRODUCTS[i % PRODUCTS.length];
      desktopExtended.push({
        ...baseProduct,
        gridId: `desktop-${baseProduct.id}-${i}`,
      });
    }
    desktopExtended.forEach((product, index) => {
      desktopCols[index % 5].push(product);
    });

    return { mobile: mobileCols, desktop: desktopCols };
  }, [PRODUCTS]);

  return (
    <section
      className={`w-full ${bgClass} py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <motion.div
          className="flex items-center justify-between gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-left flex-1 min-w-0">
            <h2
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${headingColor} leading-tight`}
              style={{ letterSpacing: '0.02em' }}
            >
              Lighting in <span className="text-red-600">Motion</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setIsOn(!isOn)}
              className="relative focus:outline-none focus:ring-0 touch-manipulation active:scale-95 transition-transform duration-100"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-red-600/20 blur-lg"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '56px',
                  height: '56px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              <div className="relative w-12 h-7 sm:w-14 sm:h-8 rounded-full bg-black border border-white/80 transition-all duration-300">
                <motion.div
                  className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md"
                  animate={{
                    x: isOn ? 18 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              </div>
            </button>

            <p
              className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] uppercase ${headingColor} opacity-70`}
            >
              Lights&nbsp;On
            </p>
          </div>
        </motion.div>

        <div className="flex md:hidden gap-2 sm:gap-2.5 items-stretch">
          {columnedProducts.mobile.map((column, colIndex) => (
            <motion.div
              key={`mobile-${colIndex}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15 * colIndex,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-20% 0px' }}
              className="flex-1 flex flex-col gap-2 sm:gap-2.5"
            >
              {column.map((product, rowIndex) => (
                <motion.div
                  key={product.gridId || product.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 * rowIndex,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                >
                  <div className="relative aspect-[4/3] mb-1 sm:mb-1.5 overflow-hidden rounded-sm" style={{ backgroundColor: isDark ? '#000000' : '#FAF9F6' }}>
                    <motion.img
                      src={product.imageOff}
                      alt={`${product.name} - Off`}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        opacity: isOn ? 0 : 1,
                      }}
                      transition={{ 
                        opacity: {
                          duration: 0.7,
                          ease: [0.2, 0, 0, 1],
                        },
                      }}
                      style={{
                        willChange: 'opacity',
                        pointerEvents: 'none',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />

                    <motion.img
                      src={product.imageOn}
                      alt={`${product.name} - On`}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        opacity: isOn ? 1 : 0,
                      }}
                      transition={{ 
                        opacity: {
                          duration: 0.7,
                          ease: [0.2, 0, 0, 1],
                        },
                      }}
                      style={{
                        willChange: 'opacity',
                        pointerEvents: 'none',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />

                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="hidden md:flex gap-2.5 items-stretch">
          {columnedProducts.desktop.map((column, colIndex) => (
            <motion.div
              key={`desktop-${colIndex}`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.18 * colIndex,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-20% 0px' }}
              className="flex-1 flex flex-col gap-1.5 sm:gap-2"
            >
              {column.map((product, rowIndex) => (
                <motion.div
                  key={product.gridId || product.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.06 * rowIndex,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                >
                  <div className="relative aspect-[4/3] mb-1.5 overflow-hidden rounded-sm" style={{ backgroundColor: isDark ? '#000000' : '#FAF9F6' }}>
                    <motion.img
                      src={product.imageOff}
                      alt={`${product.name} - Off`}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        opacity: isOn ? 0 : 1,
                      }}
                      transition={{ 
                        opacity: {
                          duration: 0.7,
                          ease: [0.2, 0, 0, 1],
                        },
                      }}
                      style={{
                        willChange: 'opacity',
                        pointerEvents: 'none',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />

                    <motion.img
                      src={product.imageOn}
                      alt={`${product.name} - On`}
                      className="absolute inset-0 w-full h-full object-cover"
                      animate={{
                        opacity: isOn ? 1 : 0,
                      }}
                      transition={{ 
                        opacity: {
                          duration: 0.7,
                          ease: [0.2, 0, 0, 1],
                        },
                      }}
                      style={{
                        willChange: 'opacity',
                        pointerEvents: 'none',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />

                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
