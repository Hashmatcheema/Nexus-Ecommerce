'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { ArrowRight, Briefcase, Heart, Rocket, Users } from 'lucide-react'

const benefits = [
    {
        icon: Rocket,
        title: 'Growth & Development',
        description: 'We invest in your potential with annual learning budgets and mentorship programs.',
    },
    {
        icon: Heart,
        title: 'Health & Wellness',
        description: 'Comprehensive health coverage and wellness stipends to keep you feeling your best.',
    },
    {
        icon: Users,
        title: 'Inclusive Culture',
        description: 'A diverse, collaborative environment where every voice is heard and valued.',
    },
    {
        icon: Briefcase,
        title: 'Flexible Work',
        description: 'Remote-friendly options and flexible hours to support your work-life balance.',
    },
]

const openings = [
    {
        department: 'Design',
        role: 'Senior Fashion Designer',
        location: 'New York, NY',
        type: 'Full-time',
    },
    {
        department: 'Engineering',
        role: 'Frontend Engineer',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        department: 'Marketing',
        role: 'Brand Manager',
        location: 'London, UK',
        type: 'Full-time',
    },
    {
        department: 'Operations',
        role: 'Supply Chain Analyst',
        location: 'New York, NY',
        type: 'Full-time',
    },
]

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                    alt="Office culture"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-ink/70" />

                <div className="container-wide relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
                            Build the <span className="text-accent">Future</span> of Fashion
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Join a team of dreamers and doers who are redefining luxury for the modern world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 lg:py-32">
                <div className="container-wide">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Why Join Us</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-bold">More Than Just a Job</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border border-subtle hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all group"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-3">{benefit.title}</h3>
                                <p className="text-muted leading-relaxed text-sm">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-24 lg:py-32 bg-ink text-white">
                <div className="container-wide">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Open Positions</h2>
                            <p className="text-white/60 text-lg">Find your perfect role and help us shape the industry.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, index) => (
                            <motion.a
                                key={job.role}
                                href="#"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <span className="text-accent text-sm font-bold uppercase tracking-wider mb-2 block">{job.department}</span>
                                        <h3 className="text-2xl font-display font-bold group-hover:text-accent transition-colors">{job.role}</h3>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="font-medium">{job.location}</div>
                                            <div className="text-white/50 text-sm">{job.type}</div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
