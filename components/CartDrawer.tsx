'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Sparkles, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateCartQuantity, removeFromCart, cartTotal } = useApp()

  const freeShippingThreshold = 100
  const progressToFreeShipping = Math.min((cartTotal / freeShippingThreshold) * 100, 100)
  const amountToFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0)

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-paper z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold">Your Cart</h2>
                  <p className="text-xs text-muted">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-accent-light border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className={`w-4 h-4 ${progressToFreeShipping >= 100 ? 'text-green-600' : 'text-accent'}`} />
                  <span className="text-sm font-medium">
                    {progressToFreeShipping >= 100
                      ? "You've unlocked free shipping! 🎉"
                      : `$${amountToFreeShipping.toFixed(0)} away from free shipping`
                    }
                  </span>
                </div>
                <div className="h-1.5 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToFreeShipping}%` }}
                    className={`h-full rounded-full ${progressToFreeShipping >= 100 ? 'bg-green-500' : 'bg-accent'}`}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto relative min-h-0">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-muted" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Your cart is empty</h3>
                  <p className="text-muted mb-8">Looks like you haven&apos;t added anything yet.</p>
                  <Link
                    href="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.selectedVariant || 'default'}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-border"
                    >
                      <Link
                        href={`/products/${item.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover object-center"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-1">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.selectedVariant && (
                          <p className="text-xs text-muted mb-2">{item.selectedVariant}</p>
                        )}
                        <p className="font-bold text-accent">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-white space-y-4">
                {/* Promo Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="px-4 py-3 bg-ink text-white rounded-lg text-sm font-medium hover:bg-ink/90 transition-colors">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className={progressToFreeShipping >= 100 ? 'text-green-600 font-medium' : ''}>
                      {progressToFreeShipping >= 100 ? 'Free' : 'Calculated at checkout'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-display font-bold">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2 group"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
