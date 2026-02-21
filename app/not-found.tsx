'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-paper flex flex-col">
            <Navigation />

            <section className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg mx-auto"
                >
                    <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
                        404 Error
                    </span>
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-ink mb-6">
                        Lost?
                    </h1>
                    <p className="text-xl text-muted mb-10 leading-relaxed">
                        The page you are looking for has been moved, deleted, or possibly never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
                            <Home className="w-5 h-5" />
                            Back Home
                        </Link>
                        <Link href="/products" className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-base bg-white">
                            <Search className="w-5 h-5" />
                            Browse Shop
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}
