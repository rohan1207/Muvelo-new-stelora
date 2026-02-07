'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

const FloatingDish = ({ src, alt, className, animation }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={animation}
  >
    <img src={src} alt={alt} className="w-full h-full object-contain drop-shadow-2xl" />
  </motion.div>
);

const OwnerMessage = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  const bgClass = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]';
  
  const headingColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const subTextColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const accentColor = 'text-red-600';
  const iconBg = isDark ? 'bg-white/10 border border-white/20' : 'bg-gray-100';
  const iconColor = isDark ? 'text-white' : 'text-[#1a1a1a]';

  return (
    <section className={`${bgClass} py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 ${iconBg} rounded-full backdrop-blur-sm`}>
            <Quote className={`w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 ${iconColor}`} strokeWidth={1.5} />
          </div>
        </div>

        <p className={`text-sm sm:text-base md:text-lg lg:text-2xl ${subTextColor} text-center leading-relaxed mx-auto`}>
          We&apos;re not just making lights. We&apos;re crafting movement.
          Muvèlo reimagines everyday objects as adaptable, beautiful, and functional pieces for modern living.
          Our collection, Ekkam, celebrates portability, modularity, and sustainable design, all built right here in India.
        </p>

        <p className={`text-center ${accentColor} font-semibold text-xs sm:text-sm md:text-base mt-6 sm:mt-8 tracking-[0.18em] uppercase`}>MUVELO</p>
      </div>

      <FloatingDish 
        src={getCloudinaryImageUrl('om1', {
          quality: 'auto:good',
          format: 'auto',
          width: 'auto',
          crop: 'scale',
        })}
        alt="Decorative element" 
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 top-[70%] sm:top-[68%] md:top-[35%] -translate-y-1/2 left-0 sm:left-[-2%]"
        animation={{ y: [0, -15, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <FloatingDish 
        src={getCloudinaryImageUrl('om2', {
          quality: 'auto:good',
          format: 'auto',
          width: 'auto',
          crop: 'scale',
        })} 
        alt="Decorative element" 
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 top-[-5%] sm:top-[-2%] md:top-[10%] -translate-y-[70%] right-0 sm:right-[0%]"
        animation={{ y: [0, 15, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
    </section>
  );
};

export default OwnerMessage;
