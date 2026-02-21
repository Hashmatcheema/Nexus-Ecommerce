'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

const products = [
    {
        id: 201,
        name: 'Floral Chiffon Dress',
        price: 185,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
        category: 'Dresses'
    },
    {
        id: 202,
        name: 'Linen Wide-Leg Pant',
        price: 145,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 203,
        name: 'Pastel Knit Cardigan',
        price: 110,
        image: 'https://images.unsplash.com/photo-1624460228330-8d2667104a39?w=800&q=80',
        category: 'Knits'
    },
    {
        id: 204,
        name: 'Printed Silk Scarf',
        price: 65,
        image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&q=80',
        category: 'Accessories'
    },
    {
        id: 205,
        name: 'Eyelet Blouse',
        price: 95,
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
        category: 'Tops'
    },
    {
        id: 206,
        name: 'Woven Straw Bag',
        price: 125,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
        category: 'Accessories'
    },
]

export default function SpringPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">New Arrivals</span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    Spring 2025
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    A breath of fresh air. Embrace the season with light fabrics,
                    soft pastels, and effortless silhouettes designed for sunny days ahead.
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
