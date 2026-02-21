'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import Image from 'next/image'
import { Sparkles, Leaf, Heart, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description: 'We source only the finest materials from trusted suppliers around the world, ensuring every piece meets our exacting standards.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practice',
    description: 'From production to packaging, we minimize our environmental footprint and work towards a more sustainable future.',
  },
  {
    icon: Sparkles,
    title: 'Timeless Design',
    description: 'Our pieces are designed to transcend trends and last for years, becoming staples in your wardrobe.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We build meaningful connections with our customers, creating a community united by a love for conscious fashion.',
  },
]

const stats = [
  { value: '2020', label: 'Founded' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '12', label: 'Countries' },
  { value: '100%', label: 'Sustainable' },
]

const team = [
  { name: 'Sarah Chen', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120' },
  { name: 'Marcus Webb', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120' },
  { name: 'Elena Rodriguez', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden" style={{ position: 'relative' }}>
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
            alt="About Nexus"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity }} className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Fashion That
              <span className="text-accent"> Matters</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Founded in 2020, we set out to create a fashion brand that prioritizes quality,
              sustainability, and timeless design over fleeting trends.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-accent-light">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-display font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">Our Mission</span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                Clothes That Tell
                <span className="text-accent"> Your Story</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                We believe fashion should be an expression of who you are – not just what&apos;s
                trending. That&apos;s why we focus on creating versatile pieces that work with
                your existing wardrobe and grow with you over time.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Every garment is thoughtfully designed in our studio and produced in small
                batches by skilled artisans who share our commitment to excellence.
              </p>
              <Link href="/products" className="btn-primary inline-flex items-center gap-2 group">
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
                  alt="Our craftsmanship"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
                  alt="Our materials"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-ink text-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">The Team</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold">
              Meet the People Behind NEXUS
            </h2>
          </motion.div>

          <div className="max-w-xl mx-auto grid grid-cols-3 gap-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative aspect-square max-w-[100px] mx-auto rounded-xl overflow-hidden mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="100px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-display font-bold mb-0.5">{member.name}</h3>
                <p className="text-xs text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-accent-light">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
              Ready to Join Our Story?
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto mb-8">
              Discover our collection and become part of the NEXUS community.
            </p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 group">
              Shop Now
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
