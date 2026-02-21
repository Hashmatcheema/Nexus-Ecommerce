'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Check, Gift, ShoppingBag } from 'lucide-react'

const amounts = [50, 100, 200, 500]

export default function GiftCardsPage() {
    const [selectedAmount, setSelectedAmount] = useState(100)

    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-24 lg:pt-48">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative shadow-2xl shadow-accent/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80"
                                    alt="Gift of choice"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-ink/20" />
                                <div className="absolute inset-x-8 bottom-8 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-display font-bold text-2xl tracking-tight">NEXUS</span>
                                        <span className="font-mono text-sm opacity-50">$ {selectedAmount}.00</span>
                                    </div>
                                    <p className="text-xs tracking-widest uppercase opacity-40">Gift Card</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Configurator */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="mb-8">
                                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">The Perfect Gift</span>
                                <h1 className="text-5xl font-display font-bold mb-6">Digital Gift Card</h1>
                                <p className="text-muted text-lg leading-relaxed">
                                    Give the gift of choice with a Nexus digital gift card.
                                    Delivered instantly to their inbox, valid on our entire collection forever.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Amount Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-4">Select Amount</label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {amounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setSelectedAmount(amount)}
                                                className={`py-4 rounded-xl border transition-all ${selectedAmount === amount
                                                        ? 'border-accent bg-accent text-white shadow-lg shadow-accent/25'
                                                        : 'border-subtle hover:border-accent/50 bg-white'
                                                    }`}
                                            >
                                                <span className="font-mono text-lg">${amount}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recipient Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Recipient Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter their email address"
                                            className="w-full px-6 py-4 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Write a sweet note..."
                                            className="w-full px-6 py-4 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-white resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-muted">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>Instant delivery via email</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-muted">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>No expiration date</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-muted">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>Valid on all collections and sale items</span>
                                    </li>
                                </ul>

                                <button className="w-full py-5 bg-ink text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink/90 transition-all active:scale-[0.99]">
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart - ${selectedAmount}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
