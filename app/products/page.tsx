'use client'

import { useState, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import ProductCard from '@/components/ProductCard'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { allProducts, categories } from '@/lib/data'
import { SlidersHorizontal, X, Grid3X3, LayoutGrid, ChevronDown, Sparkles } from 'lucide-react'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [gridCols, setGridCols] = useState<3 | 4>(4)
  const [sortOpen, setSortOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory)

    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'popular':
        filtered = [...filtered].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      case 'newest':
      default:
        filtered = [...filtered].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
        break
    }

    return filtered
  }, [selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      
      {/* Hero Header */}
      <section className="pt-24 lg:pt-32 pb-8 lg:pb-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              Shop All
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-4">
              All Products
            </h1>
            <p className="text-lg text-muted">
              Discover our complete collection of premium clothing and accessories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 lg:top-20 z-30 bg-paper/95 backdrop-blur-xl border-y border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
            {/* Left: Categories (Desktop) / Filter Toggle (Mobile) */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  showFilters ? 'bg-ink text-paper' : 'bg-gray-100 text-ink'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Desktop Categories */}
              <div className="hidden lg:flex items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-ink text-paper'
                        : 'text-muted hover:text-ink hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Count, Grid Toggle, Sort */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-muted whitespace-nowrap">
                {filteredProducts.length} products
              </span>

              {/* Grid Toggle */}
              <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-md transition-colors ${gridCols === 3 ? 'bg-white shadow-sm' : 'text-muted hover:text-ink'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-md transition-colors ${gridCols === 4 ? 'bg-white shadow-sm' : 'text-muted hover:text-ink'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                >
                  {sortOptions.find(o => o.value === sortBy)?.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-paper rounded-xl shadow-xl border border-border py-2 z-10"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value)
                            setSortOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            sortBy === option.value 
                              ? 'bg-accent-light text-accent font-medium' 
                              : 'text-muted hover:bg-gray-50 hover:text-ink'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border overflow-hidden"
          >
            <div className="container-wide py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink">Categories</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 text-muted hover:text-ink">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setShowFilters(false)
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-ink text-paper'
                        : 'text-muted border border-border hover:border-ink hover:text-ink'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          {filteredProducts.length > 0 ? (
            <div className={`grid grid-cols-2 gap-4 lg:gap-8 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SlidersHorizontal className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-xl font-display font-bold text-ink mb-2">No products found</h3>
              <p className="text-muted mb-6">Try adjusting your filters or browse all products.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="btn-outline"
              >
                View All Products
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
