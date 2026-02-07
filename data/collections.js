/**
 * Curated collections for the Shop by Collection page.
 * href can be /products or /products?collection=... or /products?flag=new
 */
export const collections = [
  {
    id: 'all',
    title: 'All',
    subtitle: 'Explore the full Muvelo range',
    href: '/products',
    image: '/product1.webp',
    size: 'medium',
    accent: null,
  },
  {
    id: 'valentines-vela',
    title: "Valentine's Vela",
    subtitle: 'Love Maroon',
    href: '/products',
    image: '/product1.webp',
    size: 'large',
    accent: 'maroon',
  },
  {
    id: 'ekkam',
    title: 'Ekkam & Ekkam Max',
    subtitle: 'Muvelo table lamps which are portable, rechargeable and modular. Both sizes — big and normal.',
    href: '/products',
    image: '/product2.webp',
    size: 'large',
    accent: 'warm',
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Just landed — latest designs and finishes',
    href: '/products?flag=new',
    image: '/product1-off.png',
    size: 'medium',
    accent: 'gold',
  },
  {
    id: 'orran-treya',
    title: 'Orran & Treya',
    subtitle: 'Orran Touch Lamps · Treya Lamps',
    href: '/products',
    image: '/heroimg.png',
    size: 'large',
    accent: 'soft',
  },
  {
    id: 'vela',
    title: 'Vela',
    subtitle: 'Sculpted forms for calm spaces',
    href: '/products',
    image: '/product2-off.png',
    size: 'medium',
    accent: null,
  },
];
