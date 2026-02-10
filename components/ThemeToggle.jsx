'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const BUTTON_SIZE = 48;
const CORNER_OFFSET = 24;

function ThemeToggle({ theme = 'dark', onToggleTheme, centerOnScroll = false }) {
  const isDark = theme === 'dark';
  const [isCentered, setIsCentered] = useState(false);
  const [position, setPosition] = useState({ corner: null, center: null });
  const scrollTimeoutRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bottom = h - CORNER_OFFSET - BUTTON_SIZE;
    setPosition({
      corner: { left: w - CORNER_OFFSET - BUTTON_SIZE, top: bottom },
      center: { left: w / 2 - BUTTON_SIZE / 2, top: bottom },
    });
  }, []);

  useEffect(() => {
    if (!centerOnScroll) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [centerOnScroll, updatePosition]);

  useEffect(() => {
    if (!centerOnScroll) return;
    const handleScroll = () => {
      setIsCentered(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsCentered(false);
      }, 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [centerOnScroll]);

  const buttonBg = isDark
    ? 'bg-black/60 border-white/20 hover:bg-black/80'
    : 'bg-white/60 border-black/20 hover:bg-white/80';
  const iconStroke = isDark ? '#ffffff' : '#000000';

  const useScrollPosition = centerOnScroll && position.corner != null;
  const targetPos = useScrollPosition
    ? (isCentered ? position.center : position.corner)
    : null;

  return (
    <motion.button
      type="button"
      onClick={onToggleTheme}
      className={`
        fixed z-50
        w-12 h-12 rounded-full
        border backdrop-blur-md
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        ${!useScrollPosition ? 'bottom-6 right-6 ' : ''}
        ${buttonBg}
      `}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{
        opacity: 0,
        y: 20,
        ...(useScrollPosition && position.corner != null && {
          left: position.corner.left,
          top: position.corner.top,
        }),
      }}
      animate={{
        opacity: 1,
        y: 0,
        ...(targetPos && { left: targetPos.left, top: targetPos.top }),
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
        ...(useScrollPosition && {
          left: { type: 'spring', stiffness: 300, damping: 30 },
          top: { type: 'spring', stiffness: 300, damping: 30 },
        }),
      }}
    >
      {isDark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </motion.button>
  );
}

export default ThemeToggle;

