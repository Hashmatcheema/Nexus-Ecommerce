'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import Image from 'next/image'

const navLinks = [
  { name: 'Shop', href: '/products', hasDropdown: true },
  { name: 'Collections', href: '/collections' },
  { name: 'Sale', href: '/sale', accent: true },
  { name: 'About', href: '/about' },
]

const shopCategories = [
  { 
    name: 'New Arrivals', 
    href: '/products?filter=new',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80'
  },
  { 
    name: 'Outerwear', 
    href: '/products?category=outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80'
  },
  { 
    name: 'Knitwear', 
    href: '/products?category=knitwear',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80'
  },
  { 
    name: 'Dresses', 
    href: '/products?category=dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80'
  },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cart, setIsCartOpen } = useApp()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const pathname = usePathname()
  
  // Only use transparent/white text on homepage hero
  const isHomepage = pathname === '/'
  const isTransparent = isHomepage && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`transition-all duration-500 ${
          isTransparent 
            ? 'bg-transparent' 
            : 'bg-paper/95 backdrop-blur-xl shadow-sm'
        }`}
      >
        <div className="container-wide">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Left Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setMegaMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-all flex items-center gap-1 group ${
                      isTransparent 
                        ? link.accent ? 'text-accent' : 'text-white/90 hover:text-white' 
                        : link.accent ? 'text-accent' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    )}
                    {!link.accent && (
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isTransparent ? 'bg-white' : 'bg-accent'}`} />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 group">
              <motion.h1 
                className={`text-2xl font-display font-bold tracking-tight transition-all ${
                  isTransparent ? 'text-white' : 'text-ink'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                NEXUS<span className="text-accent group-hover:animate-pulse">.</span>
              </motion.h1>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <motion.button 
                onClick={() => setSearchOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-full transition-all ${
                  isTransparent 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-ink hover:bg-gray-100'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              {/* Account */}
              <Link 
                href="/account" 
                className={`hidden sm:flex p-2.5 rounded-full transition-all ${
                  isTransparent 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-ink hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
              </Link>
              
              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2.5 rounded-full transition-all ${
                  isTransparent 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-ink hover:bg-gray-100'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.95 }}
                className={`lg:hidden p-2.5 rounded-full transition-all ${
                  isTransparent ? 'text-white' : 'text-ink'
                }`}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-paper shadow-xl border-t border-border"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="container-wide py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Categories with Images */}
                  <div className="col-span-8 grid grid-cols-4 gap-4">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="group"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors" />
                        </div>
                        <h4 className="font-medium text-ink group-hover:text-accent transition-colors">
                          {cat.name}
                        </h4>
                      </Link>
                    ))}
                  </div>

                  {/* Featured */}
                  <div className="col-span-4 bg-accent-light rounded-2xl p-6">
                    <span className="text-xs font-bold tracking-widest uppercase text-accent">Featured</span>
                    <h3 className="text-2xl font-display font-bold text-ink mt-2 mb-3">Spring Collection 2025</h3>
                    <p className="text-muted text-sm mb-4">Discover fresh styles for the new season.</p>
                    <Link 
                      href="/collections/spring-2025" 
                      className="inline-flex items-center gap-2 text-accent font-medium text-sm group"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      Shop Now 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/90 backdrop-blur-md z-[100] flex items-start justify-center pt-32"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  autoFocus
                  className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/40 text-sm mt-4 text-center">Press ESC to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-ink z-[100]"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="container-wide py-6 flex items-center justify-between border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <h1 className="text-2xl font-display font-bold text-white">
                    NEXUS<span className="text-accent">.</span>
                  </h1>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-white hover:text-accent transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 container-wide py-8 overflow-y-auto">
                <div className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between text-3xl font-display font-bold ${
                          link.accent ? 'text-accent' : 'text-white'
                        }`}
                      >
                        {link.name}
                        <ArrowRight className="w-6 h-6 opacity-50" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-6">Categories</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="relative aspect-square rounded-xl overflow-hidden group"
                      >
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-ink/50 group-active:bg-ink/70 transition-colors" />
                        <span className="absolute bottom-3 left-3 text-white font-medium text-sm">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Bottom Actions */}
              <div className="container-wide py-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 rounded-xl text-white"
                  >
                    <User className="w-5 h-5" />
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      setIsCartOpen(true)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent rounded-xl text-white font-medium"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Cart ({cartCount})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
