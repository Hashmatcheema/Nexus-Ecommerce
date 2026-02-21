'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Bestsellers', href: '/products?sort=popular' },
    { name: 'Sale', href: '/sale' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  collections: [
    { name: 'The Essentials', href: '/collections/essentials' },
    { name: 'Spring 2025', href: '/collections/spring-2025' },
    { name: 'Evening', href: '/collections/evening' },
    { name: 'Sustainable', href: '/collections/sustainable' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
  help: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Newsletter Banner */}
      <div className="border-b border-white/10 relative">
        <div className="container-wide py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                Stay in the Loop
              </h3>
              <p className="text-white/50">
                Subscribe for exclusive offers, new arrivals, and style inspiration.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 lg:px-8 py-4 bg-accent text-white font-medium rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-3xl font-display font-bold tracking-tight">
                NEXUS<span className="text-accent">.</span>
              </h2>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
              Curated luxury fashion for the modern individual.
              We believe in quality over quantity, timeless design
              over fleeting trends.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:hello@nexus.com" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                hello@nexus.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <p className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4" />
                New York, NY 10001
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/50 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Collections</h3>
              <ul className="space-y-3">
                {footerLinks.collections.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">Help</h3>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} NEXUS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/30 text-sm hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/30 text-sm hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-white/30 text-sm hover:text-white transition-colors">
                Cookies
              </Link>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ y: -2 }}
                className="hidden sm:flex items-center gap-2 text-white/30 text-sm hover:text-accent transition-colors"
                aria-label="Back to top"
              >
                Back to Top
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
