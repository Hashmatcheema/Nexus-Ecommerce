'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'

interface PlaceholderPageProps {
    title: string
    description?: string
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <main className="min-h-screen bg-paper flex flex-col">
            <Navigation />

            <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md"
                >
                    <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <Construction className="w-10 h-10 text-accent" />
                    </div>

                    <h1 className="text-4xl font-display font-bold text-ink mb-4">
                        {title}
                    </h1>

                    <p className="text-muted text-lg mb-8 leading-relaxed">
                        {description || "We're currently working on this page. Please check back soon for updates."}
                    </p>

                    <Link
                        href="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}
