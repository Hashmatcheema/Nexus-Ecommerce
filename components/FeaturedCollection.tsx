'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

// Curated new arrivals with unique images
const newArrivals = [
  {
    id: 1,
    name: 'Terracotta Linen Set',
    price: 395,
    category: 'Sets',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    badge: 'Trending',
  },
  {
    id: 2,
    name: 'Camel Wool Coat',
    price: 695,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
  },
  {
    id: 3,
    name: 'Silk Evening Dress',
    price: 525,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Rust Cashmere Knit',
    price: 285,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
  },
  {
    id: 5,
    name: 'Wide Leg Trousers',
    price: 245,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  },
]

export default function FeaturedCollection() {
  const { addToCart } = useApp()

  return (
    <section className="py-20 lg:py-28 bg-paper overflow-hidden">
      <div className="container-wide">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-1">
                New Arrivals
              </span>
              <h2 className="text-2xl lg:text-3xl font-display font-bold">
                Fresh Drops
              </h2>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-full hover:bg-accent transition-colors"
            >
              View All
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          {/* Large Featured Item */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-7 lg:col-span-8"
          >
            <Link href={`/products/${newArrivals[0].id}`} className="group block relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={newArrivals[0].image}
                alt={newArrivals[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              
              {/* Badge */}
              {newArrivals[0].badge && (
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-full">
                    {newArrivals[0].badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-white/70 text-xs uppercase tracking-wider">{newArrivals[0].category}</span>
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mt-1 mb-2">
                  {newArrivals[0].name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">${newArrivals[0].price}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(newArrivals[0])
                    }}
                    className="px-5 py-2.5 bg-white text-ink text-sm font-medium rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-accent hover:text-white"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Stacked Items */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 lg:gap-5">
            {newArrivals.slice(1, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Link href={`/products/${product.id}`} className="group block relative h-[200px] lg:h-[240px] rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-accent text-white text-[10px] font-bold rounded-full">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white text-sm lg:text-base mb-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-white/80 font-medium text-sm">${product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - 3 Items */}
          {newArrivals.slice(3, 5).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="col-span-6 lg:col-span-4"
            >
              <Link href={`/products/${product.id}`} className="group block relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <span className="text-white/60 text-[10px] uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-semibold text-white text-sm lg:text-base mt-0.5 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-white/80 font-medium text-sm">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-12 lg:col-span-4"
          >
            <Link 
              href="/products"
              className="group flex flex-col justify-center items-center h-[220px] lg:h-[280px] rounded-2xl bg-gradient-to-br from-accent to-orange-600 text-white p-6 hover:shadow-xl hover:shadow-accent/20 transition-all"
            >
              <span className="text-white/80 text-sm mb-2">Explore</span>
              <span className="text-2xl lg:text-3xl font-display font-bold mb-4">All New Arrivals</span>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-accent transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
