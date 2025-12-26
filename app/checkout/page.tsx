'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Truck, Shield, Check, Lock, ChevronRight, Sparkles, Gift, ArrowRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Check },
]

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping = cartTotal > 100 ? 0 : 12
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const tax = (cartTotal - discount) * 0.08
  const total = cartTotal - discount + shipping + tax

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'extra10') {
      setPromoApplied(true)
    }
  }

  // Order Confirmed Screen
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-accent-light via-paper to-paper">
        <Navigation />
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, delay: 0.2 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-display font-bold text-ink mb-4">Order Confirmed!</h1>
              <p className="text-muted text-lg mb-6">
                Thank you for your order. We&apos;ve sent a confirmation email with your order details.
              </p>
              
              <div className="bg-white rounded-2xl p-6 border border-border mb-8">
                <p className="text-sm text-muted mb-2">Order Number</p>
                <p className="font-mono text-2xl font-bold text-accent">
                  #ORD-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/account/orders" className="btn-outline flex-1">
                  Track Order
                </Link>
                <Link href="/products" className="btn-primary flex-1">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    )
  }

  // Empty Cart Screen
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-paper">
        <Navigation />
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-muted" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted mb-8">Add some items to your cart to checkout.</p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="pt-24 lg:pt-28 pb-12">
        <div className="container-wide">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden"
              >
                {/* Progress Steps */}
                <div className="p-6 border-b border-border bg-gray-50">
                  <div className="flex items-center justify-between">
                    {steps.map((s, index) => (
                      <div key={s.id} className="flex items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            step > s.id 
                              ? 'bg-green-500 text-white' 
                              : step === s.id 
                                ? 'bg-accent text-white shadow-lg shadow-accent/30' 
                                : 'bg-gray-200 text-muted'
                          }`}>
                            {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                          </div>
                          <span className={`hidden sm:block text-sm font-medium ${
                            step >= s.id ? 'text-ink' : 'text-muted'
                          }`}>
                            {s.name}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 lg:w-24 h-0.5 mx-4 ${
                            step > s.id ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Shipping */}
                    {step === 1 && (
                      <motion.div
                        key="shipping"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold">Shipping Address</h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">First Name</label>
                            <input
                              type="text"
                              defaultValue="Sarah"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Last Name</label>
                            <input
                              type="text"
                              defaultValue="Johnson"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue="sarah.johnson@email.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Address</label>
                          <input
                            type="text"
                            defaultValue="123 Fashion Avenue"
                            className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input
                              type="text"
                              defaultValue="New York"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">State</label>
                            <input
                              type="text"
                              defaultValue="NY"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">ZIP</label>
                            <input
                              type="text"
                              defaultValue="10001"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <button onClick={() => setStep(2)} className="btn-primary w-full flex items-center justify-center gap-2 group">
                          Continue to Payment
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Payment */}
                    {step === 2 && (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold">Payment Method</h2>

                        {/* Card Selection */}
                        <div className="p-4 bg-accent-light border-2 border-accent rounded-xl flex items-center gap-4">
                          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted">Visa, Mastercard, Amex</p>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            defaultValue="4242 4242 4242 4242"
                            className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              defaultValue="12/25"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              defaultValue="123"
                              className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Name on Card</label>
                          <input
                            type="text"
                            defaultValue="Sarah Johnson"
                            className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="flex gap-4">
                          <button onClick={() => setStep(1)} className="btn-outline flex-1">
                            Back
                          </button>
                          <button onClick={() => setStep(3)} className="btn-primary flex-1 flex items-center justify-center gap-2 group">
                            Review Order
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                      <motion.div
                        key="review"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-display font-bold">Review Order</h2>
                        
                        <div className="bg-gray-50 rounded-2xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <Truck className="w-5 h-5 text-accent" />
                            <h3 className="font-semibold">Shipping Address</h3>
                          </div>
                          <p className="text-muted text-sm pl-8">
                            Sarah Johnson<br />
                            123 Fashion Avenue<br />
                            New York, NY 10001
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <CreditCard className="w-5 h-5 text-accent" />
                            <h3 className="font-semibold">Payment Method</h3>
                          </div>
                          <p className="text-muted text-sm pl-8 font-mono">
                            •••• •••• •••• 4242
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <button onClick={() => setStep(2)} className="btn-outline flex-1">
                            Back
                          </button>
                          <button onClick={handlePlaceOrder} className="btn-primary flex-1 flex items-center justify-center gap-2 group">
                            <Lock className="w-4 h-4" />
                            Place Order — ${total.toFixed(2)}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Security Footer */}
                <div className="p-4 bg-gray-50 border-t border-border flex items-center justify-center gap-6 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    SSL Secure
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    256-bit Encryption
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-border p-6 lg:p-8 sticky top-28"
              >
                <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Order Summary
                </h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-ink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        {item.selectedVariant && (
                          <p className="text-xs text-muted">{item.selectedVariant}</p>
                        )}
                      </div>
                      <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied}
                      className="px-4 py-3 bg-ink text-white rounded-xl text-sm font-medium hover:bg-ink/90 transition-colors disabled:bg-green-500"
                    >
                      {promoApplied ? <Check className="w-4 h-4" /> : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                      <Check className="w-4 h-4" /> 10% discount applied!
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-border">
                    <span>Total</span>
                    <span className="text-accent">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {shipping === 0 ? 'Free Shipping' : 'Free over $100'}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      30-day returns
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
