'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { getBestsellers } from '@/lib/data'
import { useApp } from '@/contexts/AppContext'

const products = getBestsellers()

export default function ProductGrid() {
  const { addToCart, toggleFavorite, isFavorite } = useApp()

  return (
    <section className="py-24 lg:py-32 bg-[#f8f6f3]">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase block mb-4">
              Bestsellers
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Most Loved
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link
              href="/products?sort=popular"
              className="group inline-flex items-center gap-2 text-ink font-medium hover:text-accent transition-colors"
            >
              View All Bestsellers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] rounded-xl lg:rounded-2xl overflow-hidden bg-white mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(product.id)
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isFavorite(product.id)
                        ? 'bg-accent text-white'
                        : 'bg-white/80 backdrop-blur-sm text-ink hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick Add */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product)
                    }}
                    className="absolute bottom-3 left-3 right-3 py-2.5 bg-white text-ink text-xs sm:text-sm font-medium rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-ink hover:text-white text-center"
                  >
                    Quick Add
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] sm:text-xs text-muted uppercase tracking-wider">{product.category}</p>
                  <h3 className="font-display font-semibold text-sm sm:text-base group-hover:text-accent transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-display font-bold text-base sm:text-lg">${product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
