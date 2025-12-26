'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useApp, type Product } from '@/contexts/AppContext'
import Link from 'next/link'

interface QuickViewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useApp()
  const [quantity, setQuantity] = useState(1)

  const productImages = Array.isArray(product.image) 
    ? product.image 
    : [product.image]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl bg-paper shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:opacity-50 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={productImages[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                {product.category && (
                  <span className="text-xs font-medium tracking-widest uppercase text-muted block mb-4">
                    {product.category}
                  </span>
                )}
                
                <h2 className="font-display text-2xl font-semibold mb-4">
                  {product.name}
                </h2>
                
                <p className="font-display text-xl font-medium mb-8">
                  ${product.price.toLocaleString()}
                </p>

                {/* Quantity */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">Quantity</label>
                  <div className="inline-flex items-center border border-subtle">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button onClick={handleAddToCart} className="btn-primary mb-4">
                  Add to Cart
                </button>

                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-center text-sm text-muted hover:text-ink transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
