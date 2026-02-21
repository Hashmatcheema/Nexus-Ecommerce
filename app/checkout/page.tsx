'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Truck, Shield, Check, Lock, ChevronRight, Sparkles, Gift, ArrowRight } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import clsx from 'clsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { env } from '@/lib/env'

// Initialize Stripe from central env (lib/env.ts)
const stripePublishableKey = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Check },
]

// Validation Schemas
const shippingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(4, 'Valid ZIP code is required'),
})

type ShippingFormData = z.infer<typeof shippingSchema>

// Payment Form Component (internal to access Stripe hooks)
function PaymentForm({
  onSuccess,
  onBack,
  step,
  setStep,
  shippingData,
  total
}: {
  onSuccess: () => void,
  onBack: () => void,
  step: number,
  setStep: (s: number) => void,
  shippingData: ShippingFormData,
  total: number
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)
    setErrorMessage(null)

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message ?? 'An error occurred')
      setLoading(false)
      return
    }

    // Move to Review Step
    setStep(3)
    setLoading(false)
  }

  const handlePlaceOrder = async () => {
    if (!stripe || !elements) return

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`, // In real app, this page handles completion
        payment_method_data: {
          billing_details: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            email: shippingData.email,
            address: {
              line1: shippingData.address,
              city: shippingData.city,
              state: shippingData.state,
              postal_code: shippingData.zip,
              country: 'US', // Hardcoded for now
            }
          }
        }
      },
      redirect: 'if_required', // Avoid redirect if not 3DS
    })

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed')
      setLoading(false)
    } else {
      // Success!
      onSuccess()
    }
  }

  return (
    <>
      {/* Step 2: Payment UI */}
      {step === 2 && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-display font-bold">Payment Method</h2>

          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 p-4 rounded-xl border border-border">
              <PaymentElement />
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button type="button" onClick={onBack} className="btn-outline flex-1">
                Back
              </button>
              <button
                type="submit"
                disabled={!stripe || loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Processing...' : 'Review Order'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Step 3: Review UI */}
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
            <div className="text-muted text-sm pl-8">
              <p>{shippingData.firstName} {shippingData.lastName}</p>
              <p>{shippingData.address}</p>
              <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Payment Method</h3>
            </div>
            <p className="text-muted text-sm pl-8 font-mono">
              Card details entered securely via Stripe
            </p>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1">
              Back
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Place Order — ${total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // Forms
  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      address: '123 Fashion Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  })

  const shipping = cartTotal > 100 ? 0 : 12
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const tax = (cartTotal - discount) * 0.08
  const total = cartTotal - discount + shipping + tax
  const orderNumber = `#ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`

  const handleShippingSubmit = async (data: ShippingFormData) => {
    // Create Payment Intent on Server
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
      })
      const json = await res.json()
      if (json.clientSecret) {
        setClientSecret(json.clientSecret)
        setStep(2)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Failed to initialize payment')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to connect to server')
    }
  }

  const handleOrderSuccess = () => {
    toast.success('Order placed successfully!', {
      description: `Order ${orderNumber} has been confirmed.`,
    })
    setOrderPlaced(true)
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'extra10') {
      setPromoApplied(true)
      toast.success('Promo code applied!', {
        description: 'You saved 10% on your order.',
      })
    } else {
      toast.error('Invalid promo code', {
        description: 'Try "EXTRA10"',
      })
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
                  {orderNumber}
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
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step > s.id
                            ? 'bg-green-500 text-white'
                            : step === s.id
                              ? 'bg-accent text-white shadow-lg shadow-accent/30'
                              : 'bg-gray-200 text-muted'
                            }`}>
                            {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                          </div>
                          <span className={`hidden sm:block text-sm font-medium ${step >= s.id ? 'text-ink' : 'text-muted'
                            }`}>
                            {s.name}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 lg:w-24 h-0.5 mx-4 ${step > s.id ? 'bg-green-500' : 'bg-gray-200'
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

                        <form id="shipping-form" onSubmit={shippingForm.handleSubmit(handleShippingSubmit)}>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">First Name</label>
                              <input
                                {...shippingForm.register('firstName')}
                                type="text"
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                  shippingForm.formState.errors.firstName ? 'border-red-500' : 'border-border'
                                )}
                              />
                              {shippingForm.formState.errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.firstName.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Last Name</label>
                              <input
                                {...shippingForm.register('lastName')}
                                type="text"
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                  shippingForm.formState.errors.lastName ? 'border-red-500' : 'border-border'
                                )}
                              />
                              {shippingForm.formState.errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.lastName.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                              {...shippingForm.register('email')}
                              type="email"
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                shippingForm.formState.errors.email ? 'border-red-500' : 'border-border'
                              )}
                            />
                            {shippingForm.formState.errors.email && (
                              <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.email.message}</p>
                            )}
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <input
                              {...shippingForm.register('address')}
                              type="text"
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                shippingForm.formState.errors.address ? 'border-red-500' : 'border-border'
                              )}
                            />
                            {shippingForm.formState.errors.address && (
                              <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.address.message}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">City</label>
                              <input
                                {...shippingForm.register('city')}
                                type="text"
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                  shippingForm.formState.errors.city ? 'border-red-500' : 'border-border'
                                )}
                              />
                              {shippingForm.formState.errors.city && (
                                <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.city.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">State</label>
                              <input
                                {...shippingForm.register('state')}
                                type="text"
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                  shippingForm.formState.errors.state ? 'border-red-500' : 'border-border'
                                )}
                              />
                              {shippingForm.formState.errors.state && (
                                <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.state.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">ZIP</label>
                              <input
                                {...shippingForm.register('zip')}
                                type="text"
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all",
                                  shippingForm.formState.errors.zip ? 'border-red-500' : 'border-border'
                                )}
                              />
                              {shippingForm.formState.errors.zip && (
                                <p className="text-red-500 text-xs mt-1">{shippingForm.formState.errors.zip.message}</p>
                              )}
                            </div>
                          </div>

                          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 group mt-6">
                            Continue to Payment
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* Steps 2 & 3: Wrapped in Elements (only when Stripe key is configured) */}
                    {(step === 2 || step === 3) && clientSecret && stripePromise && (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                          onSuccess={handleOrderSuccess}
                          onBack={() => setStep(step - 1)}
                          step={step}
                          setStep={setStep}
                          shippingData={shippingForm.getValues()}
                          total={total}
                        />
                      </Elements>
                    )}
                    {(step === 2 || step === 3) && clientSecret && !stripePromise && (
                      <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                        Payment is not configured. Add <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to your <code className="bg-amber-100 px-1 rounded">.env</code> to enable checkout.
                      </div>
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
                          sizes="64px"
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
