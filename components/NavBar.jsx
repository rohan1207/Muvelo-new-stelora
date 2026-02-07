import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

function NavBar({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;

      if (currentY < 80) {
        setIsVisible(true);
      } else {
        const scrollingDown = delta > 0;
        if (scrollingDown) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 80) {
          setIsVisible(true);
        }
      }, 900);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const navBg = isDark
    ? 'bg-black/40 border-white/10'
    : 'bg-white/50 border-black/10';
  const navTextColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const inactiveLinkColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const activeLinkColor = isDark ? 'text-white' : 'text-[#1a1a1a]';

  const navItems = [
    { label: 'Home', href: '/home3' },
    { label: 'Products', href: '/products' },
    { label: 'Lampshades', href: '/lampshades' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/home3') && pathname === '/home3') return true;
    const basePath = href.split('#')[0];
    return pathname.startsWith(basePath);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const iconButtonBase =
    'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors duration-200 cursor-pointer';
  const iconBorder = isDark ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/10';
  const iconStroke = isDark ? '#ffffff' : '#000000';
  const iconSize = 'w-3.5 h-3.5 sm:w-4 sm:h-4';

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-40 
        transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)]
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        pointer-events-none
      `}
    >
      <nav
        className={`
          ${navBg} ${navTextColor}
          border-b backdrop-blur-xl backdrop-saturate-150
          pointer-events-auto
        `}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center py-3 sm:py-4 md:py-5 lg:py-6 gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden ${iconButtonBase} ${iconBorder}`}
                aria-label="Menu"
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>

              <Link
                href="/products"
                aria-label="Shop all lamps"
                className={`md:hidden ${iconButtonBase} ${iconBorder}`}
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Table lamp: base, stem, shade */}
                  <path d="M5 21h14" />
                  <path d="M12 21v-8" />
                  <path d="M6 13l3.5-6a4 4 0 0 1 5 0L18 13H6z" />
                </svg>
              </Link>

              <div className="hidden md:flex items-center gap-3 lg:gap-5 text-xs md:text-sm lg:text-base uppercase tracking-[0.18em] flex-1 justify-start -ml-2 sm:-ml-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      ${inactiveLinkColor} hover:${activeLinkColor}
                      transition-colors duration-200 whitespace-nowrap
                      ${isActive(item.href) ? activeLinkColor : ''}
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <img
                  src={getCloudinaryImageUrl('logo', {
                    quality: 'auto:good',
                    format: 'auto',
                    width: 'auto',
                    crop: 'scale',
                  })}
                  alt="MUVELO"
                  className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain scale-125 sm:scale-135 md:scale-150"
                />
              </Link>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-end">
              <Link
                href="/blogs"
                className={`
                  hidden sm:flex items-center
                  px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2
                  rounded-full border text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.18em] font-semibold
                  transition-all duration-200
                  ${isActive('/blogs') 
                    ? isDark 
                      ? 'bg-white/10 border-white/30 text-white' 
                      : 'bg-black/10 border-black/30 text-black'
                    : isDark
                      ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'border-black/10 text-[#6B6B6B] hover:bg-black/10 hover:text-[#1a1a1a]'
                  }
                `}
              >
                Blogs
              </Link>

              <Link
                href="/"
                className={`
                  hidden sm:flex items-center
                  px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2
                  rounded-full border text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.18em] font-semibold
                  transition-all duration-200
                  ${isActive('/contact') 
                    ? isDark 
                      ? 'bg-white/10 border-white/30 text-white' 
                      : 'bg-black/10 border-black/30 text-black'
                    : isDark
                      ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'border-black/10 text-[#6B6B6B] hover:bg-black/10 hover:text-[#1a1a1a]'
                  }
                `}
              >
                Contact
              </Link>

              <button
                type="button"
                className={`${iconButtonBase} ${iconBorder}`}
                aria-label="Search"
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>

              <button
                type="button"
                className={`hidden sm:flex ${iconButtonBase} ${iconBorder}`}
                aria-label="Wishlist"
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6a5 5 0 0 0-7.1 0L12 6.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7L12 21l7.1-7.6 1.7-1.7a5 5 0 0 0 0-7.1z" />
                </svg>
              </button>

              <button
                type="button"
                className={`hidden sm:flex ${iconButtonBase} ${iconBorder}`}
                aria-label="Account"
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c1.5-3 3.9-4.5 7-4.5s5.5 1.5 7 4.5" />
                </svg>
              </button>

              <button
                type="button"
                className={`${iconButtonBase} ${iconBorder}`}
                aria-label="Cart"
              >
                <svg
                  className={iconSize}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="17" cy="20" r="1.4" />
                  <path d="M3 4h2l2.4 11.2a1.2 1.2 0 0 0 1.2.9h9.2a1.2 1.2 0 0 0 1.2-.9L21 9H8" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Full-screen mobile menu — rendered via portal so it covers entire viewport (not clipped by header transform) */}
      {typeof document !== 'undefined' &&
        isMobileMenuOpen &&
        createPortal(
          <div
            className={`md:hidden fixed inset-0 z-[9999] flex flex-col w-screen h-screen min-w-full min-h-full ${
              isDark ? 'bg-black' : 'bg-[#FAF9F6]'
            }`}
            style={{ left: 0, top: 0, right: 0, bottom: 0, width: '100vw', height: '100dvh' }}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className={`flex items-center justify-between px-4 sm:px-6 py-4 border-b shrink-0 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <span className={`text-sm font-semibold uppercase tracking-wider ${navTextColor}`}>
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center ${iconBorder}`}
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3.5 text-base uppercase tracking-[0.18em]
                    transition-colors duration-200 rounded-lg
                    ${isActive(item.href) ? activeLinkColor + ' font-semibold' : inactiveLinkColor + ' hover:' + activeLinkColor}
                  `}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-4 py-3.5 text-base uppercase tracking-[0.18em]
                  transition-colors duration-200 rounded-lg
                  ${isActive('/blogs') ? activeLinkColor + ' font-semibold' : inactiveLinkColor + ' hover:' + activeLinkColor}
                `}
              >
                Blogs
              </Link>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-4 py-3.5 text-base uppercase tracking-[0.18em]
                  transition-colors duration-200 rounded-lg
                  ${isActive('/contact') ? activeLinkColor : inactiveLinkColor + ' hover:' + activeLinkColor}
                `}
              >
                Contact
              </Link>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}

export default NavBar;

