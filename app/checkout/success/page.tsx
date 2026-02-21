'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Package } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useApp } from '@/contexts/AppContext'

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams()
    const payment_intent = searchParams.get('payment_intent')
    const { clearCart } = useApp()

    useEffect(() => {
        // Clear the client-side cart just in case, though the webhook handles the server side.
        // And standard flow might have cleared it locally if we did that in checkout page?
        // In checkout page, I didn't clear cart on success, I just redirected.
        // So good to clear here to be sure the UI updates.
        if (payment_intent) {
            clearCart()
        }
    }, [payment_intent, clearCart])

    return (
        <main className="min-h-screen bg-gray-50">
            <Navigation />
            <section className="min-h-screen flex items-center justify-center px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-border p-8 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                    >
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                    </motion.div>

                    <h1 className="text-3xl font-display font-bold text-ink mb-2">Payment Successful!</h1>
                    <p className="text-muted mb-8">
                        Thank you for your purchase. Your order has been confirmed and is being processed.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left">
                        <p className="text-xs text-muted uppercase font-bold tracking-wider mb-1">Payment ID</p>
                        <p className="font-mono text-sm text-ink break-all">{payment_intent}</p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/account/orders"
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <Package className="w-4 h-4" />
                            View My Orders
                        </Link>
                        <Link
                            href="/products"
                            className="btn-outline w-full flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
