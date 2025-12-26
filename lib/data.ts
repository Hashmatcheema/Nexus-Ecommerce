// Dummy data for portfolio - Premium Fashion Brand

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  description?: string
  details?: string[]
  sizes?: string[]
  colors?: string[]
  inStock?: boolean
  isNew?: boolean
  isSale?: boolean
}

export interface Collection {
  id: number
  name: string
  description: string
  image: string
  productCount: number
  slug: string
}

export interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  text: string
  verified: boolean
}

// All Products - Cohesive Fashion Photography
export const allProducts: Product[] = [
  // New Arrivals - Vibrant Orange/Terracotta Theme
  {
    id: 1,
    name: 'Terracotta Linen Dress',
    price: 395,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    ],
    category: 'Dresses',
    description: 'Stunning terracotta linen dress with elegant draping. Perfect for warm-weather occasions.',
    details: ['100% premium linen', 'Relaxed silhouette', 'Side pockets', 'Machine washable', 'Made in Portugal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Terracotta', 'Sand', 'White'],
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: 'Burnt Orange Silk Top',
    price: 285,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    category: 'Tops',
    description: 'Luxurious silk top in a warm burnt orange hue. Effortlessly elegant.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burnt Orange', 'Cream', 'Black'],
    isNew: true,
    inStock: true,
  },
  {
    id: 3,
    name: 'Camel Wool Trousers',
    price: 245,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    category: 'Bottoms',
    description: 'High-waisted wide-leg trousers in warm camel wool. Clean lines and elegant drape.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Camel', 'Black', 'Navy'],
    isNew: true,
    inStock: true,
  },
  {
    id: 4,
    name: 'Rust Cashmere Sweater',
    price: 325,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    category: 'Knitwear',
    description: 'Ultra-soft cashmere sweater in a rich rust tone. Timeless and cozy.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rust', 'Cream', 'Grey'],
    isNew: true,
    inStock: true,
  },
  // Bestsellers - Fashion Forward
  {
    id: 5,
    name: 'Camel Wool Coat',
    price: 695,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    category: 'Outerwear',
    description: 'Iconic double-breasted coat in camel wool. A timeless investment piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Grey'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Terracotta Midi Skirt',
    price: 195,
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80',
    category: 'Bottoms',
    description: 'Flowing midi skirt in warm terracotta. Elegant movement and drape.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Terracotta', 'Black', 'Navy'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Cream Cashmere Knit',
    price: 165,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    category: 'Knitwear',
    description: 'Fine-gauge cashmere knit in warm cream. Luxuriously soft.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Camel', 'Black'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Orange Silk Dress',
    price: 275,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    category: 'Dresses',
    description: 'Stunning silk dress in vibrant orange. Statement piece for any occasion.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Orange', 'Black', 'Cream'],
    inStock: true,
  },
  // Sale Items
  {
    id: 9,
    name: 'Linen Blend Blazer',
    price: 245,
    originalPrice: 395,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    category: 'Outerwear',
    description: 'Relaxed linen-blend blazer. Unlined construction for warm weather.',
    sizes: ['S', 'M', 'L'],
    colors: ['Sand', 'White'],
    isSale: true,
    inStock: true,
  },
  {
    id: 10,
    name: 'Cotton Poplin Shirt',
    price: 95,
    originalPrice: 145,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    category: 'Tops',
    description: 'Classic cotton poplin shirt with mother-of-pearl buttons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    isSale: true,
    inStock: true,
  },
  {
    id: 11,
    name: 'Wool Cigarette Pants',
    price: 145,
    originalPrice: 225,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    category: 'Bottoms',
    description: 'Slim cigarette pants in stretch wool. Mid-rise with side zip.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Black', 'Navy', 'Grey'],
    isSale: true,
    inStock: true,
  },
  {
    id: 12,
    name: 'Silk Camisole',
    price: 85,
    originalPrice: 145,
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80',
    category: 'Tops',
    description: 'Delicate silk camisole with lace trim. Adjustable straps.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne', 'Black', 'Blush'],
    isSale: true,
    inStock: true,
  },
  // Additional Products
  {
    id: 13,
    name: 'Leather Crossbody Bag',
    price: 425,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    category: 'Accessories',
    description: 'Structured crossbody in Italian calfskin. Adjustable strap.',
    colors: ['Black', 'Tan', 'Burgundy'],
    inStock: true,
  },
  {
    id: 14,
    name: 'Cashmere Scarf',
    price: 195,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    category: 'Accessories',
    description: 'Oversized cashmere scarf in a soft, brushed finish.',
    colors: ['Camel', 'Grey', 'Black'],
    inStock: true,
  },
  {
    id: 15,
    name: 'Leather Belt',
    price: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    category: 'Accessories',
    description: 'Classic leather belt with polished silver hardware.',
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true,
  },
  {
    id: 16,
    name: 'Relaxed Denim',
    price: 185,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    category: 'Denim',
    description: 'High-rise relaxed jeans in premium Japanese selvedge denim.',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Indigo', 'Washed Black'],
    inStock: true,
  },
]

// Collections
export const collections: Collection[] = [
  {
    id: 1,
    name: 'The Essentials',
    description: 'Timeless foundations for every wardrobe',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    productCount: 24,
    slug: 'essentials',
  },
  {
    id: 2,
    name: 'Evening',
    description: 'Refined pieces for after dark',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    productCount: 18,
    slug: 'evening',
  },
  {
    id: 3,
    name: 'Weekend',
    description: 'Relaxed elegance for off-duty days',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    productCount: 32,
    slug: 'weekend',
  },
  {
    id: 4,
    name: 'Workwear',
    description: 'Polished looks for the modern professional',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80',
    productCount: 28,
    slug: 'workwear',
  },
  {
    id: 5,
    name: 'Spring 2025',
    description: 'The new season, now available',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
    productCount: 42,
    slug: 'spring-2025',
  },
  {
    id: 6,
    name: 'Sustainable',
    description: 'Conscious fashion choices',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80',
    productCount: 20,
    slug: 'sustainable',
  },
]

// Reviews
export const reviews: Review[] = [
  {
    id: 1,
    name: 'Alexandra M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    date: '2 weeks ago',
    text: 'Exceptional quality. The wool blazer has become my go-to for everything from meetings to dinners. Worth every penny.',
    verified: true,
  },
  {
    id: 2,
    name: 'James K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    date: '1 month ago',
    text: 'Finally, a brand that understands modern luxury. The attention to detail is remarkable. A customer for life.',
    verified: true,
  },
  {
    id: 3,
    name: 'Sofia R.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: '3 weeks ago',
    text: 'The cashmere is incredibly soft—softer than pieces I\'ve paid twice as much for. Sizing is perfect.',
    verified: true,
  },
  {
    id: 4,
    name: 'Michael T.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    date: '1 month ago',
    text: 'Impeccable tailoring. These are investment pieces that will last for years. Highly recommend.',
    verified: true,
  },
]

// Categories
export const categories = [
  'All',
  'Outerwear',
  'Knitwear',
  'Tops',
  'Dresses',
  'Bottoms',
  'Denim',
  'Accessories',
]

// Helper functions
export const getNewArrivals = () => allProducts.filter(p => p.isNew)
export const getSaleItems = () => allProducts.filter(p => p.isSale)
export const getBestsellers = () => allProducts.filter(p => !p.isNew && !p.isSale).slice(0, 4)
export const getProductById = (id: number) => allProducts.find(p => p.id === id)
export const getProductsByCategory = (category: string) => 
  category === 'All' ? allProducts : allProducts.filter(p => p.category === category)

// Dummy Orders for Account
export const orders = [
  {
    id: 'NX-2024-4892',
    date: 'December 15, 2024',
    status: 'Delivered',
    total: 680,
    items: [
      { ...allProducts[0], quantity: 1 },
      { ...allProducts[1], quantity: 1 },
    ],
  },
  {
    id: 'NX-2024-4901',
    date: 'December 20, 2024',
    status: 'In Transit',
    total: 695,
    items: [
      { ...allProducts[4], quantity: 1 },
    ],
  },
  {
    id: 'NX-2024-4923',
    date: 'December 22, 2024',
    status: 'Processing',
    total: 470,
    items: [
      { ...allProducts[7], quantity: 1 },
      { ...allProducts[6], quantity: 1 },
    ],
  },
]

// Dummy User
export const user = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  memberSince: 'January 2024',
  tier: 'Gold',
  points: 4850,
}

// Dummy Addresses
export const addresses = [
  {
    id: 1,
    type: 'Home',
    name: 'Sarah Johnson',
    street: '425 Park Avenue, Apt 12B',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Work',
    name: 'Sarah Johnson',
    street: '1 World Trade Center, Floor 85',
    city: 'New York',
    state: 'NY',
    zip: '10007',
    country: 'United States',
    isDefault: false,
  },
]
