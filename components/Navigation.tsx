'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

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
  const cartCount = cart.reduce((sum: number, item) => sum + item.quantity, 0)
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

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
        className={`transition-all duration-500 ${isTransparent
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
                    className={`text-sm font-medium transition-all flex items-center gap-1 group ${isTransparent
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
                className={`text-2xl font-display font-bold tracking-tight transition-all ${isTransparent ? 'text-white' : 'text-ink'
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
                className={`p-2.5 rounded-full transition-all ${isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-ink hover:bg-gray-100'
                  }`}
                aria-label="Open search"
                aria-expanded={searchOpen}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Account / Auth — visible on all breakpoints (mobile + desktop) with search, cart, hamburger */}
              <div className={`flex items-center gap-4 transition-all ${isTransparent ? 'text-white' : 'text-ink'}`}>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className={`p-2.5 rounded-full transition-all hover:bg-white/10`} aria-label="Sign In">
                      <User className="w-5 h-5" />
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>

              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2.5 rounded-full transition-all ${isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-ink hover:bg-gray-100'
                  }`}
                aria-label="Open cart"
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
                className={`lg:hidden p-2.5 rounded-full transition-all ${isTransparent ? 'text-white' : 'text-ink'
                  }`}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
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
                            sizes="300px"
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
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  autoFocus
                  className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
              <p className="text-white/40 text-sm mt-4 text-center">Press ESC to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu (hamburger drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-ink"
          >
            <div className="h-full flex flex-col overflow-hidden">
              {/* Header: logo + close — same width as content */}
              <div className="w-full max-w-[min(100%,360px)] mx-auto flex items-center justify-between px-4 py-5 border-b border-white/10 shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <h1 className="text-2xl font-display font-bold text-white">
                    NEXUS<span className="text-accent">.</span>
                  </h1>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -m-2 text-accent hover:text-accent/80 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable: nav links + categories — same width as header/bottom */}
              <nav className="flex-1 overflow-y-auto w-full max-w-[min(100%,360px)] mx-auto px-4 py-8">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between py-4 text-xl font-display font-bold ${link.accent ? 'text-accent' : 'text-white'}`}
                      >
                        {link.name}
                        <ArrowRight className={`w-5 h-5 shrink-0 ${link.accent ? 'text-accent' : 'text-white/60'}`} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Categories — smaller thumbnails */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">CATEGORIES</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setMobileOpen(false)}
                        className="relative aspect-[2/1] max-h-[72px] rounded-lg overflow-hidden group block"
                      >
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="140px"
                          className="object-cover transition-transform duration-300 group-active:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                        <span className="absolute bottom-1 left-1.5 right-1.5 text-white font-medium text-xs drop-shadow-md">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Bottom: user + cart — same width as content, white text for user/email */}
              <div className="shrink-0 w-full max-w-[min(100%,360px)] mx-auto px-4 py-5 border-t border-white/10 flex items-center gap-4">
                <div className="min-w-0 flex items-center gap-3 py-2 pr-3 border border-white/20 rounded-xl text-white [&_span]:text-white [&_button]:text-white">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="flex items-center gap-2">
                        <User className="w-5 h-5 shrink-0 text-white/80" />
                        <span className="text-sm font-medium">Sign In</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      afterSignOutUrl="/"
                      showName
                      appearance={{
                        variables: { colorBackground: '#0f172a', colorForeground: '#ffffff', colorInputBackground: '#1e293b' },
                        elements: { rootBox: 'text-white', userButtonTrigger: 'text-white focus:ring-white' },
                      }}
                    />
                  </SignedIn>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    setIsCartOpen(true)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-accent rounded-xl text-white font-semibold text-sm shrink-0 min-w-[120px]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Cart ({cartCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
