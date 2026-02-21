'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Plus, Minus, Search } from 'lucide-react'

const faqCategories = [
    {
        id: 'orders',
        name: 'Orders & Payments',
        questions: [
            {
                q: "How can I track my order?",
                a: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track it directly from your Account page."
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. We also offer Klarna for installment payments."
            },
            {
                q: "Can I modify my order after placing it?",
                a: "We process orders quickly. If you need to make changes, please contact our support team within 1 hour of placing your order."
            }
        ]
    },
    {
        id: 'shipping',
        name: 'Shipping & Delivery',
        questions: [
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location and are calculated at checkout."
            },
            {
                q: "How long will my order take to arrive?",
                a: "Standard shipping typically takes 3-5 business days. Express shipping is 1-2 business days. International shipping can take 7-14 business days."
            }
        ]
    },
    {
        id: 'returns',
        name: 'Returns & Exchanges',
        questions: [
            {
                q: "What is your return policy?",
                a: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with tags attached."
            },
            {
                q: "How do I start a return?",
                a: "Visit our Returns Portal and enter your order number and email address to generate a prepaid shipping label."
            }
        ]
    },
    {
        id: 'products',
        name: 'Product Care',
        questions: [
            {
                q: "How do I care for my organic cotton items?",
                a: "We recommend machine washing cold with like colors and tumble drying low. Avoid bleach to preserve the organic fibers."
            },
            {
                q: "Where are your products made?",
                a: "Our products are ethically manufactured in Portugal and Italy, in factories that meet our strict standards for fair labor and sustainability."
            }
        ]
    }
]

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState('orders')
    const [openQuestion, setOpenQuestion] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const activeQuestions = faqCategories
        .find(c => c.id === activeCategory)
        ?.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []

    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-12 lg:pt-48 container-wide text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-6 block">Help Center</span>
                    <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-8">
                        How can we <span className="text-accent">help?</span>
                    </h1>

                    {/* Search */}
                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-subtle shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Categories & Questions */}
            <section className="pb-24 lg:pb-32 pt-12">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-2">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id)
                                            setOpenQuestion(null)
                                        }}
                                        className={`w-full text-left px-6 py-4 rounded-xl transition-all font-medium flex items-center justify-between ${activeCategory === category.id
                                                ? 'bg-ink text-white shadow-lg'
                                                : 'hover:bg-white text-muted hover:text-ink'
                                            }`}
                                    >
                                        {category.name}
                                        {activeCategory === category.id && (
                                            <motion.div layoutId="activeIndicator" className="w-2 h-2 bg-accent rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="lg:col-span-8">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                {activeQuestions.length === 0 ? (
                                    <div className="text-center py-12 text-muted">
                                        No results found for "{searchQuery}"
                                    </div>
                                ) : (
                                    activeQuestions.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-white rounded-2xl border border-subtle overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
                                                className="w-full px-8 py-6 flex items-center justify-between gap-6 text-left hover:bg-paper/50 transition-colors"
                                            >
                                                <span className="font-display font-medium text-lg leading-snug">{item.q}</span>
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openQuestion === item.q
                                                        ? 'bg-accent border-accent text-white rotate-180'
                                                        : 'border-subtle text-muted'
                                                    }`}>
                                                    {openQuestion === item.q ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {openQuestion === item.q && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="px-8 pb-8 pt-2 text-muted leading-relaxed border-t border-subtle/50">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
