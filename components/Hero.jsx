'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import SplashCursor from './SplashCursor';
import { useScroll, useTransform, motion } from 'framer-motion';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

function Hero({ theme = 'dark' }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isDark = theme === 'dark';
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkIsPhone = () => {
      setIsPhone(window.innerWidth < 640);
    };
    
    checkIsPhone();
    window.addEventListener('resize', checkIsPhone);
    return () => window.removeEventListener('resize', checkIsPhone);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
    layoutEffect: false,
    axis: 'y',
  });

  const imageY = useTransform(
    scrollYProgress, 
    [0, 1], 
    isPhone ? ['-20vh', '-30vh'] : ['-25vh', '-45vh'], 
    { clamp: false }
  );
  
  const textY = useTransform(
    scrollYProgress, 
    isPhone ? [0, 0.4, 0.5, 1] : [0, 0.7, 0.8, 1], 
    isPhone ? ['20px', '75vh', '80vh', '80vh'] : ['10px', '90vh', '100vh', '100vh'],
    { clamp: false }
  );
  
  const textFontSize = useTransform(
    scrollYProgress, 
    [0, 0.7, 1], 
    isPhone 
      ? ['3rem', '4rem', '4rem']
      : ['5rem', '8rem', '8rem'],
    { clamp: false }
  );

  const imageStyle = useMemo(() => ({
    top: isPhone ? '50vh' : '45vh',
    y: imageY,
    willChange: 'transform',
    cursor: 'default',
    pointerEvents: 'auto',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    isolation: 'isolate',
  }), [imageY, isPhone]);

  const textStyle = useMemo(() => ({
    y: textY,
    x: '-50%',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    isolation: 'isolate',
  }), [textY]);

  const muveloGradient = 'linear-gradient(90deg, #f97316, #fb7185, #eab308)';

  const heroImageUrl = useMemo(() => {
    if (isPhone) {
      return isDark
        ? getCloudinaryImageUrl('heroimg_phone', {
            quality: 'auto:good',
            format: 'auto',
            width: 640,
            crop: 'scale',
          })
        : getCloudinaryImageUrl('heroimg_day_phone', {
            quality: 'auto:good',
            format: 'auto',
            width: 640,
            crop: 'scale',
          });
    } else {
      return isDark
        ? getCloudinaryImageUrl('heroimg', {
            quality: 'auto:good',
            format: 'auto',
            width: 1920,
            crop: 'scale',
          })
        : getCloudinaryImageUrl('heroimg_day', {
            quality: 'auto:good',
            format: 'auto',
            width: 1920,
            crop: 'scale',
          });
    }
  }, [isDark, isPhone]);

  return (
    <>
      <style>{`
        .hero-container {
          min-height: 100vh;
        }
        @media (min-width: 640px) {
          .hero-container {
            min-height: 140vh;
          }
        }
      `}</style>
      <div 
        ref={containerRef} 
        className="hero-container relative w-full overflow-x-hidden"
        style={{
          willChange: 'auto',
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          backgroundColor: isDark ? '#000000' : 'transparent',
          contain: 'layout style paint',
        }}
      >
      <SplashCursor />
      
      {isDark ? (
        <div 
          className="fixed inset-0 w-full h-full z-0 bg-black stars-background"
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)',
            contain: 'layout style paint'
          }}
        />
      ) : (
        <div 
          className="fixed inset-0 z-0 day-sky-background"
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        />
      )}

      <motion.div
        className="fixed top-12 sm:top-16 md:top-20 left-1/2 z-20 pointer-events-none"
        style={{
          ...textStyle,
          width: '100vw',
          overflow: 'visible',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          boxSizing: 'border-box'
        }}
      >
        <motion.h1 
          className="muvelo-text-gradient font-bold "
          style={{
            fontSize: textFontSize,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.03em',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            willChange: isPhone ? 'transform, font-size' : 'transform',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: muveloGradient,
            display: 'block',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transform: 'translateZ(0)',
            isolation: 'isolate',
          }}
        >
          MUVELO
        </motion.h1>
      </motion.div>

      <motion.div
        ref={imageRef}
        className="absolute left-0 w-full"
        style={{
          ...imageStyle,
          zIndex: 10
        }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.9) 100%)',
            willChange: 'auto',
            transform: 'translateZ(0)'
          }}
        />
        
        <img
          src={heroImageUrl}
          alt="Hero"
          className="w-full h-auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            willChange: 'transform',
            cursor: 'default',
            pointerEvents: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            imageRendering: 'auto',
            contain: 'layout style paint',
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            if (isPhone) {
              e.target.src = isDark ? "/heroimg_phone.png" : "/heroimg_day_phone.png";
            } else {
              e.target.src = isDark ? "/heroimg.png" : "/heroimg_day.png";
            }
          }}
        />
      </motion.div>

      <div className="relative z-0" style={{ height: isPhone ? '10vh' : '15vh', pointerEvents: 'none' }} />
    </div>
    </>
  );
}

export default Hero;
