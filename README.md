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
git clone https://github.com/Hashmatcheema/Nexus-Ecommerce.git

# Navigate to project
cd Nexus-Ecommerce

# Install dependencies (pnpm)
pnpm install

# Run development server
pnpm dev
```

For a clean build (clears `.next` cache and starts dev):

```bash
pnpm run dev:clean
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── products/           # Products listing & detail pages
│   ├── collections/       # Collections & sub-collections
│   ├── sale/               # Sale page
│   ├── checkout/           # Multi-step checkout (Stripe)
│   ├── account/            # User account (orders, addresses)
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard (placeholder)
│   ├── api/                # API routes (cart, payment intent, webhooks)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & CSS variables
│
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Header with mega menu & mobile drawer
│   ├── Footer.tsx          # Footer with newsletter
│   ├── Hero.tsx            # Homepage hero section
│   ├── ProductCard.tsx     # Product card with hover effects
│   ├── ProductGrid.tsx     # Best sellers grid
│   ├── products/           # ProductFilters, Pagination
│   ├── FeaturedCollection.tsx  # New arrivals bento grid
│   ├── FeaturesShowcase.tsx    # Brand values section
│   ├── PromotionalBanner.tsx   # Sale promo cards
│   ├── TestimonialSection.tsx  # Reviews carousel
│   ├── CTASection.tsx      # Newsletter signup
│   ├── CartDrawer.tsx      # Slide-out cart
│   ├── AIAssistantOrb.tsx  # Floating AI button
│   ├── AIAssistantModal.tsx    # AI chat interface
│   ├── ErrorBoundary.tsx   # Error boundary
│   ├── PlaceholderPage.tsx # Placeholder for stub pages
│   └── ui/sonner.tsx       # Toast notifications
│
├── contexts/               # React Context providers
│   └── AppContext.tsx      # Global state (cart, favorites, auth)
│
├── lib/                    # Utilities, data & server logic
│   ├── data.ts             # Static product/collection data (fallback)
│   ├── prisma.ts           # Prisma client (PostgreSQL)
│   ├── actions/            # Server actions (products, user)
│   └── validation.ts      # Zod schemas
│
├── prisma/                 # Database
│   ├── schema.prisma       # Prisma 7 schema
│   └── migrations/         # Migrations
│
├── prisma.config.ts        # Prisma 7 datasource URL (for CLI)
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

Copy `.env.example` to `.env` and fill in values:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (PostgreSQL) — required for cart/orders when DB is up
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_ecommerce?schema=public"

# Auth (Clerk) — required for sign-in and account
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Payments (Stripe) — required for checkout
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend) — optional
RESEND_API_KEY=re_...
```

Without the database, the app still runs using static product data and local cart. Without Stripe keys, checkout shows a configuration message.

**Database setup (optional):** Set `DATABASE_URL` in `.env`, then run `pnpm prisma generate` and `pnpm prisma migrate dev` to create tables. Use `pnpm prisma db seed` to seed products if a seed script is configured.

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

Images use the Next.js `Image` component. Allowed origins are in `next.config.js` under `images.remotePatterns`. To add a new host:

```javascript
// next.config.js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    { protocol: 'https', hostname: 'your-cdn.com', pathname: '/**' },
  ],
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
pnpm dev          # Start development server
pnpm run dev:clean # Delete .next and start dev (use if chunks 404)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript check (tsc --noEmit)
pnpm test         # Run Jest tests
```

---

## 📦 Dependencies

### Core
- `next` (14.x) - React framework with App Router
- `react` / `react-dom` - UI library
- `typescript` - Type safety

### Auth & Data
- `@clerk/nextjs` - Authentication (sign-in, user account)
- `@prisma/client` / `prisma` - Database ORM (PostgreSQL)
- `@prisma/adapter-pg` - Prisma driver adapter for `pg`

### Payments
- `stripe` / `@stripe/stripe-js` / `@stripe/react-stripe-js` - Checkout

### Styling & UI
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animations
- `lucide-react` - Icons
- `sonner` - Toast notifications

### Forms & Validation
- `react-hook-form` / `@hookform/resolvers` - Forms
- `zod` - Schema validation

---

## 🚧 Future Improvements

- [x] User authentication (Clerk)
- [x] Stripe payment processing & checkout
- [x] Product search (`/products?search=`)
- [x] Account dashboard & order history (`/account`, `/account/orders`)
- [x] Address management (`/account/addresses`)
- [x] Database-backed products & cart (Prisma + PostgreSQL; fallback to static data when DB unavailable)
- [ ] Create admin dashboard
- [ ] Wishlist persistence (e.g. DB or Clerk metadata)
- [ ] Email notifications (Resend)
- [ ] Product reviews
- [ ] Inventory management

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

**Hashmat Cheema**

- GitHub: [@Hashmatcheema](https://github.com/Hashmatcheema)

---

Made with ❤️ and lots of ☕

