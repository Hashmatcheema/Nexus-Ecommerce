'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

const products = [
    {
        id: 401,
        name: 'Organic Cotton Tee',
        price: 40,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
        category: 'Tops'
    },
    {
        id: 402,
        name: 'Recycled Denim Jacket',
        price: 160,
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: 403,
        name: 'Hemp Trousers',
        price: 130,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 404,
        name: 'Eco-Leather Tote',
        price: 195,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        category: 'Accessories'
    },
    {
        id: 405,
        name: 'Tencel Shirt Dress',
        price: 150,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
        category: 'Dresses'
    },
    {
        id: 406,
        name: 'Bamboo Lounge Set',
        price: 110,
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80',
        category: 'Loungewear'
    },
]

export default function SustainableCollectionPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Conscious Choice</span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    The Sustainable Edit
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    Fashion that looks good and feels good. Discover our collection of
                    responsibly sourced, ethically made, and eco-friendly pieces.
                </p>
            </section>

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
