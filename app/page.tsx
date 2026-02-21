'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedCollection from '@/components/FeaturedCollection'
import FeaturesShowcase from '@/components/FeaturesShowcase'
import ProductGrid from '@/components/ProductGrid'
import PromotionalBanner from '@/components/PromotionalBanner'
import TestimonialSection from '@/components/TestimonialSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import AIAssistantOrb from '@/components/AIAssistantOrb'
import AIAssistantModal from '@/components/AIAssistantModal'
import { useApp } from '@/contexts/AppContext'

export default function Home() {
  const { isAIModalOpen, setIsAIModalOpen } = useApp()

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      
      {/* Hero Section with Stats */}
      <Hero />
      
      {/* New Arrivals */}
      <FeaturedCollection />
      
      {/* Brand Philosophy & Features */}
      <FeaturesShowcase />
      
      {/* Bestsellers */}
      <ProductGrid />
      
      {/* Promotional Cards */}
      <PromotionalBanner />
      
      {/* Testimonials + Press */}
      <TestimonialSection />
      
      {/* Newsletter CTA */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
      
      {/* Cart Drawer */}
      <CartDrawer />
      
      {/* AI Assistant */}
      <AIAssistantOrb onClick={() => setIsAIModalOpen(true)} />
      {isAIModalOpen && (
        <AIAssistantModal onClose={() => setIsAIModalOpen(false)} />
      )}
    </main>
  )
}
