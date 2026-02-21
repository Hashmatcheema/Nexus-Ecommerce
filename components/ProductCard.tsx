'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp, Product } from '@/contexts/AppContext'

interface ProductCardProps {
  product: Product
  priority?: boolean
  index?: number
}

export default function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, toggleFavorite, isFavorite } = useApp()
  const favorited = isFavorite(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-gray-100 rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            priority={priority}
          />

          {/* Category tag */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              className="flex-1 py-3 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-colors flex items-center justify-center gap-2"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(product.id)
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${favorited
                ? 'bg-accent text-white'
                : 'bg-white text-ink hover:bg-gray-100'
                }`}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-ink group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            {product.category && (
              <p className="text-sm text-muted mt-0.5">{product.category}</p>
            )}
          </div>
          <span className="font-display font-bold text-lg">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
