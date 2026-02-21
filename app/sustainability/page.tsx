'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Leaf, Recycle, Sun, Droplets } from 'lucide-react'

const milestones = [
    {
        year: '2020',
        title: 'Plastic-Free Packaging',
        description: 'Eliminated all single-use plastics from our shipping and retail packaging.'
    },
    {
        year: '2022',
        title: '100% Organic Cotton',
        description: 'Transitioned all cotton products to GOTS certified organic sources.'
    },
    {
        year: '2024',
        title: 'Carbon Neutral',
        description: 'Achieved net-zero carbon emissions across our entire supply chain.'
    },
    {
        year: '2026',
        title: 'Circular Economy',
        description: 'Launching our comprehensive recycling and resale program.'
    }
]

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
                    alt="Nature"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="container-wide relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/20">
                            <Leaf className="w-10 h-10 text-green-400" />
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-display font-bold mb-8">
                            Conscious by <span className="text-green-400">Design</span>
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto leading-relaxed text-white/90">
                            We believe luxury shouldn't cost the Earth. Every stitch, every fiber, and every package
                            is chosen with the planet in mind.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-24 bg-white">
                <div className="container-wide">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 text-green-600">
                                <Recycle className="w-8 h-8" />
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-2">85%</h3>
                            <p className="text-muted">Recycled Materials</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-6 text-yellow-600">
                                <Sun className="w-8 h-8" />
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-2">100%</h3>
                            <p className="text-muted">Renewable Energy</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Droplets className="w-8 h-8" />
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-2">-40%</h3>
                            <p className="text-muted">Water Usage</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-6 text-purple-600">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-2">0</h3>
                            <p className="text-muted">Carbon Footprint</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 lg:py-32 bg-ink text-white">
                <div className="container-wide">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold">Our Journey to Zero</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative pl-8 border-l border-white/20 pb-12 last:pb-0"
                            >
                                <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-green-500" />
                                <span className="text-green-400 font-bold text-lg mb-2 block">{milestone.year}</span>
                                <h3 className="text-2xl font-display font-bold mb-3">{milestone.title}</h3>
                                <p className="text-white/60 leading-relaxed">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Material Spotlight */}
            <section className="py-24 lg:py-32">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square rounded-2xl overflow-hidden order-2 lg:order-1">
                            <Image
                                src="https://images.unsplash.com/photo-1574634534894-89d75016404b?w=800&q=80"
                                alt="Organic Fabric"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Material Innovation</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">Organic & Recycled</h2>
                            <p className="text-lg text-muted leading-relaxed mb-8">
                                We've spent years developing proprietary blends that combine the soft touch of nature
                                with the durability of modern technology. Our fabrics are not only biodegradable but
                                designed to last a lifetime.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-ink font-medium">GOTS Certified Organic Cotton</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-ink font-medium">Recycled Polyester from Ocean Plastic</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-ink font-medium">Tencel™ Lyocell Fibers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
