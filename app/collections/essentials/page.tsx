'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

// Mock data for Essentials
const products = [
    {
        id: 101,
        name: 'The Classic White Tee',
        price: 45,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        category: 'Tops'
    },
    {
        id: 102,
        name: 'Everyday Denim',
        price: 120,
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 103,
        name: 'Cashmere Crewneck',
        price: 180,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        category: 'Knits'
    },
    {
        id: 104,
        name: 'Tailored Blazer',
        price: 250,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: 105,
        name: 'Silk Camisole',
        price: 85,
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80',
        category: 'Tops'
    },
    {
        id: 106,
        name: 'Leather Tote',
        price: 295,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        category: 'Accessories'
    },
]

export default function EssentialsPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">The Collection</span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    The Essentials
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    Timeless staples that form the foundation of every wardrobe.
                    Impeccable quality, perfect fit, and enduring style.
                </p>
            </section>

            {/* Grid */}
            <section className="pb-24">
                <div className="container-wide">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
