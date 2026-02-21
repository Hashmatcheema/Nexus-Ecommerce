'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react'

export default function ContactPage() {
    const [formState, setFormState] = useState('idle') // idle, submitting, success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormState('submitting')
        // Simulate API call
        setTimeout(() => {
            setFormState('success')
        }, 1500)
    }

    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            {/* Header */}
            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent font-bold uppercase tracking-widest text-xs mb-6 block">Customer Care</span>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-ink mb-8">
                        Get in <span className="text-accent">Touch</span>
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Have a question about an order? Want to collaborate? We're here to help.
                        Our team responds to all inquiries within 24 hours.
                    </p>
                </motion.div>
            </section>

            {/* Main Content */}
            <section className="pb-24 lg:pb-32">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-12"
                        >
                            <div className="bg-white rounded-3xl p-10 shadow-xl shadow-accent/5 border border-subtle">
                                <h3 className="text-2xl font-display font-bold mb-8">Contact Information</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold uppercase tracking-wider text-muted block mb-1">Email Us</span>
                                            <a href="mailto:hello@nexus.com" className="text-lg font-medium hover:text-accent transition-colors">hello@nexus.com</a>
                                            <p className="text-sm text-muted mt-1">For general inquiries and support</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold uppercase tracking-wider text-muted block mb-1">Call Us</span>
                                            <a href="tel:+1234567890" className="text-lg font-medium hover:text-accent transition-colors">+1 (234) 567-890</a>
                                            <p className="text-sm text-muted mt-1">Mon-Fri, 9am - 6pm EST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold uppercase tracking-wider text-muted block mb-1">Visit Us</span>
                                            <address className="text-lg font-medium not-italic">
                                                123 Fashion Ave, Suite 400<br />
                                                New York, NY 10001
                                            </address>
                                            <p className="text-sm text-muted mt-1">By appointment only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-subtle group">
                                <Image
                                    src="https://images.unsplash.com/photo-1555400038-63f5ba517a97?w=800&q=80"
                                    alt="Office Location"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-ink/10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <a
                                        href="#"
                                        className="px-6 py-3 bg-white/90 backdrop-blur rounded-full font-bold text-sm shadow-lg hover:bg-white transition-colors flex items-center gap-2 transform hover:scale-105 duration-300"
                                    >
                                        View on Google Maps <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="bg-white p-10 lg:p-12 rounded-3xl border border-subtle h-full">
                                {formState === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                                        <p className="text-muted text-lg max-w-md mx-auto mb-8">
                                            Thank you for reaching out. We've received your message and will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setFormState('idle')}
                                            className="text-accent font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <h3 className="text-2xl font-display font-bold mb-8">Send a Message</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase tracking-wider text-muted">First Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-paper"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold uppercase tracking-wider text-muted">Last Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-paper"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-muted">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-paper"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-muted">Subject</label>
                                            <select className="w-full px-4 py-3 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-paper appearance-none">
                                                <option>General Inquiry</option>
                                                <option>Order Status</option>
                                                <option>Returns & Exchanges</option>
                                                <option>Press & Collaboration</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-muted">Message</label>
                                            <textarea
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 rounded-xl border border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all bg-paper resize-none"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-4 bg-ink text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-ink/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'submitting' ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

import { Check } from 'lucide-react'
