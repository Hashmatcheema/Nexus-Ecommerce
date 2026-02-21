'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Percent, Sparkles, Clock, LucideIcon } from 'lucide-react'

interface PromoCard {
  id: number
  title: string
  subtitle: string
  description?: string
  image: string
  href: string
  badge: string
  Icon: LucideIcon
}

const promoCards: PromoCard[] = [
  {
    id: 1,
    title: 'Season Sale',
    subtitle: 'Up to 40% Off',
    description: 'Limited time only',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
    href: '/sale',
    badge: 'Hot Deal',
    Icon: Percent,
  },
  {
    id: 2,
    title: 'Spring Collection',
    subtitle: '2025',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    href: '/collections/spring-2025',
    badge: 'New Season',
    Icon: Sparkles,
  },
  {
    id: 3,
    title: 'Flash Sale',
    subtitle: 'Ends Tonight',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
    href: '/sale',
    badge: '24H Only',
    Icon: Clock,
  },
]

export default function PromotionalBanner() {
  const mainCard = promoCards[0]
  const MainIcon = mainCard.Icon

  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="container-wide">
        {/* Modern Bento Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          {/* Large Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-7"
          >
            <Link href={mainCard.href} className="group block relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden">
              <Image
                src={mainCard.image}
                alt={mainCard.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              
              {/* Badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                  <MainIcon className="w-3.5 h-3.5" />
                  {mainCard.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <span className="text-white/60 text-sm">{mainCard.description}</span>
                <h3 className="text-4xl lg:text-5xl font-display font-bold text-white mt-2 mb-1">
                  {mainCard.title}
                </h3>
                <p className="text-2xl lg:text-3xl font-display font-bold text-accent mb-6">
                  {mainCard.subtitle}
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-medium rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                  Shop Now
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right Column - Stacked Cards */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
            {promoCards.slice(1).map((card, index) => {
              const CardIcon = card.Icon
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                >
                  <Link href={card.href} className="group block relative h-[180px] lg:h-[215px] rounded-2xl overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                        <CardIcon className="w-3 h-3" />
                        {card.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-display font-bold text-white">
                          {card.title}
                        </h3>
                        <p className="text-white/70 text-sm">{card.subtitle}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
