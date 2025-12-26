'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Gem, Leaf, ShieldCheck, Truck } from 'lucide-react'

const features = [
  {
    icon: Gem,
    title: 'Premium Materials',
    description: 'Sourced from the finest mills and tanneries worldwide.',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Committed to ethical practices and eco-conscious production.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guarantee',
    description: 'Every piece inspected to meet our exacting standards.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on orders over $150.',
  },
]

export default function FeaturesShowcase() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="Fashion Atelier"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase block mb-4">
              Our Philosophy
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] mb-6">
              Crafted With
              <br />
              <span className="text-white/40">Intention</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
              We believe in creating pieces that transcend seasons. Each garment 
              is thoughtfully designed and meticulously crafted to become a 
              cherished part of your wardrobe for years to come.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1 text-sm">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image Collage - Fashion Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                    alt="Model in elegant outfit"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
                    alt="Fashion accessories"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8 lg:pt-12">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
                    alt="Clothing rack"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                    alt="Shopping fashion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
