# NEXUS - Modern E-commerce Platform

A stunning, portfolio-ready e-commerce website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a warm terracotta color palette, modern UI/UX patterns, and smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-ff69b4?style=flat-square)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/rubabzahra13/Nexus-Ecommerce.git

# Navigate to project
cd Nexus-Ecommerce

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── products/           # Products listing & detail pages
│   ├── collections/        # Collections page
│   ├── sale/               # Sale page with countdown
│   ├── checkout/           # Multi-step checkout
│   ├── account/            # User account dashboard
│   ├── about/              # About page
│   ├── orders/             # Order history
│   ├── admin/              # Admin dashboard (placeholder)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & CSS variables
│
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Header with mega menu
│   ├── Footer.tsx          # Footer with newsletter
│   ├── Hero.tsx            # Homepage hero section
│   ├── ProductCard.tsx     # Product card with hover effects
│   ├── ProductGrid.tsx     # Best sellers grid
│   ├── FeaturedCollection.tsx  # New arrivals bento grid
│   ├── FeaturesShowcase.tsx    # Brand values section
│   ├── PromotionalBanner.tsx   # Sale promo cards
│   ├── TestimonialSection.tsx  # Reviews carousel
│   ├── CTASection.tsx      # Newsletter signup
│   ├── CartDrawer.tsx      # Slide-out cart
│   ├── AIAssistantOrb.tsx  # Floating AI button
│   ├── AIAssistantModal.tsx    # AI chat interface
│   ├── MobileBottomNav.tsx # Mobile navigation
│   └── QuickViewModal.tsx  # Product quick view
│
├── contexts/               # React Context providers
│   └── AppContext.tsx      # Global state (cart, favorites, etc.)
│
├── lib/                    # Utilities & data
│   └── data.ts             # Mock product/collection data
│
├── hooks/                  # Custom React hooks
│   └── useIntersectionObserver.ts
│
└── public/                 # Static assets
```

---

## 🎨 Design System

### Colors

Defined in `app/globals.css` and `tailwind.config.js`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-ink` | `#1a1a1a` | Primary text, dark backgrounds |
| `--color-paper` | `#fffbf7` | Light backgrounds |
| `--color-accent` | `#c45d3a` | CTAs, highlights, links |
| `--color-muted` | `#666666` | Secondary text |
| `--color-border` | `#e5e5e5` | Borders, dividers |

### Typography

- **Display Font:** Syne (headings)
- **Body Font:** Inter (text)

### Tailwind Classes

```css
/* Custom utility classes */
.container-wide      /* Max-width container with padding */
.container-narrow    /* Narrower container for content */
.section-gap         /* Consistent section spacing */
.btn-primary         /* Primary button style */
.btn-outline         /* Outline button style */
.text-headline       /* Large heading size */
.text-title          /* Section title size */
.text-body-lg        /* Large body text */
```

---

## 🧩 Key Components

### Navigation (`components/Navigation.tsx`)
- Transparent on homepage hero, solid on other pages
- Mega menu with category images
- Full-screen search overlay
- Mobile slide-out menu

### ProductCard (`components/ProductCard.tsx`)
- Hover effects with quick actions
- Add to cart & wishlist buttons
- Sale badge for discounted items
- Skeleton loading state

### CartDrawer (`components/CartDrawer.tsx`)
- Slide-out cart panel
- Free shipping progress bar
- Promo code input
- Quantity controls

### AIAssistantModal (`components/AIAssistantModal.tsx`)
- Chat interface with product recommendations
- Suggested prompts
- Product cards with add-to-cart

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any API keys (currently using mock data):

```env
# Future integrations
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind Config

Extend the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        paper: '#fffbf7',
        accent: {
          DEFAULT: '#c45d3a',
          hover: '#a84d30',
          light: '#fff5f0',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Adding Images

Images use Next.js Image component with Unsplash. Update `next.config.js` to add new domains:

```javascript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'your-cdn.com' },
    ],
  },
}
```

---

## 📝 Development Guide

### Adding a New Page

1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Import Navigation, Footer, CartDrawer
4. Follow existing page structure

```tsx
// app/new-page/page.tsx
'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export default function NewPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      {/* Your content */}
      <Footer />
      <CartDrawer />
    </main>
  )
}
```

### Adding Products

Edit `lib/data.ts`:

```typescript
export const allProducts: Product[] = [
  {
    id: 17,
    name: 'New Product',
    description: 'Product description',
    price: 199,
    originalPrice: 249, // Optional: for sale items
    image: 'https://images.unsplash.com/...',
    images: ['url1', 'url2', 'url3'],
    category: 'Outerwear',
    variants: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    isNewArrival: true,
    isBestSeller: false,
  },
]
```

### Creating Components

Follow the component pattern:

```tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface MyComponentProps {
  title: string
  children?: React.ReactNode
}

export default function MyComponent({ title, children }: MyComponentProps) {
  const [state, setState] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="..."
    >
      {/* Content */}
    </motion.div>
  )
}
```

---

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react` / `react-dom` - UI library
- `typescript` - Type safety

### Styling
- `tailwindcss` - Utility-first CSS
- `postcss` / `autoprefixer` - CSS processing

### Animations
- `framer-motion` - Animation library

### Icons
- `lucide-react` - Icon library

---

## 🚧 Future Improvements

- [ ] Add real backend API integration
- [ ] Implement user authentication
- [ ] Add Stripe payment processing
- [ ] Create admin dashboard
- [ ] Add product search functionality
- [ ] Implement wishlist persistence
- [ ] Add order tracking
- [ ] Create email notifications
- [ ] Add product reviews system
- [ ] Implement inventory management

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Rubab Zahra**

- GitHub: [@rubabzahra13](https://github.com/rubabzahra13)

---

Made with ❤️ and lots of ☕

