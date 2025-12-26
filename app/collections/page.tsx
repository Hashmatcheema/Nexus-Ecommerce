'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { collections } from '@/lib/data'

export default function CollectionsPage() {
  const featuredCollection = collections[4] // Sustainable Edit

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 lg:pt-32">
        <div className="container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              Our Collections
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink leading-tight mb-6">
              Shop by
              <span className="text-accent"> Collection</span>
            </h1>
            <p className="text-lg text-muted max-w-xl">
              Explore our curated collections, each designed for a different moment in your life.
            </p>
          </motion.div>

          {/* Featured Collection - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <Link href={`/products?collection=${featuredCollection.slug}`} className="group block">
              <div className="relative aspect-[21/9] lg:aspect-[3/1] rounded-3xl overflow-hidden">
                <Image
                  src={featuredCollection.image}
                  alt={featuredCollection.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-block px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-full mb-4">
                      Featured Collection
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-3">
                      {featuredCollection.name}
                    </h2>
                    <p className="text-white/70 text-lg mb-6 max-w-md">{featuredCollection.description}</p>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-medium rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                      Explore Collection
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-wide">
          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {collections.filter(c => c.id !== 5).map((collection, index) => {
              // Determine grid size based on index for visual variety
              const isLarge = index === 0 || index === 3
              const colSpan = isLarge ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'
              const aspectRatio = isLarge ? 'aspect-[2/1]' : 'aspect-[3/4]'

              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={colSpan}
                >
                  <Link href={`/products?collection=${collection.slug}`} className="group block h-full">
                    <div className={`relative ${aspectRatio} rounded-2xl lg:rounded-3xl overflow-hidden h-full`}>
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                        {/* Top */}
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            {collection.productCount} pieces
                          </span>
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        
                        {/* Bottom */}
                        <div>
                          <h3 className={`${isLarge ? 'text-2xl lg:text-4xl' : 'text-xl lg:text-2xl'} font-display font-bold text-white mb-2`}>
                            {collection.name}
                          </h3>
                          <p className="text-white/70 text-sm line-clamp-2">{collection.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-accent-light">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-ink mb-4">
              Can&apos;t decide?
            </h2>
            <p className="text-muted text-lg mb-8">
              Browse all our products and find your perfect piece.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
