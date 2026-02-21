'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { RefreshCw, CheckCircle, Package } from 'lucide-react'

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-paper">
            <Navigation />

            <section className="pt-32 pb-16 lg:pt-48 container-wide text-center">
                <h1 className="text-4xl lg:text-6xl font-display font-bold text-ink mb-6">
                    Returns & Exchanges
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                    We want you to love your purchase. If it's not quite right, we're here to help.
                </p>
            </section>

            <section className="pb-24">
                <div className="container-wide max-w-4xl mx-auto">

                    {/* Process Steps */}
                    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-subtle mb-16">
                        <h3 className="text-2xl font-display font-bold mb-8 text-center">How to Return</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                    <RefreshCw className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2">1. Initiate Return</h4>
                                <p className="text-sm text-muted">Visit our returns portal to start your request.</p>
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                    <Package className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2">2. Pack Items</h4>
                                <p className="text-sm text-muted">Pack items in original packaging with tags.</p>
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2">3. Ship It</h4>
                                <p className="text-sm text-muted">Use the prepaid label to drop off the package.</p>
                            </div>

                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-accent/20 -z-0" />
                        </div>

                        <div className="mt-10 text-center">
                            <button className="btn-primary">Start a Return</button>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent">
                        <h3>Return Policy</h3>
                        <p>
                            We accept returns within 30 days of the delivery date. To be eligible for a return, your item must be unchanged, unworn, and unwashed, with all original tags attached.
                        </p>

                        <h3>Refunds</h3>
                        <p>
                            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                        </p>
                        <p>
                            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 10 business days.
                        </p>

                        <h3>Exchanges</h3>
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange it for the same item (e.g., different size), start a return in our portal and select "Exchange" as your reason.
                        </p>

                        <h3>Non-returnable items</h3>
                        <ul>
                            <li>Gift cards</li>
                            <li>Intimate apparel (underwear, swimwear) if hygiene seal is removed</li>
                            <li>Customized or personalized items</li>
                            <li>Final sale items</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
