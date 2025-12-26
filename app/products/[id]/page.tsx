'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { Minus, Plus, ArrowLeft, Heart, Truck, RefreshCw, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import CartDrawer from '@/components/CartDrawer'
import { useApp } from '@/contexts/AppContext'
import { getProductById, allProducts, reviews } from '@/lib/data'

const features = [
  { icon: Truck, text: 'Free shipping over $150' },
  { icon: RefreshCw, text: '30-day easy returns' },
  { icon: Shield, text: 'Secure checkout' },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id)
  const product = getProductById(productId) || allProducts[0]
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
  
  const { addToCart, toggleFavorite, isFavorite } = useApp()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Black')
  const [quantity, setQuantity] = useState(1)
  const favorited = isFavorite(product.id)

  const images = product.images || [product.image, product.image, product.image]

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      
      <section className="pt-28 pb-24">
        <div className="container-wide">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] bg-warm-100 rounded-3xl overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isSale && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                    Sale
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[3/4] bg-warm-100 rounded-2xl overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:py-8"
            >
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent block mb-4">
                {product.category}
              </span>
              
              <h1 className="text-title font-display mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl font-bold text-accent">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-muted leading-relaxed mb-8">
                {product.description || 'A timeless piece crafted from premium materials. Designed for comfort and style.'}
              </p>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Color: {selectedColor}</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2.5 text-sm font-medium border rounded-full transition-all ${
                          selectedColor === color
                            ? 'border-accent bg-accent text-white'
                            : 'border-border hover:border-ink'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Size: {selectedSize}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-sm font-medium border rounded-full transition-all ${
                          selectedSize === size
                            ? 'border-accent bg-accent text-white'
                            : 'border-border hover:border-ink'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="inline-flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => addToCart(product, quantity, `${selectedColor} / ${selectedSize}`)}
                  className="btn-primary flex-1"
                >
                  Add to Cart — ${product.price * quantity}
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
                    favorited ? 'bg-accent border-accent text-white' : 'border-border hover:border-ink'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-border">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2 text-sm text-muted">
                    <feature.icon className="w-4 h-4" />
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* Details Accordion */}
              {product.details && (
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="text-sm font-medium mb-4">Product Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted">
                        <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Reviews */}
          <section className="mt-24">
            <h2 className="text-title font-display mb-12">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.slice(0, 4).map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-border"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-accent">★</span>
                          ))}
                        </div>
                        <span className="text-sm text-muted">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted">{review.text}</p>
                  {review.verified && (
                    <span className="inline-block mt-4 text-xs text-green-600 font-medium">✓ Verified Purchase</span>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24">
              <h2 className="text-title font-display mb-12">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
