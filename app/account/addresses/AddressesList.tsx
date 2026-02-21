'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { Plus, MapPin, Pencil, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AddressesListProps {
    addresses: any[]
}

export default function AddressesList({ addresses }: AddressesListProps) {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-24">
                <div className="container-wide">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8">
                            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Account
                        </Link>
                        <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted block mb-4">
                            Account
                        </span>
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-display font-bold">
                                Addresses
                            </h1>
                            <button className="btn-primary inline-flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add New
                            </button>
                        </div>
                    </motion.div>

                    {/* Addresses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses.length === 0 ? (
                            <div className="col-span-full border border-dashed border-border rounded-2xl p-8 text-center bg-gray-50/50">
                                <MapPin className="w-8 h-8 text-muted mx-auto mb-3" />
                                <p className="text-muted mb-4">No addresses saved yet.</p>
                            </div>
                        ) : (
                            addresses.map((address, index) => (
                                <motion.div
                                    key={address.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="bg-white p-8 rounded-2xl border border-subtle relative group hover:border-accent/30 transition-colors"
                                >
                                    {address.isDefault && (
                                        <span className="absolute top-6 right-6 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                                            Default
                                        </span>
                                    )}

                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-ink/50">
                                        <MapPin className="w-6 h-6" />
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h3 className="font-bold text-lg">{address.name || 'My Address'}</h3>
                                            <p className="text-sm text-muted">{address.type || 'Home'} Address</p>
                                        </div>
                                        <div className="text-muted leading-relaxed">
                                            <p>{address.street}</p>
                                            <p>{address.city}, {address.state} {address.zip}</p>
                                            <p>{address.country}</p>
                                            {/* phone not in DB model yet, skip */}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-6 border-t border-subtle">
                                        <button className="text-sm font-medium flex items-center gap-2 hover:text-accent transition-colors">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                        <button className="text-sm font-medium flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors ml-auto">
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
            <CartDrawer />
        </main>
    )
}
