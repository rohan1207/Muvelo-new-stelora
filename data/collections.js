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

/**
 * Filter options for the Collection page (color swatches + attributes).
 * Used to build /products?color=... or pass to product listing.
 */
export const collectionFilters = {
  colors: [
    { id: 'sandstone', name: 'Sandstone', hex: '#E9D5B5' },
    { id: 'charcoal', name: 'Charcoal', hex: '#1A1A1A' },
    { id: 'ink', name: 'Ink Black', hex: '#111111' },
    { id: 'cloud', name: 'Cloud Grey', hex: '#D4D4D8' },
    { id: 'amber', name: 'Amber Glow', hex: '#F6A623' },
    { id: 'clay', name: 'Soft Clay', hex: '#E1BFA5' },
    { id: 'stone', name: 'Stone', hex: '#C4C4C4' },
    { id: 'chalk', name: 'Chalk White', hex: '#F5F5F5' },
    { id: 'gold', name: 'Molten Gold', hex: '#F6C36A' },
    { id: 'terracotta', name: 'Terracotta', hex: '#D38B5D' },
    { id: 'sunset', name: 'Soft Sunset', hex: '#E58D6E' },
  ],
  attributes: [
    { id: 'table', label: 'Table' },
    { id: 'portable', label: 'Portable' },
    { id: 'sculptural', label: 'Sculptural' },
    { id: 'touch', label: 'Touch' },
  ],
};
