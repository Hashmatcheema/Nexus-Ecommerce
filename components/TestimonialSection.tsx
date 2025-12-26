'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { reviews } from '@/lib/data'

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-ink via-ink to-gray-900 text-paper overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
              <Star className="w-4 h-4 fill-accent" />
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
              Loved by
              <span className="text-accent"> Thousands</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 lg:flex lg:items-end lg:justify-end"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 lg:gap-12">
              <div className="text-center lg:text-right">
                <div className="text-4xl lg:text-5xl font-display font-bold text-accent">4.9</div>
                <div className="flex gap-1 justify-center lg:justify-end my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-sm text-white/50">Rating</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl lg:text-5xl font-display font-bold">50K+</div>
                <div className="text-sm text-white/50 mt-4">Happy Customers</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl lg:text-5xl font-display font-bold">98%</div>
                <div className="text-sm text-white/50 mt-4">Recommend Us</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl lg:rounded-[2rem] p-8 lg:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Quote Icon */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Quote className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-light mb-8">
                      &ldquo;{reviews[currentIndex].text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent/50">
                        <Image
                          src={reviews[currentIndex].avatar}
                          alt={reviews[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{reviews[currentIndex].name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                            ))}
                          </div>
                          {reviews[currentIndex].verified && (
                            <span className="text-xs text-accent">Verified Buyer</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="lg:col-span-3 flex lg:flex-col items-center justify-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-white/50">
                  {currentIndex + 1} / {reviews.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 lg:mt-24 pt-12 border-t border-white/10"
        >
          <p className="text-center text-xs text-white/40 uppercase tracking-[0.3em] mb-10">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 lg:gap-x-16 gap-y-6">
            {['VOGUE', 'ELLE', 'HARPER\'S BAZAAR', 'GQ', 'ESQUIRE'].map((logo, index) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-xl lg:text-2xl font-display font-bold text-white/20 hover:text-white/50 transition-colors cursor-default"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
