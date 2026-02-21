'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden" style={{ position: 'relative' }}>
      {/* Full-screen background image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2688&auto=format&fit=crop"
          alt="Fashion"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative h-full flex items-center"
      >
        <div className="container-wide">
          <div className="max-w-2xl">
            {/* Season tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px bg-white/50" />
              <span className="text-white/80 text-sm tracking-[0.3em] uppercase font-light">
                Spring/Summer 2025
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] mb-8"
            >
              The Art of
              <br />
              <span className="text-accent">Effortless</span>
              <br />
              Style
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/70 text-lg sm:text-xl max-w-md mb-12 font-light leading-relaxed"
            >
              Discover timeless pieces crafted for those who appreciate 
              the finer details. Luxury redefined.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-ink font-medium rounded-full hover:bg-accent hover:text-white transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group inline-flex items-center gap-3 text-white hover:text-accent transition-colors">
                <span className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Play className="w-5 h-5 ml-1" fill="currentColor" />
                </span>
                <span className="font-light">Watch Film</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — desktop only, no stats bar to avoid overlapping Shop Collection CTA */}
      <div className="absolute bottom-8 left-0 right-0 hidden lg:flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-4 text-white/50"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
