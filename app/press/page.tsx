'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { ArrowRight, Download, Mail } from 'lucide-react'

const features = [
    {
        logo: 'VOGUE',
        quote: "Nexus is redefining what it means to shop luxury online. A seamless blend of aesthetics and functionality.",
        author: 'Editor in Chief',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
    },
    {
        logo: 'GQ',
        quote: "The future of menswear is here, and it's sustainable. Nexus leads the charge with effortless style.",
        author: 'Fashion Director',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'
    }
]

const recentNews = [
    {
        date: 'February 1, 2025',
        category: 'Sustainability',
        title: 'Nexus Achieves 100% Carbon Neutrality Across All Operations',
        excerpt: 'Marking a major milestone in our commitment to the planet, we are proud to announce...'
    },
    {
        date: 'January 15, 2025',
        category: 'Collection',
        title: 'Launching the Spring 2025 "Ethereal" Collection',
        excerpt: 'Inspired by the lightness of being, our new collection features breathable fabrics and...'
    },
    {
        date: 'December 10, 2024',
        category: 'Business',
        title: 'Nexus Expands Global Shipping to 50+ New Countries',
        excerpt: 'We are bringing our curated luxury experience to more customers worldwide...'
    }
]

export default function PressPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 container-wide text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-6 block">Newsroom</span>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-ink mb-8">
                        NEXUS in the <span className="text-accent">Press</span>
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Latest news, media coverage, and brand assets for journalists and content creators.
                    </p>
                </motion.div>
            </section>

            {/* Featured Coverage */}
            <section className="py-20 bg-ink text-white overflow-hidden">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className="relative aspect-[16/9] mb-8 overflow-hidden rounded-2xl">
                                    <Image
                                        src={feature.image}
                                        alt="Press feature"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <h3 className="text-2xl font-serif italic mb-4">"{feature.quote}"</h3>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold tracking-widest text-xl">{feature.logo}</span>
                                            <span className="w-1 h-1 bg-white/50 rounded-full" />
                                            <span className="text-sm text-white/70">{feature.author}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent News */}
            <section className="py-24 lg:py-32">
                <div className="container-wide">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-display font-bold mb-12">Latest News</h2>
                        <div className="space-y-12">
                            {recentNews.map((news, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col md:flex-row gap-8 border-b border-subtle pb-12 last:border-0"
                                >
                                    <div className="md:w-1/4">
                                        <span className="text-accent font-bold text-xs uppercase tracking-wider block mb-2">{news.category}</span>
                                        <span className="text-muted text-sm">{news.date}</span>
                                    </div>
                                    <div className="md:w-3/4">
                                        <h3 className="text-2xl font-display font-bold mb-3 hover:text-accent transition-colors cursor-pointer">{news.title}</h3>
                                        <p className="text-muted leading-relaxed mb-4">{news.excerpt}</p>
                                        <button className="text-ink font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                                            Read more <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Kit */}
            <section className="py-24 bg-accent-light">
                <div className="container-wide">
                    <div className="bg-white rounded-3xl p-12 lg:p-20 shadow-xl shadow-accent/5 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Media Resources</h2>
                            <p className="text-muted text-lg max-w-xl mb-8">
                                Download our brand assets, including logos, high-resolution product imagery,
                                and executive headshots.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="btn-primary inline-flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Media Kit
                                </button>
                                <button className="px-8 py-4 border border-ink/10 rounded-full font-medium hover:bg-ink/5 transition-colors inline-flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Contact Press Team
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full lg:w-1/3 aspect-square bg-gray-100 rounded-2xl overflow-hidden p-8 flex items-center justify-center border border-dashed border-ink/20">
                            <span className="text-2xl font-display font-bold text-ink/30">LOGO PREVIEW</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
