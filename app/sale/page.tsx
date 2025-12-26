'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import ProductCard from '@/components/ProductCard'
import { allProducts } from '@/lib/data'
import { Percent, Clock, ArrowRight, Sparkles, ChevronDown, Zap, Tag, Timer, Flame } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Get products with discounts for sale
const saleProducts = allProducts.map(p => ({
  ...p,
  originalPrice: p.originalPrice || Math.round(p.price * 1.3),
  discount: p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 25
}))

const discountFilters = [
  { label: 'All', value: 'all', icon: Tag },
  { label: '20%+', value: 20, icon: Percent },
  { label: '30%+', value: 30, icon: Flame },
  { label: '40%+', value: 40, icon: Zap },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 15 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <div key={unit} className="flex items-center gap-2">
          <div className="bg-ink text-white w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg lg:text-xl font-display font-bold leading-none">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-white/60">{unit.slice(0, 3)}</span>
          </div>
          {index < 3 && <span className="text-ink font-bold text-xl">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function SalePage() {
  const [discountFilter, setDiscountFilter] = useState('all')
  const [sortBy, setSortBy] = useState('discount')

  const filteredProducts = useMemo(() => {
    let filtered = [...saleProducts]
    
    if (discountFilter !== 'all') {
      const minDiscount = Number(discountFilter)
      filtered = filtered.filter(p => p.discount >= minDiscount)
    }

    if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount)
    } else if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [discountFilter, sortBy])

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-paper to-accent/10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-200/30 rounded-full blur-[100px]" />
        
        <div className="container-wide relative py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full text-sm font-bold mb-6">
                <Zap className="w-4 h-4" />
                Flash Sale — Limited Time
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-ink leading-[0.95] mb-6">
                Up to
                <span className="block text-accent">50% Off</span>
                <span className="block text-ink/40">Everything</span>
              </h1>
              
              <p className="text-lg text-muted mb-8 max-w-md">
                Don&apos;t miss our biggest sale of the season. Premium fashion at unbeatable prices.
              </p>

              {/* Countdown */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted mb-3">
                  <Timer className="w-4 h-4 text-accent" />
                  Sale ends in:
                </div>
                <CountdownTimer />
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link href="#products" className="btn-primary inline-flex items-center gap-2 group">
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Use code EXTRA10 for 10% more
                </div>
              </div>
            </motion.div>

            {/* Right - Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Large Card */}
                <div className="col-span-2 relative aspect-[2/1] rounded-3xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                    alt="Sale"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-white font-display font-bold text-xl">New Arrivals</span>
                    <span className="px-3 py-1.5 bg-accent text-white text-sm font-bold rounded-full">-30%</span>
                  </div>
                </div>
                
                {/* Small Cards */}
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80"
                    alt="Dresses"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-medium text-sm">Dresses</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-bold rounded-full">-40%</span>
                  </div>
                </div>
                
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
                    alt="Outerwear"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-medium text-sm">Outerwear</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-accent text-white text-xs font-bold rounded-full">-50%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-ink py-6">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 lg:gap-12 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold">Up to 50% Off</p>
                <p className="text-xs text-white/60">On all items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Tag className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold">Free Shipping</p>
                <p className="text-xs text-white/60">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold">Extra 10% Off</p>
                <p className="text-xs text-white/60">Code: EXTRA10</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold">Limited Time</p>
                <p className="text-xs text-white/60">Ends soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="products" className="sticky top-16 lg:top-20 z-30 bg-paper border-b border-border shadow-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Discount Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {discountFilters.map((filter) => {
                const Icon = filter.icon
                return (
                  <button
                    key={filter.value}
                    onClick={() => setDiscountFilter(String(filter.value))}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                      String(discountFilter) === String(filter.value)
                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                        : 'bg-gray-100 text-muted hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                )
              })}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-muted font-medium">
                {filteredProducts.length} items
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-gray-100 rounded-full text-sm font-medium focus:outline-none cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <option value="discount">Biggest Discount</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  priority={index < 4}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-[#d97756] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container-wide relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">
              Don&apos;t Miss Out!
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              These deals won&apos;t last forever. Shop now and save big on your favorite styles.
            </p>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-full hover:bg-white/90 transition-colors group">
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
