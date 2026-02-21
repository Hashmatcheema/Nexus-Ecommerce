'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

const products = [
    {
        id: 301,
        name: 'Velvet Slip Dress',
        price: 220,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
        category: 'Dresses'
    },
    {
        id: 302,
        name: 'Tuxedo Blazer',
        price: 350,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
        category: 'Outerwear'
    },
    {
        id: 303,
        name: 'Silk Maxi Skirt',
        price: 195,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
        category: 'Bottoms'
    },
    {
        id: 304,
        name: 'Statement Earrings',
        price: 85,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
        category: 'Accessories'
    },
    {
        id: 305,
        name: 'Satin Clutch',
        price: 155,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        category: 'Accessories'
    },
    {
        id: 306,
        name: 'Sequin Top',
        price: 145,
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80',
        category: 'Tops'
    },
]

export default function EveningPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">After Hours</span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    The Evening Edit
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    Sophisticated styles for special occasions. Elevate your night out
                    with luxurious textures, elegant cuts, and a touch of sparkle.
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
